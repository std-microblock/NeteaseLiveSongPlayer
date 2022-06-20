if(window["__lsp__loadflag__"])throw Error("Panic!")
window["__lsp__loadflag__"]=true

setInterval(() => {
    if (!document.querySelector(".lsp-div")) {
        let player = document.createElement("div");
        player.classList.add("lsp-div")
        player.innerHTML = "#require /web/player.html#"
        document.body.appendChild(player);
    }
}, 100)

/*#require /web/sync.js#*/

/*#raw_require /client/processor.js#*/

/*#raw_require /web/switcher.js#*/

