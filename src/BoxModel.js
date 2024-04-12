import React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

const BoxModel = ({ position, scale, color, rotation, animationType, texture }) => {
  const textureModel = useLoader(TextureLoader, `/assets/texture/${texture}.jpg`);
  
  return (
    <mesh
      position={position}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={textureModel} />
    </mesh>
  );
};

export default BoxModel;