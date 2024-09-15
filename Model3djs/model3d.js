
// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);


const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x121212);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.content').appendChild(renderer.domElement);

// Añadir luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5).normalize();
scene.add(light);

let model;

// Cargar el modelo GLTF
const loader = new THREE.GLTFLoader();

loader.load('models/model_computer.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    animate();
    
}, undefined, function (error) {
    console.error('Error al cargar el modelo:', error);
});

// Crear controles de órbita para manipular el modelo con el ratón
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.45;

// Alternar entre modo claro y oscuro
document.getElementById('toggleMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Cambiar el fondo en función del modo
    if (document.body.classList.contains('dark-mode')) {
        renderer.setClearColor(0x121212); // Color de fondo para modo oscuro
    } else {
        renderer.setClearColor(0xffffff); // Color de fondo para modo claro
    }
});

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.001;
    }

    controls.update();
    renderer.render(scene, camera);
}

// Ajustar el tamaño del canvas al redimensionar la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
