function showSideNoteSidebar() {
    //Check if SideNotes database is there already
    const sheet = getSideNotesSheet();

    //Anything else that we want to do in SideNotes requires the database to exist.
    //Don't even open the SideNotes sidebar if there isn't one.
    if (sheet != null) {
        showSidebar(sheet);
    }
}

function showExpandedSideNotes() {
    // Check if SideNotes database is there already
    const sheet = getSideNotesSheet();

    //Anything else that we want to do in SideNotes requires the database to exist.
    //Don't even open the SideNotes sidebar if there isn't one.
    if (sheet != null) {
        showExpandedDialog(sheet);
    }
}

function showExpandedDialog(dbSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const html = HtmlService.createTemplateFromFile('dialog-editor');
    const dbSheetName = dbSheet.getSheetName();
    const combined = getNoteForActiveRange(dbSheetName);
    const splitter = combined.split('!@!@');
    const key = splitter[0];
    const content = splitter[1];
    const sheetName = splitter[2];
    const rangeA1formatted = splitter[3];
    html.rangeA1 = rangeA1formatted;
    html.sheetName = sheetName;
    html.key = key;
    html.dbSheet = dbSheet.getSheetName();
    html.spreadsheetId = ss.getId();
    html.note = content;
    html.oldnote = content;
    html.error = false;
    const result = html.evaluate();
    result.setWidth(800);
    result.setHeight(600);
    result.setTitle('Cell Notes');
    SpreadsheetApp.getUi().showModalDialog(result, 'Cell Notes');
}

function showSidebar(dbSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const html = HtmlService.createTemplateFromFile('editor');
    const dbSheetName = dbSheet.getSheetName();
    const combined = getNoteForActiveRange(dbSheetName);
    console.log({combined});
    const splitter = combined.split('!@!@');
    const key = splitter[0];
    const content = splitter[1];
    const sheetName = splitter[2];
    const rangeA1formatted = splitter[3];
    html.rangeA1 = rangeA1formatted;
    html.sheetName = sheetName;
    html.key = key;
    html.dbSheet = dbSheet.getSheetName();
    html.spreadsheetId = ss.getId();
    html.note = content;
    html.oldnote = content;
    html.error = false;

    SpreadsheetApp.getUi().showSidebar(html.evaluate().setTitle('Cell Notes'));
}

function include(file: string) {
    return HtmlService.createHtmlOutputFromFile(file).getContent();
}

function getTextInput(
    key: number,
    sheetName: string,
    rangeA1: string,
    html: string,
    dbSheetName: string
) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const range = ss.getSheetByName(sheetName)?.getRange(rangeA1);
    const dbSheet = ss.getSheetByName(dbSheetName);
    const sidenote = new SideNote(key * 1, getUser(), new Date(), html);
    addNewSideNote(range, dbSheet, sidenote);
    return html;
}

function deleteSelectedRangeSN(
    sheetName: string,
    rangeA1: string,
    dbSheetName: string
) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const range = ss?.getSheetByName(sheetName)?.getRange(rangeA1);
    const dbSheet = ss.getSheetByName(dbSheetName);
    deleteSideNote(dbSheet, range);
}

function exportSelected() {
    //Check if SideNotes database is there already
    const sheet = getSideNotesSheet();

    //Anything else that we want to do in SideNotes requires the database to exist.
    //Don't even open the Export if there isn't one.
    if (sheet != null) {
        const range = sheet.getActiveRange();
        const html = exportNotesInRange(sheet, range);
        const htmlOutput = HtmlService.createHtmlOutput(html);
        htmlOutput.setWidth(800);
        htmlOutput.setHeight(600);
        htmlOutput.setTitle('Cell Notes export');
        SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Cell Notes export');
    }
}

function exportAllMenu() {
    //Check if SideNotes database is there already
    const sheet = getSideNotesSheet();

    //Anything else that we want to do in SideNotes requires the database to exist.
    //Don't even open the Export if there isn't one.
    if (sheet != null) {
        const html = exportAll(sheet);
        const htmlOutput = HtmlService.createHtmlOutput(html);
        htmlOutput.setWidth(800);
        htmlOutput.setHeight(600);
        htmlOutput.setTitle('Cell Notes export');
        SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Cell Notes export');
    }
}

function getSideNotesSheet() {
    //Check if SideNotes database is there already
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = checkSidenoteDatabase(ss);
    return sheet;
}
/*
function getTempHtmlOutput(){
  var cache = CacheService.getUserCache();
  var output = cache.get("CKEditorOutput");
  if (output){
    return output;
  }
  else{
    return "";
  }
}

function setTempHtmlOutput(output){
  var cache = CacheService.getUserCache();
  cache.put("CKEditorOutput",output);
}
*/
