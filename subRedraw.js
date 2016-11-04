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

function getsubmission(){
    var element= parent.document.getElementById(namespaceforSubmit);
    return element.innerHTML;
 } 

function getCorrectAnswer(){
   
  var el=parent.document.getElementById(namespaceforAnswer).innerHTML; 
     
  return el;
    
 } 

 var op = getEntry();
 var dataLabel= getLabel();
 var correctAnswer= getCorrectAnswer();
 
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
      //caculate the nodes depending on email;
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
        
        
 setchildren();
 setchildren_sub();       
       
        var rootnode = findrootnode();
        var rootnode_sub=findrootnode_sub();
        var rootnodeid = rootnode.node.id;
        var rootnodeid_sub=rootnode_sub.node.id;
        recursive(rootnode);
        recursive(rootnode_sub);
       var pa= new Array();
        setparentlist(rootnode,pa);
       var pa_sub=new Array();
        setparentlist(rootnode_sub,pa_sub);
        
      
         
           
        var deep =rootnode.level
        
        for(var n=2; n<=deep ;n++){ 
              for(var m=0; m<linkedArray2.length;m++){ 
                var  lnode= linkedArray2[m];
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
                       else{ch[l].node.prob="0";}
                      }
                       
                    
                    
                    lnode.node.emv=maxemv;
                    
                    
                  }
                  if(lnode.node.type=="C"){
                     var ch =lnode.nextNodes; 
                     var sum= 0;
                    for(var l=0; l<ch.length; l++){
                    
                      //find the largest emv node;
                        var nodeemv=Number(ch[l].node.emv);
                        var  nodeprob=Number(ch[l].node.prob);
                             
                        var nodev=  numMulti(nodeemv,nodeprob);
       
                        sum =numAdd(sum , nodev);
                    
                    }
                    lnode.node.emv=sum;
                  
                  }              }
                 
                
              }
        }
           
         
     //  recursiveemv(rootnode); 
    //  recursive(rootnode); 
        
        
        
    //
    
        
     
        
    for(n=0; n<myNodes.length;n++){ 
         var node=  myNodes[n];
          node.color="orange";
         for(m=0; m<myNodes_submission.length;m++){  
         var sub_node= myNodes_submission[m];  
          if(sub_node.value == node.value )
           { 
             if(node.parentlist.compare(sub_node.parentlist)) {
               
              node.color="green"; 
               break;
             }  
   
            
         
            }
         
        }
        
   }
     
        
   for(n=0; n<myNodes.length;n++){ 
         var node= myNodes[n]; 
         console.log( node);
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