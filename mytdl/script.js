affichertous();
function test(){
 var table = JSON.parse(localStorage.getItem("state"));
 if(table != null)
 {
   if(table.length>0){$("#bar").html("<span id='num'>total of tasks:"+table.length+" </span>   <button  onclick='deleteall()' style='margin:0 0 0 400px'> <i class='fa fa-trash' style='padding: 5px;color:red'></i>Delete all</button> <br>") ;
   $("#choice").show();
    
 }
if($("#choix").val()=="new"){
  $(".todo-list").html("");
for(var i=0;i<table.length;i++)
{var data=table[i];
    
    if(data.status=='new') afficher(data.title,data.id);
  }
  }else if($("#choix").val()=="done"){
    $(".todo-list").html("");
for(var i=0;i<table.length;i++)
{var data=table[i];
  if(data.status=='done') 
  {
      afficher(data.title,data.id); 
      $("."+data.id).toggleClass("danger");
  }
}
}
else if($("#choix").val()=="all"){
  $(".todo-list").html("");
    affichertous();
}
}
}
function affichertous(){
  $("#choice").hide();

  var table = JSON.parse(localStorage.getItem("state"));
  if(table != null){
   if(table.length>0){
  $("#bar").html("<span id='num'> Total of tasks:"+table.length+"</span> <button  onclick='deleteall()' style='margin:0 0 0 400px'> <i class='fa fa-trash' style='padding: 5px;color:red'></i>Delete all</button> <br>") ;
    $("#choice").show();
  
  }
   for(var i=0;i<table.length;i++)
{var data=table[i];
  if(data.status=='new') afficher(data.title,data.id);
  if(data.status=='done') 
  {
      afficher(data.title,data.id); 
      $("."+data.id).toggleClass("danger");
  }
}
}
}


function setToDone(id){
  var baseState = JSON.parse(localStorage.getItem("state"));
   var ikkd=$(id).attr("data-id");
   var i;
   var k=0;
 for(i=0;i<baseState.length;i++){
if(baseState[i].id==ikkd){
  if (baseState[i].status =='new') {   
    baseState[i].status = 'done';   
    $(id).parent().parent().addClass("danger");
    k=1;
  }
  if( k==0){
    baseState[i].status ='new';
    $(id).parent().parent().removeClass("danger");
  }
}
}
 localStorage.setItem("state",JSON.stringify(baseState)); 
}

function deleteTodo(id) {
  var baseState = JSON.parse(localStorage.getItem("state"));
  var ikkd=$(id).attr("data-id");
  $(id).parent().parent().fadeOut(500);
  var i;
for(i=0;i<baseState.length;i++){
if(baseState[i].id==ikkd){
baseState.splice(i,1);
if(baseState.length==0)  
{$("#bar").html("");
$("#choice").hide();
}
else  $("#bar").html("<span id='num'> Total of tasks:"+baseState.length+"</span> <button  onclick='deleteall()' style='margin:0 0 0 400px'> <i class='fa fa-trash' style='padding: 5px;color:red'></i>Delete all</button> <br>") ;
break;
}
}
localStorage.setItem("state",JSON.stringify(baseState)); 
}

function deleteall(){
  var i;
  var tab=JSON.parse(localStorage.getItem("state"));
  for(i=0;i<tab.length;i++)
  {
    var elem=tab[i];
    $("."+elem.id).fadeOut(500);
    $("#bar").html("");
    $("#choice").hide();
  }
  localStorage.clear();
}

function addItem(text,id) {
  var item =
  "<li class='"+id+"'><div class='checkbox'>"+
  "<i data-id='"+id+"' onclick='setToDone(this)' class='fa fa-check' style='color:black;float:right ;padding:5px'></i> "+
  "<i data-id='"+id+"' onclick='deleteTodo(this)' class='fa fa-trash' style='color:red ;float:right;padding:5px'></i> "+
  "<label><span class='checkbox-mask'></span><input type='checkbox' />" 
  +text+ "</label></div></li>";
  if(text=="") {
    var a=JSON.parse(localStorage.getItem("state"));
    alert("Remplir svp");
    if(a!=null)
    if(a.length==0)
    {
  $("#bar").html("");
$("#choice").hide();
  }
  }
  else{
    var a=JSON.parse(localStorage.getItem("state"));
    if (a==null){
      
      var state = [];
     localStorage.setItem("state",JSON.stringify(state));
     var a=JSON.parse(localStorage.getItem("state"));
    }
    var b= { title: text, status: 'new',id: id };
    a.push(b);
    localStorage.setItem("state",JSON.stringify(a));
    if(a.length>=0)  {$("#bar").html("<span id='num'>Total of tasks:"+a.length+"</span> <button  onclick='deleteall()' style='margin:0 0 0 400px;float:right'> <i class='fa fa-trash' style='padding: 5px;color:red'></i>Delete all </button> <br>") ;
    $("#choice").show();
    }
    $(".todo-list").append(item);
    }
}

  //function d'affichage
  function afficher(text,id)
  {
    var item =
  "<li class='"+id+" data-liLenght="+id+"'><div class='checkbox'>"+
  "<i data-id='"+id+"' onclick='setToDone(this)' class='fa fa-check' style='color:black;float:right ;padding:5px'></i> "+
  "<i data-id='"+id+"' onclick='deleteTodo(this)' class='fa fa-trash' style='color:red ;float:right;padding:5px'></i> "+
  "<label><span class='checkbox-mask'></span><input type='checkbox' />" 
  +text+ "</label></div></li>";
    $(".todo-list").append(item);
  }
  //si je clique au button plus
  $(".add-btn").click(function(){
    const d = new Date();
    var  i=d.getTime();
    var id = id ? id : i;
    var itemVal = $(".form-control").val();
    addItem(itemVal,id);
    $('.form-control').val("");
    $(".todo-list").html("");
    affichertous();
    $("#choix").val("all");
  });
  $(".todo-list").sortable();


  var today = document.querySelector(".today");


  var d = new Date();
  
  
  var weekday = new Array(7);
  weekday[0] = "Sunday ";
  weekday[1] = "Monday ";
  weekday[2] = "Tuesday ";
  weekday[3] = "Wednesday ";
  weekday[4] = "Thursday ";
  weekday[5] = "Friday ";
  weekday[6] = "Saturday ";
  
  
  var n = weekday[d.getDay()];  
  today.innerHTML = "Whoop, it's " + n+ "☕️";

  
var randomWordArray = Array(
  " “Get busy living or get busy dying.” — Stephen King",
  "“You only live once, but if you do it right, once is enough.” — Mae West ",
  "“Never let the fear of striking out keep you from playing the game.”– Babe Ruth ",
  "“In order to write about life first you must live it.”– Ernest Hemingway ",
  "“Life is not a problem to be solved, but a reality to be experienced.”– Soren Kierkegaard ",
  "“Don’t settle for what life gives you; make life better and build something.” — Ashton Kutcher ",
  "“Live for each second without hesitation.” — Elton John ",
  "“Life is like riding a bicycle. To keep your balance, you must keep moving.” — Albert Einstein "
);

var randomWord =randomWordArray[Math.floor(Math.random() * randomWordArray.length)];
  var thing=document.querySelector(".quotes");
  thing.innerHTML = randomWord+ "💪";

  


$(".form-control").keypress(function(e) 
{     
if(e.which === 13) {
  $(".add-btn").click();
}
});