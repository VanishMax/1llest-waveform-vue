(function(e,l){typeof exports=="object"&&typeof module<"u"?module.exports=l(require("vue")):typeof define=="function"&&define.amd?define(["vue"],l):(e=typeof globalThis<"u"?globalThis:e||self,e["1llest-waveform-vue"]=l(e.Vue))})(this,function(e){"use strict";var V=Object.defineProperty;var $=(e,l,f)=>l in e?V(e,l,{enumerable:!0,configurable:!0,writable:!0,value:f}):e[l]=f;var u=(e,l,f)=>($(e,typeof l!="symbol"?l+"":l,f),f);class l{constructor(a){u(this,"props");u(this,"audioCtx");u(this,"audioBuffer");u(this,"audioBufferSourceNode");this.props=a,this.audioCtx=new AudioContext}get _filterData(){return this.createFilterData()}get _audioDuration(){return this.audioBuffer.duration}async setupAudio(){await this.createAudioBuffer()}async createAudioBuffer(){const t=await(await fetch(this.props.url)).arrayBuffer();this.audioBuffer=await this.audioCtx.decodeAudioData(t)}createFilterData(){const a=this.props.samplingRate,t=this.audioBuffer.numberOfChannels,s=[],i=[];for(let o=0;o<t;o++)s.push(this.audioBuffer.getChannelData(o));for(let o=0;o<a;o++){const h=[0,0];for(let r=0;r<t;r++){const p=Math.floor(s[r].length/a);h[r]=s[r][o*p]}i.push(h)}return Promise.resolve(i)}connectDestination(){this.createAudioBufferSourceNode(),this.disconnectDestination(),this.audioBufferSourceNode.connect(this.audioCtx.destination)}createAudioBufferSourceNode(){this.audioBufferSourceNode=this.audioCtx.createBufferSource(),this.audioBufferSourceNode.buffer=this.audioBuffer}disconnectDestination(){this.audioBufferSourceNode&&this.audioBufferSourceNode.disconnect()}}class f extends l{constructor(t){super(t);u(this,"startAt");u(this,"pauseAt");u(this,"pickAt");u(this,"playing");this.startAt=0,this.pauseAt=0,this.pickAt=0,this.playing=!1}get _playing(){return this.playing}get _currentTime(){return this.pauseAt?this.pauseAt:this.startAt?this.audioCtx.currentTime-this.startAt:this.audioCtx.currentTime}play(){const t=this.pickAt?this.pickAt:this.pauseAt;this.connectDestination(),this.audioBufferSourceNode.start(0,t),this.startAt=this.audioCtx.currentTime-t,this.pauseAt=0,this.playing=!0}pause(){const t=this.audioCtx.currentTime-this.startAt;this.stop(),this.pauseAt=t}pick(t){t<=0&&(t=0),t>=this._audioDuration&&(t=this._audioDuration),this.pickAt=t,this.playing&&(this.stopSource(),this.play())}replay(){this.stop(),this.play()}stop(){this.stopSource(),this.initializeState()}stopSource(){this.disconnectDestination(),this.audioBufferSourceNode.stop()}initializeState(){this.playing=!1,this.startAt=0,this.pauseAt=0,this.pickAt=0}}class x{constructor(a,t,s){u(this,"canvasCtx");var i;this.canvas=a,this.props=t,this.filteredData=s,this.canvas=a,this.canvasCtx=(i=this.canvas)==null?void 0:i.getContext("2d"),this.props=t,this.filteredData=s}get _canvas(){return this.canvas}set _props(a){this.props=a}get _props(){return this.props}setupCanvas(){this.setCanvasBase(),this.translateCanvasCtx(),this.drawCanvasLines()}setCanvasBase(){this.canvas.width=this.canvas.offsetWidth,this.canvas.height=this.canvas.offsetHeight,this.canvas.style.opacity="1"}translateCanvasCtx(){this.canvasCtx.translate(this.canvas.width/this.filteredData.length,this.canvas.height/2-this.canvas.height/2)}drawCanvasLines(){const{canvas:a,canvasCtx:t,filteredData:s}=this;s.forEach((i,o)=>{const h=a.width/s.length,r=h*o-h/2;t.moveTo(r,a.height/2-Math.abs(i[0])*a.height*.5),t.lineTo(r,a.height/2+Math.abs(i[0])*a.height*.5)})}setCanvasStyle(){this.canvasCtx.lineWidth=this.props.lineWidth,this.canvasCtx.lineCap=this.props.lineCap,this.canvasCtx.strokeStyle=this.props.lineStyle,this.canvasCtx.stroke()}}class B extends x{constructor(t,s,i,o){super(t,s,i);u(this,"waveCanvas");this.waveCanvas=o}setCanvasBase(){this.canvas.width=this.waveCanvas.width,this.canvas.height=this.waveCanvas.height,this.canvas.style.opacity="1"}setCanvasStyle(){this.canvasCtx.lineWidth=this.props.lineWidth,this.canvasCtx.lineCap=this.props.lineCap,this.canvasCtx.strokeStyle=this.props.maskColor,this.canvasCtx.stroke()}}function D(n,a){document.addEventListener("scroll",()=>C(n,a))}function W(n,a){document.removeEventListener("scroll",()=>C(n,a))}function C(n,a){const t=window.innerHeight,s=window.scrollY,i=window.pageYOffset+n.getBoundingClientRect().top;i>=s-t/2&&i-s-t<t/2&&a()}const N={id:"ill-skeleton"},E=e.defineComponent({__name:"IllestWaveform",props:{url:null,lineWidth:{default:2},lineCap:{default:"round"},lineStyle:{default:"#5e5e5e"},samplingRate:{default:1050},cursorWidth:{default:2},cursorColor:{default:"#fff"},maskColor:{default:"#fff"},lazy:{type:Boolean,default:!0},skeleton:{type:Boolean,default:!0}},emits:["onInit","onReady","onPlay","onPause","onFinish"],setup(n,{expose:a,emit:t}){const s=n,i=e.ref(!1),o=e.ref(null);e.onMounted(()=>{s.lazy?(C(o.value,h),D(o.value,h),e.watchEffect(async()=>{i.value&&p()})):p()}),e.onUnmounted(()=>{s.lazy&&W(o.value,h)});function h(){i.value=!0}const r=e.ref(!1);async function p(){return t("onInit",!0),await b(),z(),T(),r.value=!0,t("onReady",r.value),Promise.resolve("finish init waveform")}let c;async function b(){return c=new f(s),await c.setupAudio(),H(),Promise.resolve("finish init audio")}let d;const A=e.ref(null);async function z(){return d=new x(A.value,s,await c._filterData),d.setupCanvas(),e.watchEffect(()=>{d._props=s,d.setCanvasStyle()}),Promise.resolve("finish init audio")}let v;const k=e.ref(null);async function T(){v=new B(k.value,s,await c._filterData,d._canvas),v.setupCanvas(),e.watchEffect(()=>{v._props=s,v.setCanvasStyle()})}function R(){c.play(),t("onPlay",!0),g()}function P(){c.replay(),t("onFinish",!1),t("onPlay",!0),g()}function S(){c.pause(),t("onPause",!1)}function F(){t("onFinish",!0)}function H(){e.watchEffect(()=>{_.value<c._audioDuration||(S(),F())})}const y=e.ref(0),_=e.ref(0),m=e.ref(0);function g(){!c._playing||(requestAnimationFrame(g),_.value=c._currentTime,m.value=_.value/c._audioDuration*d._canvas.width)}function I(w){!r.value||(y.value=w.layerX)}function L(){if(!r.value)return;m.value=y.value;const w=y.value/d._canvas.width*c._audioDuration;c.pick(w),t("onFinish",!1)}return a({play:R,pause:S,replay:P}),(w,q)=>(e.openBlock(),e.createElementBlock("section",{id:"ill-wave-container",ref_key:"waveformContainer",ref:o,style:e.normalizeStyle(`${r.value?"cursor: pointer":"cursor: progress;"}`),onMousemove:I,onClick:L},[e.withDirectives(e.createElementVNode("div",N,null,512),[[e.vShow,s.skeleton&&!r.value]]),e.createElementVNode("canvas",{id:"ill-wave",ref_key:"waveRef",ref:A},null,512),e.createElementVNode("div",{id:"ill-waveMask-container",style:e.normalizeStyle(`width:${m.value}px;`)},[e.createElementVNode("canvas",{id:"ill-waveMask",ref_key:"maskRef",ref:k},null,512)],4),e.withDirectives(e.createElementVNode("div",{id:"ill-cursor",style:e.normalizeStyle(`width:${s.cursorWidth}px; transform: translateX(${y.value}px);background-color: ${s.cursorColor}; `)},null,4),[[e.vShow,r.value]])],36))}}),O="",M=((n,a)=>{const t=n.__vccOpts||n;for(const[s,i]of a)t[s]=i;return t})(E,[["__scopeId","data-v-8d2bd2aa"]]);return{install:n=>{n.component("IllestWaveform",M)}}});