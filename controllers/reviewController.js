const { createReviewValidation, getReviewsValidation } = require("../validations/reviewValidation");
const { errorHandler } = require("../common/response.handler");
const { successHandler } = require("../common/response.handler");
const { getProxy } = require("../workerpool/pool");


exports.createReviewController = async (req, res, next) => {
    try {
        const error = createReviewValidation(req.body);
        const result = {}
        if (error.length) {
            result.details = error;

            return errorHandler(result, res);
        }

        const repoResponse = await getProxy().createReviewThreadFunction(req.body);
        if (repoResponse && repoResponse.error) {
            result.details = repoResponse.error;

            return errorHandler(result, res);
        }
        result.body = "Review successfully created";

        return successHandler(result, res);
    }
    catch (error) {
        next(error);
    }
}

exports.getReviewsController = async (req, res, next) => {
    try {
        const error = getReviewsValidation(req.query);
        const result = {};
        if (error.length) {
            result.details = error;

            return errorHandler(result, res);
        }

        const repoResponse = await getProxy().getReviewThreadFunction(req.query);
        if (repoResponse && repoResponse.error) {
            result.details = repoResponse.error;

            return errorHandler(result, res);
        }
        result.body = repoResponse.success;

        return successHandler(result, res);
    } catch (error) {

    }
}