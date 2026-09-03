import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraRig } from './camera/CameraRig';
import { ParticleField } from './effects/ParticleField';
import { Embers } from './effects/Embers';
import { Rain } from './effects/Rain';
import { InkSlash } from './effects/InkSlash';
import { Moon } from './world/Moon';
import { Mountains } from './world/Mountains';
import { Castle } from './world/Castle';
import { ToriiGate } from './world/ToriiGate';
import { Forest } from './world/Forest';
import { Samurai } from './world/Samurai';
import { FaceScanScene } from './world/FaceScanScene';
import { DeploymentScene } from './world/DeploymentScene';
import { DocumentScene } from './world/DocumentScene';
import { NetworkScene } from './world/NetworkScene';
import { ArsenalScene } from './world/ArsenalScene';

interface WorldProps {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  velocityRef: React.MutableRefObject<number>;
  slashTriggerRef: React.MutableRefObject<boolean>;
}

export function World({ scrollRef, mouseRef, velocityRef, slashTriggerRef }: WorldProps) {
  const isMobile = useRef(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  return (
    <Canvas
      camera={{ position: [0, 1.5, 12], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, isMobile.current ? 1 : 2]}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={['#050505', 8, 40]} />
      <ambientLight intensity={0.15} color="#444466" />
      <directionalLight position={[-5, 8, -10]} intensity={0.3} color="#B51F25" />
      <pointLight position={[0, 5, 5]} intensity={0.2} color="#E8E2D8" />
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />

      {/* Hero environment — always present */}
      <Moon scrollRef={scrollRef} />
      <Mountains />
      <Castle />
      <ToriiGate position={[3, 0, -10]} scale={0.8} />
      <Forest count={isMobile.current ? 12 : 25} area={40} zSpread={-12} />
      <Samurai scrollRef={scrollRef} />

      {/* Particles */}
      <ParticleField
        count={isMobile.current ? 200 : 600}
        spread={50}
        size={0.06}
        color="#77716A"
        opacity={0.4}
        speed={0.2}
        scrollRef={scrollRef}
        velocityRef={velocityRef}
      />
      <Embers
        count={isMobile.current ? 40 : 100}
        area={25}
        velocityRef={velocityRef}
      />

      {/* Chapter-specific scenes — positioned in 3D space */}
      {/* CH 03 — Forge: Projects */}
      <group position={[0, 0, -30]}>
        <FaceScanScene scrollRef={scrollRef} />
      </group>
      <group position={[0, 0, -42]}>
        <DeploymentScene />
      </group>
      <group position={[0, 0, -54]}>
        <DocumentScene />
      </group>
      <group position={[0, 0, -66]}>
        <NetworkScene />
      </group>

      {/* CH 04 — Arsenal */}
      <group position={[0, 0, -78]}>
        <ArsenalScene />
      </group>

      {/* CH 02 — Battlefield rain */}
      <group position={[0, 0, -18]}>
        <Rain count={isMobile.current ? 500 : 1500} area={40} velocityRef={velocityRef} />
      </group>

      {/* Katana slash effect */}
      <InkSlash triggerRef={slashTriggerRef} />
    </Canvas>
  );
}
