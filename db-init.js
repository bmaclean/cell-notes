

var SNSHEETNAME = "Cell Notes Store";
var SNDBSHEETID = "SidenotesDatabaseSheetID";

function checkSidenoteDatabase(ss) {
  
  
  //If sheet with name found, make sure it's hidden (?)
  var sheetId = PropertiesService.getDocumentProperties().getProperty(SNDBSHEETID);
  var sheet = getSheetById(ss,sheetId);//
  //If no database found, create a new one
  if (sheet == null){
    //If there used to be a database but it was deleted, let the user know
    var proceed = true;
    
    if (sheetId != null){
      var title = "Cell Notes Store deleted";
      var message = "Your SideNote Store was deleted! Revert to an earlier revision to recover it. Would you like to create a new SideNote Store?";
      proceed = showYesNoDialog(title,message);
    }
    
    if (ss.getSheetByName(SNSHEETNAME)!=null){
      proceed = false;
      sheet = ss.getSheetByName(SNSHEETNAME);
      //add script property so it knows there is a database next time
      PropertiesService.getDocumentProperties().setProperty(SNDBSHEETID, sheet.getSheetId());
    }
    
    //There was no database or the user said yes to adding a new one
    if (proceed){
      sheet = createSidenoteDatabase(ss);
    }
  }
  
  return sheet;
  
}


function createSidenoteDatabase(ss){
  //retain active sheet
  var activeSheet = ss.getActiveSheet();
  
  //create new SideNote store database
  var sideNoteSheet = ss.insertSheet(SNSHEETNAME, ss.getSheets().length);
  
  //reset the old active sheet to active
  activeSheet.activate();
  
  //configure database
  configureSidenoteDatabase(ss,sideNoteSheet);
  
  return sideNoteSheet;
}

function configureSidenoteDatabase(ss,sheet){
  //we don't want users to see the database
  sheet.hideSheet();
  
  //first row
  sheet.getRange("A1").setValue("Cell notes");
  
  //Database headers
  var template = [[KEY,USER,DATE,CONTENT]];
  var firstEntry = [[3,"Cell Notes master",new Date(),"<p></p>"]];
  var bold = [["bold","bold","bold","bold"]];
  var range = sheet.getRange("A2:D2");
  range.setValues(template);
  range.setFontStyles(bold);
  range = sheet.getRange("A3:D3");
  range.setValues(firstEntry);
  //add script property so it knows there is a database next time
  PropertiesService.getScriptProperties().setProperty(SNDBSHEETID, sheet.getSheetId());
  
}