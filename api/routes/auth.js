const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // validate body data
    const {error} = registerValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user email is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('E-Mail already exists!');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});
 
router.post('/login', async (req, res) => {
    // validate body data
    const {error} = loginValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('E-Mail or password is wrong!');

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('E-Mail or password is wrong!');

    // create and assign a jwt token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 3600});
    res.header('auth-token', token).send('Logged In!');
});

module.exports = router;