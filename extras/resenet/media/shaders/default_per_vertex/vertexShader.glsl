#pragma include "$INSTALL/media/shaders/commonGLSL.h"

attribute vec3 position;
attribute vec3 normal;
attribute vec2 texCoord0;

void main()
{
    // Transform vertex.
	vec4 inPos = vec4( position.xyz, 1.0 );
    gl_Position = inPos * worldViewProjMat;

    // Calcuate diffuse lighting.
    float diffuse = lambertian( normal, localLightVector );
    // Copy the UV coords.
    vec2 inUV = vec2( texCoord0.x, 1.0 - texCoord0.y );

    // Calcuate specular lighting.
#ifdef SPECULAR_LIGHTING
    float specular = phong( position, normal, localCameraPos, localLightVector, specularPower );
#else
    float specular = 0.0;
#endif

    gl_TexCoord[0] = vec4( inUV.x, inUV.y, diffuse, specular );

#ifdef SHADOW_MAPPING_SIMPLE
    // Tranform position to directional lights post projection space.
    // They will be used on the pixel shader for shadow mapping.
    gl_TexCoord[1] = inPos * lightWorldViewProjMat;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    gl_TexCoord[1] = inPos * lightWorldViewProjMat;
    gl_TexCoord[2] = inPos * lightWorldViewMat;
#endif

}
