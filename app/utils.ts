function getSheetById(
    ss: GoogleAppsScript.Spreadsheet.Spreadsheet,
    id: number | null
) {
    if (!id) return null;
    const sheets = ss.getSheets();
    for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        if (sheet.getSheetId() == id) {
            return sheet;
        }
    }
    return null;
}
