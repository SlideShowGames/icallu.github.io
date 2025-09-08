#pragma include "$INSTALL/media/shaders/commonGLSL.h"

attribute vec3 position;

void main()
{
    gl_Position = vec4( position.xyz, 1.0 ) * lightWorldViewProjMat;
#ifdef SHADOW_MAPPING_SIMPLE
    gl_TexCoord[0].xy = gl_Position.zw;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    gl_TexCoord[0] = vec4( position.xyz, 1.0 ) * lightWorldViewMat;
#endif
}
