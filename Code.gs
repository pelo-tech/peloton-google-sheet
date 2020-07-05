var SESSION_ID_CELL="B2";
var USERNAME_CELL="B5";
var USER_ID_CELL="B1";
var TIME_ZONE_CELL="B3";
var ENABLED_CELL="B4";
var LAST_UPDATED_CELL="B6";
var RECORD_COUNT_CELL="B7";
var PYRAMID_PATTERN_CELL="B8";
var PYRAMIDS_DETECTED_CELL="B9";

function importData() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Config');
  var  workouts = SpreadsheetApp.getActive().getSheetByName('Workouts');

  var enabled=sheet.getRange('B4').getValue(); 
 
       workouts.getRange('A1').setValue("Loading... "+new Date().toString());
   
  var session_id=sheet.getRange(SESSION_ID_CELL).getValue(); 
  var user_id=sheet.getRange(USER_ID_CELL).getValue(); 
  var tz=sheet.getRange(TIME_ZONE_CELL).getValue();
  
  var url='https://api.onepeloton.com/api/user/'+user_id+'/workout_history_csv?timezone='+tz;
  var options={'headers':{'cookie':'peloton_session_id='+session_id}};
  
   var csvContent = UrlFetchApp.fetch(url,options).getContentText();
   var csvData = Utilities.parseCsv(csvContent);
   console.log(csvData);

   workouts.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
   sheet.getRange(LAST_UPDATED_CELL).setValue(new Date().toString());
   sheet.getRange(RECORD_COUNT_CELL).setValue(csvData.length);
  
  processPyramids();
}

function setup(){
  var username=promptForText("Enter Peloton Username");
  if(username==null) return;
  var password=promptForText("Enter Peloton Password");
  if (password==null) return;
  
    var sheet = SpreadsheetApp.getActive().getSheetByName('Config');

    var ui = SpreadsheetApp.getUi(); // Same variations.
  var auth={
    "username_or_email": username,
    "password": password
  };
  
  var url="https://api.onepeloton.com/auth/login";
  var response=UrlFetchApp.fetch(url,{'method':'POST','contentType': 'application/json', 'payload':JSON.stringify(auth)});
                                
  var json = response.getContentText();
  var data = JSON.parse(json);
  ui.alert("Your session ID has been set to "+data.session_id+"\n Your User ID set to "+data.user_id);
  sheet.getRange(SESSION_ID_CELL).setValue(data.session_id); 
  sheet.getRange(USER_ID_CELL).setValue(data.user_id); 
  sheet.getRange(USERNAME_CELL).setValue(username); 
}

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

function generateWorkouts(disciplines){
  var by_day=[];
      var sheet = SpreadsheetApp.getActive().getSheetByName('Workouts');
       var raw_data = sheet.getDataRange().getValues();
  var headers=raw_data[0];
  var results=[];
  
  if(raw_data.length>1){
    for (var i = 1; i < raw_data.length; i++) {
      var obj={"rownum":i};
      for(var h=0; h<headers.length;++h){
        obj[headers[h]]=raw_data[i][h];
      }
      if(disciplines.includes(obj["Fitness Discipline"]))
        results[results.length]=obj;
      else console.log("Ignored non-matching discipline "+obj["Fitness Discipline"]);
    }
  }
  console.log("Returned "+results.length+" results");
  if(results.length) console.log(JSON.stringify(results[0]));
  
  return results;
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



function findPyramids(disciplines, pattern){
  var results=generateWorkouts(disciplines);
  // Trim off just the date and get groups of objects by date
  var arr=groupByArray(results,function(result){ return result["Workout Timestamp"].substring(0,10);});
  var pyramid_eligible=arr.filter(function(group){ return group.values.length >= pattern.length; });
  pyramid_eligible.map(function(group){
     var subArrayIndex=findTimeSubarray(group.values,"Length (minutes)",pattern);
    console.log("Subarray: "+subArrayIndex);
     if(subArrayIndex>-1){
      console.log("Found Pyramid Subarray of "+pattern.join(" ")+" on "+group.key);
      group.values=group.values.slice(subArrayIndex, pattern.length);
       console.log("Group size now "+group.values.length);
    }
  });
 
  console.log(pyramid_eligible.length + " out of a total of "+arr.length+" groups"); 
  return pyramid_eligible;
}

function processPyramids(){
   var config = SpreadsheetApp.getActive().getSheetByName('Config');
   var pattern=config.getRange(PYRAMID_PATTERN_CELL).getValue().split(",");
  if(pattern.length<2) {
    console.log("No pyramid pattern. Aborting pyramid processing."); 
    return;
  }
  var pyramids= findPyramids(["Cycling"],pattern);
  var  workouts = SpreadsheetApp.getActive().getSheetByName('Workouts');
  
  var range = workouts.getRange("S1:S"+ workouts.getLastRow());
  range.clear();
  
  workouts.getRange("S1").setValue("PYRAMID");
  pyramids.map(p => {
               console.log("Pyramid on "+p.key +" of "+ p.values.length+" rides");
  p.values.map(obj => {
               workouts.getRange("S"+ obj["rownum"]).setValue(true);
               });
               });
  config.getRange(PYRAMIDS_DETECTED_CELL).setValue(pyramids.length);
}