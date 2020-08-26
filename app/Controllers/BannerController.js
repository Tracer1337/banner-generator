const { v4: uuid } = require("uuid")
const sharp = require("sharp")
const path = require("path")

const Banner = require("../Models/Banner.js")

const MAX_WIDTH = 1024
const MAX_HEIGHT = 300

const ROOT_DIR = path.join(__dirname, "..", "..")

async function store(req, res) {
    if (!req.body.image || !req.body.textboxes) {
        return res.status(400).end()
    }

    /**
     * Format image and store in temp folder
     */
    const isGif = req.body.image.indexOf("image/gif") !== -1

    const buffer = Buffer.from(req.body.image.replace(/.*base64,/, ""), "base64")
    const image = sharp(buffer)
    const metadata = await image.metadata()

    if (metadata.width > MAX_WIDTH) {
        sharp.resize({ width: MAX_WIDTH })
    } else if (metadata.height > MAX_HEIGHT) {
        sharp.resize({ height: MAX_HEIGHT })
    }

    const outPath = path.join(ROOT_DIR, "temp", "image." + (isGif ? "gif" : "jpeg"))

    await image
            .toFormat(isGif ? "gif" : "jpeg")
            .toFile(outPath)

    res.end()
}

module.exports = { store }