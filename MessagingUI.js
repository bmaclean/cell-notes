
function showAlert(title,message) {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(title,message,ui.ButtonSet.OK);

  // Process the user's response.
  if (result == ui.Button.OK) {
    // User clicked "OK".
    
  } 
}

function showDeleteCellDialog() {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  
  var result = ui.alert("Delete this?","Deleting a cell note cannot be undone. ",ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "OK".
    return "true";
  } 
  return "false";
}

function showYesNoDialog(title,message) {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(title,message,ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    return true;
  } else {
    // User clicked "No" or X in the title bar.
   return false;
  }
}
