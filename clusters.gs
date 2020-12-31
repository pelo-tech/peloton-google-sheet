// Adapted from https://github.com/repeale/time-series-clustering/blob/master/lib/Clusters.js
// NPM package: time-series-clustering
// This assumes we get a time series in date order



function ClusterAnalysis(config){
     
     var minTimeSpan=config.minTimeSpan;
     var maxItemDistance=config.maxItemDistance;
     var minSize=config.minSize;
     
     var items=config.items;
     var debug=config.debug;
     var clusters=[];
     var partialCluster=[];
     var ID_PROP=config.idProperty;
     var TIME_PROP=config.timeProperty;
     
     // sort items in REVERSE time order, but build clusters in FORWARD time order 
     items=items.sort((a,b)=> b[TIME_PROP]-a[TIME_PROP]);
     if(debug) Logger.log("Will analyze clusters over a sorted array of "+items.length+ "items with '"+ID_PROP+"' as ID and '"+TIME_PROP+"' containing the timestamp");
         
     for(var i=0; i < items.length ; ++i){
       var currentItem=items[i];
       
       // base case - at top of array
       if(i===0){
       
         if(debug) Logger.log("At first item. "+currentItem[ID_PROP]);
         partialCluster.unshift(currentItem);
         
       } else {
         
         var previousItem=items[i-1];
         
         // Check if in the same cluster
         if(Math.abs(currentItem[TIME_PROP]-previousItem[TIME_PROP]) < maxItemDistance){
         
             partialCluster.unshift(currentItem);
             
             // If this is the last item and we have a valid partial cluster
             if(i==items.length-1 && partialCluster.length>=minSize){
               clusters.unshift(partialCluster);
             }
         } else {
           // Not a member of the current cluster
           if(partialCluster.length >= minSize){
             clusters.unshift(partialCluster);
           }
           partialCluster=[currentItem];
         }
       }       
     }
     
     return clusters;
     
}
