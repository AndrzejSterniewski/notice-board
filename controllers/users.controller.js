const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await User.find({}));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ message: 'Not found' });
        else res.json(user);
    }
    catch (err) {
        res.status(404).json({ message: err });
    }
};

exports.postUser = async (req, res) => {
    try {
        const { login, password, avatar, phone } = req.body;
        const newUser = new User({
            login: login,
            password: password,
            avatar: avatar,
            phone: phone
        });
        await newUser.save();
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.patchUser = async (req, res) => {
    const { login, password, avatar, phone } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.login = login;
            user.password = password;
            user.avatar = avatar;
            user.phone = phone;
            await user.save();
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ messsage: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};