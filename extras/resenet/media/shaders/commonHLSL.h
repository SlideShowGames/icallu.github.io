#ifndef __COMMONHLSL_HEADER__

float4 pack4x8BitFloat( float fNormalizedValue )
{
	const float4 packFactors = { 1.0, 256.0, 65536.0, 16777216.0 };
	return frac( fNormalizedValue * packFactors );
}

float unpack4x8BitFloat( float4 packedValue )
{
	const float4 extractFactors = { 1.0, 0.00390625, 0.0000152587890625, 0.000000059604644775390625 };
	return dot( packedValue, extractFactors );
}

float lambertian( float3 normal, float3 lightVector )
{
    return max( 0.0, dot( normal, lightVector ) );
}

float phong( float3 position, float3 normal, float3 eyePos, float3 lightVector, float power )
{
    float3 posToEye = normalize( eyePos - position );
    float3 halfVector = normalize( lightVector + posToEye );
    float NdotH = max( 0.0, dot( normal, halfVector ) );
    return pow( NdotH, power );
}

float encodeShadowMapDepth( float2 posZW )
{
    // Normalize depth.
    return posZW.x / posZW.y;
}

float doShadowMapping( float4 posInLightProjSpace, sampler2D shadowMap, float shadowBias )
{
    // Normalize passed position.
    float3 normalizedPos = posInLightProjSpace.xyz / posInLightProjSpace.w;

    // Calculate uv and depth;
    float2 shadowMapUV = 0.5 * ( normalizedPos.xy + float2( 1.0, 1.0 ) );
    shadowMapUV.y = 1.0 - shadowMapUV.y;
    float depth = min( normalizedPos.z - shadowBias, 1.0 );

    // Sample from shadow map.
    float sampledDepth = unpack4x8BitFloat( tex2D( shadowMap, shadowMapUV ) );

    // Is pixel in shadow?
    float lightShadowFactor = float(depth <= sampledDepth);
    return lightShadowFactor;
}

float encodeExponentialShadowMapDepth( float3 posInLightSpace, float lightNearPlane, float lightFarPlane )
{
    return ( /*length( pos )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
}

float doExponentialShadowMapping( float4 posInLightProjSpace, float4 posInLightSpace,
                                  sampler2D shadowMap, float darkeningFactor,
                                  float lightNearPlane, float lightFarPlane )
{
    float3 normalizedPos = posInLightProjSpace.xyz / posInLightProjSpace.w;
    float2 shadowMapUV = 0.5 * ( normalizedPos.xy + float2( 1.0, 1.0 ) );
    shadowMapUV.y = 1.0 - shadowMapUV.y;
    float sampledDepth = unpack4x8BitFloat( tex2D( shadowMap, shadowMapUV ) );

    float fScaledDistanceToLight = ( /*length( posInLightSpace )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
    fScaledDistanceToLight = min( fScaledDistanceToLight, 1.0 );
    float fLightFactor = clamp( exp( darkeningFactor * ( sampledDepth - fScaledDistanceToLight ) ), 0.0, 1.0 );
    return fLightFactor;
}

float3 doNormalMapping( float3 tangent, float3 binormal, float3 normal, sampler2D normalMap, float2 uv )
{
    float3x3 TBN = float3x3( tangent, binormal, normal );
    float3 fetchedNormal = 2 * tex2D( normalMap, uv ).rgb - float3( 1, 1, 1 );
    fetchedNormal = mul( fetchedNormal, TBN );
    fetchedNormal = float3( fetchedNormal.x, fetchedNormal.z, fetchedNormal.y ); // Swap Y-Z
    fetchedNormal = normalize( fetchedNormal );
    return fetchedNormal;
}


float4x4 worldViewProjMat;
float4x4 lightWorldViewProjMat;
float4x4 lightWorldViewMat;
float2 lightNearFarPlane;
float3 localLightVector; // The opposite of light direction in local space
float3 localCameraPos; // The position of the camera in local space
float specularPower;

float shadowBias;
float shadowDarkeningFactor;
sampler2D shadowMap;
sampler2D expShadowMap;

sampler2D colorMap;
sampler2D normalMap;
float4 ambientLightColor;
float4 lightColor;
float4 specularMaterial;
float opacity;
float3 color;

float silhouetteStrength;
float4 silhouetteColor;



#endif
