$(document).ready(function () {
    var userArray = [];

    if (localStorage.getItem("users" )){
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
    }

    var userFirstName, userLastName, userPassword, userEmail;

    $("#sign-in").on("click",function () {
        userFirstName = $("#userFirstName");
        userLastName = $("#userLastName");
        userPassword = $("#userPassword");
        userEmail = $("#userEmail");


        if (userFirstName.val() === "" || userLastName.val() === "" || userPassword.val() === "" || userEmail.val() === ""){
            alert("Заповніть всі поля!!")
        }else {
            let tempArray = {};
            tempArray.userfirstname = userFirstName.val();
            tempArray.userlastname = userLastName.val();
            tempArray.userpassword = userPassword.val();
            tempArray.useremail = userEmail.val();
            console.log(tempArray.userpassword);
            if (validate(tempArray.userpassword, tempArray.useremail)){
                userArray.push(tempArray);
                localStorage.setItem("users", JSON.stringify(userArray));
                window.location.href = "login.html";
            }
        }
    });


    function validate(pswd, email) {
        validatePswd(pswd);
        validateEmail(email);
        let passwordCheck = $("#passwordCheck");
        let iconErrorPswd = $("#iconErrorPswd");
        let emailCheck = $("#emailCheck");
        let iconErrorEmail = $("#iconErrorEmail");

        if (validatePswd(pswd) === false){
            userPassword.addClass("error");
            passwordCheck.removeClass("hidden");
            passwordCheck.addClass("input__group__popUp");
            passwordCheck.html(`Пароль повинен містити тільки латинські великі та маленькі букви, цифри. І довжина більша за 8 символів`)  ;
            iconErrorPswd.removeClass("hidden");
            iconErrorPswd.addClass("icon__error" );
        } else {
            userPassword.removeClass("error");
            passwordCheck.removeClass("input__group__popUp");
            passwordCheck.addClass("hidden");
            iconErrorPswd.removeClass("icon__error");
            iconErrorPswd.addClass("hidden");
        }
        if (validateEmail(email) === false){
            userEmail.addClass(" error");
            emailCheck.removeClass("hidden");
            emailCheck.addClass("input__group__popUp");
            emailCheck.html(`E-mail має мати такий вигляд: yourml@email.com`);
            iconErrorEmail.removeClass("hidden");
            iconErrorEmail.addClass("icon__error" );
        }else {
            userEmail.removeClass("error");
            emailCheck.removeClass("input__group__popUp");
            emailCheck.addClass("hidden");
            iconErrorEmail.removeClass("icon__error");
            iconErrorEmail.addClass("hidden");
        }
        if (validatePswd(pswd) && validateEmail(email)) {
            return true;
        }
    }

    function validatePswd(pswd){
        let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return reg.test(pswd);

    }
    function validateEmail(email) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);
    }
});



