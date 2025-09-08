#ifndef __COMMONESSL_HEADER__

mediump vec4 pack4x8BitFloat( mediump float fNormalizedValue )
{
	const mediump vec4 packFactors = vec4( 1.0, 256.0, 65536.0, 16777216.0 );
	return fract( fNormalizedValue * packFactors );
}

mediump float unpack4x8BitFloat( mediump vec4 packedValue )
{
	const mediump vec4 extractFactors = vec4( 1.0, 0.00390625, 0.0000152587890625, 0.000000059604644775390625 );
	return dot( packedValue, extractFactors );
}

mediump float lambertian( mediump vec3 normal, mediump vec3 lightVector )
{
    return max( 0.0, dot( normal, lightVector ) );
}

mediump float phong( mediump vec3 position, mediump vec3 normal,
                  mediump vec3 eyePos, mediump vec3 lightVector, mediump float power )
{
    mediump vec3 posToEye = normalize( eyePos - position );
    mediump vec3 halfVector = normalize( lightVector + posToEye );
    mediump float NdotH = max( 0.0, dot( normal, halfVector ) );
    return pow( NdotH, power );
}

mediump float encodeShadowMapDepth( mediump vec2 posZW )
{
    // Normalize depth and make OpenGL post projection space simiral to DirectX.
    return 0.5 * ( 1.0 + posZW.x / posZW.y );
}

mediump float doShadowMapping( mediump vec4 posInLightProjSpace, sampler2D shadowMap, mediump float shadowBias )
{
    // Normalize passed position.
    mediump vec3 normalizedPos = 0.5 * ( posInLightProjSpace.xyz / posInLightProjSpace.w + vec3( 1.0, 1.0, 1.0 ) );

    // Calculate uv and depth;
    mediump vec2 shadowMapUV = normalizedPos.xy;
    mediump float depth = min( normalizedPos.z - shadowBias, 1.0 );

    // Sample from shadow map.
    mediump float sampledDepth = unpack4x8BitFloat( texture2D( shadowMap, shadowMapUV ) );

    // Is pixel in shadow?
    mediump float lightShadowFactor = float(depth <= sampledDepth);
    return lightShadowFactor;
}

mediump float encodeExponentialShadowMapDepth( mediump vec3 posInLightSpace,
                                               mediump float lightNearPlane,
                                               mediump float lightFarPlane )
{
    return ( /*length( pos )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
}

mediump float doExponentialShadowMapping( mediump vec4 posInLightProjSpace, mediump vec4 posInLightSpace,
                                  sampler2D shadowMap, mediump float darkeningFactor,
                                  mediump float lightNearPlane, mediump float lightFarPlane )
{
    mediump vec3 normalizedPos = 0.5 * ( posInLightProjSpace.xyz / posInLightProjSpace.w + vec3( 1.0, 1.0, 1.0 ) );
    mediump vec2 shadowMapUV = normalizedPos.xy;
    mediump float sampledDepth = unpack4x8BitFloat( texture2D( shadowMap, shadowMapUV ) );

    mediump float fScaledDistanceToLight = ( /*length( posInLightSpace )*/posInLightSpace.z - lightNearPlane ) / lightFarPlane;
    fScaledDistanceToLight = min( fScaledDistanceToLight, 1.0 );
    mediump float fLightFactor = clamp( exp( darkeningFactor * ( sampledDepth - fScaledDistanceToLight ) ), 0.0, 1.0 );
    return fLightFactor;
}

mediump vec3 doNormalMapping( mediump vec3 tangent, mediump vec3 binormal, mediump vec3 normal, sampler2D normalMap, mediump vec2 uv )
{
    mediump mat3 TBN = mat3( tangent, binormal, normal ); // column major
    mediump vec3 fetchedNormal = 2.0 * texture2D( normalMap, uv ).rgb - vec3( 1.0, 1.0, 1.0 );
    fetchedNormal = TBN * fetchedNormal; // column major
    fetchedNormal = vec3( fetchedNormal.x, fetchedNormal.z, fetchedNormal.y ); // Swap Y-Z
    fetchedNormal = normalize( fetchedNormal );
    return fetchedNormal;
}


uniform mediump mat4 worldViewProjMat;
uniform mediump mat4 worldViewMat;
uniform mediump mat4 lightWorldViewProjMat;
uniform mediump mat4 lightWorldViewMat;
uniform mediump vec2 lightNearFarPlane;
uniform mediump vec3 localLightVector; // The opposite of light direction in local space
uniform mediump vec3 localCameraPos; // The position of the camera in local space
uniform mediump float specularPower;

uniform mediump float shadowBias;
uniform mediump float shadowDarkeningFactor;
uniform sampler2D shadowMap;
uniform sampler2D expShadowMap;

uniform sampler2D colorMap;
uniform sampler2D normalMap;
uniform mediump vec4 ambientLightColor;
uniform mediump vec4 lightColor;
uniform mediump vec4 specularMaterial;
uniform mediump float opacity;
uniform mediump vec3 color;

uniform mediump float silhouetteStrength;
uniform mediump vec4 silhouetteColor;




#endif
