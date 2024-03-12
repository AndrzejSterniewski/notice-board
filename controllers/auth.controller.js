const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
    try {
        const { login, password, phone } = req.body;
        const avatar = req.file.filename;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        console.log(login);
        console.log(password);
        console.log(phone);
        console.log(req.file);
        console.log(avatar);
        console.log(fileType);


        if (login && typeof login === 'string' &&
            password && typeof password === 'string' &&
            phone &&
            req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

            const userWithLogin = await User.findOne({ login });
            if (userWithLogin) {
                fs.unlinkSync(req.file.path);
                return res.status(409)
                    .send({ message: 'User with this login already exists' });
            }

            const user = await User.create({
                login,
                password: await bcrypt.hash(password, 10),
                phone,
                avatar
            });
            res.status(201).send({ message: 'User created ' + user.login });
        } else {
            fs.unlinkSync(req.file.path);
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        fs.unlinkSync(req.file);
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (login && typeof login === 'string' &&
            password && typeof password === 'string') {
            const user = await User.findOne({ login });
            if (!user) {
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    // giving only user login:
                    // req.session.login = user.login;
                    // additional informations:
                    req.session.user = {
                        _id: user.id,
                        login: user.login,
                        avatar: user.avatar
                    }
                    res.status(200).send({ message: 'Login successful' })
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }
        }
        else {
            res.status(400).send({ message: 'Bad request' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    // res.send({ message: 'I\'m logged!' });
    if (req.session.user) {
        res.send({ login: req.session.user.login });
    }
};

// exports.logout = async (req, res) => {
//     try {
//         req.session.destroy();
//         res.send({ message: 'You\'ve been logged out.' });
//     }
//     catch (err) {
//         res.status(500).send({ message: err.message });
//     };
//     if (process.env.NODE_ENV !== "production") await Session.deleteMany({});
// };

exports.logout = async (req, res) => {
    try {
        if (req.session.user) {
            req.session.destroy();
            res.send({ message: 'You\'ve been logged out.' });
        }
        else {
            res.send({ message: 'You are not logged in' });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    };
    // if (process.env.NODE_ENV !== "production") await Session.deleteMany({});
};