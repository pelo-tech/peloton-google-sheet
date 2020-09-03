function promptForText(msg) {
  var ui = SpreadsheetApp.getUi(); 
  var result = ui.prompt(
    msg+":",
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  if(button == ui.Button.CANCEL) return null;
  var text = result.getResponseText();
  return text;
}


function getConfigDetails(){
   var cfg = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
   var session_id=cfg.getRange(SESSION_ID_CELL).getValue(); 
   var user_id=cfg.getRange(USER_ID_CELL).getValue(); 
   var tz=cfg.getRange(TIME_ZONE_CELL).getValue();
  
  return {
    "peloton":{
      "http_base":PELOTON_API_BASE,
      "session_id":session_id, 
      "user_id":user_id,
      "timezone":tz,
      "http_options":
      {
        'headers':
        {
          'peloton-platform':PELOTON_PLATFORM, 
          'cookie':'peloton_session_id='+session_id
        }
      }
    }
  };
}


function findTimeSubarray(arr, property, timeSubarray) {
    for (var i = 0; i < 1 + (arr.length - timeSubarray.length); i++) {
        var j = 0;
        for (; j < timeSubarray.length; j++)
        {
          console.log(arr[i + j][property]+" == "+timeSubarray[j]);
          if (arr[i + j][property] != timeSubarray[j])
                break;
        }
      console.log("i="+i+", j="+j);
        if (j == timeSubarray.length)
            return i;
    }
    return -1;
}

function groupByArray(xs, key) {
  return xs.reduce(
    function (rv, x) { 
      let v = key instanceof Function ? key(x) : x[key]; 
      let el = rv.find((r) => r && r.key === v); 
      if (el) { el.values.push(x); } 
      else { rv.push({ key: v, values: [x] }); }
      return rv; }, 
    []);
} 
