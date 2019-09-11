/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

$(document).ready(function () : void {
    let body : any = $("body"); /* Видалення обєктів від сайту zzz.com*/
    body[0].childNodes[0].remove();
    body[0].childNodes[0].remove();
    $(".cbalink").remove();

    if (localStorage.getItem("authUser")) { // перевірка чи є авторизований користувач
        window.location.href = "../index.html";
    }

        var userArray : [object];

        if (localStorage.getItem("users")) { // перевіряємо чи є хочаб один користувач в базі
            userArray = JSON.parse(localStorage.getItem("users")); // витягуєм користувачів
        }

        $("#sign-in").on("click", function (): any { // опрацювання натиску на кнопку
            let userEmail : any = $("#userEmail"); // стукаємся до селекторів
            let userPassword : any = $("#userPassword");
            let userCheck : any = $("#userCheck");
            let icon : any = $(".input-group__icon");

            if (userEmail.val() !== "" && userPassword.val() !== "") { // перевірка чи поля заповненні
                let tempUser: object = searchUser(userEmail.val().trim()); // пошук користувача
                if (tempUser === undefined) { // перевірка чи такий користувач існує
                    if (confirm("You are not registered !! Want to sign up?") === true) {
                        window.location.href = "signUP.html";
                    }
                } else if (userPassword.val().trim() !== tempUser["userpassword"]) { // перевірка чи збігаються паролі
                    let errorClass : string = "form-input_error";
                    userEmail.addClass(errorClass);
                    userPassword.addClass(errorClass);
                    userCheck.removeClass("box-hidden");
                    userCheck.addClass("input-group-popUp");
                    userCheck.html("Wrong Email or Password !!");
                    icon.addClass("input-group__icon_error");
                } else if (userEmail.val().trim() === tempUser["useremail"] && userPassword.val().trim() === tempUser["userpassword"]) { // якщо всі дані збігаються тоді авторизувати користувача
                    localStorage.setItem("authUser", JSON.stringify(tempUser)); // запис авторизованого користувача
                    window.location.href = "../index.html";
                }
            } else {
                alert("Fill in all the fields !!!");
            }
        });

        $("#sign-up").on("click", function (): any {
            window.location.href = "signUP.html";
        });

        function searchUser(email: string): object { // функція пошуку користувача
            let temp: object;
            for (let i: number = 0; i < userArray.length; i++) {
                if (email === userArray[i]["useremail"]) {
                    temp = userArray[i];
                }
            }
            return temp
        }
});



