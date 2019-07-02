
var userArray =[];

if (localStorage.getItem("users" ) !== undefined){
    userArray = JSON.parse(localStorage.getItem("users"));
    console.log(userArray);
    if (userArray === null){
        userArray =[];
        console.log(userArray);
    }
}

document.getElementById("sign-in").onclick = function () {
    var userName = document.getElementById("userName").value;
    var userPassword = document.getElementById("userPassword").value;
    var checkPassword = document.getElementById("userPasswordCheck").value;
    var userEmail = document.getElementById("userEmail").value;


    if (userName === "" || userPassword === "" || checkPassword === "" || userEmail === ""){
        alert("Заповніть всі поля!!")
    }else if (userPassword === checkPassword){
        var tempArray = {};
        tempArray.username = userName;
        tempArray.userpassword = userPassword;
        tempArray.useremail = userEmail;
        var i = userArray.length;
        userArray[i] = tempArray;
        localStorage.setItem("users", JSON.stringify(userArray));
        window.location.href = "../login.html";

    }else {
        alert("Ваші паролі не збігаються!!!")
    }
};