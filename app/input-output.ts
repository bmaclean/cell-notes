

function addNewSideNote(range,dbSheet,sidenote) {
  var sidenote = saveSideNote(dbSheet,sidenote);
  addNoteWithKeyToRange(sidenote.key,range);
  //showAlert("just saved cell:",range.getA1Notation() + "in key " + sidenote.key)
  return sidenote;
}

function deleteSideNote(dbSheet,range){
  var key = removeNoteFromRange(range);
  deleteSideNoteWithKey(dbSheet,key);
  return key;
}

function promptNoImageOnSidebar(){
  var title = "Inserting images";
  var message = "To insert images, switch to the full-size editor. Do you want to open it now?";
  var response = showYesNoDialog(title,message)
  if (response == true){
    showExpandedSideNotes();
  }
}

function setAlive(){
  var lastSeenDate = new Date();
  PropertiesService.getUserProperties().setProperty("CellNotesKeepAlive", lastSeenDate.toISOString());
}

function getAlive(){
  var lastSeenDate = new Date(PropertiesService.getUserProperties().getProperty("CellNotesKeepAlive"));
  var now = new Date();
  var timeDiff = now.getTime()-lastSeenDate.getTime();
  var isAlive = (timeDiff)<6000;
  if (isAlive){
    return "true";
  }
  else{
    return "false";
  }
}