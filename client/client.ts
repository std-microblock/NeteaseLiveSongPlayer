/**
 * 待更换到WebSocket连接，省事先用HTTP了
 */

async function onDanmaku(roomid = 790410, callback:any = (danmaku) => { },ifcontinue:any=()=>true) {
    let history = {}
    let data = await (await fetch(`https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=${roomid}`)).json()
    for (let danmaku of data.data.room) {
        history[danmaku.text+danmaku.timeline+danmaku.nickname] = true;
    }
    setInterval(async () => {
        if(!ifcontinue())return;
        let data = await (await fetch(`https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory?roomid=${roomid}`)).json()

        for (let danmaku of data.data.room) {
            if (!history[danmaku.text+danmaku.timeline+danmaku.nickname]) {
                history[danmaku.text+danmaku.timeline+danmaku.nickname] = true;
                callback(danmaku);
            }
        }
    }, 3000)
}