const preText = 'See cell note [[';
const postText =
    ']]\r\n\r\nThe cell note will appear in the sidebar if you have the Cell Notes\nadd-on installed and opened.For help see bit.ly/cell_notes';
const postTextShort = 'For help see bit.ly/cell_notes';
const spacing = '\n_____________\n';

function getNoteForActiveRange(dbSheetName: string) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    let range = sheet.getActiveRange();

    const dbSheet = ss.getSheetByName(dbSheetName);
    const sheetName = sheet.getName();
    const isSingleCell = range?.getNumRows() == 1 && range.getNumColumns() == 1;

    //var isSingleRange = (active.getRow()==range.getLastRow()) && (active.getColumn()==range.getLastColumn()())
    if (!isSingleCell) {
        range = ss.getActiveCell();
    }
    const rangeA1 = range?.getA1Notation();

    let key = getKeyForRange(range);

    let sidenote;
    let combined = '';
    if (key == null) {
        //generating a key here so it can then lookup afterwards for a new row in the db
        key = getNextAvailableKey(dbSheet);
        sidenote = new SideNote(key, getUser(), new Date(), '');
    } else {
        sidenote = getNoteWithKey(dbSheet, key);
        if (sidenote == null) {
            key = getNextAvailableKey(dbSheet);
            sidenote = new SideNote(key, getUser(), new Date(), '');
        }
    }
    combined =
        sidenote.key +
        '!@!@' +
        sidenote.content +
        '!@!@' +
        sheetName +
        '!@!@' +
        rangeA1 +
        '!@!@' +
        !isSingleCell;

    return combined;
}

function getSideNotesInRange(
    dbSheet: GoogleAppsScript.Spreadsheet.Sheet,
    range: GoogleAppsScript.Spreadsheet.Range
) {
    const notes = range.getNotes();
    const sidenotes = [];
    let key: number | null = 0;
    let note = '';
    let sidenote = null;
    for (let i = 0; i < notes.length; i++) {
        const row = [];
        for (let j = 0; j < notes[i].length; j++) {
            note = notes[i][j];
            key = extractKeyFromNoteText(note);
            if (!key) continue;
            sidenote = getNoteWithKey(dbSheet, key);
            row.push(sidenote);
        }
        sidenotes.push(row);
    }
    return sidenotes;
}

function getKeyForRange(range: GoogleAppsScript.Spreadsheet.Range) {
    const note = range.getNote();
    if (note != undefined) {
        const key = extractKeyFromNoteText(note);
        return key ? parseInt(key) : null;
    }
    return null;
}

function extractKeyFromNoteText(note: string) {
    const firstChunk = note.split('[[');
    if (firstChunk.length == 2) {
        const secondChunk = firstChunk[1].split(']]');
        if (secondChunk.length == 2) {
            const key = secondChunk[0];
            return parseInt(key);
        }
    }
    return null;
}

function removeNoteFromRange(range: GoogleAppsScript.Spreadsheet.Range) {
    //var key = "-1";
    //try{
    const key = getKeyForRange(range);
    //}
    //catch(e){}

    const note = range.getNote();
    if (note != undefined) {
        //remove each piece of the SideNote
        const ammendedNote = deleteSideNoteFromNote(note);
        range.setNote(ammendedNote);
        //range.clearNote();
    }

    return key;
}

function deleteSideNoteFromNote(note) {
    const start = note.indexOf(preText);
    const end = note.indexOf(postTextShort) + postTextShort.length;
    const textToDelete = note.substring(start, end);
    let newText = note.replace(textToDelete, '');
    newText = newText.replace(spacing, '');
    return newText;
}

function addNoteWithKeyToRange(
    key: number,
    range: GoogleAppsScript.Spreadsheet.Range
) {
    const existingNote = range.getNote();
    const text = addKeyToNote(existingNote, key);
    range.setNote(text);
}

function addKeyToNote(existingNote: string, key: number) {
    let text = existingNote;
    const sidenoteText = preText + key + postText;
    //when there is a note but it doesn't have the sidenotes placeholder
    const keyText = '[[' + key + ']]';
    if (!(existingNote.indexOf(keyText) > -1)) {
        text += spacing + sidenoteText;
    }

    return text;
}

function isRangeSelectedSingleCell() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const range = sheet.getActiveRange();
    const isSingleCell = range?.getNumRows() == 1 && range.getNumColumns() == 1;
    return isSingleCell.toString();
}
