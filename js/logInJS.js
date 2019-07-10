if (localStorage.getItem("authUser")) {
    window.location.href = "../index.html";
}

var userArray = [];
if (localStorage.getItem("users")){
    userArray = JSON.parse(localStorage.getItem("users"));
    console.log(userArray);
}

document.getElementById("log-in").onclick = function () {
    var userName = document.getElementById("userName").value;
    var userPassword = document.getElementById("userPassword").value;

    if (userName !== "" && userPassword !== ""){
        let temp = searchUser(userName);
        console.log(temp);
        if (temp === undefined){
            if(confirm("Ви не зареєстровані!! Бажаєте зареєструватись?") === true){
                window.location.href = "signin.html";
            }
        }else if (userPassword !== temp.userpassword){
            alert("Невірний пароль!!")
        }else {
            localStorage.setItem("authUser", JSON.stringify(temp));
            window.location.href = "../index.html";
        }
    } else {
        alert("Заповніть поля!!!");
    }
};

document.getElementById("sign").onclick = function(){
    window.location.href = "signin.html";
};


function searchUser (name){
    let temp;
    for (let i = 0; i < userArray.length; i++){
        for (let key in userArray[i]){
            if (name === userArray[i][key] ) {
                temp = userArray[i];
            }
        }
    }
    return temp
}
