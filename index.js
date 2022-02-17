const app = require("express")();
const bodyParser = require("body-parser");
const WorkerCon = require("./workerpool/pool");

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE",
    "X-XSS-Protection": '1; mode=block',
  });

  next()
});



// create response
app.use(function (req, res, next) {
  res.api = {
    'success': true,
    'error': {
      "message": "",
      "details": [{
        "target": "",
        "message": ""
      }]
    },
    'data': {},
    'statusCode': 200
  };
  next();
});

require("./route")(app);

app.use(function (err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

    res.api.success = false;
    res.api.error.message = 'Invalid input';
    res.api.error.details[0].target = 'body';
    res.api.error.details[0].message = err.type;
    res.api.data = {};
    res.api.statusCode = 400;
    res.status(res.api.statusCode);

    return res.send(res.api);
  } else {
    res.api.success = false;
    res.api.error.message = 'Oops! something broke';
    res.api.error.details = [];
    res.api.data = {};
    res.api.statusCode = 500;
    res.status(res.api.statusCode);

    return res.send(res.api);
  }
});

(async () => {
  await WorkerCon.init({ minWorkers: 'max' });


  app.listen(3000, async (req, res) => {
    console.log("Server is started")
  })
}
)()
module.exports = app;