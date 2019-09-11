define(['jquery', 'eventHandler', 'getDate', 'reloadData'],
    function ($, eventHandlers, getDate, reloadData) : void{

        if (!localStorage.getItem("authUser")){
            window.location.href = "views/signIN.html";
        }

    $(document).ready(function () : void{

        let body : any = $("body"); /* Видалення обєктів від сайту zzz.com*/
        body[0].childNodes[0].remove();
        body[0].childNodes[0].remove();
        $(".cbalink").remove();

        var userArray : [object]; /*дані всіх юзерів*/
        if (localStorage.getItem("users")){
            userArray = JSON.parse(localStorage.getItem("users"));
        }

        var authUserArray : object; /*дані авторизованого юзера*/
        authUserArray = JSON.parse(localStorage.getItem("authUser"));
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

        eventHandlers.handlers(userArray, authUserArray, localExpense, localIncomes);

        reloadData.reloadMain(localExpense, localIncomes);

        $("input[type='date']").val(getDate.currentDay()); /*Заповнення полів input із type="date" сьогоднішньою датою*/
        $("input[type='time']").val(getDate.currentTime()); /*Заповнення полів input із type="time" поточним часом*/
        $("input[id^='year']").val(getDate.getCurrentYear());
    });
});
requirejs(["indexJS"]);
