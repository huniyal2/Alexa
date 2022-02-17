const Joi = require("@hapi/joi");
const constanst = require("../constants");
/**
 * Method to validate request body
 * @param {string} review
 * @param {string} author
 * @param {string} review_source
 * @param {string} rating
 * @param {string} title
 * @param {string} product_name
 * @param {string} reviewed_date
 * @returns {Array} err
 */

exports.createReviewValidation = ({ review, author, review_source, rating, title, product_name, reviewed_date }) => {
    const err = [];
    const joiSchema = Joi.object({
        review: Joi.string().required().messages({
            "string.base": `review type should be a string`,
            "string.empty": `review type is not allowed to be empty`,
            "any.required": `review type is required`,
        }).label("review"),
        author: Joi.string().required().messages({
            "string.base": `author type should be a string`,
            "string.empty": `author type is not allowed to be empty`,
            "any.required": `author type is required`,
        }).label("author"),
        review_source: Joi.string().required().valid(...Object.values(constanst.review_source)).messages({
            "string.base": `review_source type should be a string`,
            "string.empty": `review_source type is not allowed to be empty`,
            "any.required": `review_source type is required`,
        }).label("review_source"),
        rating: Joi.number().min(1).max(5).required().messages({
            "string.base": `rating type should be a number`,
            "string.empty": `rating type is not allowed to be empty`,
            "any.required": `rating type is required`,
        }).label("rating"),
        title: Joi.string().required().messages({
            "string.base": `title type should be a string`,
            "string.empty": `title type is not allowed to be empty`,
            "any.required": `title type is required`,
        }).label("title"),
        product_name: Joi.string().required().messages({
            "string.base": `product_name type should be a string`,
            "string.empty": `product_name type is not allowed to be empty`,
            "any.required": `product_name type is required`,
        }).label("product_name"),
        reviewed_date: Joi.date().iso().required().messages({
            "string.base": `reviewed_date type should in correct format`,
            "string.empty": `reviewed_date type is not allowed to be empty`,
            "any.required": `reviewed_date type is required`,
        }).label("reviewed_date"),
    }).options({
        abortEarly: false,
        allowUnknown: false,
    });

    const { error } = joiSchema.validate({ review, author, review_source, rating, title, product_name, reviewed_date });

    if (error) {
        error.details.forEach((item) => {
            const errorDetails = {};
            errorDetails.target = item.context.label;
            errorDetails.message = item.message.replace(/"/g, "'");
            err.push(errorDetails);
        })
    }

    return err;
}

/**
 * Method to validate request body
* @param {string} storeType
* @param {string} rating
* @param {string} date
* @returns {Array} err
*/
exports.getReviewsValidation = ({ storeType, rating, date }) => {
    const err = [];
    storeType = storeType?storeType.toUpperCase():storeType;
    const joiSchema = Joi.object({
        storeType: Joi.string().optional().valid(...Object.values(constanst.review_source)).messages({
            "string.base": `storeType type should be a string`,
        }).label("storeType"),
        rating: Joi.number().min(1).max(5).optional().messages({
            "string.base": `rating type should be a number`,
        }).label("rating"),
        date: Joi.date().iso().optional()
    }).options({
        abortEarly: false,
        allowUnknown: false,
    });

    const { error } = joiSchema.validate({ storeType, rating, date });

    if (error) {
        error.details.forEach((item) => {
            const errorDetails = {};
            errorDetails.target = item.context.label;
            errorDetails.message = item.message.replace(/"/g, "'");
            err.push(errorDetails);
        })
    }

    return err;
}