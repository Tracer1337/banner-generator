const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const AuthController = require("../app/Controllers/AuthController.js")
const BannerController = require("../app/Controllers/BannerController.js")

const router = express.Router()

router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth", ProtectMiddleware, AuthController.profile)

router.post("/banner", ProtectMiddleware, BannerController.store)

module.exports = router