#include "$INSTALL/media/shaders/commonHLSL.h"

struct PS_INPUT
{
#ifdef SHADOW_MAPPING_SIMPLE
    float2 depthZW  : TEXCOORD0;
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    float4 lightSpacePos  : TEXCOORD0;
#endif
};

struct PS_OUTPUT
{
    float4 FinalColor : COLOR0;
};

PS_OUTPUT main( PS_INPUT IN )
{
    PS_OUTPUT OUT;

#ifdef SHADOW_MAPPING_SIMPLE
    float depth = encodeShadowMapDepth( IN.depthZW );
    OUT.FinalColor = pack4x8BitFloat( depth );
#elif defined(SHADOW_MAPPING_EXPONENTIAL)
    float depth = encodeExponentialShadowMapDepth( IN.lightSpacePos.xyz, lightNearFarPlane.x, lightNearFarPlane.y );
    OUT.FinalColor = pack4x8BitFloat( depth );
#endif

    // Return.
    return OUT;
}
