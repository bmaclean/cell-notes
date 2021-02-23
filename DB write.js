
function getNextAvailableRowIndex(sheet){
  //get table
  var table = getLookupTable(sheet);
  
  //look for last row in table and add one
  var newRowIndex = table.length + firstRow;
  
  return newRowIndex;
}  

function getNextAvailableKey(sheet){
  //get last element in first column
  var key = getNextAvailableRowIndex(sheet);
  
  return key;
}

function saveSideNote(sheet,sidenote){
  //first check if sidenote has a key
  var key = sidenote.key;
  var hasKey = parseInt(key) > -1;

  //check if key exists
  var doesKeyExistInTable =  doesKeyExistFast(sheet,key);
  var index = 999;
  
  if (hasKey && doesKeyExistInTable){
    index = getRowIndexForNoteWithKey(sheet,key);
     
  }
  else{
    index =getNextAvailableRowIndex(sheet);
    key = index;//getNextAvailableKey(sheet,index);
    sidenote.key = key;
  }

  writeSideNoteToRowWithIndex(sheet,index,sidenote);
  return sidenote;
}

function deleteSideNoteWithKey(sheet,key){
  var range = getRowRangeForNoteWithKey(sheet,key);
  if (range!=null){
    range.getCell(1, 1).setValue("DELETED");
    var index = range.getRow();
    //sheet.deleteRow(index);
  }
}

function writeSideNoteToRowWithIndex(sheet,index,sidenote){
  //get range - may be a new range or an existing range
  var rowRange = sheet.getRange(index,1,1,noCols);
  
  //prepare data as a row
  var sidenoteData = [];
  var rowData = [sidenote.key,sidenote.user,sidenote.date,sidenote.content];
  sidenoteData.push(rowData);
  
  //write each item to its own column
  rowRange.setValues(sidenoteData);

  
}
