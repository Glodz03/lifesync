const pageKey = "Life App Home Blue Daily Checklist"
  .replace(/\W+/g, '-');

const STORAGE_PREFIX = 'checklist_' + pageKey;

function sk(key){
  return STORAGE_PREFIX + ':' + key;
}

function getKeys(){
  return JSON.parse(localStorage.getItem(sk('keys')) || '[]');
}

function saveKeys(keys){
  localStorage.setItem(sk('keys'), JSON.stringify(keys));
}


function getTask(key){
  const raw = localStorage.getItem(sk('row_' + key));
  return raw ? JSON.parse(raw) : null;
}

function saveTask(key, data){
  localStorage.setItem(sk('row_' + key), JSON.stringify(data));
}


function deleteTask(key){
  localStorage.removeItem(sk('row_' + key));

  let keys = getKeys().filter(k => k !== key);
  saveKeys(keys);
}

function getDay(){
  return parseInt(localStorage.getItem(sk('day'))) || 1;
}

function setDay(day){
  localStorage.setItem(sk('day'), day);
}

function getDayCount(){
  return parseInt(localStorage.getItem(sk('dayCount'))) || 1;
}

function setDayCount(count){
  localStorage.setItem(sk('dayCount'), count);
}

function addExtra(key, amount){
  let task = getTask(key) || {};
  task.extra = (task.extra || 0) + amount;
  saveTask(key, task);
}

function setDone(key, done){
  let task = getTask(key) || {};
  task.done = done;
  saveTask(key, task);
}

function setTotal(key, total){
  let task = getTask(key) || {};
  task.total = total;
  saveTask(key, task);
}

function getStats(){

  let keys = getKeys();

  let totalTasks = 0;
  let completed = 0;
  let extra = 0;
  let totalScore = 0;

  keys.forEach(key=>{
    let task = getTask(key);
    if(!task) return;

    totalTasks++;

    if(task.done) completed++;

    if(task.extra) extra += Number(task.extra);

    if(task.total) totalScore += Number(task.total);
  });

  let rate = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;

  let day = getDay();

  let streak = (completed === totalTasks && totalTasks > 0)
    ? day
    : day - 1;

  return {
    totalTasks,
    completed,
    extra,
    totalScore,
    rate,
    streak
  };
}

function getPlayers(){
  return JSON.parse(localStorage.getItem(sk('players'))) || {
    player1: [],
    player2: []
  };
}

function savePlayers(data){
  localStorage.setItem(sk('players'), JSON.stringify(data));
}