const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
	return "Your notes...";
};

const addNote = (title, body) => {
	const notes = loadNotes();

	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
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
		console.log(
			chalk.green.italic(`Removing `) +
				chalk.yellow.italic(title) +
				chalk.green.italic(` from notes!`)
		);
		for (var i = 0; i < notes.length; i++) {
			if (title === notes[i].title) {
				notes.splice(i, 1);
			}
		}
		saveNotes(notes);
	}
};

const listNotes = () => {
	const notes = loadNotes();
	notes.length === 0
		? console.log(chalk.yellow("No notes to list!"))
		: console.log(chalk.green.italic("Your notes: "));
	notes.forEach((note) => {
		console.log(note.title);
	});
};

const readNote = (title) => {
	const notes = loadNotes();
	const noteToRead = notes.find((note) => note.title === title);
	if (notes.length === 0) {
		console.log(chalk.yellow("No notes to read!"));
	} else if (noteToRead === undefined) {
		console.log(chalk.red("Note not found!"));
	} else {
		console.log(
			chalk.green.italic(`${noteToRead.title}: `) + noteToRead.body
		);
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
	removeNote,
	listNotes,
	readNote
};
