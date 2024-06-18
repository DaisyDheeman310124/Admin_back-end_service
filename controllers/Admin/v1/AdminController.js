const AdminModel = require('../../../models/AdminModels');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Helper = require('../../../config/helper');
const { check, validationResult } = require("express-validator");

const SECRET_KEY = "JWT_OK";


//Login Api//

module.exports={
Login: (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            var data = { errors: errors.array() }
            return Helper.response(res, 400, "Parameter missing.", data);
        }

        var query = { email: req.body.email, status: "Active" }
        AdminModel.findOne(query, (error, adminData) => {

            if (error) {
                return Helper.response(res, 500, "Somthing went wrong!");
            }
            else if (!adminData) {
                return Helper.response(res, 400, "Invalid credentials.");
            }
            else {
                const check = bcypt.compareSync(req.body.password, adminData.password);

                if (check) {
                    var token = jwt.sign({
                        _id: adminData._id,
                        iat: Math.floor(Date.now() / 1000) - 30
                    },
                        SECRET_KEY, { expiresIn: '365d' }
                    )

                    AdminModel.findOneAndUpdate({
                        _id: adminData._id,
                    },
                        { $push: { authToken: token } }, { new: true }).exec(function (err, savedAdmin) {
                            if (err) {
                                return res.status(500).json({
                                    code: 500,
                                    message: "Something went wrong!"
                                })
                            }

                            let result = {
                                adminId: adminData._id,
                                name: adminData.name,
                                email: adminData.email,
                                role: adminData.role,
                                authRoken: token
                            }

                            var data = {
                                "AdminData": result
                            }
                            return Helper.response(res, 200, "Login successfully.", data)
                        })

                } else {
                    return Helper.response(res, 400, "Invalid credential");
                }
            }
        })
    } catch (error) {
        return helper.response(res, 500, "internal server error.")
    }
}
}

