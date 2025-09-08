#pragma include "$INSTALL/media/shaders/commonGLSL.h"

attribute vec3 position;
attribute vec3 normal;
#ifdef NORMAL_MAPPING
attribute vec3 tangent;
attribute vec3 binormal;
#endif
attribute vec2 texCoord0;

void main()
{
    // Transform vertex.
    vec4 inPos = vec4( position.xyz, 1.0 );
    gl_Position = inPos * worldViewProjMat;

    // Copy the UV coords.
    vec2 inUV = vec2( texCoord0.x, 1.0 - texCoord0.y );

    // Pass position, normal and UV to pixel shader.
    gl_TexCoord[0] = vec4( position.xyz, inUV.x );
    gl_TexCoord[1] = vec4( normal.xyz, inUV.y );
    
#ifdef NORMAL_MAPPING
    gl_TexCoord[2].xyz = tangent;
    gl_TexCoord[3].xyz = binormal;
#endif

#ifdef SHADOW_MAPPING_SIMPLE
    // Tranform position to directional lights post projection space.
	// They will be used on the pixel shader for shadow mapping.
    gl_TexCoord[4] = inPos * lightWorldViewProjMat;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    gl_TexCoord[4] = inPos * lightWorldViewProjMat;
    gl_TexCoord[5] = inPos * lightWorldViewMat;
#endif
}
