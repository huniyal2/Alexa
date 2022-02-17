const Joi = require("@hapi/joi");
const constanst = require("../constants");
/**
 * Method to validate request body
 * @param {string} storeType
 * @param {number} month
 * @returns {Array|Array<Object>} err
 */


exports.getMonthlyRatingValidation = ({ storeType, month }) => {
    const err = [];
    storeType = storeType ? storeType.toUpperCase() : storeType;
    const joiSchema = Joi.object({
        storeType: Joi.string().required().valid(...Object.values(constanst.review_source)).messages({
            "string.base": `storeType type should be a string`,
            "string.empty": `storeType type is not allowed to be empty`,
            "any.required": `storeType type is required`,
        }).label("storeType"),
        month: Joi.number().min(1).max(12).required().messages({
            "number.base": `month type should be a number`,
            "number.empty": `month type is not allowed to be empty`,
            "number.min": `month should have a minimum length of {#limit}`,
            "number.max": `month should have a maximum length of {#limit}`,
            "any.required": `month type is required`,
        }).label("month"),
    }).options({
        abortEarly: false,
        allowUnknown: false,
    });

    const { error } = joiSchema.validate({ storeType, month });

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
 * @returns {Array|Array<Object>} err
 */
exports.getStoreTypeRatingValidation = ({ storeType }) => {
    const err = [];
    storeType = storeType ? storeType.toUpperCase() : storeType;
    const joiSchema = Joi.object({
        storeType: Joi.string().required().valid(...Object.values(constanst.review_source)).messages({
            "string.base": `storeType type should be a string`,
            "string.empty": `storeType type is not allowed to be empty`,
            "any.required": `storeType type is required`,
        }).label("storeType"),
    }).options({
        abortEarly: false,
        allowUnknown: false,
    });

    const { error } = joiSchema.validate({ storeType });

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