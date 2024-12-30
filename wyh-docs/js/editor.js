$(document).ready(function () {
    initPage();
    bindEvents();
    sidebarScrollFix();
});

var aceEditor;
var containExamples = true;

function initPage() {
    initEditor();
    screenResize();

}

function screenResize() {
    window.onresize = function () {
        mapHeight();
    };
}

function findConfig(locationParam, search) {
    if (search && search.length > 1)
        search = search.substr(1);

    for (var key1 in exampleConfig) { //第1级
        var item2 = exampleConfig[key1].content;
        for (var key2 in item2) { //第2级
            var arr3 = item2[key2].content;
            for (var i = 0, len = arr3.length; i < len; i++) {
                var item4 = arr3[i];

                if (search) {
                    if (item4.fileName == locationParam && item4.params == search) {
                        var name1 = exampleConfig[key1].name;
                        var name2 = item2[key2].name;
                        document.title = item4.name + " 【" + name1 + " " + name2 + "】";
                        return;
                    }
                } else {
                    if (item4.fileName == locationParam) {
                        var name1 = exampleConfig[key1].name;
                        var name2 = item2[key2].name;
                        document.title = item4.name + " 【" + name1 + " " + name2 + "】 ";
                        return;
                    }
                }
            }
        }
    }
}

//初始化编辑器
function initCodeEditor() {
    if (!aceEditor) {
        aceEditor = ace.edit("editor");
        aceEditor.setTheme("ace/theme/xcode");
        aceEditor.getSession().setMode("ace/mode/html");
        aceEditor.getSession().setUseWrapMode(true);
        aceEditor.setShowPrintMargin(false);
        aceEditor.$blockScrolling = Infinity;
    }
    aceEditor.setValue($('#editor').val());
    aceEditor.clearSelection();
    aceEditor.moveCursorTo(0, 0);
}

//初始化编辑器以及预览内容
function initEditor() {
    loadExampleHtml();
    initCodeEditor();
}

function loadExampleHtml() {
    var locationParam = getLocationParam();
    if (!locationParam) {
        return;
    }

    findConfig(locationParam, window.location.search);


    locationParam = id2FileName(locationParam);

    var href = window.location.pathname;
    var mapUrl = href.substr(0, href.lastIndexOf('/') + 1);
    mapUrl = mapUrl + locationParam + window.location.search;
    if (!mapUrl) {
        return;
    }


    var cacheVersion = "20200102";
    if (mapUrl.indexOf('?') == -1)
        mapUrl += "?time=" + cacheVersion;
    else if (mapUrl.indexOf('time=' + cacheVersion) == -1)
        mapUrl += "&time=" + cacheVersion;

    console.log('加载示例页面：' + mapUrl);

    var html = $.ajax({
        url: mapUrl,
        async: false,
        error: function (error) {
            haoutil.msg("该页面不存在，请检查地址！");
            html = "";
        }
    }).responseText;
    if (html && html != "") {
        $('#editor').val(html);
        loadPreview(html);
    }
}

function getLocationParam() {
    var param = window.location.toString();
    if (param.indexOf("#") === -1) {
        return "11_online_tdt";
    }
    param = param.split("#");
    if (param && param.length > 0) {
        return param[1];
    }
}

//运行代码
function run() {
    var iframeContent = $("#editor").val();
    if (editor) {
        iframeContent = aceEditor.getValue();
    }
    loadPreview(iframeContent);
}

//填充预览效果内容
function loadPreview(content) {
    var iFrame = createIFrame(),
        iframeDocument = iFrame.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(content);
    iframeDocument.close();

    var doc = document;
    iFrame.addEventListener('load', function () {
        mapHeight();
        //setTimeout(function () {
        //    doc.title = iframeDocument.title;
        //}, 100); 
    });
    mapHeight();
}


function loadIFrameForSrc(url) {
    createIFrame();
    $("#innerPage").attr('src', url);

    mapHeight();
}

function createIFrame() {
    var preViewPane = $("#previewPane");
    preViewPane.empty();
    var iframe = document.createElement("iframe");
    $(iframe).attr("id", "innerPage");
    $(iframe).attr("name", "innerPage");
    preViewPane.append(iframe);
    return iframe;
}

//重置编辑器
function refresh() {
    initEditor();
    run();
}

function initSelect() {
    var hash = window.location.hash;
    var id;
    if (hash.indexOf("#") === -1) {
        id = $("section#sidebar .thirdMenu a.link").first().attr('id');
        window.location.hash = (id) ? "#" + id : window.location.hash;
    } else {
        id = hash.split("#")[1];
    }
    selectMenu(id);
}

function mapHeight() {
    var doc = $("#innerPage").contents();
    doc.find("html").height("100%");
    doc.find("body").height("100%");
}

function bindEvents() {

    $("#sidebar ul.third-menu a").click(function (evt) {
        var target = $(evt.target).parent().parent();
        var nodeId = evt.target.id;
        //如果点击的是span节点还要往上一层
        if (evt.target.localName === "span") {
            nodeId = target.attr('id');
        }

        if (nodeId) {
            //阻止冒泡防止上层事件响应导致修改url hash值
            evt.preventDefault();
            window.location.hash = "#" + nodeId;
            initEditor();
            evt.stopPropagation();
        }
    });
    var codePane = $("#codePane");
    var previewPane = $("#previewPane");
    var expand = !!1;
    $("#showCodeBtn").click(function () {
        if (expand) {
            //编辑器和预览宽度5:7
            $(this).text(" 收缩").css({
                left: '500px'
            });
            $(this).addClass(" fa-compress");
            $(this).removeClass("fa-arrows-alt");
            codePane.show(10, function () {
                previewPane.removeClass("col-md-12");
                previewPane.addClass("col-md-7");
                codePane.addClass("col-md-5");

                $("#showCodeBtn").css({
                    left: ($("#codePane").width() + 5) + 'px'
                });
                if (aceEditor) {
                    aceEditor.resize();
                }
            });

        } else {
            //预览独占一行
            $(this).text(" 源码").css({
                left: '0px'
            });
            $(this).addClass("fa-arrows-alt");
            $(this).removeClass(" fa-compress");
            codePane.hide(200, function () {
                codePane.removeClass("col-md-5");
                previewPane.removeClass("col-md-7");
                previewPane.addClass("col-md-12");
            });

        }
        expand = !expand;
    });

    window.addEventListener("hashchange", function () {
        var hash = window.location.hash;
        if (hash.indexOf("#") !== -1) {
            var id = hash.split("#")[1];
            selectMenu(id);
        }
    });
}