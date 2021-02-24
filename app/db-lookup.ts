const KEY = 'Key';
const USER = 'User';
const DATE = 'Date';
const CONTENT = 'Content';
const firstRow = 3;
const firstCol = 1;
const noCols = 4;
const contentCol = 3;

function doesKeyExistFast(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    key: number
) {
    let keyFound = false;
    if (key != null) {
        const value = sheet.getRange(key, 1).getValue();
        keyFound = value != '';
    }
    return keyFound;
}

function getNoteWithKey(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    key: number
) {
    //row data
    if (key != null) {
        if (key > -1) {
            const rowData = sheet.getRange(key, 1, 1, 4).getValues();

            //convert into SideNote object.
            //mfg_tag assuming the order of the headers will stay the same for now
            if (rowData != undefined) {
                const content =
                    rowData[0][0] == 'DELETED' ? '' : rowData[0][contentCol];
                const rowValuesForKey = new SideNote(
                    key,
                    rowData[0][1],
                    rowData[0][2],
                    content
                );
                return rowValuesForKey;
            }
        }
    }
    return null;
}

function getRowRangeForNoteWithKey(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    key: number
) {
    //get the row index
    const rowIndex = getRowIndexForNoteWithKey(key);
    if (rowIndex != null) {
        //now get the row range
        const range = sheet.getRange(rowIndex, 1, 1, noCols);
        return range;
    }
    return null;
}

function getRowIndexForNoteWithKey(key: number) {
    //row data
    if (key > -1) {
        //get the row
        const row = key;

        return row;
    }

    return null;
}

function getLookupRange(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    //get table limits
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(
        firstRow,
        firstCol,
        lastRow - (firstRow - 1),
        noCols
    );
    return range;
}

function getLookupTable(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const range = getLookupRange(sheet);
    const table = range.getValues();
    return table;
}
