const aceEditor = ace.edit('editor')
let initName= ''
aceEditor.setTheme("ace/theme/xcode");
aceEditor.getSession().setMode("ace/mode/html");
aceEditor.getSession().setUseWrapMode(true);
aceEditor.setShowPrintMargin(false);
aceEditor.$blockScrolling = Infinity;

!function init(){
    let url = window.location.hash;
    if (url){
        let str = url.slice(1);
        initName=str
        initHtml(str)
    }
}()

function run(){
    let iframeContent = aceEditor.getValue();
    loadPreview(iframeContent);
}
function initHtml(name){
    fetch(`../wyh-example/${name}.html`).then(res =>{
        res.text().then(resurlt => {
            aceEditor.setValue(resurlt);
            aceEditor.clearSelection();
            aceEditor.moveCursorTo(0, 0);
            run()
        })
    })
}

function refresh(){
    initHtml(initName)
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
        setInnerHeight();
        //setTimeout(function () {
        //    doc.title = iframeDocument.title;
        //}, 100);
    });
    setInnerHeight();
}
function createIFrame() {
    const preViewPane = $("#previewPane");
    preViewPane.empty();
    const iframe = document.createElement("iframe");
    const $iframe = $(iframe);
    $iframe.attr("id", "innerPage");
    $iframe.attr("name", "innerPage");
    $iframe.addClass('innerPage');
    preViewPane.append(iframe);
    return iframe;
}
function setInnerHeight() {
    var doc = $("#innerPage").contents();
    doc.find("html").height("100%");
    doc.find("body").height("100%");
}
