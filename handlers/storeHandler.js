const router = require("express").Router();
const { getMonthlyRatingController, getStoreTypeRating } = require("../controllers/storeController");

router.get("/:storeType/month/:month", (req, res, next) => {
    getMonthlyRatingController(req, res, next);
})

router.get("/:storeType/rating", (req, res, next) => {
    getStoreTypeRating(req, res, next);
})
module.exports = router;