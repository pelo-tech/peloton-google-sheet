function onOpen() {
   SpreadsheetApp.getUi()  
      .createMenu('Peloton')
      .addItem('Login', 'showSidebarLogin')
      .addItem('Reload Data', 'whoop_rebuild_history')
      .addToUi();
}

function handleSidebarLogin(obj){
  var results={};
   if(!obj.username || obj.username.length < 5 ||
      !obj.password  || obj.password.length <5 ) {
     return {"error":"Username and password are both required"};
   } 
  var results=processLogin(obj.username,obj.password);
  // for reasons I don't understand, Google has a hard time serializing this remotely 
  // to HTML calling this via google.script.run, but this fixes the issue.
  //    o
  // -\/^\/-
  // Whatever!
  return  JSON.parse(JSON.stringify(results));
}

function showSidebarLogin() {
  var html = HtmlService.createHtmlOutputFromFile('login.html')
      .setTitle('Peloton Login')
      .setWidth(320);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}


