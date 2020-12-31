function processPyramids(){
  var pyramids=getAllPyramidWorkouts();
  if(pyramids.length>0){
    var  workouts = SpreadsheetApp.getActive().getSheetByName('Workouts');
    var range = workouts.getRange("S1:T"+ workouts.getLastRow());
    range.clear();
    workouts.getRange("S1").setValue("PYRAMID");
    workouts.getRange("T1").setValue("Pyramid Date");
    var values=range.getValues();
    pyramids.map(pyramid=>{
      pyramid.map(workout=>{
        // remember we are in a zero based array but chose to populate 'row numbers which are 1 based'
        values[workout.rownum -1][0]=true;
        values[workout.rownum -1][1]=pyramid[0]["Workout Timestamp"];
      });
    });
    range.setValues(values);
    var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
    config.getRange(PYRAMIDS_DETECTED_CELL).setValue(pyramids.length);
  }
}

function getAllPyramidWorkouts(){
  var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
   var pattern=config.getRange(PYRAMID_PATTERN_CELL).getValue().split(",");
  if(pattern.length<2) {
    console.log("No pyramid pattern. Aborting pyramid processing."); 
    return;
  }
  var clusters= findStackedWorkouts(["Cycling"],pattern);
  var pyramids=[];
  clusters.map(cluster =>{
    var subArrayIndex=findTimeSubarray(cluster,"Length (minutes)",pattern);
    if(subArrayIndex==-1){ 
      Logger.log("BAD PYRAMID - DISCARDING ");
    }  else {
      Logger.log("Good Pyramid starting at "+subArrayIndex+ "- Row "+cluster[subArrayIndex].rownum);
      pyramids.push(cluster.slice(subArrayIndex, pattern.length));
    }
  });
  
  Logger.log("Total found of. "+ pyramids.length+" pyramids");
  pyramids.map(pyramid=>{
    Logger.log("=======[Pyramid:"+pyramid[0]["Workout Timestamp"].substring(0,10)+"]==========");
    pyramid.map(workout=>{
      Logger.log("     "+workout["Instructor Name"]+":"+workout["Title"] +" taken at "+workout["Workout Timestamp"]);
    });
  });
  return pyramids;
}


function findStackedWorkouts(disciplines,pattern){
 pattern=pattern.map(n => { return parseInt(n)});
 var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
 var pattern=config.getRange(PYRAMID_PATTERN_CELL).getValue().split(",");
 var pauseMinutesValue=config.getRange(PYRAMIDS_PAUSE_MINUTES_CELL).getValue();
 // default is 10 min
 var pauseMinutes= pauseMinutesValue || 10;
  
 var workouts=generateWorkouts(disciplines);
 
    var totalMinutes=pattern.reduce( function(a,b){return parseInt(a)+parseInt(b)},0);  // This is the minimum total duration of the pyramid
     Logger.log("Looking for clusters of minimum timespan "+totalMinutes+" minutes where the maximum distance between nodes less than "+pauseMinutes+" minutes from the end of the last one");

     var TIME_PROP="timestamp";
     var ID_PROP="rownum";
     var DURATION_PROP="duration";
 
     var items=workouts.map(workout=>{
         workout[TIME_PROP]=new Date(workout["Workout Timestamp"]).getTime(); 
         workout[DURATION_PROP]=parseInt(workout["Length (minutes)"]) * 60 * 1000;
         return workout;}
         );

    var clusters=ClusterAnalysis({
       items:items,
       idProperty:ID_PROP,
       timeProperty:TIME_PROP,
       durationProperty:DURATION_PROP,
       debug:false,
       minTimeSpan:totalMinutes * 60 * 1000,
       maxItemDistance:pauseMinutes * 60 * 1000,
       minSize:pattern.length
     });
     
       Logger.log("Got "+clusters.length+"  clusters");
 
return clusters;
}
