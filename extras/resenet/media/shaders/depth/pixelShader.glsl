#pragma include "$INSTALL/media/shaders/commonGLSL.h"

void main()
{
#ifdef SHADOW_MAPPING_SIMPLE
    vec2 posZW = gl_TexCoord[0].xy;
    float depth = encodeShadowMapDepth( posZW );
    gl_FragColor = pack4x8BitFloat( depth );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    vec3 posInLightSpace = gl_TexCoord[0].xyz;
    float depth = encodeExponentialShadowMapDepth( posInLightSpace, lightNearFarPlane.x, lightNearFarPlane.y );
    gl_FragColor = pack4x8BitFloat( depth );
#endif
}
