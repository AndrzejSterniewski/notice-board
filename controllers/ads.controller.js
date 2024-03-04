const Ad = require('../models/ad.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) res.status(404).json({ message: 'Not found' });
        else res.json(ad);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
};

exports.postAd = async (req, res) => {
    try {
        const { text, date, picture, price, location, userInfo } = req.body;
        const newAdd = new Ad({
            text: text,
            date: date,
            picture: picture,
            price: price,
            location: location,
            userInfo: userInfo
        });
        await newAdd.save();
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.patchAd = async (req, res) => {
    const { text, date, picture, price, location, userInfo } = req.body;
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            ad.text = text;
            ad.date = date;
            ad.picture = picture;
            ad.price = price;
            ad.location = location;
            ad.userInfo = userInfo;
            await ad.save();
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ messsage: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await Ad.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};