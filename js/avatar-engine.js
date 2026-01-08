// Avatar Engine - Simplified version for TaskFlow
// Uses Three.js from CDN instead of npm

class AvatarEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.avatar = null;
    this.clock = new THREE.Clock();
    this.isLoaded = false;
    this.mixers = [];

    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 1.6, 3);
    this.camera.lookAt(0, 1.6, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 0); // Transparent background

    // Lighting
    this.setupLights();

    // Add placeholder avatar (simple robot)
    this.createPlaceholderAvatar();

    // Handle resize
    window.addEventListener('resize', () => this.onResize());

    // Start render loop
    this.animate();

    console.log('Avatar Engine initialized');
  }

  setupLights() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambient);

    // Directional light (main)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 7);
    this.scene.add(mainLight);

    // Fill light (pink tint)
    const fillLight = new THREE.DirectionalLight(0xec4899, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }

  createPlaceholderAvatar() {
    // Simple robot avatar while waiting for real model
    const group = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.8, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    group.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x764ba2,
      shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.name = 'head';
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.08, 1.55, 0.2);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.08, 1.55, 0.2);
    group.add(rightEye);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x667eea });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 1.0, 0);
    leftArm.rotation.z = Math.PI / 4;
    leftArm.name = 'leftArm';
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 1.0, 0);
    rightArm.rotation.z = -Math.PI / 4;
    rightArm.name = 'rightArm';
    group.add(rightArm);

    this.avatar = group;
    this.scene.add(this.avatar);
    this.isLoaded = true;
  }

  loadModel(modelPath) {
    // For loading GLB models (ready for when you have the model)
    console.log('To load custom model, call: avatarEngine.loadModel("/models/avatar.glb")');
    console.log('For now, using placeholder robot avatar');
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Idle animation (subtle breathing)
    if (this.avatar && this.isLoaded) {
      this.avatar.position.y = Math.sin(time * 0.5) * 0.02;
      this.avatar.rotation.y = Math.sin(time * 0.3) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  // Animation methods
  playAnimation(animationName) {
    if (!this.avatar || !this.isLoaded) return;

    switch (animationName) {
      case 'thinking':
        this.animateThinking();
        break;
      case 'speaking':
        this.animateSpeaking();
        break;
      case 'happy':
        this.animateHappy();
        break;
      case 'surprised':
        this.animateSurprised();
        break;
      case 'confused':
        this.animateConfused();
        break;
      case 'idle':
      default:
        this.animateIdle();
        break;
    }
  }

  animateIdle() {
    // Default subtle motion (already in animate loop)
    this.avatar.rotation.set(0, 0, 0);
  }

  animateThinking() {
    // Tilt head to the side
    if (!this.avatar) return;

    const head = this.avatar.getObjectByName('head');
    if (head) {
      head.rotation.z = 0.3;
      head.rotation.x = 0.2;
    }
  }

  animateSpeaking() {
    // Move arms slightly when speaking
    if (!this.avatar) return;

    const leftArm = this.avatar.getObjectByName('leftArm');
    const rightArm = this.avatar.getObjectByName('rightArm');

    if (leftArm && rightArm) {
      leftArm.rotation.z = Math.PI / 4 + Math.sin(Date.now() * 0.01) * 0.2;
      rightArm.rotation.z = -Math.PI / 4 - Math.sin(Date.now() * 0.01) * 0.2;
    }
  }

  animateHappy() {
    // Jump animation
    if (!this.avatar) return;

    const startY = 0;
    const jumpHeight = 0.3;
    const duration = 500;
    const startTime = Date.now();

    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const jump = Math.sin(progress * Math.PI) * jumpHeight;
        this.avatar.position.y = startY + jump;
        requestAnimationFrame(animateJump);
      } else {
        this.avatar.position.y = startY;
      }
    };

    animateJump();
  }

  animateSurprised() {
    // Quick head movement
    if (!this.avatar) return;

    const head = this.avatar.getObjectByName('head');
    if (head) {
      head.rotation.x = -0.3;
      setTimeout(() => {
        head.rotation.x = 0;
      }, 300);
    }
  }

  animateConfused() {
    // Head shake
    if (!this.avatar) return;

    const shakes = 3;
    const duration = 400;
    const startTime = Date.now();

    const animateShake = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const angle = Math.sin(progress * Math.PI * shakes * 2) * 0.3;
        this.avatar.rotation.y = angle;
        requestAnimationFrame(animateShake);
      } else {
        this.avatar.rotation.y = 0;
      }
    };

    animateShake();
  }
}
