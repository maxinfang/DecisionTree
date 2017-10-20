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
       
    if(mode =="student") {
    
    
    for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
         console.log( node);
         drawnode(node);
        
   }
        
      addConnections(myNodes);
      sentToparentPage(); 
       
    
    
    } 
    if(mode =="submission"){
      
      
   
      
      var tolerance_emv=getToleranceEMV();
      var tolerance_prob=getToleranceprob();
      
      myNodes=deserialise(history); 
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
     
      function setchildrensets(node){
    
    var currentnode= node; 
     console.log("in the loop");
    var nextnodes= currentnode.nextNodes;
     console.log(nextnodes);
    var sets= new Array();
    
    for(var l=0; l<nextnodes.length;l++){
        
         sets.push(nextnodes[l].node.value);  
     
   }
    
   node.node.childrentsets = sets;
  
  
  }
    
      
     
        
        
 setchildren();
 setchildren_correct(); 
      
      
       for(var n=0; n<linkedArray.length;n++){
        var   node= linkedArray[n];
       
              setchildrensets(node);
 
 
      } 
        
     for(var n=0; n<linkdeArray_correct.length;n++){
        var   node=linkdeArray_correct[n];
       
              setchildrensets(node);
 
 
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
         
          
        var deep =rootnode_correct.level
      
        
        for(var n=2; n<=deep ;n++){ 
            for(var m=0; m<linkdeArray_correct.length;m++){ 
               
                var  lnode=linkdeArray_correct[m];
        //      console.log(lnode);
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
                
                      //find the largest emv node;
                       if(ch[l].node.emv==maxemv)
                           { ch[l].node.prob=1;}
                       else{ ch[l].node.prob="0";}
                      }
                       
                    
                    if(maxemv==0){ 
                                lnode.node.emv="0";
                                }
                      else {  lnode.node.emv=maxemv;
                           }
                    
                    
                  }
                  if(lnode.node.type=="C"){
                    lnode.node.emv=circle_EMV(lnode);
                  
                  }
        }
            }
        }
           
      
      
      
      
         
     for(var n=0; n<linkedArray.length;n++){
        var  node= linkedArray[n].node; 
       
            node.color="red"; 
       
         for(m=0; m< linkdeArray_correct.length;m++){  
               var correct_node= linkdeArray_correct[m].node;  
             
                  if ((correct_node.value == node.value ) ||
           (correct_node.value == "" && node.value == "0") ||
          (correct_node.value == "0" && node.value == ""))
            {   
              if(node.parentlist.compare(correct_node.parentlist)) { 
                  node.color="green";   
                
         var   childrenofsub= node.childrentsets.sort();
         var    childrenofcorrect= correct_node.childrentsets.sort(); 
                  if(!childrenofsub.compare(childrenofcorrect)) {
                                       node.dotcolor="red";
                      
                    
                   }
                
                     
                    if(node.type.trim() != correct_node.type.trim())  {
                      node.outlinecolor="outlinered";
                      node.color ="orange";
                      
                    }   
                
                     if(node.type=='T'){ 
                            if  (!checkTolerance( node.emv,correct_node.emv,tolerance_emv)) { 
                               node.color="orange";// making emv box red
                               node.redEMV=true;
                            }   
                           
                     }   
                
                     if(node.type=='S'){ 
                           if(!checkTolerance(node.emv,square_EMV(linkedArray[n]),tolerance_emv) && !checkTolerance(correct_node.emv,node.emv ,tolerance_emv)   )  {
                                     node.color="orange";// making emv box red
                                     node.redEMV=true;
                           }
                              
                     }
                
                
                     if(node.type=='C'){ 
                        
                           if( !checkTolerance(node.emv, circle_EMV(linkedArray[n]),tolerance_emv) && !checkTolerance(correct_node.emv,node.emv ,tolerance_emv)    )  {
                                     node.color="orange";// making emv box red
                                     node.redEMV=true;
                           }
                                                     
                      
                     }
                 
                
                     if(node.parentID !=""){
                       
                       // 
                       
                       if(node.type=='S'){   
                         if(!checkTolerance(node.prob,square_child_prob(linkedArray[n]), tolerance_prob) && !checkTolerance(correct_node.prob,node.prob ,tolerance_prob)  ) 
                         {
                                     node.color="orange"; 
                                     node.redprob=true;
                           }
                              
                     }
                     else{ 
                
                       if(!checkTolerance(correct_node.prob,node.pro,tolerance_prob) ) { 
                         
                         if!((linkedArray[n].prevNode.node.type=="S" ||linkdeArray_correct[m].prevNode.node.type=="S")&&checkTolerance(square_child_prob(linkedArray[n]),node.prob ,tolerance_prob)){
                                   console.log(linkedArray[n]);
                                   console.log(linkdeArray_correct[m]); 
                         
                                   node.color="orange";
                                   node.redprob=true;
                                   }
                                   
                           }
                              
             
           
                     }
                         
                                               
                    
            }    
                
              
              
                    
                
              
       
       }
           }  
           
       }
       //compare the parent list to give the red color 
       
       // compare the children set to give the wrong children notification
       
       // get the value of the emv and prob
       
       //1. trilange if the value is the same 
       
       //2. 
 
      } 
         
      
      
        
    
      
      
       for(var n=0; n<linkdeArray_correct.length;n++){
        var   node= linkdeArray_correct[n].node;
        console.log( node); 
      } 
          
       
     for(var n=0; n<linkedArray.length;n++){
        var   node= linkedArray[n].node;
         
        drawnode(node);
 
      } 
         
     sentToparentPage();     
    
       
       

      }   
    
  
  
   
  
 
   
}
 