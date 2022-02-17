const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const { getMonthlyRatingRepo, getstoreTypeRatingRepo } = require("../../repository/storeRepo");
const fs = require("fs");
let fsRead;

describe("review Repo functions", () => {
    describe("a. getMonthlyRatingRepo unit test cases", () => {
        let data = { storeType: "GooglePlayStore", month: 8 }
        beforeEach("before getMonthlyRatingRepo function call", () => {
            fsRead = sinon.stub(fs, "readFile");
        })
        afterEach("after,fs read Stub restore", () => {
            fsRead.restore();
        })
        it("error, should give error while reading", (done) => {
            fsRead.yields("While reading file");
            getMonthlyRatingRepo(data).catch((err) => {
                expect(err).to.be.an("Object");
                expect(err).to.have.keys(["error", "success"]);
                expect(err).to.deep.include({ error: "While reading file", success: false });
                done();
            })
        })
        it("success, should give error while reading", (done) => {
            fsRead.yields(null, `{"review":"It doesn't even last 3 seconds before crashing. I can't configure my Echo.","author":"Owen Miller","review_source":"GooglePlayStore","rating":1,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}
            {"review":"Alexa does not know ANYTHING!","author":"Alani Serna","review_source":"GooglePlayStore","rating":1,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}`
            );
            getMonthlyRatingRepo(data).then((result) => {
                expect(result).to.be.an("Object");
                expect(result).to.have.keys(["error", "success"]);
                expect(result.error).to.equal(null);
                done();
            })
        })
    })
    describe("b. getstoreTypeRatingRepo unit test cases", () => {
        let data = { storeType: "GooglePlayStore" };
        beforeEach("before getMonthlyRatingRepo function call", () => {
            fsRead = sinon.stub(fs, "readFile");
        })
        afterEach("after,fs read Stub restore", () => {
            fsRead.restore();
        })
        it("error, should give error while reading", (done) => {
            fsRead.yields("While reading json file");
            getstoreTypeRatingRepo(data).catch((err) => {
                expect(err).to.be.an("Object");
                expect(err).to.have.keys(["error", "success"]);
                expect(err).to.deep.include({ error: "While reading json file", success: false });
                done();
            })
        })
        it("success, should give error while reading", (done) => {
            fsRead.yields(null, `{"review":"It doesn't even last 3 seconds before crashing. I can't configure my Echo.","author":"Owen Miller","review_source":"GooglePlayStore","rating":1,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}
            {"review":"Alexa does not know ANYTHING!","author":"Alani Serna","review_source":"GooglePlayStore","rating":1,"title":"","product_name":"Amazon Alexa","reviewed_date":"2017-08-01T00:00:00.000Z"}`
            );
            getstoreTypeRatingRepo(data).then((result) => {
                expect(result).to.be.an("Object");
                expect(result).to.have.keys(["error", "success"]);
                expect(result.error).to.equal(null);
                expect(result.success).to.have.deep.members([{ '1*': 2 }, { '2*': 0 }, { '3*': 0 }, { '4*': 0 }, { '5*': 0 }])
                done();
            })
        })
    })
})