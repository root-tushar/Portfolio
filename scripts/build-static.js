const fs = require('fs');
const path = require('path');

// Create out directory if it doesn't exist
if (!fs.existsSync('out')) {
  fs.mkdirSync('out');
}

// Clean out directory first
const cleanDir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        cleanDir(curPath);
        fs.rmdirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
};

cleanDir('out');

// Copy static files
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Copy HTML files from server/app to out
const serverAppPath = '.next/server/app';
const files = fs.readdirSync(serverAppPath);

files.forEach(file => {
  if (file.endsWith('.html')) {
    const srcPath = path.join(serverAppPath, file);
    let destPath;
    
    if (file === 'index.html') {
      destPath = path.join('out', 'index.html');
    } else {
      const name = file.replace('.html', '');
      if (!fs.existsSync(path.join('out', name))) {
        fs.mkdirSync(path.join('out', name), { recursive: true });
      }
      destPath = path.join('out', name, 'index.html');
    }
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to ${destPath}`);
  }
});

// Copy directories
const dirs = fs.readdirSync(serverAppPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

dirs.forEach(dir => {
  const srcDir = path.join(serverAppPath, dir);
  const destDir = path.join('out', dir);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Copy HTML files from subdirectories
  const subFiles = fs.readdirSync(srcDir);
  subFiles.forEach(subFile => {
    if (subFile.endsWith('.html')) {
      const srcPath = path.join(srcDir, subFile);
      const destPath = path.join(destDir, 'index.html');
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${dir}/${subFile} to ${destPath}`);
    }
  });
});

// Copy static assets
if (fs.existsSync('.next/static')) {
  if (!fs.existsSync('out/_next')) {
    fs.mkdirSync('out/_next', { recursive: true });
  }
  copyRecursiveSync('.next/static', 'out/_next/static');
  console.log('Copied static assets');
}

// Copy public assets
if (fs.existsSync('public')) {
  const publicFiles = fs.readdirSync('public');
  publicFiles.forEach(file => {
    const srcPath = path.join('public', file);
    const destPath = path.join('out', file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else {
      copyRecursiveSync(srcPath, destPath);
    }
  });
  console.log('Copied public assets');
}

console.log('Static export completed!');