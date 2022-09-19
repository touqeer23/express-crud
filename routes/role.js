const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role.controller');


router.post('/add',RoleController.addRole);

module.exports = router;
