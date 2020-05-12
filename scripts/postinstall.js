const fs = require('fs');
const exec = require('child_process').exec;

switch (process.arch) {
    case 'arm':
    case 'arm64':
        fixTensorFlowForArm();
        break;
    case 'x32':
    case 'x64':
        console.log('Supported architecture, no actions required!');
        break;
    default:
        console.error('Unsupported processor architecture!');
}

function fixTensorFlowForArm() {
    const content = {
        "tf-lib": "https://github.com/beele/homebridge-unifi-protect-camera-motion/blob/feature/tfjs-node-upgrade/resources/tfjs-arm/libtensorflow-cpu-linux-arm-1.15.0.tar.gz?raw=true"
    };

    if (fs.existsSync(process.cwd() + '/node_modules/@tensorflow/tfjs-node/scripts/')) {
        fs.writeFileSync(process.cwd() + '/node_modules/@tensorflow/tfjs-node/scripts/custom-binary.json', JSON.stringify(content, null, 4));

        exec('npm install', {cwd: process.cwd() + '/node_modules/@tensorflow/tfjs-node/'}, (error, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
        });
    }
}