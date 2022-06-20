/*#raw_require /client/client.js#*/
var commands = [];
onDanmaku(localStorage["__lsp__live__id__"], function (danmaku) {
    var message = {
        command: null,
        arguments: [],
        sender: danmaku.nickname,
        origin: danmaku.text.trim()
    };
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        var name = command.name;
        var callback = command.callback;
        var names = [];
        if (name instanceof Array)
            names = name;
        else
            names.push(name);
        for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
            var name_1 = names_1[_a];
            if (message.origin.startsWith(name_1)) {
                message.command = name_1;
                message.arguments = message.origin.slice(name_1.length).trim().split(" ");
                callback(message);
                return;
            }
        }
    }
}, function () { return document.querySelector(".live-songplayer.invisible") == null; });
(function () {
    function addCommand(name, callback) {
        commands.push({ name: name, callback: callback });
    }
    /*#require /client/commands.js#*/
})();
