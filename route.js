module.exports = (app) => {
  
    app.use('/reviews', require("./handlers/reviewHandler"));
    app.use('/store', require("./handlers/storeHandler"));
  };
  