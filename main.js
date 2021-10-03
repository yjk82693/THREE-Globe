import * as THREE from 'https://cdn.skypack.dev/three@0.133.0';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

console.log(scene);
console.log(camera)
console.log(renderer)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

//Orbit Controls
var orbit = new OrbitControls( camera, renderer.domElement );

//CALULATING DEBRIS POSITION
var x = -5183.4242705672805;
var y = 3661.401889791313;
var z = 1512.6256966819133;
var convertedx = 1/100*x;
var convertedy = 1/100*y;
var convertedz = 1/100*z;

//random postiion
var mx = -500

//debris
const debrisGeometry = new THREE.SphereGeometry(0.5, 50, 50)
const debrisMaterial = new THREE.MeshBasicMaterial ({
    color: 0xff0000
});

//for loop
for (var i=0;i<10;i++){
const debris = new THREE.Mesh (debrisGeometry, debrisMaterial);
debris.position.set(mx,convertedy,convertedz);
scene.add(debris);
mx+=0;

}


//Starfield
var starGeometry = new THREE.SphereGeometry(1000, 50, 50);
var starMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./image/star-field.jpg"),
  side: THREE.DoubleSide,
  shininess: 0
});
var starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

// Create a earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(63.71, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./image/globe.jpg')
            }
        }
    }
    )
)

//earth globe
earth.position.set = (0,0,0)
scene.add(earth)

//Render loop
var render = function() {
    //Rotate the earth about the y-axis
    earth.rotation.y -= .0005;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

camera.position.z = 200



