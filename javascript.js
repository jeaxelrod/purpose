window.onload = function() {
  
  // status contains the environoment variables related to game conditions
  var status = {
    on: "#ffffff",
    off: "#000000",
    fontSize: window.getComputedStyle(document.body).getPropertyValue('font-size'),
    first_run: true,
    last_run: false
  };

  // Fader is an object an array of  HTMLElements and can become visible or invisible
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
    var parent = parent_div,
    statuses = [],
    purpose = parent.getElementsByClassName("purpose")[0],
    that = this,
    all_elements_fader = new Fader(parent.children)                
    purpose_fader = new Fader([purpose]),
    first_group = Array.prototype.slice.call( parent.getElementsByClassName("first-fader")),
    second_group = Array.prototype.slice.call( parent.getElementsByClassName("second-fader"))

    this.first_fader = new Fader(first_group);
    this.second_fader = new Fader(second_group);
    this.clicker = purpose;
    this.clicked = false;
    this.hide = function() {
      setUpEnvironment();
      setUpVisibility();
      if (status.first_run) {
        parent.style.top = getRandomInt(document.body.clientHeight, Math.floor(document.body.clientHeight - parent.clientHeight)).toString() + "px";
        status.first_run = false;
      } else {
        parent.style.top = getRandomInt(0, Math.floor(document.body.clientHeight - parent.clientHeight)).toString() + "px";
      }
      parent.style.left = getRandomInt(parent.clientWidth, Math.floor(document.body.clientWidth - parent.clientWidth)).toString() + "px";

    };

    var setUpVisibility = function() {
      all_elements_fader.off();
      purpose_fader.on();
    };
    var setUpEnvironment = function() {
      var container = document.getElementsByClassName("container")[0];
      container.style.height = (document.body.clientHeight * 2).toString() + "px";
      scaleFontSize(parent_div);
      darkenColor();
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
        if (!status.last_run) {
          setTimeout(clicker.first_fader.off, 3000);
          setTimeout(clicker.second_fader.on, 3000);
        } else {
          setTimeout(clicker.first_fader.off, 10000);
          status.on = "#ffffff"
        }
        clicker.first_fader.on();
        clicker.clicked = true;

        setTimeout(hider.hide, 3001);
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
  function scaleFontSize(element) {
    var fontSize = status.fontSize;
    status.fontSize = (fontSize.match(/[^px]+/)[0] * 0.85) + "px";
    element.style.fontSize = status.fontSize;
  }
  function darkenColor() {
    if (status.on !== "#000000") {
      var currentBrightness = parseInt(status.on.substring(1,3), 16);
      currentBrightness -= 26;
      if (currentBrightness <= 26) {
        status.last_run = true;
      }
      if (currentBrightness <= 0) {
        status.on = "#000000";
      } else {
        status.on = "#" + currentBrightness.toString(16).repeat(3);
      }
    }
  }
  String.prototype.repeat = function(num) {
    if (num === 1) {
        return this;
    } else {
        return this + this.repeat(num - 1);
    }
  };
};
