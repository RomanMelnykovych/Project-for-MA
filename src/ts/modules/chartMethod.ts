/// <reference path="../../../node_modules/anychart/dist/index.d.ts" />

import time = anychart.format.time;
define(['jquery', 'searchMethod', 'amountMethod'], function ($, searchMethod, amountMethod) : object{
    let chartMethods : object = {};

    chartMethods["createChart"] = (typeChart : string, expansion : string, $innerBox : any, periodStart : string, periodEnd : string, arrExpense : [object], arrIncomes : [object]) : void =>{
        if (typeChart === "Pie"){
            createDataPie(expansion, $innerBox, periodStart, periodEnd, arrExpense, arrIncomes);
        }else if (typeChart === "Column"){
            createDataColumn(expansion, $innerBox, periodStart, periodEnd, arrExpense, arrIncomes);
        }else if (typeChart === "Line"){
            createDataLine(expansion, $innerBox, periodStart, periodEnd, arrExpense, arrIncomes);
        }
    };

    function createDataPie(expansion : string, $innerBox : any, periodStart : string, periodEnd : string, arrExpense : [object], arrIncomes : [object]) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);
            let countExp : number = 0;
            countExp = amountMethod.amount(expenseArr, countExp);
            let countInc : number = 0;
            countInc = amountMethod.amount(incomesArr, countInc);
            if (countExp !== undefined || countInc !== undefined){
                let data : [object] = [buildDataChart('Expense', countExp, "#FF0000")];
                data.push(buildDataChart('Incomes', countInc, "#00FF00"));
                createChartPie(data, $innerBox, periodStart, periodEnd, "Statistic");
                console.log(data);
                $innerBox.slideDown("slow");
            }else{
                alert("No data !!");
                $innerBox.hide();
            }

        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);

            let countFood : number = 0;
            if (window.innerWidth < 700){
                if ($("#foodChart").prop("checked")){
                    countFood = amountMethod.amount(searchMethod.searchCategory("Food", expenseArr), countFood);
                    if (countFood === undefined){
                        countFood = 0;
                    }
                }
            }else{
                if ($("#foodChartMain").prop("checked")){
                    countFood = amountMethod.amount(searchMethod.searchCategory("Food", expenseArr), countFood);
                    if (countFood === undefined){
                        countFood = 0;
                    }
                }
            }

            let countCafes : number = 0;
            if (window.innerWidth < 700){
                if ($("#cafesChart").prop("checked")){
                    countCafes = amountMethod.amount(searchMethod.searchCategory("Cafes and restaurants", expenseArr), countCafes);
                    if (countCafes === undefined){
                        countCafes = 0;
                    }
                }
            }else{
                if ($("#cafesChartMain").prop("checked")){
                    countCafes = amountMethod.amount(searchMethod.searchCategory("Cafes and restaurants", expenseArr), countCafes);
                    if (countCafes === undefined){
                        countCafes = 0;
                    }
                }
            }

            let countRelaxation : number = 0;
            if (window.innerWidth < 700){
                if ($("#relaxChart").prop("checked")){
                    countRelaxation = amountMethod.amount(searchMethod.searchCategory("Relaxation", expenseArr), countRelaxation);
                    if (countRelaxation === undefined){
                        countRelaxation = 0;
                    }
                }
            }else{
                if ($("#relaxChartMain").prop("checked")){
                    countRelaxation = amountMethod.amount(searchMethod.searchCategory("Relaxation", expenseArr), countRelaxation);
                    if (countRelaxation === undefined){
                        countRelaxation = 0;
                    }
                }
            }

            let countVehicle : number = 0;
            if (window.innerWidth < 700){
                if ($("#vehicleChart").prop("checked")){
                    countVehicle = amountMethod.amount(searchMethod.searchCategory("Vehicle", expenseArr), countVehicle);
                    if (countVehicle === undefined){
                        countVehicle = 0;
                    }
                }
            }else{
                if ($("#vehicleChartMain").prop("checked")){
                    countVehicle = amountMethod.amount(searchMethod.searchCategory("Vehicle", expenseArr), countVehicle);
                    if (countVehicle === undefined){
                        countVehicle = 0;
                    }
                }
            }

            let countCommunication : number = 0;
            if (window.innerWidth < 700){
                if ($("#communicationChart").prop("checked")){
                    countCommunication = amountMethod.amount(searchMethod.searchCategory("Communication", expenseArr), countCommunication);
                    if (countCommunication === undefined){
                        countCommunication = 0;
                    }
                }
            }else{
                if ($("#communicationChartMain").prop("checked")){
                    countCommunication = amountMethod.amount(searchMethod.searchCategory("Communication", expenseArr), countCommunication);
                    if (countCommunication === undefined){
                        countCommunication = 0;
                    }
                }
            }

            if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
                let data : [object] = [buildDataChart('Food', countFood, "#e7d900")];
                data.push(buildDataChart('Cafes and restaurants', countCafes, "#00974a"));
                data.push(buildDataChart('Relaxation', countRelaxation, "#2a2986"));
                data.push(buildDataChart('Vehicle', countVehicle, "#d31a22"));
                data.push(buildDataChart('Communication', countCommunication, "#009fd9"));
                createChartPie(data, $innerBox, periodStart, periodEnd, "Expense");
                $innerBox.slideDown("slow");
            }else {
                alert("No data !!");
                $innerBox.hide();
            }
        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);

            let countSalary : number = 0;
            if (window.innerWidth < 700){
                if ($("#salaryChart").prop("checked")){
                    countSalary = amountMethod.amount(searchMethod.searchCategory("Salary", incomesArr), countSalary);
                    if (countSalary === undefined){
                        countSalary = 0;
                    }
                }
            }else{
                if ($("#salaryChartMain").prop("checked")){
                    countSalary = amountMethod.amount(searchMethod.searchCategory("Salary", incomesArr), countSalary);
                    if (countSalary === undefined){
                        countSalary = 0;
                    }
                }
            }

            let countPremium : number = 0;
            if (window.innerWidth < 700){
                if ($("#premiumChart").prop("checked")){
                    countPremium = amountMethod.amount(searchMethod.searchCategory("Premium", incomesArr), countPremium);
                    if (countPremium === undefined){
                        countPremium = 0;
                    }
                }
            }else{
                if ($("#premiumChartMain").prop("checked")){
                    countPremium = amountMethod.amount(searchMethod.searchCategory("Premium", incomesArr), countPremium);
                    if (countPremium === undefined){
                        countPremium = 0;
                    }
                }
            }

            let countStipend : number = 0;
            if (window.innerWidth < 700){
                if ($("#stipendChart").prop("checked")){
                    countStipend = amountMethod.amount(searchMethod.searchCategory("Stipend", incomesArr), countStipend);
                    if (countStipend === undefined){
                        countStipend = 0;
                    }
                }
            }else{
                if ($("#stipendChartMain").prop("checked")){
                    countStipend = amountMethod.amount(searchMethod.searchCategory("Stipend", incomesArr), countStipend);
                    if (countStipend === undefined){
                        countStipend = 0;
                    }
                }
            }

            if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
                let data : [object] = [buildDataChart('Salary', countSalary, "#e7d900")];
                data.push(buildDataChart('Premium', countPremium, "#00974a"));
                data.push(buildDataChart('Stipend', countStipend, "#2a2986"));
                createChartPie(data, $innerBox, periodStart, periodEnd, "incomes");
                $innerBox.slideDown("slow");
            }else{
                alert("No data !!");
                $innerBox.hide();
            }
        }
    }

    function createDataColumn(expansion : string, $innerBox: any, periodStart : string, periodEnd : string, arrExpense : [object], arrIncomes : [object]) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);
            let countExp : number = 0;
            countExp = amountMethod.amount(expenseArr, countExp);
            let countInc : number = 0;
            countInc = amountMethod.amount(incomesArr, countInc);
            if (countExp !== undefined || countInc !== undefined){
                let data : [object] = [buildDataChart('Expense', countExp, "#FF0000", null, {enabled: true})];
                data.push(buildDataChart('Incomes', countInc, "#00CC00", null, {enabled: true}));
                createChartColumn(data, $innerBox, periodStart, periodEnd, "Statistics");
                console.log(data);
                $innerBox.slideDown("slow");
            }else {
                alert("No data !!");
                $innerBox.hide();
            }
        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);

            let countFood : number = 0;
            countFood = amountMethod.amount(searchMethod.searchCategory("Food", expenseArr), countFood);
            if (countFood === undefined) {
                countFood = 0;
            }

            let countCafes : number = 0;
            countCafes = amountMethod.amount(searchMethod.searchCategory("Cafes and restaurants", expenseArr), countCafes);
            if (countCafes === undefined){
                countCafes = 0;
            }

            let countRelaxation : number = 0;
            countRelaxation = amountMethod.amount(searchMethod.searchCategory("Relaxation", expenseArr), countRelaxation);
            if (countRelaxation === undefined){
                countRelaxation = 0;
            }

            let countVehicle : number = 0;
            countVehicle = amountMethod.amount(searchMethod.searchCategory("Vehicle", expenseArr), countVehicle);
            if (countVehicle === undefined){
                countVehicle = 0;
            }

            let countCommunication : number = 0;
            countCommunication = amountMethod.amount(searchMethod.searchCategory("Communication", expenseArr), countCommunication);
            if (countCommunication === undefined){
                countCommunication = 0;
            }

            if (countFood !== 0 || countCafes !== 0 || countCommunication !== 0 || countVehicle !== 0 || countRelaxation !== 0){
                let data : [object] = [buildDataChart('Food', countFood, "#e7d900", null, {enabled: true})];
                data.push(buildDataChart('Cafes and restaurants', countCafes, "#00974a", null, {enabled: true}));
                data.push(buildDataChart('Relaxation', countRelaxation, "#2a2986", null, {enabled: true}));
                data.push(buildDataChart('Vehicle', countVehicle, "#d31a22", null, {enabled: true}));
                data.push(buildDataChart('Communication', countCommunication, "#009fd9", null, {enabled: true}));
                createChartColumn(data, $innerBox, periodStart, periodEnd, "Expense");
                $innerBox.slideDown("slow");
            }else {
                alert("No data !!");
                $innerBox.hide();
            }
        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);

            let countSalary : number = 0;
            countSalary = amountMethod.amount(searchMethod.searchCategory("Salary", incomesArr), countSalary);
            if (countSalary === undefined) {
                countSalary = 0;
            }

            let countPremium : number = 0;
            countPremium = amountMethod.amount(searchMethod.searchCategory("Premium", incomesArr), countPremium);
            if (countPremium === undefined){
                countPremium = 0;
            }

            let countStipend : number = 0;
            countStipend = amountMethod.amount(searchMethod.searchCategory("Stipend", incomesArr), countStipend);
            if (countStipend === undefined){
                countStipend = 0;
            }

            if (countSalary !== 0 || countPremium !== 0 || countStipend !== 0){
                let data : [object] = [buildDataChart('Salary', countSalary, "#e7d900", null, {enabled: true})];
                data.push(buildDataChart('Premium', countPremium, "#00974a", null, {enabled: true}));
                data.push(buildDataChart('Stipend', countStipend, "#2a2986", null, {enabled: true}));
                createChartColumn(data, $innerBox, periodStart, periodEnd, "Incomes");
                $innerBox.slideDown("slow");
            }else {
                alert("No data !!");
                $innerBox.hide();
            }
        }
    }

    function createDataLine(expansion : string, $innerBox: any, periodStart : string, periodEnd : string, arrExpense : [object], arrIncomes : [object]) : void{
        if (expansion === "all" || expansion === "allMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);
            let arrData : any;

            /*arrData = [time, expense, incomes]*/
            if (periodStart === periodEnd){
                if (expenseArr !== undefined){
                   arrData = dataSeriesLine(expenseArr, "time", arrData, "All", "Expense");
                }
                if (incomesArr !== undefined){
                    arrData = dataSeriesLine(incomesArr, "time", arrData, "All", "Incomes");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);

                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Statistics", "Time", "All");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }else{
                if (expenseArr !== undefined){
                    arrData = dataSeriesLine(expenseArr, "date", arrData, "All", "Expense");
                }
                if (incomesArr !== undefined){
                    arrData = dataSeriesLine(incomesArr, "date", arrData, "All", "Incomes");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Statistics", "Date", "All");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }
        }else if (expansion === "expenseRadio" || expansion === "expenseRadioMain"){
            let expenseArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrExpense);

            let food : [object] = searchMethod.searchCategory("Food", expenseArr);
            let cafes : [object] = searchMethod.searchCategory("Cafes and restaurants", expenseArr);
            let relax : [object] = searchMethod.searchCategory("Relaxation", expenseArr);
            let vehicle : [object] = searchMethod.searchCategory("Vehicle", expenseArr);
            let communication : [object] = searchMethod.searchCategory("Communication", expenseArr);

            let arrData : any;
            /* arrData ['time', food, Cafes and restaurants, Relaxation, vehicle, communication]*/
            if (periodStart === periodEnd) {
                if (food !== undefined){
                    arrData = dataSeriesLine(food, "time", arrData, "Expense", "Food");
                }
                if (cafes !== undefined) {
                    arrData = dataSeriesLine(cafes, "time", arrData, "Expense", "Cafes and restaurants");
                }
                if (relax !== undefined) {
                    arrData = dataSeriesLine(relax, "time", arrData, "Expense", "Relaxation");
                }
                if (vehicle !== undefined) {
                    arrData = dataSeriesLine(vehicle, "time", arrData, "Expense", "Vehicle");
                }
                if (communication !== undefined) {
                    arrData = dataSeriesLine(communication, "time", arrData, "Expense", "Communication");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Expense", "Time", "Expense");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }else{
                if (food !== undefined){
                    arrData = dataSeriesLine(food, "date", arrData, "Expense", "Food");
                }
                if (cafes !== undefined) {
                    arrData = dataSeriesLine(cafes, "date", arrData, "Expense", "Cafes and restaurants");
                }
                if (relax !== undefined) {
                    arrData = dataSeriesLine(relax, "date", arrData, "Expense", "Relaxation");
                }
                if (vehicle !== undefined) {
                    arrData = dataSeriesLine(vehicle, "date", arrData, "Expense", "Vehicle");
                }
                if (communication !== undefined) {
                    arrData = dataSeriesLine(communication, "date", arrData, "Expense", "Communication");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Expense", "Date", "Expense");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }
        }else if (expansion === "incomesRadio" || expansion === "incomesRadioMain"){
            let incomesArr : [object] = searchMethod.searchPeriod(periodStart, periodEnd, arrIncomes);

            let salary : [object] = searchMethod.searchCategory("Salary", incomesArr);
            let premium : [object] = searchMethod.searchCategory("Premium", incomesArr);
            let stipend : [object] = searchMethod.searchCategory("Stipend", incomesArr);

            let arrData : any;
            /* arrData ['time', salary, premium, stipend]*/
            if (periodStart === periodEnd) {
                if (salary !== undefined){
                    arrData = dataSeriesLine(salary, "time", arrData, "Incomes", "Salary");
                }
                if (premium !== undefined) {
                    arrData = dataSeriesLine(premium, "time", arrData, "Incomes", "Premium");
                }
                if (stipend !== undefined) {
                    arrData = dataSeriesLine(stipend, "time", arrData, "Incomes", "Stipend");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Incomes", "Time", "Incomes");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }else{
                if (salary !== undefined){
                    arrData = dataSeriesLine(salary, "date", arrData, "Incomes", "Salary");
                }
                if (premium !== undefined) {
                    arrData = dataSeriesLine(premium, "date", arrData, "Incomes", "Premium");
                }
                if (stipend !== undefined) {
                    arrData = dataSeriesLine(stipend, "date", arrData, "Incomes", "Stipend");
                }
                if (arrData !== undefined){
                    arrData = arrData.sort();
                    console.log(arrData);
                    createChartLine(arrData, $innerBox, periodStart, periodEnd, "Incomes", "Date", "Incomes");
                    $innerBox.slideDown("slow");
                }else{
                    alert("No data !!");
                    $innerBox.hide();
                }
            }
        }
    }

    function createChartPie(data : [object], $innerBox : any, periodStart : string, periodEnd : string, nameChart : string) : void{
        let chart : any = anychart.pie(data);
        chart.title(`${nameChart}: ${periodStart} - ${periodEnd}`);
        chart.labels().position("outside");
        chart.container(`${$innerBox[0]["id"]}`);
        chart.draw();
    }
    function createChartColumn(data : [object], $innerBox : any, periodStart : string, periodEnd : string, nameChart : string) : void {
        let chart : any = anychart.column();
        let series : any = chart.column(data);
        chart.title(`${nameChart}: ${periodStart} - ${periodEnd}`);
        chart.container(`${$innerBox[0]["id"]}`);
        chart.draw();
    }
    function createChartLine(data : [], $innerBox : any, periodStart : string, periodEnd : string, nameChart : string, yAxisName : string, categoryName : string) : void{
        let arrData : any = anychart.data.set(data);
        let chart : any = anychart.line();

        if (categoryName === "All"){
            let seriesData_1 : any = arrData.mapAs({x: 0, value: 1});
            let seriesData_2 : any = arrData.mapAs({x: 0, value: 2});

            let series1 : any = chart.line(seriesData_1);
            series1.name("Expense");
            series1.normal().stroke("#ff0000");

            let series2 : any = chart.line(seriesData_2);
            series2.name("Incomes");
            series2.normal().stroke("#00ff00");

        }else if(categoryName === "Expense"){
            let seriesData_1 : any = arrData.mapAs({x: 0, value: 1});
            let seriesData_2 : any = arrData.mapAs({x: 0, value: 2});
            let seriesData_3 : any = arrData.mapAs({x: 0, value: 3});
            let seriesData_4 : any = arrData.mapAs({x: 0, value: 4});
            let seriesData_5 : any = arrData.mapAs({x: 0, value: 5});

            let series1 : any = chart.line(seriesData_1);
            series1.name("Food");
            series1.normal().stroke("#e7d900");

            let series2 : any = chart.line(seriesData_2);
            series2.name("Cafes and restaurants");
            series2.normal().stroke("#00974a");

            let series3 : any = chart.line(seriesData_3);
            series3.name("Relaxation");
            series3.normal().stroke("#2a2986");

            let series4 : any = chart.line(seriesData_4);
            series4.name("Vehicle");
            series4.normal().stroke("#d31a22");

            let series5 : any = chart.line(seriesData_5);
            series5.name("Communication");
            series5.normal().stroke("#009fd9");
        }else if (categoryName === "Incomes"){
            let seriesData_1 : any = arrData.mapAs({x: 0, value: 1});
            let seriesData_2 : any = arrData.mapAs({x: 0, value: 2});
            let seriesData_3 : any = arrData.mapAs({x: 0, value: 3});

            let series1 : any = chart.line(seriesData_1);
            series1.name("Salary");
            series1.normal().stroke("#e7d900");

            let series2 : any = chart.line(seriesData_2);
            series2.name("Premium");
            series2.normal().stroke("#00974a");

            let series3 : any = chart.line(seriesData_3);
            series3.name("Stipend");
            series3.normal().stroke("#2a2986");
        }
        chart.title(`${nameChart}: ${periodStart} - ${periodEnd}`);
        chart.xAxis().title(`${yAxisName}`);
        chart.xAxis().staggerMode(true);
        chart.xAxis().labels().hAlign("center");
        chart.yAxis().title("Amount, UAH");

        chart.legend(true);
        chart.container(`${$innerBox[0]["id"]}`);
        chart.draw();
    }

    function dataSeriesLine(categoryArr : [object], yAxisName : string, arrData : any, categoryName : string, name : string) : any{
        if (categoryName === "All"){
            for (let i : number = 0; i < categoryArr.length; i++){
                if (arrData === undefined){
                    if (name === "Expense"){
                        arrData = [[categoryArr[i][`${yAxisName}`],categoryArr[i]["amount"], 0]];
                    }else if(name === "Incomes"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0,categoryArr[i]["amount"]]];
                    }
                }else{
                    let check = false;
                    arrData.forEach(function (index) {
                        if (categoryArr[i][`${yAxisName}`] === index[0]){
                            if (name === "Expense"){
                                index[1] = index[1] + categoryArr[i]["amount"];
                                check = true;
                            }else if(name === "Incomes"){
                                index[2] = index[2] + categoryArr[i]["amount"];
                                check = true;
                            }
                        }
                    });
                    if (check === false){
                        if (name === "Expense"){
                            arrData.push([categoryArr[i][`${yAxisName}`],categoryArr[i]["amount"], 0]);
                        }else if (name === "Incomes"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, categoryArr[i]["amount"]]);
                        }
                    }
                }
            }
        }else if (categoryName === "Expense"){
            /* arrData ['time', food, Cafes and restaurants, Relaxation, vehicle, communication]*/
            for (let i: number = 0; i < categoryArr.length; i++) {
                if (arrData === undefined) {
                    if (name === "Food"){
                        arrData = [[categoryArr[i][`${yAxisName}`], categoryArr[i]["amount"], 0, 0, 0, 0]];
                    }else if (name === "Cafes and restaurants"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, categoryArr[i]["amount"], 0, 0, 0]];
                    }else if (name === "Relaxation"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, 0, categoryArr[i]["amount"], 0, 0]];
                    }else if (name === "Vehicle"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, 0, 0, categoryArr[i]["amount"], 0]];
                    }else if (name === "Communication"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, 0, 0, 0, categoryArr[i]["amount"]]];
                    }
                }else {
                    let check : boolean = false;
                    arrData.forEach(function (index) {
                        if (categoryArr[i][`${yAxisName}`] === index[0]){
                            if (name === "Food"){
                                index[1] = index[1] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Cafes and restaurants"){
                                index[2] = index[2] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Relaxation"){
                                index[3] = index[3] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Vehicle"){
                                index[4] = index[4] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Communication"){
                                index[5] = index[5] + categoryArr[i]["amount"];
                                check = true;
                            }
                        }
                    });
                    if (check === false){
                        if (name === "Food"){
                            arrData.push([categoryArr[i][`${yAxisName}`], categoryArr[i]["amount"], 0,  0, 0, 0]);
                        }else if (name === "Cafes and restaurants"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, categoryArr[i]["amount"], 0,  0, 0]);
                        }else if (name === "Relaxation"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, 0, categoryArr[i]["amount"], 0, 0]);
                        }else if (name === "Vehicle"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, 0, 0, categoryArr[i]["amount"], 0]);
                        }else if (name === "Communication"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, 0, 0, 0, categoryArr[i]["amount"]]);
                        }
                    }
                }
            }
        }else if (categoryName === "Incomes"){
            /* arrData ['time', salary, premium, stipend]*/
            for (let i: number = 0; i < categoryArr.length; i++) {
                if (arrData === undefined) {
                    if (name === "Salary"){
                        arrData = [[categoryArr[i][`${yAxisName}`], categoryArr[i]["amount"], 0, 0]];
                    }else if (name === "Premium"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, categoryArr[i]["amount"], 0]];
                    }else if (name === "Stipend"){
                        arrData = [[categoryArr[i][`${yAxisName}`], 0, 0, categoryArr[i]["amount"]]];
                    }
                }else {
                    let check : boolean = false;
                    arrData.forEach(function (index) {
                        if (categoryArr[i][`${yAxisName}`] === index[0]){
                            if (name === "Salary"){
                                index[1] = index[1] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Premium"){
                                index[2] = index[2] + categoryArr[i]["amount"];
                                check = true;
                            }else if (name === "Stipend"){
                                index[3] = index[3] + categoryArr[i]["amount"];
                                check = true;
                            }
                        }
                    });
                    if (check === false){
                        if (name === "Salary"){
                            arrData.push([categoryArr[i][`${yAxisName}`], categoryArr[i]["amount"], 0,  0]);
                        }else if (name === "Premium"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, categoryArr[i]["amount"], 0,]);
                        }else if (name === "Stipend"){
                            arrData.push([categoryArr[i][`${yAxisName}`], 0, 0, categoryArr[i]["amount"]]);
                        }
                    }
                }
            }
        }
        return arrData;
    }

    interface IDataChart {
        x : string;
        value : number;
        fill : string;
        stroke? : string;
        label? : object;
    }
    function buildDataChart(x : string, value : number, fill : string, stroke? : string, label? : object): IDataChart {
        if (label || stroke){
           return {
               x : x,
               value : value,
               fill : fill,
               stroke : stroke,
               label : label
           }
       }else{
           return {
               x : x,
               value : value,
               fill : fill
           };
       }

    }


    return chartMethods;
});