var KEY = "Key";
var USER = "User";
var DATE = "Date";
var CONTENT = "Content";
var firstRow = 3;
var firstCol = 1;
var noCols = 4;
var contentCol = 3;

function getPropertyForRowWithIndex(table,row,propertyColIndex){
  var value = table[row][propertyColIndex];
  return value;
}

function doesKeyExistFast(sheet,key){
  var keyFound = false;
  if (key !=null){
    if ((typeof key) == 'string'){
      key = parseInt(key);
    }
    var value = sheet.getRange(key,1).getValue()
    keyFound = (value!="");
  }
  return keyFound;
}


function getNoteWithKey(sheet,key){
  if ((typeof key) == 'string'){
    key = parseInt(key);
  }
  
  //row data
  if(key!=null){
    if (key >- 1) {
      var rowData = sheet.getRange(key,1,1,4).getValues();
      
      //convert into SideNote object. 
      //mfg_tag assuming the order of the headers will stay the same for now
      if (rowData != undefined){
        var content = rowData[0][0]=="DELETED" ? "" : rowData[0][contentCol];
        var rowValuesForKey = new SideNote(key,rowData[0][1],rowData[0][2],content);
        return rowValuesForKey;
      }
    }
  }
  return null;
  
}

function getRowRangeForNoteWithKey(sheet,key){
  //get the row index
  var rowIndex = getRowIndexForNoteWithKey(sheet,key);
  if (rowIndex!=null){
    //now get the row range
    var range = sheet.getRange(rowIndex,1,1,noCols);
    return range;
  }
  return null;
}

function getRowIndexForNoteWithKey(sheet,key){
  if ((typeof key) == 'string'){
    key = parseInt(key);
  }
  
  //row data
  if(key>-1){
    //get the row
    var row = key;
    
    return row;
  }
  return null;
}

function doesKeyExist(column,key){
  var keyFound = getRowIndexForKeyInColumn(column,key) != null;
  return keyFound;
}


function getLookupRange(sheet){
  //get table limits
  //var firstColLetter = columnToLetter(firstCol);
  //var numRows = getLastRowInColumn(sheet,firstColLetter,firstRow);
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(firstRow,firstCol,lastRow-(firstRow-1),noCols);
  return range;
}

function getLookupTable(sheet){
  var range = getLookupRange(sheet);
  var table = range.getValues();
  return table;
}

function getDataInColumnWithIndex(table,colIndex){
  var data = table.map(function(value,index) { return value[colIndex]; });
  return data;
}


