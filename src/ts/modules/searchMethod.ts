define(function () : object{
    let searchMethods : object = {};

    searchMethods["searchDay"] = (day : string, array : [object]) : [object] =>{
        let newArray : [object] ;
        for (let i : number = 0; i < array.length; i++){
            if (array[i]["date"] === day){
                if (newArray === undefined){
                    newArray = [array[i]];
                }else {
                    newArray.push(array[i]);
                }
            }
        }
        return newArray;
    };
    searchMethods["searchPeriod"] = (start : string, end : string, array : [object]) : [object] =>{
        let newArray : [object];
        if (array !== undefined){
            for (let i : number = 0; i < array.length; i++){
                if (array[i]["date"] >= start && array[i]["date"] <= end){
                    if (newArray === undefined){
                        newArray = [array[i]];
                    }else {
                        newArray.push(array[i]);
                    }
                }
            }
            console.log(newArray);
            return newArray;
        }
    };

    searchMethods["searchCategory"] = (name : string, array : [object]) : [object] =>{
        if (array !== undefined){
            let newArray : [object];
            for (let i : number = 0; i < array.length; i++){
                if(array[i]["category"] === name){
                    if (newArray === undefined){
                        newArray = [array[i]];
                    }else {
                        newArray.push(array[i]);
                    }
                }
            }
            return newArray;
        }
    };
    searchMethods["searchUser"] = (email : string, userArray : [object], authUser : object) : [object] =>{
        for (let i : number = 0; i < userArray.length; i++){
            if (email === userArray[i]["useremail"]) {
                userArray[i] = authUser;
            }
        }
        return userArray;
    };

    return searchMethods;
});
