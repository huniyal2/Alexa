const chai = require("chai");
const { expect } = chai;
const { createReviewValidation, getReviewsValidation } = require("../../validations/reviewValidation");

describe("review validation functions", () => {
    describe("getReviewsValidation validation function", () => {
        it("success, should return empty array", () => {
            let request = {
                storeType: "GooglePlayStore",
                rating: 2,
                date: "2017-08-01"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array").that.is.empty;
        })
        it("error, invalid value for storeType", () => {
            let request = {
                storeType: "a",
                rating: 2,
                date: "2017-08-01"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array");
            expect(err).to.have.deep.members([
                {
                    target: 'storeType',
                    message: "'storeType' must be one of [GOOGLEPLAYSTORE, ITUNES]"
                }
            ]);
        })
        it("error, rating should be a number", () => {
            let request = {
                storeType: "GooglePlayStore",
                rating: "abc",
                date: "2017-08-01"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array");
            expect(err).to.have.deep.members([{ target: 'rating', message: "'rating' must be a number" }])
        })
        it("error, rating should be a number less than equal to 5", () => {
            let request = {
                storeType: "GooglePlayStore",
                rating: 6,
                date: "2017-08-01"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array");
            expect(err).to.have.deep.members([
                {
                    "target": "rating",
                    "message": "'rating' must be less than or equal to 5"
                }
            ])
        })
        it("error, rating should be a number greater than or  equal to 1", () => {
            let request = {
                storeType: "GooglePlayStore",
                rating: 0,
                date: "2017-08-01"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array");
            expect(err).to.have.deep.members([
                {
                    "target": "rating",
                    "message": "'rating' must be larger than or equal to 1"
                }
            ])
        })
        it("error, date should be in ISO format, YYYY-MM-DD", () => {
            let request = {
                storeType: "GooglePlayStore",
                rating: 4,
                date: "01-08-2018"
            }
            const err = getReviewsValidation(request);
            expect(err).to.be.an("Array");
            expect(err).to.have.deep.members([
                {
                    "target": "date",
                    "message": "'date' must be in ISO 8601 date format"
                }
            ]);
        })

    })
    describe("createReviewValidation validation function", () => {
        it("success, should return an empty array", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array").that.is.empty;
        })
        it("error, should give required field for function arguments", () => {
            let request = {}

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review",
                    "message": "review type is required"
                },
                {
                    "target": "author",
                    "message": "author type is required"
                },
                {
                    "target": "review_source",
                    "message": "review_source type is required"
                },
                {
                    "target": "rating",
                    "message": "rating type is required"
                },
                {
                    "target": "title",
                    "message": "title type is required"
                },
                {
                    "target": "product_name",
                    "message": "product_name type is required"
                },
                {
                    "target": "reviewed_date",
                    "message": "reviewed_date type is required"
                }
            ])
        })
        it("error, review should be of type string", () => {
            let request = {
                review: 567,
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review",
                    "message": "review type should be a string"
                }
            ])
        })
        it("error, review can't be empty", () => {
            let request = {
                review: "",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review",
                    "message": "review type is not allowed to be empty"
                }
            ])
        })
        it("error, review is required", () => {
            let request = {
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review",
                    "message": "review type is required"
                }
            ])
        })
        it("error, author should be of type string", () => {
            let request = {
                review: "testing review",
                author: 567,
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "author",
                    "message": "author type should be a string"
                }
            ])
        })
        it("error, author can't be empty", () => {
            let request = {
                review: "testing review",
                author: "",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "author",
                    "message": "author type is not allowed to be empty"
                }
            ])
        })
        it("error, author is required", () => {
            let request = {
                review: "testing review",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "author",
                    "message": "author type is required"
                }
            ])
        })
        it("error, review_source is required", () => {
            let request = {
                review: "testing review",
                author: "test author",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review_source",
                    "message": "review_source type is required"
                }
            ])
        })
        it("error, review_source only allowed one of [GOOGLEPLAYSTORE, ITUNES]", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "test source",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "review_source",
                    "message": "'review_source' must be one of [GOOGLEPLAYSTORE, ITUNES]"
                }
            ])
        })
        it("error, rating is required", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                title: "test title",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "rating",
                    "message": "rating type is required"
                }
            ])
        })
        it("error, title should be of type string", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: 567,
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "title",
                    "message": "title type should be a string"
                }
            ])
        })
        it("error, title can't be empty", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "",
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "title",
                    "message": "title type is not allowed to be empty"
                }
            ])
        })
        it("error, title is required", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                product_name: "test product",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "title",
                    "message": "title type is required"
                }
            ])
        })
        it("error, product name should be of type string", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: 567,
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "product_name",
                    "message": "product_name type should be a string"
                }
            ])
        })
        it("error, product name can't be empty", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "product_name",
                    "message": "product_name type is not allowed to be empty"
                }
            ])
        })
        it("error, product name is required", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                reviewed_date: "2018-01-12T02:27:03.000Z"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "product_name",
                    "message": "product_name type is required"
                }
            ])
        })
        it("error, reviewed date should be in ISO format", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product",
                reviewed_date: "12-02-2018"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "reviewed_date",
                    "message": "'reviewed_date' must be in ISO 8601 date format"
                }
            ])
        })
        it("error, reviewed date is required", () => {
            let request = {
                review: "testing review",
                author: "test author",
                review_source: "GOOGLEPLAYSTORE",
                rating: 5,
                title: "test title",
                product_name: "test product"
            }

            let result = createReviewValidation(request)
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "reviewed_date",
                    "message": "reviewed_date type is required"
                }
            ])
        })
    })
})