const fs = require('fs');

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(' ');
    const command = userInputArray[0];

    switch(command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(' '));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "sort":
            commandLibrary.sort(userInputArray.slice(1));
            break;
        case "wc":
            commandLibrary.wc(userInputArray.slice(1));
            break;
        case "uniq":
            commandLibrary.uniq(userInputArray.slice(1));
            break;
    }
}

const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) console.log(err);
            done(data);
        });
    },
    "sort": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) console.log(err);

            data = data.toString().trim();
            let lines = data.split('\n');
            done(lines.sort().filter((line) => line != '\r').join('\n'));
        });
    },
    "wc": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) console.log(err);

            data = data.toString().trim();
            let lines = (data.split('\n')).length;
            let words = (data.split(' ')).length;
            let size = fs.statSync(fileName).size;

            done(`${lines} ${words} ${size} ${fileName}`);
        });
    },
    "uniq": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err) console.log(err);

            data = data.toString().trim();
            let lines = data.split('\n');
            lines = lines.sort().filter((line) => line != '\r');
            let unique = [...new Set(lines)];
            done([...unique].join('\n'));
        });
    }
};

exports.commandLibrary = commandLibrary;
exports.evaluateCmd = evaluateCmd;
