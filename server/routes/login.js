const express = require("express");
const user = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library")
const post = require("../models/post")

const router = express.Router();
const secrete = "pankaj@98+27*3";
const client = new OAuth2Client("554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com");



router.post("/login", async (req, res) => {

    try {

        const { tokenId } = req.body;
        let obj = {}
        await client.verifyIdToken({ idToken: tokenId, audience: "554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com" })
            .then((data) => {
                const { email_verified, email } = data.payload

                obj.email = email;
                obj.email_verified = email_verified;
            })
        if (obj.email_verified) {
            const user_data = await user.findOne({ email: obj.email });

            if (user_data != null) {
                const password = obj.email + secrete
                const input = await bcrypt.compare(password, user_data.password);

                if (input) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 100) + (60 * 60),
                        data: user_data._id
                    }, secrete)

                    return res.status(200).json({
                        token: token,
                        userName: obj.email
                    })
                }
            } else {

                const password = obj.email + secrete
                let newpassword = await bcrypt.hash(password, 10)

                const newUser = await user.create({ email: obj.email, password: newpassword });

                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 100) + (60 * 60),
                    data: newUser._id
                }, secrete)

                return res.status(200).json({
                    token: token,
                    userName: obj.email
                })
            }
        } else {
            return res.status(400).json({
                res: "email not verified by goole"
            })

        }
    } catch (e) {

        res.status(400).json({
            res: "something wint wrong"
        })
    }
})



router.post("/add", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData !== null) {


            const data = await post.create(req.body);


            res.status(200).json({

                message: "added to the list"
            })
        }

    } catch (e) {

        res.status(400).json({
            res: " Something went wrong"
        })
    }
})

router.get("/allPosts", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData !== null) {


            const data = await post.find();


            res.status(200).json({

                message: data
            })
        }

    } catch (e) {

        res.status(400).json({
            res: " something Went Wrong"
        })
    }
})


router.post("/delete/:id", async (req, res) => {

    try {

        const token = req.headers.authorization
        const decoded = jwt.verify(token, secrete)
        const userData = await user.findOne({ _id: decoded.data })

        if (userData !== null) {
           const data = await post.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message: "data deleted"
            })
        }

    } catch (e) {

        res.status(400).json({
            res: " Something went wrong"
        })
    }
})

module.exports = router