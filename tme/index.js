#!/usr/bin/env node


const Runner = require('./runner');
const runnner = new Runner();
const run = async() => {
    const results = await Runner.collectFiles();
    console.log(results);
}

run()