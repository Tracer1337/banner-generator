module.exports = {
    table: "banners",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "user_id varchar(255) NOT NULL",
        "raw_filename varchar(255) NOT NULL",
        "build_filename varchar(255)",
        "textboxes TEXT NOT NULL",
        "FOREIGN KEY (user_id) REFERENCES users(id)"
    ]
}