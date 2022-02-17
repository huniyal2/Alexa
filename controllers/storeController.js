const { getMonthlyRatingValidation, getStoreTypeRatingValidation } = require("../validations/storeValidation");
const { errorHandler } = require("../common/response.handler");
const { successHandler } = require("../common/response.handler");
const { getProxy } = require("../workerpool/pool");

exports.getMonthlyRatingController = async (req, res, next) => {
    try {
        const error = getMonthlyRatingValidation(req.params);
        const result = {};
        if (error.length) {
            result.details = error;

            return errorHandler(result, res);
        }

        const repoResponse = await getProxy().getMonthlyRatingThreadFunction(req.params);
        if (repoResponse && repoResponse.error) {
            result.details = repoResponse.error;

            return errorHandler(result, res);
        }
        result.body = { monthlyAvgRating: repoResponse.success };

        return successHandler(result, res);

    } catch (error) {
        next(error);
    }
}

exports.getStoreTypeRating = async (req, res, next) => {
    try {
        const error = getStoreTypeRatingValidation(req.params);
        const result = {};

        if (error.length) {
            result.details = error;

            return errorHandler(result, res);
        }

        const repoResponse = await getProxy().getstoreTypeRatingThreadFunction(req.params);
        if (repoResponse && repoResponse.error) {
            result.details = repoResponse.error;

            return errorHandler(result, res);
        }
        result.body = { ratings: repoResponse.success };

        return successHandler(result, res);
    } catch (error) {
        next(error);
    }
}