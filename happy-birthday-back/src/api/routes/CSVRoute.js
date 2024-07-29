module.exports = (server) => {
    const CSVController = require("../controllers/CSVController");

    server
        .post("/importBirthdays", CSVController.GetCSVBirthdaysToBDD)
        .post("/importQuotes", CSVController.GetCSVQuotesToBDD)
}