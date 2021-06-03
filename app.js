const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is David.');

fs.appendFileSync('notes.txt', ` I'm a software developer!`);