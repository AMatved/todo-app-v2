const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const certsDir = path.join(__dirname, '../certs');
const keyPath = path.join(certsDir, 'key.pem');
const certPath = path.join(certsDir, 'cert.pem');

// Создаем папку для сертификатов
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

console.log('🔐 Generating self-signed SSL certificate...\n');

// Проверяем OpenSSL
console.log('Checking for OpenSSL...');

const platform = process.platform;

if (platform === 'win32') {
  // Windows - используем встроенный в Node.js модуль
  console.log('Platform: Windows\n');
  generateWithNodeJS();
} else {
  // Linux/Mac - используем OpenSSL
  console.log('Platform: Unix-based\n');

  const opensslCmd = `openssl req -x509 -newkey rsa:4096 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/CN=localhost"`;

  exec(opensslCmd, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ OpenSSL error. Generating with Node.js instead...\n');
      generateWithNodeJS();
      return;
    }

    console.log('✅ SSL certificate generated successfully!\n');
    console.log(`📁 Key: ${keyPath}`);
    console.log(`📁 Cert: ${certPath}\n`);
    console.log('⚠️  Note: This is a self-signed certificate.');
    console.log('    Your browser will show a security warning - this is normal!\n');
  });
}

function generateWithNodeJS() {
  // Генерируем сертификат программно (для Windows без OpenSSL)
  const forge = require('node-forge');

  console.log('Generating certificate using Node.js...\n');

  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();

  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [{
    name: 'commonName',
    value: 'localhost'
  }];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const certificatePem = forge.pki.certificateToPem(cert);

  fs.writeFileSync(keyPath, privateKeyPem);
  fs.writeFileSync(certPath, certificatePem);

  console.log('✅ SSL certificate generated successfully!\n');
  console.log(`📁 Key: ${keyPath}`);
  console.log(`📁 Cert: ${certPath}\n`);
  console.log('⚠️  Note: This is a self-signed certificate.');
  console.log('    Your browser will show a security warning - this is normal!\n');
}
