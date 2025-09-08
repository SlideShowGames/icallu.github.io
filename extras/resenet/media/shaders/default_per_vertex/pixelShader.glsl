#pragma include "$INSTALL/media/shaders/commonGLSL.h"


void main()
{
    // Fetch color from texture.
    vec2 inUV = gl_TexCoord[0].xy;
    vec4 texColor = texture2D( colorMap, inUV );
#ifdef APPLY_COLOR
    texColor.xyz = texColor.xyz + color;
#endif

#ifdef SHADOW_MAPPING_SIMPLE
    vec4 posInLightProjSpace = gl_TexCoord[1];
    float lightShadowFactor = doShadowMapping( posInLightProjSpace, shadowMap, shadowBias );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    vec4 posInLightProjSpace = gl_TexCoord[1];
    vec4 posInLightSpace = gl_TexCoord[2];
    float lightShadowFactor = doExponentialShadowMapping( posInLightProjSpace, posInLightSpace,
                                      expShadowMap, shadowDarkeningFactor,
                                      lightNearFarPlane.x, lightNearFarPlane.y );
#else
    const float lightShadowFactor = 1.0;
#endif

    // Ambient
    vec4 ambient = ambientLightColor * texColor;
    
    // Calculate light contribution.
    float lambertian = gl_TexCoord[0].z;
    vec4 diffuse = lambertian * lightColor * texColor;
    
    // Specular
#ifdef SPECULAR_LIGHTING
    float phong = gl_TexCoord[0].w;
    vec4 specular = phong * specularMaterial;
#else
    const vec4 specular = vec4( 0.0, 0.0, 0.0, 0.0 );
#endif

    // Set the final pixel color.
    gl_FragColor = ambient + lightShadowFactor * ( diffuse + specular );

#ifdef APPLY_OPACITY
    gl_FragColor.w = texColor.w * opacity;
#endif
}
