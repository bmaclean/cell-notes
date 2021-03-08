const SNSHEETNAME = 'Cell Notes Store - Beta';
const SNDBSHEETID = 'SidenotesDatabaseSheetID--beta';

function checkSidenoteDatabase(ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {
    // If sheet with name found, make sure it's hidden (?)
    const sheetId = PropertiesService.getDocumentProperties().getProperty(
        SNDBSHEETID
    );
    let sheet = getSheetById(ss, sheetId ? parseInt(sheetId) : null);
    // If no database found, create a new one
    if (sheet == null) {
        //If there used to be a database but it was deleted, let the user know
        let proceed = true;

        if (sheetId != null) {
            const title = 'Cell Notes Store deleted';
            const message =
                'Your SideNote Store was deleted! Revert to an earlier revision to recover it. Would you like to create a new SideNote Store?';
            proceed = showYesNoDialog(title, message);
        }

        if (ss.getSheetByName(SNSHEETNAME) != null) {
            proceed = false;
            sheet = ss.getSheetByName(SNSHEETNAME);

            if (sheet) {
                // add script property so it knows there is a database next time
                PropertiesService.getDocumentProperties().setProperty(
                    SNDBSHEETID,
                    sheet.getSheetId().toString()
                );
            }
        }

        //There was no database or the user said yes to adding a new one
        if (proceed) {
            sheet = createSidenoteDatabase(ss);
        }
    }

    return sheet;
}

function createSidenoteDatabase(ss: GoogleAppsScript.Spreadsheet.Spreadsheet) {
    //retain active sheet
    const activeSheet = ss.getActiveSheet();

    //create new SideNote store database
    const sideNoteSheet = ss.insertSheet(SNSHEETNAME, ss.getSheets().length);

    //reset the old active sheet to active
    activeSheet.activate();

    //configure database
    configureSidenoteDatabase(sideNoteSheet);

    return sideNoteSheet;
}

function configureSidenoteDatabase(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    //we don't want users to see the database
    sheet.hideSheet();

    //first row
    sheet.getRange('A1').setValue('Cell notes');

    //Database headers
    const template = [[KEY, USER, DATE, CONTENT]];
    const firstEntry = [[3, 'Cell Notes master', new Date(), '<p></p>']];
    let range = sheet.getRange('A2:D2');
    range.setValues(template);
    range = sheet.getRange('A3:D3');
    range.setValues(firstEntry);
    //add script property so it knows there is a database next time
    PropertiesService.getScriptProperties().setProperty(
        SNDBSHEETID,
        sheet.getSheetId().toString()
    );
}
