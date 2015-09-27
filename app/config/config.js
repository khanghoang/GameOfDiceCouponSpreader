import path from "path";
import util from 'util';

let rootPath = path.normalize(__dirname + "/..");
let env = process.env.NODE_ENV || 'development';

let dirname = __dirname + util.format('/%s.config.js', env);
var config = require(dirname);

export default config;