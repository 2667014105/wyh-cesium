//在线
// var isOnline

$(document).ready(function () {

    initPage();
    bindEvents();
    //懒加载
    var timeout = setTimeout(function () {
        $("img.chart-thumb").lazyload();
    }, 1000);
});
var exConfig = exampleConfig,
    containExamples = false,
    thumbLocation = getThumbLocation();

//左侧层级不包含例子，只包含分类
function initPage() {
    var sideBar = $("ul#sidebar-menu");
    var chartList = $("#charts-list");
    for (var key in exConfig) {
        sideBar.append(createSideBarMenuItem(key, exConfig[key], containExamples));
        chartList.append(createGalleryItem(key, exConfig[key]));
    }
    resizeCharts();
    initSelect();
    sidebarScrollFix();
}

//初始化页面第一次加载
function initSelect() {
    var hash = window.location.hash;
    if (hash.indexOf("#") === -1) {
        var id = $('#sidebar li').first().children('a')[0].hash;

        window.location.hash = (id) ? id : window.location.hash;
    }
    scroll();
}


//初始化示例面板
function createGalleryItem(id, config) {
    if (!config) {
        return;
    }

    var categoryLi = $("<li class='category' id='" + id + "'></li>");
    if (config.name) {
        createGalleryItemTitle(id, config.name).appendTo(categoryLi);
    }
    if (config.content) {
        createSubGalleryItem(config.content, id).appendTo(categoryLi);
    }
    return categoryLi;
}


function createSubGalleryItem(config, name) {
    var categoryContentDiv = $("<div class='category-content'></div>");
    for (var key in config) {
        var configItem = config[key];
        var content = $("<div class='box box-default color-palette-box' id='" + name + '-' + key + "'></div>");
        createSubGalleryItemTitle(key, configItem.name).appendTo(content);
        if (configItem.content) {
            createGalleryCharts(configItem.content).appendTo(content);
        }
        content.appendTo(categoryContentDiv);
    }
    return categoryContentDiv;
}

function createGalleryItemTitle(id, title) {
    var menuItemIcon = sideBarIconConfig[id];
    return $("<h3 class='category-title' id='title_" + id + "'>" + "<i class='fa " + menuItemIcon + "'></i>" + "&nbsp;&nbsp;" + title + "</h3>");
}

function createSubGalleryItemTitle(id, title) {
    return $("<div class='box-header'>" + "<h3 class='box-title' id='category-type-" + id + "'>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + title + "</h4>" + "</h3>" + "</div>");
}


function createGalleryCharts(examples) {
    var chartsDiv = $("<div class='box-body'></div>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var html = createGalleryChart(examples[i]);
        if (html)
            html.appendTo(chartsDiv)
    }
    return chartsDiv;
}

function createGalleryChart(example) {
    var _path = window.examplePath || "../wyh-example/";
    // var _widgetpath = window.widgetPath || "http://marsgis.cn/project/2d/zhts/map.html";

    var target = _path + "editor.html",
        title = example.name,
        href = fileName2Id(example.fileName),
        thumbnail = _path + "nav/img/" + (example.thumbnail || "");

    var isWidget = false;
    if (example.params) {
        target += "?" + example.params;

        if (example.params.indexOf("widget=") != -1) {
            if (!window.showWidget) return false;
            isWidget = true;
            // target = _widgetpath + "?onlyStart=true&name=" + title + "&" + example.params;
        }
    }

    if (href) {
        target = target + "#" + href;
    }




    var msg = title + " v" + (example.version || "");

    var chartDiv = $("<div class='col-xlg-2 col-lg-3 col-md-4 col-sm-6 col-xs-12'><a target='_blank'href='" + _path + href + ".html'></a></div>");
    var chart = $('<div class="chart"></div>');
    var link = $("<a class='chart-link' target='_blank' href='" + target + "'></a>");
    var chartTitle = $("<h5 class='chart-title'  title='" + msg + "' >" + title + "</h5>");
    var thumb = $("<img class='chart-area' src='" + thumbnail + "' onerror='imgerrorfun();' style='display: inline'>");

    if (example.plugins) {
        msg += "\n该功能属于独立" + example.plugins + "插件功能，可选单独购买，不含在SDK类库中。"
        chartTitle = $("<h5 class='chart-title' title='" + msg + "'  >" + title + "<span style='color:rgba(0, 147, 255, 0.7)'>[" + example.plugins + "插件]</span></h5>");
    }
    if (isWidget) {
        msg += "\n该功能属于项目内功能，此处仅做演示，具体交付依赖是否选择对应项目。"
        chartTitle = $("<h5 class='chart-title' title='" + msg + "' >" + title + "<span style='color:rgba(0, 147, 255, 0.7)'>[项目widget]</span></h5>");
    }

    //最新加的示例
    // if (window.mars2d_version == example.version) {
    //     $('<span class="newTitle" title="新添加示例">新</span>').appendTo(chart);
    // }
    chartDiv.attr("title", msg);

    chartTitle.appendTo(link);
    thumb.appendTo(link);
    link.appendTo(chart);
    chart.appendTo(chartDiv);

    return chartDiv;
}

function imgerrorfun() {
    var img = event.srcElement;
    img.src = "img/mapicon.jpg";
    img.onerror = null;
}

function openExampleView(href, title) {
    var width = (document.documentElement.clientWidth - 230) + "px";
    var height = (document.documentElement.clientHeight - 60) + "px";

    var _layerIdx = layer.open({
        type: 2,
        title: title,
        fix: true,
        maxmin: true,
        shadeClose: true,
        offset: ['60px', '230px'],
        area: [width, height],
        content: href,
        skin: "layer-mars-dialog animation-scale-up",
        success: function (layero) {

        }
    });

    //$("#layui-layer" + _layerIdx).css({
    //    "width": "calc(100% - 230px)",
    //    "height": "calc(100% - 80px)",
    //}); 
    $("#layui-layer" + _layerIdx + " .layui-layer-title").css({
        "background": "#1E9FFF",
    });
}

function getThumbLocation() {
    var param = window.location.toString();
    return param.substr(0, param.lastIndexOf('/'));
}

//chart宽高自适应
function resizeCharts() {
    var charts = $("#charts-list .chart .chart-area");
    if (charts[0] && charts[0].offsetWidth) {
        charts.height(charts[0].offsetWidth * 0.8);
    } else {
        charts.height(260 * 0.8);
    }
    window.onresize = function () {
        resizeCharts();
    }
}

//根据url滚动到页面相应的位置
function scroll() {
    var hash = window.location.hash;
    var ele;

    if (hash && hash.indexOf("#") !== -1) {
        var param = hash.split("#")[1].split("-");
        if (param.length === 1) {
            ele = $(".category-title#title_" + param[0]);
            selectMenu(param[0], param.length);
        }

        if (param.length == 2) {
            //二级菜单里面的li
            ele = $("#category-type-" + param[1]);
            selectMenu(param[1], param.length);
        }

    }

    if (ele && ele.offset()) {
        $(window).animate({
            scrollTop: ele.offset().top // 改
        }, 0);
    }
}

//绑定点击事件
function bindEvents() {
    var child = $("ul#sidebar-menu>li.treeview>ul>li");
    var parent = $('ul.sidebar-menu>li').parent("ul");
    //因为iManager只有1级所以，iManager点击的时候相当于一级菜单，其他的二级都要关闭.
    if ($('ul.sidebar-menu>li#firstMenuiManager').find('ul').length == 0) {
        if ($('ul.sidebar-menu>li#firstMenuiManager').click(function () {
                $('ul#sidebar-menu>li>ul').slideUp(500);
            }));
    }
    //一级菜单跳转
    child.parent('ul').siblings('a').click(function (evt) {
        if ($(this).siblings('ul').is(':visible') && $(this).siblings('ul').children('li').hasClass('active')) {
            evt.stopPropagation(); //阻止点击事件触发折叠的冒泡
        }
        window.location = evt.currentTarget.href;
    });

    //二级菜单跳转,不用 boot自带
    window.addEventListener("hashchange", function () {
        scroll();
    });
}

var openTimer; // 定义展开的延时
var animationSpeed = 500;
$(window).on('scroll', function () {
    if ($('ul.sidebar-menu>li').hasClass('active')) {
        var parent = $('ul.sidebar-menu>li').parent("ul");

        //设置0.1秒后再打开，目的是为了防止滚轮拉快 中途经过的展开和折叠效果还来不及完成而产生的重叠效果;
        if (openTimer) {
            clearTimeout(openTimer);
        }
        openTimer = setTimeout(function () {
            parent.children('li.active').children('ul').slideDown(animationSpeed, function () {
                parent.children('li.active').children('ul').css('display', 'block');
            })
        }, 100);
    }
    $('ul.sidebar-menu>li').not("li.active").children('ul').css('display', 'none');
});