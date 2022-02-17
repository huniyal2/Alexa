const router = require("express").Router();
const { createReviewController, getReviewsController } = require("../controllers/reviewController");

router.post("/", (req, res, next) => {
    createReviewController(req, res, next);
})

router.get("/", (req, res, next) => {
    getReviewsController(req, res, next);
})

module.exports = router;