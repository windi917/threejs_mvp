import * as THREE from 'three';
import React, { useState } from 'react';
import { useGLTF, Select } from '@react-three/drei';

export function Scene(props) {
  const models = [
    { key: 'BOOK', path: '/book0021.glb', initialPosition: [0, 0, 0], scale: [0.001, 0.001, 0.001] },
    { key: 'TV', path: '/elec0069.glb', initialPosition: [0, 0.2, 0], scale: [0.001, 0.001, 0.001] }
  ];

  const [hoveredModel, setHoveredModel] = useState(null);

  const modelObjects = models.map(model => ({
    key: model.key,
    scene: useGLTF(model.path).scene,
    position: new THREE.Vector3(...model.initialPosition),
    scale: new THREE.Vector3(...model.scale)
  }));

  const handlePointerOver = (key) => {
    setHoveredModel(key);
  };

  const handlePointerOut = () => {
    setHoveredModel(null);
  };

  // Update the position of the models based on hovered state
  modelObjects.forEach(modelObject => {
    const newPosition = modelObject.position;
    if ( modelObject.key === hoveredModel ) {
      newPosition.setZ(0.2);
    }
    modelObject.scene.position.copy(newPosition);
  });

  return (
    <>
      {modelObjects.map((modelObject) => (
        <Select key={modelObject.key} enabled={hoveredModel === modelObject.key}
          onPointerOver={() => handlePointerOver(modelObject.key)} onPointerOut={handlePointerOut}>
          <primitive object={modelObject.scene} position={modelObject.position} scale={modelObject.scale}/>
        </Select>
      ))}
    </>
  );
}