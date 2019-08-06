/// <reference path="../node_modules/@types/jquery/index.d.ts" />

$(document).ready(function () : void {

    var userArray : [object];

    if (localStorage.getItem("users" )){ // перевіряємо чи є хочаб один користувач в базі
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
    }

    var userFirstName : any,
        userLastName : any,
        userPassword : any,
        userEmail : any;

    $("#sign-in").on("click",function () : any{
        userFirstName = $("#userFirstName"); // стукаємся до селекторів
        userLastName = $("#userLastName");
        userPassword = $("#userPassword");
        userEmail = $("#userEmail");

        if (userFirstName.val() === "" || userLastName.val() === "" || userPassword.val() === "" || userEmail.val() === ""){
            alert("Заповніть всі поля!!")
        }else {
            let tempArray : User = new User(
                    userFirstName.val().trim(),
                    userLastName.val().trim(),
                    userPassword.val().trim(),
                    userEmail.val().trim()
                );
            console.log(tempArray);
            if (validate(tempArray["userpassword"], tempArray["useremail"])){
                if (userArray === undefined){
                    userArray = [tempArray];
                }else {
                    userArray.push(tempArray);
                }
                localStorage.setItem("users", JSON.stringify(userArray));
                window.location.href = "signIN.html";
            }
        }
    });

    class User {
        userfirstname : string;
        userlastname : string;
        userpassword : string;
        useremail : string;
        constructor(userfirstname : string, userlastname : string, userpassword : string, useremail : string){
            this.userfirstname = userfirstname;
            this.userlastname = userlastname;
            this.userpassword = userpassword;
            this.useremail = useremail;
        }
    }

    function validate(pswd : string, email : string) : boolean{
        validatePswd(pswd);
        validateEmail(email);
        let passwordCheck : any = $("#passwordCheck");
        let iconErrorPswd : any = $("#iconErrorPswd");
        let emailCheck : any = $("#emailCheck");
        let iconErrorEmail : any = $("#iconErrorEmail");

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

    function validatePswd(pswd : string) : boolean{
        let reg : any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return reg.test(pswd);

    }

    function validateEmail(email : string) : boolean{
        let reg : any = /\S+@\S+\.\S+/;
        return reg.test(email);
    }
});