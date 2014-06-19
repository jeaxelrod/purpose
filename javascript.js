window.onload = function() {
  
  var status = {
    on: "rgb(255, 255, 255)",
    off: "rgb(0, 0, 0)"
  };

  var getStatus = function(element) {
    var color = window.getComputedStyle(element)["color"];
    if (color.valueOf() == status.on.valueOf()) {
      return "on";
    } else if (color.valueOf() == status.off.valueOf()) {
      return "off";
    } else {
      return "other";
    }
  };

  var Fader = function(array_of_elements) {
    var that = this;

    this.elements = array_of_elements;

    this.on = function() {
      for (var i=0; i < that.elements.length; i++) {
        var element = that.elements[i];
        element.style.color = status.on;      
      }
    };
    this.off = function() {
      for (var i=0; i < that.elements.length; i++) {
        var element = that.elements[i];
        element.style.color = status.off;
      }
    };  
  };

  var GameFunctions = function(parent_div) {
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
    this.clicker = purpose;
    this.clicked = false;
    this.hide = function() {
      setUpVisibility();
      setUpEnvironment();
      parent.style.top = getRandomInt(Math.floor(0 , document.body.clientHeight - parent.clientHeight)).toString() + "px";
      parent.style.left = getRandomInt(Math.floor(0, document.body.clientWidth - parent.clientWidth)).toString() + "px";
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
  };
  var Game = function(game_functions1, game_functions2) {

    this.run = function() {
      var clicker1 = game_functions1.clicker;
      var clicker2 = game_functions2.clicker;
      clicker1.addEventListener("click", function() { click(game_functions1, game_functions2) }, false);
      clicker2.addEventListener("click", function() { click(game_functions2, game_functions1) }, false);
    }

    var click = function(clicker, hider) {
      if (!clicker.clicked) {
        clicker.first_fader.on();
        setTimeout(clicker.first_fader.off, 3000);
        setTimeout(clicker.second_fader.on, 3100);
        clicker.clicked = true;

        hider.hide();
        hider.clicked = false;
      }
    };
  };

  var game_functions1 = new GameFunctions(document.getElementById("first"));
  var game_functions2 = new GameFunctions(document.getElementById("second")); 
  var game = new Game(game_functions1, game_functions2);
  game.run();

  //Helper functions 

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function scaleFontSize(element, amount) {
    var fontSize= window.getComputedStyle(element, null).getPropertyValue('font-size');
    element.style.fontSize = (fontSize.substring(0, 3) * amount)+ "px";
  }
}