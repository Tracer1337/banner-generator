const Model = require("../../lib/Model.js")

class Banner extends Model {
    static findBy = Model.findBy.bind({ model: Banner, table: "banners" })
    static findAllBy = Model.findAllBy.bind({ model: Banner, table: "banners" })
    static where = Model.where.bind({ model: Banner, table: "banners" })

    constructor(values) {
        super({
            table: "banners",
            columns: ["id", "user_id", "raw_filename", "build_filename", "textboxes"],
            ...values
        })
    }

    toJSON() {
        return {
            id: this.id,
            build_filename: this.build_filename
        }
    }
}

module.exports = Banner