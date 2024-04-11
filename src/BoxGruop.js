import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';

const BoxGroupModel = ({ position, scale, color, rotation, animationType, texture }) => {
    const frontRef = useRef();
    const backRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const bottomRef = useRef();
    const handleRef = useRef();

    const [isHovered, setIsHovered] = useState(false);
    const space = 0.1;

    const originScale = {
        x: scale[0],
        y: scale[1],
        z: scale[2]
    };
    const originPosition = {
        x: position[0],
        y: position[1],
        z: position[2]
    }

    const scaleFront = [originScale.x, originScale.y, space];
    const positionFront = [originPosition.x, originPosition.y, originPosition.z];

    const scaleBack = [originScale.x, originScale.y - space, space];
    const positionBack = [originPosition.x, originPosition.y - space / 2, originPosition.z - originScale.z + space];

    const scaleLeft = [space, originScale.y - space, originScale.z];
    const positionLeft = [originPosition.x - originScale.x / 2 + space / 2, originPosition.y - space / 2, originPosition.z - (originScale.z / 2) + space / 2];

    const scaleRight = [space, originScale.y - space, originScale.z];
    const positionRight = [originPosition.x + originScale.x / 2 - space / 2, originPosition.y - space / 2, originPosition.z - (originScale.z / 2) + space / 2];

    const scaleBottom = [originScale.x, space, originScale.z];
    const positionBottom = [originPosition.x, originPosition.y - originScale.y / 2 + space / 2, originPosition.z - (originScale.z / 2) + space / 2];

    const scaleHandle = [space * 5, space / 3, space];
    const positionHandle = [originPosition.x - originScale.x / 2 + space * 4, originPosition.y + originScale.y / 2 - space, originPosition.z + space];

    useFrame(() => {
        if (isHovered) {
            if (animationType == 1) {
                // if ( boxRef.current.rotation.y >= Math.PI / 4 )
                //   return;
                // boxRef.current.rotation.y += 0.1; // Add rotation animation
                if (frontRef.current.position.z >= positionFront[2] + 1)
                    return;

                frontRef.current.position.z += 0.1;
                backRef.current.position.z += 0.1;
                leftRef.current.position.z += 0.1;
                rightRef.current.position.z += 0.1;
                bottomRef.current.position.z += 0.1;
                handleRef.current.position.z += 0.1;
            } else if (animationType == 2) {
                if (frontRef.current.position.z >= positionFront[2] + 1)
                    return;
                
                frontRef.current.position.z += 0.1;
                backRef.current.position.z += 0.1;
                leftRef.current.position.z += 0.1;
                rightRef.current.position.z += 0.1;
                bottomRef.current.position.z += 0.1;
                handleRef.current.position.z += 0.1;
            }
        } else {
            if (animationType == 1) {
                // boxRef.current.rotation.y = originalRotation.y;
                frontRef.current.position.z = positionFront[2];
                backRef.current.position.z = positionBack[2];
                leftRef.current.position.z = positionLeft[2];
                rightRef.current.position.z = positionRight[2];
                bottomRef.current.position.z = positionBottom[2];
                handleRef.current.position.z = positionHandle[2];
            } else if (animationType == 2) {
                frontRef.current.position.z = positionFront[2];
                backRef.current.position.z = positionBack[2];
                leftRef.current.position.z = positionLeft[2];
                rightRef.current.position.z = positionRight[2];
                bottomRef.current.position.z = positionBottom[2];
                handleRef.current.position.z = positionHandle[2];
            }
        }
    });

    const handlePointerOver = () => {
        setIsHovered(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
    };

    const textureModel = useLoader(TextureLoader, `/assets/texture/${texture}.jpg`);
    return (
        <group 
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <mesh
                ref={frontRef}
                position={positionFront}
                scale={scaleFront}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
            <mesh
                ref={backRef}
                position={positionBack}
                scale={scaleBack}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
            <mesh
                ref={leftRef}
                position={positionLeft}
                scale={scaleLeft}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
            <mesh
                ref={rightRef}
                position={positionRight}
                scale={scaleRight}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
            <mesh
                ref={bottomRef}
                position={positionBottom}
                scale={scaleBottom}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
            <mesh
                ref={handleRef}
                position={positionHandle}
                scale={scaleHandle}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textureModel} />
            </mesh>
        </group>
    );
};

export default BoxGroupModel;