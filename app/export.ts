function exportAll(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const table = getLookupTable(sheet);
    let list =
        '<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">' +
        '<ol>';
    let row = '';
    let item = '';
    for (let i = 0; i < table.length; i++) {
        item = table[i][contentCol];
        if (item != '' && table[i][0] != 'DELETED') {
            row = '<li>' + item + '</li>';
            list += row;
        }
    }
    list += '</ol>';
    return list;
}

function exportNotesInRange(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    range: GoogleAppsScript.Spreadsheet.Range
) {
    const sideNotes = getSideNotesInRange(sheet, range);
    const cellContents = range.getValues();
    let table =
        '<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">' +
        "<table style='width:100%;border-collapse: collapse'>";
    let htmlCell = '';
    let superscript = '';
    let key: string | number | undefined = 0;
    let index = 1;
    let item: string | undefined = '';
    let appendix = '<ol>';
    for (let i = 0; i < cellContents.length; i++) {
        table += '<tr>';
        for (let j = 0; j < cellContents[i].length; j++) {
            key = sideNotes[i][j] != null ? sideNotes[i][j]?.key : '';
            superscript =
                key != '' && key != 'DELETED' ? '<sup>' + index + '</sup>' : '';
            htmlCell =
                "<td style='border: 1px solid black'>" +
                cellContents[i][j].toString() +
                superscript +
                '</td>';
            table += htmlCell;
            if (key != '' && key != 'DELETED') {
                item = sideNotes[i][j]?.content;
                appendix += "<li value='" + index + "'>" + item + '</li>';
                index++;
            }
        }
        table += '</tr>';
    }
    table += '</table>';
    appendix += '</ol>';

    const html = table + '<br>Notes<br>' + appendix;

    return html;
}
