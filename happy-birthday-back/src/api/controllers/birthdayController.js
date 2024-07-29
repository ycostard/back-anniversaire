const { DateTime } = require("luxon");
const birthdayModel = require("../models/Birthday");

exports.getTodaysBirthday = async (req, res) => {
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL'); //=> '2014 août 06'

    const BIRTHDAY_STUDENT = await birthdayModel.getAllBirthdayStudentByDate(todaysDate);

    const BIRTHDAY_TEACHER = await birthdayModel.getAllBirthdayTeacherByDate(todaysDate);

    res.json({
        count_total: BIRTHDAY_TEACHER.length + BIRTHDAY_STUDENT.length,
        students_birthday : BIRTHDAY_STUDENT,
        teachers_birthday : BIRTHDAY_TEACHER
    })
}