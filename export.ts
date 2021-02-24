
function exportAll(sheet) {
  var table = getLookupTable(sheet);
  var list = '<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">' + "<ol>";
  var row = "";
  var item = "";
  for (var i=0;i<table.length;i++){
    item = table[i][contentCol];
    if (item!=""&&table[i][0]!="DELETED"){
      row = "<li>" + item + "</li>";
      list += row;
    }
  }
  list += "</ol>";
  return list;
 
}

function exportNotesInRange(sheet,range) {
  var sidenotes =getSideNotesInRange(sheet,range);
  var cellcontents = range.getValues();
  var table = '<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">' + "<table style='width:100%;border-collapse: collapse'>";
  var htmlcell = "";
  var superscript = "";
  var key = 0;
  var index = 1;
  var item = "";
  var appendix = "<ol>";
  for (var i=0;i<cellcontents.length;i++){
    table += "<tr>";
    for (var j=0;j<cellcontents[i].length;j++){
      key = sidenotes[i][j]!=null?(sidenotes[i][j].key):"";
      superscript = (key!=""&& key!="DELETED")?("<sup>"+index+"</sup>"):"";
      htmlcell = "<td style='border: 1px solid black'>" + cellcontents[i][j].toString() + superscript + "</td>";
      table += htmlcell;
      if (key!="" && key!="DELETED"){
        item = sidenotes[i][j].content;
        appendix += "<li value='" + index + "'>" + item + "</li>";
        index++;
      }
    }
    table += "</tr>";
  }
  table += "</table>";
  appendix += "</ol>";

  var html = table + "<br>Notes<br>" +  appendix;
  
  return html;
 
}


