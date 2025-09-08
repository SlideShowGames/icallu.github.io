#include "$INSTALL/media/shaders/commonHLSL.h"

struct VS_INPUT
{
    float3 Position : POSITION;
};

struct VS_OUTPUT 
{
    float4 Position : POSITION;
#ifdef SHADOW_MAPPING_SIMPLE
    float2 depthZW  : TEXCOORD0;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    float4 lightSpacePos  : TEXCOORD0;
#endif
};

VS_OUTPUT main( VS_INPUT IN )
{
    VS_OUTPUT OUT;
    OUT.Position = mul( float4( IN.Position.xyz, 1.0f ), lightWorldViewProjMat );
#ifdef SHADOW_MAPPING_SIMPLE
    OUT.depthZW = OUT.Position.zw;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    OUT.lightSpacePos = mul( float4( IN.Position.xyz, 1.0f ), lightWorldViewMat );
#endif
    return OUT;
}
