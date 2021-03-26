const fs = require('fs');


class Runner {
    constructor() {
        this.files = [];
    }
    async collectFiles() {
        const files = await fs.promises.readdir(targetPath);
        return files;
    }
}


module.exports = Runner;