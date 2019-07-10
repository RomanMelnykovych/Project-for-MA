if (!localStorage.getItem("authUser")){
    window.location.href = "views/login.html";
}

var mainID = document.getElementById("main");
var hamburger = document.getElementById("hamburger");
var expense = document.getElementById("expense");
var expenseHistory = document.getElementById("expenseHistory");
var incomes = document.getElementById("incomes");
var incomesHistory = document.getElementById("incomesHistory");
var balance = document.getElementById("balance");

window.onload = function () {
    getExpenseAmountDay();
    getExpenseAmountWeek();
    getExpenseAmountMonth();

    getIncomesAmountDay();
    getIncomesAmountWeek();
    getIncomesAmountMonth();
};


var userArray =[]; /*дані всіх юзерів*/
if (localStorage.getItem("users" ) !== undefined){
    userArray = JSON.parse(localStorage.getItem("users"));
    console.log(userArray);
    if (userArray === null){
        userArray = [];
        console.log(userArray);
    }
}

var authUserArray = []; /*дані авторизованого юзера*/
authUserArray = JSON.parse(localStorage.getItem("authUser"));
console.log(authUserArray);
document.getElementById("nameUser").innerHTML = `Name :  ${authUserArray.username}`;

var localExpense = []; /* список затрат авторизованого юзера*/
if (authUserArray.exspense){
    localExpense = authUserArray.exspense;
}
var localIncomes = []; /* список доходів авторизованого юзера*/
if (authUserArray.incomes){
    localIncomes = authUserArray.incomes;
}

document.getElementById("expenseCheck").onclick = function(){
    var authUserExpense = {};
    authUserExpense.date = document.getElementById("expenseDate").value;
    authUserExpense.category = document.getElementById("expenseCategory").value;
    authUserExpense.amount = document.getElementById("expenseAmount").value;
    console.log(authUserExpense);
    let i = localExpense.length;
    localExpense[i] = authUserExpense;
    console.log(localExpense);
    authUserArray.exspense = localExpense;
    localStorage.setItem("authUser", JSON.stringify(authUserArray));

    getExpenseAmountDay();
    getExpenseAmountWeek();
    getExpenseAmountMonth();

    expense.className = "hidden";
    mainID.className = "off__hidden";
};

document.getElementById("incomesCheck").onclick = function(){
    var authUserIncomes = {};
    authUserIncomes.date = document.getElementById("incomesDate").value;
    authUserIncomes.category = document.getElementById("incomesCategory").value;
    authUserIncomes.amount = document.getElementById("incomesAmount").value;
    console.log(authUserIncomes);
    let i = localIncomes.length;
    localIncomes[i] = authUserIncomes;
    console.log(localIncomes);
    authUserArray.incomes = localIncomes;
    localStorage.setItem("authUser", JSON.stringify(authUserArray));

    getIncomesAmountDay();
    getIncomesAmountWeek();
    getIncomesAmountMonth();

    incomes.className = "hidden";
    mainID.className = "off__hidden";
};


document.getElementById("hamburgerOpen").onclick = function () {
    hamburger.className = "off__hidden";
};
document.getElementById("hamburgerOff").onclick = function () {
    hamburger.className = "hidden";
};

document.getElementById("addExpense").onclick = function(){
    expense.className = "off__hidden";
    mainID.className = "hidden";
};
document.getElementById("backInExpanse").onclick = function(){
    expense.className = "hidden";
    mainID.className = "off__hidden";
};
document.getElementById("openExpenseHistory").onclick = function(){
    expenseHistory.className = "off__hidden";
    mainID.className = "hidden";
};
document.getElementById("backInExpanseHistory").onclick = function(){
    expenseHistory.className = "hidden";
    mainID.className = "off__hidden";
};

document.getElementById("addIncomes").onclick = function(){
    incomes.className = "off__hidden";
    mainID.className = "hidden";
};
document.getElementById("backInIncomes").onclick = function(){
    incomes.className = "hidden";
    mainID.className = "off__hidden";
};
document.getElementById("openIncomesHistory").onclick = function(){
    incomesHistory.className = "off__hidden";
    mainID.className = "hidden";
};
document.getElementById("backInIncomesHistory").onclick = function(){
    incomesHistory.className = "hidden";
    mainID.className = "off__hidden";
};

document.getElementById("openBalance").onclick = function(){
    balance.className = "off__hidden";
    mainID.className = "hidden";
};
document.getElementById("backInBalance").onclick = function(){
    balance.className = "hidden";
    mainID.className = "off__hidden";
};

document.getElementById("expenseDate").valueAsDate = new Date();
document.getElementById("incomesDate").valueAsDate = new Date();
document.getElementById("expenseHistoryDateStart").valueAsDate = new Date();
document.getElementById("expenseHistoryDateEnd").valueAsDate = new Date();

document.getElementById("signOut").onclick = function () {
    searchUser(authUserArray.username);
    console.log(userArray);
    localStorage.setItem("users", JSON.stringify(userArray));
    localStorage.removeItem("authUser");
    window.location.href = "views/login.html";
};


function getExpenseAmountDay() {
    let localExpenseDay = [];
    let day = currentDay();
    console.log(day);
    localExpenseDay = searchDay(day, localExpense, localExpenseDay);
    localExpenseDay = localExpenseDay.filter(String);
    console.log(localExpenseDay);
    let count = 0;
    count = amount(localExpenseDay, count);
    console.log(count);
    document.getElementById("amountExpenseDay").innerHTML = `${count}`;
}
function getExpenseAmountWeek() {
    let localExpenseWeek = [];
    let weekStart = getMonday(new Date());
    console.log(weekStart);
    let weekEnd = getSunday(new Date());
    console.log(weekEnd);
    localExpenseWeek = searchPeriod(weekStart, weekEnd, localExpense, localExpenseWeek);
    localExpenseWeek = localExpenseWeek.filter(String);
    console.log(localExpenseWeek);
    let count = 0;
    count = amount(localExpenseWeek, count);
    console.log(count);
    document.getElementById("amountExpenseWeek").innerHTML = `${count}`
}
function getExpenseAmountMonth() {
    let localExpenseMonth = [];
    let monthStart = getCurrentMonthStart(new Date());
    let monthEnd = getCurrentMonthEnd(new Date());
    localExpenseMonth = searchPeriod(monthStart, monthEnd, localExpense, localExpenseMonth);
    localExpenseMonth = localExpenseMonth.filter(String);
    console.log(localExpenseMonth);
    let count = 0;
    count = amount(localExpenseMonth, count);
    console.log(count);
    document.getElementById("amountExpenseMonth").innerHTML = `${count}`
}

function getIncomesAmountDay() {
    let localIncomesDay = [];
    let day = currentDay();
    console.log(day);
    localIncomesDay = searchDay(day, localIncomes, localIncomesDay);
    localIncomesDay = localIncomesDay.filter(String);
    console.log(localIncomesDay);
    let count = 0;
    count = amount(localIncomesDay, count);
    console.log(count);
    document.getElementById("amountIncomesDay").innerHTML = `${count}`;
}
function getIncomesAmountWeek() {
    let localIncomesWeek = [];
    let weekStart = getMonday(new Date());
    console.log(weekStart);
    let weekEnd = getSunday(new Date());
    console.log(weekEnd);
    localIncomesWeek = searchPeriod(weekStart, weekEnd, localIncomes, localIncomesWeek);
    localIncomesWeek = localIncomesWeek.filter(String);
    console.log(localIncomesWeek);
    let count = 0;
    count = amount(localIncomesWeek, count);
    console.log(count);
    document.getElementById("amountIncomesWeek").innerHTML = `${count}`
}
function getIncomesAmountMonth() {
    let localIncomesMonth = [];
    let monthStart = getCurrentMonthStart(new Date());
    let monthEnd = getCurrentMonthEnd(new Date());
    localIncomesMonth = searchPeriod(monthStart, monthEnd, localIncomes, localIncomesMonth);
    localIncomesMonth = localIncomesMonth.filter(String);
    console.log(localIncomesMonth);
    let count = 0;
    count = amount(localIncomesMonth, count);
    console.log(count);
    document.getElementById("amountIncomesMonth").innerHTML = `${count}`
}

function amount(array, count) {
    for (let i = 0; i < array.length; i++){
        count += +array[i].amount;
    }
    return count;
}

function getCurrentMonthStart(d) {
    d = new Date(d);
    let monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    console.log(monthStart);
    let monthDay = monthStart.getDate();
    let month = monthStart.getMonth()+1;
    if (monthDay < 10){monthDay = "0" + monthDay}
    if (month < 10){month = "0" + month}
    month = monthStart.getFullYear() + "-" + month + "-" + monthDay;
    console.log(month);
    return month;
}
function getCurrentMonthEnd(d) {
    d = new Date(d);
    let monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    console.log(monthEnd);
    let monthDay = monthEnd.getDate();
    let month = monthEnd.getMonth()+1;
    if (monthDay < 10){monthDay = "0" + monthDay}
    if (month < 10){month = "0" + month}
    month = monthEnd.getFullYear() + "-" + month + "-" + monthDay;
    console.log(month);
    return month;
}
function getMonday(d) { /* пошук першого дня в тижні*/
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1);
    let week = new Date(d.setDate(diff));
    let weekDay = week.getDate();
    let weekMonth = week.getMonth()+1;
    if (weekDay < 10){weekDay = "0" + weekDay}
    if (weekMonth < 10){weekMonth = "0" + weekMonth}
    week = week.getFullYear() + "-" + weekMonth + "-" + weekDay;
    return week;
}
function getSunday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() + day + (day === 0 ? -6:1);
    let week = new Date(d.setDate(diff));
    let weekDay = week.getDate();
    let weekMonth = week.getMonth()+1;
    if (weekDay < 10){weekDay = "0" + weekDay}
    if (weekMonth < 10){weekMonth = "0" + weekMonth}
    week = week.getFullYear() + "-" + weekMonth + "-" + weekDay;
    return week;
}
function currentDay() {
    let currentDay = new Date();
    let day = currentDay.getDate();
    let month = currentDay.getMonth() + 1;
    let year = currentDay.getFullYear();
    if (month < 10) {
        month = "0"+month;
    }
    currentDay = year + "-" + month + "-" + day;
    return currentDay;
}



function searchPeriod(start, end, array, newArray) {
    for (let i = 0; i < array.length; i++){
        console.log(array[i]);
        if (array[i].date >= start && array[i].date <= end){
            newArray[i] = array[i];
        }
    }
    return newArray;
}

function searchDay(day, array, newArray) {
    for (let i = 0; i < array.length; i++){
        console.log(array[i]);
        if (array[i].date === day){
            newArray[i] = array[i];
        }
    }
    return newArray;
}


function searchUser (name){
    for (let i = 0; i < userArray.length; i++){
        for (let key in userArray[i]){
            if (name === userArray[i][key] ) {
                userArray[i] = authUserArray;
            }
        }
    }
}
