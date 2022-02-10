"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("./url"));
const axios_1 = __importDefault(require("axios"));
function startInterceptor(config) {
    // console.log("startInterceptor config = ",config);
    config.metadata = { startTime: new Date() };
    return config;
}
;
function endInterceptor(response) {
    // console.log("endInterceptor response = ",response);
    response.config.metadata.endTime = new Date();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
}
;
function isError(error) {
    throw error;
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.interceptors.request.use(startInterceptor, isError);
        axios_1.default.interceptors.response.use(endInterceptor, isError);
        const res = yield axios_1.default.get(url_1.default);
        console.log(`URL: ${url_1.default}`);
        console.log(`Status: ${res.status}`);
        // console.log(`Time Start: ${res.config.metadata.startTime}`);
        // console.log(`Time End: ${res.config.metadata.endTime}`);
        console.log(`Duration: ${res.duration}ms`);
        console.log();
    }
    catch (error) {
        console.error("ERROR: " + error.message);
        console.log();
    }
}))();