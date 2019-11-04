const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
}


const removeNote = function(title) {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    if (keepNotes.length === notes.length) {
        console.log(chalk.red.inverse("No note found!"))
    } else {
        console.log(chalk.green.inverse("Note Removed!"))
    }
    saveNotes(keepNotes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }
}


const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse("Your notes"))
    notes.forEach((note) => {
        console.log(chalk.green.inverse(note.title))
    })
}

const readNode = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title == title)
    if(findNote) {
        console.log(chalk.green.inverse('Title ' + findNote.title + '\nBody: ' + findNote.body))
    } else {
        console.log(chalk.red.inverse("ERROR!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNode
}





