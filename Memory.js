'use strict';

let easy = false;
let medium = false;
let hard = false;

let modes = ["modeEasy","modeMedium","modeHard"];

const whatDirection = (event) => {
  if(event.target.id == "modeEasy" || event.target.id == "modeMedium" || event.target.id == "modeHard"){
    easy = false;
    medium = false;
    hard = false;
    modes.forEach(f => {
      document.getElementById(f).style.color = "black";
      document.getElementById(f).style.border = "2px solid black";
      document.getElementById(f).style.boxShadow = "none";
      document.getElementById(f).style.transform = "scale(1)";
    });
    if (event.target.id == "modeEasy"){
      easy = true;
      document.getElementById('modeEasy').style.color = "#daa520";
      document.getElementById('modeEasy').style.border = "3px solid #daa520";
      document.getElementById('modeEasy').style.boxShadow = "0 0 5px #daa520";
      document.getElementById('modeEasy').style.transform = "scale(1.1)";
    }else if (event.target.id == "modeMedium"){
      medium = true;
      document.getElementById('modeMedium').style.color = "#daa520";
      document.getElementById('modeMedium').style.border = "3px solid #daa520";
      document.getElementById('modeMedium').style.boxShadow = "0 0 5px #daa520";
      document.getElementById('modeMedium').style.transform = "scale(1.1)";
    }else if (event.target.id == "modeHard"){
      hard = true;
      document.getElementById('modeHard').style.color = "#daa520";
      document.getElementById('modeHard').style.border = "3px solid #daa520";
      document.getElementById('modeHard').style.boxShadow = "0 0 5px #daa520";
      document.getElementById('modeHard').style.transform = "scale(1.1)";
    }
  }
};

const directionGo = () => {
  if (easy){
    window.location.replace("easy.html");
  }else if (medium){
    window.location.replace("medium.html");
  }else if (hard){
    window.location.replace("hard.html");
  }else {
    window.alert('CHOOSE A OPTION!')
  }
};

document.getElementById('form').addEventListener('click',whatDirection);
document.getElementById('start').addEventListener('click',directionGo);