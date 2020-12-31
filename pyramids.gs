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
   var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
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
               console.log("Rownum "+obj['rownum']+"--"+obj["Instructor Name"]+":"  +obj["Title"]);
               workouts.getRange("S"+ obj["rownum"]).setValue(true);
               });
               });
  config.getRange(PYRAMIDS_DETECTED_CELL).setValue(pyramids.length);
}



function testStackedWorkouts(){
  var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
   var pattern=config.getRange(PYRAMID_PATTERN_CELL).getValue().split(",");
  if(pattern.length<2) {
    console.log("No pyramid pattern. Aborting pyramid processing."); 
    return;
  }
  var clusters= findStackedWorkouts(["Cycling"],pattern);
  
  clusters.map(cluster =>{
    var subArrayIndex=findTimeSubarray(cluster,"Length (minutes)",pattern);
    if(subArrayIndex==-1){ 
      Logger.log("BAD PYRAMID - DISCARDING ");
    }  else {
      Logger.log("Good Pyramid starting at "+subArrayIndex+ "- Row "+cluster[subArrayIndex].rownum);
    }
  });
}


function findStackedWorkouts(disciplines,pattern){
 pattern=pattern.map(n => { return parseInt(n)});
 var config = SpreadsheetApp.getActive().getSheetByName(CONFIG_SHEET_NAME);
 var pattern=config.getRange(PYRAMID_PATTERN_CELL).getValue().split(",");
 var workouts=generateWorkouts(disciplines);
 
    var totalMinutes=pattern.reduce( function(a,b){return parseInt(a)+parseInt(b)},0);  // This is the minimum total duration of the pyramid
    var maxDistanceMinutes=pattern.max();
    Logger.log("Looking for clusters of minimum timespan "+totalMinutes+" minutes where the maximum distance between nodes is less than 1.5*"+maxDistanceMinutes+" minutes");

     var TIME_PROP="timestamp";
     var ID_PROP="rownum";
 
     var items=workouts.map(workout=>{workout[TIME_PROP]=new Date(workout["Workout Timestamp"]).getTime(); return workout;});

    var clusters=ClusterAnalysis({
       items:items,
       idProperty:ID_PROP,
       timeProperty:TIME_PROP,
       debug:false,
       minTimeSpan:totalMinutes * 60 * 1000,
       maxItemDistance:maxDistanceMinutes * 60 * 1000 * 1.5,
       minSize:pattern.length
     });
     
       Logger.log("Got "+clusters.length+"  clusters");
 
return clusters;
}
