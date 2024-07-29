const fs = require("fs");
const { parse } = require("csv-parse");

exports.parseFileBirthdays = (filename) => {
    let results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(`./temp/${filename}`)
            .pipe(parse({
                delimiter: ";",
                columns: true,
                bom: true,
            }))
            .on("data", function (row) {
                // Vérifiez si les données sont correctes
                if (row.birthday && row.lastname && row.firstname && row.email) {
                    results.push(row)
                } 
            })
            .on("end", function () {
                resolve(results)
            })
            .on("error", function (error) {
                reject(error.message);
            });
    })
}


exports.parseFileQuotes = (filename) => {
    let results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(`./temp/${filename}`)
            .pipe(parse({
                delimiter: ";",
                columns: true,
                bom: true,
            }))
            .on("data", function (row) {
                // Vérifiez si les données sont correctes
                if (row.quote && row.author) {
                    results.push(row)
                } 
            })
            .on("end", function () {
                resolve(results)
            })
            .on("error", function (error) {
                reject(error.message);
            });
    })
}