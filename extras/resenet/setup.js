aspectRatio = 16 / 9;
minSupportedTextureSize = 512;

filesToDownload =
"settings_template.xml \
localhost_50001_serverdb_template.db \
<media \
    <fonts DejaVu% Serif.ttf \
           Caesar% Dressing.ttf \
           Mariana.ttf \
           Scada.ttf> \
    <meshes \
        <senet \
            <low \
                <board  depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml> \
                <marker squareDestInvalid_mesh.xml \
                        squareDest_mesh.xml \
                        squareMiddle_mesh.xml \
                        squareSource_mesh.xml \
                        thinSquareDestInvalid_mesh.xml \
                        thinSquareDest_mesh.xml \
                        thinSquareMiddle_mesh.xml \
                        thinSquareSource_mesh.xml \
                        tryMove_mesh.xml> \
                <piece1 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml> \
                <piece2 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml> \
                <stick  mesh.xml> \
                <table  mesh.xml> \
            > \
            <medium \
                <board  depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml> \
                <marker squareDestInvalid_mesh.xml \
                        squareDest_mesh.xml \
                        squareMiddle_mesh.xml \
                        squareSource_mesh.xml \
                        thinSquareDestInvalid_mesh.xml \
                        thinSquareDest_mesh.xml \
                        thinSquareMiddle_mesh.xml \
                        thinSquareSource_mesh.xml \
                        tryMove_mesh.xml> \
                <piece1 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml> \
                <piece2 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml> \
                <stick  mesh.xml> \
                <table  mesh.xml> \
            > \
            <high \
                <board  depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        vertexBuffer_tangents.xml \
                        vertexDeclaration_tangents.xml> \
                <marker squareDestInvalid_mesh.xml \
                        squareDest_mesh.xml \
                        squareMiddle_mesh.xml \
                        squareSource_mesh.xml \
                        thinSquareDestInvalid_mesh.xml \
                        thinSquareDest_mesh.xml \
                        thinSquareMiddle_mesh.xml \
                        thinSquareSource_mesh.xml \
                        depthVertexDeclaration.xml \
                        tryMove_mesh.xml \
                        indexBuffer.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml> \
                <piece1 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml \
                        vertexBuffer_tangents.xml \
                        vertexDeclaration_tangents.xml> \
                <piece2 depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml \
                        vertexBuffer_tangents.xml \
                        vertexDeclaration_tangents.xml> \
                <stick  depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        silhouetteVertexDeclaration.xml \
                        vertexBuffer_tangents.xml \
                        vertexDeclaration_tangents.xml> \
                <table  depthVertexDeclaration.xml \
                        indexBuffer.xml \
                        mesh.xml \
                        vertexBuffer.xml \
                        vertexDeclaration.xml \
                        vertexBuffer_tangents.xml \
                        vertexDeclaration_tangents.xml> \
            > \
        > \
    > \
    <shaders \
        <default_per_vertex pixelShader.essl \
                           pixelShader.glsl \
                           pixelShader.hlsl \
                           shaderProgramCompilation.xml \
                           shaderProgramCompilationOpacity.xml \
                           shaderProgram.xml \
                           shaderProgramOpacity.xml \
                           vertexShader.essl \
                           vertexShader.glsl \
                           vertexShader.hlsl> \
        <default_per_pixel pixelShader.essl \
                           pixelShader.glsl \
                           pixelShader.hlsl \
                           shaderProgramCompilation.xml \
                           shaderProgramCompilationOpacity.xml \
                           shaderProgram.xml \
                           shaderProgramOpacity.xml \
                           vertexShader.essl \
                           vertexShader.glsl \
                           vertexShader.hlsl> \
        <silhouette pixelShader.essl \
                    pixelShader.glsl \
                    pixelShader.hlsl \
                    shaderProgramCompilation.xml \
                    shaderProgram.xml \
                    vertexShader.essl \
                    vertexShader.glsl \
                    vertexShader.hlsl> \
        <depth      pixelShader.essl \
                    pixelShader.glsl \
                    pixelShader.hlsl \
                    shaderProgramCompilation.xml \
                    shaderProgram.xml \
                    vertexShader.essl \
                    vertexShader.glsl \
                    vertexShader.hlsl> \
        commonHLSL.h \
        commonGLSL.h \
        commonESSL.h \
    > \
    <sounds \
        <gui    buttonClick.ogg \
                buttonOver.ogg \
                quickMatchSuccess.ogg \
                quickMatchFailure.ogg> \
        <senet  defeat.ogg \
                invalidMove.ogg \
                playerBoxHighlight.ogg \
                pieceExited.ogg \
                piecesPlaced.ogg \
                stickCollision1.ogg \
                stickCollision2.ogg \
                stickHighlight.ogg \
                validMove.ogg \
                waterMove.ogg \
                noMove.ogg \
                playAgain.ogg \
                intro.ogg \
                turnOrderTie.ogg \
                outOfTime.ogg \
                victory.ogg> \
        mainMusic.ogg \
    > \
    <textures \
        icon.png\
        <gui    atlas1.png \
                atlas2.png \
                atlas3.png \
                intro.png \
                arrowCursor.png \
                grayArrowCursor.png \
                grabCursor.png \
                grayGrabCursor.png \
                handCursor.png \
                grayHandCursor.png > \
        <senet \
            piece1.png \
            piece1Normals.png \
            piece2.png \
            piece2Normals.png \
            board.png \
            boardNormals.png \
            stick.png \
            stickNormals.png \
            <marker squareMiddle.png \
                    squareSource.png \
                    squareDestInvalid.png \
                    squareDest.png \
                    thinSquareMiddle.png \
                    thinSquareSource.png \
                    thinSquareDestInvalid.png \
                    thinSquareDest.png \
                    tryMove.png>\
            <table  texture.png \
                    normal.png> \
        > \
    > \
>";

function calcBrowserInnerDimensions()
{
    dimensions = new Object();
    dimensions.width = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    dimensions.height = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;
    return dimensions;
}

function normalizeDimensionsToAspectRatio( width, height )
{
    dimensions = new Object();
    if( width < aspectRatio * height )
    {
        dimensions.height = Math.round( width * ( 1 / aspectRatio ) );
        dimensions.width = width;
    }
    else
    {
        dimensions.width = Math.round( height * aspectRatio );
        dimensions.height = height;
    }
    return dimensions;
}

function calcNaClAppResolution()
{
    dimensions = new Object();
    dimensions.width = Math.floor(screen.width * 0.85);
    dimensions.height = Math.floor(screen.height * 0.85);
    aspectRatio = dimensions.width / dimensions.height;
    if(aspectRatio > 1.78)
        dimensions.width = Math.floor(dimensions.height * 1.78)
    else if(aspectRatio < 1.25)
        dimensions.height = Math.floor(dimensions.width / 1.25)
    return dimensions;
}


function scaleCss( object, newDimensions )
{
    object.css( {"width":newDimensions.width.toString() + "px",
        "height":newDimensions.height.toString() + "px"} );
}

function translateCss( object, newPos )
{
    object.css( {"left":newPos.left.toString() + "px",
        "top":newPos.top.toString() + "px"} );
}


function calcNaClCssDimensions( browserDims )
{
    dimensions = new Object();
    dimensions.width = browserDims.width;
    dimensions.height = browserDims.height;
    return dimensions;
}

function calcNaClCssPosition( browserDims, cssDims )
{
    position = new Object();
    position.top = Math.round( ( browserDims.height - cssDims.height ) / 2 );
    position.left = Math.round( ( browserDims.width - cssDims.width ) / 2 );
    return position;
}


function calcIntroCssDimensions( naclDims )
{
    //ancientlibrary::core::sRectI32 introQuadRect( 0, 800, 100, 500 );
    introLeft = 50;
    introRight = 750;
    introTop = 125;
    introBottom = 475;

    introWidth = introRight - introLeft;
    introHeight = introBottom - introTop;

    const ORIG_SCREEN_WIDTH = 800;
    const ORIG_SCREEN_HEIGHT = 600;
    scale = naclDims.height / ORIG_SCREEN_HEIGHT;

    dimensions = new Object();
    dimensions.width = introWidth * scale;
    dimensions.height = introHeight * scale;
    return dimensions;
}

function calcIntroCssPosition( windowDims, cssDims )
{
    position = new Object();
    position.top = Math.round( ( windowDims.height - cssDims.height ) / 2 );
    position.left = Math.round( ( windowDims.width - cssDims.width ) / 2 );
    return position;
}

function resizeNaClPage()
{
    innerDimensions = calcBrowserInnerDimensions();

    naclDimensions = calcNaClCssDimensions( innerDimensions );
    scaleCss( $("#nacl_inst"), naclDimensions );
    position = calcNaClCssPosition( innerDimensions, naclDimensions );
    translateCss( $("#nacl_inst"), position );

    introDimensions = calcIntroCssDimensions( innerDimensions );
    scaleCss( $("#load_prog"), introDimensions );
    position = calcIntroCssPosition( innerDimensions, introDimensions );
    translateCss( $("#load_prog"), position );

    errorDimensions = new Object();
    errorDimensions.width = 600;
    errorDimensions.height = 600;
    scaleCss( $("#error_template"), errorDimensions );
    position = calcIntroCssPosition( innerDimensions, errorDimensions );
    translateCss( $("#error_template"), position );
}

function hideNaClPage()
{
    $("#nacl_inst").hide();
}

function showLoadingPage()
{
    $("#load_prog").show();
}

function hideLoadingPage()
{
    $("#load_prog").hide();
}

function showErrorPage(msg)
{
    $("#error_text").text(msg);
    $('#error_template').show();
}

function hideErrorPage()
{
    $('#error_template').hide();
}

function loadStart(event)
{
    showLoadingPage();
}

function progress(event)
{
}

function loadEnd(event)
{
}

function error(event)
{
    hideLoadingPage();
    showErrorPage("Error! Failed to load page.");
}

function getSenetWindowId()
{
    var manifest = chrome.runtime.getManifest();
    return "SenetOnline" + manifest.version;
}

function handleMessage(event)
{
    if(event.data === null)
        return;

    var msg_type = getMsgType(event.data);
    switch(msg_type)
    {
    case eMsgType.RESIZE_WINDOW:
        //resizeWindow(event.data);
        break;
    case eMsgType.OPEN_WINDOW:
        openWindow(event.data);
        break;
    case eMsgType.SEND_CRASH_REPORT:
        sendCrashReport(event.data, "crash");
        break;
    case eMsgType.CRASH:
        console.log("Application crashed");
        hideLoadingPage();
        hideNaClPage();
        showErrorPage("Oops... Application has crashed.");
        break;
    case eMsgType.ENTRY:
        break;
    case eMsgType.GRAPHICS_DEVICE_READY:
        hideLoadingPage();
        break;
    case eMsgType.HTTP_POST:
        decodedMessage = parseHttpPostRequestMessage(event.data)
        handleHttpPostRequestMessage(decodedMessage, document.getElementById('nacl_inst'))
        break;
    case eMsgType.EXIT:
        console.log("Application exited");
        exitCodeStr = event.data.substring(4);
        if(exitCodeStr === "0")
            chrome.app.window.get(getSenetWindowId()).close()
        else
        {
            hideLoadingPage();
            hideNaClPage();
            if(exitCodeStr === "2")
                showErrorPage("Oops... Application has exited unexpectedly. Your system supports WebGL, but Chrome may have your graphics driver blacklisted. Updating your graphics driver may resolve the issue.");
            else
                showErrorPage("Oops... Application has exited unexpectedly with code " + exitCodeStr + ".");
        }
        break;
    case eMsgType.UNKNOWN:
    default:
        console.log(event.data);
        break;
    }
}

function checkRequirements()
{
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if( !gl )
        return "Your system doesn't support WebGL.";

    webGlMaxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if(webGlMaxTexSize < minSupportedTextureSize)
        return "Your graphics driver doesn't support textures sizes bigger than " + webGlMaxTexSize.toString() + ".";

    // For some reason driver says that GL_OES_rgb8_rgba8 extension is not supported in Javascript.
    // However inside client the extension is supported.
    //if(gl.getExtension('GL_OES_rgb8_rgba8') === null)
    //    return "Your graphics driver doesn't support GL_OES_rgb8_rgba8 extension";

    return null;
}

function initNaClPage()
{
    result = checkRequirements();
    if(result === null)
    {
        var manifest = chrome.runtime.getManifest();
        var current_version = manifest.version;

        naclAppDimensions = calcNaClAppResolution();
        $('body').append('<embed name="nacl_module" id="nacl_inst" screen_width=' +
               screen.width.toString() + ' screen_height=' +
               screen.height.toString() +
               ' version=' + current_version +
               ' timezone_offset=' + getTimezoneOffsetInMinutes().toString() +
               ' file_system_size=10240 src="client.nmf" type="application/x-nacl"' +
               ' files_to_download="' + filesToDownload + '"/>');

        nacl_inst = document.getElementById('nacl_inst');
        nacl_inst.addEventListener('loadstart', loadStart, true);
        nacl_inst.addEventListener('progress', progress, true);
        nacl_inst.addEventListener('loadend', loadEnd, true);
        nacl_inst.addEventListener('error', error, true);
        nacl_inst.addEventListener('message', handleMessage, true);

        resizeNaClPage();
        $(window).resize(resizeNaClPage);
    }
    else
    {
        showErrorPage("Error! " + result);
        sendCrashReportWithoutStack("Failed to start application, no backtrace available. Error: " + result, "init");
    }
}

$(document).ready(initNaClPage);
