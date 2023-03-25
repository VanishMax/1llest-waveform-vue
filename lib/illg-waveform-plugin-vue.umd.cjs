(function(n,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(n=typeof globalThis<"u"?globalThis:n||self,t(n.IllgWaveform={},n.Vue))})(this,function(n,t){"use strict";var I=Object.defineProperty;var O=(n,t,h)=>t in n?I(n,t,{enumerable:!0,configurable:!0,writable:!0,value:h}):n[t]=h;var c=(n,t,h)=>(O(n,typeof t!="symbol"?t+"":t,h),h);class h{constructor(a){c(this,"audioCtx");c(this,"audioBuffer");c(this,"audioBufferSourceNode");this.props=a,this.props=a,this.audioCtx=new AudioContext,this.audioBuffer=null,this.audioBufferSourceNode=null}get _filterData(){return this.createFilterData()}get _audioDuration(){return this.audioBuffer.duration}async setupAudio(){return await this.createAudioBuffer(),Promise.resolve("finish setup audio")}async createAudioBuffer(){const e=await(await fetch(this.props.url)).arrayBuffer();return this.audioBuffer=await this.audioCtx.decodeAudioData(e),Promise.resolve("finish create audio buffer")}createFilterData(){const a=this.props.samplingRate,e=this.audioBuffer.numberOfChannels,i=[],r=[];for(let s=0;s<e;s++)i.push(this.audioBuffer.getChannelData(s));for(let s=0;s<a;s++){let f=[0,0];for(let u=0;u<e;u++){const v=Math.floor(i[u].length/a);f[u]=i[u][s*v]}r.push(f)}return Promise.resolve(r)}connectDestination(){this.createAudioBufferSourceNode(),this.disconnectDestination(),this.audioBufferSourceNode.connect(this.audioCtx.destination)}createAudioBufferSourceNode(){this.audioBufferSourceNode=this.audioCtx.createBufferSource(),this.audioBufferSourceNode.buffer=this.audioBuffer}disconnectDestination(){this.audioBufferSourceNode&&this.audioBufferSourceNode.disconnect()}}class D extends h{constructor(e){super(e);c(this,"startAt");c(this,"pauseAt");c(this,"pickAt");c(this,"playing");this.startAt=0,this.pauseAt=0,this.pickAt=0,this.playing=!1}get _playing(){return this.playing}get _currentTime(){return this.pauseAt?this.pauseAt:this.startAt?this.audioCtx.currentTime-this.startAt:this.audioCtx.currentTime}play(){const e=this.pickAt?this.pickAt:this.pauseAt;this.connectDestination(),this.audioBufferSourceNode.start(0,e),this.startAt=this.audioCtx.currentTime-e,this.pauseAt=0,this.playing=!0}pause(){const e=this.audioCtx.currentTime-this.startAt;this.stop(),this.pauseAt=e}pick(e){e<=0&&(e=0),e>=this._audioDuration&&(e=this._audioDuration),this.pickAt=e,this.playing&&(this.stopSource(),this.play())}replay(){this.stop(),this.play()}stop(){this.stopSource(),this.initializeState()}stopSource(){this.disconnectDestination(),this.audioBufferSourceNode.stop()}initializeState(){this.playing=!1,this.startAt=0,this.pauseAt=0,this.pickAt=0}}class A{constructor(a,e,i){c(this,"canvasCtx");this.canvas=a,this.props=e,this.filteredData=i,this.canvas=a,this.canvasCtx=this.canvas.getContext("2d"),this.props=e,this.filteredData=i}get _canvas(){return this.canvas}set _props(a){this.props=a}setupCanvas(){this.setCanvasBase(),this.translateCanvasCtx(),this.drawCanvasLines()}setCanvasBase(){this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight,this.canvas.style.opacity="1"}translateCanvasCtx(){this.canvasCtx.translate(this.canvas.width/this.filteredData.length,this.canvas.height/2-this.canvas.height/2)}drawCanvasLines(){const{canvas:a,canvasCtx:e,filteredData:i}=this;i.forEach((r,s)=>{const f=a.width/i.length,u=f*s-f/2;e.moveTo(u,a.height/2-Math.abs(r[0])*a.height*2),e.lineTo(u,a.height/2+Math.abs(r[0])*a.height*2)})}setCanvasStyle(){this.canvasCtx.lineWidth=this.props.lineWidth,this.canvasCtx.lineCap=this.props.lineCap,this.canvasCtx.strokeStyle=this.props.lineStyle,this.canvasCtx.stroke()}}class W extends A{constructor(e,i,r,s){super(e,i,r);c(this,"waveCanvas");this.waveCanvas=s}setCanvasBase(){this.canvas.width=this.waveCanvas.width,this.canvas.height=this.waveCanvas.height,this.canvas.style.opacity="1"}setCanvasStyle(){this.canvasCtx.lineWidth=this.props.lineWidth,this.canvasCtx.lineCap=this.props.lineCap,this.canvasCtx.strokeStyle=this.props.maskColor,this.canvasCtx.stroke()}}function N(o,a){document.addEventListener("scroll",()=>w(o,a))}function M(o,a){document.removeEventListener("scroll",()=>w(o,a))}function w(o,a){let e=window.innerHeight,i=window.scrollY,r=window.pageYOffset+o.getBoundingClientRect().top;r>=i-e/2&&r-i-e<e/2&&a()}const S=t.defineComponent({__name:"Waveform",props:{url:null,lineWidth:{default:2},lineCap:{default:"round"},lineStyle:{default:"#2e2e2e"},samplingRate:{default:2215},cursorWidth:{default:2},cursorColor:{default:"#fff"},maskColor:{default:"#fff"},lazy:{type:Boolean,default:!0}},emits:["onPlay","onPause","onFinish","onReady"],setup(o,{expose:a,emit:e}){const i=o;let r=t.ref(!1),s=t.ref(null);t.onMounted(()=>{i.lazy?(w(t.unref(s),f),N(t.unref(s),f),t.watchEffect(async()=>{r.value&&v()})):v()}),t.onUnmounted(()=>{i.lazy&&M(t.unref(s),f)});function f(){r.value=!0}let u=t.ref(!1);async function v(){return await E(),P(),T(),u.value=!0,e("onReady",u.value),Promise.resolve("finish init waveform")}let l;async function E(){return l=new D(i),await l.setupAudio(),H(),Promise.resolve("finish init audio")}let d,m=t.ref(null);async function P(){return d=new A(t.unref(m),i,await l._filterData),d.setupCanvas(),t.watchEffect(()=>{d._props=i,d.setCanvasStyle()}),Promise.resolve("finish init audio")}let y,B=t.ref(null);async function T(){y=new W(t.unref(B),i,await l._filterData,d._canvas),y.setupCanvas(),t.watchEffect(()=>{y._props=i,y.setCanvasStyle()})}function z(){l.play(),e("onPlay",!0),x()}function R(){l.replay(),e("onFinish",!1),e("onPlay",!0),x()}function k(){l.pause(),e("onPause",!1)}function F(){e("onFinish",!0)}function H(){t.watchEffect(()=>{g.value<l._audioDuration||(k(),F())})}let C=t.ref(0),L=t.ref(0),g=t.ref(0),_=t.ref(0);function x(){!l._playing||(requestAnimationFrame(x),g.value=l._currentTime,_.value=g.value/l._audioDuration*d._canvas.width)}function V(p){C.value=p.layerX,L.value=(p.layerX/m.value.width).toFixed(2)*1}function X(){_.value=C.value;const p=C.value/d._canvas.width*l._audioDuration;l.pick(p),e("onFinish",!1)}return a({play:z,pause:k,replay:R}),(p,Y)=>(t.openBlock(),t.createElementBlock("section",{id:"ill-wave-container",ref_key:"waveformContainer",ref:s,onMousemove:V,onClick:X},[t.createElementVNode("canvas",{id:"ill-wave",ref_key:"waveRef",ref:m},null,512),t.createElementVNode("div",{id:"ill-waveMask-container",style:t.normalizeStyle(`width:${t.unref(_)}px;`)},[t.createElementVNode("canvas",{id:"ill-waveMask",ref_key:"maskRef",ref:B},null,512)],4),t.withDirectives(t.createElementVNode("div",{id:"ill-cursor",style:t.normalizeStyle(`width:${i.cursorWidth}px;
               transform: translateX(${t.unref(C)}px);
               background-color: ${i.cursorColor};
               `)},null,4),[[t.vShow,t.unref(u)]])],544))}}),$="",b={install:o=>{o.component("IllGWaveform",S)}};n.IllGWaveform=S,n.default=b,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
