<template>
    <h3>Three Scene</h3>
    <div ref="threeContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as THREE from 'three';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';


export default {
    name: 'ThreeScene',
    mounted() {
        console.log("####mounted");
        this.initThree();
    },
    methods: {
        initThree() {
            console.log("####initThree");

            THREE.ColorManagement.enabled = true;
            // var scene = new THREE.Scene();
            // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            // var renderer = new THREE.WebGLRenderer();
            // renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild(renderer.domElement);

            // var geometry = new THREE.BoxGeometry();
            // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            // var cube = new THREE.Mesh(geometry, material);
            // scene.add(cube);

            // camera.position.z = 5;

            // var animate = function () {
            //     requestAnimationFrame(animate);
            //     cube.rotation.x += 0.01;
            //     cube.rotation.y += 0.01;
            //     renderer.render(scene, camera);
            // };

            // animate();


            //##########################################

            // 创建场景、摄像机和渲染器
            var scene = new THREE.Scene();

            scene.background = new THREE.Color(0xffffff); // Light Sky Blue

            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer();
            renderer.outputColorSpace = THREE.SRGBColorSpace; 
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // 创建灯光
            // Add lights to the scene 
            const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            var textureLoader = new THREE.TextureLoader();
            textureLoader.load(
              './models/test.jpg',
              function (texture) {
                  console.log("#### Texture loaded successfully");
                  //texture.colorSpace = THREE.DisplayP3ColorSpace;
              },
              undefined,
              function (err) {
                console.error('#### An error occurred while loading the texture', err);
              }
            );

            // Load MTL and OBJ files
            var mtlLoader = new MTLLoader();
            mtlLoader.setPath('./models/');
            mtlLoader.load('face.obj.mtl', function (materials) {

                console.log(materials);

                materials.preload();

                // Ensure each texture uses the correct color space
                for (const materialName in materials.materials) {
                    const material = materials.materials[materialName];

                    if (material.map) {
                        material.map.colorSpace = THREE.SRGBColorSpace;
                    }
                    if (material.emissiveMap) {
                        material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
                    }
                    if (material.specularMap) {
                        material.specularMap.colorSpace = THREE.SRGBColorSpace;
                    }
                    if (material.normalMap) {
                        material.normalMap.colorSpace = THREE.NoColorSpace; // Normal maps should not use color space correction
                    }
                }

                var objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('./models/');
                objLoader.load('face.obj', function (object) {
                    scene.add(object);

                    animate();
                },
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '%  obj loaded');
                    },
                    function (error) {
                        console.error('An error occurred while loading the OBJ file', error);
                    });
            });



            camera.position.z = 3;

            // 创建OrbitControls来控制模型旋转
            const controls = new OrbitControls(camera, renderer.domElement);
            // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
            controls.addEventListener('change', function () {
                renderer.render(scene, camera); //执行渲染操作
            });//监听鼠标、键盘事件


            const composer = new EffectComposer(renderer);

            var animate = function () {
                requestAnimationFrame(animate);
                composer.render();
                
                controls.update();
                renderer.render(scene, camera);
            };


            animate();

            
        },
    },
};
</script>
