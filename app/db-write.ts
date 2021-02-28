function getNextAvailableRowIndex(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    //get table
    const table = getLookupTable(sheet);

    //look for last row in table and add one
    const newRowIndex = table.length + firstRow;

    return newRowIndex;
}

function getNextAvailableKey(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    //get last element in first column
    const key = getNextAvailableRowIndex(sheet);

    return key;
}

function saveSideNote(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    sidenote: SideNote
) {
    //first check if sidenote has a key
    let key = sidenote.key;
    const hasKey = key > -1;

    //check if key exists
    const doesKeyExistInTable = doesKeyExistFast(sheet, key);
    let index: number | null = 999;

    if (hasKey && doesKeyExistInTable) {
        index = getRowIndexForNoteWithKey(key);
    } else {
        index = getNextAvailableRowIndex(sheet);
        key = index; //getNextAvailableKey(sheet,index);
        sidenote.key = key;
    }

    if (!index) {
        throw 'There was a problem saving your cell note.';
    } else {
        writeSideNoteToRowWithIndex(sheet, index, sidenote);
        return sidenote;
    }
}

function deleteSideNoteWithKey(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    key: number
) {
    const range = getRowRangeForNoteWithKey(sheet, key);
    if (range != null) {
        range.getCell(1, 1).setValue('DELETED');
        // const index = range.getRow();
        // sheet.deleteRow(index);
    }
}

function writeSideNoteToRowWithIndex(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    index: number,
    sidenote: SideNote
) {
    //get range - may be a new range or an existing range
    const rowRange = sheet.getRange(index, 1, 1, numCols);

    //prepare data as a row
    const sidenoteData = [];
    const rowData = [
        sidenote.key,
        sidenote.user,
        sidenote.date,
        sidenote.content,
    ];
    sidenoteData.push(rowData);

    //write each item to its own column
    rowRange.setValues(sidenoteData);
}
