define(['jquery', 'amountMethod', 'getDate'], function ($, amountMethod, getDate) : object {
    let reloadMethods: object = {};

    reloadMethods["reloadMain"] = (arrExpense: [object], arrIncomes: [object]): void => {
        amountMethod.getAmountDay(arrExpense, $("#amountExpenseDay")); /*вивід суми витрат за поточний день*/
        amountMethod.getAmountWeek(arrExpense, $("#amountExpenseWeek")); /*вивід суми витрат за поточний тиждень*/
        amountMethod.getAmountMonth(arrExpense, $("#amountExpenseMonth")); /*вивід суми витрат за поточний Місяць*/

        amountMethod.getAmountDay(arrIncomes, $("#amountIncomesDay")); /*вивід суми доходів за поточний день*/
        amountMethod.getAmountWeek(arrIncomes, $("#amountIncomesWeek")); /*вивід суми доходів за поточний тиждень*/
        amountMethod.getAmountMonth(arrIncomes, $("#amountIncomesMonth"));/*вивід суми доходів за поточний Місяць*/

        $("#amountBalance").html(`${amountMethod.getAmountBalance(getDate.getCurrentMonthStart(new Date()), getDate.getCurrentMonthEnd(new Date()), arrExpense, arrIncomes)}`);/* вивід поточного балансу */
    };

    return reloadMethods;
});