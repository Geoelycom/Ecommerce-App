#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

program
    .version('1.4.0')
    .argument('[filename]', 'Name of file to execute')
    .action(async({ filename }) => {
        const name = filename || 'watchit.js';

        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`could not find the file ${name}`);
        }



        let proc;
        const start = debounce(() => {

            if (proc) {
                proc.kill();
            }
            proc = spawn('node', [name], { stdio: 'inherit' });
        }, 100);

        chokidar
            .watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);