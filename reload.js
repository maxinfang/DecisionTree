function redraw(history,correct_string){
  
   var namespacefortoleranceEMV = array[0]+"_"+array[1]+"_tolerance_EMV"; 
 var namespacefortoleranceprob = array[0]+"_"+array[1]+"_tolerance_prob"; 
  
  function getToleranceEMV(){
  
    var element=  parent.document.getElementById(namespacefortoleranceEMV);
  if (element == null) {   return 1;}
     
    return element.innerHTML;

}

function getToleranceprob(){
   var element= parent.document.getElementById(namespacefortoleranceprob);
   
    if (element == null) {   return 0.01;}
     
    return element.innerHTML;
  
}

  
    if(history == "No answer") { myNodes = [];}
  else{ myNodes=deserialise(history);}
  
     if (myNodes == []) return;
       
      
    for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n];
       console.log(node);
         drawnode(node);
       } 
  
    sentToparentPage();
  
 
    if(mode =="temportycode"){
      
      var tolerance_emv=getToleranceEMV();
      var tolerance_prob=getToleranceprob();

  myNodes=deserialise(history); //submission
   
          myNodes_correct=deserialise(correct_string);  //correctstring
      // find the end of child;
      // calculatNode(myNodes); 
      var linkedArray= new Array(); 
      var linkedArray2= new Array(); 
      
      var linkdeArray_correct=new Array();
      var linkedArray2_correct= new Array(); 
        
        
    
        
      for(n=0; n<myNodes.length;n++){ 
       
      var node=myNodes[n];  
       
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray.push(linkedNode);  
      linkedArray2.push(linkedNode);
  }  
      
       for(n=0; n<myNodes_correct.length;n++){ 
       
      var node=myNodes_correct[n];  
      
      var linkedNode_correct= new NodeClass(node)
      //console.log(linkedNode);
      linkdeArray_correct.push(linkedNode_correct);  
      linkedArray2_correct.push(linkedNode_correct);
  } 

        
        
     function setchildren(){
          
        for (j=0;j<linkedArray.length;j++){ 
          
        var linkedNode=linkedArray[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2.length;n++){ 
                var  thisnode= linkedArray2[n];  
                var node = thisnode.node;
                var pID= thisnode.node.parentID;  
               if(pID== linkedNode.id){
                 thisnode.prevNode= linkedNode; 
                 children.push(thisnode); 
                }; 
              }
       
          linkedNode.nextNodes=children; 
        }
      }
   
        
        
        
      
     function setchildren_correct(){
          
        for (j=0;j<linkdeArray_correct.length;j++){ 
          
        var linkedNode=linkdeArray_correct[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2_correct.length;n++){ 
                var  thisnode= linkedArray2_correct[n];  
                var node = thisnode.node;
                var pID= thisnode.node.parentID;  
               if(pID== linkedNode.id){
                 thisnode.prevNode= linkedNode; 
                 children.push(thisnode); 
                }; 
              }
       
          linkedNode.nextNodes=children; 
        }
      }
        
      
        
        
           function findrootnode_correct(){
        for(var n=0; n<linkdeArray_correct.length;n++){
        var  rootnode= linkdeArray_correct[n];
        var pid=rootnode.node.parentID;
        if(pid=="") {  
            return rootnode; };
        }
      } 
        
        
           function findrootnode(){
        for(var n=0; n<linkedArray.length;n++){
        var  rootnode= linkedArray[n];
        var pid=rootnode.node.parentID;
        if(pid=="") {  
            return rootnode; };
        }
      } 
    
        
       
         function recursive(node){  
      var currentnode= node;
      var nextnodes= node.nextNodes;
      var nodedata= node.node; 
      var length= nextnodes.length;
         
    
      
      if( length>0) {
      var  prob=0;
      var max = 0;
      for (var x=0;x<length;x++){
          var childnode = nextnodes[x];  
          var childLevel = recursive(childnode);  
          
          if( max < childLevel){
            max=childLevel;  
            
        }
         
        } 
        
       node.level=max+1;
        return node.level
       
      } 
       
      node.level=1;
      return node.level;
              
  }
        
         
   function setparentlist(node,pass){  
     
      var currentnode= node;
      var nextnodes= currentnode.nextNodes;
      var nodedata= currentnode.node;  
     nodedata.parentlist=pass;
     var newpass = pass.slice();
     newpass.push(nodedata.value);
    
     
       
      var length= nextnodes.length; 
      if( length>0) { 
      for (var x=0;x<length;x++){ 
             
            var childnode = nextnodes[x];  
           setparentlist(childnode,newpass.slice());  
        
        } 
          
      } 
     
  }     
        
        
 setchildren();
 setchildren_correct();   
    
     for(var n=0; n<linkedArray.length;n++){
        var   node= linkedArray[n];
       
              
 
 
      } 
        
       
        var rootnode = findrootnode();
        var rootnode_correct=findrootnode_correct();
        
       
        var rootnodeid = rootnode.node.id;
        
        if(typeof rootnode_correct != 'undefined' )
          {
            var rootnodeid_correct=rootnode_correct.node.id;
            recursive(rootnode_correct);
            var pa_correct=new Array(); 
             setparentlist(rootnode_correct,pa_correct);
          }
        
       recursive(rootnode);
        
        var pa= new Array();
        setparentlist(rootnode,pa);
         
          
        var deep =rootnode.level
            
        console.log( "deep------>");
        console.log(deep); 
        console.log( "<-------deep");
          
        //linkedArray2 is the submission array
      
        for(var n=2; n<=deep ;n++){ 
            for(var m=0; m<linkedArray2.length;m++){ 
               
                var  lnode= linkedArray2[m];
                 console.log(lnode);
               
                if(lnode.level==n){
                    
                    if(lnode.node.type=="S"){
                  
                    var ch =lnode.nextNodes; 
                    var maxemv=0;
                    var   _array = new Array();
                   
                   for(var l=0; l<ch.length; l++){ 
                     _array.push(ch[l].node.emv);  
                    }
                      var maxemv=Math.max.apply(Math,_array);
                    for(var l=0; l<ch.length; l++){
                
                      
                       if(ch[l].node.emv==maxemv)
                           { //ch[l].node.prob=1;
                           }
                       else{// ch[l].node.prob="0";
                           }
                      }
                       
                    
                    if(maxemv==0){ 
                               // lnode.node.emv="0";
                                }
                      else {   // lnode.node.emv=maxemv;
                           }
                    
                    
                  }
                  if(lnode.node.type=="C"){
                   //if( lnode.node.emv !=circle_EMV(lnode)){ 
                              //     lnode.node.redEMV=true;
                    //   }
                  
                  }
        }
            }
        }
           
         
    
    
        
     
        
    for(n=0; n<myNodes.length;n++){  
      
           var node=  myNodes[n]; 
           
            //   node.color="red";  
            // node.redEMV=false; 
            // node.redprob=false;
           for(m=0; m< linkdeArray_correct.length;m++){  
               var correct_node= linkdeArray_correct[m];   
               console.log(node);
               node.redEMV=true;
               node.redprob=true;
             
               console.log("~~~~~~~~~~~");
               console.log(correct_node);
               console.log(node); 
               console.log("~~~~~~~~~~");
             
             if ((correct_node.node.value == node.value ) ||
           (correct_node.node.value == "" && node.value == "0") ||
          (correct_node.node.value == "0" && node.value == ""))
            {   
              if(node.parentlist.compare(correct_node.node.parentlist)) { 
                    node.color="green"; 
                     
                    if(node.type != correct_node.node.type)  {node.color="orange";} 
           // if(node.emv != sub_node.emv)  {node.color="orange";                                        
                                                  //type is cycle
                                         //type is cycle
                     if(correct_node.node.type=='T'){
                       
                            if  (!checkTolerance(correct_node.node.emv,node.emv,tolerance_emv)) { 
                            //  node.color="orange";// making emv box red
                             //  node.redEMV=true;
                            }   
                           
                     }   
                
                     if(correct_node.node.type=='S'){ 
                         
                           if(!checkTolerance(correct_node.node.emv,square_EMV(correct_node),tolerance_emv) && !checkTolerance(correct_node.node.emv,node.emv ,tolerance_emv)   )  {
                                    // node.color="orange";// making emv box red
                                   //  node.redEMV=true;
                           }
                              
                     }
                
                       if(correct_node.node.type=='C'){ 
                        
                           if( !checkTolerance(correct_node.node.emv, circle_EMV(correct_node),tolerance_emv) && !checkTolerance(correct_node.node.emv,node.emv ,tolerance_emv)    )  {
                                    // node.color="orange";// making emv box red
                                    //  node.redEMV=true;
                           }
                                                     
                      
                     }
               
             if(correct_node.node.parentID !=""){
                     if(correct_node.node.type=='S'){ 
                       
     
                       if(!checkTolerance(correct_node.node.prob,square_child_prob(correct_node), tolerance_prob) && !checkTolerance(correct_node.node.prob,node.prob ,tolerance_prob)  )  {
                            //node.color="orange";// making  prob  box red
                                  
                           }
                              
                     }
                     else{
                           
                               if(!checkTolerance(correct_node.node.prob,node.prob ,tolerance_prob))  {
                          //  node.color="orange";
                          //  node.redprob=true;
                                   
                          // making  prob  box red
                           }
                              
                     
                     
                     }
               
              
                                          
                    
            }           
                   

             }  

           }
    }
 }          
        
        
        
    
        
   for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
         console.log( node);
         drawnode(node);
        
   }
        
      addConnections(myNodes);
      sentToparentPage(); 
       
       

      }
}
 