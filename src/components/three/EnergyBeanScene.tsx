import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface BeanData {
  pos: [number, number, number];
  rot: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
}

const ProceduralBean: React.FC<{ bean: BeanData }> = ({ bean }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += bean.rotSpeed[0] * delta;
      meshRef.current.rotation.y += bean.rotSpeed[1] * delta;
      meshRef.current.rotation.z += bean.rotSpeed[2] * delta;
    }
  });

  return (
    <group ref={meshRef} position={bean.pos} rotation={bean.rot} scale={bean.scale}>
      {/* Bean Outer Body */}
      <mesh castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#2B1408" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Center Line Crevice */}
      <mesh position={[0, 0.02, 0.25]} scale={[0.04, 0.26, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#100502" roughness={0.9} />
      </mesh>
    </group>
  );
};

const EnergySceneContent: React.FC<{ mousePos: React.MutableRefObject<{ x: number; y: number }> }> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const beans = useMemo<BeanData[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      const angle = (i / 22) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 2.8;
      const y = (Math.random() - 0.5) * 4.2;
      const z = Math.sin(angle) * radius * 0.8;
      const x = Math.cos(angle) * radius;
      return {
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        rotSpeed: [
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
        ],
        scale: 0.7 + Math.random() * 0.7,
      };
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle responsive pointer parallax
      const targetRotY = mousePos.current.x * 0.35 + Math.sin(time * 0.2) * 0.15;
      const targetRotX = -mousePos.current.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2.5);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2.5);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.4;
      ringRef1.current.rotation.x = Math.sin(time * 0.3) * 0.3 + 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.3;
      ringRef2.current.rotation.y = Math.cos(time * 0.25) * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#DCF2FF" />
      <pointLight position={[-4, -3, -2]} intensity={2.5} color="#36B9E8" />
      <pointLight position={[3, -2, 4]} intensity={2} color="#0878B5" />

      <group ref={groupRef}>
        {/* Orbiting Energy Rings */}
        <mesh ref={ringRef1} position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[3.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#36B9E8" transparent opacity={0.45} />
        </mesh>
        <mesh ref={ringRef2} position={[0, 0, 0]} rotation={[-0.3, 0.2, 0]}>
          <torusGeometry args={[3.8, 0.015, 16, 64]} />
          <meshBasicMaterial color="#DCF2FF" transparent opacity={0.3} />
        </mesh>

        {/* Floating Procedural Coffee Beans */}
        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
          {beans.map((bean, idx) => (
            <ProceduralBean key={idx} bean={bean} />
          ))}
        </Float>

        {/* Cyan Energy Sparkles */}
        <Sparkles count={45} scale={[8, 6, 6]} size={2.5} speed={0.8} opacity={0.5} color="#36B9E8" />
      </group>
    </>
  );
};

export const EnergyBeanScene: React.FC = () => {
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current = { x, y };
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <EnergySceneContent mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
};
