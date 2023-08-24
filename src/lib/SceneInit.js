import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45
      ;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    
    
    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    const parent = document.getElementById('productDisplay');
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    // console.log(parent.offsetWidth);    
    this.renderer.setSize(parent.offsetWidth, parent.offsetWidth);
    // this.renderer.shadowMap.enabled = true;

    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    ); 
    this.camera.position.set( 0,0, 11 );

    this.scene.background = new THREE.Color(0x00546e);
    parent.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.stats = Stats();
    // Set damping factors (optional)
    this.controls.dampingFactor = 0.05; // Adjust this value for the desired damping effect
    this.controls.rotateDampingFactor = 0.05; // Adjust this value for rotation damping
    this.controls.panDampingFactor = 0.05; // Adjust this value for pan damping

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 300, 0);
    this.scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(75, 300, -75);
    this.scene.add(dirLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
    setTimeout(() => {
      this.onWindowResize();
    }, 500);
  }



  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
    if(this.scene.children[2])
    this.scene.children[2].rotation.y += 0.01; // Adjust the rotation speed as needed
    
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.unifor ms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const parent = document.getElementById('productDisplay');
    this.renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // console.log(parent.offsetWidth); 
      
  }
}