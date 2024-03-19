const Ad = require('../models/Ad.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

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
        const { title, text, date, price, location } = req.body;
        const picture = req.file.filename;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        console.log(title);
        console.log(text);
        console.log(date);
        console.log(price);
        console.log(location);

        if (title &&
            text &&
            date &&
            price &&
            location &&
            req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

            const newAdd = new Ad({
                title: title,
                text: text,
                date: date,
                price: price,
                location: location,
                userInfo: req.session.user.id,
                picture: picture
            });
            await newAdd.save();
            res.json({ message: 'OK' });
        }
        else {
            console.log();
            res.status(400).send({ message: 'Bad request' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

exports.patchAd = async (req, res) => {
    const { title, text, date, price, location, userInfo } = req.body;
    const picture = req.file.filename;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    try {
        if (title &&
            text &&
            date &&
            price &&
            location &&
            userInfo &&
            req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {


            const ad = await Ad.findById(req.params.id);
            if (ad) {
                ad.title = title;
                ad.text = text;
                ad.date = date;
                ad.price = price;
                ad.location = location;
                ad.userInfo = userInfo;
                if (picture) {
                    fs.unlinkSync(ad.picture);
                    ad.picture = picture;
                };
                await ad.save();
                res.json({ message: 'OK' });
            }
            else res.status(404).json({ messsage: 'Not found' });
        }
        else {
            res.status(400).send({ message: 'Bad request' });
        }
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