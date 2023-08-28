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
      gltfScene.scene.name="headphone1"
      test.scene.add(gltfScene.scene);
      const progressbar= document.getElementById("progress-container");
      progressbar.className="hidden"; 
    },
    (xhr) => {
      // Loading progress callback
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      const progressbar= document.getElementById("progressbar");
      
      if(percentComplete){
        console.log(percentComplete);
        progressbar.value=percentComplete;
      }
    },
    (error) => {
      console.error('An error occurred while loading the model:', error);
    });
    test.animate();
    
    
  }, [])


  return (
    <>
    <canvas id="myThreeJsCanvas"  className='sm:rounded-t'/>
    </>
    

  )
}

export default DisplayCanvas
