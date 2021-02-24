const KEY = 'Key';
const USER = 'User';
const DATE = 'Date';
const CONTENT = 'Content';
const firstRow = 3;
const firstCol = 1;
const noCols = 4;
const contentCol = 3;

function getPropertyForRowWithIndex(table,row,propertyColIndex){
    const value = table[row][propertyColIndex];
    return value;
}

function doesKeyExistFast(sheet,key){
    let keyFound = false;
    if (key !=null){
        if ((typeof key) == 'string'){
            key = parseInt(key);
        }
        const value = sheet.getRange(key,1).getValue();
        keyFound = (value!='');
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
            const rowData = sheet.getRange(key,1,1,4).getValues();
      
            //convert into SideNote object. 
            //mfg_tag assuming the order of the headers will stay the same for now
            if (rowData != undefined){
                const content = rowData[0][0]=='DELETED' ? '' : rowData[0][contentCol];
                const rowValuesForKey = new SideNote(key,rowData[0][1],rowData[0][2],content);
                return rowValuesForKey;
            }
        }
    }
    return null;
  
}

function getRowRangeForNoteWithKey(sheet,key){
    //get the row index
    const rowIndex = getRowIndexForNoteWithKey(sheet,key);
    if (rowIndex!=null){
    //now get the row range
        const range = sheet.getRange(rowIndex,1,1,noCols);
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
        const row = key;
    
        return row;
    }
    return null;
}

function doesKeyExist(column,key){
    const keyFound = getRowIndexForKeyInColumn(column,key) != null;
    return keyFound;
}


function getLookupRange(sheet){
    //get table limits
    //var firstColLetter = columnToLetter(firstCol);
    //var numRows = getLastRowInColumn(sheet,firstColLetter,firstRow);
    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(firstRow,firstCol,lastRow-(firstRow-1),noCols);
    return range;
}

function getLookupTable(sheet){
    const range = getLookupRange(sheet);
    const table = range.getValues();
    return table;
}

function getDataInColumnWithIndex(table,colIndex){
    const data = table.map(function(value,index) { return value[colIndex]; });
    return data;
}


