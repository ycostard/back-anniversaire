const quoteModel = require('../models/Quote');

exports.getRandomQuote = async (req, res) => {
    try {
        const quote = await quoteModel.getRandomQuote();
        res.json(quote);
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: error.message });
    }
};
