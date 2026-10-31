import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralCoffeeCupProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: number;
}

export const ProceduralCoffeeCup: React.FC<ProceduralCoffeeCupProps> = ({ pointer, scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const foamRef = useRef<THREE.Mesh>(null);
  const iceGroupRef = useRef<THREE.Group>(null);
  const beansGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate coffee bean positions & rotations
  const beansData = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.9 + Math.sin(i * 1.5) * 0.4;
      return {
        x: Math.cos(angle) * radius,
        y: -1.2 + (i % 4) * 0.7 + Math.sin(i) * 0.2,
        z: Math.sin(angle) * radius,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        speed: 0.3 + (i % 3) * 0.15,
      };
    });
  }, []);

  // Generate ice cubes positions
  const iceCubes = useMemo(() => {
    return [
      { pos: [0.2, 0.4, 0.1] as [number, number, number], rot: [0.3, 0.4, 0.1] as [number, number, number], scale: 0.55 },
      { pos: [-0.3, 0.6, -0.2] as [number, number, number], rot: [0.5, -0.3, 0.4] as [number, number, number], scale: 0.5 },
      { pos: [0.1, 0.9, -0.1] as [number, number, number], rot: [-0.2, 0.6, 0.2] as [number, number, number], scale: 0.48 },
      { pos: [-0.15, 0.2, 0.25] as [number, number, number], rot: [0.1, 0.2, -0.4] as [number, number, number], scale: 0.52 },
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth pointer parallax
      const targetRotY = pointer.current.x * 0.45 + scrollProgress * Math.PI * 1.2;
      const targetRotX = -pointer.current.y * 0.3 + 0.12;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3.5);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3.5);

      // Ambient vertical bobbing
      groupRef.current.position.y = Math.sin(time * 1.6) * 0.08 - scrollProgress * 0.5;
    }

    // Gentle liquid movement
    if (liquidRef.current) {
      liquidRef.current.rotation.y = time * 0.08;
    }

    // Ice cube gentle floating
    if (iceGroupRef.current) {
      iceGroupRef.current.position.y = Math.sin(time * 1.4) * 0.04;
    }

    // Floating beans rotation
    if (beansGroupRef.current) {
      beansGroupRef.current.rotation.y = -time * 0.2;
    }

    // Energy Ring pulse
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
      const scalePulse = 1 + Math.sin(time * 2.5) * 0.03;
      ringRef.current.scale.set(scalePulse, scalePulse, 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.25, 1.25, 1.25]}>
      {/* 1. OUTER GLASS TUMBLER */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.05, 0.82, 2.7, 48, 1, true]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.94}
          thickness={0.5}
          ior={1.48}
          color="#EAF6FF"
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass Bottom Base */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.82, 0.8, 0.12, 48]} />
        <meshPhysicalMaterial
          roughness={0.1}
          transmission={0.9}
          thickness={0.8}
          ior={1.5}
          color="#D4ECFF"
          transparent
        />
      </mesh>

      {/* Glass Lip / Rounded Rim */}
      <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.035, 16, 48]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          color="#FFFFFF"
        />
      </mesh>

      {/* 2. LIQUID COFFEE (Cold Brew Espresso) */}
      <mesh ref={liquidRef} position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.98, 0.77, 2.3, 40]} />
        <meshStandardMaterial
          color="#220F06"
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Liquid Surface */}
      <mesh position={[0, 1.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.98, 36]} />
        <meshStandardMaterial color="#301509" roughness={0.15} />
      </mesh>

      {/* 3. CREAMY FOAM LAYER (Cascading Top Cloud) */}
      <mesh ref={foamRef} position={[0, 1.05, 0]}>
        <cylinderGeometry args={[1.01, 0.99, 0.35, 36]} />
        <meshStandardMaterial
          color="#F6EFE6"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* 4. FLOATING ICE CUBES */}
      <group ref={iceGroupRef}>
        {iceCubes.map((ice, idx) => (
          <mesh
            key={idx}
            position={ice.pos}
            rotation={ice.rot}
            scale={[ice.scale, ice.scale, ice.scale]}
          >
            <boxGeometry args={[0.85, 0.85, 0.85]} />
            <meshPhysicalMaterial
              roughness={0.12}
              transmission={0.92}
              thickness={0.7}
              ior={1.31}
              color="#DCF2FF"
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      {/* 5. COFFEE BEANS AROUND THE CUP */}
      <group ref={beansGroupRef}>
        {beansData.map((bean, idx) => (
          <group
            key={idx}
            position={[bean.x, bean.y, bean.z]}
            rotation={[bean.rotX, bean.rotY, 0]}
            scale={[0.13, 0.09, 0.08]}
          >
            {/* Bean Body */}
            <mesh>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#2B1408" roughness={0.5} />
            </mesh>
            {/* Bean Center Crevice */}
            <mesh position={[0, 0.1, 0.85]} scale={[0.15, 0.85, 0.2]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#120602" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. JOLT BRAND ENERGY RING (Electric Cyan aura at base) */}
      <mesh ref={ringRef} position={[0, -1.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.022, 16, 64]} />
        <meshBasicMaterial color="#36B9E8" transparent opacity={0.65} />
      </mesh>

      {/* Shadow Plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
};
