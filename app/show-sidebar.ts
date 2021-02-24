

function showSideNoteSidebar() {
  //Check if SideNotes database is there already
  var sheet = getSideNotesSheet()
  
  //Anything else that we want to do in SideNotes requires the database to exist.
  //Don't even open the SideNotes sidebar if there isn't one.
  if (sheet != null){
    showSidebar(sheet);
  }
}

function showExpandedSideNotes() {
  //Check if SideNotes database is there already
  var sheet = getSideNotesSheet()
  
  //Anything else that we want to do in SideNotes requires the database to exist.
  //Don't even open the SideNotes sidebar if there isn't one.
  if (sheet != null){
    showExpandedDialog(sheet);
  }
}


function showExpandedDialog(dbSheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var html = HtmlService.createTemplateFromFile('dialog-editor').setWidth(400); 
  var dbSheetName = dbSheet.getSheetName();
  var combined = getNoteForActiveRange(dbSheetName);
  var splitter = combined.split("!@!@");
  var key = splitter[0];
  var content = splitter[1];
  var sheetName = splitter[2];
  var rangeA1formatted = splitter[3];
  html.rangeA1 = rangeA1formatted;
  html.sheetName = sheetName;
  html.key = key;
  html.dbSheet = dbSheet.getSheetName();
  html.spreadsheetId = ss.getId();
  html.note = content;
  html.oldnote = content;
  html.error = false;
  var result = html.evaluate();
  result.setWidth(800);
  result.setHeight(600);  
  result.setTitle("Cell Notes");
    SpreadsheetApp.getUi() 
      .showModalDialog(result,"Cell Notes");
  
}

function showSidebar(dbSheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var html = HtmlService.createTemplateFromFile('editor');
  var dbSheetName = dbSheet.getSheetName();
  var combined = getNoteForActiveRange(dbSheetName);
  console.log({combined});
  var splitter = combined.split("!@!@");
  var key = splitter[0];
  var content = splitter[1];
  var sheetName = splitter[2];
  var rangeA1formatted = splitter[3];
  html.rangeA1 = rangeA1formatted;
  html.sheetName = sheetName;
  html.key = key;
  html.dbSheet = dbSheet.getSheetName();
  html.spreadsheetId = ss.getId();
  html.note = content;
  html.oldnote = content;
  html.error = false;
  
    SpreadsheetApp.getUi()
      .showSidebar(html.evaluate().setWidth(1000).setTitle("Cell Notes"));
  
}

function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};

function getTextInput(key,sheetName,rangeA1,html,dbSheetName){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getSheetByName(sheetName).getRange(rangeA1);
  var dbSheet = ss.getSheetByName(dbSheetName);
  var sidenote = new SideNote(key*1,getUser(),new Date(),html);
  addNewSideNote(range,dbSheet,sidenote);
  return html;
}

function deleteSelectedRangeSN(sheetName,rangeA1,dbSheetName){
    
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getSheetByName(sheetName).getRange(rangeA1);
  var dbSheet = ss.getSheetByName(dbSheetName);
  deleteSideNote(dbSheet,range);
}

function exportSelected(){
  //Check if SideNotes database is there already
  var sheet = getSideNotesSheet()
  
  //Anything else that we want to do in SideNotes requires the database to exist.
  //Don't even open the Export if there isn't one.
  if (sheet != null){
    var range = sheet.getActiveRange();
    var html = exportNotesInRange(sheet,range);
    var htmlOutput = HtmlService.createHtmlOutput(html);
    htmlOutput.setWidth(800);
    htmlOutput.setHeight(600);  
    htmlOutput.setTitle("Cell Notes export");
    SpreadsheetApp.getUi() 
    .showModalDialog(htmlOutput,"Cell Notes export");
  }
}

function exportAllMenu(){
  //Check if SideNotes database is there already
  var sheet = getSideNotesSheet();
  
  //Anything else that we want to do in SideNotes requires the database to exist.
  //Don't even open the Export if there isn't one.
  if (sheet != null){
    var html = exportAll(sheet);
    var htmlOutput = HtmlService.createHtmlOutput(html);
    htmlOutput.setWidth(800);
    htmlOutput.setHeight(600);  
    htmlOutput.setTitle("Cell Notes export");
    SpreadsheetApp.getUi() 
    .showModalDialog(htmlOutput,"Cell Notes export");
  }
}

function getSideNotesSheet(){
  //Check if SideNotes database is there already
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = checkSidenoteDatabase(ss);
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