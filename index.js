let heals; //血量
let water; //口渴值
let food; //飢餓值
let stress; //壓力值
let backPackSize; //1:7*3	2:10*3
let backPackItemList; //背包物品以及排列方式
let backPackAva; //is背包空格可用
let date; //日期
let weather; //天氣
let buff;
let debuff;
let locations; //forest,lake,mountain,swamp,jungle,river
let alltheitemlist;
let itemonhand;
let time;

alltheitemlist = [
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
    { name: "leather", x: 1, y: 1, durability: null, materials: null }, //打獵12
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
        materials: ["leather", "leather", "leather", "rope", "rope"]
    },
    { name: "wood", x: 1, y: 1, durability: null, materials: null },
    { name: "wood", x: 1, y: 1, durability: null, materials: null },
    { name: "wood", x: 1, y: 1, durability: null, materials: null },
    { name: "wood", x: 1, y: 1, durability: null, materials: null }
];

console.log(alltheitemlist);
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
    weather = 0;
    buff = new Array();
    debuff = new Array();
    locations = "forest";
    itemonhand = 0;
    time = [0, 7, 0, 0];
    timeset(32);
    console.log("datainit");
}

function initAllUI() {}

function timeset(plus = 0) {
    console.log(plus);
    $(".clock").html(function() {
        if (plus == 0)
            $(".clock").text(
                time[0] +
                    " " +
                    time[1] +
                    " " +
                    ":" +
                    " " +
                    time[2] +
                    " " +
                    time[3]
            );
        else {
            if (plus >= 10) time[1] += (plus - (plus % 10)) / 10;
            time[2] += plus % 10;
            if (time[2] >= 6) {
                time[2] -= 6;
                time[1] += 1;
            }
            if (time[1] >= 10) {
                time[1] -= 10;
                time[0] += 1;
            }
            console.log("10");
            $(".clock").text(
                time[0] +
                    " " +
                    time[1] +
                    " " +
                    ":" +
                    " " +
                    time[2] +
                    " " +
                    time[3]
            );
        }
    });
}

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

$(function() {
    $("#crafting .scrollbar>div").mouseover(function(img) {
        console.log("11111");
        $(document).on("mousemove", function(event) {
            $("#log").text("pageX: " + event.pageX + ", pageY: " + event.pageY);
        });
    });
});

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
