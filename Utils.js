

function getSheetById(ss,id) {
  var sheets = ss.getSheets();
  for (var i=0;i<sheets.length;i++){
    var sheet = sheets[i];
    if (sheet.getSheetId() == id){
      return sheet;
    }
  }
  return null;
}

function getIndexOfColumnWithName(matrix,name) {
  if (matrix.length>0){
    //Get headers range
    var headers = matrix[0];
  
    //loop through headers until the one with the given name is found
    for (var i=0; i<headers;i++){
      if (headers[i] == name){
        return i;
      }
    }
  }
  return null;
}

function getRowIndexForKeyInColumn(column,key){
  for (var k = 0;k<column.length;k++){
    if (column[k] == key){
      return k;
    }
  }
  return null;
}

function getIndexForKeyInArray(array,key){
  for (var k = 0;k<array.length;k++){
    if (array[k][0] == key){
      return k;
    }
  }
  return array.length;
}

function getIndexForKeyInArrayFast(array,key){
  var keys = array.map(function(value,index) { return value[0]; });
  var k = keys.indexOf(key);
  return k;
}

function getKeyForValueInArray(array,value){
  for (var k = 0;k<array.length;k++){
    if (array[k][1] == value){
      return array[k][0];
    }
  }
  return null;
}

function getLastElementInColumn(table,index){
  var element = table[table.length-1][index];
  return element;
}

function getColumnWithIndex(table,index){
  var column = [];
  for (var i = 0; i < table.length; i++) {
    column.push(table[i][index]);
  }
  //mfg_tag this wasn't working, could have sped things up ...
  //var column = table.map(function(value,index) { return value[index]; });
  return column;
}

function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter)
{
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++)
  {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

function getLastRowInColumn(sheet,column,firstRow) {

  var Avals = sheet.getRange(column + firstRow + ":" + column).getValues();
  var Alast = Avals.filter(String).length + firstRow- 1;
  return Alast;
}


function getLastColumnInRow(sheet,row,firstColumn) {

  var Avals = sheet.getRange(row,firstColumn,1,200).getValues();
  var Alast = Avals[0].filter(String).length + firstColumn- 1;
  return Alast;
}

function getActiveSpreadSheet(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss;
}


