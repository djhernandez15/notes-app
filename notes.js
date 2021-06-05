const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
	return "Your notes...";
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => {
		return note.title === title;
	});

	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body
		});

		saveNotes(notes);
		console.log(chalk.green.italic("New note added!"));
	} else {
		console.log(chalk.red.italic("Note title taken!"));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	if (notes.length === 0) {
		console.log(chalk.yellow.italic("No notes to remove!"));
	} else {
		console.log(chalk.green.italic(`Removing `) + chalk.yellow.italic(title) + chalk.green.italic(` from notes!`));
		for (var i = 0; i < notes.length; i++) {
			if (title === notes[i].title) {
				notes.splice(i, 1);
			}
		}
		saveNotes(notes);
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

module.exports = {
	getNotes,
	addNote,
	removeNote
};
