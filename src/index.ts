import * as childProcess  from 'child_process'
const url = 'http://hippowalletloadbalancer-568822204.eu-central-1.elb.amazonaws.com'

const MAX_PROCESS = 3;

let times = [];
let children = [];

for (let x = 0; x < MAX_PROCESS; x++) {
  let cp = childProcess.spawn("node", ["./dist/start.js",`--url="${url}"`])
  children.push(childProcess);  
}

