import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { HeroDrink } from '../../data/drinkPresets';

interface JoltCupProps {
  drink: HeroDrink;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  joltSignal: number;
  onJolt: () => void;
  quality: 'high' | 'low';
  reducedMotion: boolean;
}

/** Radius of the tapered tumbler at a given height (y in [-1.35, 1.35]). */
const radiusAt = (y: number) => 0.915 + 0.135 * (y / 1.35);

/** Draws the branded blue sleeve wrapped around the cup. */
function drawSleeve(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width: w, height: h } = canvas;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0A8DD0');
  grad.addColorStop(0.5, '#0878B5');
  grad.addColorStop(1, '#055A8F');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Cyan pinstripes
  ctx.fillStyle = '#36B9E8';
  ctx.fillRect(0, 16, w, 5);
  ctx.fillRect(0, h - 21, w, 5);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text is centred at u = 0 and u = 0.5 so the logo faces the camera initially.
  for (const x of [0, w / 2, w]) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 128px "Space Grotesk", "Arial Black", sans-serif';
    ctx.fillText('JOLT', x, h * 0.44);
    ctx.fillStyle = '#BDEBFF';
    ctx.font = '600 30px "Space Grotesk", Arial, sans-serif';
    ctx.fillText('COFFEE  ·  PEKANBARU', x, h * 0.8);
  }

  // Small lightning marks between logos
  ctx.fillStyle = '#36B9E8';
  for (const x of [w / 4, (3 * w) / 4]) {
    ctx.beginPath();
    ctx.moveTo(x + 10, h * 0.25);
    ctx.lineTo(x - 18, h * 0.55);
    ctx.lineTo(x, h * 0.55);
    ctx.lineTo(x - 10, h * 0.78);
    ctx.lineTo(x + 18, h * 0.45);
    ctx.lineTo(x, h * 0.45);
    ctx.closePath();
    ctx.fill();
  }
}

export const JoltCup: React.FC<JoltCupProps> = ({
  drink,
  pointer,
  scroll,
  joltSignal,
  onJolt,
  quality,
  reducedMotion,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const cupRef = useRef<THREE.Group>(null);
  const beansRef = useRef<THREE.Group>(null);
  const beanRefs = useRef<(THREE.Group | null)[]>([]);
  const iceRefs = useRef<(THREE.Mesh | null)[]>([]);
  const shockRef = useRef<THREE.Mesh>(null);
  const shock2Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const baseMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const topMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const foamMat = useRef<THREE.MeshStandardMaterial>(null);

  const joltStart = useRef(-1);
  const pendingJolt = useRef(false);
  const spin = useRef(0);
  const targetSpin = useRef(0);

  const targetColors = useMemo(
    () => ({
      base: new THREE.Color(drink.base),
      top: new THREE.Color(drink.top),
      foam: new THREE.Color(drink.foam),
    }),
    [drink],
  );

  // Branded sleeve texture (re-drawn once web fonts are ready)
  const sleeveTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 256;
    drawSleeve(canvas);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      drawSleeve(sleeveTexture.image as HTMLCanvasElement);
      sleeveTexture.needsUpdate = true;
    });
    return () => {
      cancelled = true;
      sleeveTexture.dispose();
    };
  }, [sleeveTexture]);

  // Orbiting bean layout
  const beanCount = quality === 'high' ? 14 : 8;
  const beans = useMemo(
    () =>
      Array.from({ length: beanCount }).map((_, i) => {
        const angle = (i / beanCount) * Math.PI * 2;
        return {
          angle,
          radius: 2.0 + (i % 3) * 0.28,
          y: -0.9 + ((i * 7) % 5) * 0.42,
          rx: (i * 1.7) % Math.PI,
          ry: (i * 2.3) % Math.PI,
          spin: 0.4 + (i % 4) * 0.25,
          scale: 0.9 + (i % 3) * 0.12,
        };
      }),
    [beanCount],
  );

  const iceCubes = useMemo(
    () => [
      { pos: new THREE.Vector3(0.28, 0.72, 0.18), rot: [0.3, 0.4, 0.1], phase: 0 },
      { pos: new THREE.Vector3(-0.32, 0.8, -0.16), rot: [0.5, -0.3, 0.4], phase: 1.7 },
      { pos: new THREE.Vector3(0.02, 0.95, -0.05), rot: [-0.2, 0.6, 0.2], phase: 3.1 },
    ],
    [],
  );

  // Shared materials
  const beanMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3B1D0C', roughness: 0.35, metalness: 0.05 }),
    [],
  );
  const creaseMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#140703', roughness: 0.9 }), []);
  useEffect(
    () => () => {
      beanMat.dispose();
      creaseMat.dispose();
    },
    [beanMat, creaseMat],
  );

  // Trigger a jolt on signal change
  useEffect(() => {
    if (joltSignal === 0) return;
    pendingJolt.current = true;
    targetSpin.current += Math.PI * 2;
  }, [joltSignal]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    if (pendingJolt.current) {
      joltStart.current = t;
      pendingJolt.current = false;
    }
    const jt = joltStart.current < 0 ? 99 : t - joltStart.current;
    const burst = Math.exp(-jt * 2.6);
    const punch = Math.exp(-jt * 5) * Math.sin(jt * 22);

    const s = reducedMotion ? 0 : scroll.current;

    // Liquid colour transitions
    const k = 1 - Math.exp(-dt * 4);
    baseMat.current?.color.lerp(targetColors.base, k);
    topMat.current?.color.lerp(targetColors.top, k);
    foamMat.current?.color.lerp(targetColors.foam, k);

    if (rootRef.current) {
      spin.current = THREE.MathUtils.damp(spin.current, targetSpin.current, 4, dt);
      const targetY = (reducedMotion ? 0 : pointer.current.x * 0.5) + s * Math.PI * 1.1 + spin.current;
      const targetX = (reducedMotion ? 0 : -pointer.current.y * 0.25) + 0.1 + s * 0.35;
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, targetY, 3.5, dt);
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, targetX, 3.5, dt);
      rootRef.current.position.y = -s * 0.8;
      const sc = 1.15 * (1 + punch * 0.08) * (1 - Math.min(s, 1) * 0.15);
      rootRef.current.scale.setScalar(sc);
    }

    if (cupRef.current) {
      // Slight wobble after a jolt
      cupRef.current.rotation.z = punch * 0.12;
    }

    // Ice cubes bobbing in the drink
    iceRefs.current.forEach((ice, i) => {
      if (!ice) return;
      const cube = iceCubes[i];
      ice.position.y = cube.pos.y + Math.sin(t * 1.4 + cube.phase) * 0.04 + burst * 0.35 * Math.sin(jt * 6 + i);
      ice.rotation.y = cube.rot[1] + (reducedMotion ? 0 : t * 0.15) + burst * 2;
    });

    // Orbiting beans fly outward on jolt
    if (beansRef.current && !reducedMotion) {
      beansRef.current.rotation.y = -t * 0.22 - burst * 1.5;
    }
    beanRefs.current.forEach((bean, i) => {
      if (!bean) return;
      const b = beans[i];
      const r = b.radius * (1 + burst * 0.9);
      bean.position.set(
        Math.cos(b.angle) * r,
        b.y + Math.sin(t * 0.9 + i) * (reducedMotion ? 0 : 0.12) + burst * Math.sin(b.angle * 3) * 0.8,
        Math.sin(b.angle) * r,
      );
      if (!reducedMotion) {
        bean.rotation.x += dt * b.spin * (1 + burst * 8);
        bean.rotation.z += dt * b.spin * 0.6;
      }
    });

    // Shockwave rings
    const waves: [THREE.Mesh | null, number][] = [
      [shockRef.current, 0],
      [shock2Ref.current, 0.15],
    ];
    for (const [wave, offset] of waves) {
      if (!wave) continue;
      const wt = jt - offset;
      const mat = wave.material as THREE.MeshBasicMaterial;
      if (wt < 0 || wt > 1.4) {
        wave.visible = false;
        continue;
      }
      wave.visible = true;
      wave.scale.setScalar(1 + wt * 3.2);
      mat.opacity = Math.max(0, 0.85 * (1 - wt / 1.4));
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6;
      const pulse = 1 + Math.sin(t * 2.5) * 0.03 + burst * 0.25;
      ringRef.current.scale.set(pulse, pulse, 1);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    // Ignore clicks that were really drags (PresentationControls)
    if (e.delta > 6) return;
    e.stopPropagation();
    onJolt();
  };

  const isHigh = quality === 'high';

  return (
    <group ref={rootRef} position={[0, -0.1, 0]}>
      <group
        ref={cupRef}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        {/* GLASS TUMBLER */}
        <mesh renderOrder={2}>
          <cylinderGeometry args={[1.05, 0.78, 2.7, 64, 1, true]} />
          {isHigh ? (
            <meshPhysicalMaterial
              transmission={1}
              thickness={0.25}
              roughness={0.03}
              ior={1.45}
              clearcoat={1}
              clearcoatRoughness={0.05}
              color="#F2FAFF"
              envMapIntensity={1.4}
              specularIntensity={1}
            />
          ) : (
            <meshPhysicalMaterial
              transparent
              opacity={0.22}
              roughness={0.05}
              clearcoat={1}
              color="#EAF6FF"
              envMapIntensity={1.5}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          )}
        </mesh>

        {/* Glass base */}
        <mesh position={[0, -1.32, 0]}>
          <cylinderGeometry args={[0.78, 0.76, 0.1, 64]} />
          <meshPhysicalMaterial
            color="#DDF0FF"
            roughness={0.05}
            transmission={isHigh ? 1 : 0}
            thickness={0.6}
            transparent={!isHigh}
            opacity={isHigh ? 1 : 0.4}
          />
        </mesh>

        {/* Rim */}
        <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.03, 16, 64]} />
          <meshPhysicalMaterial color="#FFFFFF" roughness={0.05} clearcoat={1} transparent opacity={0.7} />
        </mesh>

        {/* LIQUID – lower layer */}
        <mesh position={[0, -0.59, 0]}>
          <cylinderGeometry args={[radiusAt(0.1) - 0.05, radiusAt(-1.28) - 0.05, 1.38, 48]} />
          <meshPhysicalMaterial ref={baseMat} color={drink.base} roughness={0.2} clearcoat={0.6} />
        </mesh>

        {/* LIQUID – upper layer */}
        <mesh position={[0, 0.525, 0]}>
          <cylinderGeometry args={[radiusAt(0.95) - 0.05, radiusAt(0.1) - 0.05, 0.85, 48]} />
          <meshPhysicalMaterial ref={topMat} color={drink.top} roughness={0.15} clearcoat={0.8} />
        </mesh>

        {/* FOAM CAP */}
        <mesh position={[0, 1.06, 0]}>
          <cylinderGeometry args={[radiusAt(1.18) - 0.05, radiusAt(0.95) - 0.05, 0.22, 48]} />
          <meshStandardMaterial ref={foamMat} color={drink.foam} roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.17, 0]} scale={[1, 0.18, 1]}>
          <sphereGeometry args={[radiusAt(1.18) - 0.06, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={drink.foam} roughness={0.85} />
        </mesh>

        {/* ICE CUBES */}
        {iceCubes.map((cube, i) => (
          <RoundedBox
            key={i}
            ref={(el: THREE.Mesh | null) => {
              iceRefs.current[i] = el;
            }}
            args={[0.42, 0.42, 0.42]}
            radius={0.07}
            smoothness={3}
            position={cube.pos}
            rotation={cube.rot as [number, number, number]}
          >
            {isHigh ? (
              <meshPhysicalMaterial
                transmission={1}
                thickness={0.4}
                roughness={0.08}
                ior={1.31}
                color="#E6F6FF"
              />
            ) : (
              <meshStandardMaterial color="#DDF3FF" transparent opacity={0.55} roughness={0.1} />
            )}
          </RoundedBox>
        ))}

        {/* BRANDED SLEEVE */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[radiusAt(0.1) + 0.03, radiusAt(-0.5) + 0.03, 0.6, 64, 1, true]} />
          <meshStandardMaterial map={sleeveTexture} roughness={0.45} metalness={0.05} />
        </mesh>

        {/* STRAW */}
        <group position={[0.35, 1.1, 0.1]} rotation={[0.12, 0, -0.22]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.2, 20, 1, true]} />
            <meshStandardMaterial color="#36B9E8" roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.06, 0.012, 8, 20]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      </group>

      {/* ORBITING COFFEE BEANS */}
      <group ref={beansRef}>
        {beans.map((b, i) => (
          <group
            key={i}
            ref={(el) => {
              beanRefs.current[i] = el;
            }}
            rotation={[b.rx, b.ry, 0]}
            scale={[0.15 * b.scale, 0.1 * b.scale, 0.09 * b.scale]}
          >
            <mesh material={beanMat}>
              <sphereGeometry args={[1, 20, 14]} />
            </mesh>
            <mesh position={[0, 0, 0.9]} scale={[0.12, 0.85, 0.18]} material={creaseMat}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ENERGY RING + SHOCKWAVES */}
      <mesh ref={ringRef} position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.02, 12, 96]} />
        <meshBasicMaterial color={drink.glow} transparent opacity={0.8} toneMapped={false} />
      </mesh>
      <mesh ref={shockRef} position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[1.2, 1.32, 96]} />
        <meshBasicMaterial color="#36B9E8" transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={shock2Ref} position={[0, 0, 0]} rotation={[0, 0, 0]} visible={false}>
        <ringGeometry args={[1.25, 1.3, 96]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
};
