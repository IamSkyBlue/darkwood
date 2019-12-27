let heals; //血量
let water; //口渴值
let food; //飢餓值
let heat; //體溫
let stress; //壓力值
let backPackSize; //1:7*3	2:10*3
let backPackItemList; //背包物品以及排列方式
let backPackAva; //is背包空格可用
let date; //日期
let weather; //天氣 晴天,雨天,
let locations; //forest,lake,mountain,swamp,jungle,river
let itemonhand;
let time;
let currentbuff = new Array(); //陣列表示有無buff (0/1)
let buffstat = new Array(); //buff所影響數值 初始100
//in format [0健康(healbuff),1虛弱(healde),2口渴(waterde),3飢餓(foodde),4快樂(stressbuff),5壓力(stressde),
//6幸運(buff),7溫暖(heatbuff),8失溫(heatde),9體力充足(water/foodbuff),10體力低弱(water/foodde)
//baffect(狀態變動速度) format: [heal速度0,water速度1,food速度2,stress速度3,heat速度4,luck高低5]
const allbufflist = [
    {
        bname: "健康",
        baffect: [15, 0, 0, 0, 0, 0],
        bord: 1,
        info: "身體狀況良好</br>血量回復速度提升"
    },
    {
        bname: "虛弱",
        baffect: [-15, 0, 0, 0, 0, 0],
        bord: 0,
        info: "身體狀況不佳</br>血量回復速度減緩"
    },
    {
        bname: "口渴",
        baffect: [0, -10, 0, 0, 0, 0],
        bord: 0,
        info: "身體因為缺水發出哀號</br>口渴值下降速度加快"
    },
    {
        bname: "飢餓",
        baffect: [0, 0, -10, 0, 0, 0],
        bord: 0,
        info: "咕嚕~咕嚕~肚子好餓</br>飽食度下降速度加快"
    },
    {
        bname: "快樂",
        baffect: [0, 0, 0, -10, 0, 0],
        bord: 1,
        info: "不知為何,身心靈感到格外舒暢</br>壓力值緩慢減少"
    },
    {
        bname: "壓力",
        baffect: [0, 0, 0, 20, 0, 0],
        bord: 0,
        info: "莫名的壓力開始導致心情低落</br>壓力值快速上升"
    },
    {
        bname: "幸運",
        baffect: [0, 0, 0, 0, 0, 10],
        bord: 1,
        info: "受到老天照顧</br>幸運值少量增加"
    },
    {
        bname: "溫暖",
        baffect: [0, 0, 0, 0, 20, 0],
        bord: 1,
        info: "溫暖的火和陽光,讓身體回到平常的溫度</br>體溫快速上升"
    },
    {
        bname: "失溫",
        baffect: [0, 0, 0, 0, -10, 0],
        bord: 0,
        info: "冰冷的空氣穿過衣服,刺在皮膚上</br>體溫緩慢下降"
    },
    {
        bname: "體力充足",
        baffect: [0, 10, 10, 0, 0, 0],
        bord: 1,
        info: "良好的身體狀態使你充滿決心</br>飽食/水分緩慢上升"
    },
    {
        bname: "體力低弱",
        baffect: [0, -10, -10, 0, 0, 0],
        bord: 0,
        info: "糟糕的身體狀況開始快速耗盡體力</br>飽食/水分加快減少"
    }
];

const weatherlist = [
    "sunny",
    "sunny",
    "sunny",
    "sunny",
    "sunny",
    "sunny",
    "rainy",
    "rainy",
    "rainy",
    "foggy"
];
const locationlist = ["forest", "lake", "mountain", "swamp", "jungle", "river"];
const alltheitemlist = [
    { name: "stick", x: 1, y: 1, durability: null, materials: null }, //一般探險0
    { name: "wood", x: 1, y: 2, durability: null, materials: null }, //一般探險,砍樹1
    { name: "stone", x: 1, y: 1, durability: null, materials: null }, //一般探險2
    { name: "rope", x: 1, y: 1, durability: null, materials: null }, //一般探險3
    { name: "charcoal", x: 1, y: 1, durability: null, materials: null }, //木頭燒製4
    { name: "raw_meat", x: 2, y: 2, durability: null, materials: null }, //打獵5
    { name: "cooked_meat", x: 2, y: 1, durability: null, materials: null }, //raw_meat+火6
    { name: "dried_meat", x: 1, y: 1, durability: null, materials: null }, //cooked_meat+火7
    { name: "fish", x: 2, y: 1, durability: null, materials: null }, //釣魚8
    {
        name: "fish_rod",
        x: 1,
        y: 3,
        durability: 30,
        materials: ["stick", "stick", "rope"]
    }, //9
    { name: "water_bottle", x: 1, y: 1, durability: null, materials: null }, //重生物品,一般探險10
    { name: "flintstone", x: 1, y: 1, durability: 5, materials: null }, //重生物品,一般探險低機率11
    { name: "cloth", x: 1, y: 1, durability: null, materials: null }, //打獵12
    {
        name: "trap",
        x: 3,
        y: 2,
        durability: 5,
        materials: ["stick", "stick", "wood", "rope"]
    },
    {
        name: "axe",
        x: 1,
        y: 3,
        durability: null,
        materials: ["stick", "stick", "stone", "stone"]
    },
    {
        name: "bigger_backpack",
        x: 0,
        y: 0,
        durability: null,
        materials: ["cloth", "cloth", "cloth", "rope", "rope"]
    },
    {
        name: "bandage",
        x: 2,
        y: 1,
        durability: null,
        materials: ["cloth", "stick"]
    },
    { name: "wood", x: 1, y: 1, durability: null, materials: null },
    { name: "wood", x: 1, y: 1, durability: null, materials: null },
    { name: "wood", x: 1, y: 1, durability: null, materials: null }
];

console.log(alltheitemlist);
window.addEventListener("load", start, false);

$(function() {
    $("#buff_con").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true,
        tooltipClass: "bufftooltip"
    });
});

function initAllData() {
    heals = 100;
    water = 100;
    food = 100;
    stress = 50;
    backPackSize = 1;
    backPackItemList = new Array();
    backPackAva = new Array();
    date = 1;
    weather = 0;
    locations = "forest";
    itemonhand = 0;
    time = [7, 0];
    for (let i = 0; i < allbufflist.length; i += 1) {
        currentbuff[i] = 0;
    }
    for (let i = 0; i < 6; i += 1) {
        buffstat[i] = 100;
    }
    console.log("datainit done");
    initAllUI();
}

function initAllUI() {
    timeset(0);
}

function addbuff(num) {
    if (currentbuff[num] == 0) {
        currentbuff[num] = 1;
        for (let i = 0; i < buffstat.length; i += 1) {
            buffstat[i] += allbufflist[num].baffect[i];
        }
        if (allbufflist[num].bord == 1)
            $("#buffs").append(
                $(
                    "<img class='buffimg' id='buffimg" +
                        num +
                        "' title='<span>" +
                        allbufflist[num].bname +
                        "</span></br>" +
                        allbufflist[num].info +
                        "' src='imgsrc/buff" +
                        num +
                        ".svg'>"
                )
                    .hide()
                    .fadeIn()
            );
        else
            $("#debuffs").append(
                $(
                    "<img class='buffimg' id='buffimg" +
                        num +
                        "'  title='<span>" +
                        allbufflist[num].bname +
                        "</span></br>" +
                        allbufflist[num].info +
                        "' src='imgsrc/buff" +
                        num +
                        ".svg'>"
                )
                    .hide()
                    .fadeIn()
            );
    }
}

function removebuff(num) {
    if (currentbuff[num] == 1) {
        currentbuff[num] = 0;
        $("#buffimg" + num).fadeOut(function() {
            $(this).remove();
        });
        for (let i = 0; i < buffstat.length; i += 1) {
            buffstat[i] -= allbufflist[num].baffect[i];
        }
    }
}

function timeset(plus = 0) {
    let message = "";
    if (plus > 0) time[1] += plus;
    while (time[1] >= 60) {
        time[0] += 1;
        time[1] -= 60;
    }
    while (time[0] >= 24) {
        time[0] -= 24;
        daychange();
    }
    message +=
        Math.floor(time[0] / 10) +
        " " +
        (time[0] % 10) +
        " : " +
        Math.floor(time[1] / 10) +
        " " +
        (time[1] % 10);
    $("#clock").html(message);
}

function daychange() {
    date += 1;
    $("#date").html("存活天數 : " + date);
    let a = getRandom(0, 9);
    weather = weatherlist[a];
    $("#weather").html("天氣 : " + weather);
}

function changebuff() {}

function crafting() {
    let iitemlist;
    $("#crafting").fadeIn();
    $("#overlayBackground").fadeIn();
    if ($("#crafting .scrollbar").children().length == 0) {
        for (let i in alltheitemlist) {
            if (alltheitemlist[i].materials != null) {
                $("#crafting .scrollbar").append(
                    "<div class='" +
                        alltheitemlist[i].name +
                        "'>" +
                        alltheitemlist[i].name +
                        "</div>"
                );
            }
        }
    }
    $(function() {
        $("#crafting .scrollbar div").hover(function() {
            let classname = $(this).text();
            for (let i in alltheitemlist) {
                if (alltheitemlist[i].name == classname) {
                    $("#crafting #show_craft").html(function() {
                        let message =
                            alltheitemlist[i].name +
                            "</br>" +
                            "大小:" +
                            alltheitemlist[i].x +
                            "*" +
                            alltheitemlist[i].y +
                            "</br>" +
                            "需要素材: </br>";
                        for (item of alltheitemlist[i].materials) {
                            message += item + " ";
                        }
                        return message;
                    });
                }
            }
        });
    });
}

function looting() {
    $("#looting").fadeIn();
    $("#overlayBackground").fadeIn();
}

function backPack() {
    $("#backPack").fadeIn();
    $("#overlayBackground").fadeIn();
}

function traveling() {
    $("#traveling").fadeIn();
    $("#overlayBackground").fadeIn();
}

$(function() {
    $(".close_button").click(function() {
        $("#show_craft").html("");
        $(this)
            .parent()
            .parent()
            .fadeOut();
        $("#overlayBackground").fadeOut();
    });
});

$(function() {
    $(".close img").hover(
        function() {
            $(this)
                .stop()
                .animate({ width: "100%", height: "100%" }, 50);
        },
        function() {
            $(this)
                .stop()
                .animate({ width: "80%", height: "80%" }, 50);
        }
    );
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function start() {
    console.log("page loaded completely");
    console.log("day1 start");
    initAllData();
    initAllUI();
}
