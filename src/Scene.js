import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { useGLTF, Select } from '@react-three/drei';
import BoxModel from './BoxModel';
import BoxGroupModel from './BoxGruop';

const models = [
  { key: 'TV', path: '/assets/items/web/elec0069.glb' },
  { key: 'MAN', path: '/assets/geometry/shadow_man.glb' },
  { key: 'IBOX', path: '/assets/geometry/innerBox.glb' },
  { key: 'BOXLEG', path: '/assets/geometry/box_leg.glb' },
  { key: 'HANDLE', path: '/assets/geometry/handle.glb' },
  { key: 'BOOK1', path: '/assets/items/web/book0025.glb' },
  { key: 'BOX', path: '' },
  { key: 'BOXGROUP', path: '' },
]

export function Scene(props) {
  const modelObjects = models.map(model => {
    let scene;
    if (model.key === "BOX" || model.key === "BOXGROUP")
      scene = null;
    else
      scene = useGLTF(model.path).scene;

    return (
      {
        key: model.key,
        scene: scene
      }
    )
  });

  const { scaleH, scaleV, scaleD, legDisplay, openDoor, color, texture } = props;

  const center = -1;
  const deskWidth = 6 * scaleH;
  const deskHeight = 3 * scaleV;
  const deskDepth = 1 * scaleD;
  const space = 0.1;
  const legSize = 0.32;

  let hSpaceCount = 4;
  let vSpaceCount = [4, 1, 2, 3];

  if (scaleH < 0.8) {
    hSpaceCount = 1;

    if (scaleV < 0.6) {
      vSpaceCount = [1];
    } else if (scaleV < 1) {
      vSpaceCount = [2];
    } else if (scaleV < 1.4) {
      vSpaceCount = [3];
    } else {
      vSpaceCount = [4];
    }
  } else if (scaleH < 1.4) {
    hSpaceCount = 2;

    if (scaleV < 0.6) {
      vSpaceCount = [1, 1];
    } else if (scaleV < 1) {
      vSpaceCount = [2, 1];
    } else if (scaleV < 1.4) {
      vSpaceCount = [3, 2];
    } else {
      vSpaceCount = [4, 3];
    }
  } else if (scaleH < 2) {
    hSpaceCount = 3;

    if (scaleV < 0.6) {
      vSpaceCount = [1, 1, 1];
    } else if (scaleV < 1) {
      vSpaceCount = [2, 1, 2];
    } else if (scaleV < 1.4) {
      vSpaceCount = [3, 1, 2];
    } else {
      vSpaceCount = [4, 2, 3];
    }
  } else {
    hSpaceCount = 4;

    if (scaleV < 0.6) {
      vSpaceCount = [1, 1, 1, 1];
    } else if (scaleV < 1) {
      vSpaceCount = [2, 1, 2, 2];
    } else if (scaleV < 1.4) {
      vSpaceCount = [3, 1, 2, 3];
    } else {
      vSpaceCount = [4, 1, 2, 3];
    }
  }

  let geometries = [
    { model: 'MAN', key: 'MAN', initialPosition: [-deskWidth / 2 - 2, -center - 0.1, 0], scale: [0.05, 0.05, 0.05], rotation: [0, 0, 0], animationType: 0 },
    { model: 'BOX', key: 'BOX_BOTTOM', initialPosition: [0, - center - space / 2, 0], scale: [deskWidth, space, deskDepth], rotation: [0, 0, 0], animationType: 0 },
    { model: 'BOX', key: 'BOX_TOP', initialPosition: [0, deskHeight - center + space / 2, 0], scale: [deskWidth, space, deskDepth], rotation: [0, 0, 0], animationType: 0 },
    { model: 'BOX', key: 'BOX_BACK', initialPosition: [0, deskHeight / 2 - center, -deskDepth / 2], scale: [deskWidth, deskHeight, 0.01], rotation: [0, 0, 0], animationType: 0 },
  ]

  const hSpace = (deskWidth - space * (hSpaceCount + 1)) / hSpaceCount;

  /// TV
  if (hSpaceCount >= 3) {
    geometries.push({
      model: 'TV',
      key: 'TV',
      initialPosition: [0, deskHeight + space - center, 0],
      scale: [0.006, 0.006, 0.006],
      rotation: [0, 0, 0],
      animationType: 0
    })
  }
  /// horizontal spacebar
  for (let idx = 0; idx <= hSpaceCount; idx++) {
    let initialPosition = [0, 0, 0];
    let scale = [0, 0, 0];

    initialPosition[0] = (-deskWidth / 2) + (space + hSpace) * idx + space / 2;
    initialPosition[1] = deskHeight / 2 - center;
    initialPosition[2] = 0;

    scale[0] = space;
    scale[1] = deskHeight;
    scale[2] = deskDepth;

    geometries.push({
      model: 'BOX',
      key: `BOXS_H${idx}`,
      initialPosition: initialPosition,
      scale: scale,
      rotation: [0, 0, 0],
      animationType: 0
    })
  }

  /// vertical space
  for (let i = 0; i < hSpaceCount; i++) {
    const vSpace = (deskHeight - (vSpaceCount[i] - 1) * space) / vSpaceCount[i];
    for (let j = 1; j < vSpaceCount[i]; j++) {
      let initialPosition = [0, 0, 0];
      let scale = [0, 0, 0];

      initialPosition[0] = (-deskWidth / 2) + (space + hSpace) * (i) + space / 2 + hSpace / 2;
      initialPosition[1] = - center + (vSpace + space) * (j) - space / 2;
      initialPosition[2] = 0;

      scale[0] = hSpace + space;
      scale[1] = space;
      scale[2] = deskDepth;

      geometries.push({
        model: 'BOX',
        key: `BOXS_H${i}_V${j - 1}`,
        initialPosition: initialPosition,
        scale: scale,
        rotation: [0, 0, 0],
        animationType: 0
      })
    }
  }

  /// vertical box
  for (let i = 0; i < hSpaceCount; i++) {
    const vSpace = (deskHeight - (vSpaceCount[i] - 1) * space) / vSpaceCount[i];
    for (let j = 0; j < vSpaceCount[i]; j++) {
      if (j == 0 && vSpaceCount[i] == 2 && hSpaceCount != 1) {
        /// book
        let bookPosition = [0, 0, 0];
        let bookScale = [0, 0, 0];

        bookPosition[0] = (-deskWidth / 2) + (space + hSpace) * (i) + space / 2 + hSpace / 2 + 0.05;
        bookPosition[1] = - center + (vSpace + space) * j;
        bookPosition[2] = 0;

        bookScale[0] = 0.003;
        bookScale[1] = 0.003;
        bookScale[2] = 0.003;

        geometries.push({
          model: 'BOOK1',
          key: `BOOK1`,
          initialPosition: bookPosition,
          scale: bookScale,
          rotation: [0, 0, 0],
          animationType: 0
        })
      }

      if (j == 0 && (vSpaceCount[i] == 2 || vSpaceCount[i] == 3))
        continue;

      /// box
      let initialPosition = [0, 0, 0];
      let boxGScale = [0, 0, 0];

      initialPosition[0] = (-deskWidth / 2) + (space + hSpace) * (i) + space / 2 + hSpace / 2 + 0.05;
      initialPosition[1] = - center + (vSpace + space) * j + vSpace / 2;
      initialPosition[2] = Number(deskDepth / 2) - Number(space / 2);

      boxGScale[0] = hSpace - 0.04;
      boxGScale[1] = vSpace - 0.04;
      boxGScale[2] = deskDepth;
      
      let animationType = 0;
      if ( vSpaceCount[i] <= 2 )
        animationType = 1;
      else
        animationType = 2;

      geometries.push({
        model: 'BOXGROUP',
        key: `BOXB_H${i}_V${j - 1}`,
        initialPosition: initialPosition,
        scale: boxGScale,
        rotation: [0, 0, 0],
        animationType: animationType
      })
    }
  }

  if (legDisplay == true) {
    /// front legs
    for (let idx = 0; idx <= hSpaceCount; idx++) {
      let initialPosition = [0, 0, 0];
      let scale = [0, 0, 0];

      initialPosition[0] = (-deskWidth / 2) + (space + hSpace) * idx + space / 2;
      initialPosition[1] = -center - legSize;
      initialPosition[2] = deskDepth / 2;

      scale[0] = 2;
      scale[1] = 2;
      scale[2] = 2;

      let degree = (idx <= hSpaceCount / 2) ? Math.PI : Math.PI / 2;
      geometries.push({
        model: 'BOXLEG',
        key: `BOXLEG_F${idx}`,
        initialPosition: initialPosition,
        scale: scale,
        rotation: [0, -degree, 0],
        animationType: 0,
      })
    }

    /// back legs
    for (let idx = 0; idx <= hSpaceCount; idx++) {
      let initialPosition = [0, 0, 0];
      let scale = [0, 0, 0];

      initialPosition[0] = (-deskWidth / 2) + (space + hSpace) * idx + space / 2;
      initialPosition[1] = -center - legSize;
      initialPosition[2] = -deskDepth / 2;

      scale[0] = 2;
      scale[1] = 2;
      scale[2] = 2;

      let degree = (idx <= hSpaceCount / 2) ? Math.PI / 2 : 0;
      geometries.push({
        model: 'BOXLEG',
        key: `BOXLEG_F${idx}`,
        initialPosition: initialPosition,
        scale: scale,
        rotation: [0, degree, 0],
        animationType: 0
      })
    }
  }

  const geometryObjects = geometries.map(geometry => {

    if ( legDisplay == true && geometry.model !== 'MAN' ) {
      geometry.initialPosition[1] = geometry.initialPosition[1] + legSize;
    }

    const model = modelObjects.filter(model => {
      if (geometry.model === model.key)
        return model;
    })

    let scene;
    if (geometry.model === "BOX" || geometry.model === "BOXGROUP")
      scene = null;
    else {
      scene = model[0].scene.clone();
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; // Enable casting shadows
          child.receiveShadow = true; // Enable receiving shadows
        }
      });
    }

    return (
      {
        key: geometry.key,
        model: geometry.model,
        scene: scene,
        position: new THREE.Vector3(...geometry.initialPosition),
        scale: geometry.scale,
        rotation: geometry.rotation,
        color: color,
        animationType: geometry.animationType
      }
    )
  })

  return (
    <>
      {geometryObjects.map((obj) => {
        if (obj.model !== "BOX" && obj.model !== "BOXGROUP") {
          return (
            <primitive object={obj.scene} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          )
        } else if ( obj.model === 'BOX' ) {
          return (
            <BoxModel position={obj.position.toArray()} scale={obj.scale} color={obj.color} rotation={obj.rotation} animationType={obj.animationType} texture={texture} />
          );
        } else if ( openDoor == true ) {
          return (
            <BoxGroupModel position={obj.position.toArray()} scale={obj.scale} color={obj.color} rotation={obj.rotation} animationType={obj.animationType} texture={texture} />
          );
        }
      }
      )}
    </>
  );
}