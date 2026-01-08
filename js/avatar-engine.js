// Avatar Engine - Canvas 2D Version (No Three.js dependency)
// Simple robot avatar drawn with Canvas API

class AvatarEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.currentEmotion = 'idle';
    this.animationFrame = null;
    this.clock = 0;

    // Set canvas size
    this.canvas.width = 200;
    this.canvas.height = 200;

    this.init();
  }

  init() {
    // Start animation loop
    this.animate();
    console.log('✅ Avatar Engine initialized (Canvas 2D)');
  }

  animate() {
    this.animationFrame = requestAnimationFrame(() => this.animate());
    this.clock += 0.016; // ~60fps

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw avatar based on emotion
    this.drawAvatar();
  }

  drawAvatar() {
    const ctx = this.ctx;
    const centerX = 100;
    const centerY = 100;
    const time = this.clock;

    // Idle animation (subtle breathing/bobbing)
    let yOffset = 0;
    let rotation = 0;

    switch (this.currentEmotion) {
      case 'thinking':
        // Tilt head side to side
        rotation = Math.sin(time * 2) * 0.1;
        yOffset = Math.sin(time * 3) * 2;
        break;
      case 'happy':
        // Bounce animation
        yOffset = Math.abs(Math.sin(time * 8)) * -10;
        break;
      case 'surprised':
        // Quick upward movement
        yOffset = Math.sin(time * 10) * 5;
        break;
      case 'confused':
        // Shake side to side
        rotation = Math.sin(time * 8) * 0.2;
        break;
      default:
        // Idle - subtle breathing
        yOffset = Math.sin(time * 1) * 2;
        break;
    }

    // Save context for transformations
    ctx.save();
    ctx.translate(centerX, centerY + yOffset);
    ctx.rotate(rotation);

    // Draw robot body
    this.drawRobot(ctx);

    // Restore context
    ctx.restore();
  }

  drawRobot(ctx) {
    // Body (rounded rectangle)
    ctx.fillStyle = '#667eea';
    ctx.beginPath();
    ctx.roundRect(-30, 10, 60, 70, 10);
    ctx.fill();

    // Body highlight
    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.roundRect(-25, 15, 50, 60, 8);
    ctx.fill();

    // Head
    ctx.fillStyle = '#764ba2';
    ctx.beginPath();
    ctx.arc(0, -15, 30, 0, Math.PI * 2);
    ctx.fill();

    // Head highlight
    ctx.fillStyle = '#9f7aea';
    ctx.beginPath();
    ctx.arc(0, -18, 22, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    const eyeY = -18;
    const eyeOffset = 12;

    // Left eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-eyeOffset, eyeY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.arc(eyeOffset, eyeY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Pupils (move based on emotion)
    let pupilOffset = 0;
    if (this.currentEmotion === 'thinking') {
      pupilOffset = Math.sin(this.clock * 3) * 2;
    } else if (this.currentEmotion === 'confused') {
      pupilOffset = Math.sin(this.clock * 10) * 3;
    }

    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(-eyeOffset + pupilOffset, eyeY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(eyeOffset + pupilOffset, eyeY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Mouth (changes based on emotion)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();

    if (this.currentEmotion === 'happy') {
      // Smile
      ctx.arc(0, -5, 12, 0.2, Math.PI - 0.2);
    } else if (this.currentEmotion === 'surprised') {
      // Open mouth (O shape)
      ctx.ellipse(0, -5, 8, 10, 0, 0, Math.PI * 2);
    } else if (this.currentEmotion === 'thinking') {
      // Neutral/pensive
      ctx.moveTo(-8, -2);
      ctx.lineTo(8, -2);
    } else if (this.currentEmotion === 'confused') {
      // Confused line
      ctx.moveTo(-5, -2);
      ctx.lineTo(0, -5);
      ctx.lineTo(5, -2);
    } else {
      // Slight smile for idle
      ctx.arc(0, -3, 8, 0.1, Math.PI - 0.1);
    }
    ctx.stroke();

    // Arms
    ctx.fillStyle = '#667eea';

    // Left arm
    ctx.save();
    ctx.translate(-35, 30);
    let leftArmAngle = -0.3 + Math.sin(this.clock * 2) * 0.1;
    if (this.currentEmotion === 'speaking') {
      leftArmAngle = -0.3 + Math.sin(this.clock * 10) * 0.3;
    }
    ctx.rotate(leftArmAngle);
    ctx.fillRect(-5, 0, 10, 40);
    ctx.restore();

    // Right arm
    ctx.save();
    ctx.translate(35, 30);
    let rightArmAngle = 0.3 - Math.sin(this.clock * 2) * 0.1;
    if (this.currentEmotion === 'speaking') {
      rightArmAngle = 0.3 - Math.sin(this.clock * 10) * 0.3;
    }
    ctx.rotate(rightArmAngle);
    ctx.fillRect(-5, 0, 10, 40);
    ctx.restore();

    // Antenna on head
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -45);
    ctx.lineTo(0, -55);
    ctx.stroke();

    // Antenna ball
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(0, -58, 5, 0, Math.PI * 2);
    ctx.fill();

    // Glow effect for antenna
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 10 + Math.sin(this.clock * 4) * 5;
    ctx.beginPath();
    ctx.arc(0, -58, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Animation methods
  playAnimation(emotion) {
    this.currentEmotion = emotion;
    console.log(`🤖 Avatar emotion: ${emotion}`);
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
