const chai = require("chai");
const { expect } = chai;
const { getMonthlyRatingValidation, getStoreTypeRatingValidation } = require("../../validations/storeValidation");

describe("storeValidation function unit test cases", () => {
    describe("getMonthlyRatingValidation function unit test", () => {
        it("success, it should return an empty array", () => {
            let data = { storeType: "GOOGLEPLAYSTORE", month: 8 };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array").that.is.empty;
        })
        it("error, month is required", () => {
            let data = { storeType: "GOOGLEPLAYSTORE" };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "month",
                    "message": "month type is required"
                }
            ])
        })
        it("error, month should be greater than or equal to 1", () => {
            let data = { storeType: "GOOGLEPLAYSTORE", month: 0 };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "month",
                    "message": "month should have a minimum length of 1"
                }
            ])
        })
        it("error, month should be greater than or equal to 1", () => {
            let data = { storeType: "GOOGLEPLAYSTORE", month: 13 };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "month",
                    "message": "month should have a maximum length of 12"
                }
            ])
        })
        it("error, month should be a number", () => {
            let data = { storeType: "GOOGLEPLAYSTORE", month: "abc" };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "month",
                    "message": "month type should be a number"
                }
            ])
        })
        it("error, storeType is required", () => {
            let data = { month: 8 };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "storeType",
                    "message": "storeType type is required"
                }
            ])
        })
        it("error, storeType sllowed values one of [GOOGLEPLAYSTORE, ITUNES]", () => {
            let data = { storeType: "abc", month: 8 };
            let result = getMonthlyRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "storeType",
                    "message": "'storeType' must be one of [GOOGLEPLAYSTORE, ITUNES]"
                }
            ])
        })
    })
    describe("getStoreTypeRatingValidation function unit test", () => {
        it("should be an empty array", () => {
            let data = { storeType: "GOOGLEPLAYSTORE" };
            let result = getStoreTypeRatingValidation(data);
            expect(result).to.be.an("Array").that.is.empty;
        })
        it("error, storeType sllowed values one of [GOOGLEPLAYSTORE, ITUNES]", () => {
            let data = { storeType: "abc" };
            let result = getStoreTypeRatingValidation(data);
            expect(result).to.be.an("Array");
            expect(result).to.have.deep.members([
                {
                    "target": "storeType",
                    "message": "'storeType' must be one of [GOOGLEPLAYSTORE, ITUNES]"
                }
            ])
        })
    })
})