

// 创建场景、摄像机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
// 创建灯光
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
 
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);
 

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('models/');
// 加载.obj模型和材质
mtlLoader.load('20190618124505345_0_hrn_mid_mesh.mtl', (materials) => {
  materials.preload();

  // 创建.obj加载器
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');

  objLoader.load('20190618124505345_0_hrn_mid_mesh.obj', (object) => {
    // 设置模型位置和比例
    object.position.set(0, 0, 0);
    object.scale.set(1, 1, 1);
    
    // 将模型添加到场景
    scene.add(object);
 
    // 渲染场景
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  });
});
 
// // 调整摄像机位置并开始渲染
// camera.position.z = 5;
