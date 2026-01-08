# 3D AI Assistant Implementation Plan for TaskFlow

## 📋 Overview
Creating an interactive 3D avatar assistant that responds to chat messages with animations and emotions.

---

## 🎯 Phase 1: Preparation & Setup (Day 1)

### Step 1.1: Create Avatar Model
**Tool:** Ready Player Me (https://readyplayer.me/)

**Instructions:**
1. Go to https://readyplayer.me/
2. Click "Create Avatar"
3. Customize appearance:
   - Hair style/color
   - Face shape
   - Clothing (professional/friendly look)
   - Accessories (glasses, etc.)
4. Click "Next" → "Claim Avatar"
5. **IMPORTANT:** Download as **GLB file** (glTF Binary)
6. Save as `avatar.glb` in `public/models/` folder

**Time:** 30 minutes
**Cost:** FREE

### Step 1.2: Install Dependencies

```bash
# Install Three.js
npm install three@0.160.0

# Install GLTF loader for avatar model
npm install @types/three --save-dev
```

**Files to add:**
- `public/models/avatar.glb` (3D model)
- `js/avatar-engine.js` (Three.js logic)
- `js/avatar-controller.js` (Animation control)

**Time:** 15 minutes

---

## 🎨 Phase 2: Three.js Setup (Day 1-2)

### Step 2.1: Create Avatar Container in HTML

**File:** `index.html`

Add to chat container (around line 320-340):

```html
<!-- Avatar Assistant Container -->
<div id="avatar-container" class="avatar-container">
  <canvas id="avatar-canvas"></canvas>
  <div class="avatar-controls">
    <button id="avatar-toggle" class="avatar-btn" title="Toggle Avatar">
      🤖
    </button>
  </div>
</div>
```

### Step 2.2: Create Avatar CSS Styles

**File:** `styles.css`

```css
/* Avatar Container */
.avatar-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 200px;
  height: 200px;
  z-index: 1000;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(236, 72, 153, 0.2));
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.avatar-container.minimized {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.avatar-container.minimized #avatar-canvas {
  opacity: 0.3;
}

#avatar-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}

.avatar-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.avatar-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.avatar-btn:hover {
  transform: scale(1.1);
  background: white;
}
```

**Time:** 30 minutes

---

## 🚀 Phase 3: Three.js Engine (Day 2-3)

### Step 3.1: Create `js/avatar-engine.js`

```javascript
// js/avatar-engine.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class AvatarEngine {
  constructor(canvasId, modelPath) {
    this.canvas = document.getElementById(canvasId);
    this.modelPath = modelPath;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.avatar = null;
    this.mixers = [];
    this.clock = new THREE.Clock();
    this.isLoaded = false;

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

    // Lighting
    this.setupLights();

    // Load model
    this.loadModel();

    // Handle resize
    window.addEventListener('resize', () => this.onResize());

    // Start render loop
    this.animate();
  }

  setupLights() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambient);

    // Directional light (main)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    this.scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xec4899, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
  }

  loadModel() {
    const loader = new GLTFLoader();

    loader.load(
      this.modelPath,
      (gltf) => {
        this.avatar = gltf.scene;
        this.avatar.position.set(0, 0, 0);
        this.avatar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(this.avatar);
        this.isLoaded = true;

        // Load animations if any
        if (gltf.animations.length > 0) {
          gltf.animations.forEach((clip) => {
            const mixer = new THREE.AnimationMixer(this.avatar);
            const action = mixer.clipAction(clip);
            this.mixers.push({ mixer, action, name: clip.name });
          });
        }

        console.log('Avatar loaded successfully!');
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`Loading: ${percent}%`);
      },
      (error) => {
        console.error('Error loading avatar:', error);
      }
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Update animations
    this.mixers.forEach(({ mixer }) => {
      mixer.update(delta);
    });

    // Idle animation (subtle breathing)
    if (this.avatar && this.isLoaded) {
      const time = this.clock.getElapsedTime();
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
  playAnimation(name) {
    const anim = this.mixers.find(a => a.name === name);
    if (anim) {
      anim.action.reset().fadeIn(0.3).play();
    }
  }

  stopAnimation(name) {
    const anim = this.mixers.find(a => a.name === name);
    if (anim) {
      anim.action.fadeOut(0.3);
    }
  }
}

export default AvatarEngine;
```

**Time:** 2-3 hours

---

## 🎭 Phase 4: Animation Controller (Day 3-4)

### Step 4.1: Create `js/avatar-controller.js`

```javascript
// js/avatar-controller.js

import AvatarEngine from './avatar-engine.js';

class AvatarController {
  constructor() {
    this.engine = null;
    this.currentEmotion = 'idle';
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    this.engine = new AvatarEngine('avatar-canvas', '/models/avatar.glb');
    this.isInitialized = true;

    console.log('Avatar controller initialized');
  }

  // Play emotion animations
  setEmotion(emotion) {
    if (!this.isInitialized) return;

    this.currentEmotion = emotion;

    const emotions = {
      'idle': () => this.playIdle(),
      'thinking': () => this.playThinking(),
      'speaking': () => this.playSpeaking(),
      'happy': () => this.playHappy(),
      'surprised': () => this.playSurprised(),
      'confused': () => this.playConfused()
    };

    if (emotions[emotion]) {
      emotions[emotion]();
    }
  }

  playIdle() {
    // Subtle breathing (already in engine)
    this.engine.avatar.rotation.set(0, 0, 0);
  }

  playThinking() {
    // Tilt head, look up
    if (!this.engine.avatar) return;

    const start = { x: 0, y: 0, z: 0 };
    const end = { x: 0.2, y: -0.3, z: 0 };

    this.animateHeadTilt(start, end, 1000);
  }

  playSpeaking() {
    // Mouth movement (subtle)
    if (!this.engine.avatar) return;

    let speaking = true;
    const speakInterval = setInterval(() => {
      if (!speaking) {
        clearInterval(speakInterval);
        return;
      }

      const jaw = this.engine.avatar.getObjectByName('Wolf3D_Teeth');
      if (jaw) {
        const open = Math.random() > 0.5;
        jaw.position.y = open ? 0.02 : 0;
      }
    }, 100);

    return () => { speaking = false; };
  }

  playHappy() {
    // Jump animation
    if (!this.engine.avatar) return;

    const startY = 0;
    const jumpHeight = 0.1;
    const duration = 500;
    const startTime = Date.now();

    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const jump = Math.sin(progress * Math.PI) * jumpHeight;
        this.engine.avatar.position.y = startY + jump;
        requestAnimationFrame(animateJump);
      } else {
        this.engine.avatar.position.y = startY;
      }
    };

    animateJump();
  }

  playSurprised() {
    // Quick head movement
    if (!this.engine.avatar) return;

    this.engine.avatar.rotation.x = -0.3;
    setTimeout(() => {
      this.engine.avatar.rotation.x = 0;
    }, 300);
  }

  playConfused() {
    // Head shake
    if (!this.engine.avatar) return;

    const shakes = 3;
    const duration = 400;
    const startTime = Date.now();

    const animateShake = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const angle = Math.sin(progress * Math.PI * shakes * 2) * 0.2;
        this.engine.avatar.rotation.y = angle;
        requestAnimationFrame(animateShake);
      } else {
        this.engine.avatar.rotation.y = 0;
      }
    };

    animateShake();
  }

  animateHeadTilt(start, end, duration) {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.easeInOutCubic(progress);

      this.engine.avatar.rotation.x = start.x + (end.x - start.x) * eased;
      this.engine.avatar.rotation.y = start.y + (end.y - start.y) * eased;
      this.engine.avatar.rotation.z = start.z + (end.z - start.z) * eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
}

// Create singleton instance
const avatarController = new AvatarController();

export default avatarController;
```

**Time:** 2-3 hours

---

## 🔗 Phase 5: Integration with Chat (Day 4-5)

### Step 5.1: Update `client.js`

Add to chat message function (around line 2140):

```javascript
// Import avatar controller
import avatarController from './js/avatar-controller.js';

// Initialize avatar when page loads
document.addEventListener('DOMContentLoaded', () => {
  avatarController.init();
});

// Update sendChatMessage function
async function sendChatMessage() {
  // ... existing code ...

  // Show "thinking" animation
  avatarController.setEmotion('thinking');

  try {
    let responseData;

    // ... existing API call code ...

    // Hide loading, show "speaking"
    hideLoadingIndicator();
    avatarController.setEmotion('speaking');

    // Display message
    const assistantMessage = {
      type: 'assistant',
      content: responseData.response,
      timestamp: responseData.timestamp || new Date().toISOString()
    };

    chatMessages.push(assistantMessage);
    displayMessage(assistantMessage);
    saveChatHistory();

    // After "speaking", show "happy"
    setTimeout(() => {
      avatarController.setEmotion('happy');
    }, 2000);

    // Back to idle
    setTimeout(() => {
      avatarController.setEmotion('idle');
    }, 4000);

  } catch (error) {
    // Show confused on error
    avatarController.setEmotion('confused');
    setTimeout(() => {
      avatarController.setEmotion('idle');
    }, 2000);

    // ... existing error handling ...
  }
}
```

**Time:** 1 hour

---

## ⚙️ Phase 6: Settings & Controls (Day 5)

### Step 6.1: Add Avatar Settings to Theme Modal

**File:** `index.html`

Add to theme modal (around line 380):

```html
<div class="avatar-settings-section">
  <h3>🤖 AI Assistant</h3>

  <div class="setting-item">
    <label>Show Avatar</label>
    <label class="toggle">
      <input type="checkbox" id="avatar-enabled" checked>
      <span class="toggle-slider"></span>
    </label>
  </div>

  <div class="setting-item">
    <label>Avatar Size</label>
    <input type="range" id="avatar-size" min="100" max="300" value="200">
  </div>

  <div class="setting-item">
    <label>Position</label>
    <select id="avatar-position">
      <option value="bottom-right">Bottom Right</option>
      <option value="bottom-left">Bottom Left</option>
      <option value="top-right">Top Right</option>
      <option value="top-left">Top Left</option>
    </select>
  </div>
</div>
```

**Time:** 1 hour

---

## 🧪 Phase 7: Testing & Optimization (Day 6-7)

### Testing Checklist:
- [ ] Avatar loads in Chrome
- [ ] Avatar loads in Firefox
- [ ] Avatar loads in Safari
- [ ] Avatar loads on mobile
- [ ] Animations play smoothly
- [ ] Emotions change correctly
- [ ] Performance is good (60 FPS)
- [ ] Memory leaks check
- [ ] Model file size optimized

### Performance Optimization:
```javascript
// Optimize model compression
// Use gltf-pipeline or Draco compression

// Reduce draw calls
// Merge geometries where possible

// Limit FPS if needed
const targetFPS = 60;
```

---

## 📊 Summary

**Total Time Estimate:** 7 days
**Difficulty:** Medium (⭐⭐⭐)
**Cost:** FREE (using free tools)

### Daily Breakdown:
- **Day 1:** Setup & Avatar creation
- **Day 2:** Three.js engine
- **Day 3:** Animation system
- **Day 4:** Chat integration
- **Day 5:** Settings & controls
- **Day 6:** Testing
- **Day 7:** Polish & optimization

---

## 🎁 Bonus Features (Optional):
- Voice input integration
- Lip-sync with audio
- More emotions (sad, angry, excited)
- Custom outfits
- Gesture animations
- Background changes

---

## 📚 Resources:
- **Three.js Docs:** https://threejs.org/docs/
- **Ready Player Me:** https://readyplayer.me/
- **GLTF Loader:** https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- **Animation System:** https://threejs.org/docs/#api/en/animation/AnimationMixer

---

**Ready to start? Begin with Phase 1!** 🚀
