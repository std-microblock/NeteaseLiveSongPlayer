/*#raw_require ncm_utils.js#*/
let playlist:any[]=[],playing={name:"",author:""}

function updatePlaylist(){
    let wplaylist=document.querySelector(".wplaylist");
    if(wplaylist){
        wplaylist.innerHTML=playlist.map((v,i)=>`
        <div class="line">
            <div class="name">${v.songinfo.name}</div>
            <div class="user">${v.sender}</div>
        </div>
        `).join("")
    }
}


async function switchsong(){
   // alert("switchsong+"+playlist.length)
    if(playlist.length>0){
    //    prompt("",`${JSON.stringify(playing)},${JSON.stringify(getPlaying())}`)
        if(playing.name.replace(/\s/g,"")!=getPlaying().name.replace(/\s/g,"")||playing.author.replace(/\s/g,"")!=getPlaying().author.replace(/\s/g,"")){
            let play=playlist.shift()
            ctl.actionManager.dfR({id:play.songinfo.id,type:"4",action:"play",from:0,href:"",data:{}});
            playing.name=play.songinfo.name.replace(/\s/g,"")
            playing.author=play.songinfo.author.replace(/\s/g,"")
            updatePlaylist()
        }
    }
}

subscribeSongChanged(switchsong)

addCommand(["play","点歌","pl"],async (message)=>{
    let songinfo=await searchSong(message.arguments.join(" "));
    playlist.push({songinfo,sender:message.sender});
    updatePlaylist();
    switchsong()
});
