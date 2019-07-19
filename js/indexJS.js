if (!localStorage.getItem("authUser")){
    window.location.href = "views/login.html";
}

$(document).ready(function () {
    // let body = $("body"); /* Видалення обєктів від сайту zzz.com*/
    // body[0].childNodes[0].remove();
    // body[0].childNodes[0].remove();
    // $(".cbalink").remove()

    var userArray =[]; /*дані всіх юзерів*/
    if (localStorage.getItem("users")){
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
    }

    var authUserArray = []; /*дані авторизованого юзера*/
    authUserArray = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUserArray);
    $("#nameUser").html(`Name :  ${authUserArray.userfirstname} ${authUserArray.userlastname}`);
    $("#nameUserHeader").html(`   ${authUserArray.userfirstname} ${authUserArray.userlastname}`);


    var localExpense = []; /* список затрат авторизованого юзера*/
    if (authUserArray.exspense){
        localExpense = authUserArray.exspense;
    }
    var localIncomes = []; /* список доходів авторизованого юзера*/
    if (authUserArray.incomes){
        localIncomes = authUserArray.incomes;
    }


    const mainID = $("#main");
    const hamburger = $("#hamburger");
    const expense = $("#expense");
    const mainExpense = $("#mainExpense");
    const expenseHistory = $("#expenseHistory");
    const expenseHistoryMain = $("#expenseHistoryMain");
    const incomes = $("#incomes");
    const mainIncomes = $("#mainIncomes");
    const incomesHistory = $("#incomesHistory");
    const incomesHistoryMain = $("#incomesHistoryMain");
    const balance = $("#balance");
    const mainBalance = $("#mainBalance");

    let yearBalance = $("#yearBalance");
    let yearBalanceMain = $("#yearBalanceMain");

    let expenseHistoryDateStart = $("#expenseHistoryDateStart");
    let expenseHistoryDateEnd =  $("#expenseHistoryDateEnd");
    let expenseHistoryMainDateStart = $("#expenseHistoryMainDateStart");
    let expenseHistoryMainDateEnd = $("#expenseHistoryMainDateEnd");
    let incomesHistoryDateStart = $("#incomesHistoryDateStart");
    let incomesHistoryDateEnd =  $("#incomesHistoryDateEnd");
    let incomesHistoryMainDateStart = $("#incomesHistoryMainDateStart");
    let incomesHistoryMainDateEnd = $("#incomesHistoryMainDateEnd");

    reloadDate();

    $("input[type='date']").val(currentDay()); /*Заповнення полів input із type="date" сьогоднішньою датою*/
    $("input[type='time']").val(currentTime()); /*Заповнення полів input із type="time" поточним часом*/
    $("input[id^='year']").val(getCurrentYear());


    $("#hamburgerOpen").on("click", function () {
        hamburger.css("width", "75%")
    });
    $("#hamburgerOff").on("click", function () {
        hamburger.css("width", "0");

    });


    $("#signOut").on("click", function () {
        searchUser(authUserArray.useremail);
        localStorage.setItem("users", JSON.stringify(userArray));
        localStorage.removeItem("authUser");
        window.location.href = "views/login.html";
    });

    $("#addExpense").on("click", function(){
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
    $("#backInExpanse").on("click", function () {
        reloadDate();
        expense.hide();
        mainID.show();
    });
    $("#expenseCheck").on("click", function () {
        var authUserExpense = {};
        let expenseDate = $("#expenseDate").val();
        let expenseTime = $("#expenseTime").val();
        let expenseCategory = $("#expenseCategory").val();
        let expenseAmount = $("#expenseAmount").val();
        authUserExpense.date = expenseDate;
        authUserExpense.time = expenseTime;
        authUserExpense.category = expenseCategory;
        authUserExpense.amount = expenseAmount;

        if (expenseDate === "" || expenseCategory === "" || expenseAmount === "" || expenseTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            let i = localExpense.length;
            localExpense[i] = authUserExpense;
            console.log(localExpense);
            authUserArray.exspense = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            expense.hide();
            mainID.show();
        }
    });
    $("#exitMainExpense").on("click", function () {
        mainExpense.slideUp("slow");
    });
    $("#expenseMainCheck").on("click", function () {
        var authUserExpense = {};
        let expenseMainDate = $("#expenseMainDate").val();
        let expenseMainTime = $("#expenseMainTime").val();
        let expenseMainCategory = $("#expenseMainCategory").val();
        let expenseMainAmount = $("#expenseMainAmount").val();
        authUserExpense.date = expenseMainDate;
        authUserExpense.time = expenseMainTime;
        authUserExpense.category = expenseMainCategory;
        authUserExpense.amount = expenseMainAmount;

        if (expenseMainDate === "" || expenseMainCategory === "" || expenseMainAmount === "" || expenseMainTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            let i = localExpense.length;
            localExpense[i] = authUserExpense;
            console.log(localExpense);
            authUserArray.exspense = localExpense;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            mainExpense.slideUp("slow");
        }
    });

    $("#addIncomes").on("click", function () {
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
    $("#backInIncomes").on("click", function () {
        reloadDate();
        incomes.hide();
        mainID.show();
    });
    $("#incomesCheck").on("click", function () {
        var authUserIncomes = {};
        let incomesDate = $("#incomesDate").val();
        let incomesTime = $("#incomesTime").val();
        let incomesCategory = $("#incomesCategory").val();
        let incomesAmount = $("#incomesAmount").val();

        authUserIncomes.date = incomesDate;
        authUserIncomes.time = incomesTime;
        authUserIncomes.category = incomesCategory;
        authUserIncomes.amount = incomesAmount;

        if (incomesDate === "" || incomesCategory === "" || incomesAmount === "" || incomesTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            let i = localIncomes.length;
            localIncomes[i] = authUserIncomes;
            console.log(localIncomes);
            authUserArray.incomes = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            incomes.hide();
            mainID.show();
        }
    });
    $("#exitMainIncomes").on("click", function () {
        mainIncomes.slideUp("slow");
    });
    $("#incomesMainCheck").on("click", function () {
        var authUserIncomes = {};
        let incomesMainDate = $("#incomesMainDate").val();
        let incomesMainTime = $("#incomesMainTime").val();
        let incomesMainCategory = $("#incomesMainCategory").val();
        let incomesMainAmount = $("#incomesMainAmount").val();
        authUserIncomes.date = incomesMainDate;
        authUserIncomes.time = incomesMainTime;
        authUserIncomes.category = incomesMainCategory;
        authUserIncomes.amount = incomesMainAmount;

        if (incomesMainDate === "" || incomesMainCategory === "" || incomesMainAmount === "" || incomesMainTime === ""){
            alert("Заповніть всі поля!!!");
        } else {
            let i = localIncomes.length;
            localIncomes[i] = authUserIncomes;
            console.log(localIncomes);
            authUserArray.incomes = localIncomes;
            localStorage.setItem("authUser", JSON.stringify(authUserArray));

            reloadDate();

            mainIncomes.slideUp("slow");
        }
    });

    $("#openExpenseHistory").on("click", function () {
        if (window.innerWidth >= 700){
            incomesHistoryMain.hide();
            mainBalance.hide();
            mainExpense.hide();
            mainIncomes.hide();
            expenseHistoryMain.removeClass("hidden");
            expenseHistoryMain.hide();
            expenseHistoryMain.slideDown("slow");
            reloadExpenseMainDate();
        }else {
            reloadExpenseDate();
            mainID.hide();
            expenseHistory.show();
        }
    });
    $("#backInExpanseHistory").on("click", function () {
        reloadDate();
        expenseHistory.hide();
        mainID.show();
    });
    $("#exitMainExpenseHistory").on("click", function () {
        expenseHistoryMain.slideUp("slow");
    });
    expenseHistoryDateStart.on("change", function () {
        reloadExpenseDate();
    });
    expenseHistoryDateEnd.on("change", function () {
        reloadExpenseDate();
    });
    expenseHistoryMainDateStart.on("change", function (){
        reloadExpenseMainDate();
    });
    expenseHistoryMainDateEnd.on("change", function () {
        reloadExpenseMainDate();
    });

    $("#openIncomesHistory").on("click", function () {
        if (window.innerWidth >= 700){
            expenseHistoryMain.hide();
            mainBalance.hide();
            mainExpense.hide();
            mainIncomes.hide();
            incomesHistoryMain.removeClass("hidden");
            incomesHistoryMain.hide();
            incomesHistoryMain.slideDown("slow");
            reloadIncomesMainDate();
        }else {
            reloadIncomesDate();
            mainID.hide();
            incomesHistory.show();
        }
    });
    $("#backInIncomesHistory").on("click", function () {
        reloadDate();
        incomesHistory.hide();
        mainID.show();
    });
    $("#exitMainIncomesHistory").on("click", function () {
        incomesHistoryMain.slideUp("slow");
    });
    incomesHistoryDateStart.on("change", function () {
        reloadIncomesDate();
    });
    incomesHistoryDateEnd.on("change", function () {
        reloadIncomesDate();
    });
    incomesHistoryMainDateStart.on("change", function (){
        reloadIncomesMainDate();
    });
    incomesHistoryMainDateEnd.on("change", function () {
        reloadIncomesMainDate();
    });

    $("#openBalance").on("click", function () {
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
    $("#backInBalance").on("click", function () {
        balance.hide();
        mainID.show();
    });
    $("#yearDown").on("click", function () {
       yearBalance.val(yearBalance.val() - 1);
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    $("#yearUp").on("click", function () {
        yearBalance.val(+yearBalance.val() + 1);
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    yearBalance.on("change", function () {
        $("#amountBalanceAll").html(`${getAmountBalance(yearBalance.val())}`);
        filingMonthAmount(yearBalance.val());
    });
    $("#exitMainBalance").on("click", function () {
        mainBalance.slideUp("slow");
    });
    $("#yearDownMain").on("click", function () {
        yearBalanceMain.val(yearBalanceMain.val() - 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });
    $("#yearUpMain").on("click", function () {
        yearBalanceMain.val(+yearBalanceMain.val() + 1);
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });
    yearBalanceMain.on("change", function () {
        $("#amountBalanceAllMain").html(`${getAmountBalance(yearBalanceMain.val())}`);
        filingMonthAmountMain(yearBalanceMain.val());
    });

    function getExpenseAmountDay() {
        let localExpenseDay = [];
        let day = currentDay();
        localExpenseDay = searchDay(day, localExpense, localExpenseDay);
        localExpenseDay = localExpenseDay.filter(String);
        let count = 0;
        count = amount(localExpenseDay, count);
        $("#amountExpenseDay").html(`${count}`);
    }
    function getExpenseAmountWeek() {
        let localExpenseWeek = [];
        let weekStart = getMonday(new Date());
        let weekEnd = getSunday(new Date());
        localExpenseWeek = searchPeriod(weekStart, weekEnd, localExpense, localExpenseWeek);
        localExpenseWeek = localExpenseWeek.filter(String);
        let count = 0;
        count = amount(localExpenseWeek, count);
        $("#amountExpenseWeek").html(`${count}`);
    }
    function getExpenseAmountMonth() {
        let localExpenseMonth = [];
        let monthStart = getCurrentMonthStart(new Date());
        let monthEnd = getCurrentMonthEnd(new Date());
        localExpenseMonth = searchPeriod(monthStart, monthEnd, localExpense, localExpenseMonth);
        localExpenseMonth = localExpenseMonth.filter(String);
        let count = 0;
        count = amount(localExpenseMonth, count);
        $("#amountExpenseMonth").html(`${count}`);
    }
    function getHistoryExpensePeriod(innerBox, start, end, amountAll) {
        innerBox.html("");
        let localExpensePeriod = [];
        searchPeriod(start, end, localExpense, localExpensePeriod);
        localExpensePeriod = localExpensePeriod.filter(String);
        console.log(localExpensePeriod);
        let food = [];
        let cafes = [];
        let relaxation = [];
        let vehicle = [];
        let communication = [];

        searchCategory("Food", localExpensePeriod, food);
        searchCategory("Cafes and restaurants", localExpensePeriod, cafes);
        searchCategory("Relaxation", localExpensePeriod, relaxation);
        searchCategory("Vehicle", localExpensePeriod, vehicle);
        searchCategory("Communication", localExpensePeriod, communication);

        food = food.filter(String);
        cafes = cafes.filter(String);
        relaxation = relaxation.filter(String);
        vehicle = vehicle.filter(String);
        communication = communication.filter(String);

        let countFood = 0;
        countFood = amount(food, countFood);
        let countCafes = 0;
        countCafes = amount(cafes, countCafes);
        let countRelaxation = 0;
        countRelaxation = amount(relaxation, countRelaxation);
        let countVehicle = 0;
        countVehicle = amount(vehicle, countVehicle);
        let countCommunication = 0;
        countCommunication = amount(communication, countCommunication);

        let countAll = countFood + countCafes + countRelaxation + countVehicle + countCommunication;
        amountAll.html(`${countAll}`);

        if (food.length !== 0){
            innerBox.html(`<div id="food" class="history__item">Food<span>${countFood}</span></div>
                            <div id="itemDetailFood" class="hidden detail__line"></div>`);
        }
        if (cafes.length !== 0){
            innerBox.append(`<div id="cafes" class="history__item">Cafes and restaurants<span>${countCafes}</span></div>
                                <div id="itemDetailCafes" class="hidden detail__line"></div>`);
        }
        if (relaxation.length !== 0){
            innerBox.append(`<div id="relaxation" class="history__item">Relaxation<span>${countRelaxation}</span></div>
                            <div id="itemDetailRelaxation" class="hidden detail__line"></div>`);
        }
        if (vehicle.length !== 0){
            innerBox.append(`<div id="vehicle" class="history__item">Vehicle<span>${countVehicle}</span></div>
                                <div id="itemDetailVehicle" class="hidden detail__line"></div>`);
        }
        if (communication.length !== 0){
            innerBox.append(`<div id="communication" class="history__item">Communication<span>${countCommunication}</span></div>
                                <div id="itemDetailCommunication" class="hidden detail__line"></div>`);
        }
        $("#food").on("click", function () {
            openDetailItem($("#itemDetailFood"), food, "food");
            let arrBtn = $("button[id^='delfood']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelExpenseBtn(arrBtn, this, food, localExpense);
            });

        });
        $("#cafes").on("click", function () {
            openDetailItem($("#itemDetailCafes"), cafes, "cafes");
            let arrBtn = $("button[id^='delcafes']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelExpenseBtn(arrBtn, this, cafes, localExpense);
            });
        });
        $("#relaxation").on("click", function () {
            openDetailItem($("#itemDetailRelaxation"), relaxation, "relaxation");
            let arrBtn = $("button[id^='delrelaxation']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelExpenseBtn(arrBtn, this, relaxation, localExpense);
            });
        });
        $("#vehicle").on("click", function () {
            openDetailItem($("#itemDetailVehicle"), vehicle, "vehicle");
            let arrBtn = $("button[id^='delvehicle']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelExpenseBtn(arrBtn, this, vehicle, localExpense);
            });
        });
        $("#communication").on("click", function () {
            openDetailItem($("#itemDetailCommunication"), communication, "communication");
            let arrBtn = $("button[id^='delcommunication']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelExpenseBtn(arrBtn, this, communication, localExpense);
            });
        });
    }

    function openDetailItem(itemIDDetailBox, arrayCateg, nameCateg) {
        console.log(arrayCateg);
        itemIDDetailBox.html("");
        for (let i = 0; i < arrayCateg.length; i++){
            itemIDDetailBox.append(`<div id="${i}" class="item__detail">
                                            <div class="item__wrapper">
                                                <div>${arrayCateg[i].date}  ${arrayCateg[i].time}</div>
                                                <span>${arrayCateg[i].amount}</span>
                                                <button type="button" id="del${nameCateg}${i}" class="btn__delete"><i class="fas fa-minus"></i></button>
                                                </div>
                                       </div>`);
        }
            itemIDDetailBox.slideDown("slow");
    }
    function searchDelExpenseBtn(arrayBtn, thisBtn, arrayCateg, globalArr) {
        console.log(thisBtn);
        console.log(arrayCateg);
        for (let i = 0; i < arrayBtn.length; i++){
            if(arrayBtn[i].id === thisBtn.id){
                console.log(arrayCateg[i]);
                searchDelExpenseItem(arrayCateg[i].date, arrayCateg[i].time, arrayCateg[i].category,
                    arrayCateg[i].amount, globalArr);
            }
        } console.log(arrayCateg);
    }
    function searchDelIncomesBtn(arrayBtn, thisBtn, arrayCateg, globalArr) {
        console.log(thisBtn);
        console.log(arrayCateg);
        for (let i = 0; i < arrayBtn.length; i++){
            if(arrayBtn[i].id === thisBtn.id){
                console.log(arrayCateg[i]);
                searchDelIncomesItem(arrayCateg[i].date, arrayCateg[i].time, arrayCateg[i].category,
                    arrayCateg[i].amount, globalArr);
            }
        } console.log(arrayCateg);
    }
    function searchDelExpenseItem(date, time, name, amount, array) {
        for (let i = 0; i < array.length; i++){
            if (array[i].date === date && array[i].time === time && array[i].category === name && array[i].amount === amount){
                let index = array.indexOf(array[i]);
                console.log(index);
                array.splice(index, 1);
                authUserArray.exspense = array;
                localStorage.setItem("authUser", JSON.stringify(authUserArray));
                currentExpenseWindow();
            }
        }
    }
    function searchDelIncomesItem(date, time, name, amount, array) {
        for (let i = 0; i < array.length; i++){
            if (array[i].date === date && array[i].time === time && array[i].category === name && array[i].amount === amount){
                let index = array.indexOf(array[i]);
                console.log(index);
                array.splice(index, 1);
                authUserArray.incomes = array;
                localStorage.setItem("authUser", JSON.stringify(authUserArray));
                currentIncomesWindow();
            }
        }
    }

    function getIncomesAmountDay() {
        let localIncomesDay = [];
        let day = currentDay();
        localIncomesDay = searchDay(day, localIncomes, localIncomesDay);
        localIncomesDay = localIncomesDay.filter(String);
        let count = 0;
        count = amount(localIncomesDay, count);
        $("#amountIncomesDay").html(`${count}`);
    }
    function getIncomesAmountWeek() {
        let localIncomesWeek = [];
        let weekStart = getMonday(new Date());
        let weekEnd = getSunday(new Date());
        localIncomesWeek = searchPeriod(weekStart, weekEnd, localIncomes, localIncomesWeek);
        localIncomesWeek = localIncomesWeek.filter(String);
        let count = 0;
        count = amount(localIncomesWeek, count);
        $("#amountIncomesWeek").html(`${count}`);
    }
    function getIncomesAmountMonth() {
        let localIncomesMonth = [];
        let monthStart = getCurrentMonthStart(new Date());
        let monthEnd = getCurrentMonthEnd(new Date());
        localIncomesMonth = searchPeriod(monthStart, monthEnd, localIncomes, localIncomesMonth);
        localIncomesMonth = localIncomesMonth.filter(String);
        let count = 0;
        count = amount(localIncomesMonth, count);
        $("#amountIncomesMonth").html(`${count}`);
    }
    function getHistoryIncomesPeriod(innerBox, start, end, amountAll) {
        innerBox.html("");
        let localIncomesPeriod = [];
        searchPeriod(start, end, localIncomes, localIncomesPeriod);
        localIncomesPeriod = localIncomesPeriod.filter(String);
        console.log(localIncomesPeriod);
        let salary = [];
        let premium = [];
        let stipend = [];

        searchCategory("Salary", localIncomesPeriod, salary);
        searchCategory("Premium", localIncomesPeriod, premium);
        searchCategory("Stipend", localIncomesPeriod, stipend);

        salary = salary.filter(String);
        premium = premium.filter(String);
        stipend = stipend.filter(String);

        let countSalary = 0;
        countSalary = amount(salary, countSalary);
        let countPremium = 0;
        countPremium = amount(premium, countPremium);
        let countStipend = 0;
        countStipend = amount(stipend, countStipend);

        let countAll = countSalary + countPremium + countStipend;
        amountAll.html(`${countAll}`);

        if (salary.length !== 0){
            innerBox.html(`<div id="salary" class="history__item">Salary<span>${countSalary}</span></div>
                            <div id="itemDetailSalary" class="hidden detail__line"></div>`);
        }
        if (premium.length !== 0){
            innerBox.append(`<div id="premium" class="history__item">Premium<span>${countPremium}</span></div>
                                <div id="itemDetailPremium" class="hidden detail__line"></div>`);
        }
        if (stipend.length !== 0){
            innerBox.append(`<div id="stipend" class="history__item">Stipend<span>${countStipend}</span></div>
                            <div id="itemDetailStipend" class="hidden detail__line"></div>`);
        }

        $("#salary").on("click", function () {
            openDetailItem($("#itemDetailSalary"), salary, "salary");
            let arrBtn = $("button[id^='delsalary']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelIncomesBtn(arrBtn, this, salary, localIncomes);
            });

        });
        $("#premium").on("click", function () {
            openDetailItem($("#itemDetailPremium"), premium, "premium");
            let arrBtn = $("button[id^='delpremium']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelIncomesBtn(arrBtn, this, premium, localIncomes);
            });
        });
        $("#stipend").on("click", function () {
            openDetailItem($("#itemDetailStipend"), stipend, "stipend");
            let arrBtn = $("button[id^='delstipend']");
            console.log(arrBtn);
            arrBtn.on("click", function () {
                searchDelIncomesBtn(arrBtn, this, stipend, localIncomes);
            });
        });
    }

    function getAmountBalance(year) {
        let countAllExpense = 0;
        let countAllIncomes = 0;
        let expenseYear = [];
        let incomesYear = [];
        expenseYear = searchPeriod(`${year}-01-01`, `${year}-12-31`, localExpense, expenseYear);
        incomesYear = searchPeriod(`${year}-01-01`, `${year}-12-31`, localIncomes, incomesYear);
        expenseYear = expenseYear.filter(String);
        incomesYear = incomesYear.filter(String);
        countAllExpense = amount(expenseYear, countAllExpense);
        countAllIncomes = amount(incomesYear, countAllIncomes);

        return countAllIncomes - countAllExpense;
    }
    function getAmountBalanceMonth(monthStart, monthEnd, year) {
        let countAllExpense = 0;
        let countAllIncomes = 0;
        let expenseYear = [];
        let incomesYear = [];
        expenseYear = searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, localExpense, expenseYear);
        incomesYear = searchPeriod(`${year}-${monthStart}`, `${year}-${monthEnd}`, localIncomes, incomesYear);
        expenseYear = expenseYear.filter(String);
        incomesYear = incomesYear.filter(String);
        countAllExpense = amount(expenseYear, countAllExpense);
        countAllIncomes = amount(incomesYear, countAllIncomes);

        return countAllIncomes - countAllExpense;
    }

    function filingMonthAmount(year) {
        $("#january").html(getAmountBalanceMonth("01-01", "01-31", year));
        $("#february").html(getAmountBalanceMonth("02-01", "02-28", year));
        $("#march").html(getAmountBalanceMonth("03-01", "03-31", year));
        $("#april").html(getAmountBalanceMonth("04-01", "04-30", year));
        $("#may ").html(getAmountBalanceMonth("05-01", "05-31", year));
        $("#june").html(getAmountBalanceMonth("06-01", "06-30", year));
        $("#july").html(getAmountBalanceMonth("07-01", "07-31", year));
        $("#august").html(getAmountBalanceMonth("08-01", "08-31", year));
        $("#september").html(getAmountBalanceMonth("09-01", "09-30", year));
        $("#october").html(getAmountBalanceMonth("10-01", "10-31", year));
        $("#november").html(getAmountBalanceMonth("11-01", "11-30", year));
        $("#december").html(getAmountBalanceMonth("12-01", "12-31", year));
    }
    function filingMonthAmountMain(year) {
        $("#januaryMain").html(getAmountBalanceMonth("01-01", "01-31", year));
        $("#februaryMain").html(getAmountBalanceMonth("02-01", "02-28", year));
        $("#marchMain").html(getAmountBalanceMonth("03-01", "03-31", year));
        $("#aprilMain").html(getAmountBalanceMonth("04-01", "04-30", year));
        $("#mayMain").html(getAmountBalanceMonth("05-01", "05-31", year));
        $("#juneMain").html(getAmountBalanceMonth("06-01", "06-30", year));
        $("#julyMain").html(getAmountBalanceMonth("07-01", "07-31", year));
        $("#augustMain").html(getAmountBalanceMonth("08-01", "08-31", year));
        $("#septemberMain").html(getAmountBalanceMonth("09-01", "09-30", year));
        $("#octoberMain").html(getAmountBalanceMonth("10-01", "10-31", year));
        $("#novemberMain").html(getAmountBalanceMonth("11-01", "11-30", year));
        $("#decemberMain").html(getAmountBalanceMonth("12-01", "12-31", year));
    }
    
    function amount(array, count) {
        for (let i = 0; i < array.length; i++){
            count += +array[i].amount;
        }
        return count;
    }

    function getCurrentYear() {
        let currentYear = new Date();
        currentYear = currentYear.getFullYear();
        return currentYear;
    }
    function getCurrentMonthStart(d) {
        d = new Date(d);
        let monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
        let monthDay = monthStart.getDate();
        let month = monthStart.getMonth()+1;
        if (monthDay < 10){monthDay = "0" + monthDay}
        if (month < 10){month = "0" + month}
        month = monthStart.getFullYear() + "-" + month + "-" + monthDay;
        return month;
    }
    function getCurrentMonthEnd(d) {
        d = new Date(d);
        let monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        let monthDay = monthEnd.getDate();
        let month = monthEnd.getMonth()+1;
        if (monthDay < 10){monthDay = "0" + monthDay}
        if (month < 10){month = "0" + month}
        month = monthEnd.getFullYear() + "-" + month + "-" + monthDay;
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
    function currentTime() {
        let currentTime = new Date();
        let hour = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        if (hour < 10){
            hour = "0"+ hour;
        }
        if(minutes < 10){
            minutes = "0"+ minutes;
        }
        currentTime = hour + ":" + minutes;
        return currentTime
    }

    function searchCategory(name, array, newArray) {
        for (let i = 0; i < array.length; i++){
            if(array[i].category === name){
                newArray[i] = array[i];
            }
        }
        return newArray;
    }
    function searchPeriod(start, end, array, newArray) {
        for (let i = 0; i < array.length; i++){
            if (array[i].date >= start && array[i].date <= end){
                newArray[i] = array[i];
            }
        }
        return newArray;
    }
    function searchDay(day, array, newArray) {
        for (let i = 0; i < array.length; i++){
            if (array[i].date === day){
                newArray[i] = array[i];
            }
        }
        return newArray;
    }

    function searchUser (email){
        for (let i = 0; i < userArray.length; i++){
                if (email === userArray[i].useremail) {
                    userArray[i] = authUserArray;
                }
        }
    }

    function currentExpenseWindow() {
        if (window.innerWidth >= 700){
            reloadDate();
            reloadExpenseMainDate();
        }else {
            reloadExpenseDate();
        }
    }
    function currentIncomesWindow() {
        if (window.innerWidth >= 700){
            reloadDate();
            reloadIncomesMainDate();
        }else {
            reloadIncomesDate();
        }
    }

    function reloadExpenseMainDate() {
        getHistoryExpensePeriod($("#historyExpenseMainPeriod"), expenseHistoryMainDateStart.val(),
            expenseHistoryMainDateEnd.val(), $("#amountExpenseHistoryMainAll"));
    }
    function reloadExpenseDate() {
        getHistoryExpensePeriod($("#historyExpensePeriod"), expenseHistoryDateStart.val(),
            expenseHistoryDateEnd.val(), $("#amountExpenseHistoryAll"));
    }
    function reloadIncomesMainDate() {
        getHistoryIncomesPeriod($("#historyIncomesMainPeriod"), incomesHistoryMainDateStart.val(),
            incomesHistoryMainDateEnd.val(), $("#amountIncomesHistoryMainAll"));
    }
    function reloadIncomesDate() {
        getHistoryIncomesPeriod($("#historyIncomesPeriod"), incomesHistoryDateStart.val(),
            incomesHistoryDateEnd.val(), $("#amountIncomesHistoryAll"));
    }
    function reloadDate() {
        getExpenseAmountDay(); /*вивід суми витрат за день*/
        getExpenseAmountWeek(); /*вивід суми витрат за тиждень*/
        getExpenseAmountMonth(); /*вивід суми витрат за Місяць*/

        getIncomesAmountDay(); /*вивід суми доходів за день*/
        getIncomesAmountWeek(); /*вивід суми доходів за тиждень*/
        getIncomesAmountMonth(); /*вивід суми доходів за Місяць*/

        $("#amountBalance").html(`${getAmountBalance(getCurrentYear())}`);/* вивід поточного балансу */
    }
});
