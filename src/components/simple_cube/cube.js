import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const RotatingCube = ({ color = "hotpink", speed = 0.01 }) => {
  const meshRef = useRef();
  
  // This hook runs on every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

export default RotatingCube;