var MEMBER_SEPARATOR='b';
var NODE_SEPARATOR='a';


if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
if (!Array.prototype.compare)
{
Array.prototype.compare = function(testArr) {
  //console.log("*****************************************************************");
 // console.log(this);
//  console.log(testArr);
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if ((this[i] == "" && testArr[i] == "0") ||
        (this[i] == "0" && testArr[i] == "")) {
          // accept empty string = 0
                continue;
        }
        else if (this[i] != testArr[i]) return false;
    }
  console.log("found!");
    return true;
}
  }


function checkTolerance(submitvalue,correctvalue,tolerance){
 
    var difference = Math.abs(submitvalue-correctvalue);
   console.log("~~~~~~~~~~~~~~~~~~~~");
  console.log(difference);
   console.log("~~~~~~~~~~~~~~~~~~~~");
    if (difference <= tolerance) {
     return true;
    }
    else false;
}



function square_EMV(lnode){ 

    var ch = lnode.nextNodes; 
    var maximum = 0;
    _array = new Array();
    for(var l=0; l<ch.length; l++){
        //find the largest emv node;
        _array.push(ch[l].node.emv);
       // sum = numAdd(sum , nodev);
    }
     maximum=Math.max.apply(Math,_array);

    return maximum; 

}

function square_child_prob(lnode) { 
    var parentnode = lnode.prevNode;  
  
    if (lnode.node.emv == square_EMV(parentnode) ) {
      
      return 1;
    }
    else{
      return 0; 
    } 
}
 

function circle_EMV(lnode) {
    var ch = lnode.nextNodes; 
    var sum = 0;
    for(var l=0; l<ch.length; l++){
        //find the largest emv node;
        var nodeemv=Number(ch[l].node.emv);
        var  nodeprob=Number(ch[l].node.prob);
        var nodev=  numMulti(nodeemv,nodeprob);
        sum = numAdd(sum , nodev);
    }
    return sum;
}
  
function Node(id,type,parent,top,left,selectvalue,emv,prob){      
       this.id = "";
       this.type="";
       this.parentID =""; 
       this.top ="";
       this.left=""; 
       this.value="";
       this.emv="";
       this.prob="";
       this.parentlist=[]; 
     }  

/********************/
// wrong type of maple Ta quesiton, will created ( ) *
// this function will clean up the symbols gerented by MAPLETA
function String_clean(str){}{
  
             str = str.replace("(","");
             str = str.replace(")","");
             str = str.replace("*","");
       return str;
  
      }
 
function deserialise(string){
  
       
       
       if(string.indexOf('b') == -1){ 
        var array= new Array();
        return array;
       
       }
  
  
       var array= new Array();
       var stringnode=  string.split('a');
       //console.log(stringnode.length);
       for(i=0;i<stringnode.length-1;i++){
       var nodeAttribute=stringnode[i].split('b');
       //console.log(nodeAttribute[1]);
       var node = new Node();
       node.type= nodeAttribute[0]
       node.id=nodeAttribute[1];
       node.value=nodeAttribute[2];
       node.left =nodeAttribute[3]; 
       node.top =nodeAttribute[4]; 
       node.emv=nodeAttribute[5];
       node.prob=nodeAttribute[6]; 
       node.parentID=nodeAttribute[7]; 
       array.push(node);
          
       }  
     return array; 
}


function serialise(myNodes){
      var answervalue =""; 
      for(l=0;l<myNodes.length;l++){
      var thisnode=myNodes[l]; 
      answervalue+=thisnode.type;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.id;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.value;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.left;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.top;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.emv;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.prob;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=thisnode.parentID;
      answervalue+=MEMBER_SEPARATOR;
      answervalue+=NODE_SEPARATOR;
    } 
      return answervalue;
};

function generateID(myNodes){
      
  if (typeof(myNodes) == "undefined" ) {return 1;}
      
      var myNodesArray=myNodes;
      var max=0;  
      
      for(n=0; n<myNodesArray.length;n++){ 
         var node= myNodes[n]; 
          node.id >=max;
          max=node.id 
       } 
      var ret= Number(max) +1;
      return ret;
      
      };

  function findnode(id){ 
       for(m=0; m<myNodes.length;++m){
         if (myNodes[m].id == id){ 
         return myNodes[m];
         }
       }
       }

 function addNewNode(node){

     myNodes.push(node);
     sentToparentPage();
   }
function  emptymyNodes(){

    myNodes=[];
    jsPlumb.reset; 
    sentToparentPage();
   }

  function validateNum(value)
{
    var num = value;
    var regex=/^[-+]?[0-9]*\.?[0-9]*$/;
    var emdashregex=/[－]+/;
    var commaregex=/[,]+/;
  
  message="true";
  
  if (!num.match(regex)) { message="Numbers must only contain -.1234567890"; 
                          }
     
     
  if(num.match(emdashregex)){
         message +="\nHint: Are you using the standard negative sign? ";  
              } 
  
 if(num.match(commaregex)){
        message +="\nHint: Do not use comma (,) as decimal point? ";  
  }
         
   return message;
  
  
 }

  function checkInp(value)

 {
   var x=value ;
   regex=/^[-+]?[0-9]*\.?[0-9]*$/;
    if (!x.match(regex))
     { 
       return false;
     }
   return true;

 }


 function updateNode(node,property){
   
      //falidate first.
      
      var myNodesArray=myNodes;
      
      for(n=0; n<myNodesArray.length;n++){ 
         var n= myNodes[n]; 
        if(  n.id== node.id){
          if(property=="top") {n.top=node.top;}
          if(property=="left"){n.left=node.left;}
          if(property=="parentID"){n.parentID=node.parentID;}
          if(property=="emv"){n.emv=node.emv;}
          if(property=="prob"){n.prob=node.prob;}
          if(property=="value"){n.prob=node.value;}
        }
       } 
   if(mode == "student"){ sentToparentPage();}
   return;
      };


function giveloopWarning(text){
  
        
    var loop="Warning: loop detected!";
    for(var n=0; n<text.length;n++){ 
                  
        node= text[n];
        //loop= loop+" "+node.id; 
              
        var targetid ;
        $("#"+node.id).children().each(function(no,el){ 
            if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
                targetid= el.id ; 
            } 
        });
  
        var sourceid ; 
        $("#"+node.id).children().each(function(no,el){
                  
            if($(el).hasClass("_jsPlumb_endpoint_anchor_")){
                sourceid= el.id ; 
            } 
        }); 
              
        console.log(targetid);
        console.log(sourceid);
              
    }
             
    var connectionList = jsPlumb.getConnections();
    console.log(connectionList);
    for(var x=0; x<connectionList.length; x++){
           
        conn =connectionList[x];
      
         var targetId=$('#'+conn.targetId).parent().attr('id');
         var targetnode= findnode(targetId); 
        if (include(text,targetnode)){
            conn.setPaintStyle({ 
                dashstyle: "solid",
                lineWidth: 2 ,
                strokeStyle:"#fa0000",
            })
        } 
    else{
      conn.setPaintStyle({ 
                dashstyle: "solid",
                lineWidth: 2 ,
                strokeStyle:"#666",
            })
    }
    }
           
    if(text.length>0){
        $("body").css("background-color","#fee");
        $("p").text(loop);
  }
   else{
       giveWarning();
            
       }; 

}

function  giveWarning(){
      var numberOfnoParent=0;
  
  for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        var parentid = node.parentID;
        if(parentid=="") numberOfnoParent++;
    
    
       }  
         if (numberOfnoParent>1) {
           
           $("body").css("background-color","#fee");
           $("p").text("Warning: Not all nodes are connected!");
            
         }  
            else{
              $("body").css("background-color","transparent");
              $("p").text("");
            
       }; 
}


function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
  
  //include([1,2,3,4], 3); 
}


function recursivecheck(currentnode,box){
    
       
    box.push(currentnode) ;
  
    var parentid =currentnode.parentID;
           
    if(parentid=="") {return true;};
  
    var parentnode= findnode(parentid);
  
    if(include(box,parentnode)){
    ret = new Array();
    while (box.length > 0) {
      temp = box.pop();
      ret.push(temp);
      if (include(ret,parentnode)) {
        return ret;
      }
    }
  } 
  
    else{ return  recursivecheck (parentnode,box);  
          
           
         }
  
   
}





function checkloop(){
   
    var allerrors = new Array();
    for(n=0; n<myNodes.length;++n){
       
        var node= myNodes[n];
        var li=[]; 
        li.push(node);  
        if(node.parentID!="") { 
            var parentid =node.parentID;
            var parentnode= findnode(parentid);  
            var temp=  recursivecheck(parentnode, li )
            if (temp!=true){ 
                for (var l=0; l<temp.length;l++ ) {
          if (! include(allerrors,temp[l])) {
            allerrors.push(temp[l]);
          }
        }
              
            } 
        }
    
    }  
    giveloopWarning(allerrors);
}

function sentToparentPage()
{ console.log(myNodes);
  checkloop();
  //giveWarning();
  var answervalue = serialise(myNodes); 
  
  if(mode !="submission" && mode !="correct"){
 
      var elem= parent.document.getElementsByTagName("input"); 
 
    
  var arr = new Array();
  var i = 0;
  var iarr = 0;
  var att;
    var reloadflag= false;
    var statuschange  = false;
  for(; i < elem.length; i++) {
        att = elem[i].getAttribute("type");
    if(att =="text") {
        if( elem[i].value == "" &&  answervalue !=""){statuschange  =true;}
       elem[i].value   = answervalue; 
      }  
     
         
    }
    
   if (statuschange   == true){ 
     console.log("relaod");
   parent. pageFullyLoaded();
   console.log("call orignal function");}
   console.log("save:"+answervalue);
  }
  
  if(mode =="submission" || mode =="correct"){
  
    console.log("don't save");
  
  
  
  }
}


function reloadiframe()
{
window.location.reload();

}
 
function deleteNode(node)
{
       var deletedNodeid=node.id; 
       var index = myNodes.indexOf(node); 
       
       myNodes.splice(index,1); 
       for(n=0; n<myNodes.length;n++){
        var node= myNodes[n];
        
        if(node.parentID==node.id){ 
        node.parentID="";
                                             $("#"+node.id).children().each(function(no,el){
        if($(el).hasClass("droplist")){
        $(el).hide();
        } 
        });}
       }  
       giveWarning();  
      $("#"+deletedNodeid).remove();
      
}
 




 