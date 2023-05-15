import React, { useRef } from 'react'
import { Cylinder, useGLTF } from '@react-three/drei'
import { useBox, useCylinder } from '@react-three/cannon';

export default function Ground({ position, props }) {

  const { nodes, materials } = useGLTF('/ground.glb')

  var realPose = [position[0], (position[1] + 0.19), position[2]];


  const [groundBody, groundAPI] = useCylinder(() => ({
    args: [1.4, 1.86, .38, 8, 1],
    position: realPose,
    mass: 0,
    type: 'Static',
  }), useRef(null));

  return (
    <group ref={groundBody}>
      {/* <mesh>
        <Cylinder args={[1.4, 1.86, .38, 32, 1]} />
        <meshStandardMaterial color={0x000fff} attach="material" />
      </mesh> */}
      <group {...props} dispose={null} rotation={[Math.PI / 2, 0, 0]} scale={[0.025, 0.025, 0.025]} position={[0, -.19, 0]} >
        <mesh geometry={nodes.imagetostl_mesh.geometry} material={materials.mat1} >
          <meshStandardMaterial attach={"material"} color={0x331111} />
        </mesh>
      </group>
    </group >
  )
}

useGLTF.preload('/ground.glb')
