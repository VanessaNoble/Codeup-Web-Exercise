/**
 * Created by vanessamnoble on 12/17/16.
 */
//scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 95, window.innerWidth/window.innerHeight, 0.8, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.DodecahedronGeometry(1.4, 1);
var material = new THREE.MeshBasicMaterial( {  color: 0x333333, shading: THREE.FlatShading } );
var dodecahedron = new THREE.Mesh( geometry, material );
scene.add( dodecahedron );
camera.position.z = 5;

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 10.5 );
directionalLight.position.set( 1, 1, 1 );
scene.add( directionalLight );
//soften the light
//    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
//    scene.add( light );


var light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
var helper = new THREE.DirectionalLightHelper( light, 1, 1, 1 );

scene.add( helper);


var render = function () {
    requestAnimationFrame( render );

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;


    renderer.render(scene, camera);
};

render();