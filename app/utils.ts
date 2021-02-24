function getSheetById(ss: GoogleAppsScript.Spreadsheet.Spreadsheet,id) {
    const sheets = ss.getSheets();
    for (let i=0;i<sheets.length;i++){
        const sheet = sheets[i];
        if (sheet.getSheetId() == id){
            return sheet;
        }
    }
    return null;
}

function getIndexOfColumnWithName(matrix,name) {
    if (matrix.length>0){
    //Get headers range
        const headers = matrix[0];
  
        //loop through headers until the one with the given name is found
        for (let i=0; i<headers;i++){
            if (headers[i] == name){
                return i;
            }
        }
    }
    return null;
}

function getRowIndexForKeyInColumn(column,key){
    for (let k = 0;k<column.length;k++){
        if (column[k] == key){
            return k;
        }
    }
    return null;
}

function getIndexForKeyInArray(array,key){
    for (let k = 0;k<array.length;k++){
        if (array[k][0] == key){
            return k;
        }
    }
    return array.length;
}

function getIndexForKeyInArrayFast(array,key){
    const keys = array.map(function(value,index) { return value[0]; });
    const k = keys.indexOf(key);
    return k;
}

function getKeyForValueInArray(array,value){
    for (let k = 0;k<array.length;k++){
        if (array[k][1] == value){
            return array[k][0];
        }
    }
    return null;
}

function getLastElementInColumn(table,index){
    const element = table[table.length-1][index];
    return element;
}

function getColumnWithIndex(table,index){
    const column = [];
    for (let i = 0; i < table.length; i++) {
        column.push(table[i][index]);
    }
    //mfg_tag this wasn't working, could have sped things up ...
    //var column = table.map(function(value,index) { return value[index]; });
    return column;
}

function columnToLetter(column)
{
    let temp, letter = '';
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
    let column = 0, length = letter.length;
    for (let i = 0; i < length; i++)
    {
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
}

function getLastRowInColumn(sheet,column,firstRow) {

    const Avals = sheet.getRange(column + firstRow + ':' + column).getValues();
    const Alast = Avals.filter(String).length + firstRow- 1;
    return Alast;
}


function getLastColumnInRow(sheet,row,firstColumn) {

    const Avals = sheet.getRange(row,firstColumn,1,200).getValues();
    const Alast = Avals[0].filter(String).length + firstColumn- 1;
    return Alast;
}

function getActiveSpreadSheet(){
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    return ss;
}


