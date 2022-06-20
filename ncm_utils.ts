function $(sel) {
    return document.querySelector(sel);
}

function $$(sel) {
    return document.querySelectorAll(sel);
}

function searchSong(keyword) {
    return new Promise((resolve) => {
        let handle = setInterval(() => {
            if (window["searching"]) return;
            window["searching"] = true
            clearInterval(handle)

            $(".j-search-input").value = keyword;
            $(".sch-btn").click();
            var searchsong_handle = setInterval(function () {
                if (!$(".m-search .j-item"))
                    return;
                clearInterval(searchsong_handle);
                resolve(getSearchResult());
                setTimeout(() => {
                    window["searching"] = false
                }, 50)
            }, 100);
        })

    })
}

function getSearchResult(number = 0) {
    return {
        name: $$(".m-search .j-item .title")[number].innerText.trim(),
        author: $$(".m-search .j-item .flow .s-fc3")[number].innerText.trim(),
        id: $$(".container-searchtrack .m-plylist .itm.f-cb.j-item.j-impress")[number].classList.toString().match(/tid-(\S+)/)[1].trim()
    }
}

function playAllSong() {
    $(".m-search.q-lrc.g-wrap1 .container.j-flag .oper.g-wrap5.j-flag .u-ibtn5b.u-ibtn5b-new.j-oper .u-ibtn5-ply").click();
}

function addAllToNext() {
    $(".u-ibtn5-new.u-ibtn5-only.u-ibtn5-addto").click()
}

function nextSong() {
    $(".btnc-nxt").click()
}

function pause() {
    $(".f-fs0 #x-g-mn .m-player.f-os#main-player .btnp-pause").click();
}

function is_paused() {
    return $(".f-fs0 #x-g-mn .m-player.f-os#main-player .btnp-pause") != null
}

function play() {
    $(".f-fs0 #x-g-mn .m-player.f-os#main-player .btnp.btnp-play.f-cp").click();
}

function formatTime(time: string) {
    return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
}

function getPlayTimePercent() {
    return formatTime($("time.now").innerText) / formatTime($("time.all").innerText);
}

function subscribeSongChanged(callback) {
    let lastcover = $(".u-cover.u-cover-sm img").src
    setInterval(() => {
        let nowcover;
        if ($(".u-cover.u-cover-sm img") == null) {
            nowcover = "[[ NO COVER ]]"
        } else {
            nowcover = $(".u-cover.u-cover-sm img").src
        }
        if (nowcover != lastcover) {
            lastcover = nowcover
            callback();
        }
    }, 40)
}


function getPlaying() {
    let endfix = "";
    if ($(".bar .title * *")) endfix = " * *"


    if ($(".u-cover.u-cover-sm img") != null)
        return {
            cover: $(".u-cover.u-cover-sm img").src,
            name: ($(".bar .title" + endfix) || $(".bar .title")).innerText.split("\n")[0].trim(),
            author: ($(".bar P.j-title" + endfix) || $(".bar P.j-title")).innerText.split("\n")[0].trim(),
        }
    else return {}
}

function findNativeFunction(obj, identifiers) {
    for (let key in obj){
        let flag=true
        for(let identifier of identifiers){
            if (!obj[key].toString().includes(identifier))flag=false;
        }
        if(flag)return key
    }
}