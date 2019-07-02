var userArray = [];
if (localStorage.getItem("users") !== undefined){
    userArray = JSON.parse(localStorage.getItem("users"));
    console.log(userArray);
}


var temp = {};
document.getElementById("log-in").onclick = function () {

    var userName = document.getElementById("userName").value;
    var userPassword = document.getElementById("userPassword").value;

    if (userName !== "" && userPassword !== ""){
        searchUser(userName);
        if (Object.keys(temp).length === 0 ){
            if(confirm("Ви не зареєстровані!! Бажаєте зареєструватись?") === true){
                window.location.href = "views/Signin.html";
            }
        }else if (userPassword !== temp.userpassword){
            alert("Невірний пароль!!")
        }else {
            localStorage.setItem("authUser", JSON.stringify(temp));
            window.location.href = "https://www.google.com";
        }
    } else {
        alert("Заповніть поля!!!");
    }



    // if (temp.userpassword !== userPassword){
    //     alert("errror")
    // }


    // if (userArray.length !== 0) {
    //     console.log("dfscvxv");
    //         //
    //     //     //     }{
    //     //     //         else {
    //     //     //
    //     //     // }
    // }else console.log("Ви не зареєстровані!!");
};

function searchUser (name){
    for (let i = 0; i < userArray.length; i++){
        for (let key in userArray[i]){
            if (name === userArray[i][key] ) {
                temp = userArray[i];
            }
        }
    }
}


document.getElementById("sign").onclick = function(){
    window.location.href = "views/Signin.html";
};