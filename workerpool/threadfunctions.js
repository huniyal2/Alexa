const workerPool = require("workerpool");
const { getReviewsRepo, createReviewRepo } = require("../repository/reviewRepo");
const { getMonthlyRatingRepo, getstoreTypeRatingRepo } = require("../repository/storeRepo");

const getReviewThreadFunction = (query) => {
    return getReviewsRepo(query);
}

const createReviewThreadFunction = (data) => {
    return createReviewRepo(data);
}

const getMonthlyRatingThreadFunction = (params) => {
    return getMonthlyRatingRepo(params);
}

const getstoreTypeRatingThreadFunction = (params) => {
    return getstoreTypeRatingRepo(params);
}

workerPool.worker({
    getReviewThreadFunction,
    createReviewThreadFunction,
    getMonthlyRatingThreadFunction,
    getstoreTypeRatingThreadFunction
})