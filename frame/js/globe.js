//替换IP为当前实际服务IP
function replaceCdnIP(id) {
    $("#" + id).html($("#" + id).html().replace(new RegExp("127.0.0.1:8080", "gm"), location.host));
}