const db = require("../db/db");

const Quote = {
    //Get all quotes with promise
    getAllQuotes: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM quote", (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    // Create a quote with promise
    createQuote: (quoteData) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO quote (quote, author) VALUES (?, ?)",
                [quoteData.quote, quoteData.author],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                }
            );
        });
    },

    getRandomQuote: () => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM quote ORDER BY RANDOM() LIMIT 1", (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    },
}

module.exports = Quote;