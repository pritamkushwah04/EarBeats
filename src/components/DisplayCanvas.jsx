import React from 'react'
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from '../lib/SceneInit';

function DisplayCanvas() {
  
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/headphones.glb', (gltfScene) => {
      gltfScene.scene.scale.set(1, 1, 1);
      gltfScene.scene.position.set(0, -1, 0);
      // gltfScene.scene.rotateY+= 10;
      // gltfScene.scene.rotation.y=40;
      gltfScene.scene.name="headphone1"
      // console.log(gltfScene.scene);
      test.scene.add(gltfScene.scene);
    });
    test.animate();
    
    
  }, [])


  return (
    <canvas id="myThreeJsCanvas"  className='sm:rounded-t'/>

  )
}

export default DisplayCanvas
