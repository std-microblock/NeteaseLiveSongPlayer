function lsp_on(){
    document.querySelector(".live-songplayer").classList.remove("invisible");
    document.querySelector(".lsp-switcher").classList.remove("on");
    document.querySelector(".lsp-switcher").classList.add("off")
    document.querySelector(".lsp-switcher").onclick=lsp_off
}
function lsp_off(){
    document.querySelector(".live-songplayer").classList.add("invisible")
    document.querySelector(".lsp-switcher").classList.remove("off");
    document.querySelector(".lsp-switcher").classList.add("on")
    document.querySelector(".lsp-switcher").onclick=lsp_on
}

function lsp_settings(){
    localStorage["__lsp__live__id__"]=prompt("请输入您的直播间ID号",localStorage["__lsp__live__id__"])||localStorage["__lsp__live__id__"]
    document.location.reload()
}