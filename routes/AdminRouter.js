var express=require('express');
var router=express.Router();
const { check, validationResult } = require("express-validator");
const AdminController = require('../controllers/Admin/v1/AdminController');



router.post(
    "/login",[
        check("email","Please enter a valid email")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @"),
        check("password","Please enter a valid password").isLength({
            min:6
        })
    ],
    AdminController.Login
)