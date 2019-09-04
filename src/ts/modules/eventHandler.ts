define(['jquery', 'reloadData', 'historyMethod', 'amountMethod', 'chartMethod', 'searchMethod'], function ($ , reloadData, historyMethod, amountMethod, chartMethod, searchMethod) : object{
    let handler : object = {};

    const $hamburger : any = $("#hamburger");

    const $mainID : any = $("#main");
    const $expense : any = $("#expense");
    const $mainExpense : any = $("#mainExpense");
    const $expenseHistory : any = $("#expenseHistory");
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


    handler["handlers"] = function (userArray : [object], authUser : object, expenseArr : [object], incomesArr : [object]) : void{
        let Site : any = {
            init: function() : void{
                this.bindEventHandlers();
            },
            bindEventHandlers: function() : void{
                for (let i = 0; i < this.eventHandlers.length; i++) {
                    this.bindEvent(this.eventHandlers[i]);
                }
            },
            bindEvent: function(e) : void{
                e.$el.on(e.event, e.handler);
                console.log('Bound ' + e.event + ' handler for', e.$el);
            },
            eventHandlers: [
                {
                    $el: $(window),
                    event: "resize",
                    handler: function() : void{
                        if (this.innerWidth < 700){
                            $mainExpense.hide();
                            $expenseHistoryMain.hide();
                            $mainIncomes.hide();
                            $incomesHistoryMain.hide();
                            $mainBalance.hide();
                            $statisticsMain.hide();
                        }else {
                            $expense.hide();
                            $incomes.hide();
                            $expenseHistory.hide();
                            $incomesHistory.hide();
                            $balance.hide();
                            $statistics.hide();
                            $mainID.show()
                        }
                    }
                },
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
                },
                {
                    $el: $("#addExpense"),
                    event: "click",
                    handler: function() : void{
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
                    }
                },
                {
                    $el: $("#backInExpanse"),
                    event: "click",
                    handler: function() : void{
                        reloadData.reloadMain(expenseArr, incomesArr);
                        $expense.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#expenseCheck"),
                    event: "click",
                    handler: function() : void{
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
                            if (expenseArr === undefined){
                                expenseArr = [temp];
                            }else {
                                expenseArr.push(temp);
                            }
                            console.log(expenseArr);
                            authUser["expense"] = expenseArr;
                            localStorage.setItem("authUser", JSON.stringify(authUser));

                            reloadData.reloadMain(expenseArr, incomesArr);

                            $expense.hide();
                            $mainID.show();
                        }
                    }
                },
                {
                    $el: $("#exitMainExpense"),
                    event: "click",
                    handler: function() : void{
                        $mainExpense.slideUp("slow");
                    }
                },
                {
                    $el: $("#expenseMainCheck"),
                    event: "click",
                    handler: function() : void{
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
                            if (expenseArr === undefined){
                                expenseArr = [temp];
                            }else {
                                expenseArr.push(temp);
                            }
                            console.log(expenseArr);
                            authUser["expense"] = expenseArr;
                            localStorage.setItem("authUser", JSON.stringify(authUser));

                            reloadData.reloadMain(expenseArr, incomesArr);

                            $mainExpense.slideUp("slow");
                        }
                    }
                },
                {
                    $el: $("#addIncomes"),
                    event: "click",
                    handler: function() : void{
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
                    }
                },
                {
                    $el: $("#backInIncomes"),
                    event: "click",
                    handler: function() : void{
                        reloadData.reloadMain(expenseArr, incomesArr);
                        $incomes.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#incomesCheck"),
                    event: "click",
                    handler: function() : void{
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
                            if (incomesArr === undefined){
                                incomesArr = [temp];
                            }else {
                                incomesArr.push(temp);
                            }
                            console.log(incomesArr);
                            authUser["incomes"] = incomesArr;
                            localStorage.setItem("authUser", JSON.stringify(authUser));
                            reloadData.reloadMain(expenseArr, incomesArr);
                            $incomes.hide();
                            $mainID.show();
                        }
                    }
                },
                {
                    $el: $("#exitMainIncomes"),
                    event: "click",
                    handler: function() : void{
                        $mainIncomes.slideUp("slow");
                    }
                },
                {
                    $el: $("#incomesMainCheck"),
                    event: "click",
                    handler: function() : void{
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
                            if (incomesArr === undefined){
                                incomesArr = [temp];
                            } else {
                                incomesArr.push(temp);
                            }
                            console.log(incomesArr);
                            authUser["incomes"] = incomesArr;
                            localStorage.setItem("authUser", JSON.stringify(authUser));
                            reloadData.reloadMain(expenseArr, incomesArr);
                            $mainIncomes.slideUp("slow");
                        }
                    }
                },
                {
                    $el: $("#openExpenseHistory"),
                    event: "click",
                    handler: function() : void{
                        if (window.innerWidth >= 700){
                            $incomesHistoryMain.hide();
                            $mainBalance.hide();
                            $mainExpense.hide();
                            $mainIncomes.hide();
                            $statisticsMain.hide();
                            $expenseHistoryMain.removeClass(hiddenClass);
                            $expenseHistoryMain.hide();
                            $expenseHistoryMain.slideDown("slow");
                            historyMethod.historyExpense($("#historyExpenseMainPeriod"), <string>$expenseHistoryMainDateStart.val(), <string>$expenseHistoryMainDateEnd.val(), $("#amountExpenseHistoryMainAll"), expenseArr, authUser, expenseArr, incomesArr);
                        }else {
                            historyMethod.historyExpense($("#historyExpensePeriod"), <string>$expenseHistoryDateStart.val(), <string>$expenseHistoryDateEnd.val(), $("#amountExpenseHistoryAll"), expenseArr, authUser, expenseArr, incomesArr);
                            $mainID.hide();
                            $expenseHistory.show();
                        }
                    }
                },
                {
                    $el: $("#backInExpanseHistory"),
                    event: "click",
                    handler: function() : void{
                        reloadData.reloadMain(expenseArr, incomesArr);
                        $expenseHistory.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#exitMainExpenseHistory"),
                    event: "click",
                    handler: function() : void{
                        $expenseHistoryMain.slideUp("slow");
                    }
                },
                {
                    $el: $("input[name='expenseHistoryDate']"),
                    event: "change",
                    handler: function() : void{
                        historyMethod.historyExpense($("#historyExpensePeriod"), <string>$expenseHistoryDateStart.val(), <string>$expenseHistoryDateEnd.val(), $("#amountExpenseHistoryAll"), expenseArr, authUser, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("input[name='expenseHistoryDateMain']"),
                    event: "change",
                    handler: function() : void{
                        historyMethod.historyExpense($("#historyExpenseMainPeriod"), <string>$expenseHistoryMainDateStart.val(), <string>$expenseHistoryMainDateEnd.val(), $("#amountExpenseHistoryMainAll"), expenseArr, authUser, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#openIncomesHistory"),
                    event: "click",
                    handler: function() : void{
                        if (window.innerWidth >= 700){
                            $expenseHistoryMain.hide();
                            $mainBalance.hide();
                            $mainExpense.hide();
                            $mainIncomes.hide();
                            $statisticsMain.hide();
                            $incomesHistoryMain.removeClass(hiddenClass);
                            $incomesHistoryMain.hide();
                            $incomesHistoryMain.slideDown("slow");
                            historyMethod.historyIncomes($("#historyIncomesMainPeriod"), <string>$incomesHistoryMainDateStart.val(), <string>$incomesHistoryMainDateEnd.val(), $("#amountIncomesHistoryMainAll"), incomesArr, authUser, expenseArr, incomesArr);
                        }else {
                            historyMethod.historyIncomes($("#historyIncomesPeriod"), <string>$incomesHistoryDateStart.val(), <string>$incomesHistoryDateEnd.val(), $("#amountIncomesHistoryAll"), incomesArr, authUser, expenseArr, incomesArr);
                            $mainID.hide();
                            $incomesHistory.show();
                        }
                    }
                },
                {
                    $el: $("#backInIncomesHistory"),
                    event: "click",
                    handler: function() : void{
                        reloadData.reloadMain(expenseArr, incomesArr);
                        $incomesHistory.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#exitMainIncomesHistory"),
                    event: "click",
                    handler: function() : void{
                        $incomesHistoryMain.slideUp("slow");
                    }
                },
                {
                    $el: $("input[name='incomesHistoryDate']"),
                    event: "change",
                    handler: function() : void{
                        historyMethod.historyIncomes($("#historyIncomesPeriod"), <string>$incomesHistoryDateStart.val(), <string>$incomesHistoryDateEnd.val(), $("#amountIncomesHistoryAll"), incomesArr, authUser, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("input[name='incomesHistoryDateMain']"),
                    event: "change",
                    handler: function() : void{
                        historyMethod.historyIncomes($("#historyIncomesMainPeriod"), <string>$incomesHistoryMainDateStart.val(), <string>$incomesHistoryMainDateEnd.val(), $("#amountIncomesHistoryMainAll"), incomesArr, authUser, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#openBalance"),
                    event: "click",
                    handler: function() : void{
                        if (window.innerWidth >= 700){
                            $("#amountBalanceAllMain").html(`${amountMethod.getYearBalance($yearBalanceMain.val(), expenseArr, incomesArr)}`);
                            amountMethod.filingMonthAmountMain($yearBalanceMain.val(), expenseArr, incomesArr);
                            $incomesHistoryMain.hide();
                            $expenseHistoryMain.hide();
                            $mainExpense.hide();
                            $mainIncomes.hide();
                            $statisticsMain.hide();
                            $mainBalance.removeClass(hiddenClass);
                            $mainBalance.hide();
                            $mainBalance.slideDown("slow");
                        }else {
                            $("#amountBalanceAll").html(`${amountMethod.getYearBalance($yearBalance.val(), expenseArr, incomesArr)}`);
                            amountMethod.filingMonthAmount($yearBalance.val(), expenseArr, incomesArr);
                            $mainID.hide();
                            $balance.show();
                        }
                    }
                },
                {
                    $el: $("#backInBalance"),
                    event: "click",
                    handler: function() : void{
                        $balance.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#yearDown"),
                    event: "click",
                    handler: function() : void{
                        $yearBalance.val(+$yearBalance.val() - 1);
                        $("#amountBalanceAll").html(`${amountMethod.getYearBalance($yearBalance.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmount($yearBalance.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#yearUp"),
                    event: "click",
                    handler: function() : void{
                        $yearBalance.val(+$yearBalance.val() + 1);
                        $("#amountBalanceAll").html(`${amountMethod.getYearBalance($yearBalance.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmount($yearBalance.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el: $yearBalance,
                    event: "change",
                    handler: function() : void{
                        $("#amountBalanceAll").html(`${amountMethod.getYearBalance($yearBalance.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmount($yearBalance.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#exitMainBalance"),
                    event: "click",
                    handler: function() : void{
                        $mainBalance.slideUp("slow");
                    }
                },
                {
                    $el: $("#yearDownMain"),
                    event: "click",
                    handler: function() : void{
                        $yearBalanceMain.val(+$yearBalanceMain.val() - 1);
                        $("#amountBalanceAllMain").html(`${amountMethod.getYearBalance($yearBalanceMain.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmountMain($yearBalanceMain.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el:  $("#yearUpMain"),
                    event: "click",
                    handler: function() : void{
                        $yearBalanceMain.val(+$yearBalanceMain.val() + 1);
                        $("#amountBalanceAllMain").html(`${amountMethod.getYearBalance($yearBalanceMain.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmountMain($yearBalanceMain.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el: $yearBalanceMain,
                    event: "change",
                    handler: function() : void{
                        $("#amountBalanceAllMain").html(`${amountMethod.getYearBalance($yearBalanceMain.val(), expenseArr, incomesArr)}`);
                        amountMethod.filingMonthAmountMain($yearBalanceMain.val(), expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#openStatistics"),
                    event: "click",
                    handler: function() : void{
                        if (window.innerWidth >= 700){
                            $incomesHistoryMain.hide();
                            $expenseHistoryMain.hide();
                            $mainExpense.hide();
                            $mainIncomes.hide();
                            $mainBalance.hide();
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
                    }
                },
                {
                    $el: $("#backInStatistics"),
                    event: "click",
                    handler: function() : void{
                        $statistics.hide();
                        $mainID.show();
                    }
                },
                {
                    $el: $("#exitStatisticsMain"),
                    event: "click",
                    handler: function() : void{
                        $statisticsMain.slideUp("slow");
                        $statisticsChartMain.slideUp("slow");
                    }
                },
                {
                    $el: $("#checkChart"),
                    event: "click",
                    handler: function() : void{
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
                        chartMethod.createChart(typeChart, expansion, $statisticsChart, periodStart, periodEnd, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#checkChartMain"),
                    event: "click",
                    handler: function() : void{
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
                        chartMethod.createChart(typeChartMain, expansionMain, $statisticsChartMain,  periodStartMain, periodEndMain, expenseArr, incomesArr);
                    }
                },
                {
                    $el: $("#signOut"),
                    event: "click",
                    handler: function() : void{
                        userArray = searchMethod.searchUser(authUser["useremail"], userArray, authUser);
                        localStorage.setItem("users", JSON.stringify(userArray));
                        localStorage.removeItem("authUser");
                        window.location.href = "src/views/signIN.html";
                    }
                }
                // {
                //     $el: ,
                //     event: ,
                //     handler: function() : void{
                //
                //     }
                // }
            ]
        };
        Site.init();
    };

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

    return handler;
});
