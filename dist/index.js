"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = __importStar(require("child_process"));
const url = 'http://hippowalletloadbalancer-568822204.eu-central-1.elb.amazonaws.com';
// const url = 'https://google.com'
const MAX_PROCESS = 3;
let times = [];
let children = [];
for (let x = 0; x < MAX_PROCESS; x++) {
    let cp = childProcess.spawn("node", ["./dist/start.js", `--url=${url}`]);
    cp.stdout.on('data', (data) => {
        process.stdout.write(`[Process ${x}] ${data}`);
    });
    cp.stderr.on('data', (data) => {
        process.stdout.write(`[Process ERROR (${x})] ${data}`);
    });
    children.push(cp);
}
