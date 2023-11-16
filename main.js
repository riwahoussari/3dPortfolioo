import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Lenis from '@studio-freight/lenis';
import { matrix, matrix as matrixAnimation } from './matrix';

// scrollbar
let progress = document.getElementById('progressBar'
);
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
let progressHeight = (window.pageYOffset /
totalHeight)* 100;
progress.style.height = progressHeight + "%"
}


//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
})
renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize( sizes.width, sizes.height)
camera.position.set(0,0,70)

//lights
const pointLight = new THREE.SpotLight(0xffffff, 1000)
pointLight.position.set(45,20,30)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

//webSphere shape
const geometry = new THREE.TorusGeometry(15, 0.05, 30, 200)
const geometryTwo = new THREE.TorusGeometry(12.99, 0.05, 30, 200)
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347})
const material = new THREE.MeshLambertMaterial({color: 0xB3DD, wireframe :true})
// const materialTwo = new THREE.MeshStandardMaterial({ color: 0xff63ff})
const toruses = []
const toruses2 = [];
Array(5).fill().forEach(()=> {
  toruses.push(new THREE.Mesh( geometry, material))
  toruses2.push(new THREE.Mesh( geometry, material))
})
Array(2).fill().forEach(()=>{
  toruses.push(new THREE.Mesh( geometryTwo, material))
  toruses2.push(new THREE.Mesh( geometryTwo, material))
})
toruses[0].rotation.y += 3.1415 / 4;
toruses[1].rotation.y -= 3.1415 / 4;
toruses[2].rotation.y += 3.1415 / 2;
toruses[4].rotation.x += 3.1415 / 2;
toruses[5].rotation.x += 3.1415 / 2;
toruses[6].rotation.x += 3.1415 / 2;
toruses[5].position.set(0, 7.5, 0)
toruses[6].position.set(0, -7.5, 0)
toruses2[0].rotation.y += 3.1415 / 4;
toruses2[1].rotation.y -= 3.1415 / 4;
toruses2[2].rotation.y += 3.1415 / 2;
toruses2[4].rotation.x += 3.1415 / 2;
toruses2[5].rotation.x += 3.1415 / 2;
toruses2[6].rotation.x += 3.1415 / 2;
toruses2[5].position.set(0, 7.5, 0)
toruses2[6].position.set(0, -7.5, 0)
const webSphere = new THREE.Group()
webSphere.add(...toruses)
const webSphere2 = new THREE.Group()
webSphere2.add(...toruses2)
webSphere2.position.x = -200;
webSphere2.position.z = -100;
scene.add(webSphere2)
//skills planets geometry
function createPlanet(dis, rad, rot) {
  const sphereGeo = new THREE.SphereGeometry( rad, 64, 32 ); 
  const sphereMat = new THREE.MeshStandardMaterial({ color: 0xaaaaff})
  const mesh = new THREE.Mesh( sphereGeo, sphereMat ); 
  const obj = new THREE.Object3D();
  obj.add(mesh)
  mesh.position.setX(dis)
  mesh.position.setY(-100)
  obj.rotation.y = Math.PI * rot;
  system.add(obj)
  return {mesh, obj}
}

const system = new THREE.Group()
const planetsInfo = [
  [30, 6, 0.4], //visible
  [50, 7, 1.4], //entering
  [70, 7, 1.9],   //leaving
  [87, 5, 1.3],  //opposite
  [107, 10, 1.85],  //leaving
  [130, 8, 1.65],  //entering
  [150, 6, 1.5]]   //opposite
const [planet1, planet2, planet3, planet4, planet5, planet6, planet7] = planetsInfo.map(planet => createPlanet(...planet))
system.add(webSphere)
system.position.set(30, 0, 0)
scene.add(system)

// javascript
const getRandomParticelPos = (particleCount) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = (Math.random() - 0.5) * 100;
  }
  return arr;
};

// mouse
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// const starFieldBG = () => {
  renderer.setClearColor(new THREE.Color("#1c1624"));

  // light source
  const color = 0xffffff, intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // Geometry
  const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

  geometrys[0].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticelPos(500), 3)
  );
  geometrys[1].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
  );

  const loader = new THREE.TextureLoader();

  // material
  const materials = [
    new THREE.PointsMaterial({
      size: 1,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"
      ),
      transparent: true
    }),
    new THREE.PointsMaterial({
      size: 0.075,
      map: loader.load(
        "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
      ),
      transparent: true
    })
  ];

  const starsT1 = new THREE.Points(geometrys[0], materials[0]);
  const starsT2 = new THREE.Points(geometrys[1], materials[1]);
  scene.add(starsT1);
  scene.add(starsT2);


// starFieldBG();
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//animations

//typewriter animation
const typewriter = document.querySelector('.typewriter')
const typewriterLoad = ()  => {
  setTimeout(() => {
    typewriter.textContent = '16-year-old'
  }, 0);
  setTimeout(() => {
    typewriter.textContent = 'Frontend'
  }, 4000);
  setTimeout(() => {
    typewriter.textContent = 'Lebanese'
  }, 8000);
}
typewriterLoad()
setInterval(typewriterLoad, 12000)

//hero webSphere rotation
let heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.heroTrigger',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
    // markers: true
  }
})
heroTl.to(webSphere.rotation, { y: Math.PI })

//transition from hero to skills
let skillsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.skillsTrigger',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // markers: true
  }
})
skillsTl.to('.mainWrapper', {y: 0-(sizes.height * 1.5)}, 'start')
skillsTl.to(system.position, {x: -70, y: 0, z: -50}, 'start')
skillsTl.to(system.rotation, {x: Math.PI * 0.25}, 'start')
skillsTl.to(planet1.mesh.position, {y: 0}, 'start')
skillsTl.to(planet2.mesh.position, {y: 0}, 'start')
skillsTl.to(planet3.mesh.position, {y: 0}, 'start')
skillsTl.to(planet4.mesh.position, {y: 0}, 'start')
skillsTl.to(planet5.mesh.position, {y: 0}, 'start')
skillsTl.to(planet6.mesh.position, {y: 0}, 'start')
skillsTl.to(planet7.mesh.position, {y: 0}, 'start')

//planets orbit 
let orbitTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.orbitTrigger',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // markers: true
  }
})
orbitTl.to(planet1.obj.rotation, {y: Math.PI * 1.55}, 'start') //visible
orbitTl.to(planet2.obj.rotation, {y: Math.PI * 2.2}, 'start') //entering
orbitTl.to(planet3.obj.rotation, {y: Math.PI * 2.6}, 'start') //leaving
orbitTl.to(planet4.obj.rotation, {y: Math.PI * 1.9}, 'start') //opposite
orbitTl.to(planet5.obj.rotation, {y: Math.PI * 2.2}, 'start') //leaving
orbitTl.to(planet6.obj.rotation, {y: Math.PI * 1.9}, 'start') //entering
orbitTl.to(planet7.obj.rotation, {y: Math.PI * 2.1}, 'start') //opposite

//transition from skills to projects
let projectsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projectsTrigger',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // markers: true
  }
})
projectsTl.to(system.position, {y: 35}, 'start')
projectsTl.to('.mainWrapper', {y: 0-(sizes.height * 2.5 - 100)}, 'start')

//projects movement
let projects2Tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects2Trigger',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // markers: true
  }
})
projects2Tl.to(system.position, {y: 70}, 'start')
projects2Tl.to('.mainWrapper', {y: 0-(sizes.height * 2.5)}, 'start')
projects2Tl.to('.card1', {
  bottom: sizes.height / 2 + sizes.height/33 - 30,
  top: 'unset',
  right: sizes.width / 2 + sizes.height/33 - 30,
  left: 'unset'
}, 'start')
projects2Tl.to('.card3', {
  bottom: 'unset',
  top: sizes.height / 2 + sizes.height/33 + 30,
  right: sizes.width / 2 + sizes.height/33 - 30,
  left: 'unset'
}, 'start')
projects2Tl.to('.card2', {
  bottom: sizes.height / 2 + sizes.height/33 - 30,
  top: 'unset',
  left: sizes.width / 2 - sizes.height/33 + 50,
  right: 'unset'
}, 'start')
projects2Tl.to('.card4', {
  bottom: 'unset',
  top: sizes.height / 2 + sizes.height/33 + 30,
  left: sizes.width / 2 - sizes.height/33 + 50,
  right: 'unset'
}, 'start')

//transition from projects to contact
let contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.contactTrigger',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    // markers: true
  }
})
contactTl.to('.projectsh2', {opacity: 0, y: -sizes.height*3/100}, 'start')
contactTl.to('.contacth2', {opacity: 1, y: -sizes.height*6/100}, 'start')
contactTl.to('.card1', {
  right: Math.max(-sizes.width * 32/100, -520),
  left: 'unset'
}, 'start')
contactTl.to('.card3', {
  right: Math.max(-sizes.width * 32/100, -520),
  left: 'unset'
}, 'start')
contactTl.to('.card2', {
  left: Math.max(-sizes.width * 32/100, -520),
  right: 'unset'
}, 'start')
contactTl.to('.card4', {
  left: Math.max(-sizes.width * 32/100, -520),
  right: 'unset'
}, 'start')
contactTl.to('.contact-container', {
  scale: 1,
  opacity: 1
}, 'start')
contactTl.to(webSphere2.position, {
  x: -30,
  z: -5
}, 'start')
//matrix transition
// matrixTl.to()
// ScrollTrigger.create({
//   trigger: ".matrixTrigger", 
//   start: "top top", 
//   end: "top top", 
//   // onLeave: () => console.log('leave'),
//   // onEnterBack: () => console.log('enter back'),
//   onEnter: ()=> {matrixAnimation.animate(0)},
//   onLeaveBack: ()=> matrixAnimation.animate(0),
//   markers: true
// });
// let matrixTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.matrixTrigger',
//     start: 'top top',
//     end: 'top top',
//     scrub: false,
//     toggleActions: 'play play none none',
//     markers: true
//   }
// })
// matrixTl.to(system.position, {x: 200, duration: 0}, 1)

// let matrixReverseTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.matrixTrigger',
//     start: 'top top',
//     end: 'top top',
//     scrub: false,
//     toggleActions: 'none none play play',
//     markers: true
//   }
// })
// let matrixReverseTl2 = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.matrixTrigger',
//     start: 'top top',
//     end: 'top top',
//     scrub: false,
//     toggleActions: 'none none play play',
//     markers: true
//   }
// })
// matrixReverseTl.to(system.position, {x: -70, y: 10, z: -200, duration: 0}, 0.5)
// matrixReverseTl2.to(system.position, {x: -70, y: 10, z: -50, duration: 1}, 2)
// matrixTl.to('.mainWrapper', {opacity: 0, duration: 2.5}, 'start')


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// infinite loop
const loop = () => {
  renderer.render(scene, camera)
  starsT1.position.x = mouseX * 0.001;
  starsT1.position.y = mouseY * -0.001;

  starsT2.position.x = mouseX * -0.001;
  starsT2.position.y = mouseY * 0.001;
  webSphere2.rotation.y += 0.01;
  requestAnimationFrame(loop)
}
loop()
//adjust 3d rendering on screen resize
window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize( sizes.width, sizes.height)
})
//lenis smooth scroll
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


//html, css, js, node, react, three, mongo
