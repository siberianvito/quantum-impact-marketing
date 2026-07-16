"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { coreState } from "@/lib/coreState";

/* ── Simplex noise (Ashima) + fresnel energy shell ───────────── */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${NOISE_GLSL}
void main(){
  float n = snoise(normal * 1.9 + vec3(0.0, uTime * 0.22, uTime * 0.13));
  vNoise = n;
  vec3 pos = position + normal * n * uAmp;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.55, 0.55, vNoise));
  float pulse = 0.78 + 0.22 * sin(uTime * 1.15);
  vec3 final = col * fres * 2.1 * pulse * uIntensity + col * 0.05;
  gl_FragColor = vec4(final, clamp(fres * 0.95 + 0.05, 0.0, 1.0));
}
`;

/* ── Glow sprite texture (radial gradient, generated once) ──── */
function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(120,255,150,0.85)");
  grad.addColorStop(0.25, "rgba(57,255,20,0.32)");
  grad.addColorStop(0.6, "rgba(0,207,255,0.10)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function CoreOrb({ perf }: { perf: "high" | "low" }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const shellMat = useRef<THREE.ShaderMaterial>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const nucleus = useRef<THREE.Mesh>(null);

  const glowTex = useMemo(() => makeGlowTexture(), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uIntensity: { value: 1 },
      uColorA: { value: new THREE.Color("#39ff14") },
      uColorB: { value: new THREE.Color("#00cfff") },
    }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;

    if (shellMat.current) {
      shellMat.current.uniforms.uTime.value = t;
      shellMat.current.uniforms.uIntensity.value = coreState.intensity;
    }

    // breathing float + scroll-driven placement (BASE_Y lifts the nucleus above the headline)
    const BASE_Y = 0.38;
    const targetScale = coreState.scale;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.06));
    g.position.x = THREE.MathUtils.lerp(g.position.x, coreState.x, 0.05);
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      coreState.y + BASE_Y + Math.sin(t * 0.55) * 0.07,
      0.05
    );

    // mouse parallax + idle spin
    if (inner.current) {
      inner.current.rotation.y += delta * 0.14 * coreState.spin;
      inner.current.rotation.x = THREE.MathUtils.lerp(
        inner.current.rotation.x,
        coreState.mouseY * 0.22,
        0.04
      );
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, coreState.mouseX * 0.3, 0.04);
    }

    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.22 * coreState.spin;
      ringA.current.rotation.x = 1.05 + Math.sin(t * 0.32) * 0.1;
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.16 * coreState.spin;
      ringB.current.rotation.y = 0.6 + Math.cos(t * 0.27) * 0.12;
    }
    if (nucleus.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05;
      nucleus.current.scale.setScalar(s);
    }
  });

  return (
    // Pushed back in Z so the core reads as a monument behind the type, not a wall
    <group ref={group} position={[0, 0, -1.35]}>
      <group ref={inner}>
        {/* Energy shell */}
        <mesh>
          <icosahedronGeometry args={[1.05, perf === "high" ? 26 : 14]} />
          <shaderMaterial
            ref={shellMat}
            vertexShader={VERT}
            fragmentShader={FRAG}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Nucleus */}
        <mesh ref={nucleus}>
          <sphereGeometry args={[0.27, 32, 32]} />
          <meshBasicMaterial color="#c9f5cf" toneMapped={false} />
        </mesh>

        {/* Volumetric glow */}
        <sprite scale={[3.9, 3.9, 1]}>
          <spriteMaterial
            map={glowTex}
            transparent
            opacity={0.72}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      </group>

      {/* Orbital rings */}
      <mesh ref={ringA} rotation={[1.05, 0, 0]}>
        <torusGeometry args={[1.62, 0.0045, 8, 220]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[1.8, 0.6, 0]}>
        <torusGeometry args={[2.02, 0.0038, 8, 220]} />
        <meshBasicMaterial color="#00cfff" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Deterministic PRNG keeps render pure and the starfield stable
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.3 + rand() * 2.6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.018 * coreState.spin;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#9fe8ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function QuantumScene({ active }: { active: boolean }) {
  const [perf, setPerf] = useState<"high" | "low">("high");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const decide = () => setPerf(mq.matches ? "low" : "high");
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  // Track pointer globally (canvas is pointer-events: none)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      coreState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      coreState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className={`absolute inset-0 ${active ? "" : "invisible"}`}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={perf === "high" ? [1, 1.75] : [1, 1.4]}
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <CoreOrb perf={perf} />
        <ParticleField count={perf === "high" ? 1500 : 800} />
        {perf === "high" && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.18} luminanceSmoothing={0.28} />
            <Vignette eskil={false} offset={0.28} darkness={0.78} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
