function addNewSideNote(
    range: GoogleAppsScript.Spreadsheet.Range,
    dbSheet: GoogleAppsScript.Spreadsheet.Sheet,
    sidenote: SideNote
) {
    const newSidenote = saveSideNote(dbSheet, sidenote);
    addNoteWithKeyToRange(newSidenote.key, range);
    //showAlert("just saved cell:",range.getA1Notation() + "in key " + sidenote.key)
    return newSidenote;
}

function deleteSideNote(
    dbSheet: GoogleAppsScript.Spreadsheet.Sheet,
    range: GoogleAppsScript.Spreadsheet.Range
) {
    const key = removeNoteFromRange(range);
    if (!key) {
        throw 'There was a problem deleting your cell note.';
    } else {
        deleteSideNoteWithKey(dbSheet, key);
        return key;
    }
}

function promptNoImageOnSidebar() {
    const title = 'Inserting images';
    const message =
        'To insert images, switch to the full-size editor. Do you want to open it now?';
    const response = showYesNoDialog(title, message);
    if (response == true) {
        showExpandedSideNotes();
    }
}

function setAlive() {
    const lastSeenDate = new Date();
    PropertiesService.getUserProperties().setProperty(
        'CellNotesKeepAlive',
        lastSeenDate.toISOString()
    );
}

function getAlive() {
    const keepAliveValue = PropertiesService.getUserProperties().getProperty(
        'CellNotesKeepAlive'
    );
    if (!keepAliveValue) {
        return 'false';
    }
    const lastSeenDate = new Date(keepAliveValue);
    const now = new Date();
    const timeDiff = now.getTime() - lastSeenDate.getTime();
    const isAlive = timeDiff < 6000;
    if (isAlive) {
        return 'true';
    } else {
        return 'false';
    }
}
