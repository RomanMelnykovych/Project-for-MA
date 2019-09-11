/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

$(document).ready(function () : void {
    let body : any = $("body"); /* Видалення обєктів від сайту zzz.com*/
    body[0].childNodes[0].remove();
    body[0].childNodes[0].remove();
    $(".cbalink").remove();

    var userArray : [object];

    if (localStorage.getItem("users" )){ // перевіряємо чи є хочаб один користувач в базі
        userArray = JSON.parse(localStorage.getItem("users"));
    }

    var userFirstName : any,
        userLastName : any,
        userPassword : any,
        userEmail : any;

    $("#sign-in").on("click",function () : void{
        userFirstName = $("#userFirstName"); // стукаємся до селекторів
        userLastName = $("#userLastName");
        userPassword = $("#userPassword");
        userEmail = $("#userEmail");

        if (userFirstName.val() === "" || userLastName.val() === "" || userPassword.val() === "" || userEmail.val() === ""){
            alert("Заповніть всі поля!!")
        }else {
            let tempArray : object = buildUser(
                    userFirstName.val().trim(),
                    userLastName.val().trim(),
                    userPassword.val().trim(),
                    userEmail.val().trim(),
                );
            if (validate(tempArray["userpassword"], tempArray["useremail"])){
                if (userArray === undefined){
                    userArray = [tempArray];
                }else {
                    userArray.push(tempArray);
                }
                localStorage.setItem("users", JSON.stringify(userArray));
                localStorage.setItem("authUser", JSON.stringify(tempArray)); // запис авторизованого користувача
                window.location.href = "../index.html";
            }
        }
    });

    interface IUser {
        userfirstname : string;
        userlastname : string;
        userpassword : string;
        useremail : string;
    }

    function buildUser(firstname: string, lastname: string, password: string, email: string ): IUser {
        return {
            userfirstname: firstname,
            userlastname: lastname,
            userpassword: password,
            useremail: email};
    }

    function validate(pswd : string, email : string) : boolean{
        validatePswd(pswd);
        validateEmail(email);
        let $passwordCheck : any = $("#passwordCheck");
        let $iconErrorPswd : any = $("#iconErrorPswd");
        let $emailCheck : any = $("#emailCheck");
        let $iconErrorEmail : any = $("#iconErrorEmail");

        let errorClass : string = "form-input_error";
        let hiddenClass : string = "box-hidden";
        let iconErrorClass : string = "input-group-sign__icon-error";
        let popUpClass : string = "input-group-popUp";

        if (validateEmail(email) === false){
            userEmail.addClass(errorClass);
            $emailCheck.removeClass(hiddenClass);
            $emailCheck.addClass(popUpClass);
            $emailCheck.html("The email should look like: yourml@email.com!");
            $iconErrorEmail.removeClass(hiddenClass);
            $iconErrorEmail.addClass(iconErrorClass);
        }else {
            userEmail.removeClass(errorClass);
            $emailCheck.removeClass(popUpClass);
            $emailCheck.addClass(hiddenClass);
            $iconErrorEmail.removeClass(iconErrorClass);
            $iconErrorEmail.addClass(hiddenClass);
        }
        if (validatePswd(pswd) === false){
            userPassword.addClass(errorClass);
            $passwordCheck.removeClass(hiddenClass);
            $passwordCheck.addClass(popUpClass);
            $passwordCheck.html("Password is at least 8 characters long. Password must contain uppercase and lowercase Latin letters and numbers!");
            $iconErrorPswd.removeClass(hiddenClass);
            $iconErrorPswd.addClass(iconErrorClass);
        } else {
            userPassword.removeClass(errorClass);
            $passwordCheck.removeClass(popUpClass);
            $passwordCheck.addClass(hiddenClass);
            $iconErrorPswd.removeClass(iconErrorClass);
            $iconErrorPswd.addClass(hiddenClass);
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