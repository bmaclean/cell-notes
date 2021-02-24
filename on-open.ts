
function onOpen(e) {

  //Create Addon menu
  SpreadsheetApp.getUi().createAddonMenu().addItem("Show Cell Notes Beta", "showSideNoteSidebar").addToUi();
}

function onInstall(e){
  onOpen(e);
}

