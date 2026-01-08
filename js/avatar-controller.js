// Avatar Controller - Manages avatar emotions and animations

class AvatarController {
  constructor() {
    this.engine = null;
    this.currentEmotion = 'idle';
    this.isInitialized = false;
    this.isVisible = true;
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.engine = new AvatarEngine('avatar-canvas');
      this.isInitialized = true;
      console.log('✅ Avatar Controller initialized');
    } catch (error) {
      console.error('❌ Failed to initialize avatar:', error);
    }
  }

  // Show/hide avatar
  toggle() {
    this.isVisible = !this.isVisible;
    const container = document.getElementById('avatar-container');

    if (container) {
      container.style.display = this.isVisible ? 'block' : 'none';
    }

    return this.isVisible;
  }

  // Play emotion animations
  setEmotion(emotion) {
    if (!this.isInitialized || !this.engine) return;

    console.log(`🤖 Avatar emotion: ${emotion}`);
    this.currentEmotion = emotion;
    this.engine.playAnimation(emotion);
  }

  // Convenience methods
  setIdle() {
    this.setEmotion('idle');
  }

  setThinking() {
    this.setEmotion('thinking');
  }

  setSpeaking() {
    this.setEmotion('speaking');
  }

  setHappy() {
    this.setEmotion('happy');
  }

  setSurprised() {
    this.setEmotion('surprised');
  }

  setConfused() {
    this.setEmotion('confused');
  }
}

// Create singleton instance
const avatarController = new AvatarController();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => avatarController.init());
} else {
  avatarController.init();
}
