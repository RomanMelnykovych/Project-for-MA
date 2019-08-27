define(function () : object{
    let dateMethods : object = {};

    dateMethods["getCurrentYear"] = () : number =>{
        let currentYear : any = new Date();
        currentYear = currentYear.getFullYear();
        return currentYear;
    };
    dateMethods["getCurrentMonthStart"] =  (d : any) : string =>{
        d = new Date(d);
        let monthStart : any = new Date(d.getFullYear(), d.getMonth(), 1);
        let monthDay : string | number = monthStart.getDate();
        let month : string | number = monthStart.getMonth()+1;
        if (monthDay < 10){
            monthDay = "0" + monthDay;
        }
        if (month < 10){
            month = "0" + month;
        }
        month = monthStart.getFullYear() + "-" + month + "-" + monthDay;
        return month;
    };
    dateMethods["getCurrentMonthEnd"] = (d : any) : string =>{
        d = new Date(d);
        let monthEnd : any = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        let monthDay : string | number = monthEnd.getDate();
        let month : string | number = monthEnd.getMonth()+1;
        if (monthDay < 10){
            monthDay = "0" + monthDay;
        }
        if (month < 10){
            month = "0" + month;
        }
        month = monthEnd.getFullYear() + "-" + month + "-" + monthDay;
        return month;
    };
    dateMethods["getMonday"] = (d : any) : string =>{
        let day : number = d.getDay();
        if (day === 0){
            day = 7;
        }
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 1);
        let weekDay : string | number = d.getDate();
        let weekMonth : string | number = d.getMonth() + 1;
        if (weekDay < 10){
            weekDay = "0" + weekDay;
        }
        if (weekMonth < 10){
            weekMonth = "0" + weekMonth;
        }
        d = d.getFullYear() + "-" + weekMonth + "-" + weekDay;
        return d;
    };
    dateMethods["getSunday"] = (d : any) : string =>{
        let day : number = d.getDay();
        if (day === 0){
            day = 7;
        }
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 7);
        let weekDay : string | number = d.getDate();
        let weekMonth : string | number = d.getMonth() + 1;
        if (weekDay < 10){
            weekDay = "0" + weekDay;
        }
        if (weekMonth < 10){
            weekMonth = "0" + weekMonth;
        }
        d = d.getFullYear() + "-" + weekMonth + "-" + weekDay;
        return d;
    };
    dateMethods["currentDay"] = () : string =>{
        let currentDay : any = new Date();
        let day : string | number = currentDay.getDate();
        let month : string | number = currentDay.getMonth() + 1;
        let year : string | number = currentDay.getFullYear();
        if (month < 10) {
            month = "0"+month;
        }
        if (day < 10){
            day = "0"+day;
        }
        currentDay = year + "-" + month + "-" + day;
        return currentDay;
    };
    dateMethods["currentTime"] = () : string =>{
        let currentTime : any = new Date();
        let hour : string | number = currentTime.getHours();
        let minutes : string | number = currentTime.getMinutes();
        if (hour < 10){
            hour  = "0" + hour;
        }
        if(minutes < 10){
            minutes = "0"+ minutes;
        }
        currentTime = hour + ":" + minutes;
        return currentTime
    };

    return dateMethods;
});