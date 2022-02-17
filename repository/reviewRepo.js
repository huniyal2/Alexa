const fs = require("fs");
const path = require("path");

exports.createReviewRepo = (data) => {

    return new Promise((resolve, reject) => {

        fs.appendFile(path.join(__dirname, "../AlexaData/alexa.json"), "\n" + JSON.stringify(data), (err) => {
            if (err) {
                reject({ error: err, success: false });
            }

            resolve({ error: null, success: true });
        })
    })
}

exports.getReviewsRepo = (query) => {

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "../AlexaData/alexa.json"), "utf8", (err, data) => {
            if (err) {
                reject({ error: err, success: false });
            }

            const result = [];
            data.split("\n").forEach((item) => {
                let row = JSON.parse(item);
                if ((query.storeType && row.review_source.toUpperCase() == query.storeType.toUpperCase()) && (query.rating && row.rating == query.rating) && (query.date && row.reviewed_date.split("T")[0] == query.date)) {
                    result.push(row);
                } else
                    if ((query.storeType && row.review_source.toUpperCase() == query.storeType.toUpperCase()) && (query.rating && row.rating == query.rating) && !query.date) {
                        result.push(row);
                    } else
                        if ((query.storeType && row.review_source.toUpperCase() == query.storeType.toUpperCase()) && (query.date && row.reviewed_date.split("T")[0] == query.date) && !query.rating) {
                            result.push(row);
                        } else
                            if ((query.rating && row.rating == query.rating) && (query.date && row.reviewed_date.split("T")[0] == query.date) && !query.storeType) {
                                result.push(row);
                            }
                            else
                                if (!query.rating && !query.date && query.storeType && (row.review_source.toUpperCase() == query.storeType.toUpperCase())) {
                                    result.push(row);
                                } else
                                    if (!query.storeType && !query.date && query.rating && (row.rating == query.rating)) {
                                        result.push(row);
                                    } else
                                        if (!query.storeType && !query.rating && query.date && row.reviewed_date.split("T")[0] == query.date) {
                                            result.push(row);
                                        } else if (!query.date && !query.storeType && !query.rating) {
                                            result.push(row);
                                        }

            })

            resolve({ error: null, success: result })
        })
    })
}