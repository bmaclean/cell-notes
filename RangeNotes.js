

var preText = "See cell note [[";
var postText = "]]\r\n\r\nThe cell note will appear in the sidebar if you have the Cell Notes\nadd-on installed and opened.For help see bit.ly/cell_notes";
var postTextShort = "For help see bit.ly/cell_notes";
var spacing = "\n_____________\n";
function getNoteForActiveRange(dbSheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getActiveRange();
  
  var dbSheet = ss.getSheetByName(dbSheetName);
  var sheetName = sheet.getName();
  var isSingleCell = (range.getNumRows() == 1) && (range.getNumColumns()==1);
  
  //var isSingleRange = (active.getRow()==range.getLastRow()) && (active.getColumn()==range.getLastColumn()())
  if (!isSingleCell){
    range = ss.getActiveCell();
  }
  var rangeA1 =  range.getA1Notation();
  
  var key = getKeyForRange(range);

  
  var sidenote ;
  var combined = "";
  if (key == null){
    //generating a key here so it can then lookup afterwards for a new row in the db
    key = getNextAvailableKey(dbSheet);
    sidenote = new SideNote(key,getUser(),new Date(),"");
  }
  else{
    sidenote = getNoteWithKey(dbSheet,key);
    if (sidenote!=null){
    }
    if (sidenote==null){
      key = getNextAvailableKey(dbSheet);
      sidenote = new SideNote(key,getUser(),new Date(),"");
    }
    
  }
  combined = sidenote.key + "!@!@" + sidenote.content + "!@!@" +  sheetName + "!@!@" + rangeA1 + "!@!@" + !isSingleCell;
  
  return combined;
  
}

function getSideNotesInRange(dbSheet,range){
  var notes = range.getNotes();
  var sidenotes = [];
  var key = 0;
  var keyInt = 0;
  var note = "";
  var sidenote = null;
  for (var i=0;i<notes.length;i++){
    var row = [];
    for (var j=0;j<notes[i].length;j++){
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
  var note = range.getNote();
  if (note != undefined){
    var key = extractKeyFromNoteText(note);
    var keyInt = parseInt(key);
      
    return keyInt;
  }
  return null;
}

function extractKeyFromNoteText(note){
  var firstChunk = note.split('[[');
  if (firstChunk.length == 2){
    var secondChunk = firstChunk[1].split(']]');
    if (secondChunk.length == 2){
      var key = secondChunk[0];
      return key;
    }
  }
  return null;
}

function removeNoteFromRange(range){
  //var key = "-1";
  //try{
   var key = getKeyForRange(range);
  //}
  //catch(e){}
  
  var note = range.getNote();
  if (note != undefined){
    //remove each piece of the SideNote
    var ammendedNote = deleteSideNoteFromNote(note);
    range.setNote(ammendedNote)
    //range.clearNote();
  }

  return key;
}

function deleteSideNoteFromNote(note){
  var start = note.indexOf(preText);
  var end = note.indexOf(postTextShort) + postTextShort.length;
  var textToDelete = note.substring(start,end);
  var newText = note.replace(textToDelete,"");
  newText = newText.replace(spacing,"");
  return newText;
}

function addNoteWithKeyToRange(key,range){
  var existingNote = range.getNote();
  var text = addKeyToNote(existingNote,key);
  range.setNote(text);
}

function addKeyToNote(existingNote,key){
  var text = existingNote;
  var sidenoteText = preText + key + postText;
  //when there is a note but it doesn't have the sidenotes placeholder
  var keyText = "[[" + key + "]]";
  if (!(existingNote.indexOf(keyText)>-1)){
    text += spacing + sidenoteText;
  }
  
  return text;
}

function isRangeSelectedSingleCell(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getActiveRange();
  var isSingleCell = (range.getNumRows() == 1) && (range.getNumColumns()==1);
  return isSingleCell.toString();
}