function onOpen(e: Event) {
    // Create Addon menu
    SpreadsheetApp.getUi()
        .createAddonMenu()
        .addItem('Show Cell Notes 2 Beta', 'showSideNoteSidebar')
        .addToUi();
}

function onInstall(e: Event) {
    onOpen(e);
}
