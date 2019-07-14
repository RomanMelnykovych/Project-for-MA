$(document).ready(function () {
    var userArray = [];

    if (localStorage.getItem("users" )){
        userArray = JSON.parse(localStorage.getItem("users"));
        console.log(userArray);
        // if (userArray === null){
        //     userArray = [];
        //     console.log(userArray);
        // }
    }
    var userFirstName, userLastName, userPassword, userEmail;

    $("#sign-in").onclick(function () {
        userFirstName = $("#userFirstName");
        userLastName = document.getElementById("userLastName");
        userPassword = document.getElementById("userPassword");
        userEmail = document.getElementById("userEmail");


        if (userFirstName === "" || userLastName === "" || userPassword === "" || userEmail === ""){
            alert("Заповніть всі поля!!")
        }else {
            let tempArray = {};
            tempArray.userfirstname = userFirstName.value;
            tempArray.userlastname = userLastName.value;
            tempArray.userpassword = userPassword.value;
            tempArray.useremail = userEmail.value;
            console.log(tempArray.userpassword);
            if (validate(tempArray.userpassword, tempArray.useremail)){
                userArray.push(tempArray);
                localStorage.setItem("users", JSON.stringify(userArray));
                // window.location.href = "login.html";
            }
        }
    })
});


function validate(pswd, email) {
    validatePswd(pswd);
    validateEmail(email);
    if (validatePswd(pswd) === false){
        userPassword.className += " error";
        document.getElementById("passwordCheck").className = "input__group__popUp";
        document.getElementById("passwordCheck").innerHTML = `Пароль повинен містити тільки латинські великі та маленькі букви, цифри. І довжина більша за 8 символів`;
        document.getElementById("iconErrorPswd").className = "icon__error";
    } else {
        userPassword.className = "form__input";
        document.getElementById("passwordCheck").className = "hidden";
        document.getElementById("iconErrorPswd").className = "hidden";
    }
    if (validateEmail(email) === false){
        userEmail.className += " error";
        document.getElementById("emailCheck").className = "input__group__popUp";
        document.getElementById("emailCheck").innerHTML = `E-mail має мати такий вигляд: yourml@email.com`;
        document.getElementById("iconErrorEmail").className = "icon__error";
    }else {
       userEmail.className = "form__input";
       document.getElementById("emailCheck").className = "hidden";
        document.getElementById("iconErrorEmail").className = "hidden";
    }
    if (validatePswd(pswd) && validateEmail(email)) {
        return true;
    }
}

function validatePswd(pswd){
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    let result = reg.test(pswd);
    return result;

}
function validateEmail(email) {
    let reg = /\S+@\S+\.\S+/;
    let result = reg.test(email);
    return result;
}
