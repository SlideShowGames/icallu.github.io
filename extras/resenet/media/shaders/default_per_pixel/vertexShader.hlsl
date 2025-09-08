#include "$INSTALL/media/shaders/commonHLSL.h"

struct VS_INPUT
{
    float3 Position : POSITION;
    float3 Normal : NORMAL;
#ifdef NORMAL_MAPPING
    float3 Tangent : TANGENT;
    float3 Binormal : BINORMAL;
#endif
    float2 UV : TEXCOORD0;
};

struct VS_OUTPUT 
{
    float4 Position : POSITION;
    float4 PositionU : TEXCOORD0;
    float4 NormalV : TEXCOORD1;
#ifdef NORMAL_MAPPING
    float3 Tangent : TANGENT;
    float3 Binormal : BINORMAL;
#endif
	float4 lightProjPos : TEXCOORD2;
	float4 lightSpacePos : TEXCOORD3;
};

VS_OUTPUT main( VS_INPUT IN )
{
    VS_OUTPUT OUT;
    
    // Transform vertex.
    float4 inPos = float4( IN.Position, 1.0 );
    OUT.Position = mul( inPos, worldViewProjMat );

    // Pass position, normal and UV to pixel shader.
    OUT.PositionU = float4( IN.Position.xyz, IN.UV.x );
    OUT.NormalV = float4( IN.Normal.xyz, IN.UV.y );
    
#ifdef NORMAL_MAPPING
    OUT.Tangent = IN.Tangent.xyz;
    OUT.Binormal = IN.Binormal.xyz;
#endif

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

