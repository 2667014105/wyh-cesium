//左侧层级是否包含示例
var containExample = false;
var sideBarIconConfig = sideBarIconConfig || {};

function initSideBar() {
    var sideBar = $("ul#sidebar-menu");
    for (var key in exampleConfig) {
        sideBar.append(createSideBarMenuItem(key, exampleConfig[key], false));
    }
}


//侧边栏滚动支持
function sidebarScrollFix() {
    $('ul#sidebar-menu>li').hover(function (evt) {

        if (!$('body').hasClass('sidebar-collapse')) {
            return;
        }

        //调整一级菜单li下标题的布局位置至右侧
        var $titleBar = $(this).children('a').children('.sidebar-title-bar');
        $titleBar.css({
            "top": ($(this).offset().top - $(window).scrollTop()) + "px",
            //fix由于侧边栏滚动条宽度引起的减少的宽度
            "width": "233px"
        });

        //如果底部空间不够，动态增加侧边栏高度
        var visibleOffsetTop = $(this).offset().top - $(window).scrollTop();
        var offsetBottom = $('.sidebar-menu').height() - visibleOffsetTop;
        var requireVisibleHeight = $(this).height() + $(this).children('ul').height();
        if (offsetBottom <= requireVisibleHeight) {
            $('.sidebar-menu').css({
                "height": (requireVisibleHeight + $(window).height()) + "px"
            })
        }

        //调整一级菜单li下子列表的布局位置至右侧
        var offsetTop = visibleOffsetTop + $(this).height();
        $(this).children('ul').css({
            "top": offsetTop + "px"
        });

        //fix小尺寸屏幕下二级菜单高度高于窗口高度时显示不全的情况
        var $activeList = $(this).children('ul');
        var activeListOffsetBottom = Math.abs($(window).height() - visibleOffsetTop - $(this).height());
        var requireActiveListHeight = $activeList.height();
        if (activeListOffsetBottom < requireActiveListHeight) {
            $activeList.css({
                "height": requireActiveListHeight
            });
            //滚动条样式
            $activeList.addClass('scroll-list');
        }

    }, function (evt) {
        if (!$('body').hasClass('sidebar-collapse')) {
            return;
        }
        //滚动条
        $(this).children('ul').removeClass('scroll-list');
        //恢复原来的高度
        $(this).children('ul').css({
            "height": "auto"
        });
    });
    $('.main-sidebar').on('scroll', function (evt) {
        evt.stopPropagation();
    });

    $(window).on('resize', function () {
        $('.sidebar-menu').css({
            "height": "100%"
        })
    })
}

//创建菜单项
function createSideBarMenuItem(id, config, containAll) {
    if (!config) {
        return;
    }
    containExample = containAll;
    var li = $("<li id='iclient_" + id + "' class='treeview '></li>");

    if (config.content) {

        createSideBarMenuTitle(id, config.name, true).appendTo(li);
        createSideBarSecondMenu(config.content, id).appendTo(li);
    } else {
        createSideBarMenuTitle(id, config.name, false).appendTo(li);
    }
    return li;
}

//创建二级菜单
function createSideBarSecondMenu(config, name) {
    var ul = $("<ul class='treeview-menu second-menu '></ul>");
    for (var key in config) {
        var li = $("<li class='menuTitle ' id='" + key + "' ></li>");
        li.appendTo(ul);
        var configItem = config[key];

        if (containExample && configItem.content) {
            createSideBarMenuSecondTitle(name + '-' + key, configItem.name, true).appendTo(li);
            createSideBarThirdMenu(configItem.content).appendTo(li);
        } else {
            createSideBarMenuSecondTitle(name + '-' + key, configItem.name, false).appendTo(li);
        }
    }
    return ul;
}

function fileName2Id(fileName) {
    var value = (fileName || "").replace(".html", "");
    return value;
}

function id2FileName(id) {
    var fileName = id + ".html";
    return fileName;
}

//创建三级菜单
function createSideBarThirdMenu(examples) {
    var ul = $("<ul class='treeview-menu third-menu'></ul>");
    var len = (examples && examples.length) ? examples.length : 0;
    for (var i = 0; i < len; i++) {
        var example = examples[i];
        var _id = fileName2Id(example.fileName);
        var li = $("<li class='menuTitle' id='" + _id + "' ></li>");
        li.appendTo(ul);
        if (_id != "" && example.name) {
            createSideBarMenuThirdTitle(_id, example.name, false).appendTo(li);
        }
    }
    return ul;
}

function createSideBarMenuTitle(id, title, collapse) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + " iconName'></i>"
    }

    var href = "";
    if (location.href.indexOf("editor.html") != -1)
        href = "../docs/examples.html#" + id;
    else
        href = "#" + id;

    var div = $("<a  href='" + href + "' >" + icon + "<span class='firstMenuTitle'>" + title + "</span></a>");
    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}


function createSideBarMenuSecondTitle(id, title, collapse) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + "'></i>"
    }

    var href = "";
    if (location.href.indexOf("editor.html") != -1)
        href = "../docs/examples.html#" + id;
    else
        href = "#" + id;

    var div = $("<a href='" + href + "' id='" + id + '-' + id + "'>" + icon + "<span class='secondMenuTitle'>" + title + "</span></a>");

    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}

function createSideBarMenuThirdTitle(id, title, collapse) {
    id = id || "";
    var icon = "",
        iconName = sideBarIconConfig[id];
    if (iconName) {
        icon = "<i class='fa " + iconName + "'></i>"
    }

    var div = $("<a href='#' id='" + id + "'>" + icon + "<span class='thirdMenuTitle'>" + title + "</span></a>");
    if (collapse) {
        div.append(createCollapsedIcon());
    }
    return div;
}

//创建右侧折叠菜单
function createCollapsedIcon() {
    return $("<span class='pull-right-container'> <i class='fa fa-angle-left pull-right'></i> </span>");
}

//只处理三层节点,后续可优化
function selectMenu(id, length) {
    var target = _getTarget(id, length);
    if (length !== 1) {
        //控制editor页面左侧导航栏一级菜单高亮
        _selectTarget(target.parent().parent().parent().parent());
        //控制示例页面左侧导航栏一级菜单高亮
        _selectTarget(target.parent().parent());
        //控制左侧导航栏最低级菜单高亮
        _selectTarget(target.parent());
        _selectTarget(target.find("ul"));
    }
}

function _getTarget(id, length) {
    var target;
    if (length) {
        if (length === 1) {
            $("section#sidebar li.active").removeClass("active");
            target = $("section#sidebar li#iclient_" + id);
            target.children('ul').show();
        }
        if (length === 2) {
            $("section#sidebar li.active ul.active li").removeClass("active");
            target = $("section#sidebar li.treeview").children('ul').children('li#' + id);
        }
    } else {
        $("section#sidebar #ul").addClass("active");
        $("section#sidebar li.active").removeClass("active");
        target = $("section#sidebar li#" + id);
    }
    target && target.addClass('active');
    return target;
}

function _selectTarget(target) {
    if (!target || target.length < 1) {
        return;
    }
    var className = target.attr("class");
    if (className && className.indexOf("treeview-menu") > -1 && className.indexOf("menu-open") === -1) {
        target.addClass("menu-open");
        target.css("display", "block");
    }
    if (className && className.indexOf("treeview") > -1) {
        target.addClass('active');
    }
}