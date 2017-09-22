function drawnode(node){
      
     
      newdiv= document.createElement('div'); 
      $(newdiv).attr('id',node.id);
      var containerId = $(newdiv).attr('id');
      $(newdiv).addClass("container");
      $(newdiv).addClass(node.type);
      
     //postion
      if(node.top==""){ 
       }
       else{
      //   console.log("set position");
      $(newdiv).css({ top: node.top, left: node.left });
      } 
      
  
      $("#canvasdiv").append(newdiv);
    
    deletezone= document.createElement('div'); 
    var elem = document.createElement("img");
    elem.setAttribute("src", " icon-error.png");
    $(elem).uniqueId();
    $(elem).attr('align', 'right');
   $(deletezone).addClass("delete");
    $(deletezone).append(elem); 
    $(deletezone).addClass("delete");
  
      dragzone= document.createElement('div'); 
      $(dragzone).uniqueId();
      var currentId=$(dragzone).attr("id");
     var deleteId  =$(elem).attr("id");
    if(mode =="student") { $(newdiv).append(deletezone); } 
      $(newdiv).append(dragzone); 
       
     // console.log(node);
     addShapewithColor(node.type,dragzone,node.color,node.dotcolor); 
     
  var dropL;
  var dropLid;
  
  if(node.value==""){ 
     dropL=addDroplist();
     dropLid=$(dropL).prop('id');
     
  }
  
  else{
    dropL=addDroplist(node.value);
    dropLid=$(dropL).prop('id');

  }  
  
     $(dropL).change(function() { 
        
       
      var indexvalue= $( "#"+dropLid+" option:selected" ).val();
      node.value= indexvalue;
      updateNode(node,"value");
    })
  
   
     if (node.parentID!=""){        
       $(newdiv).append(dropL.show()); 
       
     }
  
     else{ 
       
       $(newdiv).append(dropL.hide()); 
           
     } 
  
      datadiv= document.createElement('div');
      $(datadiv).addClass("datatable");
      $(newdiv).append(datadiv); 
      $(datadiv).append(addlabel(dataLabel));
      var emv;
  
  
  
  
  
  if(node.emv==""){
     
     
     
     emv=addtext("EMV");}
     else{  
    
     if(node.redEMV){ emv= addtextwithred("EMV",node.emv); }
     else{ emv= addtext("EMV",node.emv);}
       }
  
     $(datadiv).append(emv); 
      var prob;
      var problabel;
      var probs;
  
   if (node.parentID!=""){        
       
     
     
     if(node.redprob){ prob=addtextwithred("Prob",node.prob);
     }
     else{ prob=addtext("Prob",node.prob);
     
     }
      problabel=addlabel("Prob");
        
        $(prob).show();
        $(problabel).show();
        $(probs).show();

     }
     else{
       
        prob=addtext("Prob");
        problabel=addlabel("Prob");
        $(prob).hide();
        $(problabel).hide();
        $(probs).hide();
     } 
 
 
       
   var br = document.createElement('br')  
  $(datadiv).append(br);
      $(datadiv).append(problabel);
      $(datadiv).append(prob);
      $(datadiv).append(probs);
       
   
   if(mode=="student"){
 
     
   emv.addEventListener("input", function(e) {
    
    var num = emv.value; 
    var message = validateNum( num);
    if (message!="true"){
         alert(message);
        emv.value= node.emv;
         }else{
        
        node.emv=  num; 
        updateNode(node,"emv");
           
      }
    
  }, false);    
     
     
  
   prob.addEventListener("input", function(e) {
    
    var num = prob.value; 
    var message = validateNum( num);
    if (message!="true"){
         alert(message);
        prob.value= node.prob;  
         }else{
        node.prob= num; 
        updateNode(node,"prob");
           
      }
    
  }, false);
    

    
    
  /*   $(emv).change(function() {
        //  console.log($(emv).val());
       
       if(! checkInp($(emv).val())){
           node.emv= $(emv).val();  
           updateNode(node,"emv");
       }
       else{
           
       }
         
});    
     $(prob).change(function() {
        
          if(! checkInp($(prob).val())){
           node.prob= $(prob).val();
           updateNode(node,"prob");
          } else{
           
          }
        
         
});   */
  
  }  
  
  $("#"+deleteId).click(function() { 
    if (confirm('Delete this node?')) {   
      jsPlumb.detachAllConnections(currentId )
      jsPlumb.removeAllEndpoints(currentId); 
       
      $("#"+node.id).empty();  
      
       deleteNode(node);
         $(this).empty();  
        sentToparentPage(); 
      
    }  
    
  });
  
  
   /*   $(newdiv).dblclick(function() {
      if (confirm('Are you sure you want to delete the node?')) {   
        jsPlumb.detachAllConnections(currentId );
        jsPlumb.removeAllEndpoints(currentId); 
        deleteNode(node); 
        $(this).empty();  
        sentToparentPage(); 
      }  
      });
  
    
     */
  jsPlumb.draggable($("#"+containerId), {
  containment:$("#canvasdiv").parent(),
        scroll:false     
}); 
  
      $("#"+containerId).draggable(  
        {    containment: $("#canvasdiv").parent(),
             scroll:false,
             handle:  "#"+currentId,
             stop: function(event, ui ){ 
             position = ui.position; 
             //value="top:"+position.top+"left:"+position.left;
             node.top=position.top;
             node.left=position.left; 
             updateNode(node,"top");
             updateNode(node,"left"); 
            }
          }
       );   
      //connection
     
      var top= $('#'+containerId).position().top;
      var left=$('#'+containerId).position().left;
  
      node.top=top;
      node.left=left;
  
      return node;
   
}