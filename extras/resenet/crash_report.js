function stringToUint8Array(str)
{
    var buf = new Uint8Array(str.length);
    for (var i=0, strLen=str.length; i<strLen; i++)
    {
        buf[i] = str.charCodeAt(i);
    }
    return buf;
}

function gatherGpuInfo()
{
    var gpu_info = "";
    try
    {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if( !gl )
            return "Your system doesn't support WebGL.";

        var vendor = gl.getParameter( gl.VENDOR );
        if( vendor )
            gpu_info += "GL_VENDOR: " + vendor + "\n"
        else
            gpu_info += "GL_VENDOR: None\n"

        var renderer = gl.getParameter( gl.RENDERER );
        if( renderer )
            gpu_info += "GL_RENDERER: " + renderer + "\n"
        else
            gpu_info += "GL_RENDERER: None\n"

        var version = gl.getParameter( gl.VERSION );
        if( version )
            gpu_info += "GL_VERSION: " + version + "\n"
        else
            gpu_info += "GL_VERSION: None\n"

        var glsl_version = gl.getParameter( gl.SHADING_LANGUAGE_VERSION );
        if( glsl_version )
            gpu_info += "GL_SHADING_LANGUAGE_VERSION: " + glsl_version + "\n"
        else
            gpu_info += "GL_SHADING_LANGUAGE_VERSION: None\n"
    }
    catch (e)
    {
        gpu_info += "ERROR, could not get GPU info."
    }

    return gpu_info;
}

function encodeLV(data) {
    var dataArray = new Uint8Array(4 + data.length)
    dataArray[0] = (data.length >> 24) & 0xff;
    dataArray[1] = (data.length >> 16) & 0xff;
    dataArray[2] = (data.length >> 8) & 0xff;
    dataArray[3] = data.length & 0xff;
    dataArray.set( data, 4 )
    return dataArray;
}

function encodeCrashReportSegment(name, data) {
    nameArray = encodeLV(stringToUint8Array(name))
    dataArray = encodeLV(data)

    var finalArray = new Uint8Array(nameArray.length + dataArray.length)
    finalArray.set( nameArray )
    finalArray.set( dataArray, nameArray.length )
    return finalArray
}

function sendDumpInfo(data, hostname, url)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', "http://" + hostname + url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/octet-stream");
    xmlhttp.send(data);
}

function onReencodeCrashReport(platform, decodedMessage, reason, gpuInfo)
{
    // Inflate blocks if client has not compressed the data.
    try {
        var decompressed = pako.inflate(decodedMessage.data);
    }
    catch (err) {
        console.log(err);
        sendDumpInfo(decodedMessage.data, decodedMessage.hostname, decodedMessage.url)
        return
    }

    var platformName = "platform.txt"
    var platformInfo = "OS: " + platform.os + "\n"
    platformInfo += "Arch: " + platform.arch + "\n"
    platformInfo += "NaCl Arch: " + platform.nacl_arch + "\n"
    platformInfo += "\n" + gpuInfo + "\n"
    var platformInfoArray = encodeCrashReportSegment( platformName, stringToUint8Array(platformInfo) )

    var finalMessage = new Uint8Array(decompressed.length + platformInfoArray.length)
    finalMessage.set( decompressed )
    finalMessage.set( platformInfoArray, decompressed.length )

    var compressed = pako.deflate(finalMessage);
    sendDumpInfo(compressed, decodedMessage.hostname, decodedMessage.url)
}

function sendCrashReport(message, reason)
{
    decodedMessage = parseSendCrashReportMessage(message);
    gpuInfo = gatherGpuInfo()

    chrome.runtime.getPlatformInfo(function(platform){
        onReencodeCrashReport(platform, decodedMessage, reason, gpuInfo) })
}

function sendCrashReportWithoutStack(text, reason)
{
    var messageData = encodeCrashReportSegment("message.txt", stringToUint8Array(text))
    var reasonData = encodeCrashReportSegment("reportType", stringToUint8Array(reason))
    var osData = encodeCrashReportSegment("OS", stringToUint8Array("NaCl"))

    var finalMessage = new Uint8Array(messageData.length + reasonData.length + osData.length)
    finalMessage.set( messageData )
    finalMessage.set( reasonData, messageData.length )
    finalMessage.set( osData, messageData.length + reasonData.length )

    var decodedMessage = {
        hostname: "crash.senetonline.com",
        port: 80,
        url: "/cgi-bin/crash_report.py",
        data: pako.deflate(finalMessage)
    }
    gpuInfo = gatherGpuInfo()

    chrome.runtime.getPlatformInfo(function(platform){
        onReencodeCrashReport(platform, decodedMessage, reason, gpuInfo) })
}
