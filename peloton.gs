function setup(){
  var username=promptForText("Enter Peloton Username");
  if(username==null) return;
  var password=promptForText("Enter Peloton Password");
  if (password==null) return;
  
  var data=processLogin(username,password);

  ui.alert("Your session ID has been set to "+data.session_id+"\n Your User ID set to "+data.user_id);

}

function processLogin(username, password){
      var sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);

    var ui = SpreadsheetApp.getUi(); // Same variations.
    var auth={
    "username_or_email": username,
    "password": password
    };
  
  var response=UrlFetchApp.fetch(
     getConfigDetails().peloton.http_base+"/auth/login",
     {'method':'POST','contentType': 'application/json', 'payload':JSON.stringify(auth)}
   );
                                
  var json = response.getContentText();
  var data = JSON.parse(json);
  sheet.getRange(SESSION_ID_CELL).setValue(data.session_id); 
  sheet.getRange(USER_ID_CELL).setValue(data.user_id); 
  sheet.getRange(USERNAME_CELL).setValue(username); 
  return data;
}


function importData() {
  var peloton=getConfigDetails().peloton;
  var sheet = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
  var  workouts = SpreadsheetApp.getActive().getSheetByName(WORKOUTS_SHEET_NAME);

  var enabled=sheet.getRange('B4').getValue(); 
 
       workouts.getRange('A1').setValue("Loading... "+new Date().toString());
   
  var session_id=sheet.getRange(SESSION_ID_CELL).getValue(); 
  var user_id=sheet.getRange(USER_ID_CELL).getValue(); 
  var tz=sheet.getRange(TIME_ZONE_CELL).getValue();
  
  var url='https://api.onepeloton.com/api/user/'+peloton.user_id+'/workout_history_csv?timezone='+peloton.timezone;
  var options={'headers':peloton.http_options.headers};
  
   var csvContent = UrlFetchApp.fetch(url,options).getContentText();
   var csvData = Utilities.parseCsv(csvContent);
   console.log(csvData);

   workouts.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
   sheet.getRange(LAST_UPDATED_CELL).setValue(new Date().toString());
   sheet.getRange(RECORD_COUNT_CELL).setValue(csvData.length);
  
  processPyramids();
}

function generateWorkouts(disciplines){
  var by_day=[];
      var sheet = SpreadsheetApp.getActive().getSheetByName(WORKOUTS_SHEET_NAME);
       var raw_data = sheet.getDataRange().getValues();
  var headers=raw_data[0];
  var results=[];
  
  if(raw_data.length>1){
    for (var i = 1; i < raw_data.length; i++) {
      /* Row Number +=1 to account for Header Row. */
      var obj={"rownum":i+1};
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
