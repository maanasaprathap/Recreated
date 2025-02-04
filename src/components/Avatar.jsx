import React, { useRef, useEffect } from 'react';
import { useGLTF, useFBX, useAnimations } from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useControls} from 'leva';
import * as THREE from 'three';


export function Avatar(props) {
  const {animation} = props;
  const {headFollow, cursorFollow, wireframe} = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe : false,
  });
  const group = useRef();
  const { nodes, materials } = useGLTF("models/66aa4f04e9fe7dfbcec4442f.glb");
  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: standingAnimation } = useFBX("animations/Standing Idle.fbx");
  const { animations: fallingAnimation } = useFBX("animations/Falling Idle.fbx"); 
  
  typingAnimation[0].name = "Typing";
  standingAnimation[0].name="Standing";
  fallingAnimation[0].name="Falling";
 
  const { actions } = useAnimations([typingAnimation[0],standingAnimation[0], fallingAnimation[0]], group);

  useFrame((state) => {
    if(headFollow){
    group.current.getObjectByName("Head").lookAt(state.camera.position);
  }
    if(cursorFollow){
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return() => {
      actions[animation].reset().fadeOut(0.5);
    };
    
  }, [animation]);

  useEffect(() => {
Object.values(materials).forEach((material) => {
  material.wireframe = wireframe;
});

  }, [wireframe]);

  return (
  
    <group {...props} ref={group} dispose={null}>
        <group>
      <primitive object={nodes.Hips}
       />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
    </group>
  );
}

useGLTF.preload("models/66aa4f04e9fe7dfbcec4442f.glb");
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/Standing Idle.fbx");
useFBX.preload("animations/Falling Idle.fbx");
