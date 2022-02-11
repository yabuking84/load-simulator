import * as childProcess  from 'child_process'
const url = 'http://hippowalletloadbalancer-568822204.eu-central-1.elb.amazonaws.com'
// const url = 'https://google.com'

const MAX_PROCESS = 5;

let times = [];
let children = [];

for (let x = 0; x < MAX_PROCESS; x++) {
  let cp = childProcess.spawn("node", ["./dist/start.js",`--url=${url}`])
  cp.stdout.on('data', (data) => {
    process.stdout.write(`[Process ${x}] ${data}`);
  });

  cp.stderr.on('data', (data) => {
    process.stdout.write(`[Process ERROR (${x})] ${data}`);
  });

  children.push(cp);  
}

