function getRideDetails(id){
  var config=getConfigDetails();
  var peloton=config.peloton;
  
  var url=peloton.http_base +'/api/ride/'+id+"/details";
  var json= UrlFetchApp.fetch(url,peloton.http_options).getContentText();
  var data = JSON.parse(json);
  console.log(data);

  return  JSON.parse(JSON.stringify(data.ride));
}




function getRides(pageNumber, pageSize, queryString){
  console.log("GetClasses ("+pageNumber+","+pageSize+", "+queryString);
  if(!pageNumber) pageNumber=0;
  if(!pageSize) pageSize=10;
  var config=getConfigDetails();
  var peloton=config.peloton;
 
  var url=peloton.http_base +'/api/v2/ride/archived?browse_category=cycling&content_format=audio,video&limit='+pageSize+'&page='+pageNumber+'&sort_by=original_air_time&desc=true&'+queryString;
  console.log("URL: "+url);
  var json= UrlFetchApp.fetch(url,peloton.http_options).getContentText();
  var response = JSON.parse(json);
  var rides=response.data;
  var instructors=response.instructors;
  var pages=response.page_count;
  var page=response.page;
  var total=response.total;
  var count=response.count;
  

  var rideObjects=[];
    var results={
      rides: rideObjects,
      pages: pages,
      page: page,
      total: total, 
      count: count
  };
  
  rides.map(ride=>{
            var instructor=instructors.filter(function(obj) { return obj.id==ride.instructor_id; })[0];
     var rideObj= {
       id: ride.id,
       is_favorite: ride.is_favorite,
       language: ride.language,
       workouts: ride.total_workouts,
       aired: new Date(ride.original_air_time * 1000),
       title: ride.title,
       description:ride.description,
       location: ride.location,
       instructor:{
         id:instructor.id,
         name: instructor.name,
         image_url: instructor.image_url
       },
       workouts:ride.total_workouts,
       user_workouts: ride.total_user_workouts,
       in_progress_workouts: ride.total_in_progress_workouts,
       following_workouts: ride.total_following_workouts,
       image_url:ride.image_url,
       duration:ride.duration,
       difficulty_estimate:ride.difficulty_estimate,
       overall_estimate: ride.overall_estimate,
     }
     rideObjects.push(rideObj);
   
   });
   console.log("Result:"+JSON.stringify(results));
  // for reasons I don't understand, Google has a hard time serializing this remotely 
  // to HTML calling this via google.script.run, but this fixes the issue.
  //    o
  // -\/^\/-
  // Whatever!
  return  JSON.parse(JSON.stringify(results));
}
