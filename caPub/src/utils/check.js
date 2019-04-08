var handlers = {
    send: function (websocket, id) {
        let message = document.getElementById(id).value
        websocket.send(message)
    },
    SM9GetDevChange: function (websocket) {
        var msg = '{"function":"SM9GetDevChange"}'
        websocket.send(msg)
    },
    connect: function (websocket, port) {
        var msg = '{"function":"SM9Connect","port":' + port + '}'
        websocket.send(msg)
    },
    Disconnect: function (websocket, port) {
        var msg = '{"function":"SM9DisConnect","port":' + port + '}'
        websocket.send(msg)
    },
    SM9GetDevInfo: function (websocket, port) {
        var msg = '{"function": "SM9GetDevInfo","port": ' + port + '}'
        websocket.send(msg)
    },
    SM9ExportUserID: function (websocket, port) {
        var msg = '{"function": "SM9ExportUserID","isEncode": 0,"port": ' + port + '}'
        websocket.send(msg)
    },
    SM9Connect: function (websocket, port) {
        var msg = '{"function":"SM9Connect","port":' + port + '}'
        websocket.send(msg);
    },
    SM9VerifyPIN: function (websocket, port) {
        var msg = '{"function":"SM9VerifyPIN","port":' + port + ',"userType":1}'
        websocket.send(msg)
    },
    SM9GenerateRandom: function (websocket, port) {
        var msg = '{"function":"SM9GenerateRandom","port":' + port + ',"randLen":16}'
        websocket.send(msg)
    },
    SM9Digest: function (websocket, port, clientPlain) {
        var msg = '{"function":"SM9Digest","port":' + port + ',"digestMechanism":1,"indata":"' + clientPlain + '" ,"isEncode":0}'
        websocket.send(msg)
    },
    SM9PairSignData: function (websocket, port, digestedData) {
        var msg = '{"function":"SM9PairSignData","port":' + port + ',"indata":"' + digestedData + '" ,"isEncode":0,"isDigest":1}'
        websocket.send(msg)
    },
    SM9ExportPublicKey: function (websocket, port, pubkeyType) { // pubkeyType 1是签名2是加密
        var msg = '{"function":"SM9ExportPublicKey","port":' + port + ',"pubkeyType":' + pubkeyType + '}'
        websocket.send(msg)
    }
}
export default {
    handlers
}
/* var websocket = null;
var globalData = {}
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket('ws://127.0.0.1:10522')
    websocket.onerror = function () {
        alert('请注册USBKey控件')
    }
    websocket.send()
    websocket.onmessage = function (event) {
        var resp = JSON.parse(event.data)
        var funcType = resp.function
        var result = $.extend(globalData, handlers[funcType]())
    }
} */
