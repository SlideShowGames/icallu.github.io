#include "$INSTALL/media/shaders/commonHLSL.h"

struct PS_INPUT
{
    float4 Position : POSITION;
    float4 UVDiffuseSpecular : TEXCOORD0;
	float4 lightProjPos : TEXCOORD1;
	float4 lightSpacePos : TEXCOORD2;
};

struct PS_OUTPUT
{
    float4 FinalColor : COLOR0;
};

PS_OUTPUT main( PS_INPUT IN )
{
    PS_OUTPUT OUT;
    
    // Fetch color from texture.
    float2 inUV = IN.UVDiffuseSpecular.xy;
    float4 texColor = tex2D( colorMap, inUV );
#ifdef APPLY_COLOR
    texColor.xyz = texColor.xyz + color;
#endif

#ifdef SHADOW_MAPPING_SIMPLE
    float4 posInLightProjSpace = IN.lightProjPos;
    float lightShadowFactor = doShadowMapping( posInLightProjSpace, shadowMap, shadowBias );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    float4 posInLightProjSpace = IN.lightProjPos;
    float4 posInLightSpace = IN.lightSpacePos;
    float lightShadowFactor = doExponentialShadowMapping( posInLightProjSpace, posInLightSpace,
                                      expShadowMap, shadowDarkeningFactor,
                                      lightNearFarPlane.x, lightNearFarPlane.y );
#else
    const float lightShadowFactor = 1.0;
#endif

    // Ambient
    float4 ambient = ambientLightColor * texColor;
    
    // Calculate light contribution.
    float lambertian = IN.UVDiffuseSpecular.z;
    float4 diffuse = lambertian * lightColor * texColor;
    
    // Specular
#ifdef SPECULAR_LIGHTING
    float phong = IN.UVDiffuseSpecular.w;
    float4 specular = phong * specularMaterial;
#else
    const float4 specular = float4( 0.0, 0.0, 0.0, 0.0 );
#endif

    // Set the final pixel color.
    OUT.FinalColor = ambient + lightShadowFactor * ( diffuse + specular );

#ifdef APPLY_OPACITY
    OUT.FinalColor.w = texColor.w * opacity;
#endif

    return OUT;
}

