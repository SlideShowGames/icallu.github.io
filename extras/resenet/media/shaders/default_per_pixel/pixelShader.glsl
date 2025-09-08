#pragma include "$INSTALL/media/shaders/commonGLSL.h"


void main()
{
    // Fetch color from texture.
    vec2 inUV = vec2( gl_TexCoord[0].w, gl_TexCoord[1].w );
    vec4 texColor = texture2D( colorMap, inUV );
#ifdef APPLY_COLOR
    texColor.xyz = texColor.xyz + color;
#endif

#ifdef SHADOW_MAPPING_SIMPLE
    vec4 posInLightProjSpace = gl_TexCoord[4];
    float lightShadowFactor = doShadowMapping( posInLightProjSpace, shadowMap, shadowBias );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    vec4 posInLightProjSpace = gl_TexCoord[4];
    vec4 posInLightSpace = gl_TexCoord[5];
    float lightShadowFactor = doExponentialShadowMapping( posInLightProjSpace, posInLightSpace,
                                      expShadowMap, shadowDarkeningFactor,
                                      lightNearFarPlane.x, lightNearFarPlane.y );
#else
    const float lightShadowFactor = 1.0;
#endif

    // Ambient
    vec4 ambient = ambientLightColor * texColor;

    // Calculate light contribution.
#ifdef NORMAL_MAPPING
    vec3 tangent = gl_TexCoord[2].xyz;
    vec3 binormal = gl_TexCoord[3].xyz;
    vec3 normalIn = gl_TexCoord[1].xyz;
    vec3 normal = doNormalMapping( normalize( tangent ),
                                   normalize( binormal ),
                                   normalize( normalIn ),
                                   normalMap, inUV );
#else
    vec3 normal = gl_TexCoord[1].xyz;
#endif
    vec4 diffuse = lambertian( normal, localLightVector ) * lightColor * texColor;

    // Specular
#ifdef SPECULAR_LIGHTING
    vec3 position = gl_TexCoord[0].xyz;
    vec4 specular = phong( position, normal, localCameraPos, localLightVector, specularPower ) * specularMaterial;
#else
    const vec4 specular = vec4( 0.0, 0.0, 0.0, 0.0 );
#endif

    // Set the final pixel color.
    gl_FragColor = ambient + lightShadowFactor * ( diffuse + specular );

#ifdef APPLY_OPACITY
    gl_FragColor.w = opacity * texColor.w;
#endif
}
