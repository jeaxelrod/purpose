window.onload = function() {
  
  var status = {
    on: "rgb(255, 255, 255)",
    off: "rgb(0, 0, 0)"
  }

  var getStatus = function(element) {
    var color = window.getComputedStyle(element)["color"];
    if (color.valueOf() == status.on.valueOf()) {
      return "on";
    } else if (color.valueOf() == status.off.valueOf()) {
      return "off";
    } else {
      return "other";
    }
  }

  var Fader = function(array_of_elements) {
    var that = this;

    this.elements = array_of_elements;

    this.on = function() {
      for (var i=0; i < that.elements.length; i++) {
        var element = that.elements[i];
        element.style.color = status.on;      
      }
    }
    this.off = function() {
      for (var i=0; i < that.elements.length; i++) {
        var element = that.elements[i];
        element.style.color = status.off;
        }
      }  
    }
  };

  var Game = function(parent_div) {
    var parent = parent_div;
    var purpose = parent.getElementsByClassName("purpose")[0];
    var find = parent.getElementsByClassName("find")[0];
    var your = parent.getElementsByClassName("your")[0];
    var is = parent.getElementsByClassName("is")[0];
    var lost = parent.getElementsByClassName("lost")[0];
    var statuses = [];
    var that = this;
    var all_elements_fader = new Fader([purpose, find, your, is, lost]);
    var purpose_fader = new Fader([purpose]);


    this.first_fader = new Fader([your, purpose, is, lost]);
    this.second_fader = new Fader([find, your, purpose]);
    this.elements = array_of_elements;

    this.first_fader.clicked = false;

    this.hide = function() {
      setUpVisibility();
      setUpEnvironment();
      parent.style.top = getRandomInt(Math.floor(0 , document.body.clientHeight - parent.clientHeight).toString() + "px";
      parent.style.left = getRandomInt(Math.floor(0, document.body.clientWidth - parent.clientWidth).toString() + "px";
    };

    var setUpVisibility = function() {
      all_elements_fader.off();
      purpose_fader.on();
    };
    var setUpEnvironment = function() {
      var container = document.getElementsByClassName("container")[0];
      container.style.height = (document.body.clienHeight * 4).toString() + "px";
      scaleFontSize(document.body, .90);
    };
  }


  var purpose = document.getElementById("purpose");
  var find = document.getElementById("find");
  var your = document.getElementById("your");
  var is = document.getElementById("is");
  var lost = document.getElementById("lost");
  var first_fader = new Fader([your, purpose, is, lost]);
  first_fader.clicked = false;
  var second_fader = new Fader([find, your, purpose]);
  purpose.addEventListener("click", function( event ) {
    if (!first_fader.clicked) {
      first_fader.on();
      setTimeout(first_fader.off, 3000);
      setTimeout(second_fader.on, 3100);
      first_fader.clicked = true
    }
  }, false);
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