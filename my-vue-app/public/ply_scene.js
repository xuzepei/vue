function createGradientBg() {
  // 创建 Canvas 并绘制渐变
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext('2d');

  // 创建线性渐变
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#010101'); // 黑色
  gradient.addColorStop(1, '#7575e8'); // 紫色
  //  gradient.addColorStop(0, '#F2F2F7');
  //  gradient.addColorStop(1, '#F2F2F7');

  // 将渐变应用到 Canvas
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // 创建纹理并将其设置为场景的背景
  const texture = new THREE.CanvasTexture(canvas);

  return texture;
}

var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

var loadPLY = function (path, filename) {

  var name = filename;

  // Load PLY files
  var plyLoader = new THREE.PLYLoader();
  plyLoader.setPath(path);
  plyLoader.load(name + '.ply', function (geometry) {

    geometry.computeVertexNormals(); // 计算法线，提高渲染效果

    // const material = new THREE.MeshStandardMaterial( { color: 0x009cff, flatShading: true } );
    // const mesh = new THREE.Mesh( geometry, material );

    // mesh.position.x = - 0.2;
    // mesh.position.y = - 0.02;
    // mesh.position.z = - 0.2;
    // mesh.scale.multiplyScalar( 0.0006 );

    // mesh.castShadow = true;
    // mesh.receiveShadow = true;

    // scene.add( mesh );

    if (geometry.hasAttribute('color')) {
      // PLY 文件有颜色，使用顶点颜色
      material = new THREE.MeshStandardMaterial({
          vertexColors: true,
          flatShading: false
      });
  } else {
      // PLY 文件无颜色，默认使用白色
      material = new THREE.MeshStandardMaterial({
        color: 0xD3D3D3, // 灰色
        roughness: 0.8,   // 设置一些粗糙度，模拟石膏质感
        metalness: 0.1    // 设置金属感为低，模拟非金属材质
      });
  }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar( 0.001 );
    scene.add(mesh);
    mesh.position.set(0, 0, 0);

  },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '%  ply loaded');
    },
    function (error) {
      console.error('An error occurred while loading the ply file', error);
    }
  );

  return "true";
};



// 创建场景、摄像机和渲染器
var scene = new THREE.Scene();
//scene.background = new THREE.Color(0xFAFAFA); // Light Gray
scene.background = createGradientBg();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0;
//camera.position.set(0, 0, 5);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建灯光
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
// directionalLight.castShadow = true;
// directionalLight.position.set(10, 10, 10).normalize();
// scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // 环境光，给场景添加基础光照
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);  // 平行光，模拟太阳光照射
directionalLight.position.set(-2, 2, -2).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);  // 点光源，模拟局部光源
pointLight.position.set(0, 2, 0);
scene.add(pointLight);



// 创建OrbitControls来控制模型旋转
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// 设置缩放限制
controls.minDistance = 1; // 最小距离
controls.maxDistance = 1000; // 最大距离
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件


animate();
