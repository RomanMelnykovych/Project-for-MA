/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/anychart/dist/index.d.ts" />

import time = anychart.format.time;
import number = anychart.format.number;

if (!localStorage.getItem("authUser")){
    window.location.href = "../views/signIN.html";
}

$(document).ready(function () : void{
    // let body : any = $("body"); /* Видалення обєктів від сайту zzz.com*/
    // body[0].childNodes[0].remove();
    // body[0].childNodes[0].remove();
    // $(".cbalink").remove()

    $(window).on("resize", function() : void {
        if (this.innerWidth < 700){
            $mainExpense.hide();
            $expenseHistoryMain.hide();
            $mainIncomes.hide();
            $incomesHistoryMain.hide();
            $mainBalance.hide();
            $statisticsMain.hide();
        }else {
            $expenseHistoryChart.hide();
            $incomesHistoryChart.hide();
            $expense.hide();
            $incomes.hide();
            $expenseHistory.hide();
            $incomesHistory.hide();
            $balance.hide();
            $statistics.hide();
            $mainID.show()
        }
    });

    var userArray : [object]; /*дані всіх юзерів*/
    if (localStorage.getItem("users")){
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
    }

    var authUserArray : object; /*дані авторизованого юзера*/
    authUserArray = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUserArray);
    $("#nameUser").html(`Name :  ${authUserArray["userfirstname"]} ${authUserArray["userlastname"]}`);
    $("#nameUserHeader").html(`   ${authUserArray["userfirstname"]} ${authUserArray["userlastname"]}`);

    var localExpense : [object]; /* список затрат авторизованого юзера*/
    if (authUserArray["expense"]){
        localExpense = authUserArray["expense"];
    }
    var localIncomes : [object]; /* список доходів авторизованого юзера*/
    if (authUserArray["incomes"]){
        localIncomes = authUserArray["incomes"];
    }

    var checkExpenseChart : boolean;
    var checkIncomesChart : boolean;

    const $mainID : any = $("#main");
    const $hamburger : any = $("#hamburger");
    const $expense : any = $("#expense");
    const $mainExpense : any = $("#mainExpense");
    const $expenseHistory : any = $("#expenseHistory");
    const $expenseHistoryChart : any = $("#expenseHistoryChart");
    const $mainExpenseChart : any = $("#mainExpenseChart");
    const $incomesHistoryChart : any = $("#incomesHistoryChart");
    const $mainIncomesChart : any = $("#mainIncomesChart");
    const $expenseHistoryMain : any = $("#expenseHistoryMain");
    const $incomes : any = $("#incomes");
    const $mainIncomes : any = $("#mainIncomes");
    const $incomesHistory : any = $("#incomesHistory");
    const $incomesHistoryMain : any = $("#incomesHistoryMain");
    const $balance : any = $("#balance");
    const $mainBalance : any = $("#mainBalance");

    const $statistics : any = $("#statistics");
    const $statisticsChart : any = $("#statisticsChart");
    const $categoryIncomesChart : any = $("#categoryIncomesChart");
    const $categoryExpenseChart : any = $("#categoryExpenseChart");

    const $statisticsMain : any = $("#statisticsMain");
    const $statisticsChartMain : any = $("#statisticsChartMain");
    const $categoryIncomesChartMain : any = $("#categoryIncomesChartMain");
    const $categoryExpenseChartMain : any = $("#categoryExpenseChartMain");

    let $yearBalance : any = $("#yearBalance");
    let $yearBalanceMain : any = $("#yearBalanceMain");
    let $expenseHistoryDateStart : any = $("#expenseHistoryDateStart");
    let $expenseHistoryDateEnd : any =  $("#expenseHistoryDateEnd");
    let $expenseHistoryMainDateStart : any = $("#expenseHistoryMainDateStart");
    let $expenseHistoryMainDateEnd : any = $("#expenseHistoryMainDateEnd");
    let $incomesHistoryDateStart : any = $("#incomesHistoryDateStart");
    let $incomesHistoryDateEnd : any =  $("#incomesHistoryDateEnd");
    let $incomesHistoryMainDateStart : any = $("#incomesHistoryMainDateStart");
    let $incomesHistoryMainDateEnd : any = $("#incomesHistoryMainDateEnd");

    let hiddenClass : string = "box-hidden";

    reloadDate();

    $("input[type='date']").val(currentDay()); /*Заповнення полів input із type="date" сьогоднішньою датою*/
    $("input[type='time']").val(currentTime()); /*Заповнення полів input із type="time" поточним часом*/
    $("input[id^='year']").val(getCurrentYear());

    (function() : void{
        let Site : any = {
            init: function() {
                this.bindEventHandlers();
            },
            bindEventHandlers: function() {
                for (let i = 0; i < this.eventHandlers.length; i++) {
                    this.bindEvent(this.eventHandlers[i]);
                }
            },
            bindEvent: function(e) {
                e.$el.on(e.event, e.handler);
                console.log('Bound ' + e.event + ' handler for', e.$el);
            },
            eventHandlers: [
                {
                    $el: $("#hamburgerOpen"),
                    event: "click",
                    handler: function() : void{
                        $hamburger.css("width", "75%");
                        $(".social-developer").show();
                        $(".hamburger__user-info").show();
                    }
                },
                {
                    $el: $("#hamburgerOff"),
                    event: "click",
                    handler: function() : void{
                        $hamburger.css("width", "0");
                        $(".hamburger__user-info").hide(100);
                        $(".social-developer").hide(100);
                    }
                }
            ]
        };
        Site.init();
    })();

    $("#signOut").on("click", function () : void{
        searchUser(authUserArray["useremail"]);
        localStorage.setItem("users", JSON.stringify(userArray));
        localStorage.removeItem("authUser");
        window.location.href = "../views/signIN.html";
    });

    $("#addExpense").on("click", function() : void{
        if (window.innerWidth >= 700){
            $expenseHistoryMain.hide();
            $incomesHistoryMain.hide();
            $mainBalance.hide();
            $mainIncomes.hide();
            $statisticsMain.hide();
            $mainExpense.removeClass(hiddenClass);
            $mainExpense.hide();
            $mainExpense.slideDown("slow");
        }else {
            $mainID.hide();
            $expense.show();
        }
    });
    $("#backInExpanse").on("click", function () : void{
        reloadDate();
        $expense.hide();
        $mainID.show();
    });
    $("#expenseCheck").on("click", function () : void{
        let temp : IFunds;
        let expenseDate : string = <string>$("#expenseDate").val();
        let expenseTime : string = <string>$("#expenseTime").val();
        let expenseCategory : string = <string>$("#expenseCategory").val();
        let expenseAmount : number = <number>$("#expenseAmount").val();

        if (typeof expenseAmount === "string") {
            expenseAmount = parseInt(expenseAmount);
        }

        if (expenseDate === "" || expenseTime === "" || expenseCategory === "" || isNaN(expenseAmount) ){
            alert("Fill in all the fields !!!");
        } else {
            temp = buildFunds(expenseDate, expenseTime, expenseCategory, expenseAmount);
            if (localExpense === undefined){
                localExpense = [temp];
            }else {
                localExpense.push(temp);
            }
            console.log(localExpense);
            authUserArray["expense"] = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            $expense.hide();
            $mainID.show();
        }
    });
    $("#exitMainExpense").on("click", function () : void{
        $mainExpense.slideUp("slow");
    });
    $("#expenseMainCheck").on("click", function () : void{
        let temp : IFunds;
        let expenseMainDate : string = <string>$("#expenseMainDate").val();
        let expenseMainTime : string = <string>$("#expenseMainTime").val();
        let expenseMainCategory : string = <string>$("#expenseMainCategory").val();
        let expenseMainAmount : number = <number>$("#expenseMainAmount").val();

        if (typeof expenseMainAmount === "string") {
            expenseMainAmount = parseInt(expenseMainAmount);
        }

        if (expenseMainDate === "" || expenseMainCategory === "" || isNaN(expenseMainAmount) || expenseMainTime === ""){
            alert("Fill in all the fields !!!");
        } else {
            temp = buildFunds(expenseMainDate, expenseMainTime, expenseMainCategory, expenseMainAmount);
            if (localExpense === undefined){
                localExpense = [temp];
            }else {
                localExpense.push(temp);
            }
            console.log(localExpense);
            authUserArray["expense"] = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            $mainExpense.slideUp("slow");
        }
    });

    $("#addIncomes").on("click", function () : void{
        if (window.innerWidth >= 700){
            $expenseHistoryMain.hide();
            $incomesHistoryMain.hide();
            $mainBalance.hide();
            $mainExpense.hide();
            $statisticsMain.hide();
            $mainIncomes.removeClass(hiddenClass);
            $mainIncomes.hide();
            $mainIncomes.slideDown("slow");
        }else {
            $mainID.hide();
            $incomes.show();
        }
    });
    $("#backInIncomes").on("click", function () : void{
        reloadDate();
        $incomes.hide();
        $mainID.show();
    });
    $("#incomesCheck").on("click", function () : void{
        let temp : IFunds;
        let incomesDate : string = <string>$("#incomesDate").val();
        let incomesTime : string = <string>$("#incomesTime").val();
        let incomesCategory : string = <string>$("#incomesCategory").val();
        let incomesAmount : number = <number>$("#incomesAmount").val();

        if (typeof incomesAmount === "string"){
            incomesAmount = parseInt(incomesAmount);
        }

        if (incomesDate === "" || incomesCategory === "" || isNaN(incomesAmount) || incomesTime === ""){
            alert("Fill in all the fields !!!");
        } else {
            temp = buildFunds(incomesDate, incomesTime, incomesCategory, incomesAmount);
            if (localIncomes === undefined){
                localIncomes = [temp];
            }else {
                localIncomes.push(temp);
            }
            console.log(localIncomes);
            authUserArray["incomes"] = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            $incomes.hide();
            $mainID.show();
        }
    });
    $("#exitMainIncomes").on("click", function () : void{
        $mainIncomes.slideUp("slow");
    });
    $("#incomesMainCheck").on("click", function () : void{
        let temp : IFunds;
        let incomesMainDate : string = <string>$("#incomesMainDate").val();
        let incomesMainTime : string = <string>$("#incomesMainTime").val();
        let incomesMainCategory : string = <string>$("#incomesMainCategory").val();
        let incomesMainAmount : number = <number>$("#incomesMainAmount").val();

        if (typeof incomesMainAmount === "string"){
            incomesMainAmount = parseInt(incomesMainAmount);
        }

        if (incomesMainDate === "" || incomesMainCategory === "" || isNaN(incomesMainAmount) || incomesMainTime === ""){
            alert("Fill in all the fields !!!");
        } else {
            temp = buildFunds(incomesMainDate, incomesMainTime, incomesMainCategory, incomesMainAmount);
            if (localIncomes === undefined){
                localIncomes = [temp];
            } else {
                localIncomes.push(temp);
            }
            console.log(localIncomes);
            authUserArray["incomes"] = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            $mainIncomes.slideUp("slow");
        }
    });

    $("#openExpenseHistory").on("click", function () : void{
        if (window.innerWidth >= 700){
            $incomesHistoryMain.hide();
            $mainBalance.hide();
            $mainExpense.hide();
            $mainIncomes.hide();
            $statisticsMain.hide();
            $expenseHistoryMain.removeClass(hiddenClass);
            $expenseHistoryMain.hide();
            $mainExpenseChart.hide();
            $(".anychart-credits").remove();
            $expenseHistoryMain.slideDown("slow");
            reloadExpenseMainDate();
        }else {
            reloadExpenseDate();
            $mainID.hide();
            $expenseHistory.show();
        }
    });
    $("#backInExpanseHistory").on("click", function () : void{
        reloadDate();
        $expenseHistory.hide();
        $mainID.show();
    });
    $("#openExpenseHistoryChart").on("click", function () : void{
        $(".anychart-credits").remove();
        if (checkExpenseChart){
            $expenseHistory.hide();
            $expenseHistoryChart.show();
        }
    });
    $("#backInExpanseHistoryChart").on("click", function () : void{
        $expenseHistory.show();
        $expenseHistoryChart.hide();
    });
    $("#openMainExpenseHistoryChart").on("click", function () : void{
        if (checkExpenseChart){
            $mainExpenseChart.slideDown();
        }else {
            $mainExpenseChart.slideUp();
        }
    });
    $("#exitMainExpenseHistory").on("click", function () : void{
        $expenseHistoryMain.slideUp("slow");
    });
    $expenseHistoryDateStart.on("change", function () : void{
        reloadExpenseDate();
    });
    $expenseHistoryDateEnd.on("change", function () : void{
        reloadExpenseDate();
    });
    $expenseHistoryMainDateStart.on("change", function () : void{
        reloadExpenseMainDate();
    });
    $expenseHistoryMainDateEnd.on("change", function () : void{
        reloadExpenseMainDate();
    });

    $("#openIncomesHistory").on("click", function () : void{
        if (window.innerWidth >= 700){
            $expenseHistoryMain.hide();
            $mainBalance.hide();
            $mainExpense.hide();
            $mainIncomes.hide();
            $statisticsMain.hide();
            $incomesHistoryMain.removeClass(hiddenClass);
            $incomesHistoryMain.hide();
            $mainIncomesChart.hide();
            $(".anychart-credits").remove();
            $incomesHistoryMain.slideDown("slow");
            reloadIncomesMainDate();
        }else {
            reloadIncomesDate();
            $mainID.hide();
            $incomesHistory.show();
        }
    });
    $("#backInIncomesHistory").on("click", function () : void{
        reloadDate();
        $incomesHistory.hide();
        $mainID.show();
    });
    $("#openIncomesHistoryChart").on("click", function () : void{
        $(".anychart-credits").remove();
        if (checkIncomesChart){
            $incomesHistory.hide();
            $incomesHistoryChart.show();
        }
    });
    $("#backInIncomesHistoryChart").on("click", function () : void{
        $incomesHistory.show();
        $incomesHistoryChart.hide();
    });
    $("#openMainIncomesHistoryChart").on("click", function () : void{
        if (checkIncomesChart){
            $mainIncomesChart.slideDown();
        }else {
            $mainIncomesChart.slideUp();
        }
    });
    $("#exitMainIncomesHistory").on("click", function () : void{
        $incomesHistoryMain.slideUp("slow");
    });
    $incomesHistoryDateStart.on("change", function () : void{
        reloadIncomesDate();
    });
    $incomesHistoryDateEnd.on("change", function () : void{
        reloadIncomesDate();
    });
    $incomesHistoryMainDateStart.on("change", function () : void{
        reloadIncomesMainDate();
    });
    $incomesHistoryMainDateEnd.on("change", function () : void{
        reloadIncomesMainDate();
    });

    $("#openBalance").on("click", function () : void{
        if (window.innerWidth >= 700){
            $("#amountBalanceAllMain").html(`${getAmountBalance($yearBalanceMain.val())}`);
            filingMonthAmountMain($yearBalanceMain.val());
            $incomesHistoryMain.hide();
            $expenseHistoryMain.hide();
            $mainExpense.hide();
            $mainIncomes.hide();
            $statisticsMain.hide();
            $mainBalance.removeClass(hiddenClass);
            $mainBalance.hide();
            $mainBalance.slideDown("slow");
        }else {
            $("#amountBalanceAll").html(`${getAmountBalance($yearBalance.val())}`);
            filingMonthAmount($yearBalance.val());
            $mainID.hide();
            $balance.show();
        }
    });
    $("#backInBalance").on("click", function () : void{
        $balance.hide();
        $mainID.show();
    });
    $("#yearDown").on("click", function () : void{
        $yearBalance.val(+$yearBalance.val() - 1);
        $("#amountBalanceAll").html(`${getAmountBalance($yearBalance.val())}`);
        filingMonthAmount($yearBalance.val());
    });
    $("#yearUp").on("click", function () : void{
        $yearBalance.val(+$yearBalance.val() + 1);
        $("#amountBalanceAll").html(`${getAmountBalance($yearBalance.val())}`);
        filingMonthAmount($yearBalance.val());
    });
    $yearBalance.on("change", function () : void{
        $("#amountBalanceAll").html(`${getAmountBalance($yearBalance.val())}`);
        filingMonthAmount($yearBalance.val());
    });
    $("#exitMainBalance").on("click", function () : void{
        $mainBalance.slideUp("slow");
    });
    $("#yearDownMain").on("click", function () : void{
        $yearBalanceMain.val(+$yearBalanceMain.val() - 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance($yearBalanceMain.val())}`);
        filingMonthAmountMain($yearBalanceMain.val());
    });
    $("#yearUpMain").on("click", function () : void{
        $yearBalanceMain.val(+$yearBalanceMain.val() + 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance($yearBalanceMain.val())}`);
        filingMonthAmountMain($yearBalanceMain.val());
    });
    $yearBalanceMain.on("change", function () : void{
        $("#amountBalanceAllMain").html(`${getAmountBalance($yearBalanceMain.val())}`);
        filingMonthAmountMain($yearBalanceMain.val());
    });

    $("#openStatistics").on("click", function () : void{
        if (window.innerWidth >= 700){
            $incomesHistoryMain.hide();
            $expenseHistoryMain.hide();
            $mainExpense.hide();
            $mainIncomes.hide();
            $statisticsMain.removeClass(hiddenClass);
            $statisticsMain.hide();
            $statisticsMain.slideDown("slow");
            $("#typeChartMain").on("change", function () {
                $categoryExpenseChartMain.hide();
                $categoryIncomesChartMain.hide();
            });
            $("input[name='radioMain']").on("click", function () : void{
                let typeChartMain : string = <string>$("#typeChartMain").val();
                if (typeChartMain === "Column" || typeChartMain === "Line"){
                }else {
                    if (this.id === "expenseRadioMain"){
                        $categoryIncomesChartMain.hide();
                        $categoryExpenseChartMain.show();
                    }else if(this.id === "incomesRadioMain"){
                        $categoryExpenseChartMain.hide();
                        $categoryIncomesChartMain.show();
                    }else {
                        $categoryExpenseChartMain.hide();
                        $categoryIncomesChartMain.hide();
                    }
                }
            });
        }else {
            $mainID.hide();
            $statistics.show();
            $statisticsChart.empty();
            $statisticsChart.hide();
            $("#typeChart").on("change", function () {
                $categoryExpenseChart.hide();
                $categoryIncomesChart.hide();
            });
            $("input[name='radio']").on("click", function () : void{
                let typeChart : string = <string>$("#typeChart").val();
                if (typeChart === "Column" || typeChart === "Line"){
                }else {
                    if (this.id === "expenseRadio"){
                        $categoryIncomesChart.hide();
                        $categoryExpenseChart.show();
                    }else if(this.id === "incomesRadio"){
                        $categoryExpenseChart.hide();
                        $categoryIncomesChart.show();
                    }else {
                        $categoryExpenseChart.hide();
                        $categoryIncomesChart.hide();
                    }
                }
            });
        }
    });
    $("#backInStatistics").on("click", function () : void{
        $statistics.hide();
        $mainID.show();
    });
    $("#exitStatisticsMain").on("click", function () : void{
        $statisticsMain.slideUp("slow");
        $statisticsChartMain.slideUp("slow");
    });
    $("#checkChart").on("click", function () : void{
        $statisticsChart.empty();
        let periodStart : string = <string>$("#statisticsDateStart").val();
        let periodEnd : string = <string>$("#statisticsDateEnd").val();
        let typeChart : string = <string>$("#typeChart").val();
        let expansion : any = $("input[name='radio']");
        expansion.each(function (index, element) : void{
            if(element.checked === true){
                expansion = element.id;
            }
        });
        let innerBox : string = $("#statisticsChart")[0]["id"];
        $statisticsChart.show();
        chart(typeChart, expansion, innerBox, periodStart, periodEnd);
    });
    $("#checkChartMain").on("click", function () : void{
        $statisticsChartMain.empty();
        let periodStartMain : string = <string>$("#statisticsDateStartMain").val();
        let periodEndMain : string = <string>$("#statisticsDateEndMain").val();
        let typeChartMain : string = <string>$("#typeChartMain").val();
        let expansionMain : any = $("input[name='radioMain']");
        expansionMain.each(function (index, element) : void{
            if(element.checked === true){
                expansionMain = element.id;
            }
        });
        let innerBox : string = $("#statisticsChartMain")[0]["id"];
        chart(typeChartMain, expansionMain, innerBox, periodStartMain, periodEndMain);
        $statisticsChartMain.slideDown("slow");
    });


    function chart(typeChart : string, expansion : string, innerBox : string, periodStart : string, periodEnd : string) : void{
        if (typeChart === "Pie"){
            chartPie(expansion, innerBox, periodStart, periodEnd);
        }else if (typeChart === "Column"){
            chartColumn(expansion, innerBox, periodStart, periodEnd);
        }else if (typeChart === "Line"){
            chartLine(expansion, innerBox, periodStart, periodEnd);
        }
    }


    function chartPie(expansion : string, innerBox : string, periodStart : string, periodEnd : string) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);
            let countExp : number = 0;
            countExp = amount(expenseArr, countExp);
            let countInc : number = 0;
            countInc = amount(incomesArr, countInc);
            if (countExp !== undefined || countInc !== undefined){
                let chart : any = anychart.pie([
                    {x: 'Expense', value: countExp, fill: "#FF0000"},
                    {x: 'Incomes', value: countInc, fill: "#00FF00"}
                ]);
                chart.title(`Statistics: ${periodStart} - ${periodEnd}`);
                chart.labels().position("outside");
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);

            let countFood : number = 0;
            if (window.innerWidth < 700){
                if ($("#foodChart")[0]["checked"] === true){
                    countFood = amount(searchCategory("Food", expenseArr), countFood);
                    if (countFood === undefined){
                        countFood = 0;
                    }
                }
            }else{
                if ($("#foodChartMain")[0]["checked"] === true){
                    countFood = amount(searchCategory("Food", expenseArr), countFood);
                    if (countFood === undefined){
                        countFood = 0;
                    }
                }
            }

            let countCafes : number = 0;
            if (window.innerWidth < 700){
                if ($("#cafesChart")[0]["checked"] === true){
                    countCafes = amount(searchCategory("Cafes and restaurants", expenseArr), countCafes);
                    if (countCafes === undefined){
                        countCafes = 0;
                    }
                }
            }else{
                if ($("#cafesChartMain")[0]["checked"] === true){
                    countCafes = amount(searchCategory("Cafes and restaurants", expenseArr), countCafes);
                    if (countCafes === undefined){
                        countCafes = 0;
                    }
                }
            }

            let countRelaxation : number = 0;
            if (window.innerWidth < 700){
                if ($("#relaxChart")[0]["checked"] === true){
                    countRelaxation = amount(searchCategory("Relaxation", expenseArr), countRelaxation);
                    if (countRelaxation === undefined){
                        countRelaxation = 0;
                    }
                }
            }else{
                if ($("#relaxChartMain")[0]["checked"] === true){
                    countRelaxation = amount(searchCategory("Relaxation", expenseArr), countRelaxation);
                    if (countRelaxation === undefined){
                        countRelaxation = 0;
                    }
                }
            }

            let countVehicle : number = 0;
            if (window.innerWidth < 700){
                if ($("#vehicleChart")[0]["checked"] === true){
                    countVehicle = amount(searchCategory("Vehicle", expenseArr), countVehicle);
                    if (countVehicle === undefined){
                        countVehicle = 0;
                    }
                }
            }else{
                if ($("#vehicleChartMain")[0]["checked"] === true){
                    countVehicle = amount(searchCategory("Vehicle", expenseArr), countVehicle);
                    if (countVehicle === undefined){
                        countVehicle = 0;
                    }
                }
            }

            let countCommunication : number = 0;
            if (window.innerWidth < 700){
                if ($("#communicationChart")[0]["checked"] === true){
                    countCommunication = amount(searchCategory("Communication", expenseArr), countCommunication);
                    if (countCommunication === undefined){
                        countCommunication = 0;
                    }
                }
            }else{
                if ($("#communicationChartMain")[0]["checked"] === true){
                    countCommunication = amount(searchCategory("Communication", expenseArr), countCommunication);
                    if (countCommunication === undefined){
                        countCommunication = 0;
                    }
                }
            }

            if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
                let chart : any = anychart.pie([
                    {x: 'Food', value: countFood, fill: "#e7d900"},
                    {x: 'Cafes and restaurants', value: countCafes, fill: "#00974a"},
                    {x: 'Relaxation', value: countRelaxation, fill: "#2a2986"},
                    {x: 'Vehicle', value: countVehicle, fill: "#d31a22"},
                    {x: 'Communication', value: countCommunication, fill: "#009fd9"}
                ]);
                chart.title(`Expense: ${periodStart} - ${periodEnd}`);
                chart.labels().position("outside");
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);

            let countSalary : number = 0;
            if (window.innerWidth < 700){
                if ($("#salaryChart")[0]["checked"] === true){
                    countSalary = amount(searchCategory("Salary", incomesArr), countSalary);
                    if (countSalary === undefined){
                        countSalary = 0;
                    }
                }
            }else{
                if ($("#salaryChartMain")[0]["checked"] === true){
                    countSalary = amount(searchCategory("Salary", incomesArr), countSalary);
                    if (countSalary === undefined){
                        countSalary = 0;
                    }
                }
            }

            let countPremium : number = 0;
            if (window.innerWidth < 700){
                if ($("#premiumChart")[0]["checked"] === true){
                    countPremium = amount(searchCategory("Premium", incomesArr), countPremium);
                    if (countPremium === undefined){
                        countPremium = 0;
                    }
                }
            }else{
                if ($("#premiumChartMain")[0]["checked"] === true){
                    countPremium = amount(searchCategory("Premium", incomesArr), countPremium);
                    if (countPremium === undefined){
                        countPremium = 0;
                    }
                }
            }

            let countStipend : number = 0;
            if (window.innerWidth < 700){
                if ($("#stipendChart")[0]["checked"] === true){
                    countStipend = amount(searchCategory("Stipend", incomesArr), countStipend);
                    if (countStipend === undefined){
                        countStipend = 0;
                    }
                }
            }else{
                if ($("#stipendChartMain")[0]["checked"] === true){
                    countStipend = amount(searchCategory("Stipend", incomesArr), countStipend);
                    if (countStipend === undefined){
                        countStipend = 0;
                    }
                }
            }

            if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
                let chart : any = anychart.pie([
                    {x: 'Salary', value: countSalary, fill: "#e7d900"},
                    {x: 'Premium', value: countPremium, fill: "#00974a"},
                    {x: 'Stipend', value: countStipend, fill: "#2a2986"}
                ]);
                chart.title(`Incomes: ${periodStart} - ${periodEnd}`);
                chart.labels().position("outside");
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }
    }
    function chartColumn(expansion : string, innerBox: string, periodStart : string, periodEnd : string) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);
            let countExp : number = 0;
            countExp = amount(expenseArr, countExp);
            let countInc : number = 0;
            countInc = amount(incomesArr, countInc);
            if (countExp !== undefined || countInc !== undefined){
                let data : any = [
                    {x: "Expense", value: countExp,
                        normal:   {
                            fill: "#FF0000",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: "Incomes", value: countInc,
                        normal: {
                            fill: "#00CC00",
                            stroke: null,
                            label: {enabled: true}
                        }
                    }
                ];
                let chart : any = anychart.column();
                let series : any = chart.column(data);
                chart.title(`Statistics: ${periodStart} - ${periodEnd}`);
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);

            let countFood : number = 0;
            countFood = amount(searchCategory("Food", expenseArr), countFood);
            if (countFood === undefined) {
                countFood = 0;
            }

            let countCafes : number = 0;
            countCafes = amount(searchCategory("Cafes and restaurants", expenseArr), countCafes);
            if (countCafes === undefined){
                countCafes = 0;
            }

            let countRelaxation : number = 0;
            countRelaxation = amount(searchCategory("Relaxation", expenseArr), countRelaxation);
            if (countRelaxation === undefined){
                countRelaxation = 0;
            }

            let countVehicle : number = 0;
            countVehicle = amount(searchCategory("Vehicle", expenseArr), countVehicle);
            if (countVehicle === undefined){
                countVehicle = 0;
            }

            let countCommunication : number = 0;
            countCommunication = amount(searchCategory("Communication", expenseArr), countCommunication);
            if (countCommunication === undefined){
                countCommunication = 0;
            }

            if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
                let data : any = [
                    {x: 'Food', value: countFood,
                        normal: {
                            fill: "#e7d900",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Cafes and restaurants', value: countCafes,
                        normal: {
                            fill: "#00974a",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Relaxation', value: countRelaxation,
                        normal: {
                            fill: "#2a2986",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Vehicle', value: countVehicle,
                        normal: {
                            fill: "#d31a22",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Communication', value: countCommunication,
                        normal: {
                            fill: "#009fd9",
                            stroke: null,
                            label: {enabled: true}
                        }
                    }
                ];
                let chart : any = anychart.column();
                let series : any = chart.column(data);
                chart.title(`Expense: ${periodStart} - ${periodEnd}`);
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);

            let countSalary : number = 0;
            countSalary = amount(searchCategory("Salary", incomesArr), countSalary);
            if (countSalary === undefined) {
                countSalary = 0;
            }

            let countPremium : number = 0;
            countPremium = amount(searchCategory("Premium", incomesArr), countPremium);
            if (countPremium === undefined){
                countPremium = 0;
            }

            let countStipend : number = 0;
            countStipend = amount(searchCategory("Stipend", incomesArr), countStipend);
            if (countStipend === undefined){
                countStipend = 0;
            }

            if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
                let data : any = [
                    {x: 'Salary', value: countSalary,
                        normal: {
                            fill: "#e7d900",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Premium', value: countPremium,
                        normal: {
                            fill: "#00974a",
                            stroke: null,
                            label: {enabled: true}
                        }
                    },
                    {x: 'Stipend', value: countStipend,
                        normal: {
                            fill: "#2a2986",
                            stroke: null,
                            label: {enabled: true}
                        }
                    }
                ];
                let chart : any = anychart.column();
                let series : any = chart.column(data);
                chart.title(`Incomes: ${periodStart} - ${periodEnd}`);
                chart.container(`${innerBox}`);
                chart.draw();
            }else {
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }
    }
    function chartLine(expansion : string, innerBox: string, periodStart : string, periodEnd : string) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);
            let arrData : any;

            /*arrData = [time, expense, incomes]*/
            if (periodStart === periodEnd){
                if (expenseArr !== undefined){
                    for (let i : number = 0; i < expenseArr.length; i++){
                        if (arrData === undefined){
                            arrData = [[expenseArr[i]["time"], expenseArr[i]["amount"], 0]];
                        }else{
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (expenseArr[i]["time"] === index[0]){
                                    index[1] = index[1] + expenseArr[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([expenseArr[i]["time"], expenseArr[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (incomesArr !== undefined){
                    for (let i : number = 0; i < incomesArr.length; i++){
                        if (arrData === undefined){
                            arrData = [[incomesArr[i]["time"], 0, incomesArr[i]["amount"]]];
                        }else{
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (incomesArr[i]["time"] === index[0]){
                                    index[2] = index[2] + incomesArr[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([incomesArr[i]["time"], 0,  incomesArr[i]["amount"]]);
                            }
                        }
                    }
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    let data : any = anychart.data.set(arrData);

                    let seriesData_1 : any = data.mapAs({x: 0, value: 1});
                    let seriesData_2 : any = data.mapAs({x: 0, value: 2});

                    let chart : any = anychart.line();

                    let series1 : any = chart.line(seriesData_1);
                    series1.name("Expense");
                    series1.normal().stroke("#ff0000");

                    let series2 : any = chart.line(seriesData_2);
                    series2.name("Incomes");
                    series2.normal().stroke("#00ff00");

                    chart.title(`Statistics: ${periodStart} - ${periodEnd}`);
                    chart.xAxis().title("Time");

                    chart.xAxis().staggerMode(true);
                    chart.xAxis().labels().width(100);
                    chart.xAxis().labels().hAlign("center");

                    chart.yAxis().title("Amount, UAH");
                    chart.legend(true);
                    chart.container(`${innerBox}`);
                    chart.draw()
                }else{
                    if (window.innerWidth < 700){
                        $statisticsChart.hide();
                    }else {
                        $statisticsChartMain.hide();
                    }
                    alert("No data !!");
                }
            }else{
                if (expenseArr !== undefined){
                    for (let i : number = 0; i < expenseArr.length; i++){
                        if (arrData === undefined){
                            arrData = [[expenseArr[i]["date"], expenseArr[i]["amount"], 0]];
                        }else{
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (expenseArr[i]["date"] === index[0]){
                                    index[1] = index[1] + expenseArr[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([expenseArr[i]["date"], expenseArr[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (incomesArr !== undefined){
                    for (let i : number = 0; i < incomesArr.length; i++){
                        if (arrData === undefined){
                            arrData = [[incomesArr[i]["date"], 0, incomesArr[i]["amount"] ]];
                        }else{
                            let check = false;
                            arrData.forEach(function (index) {
                                if (incomesArr[i]["date"] === index[0]){
                                    index[2] = index[2] + incomesArr[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([incomesArr[i]["date"], 0, incomesArr[i]["amount"]]);
                            }
                        }
                    }
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    let data : any = anychart.data.set(arrData);

                    let seriesData_1 : any = data.mapAs({x: 0, value: 1});
                    let seriesData_2 : any = data.mapAs({x: 0, value: 2});

                    let chart : any = anychart.line();

                    let series1 : any = chart.line(seriesData_1);
                    series1.name("Expense");
                    series1.normal().stroke("#ff0000");

                    let series2 : any = chart.line(seriesData_2);
                    series2.name("Incomes");
                    series2.normal().stroke("#00ff00");

                    chart.title(`Statistics: ${periodStart} - ${periodEnd}`);
                    chart.xAxis().title("Date");

                    chart.xAxis().staggerMode(true);
                    chart.xAxis().labels().width(100);
                    chart.xAxis().labels().hAlign("center");

                    chart.yAxis().title("Amount, UAH");
                    chart.legend(true);
                    chart.container(`${innerBox}`);
                    chart.draw()
                }else{
                    if (window.innerWidth < 700){
                        $statisticsChart.hide();
                    }else {
                        $statisticsChartMain.hide();
                    }
                    alert("No data !!");
                }
            }
        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchPeriod(periodStart, periodEnd, localExpense);

            let food : [object] = searchCategory("Food", expenseArr);
            let cafes : [object] = searchCategory("Cafes and restaurants", expenseArr);
            let relax : [object] = searchCategory("Relaxation", expenseArr);
            let vehicle : [object] = searchCategory("Vehicle", expenseArr);
            let communication : [object] = searchCategory("Communication", expenseArr);

            let arrData : any;
            /* arrData ['time', food, cafes, relax, vehicle, communication]*/
            if (periodStart === periodEnd) {
                if (food !== undefined){
                    for (let i: number = 0; i < food.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[food[i]["time"], food[i]["amount"], 0, 0, 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (food[i]["time"] === index[0]){
                                    index[1] = index[1] + food[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([food[i]["time"], food[i]["amount"], 0, 0, 0, 0]);
                            }
                        }
                    }
                }
                if (cafes !== undefined) {
                    for (let i: number = 0; i < cafes.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[cafes[i]["time"], 0, cafes[i]["amount"], 0, 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (cafes[i]["time"] === index[0]){
                                    index[2] = index[2] + cafes[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([cafes[i]["time"], 0, cafes[i]["amount"], 0, 0, 0]);
                            }
                        }
                    }
                }
                if (relax !== undefined) {
                    for (let i: number = 0; i < relax.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[relax[i]["time"], 0, 0, relax[i]["amount"], 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (relax[i]["time"] === index[0]){
                                    index[3] = index[3] + relax[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([relax[i]["time"], 0, 0, relax[i]["amount"], 0, 0]);
                            }
                        }
                    }
                }
                if (vehicle !== undefined) {
                    for (let i: number = 0; i < vehicle.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[vehicle[i]["time"], 0, 0, 0, vehicle[i]["amount"], 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (vehicle[i]["time"] === index[0]){
                                    index[4] = index[4] + vehicle[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([vehicle[i]["time"], 0, 0, 0, vehicle[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (communication !== undefined) {
                    for (let i: number = 0; i < communication.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[communication[i]["time"], 0, 0, 0, 0, communication[i]["amount"]]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (communication[i]["time"] === index[0]){
                                    index[5] = index[5] + communication[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([communication[i]["time"], 0, 0, 0, 0, communication[i]["amount"]]);
                            }
                        }
                    }
                }
            }else{
                if (food !== undefined){
                    for (let i: number = 0; i < food.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[food[i]["date"], food[i]["amount"], 0, 0, 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (food[i]["date"] === index[0]){
                                    index[1] = index[1] + food[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([food[i]["date"], food[i]["amount"], 0, 0, 0, 0]);
                            }
                        }
                    }
                }
                if (cafes !== undefined) {
                    for (let i: number = 0; i < cafes.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[cafes[i]["date"], 0, cafes[i]["amount"], 0, 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (cafes[i]["date"] === index[0]){
                                    index[2] = index[2] + cafes[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([cafes[i]["date"], 0, cafes[i]["amount"], 0, 0, 0]);
                            }
                        }
                    }
                }
                if (relax !== undefined) {
                    for (let i: number = 0; i < relax.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[relax[i]["date"], 0, 0, relax[i]["amount"], 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (relax[i]["date"] === index[0]){
                                    index[3] = index[3] + relax[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([relax[i]["date"], 0, 0, relax[i]["amount"], 0, 0]);
                            }
                        }
                    }
                }
                if (vehicle !== undefined) {
                    for (let i: number = 0; i < vehicle.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[vehicle[i]["date"], 0, 0, 0, vehicle[i]["amount"], 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (vehicle[i]["date"] === index[0]){
                                    index[4] = index[4] + vehicle[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([vehicle[i]["date"], 0, 0, 0, vehicle[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (communication !== undefined) {
                    for (let i: number = 0; i < communication.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[communication[i]["date"], 0, 0, 0, 0, communication[i]["amount"]]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (communication[i]["date"] === index[0]){
                                    index[5] = index[5] + communication[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([communication[i]["date"], 0, 0, 0, 0, communication[i]["amount"]]);
                            }
                        }
                    }
                }
            }
            if (arrData !== undefined){
                arrData = arrData.sort();
                console.log(arrData);

                let data : any = anychart.data.set(arrData);

                let seriesData_1 : any = data.mapAs({x: 0, value: 1});
                let seriesData_2 : any = data.mapAs({x: 0, value: 2});
                let seriesData_3 : any = data.mapAs({x: 0, value: 3});
                let seriesData_4 : any = data.mapAs({x: 0, value: 4});
                let seriesData_5 : any = data.mapAs({x: 0, value: 5});

                let chart : any = anychart.line();

                let series1 : any = chart.line(seriesData_1);
                series1.name("Food");
                series1.normal().stroke("#e7d900");

                let series2 : any = chart.line(seriesData_2);
                series2.name("Cafes and restaurants");
                series2.normal().stroke("#00974a");

                let series3 : any = chart.line(seriesData_3);
                series3.name("Relaxation");
                series3.normal().stroke("#2a2986");

                let series4 : any = chart.line(seriesData_4);
                series4.name("Vehicle");
                series4.normal().stroke("#d31a22");

                let series5 : any = chart.line(seriesData_5);
                series5.name("Communication");
                series5.normal().stroke("#009fd9");

                chart.title(`Expense: ${periodStart} - ${periodEnd}`);
                chart.xAxis().title("Date");

                chart.xAxis().staggerMode(true);
                chart.xAxis().labels().hAlign("center");

                chart.yAxis().title("Amount, UAH");
                chart.legend(true);
                chart.container(`${innerBox}`);
                chart.draw()
            }else{
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }

        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchPeriod(periodStart, periodEnd, localIncomes);

            let salary : [object] = searchCategory("Salary", incomesArr);
            let premium : [object] = searchCategory("Premium", incomesArr);
            let stipend : [object] = searchCategory("Stipend", incomesArr);

            let arrData : any;
            /* arrData ['time', salary, premium, stipend]*/
            if (periodStart === periodEnd) {
                if (salary !== undefined){
                    for (let i: number = 0; i < salary.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[salary[i]["time"], salary[i]["amount"], 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (salary[i]["time"] === index[0]){
                                    index[1] = index[1] + salary[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([salary[i]["time"], salary[i]["amount"], 0, 0]);
                            }
                        }
                    }
                }
                if (premium !== undefined) {
                    for (let i: number = 0; i < premium.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[premium[i]["time"], 0, premium[i]["amount"], 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (premium[i]["time"] === index[0]){
                                    index[2] = index[2] + premium[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([premium[i]["time"], 0, premium[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (stipend !== undefined) {
                    for (let i: number = 0; i < stipend.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[stipend[i]["time"], 0, 0, stipend[i]["amount"]]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (stipend[i]["time"] === index[0]){
                                    index[3] = index[3] + stipend[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([stipend[i]["time"], 0, 0, stipend[i]["amount"]]);
                            }
                        }
                    }
                }
            }else{
                if (salary !== undefined){
                    for (let i: number = 0; i < salary.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[salary[i]["date"], salary[i]["amount"], 0, 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (salary[i]["date"] === index[0]){
                                    index[1] = index[1] + salary[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([salary[i]["date"], salary[i]["amount"], 0, 0]);
                            }
                        }
                    }
                }
                if (premium !== undefined) {
                    for (let i: number = 0; i < premium.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[premium[i]["date"], 0, premium[i]["amount"], 0]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (premium[i]["date"] === index[0]){
                                    index[2] = index[2] + premium[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([premium[i]["date"], 0, premium[i]["amount"], 0]);
                            }
                        }
                    }
                }
                if (stipend !== undefined) {
                    for (let i: number = 0; i < stipend.length; i++) {
                        if (arrData === undefined) {
                            arrData = [[stipend[i]["date"], 0, 0, stipend[i]["amount"]]];
                        } else {
                            let check : boolean = false;
                            arrData.forEach(function (index) {
                                if (stipend[i]["date"] === index[0]){
                                    index[3] = index[3] + stipend[i]["amount"];
                                    check = true;
                                }
                            });
                            if (check === false){
                                arrData.push([stipend[i]["date"], 0, 0, stipend[i]["amount"]]);
                            }
                        }
                    }
                }
            }
            if (arrData !== undefined){
                arrData = arrData.sort();
                console.log(arrData);
                let data : any = anychart.data.set(arrData);

                let seriesData_1 : any = data.mapAs({x: 0, value: 1});
                let seriesData_2 : any = data.mapAs({x: 0, value: 2});
                let seriesData_3 : any = data.mapAs({x: 0, value: 3});

                let chart : any = anychart.line();

                let series1 : any = chart.line(seriesData_1);
                series1.name("Salary");
                series1.normal().stroke("#e7d900");

                let series2 : any = chart.line(seriesData_2);
                series2.name("Premium");
                series2.normal().stroke("#00974a");

                let series3 : any = chart.line(seriesData_3);
                series3.name("Stipend");
                series3.normal().stroke("#2a2986");

                chart.xAxis().title("Date");
                chart.xAxis().staggerMode(true);
                chart.xAxis().labels().hAlign("center");

                chart.yAxis().title("Amount, UAH");
                chart.title(`Incomes: ${periodStart} - ${periodEnd}`);
                chart.legend(true);
                chart.container(`${innerBox}`);
                chart.draw();
            }else{
                if (window.innerWidth < 700){
                    $statisticsChart.hide();
                }else {
                    $statisticsChartMain.hide();
                }
                alert("No data !!");
            }
        }
    }


    function expenseChart(countFood : number, countCafes : number, countRelaxation : number, countVehicle : number, countCommunication : number, start : string, end : string) : void{
        let $box : any = $("#expenseHistoryChartWrapper");
        $box.empty();
        if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
            let chart : any = anychart.pie([
                ['Food', countFood],
                ['Cafes and restaurants', countCafes],
                ['Relaxation', countRelaxation],
                ['Vehicle', countVehicle],
                ['Communication', countCommunication]
            ]);
            chart.title(`Expense: ${start} - ${end}`);
            chart.container('expenseHistoryChartWrapper');
            chart.draw();
            checkExpenseChart = true;
        }else {
            checkExpenseChart = false;
        }
    }
    function expenseChartMain(countFood : number, countCafes : number, countRelaxation : number, countVehicle : number, countCommunication : number, start : string, end : string) : void{
        $mainExpenseChart.empty();
        if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
            let chart = anychart.pie([
                ['Food', countFood],
                ['Cafes and restaurants', countCafes],
                ['Relaxation', countRelaxation],
                ['Vehicle', countVehicle],
                ['Communication', countCommunication]
            ]);
            chart.title(`Expense chart: ${start} - ${end}`);
            chart.container('mainExpenseChart');
            chart.draw();
            checkExpenseChart = true;
        }else {
            checkExpenseChart = false;
        }
    }
    function incomesChart(countSalary : number, countPremium : number, countStipend : number, start : string, end : string) : void{
        let $box : any = $("#incomesHistoryChartWrapper");
        $box.empty();
        if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
            let chart : any = anychart.pie([
                ['Salary', countSalary],
                ['Premium', countPremium],
                ['Stipend', countStipend]
            ]);
            chart.title(`Incomes: ${start} - ${end}`);
            chart.container('incomesHistoryChartWrapper');
            chart.draw();
            checkIncomesChart = true;
        }else {
            checkIncomesChart = false;
        }
    }
    function incomesChartMain(countSalary : number, countPremium : number, countStipend : number, start : string, end : string) : void{
        $mainIncomesChart.empty();
        if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
            let chart = anychart.pie([
                ['Salary', countSalary],
                ['Premium', countPremium],
                ['Stipend', countStipend]
            ]);
            chart.title(`Incomes chart: ${start} - ${end}`);
            chart.container('mainIncomesChart');
            chart.draw();
            checkIncomesChart = true;
        }else{
            checkIncomesChart = false;
        }
    }


    function getExpenseAmountDay() : void{
        if (localExpense !== undefined){
            let localExpenseDay : [object] ;
            let day : string = currentDay();
            localExpenseDay = searchDay(day, localExpense);
            let count : number = 0;
            if (localExpenseDay !== undefined){
                count = amount(localExpenseDay, count);
                $("#amountExpenseDay").html(`${count}`);
            }else {
                $("#amountExpenseDay").html(`${count}`);
            }
        }
    }
    function getExpenseAmountWeek() : void{
        if (localExpense !== undefined) {
            let localExpenseWeek : [object];
            let weekStart : string = getMonday(new Date());
            let weekEnd : string = getSunday(new Date());
            localExpenseWeek = searchPeriod(weekStart, weekEnd, localExpense);
            let count : number = 0;
            if (localExpenseWeek !== undefined){
                count = amount(localExpenseWeek, count);
                $("#amountExpenseWeek").html(`${count}`);
            }else{
                $("#amountExpenseWeek").html(`${count}`);
            }
        }
    }
    function getExpenseAmountMonth() : void{
        if (localExpense !== undefined){
            let localExpenseMonth : [object];
            let monthStart : string = getCurrentMonthStart(new Date());
            let monthEnd : string = getCurrentMonthEnd(new Date());
            localExpenseMonth = searchPeriod(monthStart, monthEnd, localExpense);
            let count : number = 0;
            if (localExpenseMonth !== undefined){
                count = amount(localExpenseMonth, count);
                $("#amountExpenseMonth").html(`${count}`);
            }else {
                $("#amountExpenseMonth").html(`${count}`);
            }
        }
    }
    function getHistoryExpensePeriod(innerBox : any, start : string, end : string, amountAll : any) : void{
        innerBox.empty();
        let localExpensePeriod : [object];
        localExpensePeriod = searchPeriod(start, end, localExpense);
        console.log(localExpensePeriod);
        let food : [object];
        let cafes : [object];
        let relaxation : [object];
        let vehicle : [object];
        let communication : [object];
        food = searchCategory("Food", localExpensePeriod);
        cafes = searchCategory("Cafes and restaurants", localExpensePeriod);
        relaxation = searchCategory("Relaxation", localExpensePeriod);
        vehicle = searchCategory("Vehicle", localExpensePeriod);
        communication = searchCategory("Communication", localExpensePeriod);
        let countFood : number = 0;
        if (food !== undefined){
            countFood = amount(food, countFood);
        }
        let countCafes : number = 0;
        if (cafes !== undefined){
            countCafes = amount(cafes, countCafes);
        }
        let countRelaxation : number = 0;
        if (relaxation !== undefined){
            countRelaxation = amount(relaxation, countRelaxation);
        }
        let countVehicle : number = 0;
        if (vehicle !== undefined){
            countVehicle = amount(vehicle, countVehicle);
        }
        let countCommunication : number = 0;
        if (communication !== undefined){
            countCommunication = amount(communication, countCommunication);
        }

        expenseChartMain(countFood, countCafes, countRelaxation, countVehicle, countCommunication, start, end);
        expenseChart(countFood, countCafes, countRelaxation, countVehicle, countCommunication, start, end);
        if (!checkExpenseChart){
            $mainExpenseChart.slideUp();
        }
        let countAll : number = 0;
        countAll = countFood + countCafes + countRelaxation + countVehicle + countCommunication;
        if (countAll === undefined){
            countAll = 0;
        }
        amountAll.html(`${countAll}`);
        if (food !== undefined){
            innerBox.html(`<div id="food" class="history-item">Food<span>${countFood}</span></div>
                           <div id="itemDetailFood" class="box-hidden detail-line"></div>`);
        }
        if (cafes !== undefined){
            innerBox.append(`<div id="cafes" class="history-item">Cafes and restaurants<span>${countCafes}</span></div>
                               <div id="itemDetailCafes" class="box-hidden detail-line"></div>`);
        }
        if (relaxation !== undefined){
            innerBox.append(`<div id="relaxation" class="history-item">Relaxation<span>${countRelaxation}</span></div>
                           <div id="itemDetailRelaxation" class="box-hidden detail-line"></div>`);
        }
        if (vehicle !== undefined){
            innerBox.append(`<div id="vehicle" class="history-item">Vehicle<span>${countVehicle}</span></div>
                               <div id="itemDetailVehicle" class="box-hidden detail-line"></div>`);
        }
        if (communication !== undefined){
            innerBox.append(`<div id="communication" class="history-item">Communication<span>${countCommunication}</span></div>
                               <div id="itemDetailCommunication" class="box-hidden detail-line"></div>`);
        }
        $("#food").on("click", function () : void{
            openDetailItem($("#itemDetailFood"), food, "food");
            let $arrBtn : any = $("button[id^='delfood']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelExpenseBtn($arrBtn, this, food, localExpense);
            });
        });
        $("#cafes").on("click", function () : void{
            openDetailItem($("#itemDetailCafes"), cafes, "cafes");
            let $arrBtn : any = $("button[id^='delcafes']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelExpenseBtn($arrBtn, this, cafes, localExpense);
            });
        });
        $("#relaxation").on("click", function () : void{
            openDetailItem($("#itemDetailRelaxation"), relaxation, "relaxation");
            let $arrBtn : any = $("button[id^='delrelaxation']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelExpenseBtn($arrBtn, this, relaxation, localExpense);
            });
        });
        $("#vehicle").on("click", function () : void{
            openDetailItem($("#itemDetailVehicle"), vehicle, "vehicle");
            let $arrBtn : any = $("button[id^='delvehicle']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelExpenseBtn($arrBtn, this, vehicle, localExpense);
            });
        });
        $("#communication").on("click", function () : void{
            openDetailItem($("#itemDetailCommunication"), communication, "communication");
            let $arrBtn : any = $("button[id^='delcommunication']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelExpenseBtn($arrBtn, this, communication, localExpense);
            });
        });
    }

    function getIncomesAmountDay() : void{
        if (localIncomes !== undefined){
            let localIncomesDay : [object];
            let day : string = currentDay();
            localIncomesDay = searchDay(day, localIncomes);
            let count : number = 0;
            if (localIncomesDay !== undefined){
                count = amount(localIncomesDay, count);
                $("#amountIncomesDay").html(`${count}`);
            }else {
                $("#amountIncomesDay").html(`${count}`);
            }
        }
    }
    function getIncomesAmountWeek() : void{
        if (localIncomes !== undefined){
            let localIncomesWeek : [object];
            let weekStart : string = getMonday(new Date());
            let weekEnd : string = getSunday(new Date());
            localIncomesWeek = searchPeriod(weekStart, weekEnd, localIncomes);
            let count : number = 0;
            if (localIncomesWeek !== undefined) {
                count = amount(localIncomesWeek, count);
                $("#amountIncomesWeek").html(`${count}`);
            }else {
                $("#amountIncomesWeek").html(`${count}`);
            }
        }
    }
    function getIncomesAmountMonth() : void{
        if (localIncomes !== undefined){
            let localIncomesMonth : [object];
            let monthStart : string = getCurrentMonthStart(new Date());
            let monthEnd : string = getCurrentMonthEnd(new Date());
            localIncomesMonth = searchPeriod(monthStart, monthEnd, localIncomes);
            let count : number = 0;
            if (localIncomesMonth !== undefined){
                count = amount(localIncomesMonth, count);
                $("#amountIncomesMonth").html(`${count}`);
            }else{
                $("#amountIncomesMonth").html(`${count}`);
            }
        }
    }
    function getHistoryIncomesPeriod(innerBox : any, start : string, end : string, amountAll : any) : void{
        innerBox.empty();
        let localIncomesPeriod : [object];
        localIncomesPeriod = searchPeriod(start, end, localIncomes);
        let countAll : number = 0;
        console.log(localIncomesPeriod);
        let salary : [object];
        let premium : [object];
        let stipend : [object];
        salary = searchCategory("Salary", localIncomesPeriod);
        premium = searchCategory("Premium", localIncomesPeriod);
        stipend = searchCategory("Stipend", localIncomesPeriod);
        let countSalary : number = 0;
        if (salary !== undefined){
            countSalary = amount(salary, countSalary);
        }
        let countPremium : number = 0;
        if (premium !== undefined){
            countPremium = amount(premium, countPremium);
        }
        let countStipend : number = 0;
        if (stipend !== undefined){
            countStipend = amount(stipend, countStipend);
        }
        incomesChartMain(countSalary, countPremium, countStipend, start, end);
        incomesChart(countSalary, countPremium, countStipend, start, end);
        if (!checkIncomesChart){
            $mainIncomesChart.slideUp();
        }

        countAll = countSalary + countPremium + countStipend;
        if (countAll === undefined){
            countAll = 0;
        }
        amountAll.html(`${countAll}`);
        if (salary !== undefined){
            innerBox.html(`<div id="salary" class="history-item">Salary<span>${countSalary}</span></div>
                           <div id="itemDetailSalary" class="box-hidden detail-line"></div>`);
        }
        if (premium !== undefined){
            innerBox.append(`<div id="premium" class="history-item">Premium<span>${countPremium}</span></div>
                               <div id="itemDetailPremium" class="box-hidden detail-line"></div>`);
        }
        if (stipend !== undefined){
            innerBox.append(`<div id="stipend" class="history-item">Stipend<span>${countStipend}</span></div>
                           <div id="itemDetailStipend" class="box-hidden detail-line"></div>`);
        }
        $("#salary").on("click", function () : void{
            openDetailItem($("#itemDetailSalary"), salary, "salary");
            let $arrBtn : any = $("button[id^='delsalary']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelIncomesBtn($arrBtn, this, salary, localIncomes);
            });
        });
        $("#premium").on("click", function () : void{
            openDetailItem($("#itemDetailPremium"), premium, "premium");
            let $arrBtn : any = $("button[id^='delpremium']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelIncomesBtn($arrBtn, this, premium, localIncomes);
            });
        });
        $("#stipend").on("click", function () : void{
            openDetailItem($("#itemDetailStipend"), stipend, "stipend");
            let $arrBtn : any = $("button[id^='delstipend']");
            console.log($arrBtn);
            $arrBtn.on("click", function () : void{
                searchDelIncomesBtn($arrBtn, this, stipend, localIncomes);
            });
        });
    }

    function getAmountBalance(year : string) : number{
        console.log(localExpense);
        console.log(localIncomes);
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchPeriod(`${year}-01-01`, `${year}-12-31`, localExpense);
        incomesYear = searchPeriod(`${year}-01-01`, `${year}-12-31`, localIncomes);
        countAllExpense = amount(expenseYear, countAllExpense);
        countAllIncomes = amount(incomesYear, countAllIncomes);

        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }

        return countAllIncomes - countAllExpense;
    }
    function amountBalance(monthStart : string, monthEnd : string) : number{
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchPeriod(`${monthStart}`, `${monthEnd}`, localExpense);
        incomesYear = searchPeriod(`${monthStart}`, `${monthEnd}`, localIncomes);
        countAllExpense = amount(expenseYear, countAllExpense);
        countAllIncomes = amount(incomesYear, countAllIncomes);
        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }
        return countAllIncomes - countAllExpense;
    }
    function getAmountBalanceMonth(monthStart : string, monthEnd : string, year : string) : number{
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, localExpense);
        incomesYear = searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, localIncomes);
        countAllExpense = amount(expenseYear, countAllExpense);
        countAllIncomes = amount(incomesYear, countAllIncomes);
        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }
        return countAllIncomes - countAllExpense;
    }

    function filingMonthAmount(year : string) : void{
        $("#january").html(`${getAmountBalanceMonth("01-01", "01-31", year)}`);
        $("#february").html(`${getAmountBalanceMonth("02-01", "02-28", year)}`);
        $("#march").html(`${getAmountBalanceMonth("03-01", "03-31", year)}`);
        $("#april").html(`${getAmountBalanceMonth("04-01", "04-30", year)}`);
        $("#may ").html(`${getAmountBalanceMonth("05-01", "05-31", year)}`);
        $("#june").html(`${getAmountBalanceMonth("06-01", "06-30", year)}`);
        $("#july").html(`${getAmountBalanceMonth("07-01", "07-31", year)}`);
        $("#august").html(`${getAmountBalanceMonth("08-01", "08-31", year)}`);
        $("#september").html(`${getAmountBalanceMonth("09-01", "09-30", year)}`);
        $("#october").html(`${getAmountBalanceMonth("10-01", "10-31", year)}`);
        $("#november").html(`${getAmountBalanceMonth("11-01", "11-30", year)}`);
        $("#december").html(`${getAmountBalanceMonth("12-01", "12-31", year)}`);
    }
    function filingMonthAmountMain(year : string) : void{
        $("#januaryMain").html(`${getAmountBalanceMonth("01-01", "01-31", year)}`);
        $("#februaryMain").html(`${getAmountBalanceMonth("02-01", "02-28", year)}`);
        $("#marchMain").html(`${getAmountBalanceMonth("03-01", "03-31", year)}`);
        $("#aprilMain").html(`${getAmountBalanceMonth("04-01", "04-30", year)}`);
        $("#mayMain").html(`${getAmountBalanceMonth("05-01", "05-31", year)}`);
        $("#juneMain").html(`${getAmountBalanceMonth("06-01", "06-30", year)}`);
        $("#julyMain").html(`${getAmountBalanceMonth("07-01", "07-31", year)}`);
        $("#augustMain").html(`${getAmountBalanceMonth("08-01", "08-31", year)}`);
        $("#septemberMain").html(`${getAmountBalanceMonth("09-01", "09-30", year)}`);
        $("#octoberMain").html(`${getAmountBalanceMonth("10-01", "10-31", year)}`);
        $("#novemberMain").html(`${getAmountBalanceMonth("11-01", "11-30", year)}`);
        $("#decemberMain").html(`${getAmountBalanceMonth("12-01", "12-31", year)}`);
    }

    function openDetailItem(itemIDDetailBox : any, arrayCateg : [object], nameCateg : string) : void{
        console.log(arrayCateg);
        itemIDDetailBox.empty();
        for (let i : number = 0; i < arrayCateg.length; i++){
            itemIDDetailBox.append(`<div id="${i}" class="detail-item">
                                            <div class="item-wrapper">
                                                <div>${arrayCateg[i]["date"]}  ${arrayCateg[i]["time"]}</div>
                                                <span>${arrayCateg[i]["amount"]}</span>
                                                <button type="button" id="del${nameCateg}${i}" class="item-delete-btn"><i class="fas fa-minus"></i></button>
                                                </div>
                                       </div>`);
        }
        itemIDDetailBox.slideDown("slow");
    }
    function searchDelExpenseBtn(arrayBtn : any, thisBtn : any, arrayCateg : [object], globalArr : [object]) : void{
        console.log(thisBtn);
        console.log(arrayCateg);
        for (let i : number = 0; i < arrayBtn.length; i++){
            if(arrayBtn[i].id === thisBtn.id){
                console.log(arrayCateg[i]);
                searchDelExpenseItem(arrayCateg[i]["date"], arrayCateg[i]["time"], arrayCateg[i]["category"],
                    arrayCateg[i]["amount"], globalArr);
            }
        }
        console.log(arrayCateg);
    }
    function searchDelIncomesBtn(arrayBtn : any, thisBtn : any, arrayCateg : [object], globalArr : [object]) : void{
        console.log(thisBtn);
        console.log(arrayCateg);
        for (let i : number = 0; i < arrayBtn.length; i++){
            if(arrayBtn[i].id === thisBtn.id){
                console.log(arrayCateg[i]);
                searchDelIncomesItem(arrayCateg[i]["date"], arrayCateg[i]["time"], arrayCateg[i]["category"],
                    arrayCateg[i]["amount"], globalArr);
            }
        } console.log(arrayCateg);
    }
    function searchDelExpenseItem(date : string, time : string, name : string, amount : number, array : [object]) : void{
        for (let i : number = 0; i < array.length; i++){
            if (array[i]["date"] === date && array[i]["time"] === time && array[i]["category"] === name && array[i]["amount"] === amount){
                let index : number = array.indexOf(array[i]);
                console.log(index);
                array.splice(index, 1);
                authUserArray["expense"] = array;
                localStorage.setItem("authUser", JSON.stringify(authUserArray));
                currentExpenseWindow();
            }
        }
    }
    function searchDelIncomesItem(date : string, time : string, name : string, amount : number, array : [object]) : void{
        for (let i : number = 0; i < array.length; i++){
            if (array[i]["date"] === date && array[i]["time"] === time && array[i]["category"] === name && array[i]["amount"] === amount){
                let index : number = array.indexOf(array[i]);
                console.log(index);
                array.splice(index, 1);
                authUserArray["incomes"] = array;
                localStorage.setItem("authUser", JSON.stringify(authUserArray));
                currentIncomesWindow();
            }
        }
    }

    function amount(array : [object], count : number) : number {
        if (array !== undefined){
            for (let i : number = 0; i < array.length; i++){
                count = count + array[i]["amount"];
            }
            return count;
        }
    }

    function getCurrentYear() : number{
        let currentYear : any = new Date();
        currentYear = currentYear.getFullYear();
        return currentYear;
    }
    function getCurrentMonthStart(d : any) : string{
        d = new Date(d);
        let monthStart : any = new Date(d.getFullYear(), d.getMonth(), 1);
        let monthDay : string | number = monthStart.getDate();
        let month : string | number = monthStart.getMonth()+1;
        if (monthDay < 10){
            monthDay = "0" + monthDay;
        }
        if (month < 10){
            month = "0" + month;
        }
        month = monthStart.getFullYear() + "-" + month + "-" + monthDay;
        return month;
    }
    function getCurrentMonthEnd(d : any) : string{
        d = new Date(d);
        let monthEnd : any = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        let monthDay : string | number = monthEnd.getDate();
        let month : string | number = monthEnd.getMonth()+1;
        if (monthDay < 10){
            monthDay = "0" + monthDay;
        }
        if (month < 10){
            month = "0" + month;
        }
        month = monthEnd.getFullYear() + "-" + month + "-" + monthDay;
        return month;
    }
    function getMonday(d : any) : string{ /* пошук першого дня в тижні*/
        let day : number = d.getDay();
        if (day === 0){
            day = 7;
        }
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 1);
        let weekDay : string | number = d.getDate();
        let weekMonth : string | number = d.getMonth() + 1;
        if (weekDay < 10){
            weekDay = "0" + weekDay;
        }
        if (weekMonth < 10){
            weekMonth = "0" + weekMonth;
        }
        d = d.getFullYear() + "-" + weekMonth + "-" + weekDay;
        return d;
    }
    function getSunday(d : any) : string{
        let day : number = d.getDay();
        if (day === 0){
            day = 7;
        }
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 7);
        let weekDay : string | number = d.getDate();
        let weekMonth : string | number = d.getMonth() + 1;
        if (weekDay < 10){
            weekDay = "0" + weekDay;
        }
        if (weekMonth < 10){
            weekMonth = "0" + weekMonth;
        }
        d = d.getFullYear() + "-" + weekMonth + "-" + weekDay;
        return d;
    }
    function currentDay() : string{
        let currentDay : any = new Date();
        let day : string | number = currentDay.getDate();
        let month : string | number = currentDay.getMonth() + 1;
        let year : string | number = currentDay.getFullYear();
        if (month < 10) {
            month = "0"+month;
        }
        if (day < 10){
            day = "0"+day;
        }
        currentDay = year + "-" + month + "-" + day;
        return currentDay;
    }
    function currentTime() : string{
        let currentTime : any = new Date();
        let hour : string | number = currentTime.getHours();
        let minutes : string | number = currentTime.getMinutes();
        if (hour < 10){
            hour  = "0" + hour;
        }
        if(minutes < 10){
            minutes = "0"+ minutes;
        }
        currentTime = hour + ":" + minutes;
        return currentTime
    }

    function searchCategory(name : string, array : [object]) : [object]{
        if (array !== undefined){
            var newArray : [object];
            for (let i : number = 0; i < array.length; i++){
                if(array[i]["category"] === name){
                    if (newArray === undefined){
                        newArray = [array[i]];
                    }else {
                        newArray.push(array[i]);
                    }
                }
            }
            return newArray;
        }
    }
    function searchPeriod(start : string, end : string, array : [object]) : [object]{
        var newArray : [object];
        if (array !== undefined){
            for (let i : number = 0; i < array.length; i++){
                if (array[i]["date"] >= start && array[i]["date"] <= end){
                    if (newArray === undefined){
                        newArray = [array[i]];
                    }else {
                        newArray.push(array[i]);
                    }
                }
            }
            console.log(newArray);
            return newArray;
        }
    }
    function searchDay(day : string, array : [object]) : [object]{
        var newArray : [object] ;
        for (let i : number = 0; i < array.length; i++){
            if (array[i]["date"] === day){
                if (newArray === undefined){
                    newArray = [array[i]];
                }else {
                    newArray.push(array[i]);
                }
            }
        }
        return newArray;
    }

    function searchUser (email : string) : void{
        for (let i : number = 0; i < userArray.length; i++){
            if (email === userArray[i]["useremail"]) {
                userArray[i] = authUserArray;
            }
        }
    }

    function currentExpenseWindow() : void{
        if (window.innerWidth >= 700){
            reloadDate();
            reloadExpenseMainDate();
        }else {
            reloadExpenseDate();
        }
    }
    function currentIncomesWindow() : void{
        if (window.innerWidth >= 700){
            reloadDate();
            reloadIncomesMainDate();
        }else {
            reloadIncomesDate();
        }
    }

    function reloadExpenseMainDate() : void{
        getHistoryExpensePeriod($("#historyExpenseMainPeriod"), $expenseHistoryMainDateStart.val(),
            $expenseHistoryMainDateEnd.val(), $("#amountExpenseHistoryMainAll"));
    }
    function reloadExpenseDate() : void{
        getHistoryExpensePeriod($("#historyExpensePeriod"), $expenseHistoryDateStart.val(),
            $expenseHistoryDateEnd.val(), $("#amountExpenseHistoryAll"));
    }
    function reloadIncomesMainDate() : void{
        getHistoryIncomesPeriod($("#historyIncomesMainPeriod"), $incomesHistoryMainDateStart.val(),
            $incomesHistoryMainDateEnd.val(), $("#amountIncomesHistoryMainAll"));
    }
    function reloadIncomesDate() : void{
        getHistoryIncomesPeriod($("#historyIncomesPeriod"), $incomesHistoryDateStart.val(),
            $incomesHistoryDateEnd.val(), $("#amountIncomesHistoryAll"));
    }
    function reloadDate() : void{
        getExpenseAmountDay(); /*вивід суми витрат за поточний день*/
        getExpenseAmountWeek(); /*вивід суми витрат за поточний тиждень*/
        getExpenseAmountMonth(); /*вивід суми витрат за поточний Місяць*/

        getIncomesAmountDay(); /*вивід суми доходів за поточний день*/
        getIncomesAmountWeek(); /*вивід суми доходів за поточний тиждень*/
        getIncomesAmountMonth(); /*вивід суми доходів за поточний Місяць*/


        $("#amountBalance").html(`${amountBalance(getCurrentMonthStart(new Date()), getCurrentMonthEnd(new Date()))}`);/* вивід поточного балансу */
    }


    interface IFunds {
        date : string;
        time : string;
        category : string;
        amount : number;
    }

    function buildFunds(date: string, time: string, category: string, amount: number ): IFunds {
        return {
             date : date,
             time : time,
             category : category,
             amount : amount };
    }
});