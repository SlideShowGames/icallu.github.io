#include "$INSTALL/media/shaders/commonHLSL.h"

struct VS_INPUT
{
    float3 Position : POSITION;
    float3 Normal : NORMAL;
};

struct VS_OUTPUT 
{
    float4 Position : POSITION;
};

VS_OUTPUT main( VS_INPUT IN )
{
    VS_OUTPUT OUT;
    OUT.Position = mul( float4( IN.Position + silhouetteStrength * IN.Normal, 1.0f ), worldViewProjMat );
    return OUT;
}
