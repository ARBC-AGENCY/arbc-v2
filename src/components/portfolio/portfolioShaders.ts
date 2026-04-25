export const vertexShader: string = `
  attribute vec2 aPosition;
  attribute vec2 aUv;
  uniform vec2  uCenter;
  uniform float uScale;
  uniform vec2  uOffset;
  uniform vec2  uResolution;
  uniform float uCurvature;
  varying vec2 vUv;

  void main() {
    vec2 scaled = uCenter + (aPosition - uCenter) * uScale;
    vUv = aUv;

    float worldX = (scaled.x + uOffset.x / uResolution.x * 2.0);
    scaled.y += pow(worldX * 0.5, 2.0) * -uCurvature * 0.15;

    gl_Position = vec4(scaled, 0.0, 1.0);
  }
`;

export const fragmentShader: string = `
  precision mediump float;
  uniform sampler2D tMap;
  uniform vec2 uImageSizes;
  uniform vec2 uPlaneSizes;
  uniform float uOpacity;
  varying vec2 vUv;

  vec2 getCoverUv(vec2 uv, vec2 imageSize, vec2 planeSize) {
    float imageAspect = imageSize.x / imageSize.y;
    float planeAspect = planeSize.x / planeSize.y;
    vec2 result = uv - 0.5;
    if (planeAspect < imageAspect) {
      result.x *= planeAspect / imageAspect;
    } else {
      result.y *= imageAspect / planeAspect;
    }
    return result + 0.5;
  }

  void main() {
    vec2 uv = getCoverUv(vUv, uImageSizes, uPlaneSizes);
    vec4 color = texture2D(tMap, uv);
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
  }
`;
