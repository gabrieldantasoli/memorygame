'use strict';

let getItem = () => JSON.parse(localStorage.getItem('EASY_RANKING')) ?? [{"name": "","points": 0},{"name": "","points": 0},{"name": "","points": 0}];
let setItem = (data) => localStorage.setItem('EASY_RANKING',JSON.stringify(data));

let sequency = [];
let mySequency = [];
let audios = ["audios/audio_00.mp3","audios/audio_1.mp3","audios/audio_2.mp3","audios/audio_3.mp3"];
let boxes = document.querySelectorAll('#mode1 div');
let can = false;
let x = 0;
let xx = 0;
let ponts = 0;
let what ;
let waudio ;
let intv ;
let intv1 ;
let intv2 ;
let getdata ;
let name ;
let time1 = 3;

const timeTostart = () => {
  const ggg = getItem();
  document.getElementById('name1').textContent = ggg[0].name;
  document.getElementById('points1').textContent = ggg[0].points;
  document.getElementById('name2').textContent = ggg[1].name;
  document.getElementById('points2').textContent = ggg[1].points;
  document.getElementById('name3').textContent = ggg[2].name;
  document.getElementById('points3').textContent = ggg[2].points;
  intv2 = setInterval(time,1000);
};

const time = () => {
  document.getElementById("count").textContent = `${time1}...` ;
  time1 -= 1;
  if (time1 == -2){
    clearInterval(intv2);
    addSequency();
    document.getElementById('count1').style.display = "none";
  }
};

const addSequency = () => {
  can = false;
  what = Math.floor(Math.random()*4);
  sequency.push(boxes[what].id);
  intv = setInterval(turnGold,750);
};

const turnGold = () => {
  switch (sequency[xx]) {
    case 'm11':
      waudio = audios[0];
      break;
    case 'm12':
      waudio = audios[1];
      break;
    case 'm13':
      waudio = audios[2];
      break;
    case 'm14':
      waudio = audios[3];
      break;
  }
  const audio = new Audio(waudio);
  audio.play();
  document.getElementById(sequency[xx]).style.background = "#daa520";
  intv1 = setInterval(turnWhite,400);
  xx += 1;
  if (xx == sequency.length){
    clearInterval(intv);
    can = true;
    xx = 0;
  }
};

const turnWhite = () => {
  boxes.forEach(f=>f.style.background = "white");
  clearInterval(intv1);
};

const format = (p) => `0${p}`.slice(-2);

const game = (event) => {
  if (can && event.target.id != "mode1"){
    boxes.forEach(f=>f.style.background = "white");
    document.getElementById(event.target.id).style.background = "#c0c0c0";
    switch (event.target.id) {
      case 'm11':
        waudio = audios[0];
        break;
      case 'm12':
        waudio = audios[1];
        break;
      case 'm13':
        waudio = audios[2];
        break;
      case 'm14':
        waudio = audios[3];
        break;
    }
    const audio = new Audio(waudio);
    audio.play();
    mySequency.push(event.target.id);
    if (sequency[x] == mySequency[x]){
      clearInterval(intv1);
      intv1 = setInterval(turnWhite,200);
    }else{
      boxes.forEach(f=>f.style.background = "red");
      can = false;
    }
    x += 1;
    if (can && mySequency.length == sequency.length){
      ponts += 1;
      if (ponts<10){
        document.getElementById('scoree').textContent = format(ponts);
      }else{
        document.getElementById('scoree').textContent = ponts;
      }
      const audio = new Audio("audios/audio_complete.mp3");
      audio.play();
      boxes.forEach(f=>f.style.background = "green");
      addSequency();
      mySequency = [];
      x = 0;
    }else if (!can){
      const audio = new Audio("audios/audio_fail.mp3");
      audio.play();
      getdata = getItem();
      if (ponts > getdata[2].points){
        name = window.prompt('congratulations, you are in the top 3! enter your name and perpetuate it in the ranking of the best players. (until someone overtakes you)');
        if (name == "" || name == null){
          name = "UNKNOWN";
        }
        name = name.slice(0,11).toUpperCase();
        if (ponts>getdata[0].points){
          getdata[2]={"name": `${getdata[1].name}`,"points": `${getdata[1].points}`};
          getdata[1]={"name": `${getdata[0].name}`,"points": `${getdata[0].points}`};
          getdata[0]={"name": name,"points": ponts};
        }else if (ponts>getdata[1].points){
          getdata[2]={"name": `${getdata[1].name}`,"points": `${getdata[1].points}`};
          getdata[1]={"name": name,"points": ponts};
        }else if (ponts>getdata[2].points){
          getdata[2]={"name": name,"points": ponts};
        }
        setItem(getdata);
      const ggg = getItem();
      document.getElementById('name1').textContent = ggg[0].name;
      document.getElementById('points1').textContent = ggg[0].points;
      document.getElementById('name2').textContent = ggg[1].name;
      document.getElementById('points2').textContent = ggg[1].points;
      document.getElementById('name3').textContent = ggg[2].name;
      document.getElementById('points3').textContent = ggg[2].points;
      }
      document.getElementById('butt').style.display = "block";
    }
  }
};

document.getElementById('mode1').addEventListener('click',game);