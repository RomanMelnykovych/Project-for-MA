requirejs.config({
    baseUrl: "src/ts",
    paths: {
        "jquery": "../lib/jquery",
        "eventHandler": "modules/eventHandler",
        "getDate": "modules/getDate",
        "searchMethod": "modules/searchMethod",
        "amountMethod": "modules/amountMethod",
        "historyMethod": "modules/historyMethod",
        "chartMethod": "modules/chartMethod",
        "reloadData": "modules/reloadData"
    }
});

requirejs(["indexJS"]);