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

const processDockerComposeFile = (filePath, config) => {
    if (fs.existsSync(filePath) === false) {
        console.log('Docker file `' + filePath + '` is not found');
        return;
    }

    let fileRaw = fs.readFileSync(filePath, 'utf-8').toString();
    Object.keys(config).forEach(key => {
        const value = typeof config[key] === 'boolean' ? (config[key] ? 1 : 0) : config[key];
        fileRaw = fileRaw.replace('{{CONFIG_' + key + '}}', value);
    });
    fs.writeFileSync(filePath, fileRaw);
};

const throwError = error => {
    console.error('Error: ' + error);
    process.exit();
};

const preparePrettyJSON = jsonObject => {
    return JSON.stringify(JSON.parse(JSON.stringify(jsonObject)), null, 2);
};

if (process.argv.length < 3) {
    throwError('Project root is not set');
}

const projectRoot = __dirname + '/' + process.argv[2];

const sourceConfigFile = projectRoot + '/config.json';

if (!fs.existsSync(sourceConfigFile)) {
    throwError('Source config not found');
}

const sourceConfig = require(sourceConfigFile);

if (!sourceConfig.admin) {
    process.exit();
}

const adminConfig = sourceConfig.admin;

const destConfig = projectRoot + '/admin/src/config.json';
ensureDirectoryExistence(destConfig);
fs.writeFileSync(destConfig, preparePrettyJSON(adminConfig));

processDockerComposeFile(projectRoot + '/docker-compose.dev.yml', adminConfig);
processDockerComposeFile(projectRoot + '/docker-compose.yml', adminConfig);