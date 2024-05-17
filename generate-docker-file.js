import fs from 'fs-extra/esm';
import mustache from 'mustache';

const OUTPUT_DIR = './docker';

const cleanDir = () => {
  fs.emptyDirSync(OUTPUT_DIR);
};

const generateDockerFile = () => {
  /**
   * @typedef {Object} ConfigItem
   * @property {string} nodeVersion
   * @property {string} nginxVersion
   * @property {string} osName
   * @property {string} osVersion
   * @property {string} templateName
   */
  /**
   * @type {ConfigItem[]}
   */
  const configs = fs.readJSONSync('./configs/mainline.json');
  const templateList = fs.readdirSync('./templates');

  configs.forEach((config) => {
    const { templateName, nodeVersion, nginxVersion, osName, osVersion } = config;

    const templateContent = fs.readFileSync(`./templates/${templateName}.mustache`, 'utf8');
    const output = mustache.render(templateContent, config);

    fs.outputFileSync(`${OUTPUT_DIR}/${nodeVersion}/${osName}${osVersion}/${nginxVersion}/Dockerfile`, output);
  });
};

cleanDir();
generateDockerFile();
