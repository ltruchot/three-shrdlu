import './style.scss';
import {
  Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry,
  MeshBasicMaterial, Mesh, EdgesGeometry, LineBasicMaterial, LineSegments,
} from 'three';
import { isNone } from '@effect-ts/core/Option';
import { append, byId } from './helpers/dom';
import indexView from './views/index-view';

append(document.body, [
  indexView,
]);
const sceneEl = byId('scene');
if (isNone(sceneEl)) {
  throw Error('Scene not found');
}

const sceneWidth = window.innerWidth / 2;
const scene = new Scene();
const camera = new PerspectiveCamera(75, sceneWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(sceneWidth, window.innerHeight);

append(sceneEl.value, [renderer.domElement]);

// cube
const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: 'green' });
const cube = new Mesh(geometry, material);

// wireframes (cube edges)
const geo = new EdgesGeometry(cube.geometry);
const mat = new LineBasicMaterial({ color: 'white', linewidth: 4 });
const wireframe = new LineSegments(geo, mat);
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

cube.add(wireframe);
scene.add(cube);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
