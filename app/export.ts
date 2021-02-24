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
    const sidenotes = getSideNotesInRange(sheet, range);
    const cellcontents = range.getValues();
    let table =
        '<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">' +
        '<table style=\'width:100%;border-collapse: collapse\'>';
    let htmlcell = '';
    let superscript = '';
    let key: string | number | undefined = 0;
    let index = 1;
    let item: string | undefined = '';
    let appendix = '<ol>';
    for (let i = 0; i < cellcontents.length; i++) {
        table += '<tr>';
        for (let j = 0; j < cellcontents[i].length; j++) {
            key = sidenotes[i][j] != null ? sidenotes[i][j]?.key : '';
            superscript =
                key != '' && key != 'DELETED' ? '<sup>' + index + '</sup>' : '';
            htmlcell =
                '<td style=\'border: 1px solid black\'>' +
                cellcontents[i][j].toString() +
                superscript +
                '</td>';
            table += htmlcell;
            if (key != '' && key != 'DELETED') {
                item = sidenotes[i][j]?.content;
                appendix += '<li value=\'' + index + '\'>' + item + '</li>';
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
