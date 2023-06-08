const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const fileHandler = {
  async readDataFromFile() {
    try {
      const data = await readFile('movies.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  },

  async writeDataToFile(data) {
    await writeFile('movies.json', JSON.stringify(data), 'utf8');
  },
};

module.exports = fileHandler;
