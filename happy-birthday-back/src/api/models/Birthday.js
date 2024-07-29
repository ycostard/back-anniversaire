const db = require("../db/db");

const Birthday = {
    createBirthdayStudent: (birthdayData) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO birthday_student (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
                [birthdayData.birthday, birthdayData.lastname, birthdayData.firstname, birthdayData.email],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                }
            );
        });
    },

    // Create a multiple birthday with promise
    createBirthdayTeacher: (birthdayData) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO birthday_teacher (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
                [birthdayData.birthday, birthdayData.lastname, birthdayData.firstname, birthdayData.email],
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                }
            );
        });
    },

    getAllBirthdayStudentByDate: (date) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM birthday_student WHERE birthday LIKE ?", [`${date}%`], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },

    getAllBirthdayTeacherByDate: (date) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM birthday_teacher WHERE birthday LIKE ?", [`${date}%`], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    },


}

module.exports = Birthday;

