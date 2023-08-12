 var myNodes=new Array();
 var mode ="correct";
 var questionId=this.frameElement.attributes.id.value; 
 
 var array = questionId.split("_");
    
 if(array[0] == "question"){  
    }; 
 
 var namespaceforEntry = array[0]+"_"+array[1]+"_entry"; 
 var namespaceforLabel=  array[0]+"_"+array[1]+"_label"; 
 var namespaceforSubmit= array[0]+"_"+array[1]+"_submission"; 
 var namespaceforAnswer= array[0]+"_"+array[1]+"_answer"; 
 var namespacefortoleranceEMV = array[0]+"_"+array[1]+"_tolerance_EMV"; 
 var namespacefortoleranceprob = array[0]+"_"+array[1]+"_tolerance_prob"; 
 var namespaceforInput = "input_"+array[1]; 

 var op= new Array();
 
 function getEntry(){
   
    var elements=new Array();  
    var  seq=1;
    var  flag =1;
    
  while(flag){
    
    var  tempname= namespaceforEntry+"_"+seq; 
    var element=parent.document.getElementById(tempname);
    if ( typeof element !="undefined"&& element !=null ) { 
      
      var bu =element.innerHTML;
      elements.push( bu);
      seq++;
    }else {flag=0;}
      
   }
     return elements;
   }
 

function getLabel(){
    var element=  parent.document.getElementById(namespaceforLabel);
  if (element == null) {   return;}
     
    return element.innerHTML;
 } 

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

function getsubmission(){
  parentintputbox=$("input[name*='" + namespaceforInput + "']", window.parent.document);
  return parentintputbox[0].value;
 } 

function getCorrectAnswer(){
   
  var el=parent.document.getElementById(namespaceforAnswer).innerHTML; 
     
  return el;
    
 } 

 var op = getEntry();
 var dataLabel= getLabel();
 var correctAnswer= getCorrectAnswer();
var tolerance_emv=getToleranceEMV();
var tolerance_prob=getToleranceprob();

if(parent.document.getElementById(namespaceforAnswer))
   {
     
  mode ="correct";
 
   
   };


$(document).ready(function()  {
       
    //initialize jsPlumb
     
    /*initialize endpoint Class*/
      jsPlumb.Defaults.Container = $("#canvasdiv"); 
      jsPlumb.DefaultDragOptions = {  cursor:"pointer",
                                      zIndex: 2000 };
      jsPlumb.endpointClass = "endpointClass";
      jsPlumb.connectorClass =  "connectorClass";   
  
    /*initialize bind function*/
   ///click
      
   ///connection  
   
     
   //check wehter we need reload or not
  
  var history=""; 
  var submission="";
  if(mode=="correct"){
    
    history = getCorrectAnswer();
    submission =getsubmission();
    
    
    }
      
  if(history == "" ){ 
      }
      else{ 
      
      myNodes=deserialise(history); 
   
      myNodes_submission=deserialise(submission); 
      // find the end of child;
      // calculatNode(myNodes); 
      var linkedArray= new Array(); 
      var linkedArray2= new Array(); 
      
      var linkdeArray_sub=new Array();
      var linkedArray2_sub= new Array(); 
        
        
    
        
      for(n=0; n<myNodes.length;n++){ 
       
      var node=myNodes[n];  
       
      var linkedNode= new NodeClass(node)
      //console.log(linkedNode);
      linkedArray.push(linkedNode);  
      linkedArray2.push(linkedNode);
  }  
      
       for(n=0; n<myNodes_submission.length;n++){ 
       
      var node=myNodes_submission[n];  
      
      var linkedNode_sub= new NodeClass(node)
      //console.log(linkedNode);
      linkdeArray_sub.push(linkedNode_sub);  
      linkedArray2_sub.push(linkedNode_sub);
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
   
        
        
        
      
     function setchildren_sub(){
          
        for (j=0;j<linkdeArray_sub.length;j++){ 
          
        var linkedNode=linkdeArray_sub[j];
           
           // linkedNode.node.parentID;
          
          var children= new Array(); 
              for(var n=0; n<linkedArray2_sub.length;n++){ 
                var  thisnode= linkedArray2_sub[n];  
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
        
      
        
        
           function findrootnode_sub(){
        for(var n=0; n<linkdeArray_sub.length;n++){
        var  rootnode= linkdeArray_sub[n];
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
    
    var nextnodes= currentnode.nextNodes;
    
    
    var sets= new Array();
    
    for(var l=0; l<nextnodes.length;l++){
        
         sets.push(nextnodes[l].node.value);  
     
   }
    
   node.node.childrentsets = sets;
  
  
  }
        
        
 setchildren();
 setchildren_sub();   
    
     for(var n=0; n<linkedArray.length;n++){
        var   node= linkedArray[n];
       
              setchildrensets(node);
 
 
      } 
        
     for(var n=0; n<linkdeArray_sub.length;n++){
        var   node=linkdeArray_sub[n];
       
              setchildrensets(node);
 
 
      }     
     
         
        
       
        var rootnode = findrootnode();
        var rootnode_sub=findrootnode_sub();
        
       
        var rootnodeid = rootnode.node.id;
        
        if(typeof rootnode_sub != 'undefined' )
          {
            var rootnodeid_sub=rootnode_sub.node.id;
            recursive(rootnode_sub);
            var pa_sub=new Array(); 
             setparentlist(rootnode_sub,pa_sub);
          }
        
        recursive(rootnode);
        
       var pa= new Array();
        setparentlist(rootnode,pa);
         
          
        var deep =rootnode.level
        
        for(var n=2; n<=deep ;n++){ 
            for(var m=0; m<linkedArray2.length;m++){ 
               
                var  lnode= linkedArray2[m];
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
           
         
     //  recursiveemv(rootnode); 
    //  recursive(rootnode); 
        
        
        
    //
    
        
     
        
    for(n=0; n<linkedArray.length;n++){  
           var linkednode=linkedArray[n];
           var node=  linkednode.node; 
       //    console.log(linkednode);
           node.color="red";  
           node.redEMV=false; 
           node.redprob=false;
      
          
      
           for(m=0; m< linkdeArray_sub.length;m++){  
               var sub_node= linkdeArray_sub[m];  
             
               
             //console.log(linkednode.node);
             
            // console.log(sub_node.node.childrentsets);
             if ((sub_node.node.value == node.value ) ||
           (sub_node.node.value == "" && node.value == "0") ||
          (sub_node.node.value == "0" && node.value == ""))
            {   
              if(node.parentlist.compare(sub_node.node.parentlist)) { 
                       node.color="green"; 
                
                  var   childrenofsub= sub_node.node.childrentsets.sort();
                  var   childrenofcorrect= linkednode.node.childrentsets.sort();
                  console.log("~~~~~~~");
                  console.log( childrenofsub);
                console.log(childrenofcorrect);
                
                 console.log("~~~~~~~");
                    if(!childrenofsub.compare(childrenofcorrect)) {
                                          node.dotcolor="red";
                      
                    
                    }
               
                     
                    if(node.type.trim() != sub_node.node.type.trim())  {
                      node.outlinecolor="outlinered";
                      node.color ="orange";
                    }
                   
                    
                
                   // if(node.emv != sub_node.emv)  {node.color="orange";
                    
                                                                               
                                                  //type is cycle
                                         //type is cycle
                     if(node.type=='T'){
                       
                            if  (!checkTolerance(sub_node.node.emv,node.emv,tolerance_emv)) { 
                              node.color="orange";// making emv box red
                               node.redEMV=true;
                            }   
                           
                     }   
                
                     if(node.type=='S'){ 
                         
                           if(!checkTolerance(sub_node.node.emv,square_EMV(sub_node),tolerance_emv) && !checkTolerance(sub_node.node.emv,node.emv ,tolerance_emv)   )  {
                                     node.color="orange";// making emv box red
                                     node.redEMV=true;
                           }
                              
                     }
                
                       if(node.type=='C'){ 
                        
                           if( !checkTolerance(sub_node.node.emv, circle_EMV(sub_node),tolerance_emv) && !checkTolerance(sub_node.node.emv,node.emv ,tolerance_emv)    )  {
                                     node.color="orange";// making emv box red
                                      node.redEMV=true;
                           }
                                                     
                      
                     }
               
             if(node.parentID !=""){
                    if(!checkTolerance(sub_node.node.prob,node.prob,tolerance_prob) ) { 
                         
                           
                         if(!((sub_node.prevNode.node.type=="S" ||linkedArray[n].prevNode.node.type=="S")&&checkTolerance(square_child_prob(sub_node),sub_node.node.prob ,tolerance_prob))){
                                 
                                   node.color="orange";
                                   node.redprob=true;
                                   }
                                   
                           }
                              
               
               // console.log(sub_node.nextNodes);
               // console.log(node.nextNodes);
              //if(node.childrent != sub_node.chilist) add another list comparing the children value; something that can do later                
                                               
                    
            }           
                   

             }  

           }
    }
 }          
        
        
        
              
  /* for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
         console.log( node.color);
         if(node.color =='red') continue; 
         if(node.color =='green') continue; 
           
          node.color ='grey';
        
              
   */
   
     
        
        
        
        
   for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
       //  console.log( node);
         drawnode(node);
        
   }
        
     
        
     // redraw(history);
      
        
     // find rootnode and hide the prob;
        $("#"+rootnodeid).children().each(function(no,el){
        if($(el).hasClass("datatable")){
          $(el).children().each(function(n,e){
            if ($(e).hasClass("Prob")){ $(e).hide();}
          })
        } 
        });
       addConnections(myNodes);
      }
  
    jsPlumb.bind("connection", function(info, originalEvent) {
        var conn = info.connection;
        var parentId=$('#'+conn.sourceId).parent().attr('id');
        var childId=$('#'+conn.targetId).parent().attr('id');
        var node = findnode(childId);
        node.parentID=parentId;
         
        updateNode(node,"parentID");  
        
        
        $("#"+childId).children().each(function(no,el){
        if($(el).hasClass("droplist")){
        $(el).show();
        } 
        });
    })
  
});