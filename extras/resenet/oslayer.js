var eMsgType = {
    CRASH: 'CRASH',
    SEND_CRASH_REPORT: 'SEND_CRASH_REPORT',
    RESIZE_WINDOW: 'RESIZE_WINDOW',
    OPEN_WINDOW: 'OPEN_WINDOW',
    ENTRY: 'ENTRY',
    GRAPHICS_DEVICE_READY: 'GRAPHICS_DEVICE_READY',
    EXIT: 'EXIT',
    HTTP_POST: 'HTTP_POST',
    UNKNOWN: 'UNKNOWN'
};

function _parseResizeWindowMessage(message) {
    message = message.substring(eMsgType.RESIZE_WINDOW.length);
    if(message.charAt(0) === '_')
    {
        message = message.substring(1)
        width = parseInt(message.substring(0, message.indexOf(":")));
        message = message.substring(message.indexOf(":") + 1)

        height = parseInt(message.substring(0, message.indexOf(":")));
        message = message.substring(message.indexOf(":") + 1)

        fullscreen = message;
        return [width, height, fullscreen];
    }
}

function _resizeWindow(winInfo)
{
    var width = winInfo[0];
    var height = winInfo[1];
    var fullscreen = winInfo[2];

    var size = [width, height]
    var screensize = [screen.availWidth, screen.availHeight]
    var screenpos = [0, 0]
    var coords = [screenpos[0] + Math.floor((screensize[0] - size[0]) / 2), screenpos[1] + Math.floor((screensize[1] - (size[1] * 1.25)) / 2)];

    console.debug('Resizing window[' + width + 'x' + height +'] fullscreen: \'' + fullscreen + '\'');
    var appWindow = chrome.app.window.current();
    if(fullscreen === 'true')
        appWindow.fullscreen();
    // For some reason if a fullscreen windows has lost focus, isFullscreen() returns false.
    else if(appWindow.isFullscreen() || appWindow.isMaximized() || appWindow.isMinimized())
    {
        appWindow.restore();
        appWindow.onRestored.addListener( function() {
                appWindow.setBounds( { width: width,
                                       height: height } );
                console.log("onRestored()");
            } );
    }
    else
    {
        appWindow.setBounds( { width: width,
                               height: height } );
    }
}

function _parseOpenWindowMessage(message) {
    message = message.substring(eMsgType.OPEN_WINDOW.length);
    if(message.charAt(0) === '_')
    {
        message = message.substring(1)
        width = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        height = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        url = message;
        return [url, width, height];
    }
    else
    {
        url = message.substring(1);
        return [url];
    }
}

function _spawnWindow(winInfo)
{
    if(winInfo.length === 1)
    {
        console.debug('Opening window at \'' + url + '\'');
        return window.open(url);
    }
    else
    {
        var width = winInfo[1];
        var height = winInfo[2];

        var size = [width, height]
        var mysize = [window.outerWidth, window.outerHeight]
        var mypos = [window.screenX, window.screenY]
        var coords = [mypos[0] + Math.floor((mysize[0] - size[0]) / 2), mypos[1] + Math.floor((mysize[1] - (size[1] * 1.25)) / 2)];

        console.debug('Opening window[' + width + 'x' + height +'] at \'' + url + '\'');
        return window.open(url, "", "width=" + width + ",height=" + height + ",left=" + coords[0] + ",top=" + coords[1]);
    }
}


function getMsgType(message)
{
    if(message.substring(0, eMsgType.CRASH.length) === eMsgType.CRASH)
        return eMsgType.CRASH;
    else if(message.substring(0, eMsgType.SEND_CRASH_REPORT.length) === eMsgType.SEND_CRASH_REPORT)
        return eMsgType.SEND_CRASH_REPORT;
    else if(message.substring(0, eMsgType.RESIZE_WINDOW.length) === eMsgType.RESIZE_WINDOW)
        return eMsgType.RESIZE_WINDOW;
    else if(message.substring(0, eMsgType.OPEN_WINDOW.length) === eMsgType.OPEN_WINDOW)
        return eMsgType.OPEN_WINDOW;
    else if(message.substring(0, eMsgType.ENTRY.length) === eMsgType.ENTRY)
        return eMsgType.ENTRY;
    else if(message.substring(0, eMsgType.GRAPHICS_DEVICE_READY.length) === eMsgType.GRAPHICS_DEVICE_READY)
        return eMsgType.GRAPHICS_DEVICE_READY;
    else if(message.substring(0, eMsgType.EXIT.length) === eMsgType.EXIT)
        return eMsgType.EXIT;
    else if(message.substring(0, eMsgType.HTTP_POST.length) === eMsgType.HTTP_POST)
        return eMsgType.HTTP_POST;
    else
        return eMsgType.UNKNOWN;
}

function resizeWindow(message)
{
    var winInfo = _parseResizeWindowMessage(message);
    _resizeWindow(winInfo);
}

function openWindow(message)
{
    var winInfo = _parseOpenWindowMessage(message);

    // Check if another window with the same url is already opened
    var url = winInfo[0];
    if( typeof openWindow.winRefs === 'undefined' )
        openWindow.winRefs = {};
    if( typeof openWindow.winRefs[url] === 'undefined' || openWindow.winRefs[url].closed )
    {
        console.debug('New window at \'' + url + '\'');
        openWindow.winRefs[url] = _spawnWindow(winInfo)
    }
    else
    {
        console.debug('Refocusing window at \'' + url + '\'');
        openWindow.winRefs[url].focus()
    }
}

function hexStringToUint8Array(str) {
    if( str.length % 2 != 0 )
        return

    var buf = new Uint8Array(str.length / 2);
    for (var i=0; i<buf.length; i++)
    {
        buf[i] = parseInt(str.substring(0, 2), 16);
        str = str.substring(2, str.length);
    }
    return buf;
}

function parseSendCrashReportMessage(message) {
    message = message.substring(eMsgType.SEND_CRASH_REPORT.length);
    if(message.charAt(0) === '_')
    {
        message = message.substring(1)

        hostname = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        port = parseInt(message.substring(0, message.indexOf(":")));
        message = message.substring(message.indexOf(":") + 1)

        url = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        data = hexStringToUint8Array(message);

        var decodedMessage = {
            hostname: hostname,
            port: port,
            url: url,
            data: data
        }

        return decodedMessage;
    }
}

function parseHttpPostRequestMessage(message) {
    message = message.substring(eMsgType.HTTP_POST.length);

    hostname = message.substring(0, message.indexOf(":"));
    message = message.substring(message.indexOf(":") + 1)

    port = parseInt(message.substring(0, message.indexOf(":")));
    message = message.substring(message.indexOf(":") + 1)

    url = message.substring(0, message.indexOf(":"));
    message = message.substring(message.indexOf(":") + 1)

    data = hexStringToUint8Array(message.substring(0, message.indexOf(":")));
    message = message.substring(message.indexOf(":") + 1)

    var headerArray = []
    var valueArray = []
    while(message.indexOf(":") > 0)
    {
        header = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        value = message.substring(0, message.indexOf(":"));
        message = message.substring(message.indexOf(":") + 1)

        headerArray.push(header);
        valueArray.push(value)
    }

    var decodedMessage = {
        hostname: hostname,
        port: port,
        url: url,
        data: data,
        headerArray: headerArray,
        valueArray: valueArray
    }

    return decodedMessage;
}

function handleHttpPostRequestMessage(message, nacl_inst) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', "http://" + message.hostname + ":" + message.port + message.url, true);

    for	(index = 0; index < message.headerArray.length; index++) {
        xmlhttp.setRequestHeader(message.headerArray[index], message.valueArray[index]);
    }

    xmlhttp.onreadystatechange = function()
    {
        if( xmlhttp.response === null )
            ret = "Failed"
        else
            ret = xmlhttp.status
        nacl_inst.postMessage('AL_HTTP_POST_RET:' + ret);
    }

    xmlhttp.send(message.data);
}

function getTimezoneOffsetInMinutes()
{
    var d = new Date()
    return -d.getTimezoneOffset();
}
