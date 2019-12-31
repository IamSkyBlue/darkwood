let HP; //血量
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
let itemcraftshow;
let itemshow;
let firetime;
const locationlist = [
    { lid: "forest", lname: "森林", laffect: [-10, 0, 0, -10, 0, 0] },
    { lid: "lake", lname: "湖泊", laffect: [5, 0, 0, 0, 0, 0] },
    { lid: "mountain", lname: "山岳", laffect: [0, 0, 0, 15, -15, 0] },
    { lid: "swamp", lname: "沼澤", laffect: [0, 10, 10, -15, 0, 0] },
    { lid: "jungle", lname: "叢林", laffect: [-10, 0, 0, -10, 0, 0] },
    { lid: "river", lname: "河川", laffect: [-10, 10, 0, 0, -10, 0] }
];
let itemonhand;
let time;
let traveltime;
let toollist = new Array();
let currentbuff = new Array(); //陣列表示有無buff (0/1)
let buffstat = new Array(); //buff所影響數值 初始0
//in format [0健康(HPbuff),1虛弱(HPde),2口渴(waterde),3飢餓(foodde),4快樂(stressbuff),5壓力(stressde),
//6幸運(buff),7溫暖(heatbuff),8失溫(heatde),9體力充足(water/foodbuff),10體力低弱(water/foodde)
//baffect(狀態變動速度) format: [HP速度0,water速度1,food速度2,stress速度3,heat速度4,luck高低5]
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
    "晴天",
    "晴天",
    "晴天",
    "晴天",
    "晴天",
    "晴天",
    "雨天",
    "雨天",
    "雨天",
    "起霧"
];
const alltheitemlist = [
    {
        name: "stick",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //一般探險0
    {
        name: "wood",
        x: 1,
        y: 2,
        durability: null,
        materials: null,
        withfire: 0
    }, //一般探險,砍樹1
    {
        name: "stone",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //一般探險2
    {
        name: "rope",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //一般探險3
    {
        name: "charcoal",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 1
    }, //木頭燒製4
    {
        name: "raw_meat",
        x: 2,
        y: 2,
        durability: null,
        materials: ["fish"],
        withfire: 0
    }, //打獵5
    {
        name: "cooked_meat",
        x: 2,
        y: 1,
        durability: null,
        materials: ["raw_meat"],
        withfire: 1
    }, //raw_meat+火6
    {
        name: "dried_meat",
        x: 1,
        y: 1,
        durability: null,
        materials: ["cooked_meat"],
        withfire: 1
    }, //cooked_meat+火7
    {
        name: "fish",
        x: 2,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //釣魚8
    {
        name: "fish_rod",
        x: 1,
        y: 3,
        durability: 30,
        materials: ["stick", "stick", "rope"],
        withfire: 0
    }, //9
    {
        name: "water_bottle",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //重生物品,一般探險10
    {
        name: "flintstone",
        x: 1,
        y: 1,
        durability: 5,
        materials: null,
        withfire: 0
    }, //重生物品,一般探險低機率11
    {
        name: "cloth",
        x: 1,
        y: 1,
        durability: null,
        materials: null,
        withfire: 0
    }, //打獵12
    {
        name: "axe",
        x: 1,
        y: 3,
        durability: 15,
        materials: ["stick", "stick", "stone", "stone"],
        withfire: 0
    },
    {
        name: "bigger_backpack",
        x: 0,
        y: 0,
        durability: null,
        materials: ["cloth", "cloth", "cloth", "rope", "rope"],
        withfire: 0
    },
    {
        name: "bandage",
        x: 2,
        y: 1,
        durability: null,
        materials: ["cloth", "stick"],
        withfire: 0
    },
    {
        name: "spear",
        x: 1,
        y: 3,
        durability: 10,
        materials: ["stick", "stick", "wood", "stone"],
        withfire: 0
    },
    { name: "wood", x: 1, y: 1, durability: null, materials: null }
];

var maxHealth = 100;
var curHealth1 = maxHealth;
var curHealth2 = maxHealth;
var curHealth3 = maxHealth;
var curHealth4 = maxHealth;
var curHealth5 = maxHealth;
var number;

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
    HP = 100;
    water = 100;
    food = 100;
    stress = 50;
    backPackSize = 1;
    backPackItemList = new Array();
    backPackAva = new Array();
    date = 0;
    weather = 0;
    locations = locationlist[1];
    firetime = 0;
    itemonhand = 0;
    time = [7, 0];
    toollist = [1, 0, 0, 0]; // 0:hand 1:fish_rood 2:axe 3:spear
    for (let i = 0; i < allbufflist.length; i += 1) {
        currentbuff[i] = 0;
    }
    for (let i = 0; i < 6; i += 1) {
        buffstat[i] = 0;
    }
    console.log("datainit done");
}

function initAllUI() {
    timeset(0);
    HPbar(0);
    waterbar(0);
    foodbar(0);
    stressbar(0);
    heatbar(0);
    changestatus("heal", 0, "");
    daychange();
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
    if (time[0] > 22 || time[0] < 5) {
        $("#clock").animate({
            color: "white",
            backgroundColor: "black"
        });
    }
    if (time[0] >= 5 && time[0] < 18) {
        $("#clock").animate({
            color: "black",
            backgroundColor: "white"
        });
    }
    if (time[0] >= 18 && time[0] <= 22) {
        $("#clock").animate({
            color: "black",
            backgroundColor: "yellow"
        });
    }
    if (firetime > 0) {
        changestatus("heat", 100, "");
    }
    setfiretime(plus);
}

function setfiretime(num) {
    firetime -= num;
    if (firetime <= 0) {
        firetime = 0;
        $("#firetime").text("剩餘時間:0分鐘");
        $("#fireimg").attr("src", "imgsrc/fireoff.svg");
    } else {
        $("#firetime").text("剩餘時間:" + firetime + "分鐘");
        $("#fireimg").attr("src", "imgsrc/fireon.svg");
    }
}

$(function() {
    $("#fire .mainbutton").click(function() {
        let flag = 0;
        if ($(this).attr("id") == "fireonbtn") {
            timeset(30);
            if (getRandom(1, 100) < 50) {
                setfiretime(-30);
                changestatus("HP", 0, "成功生火");
            } else {
                changestatus("HP", 0, "生火失敗...");
            }
        }
        if ($(this).attr("id") == "addstick") {
            for (let item in backPackItemList) {
                if (backPackItemList[item].name == "stick") {
                    setfiretime(-30);
                    backPackItemList.splice(item, 1);
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                changestatus("HP", 0, "無足夠樹枝");
            }
        }
        if ($(this).attr("id") == "addwood") {
            for (let item in backPackItemList) {
                if (backPackItemList[item].name == "wood") {
                    setfiretime(-90);
                    backPackItemList.splice(item, 1);
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                changestatus("HP", 0, "無足夠木頭");
            }
        }
    });
});

function daychange() {
    date += 1;
    $("#date").html("存活天數 : " + date);
    let a = getRandom(0, 9);
    weathername = weatherlist[a];
    $("#weather").html("天氣 : " + weathername);
    if (weathername == "晴天") {
        weather = 0;
        addbuff(7);
        removebuff(8);
    } else if (weathername == "雨天") {
        weather = 1;
        addbuff(8);
        removebuff(7);
    } else if (weathername == "起霧") {
        weather = 2;
        removebuff(7);
        removebuff(8);
        addbuff(5);
    }
}

function crafting() {
    let iitemlist;
    $("#crafting").fadeIn();
    $("#overlayBackground")
        .fadeIn()
        .css({ "z-index": "2" });
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
                        itemcraftshow = alltheitemlist[i];
                        let message =
                            itemcraftshow.name +
                            "</br>" +
                            "大小:" +
                            itemcraftshow.x +
                            "*" +
                            itemcraftshow.y +
                            "</br>" +
                            "需要素材: </br>";
                        for (item of itemcraftshow.materials) {
                            message += item + " ";
                        }
                        if (itemcraftshow.withfire == 1)
                            message += "</br>(需要火)";
                        message +=
                            "<a href='#' class='mainbutton' onclick='craftitem()'>製作</a>";
                        return message;
                    });
                }
            }
        });
    });
}

function craftitem() {
    let flag = 0;
    let tempbaclpack = JSON.parse(JSON.stringify(backPackItemList));
    console.log(tempbaclpack);
    if (itemcraftshow.withfire == 1 && firetime == 0) flag = 1;
    for (let item of itemcraftshow.materials) {
        for (let item2 = 0; item2 < tempbaclpack.length; item2 += 1) {
            if (tempbaclpack[item2].name == item) {
                tempbaclpack.splice(item2, 1);
                break;
            }
            if (item2 == tempbaclpack.length - 1) flag = 1;
        }
    }
    if (flag == 1) {
        $("#overlayBackground5").fadeIn();
        $("#craftnotice")
            .fadeIn()
            .html(
                "無法製作此道具</br>請檢查材料是否足夠</br>(或者有無生火)<a href='#' class='mainbutton' onclick='closecraftitem()'>關閉</a>"
            );
    } else {
        for (let item of itemcraftshow.materials) {
            for (let item2 = 0; item2 < backPackItemList.length; item2 += 1) {
                if (backPackItemList[item2].name == item) {
                    backPackItemList.splice(item2, 1);
                    break;
                }
            }
        }
        let newitem = $.extend(true, {}, itemcraftshow);
        backPackItemList.push(newitem);
        timeset(30);
        $("#overlayBackground5").fadeIn();
        $("#craftnotice")
            .fadeIn()
            .html(
                "製作成功!</br><a href='#' class='mainbutton' onclick='closecraftitem()'>關閉</a>"
            );
        if (newitem.name == "fish_rod") toollist[1] = 1;
        if (newitem.name == "axe") toollist[2] = 1;
        if (newitem.name == "spear") toollist[3] = 1;
        console.log("is in?");
    }
}

function closecraftitem() {
    $("#overlayBackground5").fadeOut();
    $("#craftnotice").fadeOut();
}

function golooting() {
    let result = "";
    let HP_rate = 0;
    let foodwater_rate = 0;
    let additional_rate =
        currentbuff[0] * 10 +
        currentbuff[7] * 5 +
        currentbuff[9] * 5 -
        currentbuff[1] * 15 -
        currentbuff[8] * 15 -
        currentbuff[10] * 15;
    let tool = $("#toolselect").val();
    let action = $("#actionselect").val();
    let timenum = $("#timeselect").val();
    let founditem = [];
    if (action == "safe") {
        additional_rate -= 10;
        HP_rate = -1;
        foodwater_rate = 0;
    }
    if (action == "loot") {
        additional_rate += 10;
        HP_rate = -5;
        foodwater_rate = -10;
    }
    if (action == "save") {
        additional_rate -= 10;
        HP_rate = 0;
        foodwater_rate = -3;
    }
    if (action == "lootall") {
        additional_rate += 40;
        HP_rate = -10;
        foodwater_rate = -20;
    }
    for (let i = 0; i < timenum; i++) {
        if (tool == "hand") {
            if (getRandom(1, 100 - additional_rate) < 50)
                founditem.push(alltheitemlist[0]);
            if (getRandom(1, 100 - additional_rate) < 30)
                founditem.push(alltheitemlist[2]);
            if (getRandom(1, 100 - additional_rate) < 15)
                founditem.push(alltheitemlist[3]);
            if (getRandom(1, 100 - additional_rate) < 5)
                founditem.push(alltheitemlist[1]);
            if (getRandom(1, 100 - additional_rate) < 5)
                founditem.push(alltheitemlist[5]);
        }
        if (tool == "fish_rod") {
            if (getRandom(1, 100 - additional_rate) < 40)
                founditem.push(alltheitemlist[8]);
        }
        if (tool == "axe") {
            if (getRandom(1, 100 - additional_rate) < 50)
                founditem.push(alltheitemlist[1]);
            if (getRandom(1, 100 - additional_rate) < 25)
                founditem.push(alltheitemlist[1]);
            if (getRandom(1, 100 - additional_rate) < 15)
                founditem.push(alltheitemlist[1]);
            if (getRandom(1, 100 - additional_rate) < 50)
                founditem.push(alltheitemlist[0]);
        }
        if (tool == "spear") {
            if (getRandom(1, 100 - additional_rate) < 15)
                founditem.push(alltheitemlist[5]);
            if (getRandom(1, 100 - additional_rate) < 40)
                founditem.push(alltheitemlist[8]);
        }
        for (item in backPackItemList) {
            if (backPackItemList[item].name == tool) {
                backPackItemList[item].durability -= 1;
                if (backPackItemList[item].durability == 0) {
                    window.alert("工具到達使用次數上限，已丟棄");
                    backPackItemList.splice(item, 1);
                }
            }
        }
        changestatus(
            "HP",
            getRandom(-1, HP_rate) * ((100 - buffstat[0]) / 100),
            ""
        );
        changestatus(
            "water",
            getRandom(-1, foodwater_rate) * ((100 - buffstat[1]) / 100),
            ""
        );
        changestatus(
            "food",
            getRandom(-1, foodwater_rate) * ((100 - buffstat[2]) / 100),
            ""
        );
        changestatus(
            "stress",
            getRandom(-2, founditem.length) * ((100 - buffstat[3]) / 100),
            ""
        );
        changestatus(
            "heat",
            getRandom(0, buffstat[4]) * ((100 - buffstat[4]) / 100),
            ""
        );
    }
    founditem.sort();
    for (let item in founditem) {
        result += founditem[item].name + " ";
    }
    $("#overlayBackground4").fadeIn();
    if (founditem.length > 0) {
        $("#lootresult")
            .fadeIn()
            .html(
                "你找到了:</br>" +
                    result +
                    "</br><a href='#' class='mainbutton' onclick='colselootresult()'>關閉</a>"
            );
    } else {
        $("#lootresult")
            .fadeIn()
            .html(
                "你什麼都沒找到 :(</br>" +
                    "</br><a href='#' class='mainbutton' onclick='colselootresult()'>關閉</a>"
            );
    }
    Array.prototype.push.apply(backPackItemList, founditem);
    backPackItemList.sort();
    timeset(timenum * 60);
}

function colselootresult() {
    $("#lootresult").fadeOut();
    $("#overlayBackground4").fadeOut();
}

function looting() {
    if (toollist[1] == 0) $("#tool1").attr("disabled", true);
    else {
        $("#tool1").removeAttr("disabled");
        $("#toolselect").selectmenu("refresh");
        console.log("abled");
    }
    if (toollist[2] == 0) $("#tool2").attr("disabled", true);
    else {
        $("#tool2").removeAttr("disabled");
        $("#toolselect").selectmenu("refresh");
        console.log("abled");
    }
    if (toollist[3] == 0) $("#tool3").attr("disabled", true);
    else {
        $("#tool3").removeAttr("disabled");
        $("#toolselect").selectmenu("refresh");
        console.log("abled");
    }
    $("#looting").fadeIn();
    $("#overlayBackground")
        .fadeIn()
        .css({ "z-index": "2" });
}

$(function() {
    $("#toolselect")
        .selectmenu()
        .selectmenu("menuWidget")
        .addClass("overflow");
    $("#actionselect")
        .selectmenu()
        .selectmenu("menuWidget")
        .addClass("overflow");
    $("#timeselect")
        .selectmenu()
        .selectmenu("menuWidget")
        .addClass("overflow");
});

function backPack() {
    $("#backPack").fadeIn();
    $("#overlayBackground")
        .fadeIn()
        .css({ "z-index": "2" });
    if ($("#backPack .scrollbar").children().length == 0) {
        for (let i in backPackItemList) {
            $("#backPack .scrollbar").append(
                "<div>" + backPackItemList[i].name + "</div>"
            );
        }
    }
    $(function() {
        $("#backPack .scrollbar div").hover(function() {
            let itemname = $(this).text();
            for (let i in backPackItemList) {
                if (backPackItemList[i].name == itemname) {
                    $("#show_item").html(function() {
                        itemshow = backPackItemList[i];
                        let message =
                            itemshow.name +
                            "</br>" +
                            "大小:" +
                            itemshow.x +
                            "*" +
                            itemshow.y +
                            "</br>";
                        if (backPackItemList[i].durability != null) {
                            message +=
                                "物品剩餘耐久度: </br>" +
                                backPackItemList[i].durability +
                                "</br>";
                        }
                        if (
                            itemshow.name == "cooked_meat" ||
                            itemshow.name == "dried_meat"
                        )
                            message +=
                                "<a href='#' class='mainbutton' onclick='eat()'>使用</a>";
                        message +=
                            "<a href='#' class='mainbutton' onclick='drop()'>丟棄</a>";
                        return message;
                    });
                }
            }
        });
    });
}

function eat() {
    if (itemshow.name == "cooked_meat") {
        changestatus("food", 30, "回復一些體力了");
        changestatus("water", 40, "");
        changestatus("HP", 5, "");
        for (let i = 0; i < backPackItemList.length(); i++) {
            if (i.name == itemshow.name) backPackItemList.splice(i, 1);
        }
        $("#backPack .scrollbar")
            .children()
            .remove();
        if ($("#backPack .scrollbar").children().length == 0) {
            for (let i in backPackItemList) {
                $("#backPack .scrollbar").append(
                    "<div>" + backPackItemList[i].name + "</div>"
                );
            }
        }
        $(function() {
            $("#backPack .scrollbar div").hover(function() {
                let itemname = $(this).text();
                for (let i in backPackItemList) {
                    console.log(backPackItemList[i].name, itemname);
                    if (backPackItemList[i].name == itemname) {
                        $("#show_item").html(function() {
                            itemshow = backPackItemList[i];
                            let message =
                                itemshow.name +
                                "</br>" +
                                "大小:" +
                                itemshow.x +
                                "*" +
                                itemshow.y +
                                "</br>";
                            if (backPackItemList[i].durability != null) {
                                message +=
                                    "物品剩餘耐久度: </br>" +
                                    backPackItemList[i].durability;
                            }
                            if (
                                itemshow.name == "cooked_meat" ||
                                itemshow.name == "dried_meat"
                            )
                                message +=
                                    "<a href='#' class='mainbutton' onclick='eat()'>使用</a>";
                            message +=
                                "<a href='#' class='mainbutton' onclick='drop()'>丟棄</a>";
                            return message;
                        });
                    }
                }
            });
        });
    }
    if (itemshow.name == "dried_meat") {
        changestatus("food", 20, "回復一些體力了");
        changestatus("food", 10, "");
        for (let i = 0; i < backPackItemList.length(); i++) {
            if (i.name == itemshow.name) backPackItemList.splice(i, 1);
        }
        $("#backPack .scrollbar")
            .children()
            .remove();
        if ($("#backPack .scrollbar").children().length == 0) {
            for (let i in backPackItemList) {
                $("#backPack .scrollbar").append(
                    "<div>" + backPackItemList[i].name + "</div>"
                );
            }
        }
        $(function() {
            $("#backPack .scrollbar div").hover(function() {
                let itemname = $(this).text();
                for (let i in backPackItemList) {
                    console.log(backPackItemList[i].name, itemname);
                    if (backPackItemList[i].name == itemname) {
                        $("#show_item").html(function() {
                            itemshow = backPackItemList[i];
                            let message =
                                itemshow.name +
                                "</br>" +
                                "大小:" +
                                itemshow.x +
                                "*" +
                                itemshow.y +
                                "</br>";
                            if (backPackItemList[i].durability != null) {
                                message +=
                                    "物品剩餘耐久度: </br>" +
                                    backPackItemList[i].durability;
                            }
                            if (
                                itemshow.name == "cooked_meat" ||
                                itemshow.name == "dried_meat"
                            )
                                message +=
                                    "<a href='#' class='mainbutton' onclick='eat()'>使用</a>";
                            message +=
                                "<a href='#' class='mainbutton' onclick='drop()'>丟棄</a>";
                            return message;
                        });
                    }
                }
            });
        });
    }
}

function drop() {
    backPackItemList.splice(
        backPackItemList.findIndex(v => v.name === itemshow.name),
        1
    );
    if (itemshow.name == "fish_rod") toollist[1] = 0;
    if (itemshow.name == "axe") toollist[2] = 0;
    if (itemshow.name == "spear") toollist[3] = 0;
    $("#backPack .scrollbar")
        .children()
        .remove();
    $("#show_item").html("");
    if ($("#backPack .scrollbar").children().length == 0) {
        for (let i in backPackItemList) {
            $("#backPack .scrollbar").append(
                "<div>" + backPackItemList[i].name + "</div>"
            );
        }
    }
    $(function() {
        $("#backPack .scrollbar div").hover(function() {
            let itemname = $(this).text();
            for (let i in backPackItemList) {
                if (backPackItemList[i].name == itemname) {
                    $("#show_item").html(function() {
                        itemshow = backPackItemList[i];
                        let message =
                            itemshow.name +
                            "</br>" +
                            "大小:" +
                            itemshow.x +
                            "*" +
                            itemshow.y +
                            "</br>";
                        if (backPackItemList[i].durability != null) {
                            message +=
                                "物品剩餘耐久度: </br>" +
                                backPackItemList[i].durability;
                        }
                        if (
                            itemshow.name == "cooked_meat" ||
                            itemshow.name == "dried_meat"
                        )
                            message +=
                                "<a href='#' class='mainbutton' onclick='eat()'>使用</a>";
                        message +=
                            "<a href='#' class='mainbutton' onclick='drop()'>丟棄</a>";
                        return message;
                    });
                }
            }
        });
    });
}

$(function() {
    $("#mountain").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});
$(function() {
    $("#river").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});
$(function() {
    $("#swamp").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});
$(function() {
    $("#forest").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});
$(function() {
    $("#lake").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});
$(function() {
    $("#jungle").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        track: true
    });
});

function traveling() {
    $("#traveling").fadeIn();
    $("#overlayBackground")
        .fadeIn()
        .css({ "z-index": "2" });
    $(".travelimg").click(function() {
        let destination = $(this).attr("id");
        for (let i in locationlist) {
            if (locationlist[i].lid == destination)
                for (let j in locationlist) {
                    if (locationlist[j].lid == locations.lid) {
                        if (i - j == 0) {
                            $("#travelcomf").fadeIn();
                            $("#overlayBackground2").fadeIn();
                            $("#travelmsg").html("目前所在地");
                            $("#traveling #gotraveling").hide();
                            return;
                        }
                        $("#travelcomf").fadeIn();
                        $("#overlayBackground2").fadeIn();
                        $("#travelmsg").html(
                            "旅行至<p>" +
                                locationlist[i].lname +
                                "</p>需耗時" +
                                Math.abs((i - j) * 1.5) +
                                "小時"
                        );
                        $("#traveling #gotraveling").show();
                        traveltime = Math.abs((i - j) * 1.5);
                    }
                }
        }
    });
}

function gotraveling() {
    for (let i in locationlist) {
        if ($("#travelmsg p").text() == locationlist[i].lname) {
            timeset(traveltime * 60);
            changelocation(locationlist[i].lname);
            $("#traveling").fadeOut();
            $("#travelcomf").fadeOut();
            $("#overlayBackground").fadeOut();
            $("#overlayBackground2").fadeOut();
            if (getRandom(1, 100) < 20)
                changestatus("HP", -10, "在旅行過程中跌了一跤，幸好不嚴重");
            else if (getRandom(1, 100) < 5)
                changestatus("HP", -30, "失足滑落懸崖，下次要小心點了...");
        }
    }
}

function changelocation(lname) {
    for (let i in locationlist) {
        if (locationlist[i].lname == lname) {
            locations = locationlist[i];
            for (let j = 0; j < buffstat.length; j += 1) {
                buffstat[j] += locationlist[i].laffect[j];
            }
            for (let j = 0; j < buffstat.length; j += 1) {
                buffstat[j] -= locations.laffect[j];
            }
            locations = locationlist[i];
            $("#location").html(function() {
                let msg = "目前所在地:" + locations.lname + "</br>";
                if (locations.laffect[0] < 0) msg += "HP↓ ";
                else if (locations.laffect[0] > 0) msg += "HP↑ ";
                if (locations.laffect[1] < 0) msg += "water↓ ";
                else if (locations.laffect[1] > 0) msg += "water↑ ";
                if (locations.laffect[2] < 0) msg += "food↓ ";
                else if (locations.laffect[2] > 0) msg += "food↑ ";
                if (locations.laffect[3] < 0) msg += "stress↓ ";
                else if (locations.laffect[3] > 0) msg += "stress↑ ";
                if (locations.laffect[4] < 0) msg += "heat↓";
                else if (locations.laffect[4] > 0) msg += "heat↑";
                return msg;
            });
        }
    }
}

$(function() {
    $("#cancel").click(function() {
        $(this)
            .parent()
            .fadeOut();
        $("#overlayBackground2").fadeOut();
    });
});

function closemessage() {
    $("#message").fadeOut();
    $("#overlayBackground3").fadeOut();
}

$(function() {
    $(".close_button").click(function() {
        $("#backPack .scrollbar")
            .children()
            .remove();
        $("#show_item").html("");
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

function changestatus(type, num, message) {
    //type:[HP,water,food,stress,heat]
    num = Math.floor(num);
    if (message != "") {
        $("#overlayBackground3").fadeIn();
        $("#message")
            .fadeIn()
            .html(
                message +
                    "</br><a href='#' class='mainbutton' onclick='closemessage()'>關閉</a>"
            );
    }
    if (num == 0) return;
    if (HP <= 0) changestatus("HP", 0, "好痛...不想在煎熬下去了...");
    if (food <= 0) changestatus("HP", 0, "好餓...不想在煎熬下去了...");
    if (water <= 0) changestatus("HP", 0, "好渴...不想在煎熬下去了...");
    if (stress <= 0) changestatus("HP", 0, "壓力好大...不想在煎熬下去了...");
    if (heat <= 0) changestatus("HP", 0, "好冷...不想在煎熬下去了...");
    if (HP <= 0 || food <= 0 || water <= 0 || stress <= 0 || heat <= 0) {
        $("#overlayBackground6")
            .css("background-color", "black")
            .fadeIn(5000);
    }
    if (type == "HP") {
        HPbar(num);
        HP += num;
    } else if (type == "water") {
        waterbar(num);
        water += num;
    } else if (type == "food") {
        foodbar(num);
        food += num;
    } else if (type == "stress") {
        stressbar(num);
        stress += num;
    } else if (type == "heat") {
        heatbar(num);
        heat += num;
    }
    if (food > 90 && water > 80) {
        addbuff(0);
    } else {
        removebuff(0);
    }
    if (food < 20 && water < 20) {
        addbuff(1);
    } else {
        removebuff(1);
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var maxHealth = 100;
var curHealth1 = maxHealth;
var curHealth2 = maxHealth;
var curHealth3 = maxHealth;
var curHealth4 = maxHealth;
var curHealth5 = maxHealth;
var number;
$(".health-bar").html("100%");
$(".health-bar").css({
    width: "100%"
});
$(".health-bar2").html("100%");
$(".health-bar2").css({
    width: "100%"
});
$(".health-bar3").html("100%");
$(".health-bar3").css({
    width: "100%"
});
$(".health-bar4").html("100%");
$(".health-bar4").css({
    width: "100%"
});
$(".health-bar5").html("100%");
$(".health-bar5").css({
    width: "100%"
});
function HPbar(number) {
    curHealth1 = curHealth1 + number;
    if (curHealth1 > 100) {
        curHealth1 = 100;
    }
    if (curHealth1 < 0) {
        curHealth1 = 0;
    }
    applyChange1(curHealth1);
}
function foodbar(number) {
    curHealth2 = curHealth2 + number;
    if (curHealth2 > 100) {
        curHealth2 = 100;
    }
    if (curHealth2 < 0) {
        curHealth2 = 0;
    }
    applyChange2(curHealth2);
}
function waterbar(number) {
    curHealth3 = curHealth3 + number;
    if (curHealth3 > 100) {
        curHealth3 = 100;
    }
    if (curHealth3 < 0) {
        curHealth3 = 0;
    }
    applyChange3(curHealth3);
}
function stressbar(number) {
    curHealth4 = curHealth4 + number;
    if (curHealth4 > 100) {
        curHealth4 = 100;
    }
    if (curHealth4 < 0) {
        curHealth4 = 0;
    }
    applyChange4(curHealth4);
}

function heatbar(number) {
    curHealth5 = curHealth5 + number;
    if (curHealth5 > 100) {
        curHealth5 = 100;
    }
    if (curHealth5 < 0) {
        curHealth5 = 0;
    }
    applyChange5(curHealth5);
}

function applyChange1(curHealth) {
    var a = curHealth;
    $(".health-bar").html(a + "%");
    $(".health-bar-red").animate(
        {
            width: a + "%"
        },
        700
    );
    $(".health-bar").animate(
        {
            width: a + "%"
        },
        500
    );
    $(".health-bar-blue").animate(
        {
            width: a + "%"
        },
        300
    );
}
function applyChange2(curHealth) {
    var a = curHealth;
    $(".health-bar2").html(a + "%");
    $(".health-bar-red2").animate(
        {
            width: a + "%"
        },
        700
    );
    $(".health-bar2").animate(
        {
            width: a + "%"
        },
        500
    );
    $(".health-bar-blue2").animate(
        {
            width: a + "%"
        },
        300
    );
}
function applyChange3(curHealth) {
    var a = curHealth;
    $(".health-bar3").html(a + "%");
    $(".health-bar-red3").animate(
        {
            width: a + "%"
        },
        700
    );
    $(".health-bar3").animate(
        {
            width: a + "%"
        },
        500
    );
    $(".health-bar-blue3").animate(
        {
            width: a + "%"
        },
        300
    );
}
function applyChange4(curHealth) {
    var a = curHealth;
    $(".health-bar4").html(a + "%");
    $(".health-bar-red4").animate(
        {
            width: a + "%"
        },
        700
    );
    $(".health-bar4").animate(
        {
            width: a + "%"
        },
        500
    );
    $(".health-bar-blue4").animate(
        {
            width: a + "%"
        },
        300
    );
}
function applyChange5(curHealth) {
    var a = curHealth;
    $(".health-bar5").html(a + "%");
    $(".health-bar-red5").animate(
        {
            width: a + "%"
        },
        700
    );
    $(".health-bar5").animate(
        {
            width: a + "%"
        },
        500
    );
    $(".health-bar-blue5").animate(
        {
            width: a + "%"
        },
        300
    );
}

function start() {
    console.log("page loaded completely");
    initAllData();
    initAllUI();
    console.log("day1 start");
}
