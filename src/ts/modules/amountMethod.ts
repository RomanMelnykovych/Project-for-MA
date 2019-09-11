define(['jquery', 'getDate', 'searchMethod'], function ($, getDate, searchMethod) : object{
    let amountMethods : object = {};

    amountMethods["amount"] = (array : [object], count : number) : number =>{
        if (array !== undefined){
            for (let i : number = 0; i < array.length; i++){
                count = count + array[i]["amount"];
            }
            return count;
        }
    };
    amountMethods["getAmountDay"] = (array : [object], $innerBox : any) : void =>{
        if (array !== undefined){
            let localDay : [object] ;
            let day : string = getDate.currentDay();
            localDay = searchMethod.searchDay(day, array);
            let count : number = 0;
            if (localDay !== undefined){
                count = amountMethods["amount"](localDay, count);
                $innerBox.html(`${count}`);
            }else {
                $innerBox.html(`${count}`);
            }
        }
    };
    amountMethods["getAmountWeek"] = (array : [object], $innerBox : any) : void =>{
        if (array !== undefined) {
            let localExpenseWeek : [object];
            let weekStart : string = getDate.getMonday(new Date());
            let weekEnd : string = getDate.getSunday(new Date());
            localExpenseWeek = searchMethod.searchPeriod(weekStart, weekEnd, array);
            let count : number = 0;
            if (localExpenseWeek !== undefined){
                count = amountMethods["amount"](localExpenseWeek, count);
                $innerBox.html(`${count}`);
            }else{
                $innerBox.html(`${count}`);
            }
        }
    };
    amountMethods["getAmountMonth"] = (array : [object], $innerBox : any) : void =>{
        if (array !== undefined){
            let localExpenseMonth : [object];
            let monthStart : string = getDate.getCurrentMonthStart(new Date());
            let monthEnd : string = getDate.getCurrentMonthEnd(new Date());
            localExpenseMonth = searchMethod.searchPeriod(monthStart, monthEnd, array);
            let count : number = 0;
            if (localExpenseMonth !== undefined){
                count = amountMethods["amount"](localExpenseMonth, count);
                $innerBox.html(`${count}`);
            }else {
                $innerBox.html(`${count}`);
            }
        }
    };
    amountMethods["getYearBalance"] = (year : string, arrExpense : [object], arrIncomes : [object]) : number =>{
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchMethod.searchPeriod(`${year}-01-01`, `${year}-12-31`, arrExpense);
        incomesYear = searchMethod.searchPeriod(`${year}-01-01`, `${year}-12-31`, arrIncomes);
        countAllExpense = amountMethods["amount"](expenseYear, countAllExpense);
        countAllIncomes = amountMethods["amount"](incomesYear, countAllIncomes);
        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }
        return countAllIncomes - countAllExpense;
    };
    amountMethods["getAmountBalance"] = (monthStart : string, monthEnd : string, arrExpense : [object], arrIncomes : [object]) : number =>{
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchMethod.searchPeriod(`${monthStart}`, `${monthEnd}`, arrExpense);
        incomesYear = searchMethod.searchPeriod(`${monthStart}`, `${monthEnd}`, arrIncomes);
        countAllExpense = amountMethods["amount"](expenseYear, countAllExpense);
        countAllIncomes = amountMethods["amount"](incomesYear, countAllIncomes);
        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }
        return countAllIncomes - countAllExpense;
    };
    amountMethods["getAmountBalanceMonth"] = (monthStart : string, monthEnd : string, year : string, arrExpense : [object], arrIncomes : [object]) : number =>{
        let countAllExpense : number = 0;
        let countAllIncomes : number = 0;
        let expenseYear : [object];
        let incomesYear : [object];
        expenseYear = searchMethod.searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, arrExpense);
        incomesYear = searchMethod.searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, arrIncomes);
        countAllExpense = amountMethods["amount"](expenseYear, countAllExpense);
        countAllIncomes = amountMethods["amount"](incomesYear, countAllIncomes);
        if (countAllExpense === undefined){
            countAllExpense = 0;
        }
        if (countAllIncomes === undefined){
            countAllIncomes = 0;
        }
        return countAllIncomes - countAllExpense;
    };
    amountMethods["filingMonthAmountMain"] = function (year : string, arrExpense : [object], arrIncomes : [object]) : void{
        $("#januaryMain").html(`${amountMethods["getAmountBalanceMonth"]("01-01", "01-31", year, arrExpense, arrIncomes)}`);
        $("#februaryMain").html(`${amountMethods["getAmountBalanceMonth"]("02-01", "02-28", year, arrExpense, arrIncomes)}`);
        $("#marchMain").html(`${amountMethods["getAmountBalanceMonth"]("03-01", "03-31", year, arrExpense, arrIncomes)}`);
        $("#aprilMain").html(`${amountMethods["getAmountBalanceMonth"]("04-01", "04-30", year, arrExpense, arrIncomes)}`);
        $("#mayMain").html(`${amountMethods["getAmountBalanceMonth"]("05-01", "05-31", year, arrExpense, arrIncomes)}`);
        $("#juneMain").html(`${amountMethods["getAmountBalanceMonth"]("06-01", "06-30", year, arrExpense, arrIncomes)}`);
        $("#julyMain").html(`${amountMethods["getAmountBalanceMonth"]("07-01", "07-31", year, arrExpense, arrIncomes)}`);
        $("#augustMain").html(`${amountMethods["getAmountBalanceMonth"]("08-01", "08-31", year, arrExpense, arrIncomes)}`);
        $("#septemberMain").html(`${amountMethods["getAmountBalanceMonth"]("09-01", "09-30", year, arrExpense, arrIncomes)}`);
        $("#octoberMain").html(`${amountMethods["getAmountBalanceMonth"]("10-01", "10-31", year, arrExpense, arrIncomes)}`);
        $("#novemberMain").html(`${amountMethods["getAmountBalanceMonth"]("11-01", "11-30", year, arrExpense, arrIncomes)}`);
        $("#decemberMain").html(`${amountMethods["getAmountBalanceMonth"]("12-01", "12-31", year, arrExpense, arrIncomes)}`);
    };
    amountMethods["filingMonthAmount"] = (year : string, arrExpense : [object], arrIncomes : [object]) : void =>{
        $("#january").html(`${amountMethods["getAmountBalanceMonth"]("01-01", "01-31", year, arrExpense, arrIncomes)}`);
        $("#february").html(`${amountMethods["getAmountBalanceMonth"]("02-01", "02-28", year, arrExpense, arrIncomes)}`);
        $("#march").html(`${amountMethods["getAmountBalanceMonth"]("03-01", "03-31", year, arrExpense, arrIncomes)}`);
        $("#april").html(`${amountMethods["getAmountBalanceMonth"]("04-01", "04-30", year, arrExpense, arrIncomes)}`);
        $("#may ").html(`${amountMethods["getAmountBalanceMonth"]("05-01", "05-31", year, arrExpense, arrIncomes)}`);
        $("#june").html(`${amountMethods["getAmountBalanceMonth"]("06-01", "06-30", year, arrExpense, arrIncomes)}`);
        $("#july").html(`${amountMethods["getAmountBalanceMonth"]("07-01", "07-31", year, arrExpense, arrIncomes)}`);
        $("#august").html(`${amountMethods["getAmountBalanceMonth"]("08-01", "08-31", year, arrExpense, arrIncomes)}`);
        $("#september").html(`${amountMethods["getAmountBalanceMonth"]("09-01", "09-30", year, arrExpense, arrIncomes)}`);
        $("#october").html(`${amountMethods["getAmountBalanceMonth"]("10-01", "10-31", year, arrExpense, arrIncomes)}`);
        $("#november").html(`${amountMethods["getAmountBalanceMonth"]("11-01", "11-30", year, arrExpense, arrIncomes)}`);
        $("#december").html(`${amountMethods["getAmountBalanceMonth"]("12-01", "12-31", year, arrExpense, arrIncomes)}`);
    };

    return amountMethods;

});