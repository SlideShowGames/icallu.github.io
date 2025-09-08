#include "$INSTALL/media/shaders/commonHLSL.h"

struct VS_INPUT
{
    float3 Position : POSITION;
    float3 Normal : NORMAL;
    float2 UV : TEXCOORD0;
};

struct VS_OUTPUT 
{
    float4 Position : POSITION;
    float4 UVDiffuseSpecular : TEXCOORD0;
#ifdef SHADOW_MAPPING_SIMPLE
	float4 lightProjPos : TEXCOORD1;
#elif SHADOW_MAPPING_EXPONENTIAL
	float4 lightProjPos : TEXCOORD1;
	float4 lightSpacePos : TEXCOORD2;
#endif
};

VS_OUTPUT main( VS_INPUT IN )
{
    VS_OUTPUT OUT;
    
    // Transform vertex.
	float4 inPos = float4( IN.Position.xyz, 1.0 );
    OUT.Position = mul( inPos, worldViewProjMat );

    // Calcuate diffuse lighting.
    float diffuse = lambertian( IN.Normal, localLightVector );

    // Calcuate specular lighting.
#ifdef SPECULAR_LIGHTING
    float specular = phong( IN.Position, IN.Normal, localCameraPos, localLightVector, specularPower );
#else
    float specular = 0.0;
#endif

    OUT.UVDiffuseSpecular = float4( IN.UV.x, IN.UV.y, diffuse, specular );

#ifdef SHADOW_MAPPING_SIMPLE
    // Tranform position to directional lights post projection space.
	// They will be used on the pixel shader for shadow mapping.
    OUT.lightProjPos = mul( inPos, lightWorldViewProjMat );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    OUT.lightProjPos = mul( inPos, lightWorldViewProjMat );
    OUT.lightSpacePos = mul( inPos, lightWorldViewMat );
#endif

    return OUT;
}
