const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const roleRouter = require('./role');

router.use('/users',userRouter);
router.use('/roles',roleRouter);


module.exports = router;
