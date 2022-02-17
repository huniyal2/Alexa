const workerPool = require("workerpool");
const path = require("path");

let poolProxy = null;

const init = async (options) => {
    const pool = workerPool.pool(path.join(__dirname, "threadfunctions.js"), options);
    poolProxy = await pool.proxy();
}

exports.getProxy = () => {
    return poolProxy;
}

exports.init = init;