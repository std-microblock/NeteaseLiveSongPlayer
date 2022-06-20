/*#raw_require /client/client.js#*/

interface DanmakuMessage {
    command: string | null,
    arguments: string[],
    sender: string,
    origin: string
}

let commands:any[] = []

onDanmaku(7391830, (danmaku) => {
    let message: DanmakuMessage = {
        command: null,
        arguments: [],
        sender: danmaku.nickname,
        origin: danmaku.text.trim()
    }
    for (let command of commands) {
        let name = command.name
        let callback = command.callback
        let names: string[] = [];
        if (name instanceof Array) names = name;
        else names.push(name);

        for (let name of names) {
            
            if (message.origin.startsWith(name)) {
                message.command = name
                message.arguments = message.origin.slice(name.length).trim().split(" ");
                callback(message);
                return;
            }
        }
    }

}, () => document.querySelector(".live-songplayer.invisible") == null);

(function () {
    function addCommand(name: string[] | string, callback: Function) {
        commands.push({ name, callback });
    }

    /*#require /client/commands.js#*/
})()

