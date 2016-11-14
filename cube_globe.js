/**
 * Created by vanessamnoble on 11/14/16.
 */
((window, document, three,
    undefined) => {
    'use strict';

const PI = Math.PI,
    HALF_PI = PI * 0.5,
    TWO_PI = PI * 2;

class CubeGlobe {
    constructor(args) {
        this.tick = 0;
        this.dimensions = {};
        this.defaults = {
            animation: {
                moveCamera: true,
                scale: true,
                type: 'smooth',
                waveSize: 100
            }
        };
        this.props = args && typeof(args) === 'object' ? args : this.defaults;
        this.init();
    }

    init() {
        var self = this;
        window.onresize = () => {
            self.resize();
            self.setAspectRatio();
        };
        self.resize();
        self.initCamera();
        self.initScene();
        self.initLights();
        self.build();
        self.setAnimation();
        self.initGUI();
        self.render();
    }

    reset() {
        this.tick = 0;
        this.scene.remove(this.globe);
        this.setAnimation();
        this.build();
    }

    resize() {
        this.dimensions.x = window.innerWidth;
        this.dimensions.y = window.innerHeight;
    }

    setAspectRatio() {
        this.renderer.setSize(this.dimensions.x, this.dimensions.y);
        this.camera.aspect = this.props.camera.aspectRatio = this.dimensions.x / this.dimensions.y;
        this.camera.updateProjectionMatrix();
    }

    initCamera() {
        if (!this.props.camera) {
            this.props.camera = {
                fov: 70,
                nearPlane: 0.1,
                farPlane: 10000
            };
        }
        this.camera = new three.PerspectiveCamera(
            this.props.camera.fov,
            this.props.camera.aspectRatio,
            this.props.camera.nearPlane,
            this.props.camera.farPlane
        );
    }

    initScene() {
        this.scene = new three.Scene();
        this.scene.add(this.camera);
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.dimensions.x, this.dimensions.y);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = three.PCFSoftShadowMap;
        this.setAspectRatio();
        this.container = document.querySelector('#container');
        this.container.appendChild(this.renderer.domElement);
    }

    initLights() {
        this.mainLight = new three.DirectionalLight(0xf9c932, 0.5);
        this.mainLight.position.set(-300, 1000, 1000);
        this.mainLight.castShadow = true;
        this.mainLight.shadow.mapSize.width = this.mainLight.shadow.mapSize.height = 1024;
        this.mainLight.shadow.camera.right = 1200;
        this.mainLight.shadow.camera.left = -1200;
        this.mainLight.shadow.camera.top = 1200;
        this.mainLight.shadow.camera.bottom = -1200;
        this.mainLight.shadow.camera.far = 8000;
        this.mainLight.shadow.camera.near = 0.1;
        this.scene.add(this.mainLight);

        this.secondaryLight = new three.HemisphereLight(0x000000, 0xffffff, 0.5);
        this.secondaryLight.position.set(0, -500, 0);
        this.scene.add(this.secondaryLight);

        this.ambientLight = new three.AmbientLight(0xaaccff, 0.5);
        this.ambientLight.position.set(-200, -100, 0);
        this.scene.add(this.ambientLight);
    }

    setAnimation() {
        switch (this.props.animation.type) {
            case 'smooth1':
                this.animate = this.animateSmooth;
                break;
            case 'outward1':
                this.animate = this.animateOutward1;
                break;
            case 'outward2':
                this.animate = this.animateOutward2;
                break;
            case 'random':
                this.animate = this.animateRandom;
                break;
            default:
                this.animate = this.animateSmooth;
                break;
        }
    }

    render() {
        var self = this;
        self.update();
        self.renderer.render(self.scene, self.camera);
        window.requestAnimationFrame(self.render.bind(self));
    }

    update() {
        this.animate();
        this.tick++;
        this.delta = this.tick / this.props.animation.waveSize;
        if (this.props.animation.moveCamera) {
            this.camera.position.x -= Math.cos(this.tick * 0.02) * 20;
            this.camera.position.z -= Math.sin(this.tick * 0.015) * 15;
            if (this.camera.position.y < -1280)
                this.camera.position.y = -1280;
            else if (this.camera.position.y > -1280)
                this.camera.position.y -= Math.cos(this.tick * 0.012) * 12;
            this.camera.lookAt(this.globe.position);
        }
    }

    animateSmooth() {
        for (var i = this.globe.children.length; i > 0; i--) {
            var cube = this.globe.children[i - 1];
            cube.lookAt(this.globe.position);
            cube.translateX(Math.sin(this.delta + i));
            cube.translateY(Math.cos(this.delta + i));
            if (this.props.animation.scale){
                var scale = Math.pow(Math.abs(Math.sin(this.delta + i)) + 0.5, 2);
                cube.scale.set(scale, scale, scale);
            }
            else{
                cube.scale.set(1, 1, 1);
            }
        }
    }

    animateOutward1() {
        for (var i = this.globe.children.length; i > 0; i--) {
            var cube = this.globe.children[i - 1];
            cube.lookAt(this.globe.position);
            cube.translateY(Math.sin(this.delta + i));
            cube.translateZ(Math.cos(this.delta + i));
            if (this.props.animation.scale){
                var scale = Math.pow(Math.abs(Math.sin(this.delta + i)) + 0.5, 2);
                cube.scale.set(scale, scale, scale);
            }
            else{
                cube.scale.set(1, 1, 1);
            }
        }
    }

    animateOutward2() {
        for (var i = this.globe.children.length; i > 0; i--) {
            var cube = this.globe.children[i - 1];
            cube.lookAt(this.globe.position);
            cube.translateX(Math.sin(this.delta + i));
            cube.translateZ(Math.cos(this.delta + i));
            if (this.props.animation.scale){
                var scale = Math.pow(Math.abs(Math.sin(this.delta + i)) + 0.5, 2);
                cube.scale.set(scale, scale, scale);
            }
            else{
                cube.scale.set(1, 1, 1);
            }
        }
    }

    animateRandom() {
        for (var i = this.globe.children.length; i > 0; i--) {
            var cube = this.globe.children[i - 1];
            cube.lookAt(this.globe.position);
            cube.translateX(Math.sin(cube.velocity.x * this.delta));
            cube.translateZ(Math.sin(cube.velocity.z * this.delta));
            if (this.props.animation.scale){
                var scale = Math.pow(Math.abs(Math.sin(this.delta + i)) + 0.5, 2);
                cube.scale.set(scale, scale, scale);
            }
            else{
                cube.scale.set(1, 1, 1);
            }
        }
    }

    build() {
        var planeGeom = new three.PlaneGeometry(8000, 8000),
            planeMat = new three.MeshLambertMaterial({
                color: 0x6666aa,
                shading: three.FlatShading,
                side: three.DoubleSide
            });

        this.plane = new three.Mesh(planeGeom, planeMat);
        this.plane.receiveShadow = true;
        this.plane.rotation.x = HALF_PI;
        this.plane.position.set(0, -1300, 0);
        this.scene.add(this.plane);

        var sphereGeom = new three.SphereGeometry(600, 30, 50);

        this.cubes = [];
        this.globe = new three.Object3D();
        for (var i = sphereGeom.vertices.length - 31; i > 31; i--) {
            var vertex = sphereGeom.vertices[i - 1],
                cubeGeom = new three.CubeGeometry(8, 8, 8),
                mat = new three.MeshLambertMaterial({
                    color: 0xcfcfff,
                    shading: three.FlatShading
                }),
                cube = new three.Mesh(cubeGeom, mat);
            cube.velocity = {
                x: 2 - Math.random() * 4,
                y: 2 - Math.random() * 4,
                z: 2 - Math.random() * 4
            };
            cube.castShadow = true;
            cube.receiveShadow = false;
            cube.position.set(vertex.x, vertex.y, vertex.z);
            cube.lookAt(this.globe.position);
            this.globe.add(cube);
        }
        this.scene.add(this.globe);
        this.camera.position.set(0, -100, 1000);
        this.camera.lookAt(this.globe.position);
        this.mainLight.lookAt(this.globe.position);
    }

    initGUI() {
        this.gui = new dat.GUI();
        var self = this,
            f1 = this.gui.addFolder('Animation'),
            moveCam = f1.add(this.props.animation, 'moveCamera'),
            toggleScale = f1.add(this.props.animation, 'scale'),
            setWaveSize = f1.add(this.props.animation, 'waveSize').min(5).max(300).step(5),
            setAnim = f1.add(this.props.animation, 'type', ['smooth', 'outward1', 'outward2', 'random']);
        setWaveSize.onFinishChange(() => {
            self.reset();
    });
        setAnim.onFinishChange(() => {
            self.reset();
    });

        f1.open();
    }
}

window.onload = () => {
    var cubeGlobe = new CubeGlobe({
        animation: {
            moveCamera: true,
            scale: true,
            waveSize: 100,
            type: 'smooth'
        }
    });
};

window.requestAnimationFrame = (() => {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

})(this, document, three);