#ifndef __COMMONGLSL_HEADER__

vec4 pack4x8BitFloat( float fNormalizedValue )
{
    const vec4 packFactors = vec4( 1.0, 256.0, 65536.0, 16777216.0 );
    return fract( fNormalizedValue * packFactors );
}

float unpack4x8BitFloat( vec4 packedValue )
{
    const vec4 extractFactors = vec4( 1.0, 0.00390625, 0.0000152587890625, 0.000000059604644775390625 );
    return dot( packedValue, extractFactors );
}

float lambertian( vec3 normal, vec3 lightVector )
{
    return max( 0.0, dot( normal, lightVector ) );
}

float phong( vec3 position, vec3 normal, vec3 eyePos, vec3 lightVector, float power )
{
    vec3 posToEye = normalize( eyePos - position );
    vec3 halfVector = normalize( lightVector + posToEye );
    float NdotH = max( 0.0, dot( normal, halfVector ) );
    return pow( NdotH, power );
}

float encodeShadowMapDepth( vec2 posZW )
{
    // Normalize depth and make OpenGL post projection space simiral to DirectX.
    return 0.5 * ( 1.0 + posZW.x / posZW.y );
}

float doShadowMapping( vec4 posInLightProjSpace, sampler2D shadowMap, float shadowBias )
{
    // Normalize passed position.
    vec3 normalizedPos = 0.5 * ( posInLightProjSpace.xyz / posInLightProjSpace.w + vec3( 1.0, 1.0, 1.0 ) );

    // Sample from shadow map.
    vec2 shadowMapUV = normalizedPos.xy;
    float sampledDepth = unpack4x8BitFloat( texture2D( shadowMap, shadowMapUV ) );

    // Is pixel in shadow?
    float depth = min( normalizedPos.z - shadowBias, 1.0 );
    float fLightFactor = float(depth <= sampledDepth);
    return fLightFactor;
}

float encodeExponentialShadowMapDepth( vec3 posInLightSpace, float lightNearPlane, float lightFarPlane )
{
    return ( /*length( pos )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
}

float doExponentialShadowMapping( vec4 posInLightProjSpace, vec4 posInLightSpace,
                                  sampler2D shadowMap, float darkeningFactor,
                                  float lightNearPlane, float lightFarPlane )
{
    vec3 normalizedPos = 0.5 * ( posInLightProjSpace.xyz / posInLightProjSpace.w + vec3( 1.0, 1.0, 1.0 ) );
    vec2 shadowMapUV = normalizedPos.xy;
    float sampledDepth = unpack4x8BitFloat( texture2D( shadowMap, shadowMapUV ) );

    float fScaledDistanceToLight = ( /*length( posInLightSpace )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
    fScaledDistanceToLight = min( fScaledDistanceToLight, 1.0 );
    float fLightFactor = clamp( exp( darkeningFactor * ( sampledDepth - fScaledDistanceToLight ) ), 0.0, 1.0 );
    return fLightFactor;
}

vec3 doNormalMapping( vec3 tangent, vec3 binormal, vec3 normal, sampler2D normalMap, vec2 uv )
{
    mat3 TBN = mat3( tangent, binormal, normal ); // column major
    vec3 fetchedNormal = 2.0 * texture2D( normalMap, uv ).rgb - vec3( 1.0, 1.0, 1.0 );
    fetchedNormal = TBN * fetchedNormal; // column major
    fetchedNormal = vec3( fetchedNormal.x, fetchedNormal.z, fetchedNormal.y ); // Swap Y-Z
    fetchedNormal = normalize( fetchedNormal );
    return fetchedNormal;
}


uniform mat4 worldViewProjMat;
uniform mat4 worldViewMat;
uniform mat4 lightWorldViewProjMat;
uniform mat4 lightWorldViewMat;
uniform vec2 lightNearFarPlane;
uniform vec3 localLightVector; // The opposite of light direction in local space
uniform vec3 localCameraPos; // The position of the camera in local space
uniform float specularPower;

uniform float shadowBias;
uniform float shadowDarkeningFactor;
uniform sampler2D shadowMap;
uniform sampler2D expShadowMap;

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform vec4 ambientLightColor;
uniform vec4 lightColor;
uniform vec4 specularMaterial;
uniform float opacity;
uniform vec3 color;

uniform float silhouetteStrength;
uniform vec4 silhouetteColor;




#endif
