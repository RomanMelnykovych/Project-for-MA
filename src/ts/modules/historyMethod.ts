define(['jquery', 'searchMethod', 'amountMethod', 'reloadData'], function ($, searchMethod, amountMethod, reloadData) : object {
    let historyMethods : object = {};

    historyMethods["historyExpense"] = ($innerBox: any, start: string, end: string, $amountAll: any, arrExpense: [object], currentUser: object, expense: [object], incomes: [object]) : void => {
        $innerBox.empty();
        let localExpensePeriod : [object];
        localExpensePeriod = searchMethod.searchPeriod(start, end, arrExpense);
        let food : [object],
            cafes : [object],
            relaxation : [object],
            vehicle : [object],
            communication : [object];
        food = searchMethod.searchCategory("Food", localExpensePeriod);
        cafes = searchMethod.searchCategory("Cafes and restaurants", localExpensePeriod);
        relaxation = searchMethod.searchCategory("Relaxation", localExpensePeriod);
        vehicle = searchMethod.searchCategory("Vehicle", localExpensePeriod);
        communication = searchMethod.searchCategory("Communication", localExpensePeriod);
        let countFood : number = 0;
        if (food !== undefined) {
            countFood = amountMethod.amount(food, countFood);
        }
        let countCafes : number = 0;
        if (cafes !== undefined) {
            countCafes = amountMethod.amount(cafes, countCafes);
        }
        let countRelaxation : number = 0;
        if (relaxation !== undefined) {
            countRelaxation = amountMethod.amount(relaxation, countRelaxation);
        }
        let countVehicle : number = 0;
        if (vehicle !== undefined) {
            countVehicle = amountMethod.amount(vehicle, countVehicle);
        }
        let countCommunication : number = 0;
        if (communication !== undefined) {
            countCommunication = amountMethod.amount(communication, countCommunication);
        }

        let countAll : number = 0;
        countAll = countFood + countCafes + countRelaxation + countVehicle + countCommunication;
        if (countAll === undefined) {
            countAll = 0;
        }
        $amountAll.html(`${countAll}`);
        if (food !== undefined) {
            $innerBox.html(`<div id="food" class="history-item">Food<span>${countFood}</span></div>
                           <div id="itemDetailFood" class="box-hidden detail-line"></div>`);
        }
        if (cafes !== undefined) {
            $innerBox.append(`<div id="cafes" class="history-item">Cafes and restaurants<span>${countCafes}</span></div>
                               <div id="itemDetailCafes" class="box-hidden detail-line"></div>`);
        }
        if (relaxation !== undefined) {
            $innerBox.append(`<div id="relaxation" class="history-item">Relaxation<span>${countRelaxation}</span></div>
                           <div id="itemDetailRelaxation" class="box-hidden detail-line"></div>`);
        }
        if (vehicle !== undefined) {
            $innerBox.append(`<div id="vehicle" class="history-item">Vehicle<span>${countVehicle}</span></div>
                               <div id="itemDetailVehicle" class="box-hidden detail-line"></div>`);
        }
        if (communication !== undefined) {
            $innerBox.append(`<div id="communication" class="history-item">Communication<span>${countCommunication}</span></div>
                               <div id="itemDetailCommunication" class="box-hidden detail-line"></div>`);
        }
        $("#food").on("click", function (): void {
            openDetailItem($("#itemDetailFood"), food, "food");
            let $arrBtn: any = $("button[id^='delfood']");
            $arrBtn.on("click", function () : void {
                searchDelBtn($arrBtn, this, food, arrExpense, currentUser, "expense", start, end, expense, incomes);
            });
        });
        $("#cafes").on("click", function (): void {
            openDetailItem($("#itemDetailCafes"), cafes, "cafes");
            let $arrBtn: any = $("button[id^='delcafes']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, cafes, arrExpense, currentUser, "expense", start, end, expense, incomes);
            });
        });
        $("#relaxation").on("click", function (): void {
            openDetailItem($("#itemDetailRelaxation"), relaxation, "relaxation");
            let $arrBtn: any = $("button[id^='delrelaxation']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, relaxation, arrExpense, currentUser, "expense", start, end, expense, incomes);
            });
        });
        $("#vehicle").on("click", function (): void {
            openDetailItem($("#itemDetailVehicle"), vehicle, "vehicle");
            let $arrBtn: any = $("button[id^='delvehicle']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, vehicle, arrExpense, currentUser, "expense", start, end, expense, incomes);
            });
        });
        $("#communication").on("click", function (): void {
            openDetailItem($("#itemDetailCommunication"), communication, "communication");
            let $arrBtn: any = $("button[id^='delcommunication']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, communication, arrExpense, currentUser, "expense", start, end, expense, incomes);
            });
        });
    };
    historyMethods["historyIncomes"] = ($innerBox: any, start: string, end: string, $amountAll: any, arrIncomes: [object], currentUser: object, expense: [object], incomes: [object]) : void => {
        $innerBox.empty();
        let localIncomesPeriod: [object];
        localIncomesPeriod = searchMethod.searchPeriod(start, end, arrIncomes);
        let salary: [object],
            premium: [object],
            stipend: [object];
        salary = searchMethod.searchCategory("Salary", localIncomesPeriod);
        premium = searchMethod.searchCategory("Premium", localIncomesPeriod);
        stipend = searchMethod.searchCategory("Stipend", localIncomesPeriod);
        let countSalary: number = 0;
        if (salary !== undefined) {
            countSalary = amountMethod.amount(salary, countSalary);
        }
        let countPremium: number = 0;
        if (premium !== undefined) {
            countPremium = amountMethod.amount(premium, countPremium);
        }
        let countStipend: number = 0;
        if (stipend !== undefined) {
            countStipend = amountMethod.amount(stipend, countStipend);
        }
        let countAll: number = 0;
        countAll = countSalary + countPremium + countStipend;
        if (countAll === undefined) {
            countAll = 0;
        }
        $amountAll.html(`${countAll}`);
        if (salary !== undefined) {
            $innerBox.html(`<div id="salary" class="history-item">Salary<span>${countSalary}</span></div>
                           <div id="itemDetailSalary" class="box-hidden detail-line"></div>`);
        }
        if (premium !== undefined) {
            $innerBox.append(`<div id="premium" class="history-item">Premium<span>${countPremium}</span></div>
                               <div id="itemDetailPremium" class="box-hidden detail-line"></div>`);
        }
        if (stipend !== undefined) {
            $innerBox.append(`<div id="stipend" class="history-item">Stipend<span>${countStipend}</span></div>
                           <div id="itemDetailStipend" class="box-hidden detail-line"></div>`);
        }
        $("#salary").on("click", function (): void {
            openDetailItem($("#itemDetailSalary"), salary, "salary");
            let $arrBtn: any = $("button[id^='delsalary']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, salary, arrIncomes, currentUser, "incomes", start, end, expense, incomes);
            });
        });
        $("#premium").on("click", function (): void {
            openDetailItem($("#itemDetailPremium"), premium, "premium");
            let $arrBtn: any = $("button[id^='delpremium']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, premium, arrIncomes, currentUser, "incomes", start, end, expense, incomes);
            });
        });
        $("#stipend").on("click", function (): void {
            openDetailItem($("#itemDetailStipend"), stipend, "stipend");
            let $arrBtn: any = $("button[id^='delstipend']");
            $arrBtn.on("click", function (): void {
                searchDelBtn($arrBtn, this, stipend, arrIncomes, currentUser, "incomes", start, end, expense, incomes);
            });
        });
    };

    function openDetailItem($itemIDDetailBox: any, arrayCateg: [object], nameCateg: string) : void {
        $itemIDDetailBox.empty();
        for (let i: number = 0; i < arrayCateg.length; i++) {
            $itemIDDetailBox.append(`<div id="${nameCateg}${i}" class="detail-item">
                                            <div class="item-wrapper">
                                                <div>${arrayCateg[i]["date"]}  ${arrayCateg[i]["time"]}</div>
                                                <span>${arrayCateg[i]["amount"]}</span>
                                                <button type="button" id="del${nameCateg}${i}" class="item-delete-btn"><i class="fas fa-minus"></i></button>
                                                </div>
                                       </div>`);
        }
        $itemIDDetailBox.slideDown("slow");
    }

    function searchDelBtn($arrayBtn: any, $thisBtn: any, arrayCateg: [object], globalArr: [object], currentUser: object, nameArray: string, startData: string, endDate: string, arrExpense: [object], arrIncomes: [object]) : void {
        for (let i: number = 0; i < $arrayBtn.length; i++) {
            if ($arrayBtn[i].id === $thisBtn.id) {
                searchDelItem(arrayCateg[i]["date"], arrayCateg[i]["time"], arrayCateg[i]["category"], arrayCateg[i]["amount"], globalArr, currentUser, nameArray, startData, endDate, arrExpense, arrIncomes);
            }
        }
    }

    function searchDelItem(date: string, time: string, name: string, amount: number, array: [object], currentUser: object, nameArray: string, startDate: string, endDate: string, arrExpense: [object], arrIncomes: [object]) : void {
        for (let i: number = 0; i < array.length; i++) {
            if (array[i]["date"] === date && array[i]["time"] === time && array[i]["category"] === name && array[i]["amount"] === amount) {
                let index: number = array.indexOf(array[i]);
                array.splice(index, 1);
                currentUser[nameArray] = array;
                localStorage.setItem("authUser", JSON.stringify(currentUser));
                if (nameArray === "expense") {
                    if (window.innerWidth >= 700) {
                        historyMethods["historyExpense"]($("#historyExpenseMainPeriod"), startDate, endDate, $("#amountExpenseHistoryMainAll"), arrExpense, currentUser, arrExpense, arrIncomes);
                        reloadData.reloadMain(arrExpense, arrIncomes);
                    } else {
                        historyMethods["historyExpense"]($("#historyExpensePeriod"), startDate, endDate, $("#amountExpenseHistoryAll"), arrExpense, currentUser, arrExpense, arrIncomes);
                    }
                } else if (nameArray === "incomes") {
                    if (window.innerWidth >= 700) {
                        historyMethods["historyIncomes"]($("#historyIncomesMainPeriod"), startDate, endDate, $("#amountIncomesHistoryMainAll"), arrIncomes, currentUser, arrExpense, arrIncomes);
                        reloadData.reloadMain(arrExpense, arrIncomes);
                    } else {
                        historyMethods["historyIncomes"]($("#historyIncomesPeriod"), startDate, endDate, $("#amountIncomesHistoryAll"), arrIncomes, currentUser, arrExpense, arrIncomes);
                    }
                }
            }
        }
    }

    return historyMethods;
});





