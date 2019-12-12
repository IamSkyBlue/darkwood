let heals; //血量
let water; //口渴值
let food; //飢餓值
let stress; //壓力值
let backPackSize; //1:7*3	2:10*3	3:10*5
let backPackItemList; //背包物品以及排列方式
let backPackAva; //is背包空格可用
let date; //日期
let weekdate; //星期幾
let weather; //天氣
let buff;
let debuff;

window.addEventListener("load", start, false);

window.addEventListener("load", start, false);
function start() {
    console.log("page loaded completely");
    console.log("day1 start");
    initAllData();
    initAllUI();
}

function initAllData() {
    heals = 100;
    water = 100;
    food = 100;
    stress = 50;
    backPackSize = 1;
    backPackItemList = new Array();
    backPackAva = new Array();
    date = 1;
    weekdate = 0;
    weather = 0;
    buff = new Array();
    debuff = new Array();
}

function initAllUI() {}

function crafting() {
    document.getElementById("overlayBackground").style.display = "block";
    document.getElementById("crafting").style.display = "block";
}

function looting() {
    document.getElementById("overlayBackground").style.display = "block";
    document.getElementById("looting").style.display = "block";
}

function backPack() {
    document.getElementById("overlayBackground").style.display = "block";
    document.getElementById("backPack").style.display = "block";
}

function traveling() {
    document.getElementById("overlayBackground").style.display = "block";
    document.getElementById("traveling").style.display = "block";
}

function closeWindow() {
    event.target.parentNode.style.display = "none";
    document.getElementById("overlayBackground").style.display = "none";
}
