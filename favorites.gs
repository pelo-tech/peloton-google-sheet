function addFavoriteRide(ride_id){
  var result=  _changeFavoriteRide(ride_id,'create');
  return {id:ride_id, action:'create', success: result};
}
function removeFavoriteRide(ride_id){
  var result= _changeFavoriteRide(ride_id,'delete');
  return {id:ride_id, action:'delete', success: result};
}

function _changeFavoriteRide(ride_id, action){
  var config=getConfigDetails();
  var peloton=config.peloton;
  var url=peloton.http_base + "/api/favorites/"+action;
  var payload={"ride_id":ride_id};
  var response=UrlFetchApp.fetch(url,{'headers':peloton.http_options.headers,'method':'POST','contentType': 'application/json', 'payload':JSON.stringify(payload)});  
  var responseCode=response.getResponseCode();
  if(responseCode==200  ){
    console.log("Response Code: "+responseCode);
  } else {
    console.log("Non-success error code :"+ responseCode +" -->"+response.getContentText());
  }
  return (response.getResponseCode()==200);
}