
function getNextAvailableRowIndex(sheet){
    //get table
    const table = getLookupTable(sheet);
  
    //look for last row in table and add one
    const newRowIndex = table.length + firstRow;
  
    return newRowIndex;
}  

function getNextAvailableKey(sheet){
    //get last element in first column
    const key = getNextAvailableRowIndex(sheet);
  
    return key;
}

function saveSideNote(sheet,sidenote){
    //first check if sidenote has a key
    let key = sidenote.key;
    const hasKey = parseInt(key) > -1;

    //check if key exists
    const doesKeyExistInTable =  doesKeyExistFast(sheet,key);
    let index = 999;
  
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
    const range = getRowRangeForNoteWithKey(sheet,key);
    if (range!=null){
        range.getCell(1, 1).setValue('DELETED');
        const index = range.getRow();
    //sheet.deleteRow(index);
    }
}

function writeSideNoteToRowWithIndex(sheet,index,sidenote){
    //get range - may be a new range or an existing range
    const rowRange = sheet.getRange(index,1,1,noCols);
  
    //prepare data as a row
    const sidenoteData = [];
    const rowData = [sidenote.key,sidenote.user,sidenote.date,sidenote.content];
    sidenoteData.push(rowData);
  
    //write each item to its own column
    rowRange.setValues(sidenoteData);

  
}
