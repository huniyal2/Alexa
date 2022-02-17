const fs = require("fs");
const path = require("path");

exports.getMonthlyRatingRepo = ({ storeType, month }) => {

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "../AlexaData/alexa.json"), "utf8", (err, data) => {
            if (err) {
                reject({ error: err, success: false });
            }

            let totalRating = 0;
            let count = 0;
            let avgMonthlyRating;

            data.split("\n").forEach((item) => {
                let row = JSON.parse(item);
                if (row.review_source.toUpperCase() == storeType.toUpperCase() && parseInt(row.reviewed_date.split("-")[1]) == parseInt(month)) {
                    ++count;
                    totalRating = totalRating + row.rating;
                }
            })
            avgMonthlyRating = (totalRating && count) ? totalRating / count : 0;

            resolve({ error: null, success: avgMonthlyRating.toFixed(1) });
        })
    })
}

exports.getstoreTypeRatingRepo = ({ storeType }) => {

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "../AlexaData/alexa.json"), "utf8", (err, data) => {
            if (err) {
                reject({ error: err, success: false });
            }

            let ratings = [];
            let one = 0, two = 0, three = 0, four = 0, five = 0;
            data.split("\n").forEach((item) => {
                let row = JSON.parse(item);
                if (row.review_source.toUpperCase() == storeType.toUpperCase() && row.rating == 1) {
                    ++one;
                } else if (row.review_source.toUpperCase() == storeType.toUpperCase() && row.rating == 2) {
                    ++two;
                } else if (row.review_source.toUpperCase() == storeType.toUpperCase() && row.rating == 3) {
                    ++three;
                }
                else if (row.review_source.toUpperCase() == storeType.toUpperCase() && row.rating == 4) {
                    ++four;
                }
                else if (row.review_source.toUpperCase() == storeType.toUpperCase() && row.rating == 5) {
                    ++five;
                }
            })

            ratings.push({ "1*": one }, { "2*": two }, { "3*": three }, { "4*": four }, { "5*": five })
            resolve({ error: null, success: ratings });
        })
    })
}