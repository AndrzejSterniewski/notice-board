const Ad = require('../models/Ad.model');
const fs = require('fs');

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

exports.getByPhrase = async (req, res) => {
    try {
        // req.params.searchPhrase
        res.json(await Ad.find({ title: { $regex: req.params.searchPhrase } }));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postAd = async (req, res) => {
    try {
        const { title, text, date, price, location, userInfo } = req.body;
        const picture = req.file.filename;
        const newAdd = new Ad({
            title: title,
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
    const { title, text, date, price, location, userInfo } = req.body;
    const picture = req.file.filename;
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            ad.title = title;
            ad.text = text;
            ad.date = date;
            if (picture) {
                fs.unlinkSync(ad.picture);
                ad.picture = picture;
            }
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