window.onload = function() {
  var status = {
    on: "rgb(255, 255, 255)",
    off: "rgb(0, 0, 0)"
  }
  var getStatus = function(element) {
    var color = window.getComputedStyle(element)["color"];
    if (color.valueOf() == status.on.valueOf()) {
      return "on"
    } else if (color.valueOf() == status.off.valueOf()) {
      return "off"
    } else {
      return "other"
    }
  }
  var Fade = function(array_of_elements) {
    var statuses = []; 
    this.elements = array_of_elements;
    this.toggle = function() {
      for (var i=0; i < this.elements.length; i++) {
        var element = this.elements[i];
        if (!statuses[i]) {
          statuses[i] = getStatus(element);
        } 
        element.style.color = status[statuses[i]];
      }
    }
  };
	var purpose = new Fade([document.getElementById("purpose")]);
  document.getElementById("purpose").addEventListener("click", purpose.Fade, false);
	//purpose.addEventListener("click", function( event ) {
	//	var fade_in = document.getElementsByClassName("fade-in");
	//	for (var i = 0; i < fade_in.length; i++) { 
	//		fade_in.item(i).style.color = "white";
	//	}
  //  setTimeout(lostFade, 3000);
  //  setTimeout(secondFadeIn, 6000);
	//}, false);
  //var hiddenElement = document.getElementById("hidden-element");
  //hiddenElement.addEventListener("click", restartPurpose , false);
}
function lostFade() {
  var fade_out = document.getElementsByClassName("fade-out");
  for ( var i = 0; i < fade_out.length; i++) {
    fade_out.item(i).style.color = "black";
  }
}
function secondFadeIn() {
  var fade_in = document.getElementsByClassName("2nd-fade-in");
  for ( var i = 0; i < fade_in.length; i++) {
    fade_in.item(i).style.color = "white";
  }
  var lost = document.getElementById("lost");
  lost.style.display = "none";
  var content = document.getElementsByClassName("content")[0];
  content.style.height = (document.body.clientHeight * 4).toString() + "px";
  hidePurpose();
}
function hideNonPurposeElements() {
  var textElements = document.querySelectorAll("p", "a");
  for ( var i = 0; i < textElements.length; i ++ ) {
    textElements[i].style.display = "none";
  };
  var purpose = document.getElementById("purpose");
  purpose.style.display = "none";
}
function hidePurpose() {
  var hidden = document.getElementById("hidden-element"); 
  hidden.style.top = getRandomInt(Math.floor(hidden.clientHeight * .2) , document.body.clientHeight).toString() + "px";
  hidden.style.left = getRandomInt(Math.floor(hidden.clientWidth * .2), document.body.clientWidth).toString() + "px";
  hidden.style.display = "inline";
  scaleFontSize(document.body, .95);
}
function restartPurpose() {
  var hidden = document.getElementById("hidden-element");
  var instruction = document.getElementsByClassName("instructions")[0]
  var hiddenTop = hidden.offsetTop;
  var hiddenLeft = hidden.offsetLeft;
  instruction.style.position= "absolute";
  instruction.style.top = hiddenTop + "px" ;
  instruction.style.left = hiddenLeft + "px";
  hidePurpose();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function scaleFontSize(element, amount) {
  var fontSize= window.getComputedStyle(element, null).getPropertyValue('font-size');
  element.style.fontSize = (fontSize.substring(0, 3) * amount)+ "px";
}