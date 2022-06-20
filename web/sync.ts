setInterval(() => {
/*#raw_require ncm_utils.js#*/

    let img = $(".live-songplayer img.cover-img"), cimg = $(".u-cover.u-cover-sm img")
    img.src=cimg.src;

    let title = $(".bar .title"), author = $(".bar P.j-title")
    $(".live-songplayer .info .name").innerText = title.innerText.split("\n")[0]
    $(".live-songplayer .info .author").innerText = author.innerText.split("\n")[0]

    $(".live-songplayer .playtime .innerbar").style.width=`${(getPlayTimePercent()*100).toFixed(6)}%`
    $(".live-songplayer .playtime .text").innerText=`${$("time.now").innerText}/${$("time.all").innerText}`
}, 100)
