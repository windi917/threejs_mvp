import * as THREE from 'three';
import { useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { CameraControls, SoftShadows } from "@react-three/drei"
import { useControls } from "leva"
import { Scene } from "./Scene"
import RadioGroup from './Components/RadioGroup';

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 2, 12);

const colors = ['gray', 'black', 'white', 'red', 'green', 'blue'];
const textures = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6', 'style7', 'style8', 'style9', 'style10'];
const mappingTypes = ['NoToneMapping', 'LinearToneMapping', 'ReinhardToneMapping', 'CineonToneMapping', 'ACESFilmicToneMapping']

function ToneMapping(type) {
  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));
  useEffect(() => {

    gl.toneMapping = THREE.NoToneMapping;
    if ( type.type === 'LinearToneMapping' )
      gl.toneMapping = THREE.LinearToneMapping;
    else if ( type.type === 'ReinhardToneMapping' )
      gl.toneMapping = THREE.ReinhardToneMapping;
    else if ( type.type === 'CineonToneMapping' )
      gl.toneMapping = THREE.CineonToneMapping;
    else if ( type.type === 'ACESFilmicToneMapping' )
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      
    gl.toneMappingExposure = 1.5;
    scene.traverse((object) => {
      if (object.material) {
        object.material.needsUpdate = true;
      }
    });

  }, [gl, scene, type]);
  return <></>;
}

export const App = () => {
  const [scaleHFactor, setScaleHFactor] = useState(1.5);
  const [scaleVFactor, setScaleVFactor] = useState(1.5);
  const [scaleDFactor, setScaleDFactor] = useState(1.5);
  const [deskColor, setDeskColor] = useState('gray');
  const [texture, setTexture] = useState('style1');
  const [isLeg, setLegDisplay] = useState(true);
  const [openDoor, setOpenDoor] = useState(true);
  const [mappingType, setMappingType] = useState('NoToneMapping')

  const handleHScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScaleHFactor(scaleValue);
  };

  const handleVScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScaleVFactor(scaleValue);
  };

  const handleDScaleChange = (event) => {
    const scaleDalue = parseFloat(event.target.value);
    setScaleDFactor(scaleDalue);
  };

  const handleLegDisplay = (event) => {
    setLegDisplay(event.target.checked);
  }

  const handleOpenDoor = (event) => {
    setOpenDoor(event.target.checked);
  }

  const handleColorSelect = (selectedOption) => {
    setDeskColor(selectedOption);
  };

  const handleTextureSelect = (selectedOption) => {
    setTexture(selectedOption);
  }

  const handleMappingTypeSelect = (selectedOption) => {
    setMappingType(selectedOption);
  }

  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 }
  })

  return (
    <>
      <div>
        <div>
          <a>Width :</a>
          <input type="range" min="0.17" max="2.57" step="0.01" value={scaleHFactor} onChange={handleHScaleChange} />
          <span>{`Width: ${Math.round(scaleHFactor * 175)}cm`}</span>
        </div>
        <div>
          <a>Height:</a>
          <input type="range" min="0.34" max="1.71" step="0.01" value={scaleVFactor} onChange={handleVScaleChange} />
          <span>{`Height: ${Math.round(scaleVFactor * 175 / 2)}cm`}</span>
        </div>
        <div>
          <a>Depth :</a>
          <input type="range" min="0.75" max="2.05" step="0.01" value={scaleDFactor} onChange={handleDScaleChange} />
          <span>{`Depth: ${Math.round(scaleDFactor * 175 / 6)}cm`}</span>
        </div>
      </div>
      <div>
        <label>
          <a>Leg : </a>
          <input type="checkbox" checked={isLeg} onChange={handleLegDisplay} />
        </label>
      </div>
      <div>
        <label>
          <a>Door : </a>
          <input type="checkbox" checked={openDoor} onChange={handleOpenDoor} />
        </label>
      </div>
      <div>
        <a>Texture : </a>
        <RadioGroup options={textures} onSelect={handleTextureSelect} />
      </div>
      <div>
        <a>Mapping Type : </a>
        <RadioGroup options={mappingTypes} onSelect={handleMappingTypeSelect} />
      </div>
      <Canvas shadows camera={camera}>
        <ToneMapping type={mappingType}/>
        <CameraControls makeDefault />
        {enabled && <SoftShadows {...config} />}
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
          <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
        </directionalLight>
        <group position={[0, -3.5, 0]}>
          <mesh receiveShadow castShadow>
            <Scene scaleH={scaleHFactor} scaleV={scaleVFactor} scaleD={scaleDFactor} legDisplay={isLeg} openDoor={openDoor} color={deskColor} texture={texture}/>
            <meshLambertMaterial />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
        </group>
      </Canvas>
    </>
  )
}
