
const User = require('../models/user');
const Role = require('../models/role');
const UserStorage = require('../models/user.storage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadToFirebaseStorage } = require('../shared/firebase/firebase.storage');
const { __parse } = require('../shared/helper');


async function register(req, res, next) {

    try {

        const { email, password, user_role } = req.body;
        const checkUserExist = await User.findOne({ email: email });
        if (checkUserExist && Object.keys(checkUserExist).length) {
            throw new Error('user with this email already exist');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userRole = __parse(await Role.findOne({ name: user_role }));
        if (!userRole || !Object.keys(userRole).length) {
            throw new Error('Selected Role not found !');
        }
        const user = new User({ email: email, password: hashedPassword, role: userRole._id });
        const createdUser = __parse(await user.save());
        res.status(200).json({ message: 'success', result: { data: { ...createdUser } } });

    } catch (error) {
        res.status(401).json({ message: error?.message });
    }

}

async function login(req, res, next) {
    try {

        const { email, password } = req.body;
        const foundUser = __parse(await User.findOne({ email: email }));
        if (!foundUser) {
            throw new Error('Use not found !');
        }
        const passwordCheck = bcrypt.compareSync(password, foundUser?.password || '');
        if (!passwordCheck) {
            throw new Error('Incorrect password !')
        }
        delete foundUser.password;
        const token = jwt.sign({ data: foundUser }, 'mysecret123!@#', { expiresIn: '5h' });
        res.status(200).json({
            message: ' success', restult: {
                token: token,
                data: { ...foundUser }
            }
        });

    } catch (error) {
        res.status(401).json({ message: error?.message, data: {} });
    }
}

async function uploadFiles(req, res, next) {

    try {

        const filesArray = req.files['files'];
        const { user_id } = req.body;
        const toBeCreatedFilesLink = [];
        if (filesArray.length) {
            
            await Promise.all(filesArray.map(async (d) => {
                const result = await uploadToFirebaseStorage(d.buffer, d.originalname);
                console.log('result: ', result);
                toBeCreatedFilesLink.push({ user: user_id, url: result });
            }));
            
            
            const insertedFiles = await UserStorage.insertMany(toBeCreatedFilesLink);
            res.status(200).json({ message: 'success', result: { data: insertedFiles } })
        }

    } catch (error) {
        res.status(401).json({ message: error?.message, data: {} });
    }
}

module.exports = {
    register,
    login,
    uploadFiles
}