import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';


// Single falling particle (sprite)
const FallingLeaf = ({ color, size }) => {
  const spriteRef = useRef();
  const clockRef = useRef(0);
  const petalTexture1 = useLoader(TextureLoader, process.env.PUBLIC_URL + '/petal1.png');
  const petalTexture2 = useLoader(TextureLoader, process.env.PUBLIC_URL + '/petal2.png');
  const petalTexture3 = useLoader(TextureLoader, process.env.PUBLIC_URL + '/petal3.png');
  const petalTexture4 = useLoader(TextureLoader, process.env.PUBLIC_URL + '/petal4.png');
  const petalTextures = [petalTexture1, petalTexture2, petalTexture3, petalTexture4]
  let index = Math.floor(Math.random() * 4) 
  if (index === 4) {
    index = 3
  }
  let petalTexture = petalTextures[index]

  const moveParams = useMemo(() => ({
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    floatAmplitude: 0.5 + Math.random(),
    floatFrequency: 0.5 + Math.random() * 1.5,
    swayAmplitude: 1 + Math.random(),
    fallSpeed: 1.5 + Math.random() * 0.3,
    windX: -0.3 + Math.random() * -0.2,
    windZ: -0.1 + Math.random() * 0.2,
    startX: (Math.random() - 0.5) * 20 + 10,
    startY: 10 + Math.random() * 5,
    startZ: (Math.random() - 0.5) * 10,
  }), []);

  useFrame((_, delta) => {
    clockRef.current += delta;
    const t = clockRef.current;

    if (spriteRef.current) {
      const swayX = Math.sin(t * 1.5) * moveParams.swayAmplitude;
      const floatY = Math.sin(t * moveParams.floatFrequency) * moveParams.floatAmplitude;
      const fallY = -t * moveParams.fallSpeed;

      spriteRef.current.position.x = moveParams.startX + swayX + moveParams.windX * t;
      spriteRef.current.position.y = moveParams.startY + floatY + fallY;
      spriteRef.current.position.z = moveParams.startZ + moveParams.windZ * t;

      spriteRef.current.material.rotation += moveParams.rotationSpeed;

      // Reset below screen
      if (spriteRef.current.position.y < -7) {
        clockRef.current = 0;
        moveParams.startX = (Math.random() - 0.5) * 20 + 10;
        moveParams.startY = 7 + Math.random() * 5;
        moveParams.startZ = (Math.random() - 0.5) * 10;
        moveParams.windX = -0.3 + Math.random() * -0.2;
        moveParams.windZ = -0.1 + Math.random() * 0.2;
      }
    }
  });

  return (
    <sprite ref={spriteRef} scale={[size, size, 1]}>
      <spriteMaterial
        map={petalTexture}
        transparent
        opacity={0.9}
      />
    </sprite>
  );
};

const FloatingLeaves = ({ count = 100 }) => {
  const leaves = useMemo(() => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
      '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e',
      '#e17055', '#81ecec', '#74b9ff', '#55a3ff', '#00b894'
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.3 + Math.random() * 0.1,
    }));
  }, [count]);

  return (
    <group>
      {leaves.map((leaf) => (
        <FallingLeaf
          key={leaf.id}
          color={leaf.color}
          size={leaf.size}
        />
      ))}
    </group>
  );
};

export default FloatingLeaves;
