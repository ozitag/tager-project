const fs = require('fs');
const path = require('path');

const ensureDirectoryExistence = filePath => {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

const throwError = error => {
    console.error('Error: ' + error);
    process.exit();
};

const preparePrettyJSON = jsonObject => {
    return JSON.stringify(JSON.parse(JSON.stringify(jsonObject)), null, 2);
};

if (process.argv.length < 4) {
    throwError('Source config or destination config are missed');
}

const sourceConfigFile = __dirname + '/' + process.argv[2];
if (!fs.existsSync(sourceConfigFile)) {
    throwError('Source config not found');
}

const sourceConfig = require(sourceConfigFile);

if (!sourceConfig.admin) {
    process.exit();
}

const destConfig = __dirname + '/' + process.argv[3];
ensureDirectoryExistence(destConfig);
fs.writeFileSync(destConfig, preparePrettyJSON(sourceConfig.admin));