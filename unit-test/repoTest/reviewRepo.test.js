const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const { createReviewRepo, getReviewsRepo } = require("../../repository/reviewRepo");
const fs = require("fs");
let fsAppend, fsRead;

describe("review Repo functions", () => {
    describe("a. createReviewRepo unit test cases", () => {
        let body = { review: "testing review", author: "test name", review_source: "review source", rating: 5, title: "test title", product_name: "test product", reviewed_date: "2018-01-12T02:27:03.000Z" };
        beforeEach("before, createReviewRepo function call", () => {
            fsAppend = sinon.stub(fs, "appendFile");
        })
        afterEach("after, fs append Stub restore", () => {
            fsAppend.restore();
        })
        it("error, while creating Review with fs appendFile", (done) => {
            fsAppend.yields("error while appending");
            createReviewRepo(body).then((result) => {
                done();
            }).catch((err) => {
                expect(err).to.be.an("Object");
                expect(err).to.have.keys(["error", "success"]);
                expect(err.success).to.equal(false);
                done();
            })
        })
        it("success, review created", (done) => {
            fsAppend.yields(null);
            createReviewRepo(body).then((result) => {
                expect(err).to.be.an("Object");
                expect(err).to.have.keys(["error", "success"]);
                expect(err.error).to.equal(null);
                done();
            }).catch((err) => {
                done();
            })
        })
    })
    describe("b. getReviewsRepo unit test cases", () => {
        let query = { rating: 2, storeType: "GooglePlayStore", date: "2017-08-01" }
        beforeEach("before, getReviewsRepo function call", () => {
            fsRead = sinon.stub(fs, "readFile");
        })
        afterEach("after,fs read Stub restore", () => {
            fsRead.restore();
        })
        it("error, should give error while reading", (done) => {
            fsRead.yields("While reading file");
            getReviewsRepo(query).catch((err) => {
                expect(err).to.be.an("Object");
                expect(err).to.have.keys(["error", "success"]);
                expect(err).to.deep.include({ error: "While reading file", success: false });
                done();
            })
        })
        it("success, should give error while reading", (done) => {
            fsRead.yields(null, `{"review":"I can't see the chat logo at the bottom. Can you tell mne why ?? My phone is s8","author":"Lavanya Rani","review_source":"GooglePlayStore","rating":2,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}
            {"review":"Good","author":"","review_source":"GooglePlayStore","rating":5,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}`
            );
            getReviewsRepo(query).then((result) => {
                expect(result).to.be.an("Object");
                expect(result).to.have.keys(["error", "success"]);
                expect(result).to.deep.include({
                    error: null, success: [
                        {
                            "review": "I can't see the chat logo at the bottom. Can you tell mne why ?? My phone is s8",
                            "author": "Lavanya Rani",
                            "review_source": "GooglePlayStore",
                            "rating": 2,
                            "title": "",
                            "product_name": "Amazon Alexa",
                            "reviewed_date": "2017-08-01T00:00:00.000Z"
                        }
                    ]
                });
                done();
            })
        })
    })
})