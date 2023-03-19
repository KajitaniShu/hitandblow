import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { TransformControls, Select, Line, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, PivotControls, useGLTF } from '@react-three/drei'
import { useForm } from '@mantine/form';
import { Vector3, Quaternion } from 'three';
import { Object3D } from 'three'
import { Group } from '@mantine/core';



export function Card({num, position}: any) {
  const card_original = useGLTF("model/" + num + ".glb");
  const card          = card_original.scene.clone();
  
  const ref = useRef<any>();
    return (
      <mesh matrixAutoUpdate={true}> 
        <primitive 
            object={card}
            position={position}
          />
        <meshStandardMaterial />
      </mesh>
    )
}
