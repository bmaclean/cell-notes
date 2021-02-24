

const preText = 'See cell note [[';
const postText = ']]\r\n\r\nThe cell note will appear in the sidebar if you have the Cell Notes\nadd-on installed and opened.For help see bit.ly/cell_notes';
const postTextShort = 'For help see bit.ly/cell_notes';
const spacing = '\n_____________\n';
function getNoteForActiveRange(dbSheetName) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    let range = sheet.getActiveRange();
  
    const dbSheet = ss.getSheetByName(dbSheetName);
    const sheetName = sheet.getName();
    const isSingleCell = (range.getNumRows() == 1) && (range.getNumColumns()==1);
  
    //var isSingleRange = (active.getRow()==range.getLastRow()) && (active.getColumn()==range.getLastColumn()())
    if (!isSingleCell){
        range = ss.getActiveCell();
    }
    const rangeA1 =  range.getA1Notation();
  
    let key = getKeyForRange(range);

  
    let sidenote ;
    let combined = '';
    if (key == null){
    //generating a key here so it can then lookup afterwards for a new row in the db
        key = getNextAvailableKey(dbSheet);
        sidenote = new SideNote(key,getUser(),new Date(),'');
    }
    else{
        sidenote = getNoteWithKey(dbSheet,key);
        if (sidenote!=null){
        }
        if (sidenote==null){
            key = getNextAvailableKey(dbSheet);
            sidenote = new SideNote(key,getUser(),new Date(),'');
        }
    
    }
    combined = sidenote.key + '!@!@' + sidenote.content + '!@!@' +  sheetName + '!@!@' + rangeA1 + '!@!@' + !isSingleCell;
  
    return combined;
  
}

function getSideNotesInRange(dbSheet,range){
    const notes = range.getNotes();
    const sidenotes = [];
    let key = 0;
    let keyInt = 0;
    let note = '';
    let sidenote = null;
    for (let i=0;i<notes.length;i++){
        const row = [];
        for (let j=0;j<notes[i].length;j++){
            note = notes[i][j];
            key = extractKeyFromNoteText(note);
            keyInt = parseInt(key);
            sidenote = getNoteWithKey(dbSheet,key);
            row.push(sidenote);
        }
        sidenotes.push(row);
    }
    return sidenotes;
}

function getKeyForRange(range){
    const note = range.getNote();
    if (note != undefined){
        const key = extractKeyFromNoteText(note);
        const keyInt = parseInt(key);
      
        return keyInt;
    }
    return null;
}

function extractKeyFromNoteText(note){
    const firstChunk = note.split('[[');
    if (firstChunk.length == 2){
        const secondChunk = firstChunk[1].split(']]');
        if (secondChunk.length == 2){
            const key = secondChunk[0];
            return key;
        }
    }
    return null;
}

function removeNoteFromRange(range){
    //var key = "-1";
    //try{
    const key = getKeyForRange(range);
    //}
    //catch(e){}
  
    const note = range.getNote();
    if (note != undefined){
    //remove each piece of the SideNote
        const ammendedNote = deleteSideNoteFromNote(note);
        range.setNote(ammendedNote);
    //range.clearNote();
    }

    return key;
}

function deleteSideNoteFromNote(note){
    const start = note.indexOf(preText);
    const end = note.indexOf(postTextShort) + postTextShort.length;
    const textToDelete = note.substring(start,end);
    let newText = note.replace(textToDelete,'');
    newText = newText.replace(spacing,'');
    return newText;
}

function addNoteWithKeyToRange(key,range){
    const existingNote = range.getNote();
    const text = addKeyToNote(existingNote,key);
    range.setNote(text);
}

function addKeyToNote(existingNote,key){
    let text = existingNote;
    const sidenoteText = preText + key + postText;
    //when there is a note but it doesn't have the sidenotes placeholder
    const keyText = '[[' + key + ']]';
    if (!(existingNote.indexOf(keyText)>-1)){
        text += spacing + sidenoteText;
    }
  
    return text;
}

function isRangeSelectedSingleCell(){
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const range = sheet.getActiveRange();
    const isSingleCell = (range.getNumRows() == 1) && (range.getNumColumns()==1);
    return isSingleCell.toString();
}