const multer = require("multer");
const uuid = require("uuid");
const parseFile = require("../services/parseCSV");
const birthdayModel = require("../models/Birthday");
const quoteModel = require("../models/Quote");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifiez le dossier de destination où l'image sera enregistrée
    cb(null, process.cwd()+"/temp/");
  },
  filename: function (req, file, cb) {
    // Ajoutez le suffixe unique au nom d'origine du fichier
    cb(null, `${uuid.v4().split('-')[0]}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.GetCSVBirthdaysToBDD = async (req, res) => {
    upload.single("file")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
              message: "An error occurred while uploading the CSV file.",
            });
        }

        // Teacher or Student
        const type = req.body.type;


        const fileCSV = req.file;

        if(!fileCSV) {
            return res.status(400).json({
              message: "Please upload a CSV file.",
            });
        }

        try {
            const data = await parseFile.parseFileBirthdays(fileCSV.filename);

            for (let i = 0; i < data.length; i++) {
                if (type === "student") {
                    await birthdayModel.createBirthdayStudent(data[i]);
                } else if (type === "teacher") {
                    await birthdayModel.createBirthdayTeacher(data[i]);
                }
            }

            res.status(200).json({
              message: "The CSV file has been successfully imported into the database.",
              count: data.length,

            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "An error occurred while importing the CSV file into the database.",
            });
        }
    });
}

exports.GetCSVQuotesToBDD = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
      if (err) {
          console.error(err);
          return res.status(500).json({
            message: "An error occurred while uploading the CSV file.",
          });
      }

      const fileCSV = req.file;

      if(!fileCSV) {
          return res.status(400).json({
            message: "Please upload a CSV file.",
          });
      }

      try {
          const data = await parseFile.parseFileQuotes(fileCSV.filename);
          for (let i = 0; i < data.length; i++) {
              await quoteModel.createQuote(data[i]);
          }

          res.status(200).json({
            message: "The CSV file has been successfully imported into the database.",
            count: data.length,

          });
      } catch (error) {
          console.error(error);
          res.status(500).json({
            message: "An error occurred while importing the CSV file into the database.",
          });
      }
  });
}