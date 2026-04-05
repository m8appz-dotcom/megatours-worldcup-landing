"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, Stars, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";

const Ticket3D = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh rotation={[0.2, 0.5, 0]}>
        <boxGeometry args={[3, 1.5, 0.1]} />
        <meshStandardMaterial color="#fcd116" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

export const Canvas3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#fcd116" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0033a0" />
        <Suspense fallback={null}>
          <Ticket3D />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};
