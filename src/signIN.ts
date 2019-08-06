/// <reference path="../node_modules/@types/jquery/index.d.ts" />

$(document).ready(
    function () : void {
        var refererUrl : string = document.referrer; // запис url з якого прийшов користувач


        if (localStorage.getItem("authUser")) { // перевірка чи є авторизований користувач
            window.location.href = "../index.html";
        }

        var userArray : [object];

        if (localStorage.getItem("users")) { // перевіряємо чи є хочаб один користувач в базі
            userArray = JSON.parse(localStorage.getItem("users")); // витягуєм користувачів
            console.log(userArray);
        }

        if (refererUrl === "http://localhost:63342/Project-for-MA/views/signUP.html"){ // умова якщо користувач пройшов реєстрацію, тоді заповнити поля його даними
            let lastUser : number = userArray.length - 1;
            $("#userEmail").val(userArray[lastUser]["useremail"]);
            $("#userPassword").val(userArray[lastUser]["userpassword"]);
        }

        $("#sign-in").on("click", function (): any { // опрацювання натиску на кнопку
            let userName : any = $("#userEmail"); // стукаємся до селекторів
            let userPassword : any = $("#userPassword");
            let userCheck : any = $("#userCheck");
            let icon : any = $(".ic");

            if (userName.val() !== "" && userPassword.val() !== "") { // перевірка чи поля заповненні
                let tempUser: object = searchUser(userName.val().trim()); // пошук користувача
                if (tempUser === undefined) { // перевірка чи такий користувач існує
                    if (confirm("Ви не зареєстровані!! Бажаєте зареєструватись?") === true) {
                        window.location.href = "signUP.html";
                    }
                } else if (userPassword.val().trim() !== tempUser["userpassword"]) { // перевірка чи збігаються паролі
                    userName.addClass("error");
                    userPassword.addClass("error");
                    userCheck.removeClass("hidden");
                    userCheck.addClass("input__group__popUp");
                    userCheck.html(`Невірний E-mail або пароль!!`);
                    icon.addClass("icon__error");
                } else if (userName.val().trim() === tempUser["useremail"] && userPassword.val().trim() === tempUser["userpassword"]) { // якщо всі дані збігаються тоді авторизувати користувача
                    localStorage.setItem("authUser", JSON.stringify(tempUser)); // запис авторизованого користувача
                    window.location.href = "../index.html";
                }
            } else {
                alert("Заповніть всі поля!!!");
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



