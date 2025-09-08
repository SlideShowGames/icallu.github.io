#pragma include "$INSTALL/media/shaders/commonGLSL.h"

attribute vec3 position;
attribute vec3 normal;

void main()
{
    gl_Position = vec4( position + silhouetteStrength * normal, 1.0 ) * worldViewProjMat;
}
