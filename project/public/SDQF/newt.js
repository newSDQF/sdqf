
var curIndex = 0; 
  var timeInterval = 1500; 
  var arr = new Array(); 
  arr[0] = "img/index_slide_1.png"; 
  arr[1] = "img/index_slide_2.png"; 
  arr[2] = "img/index_slide_3.jpg"; 
  setInterval(changeImg,timeInterval); 
  function changeImg() { 
   var obj = document.getElementById("obj"); 
   if (curIndex == arr.length-1) { 
    curIndex = 0; 
   } else { 
    curIndex += 1; 
     } 
   obj.src = arr[curIndex]; 
  } 