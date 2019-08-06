/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/anychart/dist/index.d.ts" />

if (!localStorage.getItem("authUser")){
    window.location.href = "../views/signIN.html";
}

$(document).ready(function () : void{
    // let body : any = $("body"); /* Видалення обєктів від сайту zzz.com*/
    // body[0].childNodes[0].remove();
    // body[0].childNodes[0].remove();
    // $(".cbalink").remove()

    $(window).on("resize", function() : void{
        if (this.innerWidth < 700){
            mainExpense.hide();
            expenseHistoryMain.hide();
            mainIncomes.hide();
            incomesHistoryMain.hide();
            mainBalance.hide();
        }else {
            expenseHistoryChart.hide();
            incomesHistoryChart.hide();
            expense.hide();
            incomes.hide();
            expenseHistory.hide();
            incomesHistory.hide();
            balance.hide();
            mainID.show()
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

    const mainID : any = $("#main");
    const hamburger : any = $("#hamburger");
    const expense : any = $("#expense");
    const mainExpense : any = $("#mainExpense");
    const expenseHistory : any = $("#expenseHistory");
    const expenseHistoryChart : any = $("#expenseHistoryChart");
    const mainExpenseChart : any = $("#mainExpenseChart");
    const incomesHistoryChart : any = $("#incomesHistoryChart");
    const mainIncomesChart : any = $("#mainIncomesChart");
    const expenseHistoryMain : any = $("#expenseHistoryMain");
    const incomes : any = $("#incomes");
    const mainIncomes : any = $("#mainIncomes");
    const incomesHistory : any = $("#incomesHistory");
    const incomesHistoryMain : any = $("#incomesHistoryMain");
    const balance : any = $("#balance");
    const mainBalance : any = $("#mainBalance");

    let yearBalance : any = $("#yearBalance");
    let yearBalanceMain : any = $("#yearBalanceMain");
    let expenseHistoryDateStart : any = $("#expenseHistoryDateStart");
    let expenseHistoryDateEnd : any =  $("#expenseHistoryDateEnd");
    let expenseHistoryMainDateStart : any = $("#expenseHistoryMainDateStart");
    let expenseHistoryMainDateEnd : any = $("#expenseHistoryMainDateEnd");
    let incomesHistoryDateStart : any = $("#incomesHistoryDateStart");
    let incomesHistoryDateEnd : any =  $("#incomesHistoryDateEnd");
    let incomesHistoryMainDateStart : any = $("#incomesHistoryMainDateStart");
    let incomesHistoryMainDateEnd : any = $("#incomesHistoryMainDateEnd");

    reloadDate();

    $("input[type='date']").val(currentDay()); /*Заповнення полів input із type="date" сьогоднішньою датою*/
    $("input[type='time']").val(currentTime()); /*Заповнення полів input із type="time" поточним часом*/
    $("input[id^='year']").val(getCurrentYear());

    $("#hamburgerOpen").on("click", function () : void{
        hamburger.css("width", "75%");
        $(".social__developer").show();
        $(".user__info").show();
    });
    $("#hamburgerOff").on("click", function () : void{
        hamburger.css("width", "0");
        $(".user__info").hide(100);
        $(".social__developer").hide(100);
    });

    $("#signOut").on("click", function () : void{
        // searchUser(authUserArray["useremail"]);
        // localStorage.setItem("users", JSON.stringify(userArray));
        localStorage.removeItem("authUser");
        window.location.href = "../views/signIN.html";
    });

    $("#addExpense").on("click", function() : void{
        if (window.innerWidth >= 700){
            expenseHistoryMain.hide();
            incomesHistoryMain.hide();
            mainBalance.hide();
            mainIncomes.hide();
            mainExpense.removeClass("hidden");
            mainExpense.hide();
            mainExpense.slideDown("slow");
        }else {
            mainID.hide();
            expense.show();
        }
    });
    $("#backInExpanse").on("click", function () : void{
        reloadDate();
        expense.hide();
        mainID.show();
    });
    $("#expenseCheck").on("click", function () : void{
        let temp : Funds;
        let expenseDate : string | number | string[] = $("#expenseDate").val();
        let expenseTime : string | number | string[] = $("#expenseTime").val();
        let expenseCategory : string | number | string[] = $("#expenseCategory").val();
        let expenseAmount : string | number | string[] = $("#expenseAmount").val();

        if (typeof expenseAmount === "string") {
            expenseAmount = parseInt(expenseAmount);
        }

        if (expenseDate === "" || expenseCategory === "" || isNaN(<number>expenseAmount) || expenseTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            temp = new Funds(expenseDate, expenseTime, expenseCategory, expenseAmount);
            if (localExpense === undefined){
                localExpense = [temp];
            }else {
                let i : number = localExpense.length;
                localExpense[i] = temp;
            }
            console.log(localExpense);
            authUserArray["expense"] = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            expense.hide();
            mainID.show();
        }
    });
    $("#exitMainExpense").on("click", function () : void{
        mainExpense.slideUp("slow");
    });
    $("#expenseMainCheck").on("click", function () : void{
        let temp : Funds;
        let expenseMainDate : string | number | string[] = $("#expenseMainDate").val();
        let expenseMainTime : string | number | string[] = $("#expenseMainTime").val();
        let expenseMainCategory : string | number | string[] = $("#expenseMainCategory").val();
        let expenseMainAmount : string | number | string[] = $("#expenseMainAmount").val();

        if (typeof expenseMainAmount === "string") {
            expenseMainAmount = parseInt(expenseMainAmount);
        }

        if (expenseMainDate === "" || expenseMainCategory === "" || isNaN(<number>expenseMainAmount) || expenseMainTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            temp = new Funds(expenseMainDate, expenseMainTime, expenseMainCategory, expenseMainAmount);
            if (localExpense === undefined){
                localExpense = [temp];
            }else {
                let i : number = localExpense.length;
                localExpense[i] = temp;
            }
            console.log(localExpense);
            authUserArray["expense"] = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            mainExpense.slideUp("slow");
        }
    });

    $("#addIncomes").on("click", function () : void{
        if (window.innerWidth >= 700){
            expenseHistoryMain.hide();
            incomesHistoryMain.hide();
            mainBalance.hide();
            mainExpense.hide();
            mainIncomes.removeClass("hidden");
            mainIncomes.hide();
            mainIncomes.slideDown("slow");
        }else {
            mainID.hide();
            incomes.show();
        }
    });
    $("#backInIncomes").on("click", function () : void{
        reloadDate();
        incomes.hide();
        mainID.show();
    });
    $("#incomesCheck").on("click", function () : void{
        let temp : Funds;
        let incomesDate : string | number | string[] = $("#incomesDate").val();
        let incomesTime : string | number | string[] = $("#incomesTime").val();
        let incomesCategory : string | number | string[] = $("#incomesCategory").val();
        let incomesAmount : string | number | string[] = $("#incomesAmount").val();

        if (typeof incomesAmount === "string"){
            incomesAmount = parseInt(incomesAmount);
        }

        if (incomesDate === "" || incomesCategory === "" || isNaN(<number>incomesAmount) || incomesTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            temp = new Funds(incomesDate, incomesTime, incomesCategory, incomesAmount);
            if (localIncomes === undefined){
                localIncomes = [temp];
            }else {
                let i : number = localIncomes.length;
                localIncomes.push(temp);
            }
            console.log(localIncomes);
            authUserArray["incomes"] = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            incomes.hide();
            mainID.show();
        }
    });
    $("#exitMainIncomes").on("click", function () : void{
        mainIncomes.slideUp("slow");
    });
    $("#incomesMainCheck").on("click", function () : void{
        let temp : Funds;
        let incomesMainDate : string | number | string[] = $("#incomesMainDate").val();
        let incomesMainTime : string | number | string[] = $("#incomesMainTime").val();
        let incomesMainCategory : string | number | string[] = $("#incomesMainCategory").val();
        let incomesMainAmount : string | number | string[] = $("#incomesMainAmount").val();

        if (typeof incomesMainAmount === "string"){
            incomesMainAmount = parseInt(incomesMainAmount);
        }

        if (incomesMainDate === "" || incomesMainCategory === "" || isNaN(<number>incomesMainAmount) || incomesMainTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            temp = new Funds(incomesMainDate, incomesMainTime, incomesMainCategory, incomesMainAmount);
            if (localIncomes === undefined){
                localIncomes = [temp];
            } else {
                let i : number = localIncomes.length;
                localIncomes.push(temp);
            }
            console.log(localIncomes);
            authUserArray["incomes"] = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            mainIncomes.slideUp("slow");
        }
    });

    $("#openExpenseHistory").on("click", function () : void{
        if (window.innerWidth >= 700){
            incomesHistoryMain.hide();
            mainBalance.hide();
            mainExpense.hide();
            mainIncomes.hide();
            expenseHistoryMain.removeClass("hidden");
            expenseHistoryMain.hide();
            expenseHistoryMain.slideDown("slow");
            reloadExpenseMainDate();
            mainExpenseChart.hide();
            $(".anychart-credits").remove();
        }else {
            reloadExpenseDate();
            mainID.hide();
            expenseHistory.show();
        }
    });
    $("#backInExpanseHistory").on("click", function () : void{
        reloadDate();
        expenseHistory.hide();
        mainID.show();
    });
    $("#openExpenseHistoryChart").on("click", function () : void{
        $(".anychart-credits").remove();
        if (checkExpenseChart){
            expenseHistory.hide();
            expenseHistoryChart.show();
        }
    });
    $("#backInExpanseHistoryChart").on("click", function () : void{
        expenseHistory.show();
        expenseHistoryChart.hide();
    });
    $("#openMainExpenseHistoryChart").on("click", function () : void{
        if (checkExpenseChart){
            mainExpenseChart.slideDown();
        }else {
            mainExpenseChart.slideUp();
        }
    });
    $("#exitMainExpenseHistory").on("click", function () : void{
        expenseHistoryMain.slideUp("slow");
    });
    expenseHistoryDateStart.on("change", function () : void{
        reloadExpenseDate();
    });
    expenseHistoryDateEnd.on("change", function () : void{
        reloadExpenseDate();
    });
    expenseHistoryMainDateStart.on("change", function () : void{
        reloadExpenseMainDate();
    });
    expenseHistoryMainDateEnd.on("change", function () : void{
        reloadExpenseMainDate();
    });

    $("#openIncomesHistory").on("click", function () : void{
        if (window.innerWidth >= 700){
            expenseHistoryMain.hide();
            mainBalance.hide();
            mainExpense.hide();
            mainIncomes.hide();
            incomesHistoryMain.removeClass("hidden");
            incomesHistoryMain.hide();
            incomesHistoryMain.slideDown("slow");
            reloadIncomesMainDate();
            mainExpenseChart.hide();
            $(".anychart-credits").remove();
        }else {
            reloadIncomesDate();
            mainID.hide();
            incomesHistory.show();
        }
    });
    $("#backInIncomesHistory").on("click", function () : void{
        reloadDate();
        incomesHistory.hide();
        mainID.show();
    });
    $("#openIncomesHistoryChart").on("click", function () : void{
        $(".anychart-credits").remove();
        if (checkIncomesChart){
            incomesHistory.hide();
            incomesHistoryChart.show();
        }
    });
    $("#backInIncomesHistoryChart").on("click", function () : void{
        incomesHistory.show();
        incomesHistoryChart.hide();
    });
    $("#openMainIncomesHistoryChart").on("click", function () : void{
        if (checkIncomesChart){
            mainIncomesChart.slideDown();
        }else {
            mainIncomesChart.slideUp();
        }
    });
    $("#exitMainIncomesHistory").on("click", function () : void{
        incomesHistoryMain.slideUp("slow");
    });
    incomesHistoryDateStart.on("change", function () : void{
        reloadIncomesDate();
    });
    incomesHistoryDateEnd.on("change", function () : void{
        reloadIncomesDate();
    });
    incomesHistoryMainDateStart.on("change", function () : void{
        reloadIncomesMainDate();
    });
    incomesHistoryMainDateEnd.on("change", function () : void{
        reloadIncomesMainDate();
    });

    $("#openBalance").on("click", function () : void{
        if (window.innerWidth >= 700){
            $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
            filingMonthAmountMain(yearBalanceMain.val());
            incomesHistoryMain.hide();
            expenseHistoryMain.hide();
            mainExpense.hide();
            mainIncomes.hide();
            mainBalance.removeClass("hidden");
            mainBalance.hide();
            mainBalance.slideDown("slow");
        }else {
            $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
            filingMonthAmount(yearBalance.val());
            mainID.hide();
            balance.show();
        }
    });
    $("#backInBalance").on("click", function () : void{
        balance.hide();
        mainID.show();
    });
    $("#yearDown").on("click", function () : void{
        yearBalance.val(yearBalance.val() - 1);
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    $("#yearUp").on("click", function () : void{
        yearBalance.val(+yearBalance.val() + 1);
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    yearBalance.on("change", function () : void{
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    $("#exitMainBalance").on("click", function () : void{
        mainBalance.slideUp("slow");
    });
    $("#yearDownMain").on("click", function () : void{
        yearBalanceMain.val(yearBalanceMain.val() - 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });
    $("#yearUpMain").on("click", function () : void{
        yearBalanceMain.val(+yearBalanceMain.val() + 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });
    yearBalanceMain.on("change", function () : void{
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });

    function expenseChart(countFood : number, countCafes : number, countRelaxation : number, countVehicle : number, countCommunication : number, start : string, end : string) : void{
        let box : any = $("#expenseHistoryChartWrapper");
        box.html("");
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
        mainExpenseChart.html("");
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
        let box : any = $("#incomesHistoryChartWrapper");
        box.html("");
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
        mainIncomesChart.html("");
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
        innerBox.html("");
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
            mainExpenseChart.slideUp();
        }
        let countAll : number = 0;
        countAll = countFood + countCafes + countRelaxation + countVehicle + countCommunication;
        if (countAll === undefined){
            countAll = 0;
        }
        amountAll.html(`${countAll}`);
        if (food !== undefined){
            innerBox.html(`<div id="food" class="history__item">Food<span>${countFood}</span></div>
                           <div id="itemDetailFood" class="hidden detail__line"></div>`);
        }
        if (cafes !== undefined){
            innerBox.append(`<div id="cafes" class="history__item">Cafes and restaurants<span>${countCafes}</span></div>
                               <div id="itemDetailCafes" class="hidden detail__line"></div>`);
        }
        if (relaxation !== undefined){
            innerBox.append(`<div id="relaxation" class="history__item">Relaxation<span>${countRelaxation}</span></div>
                           <div id="itemDetailRelaxation" class="hidden detail__line"></div>`);
        }
        if (vehicle !== undefined){
            innerBox.append(`<div id="vehicle" class="history__item">Vehicle<span>${countVehicle}</span></div>
                               <div id="itemDetailVehicle" class="hidden detail__line"></div>`);
        }
        if (communication !== undefined){
            innerBox.append(`<div id="communication" class="history__item">Communication<span>${countCommunication}</span></div>
                               <div id="itemDetailCommunication" class="hidden detail__line"></div>`);
        }
        $("#food").on("click", function () : void{
            openDetailItem($("#itemDetailFood"), food, "food");
            let arrBtn : any = $("button[id^='delfood']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelExpenseBtn(arrBtn, this, food, localExpense);
            });
        });
        $("#cafes").on("click", function () : void{
            openDetailItem($("#itemDetailCafes"), cafes, "cafes");
            let arrBtn : any = $("button[id^='delcafes']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelExpenseBtn(arrBtn, this, cafes, localExpense);
            });
        });
        $("#relaxation").on("click", function () : void{
            openDetailItem($("#itemDetailRelaxation"), relaxation, "relaxation");
            let arrBtn : any = $("button[id^='delrelaxation']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelExpenseBtn(arrBtn, this, relaxation, localExpense);
            });
        });
        $("#vehicle").on("click", function () : void{
            openDetailItem($("#itemDetailVehicle"), vehicle, "vehicle");
            let arrBtn : any = $("button[id^='delvehicle']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelExpenseBtn(arrBtn, this, vehicle, localExpense);
            });
        });
        $("#communication").on("click", function () : void{
            openDetailItem($("#itemDetailCommunication"), communication, "communication");
            let arrBtn : any = $("button[id^='delcommunication']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelExpenseBtn(arrBtn, this, communication, localExpense);
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
        innerBox.html("");
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
            mainIncomesChart.slideUp();
        }


        countAll = countSalary + countPremium + countStipend;
        if (countAll === undefined){
            countAll = 0;
        }
        amountAll.html(`${countAll}`);
        if (salary !== undefined){
            innerBox.html(`<div id="salary" class="history__item">Salary<span>${countSalary}</span></div>
                           <div id="itemDetailSalary" class="hidden detail__line"></div>`);
        }
        if (premium !== undefined){
            innerBox.append(`<div id="premium" class="history__item">Premium<span>${countPremium}</span></div>
                               <div id="itemDetailPremium" class="hidden detail__line"></div>`);
        }
        if (stipend !== undefined){
            innerBox.append(`<div id="stipend" class="history__item">Stipend<span>${countStipend}</span></div>
                           <div id="itemDetailStipend" class="hidden detail__line"></div>`);
        }
        $("#salary").on("click", function () : void{
            openDetailItem($("#itemDetailSalary"), salary, "salary");
            let arrBtn : any = $("button[id^='delsalary']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelIncomesBtn(arrBtn, this, salary, localIncomes);
            });
        });
        $("#premium").on("click", function () : void{
            openDetailItem($("#itemDetailPremium"), premium, "premium");
            let arrBtn : any = $("button[id^='delpremium']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelIncomesBtn(arrBtn, this, premium, localIncomes);
            });
        });
        $("#stipend").on("click", function () : void{
            openDetailItem($("#itemDetailStipend"), stipend, "stipend");
            let arrBtn : any = $("button[id^='delstipend']");
            console.log(arrBtn);
            arrBtn.on("click", function () : void{
                searchDelIncomesBtn(arrBtn, this, stipend, localIncomes);
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
        itemIDDetailBox.html("");
        for (let i : number = 0; i < arrayCateg.length; i++){
            itemIDDetailBox.append(`<div id="${i}" class="item__detail">
                                            <div class="item__wrapper">
                                                <div>${arrayCateg[i]["date"]}  ${arrayCateg[i]["time"]}</div>
                                                <span>${arrayCateg[i]["amount"]}</span>
                                                <button type="button" id="del${nameCateg}${i}" class="btn__delete"><i class="fas fa-minus"></i></button>
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
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 1);
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
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 7);
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
        getHistoryExpensePeriod($("#historyExpenseMainPeriod"), expenseHistoryMainDateStart.val(),
            expenseHistoryMainDateEnd.val(), $("#amountExpenseHistoryMainAll"));
    }
    function reloadExpenseDate() : void{
        getHistoryExpensePeriod($("#historyExpensePeriod"), expenseHistoryDateStart.val(),
            expenseHistoryDateEnd.val(), $("#amountExpenseHistoryAll"));
    }
    function reloadIncomesMainDate() : void{
        getHistoryIncomesPeriod($("#historyIncomesMainPeriod"), incomesHistoryMainDateStart.val(),
            incomesHistoryMainDateEnd.val(), $("#amountIncomesHistoryMainAll"));
    }
    function reloadIncomesDate() : void{
        getHistoryIncomesPeriod($("#historyIncomesPeriod"), incomesHistoryDateStart.val(),
            incomesHistoryDateEnd.val(), $("#amountIncomesHistoryAll"));
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

    class Funds {
        date : string;
        time : string;
        category : string;
        amount : number;

        constructor(date, time, category, amount){
            this.date = date;
            this.time = time;
            this.category = category;
            this.amount = amount;
        }
    }
});