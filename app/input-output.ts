

function addNewSideNote(range,dbSheet,sidenote) {
    var sidenote = saveSideNote(dbSheet,sidenote);
    addNoteWithKeyToRange(sidenote.key,range);
    //showAlert("just saved cell:",range.getA1Notation() + "in key " + sidenote.key)
    return sidenote;
}

function deleteSideNote(dbSheet,range){
    const key = removeNoteFromRange(range);
    deleteSideNoteWithKey(dbSheet,key);
    return key;
}

function promptNoImageOnSidebar(){
    const title = 'Inserting images';
    const message = 'To insert images, switch to the full-size editor. Do you want to open it now?';
    const response = showYesNoDialog(title,message);
    if (response == true){
        showExpandedSideNotes();
    }
}

function setAlive(){
    const lastSeenDate = new Date();
    PropertiesService.getUserProperties().setProperty('CellNotesKeepAlive', lastSeenDate.toISOString());
}

function getAlive(){
    const lastSeenDate = new Date(PropertiesService.getUserProperties().getProperty('CellNotesKeepAlive'));
    const now = new Date();
    const timeDiff = now.getTime()-lastSeenDate.getTime();
    const isAlive = (timeDiff)<6000;
    if (isAlive){
        return 'true';
    }
    else{
        return 'false';
    }
}