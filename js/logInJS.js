$(document).ready(function () {
    if (localStorage.getItem("authUser")) {
        window.location.href = "../index.html";
    }

    var userArray = [];

    if (localStorage.getItem("users")){
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
    }

    $("#sign-in").on("click", function () {
       let userName = $("#userEmail");
       let userPassword = $("#userPassword");
       let userCheck = $("#userCheck");
       let icon = $(".ic");

       if (userName.val() !== "" && userPassword.val() !== ""){
           let tempUser = searchUser(userName.val());
           if (tempUser === undefined){
               if(confirm("Ви не зареєстровані!! Бажаєте зареєструватись?") === true){
                   window.location.href = "signin.html";
               }
           }else if (userPassword.val() !== tempUser.userpassword){
               userName.addClass("error");
               userPassword.addClass("error");
               userCheck.removeClass("hidden");
               userCheck.addClass("input__group__popUp");
               userCheck.html(`Невірний E-mail або пароль!!`);
               icon.addClass("icon__error" );
           }else if (userName.val() === tempUser.useremail && userPassword.val() === tempUser.userpassword){
               localStorage.setItem("authUser", JSON.stringify(tempUser));
               window.location.href = "../index.html";
           }
       }else {
           alert("Заповніть всі поля!!!");
       }
    });

    $("#sign-up").on("click", function () {
        window.location.href = "signin.html";
    });

    function searchUser (email){
        let temp;
        for (let i = 0; i < userArray.length; i++){
            if (email === userArray[i].useremail) {
                temp = userArray[i];
            }
        }
        return temp
    }
});

