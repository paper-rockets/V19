var Vt=Object.defineProperty;var Ut=(n,e,t)=>e in n?Vt(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var ee=(n,e,t)=>Ut(n,typeof e!="symbol"?e+"":e,t);import{Z as defineStore,r as ref,p as watch,P as shallowRef,$ as triggerRef,d as defineComponent,y as onMounted,z as onBeforeUnmount,c as createElementBlock,b as createBaseVNode,U as normalizeStyle,j as createCommentVNode,o as openBlock,J as nextTick,Y as _export_sfc,V as useTemplateRef,i as createBlock,e as createVNode,w as withCtx,f as unref,a0 as Teleport,a1 as Se,x as useRouter,a2 as CheckBigIcon,a as createStaticVNode,F as Fragment,s as renderList,q as withModifiers,X as XSmallIcon,t as toDisplayString,k as resolveDynamicComponent,h as computed,n as normalizeClass,A as resolveComponent,R as RouterLink,a3 as mergeModels,l as useModel,H as createTextVNode,I as useErrorStore,E as createSlots,_ as _sfc_main$j,B as withDirectives,C as vModelText,a4 as onUpdated,D as withKeys,a5 as vModelCheckbox,T as vShow,v as useRoute}from"./index-C4iq9Zv7.js";import{a as axios,$ as $axios}from"./axios-BUEldKj0.js";import{g as getDefaultExportFromCjs,d as dayjs,c as commonjsGlobal}from"./dayjs.min-Bof1u0Bp.js";import{C as ChevronLeftIcon,H as HourglassIcon,I as IPC,_ as _sfc_main$k}from"./SignInModal.vue_vue_type_script_setup_true_lang-DCTTKfeG.js";import{a as CrossIcon,C as CommentIcon}from"./cross-CKHubnM1.js";import{L as LinkIcon,X as XCircleIcon,C as CheckIcon}from"./check-circle-B0gTTMv8.js";import{C as ChevronRightIcon}from"./chevron-right-B1Z7StHx.js";import{_ as _sfc_main$i}from"./UserThumbnail.vue_vue_type_script_setup_true_lang-B6z3nQ3I.js";import{u as useUserStore}from"./user-Ca6LP5xQ.js";import{H as HourglassSmallIcon}from"./hourglass-small-DQurQWaX.js";import{C as CupAndArrowDownIcon}from"./cup-and-arrow-down-DZLMgK3m.js";import{H as HeartIcon}from"./heart-BDH6f-AR.js";let nanoid=(n=21)=>crypto.getRandomValues(new Uint8Array(n)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");const useNoteStore=defineStore("note",()=>{const n=ref("Untitled"),e=ref(!0),t=ref(defaultsStage());watch(t,()=>{BookNote.initialized&&BookNote.shared.markChanged()},{deep:!0});const r=ref([]),a=ref(defaultsClipboard()),s=ref([]),o=shallowRef([]),l=()=>triggerRef(o),d=ref([]),c=ref({}),f=shallowRef(new Map);return{title:n,writable:e,stage:t,cameras:r,clipboard:a,brushes:s,stageProps:o,triggerStageProps:l,shots:d,groups:c,curves:f,reset:()=>{n.value="Untitled",e.value=!0,t.value=defaultsStage(),r.value=[{id:"main",type:"persp",position:[5,5,5],direction:[-.5773,-.5773,-.5773],up:[-.4082,.8164,-.4082],fov:50,focus:[0,0,0]}],a.value=defaultsClipboard(),s.value=[],o.value=[],d.value=[],c.value={root:{id:"root",name:"root",visibility:!0,parent:"",expanded:!0,children:[]}},f.value=new Map}}}),defaultsStage=()=>({grid:!0,fog:!0,axis:!1,render:!1,backgroundColor:[255,255,255],light:{directional:{color:[255,255,255],intensity:1,direction:[0,0]},groundShadow:!1,toonShading:!1},postprocessing:{glow:{enabled:!1,value:50},dof:{enabled:!1,value:8},grain:{enabled:!1,value:50},pixelation:{enabled:!1,value:50}}}),defaultsClipboard=()=>({size:{width:332,height:240},position:{x:0,y:0},opacity:100,contentIndex:0,contents:[]});function getBaseName(n){const e=n.match(/^(.*?)(?: \(\d+\))?$/);return e?e[1]:n}function getUniqueName(n,e,t){const r=n.split("/"),a=r[r.length-1],s=a.lastIndexOf("."),o=s!==-1?a.slice(s):"",l=s!==-1?a.slice(0,s):a;r[r.length-1]=l;const d=r.join("/"),c=getBaseName(d);let f;{f=n;const _=new Set(e);let m=1;for(;_.has(f);)m+=1,f=`${c} (${m})${o}`}return f}var lz4$1={},xxh32$1={},util$1={};util$1.hashU32=function(e){return e=e|0,e=e+2127912214+(e<<12)|0,e=e^-949894596^e>>>19,e=e+374761393+(e<<5)|0,e=e+-744332180^e<<9,e=e+-42973499+(e<<3)|0,e^-1252372727^e>>>16|0};util$1.readU64=function(e,t){var r=0;return r|=e[t++]<<0,r|=e[t++]<<8,r|=e[t++]<<16,r|=e[t++]<<24,r|=e[t++]<<32,r|=e[t++]<<40,r|=e[t++]<<48,r|=e[t++]<<56,r};util$1.readU32=function(e,t){var r=0;return r|=e[t++]<<0,r|=e[t++]<<8,r|=e[t++]<<16,r|=e[t++]<<24,r};util$1.writeU32=function(e,t,r){e[t++]=r>>0&255,e[t++]=r>>8&255,e[t++]=r>>16&255,e[t++]=r>>24&255};util$1.imul=function(e,t){var r=e>>>16,a=e&65535,s=t>>>16,o=t&65535;return a*o+(r*o+a*s<<16)|0};var util=util$1,prime1=2654435761,prime2=2246822519,prime3=3266489917,prime4=668265263,prime5=374761393;function rotl32(n,e){return n=n|0,e=e|0,n>>>(32-e|0)|n<<e|0}function rotmul32(n,e,t){return n=n|0,e=e|0,t=t|0,util.imul(n>>>(32-e|0)|n<<e,t)|0}function shiftxor32(n,e){return n=n|0,e=e|0,n>>>e^n|0}function xxhapply(n,e,t,r,a){return rotmul32(util.imul(e,t)+n,r,a)}function xxh1(n,e,t){return rotmul32(n+util.imul(e[t],prime5),11,prime1)}function xxh4(n,e,t){return xxhapply(n,util.readU32(e,t),prime3,17,prime4)}function xxh16(n,e,t){return[xxhapply(n[0],util.readU32(e,t+0),prime2,13,prime1),xxhapply(n[1],util.readU32(e,t+4),prime2,13,prime1),xxhapply(n[2],util.readU32(e,t+8),prime2,13,prime1),xxhapply(n[3],util.readU32(e,t+12),prime2,13,prime1)]}function xxh32(n,e,t,r){var a,s;if(s=r,r>=16){for(a=[n+prime1+prime2,n+prime2,n,n-prime1];r>=16;)a=xxh16(a,e,t),t+=16,r-=16;a=rotl32(a[0],1)+rotl32(a[1],7)+rotl32(a[2],12)+rotl32(a[3],18)+s}else a=n+prime5+r>>>0;for(;r>=4;)a=xxh4(a,e,t),t+=4,r-=4;for(;r>0;)a=xxh1(a,e,t),t++,r--;return a=shiftxor32(util.imul(shiftxor32(util.imul(shiftxor32(a,15),prime2),13),prime3),16),a>>>0}xxh32$1.hash=xxh32;(function(n){var e=xxh32$1,t=util$1,r=4,a=13,s=5,o=6,l=65536,d=4,c=(1<<d)-1,f=4,_=(1<<f)-1,m=I(5<<20),g=P(),y=407708164,x=4,u=8,p=16,M=64,S=192,b=2147483648,A=7,T=4,E=7,B={4:65536,5:262144,6:1048576,7:4194304};function P(){try{return new Uint32Array(l)}catch{for(var D=new Array(l),V=0;V<l;V++)D[V]=0;return D}}function C(D){for(var V=0;V<l;V++)g[V]=0}function I(D){try{return new Uint8Array(D)}catch{for(var V=new Array(D),R=0;R<D;R++)V[R]=0;return V}}function N(D,V,R){if(typeof D.buffer!==void 0){if(Uint8Array.prototype.slice)return D.slice(V,R);var F=D.length;V=V|0,V=V<0?Math.max(F+V,0):Math.min(V,F),R=R===void 0?F:R|0,R=R<0?Math.max(F+R,0):Math.min(R,F);for(var $=new Uint8Array(R-V),W=V,J=0;W<R;)$[J++]=D[W++];return $}else return D.slice(V,R)}n.compressBound=function(V){return V+V/255+16|0},n.decompressBound=function(V){var R=0;if(t.readU32(V,R)!==y)throw new Error("invalid magic number");R+=4;var F=V[R++];if((F&S)!==M)throw new Error("incompatible descriptor version "+(F&S));var $=(F&p)!==0,W=(F&u)!==0,J=V[R++]>>T&E;if(B[J]===void 0)throw new Error("invalid block size "+J);var j=B[J];if(W)return t.readU64(V,R);R++;for(var ie=0;;){var ae=t.readU32(V,R);if(R+=4,ae&b?(ae&=~b,ie+=ae):ie+=j,ae===0)return ie;$&&(R+=4),R+=ae}},n.makeBuffer=I,n.decompressBlock=function(V,R,F,$,W){var J,j,ie,ae,he;for(ie=F+$;F<ie;){var z=V[F++],X=z>>4;if(X>0){if(X===15)for(;X+=V[F],V[F++]===255;);for(ae=F+X;F<ae;)R[W++]=V[F++]}if(F>=ie)break;if(J=z&15,j=V[F++]|V[F++]<<8,J===15)for(;J+=V[F],V[F++]===255;);for(J+=r,he=W-j,ae=he+J;he<ae;)R[W++]=R[he++]|0}return W},n.compressBlock=function(V,R,F,$,W){var J,j,ie,ae,he,z,X,re,Y;if(X=0,re=$+F,j=F,$>=a)for(var de=(1<<o)+3;F+r<re-s;){var fe=t.readU32(V,F),Te=t.hashU32(fe)>>>0;if(Te=(Te>>16^Te)>>>0&65535,J=W[Te]-1,W[Te]=F+1,J<0||F-J>>>16>0||t.readU32(V,J)!==fe){he=de++>>o,F+=he;continue}for(de=(1<<o)+3,z=F-j,ae=F-J,F+=r,J+=r,ie=F;F<re-s&&V[F]===V[J];)F++,J++;ie=F-ie;var O=ie<c?ie:c;if(z>=_){for(R[X++]=(_<<d)+O,Y=z-_;Y>=255;Y-=255)R[X++]=255;R[X++]=Y}else R[X++]=(z<<d)+O;for(var Ae=0;Ae<z;Ae++)R[X++]=V[j+Ae];if(R[X++]=ae,R[X++]=ae>>8,ie>=c){for(Y=ie-c;Y>=255;Y-=255)R[X++]=255;R[X++]=Y}j=F}if(j===0)return 0;if(z=re-j,z>=_){for(R[X++]=_<<d,Y=z-_;Y>=255;Y-=255)R[X++]=255;R[X++]=Y}else R[X++]=z<<d;for(F=j;F<re;)R[X++]=V[F++];return X},n.decompressFrame=function(V,R){var F,$,W,J,j=0,ie=0;if(t.readU32(V,j)!==y)throw new Error("invalid magic number");if(j+=4,J=V[j++],(J&S)!==M)throw new Error("incompatible descriptor version");F=(J&p)!==0,$=(J&x)!==0,W=(J&u)!==0;var ae=V[j++]>>T&E;if(B[ae]===void 0)throw new Error("invalid block size");for(W&&(j+=8),j++;;){var he;if(he=t.readU32(V,j),j+=4,he===0)break;if(F&&(j+=4),he&b){he&=~b;for(var z=0;z<he;z++)R[ie++]=V[j++]}else ie=n.decompressBlock(V,R,j,he,ie),j+=he}return $&&(j+=4),ie},n.compressFrame=function(V,R){var F=0;t.writeU32(R,F,y),F+=4,R[F++]=M,R[F++]=A<<T,R[F]=e.hash(0,R,4,F-4)>>8,F++;var $=B[A],W=V.length,J=0;for(C();W>0;){var j=0,ie=W>$?$:W;if(j=n.compressBlock(V,m,J,ie,g),j>ie||j===0){t.writeU32(R,F,2147483648|ie),F+=4;for(var ae=J+ie;J<ae;)R[F++]=V[J++];W-=ie}else{t.writeU32(R,F,j),F+=4;for(var he=0;he<j;)R[F++]=m[he++];J+=ie,W-=ie}}return t.writeU32(R,F,0),F+=4,F},n.decompress=function(V,R){var F,$;return R===void 0&&(R=n.decompressBound(V)),F=n.makeBuffer(R),$=n.decompressFrame(V,F),$!==R&&(F=N(F,0,$)),F},n.compress=function(V,R){var F,$;return R===void 0&&(R=n.compressBound(V.length)),F=n.makeBuffer(R),$=n.compressFrame(V,F),$!==R&&(F=N(F,0,$)),F}})(lz4$1);const lz4=getDefaultExportFromCjs(lz4$1);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const REVISION="165",CullFaceNone=0,CullFaceBack=1,CullFaceFront=2,PCFShadowMap=1,PCFSoftShadowMap=2,VSMShadowMap=3,FrontSide=0,BackSide=1,DoubleSide=2,NoBlending=0,NormalBlending=1,AdditiveBlending=2,SubtractiveBlending=3,MultiplyBlending=4,CustomBlending=5,AddEquation=100,SubtractEquation=101,ReverseSubtractEquation=102,MinEquation=103,MaxEquation=104,ZeroFactor=200,OneFactor=201,SrcColorFactor=202,OneMinusSrcColorFactor=203,SrcAlphaFactor=204,OneMinusSrcAlphaFactor=205,DstAlphaFactor=206,OneMinusDstAlphaFactor=207,DstColorFactor=208,OneMinusDstColorFactor=209,SrcAlphaSaturateFactor=210,ConstantColorFactor=211,OneMinusConstantColorFactor=212,ConstantAlphaFactor=213,OneMinusConstantAlphaFactor=214,NeverDepth=0,AlwaysDepth=1,LessDepth=2,LessEqualDepth=3,EqualDepth=4,GreaterEqualDepth=5,GreaterDepth=6,NotEqualDepth=7,MultiplyOperation=0,MixOperation=1,AddOperation=2,NoToneMapping=0,LinearToneMapping=1,ReinhardToneMapping=2,CineonToneMapping=3,ACESFilmicToneMapping=4,CustomToneMapping=5,AgXToneMapping=6,NeutralToneMapping=7,UVMapping=300,CubeReflectionMapping=301,CubeRefractionMapping=302,EquirectangularReflectionMapping=303,EquirectangularRefractionMapping=304,CubeUVReflectionMapping=306,RepeatWrapping=1e3,ClampToEdgeWrapping=1001,MirroredRepeatWrapping=1002,NearestFilter=1003,NearestMipmapNearestFilter=1004,NearestMipmapLinearFilter=1005,LinearFilter=1006,LinearMipmapNearestFilter=1007,LinearMipmapLinearFilter=1008,UnsignedByteType=1009,ByteType=1010,ShortType=1011,UnsignedShortType=1012,IntType=1013,UnsignedIntType=1014,FloatType=1015,HalfFloatType=1016,UnsignedShort4444Type=1017,UnsignedShort5551Type=1018,UnsignedInt248Type=1020,UnsignedInt5999Type=35902,AlphaFormat=1021,RGBFormat=1022,RGBAFormat=1023,LuminanceFormat=1024,LuminanceAlphaFormat=1025,DepthFormat=1026,DepthStencilFormat=1027,RedFormat=1028,RedIntegerFormat=1029,RGFormat=1030,RGIntegerFormat=1031,RGBAIntegerFormat=1033,RGB_S3TC_DXT1_Format=33776,RGBA_S3TC_DXT1_Format=33777,RGBA_S3TC_DXT3_Format=33778,RGBA_S3TC_DXT5_Format=33779,RGB_PVRTC_4BPPV1_Format=35840,RGB_PVRTC_2BPPV1_Format=35841,RGBA_PVRTC_4BPPV1_Format=35842,RGBA_PVRTC_2BPPV1_Format=35843,RGB_ETC1_Format=36196,RGB_ETC2_Format=37492,RGBA_ETC2_EAC_Format=37496,RGBA_ASTC_4x4_Format=37808,RGBA_ASTC_5x4_Format=37809,RGBA_ASTC_5x5_Format=37810,RGBA_ASTC_6x5_Format=37811,RGBA_ASTC_6x6_Format=37812,RGBA_ASTC_8x5_Format=37813,RGBA_ASTC_8x6_Format=37814,RGBA_ASTC_8x8_Format=37815,RGBA_ASTC_10x5_Format=37816,RGBA_ASTC_10x6_Format=37817,RGBA_ASTC_10x8_Format=37818,RGBA_ASTC_10x10_Format=37819,RGBA_ASTC_12x10_Format=37820,RGBA_ASTC_12x12_Format=37821,RGBA_BPTC_Format=36492,RGB_BPTC_SIGNED_Format=36494,RGB_BPTC_UNSIGNED_Format=36495,RED_RGTC1_Format=36283,SIGNED_RED_RGTC1_Format=36284,RED_GREEN_RGTC2_Format=36285,SIGNED_RED_GREEN_RGTC2_Format=36286,BasicDepthPacking=3200,RGBADepthPacking=3201,TangentSpaceNormalMap=0,ObjectSpaceNormalMap=1,NoColorSpace="",SRGBColorSpace="srgb",LinearSRGBColorSpace="srgb-linear",DisplayP3ColorSpace="display-p3",LinearDisplayP3ColorSpace="display-p3-linear",LinearTransfer="linear",SRGBTransfer="srgb",Rec709Primaries="rec709",P3Primaries="p3",KeepStencilOp=7680,AlwaysStencilFunc=519,NeverCompare=512,LessCompare=513,EqualCompare=514,LessEqualCompare=515,GreaterCompare=516,NotEqualCompare=517,GreaterEqualCompare=518,AlwaysCompare=519,StaticDrawUsage=35044,GLSL3="300 es",WebGLCoordinateSystem=2e3,WebGPUCoordinateSystem=2001;class EventDispatcher{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let s=0,o=a.length;s<o;s++)a[s].call(this,e);e.target=null}}}const _lut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],DEG2RAD=Math.PI/180,RAD2DEG=180/Math.PI;function generateUUID(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_lut[n&255]+_lut[n>>8&255]+_lut[n>>16&255]+_lut[n>>24&255]+"-"+_lut[e&255]+_lut[e>>8&255]+"-"+_lut[e>>16&15|64]+_lut[e>>24&255]+"-"+_lut[t&63|128]+_lut[t>>8&255]+"-"+_lut[t>>16&255]+_lut[t>>24&255]+_lut[r&255]+_lut[r>>8&255]+_lut[r>>16&255]+_lut[r>>24&255]).toLowerCase()}function clamp(n,e,t){return Math.max(e,Math.min(t,n))}function euclideanModulo(n,e){return(n%e+e)%e}function lerp(n,e,t){return(1-t)*n+t*e}function denormalize(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function normalize(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Vector2{constructor(e=0,t=0){Vector2.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(clamp(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*r-o*a+e.x,this.y=s*a+o*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Matrix3{constructor(e,t,r,a,s,o,l,d,c){Matrix3.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,s,o,l,d,c)}set(e,t,r,a,s,o,l,d,c){const f=this.elements;return f[0]=e,f[1]=a,f[2]=l,f[3]=t,f[4]=s,f[5]=d,f[6]=r,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,s=this.elements,o=r[0],l=r[3],d=r[6],c=r[1],f=r[4],_=r[7],m=r[2],g=r[5],y=r[8],x=a[0],u=a[3],p=a[6],M=a[1],S=a[4],b=a[7],A=a[2],T=a[5],E=a[8];return s[0]=o*x+l*M+d*A,s[3]=o*u+l*S+d*T,s[6]=o*p+l*b+d*E,s[1]=c*x+f*M+_*A,s[4]=c*u+f*S+_*T,s[7]=c*p+f*b+_*E,s[2]=m*x+g*M+y*A,s[5]=m*u+g*S+y*T,s[8]=m*p+g*b+y*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],s=e[3],o=e[4],l=e[5],d=e[6],c=e[7],f=e[8];return t*o*f-t*l*c-r*s*f+r*l*d+a*s*c-a*o*d}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],s=e[3],o=e[4],l=e[5],d=e[6],c=e[7],f=e[8],_=f*o-l*c,m=l*d-f*s,g=c*s-o*d,y=t*_+r*m+a*g;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/y;return e[0]=_*x,e[1]=(a*c-f*r)*x,e[2]=(l*r-a*o)*x,e[3]=m*x,e[4]=(f*t-a*d)*x,e[5]=(a*s-l*t)*x,e[6]=g*x,e[7]=(r*d-c*t)*x,e[8]=(o*t-r*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,s,o,l){const d=Math.cos(s),c=Math.sin(s);return this.set(r*d,r*c,-r*(d*o+c*l)+o+e,-a*c,a*d,-a*(-c*o+d*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(_m3.makeScale(e,t)),this}rotate(e){return this.premultiply(_m3.makeRotation(-e)),this}translate(e,t){return this.premultiply(_m3.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _m3=new Matrix3;function arrayNeedsUint32(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function createElementNS(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function createCanvasElement(){const n=createElementNS("canvas");return n.style.display="block",n}const _cache={};function warnOnce(n){n in _cache||(_cache[n]=!0,console.warn(n))}function probeAsync(n,e,t){return new Promise(function(r,a){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:r()}}setTimeout(s,t)})}const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3=new Matrix3().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),LINEAR_DISPLAY_P3_TO_LINEAR_SRGB=new Matrix3().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),COLOR_SPACES={[LinearSRGBColorSpace]:{transfer:LinearTransfer,primaries:Rec709Primaries,toReference:n=>n,fromReference:n=>n},[SRGBColorSpace]:{transfer:SRGBTransfer,primaries:Rec709Primaries,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[LinearDisplayP3ColorSpace]:{transfer:LinearTransfer,primaries:P3Primaries,toReference:n=>n.applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),fromReference:n=>n.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3)},[DisplayP3ColorSpace]:{transfer:SRGBTransfer,primaries:P3Primaries,toReference:n=>n.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),fromReference:n=>n.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB()}},SUPPORTED_WORKING_COLOR_SPACES=new Set([LinearSRGBColorSpace,LinearDisplayP3ColorSpace]),ColorManagement={enabled:!0,_workingColorSpace:LinearSRGBColorSpace,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!SUPPORTED_WORKING_COLOR_SPACES.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const r=COLOR_SPACES[e].toReference,a=COLOR_SPACES[t].fromReference;return a(r(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return COLOR_SPACES[n].primaries},getTransfer:function(n){return n===NoColorSpace?LinearTransfer:COLOR_SPACES[n].transfer}};function SRGBToLinear(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function LinearToSRGB(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _canvas;class ImageUtils{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_canvas===void 0&&(_canvas=createElementNS("canvas")),_canvas.width=e.width,_canvas.height=e.height;const r=_canvas.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=_canvas}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=createElementNS("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),s=a.data;for(let o=0;o<s.length;o++)s[o]=SRGBToLinear(s[o]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(SRGBToLinear(t[r]/255)*255):t[r]=SRGBToLinear(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _sourceId=0;class Source{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_sourceId++}),this.uuid=generateUUID(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let o=0,l=a.length;o<l;o++)a[o].isDataTexture?s.push(serializeImage(a[o].image)):s.push(serializeImage(a[o]))}else s=serializeImage(a);r.url=s}return t||(e.images[this.uuid]=r),r}}function serializeImage(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ImageUtils.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _textureId=0;class Texture extends EventDispatcher{constructor(e=Texture.DEFAULT_IMAGE,t=Texture.DEFAULT_MAPPING,r=ClampToEdgeWrapping,a=ClampToEdgeWrapping,s=LinearFilter,o=LinearMipmapLinearFilter,l=RGBAFormat,d=UnsignedByteType,c=Texture.DEFAULT_ANISOTROPY,f=NoColorSpace){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_textureId++}),this.uuid=generateUUID(),this.name="",this.source=new Source(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=d,this.offset=new Vector2(0,0),this.repeat=new Vector2(1,1),this.center=new Vector2(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Matrix3,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==UVMapping)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case RepeatWrapping:e.x=e.x-Math.floor(e.x);break;case ClampToEdgeWrapping:e.x=e.x<0?0:1;break;case MirroredRepeatWrapping:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case RepeatWrapping:e.y=e.y-Math.floor(e.y);break;case ClampToEdgeWrapping:e.y=e.y<0?0:1;break;case MirroredRepeatWrapping:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Texture.DEFAULT_IMAGE=null;Texture.DEFAULT_MAPPING=UVMapping;Texture.DEFAULT_ANISOTROPY=1;class Vector4{constructor(e=0,t=0,r=0,a=1){Vector4.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*r+o[8]*a+o[12]*s,this.y=o[1]*t+o[5]*r+o[9]*a+o[13]*s,this.z=o[2]*t+o[6]*r+o[10]*a+o[14]*s,this.w=o[3]*t+o[7]*r+o[11]*a+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,s;const d=e.elements,c=d[0],f=d[4],_=d[8],m=d[1],g=d[5],y=d[9],x=d[2],u=d[6],p=d[10];if(Math.abs(f-m)<.01&&Math.abs(_-x)<.01&&Math.abs(y-u)<.01){if(Math.abs(f+m)<.1&&Math.abs(_+x)<.1&&Math.abs(y+u)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,b=(g+1)/2,A=(p+1)/2,T=(f+m)/4,E=(_+x)/4,B=(y+u)/4;return S>b&&S>A?S<.01?(r=0,a=.707106781,s=.707106781):(r=Math.sqrt(S),a=T/r,s=E/r):b>A?b<.01?(r=.707106781,a=0,s=.707106781):(a=Math.sqrt(b),r=T/a,s=B/a):A<.01?(r=.707106781,a=.707106781,s=0):(s=Math.sqrt(A),r=E/s,a=B/s),this.set(r,a,s,t),this}let M=Math.sqrt((u-y)*(u-y)+(_-x)*(_-x)+(m-f)*(m-f));return Math.abs(M)<.001&&(M=1),this.x=(u-y)/M,this.y=(_-x)/M,this.z=(m-f)/M,this.w=Math.acos((c+g+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class RenderTarget extends EventDispatcher{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Vector4(0,0,e,t),this.scissorTest=!1,this.viewport=new Vector4(0,0,e,t);const a={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:LinearFilter,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const s=new Texture(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);s.flipY=!1,s.generateMipmaps=r.generateMipmaps,s.internalFormat=r.internalFormat,this.textures=[];const o=r.count;for(let l=0;l<o;l++)this.textures[l]=s.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Source(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class WebGLRenderTarget extends RenderTarget{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class DataArrayTexture extends Texture{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Data3DTexture extends Texture{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=NearestFilter,this.minFilter=NearestFilter,this.wrapR=ClampToEdgeWrapping,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Quaternion{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,s,o,l){let d=r[a+0],c=r[a+1],f=r[a+2],_=r[a+3];const m=s[o+0],g=s[o+1],y=s[o+2],x=s[o+3];if(l===0){e[t+0]=d,e[t+1]=c,e[t+2]=f,e[t+3]=_;return}if(l===1){e[t+0]=m,e[t+1]=g,e[t+2]=y,e[t+3]=x;return}if(_!==x||d!==m||c!==g||f!==y){let u=1-l;const p=d*m+c*g+f*y+_*x,M=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const A=Math.sqrt(S),T=Math.atan2(A,p*M);u=Math.sin(u*T)/A,l=Math.sin(l*T)/A}const b=l*M;if(d=d*u+m*b,c=c*u+g*b,f=f*u+y*b,_=_*u+x*b,u===1-l){const A=1/Math.sqrt(d*d+c*c+f*f+_*_);d*=A,c*=A,f*=A,_*=A}}e[t]=d,e[t+1]=c,e[t+2]=f,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,a,s,o){const l=r[a],d=r[a+1],c=r[a+2],f=r[a+3],_=s[o],m=s[o+1],g=s[o+2],y=s[o+3];return e[t]=l*y+f*_+d*g-c*m,e[t+1]=d*y+f*m+c*_-l*g,e[t+2]=c*y+f*g+l*m-d*_,e[t+3]=f*y-l*_-d*m-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,s=e._z,o=e._order,l=Math.cos,d=Math.sin,c=l(r/2),f=l(a/2),_=l(s/2),m=d(r/2),g=d(a/2),y=d(s/2);switch(o){case"XYZ":this._x=m*f*_+c*g*y,this._y=c*g*_-m*f*y,this._z=c*f*y+m*g*_,this._w=c*f*_-m*g*y;break;case"YXZ":this._x=m*f*_+c*g*y,this._y=c*g*_-m*f*y,this._z=c*f*y-m*g*_,this._w=c*f*_+m*g*y;break;case"ZXY":this._x=m*f*_-c*g*y,this._y=c*g*_+m*f*y,this._z=c*f*y+m*g*_,this._w=c*f*_-m*g*y;break;case"ZYX":this._x=m*f*_-c*g*y,this._y=c*g*_+m*f*y,this._z=c*f*y-m*g*_,this._w=c*f*_+m*g*y;break;case"YZX":this._x=m*f*_+c*g*y,this._y=c*g*_+m*f*y,this._z=c*f*y-m*g*_,this._w=c*f*_-m*g*y;break;case"XZY":this._x=m*f*_-c*g*y,this._y=c*g*_-m*f*y,this._z=c*f*y+m*g*_,this._w=c*f*_+m*g*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],s=t[8],o=t[1],l=t[5],d=t[9],c=t[2],f=t[6],_=t[10],m=r+l+_;if(m>0){const g=.5/Math.sqrt(m+1);this._w=.25/g,this._x=(f-d)*g,this._y=(s-c)*g,this._z=(o-a)*g}else if(r>l&&r>_){const g=2*Math.sqrt(1+r-l-_);this._w=(f-d)/g,this._x=.25*g,this._y=(a+o)/g,this._z=(s+c)/g}else if(l>_){const g=2*Math.sqrt(1+l-r-_);this._w=(s-c)/g,this._x=(a+o)/g,this._y=.25*g,this._z=(d+f)/g}else{const g=2*Math.sqrt(1+_-r-l);this._w=(o-a)/g,this._x=(s+c)/g,this._y=(d+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(clamp(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,s=e._z,o=e._w,l=t._x,d=t._y,c=t._z,f=t._w;return this._x=r*f+o*l+a*c-s*d,this._y=a*f+o*d+s*l-r*c,this._z=s*f+o*c+r*d-a*l,this._w=o*f-r*l-a*d-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,a=this._y,s=this._z,o=this._w;let l=o*e._w+r*e._x+a*e._y+s*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=r,this._y=a,this._z=s,this;const d=1-l*l;if(d<=Number.EPSILON){const g=1-t;return this._w=g*o+t*this._w,this._x=g*r+t*this._x,this._y=g*a+t*this._y,this._z=g*s+t*this._z,this.normalize(),this}const c=Math.sqrt(d),f=Math.atan2(c,l),_=Math.sin((1-t)*f)/c,m=Math.sin(t*f)/c;return this._w=o*_+this._w*m,this._x=r*_+this._x*m,this._y=a*_+this._y*m,this._z=s*_+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),s=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Vector3{constructor(e=0,t=0,r=0){Vector3.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_quaternion$4.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6]*a,this.y=s[1]*t+s[4]*r+s[7]*a,this.z=s[2]*t+s[5]*r+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,s=e.elements,o=1/(s[3]*t+s[7]*r+s[11]*a+s[15]);return this.x=(s[0]*t+s[4]*r+s[8]*a+s[12])*o,this.y=(s[1]*t+s[5]*r+s[9]*a+s[13])*o,this.z=(s[2]*t+s[6]*r+s[10]*a+s[14])*o,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,s=e.x,o=e.y,l=e.z,d=e.w,c=2*(o*a-l*r),f=2*(l*t-s*a),_=2*(s*r-o*t);return this.x=t+d*c+o*_-l*f,this.y=r+d*f+l*c-s*_,this.z=a+d*_+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*a,this.y=s[1]*t+s[5]*r+s[9]*a,this.z=s[2]*t+s[6]*r+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,s=e.z,o=t.x,l=t.y,d=t.z;return this.x=a*d-s*l,this.y=s*o-r*d,this.z=r*l-a*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return _vector$c.copy(this).projectOnVector(e),this.sub(_vector$c)}reflect(e){return this.sub(_vector$c.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(clamp(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _vector$c=new Vector3,_quaternion$4=new Quaternion;class Box3{constructor(e=new Vector3(1/0,1/0,1/0),t=new Vector3(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(_vector$b.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(_vector$b.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=_vector$b.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const s=r.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,_vector$b):_vector$b.fromBufferAttribute(s,o),_vector$b.applyMatrix4(e.matrixWorld),this.expandByPoint(_vector$b);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_box$4.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),_box$4.copy(r.boundingBox)),_box$4.applyMatrix4(e.matrixWorld),this.union(_box$4)}const a=e.children;for(let s=0,o=a.length;s<o;s++)this.expandByObject(a[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,_vector$b),_vector$b.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_center),_extents.subVectors(this.max,_center),_v0$2.subVectors(e.a,_center),_v1$7.subVectors(e.b,_center),_v2$4.subVectors(e.c,_center),_f0.subVectors(_v1$7,_v0$2),_f1.subVectors(_v2$4,_v1$7),_f2.subVectors(_v0$2,_v2$4);let t=[0,-_f0.z,_f0.y,0,-_f1.z,_f1.y,0,-_f2.z,_f2.y,_f0.z,0,-_f0.x,_f1.z,0,-_f1.x,_f2.z,0,-_f2.x,-_f0.y,_f0.x,0,-_f1.y,_f1.x,0,-_f2.y,_f2.x,0];return!satForAxes(t,_v0$2,_v1$7,_v2$4,_extents)||(t=[1,0,0,0,1,0,0,0,1],!satForAxes(t,_v0$2,_v1$7,_v2$4,_extents))?!1:(_triangleNormal.crossVectors(_f0,_f1),t=[_triangleNormal.x,_triangleNormal.y,_triangleNormal.z],satForAxes(t,_v0$2,_v1$7,_v2$4,_extents))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_vector$b).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_vector$b).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_points[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_points[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_points[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_points[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_points[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_points[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_points[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_points[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_points),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _points=[new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3,new Vector3],_vector$b=new Vector3,_box$4=new Box3,_v0$2=new Vector3,_v1$7=new Vector3,_v2$4=new Vector3,_f0=new Vector3,_f1=new Vector3,_f2=new Vector3,_center=new Vector3,_extents=new Vector3,_triangleNormal=new Vector3,_testAxis=new Vector3;function satForAxes(n,e,t,r,a){for(let s=0,o=n.length-3;s<=o;s+=3){_testAxis.fromArray(n,s);const l=a.x*Math.abs(_testAxis.x)+a.y*Math.abs(_testAxis.y)+a.z*Math.abs(_testAxis.z),d=e.dot(_testAxis),c=t.dot(_testAxis),f=r.dot(_testAxis);if(Math.max(-Math.max(d,c,f),Math.min(d,c,f))>l)return!1}return!0}const _box$3=new Box3,_v1$6=new Vector3,_v2$3=new Vector3;class Sphere{constructor(e=new Vector3,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):_box$3.setFromPoints(e).getCenter(r);let a=0;for(let s=0,o=e.length;s<o;s++)a=Math.max(a,r.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_v1$6.subVectors(e,this.center);const t=_v1$6.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(_v1$6,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_v2$3.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_v1$6.copy(e.center).add(_v2$3)),this.expandByPoint(_v1$6.copy(e.center).sub(_v2$3))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _vector$a=new Vector3,_segCenter=new Vector3,_segDir=new Vector3,_diff=new Vector3,_edge1=new Vector3,_edge2=new Vector3,_normal$1=new Vector3;class Ray{constructor(e=new Vector3,t=new Vector3(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_vector$a)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_vector$a.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_vector$a.copy(this.origin).addScaledVector(this.direction,t),_vector$a.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){_segCenter.copy(e).add(t).multiplyScalar(.5),_segDir.copy(t).sub(e).normalize(),_diff.copy(this.origin).sub(_segCenter);const s=e.distanceTo(t)*.5,o=-this.direction.dot(_segDir),l=_diff.dot(this.direction),d=-_diff.dot(_segDir),c=_diff.lengthSq(),f=Math.abs(1-o*o);let _,m,g,y;if(f>0)if(_=o*d-l,m=o*l-d,y=s*f,_>=0)if(m>=-y)if(m<=y){const x=1/f;_*=x,m*=x,g=_*(_+o*m+2*l)+m*(o*_+m+2*d)+c}else m=s,_=Math.max(0,-(o*m+l)),g=-_*_+m*(m+2*d)+c;else m=-s,_=Math.max(0,-(o*m+l)),g=-_*_+m*(m+2*d)+c;else m<=-y?(_=Math.max(0,-(-o*s+l)),m=_>0?-s:Math.min(Math.max(-s,-d),s),g=-_*_+m*(m+2*d)+c):m<=y?(_=0,m=Math.min(Math.max(-s,-d),s),g=m*(m+2*d)+c):(_=Math.max(0,-(o*s+l)),m=_>0?s:Math.min(Math.max(-s,-d),s),g=-_*_+m*(m+2*d)+c);else m=o>0?-s:s,_=Math.max(0,-(o*m+l)),g=-_*_+m*(m+2*d)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,_),a&&a.copy(_segCenter).addScaledVector(_segDir,m),g}intersectSphere(e,t){_vector$a.subVectors(e.center,this.origin);const r=_vector$a.dot(this.direction),a=_vector$a.dot(_vector$a)-r*r,s=e.radius*e.radius;if(a>s)return null;const o=Math.sqrt(s-a),l=r-o,d=r+o;return d<0?null:l<0?this.at(d,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,s,o,l,d;const c=1/this.direction.x,f=1/this.direction.y,_=1/this.direction.z,m=this.origin;return c>=0?(r=(e.min.x-m.x)*c,a=(e.max.x-m.x)*c):(r=(e.max.x-m.x)*c,a=(e.min.x-m.x)*c),f>=0?(s=(e.min.y-m.y)*f,o=(e.max.y-m.y)*f):(s=(e.max.y-m.y)*f,o=(e.min.y-m.y)*f),r>o||s>a||((s>r||isNaN(r))&&(r=s),(o<a||isNaN(a))&&(a=o),_>=0?(l=(e.min.z-m.z)*_,d=(e.max.z-m.z)*_):(l=(e.max.z-m.z)*_,d=(e.min.z-m.z)*_),r>d||l>a)||((l>r||r!==r)&&(r=l),(d<a||a!==a)&&(a=d),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,_vector$a)!==null}intersectTriangle(e,t,r,a,s){_edge1.subVectors(t,e),_edge2.subVectors(r,e),_normal$1.crossVectors(_edge1,_edge2);let o=this.direction.dot(_normal$1),l;if(o>0){if(a)return null;l=1}else if(o<0)l=-1,o=-o;else return null;_diff.subVectors(this.origin,e);const d=l*this.direction.dot(_edge2.crossVectors(_diff,_edge2));if(d<0)return null;const c=l*this.direction.dot(_edge1.cross(_diff));if(c<0||d+c>o)return null;const f=-l*_diff.dot(_normal$1);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Matrix4{constructor(e,t,r,a,s,o,l,d,c,f,_,m,g,y,x,u){Matrix4.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,s,o,l,d,c,f,_,m,g,y,x,u)}set(e,t,r,a,s,o,l,d,c,f,_,m,g,y,x,u){const p=this.elements;return p[0]=e,p[4]=t,p[8]=r,p[12]=a,p[1]=s,p[5]=o,p[9]=l,p[13]=d,p[2]=c,p[6]=f,p[10]=_,p[14]=m,p[3]=g,p[7]=y,p[11]=x,p[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Matrix4().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,a=1/_v1$5.setFromMatrixColumn(e,0).length(),s=1/_v1$5.setFromMatrixColumn(e,1).length(),o=1/_v1$5.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*s,t[5]=r[5]*s,t[6]=r[6]*s,t[7]=0,t[8]=r[8]*o,t[9]=r[9]*o,t[10]=r[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,s=e.z,o=Math.cos(r),l=Math.sin(r),d=Math.cos(a),c=Math.sin(a),f=Math.cos(s),_=Math.sin(s);if(e.order==="XYZ"){const m=o*f,g=o*_,y=l*f,x=l*_;t[0]=d*f,t[4]=-d*_,t[8]=c,t[1]=g+y*c,t[5]=m-x*c,t[9]=-l*d,t[2]=x-m*c,t[6]=y+g*c,t[10]=o*d}else if(e.order==="YXZ"){const m=d*f,g=d*_,y=c*f,x=c*_;t[0]=m+x*l,t[4]=y*l-g,t[8]=o*c,t[1]=o*_,t[5]=o*f,t[9]=-l,t[2]=g*l-y,t[6]=x+m*l,t[10]=o*d}else if(e.order==="ZXY"){const m=d*f,g=d*_,y=c*f,x=c*_;t[0]=m-x*l,t[4]=-o*_,t[8]=y+g*l,t[1]=g+y*l,t[5]=o*f,t[9]=x-m*l,t[2]=-o*c,t[6]=l,t[10]=o*d}else if(e.order==="ZYX"){const m=o*f,g=o*_,y=l*f,x=l*_;t[0]=d*f,t[4]=y*c-g,t[8]=m*c+x,t[1]=d*_,t[5]=x*c+m,t[9]=g*c-y,t[2]=-c,t[6]=l*d,t[10]=o*d}else if(e.order==="YZX"){const m=o*d,g=o*c,y=l*d,x=l*c;t[0]=d*f,t[4]=x-m*_,t[8]=y*_+g,t[1]=_,t[5]=o*f,t[9]=-l*f,t[2]=-c*f,t[6]=g*_+y,t[10]=m-x*_}else if(e.order==="XZY"){const m=o*d,g=o*c,y=l*d,x=l*c;t[0]=d*f,t[4]=-_,t[8]=c*f,t[1]=m*_+x,t[5]=o*f,t[9]=g*_-y,t[2]=y*_-g,t[6]=l*f,t[10]=x*_+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_zero,e,_one)}lookAt(e,t,r){const a=this.elements;return _z.subVectors(e,t),_z.lengthSq()===0&&(_z.z=1),_z.normalize(),_x.crossVectors(r,_z),_x.lengthSq()===0&&(Math.abs(r.z)===1?_z.x+=1e-4:_z.z+=1e-4,_z.normalize(),_x.crossVectors(r,_z)),_x.normalize(),_y.crossVectors(_z,_x),a[0]=_x.x,a[4]=_y.x,a[8]=_z.x,a[1]=_x.y,a[5]=_y.y,a[9]=_z.y,a[2]=_x.z,a[6]=_y.z,a[10]=_z.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,s=this.elements,o=r[0],l=r[4],d=r[8],c=r[12],f=r[1],_=r[5],m=r[9],g=r[13],y=r[2],x=r[6],u=r[10],p=r[14],M=r[3],S=r[7],b=r[11],A=r[15],T=a[0],E=a[4],B=a[8],P=a[12],C=a[1],I=a[5],N=a[9],D=a[13],V=a[2],R=a[6],F=a[10],$=a[14],W=a[3],J=a[7],j=a[11],ie=a[15];return s[0]=o*T+l*C+d*V+c*W,s[4]=o*E+l*I+d*R+c*J,s[8]=o*B+l*N+d*F+c*j,s[12]=o*P+l*D+d*$+c*ie,s[1]=f*T+_*C+m*V+g*W,s[5]=f*E+_*I+m*R+g*J,s[9]=f*B+_*N+m*F+g*j,s[13]=f*P+_*D+m*$+g*ie,s[2]=y*T+x*C+u*V+p*W,s[6]=y*E+x*I+u*R+p*J,s[10]=y*B+x*N+u*F+p*j,s[14]=y*P+x*D+u*$+p*ie,s[3]=M*T+S*C+b*V+A*W,s[7]=M*E+S*I+b*R+A*J,s[11]=M*B+S*N+b*F+A*j,s[15]=M*P+S*D+b*$+A*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],s=e[12],o=e[1],l=e[5],d=e[9],c=e[13],f=e[2],_=e[6],m=e[10],g=e[14],y=e[3],x=e[7],u=e[11],p=e[15];return y*(+s*d*_-a*c*_-s*l*m+r*c*m+a*l*g-r*d*g)+x*(+t*d*g-t*c*m+s*o*m-a*o*g+a*c*f-s*d*f)+u*(+t*c*_-t*l*g-s*o*_+r*o*g+s*l*f-r*c*f)+p*(-a*l*f-t*d*_+t*l*m+a*o*_-r*o*m+r*d*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],s=e[3],o=e[4],l=e[5],d=e[6],c=e[7],f=e[8],_=e[9],m=e[10],g=e[11],y=e[12],x=e[13],u=e[14],p=e[15],M=_*u*c-x*m*c+x*d*g-l*u*g-_*d*p+l*m*p,S=y*m*c-f*u*c-y*d*g+o*u*g+f*d*p-o*m*p,b=f*x*c-y*_*c+y*l*g-o*x*g-f*l*p+o*_*p,A=y*_*d-f*x*d-y*l*m+o*x*m+f*l*u-o*_*u,T=t*M+r*S+a*b+s*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=M*E,e[1]=(x*m*s-_*u*s-x*a*g+r*u*g+_*a*p-r*m*p)*E,e[2]=(l*u*s-x*d*s+x*a*c-r*u*c-l*a*p+r*d*p)*E,e[3]=(_*d*s-l*m*s-_*a*c+r*m*c+l*a*g-r*d*g)*E,e[4]=S*E,e[5]=(f*u*s-y*m*s+y*a*g-t*u*g-f*a*p+t*m*p)*E,e[6]=(y*d*s-o*u*s-y*a*c+t*u*c+o*a*p-t*d*p)*E,e[7]=(o*m*s-f*d*s+f*a*c-t*m*c-o*a*g+t*d*g)*E,e[8]=b*E,e[9]=(y*_*s-f*x*s-y*r*g+t*x*g+f*r*p-t*_*p)*E,e[10]=(o*x*s-y*l*s+y*r*c-t*x*c-o*r*p+t*l*p)*E,e[11]=(f*l*s-o*_*s-f*r*c+t*_*c+o*r*g-t*l*g)*E,e[12]=A*E,e[13]=(f*x*a-y*_*a+y*r*m-t*x*m-f*r*u+t*_*u)*E,e[14]=(y*l*a-o*x*a-y*r*d+t*x*d+o*r*u-t*l*u)*E,e[15]=(o*_*a-f*l*a+f*r*d-t*_*d-o*r*m+t*l*m)*E,this}scale(e){const t=this.elements,r=e.x,a=e.y,s=e.z;return t[0]*=r,t[4]*=a,t[8]*=s,t[1]*=r,t[5]*=a,t[9]*=s,t[2]*=r,t[6]*=a,t[10]*=s,t[3]*=r,t[7]*=a,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),s=1-r,o=e.x,l=e.y,d=e.z,c=s*o,f=s*l;return this.set(c*o+r,c*l-a*d,c*d+a*l,0,c*l+a*d,f*l+r,f*d-a*o,0,c*d-a*l,f*d+a*o,s*d*d+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,s,o){return this.set(1,r,s,0,e,1,o,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,s=t._x,o=t._y,l=t._z,d=t._w,c=s+s,f=o+o,_=l+l,m=s*c,g=s*f,y=s*_,x=o*f,u=o*_,p=l*_,M=d*c,S=d*f,b=d*_,A=r.x,T=r.y,E=r.z;return a[0]=(1-(x+p))*A,a[1]=(g+b)*A,a[2]=(y-S)*A,a[3]=0,a[4]=(g-b)*T,a[5]=(1-(m+p))*T,a[6]=(u+M)*T,a[7]=0,a[8]=(y+S)*E,a[9]=(u-M)*E,a[10]=(1-(m+x))*E,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;let s=_v1$5.set(a[0],a[1],a[2]).length();const o=_v1$5.set(a[4],a[5],a[6]).length(),l=_v1$5.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],_m1$4.copy(this);const c=1/s,f=1/o,_=1/l;return _m1$4.elements[0]*=c,_m1$4.elements[1]*=c,_m1$4.elements[2]*=c,_m1$4.elements[4]*=f,_m1$4.elements[5]*=f,_m1$4.elements[6]*=f,_m1$4.elements[8]*=_,_m1$4.elements[9]*=_,_m1$4.elements[10]*=_,t.setFromRotationMatrix(_m1$4),r.x=s,r.y=o,r.z=l,this}makePerspective(e,t,r,a,s,o,l=WebGLCoordinateSystem){const d=this.elements,c=2*s/(t-e),f=2*s/(r-a),_=(t+e)/(t-e),m=(r+a)/(r-a);let g,y;if(l===WebGLCoordinateSystem)g=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(l===WebGPUCoordinateSystem)g=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return d[0]=c,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=f,d[9]=m,d[13]=0,d[2]=0,d[6]=0,d[10]=g,d[14]=y,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,r,a,s,o,l=WebGLCoordinateSystem){const d=this.elements,c=1/(t-e),f=1/(r-a),_=1/(o-s),m=(t+e)*c,g=(r+a)*f;let y,x;if(l===WebGLCoordinateSystem)y=(o+s)*_,x=-2*_;else if(l===WebGPUCoordinateSystem)y=s*_,x=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return d[0]=2*c,d[4]=0,d[8]=0,d[12]=-m,d[1]=0,d[5]=2*f,d[9]=0,d[13]=-g,d[2]=0,d[6]=0,d[10]=x,d[14]=-y,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const _v1$5=new Vector3,_m1$4=new Matrix4,_zero=new Vector3(0,0,0),_one=new Vector3(1,1,1),_x=new Vector3,_y=new Vector3,_z=new Vector3,_matrix$2=new Matrix4,_quaternion$3=new Quaternion;class Euler{constructor(e=0,t=0,r=0,a=Euler.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,s=a[0],o=a[4],l=a[8],d=a[1],c=a[5],f=a[9],_=a[2],m=a[6],g=a[10];switch(t){case"XYZ":this._y=Math.asin(clamp(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-clamp(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(d,c)):(this._y=Math.atan2(-_,s),this._z=0);break;case"ZXY":this._x=Math.asin(clamp(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-_,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(d,s));break;case"ZYX":this._y=Math.asin(-clamp(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(m,g),this._z=Math.atan2(d,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(clamp(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-_,s)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-clamp(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-f,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return _matrix$2.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_matrix$2,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _quaternion$3.setFromEuler(this),this.setFromQuaternion(_quaternion$3,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Euler.DEFAULT_ORDER="XYZ";class Layers{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _object3DId=0;const _v1$4=new Vector3,_q1=new Quaternion,_m1$3=new Matrix4,_target=new Vector3,_position$3=new Vector3,_scale$2=new Vector3,_quaternion$2=new Quaternion,_xAxis=new Vector3(1,0,0),_yAxis=new Vector3(0,1,0),_zAxis=new Vector3(0,0,1),_addedEvent={type:"added"},_removedEvent={type:"removed"},_childaddedEvent={type:"childadded",child:null},_childremovedEvent={type:"childremoved",child:null};class Object3D extends EventDispatcher{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_object3DId++}),this.uuid=generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Object3D.DEFAULT_UP.clone();const e=new Vector3,t=new Euler,r=new Quaternion,a=new Vector3(1,1,1);function s(){r.setFromEuler(t,!1)}function o(){t.setFromQuaternion(r,void 0,!1)}t._onChange(s),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Matrix4},normalMatrix:{value:new Matrix3}}),this.matrix=new Matrix4,this.matrixWorld=new Matrix4,this.matrixAutoUpdate=Object3D.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Layers,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _q1.setFromAxisAngle(e,t),this.quaternion.multiply(_q1),this}rotateOnWorldAxis(e,t){return _q1.setFromAxisAngle(e,t),this.quaternion.premultiply(_q1),this}rotateX(e){return this.rotateOnAxis(_xAxis,e)}rotateY(e){return this.rotateOnAxis(_yAxis,e)}rotateZ(e){return this.rotateOnAxis(_zAxis,e)}translateOnAxis(e,t){return _v1$4.copy(e).applyQuaternion(this.quaternion),this.position.add(_v1$4.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_xAxis,e)}translateY(e){return this.translateOnAxis(_yAxis,e)}translateZ(e){return this.translateOnAxis(_zAxis,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_m1$3.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?_target.copy(e):_target.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),_position$3.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_m1$3.lookAt(_position$3,_target,this.up):_m1$3.lookAt(_target,_position$3,this.up),this.quaternion.setFromRotationMatrix(_m1$3),a&&(_m1$3.extractRotation(a.matrixWorld),_q1.setFromRotationMatrix(_m1$3),this.quaternion.premultiply(_q1.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_addedEvent),_childaddedEvent.child=e,this.dispatchEvent(_childaddedEvent),_childaddedEvent.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_removedEvent),_childremovedEvent.child=e,this.dispatchEvent(_childremovedEvent),_childremovedEvent.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_m1$3.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_m1$3.multiply(e.parent.matrixWorld)),e.applyMatrix4(_m1$3),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_addedEvent),_childaddedEvent.child=e,this.dispatchEvent(_childaddedEvent),_childaddedEvent.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const o=this.children[r].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_position$3,e,_scale$2),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_position$3,_quaternion$2,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++){const s=t[r];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++){const l=a[s];l.matrixWorldAutoUpdate===!0&&l.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function s(l,d){return l[d.uuid]===void 0&&(l[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const d=l.shapes;if(Array.isArray(d))for(let c=0,f=d.length;c<f;c++){const _=d[c];s(e.shapes,_)}else s(e.shapes,d)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let d=0,c=this.material.length;d<c;d++)l.push(s(e.materials,this.material[d]));a.material=l}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let l=0;l<this.children.length;l++)a.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let l=0;l<this.animations.length;l++){const d=this.animations[l];a.animations.push(s(e.animations,d))}}if(t){const l=o(e.geometries),d=o(e.materials),c=o(e.textures),f=o(e.images),_=o(e.shapes),m=o(e.skeletons),g=o(e.animations),y=o(e.nodes);l.length>0&&(r.geometries=l),d.length>0&&(r.materials=d),c.length>0&&(r.textures=c),f.length>0&&(r.images=f),_.length>0&&(r.shapes=_),m.length>0&&(r.skeletons=m),g.length>0&&(r.animations=g),y.length>0&&(r.nodes=y)}return r.object=a,r;function o(l){const d=[];for(const c in l){const f=l[c];delete f.metadata,d.push(f)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Object3D.DEFAULT_UP=new Vector3(0,1,0);Object3D.DEFAULT_MATRIX_AUTO_UPDATE=!0;Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _v0$1=new Vector3,_v1$3=new Vector3,_v2$2=new Vector3,_v3$2=new Vector3,_vab=new Vector3,_vac=new Vector3,_vbc=new Vector3,_vap=new Vector3,_vbp=new Vector3,_vcp=new Vector3;class Triangle{constructor(e=new Vector3,t=new Vector3,r=new Vector3){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),_v0$1.subVectors(e,t),a.cross(_v0$1);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,t,r,a,s){_v0$1.subVectors(a,t),_v1$3.subVectors(r,t),_v2$2.subVectors(e,t);const o=_v0$1.dot(_v0$1),l=_v0$1.dot(_v1$3),d=_v0$1.dot(_v2$2),c=_v1$3.dot(_v1$3),f=_v1$3.dot(_v2$2),_=o*c-l*l;if(_===0)return s.set(0,0,0),null;const m=1/_,g=(c*d-l*f)*m,y=(o*f-l*d)*m;return s.set(1-g-y,y,g)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,_v3$2)===null?!1:_v3$2.x>=0&&_v3$2.y>=0&&_v3$2.x+_v3$2.y<=1}static getInterpolation(e,t,r,a,s,o,l,d){return this.getBarycoord(e,t,r,a,_v3$2)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(s,_v3$2.x),d.addScaledVector(o,_v3$2.y),d.addScaledVector(l,_v3$2.z),d)}static isFrontFacing(e,t,r,a){return _v0$1.subVectors(r,t),_v1$3.subVectors(e,t),_v0$1.cross(_v1$3).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _v0$1.subVectors(this.c,this.b),_v1$3.subVectors(this.a,this.b),_v0$1.cross(_v1$3).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Triangle.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Triangle.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,s){return Triangle.getInterpolation(e,this.a,this.b,this.c,t,r,a,s)}containsPoint(e){return Triangle.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Triangle.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,s=this.c;let o,l;_vab.subVectors(a,r),_vac.subVectors(s,r),_vap.subVectors(e,r);const d=_vab.dot(_vap),c=_vac.dot(_vap);if(d<=0&&c<=0)return t.copy(r);_vbp.subVectors(e,a);const f=_vab.dot(_vbp),_=_vac.dot(_vbp);if(f>=0&&_<=f)return t.copy(a);const m=d*_-f*c;if(m<=0&&d>=0&&f<=0)return o=d/(d-f),t.copy(r).addScaledVector(_vab,o);_vcp.subVectors(e,s);const g=_vab.dot(_vcp),y=_vac.dot(_vcp);if(y>=0&&g<=y)return t.copy(s);const x=g*c-d*y;if(x<=0&&c>=0&&y<=0)return l=c/(c-y),t.copy(r).addScaledVector(_vac,l);const u=f*y-g*_;if(u<=0&&_-f>=0&&g-y>=0)return _vbc.subVectors(s,a),l=(_-f)/(_-f+(g-y)),t.copy(a).addScaledVector(_vbc,l);const p=1/(u+x+m);return o=x*p,l=m*p,t.copy(r).addScaledVector(_vab,o).addScaledVector(_vac,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _colorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_hslA={h:0,s:0,l:0},_hslB={h:0,s:0,l:0};function hue2rgb(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}let Color$1=class{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=SRGBColorSpace){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ColorManagement.toWorkingColorSpace(this,t),this}setRGB(e,t,r,a=ColorManagement.workingColorSpace){return this.r=e,this.g=t,this.b=r,ColorManagement.toWorkingColorSpace(this,a),this}setHSL(e,t,r,a=ColorManagement.workingColorSpace){if(e=euclideanModulo(e,1),t=clamp(t,0,1),r=clamp(r,0,1),t===0)this.r=this.g=this.b=r;else{const s=r<=.5?r*(1+t):r+t-r*t,o=2*r-s;this.r=hue2rgb(o,s,e+1/3),this.g=hue2rgb(o,s,e),this.b=hue2rgb(o,s,e-1/3)}return ColorManagement.toWorkingColorSpace(this,a),this}setStyle(e,t=SRGBColorSpace){function r(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=a[1],l=a[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return r(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=SRGBColorSpace){const r=_colorKeywords[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=SRGBToLinear(e.r),this.g=SRGBToLinear(e.g),this.b=SRGBToLinear(e.b),this}copyLinearToSRGB(e){return this.r=LinearToSRGB(e.r),this.g=LinearToSRGB(e.g),this.b=LinearToSRGB(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=SRGBColorSpace){return ColorManagement.fromWorkingColorSpace(_color.copy(this),e),Math.round(clamp(_color.r*255,0,255))*65536+Math.round(clamp(_color.g*255,0,255))*256+Math.round(clamp(_color.b*255,0,255))}getHexString(e=SRGBColorSpace){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ColorManagement.workingColorSpace){ColorManagement.fromWorkingColorSpace(_color.copy(this),t);const r=_color.r,a=_color.g,s=_color.b,o=Math.max(r,a,s),l=Math.min(r,a,s);let d,c;const f=(l+o)/2;if(l===o)d=0,c=0;else{const _=o-l;switch(c=f<=.5?_/(o+l):_/(2-o-l),o){case r:d=(a-s)/_+(a<s?6:0);break;case a:d=(s-r)/_+2;break;case s:d=(r-a)/_+4;break}d/=6}return e.h=d,e.s=c,e.l=f,e}getRGB(e,t=ColorManagement.workingColorSpace){return ColorManagement.fromWorkingColorSpace(_color.copy(this),t),e.r=_color.r,e.g=_color.g,e.b=_color.b,e}getStyle(e=SRGBColorSpace){ColorManagement.fromWorkingColorSpace(_color.copy(this),e);const t=_color.r,r=_color.g,a=_color.b;return e!==SRGBColorSpace?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(_hslA),this.setHSL(_hslA.h+e,_hslA.s+t,_hslA.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(_hslA),e.getHSL(_hslB);const r=lerp(_hslA.h,_hslB.h,t),a=lerp(_hslA.s,_hslB.s,t),s=lerp(_hslA.l,_hslB.l,t);return this.setHSL(r,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,s=e.elements;return this.r=s[0]*t+s[3]*r+s[6]*a,this.g=s[1]*t+s[4]*r+s[7]*a,this.b=s[2]*t+s[5]*r+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const _color=new Color$1;Color$1.NAMES=_colorKeywords;let _materialId=0;class Material extends EventDispatcher{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_materialId++}),this.uuid=generateUUID(),this.name="",this.type="Material",this.blending=NormalBlending,this.side=FrontSide,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=SrcAlphaFactor,this.blendDst=OneMinusSrcAlphaFactor,this.blendEquation=AddEquation,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Color$1(0,0,0),this.blendAlpha=0,this.depthFunc=LessEqualDepth,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=AlwaysStencilFunc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=KeepStencilOp,this.stencilZFail=KeepStencilOp,this.stencilZPass=KeepStencilOp,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==NormalBlending&&(r.blending=this.blending),this.side!==FrontSide&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==SrcAlphaFactor&&(r.blendSrc=this.blendSrc),this.blendDst!==OneMinusSrcAlphaFactor&&(r.blendDst=this.blendDst),this.blendEquation!==AddEquation&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==LessEqualDepth&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==AlwaysStencilFunc&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==KeepStencilOp&&(r.stencilFail=this.stencilFail),this.stencilZFail!==KeepStencilOp&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==KeepStencilOp&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(s){const o=[];for(const l in s){const d=s[l];delete d.metadata,o.push(d)}return o}if(t){const s=a(e.textures),o=a(e.images);s.length>0&&(r.textures=s),o.length>0&&(r.images=o)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let s=0;s!==a;++s)r[s]=t[s].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class MeshBasicMaterial extends Material{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Color$1(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Euler,this.combine=MultiplyOperation,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _vector$9=new Vector3,_vector2$1=new Vector2;class BufferAttribute{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=StaticDrawUsage,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=FloatType,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return warnOnce("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)_vector2$1.fromBufferAttribute(this,t),_vector2$1.applyMatrix3(e),this.setXY(t,_vector2$1.x,_vector2$1.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyMatrix3(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyMatrix4(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.applyNormalMatrix(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)_vector$9.fromBufferAttribute(this,t),_vector$9.transformDirection(e),this.setXYZ(t,_vector$9.x,_vector$9.y,_vector$9.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=denormalize(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=normalize(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=denormalize(t,this.array)),t}setX(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=denormalize(t,this.array)),t}setY(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=denormalize(t,this.array)),t}setZ(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=denormalize(t,this.array)),t}setW(e,t){return this.normalized&&(t=normalize(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array),a=normalize(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,s){return e*=this.itemSize,this.normalized&&(t=normalize(t,this.array),r=normalize(r,this.array),a=normalize(a,this.array),s=normalize(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==StaticDrawUsage&&(e.usage=this.usage),e}}class Uint16BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Uint32BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Float32BufferAttribute extends BufferAttribute{constructor(e,t,r){super(new Float32Array(e),t,r)}}let _id$2=0;const _m1$2=new Matrix4,_obj=new Object3D,_offset=new Vector3,_box$2=new Box3,_boxMorphTargets=new Box3,_vector$8=new Vector3;class BufferGeometry extends EventDispatcher{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_id$2++}),this.uuid=generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(arrayNeedsUint32(e)?Uint32BufferAttribute:Uint16BufferAttribute)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const s=new Matrix3().getNormalMatrix(e);r.applyNormalMatrix(s),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _m1$2.makeRotationFromQuaternion(e),this.applyMatrix4(_m1$2),this}rotateX(e){return _m1$2.makeRotationX(e),this.applyMatrix4(_m1$2),this}rotateY(e){return _m1$2.makeRotationY(e),this.applyMatrix4(_m1$2),this}rotateZ(e){return _m1$2.makeRotationZ(e),this.applyMatrix4(_m1$2),this}translate(e,t,r){return _m1$2.makeTranslation(e,t,r),this.applyMatrix4(_m1$2),this}scale(e,t,r){return _m1$2.makeScale(e,t,r),this.applyMatrix4(_m1$2),this}lookAt(e){return _obj.lookAt(e),_obj.updateMatrix(),this.applyMatrix4(_obj.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_offset).negate(),this.translate(_offset.x,_offset.y,_offset.z),this}setFromPoints(e){const t=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Float32BufferAttribute(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Box3);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Vector3(-1/0,-1/0,-1/0),new Vector3(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const s=t[r];_box$2.setFromBufferAttribute(s),this.morphTargetsRelative?(_vector$8.addVectors(this.boundingBox.min,_box$2.min),this.boundingBox.expandByPoint(_vector$8),_vector$8.addVectors(this.boundingBox.max,_box$2.max),this.boundingBox.expandByPoint(_vector$8)):(this.boundingBox.expandByPoint(_box$2.min),this.boundingBox.expandByPoint(_box$2.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sphere);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Vector3,1/0);return}if(e){const r=this.boundingSphere.center;if(_box$2.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const l=t[s];_boxMorphTargets.setFromBufferAttribute(l),this.morphTargetsRelative?(_vector$8.addVectors(_box$2.min,_boxMorphTargets.min),_box$2.expandByPoint(_vector$8),_vector$8.addVectors(_box$2.max,_boxMorphTargets.max),_box$2.expandByPoint(_vector$8)):(_box$2.expandByPoint(_boxMorphTargets.min),_box$2.expandByPoint(_boxMorphTargets.max))}_box$2.getCenter(r);let a=0;for(let s=0,o=e.count;s<o;s++)_vector$8.fromBufferAttribute(e,s),a=Math.max(a,r.distanceToSquared(_vector$8));if(t)for(let s=0,o=t.length;s<o;s++){const l=t[s],d=this.morphTargetsRelative;for(let c=0,f=l.count;c<f;c++)_vector$8.fromBufferAttribute(l,c),d&&(_offset.fromBufferAttribute(e,c),_vector$8.add(_offset)),a=Math.max(a,r.distanceToSquared(_vector$8))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new BufferAttribute(new Float32Array(4*r.count),4));const o=this.getAttribute("tangent"),l=[],d=[];for(let B=0;B<r.count;B++)l[B]=new Vector3,d[B]=new Vector3;const c=new Vector3,f=new Vector3,_=new Vector3,m=new Vector2,g=new Vector2,y=new Vector2,x=new Vector3,u=new Vector3;function p(B,P,C){c.fromBufferAttribute(r,B),f.fromBufferAttribute(r,P),_.fromBufferAttribute(r,C),m.fromBufferAttribute(s,B),g.fromBufferAttribute(s,P),y.fromBufferAttribute(s,C),f.sub(c),_.sub(c),g.sub(m),y.sub(m);const I=1/(g.x*y.y-y.x*g.y);isFinite(I)&&(x.copy(f).multiplyScalar(y.y).addScaledVector(_,-g.y).multiplyScalar(I),u.copy(_).multiplyScalar(g.x).addScaledVector(f,-y.x).multiplyScalar(I),l[B].add(x),l[P].add(x),l[C].add(x),d[B].add(u),d[P].add(u),d[C].add(u))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let B=0,P=M.length;B<P;++B){const C=M[B],I=C.start,N=C.count;for(let D=I,V=I+N;D<V;D+=3)p(e.getX(D+0),e.getX(D+1),e.getX(D+2))}const S=new Vector3,b=new Vector3,A=new Vector3,T=new Vector3;function E(B){A.fromBufferAttribute(a,B),T.copy(A);const P=l[B];S.copy(P),S.sub(A.multiplyScalar(A.dot(P))).normalize(),b.crossVectors(T,P);const I=b.dot(d[B])<0?-1:1;o.setXYZW(B,S.x,S.y,S.z,I)}for(let B=0,P=M.length;B<P;++B){const C=M[B],I=C.start,N=C.count;for(let D=I,V=I+N;D<V;D+=3)E(e.getX(D+0)),E(e.getX(D+1)),E(e.getX(D+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new BufferAttribute(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let m=0,g=r.count;m<g;m++)r.setXYZ(m,0,0,0);const a=new Vector3,s=new Vector3,o=new Vector3,l=new Vector3,d=new Vector3,c=new Vector3,f=new Vector3,_=new Vector3;if(e)for(let m=0,g=e.count;m<g;m+=3){const y=e.getX(m+0),x=e.getX(m+1),u=e.getX(m+2);a.fromBufferAttribute(t,y),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,u),f.subVectors(o,s),_.subVectors(a,s),f.cross(_),l.fromBufferAttribute(r,y),d.fromBufferAttribute(r,x),c.fromBufferAttribute(r,u),l.add(f),d.add(f),c.add(f),r.setXYZ(y,l.x,l.y,l.z),r.setXYZ(x,d.x,d.y,d.z),r.setXYZ(u,c.x,c.y,c.z)}else for(let m=0,g=t.count;m<g;m+=3)a.fromBufferAttribute(t,m+0),s.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),f.subVectors(o,s),_.subVectors(a,s),f.cross(_),r.setXYZ(m+0,f.x,f.y,f.z),r.setXYZ(m+1,f.x,f.y,f.z),r.setXYZ(m+2,f.x,f.y,f.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)_vector$8.fromBufferAttribute(e,t),_vector$8.normalize(),e.setXYZ(t,_vector$8.x,_vector$8.y,_vector$8.z)}toNonIndexed(){function e(l,d){const c=l.array,f=l.itemSize,_=l.normalized,m=new c.constructor(d.length*f);let g=0,y=0;for(let x=0,u=d.length;x<u;x++){l.isInterleavedBufferAttribute?g=d[x]*l.data.stride+l.offset:g=d[x]*f;for(let p=0;p<f;p++)m[y++]=c[g++]}return new BufferAttribute(m,f,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new BufferGeometry,r=this.index.array,a=this.attributes;for(const l in a){const d=a[l],c=e(d,r);t.setAttribute(l,c)}const s=this.morphAttributes;for(const l in s){const d=[],c=s[l];for(let f=0,_=c.length;f<_;f++){const m=c[f],g=e(m,r);d.push(g)}t.morphAttributes[l]=d}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,d=o.length;l<d;l++){const c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const c in d)d[c]!==void 0&&(e[c]=d[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const d in r){const c=r[d];e.data.attributes[d]=c.toJSON(e.data)}const a={};let s=!1;for(const d in this.morphAttributes){const c=this.morphAttributes[d],f=[];for(let _=0,m=c.length;_<m;_++){const g=c[_];f.push(g.toJSON(e.data))}f.length>0&&(a[d]=f,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const a=e.attributes;for(const c in a){const f=a[c];this.setAttribute(c,f.clone(t))}const s=e.morphAttributes;for(const c in s){const f=[],_=s[c];for(let m=0,g=_.length;m<g;m++)f.push(_[m].clone(t));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const _=o[c];this.addGroup(_.start,_.count,_.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _inverseMatrix$3=new Matrix4,_ray$3=new Ray,_sphere$6=new Sphere,_sphereHitAt=new Vector3,_vA$1=new Vector3,_vB$1=new Vector3,_vC$1=new Vector3,_tempA=new Vector3,_morphA=new Vector3,_uvA$1=new Vector2,_uvB$1=new Vector2,_uvC$1=new Vector2,_normalA=new Vector3,_normalB=new Vector3,_normalC=new Vector3,_intersectionPoint=new Vector3,_intersectionPointWorld=new Vector3;class Mesh extends Object3D{constructor(e=new BufferGeometry,t=new MeshBasicMaterial){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=a.length;s<o;s++){const l=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,s=r.morphAttributes.position,o=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const l=this.morphTargetInfluences;if(s&&l){_morphA.set(0,0,0);for(let d=0,c=s.length;d<c;d++){const f=l[d],_=s[d];f!==0&&(_tempA.fromBufferAttribute(_,e),o?_morphA.addScaledVector(_tempA,f):_morphA.addScaledVector(_tempA.sub(t),f))}t.add(_morphA)}return t}raycast(e,t){const r=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),_sphere$6.copy(r.boundingSphere),_sphere$6.applyMatrix4(s),_ray$3.copy(e.ray).recast(e.near),!(_sphere$6.containsPoint(_ray$3.origin)===!1&&(_ray$3.intersectSphere(_sphere$6,_sphereHitAt)===null||_ray$3.origin.distanceToSquared(_sphereHitAt)>(e.far-e.near)**2))&&(_inverseMatrix$3.copy(s).invert(),_ray$3.copy(e.ray).applyMatrix4(_inverseMatrix$3),!(r.boundingBox!==null&&_ray$3.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,_ray$3)))}_computeIntersections(e,t,r){let a;const s=this.geometry,o=this.material,l=s.index,d=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,_=s.attributes.normal,m=s.groups,g=s.drawRange;if(l!==null)if(Array.isArray(o))for(let y=0,x=m.length;y<x;y++){const u=m[y],p=o[u.materialIndex],M=Math.max(u.start,g.start),S=Math.min(l.count,Math.min(u.start+u.count,g.start+g.count));for(let b=M,A=S;b<A;b+=3){const T=l.getX(b),E=l.getX(b+1),B=l.getX(b+2);a=checkGeometryIntersection(this,p,e,r,c,f,_,T,E,B),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=u.materialIndex,t.push(a))}}else{const y=Math.max(0,g.start),x=Math.min(l.count,g.start+g.count);for(let u=y,p=x;u<p;u+=3){const M=l.getX(u),S=l.getX(u+1),b=l.getX(u+2);a=checkGeometryIntersection(this,o,e,r,c,f,_,M,S,b),a&&(a.faceIndex=Math.floor(u/3),t.push(a))}}else if(d!==void 0)if(Array.isArray(o))for(let y=0,x=m.length;y<x;y++){const u=m[y],p=o[u.materialIndex],M=Math.max(u.start,g.start),S=Math.min(d.count,Math.min(u.start+u.count,g.start+g.count));for(let b=M,A=S;b<A;b+=3){const T=b,E=b+1,B=b+2;a=checkGeometryIntersection(this,p,e,r,c,f,_,T,E,B),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=u.materialIndex,t.push(a))}}else{const y=Math.max(0,g.start),x=Math.min(d.count,g.start+g.count);for(let u=y,p=x;u<p;u+=3){const M=u,S=u+1,b=u+2;a=checkGeometryIntersection(this,o,e,r,c,f,_,M,S,b),a&&(a.faceIndex=Math.floor(u/3),t.push(a))}}}}function checkIntersection$1(n,e,t,r,a,s,o,l){let d;if(e.side===BackSide?d=r.intersectTriangle(o,s,a,!0,l):d=r.intersectTriangle(a,s,o,e.side===FrontSide,l),d===null)return null;_intersectionPointWorld.copy(l),_intersectionPointWorld.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(_intersectionPointWorld);return c<t.near||c>t.far?null:{distance:c,point:_intersectionPointWorld.clone(),object:n}}function checkGeometryIntersection(n,e,t,r,a,s,o,l,d,c){n.getVertexPosition(l,_vA$1),n.getVertexPosition(d,_vB$1),n.getVertexPosition(c,_vC$1);const f=checkIntersection$1(n,e,t,r,_vA$1,_vB$1,_vC$1,_intersectionPoint);if(f){a&&(_uvA$1.fromBufferAttribute(a,l),_uvB$1.fromBufferAttribute(a,d),_uvC$1.fromBufferAttribute(a,c),f.uv=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_uvA$1,_uvB$1,_uvC$1,new Vector2)),s&&(_uvA$1.fromBufferAttribute(s,l),_uvB$1.fromBufferAttribute(s,d),_uvC$1.fromBufferAttribute(s,c),f.uv1=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_uvA$1,_uvB$1,_uvC$1,new Vector2)),o&&(_normalA.fromBufferAttribute(o,l),_normalB.fromBufferAttribute(o,d),_normalC.fromBufferAttribute(o,c),f.normal=Triangle.getInterpolation(_intersectionPoint,_vA$1,_vB$1,_vC$1,_normalA,_normalB,_normalC,new Vector3),f.normal.dot(r.direction)>0&&f.normal.multiplyScalar(-1));const _={a:l,b:d,c,normal:new Vector3,materialIndex:0};Triangle.getNormal(_vA$1,_vB$1,_vC$1,_.normal),f.face=_}return f}class BoxGeometry extends BufferGeometry{constructor(e=1,t=1,r=1,a=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:s,depthSegments:o};const l=this;a=Math.floor(a),s=Math.floor(s),o=Math.floor(o);const d=[],c=[],f=[],_=[];let m=0,g=0;y("z","y","x",-1,-1,r,t,e,o,s,0),y("z","y","x",1,-1,r,t,-e,o,s,1),y("x","z","y",1,1,e,r,t,a,o,2),y("x","z","y",1,-1,e,r,-t,a,o,3),y("x","y","z",1,-1,e,t,r,a,s,4),y("x","y","z",-1,-1,e,t,-r,a,s,5),this.setIndex(d),this.setAttribute("position",new Float32BufferAttribute(c,3)),this.setAttribute("normal",new Float32BufferAttribute(f,3)),this.setAttribute("uv",new Float32BufferAttribute(_,2));function y(x,u,p,M,S,b,A,T,E,B,P){const C=b/E,I=A/B,N=b/2,D=A/2,V=T/2,R=E+1,F=B+1;let $=0,W=0;const J=new Vector3;for(let j=0;j<F;j++){const ie=j*I-D;for(let ae=0;ae<R;ae++){const he=ae*C-N;J[x]=he*M,J[u]=ie*S,J[p]=V,c.push(J.x,J.y,J.z),J[x]=0,J[u]=0,J[p]=T>0?1:-1,f.push(J.x,J.y,J.z),_.push(ae/E),_.push(1-j/B),$+=1}}for(let j=0;j<B;j++)for(let ie=0;ie<E;ie++){const ae=m+ie+R*j,he=m+ie+R*(j+1),z=m+(ie+1)+R*(j+1),X=m+(ie+1)+R*j;d.push(ae,he,X),d.push(he,z,X),W+=6}l.addGroup(g,W,P),g+=W,m+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new BoxGeometry(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cloneUniforms(n){const e={};for(const t in n){e[t]={};for(const r in n[t]){const a=n[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function mergeUniforms(n){const e={};for(let t=0;t<n.length;t++){const r=cloneUniforms(n[t]);for(const a in r)e[a]=r[a]}return e}function cloneUniformsGroups(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function getUnlitUniformColorSpace(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ColorManagement.workingColorSpace}const UniformsUtils={clone:cloneUniforms,merge:mergeUniforms};var default_vertex=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,default_fragment=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ShaderMaterial extends Material{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=default_vertex,this.fragmentShader=default_fragment,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cloneUniforms(e.uniforms),this.uniformsGroups=cloneUniformsGroups(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const o=this.uniforms[a].value;o&&o.isTexture?t.uniforms[a]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[a]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[a]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[a]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[a]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[a]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[a]={type:"m4",value:o.toArray()}:t.uniforms[a]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}let Camera$1=class extends Object3D{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Matrix4,this.projectionMatrix=new Matrix4,this.projectionMatrixInverse=new Matrix4,this.coordinateSystem=WebGLCoordinateSystem}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const _v3$1=new Vector3,_minTarget=new Vector2,_maxTarget=new Vector2;class PerspectiveCamera extends Camera$1{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=RAD2DEG*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(DEG2RAD*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return RAD2DEG*2*Math.atan(Math.tan(DEG2RAD*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){_v3$1.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_v3$1.x,_v3$1.y).multiplyScalar(-e/_v3$1.z),_v3$1.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(_v3$1.x,_v3$1.y).multiplyScalar(-e/_v3$1.z)}getViewSize(e,t){return this.getViewBounds(e,_minTarget,_maxTarget),t.subVectors(_maxTarget,_minTarget)}setViewOffset(e,t,r,a,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(DEG2RAD*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,s=-.5*a;const o=this.view;if(this.view!==null&&this.view.enabled){const d=o.fullWidth,c=o.fullHeight;s+=o.offsetX*a/d,t-=o.offsetY*r/c,a*=o.width/d,r*=o.height/c}const l=this.filmOffset;l!==0&&(s+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fov=-90,aspect=1;class CubeCamera extends Object3D{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new PerspectiveCamera(fov,aspect,e,t);a.layers=this.layers,this.add(a);const s=new PerspectiveCamera(fov,aspect,e,t);s.layers=this.layers,this.add(s);const o=new PerspectiveCamera(fov,aspect,e,t);o.layers=this.layers,this.add(o);const l=new PerspectiveCamera(fov,aspect,e,t);l.layers=this.layers,this.add(l);const d=new PerspectiveCamera(fov,aspect,e,t);d.layers=this.layers,this.add(d);const c=new PerspectiveCamera(fov,aspect,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,s,o,l,d]=t;for(const c of t)this.remove(c);if(e===WebGLCoordinateSystem)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===WebGPUCoordinateSystem)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,l,d,c,f]=this.children,_=e.getRenderTarget(),m=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const x=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(t,s),e.setRenderTarget(r,1,a),e.render(t,o),e.setRenderTarget(r,2,a),e.render(t,l),e.setRenderTarget(r,3,a),e.render(t,d),e.setRenderTarget(r,4,a),e.render(t,c),r.texture.generateMipmaps=x,e.setRenderTarget(r,5,a),e.render(t,f),e.setRenderTarget(_,m,g),e.xr.enabled=y,r.texture.needsPMREMUpdate=!0}}class CubeTexture extends Texture{constructor(e,t,r,a,s,o,l,d,c,f){e=e!==void 0?e:[],t=t!==void 0?t:CubeReflectionMapping,super(e,t,r,a,s,o,l,d,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class WebGLCubeRenderTarget extends WebGLRenderTarget{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new CubeTexture(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:LinearFilter}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new BoxGeometry(5,5,5),s=new ShaderMaterial({name:"CubemapFromEquirect",uniforms:cloneUniforms(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:BackSide,blending:NoBlending});s.uniforms.tEquirect.value=t;const o=new Mesh(a,s),l=t.minFilter;return t.minFilter===LinearMipmapLinearFilter&&(t.minFilter=LinearFilter),new CubeCamera(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,r,a){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,r,a);e.setRenderTarget(s)}}const _vector1=new Vector3,_vector2=new Vector3,_normalMatrix=new Matrix3;class Plane{constructor(e=new Vector3(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=_vector1.subVectors(r,t).cross(_vector2.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(_vector1),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||_normalMatrix.getNormalMatrix(e),a=this.coplanarPoint(_vector1).applyMatrix4(e),s=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _sphere$5=new Sphere,_vector$7=new Vector3;class Frustum{constructor(e=new Plane,t=new Plane,r=new Plane,a=new Plane,s=new Plane,o=new Plane){this.planes=[e,t,r,a,s,o]}set(e,t,r,a,s,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(r),l[3].copy(a),l[4].copy(s),l[5].copy(o),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=WebGLCoordinateSystem){const r=this.planes,a=e.elements,s=a[0],o=a[1],l=a[2],d=a[3],c=a[4],f=a[5],_=a[6],m=a[7],g=a[8],y=a[9],x=a[10],u=a[11],p=a[12],M=a[13],S=a[14],b=a[15];if(r[0].setComponents(d-s,m-c,u-g,b-p).normalize(),r[1].setComponents(d+s,m+c,u+g,b+p).normalize(),r[2].setComponents(d+o,m+f,u+y,b+M).normalize(),r[3].setComponents(d-o,m-f,u-y,b-M).normalize(),r[4].setComponents(d-l,m-_,u-x,b-S).normalize(),t===WebGLCoordinateSystem)r[5].setComponents(d+l,m+_,u+x,b+S).normalize();else if(t===WebGPUCoordinateSystem)r[5].setComponents(l,_,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_sphere$5.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_sphere$5.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_sphere$5)}intersectsSprite(e){return _sphere$5.center.set(0,0,0),_sphere$5.radius=.7071067811865476,_sphere$5.applyMatrix4(e.matrixWorld),this.intersectsSphere(_sphere$5)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(_vector$7.x=a.normal.x>0?e.max.x:e.min.x,_vector$7.y=a.normal.y>0?e.max.y:e.min.y,_vector$7.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(_vector$7)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function WebGLAnimation(){let n=null,e=!1,t=null,r=null;function a(s,o){t(s,o),r=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function WebGLAttributes(n){const e=new WeakMap;function t(l,d){const c=l.array,f=l.usage,_=c.byteLength,m=n.createBuffer();n.bindBuffer(d,m),n.bufferData(d,c,f),l.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:_}}function r(l,d,c){const f=d.array,_=d._updateRange,m=d.updateRanges;if(n.bindBuffer(c,l),_.count===-1&&m.length===0&&n.bufferSubData(c,0,f),m.length!==0){for(let g=0,y=m.length;g<y;g++){const x=m[g];n.bufferSubData(c,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}d.clearUpdateRanges()}_.count!==-1&&(n.bufferSubData(c,_.offset*f.BYTES_PER_ELEMENT,f,_.offset,_.count),_.count=-1),d.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);const d=e.get(l);d&&(n.deleteBuffer(d.buffer),e.delete(l))}function o(l,d){if(l.isGLBufferAttribute){const f=e.get(l);(!f||f.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const c=e.get(l);if(c===void 0)e.set(l,t(l,d));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(c.buffer,l,d),c.version=l.version}}return{get:a,remove:s,update:o}}class PlaneGeometry extends BufferGeometry{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const s=e/2,o=t/2,l=Math.floor(r),d=Math.floor(a),c=l+1,f=d+1,_=e/l,m=t/d,g=[],y=[],x=[],u=[];for(let p=0;p<f;p++){const M=p*m-o;for(let S=0;S<c;S++){const b=S*_-s;y.push(b,-M,0),x.push(0,0,1),u.push(S/l),u.push(1-p/d)}}for(let p=0;p<d;p++)for(let M=0;M<l;M++){const S=M+c*p,b=M+c*(p+1),A=M+1+c*(p+1),T=M+1+c*p;g.push(S,b,T),g.push(b,A,T)}this.setIndex(g),this.setAttribute("position",new Float32BufferAttribute(y,3)),this.setAttribute("normal",new Float32BufferAttribute(x,3)),this.setAttribute("uv",new Float32BufferAttribute(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new PlaneGeometry(e.width,e.height,e.widthSegments,e.heightSegments)}}var alphahash_fragment=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,begin_vertex=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,common=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment="gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,envmap_fragment=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_vertex=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,envmap_physical_pars_fragment=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lights_toon_fragment=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,shadowmap_pars_vertex=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vertex$h=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fragment$h=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fragment$g=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fragment$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$e=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fragment$e=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,vertex$d=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fragment$d=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vertex$c=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fragment$c=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vertex$b=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fragment$b=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vertex$a=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fragment$a=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$9=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$9=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$8=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fragment$8=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$7=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fragment$7=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vertex$6=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$6=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$5=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fragment$5=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$4=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$4=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vertex$3=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fragment$3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vertex$2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fragment$2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vertex$1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fragment$1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ShaderChunk={alphahash_fragment,alphahash_pars_fragment,alphamap_fragment,alphamap_pars_fragment,alphatest_fragment,alphatest_pars_fragment,aomap_fragment,aomap_pars_fragment,batching_pars_vertex,batching_vertex,begin_vertex,beginnormal_vertex,bsdfs,iridescence_fragment,bumpmap_pars_fragment,clipping_planes_fragment,clipping_planes_pars_fragment,clipping_planes_pars_vertex,clipping_planes_vertex,color_fragment,color_pars_fragment,color_pars_vertex,color_vertex,common,cube_uv_reflection_fragment,defaultnormal_vertex,displacementmap_pars_vertex,displacementmap_vertex,emissivemap_fragment,emissivemap_pars_fragment,colorspace_fragment,colorspace_pars_fragment,envmap_fragment,envmap_common_pars_fragment,envmap_pars_fragment,envmap_pars_vertex,envmap_physical_pars_fragment,envmap_vertex,fog_vertex,fog_pars_vertex,fog_fragment,fog_pars_fragment,gradientmap_pars_fragment,lightmap_pars_fragment,lights_lambert_fragment,lights_lambert_pars_fragment,lights_pars_begin,lights_toon_fragment,lights_toon_pars_fragment,lights_phong_fragment,lights_phong_pars_fragment,lights_physical_fragment,lights_physical_pars_fragment,lights_fragment_begin,lights_fragment_maps,lights_fragment_end,logdepthbuf_fragment,logdepthbuf_pars_fragment,logdepthbuf_pars_vertex,logdepthbuf_vertex,map_fragment,map_pars_fragment,map_particle_fragment,map_particle_pars_fragment,metalnessmap_fragment,metalnessmap_pars_fragment,morphinstance_vertex,morphcolor_vertex,morphnormal_vertex,morphtarget_pars_vertex,morphtarget_vertex,normal_fragment_begin,normal_fragment_maps,normal_pars_fragment,normal_pars_vertex,normal_vertex,normalmap_pars_fragment,clearcoat_normal_fragment_begin,clearcoat_normal_fragment_maps,clearcoat_pars_fragment,iridescence_pars_fragment,opaque_fragment,packing,premultiplied_alpha_fragment,project_vertex,dithering_fragment,dithering_pars_fragment,roughnessmap_fragment,roughnessmap_pars_fragment,shadowmap_pars_fragment,shadowmap_pars_vertex,shadowmap_vertex,shadowmask_pars_fragment,skinbase_vertex,skinning_pars_vertex,skinning_vertex,skinnormal_vertex,specularmap_fragment,specularmap_pars_fragment,tonemapping_fragment,tonemapping_pars_fragment,transmission_fragment,transmission_pars_fragment,uv_pars_fragment,uv_pars_vertex,uv_vertex,worldpos_vertex,background_vert:vertex$h,background_frag:fragment$h,backgroundCube_vert:vertex$g,backgroundCube_frag:fragment$g,cube_vert:vertex$f,cube_frag:fragment$f,depth_vert:vertex$e,depth_frag:fragment$e,distanceRGBA_vert:vertex$d,distanceRGBA_frag:fragment$d,equirect_vert:vertex$c,equirect_frag:fragment$c,linedashed_vert:vertex$b,linedashed_frag:fragment$b,meshbasic_vert:vertex$a,meshbasic_frag:fragment$a,meshlambert_vert:vertex$9,meshlambert_frag:fragment$9,meshmatcap_vert:vertex$8,meshmatcap_frag:fragment$8,meshnormal_vert:vertex$7,meshnormal_frag:fragment$7,meshphong_vert:vertex$6,meshphong_frag:fragment$6,meshphysical_vert:vertex$5,meshphysical_frag:fragment$5,meshtoon_vert:vertex$4,meshtoon_frag:fragment$4,points_vert:vertex$3,points_frag:fragment$3,shadow_vert:vertex$2,shadow_frag:fragment$2,sprite_vert:vertex$1,sprite_frag:fragment$1},UniformsLib={common:{diffuse:{value:new Color$1(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Matrix3}},envmap:{envMap:{value:null},envMapRotation:{value:new Matrix3},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Matrix3}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Matrix3}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Matrix3},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Matrix3},normalScale:{value:new Vector2(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Matrix3},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Matrix3}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Matrix3}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Matrix3}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Color$1(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Color$1(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0},uvTransform:{value:new Matrix3}},sprite:{diffuse:{value:new Color$1(16777215)},opacity:{value:1},center:{value:new Vector2(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Matrix3},alphaMap:{value:null},alphaMapTransform:{value:new Matrix3},alphaTest:{value:0}}},ShaderLib={basic:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.fog]),vertexShader:ShaderChunk.meshbasic_vert,fragmentShader:ShaderChunk.meshbasic_frag},lambert:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color$1(0)}}]),vertexShader:ShaderChunk.meshlambert_vert,fragmentShader:ShaderChunk.meshlambert_frag},phong:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.specularmap,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color$1(0)},specular:{value:new Color$1(1118481)},shininess:{value:30}}]),vertexShader:ShaderChunk.meshphong_vert,fragmentShader:ShaderChunk.meshphong_frag},standard:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.envmap,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.roughnessmap,UniformsLib.metalnessmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color$1(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag},toon:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.aomap,UniformsLib.lightmap,UniformsLib.emissivemap,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.gradientmap,UniformsLib.fog,UniformsLib.lights,{emissive:{value:new Color$1(0)}}]),vertexShader:ShaderChunk.meshtoon_vert,fragmentShader:ShaderChunk.meshtoon_frag},matcap:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,UniformsLib.fog,{matcap:{value:null}}]),vertexShader:ShaderChunk.meshmatcap_vert,fragmentShader:ShaderChunk.meshmatcap_frag},points:{uniforms:mergeUniforms([UniformsLib.points,UniformsLib.fog]),vertexShader:ShaderChunk.points_vert,fragmentShader:ShaderChunk.points_frag},dashed:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ShaderChunk.linedashed_vert,fragmentShader:ShaderChunk.linedashed_frag},depth:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap]),vertexShader:ShaderChunk.depth_vert,fragmentShader:ShaderChunk.depth_frag},normal:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.bumpmap,UniformsLib.normalmap,UniformsLib.displacementmap,{opacity:{value:1}}]),vertexShader:ShaderChunk.meshnormal_vert,fragmentShader:ShaderChunk.meshnormal_frag},sprite:{uniforms:mergeUniforms([UniformsLib.sprite,UniformsLib.fog]),vertexShader:ShaderChunk.sprite_vert,fragmentShader:ShaderChunk.sprite_frag},background:{uniforms:{uvTransform:{value:new Matrix3},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ShaderChunk.background_vert,fragmentShader:ShaderChunk.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Matrix3}},vertexShader:ShaderChunk.backgroundCube_vert,fragmentShader:ShaderChunk.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ShaderChunk.cube_vert,fragmentShader:ShaderChunk.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ShaderChunk.equirect_vert,fragmentShader:ShaderChunk.equirect_frag},distanceRGBA:{uniforms:mergeUniforms([UniformsLib.common,UniformsLib.displacementmap,{referencePosition:{value:new Vector3},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ShaderChunk.distanceRGBA_vert,fragmentShader:ShaderChunk.distanceRGBA_frag},shadow:{uniforms:mergeUniforms([UniformsLib.lights,UniformsLib.fog,{color:{value:new Color$1(0)},opacity:{value:1}}]),vertexShader:ShaderChunk.shadow_vert,fragmentShader:ShaderChunk.shadow_frag}};ShaderLib.physical={uniforms:mergeUniforms([ShaderLib.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Matrix3},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Matrix3},clearcoatNormalScale:{value:new Vector2(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Matrix3},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Matrix3},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Matrix3},sheen:{value:0},sheenColor:{value:new Color$1(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Matrix3},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Matrix3},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Matrix3},transmissionSamplerSize:{value:new Vector2},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Matrix3},attenuationDistance:{value:0},attenuationColor:{value:new Color$1(0)},specularColor:{value:new Color$1(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Matrix3},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Matrix3},anisotropyVector:{value:new Vector2},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Matrix3}}]),vertexShader:ShaderChunk.meshphysical_vert,fragmentShader:ShaderChunk.meshphysical_frag};const _rgb={r:0,b:0,g:0},_e1$1=new Euler,_m1$1=new Matrix4;function WebGLBackground(n,e,t,r,a,s,o){const l=new Color$1(0);let d=s===!0?0:1,c,f,_=null,m=0,g=null;function y(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?t:e).get(S)),S}function x(M){let S=!1;const b=y(M);b===null?p(l,d):b&&b.isColor&&(p(b,1),S=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?r.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function u(M,S){const b=y(S);b&&(b.isCubeTexture||b.mapping===CubeUVReflectionMapping)?(f===void 0&&(f=new Mesh(new BoxGeometry(1,1,1),new ShaderMaterial({name:"BackgroundCubeMaterial",uniforms:cloneUniforms(ShaderLib.backgroundCube.uniforms),vertexShader:ShaderLib.backgroundCube.vertexShader,fragmentShader:ShaderLib.backgroundCube.fragmentShader,side:BackSide,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(A,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(f)),_e1$1.copy(S.backgroundRotation),_e1$1.x*=-1,_e1$1.y*=-1,_e1$1.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(_e1$1.y*=-1,_e1$1.z*=-1),f.material.uniforms.envMap.value=b,f.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(_m1$1.makeRotationFromEuler(_e1$1)),f.material.toneMapped=ColorManagement.getTransfer(b.colorSpace)!==SRGBTransfer,(_!==b||m!==b.version||g!==n.toneMapping)&&(f.material.needsUpdate=!0,_=b,m=b.version,g=n.toneMapping),f.layers.enableAll(),M.unshift(f,f.geometry,f.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Mesh(new PlaneGeometry(2,2),new ShaderMaterial({name:"BackgroundMaterial",uniforms:cloneUniforms(ShaderLib.background.uniforms),vertexShader:ShaderLib.background.vertexShader,fragmentShader:ShaderLib.background.fragmentShader,side:FrontSide,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ColorManagement.getTransfer(b.colorSpace)!==SRGBTransfer,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(_!==b||m!==b.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,_=b,m=b.version,g=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,S){M.getRGB(_rgb,getUnlitUniformColorSpace(n)),r.buffers.color.setClear(_rgb.r,_rgb.g,_rgb.b,S,o)}return{getClearColor:function(){return l},setClearColor:function(M,S=1){l.set(M),d=S,p(l,d)},getClearAlpha:function(){return d},setClearAlpha:function(M){d=M,p(l,d)},render:x,addToRenderList:u}}function WebGLBindingStates(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),r={},a=m(null);let s=a,o=!1;function l(C,I,N,D,V){let R=!1;const F=_(D,N,I);s!==F&&(s=F,c(s.object)),R=g(C,D,N,V),R&&y(C,D,N,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,b(C,I,N,D),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function d(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function f(C){return n.deleteVertexArray(C)}function _(C,I,N){const D=N.wireframe===!0;let V=r[C.id];V===void 0&&(V={},r[C.id]=V);let R=V[I.id];R===void 0&&(R={},V[I.id]=R);let F=R[D];return F===void 0&&(F=m(d()),R[D]=F),F}function m(C){const I=[],N=[],D=[];for(let V=0;V<t;V++)I[V]=0,N[V]=0,D[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:D,object:C,attributes:{},index:null}}function g(C,I,N,D){const V=s.attributes,R=I.attributes;let F=0;const $=N.getAttributes();for(const W in $)if($[W].location>=0){const j=V[W];let ie=R[W];if(ie===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),j===void 0||j.attribute!==ie||ie&&j.data!==ie.data)return!0;F++}return s.attributesNum!==F||s.index!==D}function y(C,I,N,D){const V={},R=I.attributes;let F=0;const $=N.getAttributes();for(const W in $)if($[W].location>=0){let j=R[W];j===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(j=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(j=C.instanceColor));const ie={};ie.attribute=j,j&&j.data&&(ie.data=j.data),V[W]=ie,F++}s.attributes=V,s.attributesNum=F,s.index=D}function x(){const C=s.newAttributes;for(let I=0,N=C.length;I<N;I++)C[I]=0}function u(C){p(C,0)}function p(C,I){const N=s.newAttributes,D=s.enabledAttributes,V=s.attributeDivisors;N[C]=1,D[C]===0&&(n.enableVertexAttribArray(C),D[C]=1),V[C]!==I&&(n.vertexAttribDivisor(C,I),V[C]=I)}function M(){const C=s.newAttributes,I=s.enabledAttributes;for(let N=0,D=I.length;N<D;N++)I[N]!==C[N]&&(n.disableVertexAttribArray(N),I[N]=0)}function S(C,I,N,D,V,R,F){F===!0?n.vertexAttribIPointer(C,I,N,V,R):n.vertexAttribPointer(C,I,N,D,V,R)}function b(C,I,N,D){x();const V=D.attributes,R=N.getAttributes(),F=I.defaultAttributeValues;for(const $ in R){const W=R[$];if(W.location>=0){let J=V[$];if(J===void 0&&($==="instanceMatrix"&&C.instanceMatrix&&(J=C.instanceMatrix),$==="instanceColor"&&C.instanceColor&&(J=C.instanceColor)),J!==void 0){const j=J.normalized,ie=J.itemSize,ae=e.get(J);if(ae===void 0)continue;const he=ae.buffer,z=ae.type,X=ae.bytesPerElement,re=z===n.INT||z===n.UNSIGNED_INT||J.gpuType===IntType;if(J.isInterleavedBufferAttribute){const Y=J.data,de=Y.stride,fe=J.offset;if(Y.isInstancedInterleavedBuffer){for(let Te=0;Te<W.locationSize;Te++)p(W.location+Te,Y.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Te=0;Te<W.locationSize;Te++)u(W.location+Te);n.bindBuffer(n.ARRAY_BUFFER,he);for(let Te=0;Te<W.locationSize;Te++)S(W.location+Te,ie/W.locationSize,z,j,de*X,(fe+ie/W.locationSize*Te)*X,re)}else{if(J.isInstancedBufferAttribute){for(let Y=0;Y<W.locationSize;Y++)p(W.location+Y,J.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Y=0;Y<W.locationSize;Y++)u(W.location+Y);n.bindBuffer(n.ARRAY_BUFFER,he);for(let Y=0;Y<W.locationSize;Y++)S(W.location+Y,ie/W.locationSize,z,j,ie*X,ie/W.locationSize*Y*X,re)}}else if(F!==void 0){const j=F[$];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(W.location,j);break;case 3:n.vertexAttrib3fv(W.location,j);break;case 4:n.vertexAttrib4fv(W.location,j);break;default:n.vertexAttrib1fv(W.location,j)}}}}M()}function A(){B();for(const C in r){const I=r[C];for(const N in I){const D=I[N];for(const V in D)f(D[V].object),delete D[V];delete I[N]}delete r[C]}}function T(C){if(r[C.id]===void 0)return;const I=r[C.id];for(const N in I){const D=I[N];for(const V in D)f(D[V].object),delete D[V];delete I[N]}delete r[C.id]}function E(C){for(const I in r){const N=r[I];if(N[C.id]===void 0)continue;const D=N[C.id];for(const V in D)f(D[V].object),delete D[V];delete N[C.id]}}function B(){P(),o=!0,s!==a&&(s=a,c(s.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:B,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:u,disableUnusedAttributes:M}}function WebGLBufferRenderer(n,e,t){let r;function a(c){r=c}function s(c,f){n.drawArrays(r,c,f),t.update(f,r,1)}function o(c,f,_){_!==0&&(n.drawArraysInstanced(r,c,f,_),t.update(f,r,_))}function l(c,f,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<_;g++)this.render(c[g],f[g]);else{m.multiDrawArraysWEBGL(r,c,0,f,0,_);let g=0;for(let y=0;y<_;y++)g+=f[y];t.update(g,r,1)}}function d(c,f,_,m){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let y=0;y<c.length;y++)o(c[y],f[y],m[y]);else{g.multiDrawArraysInstancedWEBGL(r,c,0,f,0,m,0,_);let y=0;for(let x=0;x<_;x++)y+=f[x];for(let x=0;x<m.length;x++)t.update(y,r,m[x])}}this.setMode=a,this.render=s,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=d}function WebGLCapabilities(n,e,t,r){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(T){return!(T!==RGBAFormat&&r.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(T){const E=T===HalfFloatType&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==UnsignedByteType&&r.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==FloatType&&!E)}function d(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const f=d(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const _=t.logarithmicDepthBuffer===!0,m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:d,textureFormatReadable:o,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:_,maxTextures:m,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:x,maxAttributes:u,maxVertexUniforms:p,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:b,maxSamples:A}}function WebGLClipping(n){const e=this;let t=null,r=0,a=!1,s=!1;const o=new Plane,l=new Matrix3,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(_,m){const g=_.length!==0||m||r!==0||a;return a=m,r=_.length,g},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(_,m){t=f(_,m,0)},this.setState=function(_,m,g){const y=_.clippingPlanes,x=_.clipIntersection,u=_.clipShadows,p=n.get(_);if(!a||y===null||y.length===0||s&&!u)s?f(null):c();else{const M=s?0:r,S=M*4;let b=p.clippingState||null;d.value=b,b=f(y,m,S,g);for(let A=0;A!==S;++A)b[A]=t[A];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){d.value!==t&&(d.value=t,d.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function f(_,m,g,y){const x=_!==null?_.length:0;let u=null;if(x!==0){if(u=d.value,y!==!0||u===null){const p=g+x*4,M=m.matrixWorldInverse;l.getNormalMatrix(M),(u===null||u.length<p)&&(u=new Float32Array(p));for(let S=0,b=g;S!==x;++S,b+=4)o.copy(_[S]).applyMatrix4(M,l),o.normal.toArray(u,b),u[b+3]=o.constant}d.value=u,d.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,u}}function WebGLCubeMaps(n){let e=new WeakMap;function t(o,l){return l===EquirectangularReflectionMapping?o.mapping=CubeReflectionMapping:l===EquirectangularRefractionMapping&&(o.mapping=CubeRefractionMapping),o}function r(o){if(o&&o.isTexture){const l=o.mapping;if(l===EquirectangularReflectionMapping||l===EquirectangularRefractionMapping)if(e.has(o)){const d=e.get(o).texture;return t(d,o.mapping)}else{const d=o.image;if(d&&d.height>0){const c=new WebGLCubeRenderTarget(d.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",a),t(c.texture,o.mapping)}else return null}}return o}function a(o){const l=o.target;l.removeEventListener("dispose",a);const d=e.get(l);d!==void 0&&(e.delete(l),d.dispose())}function s(){e=new WeakMap}return{get:r,dispose:s}}class OrthographicCamera extends Camera$1{constructor(e=-1,t=1,r=1,a=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=r-e,o=r+e,l=a+t,d=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,l-=f*this.view.offsetY,d=l-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,l,d,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const LOD_MIN=4,EXTRA_LOD_SIGMA=[.125,.215,.35,.446,.526,.582],MAX_SAMPLES=20,_flatCamera=new OrthographicCamera,_clearColor=new Color$1;let _oldTarget=null,_oldActiveCubeFace=0,_oldActiveMipmapLevel=0,_oldXrEnabled=!1;const PHI=(1+Math.sqrt(5))/2,INV_PHI=1/PHI,_axisDirections=[new Vector3(-PHI,INV_PHI,0),new Vector3(PHI,INV_PHI,0),new Vector3(-INV_PHI,0,PHI),new Vector3(INV_PHI,0,PHI),new Vector3(0,PHI,-INV_PHI),new Vector3(0,PHI,INV_PHI),new Vector3(-1,1,-1),new Vector3(1,1,-1),new Vector3(-1,1,1),new Vector3(1,1,1)];class PMREMGenerator{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,a=100){_oldTarget=this._renderer.getRenderTarget(),_oldActiveCubeFace=this._renderer.getActiveCubeFace(),_oldActiveMipmapLevel=this._renderer.getActiveMipmapLevel(),_oldXrEnabled=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,r,a,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_getCubemapMaterial(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_getEquirectMaterial(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_oldTarget,_oldActiveCubeFace,_oldActiveMipmapLevel),this._renderer.xr.enabled=_oldXrEnabled,e.scissorTest=!1,_setViewport(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===CubeReflectionMapping||e.mapping===CubeRefractionMapping?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_oldTarget=this._renderer.getRenderTarget(),_oldActiveCubeFace=this._renderer.getActiveCubeFace(),_oldActiveMipmapLevel=this._renderer.getActiveMipmapLevel(),_oldXrEnabled=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:LinearFilter,minFilter:LinearFilter,generateMipmaps:!1,type:HalfFloatType,format:RGBAFormat,colorSpace:LinearSRGBColorSpace,depthBuffer:!1},a=_createRenderTarget(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_createRenderTarget(e,t,r);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_createPlanes(s)),this._blurMaterial=_getBlurShader(s,e,t)}return a}_compileMaterial(e){const t=new Mesh(this._lodPlanes[0],e);this._renderer.compile(t,_flatCamera)}_sceneToCubeUV(e,t,r,a){const l=new PerspectiveCamera(90,1,t,r),d=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],f=this._renderer,_=f.autoClear,m=f.toneMapping;f.getClearColor(_clearColor),f.toneMapping=NoToneMapping,f.autoClear=!1;const g=new MeshBasicMaterial({name:"PMREM.Background",side:BackSide,depthWrite:!1,depthTest:!1}),y=new Mesh(new BoxGeometry,g);let x=!1;const u=e.background;u?u.isColor&&(g.color.copy(u),e.background=null,x=!0):(g.color.copy(_clearColor),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(l.up.set(0,d[p],0),l.lookAt(c[p],0,0)):M===1?(l.up.set(0,0,d[p]),l.lookAt(0,c[p],0)):(l.up.set(0,d[p],0),l.lookAt(0,0,c[p]));const S=this._cubeSize;_setViewport(a,M*S,p>2?S:0,S,S),f.setRenderTarget(a),x&&f.render(y,l),f.render(e,l)}y.geometry.dispose(),y.material.dispose(),f.toneMapping=m,f.autoClear=_,e.background=u}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===CubeReflectionMapping||e.mapping===CubeRefractionMapping;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=_getCubemapMaterial()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_getEquirectMaterial());const s=a?this._cubemapMaterial:this._equirectMaterial,o=new Mesh(this._lodPlanes[0],s),l=s.uniforms;l.envMap.value=e;const d=this._cubeSize;_setViewport(t,0,0,3*d,2*d),r.setRenderTarget(t),r.render(o,_flatCamera)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=_axisDirections[(a-s-1)%_axisDirections.length];this._blur(e,s-1,s,o,l)}t.autoClear=r}_blur(e,t,r,a,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,r,a,"latitudinal",s),this._halfBlur(o,e,r,r,a,"longitudinal",s)}_halfBlur(e,t,r,a,s,o,l){const d=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,_=new Mesh(this._lodPlanes[a],c),m=c.uniforms,g=this._sizeLods[r]-1,y=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*MAX_SAMPLES-1),x=s/y,u=isFinite(s)?1+Math.floor(f*x):MAX_SAMPLES;u>MAX_SAMPLES&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${MAX_SAMPLES}`);const p=[];let M=0;for(let E=0;E<MAX_SAMPLES;++E){const B=E/x,P=Math.exp(-B*B/2);p.push(P),E===0?M+=P:E<u&&(M+=2*P)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;m.envMap.value=e.texture,m.samples.value=u,m.weights.value=p,m.latitudinal.value=o==="latitudinal",l&&(m.poleAxis.value=l);const{_lodMax:S}=this;m.dTheta.value=y,m.mipInt.value=S-r;const b=this._sizeLods[a],A=3*b*(a>S-LOD_MIN?a-S+LOD_MIN:0),T=4*(this._cubeSize-b);_setViewport(t,A,T,3*b,2*b),d.setRenderTarget(t),d.render(_,_flatCamera)}}function _createPlanes(n){const e=[],t=[],r=[];let a=n;const s=n-LOD_MIN+1+EXTRA_LOD_SIGMA.length;for(let o=0;o<s;o++){const l=Math.pow(2,a);t.push(l);let d=1/l;o>n-LOD_MIN?d=EXTRA_LOD_SIGMA[o-n+LOD_MIN-1]:o===0&&(d=0),r.push(d);const c=1/(l-2),f=-c,_=1+c,m=[f,f,_,f,_,_,f,f,_,_,f,_],g=6,y=6,x=3,u=2,p=1,M=new Float32Array(x*y*g),S=new Float32Array(u*y*g),b=new Float32Array(p*y*g);for(let T=0;T<g;T++){const E=T%3*2/3-1,B=T>2?0:-1,P=[E,B,0,E+2/3,B,0,E+2/3,B+1,0,E,B,0,E+2/3,B+1,0,E,B+1,0];M.set(P,x*y*T),S.set(m,u*y*T);const C=[T,T,T,T,T,T];b.set(C,p*y*T)}const A=new BufferGeometry;A.setAttribute("position",new BufferAttribute(M,x)),A.setAttribute("uv",new BufferAttribute(S,u)),A.setAttribute("faceIndex",new BufferAttribute(b,p)),e.push(A),a>LOD_MIN&&a--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function _createRenderTarget(n,e,t){const r=new WebGLRenderTarget(n,e,t);return r.texture.mapping=CubeUVReflectionMapping,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function _setViewport(n,e,t,r,a){n.viewport.set(e,t,r,a),n.scissor.set(e,t,r,a)}function _getBlurShader(n,e,t){const r=new Float32Array(MAX_SAMPLES),a=new Vector3(0,1,0);return new ShaderMaterial({name:"SphericalGaussianBlur",defines:{n:MAX_SAMPLES,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getEquirectMaterial(){return new ShaderMaterial({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getCubemapMaterial(){return new ShaderMaterial({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_getCommonVertexShader(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:NoBlending,depthTest:!1,depthWrite:!1})}function _getCommonVertexShader(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function WebGLCubeUVMaps(n){let e=new WeakMap,t=null;function r(l){if(l&&l.isTexture){const d=l.mapping,c=d===EquirectangularReflectionMapping||d===EquirectangularRefractionMapping,f=d===CubeReflectionMapping||d===CubeRefractionMapping;if(c||f){let _=e.get(l);const m=_!==void 0?_.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==m)return t===null&&(t=new PMREMGenerator(n)),_=c?t.fromEquirectangular(l,_):t.fromCubemap(l,_),_.texture.pmremVersion=l.pmremVersion,e.set(l,_),_.texture;if(_!==void 0)return _.texture;{const g=l.image;return c&&g&&g.height>0||f&&g&&a(g)?(t===null&&(t=new PMREMGenerator(n)),_=c?t.fromEquirectangular(l):t.fromCubemap(l),_.texture.pmremVersion=l.pmremVersion,e.set(l,_),l.addEventListener("dispose",s),_.texture):null}}}return l}function a(l){let d=0;const c=6;for(let f=0;f<c;f++)l[f]!==void 0&&d++;return d===c}function s(l){const d=l.target;d.removeEventListener("dispose",s);const c=e.get(d);c!==void 0&&(e.delete(d),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:o}}function WebGLExtensions(n){const e={};function t(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(r)}return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&warnOnce("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function WebGLGeometries(n,e,t,r){const a={},s=new WeakMap;function o(_){const m=_.target;m.index!==null&&e.remove(m.index);for(const y in m.attributes)e.remove(m.attributes[y]);for(const y in m.morphAttributes){const x=m.morphAttributes[y];for(let u=0,p=x.length;u<p;u++)e.remove(x[u])}m.removeEventListener("dispose",o),delete a[m.id];const g=s.get(m);g&&(e.remove(g),s.delete(m)),r.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function l(_,m){return a[m.id]===!0||(m.addEventListener("dispose",o),a[m.id]=!0,t.memory.geometries++),m}function d(_){const m=_.attributes;for(const y in m)e.update(m[y],n.ARRAY_BUFFER);const g=_.morphAttributes;for(const y in g){const x=g[y];for(let u=0,p=x.length;u<p;u++)e.update(x[u],n.ARRAY_BUFFER)}}function c(_){const m=[],g=_.index,y=_.attributes.position;let x=0;if(g!==null){const M=g.array;x=g.version;for(let S=0,b=M.length;S<b;S+=3){const A=M[S+0],T=M[S+1],E=M[S+2];m.push(A,T,T,E,E,A)}}else if(y!==void 0){const M=y.array;x=y.version;for(let S=0,b=M.length/3-1;S<b;S+=3){const A=S+0,T=S+1,E=S+2;m.push(A,T,T,E,E,A)}}else return;const u=new(arrayNeedsUint32(m)?Uint32BufferAttribute:Uint16BufferAttribute)(m,1);u.version=x;const p=s.get(_);p&&e.remove(p),s.set(_,u)}function f(_){const m=s.get(_);if(m){const g=_.index;g!==null&&m.version<g.version&&c(_)}else c(_);return s.get(_)}return{get:l,update:d,getWireframeAttribute:f}}function WebGLIndexedBufferRenderer(n,e,t){let r;function a(m){r=m}let s,o;function l(m){s=m.type,o=m.bytesPerElement}function d(m,g){n.drawElements(r,g,s,m*o),t.update(g,r,1)}function c(m,g,y){y!==0&&(n.drawElementsInstanced(r,g,s,m*o,y),t.update(g,r,y))}function f(m,g,y){if(y===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let u=0;u<y;u++)this.render(m[u]/o,g[u]);else{x.multiDrawElementsWEBGL(r,g,0,s,m,0,y);let u=0;for(let p=0;p<y;p++)u+=g[p];t.update(u,r,1)}}function _(m,g,y,x){if(y===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<m.length;p++)c(m[p]/o,g[p],x[p]);else{u.multiDrawElementsInstancedWEBGL(r,g,0,s,m,0,x,0,y);let p=0;for(let M=0;M<y;M++)p+=g[M];for(let M=0;M<x.length;M++)t.update(p,r,x[M])}}this.setMode=a,this.setIndex=l,this.render=d,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=_}function WebGLInfo(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(s,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(s/3);break;case n.LINES:t.lines+=l*(s/2);break;case n.LINE_STRIP:t.lines+=l*(s-1);break;case n.LINE_LOOP:t.lines+=l*s;break;case n.POINTS:t.points+=l*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function WebGLMorphtargets(n,e,t){const r=new WeakMap,a=new Vector4;function s(o,l,d){const c=o.morphTargetInfluences,f=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,_=f!==void 0?f.length:0;let m=r.get(l);if(m===void 0||m.count!==_){let P=function(){E.dispose(),r.delete(l),l.removeEventListener("dispose",P)};m!==void 0&&m.texture.dispose();const g=l.morphAttributes.position!==void 0,y=l.morphAttributes.normal!==void 0,x=l.morphAttributes.color!==void 0,u=l.morphAttributes.position||[],p=l.morphAttributes.normal||[],M=l.morphAttributes.color||[];let S=0;g===!0&&(S=1),y===!0&&(S=2),x===!0&&(S=3);let b=l.attributes.position.count*S,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*A*4*_),E=new DataArrayTexture(T,b,A,_);E.type=FloatType,E.needsUpdate=!0;const B=S*4;for(let C=0;C<_;C++){const I=u[C],N=p[C],D=M[C],V=b*A*4*C;for(let R=0;R<I.count;R++){const F=R*B;g===!0&&(a.fromBufferAttribute(I,R),T[V+F+0]=a.x,T[V+F+1]=a.y,T[V+F+2]=a.z,T[V+F+3]=0),y===!0&&(a.fromBufferAttribute(N,R),T[V+F+4]=a.x,T[V+F+5]=a.y,T[V+F+6]=a.z,T[V+F+7]=0),x===!0&&(a.fromBufferAttribute(D,R),T[V+F+8]=a.x,T[V+F+9]=a.y,T[V+F+10]=a.z,T[V+F+11]=D.itemSize===4?a.w:1)}}m={count:_,texture:E,size:new Vector2(b,A)},r.set(l,m),l.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)d.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let x=0;x<c.length;x++)g+=c[x];const y=l.morphTargetsRelative?1:1-g;d.getUniforms().setValue(n,"morphTargetBaseInfluence",y),d.getUniforms().setValue(n,"morphTargetInfluences",c)}d.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}return{update:s}}function WebGLObjects(n,e,t,r){let a=new WeakMap;function s(d){const c=r.render.frame,f=d.geometry,_=e.get(d,f);if(a.get(_)!==c&&(e.update(_),a.set(_,c)),d.isInstancedMesh&&(d.hasEventListener("dispose",l)===!1&&d.addEventListener("dispose",l),a.get(d)!==c&&(t.update(d.instanceMatrix,n.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,n.ARRAY_BUFFER),a.set(d,c))),d.isSkinnedMesh){const m=d.skeleton;a.get(m)!==c&&(m.update(),a.set(m,c))}return _}function o(){a=new WeakMap}function l(d){const c=d.target;c.removeEventListener("dispose",l),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class DepthTexture extends Texture{constructor(e,t,r,a,s,o,l,d,c,f=DepthFormat){if(f!==DepthFormat&&f!==DepthStencilFormat)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&f===DepthFormat&&(r=UnsignedIntType),r===void 0&&f===DepthStencilFormat&&(r=UnsignedInt248Type),super(null,a,s,o,l,d,f,r,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:NearestFilter,this.minFilter=d!==void 0?d:NearestFilter,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const emptyTexture=new Texture,emptyShadowTexture=new DepthTexture(1,1);emptyShadowTexture.compareFunction=LessEqualCompare;const emptyArrayTexture=new DataArrayTexture,empty3dTexture=new Data3DTexture,emptyCubeTexture=new CubeTexture,arrayCacheF32=[],arrayCacheI32=[],mat4array=new Float32Array(16),mat3array=new Float32Array(9),mat2array=new Float32Array(4);function flatten(n,e,t){const r=n[0];if(r<=0||r>0)return n;const a=e*t;let s=arrayCacheF32[a];if(s===void 0&&(s=new Float32Array(a),arrayCacheF32[a]=s),e!==0){r.toArray(s,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(s,l)}return s}function arraysEqual(n,e){if(n.length!==e.length)return!1;for(let t=0,r=n.length;t<r;t++)if(n[t]!==e[t])return!1;return!0}function copyArray(n,e){for(let t=0,r=e.length;t<r;t++)n[t]=e[t]}function allocTexUnits(n,e){let t=arrayCacheI32[e];t===void 0&&(t=new Int32Array(e),arrayCacheI32[e]=t);for(let r=0;r!==e;++r)t[r]=n.allocateTextureUnit();return t}function setValueV1f(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function setValueV2f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2fv(this.addr,e),copyArray(t,e)}}function setValueV3f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(arraysEqual(t,e))return;n.uniform3fv(this.addr,e),copyArray(t,e)}}function setValueV4f(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4fv(this.addr,e),copyArray(t,e)}}function setValueM2(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat2array.set(r),n.uniformMatrix2fv(this.addr,!1,mat2array),copyArray(t,r)}}function setValueM3(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat3array.set(r),n.uniformMatrix3fv(this.addr,!1,mat3array),copyArray(t,r)}}function setValueM4(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(arraysEqual(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),copyArray(t,e)}else{if(arraysEqual(t,r))return;mat4array.set(r),n.uniformMatrix4fv(this.addr,!1,mat4array),copyArray(t,r)}}function setValueV1i(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function setValueV2i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2iv(this.addr,e),copyArray(t,e)}}function setValueV3i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(arraysEqual(t,e))return;n.uniform3iv(this.addr,e),copyArray(t,e)}}function setValueV4i(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4iv(this.addr,e),copyArray(t,e)}}function setValueV1ui(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function setValueV2ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(arraysEqual(t,e))return;n.uniform2uiv(this.addr,e),copyArray(t,e)}}function setValueV3ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(arraysEqual(t,e))return;n.uniform3uiv(this.addr,e),copyArray(t,e)}}function setValueV4ui(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(arraysEqual(t,e))return;n.uniform4uiv(this.addr,e),copyArray(t,e)}}function setValueT1(n,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(n.uniform1i(this.addr,a),r[0]=a);const s=this.type===n.SAMPLER_2D_SHADOW?emptyShadowTexture:emptyTexture;t.setTexture2D(e||s,a)}function setValueT3D1(n,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(n.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||empty3dTexture,a)}function setValueT6(n,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(n.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||emptyCubeTexture,a)}function setValueT2DArray1(n,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(n.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||emptyArrayTexture,a)}function getSingularSetter(n){switch(n){case 5126:return setValueV1f;case 35664:return setValueV2f;case 35665:return setValueV3f;case 35666:return setValueV4f;case 35674:return setValueM2;case 35675:return setValueM3;case 35676:return setValueM4;case 5124:case 35670:return setValueV1i;case 35667:case 35671:return setValueV2i;case 35668:case 35672:return setValueV3i;case 35669:case 35673:return setValueV4i;case 5125:return setValueV1ui;case 36294:return setValueV2ui;case 36295:return setValueV3ui;case 36296:return setValueV4ui;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1;case 35679:case 36299:case 36307:return setValueT3D1;case 35680:case 36300:case 36308:case 36293:return setValueT6;case 36289:case 36303:case 36311:case 36292:return setValueT2DArray1}}function setValueV1fArray(n,e){n.uniform1fv(this.addr,e)}function setValueV2fArray(n,e){const t=flatten(e,this.size,2);n.uniform2fv(this.addr,t)}function setValueV3fArray(n,e){const t=flatten(e,this.size,3);n.uniform3fv(this.addr,t)}function setValueV4fArray(n,e){const t=flatten(e,this.size,4);n.uniform4fv(this.addr,t)}function setValueM2Array(n,e){const t=flatten(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function setValueM3Array(n,e){const t=flatten(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function setValueM4Array(n,e){const t=flatten(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function setValueV1iArray(n,e){n.uniform1iv(this.addr,e)}function setValueV2iArray(n,e){n.uniform2iv(this.addr,e)}function setValueV3iArray(n,e){n.uniform3iv(this.addr,e)}function setValueV4iArray(n,e){n.uniform4iv(this.addr,e)}function setValueV1uiArray(n,e){n.uniform1uiv(this.addr,e)}function setValueV2uiArray(n,e){n.uniform2uiv(this.addr,e)}function setValueV3uiArray(n,e){n.uniform3uiv(this.addr,e)}function setValueV4uiArray(n,e){n.uniform4uiv(this.addr,e)}function setValueT1Array(n,e,t){const r=this.cache,a=e.length,s=allocTexUnits(t,a);arraysEqual(r,s)||(n.uniform1iv(this.addr,s),copyArray(r,s));for(let o=0;o!==a;++o)t.setTexture2D(e[o]||emptyTexture,s[o])}function setValueT3DArray(n,e,t){const r=this.cache,a=e.length,s=allocTexUnits(t,a);arraysEqual(r,s)||(n.uniform1iv(this.addr,s),copyArray(r,s));for(let o=0;o!==a;++o)t.setTexture3D(e[o]||empty3dTexture,s[o])}function setValueT6Array(n,e,t){const r=this.cache,a=e.length,s=allocTexUnits(t,a);arraysEqual(r,s)||(n.uniform1iv(this.addr,s),copyArray(r,s));for(let o=0;o!==a;++o)t.setTextureCube(e[o]||emptyCubeTexture,s[o])}function setValueT2DArrayArray(n,e,t){const r=this.cache,a=e.length,s=allocTexUnits(t,a);arraysEqual(r,s)||(n.uniform1iv(this.addr,s),copyArray(r,s));for(let o=0;o!==a;++o)t.setTexture2DArray(e[o]||emptyArrayTexture,s[o])}function getPureArraySetter(n){switch(n){case 5126:return setValueV1fArray;case 35664:return setValueV2fArray;case 35665:return setValueV3fArray;case 35666:return setValueV4fArray;case 35674:return setValueM2Array;case 35675:return setValueM3Array;case 35676:return setValueM4Array;case 5124:case 35670:return setValueV1iArray;case 35667:case 35671:return setValueV2iArray;case 35668:case 35672:return setValueV3iArray;case 35669:case 35673:return setValueV4iArray;case 5125:return setValueV1uiArray;case 36294:return setValueV2uiArray;case 36295:return setValueV3uiArray;case 36296:return setValueV4uiArray;case 35678:case 36198:case 36298:case 36306:case 35682:return setValueT1Array;case 35679:case 36299:case 36307:return setValueT3DArray;case 35680:case 36300:case 36308:case 36293:return setValueT6Array;case 36289:case 36303:case 36311:case 36292:return setValueT2DArrayArray}}class SingleUniform{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=getSingularSetter(t.type)}}class PureArrayUniform{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=getPureArraySetter(t.type)}}class StructuredUniform{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let s=0,o=a.length;s!==o;++s){const l=a[s];l.setValue(e,t[l.id],r)}}}const RePathPart=/(\w+)(\])?(\[|\.)?/g;function addUniform(n,e){n.seq.push(e),n.map[e.id]=e}function parseUniform(n,e,t){const r=n.name,a=r.length;for(RePathPart.lastIndex=0;;){const s=RePathPart.exec(r),o=RePathPart.lastIndex;let l=s[1];const d=s[2]==="]",c=s[3];if(d&&(l=l|0),c===void 0||c==="["&&o+2===a){addUniform(t,c===void 0?new SingleUniform(l,n,e):new PureArrayUniform(l,n,e));break}else{let _=t.map[l];_===void 0&&(_=new StructuredUniform(l),addUniform(t,_)),t=_}}}class WebGLUniforms{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const s=e.getActiveUniform(t,a),o=e.getUniformLocation(t,s.name);parseUniform(s,o,this)}}setValue(e,t,r,a){const s=this.map[t];s!==void 0&&s.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let s=0,o=t.length;s!==o;++s){const l=t[s],d=r[l.id];d.needsUpdate!==!1&&l.setValue(e,d.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,s=e.length;a!==s;++a){const o=e[a];o.id in t&&r.push(o)}return r}}function WebGLShader(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),r}const COMPLETION_STATUS_KHR=37297;let programIdCount=0;function handleSource(n,e){const t=n.split(`
`),r=[],a=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=a;o<s;o++){const l=o+1;r.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return r.join(`
`)}function getEncodingComponents(n){const e=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),t=ColorManagement.getPrimaries(n);let r;switch(e===t?r="":e===P3Primaries&&t===Rec709Primaries?r="LinearDisplayP3ToLinearSRGB":e===Rec709Primaries&&t===P3Primaries&&(r="LinearSRGBToLinearDisplayP3"),n){case LinearSRGBColorSpace:case LinearDisplayP3ColorSpace:return[r,"LinearTransferOETF"];case SRGBColorSpace:case DisplayP3ColorSpace:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[r,"LinearTransferOETF"]}}function getShaderErrors(n,e,t){const r=n.getShaderParameter(e,n.COMPILE_STATUS),a=n.getShaderInfoLog(e).trim();if(r&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+handleSource(n.getShaderSource(e),o)}else return a}function getTexelEncodingFunction(n,e){const t=getEncodingComponents(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function getToneMappingFunction(n,e){let t;switch(e){case LinearToneMapping:t="Linear";break;case ReinhardToneMapping:t="Reinhard";break;case CineonToneMapping:t="OptimizedCineon";break;case ACESFilmicToneMapping:t="ACESFilmic";break;case AgXToneMapping:t="AgX";break;case NeutralToneMapping:t="Neutral";break;case CustomToneMapping:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function generateVertexExtensions(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(filterEmptyLine).join(`
`)}function generateDefines(n){const e=[];for(const t in n){const r=n[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function fetchAttributeLocations(n,e){const t={},r=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const s=n.getActiveAttrib(e,a),o=s.name;let l=1;s.type===n.FLOAT_MAT2&&(l=2),s.type===n.FLOAT_MAT3&&(l=3),s.type===n.FLOAT_MAT4&&(l=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function filterEmptyLine(n){return n!==""}function replaceLightNums(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function replaceClippingPlaneNums(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const includePattern=/^[ \t]*#include +<([\w\d./]+)>/gm;function resolveIncludes(n){return n.replace(includePattern,includeReplacer)}const shaderChunkMap=new Map;function includeReplacer(n,e){let t=ShaderChunk[e];if(t===void 0){const r=shaderChunkMap.get(e);if(r!==void 0)t=ShaderChunk[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return resolveIncludes(t)}const unrollLoopPattern=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function unrollLoops(n){return n.replace(unrollLoopPattern,loopReplacer)}function loopReplacer(n,e,t,r){let a="";for(let s=parseInt(e);s<parseInt(t);s++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function generatePrecision(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function generateShadowMapTypeDefine(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===PCFShadowMap?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===PCFSoftShadowMap?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===VSMShadowMap&&(e="SHADOWMAP_TYPE_VSM"),e}function generateEnvMapTypeDefine(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case CubeReflectionMapping:case CubeRefractionMapping:e="ENVMAP_TYPE_CUBE";break;case CubeUVReflectionMapping:e="ENVMAP_TYPE_CUBE_UV";break}return e}function generateEnvMapModeDefine(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case CubeRefractionMapping:e="ENVMAP_MODE_REFRACTION";break}return e}function generateEnvMapBlendingDefine(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case MultiplyOperation:e="ENVMAP_BLENDING_MULTIPLY";break;case MixOperation:e="ENVMAP_BLENDING_MIX";break;case AddOperation:e="ENVMAP_BLENDING_ADD";break}return e}function generateCubeUVSize(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function WebGLProgram(n,e,t,r){const a=n.getContext(),s=t.defines;let o=t.vertexShader,l=t.fragmentShader;const d=generateShadowMapTypeDefine(t),c=generateEnvMapTypeDefine(t),f=generateEnvMapModeDefine(t),_=generateEnvMapBlendingDefine(t),m=generateCubeUVSize(t),g=generateVertexExtensions(t),y=generateDefines(s),x=a.createProgram();let u,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(filterEmptyLine).join(`
`),u.length>0&&(u+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(filterEmptyLine).join(`
`),p.length>0&&(p+=`
`)):(u=[generatePrecision(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(filterEmptyLine).join(`
`),p=[generatePrecision(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",t.envMap?"#define "+_:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==NoToneMapping?"#define TONE_MAPPING":"",t.toneMapping!==NoToneMapping?ShaderChunk.tonemapping_pars_fragment:"",t.toneMapping!==NoToneMapping?getToneMappingFunction("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ShaderChunk.colorspace_pars_fragment,getTexelEncodingFunction("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(filterEmptyLine).join(`
`)),o=resolveIncludes(o),o=replaceLightNums(o,t),o=replaceClippingPlaneNums(o,t),l=resolveIncludes(l),l=replaceLightNums(l,t),l=replaceClippingPlaneNums(l,t),o=unrollLoops(o),l=unrollLoops(l),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,u=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,p=["#define varying in",t.glslVersion===GLSL3?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===GLSL3?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+u+o,b=M+p+l,A=WebGLShader(a,a.VERTEX_SHADER,S),T=WebGLShader(a,a.FRAGMENT_SHADER,b);a.attachShader(x,A),a.attachShader(x,T),t.index0AttributeName!==void 0?a.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function E(I){if(n.debug.checkShaderErrors){const N=a.getProgramInfoLog(x).trim(),D=a.getShaderInfoLog(A).trim(),V=a.getShaderInfoLog(T).trim();let R=!0,F=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(R=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,x,A,T);else{const $=getShaderErrors(a,A,"vertex"),W=getShaderErrors(a,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+$+`
`+W)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(D===""||V==="")&&(F=!1);F&&(I.diagnostics={runnable:R,programLog:N,vertexShader:{log:D,prefix:u},fragmentShader:{log:V,prefix:p}})}a.deleteShader(A),a.deleteShader(T),B=new WebGLUniforms(a,x),P=fetchAttributeLocations(a,x)}let B;this.getUniforms=function(){return B===void 0&&E(this),B};let P;this.getAttributes=function(){return P===void 0&&E(this),P};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(x,COMPLETION_STATUS_KHR)),C},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=programIdCount++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=T,this}let _id$1=0;class WebGLShaderCache{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),s=this._getShaderStage(r),o=this._getShaderCacheForMaterial(e);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new WebGLShaderStage(e),t.set(e,r)),r}}class WebGLShaderStage{constructor(e){this.id=_id$1++,this.code=e,this.usedTimes=0}}function WebGLPrograms(n,e,t,r,a,s,o){const l=new Layers,d=new WebGLShaderCache,c=new Set,f=[],_=a.logarithmicDepthBuffer,m=a.vertexTextures;let g=a.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(P){return c.add(P),P===0?"uv":`uv${P}`}function u(P,C,I,N,D){const V=N.fog,R=D.geometry,F=P.isMeshStandardMaterial?N.environment:null,$=(P.isMeshStandardMaterial?t:e).get(P.envMap||F),W=$&&$.mapping===CubeUVReflectionMapping?$.image.height:null,J=y[P.type];P.precision!==null&&(g=a.getMaxPrecision(P.precision),g!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",g,"instead."));const j=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,ie=j!==void 0?j.length:0;let ae=0;R.morphAttributes.position!==void 0&&(ae=1),R.morphAttributes.normal!==void 0&&(ae=2),R.morphAttributes.color!==void 0&&(ae=3);let he,z,X,re;if(J){const Ye=ShaderLib[J];he=Ye.vertexShader,z=Ye.fragmentShader}else he=P.vertexShader,z=P.fragmentShader,d.update(P),X=d.getVertexShaderID(P),re=d.getFragmentShaderID(P);const Y=n.getRenderTarget(),de=D.isInstancedMesh===!0,fe=D.isBatchedMesh===!0,Te=!!P.map,O=!!P.matcap,Ae=!!$,Fe=!!P.aoMap,Pe=!!P.lightMap,ve=!!P.bumpMap,Le=!!P.normalMap,Ie=!!P.displacementMap,Re=!!P.emissiveMap,Oe=!!P.metalnessMap,U=!!P.roughnessMap,L=P.anisotropy>0,te=P.clearcoat>0,ce=P.dispersion>0,Z=P.iridescence>0,ue=P.sheen>0,le=P.transmission>0,_e=L&&!!P.anisotropyMap,xe=te&&!!P.clearcoatMap,Ge=te&&!!P.clearcoatNormalMap,pe=te&&!!P.clearcoatRoughnessMap,we=Z&&!!P.iridescenceMap,He=Z&&!!P.iridescenceThicknessMap,Ve=ue&&!!P.sheenColorMap,ye=ue&&!!P.sheenRoughnessMap,ze=!!P.specularMap,$e=!!P.specularColorMap,Qe=!!P.specularIntensityMap,H=le&&!!P.transmissionMap,Me=le&&!!P.thicknessMap,se=!!P.gradientMap,oe=!!P.alphaMap,ge=P.alphaTest>0,Ue=!!P.alphaHash,We=!!P.extensions;let et=NoToneMapping;P.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(et=n.toneMapping);const tt={shaderID:J,shaderType:P.type,shaderName:P.name,vertexShader:he,fragmentShader:z,defines:P.defines,customVertexShaderID:X,customFragmentShaderID:re,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:g,batching:fe,batchingColor:fe&&D._colorsTexture!==null,instancing:de,instancingColor:de&&D.instanceColor!==null,instancingMorph:de&&D.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:LinearSRGBColorSpace,alphaToCoverage:!!P.alphaToCoverage,map:Te,matcap:O,envMap:Ae,envMapMode:Ae&&$.mapping,envMapCubeUVHeight:W,aoMap:Fe,lightMap:Pe,bumpMap:ve,normalMap:Le,displacementMap:m&&Ie,emissiveMap:Re,normalMapObjectSpace:Le&&P.normalMapType===ObjectSpaceNormalMap,normalMapTangentSpace:Le&&P.normalMapType===TangentSpaceNormalMap,metalnessMap:Oe,roughnessMap:U,anisotropy:L,anisotropyMap:_e,clearcoat:te,clearcoatMap:xe,clearcoatNormalMap:Ge,clearcoatRoughnessMap:pe,dispersion:ce,iridescence:Z,iridescenceMap:we,iridescenceThicknessMap:He,sheen:ue,sheenColorMap:Ve,sheenRoughnessMap:ye,specularMap:ze,specularColorMap:$e,specularIntensityMap:Qe,transmission:le,transmissionMap:H,thicknessMap:Me,gradientMap:se,opaque:P.transparent===!1&&P.blending===NormalBlending&&P.alphaToCoverage===!1,alphaMap:oe,alphaTest:ge,alphaHash:Ue,combine:P.combine,mapUv:Te&&x(P.map.channel),aoMapUv:Fe&&x(P.aoMap.channel),lightMapUv:Pe&&x(P.lightMap.channel),bumpMapUv:ve&&x(P.bumpMap.channel),normalMapUv:Le&&x(P.normalMap.channel),displacementMapUv:Ie&&x(P.displacementMap.channel),emissiveMapUv:Re&&x(P.emissiveMap.channel),metalnessMapUv:Oe&&x(P.metalnessMap.channel),roughnessMapUv:U&&x(P.roughnessMap.channel),anisotropyMapUv:_e&&x(P.anisotropyMap.channel),clearcoatMapUv:xe&&x(P.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&x(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&x(P.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&x(P.iridescenceMap.channel),iridescenceThicknessMapUv:He&&x(P.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&x(P.sheenColorMap.channel),sheenRoughnessMapUv:ye&&x(P.sheenRoughnessMap.channel),specularMapUv:ze&&x(P.specularMap.channel),specularColorMapUv:$e&&x(P.specularColorMap.channel),specularIntensityMapUv:Qe&&x(P.specularIntensityMap.channel),transmissionMapUv:H&&x(P.transmissionMap.channel),thicknessMapUv:Me&&x(P.thicknessMap.channel),alphaMapUv:oe&&x(P.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(Le||L),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!R.attributes.uv&&(Te||oe),fog:!!V,useFog:P.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:_,skinning:D.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:ae,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:P.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:et,decodeVideoTexture:Te&&P.map.isVideoTexture===!0&&ColorManagement.getTransfer(P.map.colorSpace)===SRGBTransfer,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===DoubleSide,flipSided:P.side===BackSide,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:We&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:We&&P.extensions.multiDraw===!0&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return tt.vertexUv1s=c.has(1),tt.vertexUv2s=c.has(2),tt.vertexUv3s=c.has(3),c.clear(),tt}function p(P){const C=[];if(P.shaderID?C.push(P.shaderID):(C.push(P.customVertexShaderID),C.push(P.customFragmentShaderID)),P.defines!==void 0)for(const I in P.defines)C.push(I),C.push(P.defines[I]);return P.isRawShaderMaterial===!1&&(M(C,P),S(C,P),C.push(n.outputColorSpace)),C.push(P.customProgramCacheKey),C.join()}function M(P,C){P.push(C.precision),P.push(C.outputColorSpace),P.push(C.envMapMode),P.push(C.envMapCubeUVHeight),P.push(C.mapUv),P.push(C.alphaMapUv),P.push(C.lightMapUv),P.push(C.aoMapUv),P.push(C.bumpMapUv),P.push(C.normalMapUv),P.push(C.displacementMapUv),P.push(C.emissiveMapUv),P.push(C.metalnessMapUv),P.push(C.roughnessMapUv),P.push(C.anisotropyMapUv),P.push(C.clearcoatMapUv),P.push(C.clearcoatNormalMapUv),P.push(C.clearcoatRoughnessMapUv),P.push(C.iridescenceMapUv),P.push(C.iridescenceThicknessMapUv),P.push(C.sheenColorMapUv),P.push(C.sheenRoughnessMapUv),P.push(C.specularMapUv),P.push(C.specularColorMapUv),P.push(C.specularIntensityMapUv),P.push(C.transmissionMapUv),P.push(C.thicknessMapUv),P.push(C.combine),P.push(C.fogExp2),P.push(C.sizeAttenuation),P.push(C.morphTargetsCount),P.push(C.morphAttributeCount),P.push(C.numDirLights),P.push(C.numPointLights),P.push(C.numSpotLights),P.push(C.numSpotLightMaps),P.push(C.numHemiLights),P.push(C.numRectAreaLights),P.push(C.numDirLightShadows),P.push(C.numPointLightShadows),P.push(C.numSpotLightShadows),P.push(C.numSpotLightShadowsWithMaps),P.push(C.numLightProbes),P.push(C.shadowMapType),P.push(C.toneMapping),P.push(C.numClippingPlanes),P.push(C.numClipIntersection),P.push(C.depthPacking)}function S(P,C){l.disableAll(),C.supportsVertexTextures&&l.enable(0),C.instancing&&l.enable(1),C.instancingColor&&l.enable(2),C.instancingMorph&&l.enable(3),C.matcap&&l.enable(4),C.envMap&&l.enable(5),C.normalMapObjectSpace&&l.enable(6),C.normalMapTangentSpace&&l.enable(7),C.clearcoat&&l.enable(8),C.iridescence&&l.enable(9),C.alphaTest&&l.enable(10),C.vertexColors&&l.enable(11),C.vertexAlphas&&l.enable(12),C.vertexUv1s&&l.enable(13),C.vertexUv2s&&l.enable(14),C.vertexUv3s&&l.enable(15),C.vertexTangents&&l.enable(16),C.anisotropy&&l.enable(17),C.alphaHash&&l.enable(18),C.batching&&l.enable(19),C.dispersion&&l.enable(20),C.batchingColor&&l.enable(21),P.push(l.mask),l.disableAll(),C.fog&&l.enable(0),C.useFog&&l.enable(1),C.flatShading&&l.enable(2),C.logarithmicDepthBuffer&&l.enable(3),C.skinning&&l.enable(4),C.morphTargets&&l.enable(5),C.morphNormals&&l.enable(6),C.morphColors&&l.enable(7),C.premultipliedAlpha&&l.enable(8),C.shadowMapEnabled&&l.enable(9),C.doubleSided&&l.enable(10),C.flipSided&&l.enable(11),C.useDepthPacking&&l.enable(12),C.dithering&&l.enable(13),C.transmission&&l.enable(14),C.sheen&&l.enable(15),C.opaque&&l.enable(16),C.pointsUvs&&l.enable(17),C.decodeVideoTexture&&l.enable(18),C.alphaToCoverage&&l.enable(19),P.push(l.mask)}function b(P){const C=y[P.type];let I;if(C){const N=ShaderLib[C];I=UniformsUtils.clone(N.uniforms)}else I=P.uniforms;return I}function A(P,C){let I;for(let N=0,D=f.length;N<D;N++){const V=f[N];if(V.cacheKey===C){I=V,++I.usedTimes;break}}return I===void 0&&(I=new WebGLProgram(n,C,P,s),f.push(I)),I}function T(P){if(--P.usedTimes===0){const C=f.indexOf(P);f[C]=f[f.length-1],f.pop(),P.destroy()}}function E(P){d.remove(P)}function B(){d.dispose()}return{getParameters:u,getProgramCacheKey:p,getUniforms:b,acquireProgram:A,releaseProgram:T,releaseShaderCache:E,programs:f,dispose:B}}function WebGLProperties(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function r(s,o,l){n.get(s)[o]=l}function a(){n=new WeakMap}return{get:e,remove:t,update:r,dispose:a}}function painterSortStable(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function reversePainterSortStable(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function WebGLRenderList(){const n=[];let e=0;const t=[],r=[],a=[];function s(){e=0,t.length=0,r.length=0,a.length=0}function o(_,m,g,y,x,u){let p=n[e];return p===void 0?(p={id:_.id,object:_,geometry:m,material:g,groupOrder:y,renderOrder:_.renderOrder,z:x,group:u},n[e]=p):(p.id=_.id,p.object=_,p.geometry=m,p.material=g,p.groupOrder=y,p.renderOrder=_.renderOrder,p.z=x,p.group=u),e++,p}function l(_,m,g,y,x,u){const p=o(_,m,g,y,x,u);g.transmission>0?r.push(p):g.transparent===!0?a.push(p):t.push(p)}function d(_,m,g,y,x,u){const p=o(_,m,g,y,x,u);g.transmission>0?r.unshift(p):g.transparent===!0?a.unshift(p):t.unshift(p)}function c(_,m){t.length>1&&t.sort(_||painterSortStable),r.length>1&&r.sort(m||reversePainterSortStable),a.length>1&&a.sort(m||reversePainterSortStable)}function f(){for(let _=e,m=n.length;_<m;_++){const g=n[_];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:r,transparent:a,init:s,push:l,unshift:d,finish:f,sort:c}}function WebGLRenderLists(){let n=new WeakMap;function e(r,a){const s=n.get(r);let o;return s===void 0?(o=new WebGLRenderList,n.set(r,[o])):a>=s.length?(o=new WebGLRenderList,s.push(o)):o=s[a],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function UniformsCache(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Vector3,color:new Color$1};break;case"SpotLight":t={position:new Vector3,direction:new Vector3,color:new Color$1,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Vector3,color:new Color$1,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Vector3,skyColor:new Color$1,groundColor:new Color$1};break;case"RectAreaLight":t={color:new Color$1,position:new Vector3,halfWidth:new Vector3,halfHeight:new Vector3};break}return n[e.id]=t,t}}}function ShadowUniformsCache(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vector2,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let nextVersion=0;function shadowCastingAndTexturingLightsFirst(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function WebGLLights(n){const e=new UniformsCache,t=ShadowUniformsCache(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new Vector3);const a=new Vector3,s=new Matrix4,o=new Matrix4;function l(c){let f=0,_=0,m=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let g=0,y=0,x=0,u=0,p=0,M=0,S=0,b=0,A=0,T=0,E=0;c.sort(shadowCastingAndTexturingLightsFirst);for(let P=0,C=c.length;P<C;P++){const I=c[P],N=I.color,D=I.intensity,V=I.distance,R=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=N.r*D,_+=N.g*D,m+=N.b*D;else if(I.isLightProbe){for(let F=0;F<9;F++)r.probe[F].addScaledVector(I.sh.coefficients[F],D);E++}else if(I.isDirectionalLight){const F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const $=I.shadow,W=t.get(I);W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,r.directionalShadow[g]=W,r.directionalShadowMap[g]=R,r.directionalShadowMatrix[g]=I.shadow.matrix,M++}r.directional[g]=F,g++}else if(I.isSpotLight){const F=e.get(I);F.position.setFromMatrixPosition(I.matrixWorld),F.color.copy(N).multiplyScalar(D),F.distance=V,F.coneCos=Math.cos(I.angle),F.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),F.decay=I.decay,r.spot[x]=F;const $=I.shadow;if(I.map&&(r.spotLightMap[A]=I.map,A++,$.updateMatrices(I),I.castShadow&&T++),r.spotLightMatrix[x]=$.matrix,I.castShadow){const W=t.get(I);W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,r.spotShadow[x]=W,r.spotShadowMap[x]=R,b++}x++}else if(I.isRectAreaLight){const F=e.get(I);F.color.copy(N).multiplyScalar(D),F.halfWidth.set(I.width*.5,0,0),F.halfHeight.set(0,I.height*.5,0),r.rectArea[u]=F,u++}else if(I.isPointLight){const F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),F.distance=I.distance,F.decay=I.decay,I.castShadow){const $=I.shadow,W=t.get(I);W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,W.shadowCameraNear=$.camera.near,W.shadowCameraFar=$.camera.far,r.pointShadow[y]=W,r.pointShadowMap[y]=R,r.pointShadowMatrix[y]=I.shadow.matrix,S++}r.point[y]=F,y++}else if(I.isHemisphereLight){const F=e.get(I);F.skyColor.copy(I.color).multiplyScalar(D),F.groundColor.copy(I.groundColor).multiplyScalar(D),r.hemi[p]=F,p++}}u>0&&(n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=UniformsLib.LTC_FLOAT_1,r.rectAreaLTC2=UniformsLib.LTC_FLOAT_2):(r.rectAreaLTC1=UniformsLib.LTC_HALF_1,r.rectAreaLTC2=UniformsLib.LTC_HALF_2)),r.ambient[0]=f,r.ambient[1]=_,r.ambient[2]=m;const B=r.hash;(B.directionalLength!==g||B.pointLength!==y||B.spotLength!==x||B.rectAreaLength!==u||B.hemiLength!==p||B.numDirectionalShadows!==M||B.numPointShadows!==S||B.numSpotShadows!==b||B.numSpotMaps!==A||B.numLightProbes!==E)&&(r.directional.length=g,r.spot.length=x,r.rectArea.length=u,r.point.length=y,r.hemi.length=p,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=b+A-T,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=T,r.numLightProbes=E,B.directionalLength=g,B.pointLength=y,B.spotLength=x,B.rectAreaLength=u,B.hemiLength=p,B.numDirectionalShadows=M,B.numPointShadows=S,B.numSpotShadows=b,B.numSpotMaps=A,B.numLightProbes=E,r.version=nextVersion++)}function d(c,f){let _=0,m=0,g=0,y=0,x=0;const u=f.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const S=c[p];if(S.isDirectionalLight){const b=r.directional[_];b.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(u),_++}else if(S.isSpotLight){const b=r.spot[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),b.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(u),g++}else if(S.isRectAreaLight){const b=r.rectArea[y];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),o.identity(),s.copy(S.matrixWorld),s.premultiply(u),o.extractRotation(s),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),y++}else if(S.isPointLight){const b=r.point[m];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),m++}else if(S.isHemisphereLight){const b=r.hemi[x];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(u),x++}}}return{setup:l,setupView:d,state:r}}function WebGLRenderState(n){const e=new WebGLLights(n),t=[],r=[];function a(f){c.camera=f,t.length=0,r.length=0}function s(f){t.push(f)}function o(f){r.push(f)}function l(){e.setup(t)}function d(f){e.setupView(t,f)}const c={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:l,setupLightsView:d,pushLight:s,pushShadow:o}}function WebGLRenderStates(n){let e=new WeakMap;function t(a,s=0){const o=e.get(a);let l;return o===void 0?(l=new WebGLRenderState(n),e.set(a,[l])):s>=o.length?(l=new WebGLRenderState(n),o.push(l)):l=o[s],l}function r(){e=new WeakMap}return{get:t,dispose:r}}class MeshDepthMaterial extends Material{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=BasicDepthPacking,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class MeshDistanceMaterial extends Material{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vertex=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragment=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function WebGLShadowMap(n,e,t){let r=new Frustum;const a=new Vector2,s=new Vector2,o=new Vector4,l=new MeshDepthMaterial({depthPacking:RGBADepthPacking}),d=new MeshDistanceMaterial,c={},f=t.maxTextureSize,_={[FrontSide]:BackSide,[BackSide]:FrontSide,[DoubleSide]:DoubleSide},m=new ShaderMaterial({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vector2},radius:{value:4}},vertexShader:vertex,fragmentShader:fragment}),g=m.clone();g.defines.HORIZONTAL_PASS=1;const y=new BufferGeometry;y.setAttribute("position",new BufferAttribute(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Mesh(y,m),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PCFShadowMap;let p=this.type;this.render=function(T,E,B){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||T.length===0)return;const P=n.getRenderTarget(),C=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),N=n.state;N.setBlending(NoBlending),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const D=p!==VSMShadowMap&&this.type===VSMShadowMap,V=p===VSMShadowMap&&this.type!==VSMShadowMap;for(let R=0,F=T.length;R<F;R++){const $=T[R],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;a.copy(W.mapSize);const J=W.getFrameExtents();if(a.multiply(J),s.copy(W.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/J.x),a.x=s.x*J.x,W.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/J.y),a.y=s.y*J.y,W.mapSize.y=s.y)),W.map===null||D===!0||V===!0){const ie=this.type!==VSMShadowMap?{minFilter:NearestFilter,magFilter:NearestFilter}:{};W.map!==null&&W.map.dispose(),W.map=new WebGLRenderTarget(a.x,a.y,ie),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const j=W.getViewportCount();for(let ie=0;ie<j;ie++){const ae=W.getViewport(ie);o.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),N.viewport(o),W.updateMatrices($,ie),r=W.getFrustum(),b(E,B,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===VSMShadowMap&&M(W,B),W.needsUpdate=!1}p=this.type,u.needsUpdate=!1,n.setRenderTarget(P,C,I)};function M(T,E){const B=e.update(x);m.defines.VSM_SAMPLES!==T.blurSamples&&(m.defines.VSM_SAMPLES=T.blurSamples,g.defines.VSM_SAMPLES=T.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new WebGLRenderTarget(a.x,a.y)),m.uniforms.shadow_pass.value=T.map.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,B,m,x,null),g.uniforms.shadow_pass.value=T.mapPass.texture,g.uniforms.resolution.value=T.mapSize,g.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,B,g,x,null)}function S(T,E,B,P){let C=null;const I=B.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)C=I;else if(C=B.isPointLight===!0?d:l,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const N=C.uuid,D=E.uuid;let V=c[N];V===void 0&&(V={},c[N]=V);let R=V[D];R===void 0&&(R=C.clone(),V[D]=R,E.addEventListener("dispose",A)),C=R}if(C.visible=E.visible,C.wireframe=E.wireframe,P===VSMShadowMap?C.side=E.shadowSide!==null?E.shadowSide:E.side:C.side=E.shadowSide!==null?E.shadowSide:_[E.side],C.alphaMap=E.alphaMap,C.alphaTest=E.alphaTest,C.map=E.map,C.clipShadows=E.clipShadows,C.clippingPlanes=E.clippingPlanes,C.clipIntersection=E.clipIntersection,C.displacementMap=E.displacementMap,C.displacementScale=E.displacementScale,C.displacementBias=E.displacementBias,C.wireframeLinewidth=E.wireframeLinewidth,C.linewidth=E.linewidth,B.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const N=n.properties.get(C);N.light=B}return C}function b(T,E,B,P,C){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===VSMShadowMap)&&(!T.frustumCulled||r.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld);const D=e.update(T),V=T.material;if(Array.isArray(V)){const R=D.groups;for(let F=0,$=R.length;F<$;F++){const W=R[F],J=V[W.materialIndex];if(J&&J.visible){const j=S(T,J,P,C);T.onBeforeShadow(n,T,E,B,D,j,W),n.renderBufferDirect(B,null,D,j,T,W),T.onAfterShadow(n,T,E,B,D,j,W)}}}else if(V.visible){const R=S(T,V,P,C);T.onBeforeShadow(n,T,E,B,D,R,null),n.renderBufferDirect(B,null,D,R,T,null),T.onAfterShadow(n,T,E,B,D,R,null)}}const N=T.children;for(let D=0,V=N.length;D<V;D++)b(N[D],E,B,P,C)}function A(T){T.target.removeEventListener("dispose",A);for(const B in c){const P=c[B],C=T.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function WebGLState(n){function e(){let H=!1;const Me=new Vector4;let se=null;const oe=new Vector4(0,0,0,0);return{setMask:function(ge){se!==ge&&!H&&(n.colorMask(ge,ge,ge,ge),se=ge)},setLocked:function(ge){H=ge},setClear:function(ge,Ue,We,et,tt){tt===!0&&(ge*=et,Ue*=et,We*=et),Me.set(ge,Ue,We,et),oe.equals(Me)===!1&&(n.clearColor(ge,Ue,We,et),oe.copy(Me))},reset:function(){H=!1,se=null,oe.set(-1,0,0,0)}}}function t(){let H=!1,Me=null,se=null,oe=null;return{setTest:function(ge){ge?re(n.DEPTH_TEST):Y(n.DEPTH_TEST)},setMask:function(ge){Me!==ge&&!H&&(n.depthMask(ge),Me=ge)},setFunc:function(ge){if(se!==ge){switch(ge){case NeverDepth:n.depthFunc(n.NEVER);break;case AlwaysDepth:n.depthFunc(n.ALWAYS);break;case LessDepth:n.depthFunc(n.LESS);break;case LessEqualDepth:n.depthFunc(n.LEQUAL);break;case EqualDepth:n.depthFunc(n.EQUAL);break;case GreaterEqualDepth:n.depthFunc(n.GEQUAL);break;case GreaterDepth:n.depthFunc(n.GREATER);break;case NotEqualDepth:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}se=ge}},setLocked:function(ge){H=ge},setClear:function(ge){oe!==ge&&(n.clearDepth(ge),oe=ge)},reset:function(){H=!1,Me=null,se=null,oe=null}}}function r(){let H=!1,Me=null,se=null,oe=null,ge=null,Ue=null,We=null,et=null,tt=null;return{setTest:function(Ye){H||(Ye?re(n.STENCIL_TEST):Y(n.STENCIL_TEST))},setMask:function(Ye){Me!==Ye&&!H&&(n.stencilMask(Ye),Me=Ye)},setFunc:function(Ye,st,ot){(se!==Ye||oe!==st||ge!==ot)&&(n.stencilFunc(Ye,st,ot),se=Ye,oe=st,ge=ot)},setOp:function(Ye,st,ot){(Ue!==Ye||We!==st||et!==ot)&&(n.stencilOp(Ye,st,ot),Ue=Ye,We=st,et=ot)},setLocked:function(Ye){H=Ye},setClear:function(Ye){tt!==Ye&&(n.clearStencil(Ye),tt=Ye)},reset:function(){H=!1,Me=null,se=null,oe=null,ge=null,Ue=null,We=null,et=null,tt=null}}}const a=new e,s=new t,o=new r,l=new WeakMap,d=new WeakMap;let c={},f={},_=new WeakMap,m=[],g=null,y=!1,x=null,u=null,p=null,M=null,S=null,b=null,A=null,T=new Color$1(0,0,0),E=0,B=!1,P=null,C=null,I=null,N=null,D=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let R=!1,F=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec($)[1]),R=F>=1):$.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),R=F>=2);let W=null,J={};const j=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),ae=new Vector4().fromArray(j),he=new Vector4().fromArray(ie);function z(H,Me,se,oe){const ge=new Uint8Array(4),Ue=n.createTexture();n.bindTexture(H,Ue),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let We=0;We<se;We++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(Me,0,n.RGBA,1,1,oe,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(Me+We,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return Ue}const X={};X[n.TEXTURE_2D]=z(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),re(n.DEPTH_TEST),s.setFunc(LessEqualDepth),ve(!1),Le(CullFaceBack),re(n.CULL_FACE),Fe(NoBlending);function re(H){c[H]!==!0&&(n.enable(H),c[H]=!0)}function Y(H){c[H]!==!1&&(n.disable(H),c[H]=!1)}function de(H,Me){return f[H]!==Me?(n.bindFramebuffer(H,Me),f[H]=Me,H===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Me),H===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Me),!0):!1}function fe(H,Me){let se=m,oe=!1;if(H){se=_.get(Me),se===void 0&&(se=[],_.set(Me,se));const ge=H.textures;if(se.length!==ge.length||se[0]!==n.COLOR_ATTACHMENT0){for(let Ue=0,We=ge.length;Ue<We;Ue++)se[Ue]=n.COLOR_ATTACHMENT0+Ue;se.length=ge.length,oe=!0}}else se[0]!==n.BACK&&(se[0]=n.BACK,oe=!0);oe&&n.drawBuffers(se)}function Te(H){return g!==H?(n.useProgram(H),g=H,!0):!1}const O={[AddEquation]:n.FUNC_ADD,[SubtractEquation]:n.FUNC_SUBTRACT,[ReverseSubtractEquation]:n.FUNC_REVERSE_SUBTRACT};O[MinEquation]=n.MIN,O[MaxEquation]=n.MAX;const Ae={[ZeroFactor]:n.ZERO,[OneFactor]:n.ONE,[SrcColorFactor]:n.SRC_COLOR,[SrcAlphaFactor]:n.SRC_ALPHA,[SrcAlphaSaturateFactor]:n.SRC_ALPHA_SATURATE,[DstColorFactor]:n.DST_COLOR,[DstAlphaFactor]:n.DST_ALPHA,[OneMinusSrcColorFactor]:n.ONE_MINUS_SRC_COLOR,[OneMinusSrcAlphaFactor]:n.ONE_MINUS_SRC_ALPHA,[OneMinusDstColorFactor]:n.ONE_MINUS_DST_COLOR,[OneMinusDstAlphaFactor]:n.ONE_MINUS_DST_ALPHA,[ConstantColorFactor]:n.CONSTANT_COLOR,[OneMinusConstantColorFactor]:n.ONE_MINUS_CONSTANT_COLOR,[ConstantAlphaFactor]:n.CONSTANT_ALPHA,[OneMinusConstantAlphaFactor]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(H,Me,se,oe,ge,Ue,We,et,tt,Ye){if(H===NoBlending){y===!0&&(Y(n.BLEND),y=!1);return}if(y===!1&&(re(n.BLEND),y=!0),H!==CustomBlending){if(H!==x||Ye!==B){if((u!==AddEquation||S!==AddEquation)&&(n.blendEquation(n.FUNC_ADD),u=AddEquation,S=AddEquation),Ye)switch(H){case NormalBlending:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case AdditiveBlending:n.blendFunc(n.ONE,n.ONE);break;case SubtractiveBlending:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case MultiplyBlending:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case NormalBlending:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case AdditiveBlending:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case SubtractiveBlending:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case MultiplyBlending:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}p=null,M=null,b=null,A=null,T.set(0,0,0),E=0,x=H,B=Ye}return}ge=ge||Me,Ue=Ue||se,We=We||oe,(Me!==u||ge!==S)&&(n.blendEquationSeparate(O[Me],O[ge]),u=Me,S=ge),(se!==p||oe!==M||Ue!==b||We!==A)&&(n.blendFuncSeparate(Ae[se],Ae[oe],Ae[Ue],Ae[We]),p=se,M=oe,b=Ue,A=We),(et.equals(T)===!1||tt!==E)&&(n.blendColor(et.r,et.g,et.b,tt),T.copy(et),E=tt),x=H,B=!1}function Pe(H,Me){H.side===DoubleSide?Y(n.CULL_FACE):re(n.CULL_FACE);let se=H.side===BackSide;Me&&(se=!se),ve(se),H.blending===NormalBlending&&H.transparent===!1?Fe(NoBlending):Fe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),s.setFunc(H.depthFunc),s.setTest(H.depthTest),s.setMask(H.depthWrite),a.setMask(H.colorWrite);const oe=H.stencilWrite;o.setTest(oe),oe&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Re(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Y(n.SAMPLE_ALPHA_TO_COVERAGE)}function ve(H){P!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),P=H)}function Le(H){H!==CullFaceNone?(re(n.CULL_FACE),H!==C&&(H===CullFaceBack?n.cullFace(n.BACK):H===CullFaceFront?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Y(n.CULL_FACE),C=H}function Ie(H){H!==I&&(R&&n.lineWidth(H),I=H)}function Re(H,Me,se){H?(re(n.POLYGON_OFFSET_FILL),(N!==Me||D!==se)&&(n.polygonOffset(Me,se),N=Me,D=se)):Y(n.POLYGON_OFFSET_FILL)}function Oe(H){H?re(n.SCISSOR_TEST):Y(n.SCISSOR_TEST)}function U(H){H===void 0&&(H=n.TEXTURE0+V-1),W!==H&&(n.activeTexture(H),W=H)}function L(H,Me,se){se===void 0&&(W===null?se=n.TEXTURE0+V-1:se=W);let oe=J[se];oe===void 0&&(oe={type:void 0,texture:void 0},J[se]=oe),(oe.type!==H||oe.texture!==Me)&&(W!==se&&(n.activeTexture(se),W=se),n.bindTexture(H,Me||X[H]),oe.type=H,oe.texture=Me)}function te(){const H=J[W];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ce(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Z(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ue(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function le(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function xe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ge(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pe(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ve(H){ae.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),ae.copy(H))}function ye(H){he.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),he.copy(H))}function ze(H,Me){let se=d.get(Me);se===void 0&&(se=new WeakMap,d.set(Me,se));let oe=se.get(H);oe===void 0&&(oe=n.getUniformBlockIndex(Me,H.name),se.set(H,oe))}function $e(H,Me){const oe=d.get(Me).get(H);l.get(Me)!==oe&&(n.uniformBlockBinding(Me,oe,H.__bindingPointIndex),l.set(Me,oe))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},W=null,J={},f={},_=new WeakMap,m=[],g=null,y=!1,x=null,u=null,p=null,M=null,S=null,b=null,A=null,T=new Color$1(0,0,0),E=0,B=!1,P=null,C=null,I=null,N=null,D=null,ae.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:re,disable:Y,bindFramebuffer:de,drawBuffers:fe,useProgram:Te,setBlending:Fe,setMaterial:Pe,setFlipSided:ve,setCullFace:Le,setLineWidth:Ie,setPolygonOffset:Re,setScissorTest:Oe,activeTexture:U,bindTexture:L,unbindTexture:te,compressedTexImage2D:ce,compressedTexImage3D:Z,texImage2D:we,texImage3D:He,updateUBOMapping:ze,uniformBlockBinding:$e,texStorage2D:Ge,texStorage3D:pe,texSubImage2D:ue,texSubImage3D:le,compressedTexSubImage2D:_e,compressedTexSubImage3D:xe,scissor:Ve,viewport:ye,reset:Qe}}function WebGLTextures(n,e,t,r,a,s,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vector2,f=new WeakMap;let _;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(U,L){return g?new OffscreenCanvas(U,L):createElementNS("canvas")}function x(U,L,te){let ce=1;const Z=Oe(U);if((Z.width>te||Z.height>te)&&(ce=te/Math.max(Z.width,Z.height)),ce<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const ue=Math.floor(ce*Z.width),le=Math.floor(ce*Z.height);_===void 0&&(_=y(ue,le));const _e=L?y(ue,le):_;return _e.width=ue,_e.height=le,_e.getContext("2d").drawImage(U,0,0,ue,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ue+"x"+le+")."),_e}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),U;return U}function u(U){return U.generateMipmaps&&U.minFilter!==NearestFilter&&U.minFilter!==LinearFilter}function p(U){n.generateMipmap(U)}function M(U,L,te,ce,Z=!1){if(U!==null){if(n[U]!==void 0)return n[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ue=L;if(L===n.RED&&(te===n.FLOAT&&(ue=n.R32F),te===n.HALF_FLOAT&&(ue=n.R16F),te===n.UNSIGNED_BYTE&&(ue=n.R8)),L===n.RED_INTEGER&&(te===n.UNSIGNED_BYTE&&(ue=n.R8UI),te===n.UNSIGNED_SHORT&&(ue=n.R16UI),te===n.UNSIGNED_INT&&(ue=n.R32UI),te===n.BYTE&&(ue=n.R8I),te===n.SHORT&&(ue=n.R16I),te===n.INT&&(ue=n.R32I)),L===n.RG&&(te===n.FLOAT&&(ue=n.RG32F),te===n.HALF_FLOAT&&(ue=n.RG16F),te===n.UNSIGNED_BYTE&&(ue=n.RG8)),L===n.RG_INTEGER&&(te===n.UNSIGNED_BYTE&&(ue=n.RG8UI),te===n.UNSIGNED_SHORT&&(ue=n.RG16UI),te===n.UNSIGNED_INT&&(ue=n.RG32UI),te===n.BYTE&&(ue=n.RG8I),te===n.SHORT&&(ue=n.RG16I),te===n.INT&&(ue=n.RG32I)),L===n.RGB&&te===n.UNSIGNED_INT_5_9_9_9_REV&&(ue=n.RGB9_E5),L===n.RGBA){const le=Z?LinearTransfer:ColorManagement.getTransfer(ce);te===n.FLOAT&&(ue=n.RGBA32F),te===n.HALF_FLOAT&&(ue=n.RGBA16F),te===n.UNSIGNED_BYTE&&(ue=le===SRGBTransfer?n.SRGB8_ALPHA8:n.RGBA8),te===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),te===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function S(U,L){let te;return U?L===null||L===UnsignedIntType||L===UnsignedInt248Type?te=n.DEPTH24_STENCIL8:L===FloatType?te=n.DEPTH32F_STENCIL8:L===UnsignedShortType&&(te=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):L===null||L===UnsignedIntType||L===UnsignedInt248Type?te=n.DEPTH_COMPONENT24:L===FloatType?te=n.DEPTH_COMPONENT32F:L===UnsignedShortType&&(te=n.DEPTH_COMPONENT16),te}function b(U,L){return u(U)===!0||U.isFramebufferTexture&&U.minFilter!==NearestFilter&&U.minFilter!==LinearFilter?Math.log2(Math.max(L.width,L.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?L.mipmaps.length:1}function A(U){const L=U.target;L.removeEventListener("dispose",A),E(L),L.isVideoTexture&&f.delete(L)}function T(U){const L=U.target;L.removeEventListener("dispose",T),P(L)}function E(U){const L=r.get(U);if(L.__webglInit===void 0)return;const te=U.source,ce=m.get(te);if(ce){const Z=ce[L.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&B(U),Object.keys(ce).length===0&&m.delete(te)}r.remove(U)}function B(U){const L=r.get(U);n.deleteTexture(L.__webglTexture);const te=U.source,ce=m.get(te);delete ce[L.__cacheKey],o.memory.textures--}function P(U){const L=r.get(U);if(U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(L.__webglFramebuffer[ce]))for(let Z=0;Z<L.__webglFramebuffer[ce].length;Z++)n.deleteFramebuffer(L.__webglFramebuffer[ce][Z]);else n.deleteFramebuffer(L.__webglFramebuffer[ce]);L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer[ce])}else{if(Array.isArray(L.__webglFramebuffer))for(let ce=0;ce<L.__webglFramebuffer.length;ce++)n.deleteFramebuffer(L.__webglFramebuffer[ce]);else n.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&n.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let ce=0;ce<L.__webglColorRenderbuffer.length;ce++)L.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(L.__webglColorRenderbuffer[ce]);L.__webglDepthRenderbuffer&&n.deleteRenderbuffer(L.__webglDepthRenderbuffer)}const te=U.textures;for(let ce=0,Z=te.length;ce<Z;ce++){const ue=r.get(te[ce]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),o.memory.textures--),r.remove(te[ce])}r.remove(U)}let C=0;function I(){C=0}function N(){const U=C;return U>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+a.maxTextures),C+=1,U}function D(U){const L=[];return L.push(U.wrapS),L.push(U.wrapT),L.push(U.wrapR||0),L.push(U.magFilter),L.push(U.minFilter),L.push(U.anisotropy),L.push(U.internalFormat),L.push(U.format),L.push(U.type),L.push(U.generateMipmaps),L.push(U.premultiplyAlpha),L.push(U.flipY),L.push(U.unpackAlignment),L.push(U.colorSpace),L.join()}function V(U,L){const te=r.get(U);if(U.isVideoTexture&&Ie(U),U.isRenderTargetTexture===!1&&U.version>0&&te.__version!==U.version){const ce=U.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(te,U,L);return}}t.bindTexture(n.TEXTURE_2D,te.__webglTexture,n.TEXTURE0+L)}function R(U,L){const te=r.get(U);if(U.version>0&&te.__version!==U.version){he(te,U,L);return}t.bindTexture(n.TEXTURE_2D_ARRAY,te.__webglTexture,n.TEXTURE0+L)}function F(U,L){const te=r.get(U);if(U.version>0&&te.__version!==U.version){he(te,U,L);return}t.bindTexture(n.TEXTURE_3D,te.__webglTexture,n.TEXTURE0+L)}function $(U,L){const te=r.get(U);if(U.version>0&&te.__version!==U.version){z(te,U,L);return}t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture,n.TEXTURE0+L)}const W={[RepeatWrapping]:n.REPEAT,[ClampToEdgeWrapping]:n.CLAMP_TO_EDGE,[MirroredRepeatWrapping]:n.MIRRORED_REPEAT},J={[NearestFilter]:n.NEAREST,[NearestMipmapNearestFilter]:n.NEAREST_MIPMAP_NEAREST,[NearestMipmapLinearFilter]:n.NEAREST_MIPMAP_LINEAR,[LinearFilter]:n.LINEAR,[LinearMipmapNearestFilter]:n.LINEAR_MIPMAP_NEAREST,[LinearMipmapLinearFilter]:n.LINEAR_MIPMAP_LINEAR},j={[NeverCompare]:n.NEVER,[AlwaysCompare]:n.ALWAYS,[LessCompare]:n.LESS,[LessEqualCompare]:n.LEQUAL,[EqualCompare]:n.EQUAL,[GreaterEqualCompare]:n.GEQUAL,[GreaterCompare]:n.GREATER,[NotEqualCompare]:n.NOTEQUAL};function ie(U,L){if(L.type===FloatType&&e.has("OES_texture_float_linear")===!1&&(L.magFilter===LinearFilter||L.magFilter===LinearMipmapNearestFilter||L.magFilter===NearestMipmapLinearFilter||L.magFilter===LinearMipmapLinearFilter||L.minFilter===LinearFilter||L.minFilter===LinearMipmapNearestFilter||L.minFilter===NearestMipmapLinearFilter||L.minFilter===LinearMipmapLinearFilter)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,W[L.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,W[L.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,W[L.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,J[L.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,J[L.minFilter]),L.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,j[L.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===NearestFilter||L.minFilter!==NearestMipmapLinearFilter&&L.minFilter!==LinearMipmapLinearFilter||L.type===FloatType&&e.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||r.get(L).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");n.texParameterf(U,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,a.getMaxAnisotropy())),r.get(L).__currentAnisotropy=L.anisotropy}}}function ae(U,L){let te=!1;U.__webglInit===void 0&&(U.__webglInit=!0,L.addEventListener("dispose",A));const ce=L.source;let Z=m.get(ce);Z===void 0&&(Z={},m.set(ce,Z));const ue=D(L);if(ue!==U.__cacheKey){Z[ue]===void 0&&(Z[ue]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,te=!0),Z[ue].usedTimes++;const le=Z[U.__cacheKey];le!==void 0&&(Z[U.__cacheKey].usedTimes--,le.usedTimes===0&&B(L)),U.__cacheKey=ue,U.__webglTexture=Z[ue].texture}return te}function he(U,L,te){let ce=n.TEXTURE_2D;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(ce=n.TEXTURE_2D_ARRAY),L.isData3DTexture&&(ce=n.TEXTURE_3D);const Z=ae(U,L),ue=L.source;t.bindTexture(ce,U.__webglTexture,n.TEXTURE0+te);const le=r.get(ue);if(ue.version!==le.__version||Z===!0){t.activeTexture(n.TEXTURE0+te);const _e=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),xe=L.colorSpace===NoColorSpace?null:ColorManagement.getPrimaries(L.colorSpace),Ge=L.colorSpace===NoColorSpace||_e===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,L.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,L.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let pe=x(L.image,!1,a.maxTextureSize);pe=Re(L,pe);const we=s.convert(L.format,L.colorSpace),He=s.convert(L.type);let Ve=M(L.internalFormat,we,He,L.colorSpace,L.isVideoTexture);ie(ce,L);let ye;const ze=L.mipmaps,$e=L.isVideoTexture!==!0,Qe=le.__version===void 0||Z===!0,H=ue.dataReady,Me=b(L,pe);if(L.isDepthTexture)Ve=S(L.format===DepthStencilFormat,L.type),Qe&&($e?t.texStorage2D(n.TEXTURE_2D,1,Ve,pe.width,pe.height):t.texImage2D(n.TEXTURE_2D,0,Ve,pe.width,pe.height,0,we,He,null));else if(L.isDataTexture)if(ze.length>0){$e&&Qe&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,ze[0].width,ze[0].height);for(let se=0,oe=ze.length;se<oe;se++)ye=ze[se],$e?H&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ye.width,ye.height,we,He,ye.data):t.texImage2D(n.TEXTURE_2D,se,Ve,ye.width,ye.height,0,we,He,ye.data);L.generateMipmaps=!1}else $e?(Qe&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,pe.width,pe.height),H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe.width,pe.height,we,He,pe.data)):t.texImage2D(n.TEXTURE_2D,0,Ve,pe.width,pe.height,0,we,He,pe.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){$e&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Ve,ze[0].width,ze[0].height,pe.depth);for(let se=0,oe=ze.length;se<oe;se++)if(ye=ze[se],L.format!==RGBAFormat)if(we!==null)if($e){if(H)if(L.layerUpdates.size>0){for(const ge of L.layerUpdates){const Ue=ye.width*ye.height;t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,ge,ye.width,ye.height,1,we,ye.data.slice(Ue*ge,Ue*(ge+1)),0,0)}L.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,ye.width,ye.height,pe.depth,we,ye.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Ve,ye.width,ye.height,pe.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,ye.width,ye.height,pe.depth,we,He,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Ve,ye.width,ye.height,pe.depth,0,we,He,ye.data)}else{$e&&Qe&&t.texStorage2D(n.TEXTURE_2D,Me,Ve,ze[0].width,ze[0].height);for(let se=0,oe=ze.length;se<oe;se++)ye=ze[se],L.format!==RGBAFormat?we!==null?$e?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,ye.width,ye.height,we,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Ve,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?H&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ye.width,ye.height,we,He,ye.data):t.texImage2D(n.TEXTURE_2D,se,Ve,ye.width,ye.height,0,we,He,ye.data)}else if(L.isDataArrayTexture)if($e){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,Ve,pe.width,pe.height,pe.depth),H)if(L.layerUpdates.size>0){let se;switch(He){case n.UNSIGNED_BYTE:switch(we){case n.ALPHA:se=1;break;case n.LUMINANCE:se=1;break;case n.LUMINANCE_ALPHA:se=2;break;case n.RGB:se=3;break;case n.RGBA:se=4;break;default:throw new Error(`Unknown texel size for format ${we}.`)}break;case n.UNSIGNED_SHORT_4_4_4_4:case n.UNSIGNED_SHORT_5_5_5_1:case n.UNSIGNED_SHORT_5_6_5:se=1;break;default:throw new Error(`Unknown texel size for type ${He}.`)}const oe=pe.width*pe.height*se;for(const ge of L.layerUpdates)t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,pe.width,pe.height,1,we,He,pe.data.slice(oe*ge,oe*(ge+1)));L.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,we,He,pe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ve,pe.width,pe.height,pe.depth,0,we,He,pe.data);else if(L.isData3DTexture)$e?(Qe&&t.texStorage3D(n.TEXTURE_3D,Me,Ve,pe.width,pe.height,pe.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,we,He,pe.data)):t.texImage3D(n.TEXTURE_3D,0,Ve,pe.width,pe.height,pe.depth,0,we,He,pe.data);else if(L.isFramebufferTexture){if(Qe)if($e)t.texStorage2D(n.TEXTURE_2D,Me,Ve,pe.width,pe.height);else{let se=pe.width,oe=pe.height;for(let ge=0;ge<Me;ge++)t.texImage2D(n.TEXTURE_2D,ge,Ve,se,oe,0,we,He,null),se>>=1,oe>>=1}}else if(ze.length>0){if($e&&Qe){const se=Oe(ze[0]);t.texStorage2D(n.TEXTURE_2D,Me,Ve,se.width,se.height)}for(let se=0,oe=ze.length;se<oe;se++)ye=ze[se],$e?H&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,we,He,ye):t.texImage2D(n.TEXTURE_2D,se,Ve,we,He,ye);L.generateMipmaps=!1}else if($e){if(Qe){const se=Oe(pe);t.texStorage2D(n.TEXTURE_2D,Me,Ve,se.width,se.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,He,pe)}else t.texImage2D(n.TEXTURE_2D,0,Ve,we,He,pe);u(L)&&p(ce),le.__version=ue.version,L.onUpdate&&L.onUpdate(L)}U.__version=L.version}function z(U,L,te){if(L.image.length!==6)return;const ce=ae(U,L),Z=L.source;t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+te);const ue=r.get(Z);if(Z.version!==ue.__version||ce===!0){t.activeTexture(n.TEXTURE0+te);const le=ColorManagement.getPrimaries(ColorManagement.workingColorSpace),_e=L.colorSpace===NoColorSpace?null:ColorManagement.getPrimaries(L.colorSpace),xe=L.colorSpace===NoColorSpace||le===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,L.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,L.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ge=L.isCompressedTexture||L.image[0].isCompressedTexture,pe=L.image[0]&&L.image[0].isDataTexture,we=[];for(let oe=0;oe<6;oe++)!Ge&&!pe?we[oe]=x(L.image[oe],!0,a.maxCubemapSize):we[oe]=pe?L.image[oe].image:L.image[oe],we[oe]=Re(L,we[oe]);const He=we[0],Ve=s.convert(L.format,L.colorSpace),ye=s.convert(L.type),ze=M(L.internalFormat,Ve,ye,L.colorSpace),$e=L.isVideoTexture!==!0,Qe=ue.__version===void 0||ce===!0,H=Z.dataReady;let Me=b(L,He);ie(n.TEXTURE_CUBE_MAP,L);let se;if(Ge){$e&&Qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,ze,He.width,He.height);for(let oe=0;oe<6;oe++){se=we[oe].mipmaps;for(let ge=0;ge<se.length;ge++){const Ue=se[ge];L.format!==RGBAFormat?Ve!==null?$e?H&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,0,0,Ue.width,Ue.height,Ve,Ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,ze,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,0,0,Ue.width,Ue.height,Ve,ye,Ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge,ze,Ue.width,Ue.height,0,Ve,ye,Ue.data)}}}else{if(se=L.mipmaps,$e&&Qe){se.length>0&&Me++;const oe=Oe(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,ze,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(pe){$e?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,we[oe].width,we[oe].height,Ve,ye,we[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ze,we[oe].width,we[oe].height,0,Ve,ye,we[oe].data);for(let ge=0;ge<se.length;ge++){const We=se[ge].image[oe].image;$e?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,0,0,We.width,We.height,Ve,ye,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,ze,We.width,We.height,0,Ve,ye,We.data)}}else{$e?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ve,ye,we[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ze,Ve,ye,we[oe]);for(let ge=0;ge<se.length;ge++){const Ue=se[ge];$e?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,0,0,Ve,ye,Ue.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge+1,ze,Ve,ye,Ue.image[oe])}}}u(L)&&p(n.TEXTURE_CUBE_MAP),ue.__version=Z.version,L.onUpdate&&L.onUpdate(L)}U.__version=L.version}function X(U,L,te,ce,Z,ue){const le=s.convert(te.format,te.colorSpace),_e=s.convert(te.type),xe=M(te.internalFormat,le,_e,te.colorSpace);if(!r.get(L).__hasExternalTextures){const pe=Math.max(1,L.width>>ue),we=Math.max(1,L.height>>ue);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,ue,xe,pe,we,L.depth,0,le,_e,null):t.texImage2D(Z,ue,xe,pe,we,0,le,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,U),Le(L)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,Z,r.get(te).__webglTexture,0,ve(L)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ce,Z,r.get(te).__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(U,L,te){if(n.bindRenderbuffer(n.RENDERBUFFER,U),L.depthBuffer){const ce=L.depthTexture,Z=ce&&ce.isDepthTexture?ce.type:null,ue=S(L.stencilBuffer,Z),le=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=ve(L);Le(L)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,ue,L.width,L.height):te?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,ue,L.width,L.height):n.renderbufferStorage(n.RENDERBUFFER,ue,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,le,n.RENDERBUFFER,U)}else{const ce=L.textures;for(let Z=0;Z<ce.length;Z++){const ue=ce[Z],le=s.convert(ue.format,ue.colorSpace),_e=s.convert(ue.type),xe=M(ue.internalFormat,le,_e,ue.colorSpace),Ge=ve(L);te&&Le(L)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,xe,L.width,L.height):Le(L)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ge,xe,L.width,L.height):n.renderbufferStorage(n.RENDERBUFFER,xe,L.width,L.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Y(U,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,U),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(L.depthTexture).__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),V(L.depthTexture,0);const ce=r.get(L.depthTexture).__webglTexture,Z=ve(L);if(L.depthTexture.format===DepthFormat)Le(L)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0);else if(L.depthTexture.format===DepthStencilFormat)Le(L)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function de(U){const L=r.get(U),te=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!L.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");Y(L.__webglFramebuffer,U)}else if(te){L.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)t.bindFramebuffer(n.FRAMEBUFFER,L.__webglFramebuffer[ce]),L.__webglDepthbuffer[ce]=n.createRenderbuffer(),re(L.__webglDepthbuffer[ce],U,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,L.__webglFramebuffer),L.__webglDepthbuffer=n.createRenderbuffer(),re(L.__webglDepthbuffer,U,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function fe(U,L,te){const ce=r.get(U);L!==void 0&&X(ce.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),te!==void 0&&de(U)}function Te(U){const L=U.texture,te=r.get(U),ce=r.get(L);U.addEventListener("dispose",T);const Z=U.textures,ue=U.isWebGLCubeRenderTarget===!0,le=Z.length>1;if(le||(ce.__webglTexture===void 0&&(ce.__webglTexture=n.createTexture()),ce.__version=L.version,o.memory.textures++),ue){te.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(L.mipmaps&&L.mipmaps.length>0){te.__webglFramebuffer[_e]=[];for(let xe=0;xe<L.mipmaps.length;xe++)te.__webglFramebuffer[_e][xe]=n.createFramebuffer()}else te.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){te.__webglFramebuffer=[];for(let _e=0;_e<L.mipmaps.length;_e++)te.__webglFramebuffer[_e]=n.createFramebuffer()}else te.__webglFramebuffer=n.createFramebuffer();if(le)for(let _e=0,xe=Z.length;_e<xe;_e++){const Ge=r.get(Z[_e]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=n.createTexture(),o.memory.textures++)}if(U.samples>0&&Le(U)===!1){te.__webglMultisampledFramebuffer=n.createFramebuffer(),te.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let _e=0;_e<Z.length;_e++){const xe=Z[_e];te.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,te.__webglColorRenderbuffer[_e]);const Ge=s.convert(xe.format,xe.colorSpace),pe=s.convert(xe.type),we=M(xe.internalFormat,Ge,pe,xe.colorSpace,U.isXRRenderTarget===!0),He=ve(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,we,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,te.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(te.__webglDepthRenderbuffer=n.createRenderbuffer(),re(te.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,ce.__webglTexture),ie(n.TEXTURE_CUBE_MAP,L);for(let _e=0;_e<6;_e++)if(L.mipmaps&&L.mipmaps.length>0)for(let xe=0;xe<L.mipmaps.length;xe++)X(te.__webglFramebuffer[_e][xe],U,L,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,xe);else X(te.__webglFramebuffer[_e],U,L,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);u(L)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let _e=0,xe=Z.length;_e<xe;_e++){const Ge=Z[_e],pe=r.get(Ge);t.bindTexture(n.TEXTURE_2D,pe.__webglTexture),ie(n.TEXTURE_2D,Ge),X(te.__webglFramebuffer,U,Ge,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,0),u(Ge)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(_e=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,ce.__webglTexture),ie(_e,L),L.mipmaps&&L.mipmaps.length>0)for(let xe=0;xe<L.mipmaps.length;xe++)X(te.__webglFramebuffer[xe],U,L,n.COLOR_ATTACHMENT0,_e,xe);else X(te.__webglFramebuffer,U,L,n.COLOR_ATTACHMENT0,_e,0);u(L)&&p(_e),t.unbindTexture()}U.depthBuffer&&de(U)}function O(U){const L=U.textures;for(let te=0,ce=L.length;te<ce;te++){const Z=L[te];if(u(Z)){const ue=U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,le=r.get(Z).__webglTexture;t.bindTexture(ue,le),p(ue),t.unbindTexture()}}}const Ae=[],Fe=[];function Pe(U){if(U.samples>0){if(Le(U)===!1){const L=U.textures,te=U.width,ce=U.height;let Z=n.COLOR_BUFFER_BIT;const ue=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=r.get(U),_e=L.length>1;if(_e)for(let xe=0;xe<L.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let xe=0;xe<L.length;xe++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,le.__webglColorRenderbuffer[xe]);const Ge=r.get(L[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ge,0)}n.blitFramebuffer(0,0,te,ce,0,0,te,ce,Z,n.NEAREST),d===!0&&(Ae.length=0,Fe.length=0,Ae.push(n.COLOR_ATTACHMENT0+xe),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Ae.push(ue),Fe.push(ue),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ae))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let xe=0;xe<L.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,le.__webglColorRenderbuffer[xe]);const Ge=r.get(L[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,Ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&d){const L=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[L])}}}function ve(U){return Math.min(a.maxSamples,U.samples)}function Le(U){const L=r.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function Ie(U){const L=o.render.frame;f.get(U)!==L&&(f.set(U,L),U.update())}function Re(U,L){const te=U.colorSpace,ce=U.format,Z=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||te!==LinearSRGBColorSpace&&te!==NoColorSpace&&(ColorManagement.getTransfer(te)===SRGBTransfer?(ce!==RGBAFormat||Z!==UnsignedByteType)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),L}function Oe(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=I,this.setTexture2D=V,this.setTexture2DArray=R,this.setTexture3D=F,this.setTextureCube=$,this.rebindTextures=fe,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=X,this.useMultisampledRTT=Le}function WebGLUtils(n,e){function t(r,a=NoColorSpace){let s;const o=ColorManagement.getTransfer(a);if(r===UnsignedByteType)return n.UNSIGNED_BYTE;if(r===UnsignedShort4444Type)return n.UNSIGNED_SHORT_4_4_4_4;if(r===UnsignedShort5551Type)return n.UNSIGNED_SHORT_5_5_5_1;if(r===UnsignedInt5999Type)return n.UNSIGNED_INT_5_9_9_9_REV;if(r===ByteType)return n.BYTE;if(r===ShortType)return n.SHORT;if(r===UnsignedShortType)return n.UNSIGNED_SHORT;if(r===IntType)return n.INT;if(r===UnsignedIntType)return n.UNSIGNED_INT;if(r===FloatType)return n.FLOAT;if(r===HalfFloatType)return n.HALF_FLOAT;if(r===AlphaFormat)return n.ALPHA;if(r===RGBFormat)return n.RGB;if(r===RGBAFormat)return n.RGBA;if(r===LuminanceFormat)return n.LUMINANCE;if(r===LuminanceAlphaFormat)return n.LUMINANCE_ALPHA;if(r===DepthFormat)return n.DEPTH_COMPONENT;if(r===DepthStencilFormat)return n.DEPTH_STENCIL;if(r===RedFormat)return n.RED;if(r===RedIntegerFormat)return n.RED_INTEGER;if(r===RGFormat)return n.RG;if(r===RGIntegerFormat)return n.RG_INTEGER;if(r===RGBAIntegerFormat)return n.RGBA_INTEGER;if(r===RGB_S3TC_DXT1_Format||r===RGBA_S3TC_DXT1_Format||r===RGBA_S3TC_DXT3_Format||r===RGBA_S3TC_DXT5_Format)if(o===SRGBTransfer)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(r===RGB_S3TC_DXT1_Format)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===RGBA_S3TC_DXT1_Format)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===RGBA_S3TC_DXT3_Format)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===RGBA_S3TC_DXT5_Format)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(r===RGB_S3TC_DXT1_Format)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===RGBA_S3TC_DXT1_Format)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===RGBA_S3TC_DXT3_Format)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===RGBA_S3TC_DXT5_Format)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===RGB_PVRTC_4BPPV1_Format||r===RGB_PVRTC_2BPPV1_Format||r===RGBA_PVRTC_4BPPV1_Format||r===RGBA_PVRTC_2BPPV1_Format)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(r===RGB_PVRTC_4BPPV1_Format)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===RGB_PVRTC_2BPPV1_Format)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===RGBA_PVRTC_4BPPV1_Format)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===RGBA_PVRTC_2BPPV1_Format)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===RGB_ETC1_Format||r===RGB_ETC2_Format||r===RGBA_ETC2_EAC_Format)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(r===RGB_ETC1_Format||r===RGB_ETC2_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(r===RGBA_ETC2_EAC_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===RGBA_ASTC_4x4_Format||r===RGBA_ASTC_5x4_Format||r===RGBA_ASTC_5x5_Format||r===RGBA_ASTC_6x5_Format||r===RGBA_ASTC_6x6_Format||r===RGBA_ASTC_8x5_Format||r===RGBA_ASTC_8x6_Format||r===RGBA_ASTC_8x8_Format||r===RGBA_ASTC_10x5_Format||r===RGBA_ASTC_10x6_Format||r===RGBA_ASTC_10x8_Format||r===RGBA_ASTC_10x10_Format||r===RGBA_ASTC_12x10_Format||r===RGBA_ASTC_12x12_Format)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(r===RGBA_ASTC_4x4_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===RGBA_ASTC_5x4_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===RGBA_ASTC_5x5_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===RGBA_ASTC_6x5_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===RGBA_ASTC_6x6_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===RGBA_ASTC_8x5_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===RGBA_ASTC_8x6_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===RGBA_ASTC_8x8_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===RGBA_ASTC_10x5_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===RGBA_ASTC_10x6_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===RGBA_ASTC_10x8_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===RGBA_ASTC_10x10_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===RGBA_ASTC_12x10_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===RGBA_ASTC_12x12_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===RGBA_BPTC_Format||r===RGB_BPTC_SIGNED_Format||r===RGB_BPTC_UNSIGNED_Format)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(r===RGBA_BPTC_Format)return o===SRGBTransfer?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===RGB_BPTC_SIGNED_Format)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===RGB_BPTC_UNSIGNED_Format)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===RED_RGTC1_Format||r===SIGNED_RED_RGTC1_Format||r===RED_GREEN_RGTC2_Format||r===SIGNED_RED_GREEN_RGTC2_Format)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(r===RGBA_BPTC_Format)return s.COMPRESSED_RED_RGTC1_EXT;if(r===SIGNED_RED_RGTC1_Format)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===RED_GREEN_RGTC2_Format)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===SIGNED_RED_GREEN_RGTC2_Format)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===UnsignedInt248Type?n.UNSIGNED_INT_24_8:n[r]!==void 0?n[r]:null}return{convert:t}}class ArrayCamera extends PerspectiveCamera{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Group extends Object3D{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _moveEvent={type:"move"};class WebXRController{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Group,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Group,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Vector3,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Vector3),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Group,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Vector3,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Vector3),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,s=null,o=null;const l=this._targetRay,d=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const u=t.getJointPose(x,r),p=this._getHandJoint(c,x);u!==null&&(p.matrix.fromArray(u.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=u.radius),p.visible=u!==null}const f=c.joints["index-finger-tip"],_=c.joints["thumb-tip"],m=f.position.distanceTo(_.position),g=.02,y=.005;c.inputState.pinching&&m>g+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&m<=g-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,r),s!==null&&(d.matrix.fromArray(s.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,s.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(s.linearVelocity)):d.hasLinearVelocity=!1,s.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(s.angularVelocity)):d.hasAngularVelocity=!1));l!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&s!==null&&(a=s),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(_moveEvent)))}return l!==null&&(l.visible=a!==null),d!==null&&(d.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Group;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const _occlusion_vertex=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_occlusion_fragment=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class WebXRDepthSensing{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const a=new Texture,s=e.properties.get(a);s.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new ShaderMaterial({vertexShader:_occlusion_vertex,fragmentShader:_occlusion_fragment,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mesh(new PlaneGeometry(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class WebXRManager extends EventDispatcher{constructor(e,t){super();const r=this;let a=null,s=1,o=null,l="local-floor",d=1,c=null,f=null,_=null,m=null,g=null,y=null;const x=new WebXRDepthSensing,u=t.getContextAttributes();let p=null,M=null;const S=[],b=[],A=new Vector2;let T=null;const E=new PerspectiveCamera;E.layers.enable(1),E.viewport=new Vector4;const B=new PerspectiveCamera;B.layers.enable(2),B.viewport=new Vector4;const P=[E,B],C=new ArrayCamera;C.layers.enable(1),C.layers.enable(2);let I=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let X=S[z];return X===void 0&&(X=new WebXRController,S[z]=X),X.getTargetRaySpace()},this.getControllerGrip=function(z){let X=S[z];return X===void 0&&(X=new WebXRController,S[z]=X),X.getGripSpace()},this.getHand=function(z){let X=S[z];return X===void 0&&(X=new WebXRController,S[z]=X),X.getHandSpace()};function D(z){const X=b.indexOf(z.inputSource);if(X===-1)return;const re=S[X];re!==void 0&&(re.update(z.inputSource,z.frame,c||o),re.dispatchEvent({type:z.type,data:z.inputSource}))}function V(){a.removeEventListener("select",D),a.removeEventListener("selectstart",D),a.removeEventListener("selectend",D),a.removeEventListener("squeeze",D),a.removeEventListener("squeezestart",D),a.removeEventListener("squeezeend",D),a.removeEventListener("end",V),a.removeEventListener("inputsourceschange",R);for(let z=0;z<S.length;z++){const X=b[z];X!==null&&(b[z]=null,S[z].disconnect(X))}I=null,N=null,x.reset(),e.setRenderTarget(p),g=null,m=null,_=null,a=null,M=null,he.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(A.width,A.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){l=z,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return m!==null?m:g},this.getBinding=function(){return _},this.getFrame=function(){return y},this.getSession=function(){return a},this.setSession=async function(z){if(a=z,a!==null){if(p=e.getRenderTarget(),a.addEventListener("select",D),a.addEventListener("selectstart",D),a.addEventListener("selectend",D),a.addEventListener("squeeze",D),a.addEventListener("squeezestart",D),a.addEventListener("squeezeend",D),a.addEventListener("end",V),a.addEventListener("inputsourceschange",R),u.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(A),a.renderState.layers===void 0){const X={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(a,t,X),a.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),M=new WebGLRenderTarget(g.framebufferWidth,g.framebufferHeight,{format:RGBAFormat,type:UnsignedByteType,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil})}else{let X=null,re=null,Y=null;u.depth&&(Y=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=u.stencil?DepthStencilFormat:DepthFormat,re=u.stencil?UnsignedInt248Type:UnsignedIntType);const de={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:s};_=new XRWebGLBinding(a,t),m=_.createProjectionLayer(de),a.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),M=new WebGLRenderTarget(m.textureWidth,m.textureHeight,{format:RGBAFormat,type:UnsignedByteType,depthTexture:new DepthTexture(m.textureWidth,m.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(d),c=null,o=await a.requestReferenceSpace(l),he.setContext(a),he.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function R(z){for(let X=0;X<z.removed.length;X++){const re=z.removed[X],Y=b.indexOf(re);Y>=0&&(b[Y]=null,S[Y].disconnect(re))}for(let X=0;X<z.added.length;X++){const re=z.added[X];let Y=b.indexOf(re);if(Y===-1){for(let fe=0;fe<S.length;fe++)if(fe>=b.length){b.push(re),Y=fe;break}else if(b[fe]===null){b[fe]=re,Y=fe;break}if(Y===-1)break}const de=S[Y];de&&de.connect(re)}}const F=new Vector3,$=new Vector3;function W(z,X,re){F.setFromMatrixPosition(X.matrixWorld),$.setFromMatrixPosition(re.matrixWorld);const Y=F.distanceTo($),de=X.projectionMatrix.elements,fe=re.projectionMatrix.elements,Te=de[14]/(de[10]-1),O=de[14]/(de[10]+1),Ae=(de[9]+1)/de[5],Fe=(de[9]-1)/de[5],Pe=(de[8]-1)/de[0],ve=(fe[8]+1)/fe[0],Le=Te*Pe,Ie=Te*ve,Re=Y/(-Pe+ve),Oe=Re*-Pe;X.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Oe),z.translateZ(Re),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const U=Te+Re,L=O+Re,te=Le-Oe,ce=Ie+(Y-Oe),Z=Ae*O/L*U,ue=Fe*O/L*U;z.projectionMatrix.makePerspective(te,ce,Z,ue,U,L),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function J(z,X){X===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(X.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(a===null)return;x.texture!==null&&(z.near=x.depthNear,z.far=x.depthFar),C.near=B.near=E.near=z.near,C.far=B.far=E.far=z.far,(I!==C.near||N!==C.far)&&(a.updateRenderState({depthNear:C.near,depthFar:C.far}),I=C.near,N=C.far,E.near=I,E.far=N,B.near=I,B.far=N,E.updateProjectionMatrix(),B.updateProjectionMatrix(),z.updateProjectionMatrix());const X=z.parent,re=C.cameras;J(C,X);for(let Y=0;Y<re.length;Y++)J(re[Y],X);re.length===2?W(C,E,B):C.projectionMatrix.copy(E.projectionMatrix),j(z,C,X)};function j(z,X,re){re===null?z.matrix.copy(X.matrixWorld):(z.matrix.copy(re.matrixWorld),z.matrix.invert(),z.matrix.multiply(X.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(X.projectionMatrix),z.projectionMatrixInverse.copy(X.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=RAD2DEG*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(m===null&&g===null))return d},this.setFoveation=function(z){d=z,m!==null&&(m.fixedFoveation=z),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(C)};let ie=null;function ae(z,X){if(f=X.getViewerPose(c||o),y=X,f!==null){const re=f.views;g!==null&&(e.setRenderTargetFramebuffer(M,g.framebuffer),e.setRenderTarget(M));let Y=!1;re.length!==C.cameras.length&&(C.cameras.length=0,Y=!0);for(let fe=0;fe<re.length;fe++){const Te=re[fe];let O=null;if(g!==null)O=g.getViewport(Te);else{const Fe=_.getViewSubImage(m,Te);O=Fe.viewport,fe===0&&(e.setRenderTargetTextures(M,Fe.colorTexture,m.ignoreDepthValues?void 0:Fe.depthStencilTexture),e.setRenderTarget(M))}let Ae=P[fe];Ae===void 0&&(Ae=new PerspectiveCamera,Ae.layers.enable(fe),Ae.viewport=new Vector4,P[fe]=Ae),Ae.matrix.fromArray(Te.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Te.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(O.x,O.y,O.width,O.height),fe===0&&(C.matrix.copy(Ae.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Y===!0&&C.cameras.push(Ae)}const de=a.enabledFeatures;if(de&&de.includes("depth-sensing")){const fe=_.getDepthInformation(re[0]);fe&&fe.isValid&&fe.texture&&x.init(e,fe,a.renderState)}}for(let re=0;re<S.length;re++){const Y=b[re],de=S[re];Y!==null&&de!==void 0&&de.update(Y,X,c||o)}ie&&ie(z,X),X.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:X}),y=null}const he=new WebGLAnimation;he.setAnimationLoop(ae),this.setAnimationLoop=function(z){ie=z},this.dispose=function(){}}}const _e1=new Euler,_m1=new Matrix4;function WebGLMaterials(n,e){function t(u,p){u.matrixAutoUpdate===!0&&u.updateMatrix(),p.value.copy(u.matrix)}function r(u,p){p.color.getRGB(u.fogColor.value,getUnlitUniformColorSpace(n)),p.isFog?(u.fogNear.value=p.near,u.fogFar.value=p.far):p.isFogExp2&&(u.fogDensity.value=p.density)}function a(u,p,M,S,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(u,p):p.isMeshToonMaterial?(s(u,p),_(u,p)):p.isMeshPhongMaterial?(s(u,p),f(u,p)):p.isMeshStandardMaterial?(s(u,p),m(u,p),p.isMeshPhysicalMaterial&&g(u,p,b)):p.isMeshMatcapMaterial?(s(u,p),y(u,p)):p.isMeshDepthMaterial?s(u,p):p.isMeshDistanceMaterial?(s(u,p),x(u,p)):p.isMeshNormalMaterial?s(u,p):p.isLineBasicMaterial?(o(u,p),p.isLineDashedMaterial&&l(u,p)):p.isPointsMaterial?d(u,p,M,S):p.isSpriteMaterial?c(u,p):p.isShadowMaterial?(u.color.value.copy(p.color),u.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(u,p){u.opacity.value=p.opacity,p.color&&u.diffuse.value.copy(p.color),p.emissive&&u.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(u.map.value=p.map,t(p.map,u.mapTransform)),p.alphaMap&&(u.alphaMap.value=p.alphaMap,t(p.alphaMap,u.alphaMapTransform)),p.bumpMap&&(u.bumpMap.value=p.bumpMap,t(p.bumpMap,u.bumpMapTransform),u.bumpScale.value=p.bumpScale,p.side===BackSide&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,t(p.normalMap,u.normalMapTransform),u.normalScale.value.copy(p.normalScale),p.side===BackSide&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,t(p.displacementMap,u.displacementMapTransform),u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias),p.emissiveMap&&(u.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,u.emissiveMapTransform)),p.specularMap&&(u.specularMap.value=p.specularMap,t(p.specularMap,u.specularMapTransform)),p.alphaTest>0&&(u.alphaTest.value=p.alphaTest);const M=e.get(p),S=M.envMap,b=M.envMapRotation;S&&(u.envMap.value=S,_e1.copy(b),_e1.x*=-1,_e1.y*=-1,_e1.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(_e1.y*=-1,_e1.z*=-1),u.envMapRotation.value.setFromMatrix4(_m1.makeRotationFromEuler(_e1)),u.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=p.reflectivity,u.ior.value=p.ior,u.refractionRatio.value=p.refractionRatio),p.lightMap&&(u.lightMap.value=p.lightMap,u.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,u.lightMapTransform)),p.aoMap&&(u.aoMap.value=p.aoMap,u.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,u.aoMapTransform))}function o(u,p){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity,p.map&&(u.map.value=p.map,t(p.map,u.mapTransform))}function l(u,p){u.dashSize.value=p.dashSize,u.totalSize.value=p.dashSize+p.gapSize,u.scale.value=p.scale}function d(u,p,M,S){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity,u.size.value=p.size*M,u.scale.value=S*.5,p.map&&(u.map.value=p.map,t(p.map,u.uvTransform)),p.alphaMap&&(u.alphaMap.value=p.alphaMap,t(p.alphaMap,u.alphaMapTransform)),p.alphaTest>0&&(u.alphaTest.value=p.alphaTest)}function c(u,p){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity,u.rotation.value=p.rotation,p.map&&(u.map.value=p.map,t(p.map,u.mapTransform)),p.alphaMap&&(u.alphaMap.value=p.alphaMap,t(p.alphaMap,u.alphaMapTransform)),p.alphaTest>0&&(u.alphaTest.value=p.alphaTest)}function f(u,p){u.specular.value.copy(p.specular),u.shininess.value=Math.max(p.shininess,1e-4)}function _(u,p){p.gradientMap&&(u.gradientMap.value=p.gradientMap)}function m(u,p){u.metalness.value=p.metalness,p.metalnessMap&&(u.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,u.metalnessMapTransform)),u.roughness.value=p.roughness,p.roughnessMap&&(u.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,u.roughnessMapTransform)),p.envMap&&(u.envMapIntensity.value=p.envMapIntensity)}function g(u,p,M){u.ior.value=p.ior,p.sheen>0&&(u.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),u.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(u.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,u.sheenColorMapTransform)),p.sheenRoughnessMap&&(u.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,u.sheenRoughnessMapTransform))),p.clearcoat>0&&(u.clearcoat.value=p.clearcoat,u.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(u.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,u.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(u.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===BackSide&&u.clearcoatNormalScale.value.negate())),p.dispersion>0&&(u.dispersion.value=p.dispersion),p.iridescence>0&&(u.iridescence.value=p.iridescence,u.iridescenceIOR.value=p.iridescenceIOR,u.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(u.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,u.iridescenceMapTransform)),p.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),p.transmission>0&&(u.transmission.value=p.transmission,u.transmissionSamplerMap.value=M.texture,u.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(u.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,u.transmissionMapTransform)),u.thickness.value=p.thickness,p.thicknessMap&&(u.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=p.attenuationDistance,u.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(u.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(u.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=p.specularIntensity,u.specularColor.value.copy(p.specularColor),p.specularColorMap&&(u.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,u.specularColorMapTransform)),p.specularIntensityMap&&(u.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,u.specularIntensityMapTransform))}function y(u,p){p.matcap&&(u.matcap.value=p.matcap)}function x(u,p){const M=e.get(p).light;u.referencePosition.value.setFromMatrixPosition(M.matrixWorld),u.nearDistance.value=M.shadow.camera.near,u.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function WebGLUniformsGroups(n,e,t,r){let a={},s={},o=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function d(M,S){const b=S.program;r.uniformBlockBinding(M,b)}function c(M,S){let b=a[M.id];b===void 0&&(y(M),b=f(M),a[M.id]=b,M.addEventListener("dispose",u));const A=S.program;r.updateUBOMapping(M,A);const T=e.render.frame;s[M.id]!==T&&(m(M),s[M.id]=T)}function f(M){const S=_();M.__bindingPointIndex=S;const b=n.createBuffer(),A=M.__size,T=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,b),b}function _(){for(let M=0;M<l;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(M){const S=a[M.id],b=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let T=0,E=b.length;T<E;T++){const B=Array.isArray(b[T])?b[T]:[b[T]];for(let P=0,C=B.length;P<C;P++){const I=B[P];if(g(I,T,P,A)===!0){const N=I.__offset,D=Array.isArray(I.value)?I.value:[I.value];let V=0;for(let R=0;R<D.length;R++){const F=D[R],$=x(F);typeof F=="number"||typeof F=="boolean"?(I.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,N+V,I.__data)):F.isMatrix3?(I.__data[0]=F.elements[0],I.__data[1]=F.elements[1],I.__data[2]=F.elements[2],I.__data[3]=0,I.__data[4]=F.elements[3],I.__data[5]=F.elements[4],I.__data[6]=F.elements[5],I.__data[7]=0,I.__data[8]=F.elements[6],I.__data[9]=F.elements[7],I.__data[10]=F.elements[8],I.__data[11]=0):(F.toArray(I.__data,V),V+=$.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(M,S,b,A){const T=M.value,E=S+"_"+b;if(A[E]===void 0)return typeof T=="number"||typeof T=="boolean"?A[E]=T:A[E]=T.clone(),!0;{const B=A[E];if(typeof T=="number"||typeof T=="boolean"){if(B!==T)return A[E]=T,!0}else if(B.equals(T)===!1)return B.copy(T),!0}return!1}function y(M){const S=M.uniforms;let b=0;const A=16;for(let E=0,B=S.length;E<B;E++){const P=Array.isArray(S[E])?S[E]:[S[E]];for(let C=0,I=P.length;C<I;C++){const N=P[C],D=Array.isArray(N.value)?N.value:[N.value];for(let V=0,R=D.length;V<R;V++){const F=D[V],$=x(F),W=b%A;W!==0&&A-W<$.boundary&&(b+=A-W),N.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=$.storage}}}const T=b%A;return T>0&&(b+=A-T),M.__size=b,M.__cache={},this}function x(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function u(M){const S=M.target;S.removeEventListener("dispose",u);const b=o.indexOf(S.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(a[S.id]),delete a[S.id],delete s[S.id]}function p(){for(const M in a)n.deleteBuffer(a[M]);o=[],a={},s={}}return{bind:d,update:c,dispose:p}}class WebGLRenderer{constructor(e={}){const{canvas:t=createCanvasElement(),context:r=null,depth:a=!0,stencil:s=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:_=!1}=e;this.isWebGLRenderer=!0;let m;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=r.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),y=new Int32Array(4);let x=null,u=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=SRGBColorSpace,this.toneMapping=NoToneMapping,this.toneMappingExposure=1;const S=this;let b=!1,A=0,T=0,E=null,B=-1,P=null;const C=new Vector4,I=new Vector4;let N=null;const D=new Color$1(0);let V=0,R=t.width,F=t.height,$=1,W=null,J=null;const j=new Vector4(0,0,R,F),ie=new Vector4(0,0,R,F);let ae=!1;const he=new Frustum;let z=!1,X=!1;const re=new Matrix4,Y=new Vector3,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Te(){return E===null?$:1}let O=r;function Ae(k,q){return t.getContext(k,q)}try{const k={alpha:!0,depth:a,stencil:s,antialias:l,premultipliedAlpha:d,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${REVISION}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",se,!1),t.addEventListener("webglcontextcreationerror",oe,!1),O===null){const q="webgl2";if(O=Ae(q,k),O===null)throw Ae(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(k){throw console.error("THREE.WebGLRenderer: "+k.message),k}let Fe,Pe,ve,Le,Ie,Re,Oe,U,L,te,ce,Z,ue,le,_e,xe,Ge,pe,we,He,Ve,ye,ze,$e;function Qe(){Fe=new WebGLExtensions(O),Fe.init(),ye=new WebGLUtils(O,Fe),Pe=new WebGLCapabilities(O,Fe,e,ye),ve=new WebGLState(O),Le=new WebGLInfo(O),Ie=new WebGLProperties,Re=new WebGLTextures(O,Fe,ve,Ie,Pe,ye,Le),Oe=new WebGLCubeMaps(S),U=new WebGLCubeUVMaps(S),L=new WebGLAttributes(O),ze=new WebGLBindingStates(O,L),te=new WebGLGeometries(O,L,Le,ze),ce=new WebGLObjects(O,te,L,Le),we=new WebGLMorphtargets(O,Pe,Re),xe=new WebGLClipping(Ie),Z=new WebGLPrograms(S,Oe,U,Fe,Pe,ze,xe),ue=new WebGLMaterials(S,Ie),le=new WebGLRenderLists,_e=new WebGLRenderStates(Fe),pe=new WebGLBackground(S,Oe,U,ve,ce,m,d),Ge=new WebGLShadowMap(S,ce,Pe),$e=new WebGLUniformsGroups(O,Le,Pe,ve),He=new WebGLBufferRenderer(O,Fe,Le),Ve=new WebGLIndexedBufferRenderer(O,Fe,Le),Le.programs=Z.programs,S.capabilities=Pe,S.extensions=Fe,S.properties=Ie,S.renderLists=le,S.shadowMap=Ge,S.state=ve,S.info=Le}Qe();const H=new WebXRManager(S,O);this.xr=H,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const k=Fe.get("WEBGL_lose_context");k&&k.loseContext()},this.forceContextRestore=function(){const k=Fe.get("WEBGL_lose_context");k&&k.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(k){k!==void 0&&($=k,this.setSize(R,F,!1))},this.getSize=function(k){return k.set(R,F)},this.setSize=function(k,q,Q=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=k,F=q,t.width=Math.floor(k*$),t.height=Math.floor(q*$),Q===!0&&(t.style.width=k+"px",t.style.height=q+"px"),this.setViewport(0,0,k,q)},this.getDrawingBufferSize=function(k){return k.set(R*$,F*$).floor()},this.setDrawingBufferSize=function(k,q,Q){R=k,F=q,$=Q,t.width=Math.floor(k*Q),t.height=Math.floor(q*Q),this.setViewport(0,0,k,q)},this.getCurrentViewport=function(k){return k.copy(C)},this.getViewport=function(k){return k.copy(j)},this.setViewport=function(k,q,Q,ne){k.isVector4?j.set(k.x,k.y,k.z,k.w):j.set(k,q,Q,ne),ve.viewport(C.copy(j).multiplyScalar($).round())},this.getScissor=function(k){return k.copy(ie)},this.setScissor=function(k,q,Q,ne){k.isVector4?ie.set(k.x,k.y,k.z,k.w):ie.set(k,q,Q,ne),ve.scissor(I.copy(ie).multiplyScalar($).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(k){ve.setScissorTest(ae=k)},this.setOpaqueSort=function(k){W=k},this.setTransparentSort=function(k){J=k},this.getClearColor=function(k){return k.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(k=!0,q=!0,Q=!0){let ne=0;if(k){let K=!1;if(E!==null){const me=E.texture.format;K=me===RGBAIntegerFormat||me===RGIntegerFormat||me===RedIntegerFormat}if(K){const me=E.texture.type,be=me===UnsignedByteType||me===UnsignedIntType||me===UnsignedShortType||me===UnsignedInt248Type||me===UnsignedShort4444Type||me===UnsignedShort5551Type,Ce=pe.getClearColor(),Ee=pe.getClearAlpha(),Ne=Ce.r,Be=Ce.g,ke=Ce.b;be?(g[0]=Ne,g[1]=Be,g[2]=ke,g[3]=Ee,O.clearBufferuiv(O.COLOR,0,g)):(y[0]=Ne,y[1]=Be,y[2]=ke,y[3]=Ee,O.clearBufferiv(O.COLOR,0,y))}else ne|=O.COLOR_BUFFER_BIT}q&&(ne|=O.DEPTH_BUFFER_BIT),Q&&(ne|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",se,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),le.dispose(),_e.dispose(),Ie.dispose(),Oe.dispose(),U.dispose(),ce.dispose(),ze.dispose(),$e.dispose(),Z.dispose(),H.dispose(),H.removeEventListener("sessionstart",st),H.removeEventListener("sessionend",ot),ht.stop()};function Me(k){k.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function se(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const k=Le.autoReset,q=Ge.enabled,Q=Ge.autoUpdate,ne=Ge.needsUpdate,K=Ge.type;Qe(),Le.autoReset=k,Ge.enabled=q,Ge.autoUpdate=Q,Ge.needsUpdate=ne,Ge.type=K}function oe(k){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function ge(k){const q=k.target;q.removeEventListener("dispose",ge),Ue(q)}function Ue(k){We(k),Ie.remove(k)}function We(k){const q=Ie.get(k).programs;q!==void 0&&(q.forEach(function(Q){Z.releaseProgram(Q)}),k.isShaderMaterial&&Z.releaseShaderCache(k))}this.renderBufferDirect=function(k,q,Q,ne,K,me){q===null&&(q=de);const be=K.isMesh&&K.matrixWorld.determinant()<0,Ce=kt(k,q,Q,ne,K);ve.setMaterial(ne,be);let Ee=Q.index,Ne=1;if(ne.wireframe===!0){if(Ee=te.getWireframeAttribute(Q),Ee===void 0)return;Ne=2}const Be=Q.drawRange,ke=Q.attributes.position;let Xe=Be.start*Ne,Ze=(Be.start+Be.count)*Ne;me!==null&&(Xe=Math.max(Xe,me.start*Ne),Ze=Math.min(Ze,(me.start+me.count)*Ne)),Ee!==null?(Xe=Math.max(Xe,0),Ze=Math.min(Ze,Ee.count)):ke!=null&&(Xe=Math.max(Xe,0),Ze=Math.min(Ze,ke.count));const Je=Ze-Xe;if(Je<0||Je===1/0)return;ze.setup(K,ne,Ce,Q,Ee);let rt,qe=He;if(Ee!==null&&(rt=L.get(Ee),qe=Ve,qe.setIndex(rt)),K.isMesh)ne.wireframe===!0?(ve.setLineWidth(ne.wireframeLinewidth*Te()),qe.setMode(O.LINES)):qe.setMode(O.TRIANGLES);else if(K.isLine){let De=ne.linewidth;De===void 0&&(De=1),ve.setLineWidth(De*Te()),K.isLineSegments?qe.setMode(O.LINES):K.isLineLoop?qe.setMode(O.LINE_LOOP):qe.setMode(O.LINE_STRIP)}else K.isPoints?qe.setMode(O.POINTS):K.isSprite&&qe.setMode(O.TRIANGLES);if(K.isBatchedMesh)K._multiDrawInstances!==null?qe.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances):qe.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else if(K.isInstancedMesh)qe.renderInstances(Xe,Je,K.count);else if(Q.isInstancedBufferGeometry){const De=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,it=Math.min(Q.instanceCount,De);qe.renderInstances(Xe,Je,it)}else qe.render(Xe,Je)};function et(k,q,Q){k.transparent===!0&&k.side===DoubleSide&&k.forceSinglePass===!1?(k.side=BackSide,k.needsUpdate=!0,St(k,q,Q),k.side=FrontSide,k.needsUpdate=!0,St(k,q,Q),k.side=DoubleSide):St(k,q,Q)}this.compile=function(k,q,Q=null){Q===null&&(Q=k),u=_e.get(Q),u.init(q),M.push(u),Q.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(u.pushLight(K),K.castShadow&&u.pushShadow(K))}),k!==Q&&k.traverseVisible(function(K){K.isLight&&K.layers.test(q.layers)&&(u.pushLight(K),K.castShadow&&u.pushShadow(K))}),u.setupLights();const ne=new Set;return k.traverse(function(K){const me=K.material;if(me)if(Array.isArray(me))for(let be=0;be<me.length;be++){const Ce=me[be];et(Ce,Q,K),ne.add(Ce)}else et(me,Q,K),ne.add(me)}),M.pop(),u=null,ne},this.compileAsync=function(k,q,Q=null){const ne=this.compile(k,q,Q);return new Promise(K=>{function me(){if(ne.forEach(function(be){Ie.get(be).currentProgram.isReady()&&ne.delete(be)}),ne.size===0){K(k);return}setTimeout(me,10)}Fe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let tt=null;function Ye(k){tt&&tt(k)}function st(){ht.stop()}function ot(){ht.start()}const ht=new WebGLAnimation;ht.setAnimationLoop(Ye),typeof self<"u"&&ht.setContext(self),this.setAnimationLoop=function(k){tt=k,H.setAnimationLoop(k),k===null?ht.stop():ht.start()},H.addEventListener("sessionstart",st),H.addEventListener("sessionend",ot),this.render=function(k,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(q),q=H.getCamera()),k.isScene===!0&&k.onBeforeRender(S,k,q,E),u=_e.get(k,M.length),u.init(q),M.push(u),re.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),he.setFromProjectionMatrix(re),X=this.localClippingEnabled,z=xe.init(this.clippingPlanes,X),x=le.get(k,p.length),x.init(),p.push(x),H.enabled===!0&&H.isPresenting===!0){const me=S.xr.getDepthSensingMesh();me!==null&&Ct(me,q,-1/0,S.sortObjects)}Ct(k,q,0,S.sortObjects),x.finish(),S.sortObjects===!0&&x.sort(W,J),fe=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,fe&&pe.addToRenderList(x,k),this.info.render.frame++,z===!0&&xe.beginShadows();const Q=u.state.shadowsArray;Ge.render(Q,k,q),z===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ne=x.opaque,K=x.transmissive;if(u.setupLights(),q.isArrayCamera){const me=q.cameras;if(K.length>0)for(let be=0,Ce=me.length;be<Ce;be++){const Ee=me[be];Pt(ne,K,k,Ee)}fe&&pe.render(k);for(let be=0,Ce=me.length;be<Ce;be++){const Ee=me[be];At(x,k,Ee,Ee.viewport)}}else K.length>0&&Pt(ne,K,k,q),fe&&pe.render(k),At(x,k,q);E!==null&&(Re.updateMultisampleRenderTarget(E),Re.updateRenderTargetMipmap(E)),k.isScene===!0&&k.onAfterRender(S,k,q),ze.resetDefaultState(),B=-1,P=null,M.pop(),M.length>0?(u=M[M.length-1],z===!0&&xe.setGlobalState(S.clippingPlanes,u.state.camera)):u=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Ct(k,q,Q,ne){if(k.visible===!1)return;if(k.layers.test(q.layers)){if(k.isGroup)Q=k.renderOrder;else if(k.isLOD)k.autoUpdate===!0&&k.update(q);else if(k.isLight)u.pushLight(k),k.castShadow&&u.pushShadow(k);else if(k.isSprite){if(!k.frustumCulled||he.intersectsSprite(k)){ne&&Y.setFromMatrixPosition(k.matrixWorld).applyMatrix4(re);const be=ce.update(k),Ce=k.material;Ce.visible&&x.push(k,be,Ce,Q,Y.z,null)}}else if((k.isMesh||k.isLine||k.isPoints)&&(!k.frustumCulled||he.intersectsObject(k))){const be=ce.update(k),Ce=k.material;if(ne&&(k.boundingSphere!==void 0?(k.boundingSphere===null&&k.computeBoundingSphere(),Y.copy(k.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Y.copy(be.boundingSphere.center)),Y.applyMatrix4(k.matrixWorld).applyMatrix4(re)),Array.isArray(Ce)){const Ee=be.groups;for(let Ne=0,Be=Ee.length;Ne<Be;Ne++){const ke=Ee[Ne],Xe=Ce[ke.materialIndex];Xe&&Xe.visible&&x.push(k,be,Xe,Q,Y.z,ke)}}else Ce.visible&&x.push(k,be,Ce,Q,Y.z,null)}}const me=k.children;for(let be=0,Ce=me.length;be<Ce;be++)Ct(me[be],q,Q,ne)}function At(k,q,Q,ne){const K=k.opaque,me=k.transmissive,be=k.transparent;u.setupLightsView(Q),z===!0&&xe.setGlobalState(S.clippingPlanes,Q),ne&&ve.viewport(C.copy(ne)),K.length>0&&yt(K,q,Q),me.length>0&&yt(me,q,Q),be.length>0&&yt(be,q,Q),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Pt(k,q,Q,ne){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[ne.id]===void 0&&(u.state.transmissionRenderTarget[ne.id]=new WebGLRenderTarget(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?HalfFloatType:UnsignedByteType,minFilter:LinearMipmapLinearFilter,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ColorManagement.workingColorSpace}));const me=u.state.transmissionRenderTarget[ne.id],be=ne.viewport||C;me.setSize(be.z,be.w);const Ce=S.getRenderTarget();S.setRenderTarget(me),S.getClearColor(D),V=S.getClearAlpha(),V<1&&S.setClearColor(16777215,.5),fe?pe.render(Q):S.clear();const Ee=S.toneMapping;S.toneMapping=NoToneMapping;const Ne=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),u.setupLightsView(ne),z===!0&&xe.setGlobalState(S.clippingPlanes,ne),yt(k,Q,ne),Re.updateMultisampleRenderTarget(me),Re.updateRenderTargetMipmap(me),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ke=0,Xe=q.length;ke<Xe;ke++){const Ze=q[ke],Je=Ze.object,rt=Ze.geometry,qe=Ze.material,De=Ze.group;if(qe.side===DoubleSide&&Je.layers.test(ne.layers)){const it=qe.side;qe.side=BackSide,qe.needsUpdate=!0,Rt(Je,Q,ne,rt,qe,De),qe.side=it,qe.needsUpdate=!0,Be=!0}}Be===!0&&(Re.updateMultisampleRenderTarget(me),Re.updateRenderTargetMipmap(me))}S.setRenderTarget(Ce),S.setClearColor(D,V),Ne!==void 0&&(ne.viewport=Ne),S.toneMapping=Ee}function yt(k,q,Q){const ne=q.isScene===!0?q.overrideMaterial:null;for(let K=0,me=k.length;K<me;K++){const be=k[K],Ce=be.object,Ee=be.geometry,Ne=ne===null?be.material:ne,Be=be.group;Ce.layers.test(Q.layers)&&Rt(Ce,q,Q,Ee,Ne,Be)}}function Rt(k,q,Q,ne,K,me){k.onBeforeRender(S,q,Q,ne,K,me),k.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),K.onBeforeRender(S,q,Q,ne,k,me),K.transparent===!0&&K.side===DoubleSide&&K.forceSinglePass===!1?(K.side=BackSide,K.needsUpdate=!0,S.renderBufferDirect(Q,q,ne,K,k,me),K.side=FrontSide,K.needsUpdate=!0,S.renderBufferDirect(Q,q,ne,K,k,me),K.side=DoubleSide):S.renderBufferDirect(Q,q,ne,K,k,me),k.onAfterRender(S,q,Q,ne,K,me)}function St(k,q,Q){q.isScene!==!0&&(q=de);const ne=Ie.get(k),K=u.state.lights,me=u.state.shadowsArray,be=K.state.version,Ce=Z.getParameters(k,K.state,me,q,Q),Ee=Z.getProgramCacheKey(Ce);let Ne=ne.programs;ne.environment=k.isMeshStandardMaterial?q.environment:null,ne.fog=q.fog,ne.envMap=(k.isMeshStandardMaterial?U:Oe).get(k.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&k.envMap===null?q.environmentRotation:k.envMapRotation,Ne===void 0&&(k.addEventListener("dispose",ge),Ne=new Map,ne.programs=Ne);let Be=Ne.get(Ee);if(Be!==void 0){if(ne.currentProgram===Be&&ne.lightsStateVersion===be)return Lt(k,Ce),Be}else Ce.uniforms=Z.getUniforms(k),k.onBuild(Q,Ce,S),k.onBeforeCompile(Ce,S),Be=Z.acquireProgram(Ce,Ee),Ne.set(Ee,Be),ne.uniforms=Ce.uniforms;const ke=ne.uniforms;return(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)&&(ke.clippingPlanes=xe.uniform),Lt(k,Ce),ne.needsLights=Nt(k),ne.lightsStateVersion=be,ne.needsLights&&(ke.ambientLightColor.value=K.state.ambient,ke.lightProbe.value=K.state.probe,ke.directionalLights.value=K.state.directional,ke.directionalLightShadows.value=K.state.directionalShadow,ke.spotLights.value=K.state.spot,ke.spotLightShadows.value=K.state.spotShadow,ke.rectAreaLights.value=K.state.rectArea,ke.ltc_1.value=K.state.rectAreaLTC1,ke.ltc_2.value=K.state.rectAreaLTC2,ke.pointLights.value=K.state.point,ke.pointLightShadows.value=K.state.pointShadow,ke.hemisphereLights.value=K.state.hemi,ke.directionalShadowMap.value=K.state.directionalShadowMap,ke.directionalShadowMatrix.value=K.state.directionalShadowMatrix,ke.spotShadowMap.value=K.state.spotShadowMap,ke.spotLightMatrix.value=K.state.spotLightMatrix,ke.spotLightMap.value=K.state.spotLightMap,ke.pointShadowMap.value=K.state.pointShadowMap,ke.pointShadowMatrix.value=K.state.pointShadowMatrix),ne.currentProgram=Be,ne.uniformsList=null,Be}function Dt(k){if(k.uniformsList===null){const q=k.currentProgram.getUniforms();k.uniformsList=WebGLUniforms.seqWithValue(q.seq,k.uniforms)}return k.uniformsList}function Lt(k,q){const Q=Ie.get(k);Q.outputColorSpace=q.outputColorSpace,Q.batching=q.batching,Q.batchingColor=q.batchingColor,Q.instancing=q.instancing,Q.instancingColor=q.instancingColor,Q.instancingMorph=q.instancingMorph,Q.skinning=q.skinning,Q.morphTargets=q.morphTargets,Q.morphNormals=q.morphNormals,Q.morphColors=q.morphColors,Q.morphTargetsCount=q.morphTargetsCount,Q.numClippingPlanes=q.numClippingPlanes,Q.numIntersection=q.numClipIntersection,Q.vertexAlphas=q.vertexAlphas,Q.vertexTangents=q.vertexTangents,Q.toneMapping=q.toneMapping}function kt(k,q,Q,ne,K){q.isScene!==!0&&(q=de),Re.resetTextureUnits();const me=q.fog,be=ne.isMeshStandardMaterial?q.environment:null,Ce=E===null?S.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:LinearSRGBColorSpace,Ee=(ne.isMeshStandardMaterial?U:Oe).get(ne.envMap||be),Ne=ne.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Be=!!Q.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),ke=!!Q.morphAttributes.position,Xe=!!Q.morphAttributes.normal,Ze=!!Q.morphAttributes.color;let Je=NoToneMapping;ne.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Je=S.toneMapping);const rt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,qe=rt!==void 0?rt.length:0,De=Ie.get(ne),it=u.state.lights;if(z===!0&&(X===!0||k!==P)){const at=k===P&&ne.id===B;xe.setState(ne,k,at)}let je=!1;ne.version===De.__version?(De.needsLights&&De.lightsStateVersion!==it.state.version||De.outputColorSpace!==Ce||K.isBatchedMesh&&De.batching===!1||!K.isBatchedMesh&&De.batching===!0||K.isBatchedMesh&&De.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&De.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&De.instancing===!1||!K.isInstancedMesh&&De.instancing===!0||K.isSkinnedMesh&&De.skinning===!1||!K.isSkinnedMesh&&De.skinning===!0||K.isInstancedMesh&&De.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&De.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&De.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&De.instancingMorph===!1&&K.morphTexture!==null||De.envMap!==Ee||ne.fog===!0&&De.fog!==me||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==xe.numPlanes||De.numIntersection!==xe.numIntersection)||De.vertexAlphas!==Ne||De.vertexTangents!==Be||De.morphTargets!==ke||De.morphNormals!==Xe||De.morphColors!==Ze||De.toneMapping!==Je||De.morphTargetsCount!==qe)&&(je=!0):(je=!0,De.__version=ne.version);let lt=De.currentProgram;je===!0&&(lt=St(ne,q,K));let Mt=!1,ut=!1,Et=!1;const nt=lt.getUniforms(),ct=De.uniforms;if(ve.useProgram(lt.program)&&(Mt=!0,ut=!0,Et=!0),ne.id!==B&&(B=ne.id,ut=!0),Mt||P!==k){nt.setValue(O,"projectionMatrix",k.projectionMatrix),nt.setValue(O,"viewMatrix",k.matrixWorldInverse);const at=nt.map.cameraPosition;at!==void 0&&at.setValue(O,Y.setFromMatrixPosition(k.matrixWorld)),Pe.logarithmicDepthBuffer&&nt.setValue(O,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&nt.setValue(O,"isOrthographic",k.isOrthographicCamera===!0),P!==k&&(P=k,ut=!0,Et=!0)}if(K.isSkinnedMesh){nt.setOptional(O,K,"bindMatrix"),nt.setOptional(O,K,"bindMatrixInverse");const at=K.skeleton;at&&(at.boneTexture===null&&at.computeBoneTexture(),nt.setValue(O,"boneTexture",at.boneTexture,Re))}K.isBatchedMesh&&(nt.setOptional(O,K,"batchingTexture"),nt.setValue(O,"batchingTexture",K._matricesTexture,Re),nt.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&nt.setValue(O,"batchingColorTexture",K._colorsTexture,Re));const Tt=Q.morphAttributes;if((Tt.position!==void 0||Tt.normal!==void 0||Tt.color!==void 0)&&we.update(K,Q,lt),(ut||De.receiveShadow!==K.receiveShadow)&&(De.receiveShadow=K.receiveShadow,nt.setValue(O,"receiveShadow",K.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(ct.envMap.value=Ee,ct.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),ne.isMeshStandardMaterial&&ne.envMap===null&&q.environment!==null&&(ct.envMapIntensity.value=q.environmentIntensity),ut&&(nt.setValue(O,"toneMappingExposure",S.toneMappingExposure),De.needsLights&&Ft(ct,Et),me&&ne.fog===!0&&ue.refreshFogUniforms(ct,me),ue.refreshMaterialUniforms(ct,ne,$,F,u.state.transmissionRenderTarget[k.id]),WebGLUniforms.upload(O,Dt(De),ct,Re)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(WebGLUniforms.upload(O,Dt(De),ct,Re),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&nt.setValue(O,"center",K.center),nt.setValue(O,"modelViewMatrix",K.modelViewMatrix),nt.setValue(O,"normalMatrix",K.normalMatrix),nt.setValue(O,"modelMatrix",K.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const at=ne.uniformsGroups;for(let wt=0,Bt=at.length;wt<Bt;wt++){const It=at[wt];$e.update(It,lt),$e.bind(It,lt)}}return lt}function Ft(k,q){k.ambientLightColor.needsUpdate=q,k.lightProbe.needsUpdate=q,k.directionalLights.needsUpdate=q,k.directionalLightShadows.needsUpdate=q,k.pointLights.needsUpdate=q,k.pointLightShadows.needsUpdate=q,k.spotLights.needsUpdate=q,k.spotLightShadows.needsUpdate=q,k.rectAreaLights.needsUpdate=q,k.hemisphereLights.needsUpdate=q}function Nt(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(k,q,Q){Ie.get(k.texture).__webglTexture=q,Ie.get(k.depthTexture).__webglTexture=Q;const ne=Ie.get(k);ne.__hasExternalTextures=!0,ne.__autoAllocateDepthBuffer=Q===void 0,ne.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(k,q){const Q=Ie.get(k);Q.__webglFramebuffer=q,Q.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(k,q=0,Q=0){E=k,A=q,T=Q;let ne=!0,K=null,me=!1,be=!1;if(k){const Ee=Ie.get(k);Ee.__useDefaultFramebuffer!==void 0?(ve.bindFramebuffer(O.FRAMEBUFFER,null),ne=!1):Ee.__webglFramebuffer===void 0?Re.setupRenderTarget(k):Ee.__hasExternalTextures&&Re.rebindTextures(k,Ie.get(k.texture).__webglTexture,Ie.get(k.depthTexture).__webglTexture);const Ne=k.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(be=!0);const Be=Ie.get(k).__webglFramebuffer;k.isWebGLCubeRenderTarget?(Array.isArray(Be[q])?K=Be[q][Q]:K=Be[q],me=!0):k.samples>0&&Re.useMultisampledRTT(k)===!1?K=Ie.get(k).__webglMultisampledFramebuffer:Array.isArray(Be)?K=Be[Q]:K=Be,C.copy(k.viewport),I.copy(k.scissor),N=k.scissorTest}else C.copy(j).multiplyScalar($).floor(),I.copy(ie).multiplyScalar($).floor(),N=ae;if(ve.bindFramebuffer(O.FRAMEBUFFER,K)&&ne&&ve.drawBuffers(k,K),ve.viewport(C),ve.scissor(I),ve.setScissorTest(N),me){const Ee=Ie.get(k.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ee.__webglTexture,Q)}else if(be){const Ee=Ie.get(k.texture),Ne=q||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ee.__webglTexture,Q||0,Ne)}B=-1},this.readRenderTargetPixels=function(k,q,Q,ne,K,me,be){if(!(k&&k.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ie.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){ve.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const Ee=k.texture,Ne=Ee.format,Be=Ee.type;if(!Pe.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=k.width-ne&&Q>=0&&Q<=k.height-K&&O.readPixels(q,Q,ne,K,ye.convert(Ne),ye.convert(Be),me)}finally{const Ee=E!==null?Ie.get(E).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(k,q,Q,ne,K,me,be){if(!(k&&k.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ie.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){ve.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const Ee=k.texture,Ne=Ee.format,Be=Ee.type;if(!Pe.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=k.width-ne&&Q>=0&&Q<=k.height-K){const ke=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ke),O.bufferData(O.PIXEL_PACK_BUFFER,me.byteLength,O.STREAM_READ),O.readPixels(q,Q,ne,K,ye.convert(Ne),ye.convert(Be),0),O.flush();const Xe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);await probeAsync(O,Xe,4);try{O.bindBuffer(O.PIXEL_PACK_BUFFER,ke),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,me)}finally{O.deleteBuffer(ke),O.deleteSync(Xe)}return me}}finally{const Ee=E!==null?Ie.get(E).__webglFramebuffer:null;ve.bindFramebuffer(O.FRAMEBUFFER,Ee)}}},this.copyFramebufferToTexture=function(k,q=null,Q=0){k.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,k=arguments[1]);const ne=Math.pow(2,-Q),K=Math.floor(k.image.width*ne),me=Math.floor(k.image.height*ne),be=q!==null?q.x:0,Ce=q!==null?q.y:0;Re.setTexture2D(k,0),O.copyTexSubImage2D(O.TEXTURE_2D,Q,0,0,be,Ce,K,me),ve.unbindTexture()},this.copyTextureToTexture=function(k,q,Q=null,ne=null,K=0){k.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),ne=arguments[0]||null,k=arguments[1],q=arguments[2],K=arguments[3]||0,Q=null);let me,be,Ce,Ee,Ne,Be;Q!==null?(me=Q.max.x-Q.min.x,be=Q.max.y-Q.min.y,Ce=Q.min.x,Ee=Q.min.y):(me=k.image.width,be=k.image.height,Ce=0,Ee=0),ne!==null?(Ne=ne.x,Be=ne.y):(Ne=0,Be=0);const ke=ye.convert(q.format),Xe=ye.convert(q.type);Re.setTexture2D(q,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,q.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,q.unpackAlignment);const Ze=O.getParameter(O.UNPACK_ROW_LENGTH),Je=O.getParameter(O.UNPACK_IMAGE_HEIGHT),rt=O.getParameter(O.UNPACK_SKIP_PIXELS),qe=O.getParameter(O.UNPACK_SKIP_ROWS),De=O.getParameter(O.UNPACK_SKIP_IMAGES),it=k.isCompressedTexture?k.mipmaps[K]:k.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,it.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,it.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ce),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ee),k.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,K,Ne,Be,me,be,ke,Xe,it.data):k.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,K,Ne,Be,it.width,it.height,ke,it.data):O.texSubImage2D(O.TEXTURE_2D,K,Ne,Be,ke,Xe,it),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ze),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Je),O.pixelStorei(O.UNPACK_SKIP_PIXELS,rt),O.pixelStorei(O.UNPACK_SKIP_ROWS,qe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,De),K===0&&q.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ve.unbindTexture()},this.copyTextureToTexture3D=function(k,q,Q=null,ne=null,K=0){k.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,ne=arguments[1]||null,k=arguments[2],q=arguments[3],K=arguments[4]||0);let me,be,Ce,Ee,Ne,Be,ke,Xe,Ze;const Je=k.isCompressedTexture?k.mipmaps[K]:k.image;Q!==null?(me=Q.max.x-Q.min.x,be=Q.max.y-Q.min.y,Ce=Q.max.z-Q.min.z,Ee=Q.min.x,Ne=Q.min.y,Be=Q.min.z):(me=Je.width,be=Je.height,Ce=Je.depth,Ee=0,Ne=0,Be=0),ne!==null?(ke=ne.x,Xe=ne.y,Ze=ne.z):(ke=0,Xe=0,Ze=0);const rt=ye.convert(q.format),qe=ye.convert(q.type);let De;if(q.isData3DTexture)Re.setTexture3D(q,0),De=O.TEXTURE_3D;else if(q.isDataArrayTexture||q.isCompressedArrayTexture)Re.setTexture2DArray(q,0),De=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,q.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,q.unpackAlignment);const it=O.getParameter(O.UNPACK_ROW_LENGTH),je=O.getParameter(O.UNPACK_IMAGE_HEIGHT),lt=O.getParameter(O.UNPACK_SKIP_PIXELS),Mt=O.getParameter(O.UNPACK_SKIP_ROWS),ut=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Je.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Je.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ee),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ne),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Be),k.isDataTexture||k.isData3DTexture?O.texSubImage3D(De,K,ke,Xe,Ze,me,be,Ce,rt,qe,Je.data):q.isCompressedArrayTexture?O.compressedTexSubImage3D(De,K,ke,Xe,Ze,me,be,Ce,rt,Je.data):O.texSubImage3D(De,K,ke,Xe,Ze,me,be,Ce,rt,qe,Je),O.pixelStorei(O.UNPACK_ROW_LENGTH,it),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,je),O.pixelStorei(O.UNPACK_SKIP_PIXELS,lt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Mt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ut),K===0&&q.generateMipmaps&&O.generateMipmap(De),ve.unbindTexture()},this.initRenderTarget=function(k){Ie.get(k).__webglFramebuffer===void 0&&Re.setupRenderTarget(k)},this.initTexture=function(k){k.isCubeTexture?Re.setTextureCube(k,0):k.isData3DTexture?Re.setTexture3D(k,0):k.isDataArrayTexture||k.isCompressedArrayTexture?Re.setTexture2DArray(k,0):Re.setTexture2D(k,0),ve.unbindTexture()},this.resetState=function(){A=0,T=0,E=null,ve.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return WebGLCoordinateSystem}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===DisplayP3ColorSpace?"display-p3":"srgb",t.unpackColorSpace=ColorManagement.workingColorSpace===LinearDisplayP3ColorSpace?"display-p3":"srgb"}}class Fog{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new Color$1(e),this.near=t,this.far=r}clone(){return new Fog(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Scene extends Object3D{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Euler,this.environmentIntensity=1,this.environmentRotation=new Euler,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class PointsMaterial extends Material{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Color$1(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _inverseMatrix=new Matrix4,_ray=new Ray,_sphere=new Sphere,_position$2=new Vector3;class Points extends Object3D{constructor(e=new BufferGeometry,t=new PointsMaterial){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,o=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),_sphere.copy(r.boundingSphere),_sphere.applyMatrix4(a),_sphere.radius+=s,e.ray.intersectsSphere(_sphere)===!1)return;_inverseMatrix.copy(a).invert(),_ray.copy(e.ray).applyMatrix4(_inverseMatrix);const l=s/((this.scale.x+this.scale.y+this.scale.z)/3),d=l*l,c=r.index,_=r.attributes.position;if(c!==null){const m=Math.max(0,o.start),g=Math.min(c.count,o.start+o.count);for(let y=m,x=g;y<x;y++){const u=c.getX(y);_position$2.fromBufferAttribute(_,u),testPoint(_position$2,u,d,a,e,t,this)}}else{const m=Math.max(0,o.start),g=Math.min(_.count,o.start+o.count);for(let y=m,x=g;y<x;y++)_position$2.fromBufferAttribute(_,y),testPoint(_position$2,y,d,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=a.length;s<o;s++){const l=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}}function testPoint(n,e,t,r,a,s,o){const l=_ray.distanceSqToPoint(n);if(l<t){const d=new Vector3;_ray.closestPointToPoint(n,d),d.applyMatrix4(r);const c=a.ray.origin.distanceTo(d);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(l),point:d,index:e,face:null,object:o})}}class Curve{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,a=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)r=this.getPoint(o/e),s+=r.distanceTo(a),t.push(s),a=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let a=0;const s=r.length;let o;t?o=t:o=e*r[s-1];let l=0,d=s-1,c;for(;l<=d;)if(a=Math.floor(l+(d-l)/2),c=r[a]-o,c<0)l=a+1;else if(c>0)d=a-1;else{d=a;break}if(a=d,r[a]===o)return a/(s-1);const f=r[a],m=r[a+1]-f,g=(o-f)/m;return(a+g)/(s-1)}getTangent(e,t){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const o=this.getPoint(a),l=this.getPoint(s),d=t||(o.isVector2?new Vector2:new Vector3);return d.copy(l).sub(o).normalize(),d}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new Vector3,a=[],s=[],o=[],l=new Vector3,d=new Matrix4;for(let g=0;g<=e;g++){const y=g/e;a[g]=this.getTangentAt(y,new Vector3)}s[0]=new Vector3,o[0]=new Vector3;let c=Number.MAX_VALUE;const f=Math.abs(a[0].x),_=Math.abs(a[0].y),m=Math.abs(a[0].z);f<=c&&(c=f,r.set(1,0,0)),_<=c&&(c=_,r.set(0,1,0)),m<=c&&r.set(0,0,1),l.crossVectors(a[0],r).normalize(),s[0].crossVectors(a[0],l),o[0].crossVectors(a[0],s[0]);for(let g=1;g<=e;g++){if(s[g]=s[g-1].clone(),o[g]=o[g-1].clone(),l.crossVectors(a[g-1],a[g]),l.length()>Number.EPSILON){l.normalize();const y=Math.acos(clamp(a[g-1].dot(a[g]),-1,1));s[g].applyMatrix4(d.makeRotationAxis(l,y))}o[g].crossVectors(a[g],s[g])}if(t===!0){let g=Math.acos(clamp(s[0].dot(s[e]),-1,1));g/=e,a[0].dot(l.crossVectors(s[0],s[e]))>0&&(g=-g);for(let y=1;y<=e;y++)s[y].applyMatrix4(d.makeRotationAxis(a[y],g*y)),o[y].crossVectors(a[y],s[y])}return{tangents:a,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function CubicBezierP0(n,e){const t=1-n;return t*t*t*e}function CubicBezierP1(n,e){const t=1-n;return 3*t*t*n*e}function CubicBezierP2(n,e){return 3*(1-n)*n*n*e}function CubicBezierP3(n,e){return n*n*n*e}function CubicBezier(n,e,t,r,a){return CubicBezierP0(n,e)+CubicBezierP1(n,t)+CubicBezierP2(n,r)+CubicBezierP3(n,a)}class CubicBezierCurve extends Curve{constructor(e=new Vector2,t=new Vector2,r=new Vector2,a=new Vector2){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=a}getPoint(e,t=new Vector2){const r=t,a=this.v0,s=this.v1,o=this.v2,l=this.v3;return r.set(CubicBezier(e,a.x,s.x,o.x,l.x),CubicBezier(e,a.y,s.y,o.y,l.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}const Cache={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class LoadingManager{constructor(e,t,r){const a=this;let s=!1,o=0,l=0,d;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this.itemStart=function(f){l++,s===!1&&a.onStart!==void 0&&a.onStart(f,o,l),s=!0},this.itemEnd=function(f){o++,a.onProgress!==void 0&&a.onProgress(f,o,l),o===l&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(f){a.onError!==void 0&&a.onError(f)},this.resolveURL=function(f){return d?d(f):f},this.setURLModifier=function(f){return d=f,this},this.addHandler=function(f,_){return c.push(f,_),this},this.removeHandler=function(f){const _=c.indexOf(f);return _!==-1&&c.splice(_,2),this},this.getHandler=function(f){for(let _=0,m=c.length;_<m;_+=2){const g=c[_],y=c[_+1];if(g.global&&(g.lastIndex=0),g.test(f))return y}return null}}}const DefaultLoadingManager=new LoadingManager;class Loader{constructor(e){this.manager=e!==void 0?e:DefaultLoadingManager,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const r=this;return new Promise(function(a,s){r.load(e,a,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Loader.DEFAULT_MATERIAL_NAME="__DEFAULT";class ImageLoader extends Loader{constructor(e){super(e)}load(e,t,r,a){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Cache.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const l=createElementNS("img");function d(){f(),Cache.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(_){f(),a&&a(_),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){l.removeEventListener("load",d,!1),l.removeEventListener("error",c,!1)}return l.addEventListener("load",d,!1),l.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),s.manager.itemStart(e),l.src=e,l}}class TextureLoader extends Loader{constructor(e){super(e)}load(e,t,r,a){const s=new Texture,o=new ImageLoader(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(l){s.image=l,s.needsUpdate=!0,t!==void 0&&t(s)},r,a),s}}let Light$1=class extends Object3D{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Color$1(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};const _projScreenMatrix$1=new Matrix4,_lightPositionWorld$1=new Vector3,_lookTarget$1=new Vector3;class LightShadow{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vector2(512,512),this.map=null,this.mapPass=null,this.matrix=new Matrix4,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Frustum,this._frameExtents=new Vector2(1,1),this._viewportCount=1,this._viewports=[new Vector4(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;_lightPositionWorld$1.setFromMatrixPosition(e.matrixWorld),t.position.copy(_lightPositionWorld$1),_lookTarget$1.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_lookTarget$1),t.updateMatrixWorld(),_projScreenMatrix$1.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_projScreenMatrix$1),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(_projScreenMatrix$1)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class DirectionalLightShadow extends LightShadow{constructor(){super(new OrthographicCamera(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class DirectionalLight extends Light$1{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Object3D.DEFAULT_UP),this.updateMatrix(),this.target=new Object3D,this.shadow=new DirectionalLightShadow}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class AmbientLight extends Light$1{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const _matrix=new Matrix4;class Raycaster{constructor(e,t,r=0,a=1/0){this.ray=new Ray(e,t),this.near=r,this.far=a,this.camera=null,this.layers=new Layers,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _matrix.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_matrix),this}intersectObject(e,t=!0,r=[]){return intersect(e,this,r,t),r.sort(ascSort),r}intersectObjects(e,t=!0,r=[]){for(let a=0,s=e.length;a<s;a++)intersect(e[a],this,r,t);return r.sort(ascSort),r}}function ascSort(n,e){return n.distance-e.distance}function intersect(n,e,t,r){let a=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(a=!1),a===!0&&r===!0){const s=n.children;for(let o=0,l=s.length;o<l;o++)intersect(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:REVISION}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=REVISION);const AVAILABLE_DIGIT=1e6,PRESSURE_DIGIT=1e4,compressNumberArray=n=>n.map((t,r)=>{if(r===0)return Math.floor(n[0]*PRESSURE_DIGIT);const a=n[r-1];return Math.floor((t-a)*PRESSURE_DIGIT)}),decompressNumberArray=n=>{const e=[];return n.forEach((t,r)=>{if(r===0)e.push(n[0]/PRESSURE_DIGIT);else{const a=e[r-1];e.push(t/PRESSURE_DIGIT+a)}}),e},compressPoints=n=>n.map((t,r)=>{if(r===0)return[Math.floor(t[0]*AVAILABLE_DIGIT),Math.floor(t[1]*AVAILABLE_DIGIT),Math.floor(t[2]*AVAILABLE_DIGIT)];const a=n[r-1];return[Math.floor((t[0]-a[0])*AVAILABLE_DIGIT),Math.floor((t[1]-a[1])*AVAILABLE_DIGIT),Math.floor((t[2]-a[2])*AVAILABLE_DIGIT)]}),decompressPoint=n=>{const e=[];return n.forEach((t,r)=>{if(r===0)e.push([t[0]/AVAILABLE_DIGIT,t[1]/AVAILABLE_DIGIT,t[2]/AVAILABLE_DIGIT]);else{const a=e[r-1];e.push([t[0]/AVAILABLE_DIGIT+a[0],t[1]/AVAILABLE_DIGIT+a[1],t[2]/AVAILABLE_DIGIT+a[2]])}}),e},compressor={compress:compressPoints,decompress:decompressPoint,compressNumberArray,decompressNumberArray},parseHeader=n=>{if(n.byteLength<32)return;const e=new DataView(n);if(e.getUint32(0)!==1179928658)return;const t=e.getUint8(4),r=e.getUint32(12,!0),a=e.getUint32(16,!0),s=e.getUint32(28,!0),o=new TextDecoder().decode(new Uint8Array(n,32,s))||"Untitled";return{version:t,dateCreated:r,dateModified:a,title:o}},findEOCD=n=>{let t=n.byteLength-22;for(let r=0;r<=65535;r+=1){if(n.getUint32(t,!0)===101010256)return t;t-=1}throw Error("Failed to find EOCD")},readZip0=n=>{const e=new DataView(n),t=findEOCD(e),r=e.getUint16(t+8,!0),a=e.getUint32(t+12,!0),s=e.getUint32(t+16,!0),o=t-a,l=o-s,d=[];let c=o;for(let f=0;f<r;f+=1){if(e.getUint32(c,!0)!==33639248)throw Error("Invalid format");const _=e.getUint32(c+28,!0),m=e.getUint32(c+30,!0),g=e.getUint32(c+32,!0),y=c+46+_+m+g,x=e.getUint32(c+20,!0);if(x===0){c=y;continue}const u=new TextDecoder().decode(new Uint8Array(n,c+46,_));if(u.endsWith("/")){c=y;continue}const M=l+e.getUint32(c+42,!0)+30+_+m,S=new Uint8Array(n,M,x);d.push({name:u,data:S}),c=y}return d};Uint32Array.from({length:256},(n,e)=>{for(let t=0;t<8;t+=1)e=(e&1)*3988292384^e>>>1;return e});const reset=(n,e)=>{n.dateCreated=Math.floor(new Date().getTime()/1e3);const t=useNoteStore();t.reset(),t.writable=e},loadBlank=()=>{const n=useNoteStore(),e=n.groups.root,t={id:nanoid(11),name:"Group",visibility:!0,parent:"root",curves:[],expanded:!0,children:[]};n.groups[t.id]=t,e.children.push(t.id),n.curves.set(t.id,new Map)},load=async(n,e,t)=>{reset(n,!1);const r=await axios.get(e,{responseType:"arraybuffer"}).then(c=>c.data).catch(c=>{console.error("Axios error:",c.message),console.error("Full error:",c)});if(r===void 0){loadBlank();return}const a=parseHeader(r);if(a===void 0){loadBlank();return}n.dateCreated=a.dateCreated,t.clear(),readZip0(r).forEach(c=>{t.set(c.name,c.data)});const s=useNoteStore(),o=JSON.parse(new TextDecoder().decode(t.get("entry.json")));o.cameras&&(s.cameras=o.cameras);const l=o.groups?Object.fromEntries(Object.entries(o.groups).map(([c,f])=>[c,{...f,id:c,expanded:f.expanded??!1,children:f.children??[]}])):s.groups;if(s.$patch({title:a.title,stage:{...s.stage,...o.stage??{}},clipboard:{...s.clipboard,...o.clipboard},brushes:o.brushes??[],shots:o.shots??[],groups:l,curves:new Map}),t.has("stageProps.json")){const f=JSON.parse(new TextDecoder().decode(t.get("stageProps.json")));f.forEach(_=>{_.type==="surface"&&(_.primaryCurves=_.primaryCurves.map(m=>compressor.decompress(m)),_.secondaryCurves=_.secondaryCurves.map(m=>compressor.decompress(m)))}),s.stageProps=f}const d=l.root??s.groups.root;if(s.groups.root=d,d.children=(d.children??[]).filter(c=>{const f=o.groups[c],_=t.get(`group/${c}`);if(f===void 0)return!1;if(_===void 0)return s.curves.set(c,new Map),!0;const g=new DataView(_.buffer,_.byteOffset,_.byteLength).getUint32(4,!0),y=new Uint8Array(g);lz4.decompressBlock(_,y,8,_.byteLength-8,0);const x=new DataView(y.buffer);let u=0;const p=new Map;for(s.curves.set(c,p);u<g;){const M=x.getUint8(u),S=new TextDecoder().decode(new Uint8Array(y.buffer,u+4,12).filter(E=>E!==0)),b=x.getUint32(u+16,!0);u+=20;let A=u;if(u+=b,M!==1)continue;const T={id:S,points:[],normals:[],color:[0,0,0,1],shape:"RECT",size:.035,pressures:[],materialStyle:{type:"FLAT",pattern:"NONE",rotation:0,density:0,contrast:0}};for(p.set(S,T);A<u;){const E=x.getUint8(A),B=x.getUint32(A+1,!0);switch(A+=5,E){case 1:{const P=x.getUint8(A),C=x.getUint16(A+2,!0)/1e3,I=x.getUint8(A+4)/100,N=x.getUint8(A+5),D=x.getUint8(A+6),V=x.getUint8(A+7);T.shape=["","POINTY","RECT","CUBE","MARKER","WIDEBRUSH","RIBBON"][P]||"RECT",T.size=C,T.color=[N,D,V,I];break}case 2:{const P=A;T.points=compressor.decompress(new Array(B/12).fill(0).map((C,I)=>[x.getFloat32(P+I*12,!0),x.getFloat32(P+I*12+4,!0),x.getFloat32(P+I*12+8,!0)])).map(C=>new Vector3(...C));break}case 4:{const P=A;T.normals=compressor.decompress(new Array(B/8).fill(0).map((C,I)=>[1,x.getFloat32(P+I*8,!0),x.getFloat32(P+I*8+4,!0)])).map(C=>new Vector3().setFromSphericalCoords(...C));break}case 5:{const P=A;T.pressures=compressor.decompressNumberArray(new Array(B/2).fill(0).map((C,I)=>x.getInt16(P+I*2,!0)));break}case 33:case 34:{const P=x.getUint8(A),C=x.getFloat32(A+1,!0),I=x.getFloat32(A+5,!0),N=x.getFloat32(A+9,!0);T.materialStyle={type:E===33?"FLAT":"SHADED",pattern:["NONE","DOT","LINE","CROSS","TERRAZZO","STIPPLED_DOT"][P]??"NONE",rotation:C,density:I,contrast:N};break}case 35:{const P=x.getFloat32(A,!0);T.materialStyle={type:"GLOW",intensity:P};break}case 36:{T.materialStyle={type:"CUTOUT"};break}}A+=B}}return!0}),Object.keys(l).forEach(c=>{c==="root"||d.children.includes(c)||d.children.push(c)}),!d.children.length){const c={id:nanoid(11),name:"Group",visibility:!0,parent:"root",curves:[],expanded:!0,children:[]};s.groups[c.id]=c,d.children.push(c.id),s.curves.set(c.id,new Map)}n.changesFlushed()},ft=class ft{constructor(){ee(this,"files",new Map);ee(this,"resourceUrls",new Map);ee(this,"groupIdForCurve",new Map);ee(this,"dateCreated",0)}static get initialized(){return this.instance!==void 0}static get shared(){if(!this.instance)throw new Error("Uninitialized");return this.instance}static async init(e){const t=new ft;return await t.load(e),ft.instance=t,t}static get store(){return useNoteStore()}async load(e){this.files.clear(),this.resourceUrls.forEach((r,a)=>{URL.revokeObjectURL(a)}),this.resourceUrls.clear(),await load(this,e,this.files),this.groupIdForCurve.clear(),useNoteStore().curves.forEach((r,a)=>{r.forEach((s,o)=>{this.groupIdForCurve.set(o,a)})})}async save(e){}get changed(){return!1}get needThumbnailCapture(){return!1}markChanged(){}delayTimer(e=!1){}changesFlushed(){}async addResource(e){this.markChanged();const t=await e.arrayBuffer(),r=[...this.files.keys()],a=getUniqueName(`res/${e.name}`,r);return this.files.set(a,new Uint8Array(t)),a}deleteResources(e){return this.markChanged(),e.forEach(t=>{const r=this.resourceUrls.get(t);r!==void 0&&URL.revokeObjectURL(r),this.resourceUrls.delete(t),this.files.delete(t)}),Promise.resolve()}getResource(e){const t=this.files.get(e);return t===void 0?Promise.reject(Error("Not Found")):Promise.resolve(t)}getResourceUrl(e){let t=this.resourceUrls.get(e);if(t!==void 0)return Promise.resolve(t);const r=this.files.get(e);return r===void 0?Promise.reject(Error("Not Found")):(t=URL.createObjectURL(new Blob([r])),this.resourceUrls.set(e,t),Promise.resolve(t))}getCameras(){return[...useNoteStore().cameras]}async updateCamera(e,t,r){this.markChanged();const a=useNoteStore(),s={...t,id:e},o=a.cameras.findIndex(d=>d.id===e);if(o===-1?a.cameras.push(s):a.cameras.splice(o,1,s),r){const d=new Uint8Array(await r.arrayBuffer());if(d){this.files.set("thumbnail.png",d);const c=this.resourceUrls.get("thumbnail.png");c&&(URL.revokeObjectURL(c),this.resourceUrls.delete("thumbnail.png"))}}return await this.getResourceUrl("thumbnail.png")}createBrush(e){this.markChanged(),useNoteStore().brushes.push(e)}deleteBrushes(e){this.markChanged();const t=useNoteStore();t.brushes=t.brushes.filter(r=>!e.includes(r.id))}addStageProp(e){this.markChanged(),useNoteStore().stageProps.push(e)}updateStageProp(e,t){this.markChanged();const r=useNoteStore(),a=r.stageProps.find(o=>o.id===e);if(a===void 0)return;const s=r.stageProps.findIndex(o=>o.id===e);r.stageProps.splice(s,1,{...a,...t})}deleteStageProps(e){this.markChanged();const t=useNoteStore();t.stageProps=t.stageProps.filter(r=>!e.includes(r.id))}getCurveGroups(){const e=useNoteStore();return Object.values(e.groups).filter(t=>t.id!=="root")}getCurveGroupsWithCurves(){const e=useNoteStore();return Object.values(e.groups).filter(t=>t.id!=="root").map(t=>{var r;return{...t,curves:[...((r=e.curves.get(t.id))==null?void 0:r.values())??[]]}})}getCurveGroup(e){return useNoteStore().groups[e]}createCurveGroup(e,t,r){this.markChanged();const a=useNoteStore(),s=(t==null?void 0:t.id)??nanoid(11),o=(r==null?void 0:r.to)??"root",l=a.groups[o];if(!l)throw Error("Not Found");const d={id:s,name:e,visibility:(t==null?void 0:t.visibility)??!0,parent:o,expanded:(t==null?void 0:t.expanded)??!1,children:(t==null?void 0:t.children)??[]};a.groups[s]=JSON.parse(JSON.stringify(d)),a.curves.set(s,new Map);const c=a.curves.get(s);t!=null&&t.curves&&t.curves.forEach(_=>{const m=_.id;c==null||c.set(m,{..._,id:m}),this.groupIdForCurve.set(m,s)}),l.children===void 0&&(l.children=[]);const f=(r==null?void 0:r.index)??l.children.length;return l.children=proxySplice(l.children,f,0,s),{...d,curves:[...(c==null?void 0:c.values())??[]]}}updateCurveGroup(e,t){this.markChanged();const a=useNoteStore().groups[e];a&&(t.name&&(a.name=t.name),t.visibility!==void 0&&(a.visibility=t.visibility),t.expanded!==void 0&&(a.expanded=t.expanded))}deleteCurveGroups(e){this.markChanged();const t=useNoteStore();e.forEach(r=>{var l,d;if(r==="root")return;const a=t.groups[r];if(!a)return;const s=t.groups[a.parent],o=((l=s==null?void 0:s.children)==null?void 0:l.indexOf(r))??-1;o!==-1&&(s!=null&&s.children)&&(s.children=proxySplice(s.children,o,1)),delete t.groups[r],(d=t.curves.get(r))==null||d.forEach((c,f)=>{this.groupIdForCurve.delete(f)}),t.curves.delete(r)})}copyCurveGroup(e,t,r){var g,y;this.markChanged();const a=useNoteStore(),s=a.groups[e];if(!s)throw Error("Not Found");const o=a.groups[s.parent];if(!o)throw Error("Parent not found");const l={id:(r==null?void 0:r.to)??s.parent,index:(r==null?void 0:r.index)??((g=o.children)==null?void 0:g.indexOf(e))??((y=o.children)==null?void 0:y.length)??0},d=a.groups[l.id];if(!d)throw Error("toParent not found");const c=nanoid(11),f={...s,id:c,name:t,parent:l.id,expanded:!1,children:[]};a.groups[f.id]=f;const _=new Map;a.curves.set(f.id,_);const m=a.curves.get(s.id);return m==null||m.forEach(x=>{const u=nanoid(11);this.groupIdForCurve.set(u,c),_.set(u,{...x,id:u,points:x.points.map(p=>p.clone()),normals:x.normals.map(p=>p.clone()),color:[...x.color],pressures:[...x.pressures],materialStyle:{...x.materialStyle}})}),d.children=proxySplice(d.children,l.index,0,f.id),f}joinCurvesInCurveGroup(e,t,r){this.markChanged();const a=useNoteStore(),s=a.curves.get(e);if(!s)return;a.curves.has(t)||a.curves.set(t,new Map);const o=a.curves.get(t);o&&r.forEach(l=>{this.groupIdForCurve.set(l,t);const d=s.get(l);d&&(s.delete(l),o==null||o.set(l,d))})}replaceCurveGroups(e,{to:t,index:r}){this.markChanged();const a=useNoteStore(),s=a.groups[t];if(!s)return;let o=0;e.forEach(l=>{const d=a.groups[l];if(!d)return;const c=a.groups[d.parent];if(!c)return;const f=c.children.indexOf(d.id);c.children=proxySplice(c.children,f,1),c.id===t&&f<r-o&&(o+=1)}),s.children=proxySplice(s.children,r-o,0,...e)}getCurves(e){const r=useNoteStore().curves.get(e);return r?[...r.values()]:[]}getCurve(e,t){const a=useNoteStore().curves.get(e);return a==null?void 0:a.get(t)}addCurves(e,t){this.markChanged();const r=useNoteStore();r.curves.has(e)||r.curves.set(e,new Map);const a=r.curves.get(e);t.forEach(s=>{this.groupIdForCurve.set(s.id,e),a==null||a.set(s.id,s)})}deleteCurves(e,t){this.markChanged();const a=useNoteStore().curves.get(e);t.forEach(s=>{this.groupIdForCurve.delete(s),a&&a.delete(s)})}updateCurves(e,t){this.markChanged();const a=useNoteStore().curves.get(e);a&&Object.entries(t).forEach(([s,o])=>{const l=a.get(s);l&&a.set(s,{...l,...o})})}};ee(ft,"instance");let BookNote=ft;const proxySplice=(n,e,t,...r)=>{const a=[...n];return a.splice(e,t,...r),a};window.BookNote=BookNote;class FullScreenTriangleGeometry extends BufferGeometry{constructor(){super(),this.setAttribute("position",new Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Float32BufferAttribute([0,2,0,0,2,0],2))}}const camera=new OrthographicCamera(-1,1,1,-1,0,1),geometry=new FullScreenTriangleGeometry;class FullScreenQuad{constructor(e){ee(this,"mesh");this.mesh=new Mesh(geometry,e)}dispose(){this.mesh.geometry.dispose()}render(e){e.render(this.mesh,camera)}setMaterial(e){this.mesh.material=e}}const commonVertexShader=`
  #include <common>
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`,mixFragmentShader=`
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D texture1;
  uniform sampler2D texture2;

  void main() {
    gl_FragColor = (texture2D(texture1, vUv) + vec4(1.0) * texture2D(texture2, vUv));
  }
`,clearFragmentShader=`
  precision highp float;

  layout(location = 0) out vec4 gColor;
  layout(location = 1) out vec4 gBloom;
  layout(location = 2) out vec4 gUILayer;

  varying vec2 vUv;

  uniform vec3 clearColor;

  void main() {
    gColor = vec4( clearColor.rgb, 1.0 );
    gBloom = vec4( 0.0 , 0.0 , 0.0 , 0.0 );
    gUILayer = vec4( 0.0 , 0.0 , 0.0 , 0.0 );
  }
`,copyFragmentShader=`
  precision highp float;

  varying vec2 vUv;

  layout(location = 0) out vec4 gColor;
  layout(location = 1) out vec4 gBloom;
  layout(location = 2) out vec4 gUILayer;

  uniform sampler2D tDiffuse;
  uniform float aspect;

  float linearMap(const in float x, const in float inMin, const in float inMax, const in float outMin, const in float outMax) {
    return outMin + (x - inMin) * (outMax - outMin) / (inMax - inMin);
  }

  void main() {
    float x = vUv.x;
    float y = vUv.y;

    if (aspect < 1.0) {
      x = linearMap(x, (1.0 - aspect) / 2.0, (1.0 + aspect) / 2.0, 0.0, 1.0);
    } else {
      float ratio = 1.0 / aspect;
      y = linearMap(y, (1.0 - ratio) / 2.0, (1.0 + ratio) / 2.0, 0.0, 1.0);
    }
    gColor = texture2D(tDiffuse, vec2( x, y ));
    gBloom = vec4( 0.0 , 0.0 , 0.0 , 0.0 );
    gUILayer = vec4( 0.0 , 0.0 , 0.0 , 0.0 );
  }
`,bokehFragmentShader=`
  precision highp float;

  #include <common>
  #include <packing>

  varying vec2 vUv;

  uniform sampler2D tDiffuse;
  uniform sampler2D tDepth;

  uniform float near;
  uniform float far;

  uniform float width;
  uniform float height;

  uniform float focalDepth;
  uniform float focalLength;
  uniform float fStop;
  uniform float boundingRadius;

  uniform bool isPerspective;

  float CoC = 0.03;
  float maxblur = 2.0;

  float bias = 0.5;
  float fringe = 0.7;
  float dbsize = 2.25;

  float threshold = 0.2;
  float gain = 2.0;

  const int samples = 4;
  const int rings = 4;

  const int maxringsamples = rings * samples;

  float bdepth(vec2 coords) //blurring depth
  {
    float d = 0.0;
    float kernel[9];
    vec2 offset[9];
    vec2 texel = vec2(1.0/width,1.0/height);

    vec2 wh = vec2(texel.x, texel.y) * dbsize;

    offset[0] = vec2(-wh.x,-wh.y);
    offset[1] = vec2( 0.0, -wh.y);
    offset[2] = vec2( wh.x -wh.y);

    offset[3] = vec2(-wh.x,  0.0);
    offset[4] = vec2( 0.0,   0.0);
    offset[5] = vec2( wh.x,  0.0);

    offset[6] = vec2(-wh.x, wh.y);
    offset[7] = vec2( 0.0,  wh.y);
    offset[8] = vec2( wh.x, wh.y);

    kernel[0] = 1.0/16.0;   kernel[1] = 2.0/16.0;   kernel[2] = 1.0/16.0;
    kernel[3] = 2.0/16.0;   kernel[4] = 4.0/16.0;   kernel[5] = 2.0/16.0;
    kernel[6] = 1.0/16.0;   kernel[7] = 2.0/16.0;   kernel[8] = 1.0/16.0;


    for( int i=0; i<9; i++ )
    {
      float tmp = texture2D(tDepth, coords + offset[i]).r;
      d += tmp * kernel[i];
    }

    return d;
  }

  vec3 color(vec2 coords, float blur) {
    vec3 col = vec3(0.0);
    vec2 texel = vec2(1.0/width,1.0/height);

    col.r = texture2D(tDiffuse, coords + vec2(0.0, 1.0) * texel * fringe * blur).r;
    col.g = texture2D(tDiffuse, coords + vec2(-0.866, -0.5) * texel * fringe * blur).g;
    col.b = texture2D(tDiffuse, coords + vec2(0.866, -0.5) * texel * fringe * blur).b;

    return col;
  }

  float linearize(float depthValue) {
    return near + (far - near) * depthValue;
  }

  float getDepth(float logDepth) {
    float z = exp(logDepth * log(far + 1.0) - log(near + 1.0));
    return z;
  }

  float gather(float i, float j, int ringsamples, inout vec3 col, float w, float h, float blur) {
    float rings2 = float(rings);
    float step = PI * 2.0 / float(ringsamples);
    float pw = cos(j * step) * i;
    float ph = sin(j * step) * i;
    float p = 1.0;
    col += color(vUv.xy + vec2(pw * w, ph * h), blur) * mix(1.0, i / rings2, bias) * p;
    return 1.0 * mix(1.0, i /rings2, bias) * p;
  }

  void main() {
    vec4 depthColor = texture2D(tDepth, vUv);

    float depth = linearize(depthColor.x);
    float fDepth = focalDepth;

    float f = focalLength; // may be / 10.0
    float d = fDepth * 1000.0;
    float o = depth * 1000.0;

    float a = (o*f)/abs(o-f);
    float b = (d*f)/abs(d-f);
    float c = abs(d-f)/(d*fStop*CoC);

    float radiusFactor = isPerspective == true ? boundingRadius : boundingRadius * 10.0;

    float blur = abs(a-b) * c * radiusFactor;
    blur = o > d ? clamp(blur, 0.0, 1.0) * 2.0 : clamp(blur, 0.0, 2.0);

    float w = (1.0/width) * blur * maxblur;
    float h = (1.0/height) * blur * maxblur;

    vec3 col = vec3(0.0);
    if (blur < 0.01) {
      col = texture2D(tDiffuse, vUv).rgb;
    } else {
      col = texture2D(tDiffuse, vUv).rgb;
      float s = 1.0;
      int ringsamples;

      for (int i = 1; i <= rings; i +=1) {
        ringsamples = i * samples;
        for (int j = 0 ; j < maxringsamples ; j ++) {
          if (j >= ringsamples) break;
          s += gather(float(i), float(j), ringsamples, col, w, h, blur);
        }
      }
      col /= s;

    }

    gl_FragColor = vec4(col, 1.0);
  }
`,filterFragmentShader=`
  precision highp float;

  layout(location = 0) out vec4 gColor;

  varying vec2 vUv;
  uniform sampler2D tDiffuse;
  uniform bool isPixelationOn;
  uniform float pixelSize;
  uniform bool isGrainOn;
  uniform float grainStrength;
  uniform float time;

  float rand(vec2 coord) {
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * (43758.5453));
  }

  vec4 grain(vec4 inColor, float diff) {
    vec4 color = inColor;
    diff = diff - 0.5;
    color.r += diff;
    color.g += diff;
    color.b += diff;
    return color;
  }

  void main() {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    if (isPixelationOn) {
      vec2 p = vUv;
      p.x -= mod(p.x, 1.0 / pixelSize);
      p.y -= mod(p.y, 1.0 / pixelSize);
      color = texture2D(tDiffuse, p);
    } else {
      color = texture2D(tDiffuse, vUv);
    }

    if (isGrainOn) {
      float noise = rand( fract(vUv + time) );
      vec4 noiseColor = grain(color, noise);
      gColor = mix(color, noiseColor, grainStrength * 0.3);
    } else {
      gColor = color;
    }
  }
`,bloomCompositeFragmentShader=`
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D blurTexture1;
  uniform sampler2D blurTexture2;
  uniform sampler2D blurTexture3;
  uniform sampler2D blurTexture4;
  uniform sampler2D blurTexture5;
  uniform float bloomStrength;
  uniform float bloomRadius;
  uniform float bloomFactors[NUM_MIPS];
  uniform vec3 bloomTintColors[NUM_MIPS];

  float lerpBloomFactor(const in float factor) {
    float mirrorFactor = 1.2 - factor;
    return mix(factor, mirrorFactor, bloomRadius);
  }

  void main() {
    gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
      lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
      lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
      lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
      lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
  }
`,seperableBlurFragmentShader=`
  precision highp float;

  #include <common>
  varying vec2 vUv;

  uniform sampler2D colorTexture;
  uniform vec2 invSize;
  uniform vec2 direction;
  uniform float gaussianCoefficients[KERNEL_RADIUS];

  void main() {
    float weightSum = gaussianCoefficients[0];
    vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

    for( int i = 1; i < KERNEL_RADIUS; i++ ){
      float x = float(i);
      float w = gaussianCoefficients[i];
      vec2 uvOffset = direction * invSize * x;
      vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
      vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
      diffuseSum += (sample1 + sample2) * w;
      weightSum += 2.0 * w;
    }
    gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
  }
`,texelFragmentShader=`
  precision highp float;

  varying vec2 vUv;

  uniform float opacity;
  uniform sampler2D tDiffuse;

  void main() {
    vec4 texel = texture2D( tDiffuse, vUv );
    gl_FragColor = opacity * texel;
  }
`;class Pass{constructor(){ee(this,"isPass");ee(this,"enabled");this.isPass=!0,this.enabled=!1}}const BlurDirectionX=new Vector2(1,0),BlurDirectionY=new Vector2(0,1);class BloomPass extends Pass{constructor(t,r){super();ee(this,"strength");ee(this,"radius");ee(this,"threshold");ee(this,"height");ee(this,"width");ee(this,"nMips");ee(this,"clearColor");ee(this,"bloomTintColors");ee(this,"renderTargetsHorizontal");ee(this,"renderTargetsVertical");ee(this,"seperableBlurMaterials");ee(this,"compositeMaterial");ee(this,"blendMaterial");ee(this,"fsQuad");this.strength=1,this.radius=1,this.threshold=0,this.width=t,this.height=r,this.clearColor=new Color$1(0,0,0),this.nMips=5,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.seperableBlurMaterials=[];const a=[3,5,7,9,11];let s=Math.round(this.width/2),o=Math.round(this.height/2);for(let d=0;d<this.nMips;d+=1){const c=new WebGLRenderTarget(s,o,{type:HalfFloatType});c.texture.name=`UnrealBloomPass.h${d}`,c.texture.generateMipmaps=!1,c.samples=64,this.renderTargetsHorizontal.push(c);const f=new WebGLRenderTarget(s,o,{type:HalfFloatType});f.texture.name=`UnrealBloomPass.v${d}`,f.texture.generateMipmaps=!1,f.samples=64,this.renderTargetsVertical.push(f),this.seperableBlurMaterials.push(this.getSeperableBlurMaterial(a[d])),this.seperableBlurMaterials[d].uniforms.invSize.value=new Vector2(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2)}this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1),new Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.blendMaterial=new ShaderMaterial({uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:commonVertexShader,fragmentShader:texelFragmentShader,blending:AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!1,this.fsQuad=new FullScreenQuad}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t+=1)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t+=1)this.renderTargetsVertical[t].dispose();for(let t=0;t<this.seperableBlurMaterials.length;t+=1)this.seperableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.fsQuad.dispose()}setSize(t,r){this.height=r,this.width=t;let a=Math.round(t/2),s=Math.round(r/2);for(let o=0;o<this.nMips;o+=1)this.renderTargetsHorizontal[o].setSize(a,s),this.renderTargetsVertical[o].setSize(a,s),this.seperableBlurMaterials[o].uniforms.invSize.value=new Vector2(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2)}render(t,r,a){t.setClearColor(this.clearColor,0);let s=r;for(let o=0;o<this.nMips;o+=1)this.fsQuad.setMaterial(this.seperableBlurMaterials[o]),this.seperableBlurMaterials[o].uniforms.colorTexture.value=s,this.seperableBlurMaterials[o].uniforms.direction.value=BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[o]),t.clear(),this.fsQuad.render(t),this.seperableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.seperableBlurMaterials[o].uniforms.direction.value=BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[o]),t.clear(),this.fsQuad.render(t),s=this.renderTargetsVertical[o].texture;this.fsQuad.setMaterial(this.compositeMaterial),this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.setMaterial(this.blendMaterial),this.blendMaterial.uniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,t.setRenderTarget(a),t.clear(),this.fsQuad.render(t)}setRadius(t){this.strength=t,this.compositeMaterial.uniforms.bloomStrength.value=this.strength}getSeperableBlurMaterial(t){const r=[];for(let a=0;a<t;a+=1)r.push(.39894*Math.exp(-.5*a*a/(t*t))/t);return new ShaderMaterial({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vector2(.5,.5)},direction:{value:new Vector2(.5,.5)},gaussianCoefficients:{value:r}},vertexShader:commonVertexShader,fragmentShader:seperableBlurFragmentShader})}getCompositeMaterial(t){return new ShaderMaterial({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:commonVertexShader,fragmentShader:bloomCompositeFragmentShader})}}const createRenderer=n=>{const e=new WebGLRenderer({canvas:n,antialias:!0,alpha:!0});return e.setScissorTest(!0),e.setClearColor(new Color$1(16777215),1),e.autoClear=!1,e.outputColorSpace=LinearSRGBColorSpace,ColorManagement.enabled=!1,e.sortObjects=!0,e.shadowMap.type=PCFShadowMap,e.shadowMap.enabled=!0,e.shadowMap.autoUpdate=!0,e},pt=class pt{constructor(e){ee(this,"renderer");ee(this,"focusPoint");ee(this,"width");ee(this,"height");ee(this,"isRenderModeOn");ee(this,"antialiasing");ee(this,"isDOFOn");ee(this,"isPixelationOn");ee(this,"isGrainOn");ee(this,"pixelationValue");ee(this,"time");ee(this,"multiRenderTargetAA");ee(this,"multiRenderTarget");ee(this,"singleRenderTarget");ee(this,"singleRenderTarget2");ee(this,"filterRenderTarget");ee(this,"fsQuad");ee(this,"mixMaterial");ee(this,"clearMaterial");ee(this,"backgroundMaterial");ee(this,"bokehMaterial");ee(this,"filterMaterial");ee(this,"bloomPass");this.renderer=createRenderer(e),this.focusPoint=new Vector3,this.width=e.clientWidth*window.devicePixelRatio,this.height=e.clientHeight*window.devicePixelRatio,this.multiRenderTargetAA=new WebGLRenderTarget(this.width,this.height,{format:RGBAFormat,type:HalfFloatType,count:2,samples:16,depthTexture:new DepthTexture(this.width,this.height)}),this.multiRenderTarget=new WebGLRenderTarget(this.width,this.height,{format:RGBAFormat,type:HalfFloatType,count:2,depthTexture:new DepthTexture(this.width,this.height)}),this.singleRenderTarget=new WebGLRenderTarget(this.width,this.height,{format:RGBAFormat,type:HalfFloatType,count:1}),this.singleRenderTarget2=new WebGLRenderTarget(this.width,this.height,{format:RGBAFormat,type:HalfFloatType,count:1}),this.filterRenderTarget=new WebGLRenderTarget(this.width,this.height,{format:RGBAFormat,type:HalfFloatType,count:1}),this.fsQuad=new FullScreenQuad,this.mixMaterial=new ShaderMaterial({uniforms:{texture1:{value:null},texture2:{value:null}},vertexShader:commonVertexShader,fragmentShader:mixFragmentShader}),this.clearMaterial=new ShaderMaterial({uniforms:{clearColor:{value:new Color$1(16777215)}},glslVersion:GLSL3,vertexShader:commonVertexShader,fragmentShader:clearFragmentShader}),this.backgroundMaterial=new ShaderMaterial({uniforms:{tDiffuse:{value:null},aspect:{value:1}},glslVersion:GLSL3,vertexShader:commonVertexShader,fragmentShader:copyFragmentShader}),this.bokehMaterial=new ShaderMaterial({defines:{DEPTH_PACKING:1},uniforms:{tDiffuse:{value:null},tDepth:{value:null},near:{value:.01},far:{value:100},width:{value:this.width},height:{value:this.height},focalDepth:{value:1},focalLength:{value:37},fStop:{value:1},isPerspective:{value:!0},boundingRadius:{value:1}},vertexShader:commonVertexShader,fragmentShader:bokehFragmentShader}),this.filterMaterial=new ShaderMaterial({uniforms:{tDiffuse:{value:null},isPixelationOn:{value:!1},pixelSize:{value:1},isGrainOn:{value:!1},grainStrength:{value:0},time:{value:1},aspect:{value:1}},glslVersion:GLSL3,vertexShader:commonVertexShader,fragmentShader:filterFragmentShader}),this.bloomPass=new BloomPass(this.width,this.height),this.isRenderModeOn=!1,this.antialiasing=!0,this.isDOFOn=!1,this.isPixelationOn=!1,this.isGrainOn=!1,this.pixelationValue=this.width>this.height?this.width:this.height,this.time=Date.now()}static get(e){return this.instance||(this.instance=new pt(e)),this.instance}resize(e,t){const r=this.renderer.domElement;if(r.width==e&&r.height==t)return;this.width=e,this.height=t;const a=Math.max(e,t);this.renderer.setSize(e,t,!1),this.renderer.setViewport(e>t?0:-(t-e)/2,e>t?-(e-t)/2:0,a,a),this.renderer.setScissor(0,0,e,t),this.singleRenderTarget.setSize(e,t),this.singleRenderTarget2.setSize(e,t),this.multiRenderTarget.setSize(e,t),this.multiRenderTargetAA.setSize(e,t),this.bloomPass.setSize(e,t),this.filterMaterial.uniforms.pixelSize.value=a/this.pixelationValue}render(e,t){const{renderer:r,singleRenderTarget:a,singleRenderTarget2:s,multiRenderTarget:o,isRenderModeOn:l,bloomPass:d,isDOFOn:c,isGrainOn:f,isPixelationOn:_,fsQuad:m,backgroundMaterial:g,clearMaterial:y,mixMaterial:x,bokehMaterial:u,filterMaterial:p,filterRenderTarget:M}=this;if(c&&this.setCameraInfo(t),l){if(d.enabled){const S=new Color$1;r.getClearColor(S),r.setClearColor(new Color$1(0,0,0),0);const b=this.antialiasing?this.multiRenderTargetAA:o;r.setRenderTarget(b);let A;if(e.background){A=e.background;const P=A.image.width/A.image.height;g.uniforms.tDiffuse.value=e.background,g.uniforms.aspect.value=P,m.setMaterial(g)}else y.uniforms.clearColor.value=S,m.setMaterial(y);r.clear(),m.render(r),r.clearDepth(),r.render(e,t);let T;if(c){const P=b.textures[0],C=b.depthTexture;u.uniforms.tDiffuse.value=P,u.uniforms.tDepth.value=C,m.setMaterial(u),r.setRenderTarget(s),r.clear(),m.render(r),T=b.textures[1]}else T=b.textures[1];d.render(r,T,a);const E=c?s.texture:b.textures[0];x.uniforms.texture1.value=E,x.uniforms.texture2.value=a.texture;const B=f||_?M:null;m.setMaterial(x),r.setRenderTarget(B),r.clear(),m.render(r),r.setClearColor(S,1),(f||_)&&(p.uniforms.tDiffuse.value=M.texture,p.uniforms.time.value=(Date.now()-this.time)%1e4/1e4,p.uniforms.aspect.value=1,m.setMaterial(p),r.setRenderTarget(null),r.clear(),m.render(r));return}else if(c){const S=new Color$1;r.getClearColor(S),r.setClearColor(new Color$1(0,0,0),0);const b=this.antialiasing?this.multiRenderTargetAA:o;if(r.setRenderTarget(b),e.background){const B=e.background,P=B.image.width/B.image.height;g.uniforms.tDiffuse.value=e.background,g.uniforms.aspect.value=P,m.setMaterial(g)}else y.uniforms.clearColor.value=S,m.setMaterial(y);r.clear(),m.render(r),r.clearDepth(),r.render(e,t);const A=b.textures[0],T=b.depthTexture;u.uniforms.tDiffuse.value=A,u.uniforms.tDepth.value=T;const E=f||_?M:null;m.setMaterial(u),r.setRenderTarget(E),r.clear(),m.render(r),r.setClearColor(S,1),(f||_)&&(p.uniforms.tDiffuse.value=M.texture,p.uniforms.time.value=(Date.now()-this.time)%1e4/1e4,p.uniforms.aspect.value=1,m.setMaterial(p),r.setRenderTarget(null),r.clear(),m.render(r));return}else if(f||_){r.setRenderTarget(M),r.clear(),r.render(e,t),p.uniforms.tDiffuse.value=M.texture,p.uniforms.time.value=(Date.now()-this.time)%1e4/1e4,p.uniforms.aspect.value=1,m.setMaterial(p),r.setRenderTarget(null),r.clear(),m.render(r);return}}r.clear(),r.render(e,t)}setRenderModeOn(e){this.renderer.shadowMap.enabled=e,this.isRenderModeOn=e}setCameraInfo(e){const t=new Vector3;e.getWorldPosition(t);const r=t.distanceTo(this.focusPoint),a=e instanceof PerspectiveCamera?e.getFocalLength():5;this.bokehMaterial.uniforms.isPerspective.value=e instanceof PerspectiveCamera,this.bokehMaterial.uniforms.focalDepth.value=r,this.bokehMaterial.uniforms.focalLength.value=a,this.bokehMaterial.uniforms.near.value=e.near,this.bokehMaterial.uniforms.far.value=e.far}dispose(){const{renderer:e,singleRenderTarget:t,singleRenderTarget2:r,multiRenderTarget:a,multiRenderTargetAA:s,filterRenderTarget:o,bloomPass:l}=this;t.dispose(),r.dispose(),a.dispose(),s.dispose(),o.dispose(),l.dispose(),e.domElement.remove(),e.dispose(),pt.instance=void 0}};ee(pt,"instance");let AirBreathEngine=pt;const CAMERA={FOV:50,ASPECT_SQUARE:1,NEAR:.01,FAR:100,CAMERA_FORWARD_LIMITATION:2,MIN_FOV:.1,MAX_FOV:121,ORTHO_FOV:4,MIN_FOCUS_DISTANCE:.3,MANUAL_TRANSIT_FRAMES:30,PLAY_TRANSIT_FRAMES:90,PLAY_STAY_FRAMES:30,ALIGN_FRAMES:15,SWITCH_TYPE_FRAMES:8,TIME_RANGE:100,MOMENTUM_MAXIMUM_FRAME:30},MATH={DEG2RAD:Math.PI/180},GEOMPOOL={INDICES_NUM_LIMIT:65536,SECTION_NUM_OF_CAP_INDICES:12,SECTION_NUM_OF_SEGMENTS:4,CURVE_CLOSED_DISTANCE_THRES:.001},SCENE={FOG_NEAR_MARGIN_MULTIPLIER:.9,FOG_FAR_MARGIN_MULTIPLIER:2.2},calcDiamondSectionPoints=(n,e,t,r,a,s=!1,o=4)=>{const l=n.length,d=isPointClosed(n),c=new Vector3().copy(e[0]??new Vector3(0,1,0)),f=new Vector3,_=new Vector3,m=new Vector3,g=new Vector3,y=[],x=[];return n.forEach((u,p)=>{if(p===0)if(d){const b=l>=2?l-2:l-1;m.subVectors(n[0],n[b]).normalize(),g.subVectors(n[1],n[0]).normalize(),_.addVectors(g,m).normalize()}else _.subVectors(n[1],n[0]).normalize();else p===l-1?d?(m.subVectors(u,n[p-1]).normalize(),g.subVectors(n[1],u).normalize(),_.addVectors(g,m).normalize()):_.subVectors(u,n[p-1]).normalize():(m.subVectors(n[p],n[p-1]).normalize(),g.subVectors(n[p+1],n[p]).normalize(),_.addVectors(g,m).normalize());f.crossVectors(_,c),f.equals(new Vector3)&&f.crossVectors(_,new Vector3(1,0,0)),c.crossVectors(f,_).normalize();const M=a&&t.length===0?a(p,l,r):r,S=t[p]?t[p]:1;y.push(sectionPointsForPoint(u,c,_,S,M,o)),s&&x.push(calcDiamondSectionNormals(c,_,o))}),d&&(y[y.length-1]=y[0].map(u=>u.clone())),[y,x]},calcCubeSectionPoints=(n,e,t,r,a,s,o=!1,l=4)=>{const d=n.length,c=isPointClosed(n),f=new Vector3().copy(e[0]??new Vector3(0,1,0)),_=new Vector3,m=new Vector3,g=new Vector3,y=new Vector3,x=[],u=[];return n.forEach((p,M)=>{if(M===0)if(c){const A=d>=2?d-2:d-1;g.subVectors(n[0],n[A]).normalize(),y.subVectors(n[1],n[0]).normalize(),m.addVectors(y,g).normalize()}else m.subVectors(n[1],n[0]).normalize();else M===d-1?c?(g.subVectors(p,n[M-1]).normalize(),y.subVectors(n[1],p).normalize(),m.addVectors(y,g).normalize()):m.subVectors(p,n[M-1]).normalize():(g.subVectors(n[M],n[M-1]).normalize(),y.subVectors(n[M+1],n[M]).normalize(),m.addVectors(y,g).normalize());if(e.length<=1)_.crossVectors(m,f),_.equals(new Vector3)&&_.crossVectors(m,new Vector3(1,0,0)),f.crossVectors(_,m).normalize();else if(n.length===e.length)f.copy(e[M]);else{const A=Math.floor(M/3),T=M%3;T===0?f.copy(e[A]):f.lerpVectors(e[A],e[A+1],T/3)}f.normalize();const S=r,b=t[M]?t[M]:1;x.push(sectionPointsForCubeRatio(p,f,m,b,S,a,l)),o&&u.push(calcCubeSectionNormals(f,m,l))}),c&&(x[x.length-1]=x[0].map(p=>p.clone())),[x,u]},isPointClosed=n=>{const e=n.length;return e>=2&&n[0].distanceTo(n[e-1])<=GEOMPOOL.CURVE_CLOSED_DISTANCE_THRES},sectionPointsForPoint=(n,e,t,r,a,s=4)=>{const o=r,l=r;return new Array(s).fill(0).map((d,c)=>{const f=c%2===0?l:o,_=e.clone();return _.applyAxisAngle(t,Math.PI*2*(c/s)),_.multiplyScalar(a*f),new Vector3().addVectors(n,_)})},calcDiamondSectionNormals=(n,e,t=4)=>new Array(t).fill(0).map((r,a)=>{const s=n.clone().applyAxisAngle(e,Math.PI/4);return s.applyAxisAngle(e,Math.PI*2*(a/t)),s.normalize()}),sectionPointsForCubeRatio=(n,e,t,r,a,s,o=4)=>{const l=s*r,d=Math.sqrt(l*l+1)/Math.sqrt(s*s+1),c=a*d,f=Math.atan(l);return new Array(o).fill(0).map((_,m)=>{const g=m%2===0?-1:1,y=sectionDirectionWithAxis(e,t,f,g,m);return y.multiplyScalar(c),new Vector3().addVectors(n,y)})},calcCubeSectionNormals=(n,e,t=4)=>new Array(t).fill(0).map((r,a)=>{const s=n.clone();return s.applyAxisAngle(e,Math.PI*2*(a/t)),s.normalize()}),sectionDirectionWithAxis=(n,e,t,r,a)=>e.clone().cross(n).cross(e).normalize().clone().applyAxisAngle(e,r*t+Math.PI*(a>1?1:0)),calcWithCube=(n,e,t,r,a=!1,s=4)=>calcCubeSectionPoints(n,e,t,r,1,void 0,a,s),SLIDER_RADIUS_MIN=.0025,SLIDER_RADIUS_MAX=.15,MAKER_RADIUS_MIN=.0075,MAKER_RADIUS_MAX=.3,RIBBON_RADIUS_MIN=.0075,RIBBON_RADIUS_MAX=.3,WIDE_RADIUS_MIN=.3,WIDE_RADIUS_MAX=2.4,calcWithMarker=(n,e,t,r,a=!1,s=4)=>{const o=(r-SLIDER_RADIUS_MIN)/(SLIDER_RADIUS_MAX-SLIDER_RADIUS_MIN),l=MAKER_RADIUS_MIN+(MAKER_RADIUS_MAX-MAKER_RADIUS_MIN)*o,d=parseFloat((.0025+.0125*o).toFixed(6)),c=Math.sqrt(l*l-d*d);return calcCubeSectionPoints(n,e,t,l,c/d,void 0,a,s)},calcWithPointy=(n,e,t,r,a,s=4)=>calcDiamondSectionPoints(n,e,t,r,calcPointyRadius,a,s),calcPointyRadius=(n,e,t)=>{const r=t,a=e;return-4*r*n*(n-(a-1))/(a-1)**2},calcWithRect=(n,e,t,r,a,s=4)=>calcDiamondSectionPoints(n,e,t,r,void 0,a,s),calcWithRibbon=(n,e,t,r,a=!1,s=4)=>{const o=(r-SLIDER_RADIUS_MIN)/(SLIDER_RADIUS_MAX-SLIDER_RADIUS_MIN),l=RIBBON_RADIUS_MIN+(RIBBON_RADIUS_MAX-RIBBON_RADIUS_MIN)*o,d=parseFloat((.0025+.0125*o).toFixed(6)),c=Math.sqrt(l*l-d*d);return calcCubeSectionPoints(n,e,t,l,d/c,void 0,a,s)},calcWithWide=(n,e,t,r,a=!1,s=4)=>{const o=(r-SLIDER_RADIUS_MIN)/(SLIDER_RADIUS_MAX-SLIDER_RADIUS_MIN),l=WIDE_RADIUS_MIN+(WIDE_RADIUS_MAX-WIDE_RADIUS_MIN)*o,d=.015,c=Math.sqrt(l*l-225e-6);return calcCubeSectionPoints(n,e,t,l,c/d,void 0,a,s)},calcIndices=(n,e,t=4)=>{const r=[];for(let o=0;o<t-2;o+=1)r.push(...[0,o+2,o+1].map(l=>l+n));const a=calcIndicesOne(0,t);for(let o=0;o<e-1;o+=1){const l=n+o*4;a.forEach(d=>r.push(l+d))}const s=(e-1)*4;for(let o=0;o<t-2;o+=1)r.push(...[0,o+1,o+2].map(l=>l+n+s));return r},calcIndicesOne=(n,e=4)=>{const t=e,r=[];for(let a=0;a<t;a+=1){const s=(a+1)%t;[a,s,t+a,s,t+s,t+a].forEach(o=>r.push(n+o))}return r},calcSectionPointsAndVertexNormals=(n,e,t,r,a,s=!1,o=4)=>{switch(r){case"POINTY":return calcWithPointy(n,e,t,a,s,o);case"RECT":return calcWithRect(n,e,t,a,s,o);case"WIDEBRUSH":return calcWithWide(n,e,t,a,s,o);case"RIBBON":return calcWithRibbon(n,e,[],a,s,o);case"MARKER":return calcWithMarker(n,e,[],a,s,o);case"CUBE":return calcWithCube(n,e,t,a,s,o);default:return calcWithPointy(n,e,t,a,s,o)}},sortCurvesByMaterialKey=n=>{const e=new Map;return n.forEach(t=>{const{pressures:r,shape:a,color:s,materialStyle:o}=t,l=r.length>0&&a==="MARKER"?!0:s[3]!==1,d=getMaterialKey(o,l);let c=e.get(d);c||(c=[],e.set(d,c)),c.push(t)}),e},getPatternNumber=n=>{switch(n){case"NONE":return 0;case"DOT":return 1;case"LINE":return 2;case"CROSS":return 3;case"TERRAZZO":return 4;case"STIPPLED_DOT":return 5;default:return 0}},getMaterialKey=(n,e)=>{const{type:t}=n;if(t==="FLAT"||t==="SHADED"){const r=getPatternNumber(n.pattern);return`${t}_${e}_${r}`}return`${t}_${e}`},getMaterialInfo=n=>{const[e,t,r]=n.split("_"),a=e==="SHADED"||e==="GLOW"||e==="CUTOUT"?e:"FLAT",s=t==="true",o=r?parseInt(r):void 0;return{type:a,transparent:s,patternNumber:o}},curveFragmentShader=`
  precision highp float;

  #include <common>
  #include <packing>

  layout(location = 0) out vec4 gColor;

  varying float vDepth;
  varying vec4 vColor;

  uniform vec2 resolution;

  #ifdef USE_FOG
    uniform vec3 fogColor;
    varying float vFogDepth;
    #ifdef FOG_EXP2
      uniform float fogDensity;
    #else
      uniform float fogNear;
      uniform float fogFar;
    #endif
  #endif

  #if GLOW && RENDER
    varying float vIntensity;
  #endif

  #if PATTERN && RENDER
    uniform bool useRenderTarget;
    varying vec3 vProperties;

    vec2 rotateVector (in vec2 _st, in float angle) {
      _st = _st - vec2(0.5);
      float rad = angle * PI / 180.0;
      return vec2(
        _st.x * cos(rad) - _st.y * sin(rad) + 0.5,
        _st.x * sin(rad) + _st.y * cos(rad) + 0.5
      );
    }

    vec3 shiftRGBValue (in vec3 rgb, in float fac, in float contrast) {
      vec3 mixColor = contrast > 0.0 ? vec3(0.0) : vec3(1.0);
      return mix(rgb, mixColor, fac * abs(contrast));
    }

    #if PATTERN == 1

      float RE_Circle (in vec2 _st , in float factor) {
        float dist = length (_st - 0.5);
        return smoothstep (dist, dist + 150.0 / 1024.0 , factor);
      }

      #define RE_Calc_Pattern(st, factor) RE_Circle(st, factor);

    #elif PATTERN == 2

      float RE_Line (in vec2 _st, in float factor) {
        float dist = abs(_st.x - 0.5);
        return smoothstep (dist - 50.0 / 1024.0, dist + 50.0 / 1024.0 , factor);
      }

      #define RE_Calc_Pattern(st, factor) RE_Line(st, factor);

    #elif PATTERN == 3

      float RE_Cross (in vec2 _st, in float factor) {
        vec2 _size = vec2(0.5) - vec2(factor) * 0.5;
        vec2 uv = smoothstep(_size - vec2(50.0 / 1024.0), _size + vec2(50.0 / 1024.0), _st);
        return 1.0 - uv.x * uv.y;
      }

      #define RE_Calc_Pattern(st, factor) RE_Cross(st, factor);

    #elif PATTERN == 4

      vec2 N22(vec2 p) {
        vec3 a = fract(p.xyx*vec3(123.34, 234.34, 345.65));
        a += dot(a, a+34.45);
        return fract(vec2(a.x * a.y, a.y * a.z));
      }

      vec3 voronoiDistanceFromEdge (in vec2 uv, float dense) {

        vec2 id = floor(uv);
        vec2 gv = fract(uv);

        vec2 cellIndex = vec2(0.0);
        vec2 center = vec2(0.0);

        float minDist = 8.0;

        vec2 closestGridCell = vec2(0.0);

        float multiply = 1232.0;
        float hash = 0.0;

        for (float y = -1.0; y <= 1.0 ; y ++) {
          for (float x = -1.0; x <= 1.0 ; x ++) {
            vec2 offset = vec2(x, y);
            vec2 n = 0.5 + sin(N22(id + offset) * multiply) * 0.5;

            float d = length(offset + n - gv);
            if (d < minDist) {
              center = offset + n - gv;
              cellIndex = id + offset;
              hash = n.x;
              minDist = d;
              closestGridCell = offset;
            }
          }
        }

        float borderDist = 8.0;
        for (float y = -2.0; y <= 2.0 ; y++) {
          for (float x = -2.0; x <= 2.0 ; x++){
            vec2 offset = closestGridCell + vec2(x, y);
            vec2 n = 0.5 + sin(N22(id+offset) * multiply) * 0.5;

            vec2 r = offset + n - gv;

            if (dot(center-r, center-r) > 0.01) {
              borderDist = min(borderDist, dot(0.5*(center+r), normalize(r-center)));
            }
          }
        }

        return vec3(minDist, borderDist, hash);
      }

      float RE_Terrazzo (in vec2 _st, in float factor) {
        float bigDense = factor * 1.0;
        vec3 big = voronoiDistanceFromEdge(12.32 + 2.0 * _st, factor);

        float bigFac = 1.0 - step(bigDense, big.z);

        if (bigFac == 1.0) {
          float bigShape = smoothstep(0.05, 0.06, big.y) * bigFac * (1.0 / bigDense * big.z);
          return bigShape;
        }

        float middleDense = factor * 0.3 + 0.2;
        vec3 middle = voronoiDistanceFromEdge(12.32 + 5.0 * _st, factor);
        float middleFac = (1.0 - bigFac) * (1.0 - step(middleDense, middle.z));
        if (middleFac == 1.0) {
          float middleShape = smoothstep(0.05, 0.06, middle.y) * middleFac * (1.0 / middleDense * middle.z);
          return middleShape;
        }

        float smallDense = factor * (- 0.1) + 0.2;
        vec3 small = voronoiDistanceFromEdge(12.32 + 10.0 * _st, factor);
        float smallFac = (1.0 - bigFac) * (1.0 - middleFac) * (1.0 - step(smallDense, small.z));
        if (smallFac == 1.0) {
          float smallShape = smoothstep(0.05, 0.06, small.y) * smallFac * (1.0 / smallDense * small.z);
          return smallShape;
        }
        return 0.0;
      }

      #define RE_Calc_Pattern(st, factor) RE_Terrazzo(st, factor)

    #elif PATTERN == 5

      vec2 hash (vec2 p) {
        p = vec2 (dot (p , vec2 (127.1 , 311.7)) , dot (p , vec2 (269.5 , 183.3)));
        return fract (sin (p) * 183.5453);
      }

      vec2 voronoi (in vec2 _st) {
        vec2 n = floor(_st);
        vec2 f = fract(_st);
        vec3 m = vec3(8.0);
        for (int j = -1; j <= 1; j++) for (int i = -1; i <=1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash(n + g);
          vec2 r = g - f + o;
          float d = dot(r, r);
          if (d < m.x) {
            m = vec3(d, o);
          }
        }
        return vec2(sqrt(m.x), m.y + m.z);
      }

      float RE_StippledDot (in vec2 _st, in float factor) {
        vec2 c = voronoi(12.0 + _st);
        float size = float(0.5 + 0.5 * cos(c.y * 2.0 * PI));
        size = 0.5 + 0.5 * size;
        float fac = smoothstep(0.2 * factor * size, (0.21 + 0.09 * (factor - 0.2) / 3.05) * factor * size, c.x);
        return 1.0 - fac;
      }

      #define RE_Calc_Pattern(st, factor) RE_StippledDot(st, factor);

    #endif
  #endif

  #if SHADED && RENDER
    varying vec3 vNormalUp;
    varying vec3 vNormalSide;
    varying float vUpDown;

    uniform bool receiveShadow;
    uniform vec3 ambientLightColor;

    struct DirectionalLight {
      vec3 direction;
      vec3 color;
    };

    float stepify(float x, int n) {
      return floor((x + 1.0 / (2.0 * float(n))) * float(n)) / float(n);
    }

    float getValue(vec3 col){
      return max(max(col.r, col.g), col.b);
    }

    uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

    void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
      light.color = directionalLight.color;
      light.direction = directionalLight.direction;
      light.visible = true;
    }

    uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
    varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

    struct DirectionalLightShadow {
      float shadowIntensity;
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
    };
    uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

    float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
      return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
    }

    vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
      return unpackRGBATo2Half( texture2D( shadow, uv ) );
    }

    float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

      float occlusion = 1.0;

      vec2 distribution = texture2DDistribution( shadow, uv );

      float hard_shadow = step( compare , distribution.x ); // Hard Shadow

      if (hard_shadow != 1.0 ) {

        float distance = compare - distribution.x ;
        float variance = max( 0.00000, distribution.y * distribution.y );
        float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
        softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
        occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

      }
      return occlusion;

    }

    float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

      float shadow = 1.0;

      shadowCoord.xyz /= shadowCoord.w;
      shadowCoord.z += shadowBias;

      bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
      bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

      if ( frustumTest ) {

      #if defined( SHADOWMAP_TYPE_PCF )

        vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

        float dx0 = - texelSize.x * shadowRadius;
        float dy0 = - texelSize.y * shadowRadius;
        float dx1 = + texelSize.x * shadowRadius;
        float dy1 = + texelSize.y * shadowRadius;
        float dx2 = dx0 / 2.0;
        float dy2 = dy0 / 2.0;
        float dx3 = dx1 / 2.0;
        float dy3 = dy1 / 2.0;

        shadow = (
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
        ) * ( 1.0 / 17.0 );

      #elif defined( SHADOWMAP_TYPE_PCF_SOFT )

        vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
        float dx = texelSize.x;
        float dy = texelSize.y;

        vec2 uv = shadowCoord.xy;
        vec2 f = fract( uv * shadowMapSize + 0.5 );
        uv -= f * texelSize;

        shadow = (
          texture2DCompare( shadowMap, uv, shadowCoord.z ) +
          texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
          texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
          texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
          mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
             texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
             f.x ) +
          mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
             texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
             f.x ) +
          mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
             texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
             f.y ) +
          mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
             texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
             f.y ) +
          mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
                texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
                f.x ),
             mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
                texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
                f.x ),
             f.y )
        ) * ( 1.0 / 9.0 );

      #elif defined( SHADOWMAP_TYPE_VSM )

        shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

      #else // no percentage-closer filtering:

        shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

      #endif

      }

      return shadow;

    }
  #endif


  void main() {
    vec4 diffuseColor = vColor;
    gl_FragDepth = vDepth;
    // gUILayer = vec4( 0.0, 0.0, 0.0, 1.0 );

    #if PATTERN && RENDER
      float longest = resolution.x > resolution.y ? resolution.x : resolution.y;
      vec2 uv = gl_FragCoord.xy / resolution;

      if(!useRenderTarget) {
        float aspect = resolution.y / resolution.x ;
        if (aspect > 1.0) {
          uv.x = (uv.x - 0.5) / aspect + 0.5;
        } else {
          uv.y = (uv.y - 0.5) * aspect + 0.5;
        }
      }

      float density = vProperties.x;
      float angle = vProperties.y;
      float contrast = vProperties.z;

      float factor = 0.0;
      float pixel = 1.0;

      #if PATTERN == 1
      pixel = 12.0 + 8.0 * density;
      factor = 0.25 + 0.35 * density;
      angle += 45.0;
    #elif PATTERN == 2
      pixel = 12.0 - 6.0 * density;
      factor = 0.075 + 0.15 * density;
    #elif PATTERN == 3
      pixel = 12.0 - 6.0 * density;
      factor = 0.75 - 0.375 * density;
    #elif PATTERN == 4
      pixel = 45.0 - 15.0 * density;
      factor = 1.0 * density;
    #elif PATTERN == 5
      pixel = 100.0 + 600.0 * density;
      factor = 0.20 + 3.05 * density;
    #endif

      float scale = longest / pixel;
      vec2 st = rotateVector(uv, angle);
      #if PATTERN == 1 || PATTERN == 2 || PATTERN == 3
        st = fract(st * scale);
      #elif PATTERN == 4 || PATTERN == 5
        st = st * pixel;
      #endif

      float patternFactor = RE_Calc_Pattern(st, factor);
      diffuseColor.rgb = shiftRGBValue(diffuseColor.rgb, patternFactor, contrast);
    #endif

    #if SHADED && RENDER

      // vec3 normal = mix(vNormalUp, vNormalSide, mixFactor);
      vec3 normal = vUpDown < 0.0001 || vUpDown > 0.9999 ? vNormalUp : vNormalSide;
      ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

      IncidentLight directLight;
      DirectionalLight directionalLight;
      DirectionalLightShadow directionalLightShadow;

      directionalLight = directionalLights[0];
      getDirectionalLightInfo(directionalLight, directLight);
      directionalLightShadow = directionalLightShadows[0];
      float shadow = getShadow( directionalShadowMap[ 0 ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ 0 ] );

      #if TOON
        shadow = step(0.5, shadow);
      #endif

      float dotNL = saturate( dot(normal, directionalLight.direction) );

      #if TOON
        dotNL = stepify(dotNL, 3);
      #endif
      dotNL = dotNL * shadow;

      float dirValue = getValue(directionalLight.color);
      float dirInflu = dotNL * dirValue;
      float ambiValue = getValue(ambientLightColor * 0.5);
      float influence = dirInflu + ambiValue;
      float brightness = dirInflu / influence;

      float dirMul = saturate(dirInflu / influence);
      float ambiMul = saturate(ambiValue / influence);

      vec3 lightColor = (dirMul * directionalLight.color + ambiMul * ambientLightColor * 0.5) * 1.5 / influence;
      vec3 mixColor = diffuseColor.rgb * mix(ambientLightColor * 0.5, lightColor, brightness);
      mixColor = dotNL * directionalLight.color * diffuseColor.rgb + diffuseColor.rgb * ambientLightColor * 0.5 * ambiMul;
      mixColor = mixColor * 0.7 + diffuseColor.rgb * 0.3;

      gColor = vec4( mixColor, diffuseColor.a );
    #else
      gColor = diffuseColor;
    #endif

    #ifdef USE_FOG
      #ifdef FOG_EXP2
        float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
      #else
        float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
      #endif
      gColor.rgb = mix( gColor.rgb, fogColor, fogFactor );
    #endif

    #if RENDER
      #if GLOW
        vec3 bloomColor = gColor.rgb;
        bloomColor = mix( bloomColor, vec3(1.0, 1.0, 1.0), vIntensity);
        gColor = vec4(bloomColor, gColor.a);
      #else
      #endif
    #endif
  }
`,curveVertexShader=`
  precision highp float;

  attribute vec4 color;

  varying vec4 vColor;
  varying float vDepth;

  #include <common>

  #ifdef USE_FOG
    varying float vFogDepth;
  #endif

  #if GLOW && RENDER
    attribute float intensity;
    varying float vIntensity;
  #endif

  #if PATTERN && RENDER
    attribute vec3 properties;
    varying vec3 vProperties;
  #endif

  #if RENDER && SHADED
      attribute vec3 normalUp;
      attribute vec3 normalSide;
      attribute float upDown;

      varying vec3 vNormalUp;
      varying vec3 vNormalSide;
      varying float vUpDown;

      uniform mat4 directionalShadowMatrix[1];
      varying vec4 vDirectionalShadowCoord[1];

      struct DirectionalLightShadow {
        float shadowIntensity;
        float shadowBias;
        float shadowNormalBias;
        float shadowRadius;
        vec2 shadowMapSize;
      };

      uniform DirectionalLightShadow directionalLightShadows[1];

  #endif

  uniform float near;
  uniform float far;

  float mapRange(const in float value, const in float minVal, const in float maxVal) {
    float fac = (value - minVal) / (maxVal - minVal);
    fac = clamp(fac, 0.0, 1.0);
    return fac;
  }

  void main() {

    vec3 transformed = vec3( position );
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;

    vDepth = mapRange(abs(mvPosition.z), near, far);

    vColor = vec4( color.x/255.0, color.y/255.0, color.z/255.0, color.w/255.0 );

    #if SHADED && RENDER
      vec3 objectNormal = normalize( normalUp + normalSide );
      vec3 transformedNormal = objectNormal;
      transformedNormal = normalMatrix * transformedNormal;

      vUpDown = upDown;
      vNormalUp = normalize(normalMatrix * normalUp);
      vNormalSide = normalize(normalMatrix * normalSide);

      vec4 worldPosition = vec4( transformed, 1.0 );
      worldPosition = modelMatrix * worldPosition;

      // shadow calculation part
      vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
      vec4 shadowWorldPosition;

      shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ 0 ].shadowNormalBias, 0 );
      vDirectionalShadowCoord[ 0 ] = directionalShadowMatrix[ 0 ] * shadowWorldPosition;
    #endif

    #if GLOW && RENDER
      vIntensity = float(intensity/255.0);
    #endif

    #if PATTERN && RENDER
      vProperties = properties;
    #endif

    #ifdef USE_FOG
      vFogDepth = - mvPosition.z;
    #endif
  }
`;class CurveMaterial extends ShaderMaterial{constructor(t,r,a){super({uniforms:UniformsUtils.merge([UniformsLib.lights,UniformsLib.fog]),lights:!0,fog:!0});ee(this,"isCurveMaterial");this.uniforms.near={value:.01},this.uniforms.far={value:1e3},this.uniforms.resolution={value:new Vector2(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio)},this.uniforms.useRenderTarget={value:!1},this.vertexShader=curveVertexShader,this.fragmentShader=curveFragmentShader,this.glslVersion=GLSL3,this.lights=!0,this.isCurveMaterial=!0,this.defines.RENDER=0,this.defines.SHADED=t==="SHADED"?1:0,this.defines.TOON=0,this.defines.GLOW=t==="GLOW"?1:0,this.defines.PATTERN=t==="FLAT"||t==="SHADED"?a:0,this.side=FrontSide,this.depthTest=!0,this.depthWrite=!0,this.forceSinglePass=!0,this.fog=!0,this.transparent=r,this.customProgramCacheKey=()=>this.uuid}setRenderMode(t){this.defines.RENDER=t?1:0,this.needsUpdate=!0}setToonShading(t){this.defines.SHADED!==0&&(this.defines.TOON=t?1:0,this.needsUpdate=!0)}setNearFar(t,r){this.uniforms.near.value=t,this.uniforms.far.value=r}useRenderTarget(t){this.uniforms.useRenderTarget.value=t}resize(t,r){const a=t??window.innerWidth*window.devicePixelRatio,s=r??window.innerHeight*window.devicePixelRatio;this.uniforms.resolution.value=new Vector2(a,s)}}const cutoutFragmentShader=`
  #include <common>
  #include <packing>

  layout(location = 0) out vec4 gColor;

  uniform sampler2D background;
  uniform vec2 resolution;
  uniform vec2 aspect;

  uniform vec3 diffuse;
  uniform bool useTexture;
  uniform bool useRenderTarget;

  varying float vDepth;
  varying vec3 vViewPosition;
  varying vec4 vColor;

  #ifdef USE_FOG
    uniform vec3 fogColor;
    varying float vFogDepth;
    #ifdef FOG_EXP2
      uniform float fogDensity;
    #else
      uniform float fogNear;
      uniform float fogFar;
    #endif
  #endif

  float linearMap(const in float x, const in float inMin, const in float inMax, const in float outMin, const in float outMax) {
    return outMin + (x - inMin) * (outMax - outMin) / (inMax - inMin);
  }

  void main() {
    vec4 diffuseColor = vColor;
    gl_FragDepth = vDepth;

    #if RENDER
      if(useTexture){
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 uv2 = uv;

        float windowAspect = resolution.y / resolution.x;
        float mult = float(useRenderTarget);

        uv2.x = step(1.0, windowAspect) * ((uv.x - 0.5) / windowAspect + 0.5) + step(windowAspect, 1.0) * uv.x;
        uv2.y = step(windowAspect, 1.0) * ((uv.y - 0.5) * windowAspect + 0.5) + step(1.0, windowAspect) * uv.y;

        float x = uv.x * mult + uv2.x * (1.0 - mult);
        float y = uv.y * mult + uv2.y * (1.0 - mult);

        x = x * aspect.x + (1.0 - aspect.x) / 2.0;
        y = y * aspect.y + (1.0 - aspect.y) / 2.0;

        gColor = texture2D(background, vec2(x, y));
      } else {
        gColor = vec4(diffuse, 1.0);
      }
    #else
      gColor = vColor;
      #ifdef USE_FOG
        #ifdef FOG_EXP2
          float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
        #else
          float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
        #endif
        gColor.rgb = mix( gColor.rgb, fogColor, fogFactor );
      #endif
    #endif
  }
`,urlToTexture=(n,e)=>new Promise(t=>{new TextureLoader().load(n,r=>{resizeTexture(r,e),t(r)})}),calcResizeFactors=(n,e)=>{const t=n>e?Math.max(e,1):1/Math.min(e,1),r=n>e?1/n:1,a=n>e?1:n;return[t*r,t*a]},resizeTexture=(n,e)=>{const t=n.image.width/n.image.height;n.matrixAutoUpdate=!1;const[r,a]=calcResizeFactors(t,e);n.matrix.setUvTransform((1-r)/2,(1-a)/2,r,a,0,0,0)};class CutoutMaterial extends ShaderMaterial{constructor(t){super({uniforms:UniformsUtils.merge([UniformsLib.fog]),fog:!0});ee(this,"isCutoutMaterial");ee(this,"color");ee(this,"imageAspect");this.vertexShader=curveVertexShader,this.fragmentShader=cutoutFragmentShader,this.glslVersion=GLSL3,this.isCutoutMaterial=!0,this.defines.RENDER=0,this.defines.SHADED=0,this.defines.GLOW=0,this.defines.PATTERN=0,this.defines.CUTOUT=1,this.color=t,this.imageAspect=1,this.uniforms.background={value:null},this.uniforms.resolution={value:new Vector2(window.innerWidth*window.devicePixelRatio,window.innerHeight*window.devicePixelRatio)},this.uniforms.aspect={value:new Vector2(0,0)},this.uniforms.useTexture={value:!1},this.uniforms.useRenderTarget={value:!1},this.uniforms.diffuse={value:this.color},this.uniforms.near={value:.01},this.uniforms.far={value:1e3},this.side=FrontSide,this.depthTest=!0,this.depthWrite=!0,this.forceSinglePass=!0,this.fog=!0,this.transparent=!1,this.customProgramCacheKey=()=>this.uuid}setRenderMode(t){this.defines.RENDER=t?1:0,this.needsUpdate=!0}setBackgroundTexture(t){this.uniforms.background.value=t,this.uniforms.useTexture.value=!0;const r=t.image.width/t.image.height;this.imageAspect=r;const[a,s]=calcResizeFactors(r,1);this.uniforms.aspect.value=new Vector2(a,s)}setBackgorundColor([t,r,a]){this.color.setRGB(t/255,r/255,a/255),this.uniforms.diffuse.value=this.color,this.uniforms.useTexture.value=!1}setNearFar(t,r){this.uniforms.near.value=t,this.uniforms.far.value=r}useRenderTarget(t){this.uniforms.useRenderTarget.value=t}resize(t,r){const a=t??window.innerWidth*window.devicePixelRatio,s=r??window.innerHeight*window.devicePixelRatio;this.uniforms.resolution.value=new Vector2(a,s);const[o,l]=calcResizeFactors(this.imageAspect,a/s);this.uniforms.aspect.value=new Vector2(o,l)}}const groundFragmentShader=`
  #include <common>
  #include <packing>

  layout(location = 0) out vec4 gColor;

  varying float vDepth;

  uniform float near;
  uniform float far;

  #ifdef USE_FOG
    uniform vec3 fogColor;
    varying float vFogDepth;
    #ifdef FOG_EXP2
      uniform float fogDensity;
    #else
      uniform float fogNear;
      uniform float fogFar;
    #endif
  #endif

  #include <bsdfs>
  #include <lights_pars_begin>
  #include <shadowmap_pars_fragment>
  #include <shadowmask_pars_fragment>

  float mapRange(const in float value, const in float minVal, const in float maxVal) {
    float fac = (value - minVal) / (maxVal - minVal);
    fac = clamp(fac, 0.0, 1.0);
    return fac;
  }

  void main() {
    float shadowMask = 1.0 - getShadowMask();
    float shadow = smoothstep(0.0, 1.0, shadowMask);
    if (shadowMask < 0.01) discard;

    gl_FragDepth = vDepth;
    gColor = vec4(0.0, 0.0, 0.0, shadowMask * 0.5);

    #ifdef USE_FOG
      #ifdef FOG_EXP2
        float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
      #else
        float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
      #endif
      gColor.rgb = mix( gColor.rgb, fogColor, fogFactor );
    #endif
  }
`,groundVertexShader=`
  precision highp float;

  varying float vDepth;

  #include <common>

  #ifdef USE_FOG
    varying float vFogDepth;
  #endif

  #include <shadowmap_pars_vertex>

  uniform float near;
  uniform float far;

  float mapRange(const in float value, const in float minVal, const in float maxVal) {
    float fac = (value - minVal) / (maxVal - minVal);
    fac = clamp(fac, 0.0, 1.0);
    return fac;
  }

  void main() {

    vec3 transformed = vec3( position );
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;

    vDepth = mapRange(abs(mvPosition.z), near, far);

    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = objectNormal;
    transformedNormal = normalMatrix * transformedNormal;
    vec4 worldPosition = vec4( transformed, 1.0 );
    worldPosition = modelMatrix * worldPosition;

    #include <shadowmap_vertex>

    #ifdef USE_FOG
      vFogDepth = - mvPosition.z;
    #endif
  }
`;class GroundMaterial extends ShaderMaterial{constructor(){super({uniforms:UniformsUtils.merge([UniformsLib.lights,UniformsLib.fog]),lights:!0,fog:!0});ee(this,"isGroundMaterial");this.uniforms.near={value:.01},this.uniforms.far={value:1e3},this.vertexShader=groundVertexShader,this.fragmentShader=groundFragmentShader,this.glslVersion=GLSL3,this.isGroundMaterial=!0,this.side=DoubleSide,this.depthWrite=!0,this.depthTest=!0,this.transparent=!0,this.customProgramCacheKey=()=>this.uuid}setNearFar(t,r){this.uniforms.near.value=t,this.uniforms.far.value=r}}const uiImageFragmentShader=`
  #include <common>

  layout(location = 0) out vec4 gColor;

  uniform float opacity;
  uniform bool isSelected;

  varying float vDepth;
  varying vec2 vUv;
  uniform sampler2D map;

  void main() {
    gl_FragDepth = vDepth;

    vec4 diffuseColor = texture2D(map, vUv);
    diffuseColor.a *= opacity;

    if (diffuseColor.a < 0.01) discard;

    gColor = diffuseColor;
  }
`,uiImageVertexShader=`
  #include <common>

  varying float vDepth;
  varying vec2 vUv;

  uniform float near;
  uniform float far;

  float mapRange(const in float value, const in float minVal, const in float maxVal) {
    float fac = (value - minVal) / (maxVal - minVal);
    fac = clamp(fac, 0.0, 1.0);
    return fac;
  }

  void main() {
    vec3 transformed = vec3( position );
    vec4 mvPosition = vec4( transformed, 1.0 );
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;

    vDepth = mapRange(abs(mvPosition.z), near, far);

    vUv = vec3( uv, 1.0 ).xy;
  }
`;class UIImageMaterial extends ShaderMaterial{constructor({texture:t}){super();ee(this,"map");this.glslVersion=GLSL3,this.vertexShader=uiImageVertexShader,this.fragmentShader=uiImageFragmentShader,this.map=t,this.uniforms.opacity={value:1},this.uniforms.map={value:this.map},this.uniforms.near={value:.01},this.uniforms.far={value:1e3},this.transparent=!0,this.side=DoubleSide}setNearFar(t,r){this.uniforms.near.value=t,this.uniforms.far.value=r}setOpacity(t){this.uniforms.opacity.value=t}}const Ke=class Ke{static getMaterial(e,t,r,a=0){const s=Ke.materialsByKey.get(e);if(s)return s;const o=t!=="CUTOUT"?new CurveMaterial(t,r,a):new CutoutMaterial(new Color$1(0,0,0));return Ke.materialsByKey.set(e,o),o}static getGroundMaterial(){return Ke.groundMaterial}static createImageMaterial(e){const t=new UIImageMaterial({texture:e});return Ke.imageMaterials.add(t),t}static setRenderMode(e){Ke.materialsByKey.forEach(t=>{t.setRenderMode(e)})}static setToonShading(e){Ke.materialsByKey.forEach(t=>{t instanceof CurveMaterial&&t.setToonShading(e)})}static setBackgroundColor([e,t,r]){Ke.materialsByKey.forEach(a=>{a instanceof CutoutMaterial&&a.setBackgorundColor([e,t,r])})}static setBackground(e){Ke.materialsByKey.forEach(t=>{t instanceof CutoutMaterial&&t.setBackgroundTexture(e)})}static setUseRenderTarget(e){Ke.materialsByKey.forEach(t=>t.useRenderTarget(e))}static setNearFar(e,t){Ke.materialsByKey.forEach(r=>{r.setNearFar(e,t)}),Ke.groundMaterial.setNearFar(e,t),Ke.imageMaterials.forEach(r=>{r.setNearFar(e,t)})}static resize(e,t){Ke.materialsByKey.forEach(r=>r.resize(e,t))}static dispose(){Ke.materialsByKey.forEach(e=>{e.dispose()}),Ke.groundMaterial.dispose(),Ke.imageMaterials.forEach(e=>{e.dispose()}),Ke.materialsByKey.clear(),Ke.imageMaterials.clear()}};ee(Ke,"materialsByKey",new Map),ee(Ke,"groundMaterial",new GroundMaterial),ee(Ke,"imageMaterials",new Set);let MaterialPool=Ke;class Color{constructor(e,t,r,a){ee(this,"r");ee(this,"g");ee(this,"b");ee(this,"a");this.r=e,this.g=t,this.b=r,this.a=a}static fromString(e){const t={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00",cyan:"#00FFFF",magenta:"#FF00FF",transparent:"rgba(0, 0, 0, 0)"};if(Object.keys(t).includes(e))return Color.fromHex(t[e]);if(e.startsWith("#"))return Color.fromHex(e);const[r,a,s,o]=e.split(",").map(l=>parseInt(l,10));return Color.fromRGBA(r,a,s,o)}static fromRGBA(e,t,r,a){return new Color(e,t,r,a)}static fromHex(e){const t=e.replace("#",""),r=parseInt(t.slice(0,2),16),a=parseInt(t.slice(2,4),16),s=parseInt(t.slice(4,6),16);if(t.length===8){const o=parseInt(t.slice(6,8),16)/255;return new Color(r,a,s,o)}return new Color(r,a,s,1)}getHex(){const e=this.r.toString(16).padStart(2,"0"),t=this.g.toString(16).padStart(2,"0"),r=this.b.toString(16).padStart(2,"0"),a=Math.round(this.a*255).toString(16).padStart(2,"0");return`#${e}${t}${r}${a}`}getHexNum(){return this.r<<16|this.g<<8|this.b}getRGBA(){return`rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`}getRGBArray(){return[this.r/255,this.g/255,this.b/255]}getRGB255Array(){return[this.r,this.g,this.b]}getRGBAArray(e){return[this.r,this.g,this.b,e??1]}setAlpha(e){return new Color(this.r,this.g,this.b,e)}toString(){return this.getHex()}isBright(){return(this.r+this.g+this.b)/3>221}setFilter(e){return e(this)}}Color.fromHex("#ffffff"),Color.fromHex("#000000"),Color.fromHex("#191919"),Color.fromHex("#FBFBFF"),Color.fromHex("#F6F6FD"),Color.fromHex("#F1F1F8"),Color.fromHex("#DFDFE8"),Color.fromHex("#C6C6D0"),Color.fromHex("#A7A7B3"),Color.fromHex("#7B7B8B"),Color.fromHex("#676775"),Color.fromHex("#494954"),Color.fromHex("#282831"),Color.fromHex("#212128"),Color.fromHex("#00A86D"),Color.fromHex("#00CAF6"),Color.fromHex("#DC6060"),Color.fromHex("#CCEEE2"),Color.fromHex("#2EE5A5"),Color.fromHex("#00A86D"),Color.fromHex("#177352"),Color.fromHex("#243F35"),Color.fromHex("#F8DFDF"),Color.fromHex("#FF8A8A"),Color.fromHex("#DC6060"),Color.fromHex("#9E4646"),Color.fromHex("#4A2222"),Color.fromHex("#FD15BC"),Color.fromHex("#00EEC3"),Color.fromHex("#00D3AD"),Color.fromHex("#FFE4EA"),Color.fromHex("#FDCDD7"),Color.fromHex("#FF9FB0"),Color.fromHex("#90374D"),Color.fromHex("#682536"),Color.fromHex("#511A27"),Color.fromHex("#D7F3EC"),Color.fromHex("#B7EBDE"),Color.fromHex("#74DCBD"),Color.fromHex("#227159"),Color.fromHex("#08513F"),Color.fromHex("#124034"),Color.fromHex("#E8ECFF"),Color.fromHex("#D2D9FF"),Color.fromHex("#A9B8FF"),Color.fromHex("#3D4FAC"),Color.fromHex("#2A3988"),Color.fromHex("#1C2968"),Color.fromHex("#FF6B00"),Color.fromHex("#E8E8E8"),Color.fromHex("#BABABA"),Color.fromHex("#8A8A8A");const hsvToRgb=n=>{const{h:e,s:t,v:r}=n,a=r*t,s=e/60,o=a*(1-Math.abs(s%2-1));let l=0,d=0,c=0;s>=0&&s<=1?[l,d,c]=[a,o,0]:s>=1&&s<=2?[l,d,c]=[o,a,0]:s>=2&&s<=3?[l,d,c]=[0,a,o]:s>=3&&s<=4?[l,d,c]=[0,o,a]:s>=4&&s<=5?[l,d,c]=[o,0,a]:s>=5&&s<=6&&([l,d,c]=[a,0,o]);const f=r-a,[_,m,g]=[l+f,d+f,c+f];return{r:Math.round(255*_),g:Math.round(255*m),b:Math.round(255*g)}},rgbToHsv=n=>{const{r:e,g:t,b:r}=n,a=e/255,s=t/255,o=r/255,l=Math.max(a,s,o),d=Math.min(a,s,o),c=l-d,f=l===0?0:c/l,_=l;let m=0;return a>=l?m=(s-o)/c:s>=l?m=(o-a)/c+2:o>=l&&(m=(a-s)/c+4),m*=60,m<0&&(m+=360),c===0&&(m=0),{h:m,s:f,v:_}},changeHue=(n,e)=>{const t=rgbToHsv(n);t.h=(t.h+e*360)%360;const r=hsvToRgb(t);return[r.r,r.g,r.b]};class GroupPool{constructor(){ee(this,"sceneGroup",new Group);ee(this,"materialToGeomPool",new Map)}makeCurves(e){sortCurvesByMaterialKey(e).forEach((r,a)=>{const s=new Map,o=[];let l=0,d=0,c=0;r.forEach(m=>{const g=m.points.length,y=g*GEOMPOOL.SECTION_NUM_OF_SEGMENTS,x=(g-1)*GEOMPOOL.SECTION_NUM_OF_SEGMENTS*6+12;if(l<GEOMPOOL.INDICES_NUM_LIMIT)d+=y,l+=x;else{const u={index:c,indexLength:l,positionLength:d};o.push(u),d=y,l=x,c+=1}s.set(m.id,c)});const f={index:c,indexLength:l,positionLength:d};o.push(f);const _=o.map(m=>this.createGeom(a,m.indexLength,m.positionLength));r.forEach(m=>{const g=s.get(m.id);if(g===void 0)return;const y=_[g];y!==void 0&&this.makeCurve(y,m)}),_.forEach(m=>{m.geometry.attributes.position.needsUpdate=!0,m.geometry.attributes.color.needsUpdate=!0,m.geometry.index&&(m.geometry.index.needsUpdate=!0),m.geometry.attributes.normalUp&&(m.geometry.attributes.normalUp.needsUpdate=!0),m.geometry.attributes.normalSide&&(m.geometry.attributes.normalSide.needsUpdate=!0),m.geometry.attributes.upDown&&(m.geometry.attributes.upDown.needsUpdate=!0),m.geometry.attributes.intensity&&(m.geometry.attributes.intensity.needsUpdate=!0),m.geometry.attributes.properties&&(m.geometry.attributes.properties.needsUpdate=!0),m.geometry.computeBoundingSphere()}),this.materialToGeomPool.set(a,_)})}dispose(){this.materialToGeomPool.forEach(e=>{e.forEach(t=>t.geometry.dispose())}),this.materialToGeomPool.clear(),this.sceneGroup.clear()}createGeom(e,t,r){if(!this.sceneGroup)throw new Error("Scene is undefined");const a=getMaterialInfo(e),{type:s,transparent:o,patternNumber:l}=a,d=new BufferGeometry,c=new Float32Array(r*3),f=new Uint8Array(r*4);if(d.setAttribute("position",new BufferAttribute(c,3)),d.setAttribute("color",new BufferAttribute(f,4)),s==="SHADED"){const x=new Float32Array(r*3),u=new Float32Array(r*3),p=new Uint8Array(r*1);d.setAttribute("normalUp",new BufferAttribute(x,3)),d.setAttribute("normalSide",new BufferAttribute(u,3)),d.setAttribute("upDown",new BufferAttribute(p,1))}if((s==="FLAT"||s==="SHADED")&&l){const x=new Float32Array(r*3);d.setAttribute("properties",new BufferAttribute(x,3))}const _=new Uint16Array(t);d.setIndex(new BufferAttribute(_,1));const m=MaterialPool.getMaterial(e,s,o,l),g=new Mesh(d,m);return g.castShadow=s==="SHADED",g.receiveShadow=s==="SHADED",this.sceneGroup.add(g),{geometry:d,mesh:g,offsetAttributes:0,offsetIndex:0,curveIds:[]}}makeCurve(e,t){const{points:r,normals:a,shape:s,size:o,pressures:l,materialStyle:d}=t,c=d.type==="SHADED",f=o/2,[_,m]=calcSectionPointsAndVertexNormals(r,a,l,s,f,c);this.putAttributesToGeom(e,_,m,t)}putAttributesToGeom(e,t,r,a){var g;const{points:s,color:o,materialStyle:l,shape:d,pressures:c}=a,f=s.length;let _=0;for(let y=0;y<f;y+=1){const x=c.length>0?c[y]:1,u=d!=="RIBBON"?[o[0],o[1],o[2]]:changeHue({r:o[0],g:o[1],b:o[2]},x),p=d!=="MARKER"?o[3]:o[3]*x;for(let M=0;M<GEOMPOOL.SECTION_NUM_OF_SEGMENTS;M+=1){const S=e.offsetAttributes+_;if(e.geometry.attributes.position.setXYZ(S,t[y][M].x,t[y][M].y,t[y][M].z),e.geometry.attributes.color.setXYZW(S,u[0],u[1],u[2],Math.round(p*255)),e.geometry.attributes.normalUp&&e.geometry.attributes.normalSide&&e.geometry.attributes.upDown){e.geometry.attributes.upDown.setX(S,M<2?0:1);const b=M<2?0:2,A=M===0||M===3?3:1;e.geometry.attributes.normalUp.setXYZ(S,r[y][b].x,r[y][b].y,r[y][b].z),e.geometry.attributes.normalSide.setXYZ(S,r[y][A].x,r[y][A].y,r[y][A].z)}e.geometry.attributes.properties&&(l.type==="FLAT"||l.type==="SHADED")&&l.pattern&&l.pattern!=="NONE"&&e.geometry.attributes.properties.setXYZ(S,l.density,l.rotation,l.contrast),_+=1}}const m=calcIndices(e.offsetAttributes,f,GEOMPOOL.SECTION_NUM_OF_SEGMENTS);for(let y=0;y<m.length;y+=1)(g=e.geometry.index)==null||g.setX(e.offsetIndex+y,m[y]);e.offsetAttributes+=_,e.offsetIndex+=m.length,e.curveIds.push(a.id),e.geometry.setDrawRange(0,e.offsetIndex)}}class GeomPool{static get(e,t){var a;let r=this.groups.get(e);if(!r){r=new GroupPool,r.sceneGroup.name=e;const s=t?(a=this.groups.get(t))==null?void 0:a.sceneGroup:this.rootGroup;if(s===void 0)throw new Error("Parent not exist");s.add(r.sceneGroup),this.groups.set(e,r)}return r}static addToScene(e,t="GeomPool"){this.rootGroup.name=t,e.add(this.rootGroup)}static dispose(){this.groups.forEach(e=>e.dispose()),this.groups.clear(),this.rootGroup.clear()}}ee(GeomPool,"rootGroup",new Group),ee(GeomPool,"groups",new Map);const mt=class mt{constructor(){ee(this,"scene");ee(this,"rootGroup");ee(this,"_isFogOn");ee(this,"_backgroundColor");ee(this,"_backgroundTexture");return this.scene=new Scene,this.scene.name="scene",this.rootGroup=new Group,this.rootGroup.name="scene_rootGroup",this._isFogOn=!1,this._backgroundColor=new Color$1(1,1,1),this}static get(){return this.instance||(this.instance=new mt),this.instance}set fog(e){this._isFogOn=e}set backgroundColor(e){const[t,r,a]=e;this._backgroundColor.setRGB(t/255,r/255,a/255),this.scene.background=this._backgroundColor}get backgroundColor(){const{r:e,g:t,b:r}=this._backgroundColor;return[e*255,t*255,r*255]}set backgroundTexture(e){this._backgroundTexture=e,e&&(this.scene.background=e)}get backgroundTexture(){return this._backgroundTexture}updateFogByNearFar(e,t){if(!this._isFogOn)return;const[r,a,s]=this.backgroundColor,o=new Fog(new Color$1(r/255,a/255,s/255),e,t);this.scene.fog=o}dispose(){var e;this.scene.clear(),this.rootGroup.clear(),(e=this._backgroundTexture)==null||e.dispose(),mt.instance=void 0}};ee(mt,"instance");let GalleryScene=mt;const createAmibientLight=n=>{const e=new AmbientLight(7369090,1);return e.visible=!1,n.add(e),e},createDirectionalLight=n=>{const e=new DirectionalLight(16774899,2);e.position.applyAxisAngle(new Vector3(0,1,0),329.71),e.position.applyAxisAngle(new Vector3(0,0,1),37.991),e.position.multiplyScalar(1),e.castShadow=!0,e.intensity=1,e.shadow.mapSize.width=window.innerWidth*window.devicePixelRatio,e.shadow.mapSize.height=window.innerWidth*window.devicePixelRatio,e.shadow.camera.near=.1,e.shadow.camera.far=60,e.shadow.blurSamples=4;const t=30;return e.shadow.camera.left=-t,e.shadow.camera.right=t,e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.bias=-.001,e.visible=!1,n.add(e),e},createGround=n=>{const e=new PlaneGeometry(300,300,50,50).lookAt(new Vector3(0,1,0)),t=MaterialPool.getGroundMaterial(),r=new Mesh(e,t);return r.receiveShadow=!0,r.visible=!0,n.add(r),r},gt=class gt{constructor(){ee(this,"lightGroup");ee(this,"ambient");ee(this,"directional");ee(this,"ground");ee(this,"target");return this.lightGroup=new Group,this.lightGroup.name="light_group",this.lightGroup.visible=!0,this.ambient=createAmibientLight(this.lightGroup),this.ambient.visible=!0,this.directional=createDirectionalLight(this.lightGroup),this.directional.visible=!0,this.target=new Points(new BufferGeometry().setFromPoints([new Vector3(0,0,0)])),this.target.visible=!1,this.directional.target=this.target,this.lightGroup.add(this.target),this}static get(){return this.instance||(this.instance=new gt),this.instance}addToScene(e,t="Light"){this.lightGroup.name=t,e.add(this.lightGroup)}set groundShadow(e){e&&!this.ground&&(this.ground=createGround(this.lightGroup))}set ambientLight(e){const[t,r,a]=e;this.ambient.color.setRGB(t/255,r/255,a/255)}setDirectionalLight(e,t){const[r,a,s]=e.color;this.directional.color.setRGB(r/255,a/255,s/255),this.directional.intensity=e.intensity;const{center:o,radius:l}=t,[d,c]=e.direction,f=d*Math.PI/180,_=-c*Math.PI/180,m=new Vector3(Math.sin(_)*Math.sin(f),Math.cos(_),Math.sin(_)*Math.cos(f)).normalize(),g=m.clone().negate().normalize(),y=0,x=l;this.directional.shadow.camera.left=-x,this.directional.shadow.camera.right=x,this.directional.shadow.camera.top=x,this.directional.shadow.camera.bottom=-x,m.multiplyScalar(l).add(o);const u=this.ground?(m.y-y+x)/Math.abs(g.dot(new Vector3(0,1,0))):0;this.directional.position.copy(m),this.directional.target.position.copy(m.clone().add(g)),this.directional.shadow.camera.near=.01,this.directional.shadow.camera.far=Math.max(l*2,u),this.directional.shadow.camera.updateProjectionMatrix()}dispose(){this.ambient.dispose(),this.directional.dispose(),this.ground&&this.ground.geometry.dispose(),this.lightGroup.clear(),gt.instance=void 0}};ee(gt,"instance");let Light=gt;const vt=class vt{constructor(){ee(this,"boundingBox");return this.boundingBox=new Box3,this}static get(){return this.instance||(this.instance=new vt),this.instance}addPoints(e){e.forEach(t=>{this.boundingBox.min.min(t),this.boundingBox.max.max(t)})}dispose(){vt.instance=void 0}get boundingSphere(){const e=new Sphere;this.boundingBox.getBoundingSphere(e);const t=new Sphere(new Vector3(0,0,0),1);return e.union(t)}};ee(vt,"instance");let BoundingBox=vt;const Y_AXIS=new Vector3(0,1,0),worldCoordToDeviceCoord=(n,e)=>n.clone().project(e),deviceCoordToWorldCoord=(n,e)=>n.clone().unproject(e),calcNewPositionByFov=(n,e,t,r,a)=>{const o=new Vector3().subVectors(t,n).dot(e),l=(1-Math.tan(r/2*MATH.DEG2RAD)/Math.tan(a/2*MATH.DEG2RAD))*o;return n.clone().add(e.multiplyScalar(l))},calcNearFar=(n,e,t,r=1,a=1)=>{const s=t.center.clone(),o=t.radius,l=n.clone(),d=e.clone();d.normalize();const f=new Vector3().subVectors(s,l).dot(d),_=f-o*r,m=f+o*a;return{near:_,far:m}},calcCameraDetails=n=>{const t=new Vector3().subVectors(n.focus,n.position).dot(n.rotation.dir),r=new Vector3().addVectors(n.position,n.rotation.dir.clone().normalize().multiplyScalar(t)),a=Math.tan(n.fov/2*MATH.DEG2RAD)*t;return{type:n.type,position:n.position,rotation:{dir:n.rotation.dir.clone().normalize(),up:n.rotation.up.clone().normalize(),right:n.rotation.right.clone().normalize()},focus:n.focus,fov:n.fov,center:r,posToCenterDist:t,focusPlaneHalfLength:a}},calcBezierInterpolation=(n,e=new Vector2(.42,0),t=new Vector2(.58,1))=>{const r=new Vector2(0,0),a=new Vector2(1,1),l=new CubicBezierCurve(r,e,t,a).getPoints(1e3-1);let d=-1,c=-1;for(let m=0;m<l.length;m+=1)if(l[m].x<=n&&(d=m),l[m].x>=n&&c===-1){c=m;break}if(d===c)return l[d].y;const f=l[d],_=l[c];return(_.y-f.y)/(_.x-f.x)*(n-f.x)+f.y},calcRightDirDiff=(n,e)=>{const t=calcSignedAngle3d(n.rotation.right,e.rotation.right,Y_AXIS),r=e.rotation.dir.clone().applyAxisAngle(Y_AXIS,-t),a=calcSignedAngle3d(n.rotation.dir,r,n.rotation.right);return{rightThetaDiff:t,dirPhiDiff:a,dirThetaDiff:t}},calcInterpolateNumbers=(n,e,t)=>t<=0?n:t>=1?e:n+(e-n)*t,calcInterpolateVectors=(n,e,t)=>{if(t<=0)return n;if(t>=1)return e;const r=new Vector3,a=new Vector3;a.subVectors(e,n);const s=new Vector3;return s.copy(a),s.multiplyScalar(t),r.addVectors(n,s),r},calcSignedAngle3d=(n,e,t)=>{const r=new Vector3,a=new Vector3;r.copy(n),a.copy(e);let s=r.angleTo(a);const o=new Vector3;return o.crossVectors(r,a),o.dot(t)<0&&(s=-s),s},camParamsToCamTransform=n=>{const e=new Vector3().crossVectors(n.direction,n.up).normalize(),t=new Vector3().crossVectors(e,n.direction).normalize();return{type:n.mode,position:n.position.clone(),rotation:{dir:n.direction.clone(),up:t,right:e},fov:(n.mode==="persp",n.fov),focus:n.focus.clone()}},_t=class _t{constructor(){ee(this,"mode");ee(this,"isTemp");ee(this,"isFocusLocked");ee(this,"camPosition");ee(this,"camRotation");ee(this,"camFocus");ee(this,"fov");ee(this,"perspectiveCamera");ee(this,"orthographicCamera");ee(this,"animationId");ee(this,"momentumAnimationId");ee(this,"momentumArray");ee(this,"w");ee(this,"h");ee(this,"orbitSphere");ee(this,"_boundingSphere");ee(this,"renderFunc");ee(this,"fogNear");this.mode="persp",this.isTemp=!1,this.isFocusLocked=!1,this.camPosition=new Vector3(0,0,0),this.camFocus=new Vector3(0,0,0),this.camRotation={dir:new Vector3(1,0,0),up:new Vector3(0,1,0),right:new Vector3(0,0,1).negate()},this.perspectiveCamera=new PerspectiveCamera,this.perspectiveCamera.name="perspCamera",this.perspectiveCamera.layers.enable(1),this.orthographicCamera=new OrthographicCamera,this.orthographicCamera.name="orthoCamera",this.orthographicCamera.layers.enable(1),this.momentumArray=[],this.fov=this.perspectiveCamera.fov,this.w=window.innerWidth,this.h=window.innerHeight,this.fogNear=0,this.orbitSphere=new Sphere,this._boundingSphere=new Sphere}static get shared(){return this.instance||(this.instance=new _t),this.instance}get current(){return this.mode==="ortho"?this.orthographicCamera:this.perspectiveCamera}get nearFar(){return{near:this.current.near,far:this.current.far,fogNear:this.fogNear}}get focus(){return this.camFocus.clone()}set render(e){this.renderFunc=e}set boundingSphere(e){this._boundingSphere=e.clone(),this.orbitSphere=new Sphere(e.center,e.radius+CAMERA.NEAR)}get cameraTransform(){return{type:this.mode,position:this.camPosition.clone(),rotation:{dir:this.camRotation.dir.clone(),up:this.camRotation.up.clone(),right:this.camRotation.right.clone()},fov:this.fov,focus:this.camFocus.clone()}}get camToFocus(){return new Vector3().subVectors(this.camFocus,this.camPosition)}get rotationMatrix(){const e=this.camRotation.right.clone(),t=this.camRotation.up.clone(),r=this.camRotation.dir.clone().negate();return new Matrix4().makeBasis(e,t,r)}get worldHeight(){if(this.mode==="ortho")return 2*this.orthographicCamera.right;const{near:e,fov:t}=this.perspectiveCamera;return 2*e*Math.tan(t/2*MATH.DEG2RAD)}get max(){return Math.max(this.w,this.h)}get multiplier(){if(this.mode==="ortho")return 1;const e=worldCoordToDeviceCoord(this.camFocus,this.perspectiveCamera);e.setZ(-1);const t=deviceCoordToWorldCoord(e,this.perspectiveCamera),r=this.perspectiveCamera.position.clone(),a=r.distanceTo(this.camFocus),s=r.distanceTo(t);return Math.max(a/s,.05)}resize(e,t){this.w=e,this.h=t}loads({type:e,position:t,direction:r,up:a,fov:s,focus:o}){this.mode=e,this.camPosition=new Vector3().fromArray(t),this.fov=s,this.perspectiveCamera.fov=s,o&&(this.camFocus=new Vector3().fromArray(o));const l=new Vector3().fromArray(r),d=new Vector3().fromArray(a),c=new Vector3().crossVectors(l,d);this.camRotation={dir:l,up:d,right:c}}loadAnimation(){const e=this.camFocus.clone(),t=this.camPosition.clone(),r=this.camRotation.up.clone(),a=Math.abs(r.dot(new Vector3(0,1,0)));let s=1,o=0,l=0;const d=36,c=Math.PI*2*(45/360)/d*(a*.7+.3),_=t.distanceTo(e)*.2/d;this.tumble(-c*d,0,!0),this.translate(0,0,-_*d,!1,!0);const m=()=>{var g;if(s<=d){requestAnimationFrame(m);const y=calcBezierInterpolation(s/d,new Vector2(0,0),new Vector2(0,1))*d,x=y*c,u=y*_;this.tumble(x-o,0,!0),this.translate(0,0,u-l,!1,!0),o=x,l=u,s+=1}(g=this.renderFunc)==null||g.call(this)};m()}switchCamModeWithAnimation(e){const t=performance.now(),r=e/60*1e3,a=this.mode==="ortho"?CAMERA.MIN_FOV:this.fov,s=this.mode==="ortho"?this.fov:CAMERA.MIN_FOV,o=this.mode==="ortho"?"persp":"ortho";this.isTemp=!1;const l=d=>{var m;const c=d-t,f=Math.min(Math.max(0,c/r),1),_=calcBezierInterpolation(f,new Vector2(.42,0),new Vector2(.58,1));if(f<1){requestAnimationFrame(l),this.mode="persp";const g=(s-a)*_+a;this.perspectiveCamera.fov=g}else this.perspectiveCamera.fov=this.fov,this.mode=o;(m=this.renderFunc)==null||m.call(this)};requestAnimationFrame(l)}changeFov(e){if(this.mode==="ortho")return;const t=this.fov,r=Math.min(Math.max(CAMERA.MIN_FOV,t+e),CAMERA.MAX_FOV),a=this.camRotation.dir.clone(),s=this.camPosition.clone(),o=this.camFocus.clone(),l=calcNewPositionByFov(s,a,o,t,r);this.camPosition.copy(l),this.fov=r,this.perspectiveCamera.fov=r}align(){const e=this.camPosition.clone(),t=this.camRotation.dir.clone(),r=this.camRotation.up.clone();let a,s;const o=new Vector3(1,0,0),l=o.clone().negate(),d=new Vector3(0,1,0),c=d.clone().negate(),f=new Vector3(0,0,1),_=f.clone().negate(),m=[o,l,d,c,f,_];let g=Number.POSITIVE_INFINITY;for(let T=0;T<m.length;T+=1){const E=t.angleTo(m[T]);E<g&&(g=E,a=m[T])}if(!a)return;if(!a.equals(d)&&!a.equals(c))s=d;else{const T=[o,l,f,_];let E=Number.POSITIVE_INFINITY;for(let B=0;B<T.length;B+=1){const P=r.angleTo(T[B]);P<E&&(E=P,s=T[B])}}if(!s)return;const y=this.camFocus.clone(),u=new Vector3().subVectors(y,e).dot(t),p=a.clone().multiplyScalar(u),M=new Vector3().subVectors(y,p),S=new Vector3().crossVectors(a,s).normalize(),b={type:this.mode,position:this.camPosition.clone(),rotation:{dir:this.camRotation.dir.clone(),up:this.camRotation.up.clone(),right:this.camRotation.right.clone()},focus:this.camFocus.clone(),fov:this.fov},A={type:"ortho",position:M,rotation:{dir:a,up:s,right:S},focus:y,fov:this.fov};this.animateCamera(b,A,CAMERA.ALIGN_FRAMES,b.type!=="ortho")}setCamFocus(e){if(this.mode==="persp"){this.camFocus.copy(e);return}const t=this.camPosition.clone(),r=this.camRotation.dir.clone().normalize(),s=new Vector3().subVectors(this.camFocus,t).dot(r),d=new Vector3().subVectors(e,t).dot(r)-s,c=t.clone().addScaledVector(r,d);this.camPosition.copy(c),this.camFocus.copy(e)}tumble(e,t,r){const a=this.camToFocus.clone(),s=this.camRotation.dir.clone(),o=this.camRotation.up.clone(),l=this.camRotation.right.clone(),d=a.dot(s),c=a.dot(o),f=a.dot(l);this.rotateByAxis(new Vector3(0,1,0),e),this.rotateByAxis(this.camRotation.right,t);const _=this.camRotation.dir.clone(),m=this.camRotation.up.clone(),g=this.camRotation.right.clone(),y=new Vector3().addScaledVector(g,f).addScaledVector(m,c).addScaledVector(_,d),x=this.camFocus.clone().sub(y);this.camPosition.copy(x),this.isTemp&&(this.isTemp=!1,this.switchCamModeWithAnimation(CAMERA.SWITCH_TYPE_FRAMES)),r||this.addMomentum(e,t,"TUMBLE")}dolly(e){const t=this.worldHeight,r=-e/this.max*t/Math.tan(this.fov*MATH.DEG2RAD/2)*this.multiplier;this.camPosition.add(this.camRotation.dir.clone().negate().multiplyScalar(r))}translate(e,t,r,a,s){const o=this.camPosition.clone(),l=this.camFocus.clone(),d=this.worldHeight,c=a?e/this.max*d*this.multiplier:e,f=a?t/this.max*d*this.multiplier:t,_=1/this.max*d/Math.tan(this.fov*MATH.DEG2RAD/2)*this.multiplier,m=a?1.5*_:1.5,g=new Vector3().addVectors(this.camRotation.right.clone().multiplyScalar(-c),this.camRotation.up.clone().multiplyScalar(f)).add(this.camRotation.dir.clone().multiplyScalar(r*m)),y=new Vector3().subVectors(l,o),x=new Vector3,u=new Vector3;if(this.isFocusLocked)x.copy(y),u.copy(l);else{x.copy(y).normalize();const S=y.length()-m*r;x.multiplyScalar(S);const b=o.clone().add(g);u.addVectors(b,x)}const p=Math.tan(this.fov/2*MATH.DEG2RAD)*x.length(),M=x.dot(y);(p>=200||M<0)&&r<0||(p<=.1||M<0)&&r>0||(this.camPosition.add(g),this.camFocus=u,s||this.addMomentum(c,f,"PAN"))}animateMomentum(){const e=Date.now();let t=0,r=0,a=0;if(this.momentumArray.forEach((c,f)=>{e-c.time>CAMERA.TIME_RANGE||(t+=c.deltaX,r+=c.deltaY,f!==this.momentumArray.length-1?a+=this.momentumArray[f+1].time-c.time:a+=e-c.time)}),a===0)return;let s=t/a*100/6,o=r/a*100/6;if(Math.abs(s)<.2&&(s=0),Math.abs(o)<.2&&(o=0),s===0&&o===0)return;let l=1;const d=()=>{var c;if(l<CAMERA.MOMENTUM_MAXIMUM_FRAME){this.momentumAnimationId=requestAnimationFrame(d);const f=(1-l/CAMERA.MOMENTUM_MAXIMUM_FRAME)**4;this.momentumArray[0].type==="TUMBLE"?this.tumble(s*f,o*f,!0):this.translate(s*f,o*f,0,!1,!0),l+=1}else this.momentumArray=[],this.momentumAnimationId=void 0;(c=this.renderFunc)==null||c.call(this)};d()}animateCameraByShot(e,t,r,a){const s=e?camParamsToCamTransform(e):this.cameraTransform,o=camParamsToCamTransform(t);this.animateCamera(s,o,r,!1,a)}transitCamera(e,t,r){var m;const a=camParamsToCamTransform(e),s=camParamsToCamTransform(t),o=calcBezierInterpolation(r,new Vector2(.42,0),new Vector2(.58,1)),l=calcCameraDetails(a),d=calcCameraDetails(s),{rightThetaDiff:c,dirPhiDiff:f,dirThetaDiff:_}=calcRightDirDiff(l,d);this.interpolateCameraByStep(o,l,d,c,f,_),(m=this.renderFunc)==null||m.call(this)}cancelAnimation(){this.animationId&&cancelAnimationFrame(this.animationId),this.animationId=void 0}cancelMomentumAnimation(){this.momentumAnimationId&&cancelAnimationFrame(this.momentumAnimationId),this.momentumAnimationId=void 0}addMomentum(e,t,r){const a=Date.now();for(;this.momentumArray.length>0&&!(a-this.momentumArray[0].time<=CAMERA.TIME_RANGE&&r===this.momentumArray[0].type);)this.momentumArray.shift();this.momentumArray.push({type:r,time:a,deltaX:e,deltaY:t})}animateCamera(e,t,r,a,s){const o=performance.now(),l=r/60*1e3,d=calcCameraDetails(e),c=calcCameraDetails(t),{rightThetaDiff:f,dirPhiDiff:_,dirThetaDiff:m}=calcRightDirDiff(d,c),g=y=>{var p;const x=y-o,u=Math.min(Math.max(0,x/l),1);if(u<1){this.animationId=requestAnimationFrame(g),e.type!=="ortho"&&t.type!=="ortho"&&!a&&(this.mode="persp");const M=calcBezierInterpolation(u,new Vector2(.42,0),new Vector2(.58,1));this.interpolateCameraByStep(M,d,c,f,_,m,a)}else this.animationId=void 0,this.setCameraByTransform(t),a&&(this.isTemp=!0),s==null||s();(p=this.renderFunc)==null||p.call(this)};requestAnimationFrame(g),e.type==="persp"&&t.type==="ortho"&&a&&this.switchCamModeWithAnimation(r)}interpolateCameraByStep(e,t,r,a,s,o,l){const d=new Vector3(0,1,0),{type:c,rotation:f,focus:_,fov:m,posToCenterDist:g,center:y,focusPlaneHalfLength:x}=t,{type:u,focus:p,fov:M,posToCenterDist:S,center:b,focusPlaneHalfLength:A}=r,T=calcInterpolateVectors(_,p,e),E=calcInterpolateNumbers(g,S,e),B=calcInterpolateNumbers(x,A,e),P=calcInterpolateNumbers(0,s,e),C=calcInterpolateNumbers(0,o,e),I=f.dir.clone().applyAxisAngle(f.right,P).applyAxisAngle(d,C).normalize(),N=calcInterpolateNumbers(0,a,e),D=f.right.clone().applyAxisAngle(d,N).normalize(),V=new Vector3().crossVectors(D,I).normalize(),R=calcInterpolateVectors(y,b,e),$=new Vector3().subVectors(T,R).dot(I.clone().negate()),W=I.clone().multiplyScalar($),J=new Vector3().subVectors(R,W),j=new Vector3,ie=new Vector3().copy(J).add(I.clone().negate().multiplyScalar(E)),ae=new Vector3().subVectors(J,ie),he=Math.atan(B/ae.length())/(2*Math.PI)*360*2;let z=m;if(c==="persp"&&u==="ortho"&&!l){const X=calcInterpolateNumbers(m,CAMERA.MIN_FOV,e),re=B/Math.tan(X/2*MATH.DEG2RAD),Y=new Vector3().addVectors(J,I.clone().negate().multiplyScalar(re));j.copy(Y),z=X}else if(c==="ortho"&&u==="persp"){const X=calcInterpolateNumbers(CAMERA.MIN_FOV,M,e),re=B/Math.tan(X/2*MATH.DEG2RAD),Y=new Vector3().addVectors(J,I.clone().negate().multiplyScalar(re));j.copy(Y),z=X}else l?(j.copy(ie),z=m):(j.copy(ie),z=he);this.setCameraByTransform({type:c==="ortho"&&u==="ortho"?"ortho":"persp",position:j,rotation:{dir:I,up:V,right:D},fov:z,focus:T},l)}setCameraByTransform(e,t){this.mode=e.type,t||(this.fov=e.fov,this.perspectiveCamera.fov=e.fov),this.camPosition.copy(e.position),this.camRotation={dir:e.rotation.dir.clone(),up:e.rotation.up.clone(),right:e.rotation.right.clone()},this.camFocus=e.focus.clone()}updateCamera(){this.updateRotation(),this.updatePosition(),this.updateFrustum(),this.updateMatrix()}updatePosition(){this.updatePerspectiveCameraPosition(),this.updateOrthographicCameraPosition()}updatePerspectiveCameraPosition(){if(this.fov===this.perspectiveCamera.fov)this.perspectiveCamera.position.copy(this.camPosition);else{const e=this.camRotation.dir.clone(),t=this.camPosition.clone(),r=this.camFocus.clone(),a=calcNewPositionByFov(t,e,r,this.fov,this.perspectiveCamera.fov);this.perspectiveCamera.position.copy(a)}}updateOrthographicCameraPosition(){const e=this.camPosition.clone(),t=this.camRotation.dir.clone(),r=new Vector3().subVectors(this.orbitSphere.center,e),a=new Vector3().addVectors(e,t);if(this.orbitSphere.containsPoint(e)){const s=new Vector3().subVectors(e,a),o=new Vector3;if(this.orbitSphere.containsPoint(a)){const l=new Vector3;o.copy(a),new Raycaster(o,s).ray.intersectSphere(this.orbitSphere,l),this.orthographicCamera.position.copy(l)}else{const l=new Vector3().copy(t).negate(),d=new Vector3().copy(l).multiplyScalar(2*Math.abs(this.orbitSphere.radius)),c=new Vector3().addVectors(e,d);this.orthographicCamera.position.copy(c)}}else if(r.angleTo(t)/Math.PI>.5){const s=new Vector3().copy(t).negate(),o=r.dot(s),l=new Vector3().copy(s).multiplyScalar(o+this.orbitSphere.radius),d=new Vector3().addVectors(e,l);this.orthographicCamera.position.copy(d)}else this.orthographicCamera.position.copy(e)}updateRotation(){const e=this.rotationMatrix;this.perspectiveCamera.setRotationFromMatrix(e),this.orthographicCamera.setRotationFromMatrix(e)}updateFrustum(){this.updateOrthographicFrustum(),this.updateNearFar()}updateNearFar(){const{near:e,far:t}=calcNearFar(this.current.position,this.camRotation.dir,this._boundingSphere,SCENE.FOG_NEAR_MARGIN_MULTIPLIER,SCENE.FOG_FAR_MARGIN_MULTIPLIER);this.current.near=Math.max(e,.001),this.current.far=t,this.fogNear=e}updateOrthographicFrustum(){const e=this.camRotation.dir.clone(),t=this.camToFocus,r=Math.tan(this.fov*MATH.DEG2RAD/2)*t.dot(e);this.orthographicCamera.left=-r,this.orthographicCamera.right=r,this.orthographicCamera.top=r,this.orthographicCamera.bottom=-r}updateMatrix(){this.perspectiveCamera.updateMatrix(),this.orthographicCamera.updateMatrix(),this.perspectiveCamera.updateMatrixWorld(!0),this.orthographicCamera.updateMatrixWorld(!0),this.perspectiveCamera.updateProjectionMatrix(),this.orthographicCamera.updateProjectionMatrix()}rotateByAxis(e,t){this.camRotation.right.equals(e)||this.camRotation.right.applyAxisAngle(e,t).normalize(),this.camRotation.up.equals(e)||this.camRotation.up.applyAxisAngle(e,t).normalize(),this.camRotation.dir.equals(e)||this.camRotation.dir.applyAxisAngle(e,t).normalize()}dispose(){this.perspectiveCamera.clear(),this.orthographicCamera.clear(),this.cancelAnimation(),this.cancelMomentumAnimation(),this.renderFunc=void 0,_t.instance=void 0}};ee(_t,"instance");let Camera=_t;class GestureEvent extends CustomEvent{constructor(t){super("gestureEvent",{bubbles:!0,composed:!0,detail:t});ee(this,"gestureEventType");this.gestureEventType=t.eventType}}const calcDiffXY=(n,e)=>({deltaX:e.clientX-n.clientX,deltaY:e.clientY-n.clientY}),calcDistanceSq=(n,e)=>(e.clientX-n.clientX)**2+(e.clientY-n.clientY)**2,averagePointer=n=>{const e={clientX:0,clientY:0};if(n.length===0)return e;const t=n.reduce((r,{clientX:a,clientY:s})=>(r.clientX+=a,r.clientY+=s,r),e);return{clientX:t.clientX/n.length,clientY:t.clientY/n.length}},deltaDistance=(n,e)=>{if(!n||!e||n.length<2||e.length<2)return 0;const t=Math.sqrt(calcDistanceSq(n[0],e[0]));return Math.sqrt(calcDistanceSq(n[1],e[1]))-t};class Timer{constructor(e){ee(this,"privateStartTime");ee(this,"privateEndTime");this.privateStartTime=(e==null?void 0:e.started)??0,this.privateEndTime=(e==null?void 0:e.ended)??0}get started(){return this.privateStartTime}get ended(){return this.privateEndTime}start(){if(this.started!==0)return!1;const e=Date.now();return this.privateStartTime=e,this.privateEndTime=e,!0}end(){return this.started===0?!1:(this.privateEndTime=Date.now(),!0)}clear(){this.privateStartTime=0,this.privateEndTime=0}}class Recorder{constructor(e){ee(this,"Timer");ee(this,"pointerMap");ee(this,"startPointerId");ee(this,"currPointerId");ee(this,"endPointerId");ee(this,"hoverArray");this.pointerMap=new Map(e==null?void 0:e.pointerMap),this.Timer=new Timer(e==null?void 0:e.Timer),this.startPointerId=new Set(e==null?void 0:e.startPointerId),this.currPointerId=new Set(e==null?void 0:e.currPointerId),this.endPointerId=new Set(e==null?void 0:e.endPointerId),this.hoverArray=e!=null&&e.hoverArray?[...e.hoverArray]:[]}set(e){this.pointerMap.size===0&&this.Timer.start();const t=this.pointerMap.get(e.pointerId);t?t.push(e):this.pointerMap.set(e.pointerId,[e]),this.startPointerId.add(e.pointerId),this.currPointerId.add(e.pointerId)}up(e){var t;(t=this.pointerMap.get(e.pointerId))==null||t.push(e),this.currPointerId.delete(e.pointerId),this.endPointerId.add(e.pointerId),this.currPointerId.size===0&&this.Timer.end()}hover(e){this.hoverArray.push(e)}clear(){this.pointerMap.clear(),this.Timer.clear(),this.startPointerId.clear(),this.currPointerId.clear(),this.endPointerId.clear(),this.hoverArray=[]}getByPointerId(e){return this.pointerMap.get(e)}getRawDataById(e){const t=new Map;for(const r of e)if(this.pointerMap.has(r)){const a=this.pointerMap.get(r);a&&t.set(r,a)}return t}getRawPointerMap(){return this.pointerMap}get startPointerIdSet(){return this.startPointerId}get currPointers(){const e=[];return this.currPointerId.forEach(t=>{const r=this.getByPointerId(t);r&&e.push(r[r.length-1])}),e}get startPointers(){return Array.from(this.startPointerId).map(e=>{const t=this.getByPointerId(e);return t?t[0]:null}).filter(e=>e!==null)}get endPointers(){return Array.from(this.endPointerId).map(e=>{const t=this.getByPointerId(e);return t?t[t.length-1]:null}).filter(e=>e!==null)}get startPointerIdArray(){return Array.from(this.startPointerId)}get currPointerIdArray(){return Array.from(this.currPointerId)}get endPointerIdArray(){return Array.from(this.endPointerId)}get endTime(){return this.Timer.ended}get startTime(){return this.Timer.started}get average(){var r;const e={clientX:0,clientY:0};if(!this.currPointers||((r=this.currPointers)==null?void 0:r.length)===0)return e;const t=this.currPointers.reduce((a,{clientX:s,clientY:o})=>(a.clientX+=s,a.clientY+=o,a),e);return{clientX:t.clientX/this.currPointers.length,clientY:t.clientY/this.currPointers.length}}}const touchDefaultOption={dragThreshold:3,oneTapThreshold:10,oneTapInterval:300,doubleTapThreshold:70,doubleTapInterval:500,longPressDuration:300,longPressThreshold:30},penDefaultOptions={oneTapThreshold:10,oneTapInterval:300,doubleTapThreshold:70,doubleTapInterval:500,longPressThreshold:30,longPressDuration:300,tiltUnit:1,pressureUnit:1e-4},mouseDefaultOptions={oneTapThreshold:10,oneTapInterval:300,doubleTapThreshold:70,doubleTapInterval:500,longPressThreshold:30,longPressDuration:300,tiltUnit:1,pressureUnit:1e-4};class Emitter{constructor(e,t,r,a){ee(this,"target");ee(this,"longpressTimer");ee(this,"recorder");ee(this,"prevRecroder");ee(this,"registedLongpressPointer",null);ee(this,"touchOptions");ee(this,"penOptions");ee(this,"mouseOptions");ee(this,"clearLongpress",()=>{this.longpressTimer&&(clearTimeout(this.longpressTimer),this.registedLongpressPointer=null,this.longpressTimer=null)});this.target=e,this.longpressTimer=null,this.touchOptions={...touchDefaultOption,...t},this.penOptions={...penDefaultOptions,...r},this.mouseOptions={...mouseDefaultOptions,...a},this.recorder=new Recorder,this.prevRecroder=null}getOption(e,t){switch(e){case"pen":if(t in this.penOptions)return this.penOptions[t];case"touch":if(t in this.touchOptions)return this.touchOptions[t];case"mouse":if(t in this.mouseOptions)return this.mouseOptions[t]}}registLongpress(){var a;this.clearLongpress();const e=this.recorder.currPointers[this.recorder.currPointers.length-1]??null,t=this.getOption(e.pointerType,"longPressThreshold")||30,r=this.getOption(e.pointerType,"longPressDuration")||500;this.recorder.currPointers&&((a=this.recorder.currPointers)==null?void 0:a.length)===1&&(this.longpressTimer=setTimeout(()=>{if(!this.recorder.currPointers)return;const s=longPress({recorder:this.recorder,registedLongpressPointer:e,threshold:t});s&&this.target.dispatchEvent(s)},r))}emitDownEvent(e){this.clearLongpress(),this.recorder.set(e);const t=down(this.recorder);t&&this.target.dispatchEvent(t),this.registLongpress()}emitMoveEvent(e){const t=hover(this.recorder,e);t&&this.target.dispatchEvent(t);const r=move(this.recorder,e);r&&(this.target.dispatchEvent(r),this.clearLongpress(),this.registLongpress())}emitUpEvent(e){var r;this.clearLongpress(),this.recorder.up(e);const t=upAndEnd(this.recorder,e);if(t&&this.target.dispatchEvent(t),this.recorder.currPointers&&((r=this.recorder.currPointers)==null?void 0:r.length)===0){const a=this.prevRecroder&&doubleTap({previousRecorder:this.prevRecroder,currentRecorder:this.recorder,threshold:this.getOption(e.pointerType,"doubleTapThreshold")??70,interval:this.getOption(e.pointerType,"doubleTapInterval")??300});if(a)this.target.dispatchEvent(a),this.prevRecroder=null;else{const s=tap({recorder:this.recorder,threshold:this.getOption(e.pointerType,"oneTapThreshold")??10,interval:this.getOption(e.pointerType,"oneTapInterval")??300});s&&(this.target.dispatchEvent(s),this.prevRecroder=new Recorder(this.recorder))}this.recorder.clear()}}}const down=n=>{const e=n.currPointers;if(!e||e.length===0)return;let t;const r={currPointer:e,currRawData:n.getRawDataById(n.currPointerIdArray)};return e.length===1&&(e[0].pointerType==="mouse"?t=new GestureEvent({eventType:"mouseDown",...r}):e[0].pointerType==="pen"?t=new GestureEvent({eventType:"penDownGesture",...r}):e[0].pointerType==="touch"&&(t=new GestureEvent({eventType:"oneFingerDownGesture",...r}))),e.length===2&&e[0].pointerType==="touch"&&(t=new GestureEvent({eventType:"twoFingerDownGesture",...r})),e.length===3&&(t=new GestureEvent({eventType:"threeFingerDownGesture",...r})),t},move=(n,e)=>{const t=n.currPointers;if(!t||t.length===0||!n.startPointerIdSet.has(e.pointerId))return;const r=n.average;n.set(e);const a=n.average,s={currPointer:t,currRawData:n.getRawDataById(n.currPointerIdArray),diff:calcDiffXY(r,a)};let o;if(t[0].pointerType==="mouse"&&(o=new GestureEvent({eventType:"mouseMove",...s})),t[0].pointerType==="pen"&&(o=new GestureEvent({eventType:"penMoveGesture",...s})),t[0].pointerType==="touch")switch(t.length){case 1:o=new GestureEvent({eventType:"oneFingerMoveGesture",...s});break;case 2:o=new GestureEvent({eventType:"twoFingerMoveGesture",...s});break;case 3:o=new GestureEvent({eventType:"threeFingerMoveGesture",...s});break}return o},hover=(n,e)=>{if(n.startPointerIdArray.length===0)return n.hover(e),new GestureEvent({eventType:"pointerHover",currPointer:[e],currRawData:new Map(n.getRawDataById([e.pointerId]))})},upAndEnd=(n,e)=>{const t=n.currPointers,r=n.getRawDataById(n.currPointerIdArray),a=n.endPointers;if(!(!a||a.length===0)){if(a[0].pointerType==="mouse"&&t.length===0)return new GestureEvent({eventType:"mouseUp",currPointer:[e],currRawData:r});if(a[0].pointerType==="pen"&&t.length===0)return new GestureEvent({currPointer:[e],eventType:"penUpGesture",currRawData:new Map(n.getRawPointerMap())});if(a[0].pointerType==="touch"){if(t.length===0)return new GestureEvent({eventType:"oneFingerEndGesture",currPointer:[e],currRawData:new Map(n.getRawPointerMap())});if(t.length===1)return new GestureEvent({eventType:"twoFingerEndGesture",currPointer:t,currRawData:new Map(n.getRawPointerMap())});if(t.length===2)return new GestureEvent({eventType:"threeFingerEndGesture",currPointer:t,currRawData:new Map(n.getRawPointerMap())})}}},tap=({recorder:n,threshold:e,interval:t})=>{const r=n.endPointers,a=n.startPointers;if(!r||(a==null?void 0:a.length)!==(r==null?void 0:r.length)||n.endTime-n.startTime>t)return;const s=averagePointer(n.startPointers),o=averagePointer(n.endPointers);if(calcDistanceSq(s,o)>e**2)return;const d={currPointer:n.endPointers,currRawData:new Map(n.getRawPointerMap())};let c;return r.length===1&&(r[0].pointerType==="mouse"&&(c=new GestureEvent({eventType:"mouseClick",...d})),r[0].pointerType==="pen"&&(c=new GestureEvent({eventType:"penTapGesture",...d})),r[0].pointerType==="touch"&&(c=new GestureEvent({eventType:"oneFingerTapGesture",...d}))),r.length===2&&(c=new GestureEvent({eventType:"twoFingerTapGesture",...d})),r.length===3&&(c=new GestureEvent({eventType:"threeFingerTapGesture",...d})),c},doubleTap=({previousRecorder:n,currentRecorder:e,threshold:t,interval:r})=>{if(e.currPointerIdArray.length!==0||e.endTime-n.startTime>r||e.startPointerIdArray.length!==e.endPointerIdArray.length||n.endPointerIdArray.length!==e.endPointerIdArray.length)return;const a=averagePointer(e.endPointers),s=averagePointer(n.endPointers);if(calcDistanceSq(a,s)>t**2)return;let l;const d={currPointer:e.endPointers,currRawData:new Map(e.getRawPointerMap()),prevRawData:new Map(n.getRawPointerMap())};return e.endPointers&&e.endPointers[0].pointerType==="mouse"&&(l=new GestureEvent({eventType:"mouseDoubleClick",...d})),e.endPointers&&e.endPointers[0].pointerType==="pen"&&(l=new GestureEvent({eventType:"penDoubleTapGesture",...d})),e.endPointers&&e.endPointers[0].pointerType==="touch"&&(e.endPointerIdArray.length===1&&(l=new GestureEvent({eventType:"oneFingerDoubleTapGesture",...d})),e.endPointerIdArray.length===2&&(l=new GestureEvent({eventType:"twoFingerDoubleTapGesture",...d})),e.endPointerIdArray.length===3&&(l=new GestureEvent({eventType:"threeFingerDoubleTapGesture",...d}))),l},longPress=({recorder:n,registedLongpressPointer:e,threshold:t})=>{const r=n.currPointers;if(!r||r.length===0||n.startPointerIdArray.length!==1||!e)return;const a=r[0];if(calcDistanceSq(a,e)>t**2)return;let o="mouseLongpress";return a.pointerType==="mouse"?o="mouseLongpress":a.pointerType==="pen"?o="penLongPressGesture":a.pointerType==="touch"&&(o="oneFingerLongPressGesture"),new GestureEvent({eventType:o,currPointer:r,currRawData:n.getRawDataById(n.currPointerIdArray)})};class EManager{constructor(e,t){ee(this,"listeningElm");ee(this,"Emitter");ee(this,"mouse",!1);ee(this,"pen",!1);ee(this,"touch",!1);ee(this,"preventEvent",e=>{e.preventDefault()});ee(this,"onPointerDown",e=>{e.preventDefault();const r=e.composedPath()[0];e.isTrusted&&r instanceof HTMLElement&&r.setPointerCapture(e.pointerId),this.Emitter.emitDownEvent(e)});ee(this,"onPointerMove",e=>{e.preventDefault(),this.Emitter.emitMoveEvent(e)});ee(this,"onPointerUp",e=>{const{pointerId:t}=e;e.preventDefault();const a=e.composedPath()[0];e.isTrusted&&a instanceof HTMLElement&&a.releasePointerCapture(t),this.Emitter.emitUpEvent(e)});this.listeningElm=e,this.Emitter=new Emitter(e,t==null?void 0:t.touch,t==null?void 0:t.pen,t==null?void 0:t.mouse)}attach(){this.listeningElm.addEventListener("touchstart",this.preventEvent),this.listeningElm.addEventListener("pointerdown",this.onPointerDown),this.listeningElm.addEventListener("pointermove",this.onPointerMove),this.listeningElm.addEventListener("pointerup",this.onPointerUp),this.listeningElm.addEventListener("pointercancel",this.onPointerUp),this.listeningElm.addEventListener("contextmenu",e=>e.preventDefault())}detach(){this.listeningElm.removeEventListener("touchstart",this.preventEvent),this.listeningElm.removeEventListener("pointerdown",this.onPointerDown),this.listeningElm.removeEventListener("pointermove",this.onPointerMove),this.listeningElm.removeEventListener("pointerup",this.onPointerUp),this.listeningElm.removeEventListener("pointercancel",this.onPointerUp)}}const bt=class bt{constructor(){ee(this,"resourceGroup");ee(this,"textureLoader");ee(this,"imageMeshes");this.resourceGroup=new Group,this.resourceGroup.name="resource_group",this.resourceGroup.visible=!0,this.textureLoader=new TextureLoader,this.imageMeshes=[]}static get(){return this.instance||(this.instance=new bt),this.instance}addToScene(e){e.add(this.resourceGroup)}async addImageFromUrl(e,t,r){return new Promise((a,s)=>{this.textureLoader.load(e,o=>{const l=o.image,d=l.height/l.width,c=MaterialPool.createImageMaterial(o),f=new PlaneGeometry(3,3*d,50,50),_=new Mesh(f,c);if(t){const m=new Matrix4().fromArray(t);_.applyMatrix4(m),_.updateMatrixWorld()}r!==void 0&&c.setOpacity(r),_.geometry.computeBoundingBox(),this.resourceGroup.add(_),this.imageMeshes.push(_),a()},void 0,o=>{s(o)})})}getPoints(){return this.imageMeshes.map(t=>{var a;const r=(a=t.geometry.boundingBox)==null?void 0:a.clone();return r?(r.applyMatrix4(t.matrixWorld),[r.min,r.max]):[new Vector3(0,0,0),new Vector3(0,0,0)]})}dispose(){this.imageMeshes.forEach(e=>{e.geometry.dispose()}),this.resourceGroup.clear()}};ee(bt,"instance");let Resources=bt;class KeyEvent extends CustomEvent{constructor(t,r){super(t,{bubbles:!0,composed:!0,...r});ee(this,"keyEventType");this.keyEventType=t}}const doubleTapInterval=300,lonpressInterval=300;function areKeySetsEqual(n,e){if(n.length!==e.length)return!1;const t=[...n].sort(),r=[...e].sort();return t.every((a,s)=>a===r[s])}const dt=class dt{constructor(){ee(this,"listening",!1);ee(this,"lastTapFired",0);ee(this,"lastDownFired",0);ee(this,"lastDownedKey",[]);ee(this,"lastTappedKeys",[]);ee(this,"downedKeys",new Set);ee(this,"tapStartTime",0);ee(this,"tapEndTime",0);ee(this,"modifiers",{ctrl:!1,shift:!1,alt:!1,meta:!1,space:!1});ee(this,"advancedKeyMapper");ee(this,"handleKeyDown",e=>{const t=e.key.toLowerCase();this.downedKeys.has(t)||(this.downedKeys.add(t),this.updateModifiers(e),this.downedKeys.size===1&&(this.tapStartTime=Date.now()),setTimeout(()=>{this.dispatchCustomEvent("keyLongPress",this.lastDownedKey)},lonpressInterval),this.lastDownedKey=Array.from(this.downedKeys))});ee(this,"handleKeyUp",e=>{const t=e.key.toLowerCase();this.advancedKeyMapper&&this.advancedKeyMapper(e),this.downedKeys.delete(t),this.updateModifiers(e),setTimeout(()=>{this.downedKeys.size===0&&this.handleAllKeysReleased()},0)})}static getInstance(){return dt.instance||(dt.instance=new dt),dt.instance}startListening(){this.listening||(window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),this.listening=!0)}stopListening(){this.listening&&(window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),this.listening=!1)}isListening(){return this.listening}handleAllKeysReleased(){this.tapEndTime=Date.now();const e=this.tapEndTime-this.tapStartTime,t=Date.now(),r=areKeySetsEqual(this.lastTappedKeys,this.lastDownedKey),a=e<=doubleTapInterval;r&&a&&t-this.lastTapFired<=doubleTapInterval?(this.dispatchCustomEvent("keyDoubleTap",this.lastDownedKey),this.lastTapFired=0,this.lastTappedKeys=[]):a&&(this.lastTappedKeys=[...this.lastDownedKey],this.lastTapFired=t),this.lastDownedKey=[]}updateModifiers(e){this.modifiers.ctrl=e.ctrlKey,this.modifiers.shift=e.shiftKey,this.modifiers.alt=e.altKey,this.modifiers.meta=e.metaKey,this.modifiers.space=this.downedKeys.has(" ")}dispatchCustomEvent(e,t){const r=new KeyEvent(e,{detail:{keys:t,modifiers:{...this.modifiers}}});window.dispatchEvent(r)}};ee(dt,"instance");let userInputKey=dt;const keyInstacne=userInputKey.getInstance(),xt=class xt{constructor(){ee(this,"_camera");ee(this,"shots");this.shots=[]}static get shared(){return this.instance||(this.instance=new xt),this.instance}set camera(e){this._camera=e}initShots(e){e.forEach(t=>{const r=new Vector3().fromArray(t.camera.position),a=new Vector3().fromArray(t.camera.direction),s=new Vector3().fromArray(t.camera.up),o=new Vector3().fromArray(t.camera.focus),l={mode:t.camera.type,position:r,direction:a,up:s,fov:t.camera.fov,focus:o};this.shots.push(l)})}animateToIndex(e,t,r){if(!this._camera)return;const a=t?t/1e3*60:CAMERA.MANUAL_TRANSIT_FRAMES,s=this.shots[e];this._camera.animateCameraByShot(void 0,s,a,r)}animateBetweenIndex(e,t,r,a){if(!this._camera)return;const s=this.shots[e],o=this.shots[t];if(!s||!o)return;const l=r/1e3*60;this._camera.animateCameraByShot(s,o,l,a)}moveToHandlePosition(e){if(!this._camera)return;const t=Math.floor(e),r=t>=this.shots.length-1?0:t+1,a=e-t;this._camera.transitCamera(this.shots[t],this.shots[r],a)}cancelAnimation(){this._camera&&this._camera.cancelAnimation()}dispose(){this._camera=void 0,this.shots=[],xt.instance=void 0}};ee(xt,"instance");let Sequence=xt;const _sfc_main$h=defineComponent({__name:"NoteView",props:{initialized:{type:Boolean}},emits:["cancelAnimation","canvasTapped"],setup(n,{emit:e}){const t=e,r=n,a=ref(),s=ref();let o;const l=ref({visible:!1,x:0,y:0});let d=null;const c=async(R,F)=>{if(!a.value)return;const $=a.value.getBoundingClientRect(),W=R-$.left,J=F-$.top;l.value.visible=!1,l.value.x=W,l.value.y=J,await nextTick(),l.value.visible=!0,d!==null&&window.clearTimeout(d),d=window.setTimeout(()=>{l.value.visible=!1,d=null},600)},f=()=>{if(!a.value||!o)return;const R=window.devicePixelRatio||1,F=a.value.clientWidth*R,$=a.value.clientHeight*R;if(o.renderEngine.resize(F,$),o.camera.resize(a.value.clientWidth,a.value.clientHeight),MaterialPool.resize(F,$),o.galleryScene.backgroundTexture){const W=a.value?a.value.clientWidth/a.value.clientHeight:1;resizeTexture(o.galleryScene.backgroundTexture,W)}_()},_=()=>{o&&(m(),o.renderEngine.render(o.galleryScene.scene,o.camera.current))},m=()=>{if(!o)return;o.camera.updateCamera();const{near:R,far:F,fogNear:$}=o.camera.nearFar;o.galleryScene.updateFogByNearFar($,F),MaterialPool.setNearFar(R,F)},g=()=>{if(o)if(o.isRenderRunning){if(!o.timerId)return;clearTimeout(o.timerId);const R=setTimeout(()=>{o&&(o.loopId&&cancelAnimationFrame(o.loopId),_(),o.isRenderRunning=!1)},200);o.timerId=R}else{o.isRenderRunning=!0;const R=()=>{if(!o)return;_();const $=requestAnimationFrame(R);o.loopId=$};R();const F=setTimeout(()=>{o&&(o.loopId&&cancelAnimationFrame(o.loopId),o.isRenderRunning=!1)},200);o.timerId=F}},y=()=>{var re;const R=s.value;if(!R)return;let F=!1;const $=2,W=keyInstacne;W.startListening();const J=GalleryScene.get();GeomPool.addToScene(J.scene),Resources.get().addToScene(J.scene);const j=AirBreathEngine.get(R),ie=Camera.shared;ie.resize(R.clientWidth,R.clientHeight),ie.render=g;const ae=BoundingBox.get();o={isRenderRunning:!1,galleryScene:J,renderEngine:j,camera:ie,boundingBox:ae,disposes:[]},f(),new EManager(R).attach();let z=null;const X=250;(re=a.value)==null||re.addEventListener("gestureEvent",Y=>{var de,fe,Te;switch(Y.detail.eventType){case"pointerHover":break;case"fingerGestureEnter":break;case"oneFingerLongPressGesture":{if(F)break;const{currPointer:Pe}=Y.detail;if(!Pe||!Pe[0])break;const{clientX:ve,clientY:Le}=Pe[0];D(ve,Le);break}case"oneFingerDownGesture":F=!1,ie.cancelMomentumAnimation();break;case"oneFingerMoveGesture":{const{diff:Pe}=Y.detail;if(!Pe)return;(Math.abs(Pe.deltaX)>$||Math.abs(Pe.deltaY)>$)&&(F=!0),t("cancelAnimation");const ve=Pe.deltaX*-.005,Le=Pe.deltaY*-.005;ie.tumble(ve,Le),g();break}case"oneFingerEndGesture":F=!1,ie.animateMomentum();break;case"oneFingerTapGesture":z&&clearTimeout(z),z=setTimeout(()=>{t("canvasTapped"),z=null},X);break;case"oneFingerDoubleTapGesture":{t("cancelAnimation"),z&&(clearTimeout(z),z=null),ie.align(),g();break}case"twoFingerDownGesture":break;case"twoFingerMoveGesture":{const{diff:Pe}=Y.detail;if(!Pe)return;t("cancelAnimation");const ve=Y.detail.currPointer[0].pointerId,Le=Y.detail.currPointer[1].pointerId,Ie=(de=Y.detail.currRawData.get(ve))==null?void 0:de.slice(-2),Re=(fe=Y.detail.currRawData.get(Le))==null?void 0:fe.slice(-2),Oe=deltaDistance(Ie,Re);ie.translate(Pe.deltaX,Pe.deltaY,Oe,!0,!1),g();break}case"twoFingerEndGesture":break;case"twoFingerTapGesture":break;case"twoFingerDoubleTapGesture":break;case"threeFingerDownGesture":break;case"threeFingerMoveGesture":{const{diff:Pe}=Y.detail;if(!Pe)return;t("cancelAnimation");const ve=Pe.deltaY*.15;ie.changeFov(ve),g();break}case"threeFingerEndGesture":break;case"threeFingerTapGesture":break;case"threeFingerDoubleTapGesture":{t("cancelAnimation"),ie.switchCamModeWithAnimation(CAMERA.SWITCH_TYPE_FRAMES),g();break}case"fingerGestureQuit":break;case"penDownGesture":ie.cancelMomentumAnimation();break;case"penMoveGesture":const{diff:O}=Y.detail;if(!O)return;t("cancelAnimation");const Ae=O.deltaX*-.005,Fe=O.deltaY*-.005;ie.tumble(Ae,Fe),g();break;case"penUpGesture":break;case"penTapGesture":break;case"penDoubleTapGesture":break;case"penLongPressGesture":break;case"mouseDown":F=!1,ie.cancelMomentumAnimation();break;case"mouseLongpress":{if(F)break;const{currPointer:Pe}=Y.detail;if(!Pe||!Pe[0])break;const{clientX:ve,clientY:Le}=Pe[0];D(ve,Le);break}case"mouseMove":{const{currPointer:Pe,diff:ve}=Y.detail;if(!ve)return;(Math.abs(ve.deltaX)>$||Math.abs(ve.deltaY)>$)&&(F=!0),t("cancelAnimation");const{buttons:Le}=Pe[0],{ctrl:Ie,meta:Re,space:Oe}=W.modifiers;switch(P(Le,Ie||Re,Oe)){case"rotate":const L=ve.deltaX*-.005,te=ve.deltaY*-.005;ie.tumble(L,te),g();break;case"pan":ie.translate(ve.deltaX,ve.deltaY,0,!0,!1),g();break;case"zoom":ie.dolly(ve.deltaY*2),g();break;case"fov":ie.changeFov(ve.deltaY),g();break}break}case"mouseUp":F=!1,ie.animateMomentum();break;case"mouseClick":z&&clearTimeout(z),z=setTimeout(()=>{t("canvasTapped"),z=null},X);break;case"mouseDoubleClick":{z&&(clearTimeout(z),z=null);const Pe=(Te=Y.detail.prevRawData)==null?void 0:Te.get(1);if(!Pe)return;const ve=Pe[Pe.length-1].button,Le=Y.detail.currPointer[0].button;if(ve!==Le)return;switch(t("cancelAnimation"),ve){case 0:ie.align(),g();break;case 2:ie.switchCamModeWithAnimation(CAMERA.SWITCH_TYPE_FRAMES),g();break}break}}}),o.disposes.push(()=>j.dispose()),o.disposes.push(()=>J.dispose()),o.disposes.push(()=>ae.dispose())},x=R=>{o&&(R.preventDefault(),R.stopImmediatePropagation(),t("cancelAnimation"),o.camera.dolly(R.deltaY*.5),g())},u=async()=>{if(!o)return;const{stage:R}=BookNote.store,{backgroundColor:F,backplate:$,fog:W}=R;if(o.galleryScene.backgroundColor=F,o.galleryScene.fog=W,$!=null&&$.visibility){const J=await BookNote.shared.getResourceUrl($.path),j=a.value?a.value.clientWidth/a.value.clientHeight:1,ie=await urlToTexture(J,j);o.galleryScene.backgroundTexture=ie}},p=async()=>{if(!o)return;const R=BookNote.shared.getCameras()[0],{type:F,position:$,direction:W,up:J,fov:j,focus:ie}=R;o.camera.loads({type:F,position:$,direction:W,up:J,fov:j,focus:ie});const ae=o.boundingBox.boundingSphere;o.camera.boundingSphere=ae,o.disposes.push(()=>o==null?void 0:o.camera.dispose())},M=async()=>{o&&(o.disposes.push(()=>Sequence.shared.dispose()),Sequence.shared.camera=o.camera,Sequence.shared.initShots(BookNote.store.shots))},S=async()=>{o&&(o.disposes.push(()=>GeomPool.dispose()),BookNote.shared.getCurveGroupsWithCurves().forEach(({id:R,curves:F,visibility:$})=>{$&&(GeomPool.get(R).makeCurves(F),F.forEach(W=>{o==null||o.boundingBox.addPoints(W.points)}))}))},b=async()=>{if(o){if(BookNote.store.stageProps.length>0){const R=Resources.get();o.resources=R,o.disposes.push(()=>{var F;return(F=o==null?void 0:o.resources)==null?void 0:F.dispose()})}await Promise.all(BookNote.store.stageProps.map(async R=>{var $;if(R.type!=="resource"||R.resourceType!=="image")return;const F=await BookNote.shared.getResourceUrl(R.resourcePath);await(($=o==null?void 0:o.resources)==null?void 0:$.addImageFromUrl(F,R.matrix,R.opacity))})).then(()=>{var F;const R=(F=o==null?void 0:o.resources)==null?void 0:F.getPoints();R&&R.forEach($=>o==null?void 0:o.boundingBox.addPoints($))})}},A=async()=>{if(!o)return;o.disposes.push(()=>MaterialPool.dispose());const{stage:R}=BookNote.store;o.renderEngine.setRenderModeOn(R.render),MaterialPool.setRenderMode(R.render),R.render&&(o.galleryScene.backgroundTexture?MaterialPool.setBackground(o.galleryScene.backgroundTexture):MaterialPool.setBackgroundColor(o.galleryScene.backgroundColor),R.light.toonShading&&MaterialPool.setToonShading(R.light.toonShading))},T=async()=>{if(!o)return;const{stage:R}=BookNote.store,{render:F}=R;o.renderEngine.setRenderModeOn(F)},E=async()=>{if(!o)return;const{stage:R}=BookNote.store;if(R.render){const F=Light.get();F.groundShadow=R.light.groundShadow,F.ambientLight=o.galleryScene.backgroundColor,F.setDirectionalLight(R.light.directional,o.boundingBox.boundingSphere),F.addToScene(o.galleryScene.scene),o.light=F,o.disposes.push(()=>{var $;return($=o==null?void 0:o.light)==null?void 0:$.dispose()})}},B=async()=>{o&&Promise.all([u()]).then(()=>{S(),b()}).then(()=>{A(),T(),E()}).then(()=>{p()}).then(()=>{M(),f()}).then(()=>{o==null||o.camera.loadAnimation()})},P=(R,F,$)=>R===4?"pan":R===2?"fov":R===1?$?"pan":F?"zoom":"rotate":"default";watch(()=>r.initialized,async R=>{R&&(await B(),g())});const C=()=>{if(!a.value)return null;const R=a.value.getBoundingClientRect(),F=Math.max(R.width,R.height),$=R.left+(R.width-F)/2,W=R.top+(R.height-F)/2;return{left:$,top:W,width:F,height:F}},I=new Raycaster;I.params={Mesh:{threshold:.075},Line:{threshold:.075},Line2:{threshold:5*window.devicePixelRatio},LOD:{threshold:.075},Points:{threshold:.075},Sprite:{threshold:.075}};const N=new Vector2,D=(R,F)=>{if(!o||!a.value)return;const $=C();if(!$)return;const{left:W,top:J,width:j,height:ie}=$;N.x=(R-W)/j*2-1,N.y=-((F-J)/ie)*2+1,I.setFromCamera(N,o.camera.current);const ae=I.intersectObjects(o.galleryScene.scene.children,!0);if(!ae.length)return;const z=ae[0].point.clone();o.camera.setCamFocus(z),c(R,F),g()};let V;return onMounted(()=>{y(),V=new ResizeObserver(()=>{f()}),V.observe(a.value)}),onBeforeUnmount(()=>{o&&([...o.disposes].reverse().forEach(R=>{R()}),o=void 0),V==null||V.disconnect(),V=void 0,d!==null&&(window.clearTimeout(d),d=null)}),(R,F)=>(openBlock(),createElementBlock("div",{ref_key:"containerEl",ref:a,onWheel:x,class:"relative size-full bg-fgray-1050"},[createBaseVNode("canvas",{ref_key:"canvasEl",ref:s,class:"size-full"},null,512),l.value.visible?(openBlock(),createElementBlock("div",{key:0,class:"pointer-events-none absolute",style:normalizeStyle({left:l.value.x+"px",top:l.value.y+"px",transform:"translate(-50%, -50%)"})},F[0]||(F[0]=[createBaseVNode("div",{class:"w-16 h-16 rounded-full border-[30px] border-fgray-500 border-opacity-50 mix-blend-multiply force-gpu-accel will-change-[transform,opacity] pointer-events-none animate-focus-ring-ping"},null,-1)]),4)):createCommentVNode("",!0)],544))}}),NoteView=_export_sfc(_sfc_main$h,[["__scopeId","data-v-1c210a81"]]);var lottie_svg_min={exports:{}};(function(module){typeof navigator<"u"&&function(n,e){module.exports?module.exports=e(n):(n.lottie=e(n),n.bodymovin=n.lottie)}(window||{},function(window){var svgNS="http://www.w3.org/2000/svg",locationHref="",initialDefaultFrame=-999999,subframeEnabled=!0,expressionsPlugin,bm_pow=Math.pow,bm_sqrt=Math.sqrt,bm_floor=Math.floor,bm_min=Math.min,BMMath={};function ProjectInterface(){return{}}(function(){for(var n=["abs","acos","acosh","asin","asinh","atan","atanh","atan2","ceil","cbrt","expm1","clz32","cos","cosh","exp","floor","fround","hypot","imul","log","log1p","log2","log10","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc","E","LN10","LN2","LOG10E","LOG2E","PI","SQRT1_2","SQRT2"],e=n.length,t=0;t<e;t+=1)BMMath[n[t]]=Math[n[t]]})(),BMMath.random=Math.random,BMMath.abs=function(n){if(typeof n=="object"&&n.length){for(var e=createSizedArray(n.length),t=n.length,r=0;r<t;r+=1)e[r]=Math.abs(n[r]);return e}return Math.abs(n)};var defaultCurveSegments=150,degToRads=Math.PI/180,roundCorner=.5519;function BMEnterFrameEvent(n,e,t,r){this.type=n,this.currentTime=e,this.totalTime=t,this.direction=r<0?-1:1}function BMCompleteEvent(n,e){this.type=n,this.direction=e<0?-1:1}function BMCompleteLoopEvent(n,e,t,r){this.type=n,this.currentLoop=t,this.totalLoops=e,this.direction=r<0?-1:1}function BMSegmentStartEvent(n,e,t){this.type=n,this.firstFrame=e,this.totalFrames=t}function BMDestroyEvent(n,e){this.type=n,this.target=e}function BMRenderFrameErrorEvent(n,e){this.type="renderFrameError",this.nativeError=n,this.currentTime=e}function BMConfigErrorEvent(n){this.type="configError",this.nativeError=n}var createElementID=(G=0,function(){return"__lottie_element_"+ ++G}),G;function HSVtoRGB(n,e,t){var r,a,s,o=Math.floor(6*n),l=6*n-o,d=t*(1-e),c=t*(1-l*e),f=t*(1-(1-l)*e);switch(o%6){case 0:r=t,a=f,s=d;break;case 1:r=c,a=t,s=d;break;case 2:r=d,a=t,s=f;break;case 3:r=d,a=c,s=t;break;case 4:r=f,a=d,s=t;break;case 5:r=t,a=d,s=c}return[r,a,s]}function RGBtoHSV(n,e,t){var r,a=Math.max(n,e,t),s=Math.min(n,e,t),o=a-s,l=a===0?0:o/a,d=a/255;switch(a){case s:r=0;break;case n:r=e-t+o*(e<t?6:0),r/=6*o;break;case e:r=t-n+2*o,r/=6*o;break;case t:r=n-e+4*o,r/=6*o}return[r,l,d]}function addSaturationToRGB(n,e){var t=RGBtoHSV(255*n[0],255*n[1],255*n[2]);return t[1]+=e,1<t[1]?t[1]=1:t[1]<=0&&(t[1]=0),HSVtoRGB(t[0],t[1],t[2])}function addBrightnessToRGB(n,e){var t=RGBtoHSV(255*n[0],255*n[1],255*n[2]);return t[2]+=e,1<t[2]?t[2]=1:t[2]<0&&(t[2]=0),HSVtoRGB(t[0],t[1],t[2])}function addHueToRGB(n,e){var t=RGBtoHSV(255*n[0],255*n[1],255*n[2]);return t[0]+=e/360,1<t[0]?--t[0]:t[0]<0&&(t[0]+=1),HSVtoRGB(t[0],t[1],t[2])}var rgbToHex=function(){for(var n,e=[],t=0;t<256;t+=1)n=t.toString(16),e[t]=n.length==1?"0"+n:n;return function(r,a,s){return r<0&&(r=0),a<0&&(a=0),s<0&&(s=0),"#"+e[r]+e[a]+e[s]}}();function BaseEvent(){}BaseEvent.prototype={triggerEvent:function(n,e){if(this._cbs[n])for(var t=this._cbs[n].length,r=0;r<t;r++)this._cbs[n][r](e)},addEventListener:function(n,e){return this._cbs[n]||(this._cbs[n]=[]),this._cbs[n].push(e),(function(){this.removeEventListener(n,e)}).bind(this)},removeEventListener:function(n,e){if(e){if(this._cbs[n]){for(var t=0,r=this._cbs[n].length;t<r;)this._cbs[n][t]===e&&(this._cbs[n].splice(t,1),--t,--r),t+=1;this._cbs[n].length||(this._cbs[n]=null)}}else this._cbs[n]=null}};var createTypedArray=typeof Uint8ClampedArray=="function"&&typeof Float32Array=="function"?function(n,e){return n==="float32"?new Float32Array(e):n==="int16"?new Int16Array(e):n==="uint8c"?new Uint8ClampedArray(e):void 0}:function(n,e){var t,r=0,a=[];switch(n){case"int16":case"uint8c":t=1;break;default:t=1.1}for(r=0;r<e;r+=1)a.push(t);return a};function createSizedArray(n){return Array.apply(null,{length:n})}function createNS(n){return document.createElementNS(svgNS,n)}function createTag(n){return document.createElement(n)}function DynamicPropertyContainer(){}DynamicPropertyContainer.prototype={addDynamicProperty:function(n){this.dynamicProperties.indexOf(n)===-1&&(this.dynamicProperties.push(n),this.container.addDynamicProperty(this),this._isAnimated=!0)},iterateDynamicProperties:function(){this._mdf=!1;for(var n=this.dynamicProperties.length,e=0;e<n;e+=1)this.dynamicProperties[e].getValue(),this.dynamicProperties[e]._mdf&&(this._mdf=!0)},initDynamicPropertyContainer:function(n){this.container=n,this.dynamicProperties=[],this._mdf=!1,this._isAnimated=!1}};var getBlendMode=(Pa={0:"source-over",1:"multiply",2:"screen",3:"overlay",4:"darken",5:"lighten",6:"color-dodge",7:"color-burn",8:"hard-light",9:"soft-light",10:"difference",11:"exclusion",12:"hue",13:"saturation",14:"color",15:"luminosity"},function(n){return Pa[n]||""}),Pa,Matrix=(Ra=Math.cos,Sa=Math.sin,Ta=Math.tan,Ua=Math.round,function(){this.reset=Va,this.rotate=Wa,this.rotateX=Xa,this.rotateY=Ya,this.rotateZ=Za,this.skew=_a,this.skewFromAxis=ab,this.shear=$a,this.scale=bb,this.setTransform=cb,this.translate=db,this.transform=eb,this.applyToPoint=jb,this.applyToX=kb,this.applyToY=lb,this.applyToZ=mb,this.applyToPointArray=sb,this.applyToTriplePoints=rb,this.applyToPointStringified=tb,this.toCSS=ub,this.to2dCSS=wb,this.clone=hb,this.cloneFromProps=ib,this.equals=gb,this.inversePoints=qb,this.inversePoint=pb,this.getInverseMatrix=nb,this._t=this.transform,this.isIdentity=fb,this._identity=!0,this._identityCalculated=!1,this.props=createTypedArray("float32",16),this.reset()}),Ra,Sa,Ta,Ua;function Va(){return this.props[0]=1,this.props[1]=0,this.props[2]=0,this.props[3]=0,this.props[4]=0,this.props[5]=1,this.props[6]=0,this.props[7]=0,this.props[8]=0,this.props[9]=0,this.props[10]=1,this.props[11]=0,this.props[12]=0,this.props[13]=0,this.props[14]=0,this.props[15]=1,this}function Wa(n){if(n===0)return this;var e=Ra(n),t=Sa(n);return this._t(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1)}function Xa(n){if(n===0)return this;var e=Ra(n),t=Sa(n);return this._t(1,0,0,0,0,e,-t,0,0,t,e,0,0,0,0,1)}function Ya(n){if(n===0)return this;var e=Ra(n),t=Sa(n);return this._t(e,0,t,0,0,1,0,0,-t,0,e,0,0,0,0,1)}function Za(n){if(n===0)return this;var e=Ra(n),t=Sa(n);return this._t(e,-t,0,0,t,e,0,0,0,0,1,0,0,0,0,1)}function $a(n,e){return this._t(1,e,n,1,0,0)}function _a(n,e){return this.shear(Ta(n),Ta(e))}function ab(n,e){var t=Ra(e),r=Sa(e);return this._t(t,r,0,0,-r,t,0,0,0,0,1,0,0,0,0,1)._t(1,0,0,0,Ta(n),1,0,0,0,0,1,0,0,0,0,1)._t(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1)}function bb(n,e,t){return t||t===0||(t=1),n===1&&e===1&&t===1?this:this._t(n,0,0,0,0,e,0,0,0,0,t,0,0,0,0,1)}function cb(n,e,t,r,a,s,o,l,d,c,f,_,m,g,y,x){return this.props[0]=n,this.props[1]=e,this.props[2]=t,this.props[3]=r,this.props[4]=a,this.props[5]=s,this.props[6]=o,this.props[7]=l,this.props[8]=d,this.props[9]=c,this.props[10]=f,this.props[11]=_,this.props[12]=m,this.props[13]=g,this.props[14]=y,this.props[15]=x,this}function db(n,e,t){return t=t||0,n!==0||e!==0||t!==0?this._t(1,0,0,0,0,1,0,0,0,0,1,0,n,e,t,1):this}function eb(n,e,t,r,a,s,o,l,d,c,f,_,m,g,y,x){var u=this.props;if(n===1&&e===0&&t===0&&r===0&&a===0&&s===1&&o===0&&l===0&&d===0&&c===0&&f===1&&_===0)return u[12]=u[12]*n+u[15]*m,u[13]=u[13]*s+u[15]*g,u[14]=u[14]*f+u[15]*y,u[15]=u[15]*x,this._identityCalculated=!1,this;var p=u[0],M=u[1],S=u[2],b=u[3],A=u[4],T=u[5],E=u[6],B=u[7],P=u[8],C=u[9],I=u[10],N=u[11],D=u[12],V=u[13],R=u[14],F=u[15];return u[0]=p*n+M*a+S*d+b*m,u[1]=p*e+M*s+S*c+b*g,u[2]=p*t+M*o+S*f+b*y,u[3]=p*r+M*l+S*_+b*x,u[4]=A*n+T*a+E*d+B*m,u[5]=A*e+T*s+E*c+B*g,u[6]=A*t+T*o+E*f+B*y,u[7]=A*r+T*l+E*_+B*x,u[8]=P*n+C*a+I*d+N*m,u[9]=P*e+C*s+I*c+N*g,u[10]=P*t+C*o+I*f+N*y,u[11]=P*r+C*l+I*_+N*x,u[12]=D*n+V*a+R*d+F*m,u[13]=D*e+V*s+R*c+F*g,u[14]=D*t+V*o+R*f+F*y,u[15]=D*r+V*l+R*_+F*x,this._identityCalculated=!1,this}function fb(){return this._identityCalculated||(this._identity=!(this.props[0]!==1||this.props[1]!==0||this.props[2]!==0||this.props[3]!==0||this.props[4]!==0||this.props[5]!==1||this.props[6]!==0||this.props[7]!==0||this.props[8]!==0||this.props[9]!==0||this.props[10]!==1||this.props[11]!==0||this.props[12]!==0||this.props[13]!==0||this.props[14]!==0||this.props[15]!==1),this._identityCalculated=!0),this._identity}function gb(n){for(var e=0;e<16;){if(n.props[e]!==this.props[e])return!1;e+=1}return!0}function hb(n){for(var e=0;e<16;e+=1)n.props[e]=this.props[e]}function ib(n){for(var e=0;e<16;e+=1)this.props[e]=n[e]}function jb(n,e,t){return{x:n*this.props[0]+e*this.props[4]+t*this.props[8]+this.props[12],y:n*this.props[1]+e*this.props[5]+t*this.props[9]+this.props[13],z:n*this.props[2]+e*this.props[6]+t*this.props[10]+this.props[14]}}function kb(n,e,t){return n*this.props[0]+e*this.props[4]+t*this.props[8]+this.props[12]}function lb(n,e,t){return n*this.props[1]+e*this.props[5]+t*this.props[9]+this.props[13]}function mb(n,e,t){return n*this.props[2]+e*this.props[6]+t*this.props[10]+this.props[14]}function nb(){var n=this.props[0]*this.props[5]-this.props[1]*this.props[4],e=this.props[5]/n,t=-this.props[1]/n,r=-this.props[4]/n,a=this.props[0]/n,s=(this.props[4]*this.props[13]-this.props[5]*this.props[12])/n,o=-(this.props[0]*this.props[13]-this.props[1]*this.props[12])/n,l=new Matrix;return l.props[0]=e,l.props[1]=t,l.props[4]=r,l.props[5]=a,l.props[12]=s,l.props[13]=o,l}function pb(n){return this.getInverseMatrix().applyToPointArray(n[0],n[1],n[2]||0)}function qb(n){for(var e=n.length,t=[],r=0;r<e;r+=1)t[r]=pb(n[r]);return t}function rb(n,e,t){var r,a,s,o,l,d,c=createTypedArray("float32",6);return this.isIdentity()?(c[0]=n[0],c[1]=n[1],c[2]=e[0],c[3]=e[1],c[4]=t[0],c[5]=t[1]):(r=this.props[0],a=this.props[1],s=this.props[4],o=this.props[5],l=this.props[12],d=this.props[13],c[0]=n[0]*r+n[1]*s+l,c[1]=n[0]*a+n[1]*o+d,c[2]=e[0]*r+e[1]*s+l,c[3]=e[0]*a+e[1]*o+d,c[4]=t[0]*r+t[1]*s+l,c[5]=t[0]*a+t[1]*o+d),c}function sb(n,e,t){var r=this.isIdentity()?[n,e,t]:[n*this.props[0]+e*this.props[4]+t*this.props[8]+this.props[12],n*this.props[1]+e*this.props[5]+t*this.props[9]+this.props[13],n*this.props[2]+e*this.props[6]+t*this.props[10]+this.props[14]];return r}function tb(n,e){if(this.isIdentity())return n+","+e;var t=this.props;return Math.round(100*(n*t[0]+e*t[4]+t[12]))/100+","+Math.round(100*(n*t[1]+e*t[5]+t[13]))/100}function ub(){for(var n=0,e=this.props,t="matrix3d(";n<16;)t+=Ua(1e4*e[n])/1e4,t+=n===15?")":",",n+=1;return t}function vb(n){return n<1e-6&&0<n||-1e-6<n&&n<0?Ua(1e4*n)/1e4:n}function wb(){var n=this.props;return"matrix("+vb(n[0])+","+vb(n[1])+","+vb(n[4])+","+vb(n[5])+","+vb(n[12])+","+vb(n[13])+")"}(function(n,e){var t,r=this,a=256,s=6,o="random",l=e.pow(a,s),d=e.pow(2,52),c=2*d,f=a-1;function _(x){var u,p=x.length,M=this,S=0,b=M.i=M.j=0,A=M.S=[];for(p||(x=[p++]);S<a;)A[S]=S++;for(S=0;S<a;S++)A[S]=A[b=f&b+x[S%p]+(u=A[S])],A[b]=u;M.g=function(T){for(var E,B=0,P=M.i,C=M.j,I=M.S;T--;)E=I[P=f&P+1],B=B*a+I[f&(I[P]=I[C=f&C+E])+(I[C]=E)];return M.i=P,M.j=C,B}}function m(x,u){return u.i=x.i,u.j=x.j,u.S=x.S.slice(),u}function g(x,u){for(var p,M=x+"",S=0;S<M.length;)u[f&S]=f&(p^=19*u[f&S])+M.charCodeAt(S++);return y(u)}function y(x){return String.fromCharCode.apply(0,x)}e["seed"+o]=function(x,u,p){function M(){for(var T=A.g(s),E=l,B=0;T<d;)T=(T+B)*a,E*=a,B=A.g(1);for(;c<=T;)T/=2,E/=2,B>>>=1;return(T+B)/E}var S=[],b=g(function T(E,B){var P,C=[],I=typeof E;if(B&&I=="object")for(P in E)try{C.push(T(E[P],B-1))}catch{}return C.length?C:I=="string"?E:E+"\0"}((u=u===!0?{entropy:!0}:u||{}).entropy?[x,y(n)]:x===null?function(){try{var T=new Uint8Array(a);return(r.crypto||r.msCrypto).getRandomValues(T),y(T)}catch{var E=r.navigator,B=E&&E.plugins;return[+new Date,r,B,r.screen,y(n)]}}():x,3),S),A=new _(S);return M.int32=function(){return 0|A.g(4)},M.quick=function(){return A.g(4)/4294967296},M.double=M,g(y(A.S),n),(u.pass||p||function(T,E,B,P){return P&&(P.S&&m(P,A),T.state=function(){return m(A,{})}),B?(e[o]=T,E):T})(M,b,"global"in u?u.global:this==e,u.state)},g(e.random(),n)})([],BMMath);var BezierFactory=(jf={getBezierEasing:function(n,e,t,r,a){var s=a||("bez_"+n+"_"+e+"_"+t+"_"+r).replace(/\./g,"p");if(kf[s])return kf[s];var o=new Af([n,e,t,r]);return kf[s]=o}},kf={},qf=11,rf=1/(qf-1),sf=typeof Float32Array=="function",Af.prototype={get:function(n){var e=this._p[0],t=this._p[1],r=this._p[2],a=this._p[3];return this._precomputed||this._precompute(),e===t&&r===a?n:n===0?0:n===1?1:wf(this._getTForX(n),t,a)},_precompute:function(){var n=this._p[0],e=this._p[1],t=this._p[2],r=this._p[3];this._precomputed=!0,n===e&&t===r||this._calcSampleValues()},_calcSampleValues:function(){for(var n=this._p[0],e=this._p[2],t=0;t<qf;++t)this._mSampleValues[t]=wf(t*rf,n,e)},_getTForX:function(n){for(var e=this._p[0],t=this._p[2],r=this._mSampleValues,a=0,s=1,o=qf-1;s!==o&&r[s]<=n;++s)a+=rf;var l=a+(n-r[--s])/(r[s+1]-r[s])*rf,d=xf(l,e,t);return .001<=d?function(c,f,_,m){for(var g=0;g<4;++g){var y=xf(f,_,m);if(y===0)return f;f-=(wf(f,_,m)-c)/y}return f}(n,l,e,t):d===0?l:function(c,f,_,m,g){for(var y,x,u=0;0<(y=wf(x=f+(_-f)/2,m,g)-c)?_=x:f=x,1e-7<Math.abs(y)&&++u<10;);return x}(n,a,a+rf,e,t)}},jf),jf,kf,qf,rf,sf;function tf(n,e){return 1-3*e+3*n}function uf(n,e){return 3*e-6*n}function wf(n,e,t){return((tf(e,t)*n+uf(e,t))*n+3*e)*n}function xf(n,e,t){return 3*tf(e,t)*n*n+2*uf(e,t)*n+3*e}function Af(n){this._p=n,this._mSampleValues=new(sf?Float32Array:Array)(qf),this._precomputed=!1,this.get=this.get.bind(this)}function extendPrototype(n,e){for(var t,r=n.length,a=0;a<r;a+=1)for(var s in t=n[a].prototype)t.hasOwnProperty(s)&&(e.prototype[s]=t[s])}function getDescriptor(n,e){return Object.getOwnPropertyDescriptor(n,e)}function createProxyFunction(n){function e(){}return e.prototype=n,e}function bezFunction(){function n(d,c,f,_,m,g){var y=d*_+c*m+f*g-m*_-g*d-f*c;return-.001<y&&y<.001}var e=function(d,c,f,_){for(var m,g,y,x,u=defaultCurveSegments,p=0,M=[],S=[],b=bezier_length_pool.newElement(),A=f.length,T=0;T<u;T+=1){for(y=T/(u-1),m=x=0;m<A;m+=1)g=bm_pow(1-y,3)*d[m]+3*bm_pow(1-y,2)*y*f[m]+3*(1-y)*bm_pow(y,2)*_[m]+bm_pow(y,3)*c[m],M[m]=g,S[m]!==null&&(x+=bm_pow(M[m]-S[m],2)),S[m]=M[m];x&&(p+=x=bm_sqrt(x)),b.percents[T]=y,b.lengths[T]=p}return b.addedLength=p,b};function t(d){this.segmentLength=0,this.points=new Array(d)}function r(d,c){this.partialLength=d,this.point=c}var a,s=(a={},function(d,c,f,_){var m=(d[0]+"_"+d[1]+"_"+c[0]+"_"+c[1]+"_"+f[0]+"_"+f[1]+"_"+_[0]+"_"+_[1]).replace(/\./g,"p");if(!a[m]){var g,y,x,u,p,M=defaultCurveSegments,S=0,b=null;d.length===2&&(d[0]!=c[0]||d[1]!=c[1])&&n(d[0],d[1],c[0],c[1],d[0]+f[0],d[1]+f[1])&&n(d[0],d[1],c[0],c[1],c[0]+_[0],c[1]+_[1])&&(M=2);for(var A=new t(M),T=f.length,E=0;E<M;E+=1){for(p=createSizedArray(T),x=E/(M-1),g=u=0;g<T;g+=1)y=bm_pow(1-x,3)*d[g]+3*bm_pow(1-x,2)*x*(d[g]+f[g])+3*(1-x)*bm_pow(x,2)*(c[g]+_[g])+bm_pow(x,3)*c[g],p[g]=y,b!==null&&(u+=bm_pow(p[g]-b[g],2));S+=u=bm_sqrt(u),A.points[E]=new r(u,p),b=p}A.segmentLength=S,a[m]=A}return a[m]});function o(d,c){var f=c.percents,_=c.lengths,m=f.length,g=bm_floor((m-1)*d),y=d*c.addedLength,x=0;if(g===m-1||g===0||y===_[g])return f[g];for(var u=_[g]>y?-1:1,p=!0;p;)if(_[g]<=y&&_[g+1]>y?(x=(y-_[g])/(_[g+1]-_[g]),p=!1):g+=u,g<0||m-1<=g){if(g===m-1)return f[g];p=!1}return f[g]+(f[g+1]-f[g])*x}var l=createTypedArray("float32",8);return{getSegmentsLength:function(d){for(var c=segments_length_pool.newElement(),f=d.c,_=d.v,m=d.o,g=d.i,y=d._length,x=c.lengths,u=0,p=0;p<y-1;p+=1)x[p]=e(_[p],_[p+1],m[p],g[p+1]),u+=x[p].addedLength;return f&&y&&(x[p]=e(_[p],_[0],m[p],g[0]),u+=x[p].addedLength),c.totalLength=u,c},getNewSegment:function(d,c,f,_,m,g,y){for(var x=o(m=m<0?0:1<m?1:m,y),u=o(g=1<g?1:g,y),p=d.length,M=1-x,S=1-u,b=M*M*M,A=x*M*M*3,T=x*x*M*3,E=x*x*x,B=M*M*S,P=x*M*S+M*x*S+M*M*u,C=x*x*S+M*x*u+x*M*u,I=x*x*u,N=M*S*S,D=x*S*S+M*u*S+M*S*u,V=x*u*S+M*u*u+x*S*u,R=x*u*u,F=S*S*S,$=u*S*S+S*u*S+S*S*u,W=u*u*S+S*u*u+u*S*u,J=u*u*u,j=0;j<p;j+=1)l[4*j]=Math.round(1e3*(b*d[j]+A*f[j]+T*_[j]+E*c[j]))/1e3,l[4*j+1]=Math.round(1e3*(B*d[j]+P*f[j]+C*_[j]+I*c[j]))/1e3,l[4*j+2]=Math.round(1e3*(N*d[j]+D*f[j]+V*_[j]+R*c[j]))/1e3,l[4*j+3]=Math.round(1e3*(F*d[j]+$*f[j]+W*_[j]+J*c[j]))/1e3;return l},getPointInSegment:function(d,c,f,_,m,g){var y=o(m,g),x=1-y;return[Math.round(1e3*(x*x*x*d[0]+(y*x*x+x*y*x+x*x*y)*f[0]+(y*y*x+x*y*y+y*x*y)*_[0]+y*y*y*c[0]))/1e3,Math.round(1e3*(x*x*x*d[1]+(y*x*x+x*y*x+x*x*y)*f[1]+(y*y*x+x*y*y+y*x*y)*_[1]+y*y*y*c[1]))/1e3]},buildBezierData:s,pointOnLine2D:n,pointOnLine3D:function(d,c,f,_,m,g,y,x,u){if(f===0&&g===0&&u===0)return n(d,c,_,m,y,x);var p=Math.sqrt(Math.pow(_-d,2)+Math.pow(m-c,2)+Math.pow(g-f,2)),M=Math.sqrt(Math.pow(y-d,2)+Math.pow(x-c,2)+Math.pow(u-f,2)),S=Math.sqrt(Math.pow(y-_,2)+Math.pow(x-m,2)+Math.pow(u-g,2)),b=M<p?S<p?p-M-S:S-M-p:M<S?S-M-p:M-p-S;return-1e-4<b&&b<1e-4}}}(function(){for(var n=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(r,a){var s=new Date().getTime(),o=Math.max(0,16-(s-n)),l=setTimeout(function(){r(s+o)},o);return n=s+o,l}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(r){clearTimeout(r)})})();var bez=bezFunction();function dataFunctionManager(){function n(x,u,p){for(var M,S,b,A,T=x.length,E=0;E<T;E+=1)if("ks"in(M=x[E])&&!M.completed){if(M.completed=!0,M.tt&&(x[E-1].td=M.tt),M.hasMask)for(var B=M.masksProperties,P=B.length,C=0;C<P;C+=1)if(B[C].pt.k.i)e(B[C].pt.k);else for(b=B[C].pt.k.length,S=0;S<b;S+=1)B[C].pt.k[S].s&&e(B[C].pt.k[S].s[0]),B[C].pt.k[S].e&&e(B[C].pt.k[S].e[0]);M.ty===0?(M.layers=function(I,N){for(var D=0,V=N.length;D<V;){if(N[D].id===I)return N[D].layers.__used?JSON.parse(JSON.stringify(N[D].layers)):(N[D].layers.__used=!0,N[D].layers);D+=1}}(M.refId,u),n(M.layers,u)):M.ty===4?function I(N){var D,V=N.length,R,F;for(D=V-1;0<=D;--D)if(N[D].ty=="sh")if(N[D].ks.k.i)e(N[D].ks.k);else for(F=N[D].ks.k.length,R=0;R<F;R+=1)N[D].ks.k[R].s&&e(N[D].ks.k[R].s[0]),N[D].ks.k[R].e&&e(N[D].ks.k[R].e[0]);else N[D].ty=="gr"&&I(N[D].it)}(M.shapes):M.ty==5&&((A=M).t.a.length!==0||"m"in A.t.p||(A.singleShape=!0))}}function e(x){for(var u=x.i.length,p=0;p<u;p+=1)x.i[p][0]+=x.v[p][0],x.i[p][1]+=x.v[p][1],x.o[p][0]+=x.v[p][0],x.o[p][1]+=x.v[p][1]}function t(x,u){var p=u?u.split("."):[100,100,100];if(x[0]>p[0])return 1;if(!(p[0]>x[0])){if(x[1]>p[1])return 1;if(!(p[1]>x[1]))return x[2]>p[2]||(p[2],void x[2])}}var r,a=(r=[4,4,14],function(x){if(t(r,x.v)&&(s(x.layers),x.assets))for(var u=x.assets.length,p=0;p<u;p+=1)x.assets[p].layers&&s(x.assets[p].layers)});function s(x){for(var u,p,M=x.length,S=0;S<M;S+=1)x[S].ty===5&&(u=x[S],p=u.t.d,u.t.d={k:[{s:p,t:0}]})}var o,l,d=(o=[4,7,99],function(x){if(x.chars&&!t(o,x.v)){for(var u,p,M,S,b=x.chars.length,A=0;A<b;A+=1)if(x.chars[A].data&&x.chars[A].data.shapes)for(p=(S=x.chars[A].data.shapes[0].it).length,u=0;u<p;u+=1)(M=S[u].ks.k).__converted||(e(S[u].ks.k),M.__converted=!0)}}),c=(l=[4,1,9],function(x){if(t(l,x.v)&&(f(x.layers),x.assets))for(var u=x.assets.length,p=0;p<u;p+=1)x.assets[p].layers&&f(x.assets[p].layers)});function f(x){for(var u=x.length,p=0;p<u;p+=1)x[p].ty===4&&function M(S){for(var b,A,T=S.length,E=0;E<T;E+=1)if(S[E].ty==="gr")M(S[E].it);else if(S[E].ty==="fl"||S[E].ty==="st")if(S[E].c.k&&S[E].c.k[0].i)for(A=S[E].c.k.length,b=0;b<A;b+=1)S[E].c.k[b].s&&(S[E].c.k[b].s[0]/=255,S[E].c.k[b].s[1]/=255,S[E].c.k[b].s[2]/=255,S[E].c.k[b].s[3]/=255),S[E].c.k[b].e&&(S[E].c.k[b].e[0]/=255,S[E].c.k[b].e[1]/=255,S[E].c.k[b].e[2]/=255,S[E].c.k[b].e[3]/=255);else S[E].c.k[0]/=255,S[E].c.k[1]/=255,S[E].c.k[2]/=255,S[E].c.k[3]/=255}(x[p].shapes)}var _,m=(_=[4,4,18],function(x){if(t(_,x.v)&&(g(x.layers),x.assets))for(var u=x.assets.length,p=0;p<u;p+=1)x.assets[p].layers&&g(x.assets[p].layers)});function g(x){for(var u,p,M,S=x.length,b=0;b<S;b+=1){if((u=x[b]).hasMask)for(var A=u.masksProperties,T=A.length,E=0;E<T;E+=1)if(A[E].pt.k.i)A[E].pt.k.c=A[E].cl;else for(M=A[E].pt.k.length,p=0;p<M;p+=1)A[E].pt.k[p].s&&(A[E].pt.k[p].s[0].c=A[E].cl),A[E].pt.k[p].e&&(A[E].pt.k[p].e[0].c=A[E].cl);u.ty===4&&function B(P){for(var C,I,N=P.length-1;0<=N;--N)if(P[N].ty=="sh")if(P[N].ks.k.i)P[N].ks.k.c=P[N].closed;else for(I=P[N].ks.k.length,C=0;C<I;C+=1)P[N].ks.k[C].s&&(P[N].ks.k[C].s[0].c=P[N].closed),P[N].ks.k[C].e&&(P[N].ks.k[C].e[0].c=P[N].closed);else P[N].ty=="gr"&&B(P[N].it)}(u.shapes)}}var y={completeData:function(x,u){x.__complete||(c(x),a(x),d(x),m(x),n(x.layers,x.assets),x.__complete=!0)}};return y.checkColors=c,y.checkChars=d,y.checkShapes=m,y.completeLayers=n,y}var dataManager=dataFunctionManager(),FontManager=function(){var n={w:0,size:0,shapes:[]},e=[];function t(a,s){var o=createTag("span");o.style.fontFamily=s;var l=createTag("span");l.innerHTML="giItT1WQy@!-/#",o.style.position="absolute",o.style.left="-10000px",o.style.top="-10000px",o.style.fontSize="300px",o.style.fontVariant="normal",o.style.fontStyle="normal",o.style.fontWeight="normal",o.style.letterSpacing="0",o.appendChild(l),document.body.appendChild(o);var d=l.offsetWidth;return l.style.fontFamily=function(c){for(var f=c.split(","),_=f.length,m=[],g=0;g<_;g+=1)f[g]!=="sans-serif"&&f[g]!=="monospace"&&m.push(f[g]);return m.join(",")}(a)+", "+s,{node:l,w:d,parent:o}}e=e.concat([2304,2305,2306,2307,2362,2363,2364,2364,2366,2367,2368,2369,2370,2371,2372,2373,2374,2375,2376,2377,2378,2379,2380,2381,2382,2383,2387,2388,2389,2390,2391,2402,2403]);function r(){this.fonts=[],this.chars=null,this.typekitLoaded=0,this.isLoaded=!1,this.initTime=Date.now(),this.setIsLoadedBinded=this.setIsLoaded.bind(this),this.checkLoadedFontsBinded=this.checkLoadedFonts.bind(this)}return r.getCombinedCharacterCodes=function(){return e},r.prototype={addChars:function(a){if(a){this.chars||(this.chars=[]);for(var s,o,l=a.length,d=this.chars.length,c=0;c<l;c+=1){for(s=0,o=!1;s<d;)this.chars[s].style===a[c].style&&this.chars[s].fFamily===a[c].fFamily&&this.chars[s].ch===a[c].ch&&(o=!0),s+=1;o||(this.chars.push(a[c]),d+=1)}}},addFonts:function(a,s){if(a){if(this.chars)return this.isLoaded=!0,void(this.fonts=a.list);for(var o,l,d,c=a.list,f=c.length,_=f,m=0;m<f;m+=1){var g,y,x,u,p,M=!0;if(c[m].loaded=!1,c[m].monoCase=t(c[m].fFamily,"monospace"),c[m].sansCase=t(c[m].fFamily,"sans-serif"),c[m].fPath){if(c[m].fOrigin==="p"||c[m].origin===3)0<(x=document.querySelectorAll('style[f-forigin="p"][f-family="'+c[m].fFamily+'"], style[f-origin="3"][f-family="'+c[m].fFamily+'"]')).length&&(M=!1),M&&((y=createTag("style")).setAttribute("f-forigin",c[m].fOrigin),y.setAttribute("f-origin",c[m].origin),y.setAttribute("f-family",c[m].fFamily),y.type="text/css",y.innerHTML="@font-face {font-family: "+c[m].fFamily+"; font-style: normal; src: url('"+c[m].fPath+"');}",s.appendChild(y));else if(c[m].fOrigin==="g"||c[m].origin===1){for(x=document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'),g=0;g<x.length;g++)x[g].href.indexOf(c[m].fPath)!==-1&&(M=!1);M&&((u=createTag("link")).setAttribute("f-forigin",c[m].fOrigin),u.setAttribute("f-origin",c[m].origin),u.type="text/css",u.rel="stylesheet",u.href=c[m].fPath,document.body.appendChild(u))}else if(c[m].fOrigin==="t"||c[m].origin===2){for(x=document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'),g=0;g<x.length;g++)c[m].fPath===x[g].src&&(M=!1);M&&((p=createTag("link")).setAttribute("f-forigin",c[m].fOrigin),p.setAttribute("f-origin",c[m].origin),p.setAttribute("rel","stylesheet"),p.setAttribute("href",c[m].fPath),s.appendChild(p))}}else c[m].loaded=!0,--_;c[m].helper=(o=s,l=c[m],d=void 0,(d=createNS("text")).style.fontSize="100px",d.setAttribute("font-family",l.fFamily),d.setAttribute("font-style",l.fStyle),d.setAttribute("font-weight",l.fWeight),d.textContent="1",l.fClass?(d.style.fontFamily="inherit",d.setAttribute("class",l.fClass)):d.style.fontFamily=l.fFamily,o.appendChild(d),createTag("canvas").getContext("2d").font=l.fWeight+" "+l.fStyle+" 100px "+l.fFamily,d),c[m].cache={},this.fonts.push(c[m])}_===0?this.isLoaded=!0:setTimeout(this.checkLoadedFonts.bind(this),100)}else this.isLoaded=!0},getCharData:function(a,s,o){for(var l=0,d=this.chars.length;l<d;){if(this.chars[l].ch===a&&this.chars[l].style===s&&this.chars[l].fFamily===o)return this.chars[l];l+=1}return(typeof a=="string"&&a.charCodeAt(0)!==13||!a)&&console&&console.warn&&console.warn("Missing character from exported characters list: ",a,s,o),n},getFontByName:function(a){for(var s=0,o=this.fonts.length;s<o;){if(this.fonts[s].fName===a)return this.fonts[s];s+=1}return this.fonts[0]},measureText:function(a,s,o){var l,d,c,f=this.getFontByName(s),_=a.charCodeAt(0);return f.cache[_+1]||(l=f.helper,a===" "?(l.textContent="|"+a+"|",d=l.getComputedTextLength(),l.textContent="||",c=l.getComputedTextLength(),f.cache[_+1]=(d-c)/100):(l.textContent=a,f.cache[_+1]=l.getComputedTextLength()/100)),f.cache[_+1]*o},checkLoadedFonts:function(){for(var a,s,o=this.fonts.length,l=o,d=0;d<o;d+=1)this.fonts[d].loaded?--l:this.fonts[d].fOrigin==="n"||this.fonts[d].origin===0?this.fonts[d].loaded=!0:(a=this.fonts[d].monoCase.node,s=this.fonts[d].monoCase.w,a.offsetWidth!==s?(--l,this.fonts[d].loaded=!0):(a=this.fonts[d].sansCase.node,s=this.fonts[d].sansCase.w,a.offsetWidth!==s&&(--l,this.fonts[d].loaded=!0)),this.fonts[d].loaded&&(this.fonts[d].sansCase.parent.parentNode.removeChild(this.fonts[d].sansCase.parent),this.fonts[d].monoCase.parent.parentNode.removeChild(this.fonts[d].monoCase.parent)));l!==0&&Date.now()-this.initTime<5e3?setTimeout(this.checkLoadedFontsBinded,20):setTimeout(this.setIsLoadedBinded,10)},setIsLoaded:function(){this.isLoaded=!0}},r}(),PropertyFactory=(xm=initialDefaultFrame,ym=Math.abs,{getProp:function(n,e,t,r,a){var s;if(e.k.length)if(typeof e.k[0]=="number")s=new Im(n,e,r,a);else switch(t){case 0:s=new Jm(n,e,r,a);break;case 1:s=new Km(n,e,r,a)}else s=new Hm(n,e,r,a);return s.effectsSequence.length&&a.addDynamicProperty(s),s}}),xm,ym;function zm(n,e){var t,r=this.offsetTime;this.propType==="multidimensional"&&(t=createTypedArray("float32",this.pv.length));for(var a,s,o,l,d=e.lastIndex,c=d,f=this.keyframes.length-1,_=!0;_;){if(a=this.keyframes[c],s=this.keyframes[c+1],c===f-1&&n>=s.t-r){a.h&&(a=s),d=0;break}if(s.t-r>n){d=c;break}c<f-1?c+=1:(d=0,_=!1)}var m,g,y,x,u,p,M,S,b,A=s.t-r,T=a.t-r;if(a.to){a.bezierData||(a.bezierData=bez.buildBezierData(a.s,s.s||a.e,a.to,a.ti));var E=a.bezierData;if(A<=n||n<T)for(var B=A<=n?E.points.length-1:0,P=E.points[B].point.length,C=0;C<P;C+=1)t[C]=E.points[B].point[C];else{a.__fnct?l=a.__fnct:(l=BezierFactory.getBezierEasing(a.o.x,a.o.y,a.i.x,a.i.y,a.n).get,a.__fnct=l),o=l((n-T)/(A-T));for(var I,N=E.segmentLength*o,D=e.lastFrame<n&&e._lastKeyframeIndex===c?e._lastAddedLength:0,V=e.lastFrame<n&&e._lastKeyframeIndex===c?e._lastPoint:0,_=!0,R=E.points.length;_;){if(D+=E.points[V].partialLength,N==0||o===0||V===E.points.length-1){for(P=E.points[V].point.length,C=0;C<P;C+=1)t[C]=E.points[V].point[C];break}if(D<=N&&N<D+E.points[V+1].partialLength){for(I=(N-D)/E.points[V+1].partialLength,P=E.points[V].point.length,C=0;C<P;C+=1)t[C]=E.points[V].point[C]+(E.points[V+1].point[C]-E.points[V].point[C])*I;break}V<R-1?V+=1:_=!1}e._lastPoint=V,e._lastAddedLength=D-E.points[V].partialLength,e._lastKeyframeIndex=c}}else{var F,$,W,J,j,ie,ae,f=a.s.length,he=s.s||a.e;if(this.sh&&a.h!==1)A<=n?(t[0]=he[0],t[1]=he[1],t[2]=he[2]):n<=T?(t[0]=a.s[0],t[1]=a.s[1],t[2]=a.s[2]):(ie=Cm(a.s),ae=Cm(he),m=t,g=function(X,re,Y){var de,fe,Te,O,Ae,Fe=[],Pe=X[0],ve=X[1],Le=X[2],Ie=X[3],Re=re[0],Oe=re[1],U=re[2],L=re[3];return(fe=Pe*Re+ve*Oe+Le*U+Ie*L)<0&&(fe=-fe,Re=-Re,Oe=-Oe,U=-U,L=-L),Ae=1e-6<1-fe?(de=Math.acos(fe),Te=Math.sin(de),O=Math.sin((1-Y)*de)/Te,Math.sin(Y*de)/Te):(O=1-Y,Y),Fe[0]=O*Pe+Ae*Re,Fe[1]=O*ve+Ae*Oe,Fe[2]=O*Le+Ae*U,Fe[3]=O*Ie+Ae*L,Fe}(ie,ae,(n-T)/(A-T)),y=g[0],x=g[1],u=g[2],p=g[3],M=Math.atan2(2*x*p-2*y*u,1-2*x*x-2*u*u),S=Math.asin(2*y*x+2*u*p),b=Math.atan2(2*y*p-2*x*u,1-2*y*y-2*u*u),m[0]=M/degToRads,m[1]=S/degToRads,m[2]=b/degToRads);else for(c=0;c<f;c+=1)a.h!==1&&(o=A<=n?1:n<T?0:(a.o.x.constructor===Array?(a.__fnct||(a.__fnct=[]),a.__fnct[c]?l=a.__fnct[c]:(F=a.o.x[c]===void 0?a.o.x[0]:a.o.x[c],$=a.o.y[c]===void 0?a.o.y[0]:a.o.y[c],W=a.i.x[c]===void 0?a.i.x[0]:a.i.x[c],J=a.i.y[c]===void 0?a.i.y[0]:a.i.y[c],l=BezierFactory.getBezierEasing(F,$,W,J).get,a.__fnct[c]=l)):a.__fnct?l=a.__fnct:(F=a.o.x,$=a.o.y,W=a.i.x,J=a.i.y,l=BezierFactory.getBezierEasing(F,$,W,J).get,a.__fnct=l),l((n-T)/(A-T)))),he=s.s||a.e,j=a.h===1?a.s[c]:a.s[c]+(he[c]-a.s[c])*o,this.propType==="multidimensional"?t[c]=j:t=j}return e.lastIndex=d,t}function Cm(n){var e=n[0]*degToRads,t=n[1]*degToRads,r=n[2]*degToRads,a=Math.cos(e/2),s=Math.cos(t/2),o=Math.cos(r/2),l=Math.sin(e/2),d=Math.sin(t/2),c=Math.sin(r/2);return[l*d*o+a*s*c,l*s*o+a*d*c,a*d*o-l*s*c,a*s*o-l*d*c]}function Dm(){var n,e=this.comp.renderedFrame-this.offsetTime,t=this.keyframes[0].t-this.offsetTime,r=this.keyframes[this.keyframes.length-1].t-this.offsetTime;return e===this._caching.lastFrame||this._caching.lastFrame!==xm&&(this._caching.lastFrame>=r&&r<=e||this._caching.lastFrame<t&&e<t)||(this._caching.lastFrame>=e&&(this._caching._lastKeyframeIndex=-1,this._caching.lastIndex=0),n=this.interpolateValue(e,this._caching),this.pv=n),this._caching.lastFrame=e,this.pv}function Em(n){var e;if(this.propType==="unidimensional")e=n*this.mult,1e-5<ym(this.v-e)&&(this.v=e,this._mdf=!0);else for(var t=0,r=this.v.length;t<r;)e=n[t]*this.mult,1e-5<ym(this.v[t]-e)&&(this.v[t]=e,this._mdf=!0),t+=1}function Fm(){if(this.elem.globalData.frameId!==this.frameId&&this.effectsSequence.length)if(this.lock)this.setVValue(this.pv);else{this.lock=!0,this._mdf=this._isFirstFrame;for(var n=this.effectsSequence.length,e=this.kf?this.pv:this.data.k,t=0;t<n;t+=1)e=this.effectsSequence[t](e);this.setVValue(e),this._isFirstFrame=!1,this.lock=!1,this.frameId=this.elem.globalData.frameId}}function Gm(n){this.effectsSequence.push(n),this.container.addDynamicProperty(this)}function Hm(n,e,t,r){this.propType="unidimensional",this.mult=t||1,this.data=e,this.v=t?e.k*t:e.k,this.pv=e.k,this._mdf=!1,this.elem=n,this.container=r,this.comp=n.comp,this.k=!1,this.kf=!1,this.vel=0,this.effectsSequence=[],this._isFirstFrame=!0,this.getValue=Fm,this.setVValue=Em,this.addEffect=Gm}function Im(n,e,t,r){this.propType="multidimensional",this.mult=t||1,this.data=e,this._mdf=!1,this.elem=n,this.container=r,this.comp=n.comp,this.k=!1,this.kf=!1,this.frameId=-1;var a,s=e.k.length;for(this.v=createTypedArray("float32",s),this.pv=createTypedArray("float32",s),createTypedArray("float32",s),this.vel=createTypedArray("float32",s),a=0;a<s;a+=1)this.v[a]=e.k[a]*this.mult,this.pv[a]=e.k[a];this._isFirstFrame=!0,this.effectsSequence=[],this.getValue=Fm,this.setVValue=Em,this.addEffect=Gm}function Jm(n,e,t,r){this.propType="unidimensional",this.keyframes=e.k,this.offsetTime=n.data.st,this.frameId=-1,this._caching={lastFrame:xm,lastIndex:0,value:0,_lastKeyframeIndex:-1},this.k=!0,this.kf=!0,this.data=e,this.mult=t||1,this.elem=n,this.container=r,this.comp=n.comp,this.v=xm,this.pv=xm,this._isFirstFrame=!0,this.getValue=Fm,this.setVValue=Em,this.interpolateValue=zm,this.effectsSequence=[Dm.bind(this)],this.addEffect=Gm}function Km(n,e,t,r){this.propType="multidimensional";for(var a,s,o,l,d=e.k.length,c=0;c<d-1;c+=1)e.k[c].to&&e.k[c].s&&e.k[c+1]&&e.k[c+1].s&&(a=e.k[c].s,s=e.k[c+1].s,o=e.k[c].to,l=e.k[c].ti,(a.length===2&&(a[0]!==s[0]||a[1]!==s[1])&&bez.pointOnLine2D(a[0],a[1],s[0],s[1],a[0]+o[0],a[1]+o[1])&&bez.pointOnLine2D(a[0],a[1],s[0],s[1],s[0]+l[0],s[1]+l[1])||a.length===3&&(a[0]!==s[0]||a[1]!==s[1]||a[2]!==s[2])&&bez.pointOnLine3D(a[0],a[1],a[2],s[0],s[1],s[2],a[0]+o[0],a[1]+o[1],a[2]+o[2])&&bez.pointOnLine3D(a[0],a[1],a[2],s[0],s[1],s[2],s[0]+l[0],s[1]+l[1],s[2]+l[2]))&&(e.k[c].to=null,e.k[c].ti=null),a[0]===s[0]&&a[1]===s[1]&&o[0]===0&&o[1]===0&&l[0]===0&&l[1]===0&&(a.length===2||a[2]===s[2]&&o[2]===0&&l[2]===0)&&(e.k[c].to=null,e.k[c].ti=null));this.effectsSequence=[Dm.bind(this)],this.keyframes=e.k,this.offsetTime=n.data.st,this.k=!0,this.kf=!0,this._isFirstFrame=!0,this.mult=t||1,this.elem=n,this.container=r,this.comp=n.comp,this.getValue=Fm,this.setVValue=Em,this.interpolateValue=zm,this.frameId=-1;var f=e.k[0].s.length;for(this.v=createTypedArray("float32",f),this.pv=createTypedArray("float32",f),c=0;c<f;c+=1)this.v[c]=xm,this.pv[c]=xm;this._caching={lastFrame:xm,lastIndex:0,value:createTypedArray("float32",f)},this.addEffect=Gm}var TransformPropertyFactory=(Yo=[0,0],cp.prototype={applyToMatrix:function(n){var e=this._mdf;this.iterateDynamicProperties(),this._mdf=this._mdf||e,this.a&&n.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.s&&n.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.sk&&n.skewFromAxis(-this.sk.v,this.sa.v),this.r?n.rotate(-this.r.v):n.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.data.p.s?this.data.p.z?n.translate(this.px.v,this.py.v,-this.pz.v):n.translate(this.px.v,this.py.v,0):n.translate(this.p.v[0],this.p.v[1],-this.p.v[2])},getValue:function(n){var e,t,r,a,s;this.elem.globalData.frameId!==this.frameId&&(this._isDirty&&(this.precalculateMatrix(),this._isDirty=!1),this.iterateDynamicProperties(),(this._mdf||n)&&(this.v.cloneFromProps(this.pre.props),this.appliedTransformations<1&&this.v.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.appliedTransformations<2&&this.v.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.sk&&this.appliedTransformations<3&&this.v.skewFromAxis(-this.sk.v,this.sa.v),this.r&&this.appliedTransformations<4?this.v.rotate(-this.r.v):!this.r&&this.appliedTransformations<4&&this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.autoOriented&&(s=this.elem.globalData.frameRate,this.p&&this.p.keyframes&&this.p.getValueAtTime?t=this.p._caching.lastFrame+this.p.offsetTime<=this.p.keyframes[0].t?(e=this.p.getValueAtTime((this.p.keyframes[0].t+.01)/s,0),this.p.getValueAtTime(this.p.keyframes[0].t/s,0)):this.p._caching.lastFrame+this.p.offsetTime>=this.p.keyframes[this.p.keyframes.length-1].t?(e=this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length-1].t/s,0),this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length-1].t-.05)/s,0)):(e=this.p.pv,this.p.getValueAtTime((this.p._caching.lastFrame+this.p.offsetTime-.01)/s,this.p.offsetTime)):this.px&&this.px.keyframes&&this.py.keyframes&&this.px.getValueAtTime&&this.py.getValueAtTime?(e=[],t=[],r=this.px,a=this.py,r._caching.lastFrame+r.offsetTime<=r.keyframes[0].t?(e[0]=r.getValueAtTime((r.keyframes[0].t+.01)/s,0),e[1]=a.getValueAtTime((a.keyframes[0].t+.01)/s,0),t[0]=r.getValueAtTime(r.keyframes[0].t/s,0),t[1]=a.getValueAtTime(a.keyframes[0].t/s,0)):r._caching.lastFrame+r.offsetTime>=r.keyframes[r.keyframes.length-1].t?(e[0]=r.getValueAtTime(r.keyframes[r.keyframes.length-1].t/s,0),e[1]=a.getValueAtTime(a.keyframes[a.keyframes.length-1].t/s,0),t[0]=r.getValueAtTime((r.keyframes[r.keyframes.length-1].t-.01)/s,0),t[1]=a.getValueAtTime((a.keyframes[a.keyframes.length-1].t-.01)/s,0)):(e=[r.pv,a.pv],t[0]=r.getValueAtTime((r._caching.lastFrame+r.offsetTime-.01)/s,r.offsetTime),t[1]=a.getValueAtTime((a._caching.lastFrame+a.offsetTime-.01)/s,a.offsetTime))):e=t=Yo,this.v.rotate(-Math.atan2(e[1]-t[1],e[0]-t[0]))),this.data.p&&this.data.p.s?this.data.p.z?this.v.translate(this.px.v,this.py.v,-this.pz.v):this.v.translate(this.px.v,this.py.v,0):this.v.translate(this.p.v[0],this.p.v[1],-this.p.v[2])),this.frameId=this.elem.globalData.frameId)},precalculateMatrix:function(){if(!this.a.k&&(this.pre.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.appliedTransformations=1,!this.s.effectsSequence.length)){if(this.pre.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.appliedTransformations=2,this.sk){if(this.sk.effectsSequence.length||this.sa.effectsSequence.length)return;this.pre.skewFromAxis(-this.sk.v,this.sa.v),this.appliedTransformations=3}if(this.r){if(this.r.effectsSequence.length)return;this.pre.rotate(-this.r.v),this.appliedTransformations=4}else this.rz.effectsSequence.length||this.ry.effectsSequence.length||this.rx.effectsSequence.length||this.or.effectsSequence.length||(this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.appliedTransformations=4)}},autoOrient:function(){}},extendPrototype([DynamicPropertyContainer],cp),cp.prototype.addDynamicProperty=function(n){this._addDynamicProperty(n),this.elem.addDynamicProperty(n),this._isDirty=!0},cp.prototype._addDynamicProperty=DynamicPropertyContainer.prototype.addDynamicProperty,{getTransformProperty:function(n,e,t){return new cp(n,e,t)}}),Yo;function cp(n,e,t){if(this.elem=n,this.frameId=-1,this.propType="transform",this.data=e,this.v=new Matrix,this.pre=new Matrix,this.appliedTransformations=0,this.initDynamicPropertyContainer(t||n),e.p&&e.p.s?(this.px=PropertyFactory.getProp(n,e.p.x,0,0,this),this.py=PropertyFactory.getProp(n,e.p.y,0,0,this),e.p.z&&(this.pz=PropertyFactory.getProp(n,e.p.z,0,0,this))):this.p=PropertyFactory.getProp(n,e.p||{k:[0,0,0]},1,0,this),e.rx){if(this.rx=PropertyFactory.getProp(n,e.rx,0,degToRads,this),this.ry=PropertyFactory.getProp(n,e.ry,0,degToRads,this),this.rz=PropertyFactory.getProp(n,e.rz,0,degToRads,this),e.or.k[0].ti)for(var r=e.or.k.length,a=0;a<r;a+=1)e.or.k[a].to=e.or.k[a].ti=null;this.or=PropertyFactory.getProp(n,e.or,1,degToRads,this),this.or.sh=!0}else this.r=PropertyFactory.getProp(n,e.r||{k:0},0,degToRads,this);e.sk&&(this.sk=PropertyFactory.getProp(n,e.sk,0,degToRads,this),this.sa=PropertyFactory.getProp(n,e.sa,0,degToRads,this)),this.a=PropertyFactory.getProp(n,e.a||{k:[0,0,0]},1,0,this),this.s=PropertyFactory.getProp(n,e.s||{k:[100,100,100]},1,.01,this),e.o?this.o=PropertyFactory.getProp(n,e.o,0,.01,n):this.o={_mdf:!1,v:1},this._isDirty=!0,this.dynamicProperties.length||this.getValue(!0)}function ShapePath(){this.c=!1,this._length=0,this._maxLength=8,this.v=createSizedArray(this._maxLength),this.o=createSizedArray(this._maxLength),this.i=createSizedArray(this._maxLength)}ShapePath.prototype.setPathData=function(n,e){this.c=n,this.setLength(e);for(var t=0;t<e;)this.v[t]=point_pool.newElement(),this.o[t]=point_pool.newElement(),this.i[t]=point_pool.newElement(),t+=1},ShapePath.prototype.setLength=function(n){for(;this._maxLength<n;)this.doubleArrayLength();this._length=n},ShapePath.prototype.doubleArrayLength=function(){this.v=this.v.concat(createSizedArray(this._maxLength)),this.i=this.i.concat(createSizedArray(this._maxLength)),this.o=this.o.concat(createSizedArray(this._maxLength)),this._maxLength*=2},ShapePath.prototype.setXYAt=function(n,e,t,r,a){var s;switch(this._length=Math.max(this._length,r+1),this._length>=this._maxLength&&this.doubleArrayLength(),t){case"v":s=this.v;break;case"i":s=this.i;break;case"o":s=this.o}s[r]&&(!s[r]||a)||(s[r]=point_pool.newElement()),s[r][0]=n,s[r][1]=e},ShapePath.prototype.setTripleAt=function(n,e,t,r,a,s,o,l){this.setXYAt(n,e,"v",o,l),this.setXYAt(t,r,"o",o,l),this.setXYAt(a,s,"i",o,l)},ShapePath.prototype.reverse=function(){var n=new ShapePath;n.setPathData(this.c,this._length);var e=this.v,t=this.o,r=this.i,a=0;this.c&&(n.setTripleAt(e[0][0],e[0][1],r[0][0],r[0][1],t[0][0],t[0][1],0,!1),a=1);for(var s=this._length-1,o=this._length,l=a;l<o;l+=1)n.setTripleAt(e[s][0],e[s][1],r[s][0],r[s][1],t[s][0],t[s][1],l,!1),--s;return n};var ShapePropertyFactory=function(){var n=-999999;function e(u,p,M){var S,b,A,T,E,B,P,C=M.lastIndex,I=this.keyframes;if(u<I[0].t-this.offsetTime)S=I[0].s[0],b=!0,C=0;else if(u>=I[I.length-1].t-this.offsetTime)S=I[I.length-1].s?I[I.length-1].s[0]:I[I.length-2].e[0],b=!0;else{for(var N,D,V,R,F,$=C,W=I.length-1,J=!0;J&&(N=I[$],!((D=I[$+1]).t-this.offsetTime>u));)$<W-1?$+=1:J=!1;C=$,(b=N.h===1)||(R=u>=D.t-this.offsetTime?1:u<N.t-this.offsetTime?0:(N.__fnct?V=N.__fnct:(V=BezierFactory.getBezierEasing(N.o.x,N.o.y,N.i.x,N.i.y).get,N.__fnct=V),V((u-(N.t-this.offsetTime))/(D.t-this.offsetTime-(N.t-this.offsetTime)))),F=D.s?D.s[0]:N.e[0]),S=N.s[0]}for(E=p._length,B=S.i[0].length,M.lastIndex=C,A=0;A<E;A+=1)for(T=0;T<B;T+=1)P=b?S.i[A][T]:S.i[A][T]+(F.i[A][T]-S.i[A][T])*R,p.i[A][T]=P,P=b?S.o[A][T]:S.o[A][T]+(F.o[A][T]-S.o[A][T])*R,p.o[A][T]=P,P=b?S.v[A][T]:S.v[A][T]+(F.v[A][T]-S.v[A][T])*R,p.v[A][T]=P}function t(){this.paths=this.localShapeCollection}function r(u){!function(p,M){if(p._length===M._length&&p.c===M.c){for(var S=p._length,b=0;b<S;b+=1)if(p.v[b][0]!==M.v[b][0]||p.v[b][1]!==M.v[b][1]||p.o[b][0]!==M.o[b][0]||p.o[b][1]!==M.o[b][1]||p.i[b][0]!==M.i[b][0]||p.i[b][1]!==M.i[b][1])return;return 1}}(this.v,u)&&(this.v=shape_pool.clone(u),this.localShapeCollection.releaseShapes(),this.localShapeCollection.addShape(this.v),this._mdf=!0,this.paths=this.localShapeCollection)}function a(){if(this.elem.globalData.frameId!==this.frameId)if(this.effectsSequence.length)if(this.lock)this.setVValue(this.pv);else{this.lock=!0,this._mdf=!1;for(var u=this.kf?this.pv:this.data.ks?this.data.ks.k:this.data.pt.k,p=this.effectsSequence.length,M=0;M<p;M+=1)u=this.effectsSequence[M](u);this.setVValue(u),this.lock=!1,this.frameId=this.elem.globalData.frameId}else this._mdf=!1}function s(u,p,M){this.propType="shape",this.comp=u.comp,this.container=u,this.elem=u,this.data=p,this.k=!1,this.kf=!1,this._mdf=!1;var S=M===3?p.pt.k:p.ks.k;this.v=shape_pool.clone(S),this.pv=shape_pool.clone(this.v),this.localShapeCollection=shapeCollection_pool.newShapeCollection(),this.paths=this.localShapeCollection,this.paths.addShape(this.v),this.reset=t,this.effectsSequence=[]}function o(u){this.effectsSequence.push(u),this.container.addDynamicProperty(this)}function l(u,p,M){this.propType="shape",this.comp=u.comp,this.elem=u,this.container=u,this.offsetTime=u.data.st,this.keyframes=M===3?p.pt.k:p.ks.k,this.k=!0,this.kf=!0;var S=this.keyframes[0].s[0].i.length;this.keyframes[0].s[0].i[0].length,this.v=shape_pool.newElement(),this.v.setPathData(this.keyframes[0].s[0].c,S),this.pv=shape_pool.clone(this.v),this.localShapeCollection=shapeCollection_pool.newShapeCollection(),this.paths=this.localShapeCollection,this.paths.addShape(this.v),this.lastFrame=n,this.reset=t,this._caching={lastFrame:n,lastIndex:0},this.effectsSequence=[(function(){var b=this.comp.renderedFrame-this.offsetTime,A=this.keyframes[0].t-this.offsetTime,T=this.keyframes[this.keyframes.length-1].t-this.offsetTime,E=this._caching.lastFrame;return E!==n&&(E<A&&b<A||T<E&&T<b)||(this._caching.lastIndex=E<b?this._caching.lastIndex:0,this.interpolateShape(b,this.pv,this._caching)),this._caching.lastFrame=b,this.pv}).bind(this)]}s.prototype.interpolateShape=e,s.prototype.getValue=a,s.prototype.setVValue=r,s.prototype.addEffect=o,l.prototype.getValue=a,l.prototype.interpolateShape=e,l.prototype.setVValue=r,l.prototype.addEffect=o;var d,c=(d=roundCorner,f.prototype={reset:t,getValue:function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertEllToPath())},convertEllToPath:function(){var u=this.p.v[0],p=this.p.v[1],M=this.s.v[0]/2,S=this.s.v[1]/2,b=this.d!==3,A=this.v;A.v[0][0]=u,A.v[0][1]=p-S,A.v[1][0]=b?u+M:u-M,A.v[1][1]=p,A.v[2][0]=u,A.v[2][1]=p+S,A.v[3][0]=b?u-M:u+M,A.v[3][1]=p,A.i[0][0]=b?u-M*d:u+M*d,A.i[0][1]=p-S,A.i[1][0]=b?u+M:u-M,A.i[1][1]=p-S*d,A.i[2][0]=b?u+M*d:u-M*d,A.i[2][1]=p+S,A.i[3][0]=b?u-M:u+M,A.i[3][1]=p+S*d,A.o[0][0]=b?u+M*d:u-M*d,A.o[0][1]=p-S,A.o[1][0]=b?u+M:u-M,A.o[1][1]=p+S*d,A.o[2][0]=b?u-M*d:u+M*d,A.o[2][1]=p+S,A.o[3][0]=b?u-M:u+M,A.o[3][1]=p-S*d}},extendPrototype([DynamicPropertyContainer],f),f);function f(u,p){this.v=shape_pool.newElement(),this.v.setPathData(!0,4),this.localShapeCollection=shapeCollection_pool.newShapeCollection(),this.paths=this.localShapeCollection,this.localShapeCollection.addShape(this.v),this.d=p.d,this.elem=u,this.comp=u.comp,this.frameId=-1,this.initDynamicPropertyContainer(u),this.p=PropertyFactory.getProp(u,p.p,1,0,this),this.s=PropertyFactory.getProp(u,p.s,1,0,this),this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertEllToPath())}var _=(m.prototype={reset:t,getValue:function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertToPath())},convertStarToPath:function(){var u,p,M,S=2*Math.floor(this.pt.v),b=2*Math.PI/S,A=!0,T=this.or.v,E=this.ir.v,B=this.os.v,P=this.is.v,C=2*Math.PI*T/(2*S),I=2*Math.PI*E/(2*S),N=-Math.PI/2;N+=this.r.v;for(var D=this.data.d===3?-1:1,V=this.v._length=0;V<S;V+=1){p=A?B:P,M=A?C:I;var R=(u=A?T:E)*Math.cos(N),F=u*Math.sin(N),$=R===0&&F===0?0:F/Math.sqrt(R*R+F*F),W=R===0&&F===0?0:-R/Math.sqrt(R*R+F*F);R+=+this.p.v[0],F+=+this.p.v[1],this.v.setTripleAt(R,F,R-$*M*p*D,F-W*M*p*D,R+$*M*p*D,F+W*M*p*D,V,!0),A=!A,N+=b*D}},convertPolygonToPath:function(){var u,p=Math.floor(this.pt.v),M=2*Math.PI/p,S=this.or.v,b=this.os.v,A=2*Math.PI*S/(4*p),T=-Math.PI/2,E=this.data.d===3?-1:1;for(T+=this.r.v,u=this.v._length=0;u<p;u+=1){var B=S*Math.cos(T),P=S*Math.sin(T),C=B===0&&P===0?0:P/Math.sqrt(B*B+P*P),I=B===0&&P===0?0:-B/Math.sqrt(B*B+P*P);B+=+this.p.v[0],P+=+this.p.v[1],this.v.setTripleAt(B,P,B-C*A*b*E,P-I*A*b*E,B+C*A*b*E,P+I*A*b*E,u,!0),T+=M*E}this.paths.length=0,this.paths[0]=this.v}},extendPrototype([DynamicPropertyContainer],m),m);function m(u,p){this.v=shape_pool.newElement(),this.v.setPathData(!0,0),this.elem=u,this.comp=u.comp,this.data=p,this.frameId=-1,this.d=p.d,this.initDynamicPropertyContainer(u),p.sy===1?(this.ir=PropertyFactory.getProp(u,p.ir,0,0,this),this.is=PropertyFactory.getProp(u,p.is,0,.01,this),this.convertToPath=this.convertStarToPath):this.convertToPath=this.convertPolygonToPath,this.pt=PropertyFactory.getProp(u,p.pt,0,0,this),this.p=PropertyFactory.getProp(u,p.p,1,0,this),this.r=PropertyFactory.getProp(u,p.r,0,degToRads,this),this.or=PropertyFactory.getProp(u,p.or,0,0,this),this.os=PropertyFactory.getProp(u,p.os,0,.01,this),this.localShapeCollection=shapeCollection_pool.newShapeCollection(),this.localShapeCollection.addShape(this.v),this.paths=this.localShapeCollection,this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertToPath())}var g=(y.prototype={convertRectToPath:function(){var u=this.p.v[0],p=this.p.v[1],M=this.s.v[0]/2,S=this.s.v[1]/2,b=bm_min(M,S,this.r.v),A=b*(1-roundCorner);this.v._length=0,this.d===2||this.d===1?(this.v.setTripleAt(u+M,p-S+b,u+M,p-S+b,u+M,p-S+A,0,!0),this.v.setTripleAt(u+M,p+S-b,u+M,p+S-A,u+M,p+S-b,1,!0),b!==0?(this.v.setTripleAt(u+M-b,p+S,u+M-b,p+S,u+M-A,p+S,2,!0),this.v.setTripleAt(u-M+b,p+S,u-M+A,p+S,u-M+b,p+S,3,!0),this.v.setTripleAt(u-M,p+S-b,u-M,p+S-b,u-M,p+S-A,4,!0),this.v.setTripleAt(u-M,p-S+b,u-M,p-S+A,u-M,p-S+b,5,!0),this.v.setTripleAt(u-M+b,p-S,u-M+b,p-S,u-M+A,p-S,6,!0),this.v.setTripleAt(u+M-b,p-S,u+M-A,p-S,u+M-b,p-S,7,!0)):(this.v.setTripleAt(u-M,p+S,u-M+A,p+S,u-M,p+S,2),this.v.setTripleAt(u-M,p-S,u-M,p-S+A,u-M,p-S,3))):(this.v.setTripleAt(u+M,p-S+b,u+M,p-S+A,u+M,p-S+b,0,!0),b!==0?(this.v.setTripleAt(u+M-b,p-S,u+M-b,p-S,u+M-A,p-S,1,!0),this.v.setTripleAt(u-M+b,p-S,u-M+A,p-S,u-M+b,p-S,2,!0),this.v.setTripleAt(u-M,p-S+b,u-M,p-S+b,u-M,p-S+A,3,!0),this.v.setTripleAt(u-M,p+S-b,u-M,p+S-A,u-M,p+S-b,4,!0),this.v.setTripleAt(u-M+b,p+S,u-M+b,p+S,u-M+A,p+S,5,!0),this.v.setTripleAt(u+M-b,p+S,u+M-A,p+S,u+M-b,p+S,6,!0),this.v.setTripleAt(u+M,p+S-b,u+M,p+S-b,u+M,p+S-A,7,!0)):(this.v.setTripleAt(u-M,p-S,u-M+A,p-S,u-M,p-S,1,!0),this.v.setTripleAt(u-M,p+S,u-M,p+S-A,u-M,p+S,2,!0),this.v.setTripleAt(u+M,p+S,u+M-A,p+S,u+M,p+S,3,!0)))},getValue:function(u){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertRectToPath())},reset:t},extendPrototype([DynamicPropertyContainer],y),y);function y(u,p){this.v=shape_pool.newElement(),this.v.c=!0,this.localShapeCollection=shapeCollection_pool.newShapeCollection(),this.localShapeCollection.addShape(this.v),this.paths=this.localShapeCollection,this.elem=u,this.comp=u.comp,this.frameId=-1,this.d=p.d,this.initDynamicPropertyContainer(u),this.p=PropertyFactory.getProp(u,p.p,1,0,this),this.s=PropertyFactory.getProp(u,p.s,1,0,this),this.r=PropertyFactory.getProp(u,p.r,0,0,this),this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertRectToPath())}var x={getShapeProp:function(u,p,M){var S;return M===3||M===4?S=new((M===3?p.pt:p.ks).k.length?l:s)(u,p,M):M===5?S=new g(u,p):M===6?S=new c(u,p):M===7&&(S=new _(u,p)),S.k&&u.addDynamicProperty(S),S},getConstructorFunction:function(){return s},getKeyframedConstructorFunction:function(){return l}};return x}(),ShapeModifiers=(fs={},gs={},fs.registerModifier=function(n,e){gs[n]||(gs[n]=e)},fs.getModifier=function(n,e,t){return new gs[n](e,t)},fs),fs,gs;function ShapeModifier(){}function TrimModifier(){}function RoundCornersModifier(){}function RepeaterModifier(){}function ShapeCollection(){this._length=0,this._maxLength=4,this.shapes=createSizedArray(this._maxLength)}function DashProperty(n,e,t,r){this.elem=n,this.frameId=-1,this.dataProps=createSizedArray(e.length),this.renderer=t,this.k=!1,this.dashStr="",this.dashArray=createTypedArray("float32",e.length?e.length-1:0),this.dashoffset=createTypedArray("float32",1),this.initDynamicPropertyContainer(r);for(var a,s=e.length||0,o=0;o<s;o+=1)a=PropertyFactory.getProp(n,e[o].v,0,0,this),this.k=a.k||this.k,this.dataProps[o]={n:e[o].n,p:a};this.k||this.getValue(!0),this._isAnimated=this.k}function GradientProperty(n,e,t){this.data=e,this.c=createTypedArray("uint8c",4*e.p);var r=e.k.k[0].s?e.k.k[0].s.length-4*e.p:e.k.k.length-4*e.p;this.o=createTypedArray("float32",r),this._cmdf=!1,this._omdf=!1,this._collapsable=this.checkCollapsable(),this._hasOpacity=r,this.initDynamicPropertyContainer(t),this.prop=PropertyFactory.getProp(n,e.k,1,null,this),this.k=this.prop.k,this.getValue(!0)}ShapeModifier.prototype.initModifierProperties=function(){},ShapeModifier.prototype.addShapeToModifier=function(){},ShapeModifier.prototype.addShape=function(n){var e;this.closed||(n.sh.container.addDynamicProperty(n.sh),e={shape:n.sh,data:n,localShapeCollection:shapeCollection_pool.newShapeCollection()},this.shapes.push(e),this.addShapeToModifier(e),this._isAnimated&&n.setAsAnimated())},ShapeModifier.prototype.init=function(n,e){this.shapes=[],this.elem=n,this.initDynamicPropertyContainer(n),this.initModifierProperties(n,e),this.frameId=initialDefaultFrame,this.closed=!1,this.k=!1,this.dynamicProperties.length?this.k=!0:this.getValue(!0)},ShapeModifier.prototype.processKeys=function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties())},extendPrototype([DynamicPropertyContainer],ShapeModifier),extendPrototype([ShapeModifier],TrimModifier),TrimModifier.prototype.initModifierProperties=function(n,e){this.s=PropertyFactory.getProp(n,e.s,0,.01,this),this.e=PropertyFactory.getProp(n,e.e,0,.01,this),this.o=PropertyFactory.getProp(n,e.o,0,0,this),this.sValue=0,this.eValue=0,this.getValue=this.processKeys,this.m=e.m,this._isAnimated=!!this.s.effectsSequence.length||!!this.e.effectsSequence.length||!!this.o.effectsSequence.length},TrimModifier.prototype.addShapeToModifier=function(n){n.pathsData=[]},TrimModifier.prototype.calculateShapeEdges=function(n,e,t,r,a){var s=[];e<=1?s.push({s:n,e}):1<=n?s.push({s:n-1,e:e-1}):(s.push({s:n,e:1}),s.push({s:0,e:e-1}));for(var o,l,d,c=[],f=s.length,_=0;_<f;_+=1)(d=s[_]).e*a<r||d.s*a>r+t||(o=d.s*a<=r?0:(d.s*a-r)/t,l=d.e*a>=r+t?1:(d.e*a-r)/t,c.push([o,l]));return c.length||c.push([0,0]),c},TrimModifier.prototype.releasePathsData=function(n){for(var e=n.length,t=0;t<e;t+=1)segments_length_pool.release(n[t]);return n.length=0,n},TrimModifier.prototype.processShapes=function(n){var e,t,r,a,s;this._mdf||n?((e=this.o.v%360/360)<0&&(e+=1),r=(1<this.s.v?1:this.s.v<0?0:this.s.v)+e,(a=(1<this.e.v?1:this.e.v<0?0:this.e.v)+e)<r&&(t=r,r=a,a=t),r=1e-4*Math.round(1e4*r),a=1e-4*Math.round(1e4*a),this.sValue=r,this.eValue=a):(r=this.sValue,a=this.eValue);var o,l,d,c,f,_=this.shapes.length,m=0;if(a===r)for(u=0;u<_;u+=1)this.shapes[u].localShapeCollection.releaseShapes(),this.shapes[u].shape._mdf=!0,this.shapes[u].shape.paths=this.shapes[u].localShapeCollection;else if(a===1&&r===0||a===0&&r===1){if(this._mdf)for(u=0;u<_;u+=1)this.shapes[u].pathsData.length=0,this.shapes[u].shape._mdf=!0}else{for(var g,y,x=[],u=0;u<_;u+=1)if((g=this.shapes[u]).shape._mdf||this._mdf||n||this.m===2){if(l=(s=g.shape.paths)._length,f=0,!g.shape._mdf&&g.pathsData.length)f=g.totalShapeLength;else{for(d=this.releasePathsData(g.pathsData),o=0;o<l;o+=1)c=bez.getSegmentsLength(s.shapes[o]),d.push(c),f+=c.totalLength;g.totalShapeLength=f,g.pathsData=d}m+=f,g.shape._mdf=!0}else g.shape.paths=g.localShapeCollection;var p,M=r,S=a,b=0;for(u=_-1;0<=u;--u)if((g=this.shapes[u]).shape._mdf){for((y=g.localShapeCollection).releaseShapes(),this.m===2&&1<_?(p=this.calculateShapeEdges(r,a,g.totalShapeLength,b,m),b+=g.totalShapeLength):p=[[M,S]],l=p.length,o=0;o<l;o+=1){M=p[o][0],S=p[o][1],x.length=0,S<=1?x.push({s:g.totalShapeLength*M,e:g.totalShapeLength*S}):1<=M?x.push({s:g.totalShapeLength*(M-1),e:g.totalShapeLength*(S-1)}):(x.push({s:g.totalShapeLength*M,e:g.totalShapeLength}),x.push({s:0,e:g.totalShapeLength*(S-1)}));var A,T=this.addShapes(g,x[0]);x[0].s!==x[0].e&&(1<x.length&&(T=g.shape.paths.shapes[g.shape.paths._length-1].c?(A=T.pop(),this.addPaths(T,y),this.addShapes(g,x[1],A)):(this.addPaths(T,y),this.addShapes(g,x[1]))),this.addPaths(T,y))}g.shape.paths=y}}},TrimModifier.prototype.addPaths=function(n,e){for(var t=n.length,r=0;r<t;r+=1)e.addShape(n[r])},TrimModifier.prototype.addSegment=function(n,e,t,r,a,s,o){a.setXYAt(e[0],e[1],"o",s),a.setXYAt(t[0],t[1],"i",s+1),o&&a.setXYAt(n[0],n[1],"v",s),a.setXYAt(r[0],r[1],"v",s+1)},TrimModifier.prototype.addSegmentFromArray=function(n,e,t,r){e.setXYAt(n[1],n[5],"o",t),e.setXYAt(n[2],n[6],"i",t+1),r&&e.setXYAt(n[0],n[4],"v",t),e.setXYAt(n[3],n[7],"v",t+1)},TrimModifier.prototype.addShapes=function(n,e,t){var r,a,s,o,l,d,c,f,_=n.pathsData,m=n.shape.paths.shapes,g=n.shape.paths._length,y=0,x=[],u=!0,p=t?(o=t._length,t._length):(t=shape_pool.newElement(),o=0);for(x.push(t),r=0;r<g;r+=1){for(l=_[r].lengths,t.c=m[r].c,s=m[r].c?l.length:l.length+1,a=1;a<s;a+=1)if(y+(f=l[a-1]).addedLength<e.s)y+=f.addedLength,t.c=!1;else{if(y>e.e){t.c=!1;break}e.s<=y&&e.e>=y+f.addedLength?(this.addSegment(m[r].v[a-1],m[r].o[a-1],m[r].i[a],m[r].v[a],t,o,u),u=!1):(d=bez.getNewSegment(m[r].v[a-1],m[r].v[a],m[r].o[a-1],m[r].i[a],(e.s-y)/f.addedLength,(e.e-y)/f.addedLength,l[a-1]),this.addSegmentFromArray(d,t,o,u),u=!1,t.c=!1),y+=f.addedLength,o+=1}if(m[r].c&&l.length&&(f=l[a-1],y<=e.e?(c=l[a-1].addedLength,e.s<=y&&e.e>=y+c?(this.addSegment(m[r].v[a-1],m[r].o[a-1],m[r].i[0],m[r].v[0],t,o,u),u=!1):(d=bez.getNewSegment(m[r].v[a-1],m[r].v[0],m[r].o[a-1],m[r].i[0],(e.s-y)/c,(e.e-y)/c,l[a-1]),this.addSegmentFromArray(d,t,o,u),u=!1,t.c=!1)):t.c=!1,y+=f.addedLength,o+=1),t._length&&(t.setXYAt(t.v[p][0],t.v[p][1],"i",p),t.setXYAt(t.v[t._length-1][0],t.v[t._length-1][1],"o",t._length-1)),y>e.e)break;r<g-1&&(t=shape_pool.newElement(),u=!0,x.push(t),o=0)}return x},ShapeModifiers.registerModifier("tm",TrimModifier),extendPrototype([ShapeModifier],RoundCornersModifier),RoundCornersModifier.prototype.initModifierProperties=function(n,e){this.getValue=this.processKeys,this.rd=PropertyFactory.getProp(n,e.r,0,null,this),this._isAnimated=!!this.rd.effectsSequence.length},RoundCornersModifier.prototype.processPath=function(n,e){var t=shape_pool.newElement();t.c=n.c;for(var r,a,s,o,l,d,c,f,_,m,g,y,x=n._length,u=0,p=0;p<x;p+=1)r=n.v[p],s=n.o[p],a=n.i[p],r[0]===s[0]&&r[1]===s[1]&&r[0]===a[0]&&r[1]===a[1]?p!==0&&p!==x-1||n.c?(o=p===0?n.v[x-1]:n.v[p-1],d=(l=Math.sqrt(Math.pow(r[0]-o[0],2)+Math.pow(r[1]-o[1],2)))?Math.min(l/2,e)/l:0,c=g=r[0]+(o[0]-r[0])*d,f=y=r[1]-(r[1]-o[1])*d,_=c-(c-r[0])*roundCorner,m=f-(f-r[1])*roundCorner,t.setTripleAt(c,f,_,m,g,y,u),u+=1,o=p===x-1?n.v[0]:n.v[p+1],d=(l=Math.sqrt(Math.pow(r[0]-o[0],2)+Math.pow(r[1]-o[1],2)))?Math.min(l/2,e)/l:0,c=_=r[0]+(o[0]-r[0])*d,f=m=r[1]+(o[1]-r[1])*d,g=c-(c-r[0])*roundCorner,y=f-(f-r[1])*roundCorner,t.setTripleAt(c,f,_,m,g,y,u)):t.setTripleAt(r[0],r[1],s[0],s[1],a[0],a[1],u):t.setTripleAt(n.v[p][0],n.v[p][1],n.o[p][0],n.o[p][1],n.i[p][0],n.i[p][1],u),u+=1;return t},RoundCornersModifier.prototype.processShapes=function(n){var e,t,r,a=this.shapes.length,s=this.rd.v;if(s!==0)for(var o,l,d=0;d<a;d+=1){if((o=this.shapes[d]).shape.paths,l=o.localShapeCollection,o.shape._mdf||this._mdf||n)for(l.releaseShapes(),o.shape._mdf=!0,e=o.shape.paths.shapes,r=o.shape.paths._length,t=0;t<r;t+=1)l.addShape(this.processPath(e[t],s));o.shape.paths=o.localShapeCollection}this.dynamicProperties.length||(this._mdf=!1)},ShapeModifiers.registerModifier("rd",RoundCornersModifier),extendPrototype([ShapeModifier],RepeaterModifier),RepeaterModifier.prototype.initModifierProperties=function(n,e){this.getValue=this.processKeys,this.c=PropertyFactory.getProp(n,e.c,0,null,this),this.o=PropertyFactory.getProp(n,e.o,0,null,this),this.tr=TransformPropertyFactory.getTransformProperty(n,e.tr,this),this.so=PropertyFactory.getProp(n,e.tr.so,0,.01,this),this.eo=PropertyFactory.getProp(n,e.tr.eo,0,.01,this),this.data=e,this.dynamicProperties.length||this.getValue(!0),this._isAnimated=!!this.dynamicProperties.length,this.pMatrix=new Matrix,this.rMatrix=new Matrix,this.sMatrix=new Matrix,this.tMatrix=new Matrix,this.matrix=new Matrix},RepeaterModifier.prototype.applyTransforms=function(n,e,t,r,a,s){var o=s?-1:1,l=r.s.v[0]+(1-r.s.v[0])*(1-a),d=r.s.v[1]+(1-r.s.v[1])*(1-a);n.translate(r.p.v[0]*o*a,r.p.v[1]*o*a,r.p.v[2]),e.translate(-r.a.v[0],-r.a.v[1],r.a.v[2]),e.rotate(-r.r.v*o*a),e.translate(r.a.v[0],r.a.v[1],r.a.v[2]),t.translate(-r.a.v[0],-r.a.v[1],r.a.v[2]),t.scale(s?1/l:l,s?1/d:d),t.translate(r.a.v[0],r.a.v[1],r.a.v[2])},RepeaterModifier.prototype.init=function(n,e,t,r){for(this.elem=n,this.arr=e,this.pos=t,this.elemsData=r,this._currentCopies=0,this._elements=[],this._groups=[],this.frameId=-1,this.initDynamicPropertyContainer(n),this.initModifierProperties(n,e[t]);0<t;)--t,this._elements.unshift(e[t]);this.dynamicProperties.length?this.k=!0:this.getValue(!0)},RepeaterModifier.prototype.resetElements=function(n){for(var e=n.length,t=0;t<e;t+=1)n[t]._processed=!1,n[t].ty==="gr"&&this.resetElements(n[t].it)},RepeaterModifier.prototype.cloneElements=function(n){n.length;var e=JSON.parse(JSON.stringify(n));return this.resetElements(e),e},RepeaterModifier.prototype.changeGroupRender=function(n,e){for(var t=n.length,r=0;r<t;r+=1)n[r]._render=e,n[r].ty==="gr"&&this.changeGroupRender(n[r].it,e)},RepeaterModifier.prototype.processShapes=function(n){var e,t,r,a,s;if(this._mdf||n){var o,l=Math.ceil(this.c.v);if(this._groups.length<l){for(;this._groups.length<l;){var d={it:this.cloneElements(this._elements),ty:"gr"};d.it.push({a:{a:0,ix:1,k:[0,0]},nm:"Transform",o:{a:0,ix:7,k:100},p:{a:0,ix:2,k:[0,0]},r:{a:1,ix:6,k:[{s:0,e:0,t:0},{s:0,e:0,t:1}]},s:{a:0,ix:3,k:[100,100]},sa:{a:0,ix:5,k:0},sk:{a:0,ix:4,k:0},ty:"tr"}),this.arr.splice(0,0,d),this._groups.splice(0,0,d),this._currentCopies+=1}this.elem.reloadShapes()}for(r=s=0;r<=this._groups.length-1;r+=1)o=s<l,this._groups[r]._render=o,this.changeGroupRender(this._groups[r].it,o),s+=1;this._currentCopies=l;var c=this.o.v,f=c%1,_=0<c?Math.floor(c):Math.ceil(c),m=(this.tr.v.props,this.pMatrix.props),g=this.rMatrix.props,y=this.sMatrix.props;this.pMatrix.reset(),this.rMatrix.reset(),this.sMatrix.reset(),this.tMatrix.reset(),this.matrix.reset();var x,u,p=0;if(0<c){for(;p<_;)this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!1),p+=1;f&&(this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,f,!1),p+=f)}else if(c<0){for(;_<p;)this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!0),--p;f&&(this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,-f,!0),p-=f)}for(r=this.data.m===1?0:this._currentCopies-1,a=this.data.m===1?1:-1,s=this._currentCopies;s;){if(u=(t=(e=this.elemsData[r].it)[e.length-1].transform.mProps.v.props).length,e[e.length-1].transform.mProps._mdf=!0,e[e.length-1].transform.op._mdf=!0,e[e.length-1].transform.op.v=this.so.v+(this.eo.v-this.so.v)*(r/(this._currentCopies-1)),p!==0){for((r!==0&&a===1||r!==this._currentCopies-1&&a===-1)&&this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!1),this.matrix.transform(g[0],g[1],g[2],g[3],g[4],g[5],g[6],g[7],g[8],g[9],g[10],g[11],g[12],g[13],g[14],g[15]),this.matrix.transform(y[0],y[1],y[2],y[3],y[4],y[5],y[6],y[7],y[8],y[9],y[10],y[11],y[12],y[13],y[14],y[15]),this.matrix.transform(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15]),x=0;x<u;x+=1)t[x]=this.matrix.props[x];this.matrix.reset()}else for(this.matrix.reset(),x=0;x<u;x+=1)t[x]=this.matrix.props[x];p+=1,--s,r+=a}}else for(s=this._currentCopies,r=0,a=1;s;)t=(e=this.elemsData[r].it)[e.length-1].transform.mProps.v.props,e[e.length-1].transform.mProps._mdf=!1,e[e.length-1].transform.op._mdf=!1,--s,r+=a},RepeaterModifier.prototype.addShape=function(){},ShapeModifiers.registerModifier("rp",RepeaterModifier),ShapeCollection.prototype.addShape=function(n){this._length===this._maxLength&&(this.shapes=this.shapes.concat(createSizedArray(this._maxLength)),this._maxLength*=2),this.shapes[this._length]=n,this._length+=1},ShapeCollection.prototype.releaseShapes=function(){for(var n=0;n<this._length;n+=1)shape_pool.release(this.shapes[n]);this._length=0},DashProperty.prototype.getValue=function(n){if((this.elem.globalData.frameId!==this.frameId||n)&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf=this._mdf||n,this._mdf)){var e=0,t=this.dataProps.length;for(this.renderer==="svg"&&(this.dashStr=""),e=0;e<t;e+=1)this.dataProps[e].n!="o"?this.renderer==="svg"?this.dashStr+=" "+this.dataProps[e].p.v:this.dashArray[e]=this.dataProps[e].p.v:this.dashoffset[0]=this.dataProps[e].p.v}},extendPrototype([DynamicPropertyContainer],DashProperty),GradientProperty.prototype.comparePoints=function(n,e){for(var t=0,r=this.o.length/2;t<r;){if(.01<Math.abs(n[4*t]-n[4*e+2*t]))return!1;t+=1}return!0},GradientProperty.prototype.checkCollapsable=function(){if(this.o.length/2!=this.c.length/4)return!1;if(this.data.k.k[0].s)for(var n=0,e=this.data.k.k.length;n<e;){if(!this.comparePoints(this.data.k.k[n].s,this.data.p))return!1;n+=1}else if(!this.comparePoints(this.data.k.k,this.data.p))return!1;return!0},GradientProperty.prototype.getValue=function(n){if(this.prop.getValue(),this._mdf=!1,this._cmdf=!1,this._omdf=!1,this.prop._mdf||n){for(var e,t,r=4*this.data.p,a=0;a<r;a+=1)e=a%4==0?100:255,t=Math.round(this.prop.v[a]*e),this.c[a]!==t&&(this.c[a]=t,this._cmdf=!n);if(this.o.length)for(r=this.prop.v.length,a=4*this.data.p;a<r;a+=1)e=a%2==0?100:1,t=a%2==0?Math.round(100*this.prop.v[a]):this.prop.v[a],this.o[a-4*this.data.p]!==t&&(this.o[a-4*this.data.p]=t,this._omdf=!n);this._mdf=!n}},extendPrototype([DynamicPropertyContainer],GradientProperty);var buildShapeString=function(n,e,t,r){if(e===0)return"";for(var a=n.o,s=n.i,o=n.v,l=" M"+r.applyToPointStringified(o[0][0],o[0][1]),d=1;d<e;d+=1)l+=" C"+r.applyToPointStringified(a[d-1][0],a[d-1][1])+" "+r.applyToPointStringified(s[d][0],s[d][1])+" "+r.applyToPointStringified(o[d][0],o[d][1]);return t&&e&&(l+=" C"+r.applyToPointStringified(a[d-1][0],a[d-1][1])+" "+r.applyToPointStringified(s[0][0],s[0][1])+" "+r.applyToPointStringified(o[0][0],o[0][1]),l+="z"),l},ImagePreloader=(Wv=function(){var n=createTag("canvas");n.width=1,n.height=1;var e=n.getContext("2d");return e.fillStyle="rgba(0,0,0,0)",e.fillRect(0,0,1,1),n}(),gw.prototype={loadAssets:function(n,e){this.imagesLoadedCb=e;for(var t=n.length,r=0;r<t;r+=1)n[r].layers||(this.totalImages+=1,this.images.push(this._createImageData(n[r])))},setAssetsPath:function(n){this.assetsPath=n||""},setPath:function(n){this.path=n||""},loaded:function(){return this.totalImages===this.loadedAssets},destroy:function(){this.imagesLoadedCb=null,this.images.length=0},getImage:function(n){for(var e=0,t=this.images.length;e<t;){if(this.images[e].assetData===n)return this.images[e].img;e+=1}},createImgData:function(n){var e=Yv(n,this.assetsPath,this.path),t=createTag("img");t.crossOrigin="anonymous",t.addEventListener("load",this._imageLoaded,!1),t.addEventListener("error",(function(){r.img=Wv,this._imageLoaded()}).bind(this),!1),t.src=e;var r={img:t,assetData:n};return r},createImageData:function(n){var e=Yv(n,this.assetsPath,this.path),t=createNS("image");t.addEventListener("load",this._imageLoaded,!1),t.addEventListener("error",(function(){r.img=Wv,this._imageLoaded()}).bind(this),!1),t.setAttributeNS("http://www.w3.org/1999/xlink","href",e);var r={img:t,assetData:n};return r},imageLoaded:Xv,setCacheType:function(n){this._createImageData=n==="svg"?this.createImageData.bind(this):this.createImgData.bind(this)}},gw),Wv;function Xv(){this.loadedAssets+=1,this.loadedAssets===this.totalImages&&this.imagesLoadedCb&&this.imagesLoadedCb(null)}function Yv(n,e,t){var r,a="";return n.e?a=n.p:e?((r=n.p).indexOf("images/")!==-1&&(r=r.split("/")[1]),a=e+r):(a=t,a+=n.u?n.u:"",a+=n.p),a}function gw(n){this._imageLoaded=Xv.bind(this),this.assetsPath="",this.path="",this.totalImages=0,this.loadedAssets=0,this.imagesLoadedCb=null,this.images=[]}var featureSupport=(Hw={maskType:!0},(/MSIE 10/i.test(navigator.userAgent)||/MSIE 9/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent))&&(Hw.maskType=!1),Hw),Hw,filtersFactory=(Iw={},Iw.createFilter=function(n){var e=createNS("filter");return e.setAttribute("id",n),e.setAttribute("filterUnits","objectBoundingBox"),e.setAttribute("x","0%"),e.setAttribute("y","0%"),e.setAttribute("width","100%"),e.setAttribute("height","100%"),e},Iw.createAlphaToLuminanceFilter=function(){var n=createNS("feColorMatrix");return n.setAttribute("type","matrix"),n.setAttribute("color-interpolation-filters","sRGB"),n.setAttribute("values","0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"),n},Iw),Iw,assetLoader={load:function(n,e,t){var r,a=new XMLHttpRequest;a.open("GET",n,!0);try{a.responseType="json"}catch{}a.send(),a.onreadystatechange=function(){if(a.readyState==4)if(a.status==200)r=Ow(a),e(r);else try{r=Ow(a),e(r)}catch(s){t&&t(s)}}}};function Ow(n){return n.response&&typeof n.response=="object"?n.response:n.response&&typeof n.response=="string"?JSON.parse(n.response):n.responseText?JSON.parse(n.responseText):void 0}function TextAnimatorProperty(n,e,t){this._isFirstFrame=!0,this._hasMaskedPath=!1,this._frameId=-1,this._textData=n,this._renderType=e,this._elem=t,this._animatorsData=createSizedArray(this._textData.a.length),this._pathData={},this._moreOptions={alignment:{}},this.renderedLetters=[],this.lettersChangedFlag=!1,this.initDynamicPropertyContainer(t)}function TextAnimatorDataProperty(n,e,t){var r={propType:!1},a=PropertyFactory.getProp,s=e.a;this.a={r:s.r?a(n,s.r,0,degToRads,t):r,rx:s.rx?a(n,s.rx,0,degToRads,t):r,ry:s.ry?a(n,s.ry,0,degToRads,t):r,sk:s.sk?a(n,s.sk,0,degToRads,t):r,sa:s.sa?a(n,s.sa,0,degToRads,t):r,s:s.s?a(n,s.s,1,.01,t):r,a:s.a?a(n,s.a,1,0,t):r,o:s.o?a(n,s.o,0,.01,t):r,p:s.p?a(n,s.p,1,0,t):r,sw:s.sw?a(n,s.sw,0,0,t):r,sc:s.sc?a(n,s.sc,1,0,t):r,fc:s.fc?a(n,s.fc,1,0,t):r,fh:s.fh?a(n,s.fh,0,0,t):r,fs:s.fs?a(n,s.fs,0,.01,t):r,fb:s.fb?a(n,s.fb,0,.01,t):r,t:s.t?a(n,s.t,0,0,t):r},this.s=TextSelectorProp.getTextSelectorProp(n,e.s,t),this.s.t=e.s.t}function LetterProps(n,e,t,r,a,s){this.o=n,this.sw=e,this.sc=t,this.fc=r,this.m=a,this.p=s,this._mdf={o:!0,sw:!!e,sc:!!t,fc:!!r,m:!0,p:!0}}function TextProperty(n,e){this._frameId=initialDefaultFrame,this.pv="",this.v="",this.kf=!1,this._isFirstFrame=!0,this._mdf=!1,this.data=e,this.elem=n,this.comp=this.elem.comp,this.keysIndex=0,this.canResize=!1,this.minimumFontSize=1,this.effectsSequence=[],this.currentData={ascent:0,boxWidth:this.defaultBoxWidth,f:"",fStyle:"",fWeight:"",fc:"",j:"",justifyOffset:"",l:[],lh:0,lineWidths:[],ls:"",of:"",s:"",sc:"",sw:0,t:0,tr:0,sz:0,ps:null,fillColorAnim:!1,strokeColorAnim:!1,strokeWidthAnim:!1,yOffset:0,finalSize:0,finalText:[],finalLineHeight:0,__complete:!1},this.copyData(this.currentData,this.data.d.k[0].s),this.searchProperty()||this.completeTextData(this.currentData)}TextAnimatorProperty.prototype.searchProperties=function(){for(var n,e=this._textData.a.length,t=PropertyFactory.getProp,r=0;r<e;r+=1)n=this._textData.a[r],this._animatorsData[r]=new TextAnimatorDataProperty(this._elem,n,this);this._textData.p&&"m"in this._textData.p?(this._pathData={f:t(this._elem,this._textData.p.f,0,0,this),l:t(this._elem,this._textData.p.l,0,0,this),r:this._textData.p.r,m:this._elem.maskManager.getMaskProperty(this._textData.p.m)},this._hasMaskedPath=!0):this._hasMaskedPath=!1,this._moreOptions.alignment=t(this._elem,this._textData.m.a,1,0,this)},TextAnimatorProperty.prototype.getMeasures=function(n,e){if(this.lettersChangedFlag=e,this._mdf||this._isFirstFrame||e||this._hasMaskedPath&&this._pathData.m._mdf){this._isFirstFrame=!1;var t,r,a,s,o,l,d,c,f,_,m,g,y,x,u,p,M,S,b=this._moreOptions.alignment.v,A=this._animatorsData,T=this._textData,E=this.mHelper,B=this._renderType,P=this.renderedLetters.length,C=(this.data,n.l);if(this._hasMaskedPath){if(S=this._pathData.m,!this._pathData.n||this._pathData._mdf){var I,N=S.v;for(this._pathData.r&&(N=N.reverse()),s={tLength:0,segments:[]},a=N._length-1,Z=u=0;Z<a;Z+=1)I=bez.buildBezierData(N.v[Z],N.v[Z+1],[N.o[Z][0]-N.v[Z][0],N.o[Z][1]-N.v[Z][1]],[N.i[Z+1][0]-N.v[Z+1][0],N.i[Z+1][1]-N.v[Z+1][1]]),s.tLength+=I.segmentLength,s.segments.push(I),u+=I.segmentLength;Z=a,S.v.c&&(I=bez.buildBezierData(N.v[Z],N.v[0],[N.o[Z][0]-N.v[Z][0],N.o[Z][1]-N.v[Z][1]],[N.i[0][0]-N.v[0][0],N.i[0][1]-N.v[0][1]]),s.tLength+=I.segmentLength,s.segments.push(I),u+=I.segmentLength),this._pathData.pi=s}if(s=this._pathData.pi,o=this._pathData.f.v,f=1,c=!(d=_=0),y=s.segments,o<0&&S.v.c)for(s.tLength<Math.abs(o)&&(o=-Math.abs(o)%s.tLength),f=(g=y[_=y.length-1].points).length-1;o<0;)o+=g[f].partialLength,--f<0&&(f=(g=y[--_].points).length-1);m=(g=y[_].points)[f-1],x=(l=g[f]).partialLength}a=C.length,r=t=0;var D,V,R,F,$,W,J,j,ie,ae,he,z,X,re,Y,de,fe=1.2*n.finalSize*.714,Te=!0,O=A.length,Ae=-1,Fe=o,Pe=_,ve=f,Le=-1,Ie="",Re=this.defaultPropsArray;if(n.j===2||n.j===1){for(var Oe=0,U=0,L=n.j===2?-.5:-1,te=0,ce=!0,Z=0;Z<a;Z+=1)if(C[Z].n){for(Oe&&(Oe+=U);te<Z;)C[te].animatorJustifyOffset=Oe,te+=1;ce=!(Oe=0)}else{for(le=0;le<O;le+=1)(D=A[le].a).t.propType&&(ce&&n.j===2&&(U+=D.t.v*L),(R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars)).length?Oe+=D.t.v*R[0]*L:Oe+=D.t.v*R*L);ce=!1}for(Oe&&(Oe+=U);te<Z;)C[te].animatorJustifyOffset=Oe,te+=1}for(Z=0;Z<a;Z+=1){if(E.reset(),J=1,C[Z].n)t=0,r+=n.yOffset,r+=Te?1:0,o=Fe,Te=!1,this._hasMaskedPath&&(f=ve,m=(g=y[_=Pe].points)[f-1],x=(l=g[f]).partialLength,d=0),Y=z=re=Ie="",Re=this.defaultPropsArray;else{if(this._hasMaskedPath){if(Le!==C[Z].line){switch(n.j){case 1:o+=u-n.lineWidths[C[Z].line];break;case 2:o+=(u-n.lineWidths[C[Z].line])/2}Le=C[Z].line}Ae!==C[Z].ind&&(C[Ae]&&(o+=C[Ae].extra),o+=C[Z].an/2,Ae=C[Z].ind),o+=b[0]*C[Z].an/200;for(var ue=0,le=0;le<O;le+=1)(D=A[le].a).p.propType&&((R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars)).length?ue+=D.p.v[0]*R[0]:ue+=D.p.v[0]*R),D.a.propType&&((R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars)).length?ue+=D.a.v[0]*R[0]:ue+=D.a.v[0]*R);for(c=!0;c;)o+ue<=d+x||!g?(p=(o+ue-d)/l.partialLength,$=m.point[0]+(l.point[0]-m.point[0])*p,W=m.point[1]+(l.point[1]-m.point[1])*p,E.translate(-b[0]*C[Z].an/200,-b[1]*fe/100),c=!1):g&&(d+=l.partialLength,(f+=1)>=g.length&&(f=0,g=y[_+=1]?y[_].points:S.v.c?y[_=f=0].points:(d-=l.partialLength,null)),g&&(m=l,x=(l=g[f]).partialLength));F=C[Z].an/2-C[Z].add,E.translate(-F,0,0)}else F=C[Z].an/2-C[Z].add,E.translate(-F,0,0),E.translate(-b[0]*C[Z].an/200,-b[1]*fe/100,0);for(C[Z].l,le=0;le<O;le+=1)(D=A[le].a).t.propType&&(R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars),t===0&&n.j===0||(this._hasMaskedPath?R.length?o+=D.t.v*R[0]:o+=D.t.v*R:R.length?t+=D.t.v*R[0]:t+=D.t.v*R));for(C[Z].l,n.strokeWidthAnim&&(ie=n.sw||0),n.strokeColorAnim&&(j=n.sc?[n.sc[0],n.sc[1],n.sc[2]]:[0,0,0]),n.fillColorAnim&&n.fc&&(ae=[n.fc[0],n.fc[1],n.fc[2]]),le=0;le<O;le+=1)(D=A[le].a).a.propType&&((R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars)).length?E.translate(-D.a.v[0]*R[0],-D.a.v[1]*R[1],D.a.v[2]*R[2]):E.translate(-D.a.v[0]*R,-D.a.v[1]*R,D.a.v[2]*R));for(le=0;le<O;le+=1)(D=A[le].a).s.propType&&((R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars)).length?E.scale(1+(D.s.v[0]-1)*R[0],1+(D.s.v[1]-1)*R[1],1):E.scale(1+(D.s.v[0]-1)*R,1+(D.s.v[1]-1)*R,1));for(le=0;le<O;le+=1){if(D=A[le].a,R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars),D.sk.propType&&(R.length?E.skewFromAxis(-D.sk.v*R[0],D.sa.v*R[1]):E.skewFromAxis(-D.sk.v*R,D.sa.v*R)),D.r.propType&&(R.length?E.rotateZ(-D.r.v*R[2]):E.rotateZ(-D.r.v*R)),D.ry.propType&&(R.length?E.rotateY(D.ry.v*R[1]):E.rotateY(D.ry.v*R)),D.rx.propType&&(R.length?E.rotateX(D.rx.v*R[0]):E.rotateX(D.rx.v*R)),D.o.propType&&(R.length?J+=(D.o.v*R[0]-J)*R[0]:J+=(D.o.v*R-J)*R),n.strokeWidthAnim&&D.sw.propType&&(R.length?ie+=D.sw.v*R[0]:ie+=D.sw.v*R),n.strokeColorAnim&&D.sc.propType)for(he=0;he<3;he+=1)R.length?j[he]=j[he]+(D.sc.v[he]-j[he])*R[0]:j[he]=j[he]+(D.sc.v[he]-j[he])*R;if(n.fillColorAnim&&n.fc){if(D.fc.propType)for(he=0;he<3;he+=1)R.length?ae[he]=ae[he]+(D.fc.v[he]-ae[he])*R[0]:ae[he]=ae[he]+(D.fc.v[he]-ae[he])*R;D.fh.propType&&(ae=R.length?addHueToRGB(ae,D.fh.v*R[0]):addHueToRGB(ae,D.fh.v*R)),D.fs.propType&&(ae=R.length?addSaturationToRGB(ae,D.fs.v*R[0]):addSaturationToRGB(ae,D.fs.v*R)),D.fb.propType&&(ae=R.length?addBrightnessToRGB(ae,D.fb.v*R[0]):addBrightnessToRGB(ae,D.fb.v*R))}}for(le=0;le<O;le+=1)(D=A[le].a).p.propType&&(R=A[le].s.getMult(C[Z].anIndexes[le],T.a[le].s.totalChars),this._hasMaskedPath?R.length?E.translate(0,D.p.v[1]*R[0],-D.p.v[2]*R[1]):E.translate(0,D.p.v[1]*R,-D.p.v[2]*R):R.length?E.translate(D.p.v[0]*R[0],D.p.v[1]*R[1],-D.p.v[2]*R[2]):E.translate(D.p.v[0]*R,D.p.v[1]*R,-D.p.v[2]*R));if(n.strokeWidthAnim&&(z=ie<0?0:ie),n.strokeColorAnim&&(X="rgb("+Math.round(255*j[0])+","+Math.round(255*j[1])+","+Math.round(255*j[2])+")"),n.fillColorAnim&&n.fc&&(re="rgb("+Math.round(255*ae[0])+","+Math.round(255*ae[1])+","+Math.round(255*ae[2])+")"),this._hasMaskedPath)E.translate(0,-n.ls),E.translate(0,b[1]*fe/100+r,0),T.p.p&&(M=(l.point[1]-m.point[1])/(l.point[0]-m.point[0]),de=180*Math.atan(M)/Math.PI,l.point[0]<m.point[0]&&(de+=180),E.rotate(-de*Math.PI/180)),E.translate($,W,0),o-=b[0]*C[Z].an/200,C[Z+1]&&Ae!==C[Z+1].ind&&(o+=C[Z].an/2,o+=n.tr/1e3*n.finalSize);else{switch(E.translate(t,r,0),n.ps&&E.translate(n.ps[0],n.ps[1]+n.ascent,0),n.j){case 1:E.translate(C[Z].animatorJustifyOffset+n.justifyOffset+(n.boxWidth-n.lineWidths[C[Z].line]),0,0);break;case 2:E.translate(C[Z].animatorJustifyOffset+n.justifyOffset+(n.boxWidth-n.lineWidths[C[Z].line])/2,0,0)}E.translate(0,-n.ls),E.translate(F,0,0),E.translate(b[0]*C[Z].an/200,b[1]*fe/100,0),t+=C[Z].l+n.tr/1e3*n.finalSize}B==="html"?Ie=E.toCSS():B==="svg"?Ie=E.to2dCSS():Re=[E.props[0],E.props[1],E.props[2],E.props[3],E.props[4],E.props[5],E.props[6],E.props[7],E.props[8],E.props[9],E.props[10],E.props[11],E.props[12],E.props[13],E.props[14],E.props[15]],Y=J}P<=Z?(V=new LetterProps(Y,z,X,re,Ie,Re),this.renderedLetters.push(V),P+=1,this.lettersChangedFlag=!0):(V=this.renderedLetters[Z],this.lettersChangedFlag=V.update(Y,z,X,re,Ie,Re)||this.lettersChangedFlag)}}},TextAnimatorProperty.prototype.getValue=function(){this._elem.globalData.frameId!==this._frameId&&(this._frameId=this._elem.globalData.frameId,this.iterateDynamicProperties())},TextAnimatorProperty.prototype.mHelper=new Matrix,TextAnimatorProperty.prototype.defaultPropsArray=[],extendPrototype([DynamicPropertyContainer],TextAnimatorProperty),LetterProps.prototype.update=function(n,e,t,r,a,s){this._mdf.o=!1,this._mdf.sw=!1,this._mdf.sc=!1,this._mdf.fc=!1,this._mdf.m=!1;var o=this._mdf.p=!1;return this.o!==n&&(this.o=n,o=this._mdf.o=!0),this.sw!==e&&(this.sw=e,o=this._mdf.sw=!0),this.sc!==t&&(this.sc=t,o=this._mdf.sc=!0),this.fc!==r&&(this.fc=r,o=this._mdf.fc=!0),this.m!==a&&(this.m=a,o=this._mdf.m=!0),!s.length||this.p[0]===s[0]&&this.p[1]===s[1]&&this.p[4]===s[4]&&this.p[5]===s[5]&&this.p[12]===s[12]&&this.p[13]===s[13]||(this.p=s,o=this._mdf.p=!0),o},TextProperty.prototype.defaultBoxWidth=[0,0],TextProperty.prototype.copyData=function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n},TextProperty.prototype.setCurrentData=function(n){n.__complete||this.completeTextData(n),this.currentData=n,this.currentData.boxWidth=this.currentData.boxWidth||this.defaultBoxWidth,this._mdf=!0},TextProperty.prototype.searchProperty=function(){return this.searchKeyframes()},TextProperty.prototype.searchKeyframes=function(){return this.kf=1<this.data.d.k.length,this.kf&&this.addEffect(this.getKeyframeValue.bind(this)),this.kf},TextProperty.prototype.addEffect=function(n){this.effectsSequence.push(n),this.elem.addDynamicProperty(this)},TextProperty.prototype.getValue=function(n){if(this.elem.globalData.frameId!==this.frameId&&this.effectsSequence.length||n){this.currentData.t=this.data.d.k[this.keysIndex].s.t;var e=this.currentData,t=this.keysIndex;if(this.lock)this.setCurrentData(this.currentData);else{this.lock=!0,this._mdf=!1;for(var r=this.effectsSequence.length,a=n||this.data.d.k[this.keysIndex].s,s=0;s<r;s+=1)a=t!==this.keysIndex?this.effectsSequence[s](a,a.t):this.effectsSequence[s](this.currentData,a.t);e!==a&&this.setCurrentData(a),this.pv=this.v=this.currentData,this.lock=!1,this.frameId=this.elem.globalData.frameId}}},TextProperty.prototype.getKeyframeValue=function(){for(var n=this.data.d.k,e=this.elem.comp.renderedFrame,t=0,r=n.length;t<=r-1&&(n[t].s,!(t===r-1||n[t+1].t>e));)t+=1;return this.keysIndex!==t&&(this.keysIndex=t),this.data.d.k[this.keysIndex].s},TextProperty.prototype.buildFinalText=function(n){for(var e,t=FontManager.getCombinedCharacterCodes(),r=[],a=0,s=n.length;a<s;)e=n.charCodeAt(a),t.indexOf(e)!==-1?r[r.length-1]+=n.charAt(a):55296<=e&&e<=56319&&56320<=(e=n.charCodeAt(a+1))&&e<=57343?(r.push(n.substr(a,2)),++a):r.push(n.charAt(a)),a+=1;return r},TextProperty.prototype.completeTextData=function(n){n.__complete=!0;var e,t,r,a=this.elem.globalData.fontManager,s=this.data,o=[],l=0,d=s.m.g,c=0,f=0,_=0,m=[],g=0,y=0,x=a.getFontByName(n.f),u=0,p=x.fStyle?x.fStyle.split(" "):[],M="normal",S="normal",b=p.length;for(D=0;D<b;D+=1)switch(p[D].toLowerCase()){case"italic":S="italic";break;case"bold":M="700";break;case"black":M="900";break;case"medium":M="500";break;case"regular":case"normal":M="400";break;case"light":case"thin":M="200"}n.fWeight=x.fWeight||M,n.fStyle=S,n.finalSize=n.s,n.finalText=this.buildFinalText(n.t),b=n.finalText.length,n.finalLineHeight=n.lh;var A,T=n.tr/1e3*n.finalSize;if(n.sz)for(var E,B,P=!0,C=n.sz[0],I=n.sz[1];P;){g=E=0,b=(B=this.buildFinalText(n.t)).length,T=n.tr/1e3*n.finalSize;for(var N=-1,D=0;D<b;D+=1)A=B[D].charCodeAt(0),e=!1,B[D]===" "?N=D:A!==13&&A!==3||(e=!(g=0),E+=n.finalLineHeight||1.2*n.finalSize),C<g+(u=a.chars?(r=a.getCharData(B[D],x.fStyle,x.fFamily),e?0:r.w*n.finalSize/100):a.measureText(B[D],n.f,n.finalSize))&&B[D]!==" "?(N===-1?b+=1:D=N,E+=n.finalLineHeight||1.2*n.finalSize,B.splice(D,N===D?1:0,"\r"),N=-1,g=0):(g+=u,g+=T);E+=x.ascent*n.finalSize/100,this.canResize&&n.finalSize>this.minimumFontSize&&I<E?(--n.finalSize,n.finalLineHeight=n.finalSize*n.lh/n.s):(n.finalText=B,b=n.finalText.length,P=!1)}g=-T;var V,R=u=0;for(D=0;D<b;D+=1)if(e=!1,(A=(V=n.finalText[D]).charCodeAt(0))===13||A===3?(R=0,m.push(g),y=y<g?g:y,g=-2*T,e=!(t=""),_+=1):t=V,u=a.chars?(r=a.getCharData(V,x.fStyle,a.getFontByName(n.f).fFamily),e?0:r.w*n.finalSize/100):a.measureText(t,n.f,n.finalSize),V===" "?R+=u+T:(g+=u+T+R,R=0),o.push({l:u,an:u,add:c,n:e,anIndexes:[],val:t,line:_,animatorJustifyOffset:0}),d==2){if(c+=u,t===""||t===" "||D===b-1){for(t!==""&&t!==" "||(c-=u);f<=D;)o[f].an=c,o[f].ind=l,o[f].extra=u,f+=1;l+=1,c=0}}else if(d==3){if(c+=u,t===""||D===b-1){for(t===""&&(c-=u);f<=D;)o[f].an=c,o[f].ind=l,o[f].extra=u,f+=1;c=0,l+=1}}else o[l].ind=l,o[l].extra=0,l+=1;if(n.l=o,y=y<g?g:y,m.push(g),n.sz)n.boxWidth=n.sz[0],n.justifyOffset=0;else switch(n.boxWidth=y,n.j){case 1:n.justifyOffset=-n.boxWidth;break;case 2:n.justifyOffset=-n.boxWidth/2;break;default:n.justifyOffset=0}n.lineWidths=m;for(var F,$,W,J,j=s.a,ie=j.length,ae=[],he=0;he<ie;he+=1){for((F=j[he]).a.sc&&(n.strokeColorAnim=!0),F.a.sw&&(n.strokeWidthAnim=!0),(F.a.fc||F.a.fh||F.a.fs||F.a.fb)&&(n.fillColorAnim=!0),J=0,W=F.s.b,D=0;D<b;D+=1)($=o[D]).anIndexes[he]=J,(W==1&&$.val!==""||W==2&&$.val!==""&&$.val!==" "||W==3&&($.n||$.val==" "||D==b-1)||W==4&&($.n||D==b-1))&&(F.s.rn===1&&ae.push(J),J+=1);s.a[he].s.totalChars=J;var z,X=-1;if(F.s.rn===1)for(D=0;D<b;D+=1)X!=($=o[D]).anIndexes[he]&&(X=$.anIndexes[he],z=ae.splice(Math.floor(Math.random()*ae.length),1)[0]),$.anIndexes[he]=z}n.yOffset=n.finalLineHeight||1.2*n.finalSize,n.ls=n.ls||0,n.ascent=x.ascent*n.finalSize/100},TextProperty.prototype.updateDocumentData=function(n,e){e=e===void 0?this.keysIndex:e;var t=this.copyData({},this.data.d.k[e].s),t=this.copyData(t,n);this.data.d.k[e].s=t,this.recalculate(e),this.elem.addDynamicProperty(this)},TextProperty.prototype.recalculate=function(n){var e=this.data.d.k[n].s;e.__complete=!1,this.keysIndex=0,this._isFirstFrame=!0,this.getValue(e)},TextProperty.prototype.canResizeFont=function(n){this.canResize=n,this.recalculate(this.keysIndex),this.elem.addDynamicProperty(this)},TextProperty.prototype.setMinimumFontSize=function(n){this.minimumFontSize=Math.floor(n)||1,this.recalculate(this.keysIndex),this.elem.addDynamicProperty(this)};var TextSelectorProp=(cA=Math.max,dA=Math.min,eA=Math.floor,fA.prototype={getMult:function(n){this._currentTextLength!==this.elem.textProperty.currentData.l.length&&this.getValue();var e=0,t=0,r=1,a=1;0<this.ne.v?e=this.ne.v/100:t=-this.ne.v/100,0<this.xe.v?r=1-this.xe.v/100:a=1+this.xe.v/100;var s,o,l,d=BezierFactory.getBezierEasing(e,t,r,a).get,c=0,f=this.finalS,_=this.finalE,m=this.data.sh;return(c=m===2?d(c=_===f?_<=n?1:0:cA(0,dA(.5/(_-f)+(n-f)/(_-f),1))):m===3?d(c=_===f?_<=n?0:1:1-cA(0,dA(.5/(_-f)+(n-f)/(_-f),1))):m===4?(_===f?c=0:(c=cA(0,dA(.5/(_-f)+(n-f)/(_-f),1)))<.5?c*=2:c=1-2*(c-.5),d(c)):m===5?d(c=_===f?0:(o=-(s=_-f)/2+(n=dA(cA(0,n+.5-f),_-f)),l=s/2,Math.sqrt(1-o*o/(l*l)))):m===6?d(c=_===f?0:(n=dA(cA(0,n+.5-f),_-f),(1+Math.cos(Math.PI+2*Math.PI*n/(_-f)))/2)):(n>=eA(f)&&(c=cA(0,dA(n-f<0?dA(_,1)-(f-n):_-n,1))),d(c)))*this.a.v},getValue:function(n){this.iterateDynamicProperties(),this._mdf=n||this._mdf,this._currentTextLength=this.elem.textProperty.currentData.l.length||0,n&&this.data.r===2&&(this.e.v=this._currentTextLength);var e,t=this.data.r===2?1:100/this.data.totalChars,r=this.o.v/t,a=this.s.v/t+r,s=this.e.v/t+r;s<a&&(e=a,a=s,s=e),this.finalS=a,this.finalE=s}},extendPrototype([DynamicPropertyContainer],fA),{getTextSelectorProp:function(n,e,t){return new fA(n,e)}}),cA,dA,eA;function fA(n,e){this._currentTextLength=-1,this.k=!1,this.data=e,this.elem=n,this.comp=n.comp,this.finalS=0,this.finalE=0,this.initDynamicPropertyContainer(n),this.s=PropertyFactory.getProp(n,e.s||{k:0},0,0,this),this.e="e"in e?PropertyFactory.getProp(n,e.e,0,0,this):{v:100},this.o=PropertyFactory.getProp(n,e.o||{k:0},0,0,this),this.xe=PropertyFactory.getProp(n,e.xe||{k:0},0,0,this),this.ne=PropertyFactory.getProp(n,e.ne||{k:0},0,0,this),this.a=PropertyFactory.getProp(n,e.a,0,.01,this),this.dynamicProperties.length||this.getValue()}var pool_factory=function(n,e,t,r){var a=0,s=n,o=createSizedArray(s);function l(){var d=a?o[--a]:e();return d}return{newElement:l,release:function(d){a===s&&(o=pooling.double(o),s*=2),t&&t(d),o[a]=d,a+=1}}},pooling={double:function(n){return n.concat(createSizedArray(n.length))}},point_pool=pool_factory(8,function(){return createTypedArray("float32",2)}),shape_pool=(ZA=pool_factory(4,function(){return new ShapePath},function(n){for(var e=n._length,t=0;t<e;t+=1)point_pool.release(n.v[t]),point_pool.release(n.i[t]),point_pool.release(n.o[t]),n.v[t]=null,n.i[t]=null,n.o[t]=null;n._length=0,n.c=!1}),ZA.clone=function(n){var e,t=ZA.newElement(),r=n._length===void 0?n.v.length:n._length;for(t.setLength(r),t.c=n.c,e=0;e<r;e+=1)t.setTripleAt(n.v[e][0],n.v[e][1],n.o[e][0],n.o[e][1],n.i[e][0],n.i[e][1],e);return t},ZA),ZA,shapeCollection_pool=(gB={newShapeCollection:function(){var n;return n=hB?jB[--hB]:new ShapeCollection,n},release:function(n){var e,t=n._length;for(e=0;e<t;e+=1)shape_pool.release(n.shapes[e]);n._length=0,hB===iB&&(jB=pooling.double(jB),iB*=2),jB[hB]=n,hB+=1}},hB=0,iB=4,jB=createSizedArray(iB),gB),gB,hB,iB,jB,segments_length_pool=pool_factory(8,function(){return{lengths:[],totalLength:0}},function(n){for(var e=n.lengths.length,t=0;t<e;t+=1)bezier_length_pool.release(n.lengths[t]);n.lengths.length=0}),bezier_length_pool=pool_factory(8,function(){return{addedLength:0,percents:createTypedArray("float32",defaultCurveSegments),lengths:createTypedArray("float32",defaultCurveSegments)}});function BaseRenderer(){}function SVGRenderer(n,e){this.animationItem=n,this.layers=null,this.renderedFrame=-1,this.svgElement=createNS("svg");var t,r,a,s,o="";e&&e.title&&(t=createNS("title"),r=createElementID(),t.setAttribute("id",r),t.textContent=e.title,this.svgElement.appendChild(t),o+=r),e&&e.description&&(a=createNS("desc"),s=createElementID(),a.setAttribute("id",s),a.textContent=e.description,this.svgElement.appendChild(a),o+=" "+s),o&&this.svgElement.setAttribute("aria-labelledby",o);var l=createNS("defs");this.svgElement.appendChild(l);var d=createNS("g");this.svgElement.appendChild(d),this.layerElement=d,this.renderConfig={preserveAspectRatio:e&&e.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:e&&e.imagePreserveAspectRatio||"xMidYMid slice",progressiveLoad:e&&e.progressiveLoad||!1,hideOnTransparent:!e||e.hideOnTransparent!==!1,viewBoxOnly:e&&e.viewBoxOnly||!1,viewBoxSize:e&&e.viewBoxSize||!1,className:e&&e.className||"",id:e&&e.id||"",focusable:e&&e.focusable,filterSize:{width:e&&e.filterSize&&e.filterSize.width||"100%",height:e&&e.filterSize&&e.filterSize.height||"100%",x:e&&e.filterSize&&e.filterSize.x||"0%",y:e&&e.filterSize&&e.filterSize.y||"0%"}},this.globalData={_mdf:!1,frameNum:-1,defs:l,renderConfig:this.renderConfig},this.elements=[],this.pendingElements=[],this.destroyed=!1,this.rendererType="svg"}function MaskElement(n,e,t){this.data=n,this.element=e,this.globalData=t,this.storedData=[],this.masksProperties=this.data.masksProperties||[],this.maskElement=null;var r=this.globalData.defs,a=this.masksProperties?this.masksProperties.length:0;this.viewData=createSizedArray(a),this.solidPath="";for(var s,o,l,d,c,f,_,m=this.masksProperties,g=0,y=[],x=createElementID(),u="clipPath",p="clip-path",M=0;M<a;M++)if((m[M].mode!=="a"&&m[M].mode!=="n"||m[M].inv||m[M].o.k!==100||m[M].o.x)&&(p=u="mask"),m[M].mode!="s"&&m[M].mode!="i"||g!==0?l=null:((l=createNS("rect")).setAttribute("fill","#ffffff"),l.setAttribute("width",this.element.comp.data.w||0),l.setAttribute("height",this.element.comp.data.h||0),y.push(l)),s=createNS("path"),m[M].mode!="n"){if(g+=1,s.setAttribute("fill",m[M].mode==="s"?"#000000":"#ffffff"),s.setAttribute("clip-rule","nonzero"),m[M].x.k!==0?(p=u="mask",f=PropertyFactory.getProp(this.element,m[M].x,0,null,this.element),_=createElementID(),(d=createNS("filter")).setAttribute("id",_),(c=createNS("feMorphology")).setAttribute("operator","erode"),c.setAttribute("in","SourceGraphic"),c.setAttribute("radius","0"),d.appendChild(c),r.appendChild(d),s.setAttribute("stroke",m[M].mode==="s"?"#000000":"#ffffff")):f=c=null,this.storedData[M]={elem:s,x:f,expan:c,lastPath:"",lastOperator:"",filterId:_,lastRadius:0},m[M].mode=="i"){o=y.length;for(var S=createNS("g"),b=0;b<o;b+=1)S.appendChild(y[b]);var A=createNS("mask");A.setAttribute("mask-type","alpha"),A.setAttribute("id",x+"_"+g),A.appendChild(s),r.appendChild(A),S.setAttribute("mask","url("+locationHref+"#"+x+"_"+g+")"),y.length=0,y.push(S)}else y.push(s);m[M].inv&&!this.solidPath&&(this.solidPath=this.createLayerSolidPath()),this.viewData[M]={elem:s,lastPath:"",op:PropertyFactory.getProp(this.element,m[M].o,0,.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,m[M],3),invRect:l},this.viewData[M].prop.k||this.drawPath(m[M],this.viewData[M].prop.v,this.viewData[M])}else this.viewData[M]={op:PropertyFactory.getProp(this.element,m[M].o,0,.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,m[M],3),elem:s,lastPath:""},r.appendChild(s);for(this.maskElement=createNS(u),a=y.length,M=0;M<a;M+=1)this.maskElement.appendChild(y[M]);0<g&&(this.maskElement.setAttribute("id",x),this.element.maskedElement.setAttribute(p,"url("+locationHref+"#"+x+")"),r.appendChild(this.maskElement)),this.viewData.length&&this.element.addRenderableComponent(this)}function HierarchyElement(){}function FrameElement(){}function TransformElement(){}function RenderableElement(){}function RenderableDOMElement(){}function ProcessedElement(n,e){this.elem=n,this.pos=e}function SVGStyleData(n,e){this.data=n,this.type=n.ty,this.d="",this.lvl=e,this._mdf=!1,this.closed=n.hd===!0,this.pElem=createNS("path"),this.msElem=null}function SVGShapeData(n,e,t){this.caches=[],this.styles=[],this.transformers=n,this.lStr="",this.sh=t,this.lvl=e,this._isAnimated=!!t.k;for(var r=0,a=n.length;r<a;){if(n[r].mProps.dynamicProperties.length){this._isAnimated=!0;break}r+=1}}function SVGTransformData(n,e,t){this.transform={mProps:n,op:e,container:t},this.elements=[],this._isAnimated=this.transform.mProps.dynamicProperties.length||this.transform.op.effectsSequence.length}function SVGStrokeStyleData(n,e,t){this.initDynamicPropertyContainer(n),this.getValue=this.iterateDynamicProperties,this.o=PropertyFactory.getProp(n,e.o,0,.01,this),this.w=PropertyFactory.getProp(n,e.w,0,null,this),this.d=new DashProperty(n,e.d||{},"svg",this),this.c=PropertyFactory.getProp(n,e.c,1,255,this),this.style=t,this._isAnimated=!!this._isAnimated}function SVGFillStyleData(n,e,t){this.initDynamicPropertyContainer(n),this.getValue=this.iterateDynamicProperties,this.o=PropertyFactory.getProp(n,e.o,0,.01,this),this.c=PropertyFactory.getProp(n,e.c,1,255,this),this.style=t}function SVGGradientFillStyleData(n,e,t){this.initDynamicPropertyContainer(n),this.getValue=this.iterateDynamicProperties,this.initGradientData(n,e,t)}function SVGGradientStrokeStyleData(n,e,t){this.initDynamicPropertyContainer(n),this.getValue=this.iterateDynamicProperties,this.w=PropertyFactory.getProp(n,e.w,0,null,this),this.d=new DashProperty(n,e.d||{},"svg",this),this.initGradientData(n,e,t),this._isAnimated=!!this._isAnimated}function ShapeGroupData(){this.it=[],this.prevViewData=[],this.gr=createNS("g")}BaseRenderer.prototype.checkLayers=function(n){var e,t,r=this.layers.length;for(this.completeLayers=!0,e=r-1;0<=e;e--)this.elements[e]||(t=this.layers[e]).ip-t.st<=n-this.layers[e].st&&t.op-t.st>n-this.layers[e].st&&this.buildItem(e),this.completeLayers=!!this.elements[e]&&this.completeLayers;this.checkPendingElements()},BaseRenderer.prototype.createItem=function(n){switch(n.ty){case 2:return this.createImage(n);case 0:return this.createComp(n);case 1:return this.createSolid(n);case 3:return this.createNull(n);case 4:return this.createShape(n);case 5:return this.createText(n);case 13:return this.createCamera(n)}return this.createNull(n)},BaseRenderer.prototype.createCamera=function(){throw new Error("You're using a 3d camera. Try the html renderer.")},BaseRenderer.prototype.buildAllItems=function(){for(var n=this.layers.length,e=0;e<n;e+=1)this.buildItem(e);this.checkPendingElements()},BaseRenderer.prototype.includeLayers=function(n){this.completeLayers=!1;for(var e,t=n.length,r=this.layers.length,a=0;a<t;a+=1)for(e=0;e<r;){if(this.layers[e].id==n[a].id){this.layers[e]=n[a];break}e+=1}},BaseRenderer.prototype.setProjectInterface=function(n){this.globalData.projectInterface=n},BaseRenderer.prototype.initItems=function(){this.globalData.progressiveLoad||this.buildAllItems()},BaseRenderer.prototype.buildElementParenting=function(n,e,t){for(var r=this.elements,a=this.layers,s=0,o=a.length;s<o;)a[s].ind==e&&(r[s]&&r[s]!==!0?(t.push(r[s]),r[s].setAsParent(),a[s].parent!==void 0?this.buildElementParenting(n,a[s].parent,t):n.setHierarchy(t)):(this.buildItem(s),this.addPendingElement(n))),s+=1},BaseRenderer.prototype.addPendingElement=function(n){this.pendingElements.push(n)},BaseRenderer.prototype.searchExtraCompositions=function(n){for(var e,t=n.length,r=0;r<t;r+=1)n[r].xt&&((e=this.createComp(n[r])).initExpressions(),this.globalData.projectInterface.registerComposition(e))},BaseRenderer.prototype.setupGlobalData=function(n,e){this.globalData.fontManager=new FontManager,this.globalData.fontManager.addChars(n.chars),this.globalData.fontManager.addFonts(n.fonts,e),this.globalData.getAssetData=this.animationItem.getAssetData.bind(this.animationItem),this.globalData.getAssetsPath=this.animationItem.getAssetsPath.bind(this.animationItem),this.globalData.imageLoader=this.animationItem.imagePreloader,this.globalData.frameId=0,this.globalData.frameRate=n.fr,this.globalData.nm=n.nm,this.globalData.compSize={w:n.w,h:n.h}},extendPrototype([BaseRenderer],SVGRenderer),SVGRenderer.prototype.createNull=function(n){return new NullElement(n,this.globalData,this)},SVGRenderer.prototype.createShape=function(n){return new SVGShapeElement(n,this.globalData,this)},SVGRenderer.prototype.createText=function(n){return new SVGTextElement(n,this.globalData,this)},SVGRenderer.prototype.createImage=function(n){return new IImageElement(n,this.globalData,this)},SVGRenderer.prototype.createComp=function(n){return new SVGCompElement(n,this.globalData,this)},SVGRenderer.prototype.createSolid=function(n){return new ISolidElement(n,this.globalData,this)},SVGRenderer.prototype.configAnimation=function(n){this.svgElement.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.renderConfig.viewBoxSize?this.svgElement.setAttribute("viewBox",this.renderConfig.viewBoxSize):this.svgElement.setAttribute("viewBox","0 0 "+n.w+" "+n.h),this.renderConfig.viewBoxOnly||(this.svgElement.setAttribute("width",n.w),this.svgElement.setAttribute("height",n.h),this.svgElement.style.width="100%",this.svgElement.style.height="100%",this.svgElement.style.transform="translate3d(0,0,0)"),this.renderConfig.className&&this.svgElement.setAttribute("class",this.renderConfig.className),this.renderConfig.id&&this.svgElement.setAttribute("id",this.renderConfig.id),this.renderConfig.focusable!==void 0&&this.svgElement.setAttribute("focusable",this.renderConfig.focusable),this.svgElement.setAttribute("preserveAspectRatio",this.renderConfig.preserveAspectRatio),this.animationItem.wrapper.appendChild(this.svgElement);var e=this.globalData.defs;this.setupGlobalData(n,e),this.globalData.progressiveLoad=this.renderConfig.progressiveLoad,this.data=n;var t=createNS("clipPath"),r=createNS("rect");r.setAttribute("width",n.w),r.setAttribute("height",n.h),r.setAttribute("x",0),r.setAttribute("y",0);var a=createElementID();t.setAttribute("id",a),t.appendChild(r),this.layerElement.setAttribute("clip-path","url("+locationHref+"#"+a+")"),e.appendChild(t),this.layers=n.layers,this.elements=createSizedArray(n.layers.length)},SVGRenderer.prototype.destroy=function(){this.animationItem.wrapper.innerHTML="",this.layerElement=null,this.globalData.defs=null;for(var n=this.layers?this.layers.length:0,e=0;e<n;e++)this.elements[e]&&this.elements[e].destroy();this.elements.length=0,this.destroyed=!0,this.animationItem=null},SVGRenderer.prototype.updateContainerSize=function(){},SVGRenderer.prototype.buildItem=function(n){var e,t=this.elements;t[n]||this.layers[n].ty==99||(t[n]=!0,e=this.createItem(this.layers[n]),t[n]=e,expressionsPlugin&&(this.layers[n].ty===0&&this.globalData.projectInterface.registerComposition(e),e.initExpressions()),this.appendElementInPos(e,n),this.layers[n].tt&&(this.elements[n-1]&&this.elements[n-1]!==!0?e.setMatte(t[n-1].layerId):(this.buildItem(n-1),this.addPendingElement(e))))},SVGRenderer.prototype.checkPendingElements=function(){for(;this.pendingElements.length;){var n=this.pendingElements.pop();if(n.checkParenting(),n.data.tt)for(var e=0,t=this.elements.length;e<t;){if(this.elements[e]===n){n.setMatte(this.elements[e-1].layerId);break}e+=1}}},SVGRenderer.prototype.renderFrame=function(n){if(this.renderedFrame!==n&&!this.destroyed){n===null?n=this.renderedFrame:this.renderedFrame=n,this.globalData.frameNum=n,this.globalData.frameId+=1,this.globalData.projectInterface.currentFrame=n,this.globalData._mdf=!1;var e,t=this.layers.length;for(this.completeLayers||this.checkLayers(n),e=t-1;0<=e;e--)(this.completeLayers||this.elements[e])&&this.elements[e].prepareFrame(n-this.layers[e].st);if(this.globalData._mdf)for(e=0;e<t;e+=1)(this.completeLayers||this.elements[e])&&this.elements[e].renderFrame()}},SVGRenderer.prototype.appendElementInPos=function(n,e){var t=n.getBaseElement();if(t){for(var r,a=0;a<e;)this.elements[a]&&this.elements[a]!==!0&&this.elements[a].getBaseElement()&&(r=this.elements[a].getBaseElement()),a+=1;r?this.layerElement.insertBefore(t,r):this.layerElement.appendChild(t)}},SVGRenderer.prototype.hide=function(){this.layerElement.style.display="none"},SVGRenderer.prototype.show=function(){this.layerElement.style.display="block"},MaskElement.prototype.getMaskProperty=function(n){return this.viewData[n].prop},MaskElement.prototype.renderFrame=function(n){for(var e,t=this.element.finalTransform.mat,r=this.masksProperties.length,a=0;a<r;a++)(this.viewData[a].prop._mdf||n)&&this.drawPath(this.masksProperties[a],this.viewData[a].prop.v,this.viewData[a]),(this.viewData[a].op._mdf||n)&&this.viewData[a].elem.setAttribute("fill-opacity",this.viewData[a].op.v),this.masksProperties[a].mode!=="n"&&(this.viewData[a].invRect&&(this.element.finalTransform.mProp._mdf||n)&&this.viewData[a].invRect.setAttribute("transform",t.getInverseMatrix().to2dCSS()),this.storedData[a].x&&(this.storedData[a].x._mdf||n)&&(e=this.storedData[a].expan,this.storedData[a].x.v<0?(this.storedData[a].lastOperator!=="erode"&&(this.storedData[a].lastOperator="erode",this.storedData[a].elem.setAttribute("filter","url("+locationHref+"#"+this.storedData[a].filterId+")")),e.setAttribute("radius",-this.storedData[a].x.v)):(this.storedData[a].lastOperator!=="dilate"&&(this.storedData[a].lastOperator="dilate",this.storedData[a].elem.setAttribute("filter",null)),this.storedData[a].elem.setAttribute("stroke-width",2*this.storedData[a].x.v))))},MaskElement.prototype.getMaskelement=function(){return this.maskElement},MaskElement.prototype.createLayerSolidPath=function(){var n="M0,0 ";return n+=" h"+this.globalData.compSize.w,n+=" v"+this.globalData.compSize.h,n+=" h-"+this.globalData.compSize.w,n+=" v-"+this.globalData.compSize.h+" "},MaskElement.prototype.drawPath=function(n,e,t){for(var r,a=" M"+e.v[0][0]+","+e.v[0][1],s=e._length,o=1;o<s;o+=1)a+=" C"+e.o[o-1][0]+","+e.o[o-1][1]+" "+e.i[o][0]+","+e.i[o][1]+" "+e.v[o][0]+","+e.v[o][1];e.c&&1<s&&(a+=" C"+e.o[o-1][0]+","+e.o[o-1][1]+" "+e.i[0][0]+","+e.i[0][1]+" "+e.v[0][0]+","+e.v[0][1]),t.lastPath!==a&&(r="",t.elem&&(e.c&&(r=n.inv?this.solidPath+a:a),t.elem.setAttribute("d",r)),t.lastPath=a)},MaskElement.prototype.destroy=function(){this.element=null,this.globalData=null,this.maskElement=null,this.data=null,this.masksProperties=null},HierarchyElement.prototype={initHierarchy:function(){this.hierarchy=[],this._isParent=!1,this.checkParenting()},setHierarchy:function(n){this.hierarchy=n},setAsParent:function(){this._isParent=!0},checkParenting:function(){this.data.parent!==void 0&&this.comp.buildElementParenting(this,this.data.parent,[])}},FrameElement.prototype={initFrame:function(){this._isFirstFrame=!1,this.dynamicProperties=[],this._mdf=!1},prepareProperties:function(n,e){for(var t=this.dynamicProperties.length,r=0;r<t;r+=1)(e||this._isParent&&this.dynamicProperties[r].propType==="transform")&&(this.dynamicProperties[r].getValue(),this.dynamicProperties[r]._mdf&&(this.globalData._mdf=!0,this._mdf=!0))},addDynamicProperty:function(n){this.dynamicProperties.indexOf(n)===-1&&this.dynamicProperties.push(n)}},TransformElement.prototype={initTransform:function(){this.finalTransform={mProp:this.data.ks?TransformPropertyFactory.getTransformProperty(this,this.data.ks,this):{o:0},_matMdf:!1,_opMdf:!1,mat:new Matrix},this.data.ao&&(this.finalTransform.mProp.autoOriented=!0),this.data.ty},renderTransform:function(){if(this.finalTransform._opMdf=this.finalTransform.mProp.o._mdf||this._isFirstFrame,this.finalTransform._matMdf=this.finalTransform.mProp._mdf||this._isFirstFrame,this.hierarchy){var n,e=this.finalTransform.mat,t=0,r=this.hierarchy.length;if(!this.finalTransform._matMdf)for(;t<r;){if(this.hierarchy[t].finalTransform.mProp._mdf){this.finalTransform._matMdf=!0;break}t+=1}if(this.finalTransform._matMdf)for(n=this.finalTransform.mProp.v.props,e.cloneFromProps(n),t=0;t<r;t+=1)n=this.hierarchy[t].finalTransform.mProp.v.props,e.transform(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15])}},globalToLocal:function(n){var e=[];e.push(this.finalTransform);for(var t=!0,r=this.comp;t;)r.finalTransform?(r.data.hasMask&&e.splice(0,0,r.finalTransform),r=r.comp):t=!1;for(var a,s=e.length,o=0;o<s;o+=1)a=e[o].mat.applyToPointArray(0,0,0),n=[n[0]-a[0],n[1]-a[1],0];return n},mHelper:new Matrix},RenderableElement.prototype={initRenderable:function(){this.isInRange=!1,this.hidden=!1,this.isTransparent=!1,this.renderableComponents=[]},addRenderableComponent:function(n){this.renderableComponents.indexOf(n)===-1&&this.renderableComponents.push(n)},removeRenderableComponent:function(n){this.renderableComponents.indexOf(n)!==-1&&this.renderableComponents.splice(this.renderableComponents.indexOf(n),1)},prepareRenderableFrame:function(n){this.checkLayerLimits(n)},checkTransparency:function(){this.finalTransform.mProp.o.v<=0?!this.isTransparent&&this.globalData.renderConfig.hideOnTransparent&&(this.isTransparent=!0,this.hide()):this.isTransparent&&(this.isTransparent=!1,this.show())},checkLayerLimits:function(n){this.data.ip-this.data.st<=n&&this.data.op-this.data.st>n?this.isInRange!==!0&&(this.globalData._mdf=!0,this._mdf=!0,this.isInRange=!0,this.show()):this.isInRange!==!1&&(this.globalData._mdf=!0,this.isInRange=!1,this.hide())},renderRenderable:function(){for(var n=this.renderableComponents.length,e=0;e<n;e+=1)this.renderableComponents[e].renderFrame(this._isFirstFrame)},sourceRectAtTime:function(){return{top:0,left:0,width:100,height:100}},getLayerSize:function(){return this.data.ty===5?{w:this.data.textData.width,h:this.data.textData.height}:{w:this.data.width,h:this.data.height}}},extendPrototype([RenderableElement,createProxyFunction({initElement:function(n,e,t){this.initFrame(),this.initBaseData(n,e,t),this.initTransform(n,e,t),this.initHierarchy(),this.initRenderable(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),this.createContent(),this.hide()},hide:function(){this.hidden||this.isInRange&&!this.isTransparent||((this.baseElement||this.layerElement).style.display="none",this.hidden=!0)},show:function(){this.isInRange&&!this.isTransparent&&(this.data.hd||((this.baseElement||this.layerElement).style.display="block"),this.hidden=!1,this._isFirstFrame=!0)},renderFrame:function(){this.data.hd||this.hidden||(this.renderTransform(),this.renderRenderable(),this.renderElement(),this.renderInnerContent(),this._isFirstFrame&&(this._isFirstFrame=!1))},renderInnerContent:function(){},prepareFrame:function(n){this._mdf=!1,this.prepareRenderableFrame(n),this.prepareProperties(n,this.isInRange),this.checkTransparency()},destroy:function(){this.innerElem=null,this.destroyBaseElement()}})],RenderableDOMElement),SVGStyleData.prototype.reset=function(){this.d="",this._mdf=!1},SVGShapeData.prototype.setAsAnimated=function(){this._isAnimated=!0},extendPrototype([DynamicPropertyContainer],SVGStrokeStyleData),extendPrototype([DynamicPropertyContainer],SVGFillStyleData),SVGGradientFillStyleData.prototype.initGradientData=function(n,e,t){this.o=PropertyFactory.getProp(n,e.o,0,.01,this),this.s=PropertyFactory.getProp(n,e.s,1,null,this),this.e=PropertyFactory.getProp(n,e.e,1,null,this),this.h=PropertyFactory.getProp(n,e.h||{k:0},0,.01,this),this.a=PropertyFactory.getProp(n,e.a||{k:0},0,degToRads,this),this.g=new GradientProperty(n,e.g,this),this.style=t,this.stops=[],this.setGradientData(t.pElem,e),this.setGradientOpacity(e,t),this._isAnimated=!!this._isAnimated},SVGGradientFillStyleData.prototype.setGradientData=function(n,e){var t=createElementID(),r=createNS(e.t===1?"linearGradient":"radialGradient");r.setAttribute("id",t),r.setAttribute("spreadMethod","pad"),r.setAttribute("gradientUnits","userSpaceOnUse");for(var a,s=[],o=4*e.g.p,l=0;l<o;l+=4)a=createNS("stop"),r.appendChild(a),s.push(a);n.setAttribute(e.ty==="gf"?"fill":"stroke","url("+locationHref+"#"+t+")"),this.gf=r,this.cst=s},SVGGradientFillStyleData.prototype.setGradientOpacity=function(n,e){if(this.g._hasOpacity&&!this.g._collapsable){var t,r,a=createNS("mask"),s=createNS("path");a.appendChild(s);var o=createElementID(),l=createElementID();a.setAttribute("id",l);var d=createNS(n.t===1?"linearGradient":"radialGradient");d.setAttribute("id",o),d.setAttribute("spreadMethod","pad"),d.setAttribute("gradientUnits","userSpaceOnUse"),r=n.g.k.k[0].s?n.g.k.k[0].s.length:n.g.k.k.length;for(var c=this.stops,f=4*n.g.p;f<r;f+=2)(t=createNS("stop")).setAttribute("stop-color","rgb(255,255,255)"),d.appendChild(t),c.push(t);s.setAttribute(n.ty==="gf"?"fill":"stroke","url("+locationHref+"#"+o+")"),this.of=d,this.ms=a,this.ost=c,this.maskId=l,e.msElem=s}},extendPrototype([DynamicPropertyContainer],SVGGradientFillStyleData),extendPrototype([SVGGradientFillStyleData,DynamicPropertyContainer],SVGGradientStrokeStyleData);var SVGElementsRenderer=(JE=new Matrix,KE=new Matrix,{createRenderFunction:function(n){switch(n.ty,n.ty){case"fl":return PE;case"gf":return RE;case"gs":return QE;case"st":return SE;case"sh":case"el":case"rc":case"sr":return OE;case"tr":return NE}}}),JE,KE;function NE(n,e,t){(t||e.transform.op._mdf)&&e.transform.container.setAttribute("opacity",e.transform.op.v),(t||e.transform.mProps._mdf)&&e.transform.container.setAttribute("transform",e.transform.mProps.v.to2dCSS())}function OE(n,e,t){for(var r,a,s,o,l,d,c,f,_,m,g=e.styles.length,y=e.lvl,x=0;x<g;x+=1){if(o=e.sh._mdf||t,e.styles[x].lvl<y){for(c=KE.reset(),_=y-e.styles[x].lvl,m=e.transformers.length-1;!o&&0<_;)o=e.transformers[m].mProps._mdf||o,_--,m--;if(o)for(_=y-e.styles[x].lvl,m=e.transformers.length-1;0<_;)f=e.transformers[m].mProps.v.props,c.transform(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],f[9],f[10],f[11],f[12],f[13],f[14],f[15]),_--,m--}else c=JE;if(a=(d=e.sh.paths)._length,o){for(s="",r=0;r<a;r+=1)(l=d.shapes[r])&&l._length&&(s+=buildShapeString(l,l._length,l.c,c));e.caches[x]=s}else s=e.caches[x];e.styles[x].d+=n.hd===!0?"":s,e.styles[x]._mdf=o||e.styles[x]._mdf}}function PE(n,e,t){var r=e.style;(e.c._mdf||t)&&r.pElem.setAttribute("fill","rgb("+bm_floor(e.c.v[0])+","+bm_floor(e.c.v[1])+","+bm_floor(e.c.v[2])+")"),(e.o._mdf||t)&&r.pElem.setAttribute("fill-opacity",e.o.v)}function QE(n,e,t){RE(n,e,t),SE(0,e,t)}function RE(n,e,t){var r,a,s,o,l,d,c,f,_,m=e.gf,g=e.g._hasOpacity,y=e.s.v,x=e.e.v;if((e.o._mdf||t)&&(r=n.ty==="gf"?"fill-opacity":"stroke-opacity",e.style.pElem.setAttribute(r,e.o.v)),(e.s._mdf||t)&&(s=(a=n.t===1?"x1":"cx")=="x1"?"y1":"cy",m.setAttribute(a,y[0]),m.setAttribute(s,y[1]),g&&!e.g._collapsable&&(e.of.setAttribute(a,y[0]),e.of.setAttribute(s,y[1]))),e.g._cmdf||t){S=e.cst;for(var u=e.g.c,p=S.length,M=0;M<p;M+=1)(o=S[M]).setAttribute("offset",u[4*M]+"%"),o.setAttribute("stop-color","rgb("+u[4*M+1]+","+u[4*M+2]+","+u[4*M+3]+")")}if(g&&(e.g._omdf||t)){var S,b=e.g.o;for(p=(S=e.g._collapsable?e.cst:e.ost).length,M=0;M<p;M+=1)o=S[M],e.g._collapsable||o.setAttribute("offset",b[2*M]+"%"),o.setAttribute("stop-opacity",b[2*M+1])}n.t===1?(e.e._mdf||t)&&(m.setAttribute("x2",x[0]),m.setAttribute("y2",x[1]),g&&!e.g._collapsable&&(e.of.setAttribute("x2",x[0]),e.of.setAttribute("y2",x[1]))):((e.s._mdf||e.e._mdf||t)&&(l=Math.sqrt(Math.pow(y[0]-x[0],2)+Math.pow(y[1]-x[1],2)),m.setAttribute("r",l),g&&!e.g._collapsable&&e.of.setAttribute("r",l)),(e.e._mdf||e.h._mdf||e.a._mdf||t)&&(l=l||Math.sqrt(Math.pow(y[0]-x[0],2)+Math.pow(y[1]-x[1],2)),d=Math.atan2(x[1]-y[1],x[0]-y[0]),c=l*(1<=e.h.v?.99:e.h.v<=-1?-.99:e.h.v),f=Math.cos(d+e.a.v)*c+y[0],_=Math.sin(d+e.a.v)*c+y[1],m.setAttribute("fx",f),m.setAttribute("fy",_),g&&!e.g._collapsable&&(e.of.setAttribute("fx",f),e.of.setAttribute("fy",_))))}function SE(n,e,t){var r=e.style,a=e.d;a&&(a._mdf||t)&&a.dashStr&&(r.pElem.setAttribute("stroke-dasharray",a.dashStr),r.pElem.setAttribute("stroke-dashoffset",a.dashoffset[0])),e.c&&(e.c._mdf||t)&&r.pElem.setAttribute("stroke","rgb("+bm_floor(e.c.v[0])+","+bm_floor(e.c.v[1])+","+bm_floor(e.c.v[2])+")"),(e.o._mdf||t)&&r.pElem.setAttribute("stroke-opacity",e.o.v),(e.w._mdf||t)&&(r.pElem.setAttribute("stroke-width",e.w.v),r.msElem&&r.msElem.setAttribute("stroke-width",e.w.v))}function BaseElement(){}function NullElement(n,e,t){this.initFrame(),this.initBaseData(n,e,t),this.initFrame(),this.initTransform(n,e,t),this.initHierarchy()}function SVGBaseElement(){}function IShapeElement(){}function ITextElement(){}function ICompElement(){}function IImageElement(n,e,t){this.assetData=e.getAssetData(n.refId),this.initElement(n,e,t),this.sourceRect={top:0,left:0,width:this.assetData.w,height:this.assetData.h}}function ISolidElement(n,e,t){this.initElement(n,e,t)}function SVGCompElement(n,e,t){this.layers=n.layers,this.supports3d=!0,this.completeLayers=!1,this.pendingElements=[],this.elements=this.layers?createSizedArray(this.layers.length):[],this.initElement(n,e,t),this.tm=n.tm?PropertyFactory.getProp(this,n.tm,0,e.frameRate,this):{_placeholder:!0}}function SVGTextElement(n,e,t){this.textSpans=[],this.renderType="svg",this.initElement(n,e,t)}function SVGShapeElement(n,e,t){this.shapes=[],this.shapesData=n.shapes,this.stylesList=[],this.shapeModifiers=[],this.itemsData=[],this.processedElements=[],this.animatedContents=[],this.initElement(n,e,t),this.prevViewData=[]}function SVGTintFilter(n,e){this.filterManager=e;var t,r,a=createNS("feColorMatrix");a.setAttribute("type","matrix"),a.setAttribute("color-interpolation-filters","linearRGB"),a.setAttribute("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),a.setAttribute("result","f1"),n.appendChild(a),(a=createNS("feColorMatrix")).setAttribute("type","matrix"),a.setAttribute("color-interpolation-filters","sRGB"),a.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),a.setAttribute("result","f2"),n.appendChild(a),this.matrixFilter=a,e.effectElements[2].p.v===100&&!e.effectElements[2].p.k||(t=createNS("feMerge"),n.appendChild(t),(r=createNS("feMergeNode")).setAttribute("in","SourceGraphic"),t.appendChild(r),(r=createNS("feMergeNode")).setAttribute("in","f2"),t.appendChild(r))}function SVGFillFilter(n,e){this.filterManager=e;var t=createNS("feColorMatrix");t.setAttribute("type","matrix"),t.setAttribute("color-interpolation-filters","sRGB"),t.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),n.appendChild(t),this.matrixFilter=t}function SVGGaussianBlurEffect(n,e){n.setAttribute("x","-100%"),n.setAttribute("y","-100%"),n.setAttribute("width","300%"),n.setAttribute("height","300%"),this.filterManager=e;var t=createNS("feGaussianBlur");n.appendChild(t),this.feGaussianBlur=t}function SVGStrokeEffect(n,e){this.initialized=!1,this.filterManager=e,this.elem=n,this.paths=[]}function SVGTritoneFilter(n,e){this.filterManager=e;var t=createNS("feColorMatrix");t.setAttribute("type","matrix"),t.setAttribute("color-interpolation-filters","linearRGB"),t.setAttribute("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),t.setAttribute("result","f1"),n.appendChild(t);var r=createNS("feComponentTransfer");r.setAttribute("color-interpolation-filters","sRGB"),n.appendChild(r),this.matrixFilter=r;var a=createNS("feFuncR");a.setAttribute("type","table"),r.appendChild(a),this.feFuncR=a;var s=createNS("feFuncG");s.setAttribute("type","table"),r.appendChild(s),this.feFuncG=s;var o=createNS("feFuncB");o.setAttribute("type","table"),r.appendChild(o),this.feFuncB=o}function SVGProLevelsFilter(n,e){this.filterManager=e;var t=this.filterManager.effectElements,r=createNS("feComponentTransfer");(t[10].p.k||t[10].p.v!==0||t[11].p.k||t[11].p.v!==1||t[12].p.k||t[12].p.v!==1||t[13].p.k||t[13].p.v!==0||t[14].p.k||t[14].p.v!==1)&&(this.feFuncR=this.createFeFunc("feFuncR",r)),(t[17].p.k||t[17].p.v!==0||t[18].p.k||t[18].p.v!==1||t[19].p.k||t[19].p.v!==1||t[20].p.k||t[20].p.v!==0||t[21].p.k||t[21].p.v!==1)&&(this.feFuncG=this.createFeFunc("feFuncG",r)),(t[24].p.k||t[24].p.v!==0||t[25].p.k||t[25].p.v!==1||t[26].p.k||t[26].p.v!==1||t[27].p.k||t[27].p.v!==0||t[28].p.k||t[28].p.v!==1)&&(this.feFuncB=this.createFeFunc("feFuncB",r)),(t[31].p.k||t[31].p.v!==0||t[32].p.k||t[32].p.v!==1||t[33].p.k||t[33].p.v!==1||t[34].p.k||t[34].p.v!==0||t[35].p.k||t[35].p.v!==1)&&(this.feFuncA=this.createFeFunc("feFuncA",r)),(this.feFuncR||this.feFuncG||this.feFuncB||this.feFuncA)&&(r.setAttribute("color-interpolation-filters","sRGB"),n.appendChild(r),r=createNS("feComponentTransfer")),(t[3].p.k||t[3].p.v!==0||t[4].p.k||t[4].p.v!==1||t[5].p.k||t[5].p.v!==1||t[6].p.k||t[6].p.v!==0||t[7].p.k||t[7].p.v!==1)&&(r.setAttribute("color-interpolation-filters","sRGB"),n.appendChild(r),this.feFuncRComposed=this.createFeFunc("feFuncR",r),this.feFuncGComposed=this.createFeFunc("feFuncG",r),this.feFuncBComposed=this.createFeFunc("feFuncB",r))}function SVGDropShadowEffect(n,e){var t=e.container.globalData.renderConfig.filterSize;n.setAttribute("x",t.x),n.setAttribute("y",t.y),n.setAttribute("width",t.width),n.setAttribute("height",t.height),this.filterManager=e;var r=createNS("feGaussianBlur");r.setAttribute("in","SourceAlpha"),r.setAttribute("result","drop_shadow_1"),r.setAttribute("stdDeviation","0"),this.feGaussianBlur=r,n.appendChild(r);var a=createNS("feOffset");a.setAttribute("dx","25"),a.setAttribute("dy","0"),a.setAttribute("in","drop_shadow_1"),a.setAttribute("result","drop_shadow_2"),this.feOffset=a,n.appendChild(a);var s=createNS("feFlood");s.setAttribute("flood-color","#00ff00"),s.setAttribute("flood-opacity","1"),s.setAttribute("result","drop_shadow_3"),this.feFlood=s,n.appendChild(s);var o=createNS("feComposite");o.setAttribute("in","drop_shadow_3"),o.setAttribute("in2","drop_shadow_2"),o.setAttribute("operator","in"),o.setAttribute("result","drop_shadow_4"),n.appendChild(o);var l,d=createNS("feMerge");n.appendChild(d),l=createNS("feMergeNode"),d.appendChild(l),(l=createNS("feMergeNode")).setAttribute("in","SourceGraphic"),this.feMergeNode=l,this.feMerge=d,this.originalNodeAdded=!1,d.appendChild(l)}BaseElement.prototype={checkMasks:function(){if(!this.data.hasMask)return!1;for(var n=0,e=this.data.masksProperties.length;n<e;){if(this.data.masksProperties[n].mode!=="n"&&this.data.masksProperties[n].cl!==!1)return!0;n+=1}return!1},initExpressions:function(){this.layerInterface=LayerExpressionInterface(this),this.data.hasMask&&this.maskManager&&this.layerInterface.registerMaskInterface(this.maskManager);var n=EffectsExpressionInterface.createEffectsInterface(this,this.layerInterface);this.layerInterface.registerEffectsInterface(n),this.data.ty===0||this.data.xt?this.compInterface=CompExpressionInterface(this):this.data.ty===4?(this.layerInterface.shapeInterface=ShapeExpressionInterface(this.shapesData,this.itemsData,this.layerInterface),this.layerInterface.content=this.layerInterface.shapeInterface):this.data.ty===5&&(this.layerInterface.textInterface=TextExpressionInterface(this),this.layerInterface.text=this.layerInterface.textInterface)},setBlendMode:function(){var n=getBlendMode(this.data.bm);(this.baseElement||this.layerElement).style["mix-blend-mode"]=n},initBaseData:function(n,e,t){this.globalData=e,this.comp=t,this.data=n,this.layerId=createElementID(),this.data.sr||(this.data.sr=1),this.effectsManager=new EffectsManager(this.data,this,this.dynamicProperties)},getType:function(){return this.type},sourceRectAtTime:function(){}},NullElement.prototype.prepareFrame=function(n){this.prepareProperties(n,!0)},NullElement.prototype.renderFrame=function(){},NullElement.prototype.getBaseElement=function(){return null},NullElement.prototype.destroy=function(){},NullElement.prototype.sourceRectAtTime=function(){},NullElement.prototype.hide=function(){},extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement],NullElement),SVGBaseElement.prototype={initRendererElement:function(){this.layerElement=createNS("g")},createContainerElements:function(){this.matteElement=createNS("g"),this.transformedElement=this.layerElement,this.maskedElement=this.layerElement,this._sizeChanged=!1;var n,e,t,r,a,s,o,l,d,c,f,_,m,g=null;this.data.td?this.data.td==3||this.data.td==1?((r=createNS("mask")).setAttribute("id",this.layerId),r.setAttribute("mask-type",this.data.td==3?"luminance":"alpha"),r.appendChild(this.layerElement),g=r,this.globalData.defs.appendChild(r),featureSupport.maskType||this.data.td!=1||(r.setAttribute("mask-type","luminance"),n=createElementID(),e=filtersFactory.createFilter(n),this.globalData.defs.appendChild(e),e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),(t=createNS("g")).appendChild(this.layerElement),g=t,r.appendChild(t),t.setAttribute("filter","url("+locationHref+"#"+n+")"))):this.data.td==2&&((a=createNS("mask")).setAttribute("id",this.layerId),a.setAttribute("mask-type","alpha"),s=createNS("g"),a.appendChild(s),n=createElementID(),e=filtersFactory.createFilter(n),(o=createNS("feComponentTransfer")).setAttribute("in","SourceGraphic"),e.appendChild(o),(l=createNS("feFuncA")).setAttribute("type","table"),l.setAttribute("tableValues","1.0 0.0"),o.appendChild(l),this.globalData.defs.appendChild(e),(d=createNS("rect")).setAttribute("width",this.comp.data.w),d.setAttribute("height",this.comp.data.h),d.setAttribute("x","0"),d.setAttribute("y","0"),d.setAttribute("fill","#ffffff"),d.setAttribute("opacity","0"),s.setAttribute("filter","url("+locationHref+"#"+n+")"),s.appendChild(d),s.appendChild(this.layerElement),g=s,featureSupport.maskType||(a.setAttribute("mask-type","luminance"),e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),t=createNS("g"),s.appendChild(d),t.appendChild(this.layerElement),g=t,s.appendChild(t)),this.globalData.defs.appendChild(a)):this.data.tt?(this.matteElement.appendChild(this.layerElement),g=this.matteElement,this.baseElement=this.matteElement):this.baseElement=this.layerElement,this.data.ln&&this.layerElement.setAttribute("id",this.data.ln),this.data.cl&&this.layerElement.setAttribute("class",this.data.cl),this.data.ty!==0||this.data.hd||(c=createNS("clipPath"),(f=createNS("path")).setAttribute("d","M0,0 L"+this.data.w+",0 L"+this.data.w+","+this.data.h+" L0,"+this.data.h+"z"),_=createElementID(),c.setAttribute("id",_),c.appendChild(f),this.globalData.defs.appendChild(c),this.checkMasks()?((m=createNS("g")).setAttribute("clip-path","url("+locationHref+"#"+_+")"),m.appendChild(this.layerElement),this.transformedElement=m,g?g.appendChild(this.transformedElement):this.baseElement=this.transformedElement):this.layerElement.setAttribute("clip-path","url("+locationHref+"#"+_+")")),this.data.bm!==0&&this.setBlendMode()},renderElement:function(){this.finalTransform._matMdf&&this.transformedElement.setAttribute("transform",this.finalTransform.mat.to2dCSS()),this.finalTransform._opMdf&&this.transformedElement.setAttribute("opacity",this.finalTransform.mProp.o.v)},destroyBaseElement:function(){this.layerElement=null,this.matteElement=null,this.maskManager.destroy()},getBaseElement:function(){return this.data.hd?null:this.baseElement},createRenderableComponents:function(){this.maskManager=new MaskElement(this.data,this,this.globalData),this.renderableEffectsManager=new SVGEffects(this)},setMatte:function(n){this.matteElement&&this.matteElement.setAttribute("mask","url("+locationHref+"#"+n+")")}},IShapeElement.prototype={addShapeToModifiers:function(n){for(var e=this.shapeModifiers.length,t=0;t<e;t+=1)this.shapeModifiers[t].addShape(n)},isShapeInAnimatedModifiers:function(n){for(var e=this.shapeModifiers.length;0<e;)if(this.shapeModifiers[0].isAnimatedWithShape(n))return!0;return!1},renderModifiers:function(){if(this.shapeModifiers.length){for(var n=this.shapes.length,e=0;e<n;e+=1)this.shapes[e].sh.reset();for(e=(n=this.shapeModifiers.length)-1;0<=e;--e)this.shapeModifiers[e].processShapes(this._isFirstFrame)}},lcEnum:{1:"butt",2:"round",3:"square"},ljEnum:{1:"miter",2:"round",3:"bevel"},searchProcessedElement:function(n){for(var e=this.processedElements,t=0,r=e.length;t<r;){if(e[t].elem===n)return e[t].pos;t+=1}return 0},addProcessedElement:function(n,e){for(var t=this.processedElements,r=t.length;r;)if(t[--r].elem===n)return void(t[r].pos=e);t.push(new ProcessedElement(n,e))},prepareFrame:function(n){this.prepareRenderableFrame(n),this.prepareProperties(n,this.isInRange)}},ITextElement.prototype.initElement=function(n,e,t){this.lettersChangedFlag=!0,this.initFrame(),this.initBaseData(n,e,t),this.textProperty=new TextProperty(this,n.t,this.dynamicProperties),this.textAnimator=new TextAnimatorProperty(n.t,this.renderType,this),this.initTransform(n,e,t),this.initHierarchy(),this.initRenderable(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),this.createContent(),this.hide(),this.textAnimator.searchProperties(this.dynamicProperties)},ITextElement.prototype.prepareFrame=function(n){this._mdf=!1,this.prepareRenderableFrame(n),this.prepareProperties(n,this.isInRange),(this.textProperty._mdf||this.textProperty._isFirstFrame)&&(this.buildNewText(),this.textProperty._isFirstFrame=!1,this.textProperty._mdf=!1)},ITextElement.prototype.createPathShape=function(n,e){for(var t,r=e.length,a="",s=0;s<r;s+=1)t=e[s].ks.k,a+=buildShapeString(t,t.i.length,!0,n);return a},ITextElement.prototype.updateDocumentData=function(n,e){this.textProperty.updateDocumentData(n,e)},ITextElement.prototype.canResizeFont=function(n){this.textProperty.canResizeFont(n)},ITextElement.prototype.setMinimumFontSize=function(n){this.textProperty.setMinimumFontSize(n)},ITextElement.prototype.applyTextPropertiesToMatrix=function(n,e,t,r,a){switch(n.ps&&e.translate(n.ps[0],n.ps[1]+n.ascent,0),e.translate(0,-n.ls,0),n.j){case 1:e.translate(n.justifyOffset+(n.boxWidth-n.lineWidths[t]),0,0);break;case 2:e.translate(n.justifyOffset+(n.boxWidth-n.lineWidths[t])/2,0,0)}e.translate(r,a,0)},ITextElement.prototype.buildColor=function(n){return"rgb("+Math.round(255*n[0])+","+Math.round(255*n[1])+","+Math.round(255*n[2])+")"},ITextElement.prototype.emptyProp=new LetterProps,ITextElement.prototype.destroy=function(){},extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement,RenderableDOMElement],ICompElement),ICompElement.prototype.initElement=function(n,e,t){this.initFrame(),this.initBaseData(n,e,t),this.initTransform(n,e,t),this.initRenderable(),this.initHierarchy(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),!this.data.xt&&e.progressiveLoad||this.buildAllItems(),this.hide()},ICompElement.prototype.prepareFrame=function(n){if(this._mdf=!1,this.prepareRenderableFrame(n),this.prepareProperties(n,this.isInRange),this.isInRange||this.data.xt){var e;this.tm._placeholder?this.renderedFrame=n/this.data.sr:((e=this.tm.v)===this.data.op&&(e=this.data.op-1),this.renderedFrame=e);var t,r=this.elements.length;for(this.completeLayers||this.checkLayers(this.renderedFrame),t=r-1;0<=t;--t)(this.completeLayers||this.elements[t])&&(this.elements[t].prepareFrame(this.renderedFrame-this.layers[t].st),this.elements[t]._mdf&&(this._mdf=!0))}},ICompElement.prototype.renderInnerContent=function(){for(var n=this.layers.length,e=0;e<n;e+=1)(this.completeLayers||this.elements[e])&&this.elements[e].renderFrame()},ICompElement.prototype.setElements=function(n){this.elements=n},ICompElement.prototype.getElements=function(){return this.elements},ICompElement.prototype.destroyElements=function(){for(var n=this.layers.length,e=0;e<n;e+=1)this.elements[e]&&this.elements[e].destroy()},ICompElement.prototype.destroy=function(){this.destroyElements(),this.destroyBaseElement()},extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement],IImageElement),IImageElement.prototype.createContent=function(){var n=this.globalData.getAssetsPath(this.assetData);this.innerElem=createNS("image"),this.innerElem.setAttribute("width",this.assetData.w+"px"),this.innerElem.setAttribute("height",this.assetData.h+"px"),this.innerElem.setAttribute("preserveAspectRatio",this.assetData.pr||this.globalData.renderConfig.imagePreserveAspectRatio),this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink","href",n),this.layerElement.appendChild(this.innerElem)},IImageElement.prototype.sourceRectAtTime=function(){return this.sourceRect},extendPrototype([IImageElement],ISolidElement),ISolidElement.prototype.createContent=function(){var n=createNS("rect");n.setAttribute("width",this.data.sw),n.setAttribute("height",this.data.sh),n.setAttribute("fill",this.data.sc),this.layerElement.appendChild(n)},extendPrototype([SVGRenderer,ICompElement,SVGBaseElement],SVGCompElement),extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement,ITextElement],SVGTextElement),SVGTextElement.prototype.createContent=function(){this.data.singleShape&&!this.globalData.fontManager.chars&&(this.textContainer=createNS("text"))},SVGTextElement.prototype.buildTextContents=function(n){for(var e=0,t=n.length,r=[],a="";e<t;)n[e]==="\r"||n[e]===""?(r.push(a),a=""):a+=n[e],e+=1;return r.push(a),r},SVGTextElement.prototype.buildNewText=function(){var n=this.textProperty.currentData;this.renderedLetters=createSizedArray(n?n.l.length:0),n.fc?this.layerElement.setAttribute("fill",this.buildColor(n.fc)):this.layerElement.setAttribute("fill","rgba(0,0,0,0)"),n.sc&&(this.layerElement.setAttribute("stroke",this.buildColor(n.sc)),this.layerElement.setAttribute("stroke-width",n.sw)),this.layerElement.setAttribute("font-size",n.finalSize);var e,t,r=this.globalData.fontManager.getFontByName(n.f);r.fClass?this.layerElement.setAttribute("class",r.fClass):(this.layerElement.setAttribute("font-family",r.fFamily),e=n.fWeight,t=n.fStyle,this.layerElement.setAttribute("font-style",t),this.layerElement.setAttribute("font-weight",e)),this.layerElement.setAttribute("aria-label",n.t);var a,s=n.l||[],o=!!this.globalData.fontManager.chars;A=s.length;var l,d=this.mHelper,c="",f=this.data.singleShape,_=0,m=0,g=!0,y=n.tr/1e3*n.finalSize;if(!f||o||n.sz){var x,u,p=this.textSpans.length;for(T=0;T<A;T+=1)o&&f&&T!==0||(a=T<p?this.textSpans[T]:createNS(o?"path":"text"),p<=T&&(a.setAttribute("stroke-linecap","butt"),a.setAttribute("stroke-linejoin","round"),a.setAttribute("stroke-miterlimit","4"),this.textSpans[T]=a,this.layerElement.appendChild(a)),a.style.display="inherit"),d.reset(),d.scale(n.finalSize/100,n.finalSize/100),f&&(s[T].n&&(_=-y,m+=n.yOffset,m+=g?1:0,g=!1),this.applyTextPropertiesToMatrix(n,d,s[T].line,_,m),_+=s[T].l||0,_+=y),o?(l=(x=(u=this.globalData.fontManager.getCharData(n.finalText[T],r.fStyle,this.globalData.fontManager.getFontByName(n.f).fFamily))&&u.data||{}).shapes?x.shapes[0].it:[],f?c+=this.createPathShape(d,l):a.setAttribute("d",this.createPathShape(d,l))):(f&&a.setAttribute("transform","translate("+d.props[12]+","+d.props[13]+")"),a.textContent=s[T].val,a.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"));f&&a&&a.setAttribute("d",c)}else{var M=this.textContainer,S="start";switch(n.j){case 1:S="end";break;case 2:S="middle"}M.setAttribute("text-anchor",S),M.setAttribute("letter-spacing",y);for(var b=this.buildTextContents(n.finalText),A=b.length,m=n.ps?n.ps[1]+n.ascent:0,T=0;T<A;T+=1)(a=this.textSpans[T]||createNS("tspan")).textContent=b[T],a.setAttribute("x",0),a.setAttribute("y",m),a.style.display="inherit",M.appendChild(a),this.textSpans[T]=a,m+=n.finalLineHeight;this.layerElement.appendChild(M)}for(;T<this.textSpans.length;)this.textSpans[T].style.display="none",T+=1;this._sizeChanged=!0},SVGTextElement.prototype.sourceRectAtTime=function(n){var e;return this.prepareFrame(this.comp.renderedFrame-this.data.st),this.renderInnerContent(),this._sizeChanged&&(this._sizeChanged=!1,e=this.layerElement.getBBox(),this.bbox={top:e.y,left:e.x,width:e.width,height:e.height}),this.bbox},SVGTextElement.prototype.renderInnerContent=function(){if(!this.data.singleShape&&(this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag),this.lettersChangedFlag||this.textAnimator.lettersChangedFlag)){this._sizeChanged=!0;for(var n,e,t=this.textAnimator.renderedLetters,r=this.textProperty.currentData.l,a=r.length,s=0;s<a;s+=1)r[s].n||(n=t[s],e=this.textSpans[s],n._mdf.m&&e.setAttribute("transform",n.m),n._mdf.o&&e.setAttribute("opacity",n.o),n._mdf.sw&&e.setAttribute("stroke-width",n.sw),n._mdf.sc&&e.setAttribute("stroke",n.sc),n._mdf.fc&&e.setAttribute("fill",n.fc))}},extendPrototype([BaseElement,TransformElement,SVGBaseElement,IShapeElement,HierarchyElement,FrameElement,RenderableDOMElement],SVGShapeElement),SVGShapeElement.prototype.initSecondaryElement=function(){},SVGShapeElement.prototype.identityMatrix=new Matrix,SVGShapeElement.prototype.buildExpressionInterface=function(){},SVGShapeElement.prototype.createContent=function(){this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],!0),this.filterUniqueShapes()},SVGShapeElement.prototype.filterUniqueShapes=function(){for(var n,e,t,r=this.shapes.length,a=this.stylesList.length,s=[],o=!1,l=0;l<a;l+=1){for(t=this.stylesList[l],o=!1,n=s.length=0;n<r;n+=1)(e=this.shapes[n]).styles.indexOf(t)!==-1&&(s.push(e),o=e._isAnimated||o);1<s.length&&o&&this.setShapesAsAnimated(s)}},SVGShapeElement.prototype.setShapesAsAnimated=function(n){for(var e=n.length,t=0;t<e;t+=1)n[t].setAsAnimated()},SVGShapeElement.prototype.createStyleElement=function(n,e){var t,r=new SVGStyleData(n,e),a=r.pElem;return n.ty==="st"?t=new SVGStrokeStyleData(this,n,r):n.ty==="fl"?t=new SVGFillStyleData(this,n,r):n.ty!=="gf"&&n.ty!=="gs"||(t=new(n.ty==="gf"?SVGGradientFillStyleData:SVGGradientStrokeStyleData)(this,n,r),this.globalData.defs.appendChild(t.gf),t.maskId&&(this.globalData.defs.appendChild(t.ms),this.globalData.defs.appendChild(t.of),a.setAttribute("mask","url("+locationHref+"#"+t.maskId+")"))),n.ty!=="st"&&n.ty!=="gs"||(a.setAttribute("stroke-linecap",this.lcEnum[n.lc]||"round"),a.setAttribute("stroke-linejoin",this.ljEnum[n.lj]||"round"),a.setAttribute("fill-opacity","0"),n.lj===1&&a.setAttribute("stroke-miterlimit",n.ml)),n.r===2&&a.setAttribute("fill-rule","evenodd"),n.ln&&a.setAttribute("id",n.ln),n.cl&&a.setAttribute("class",n.cl),n.bm&&(a.style["mix-blend-mode"]=getBlendMode(n.bm)),this.stylesList.push(r),this.addToAnimatedContents(n,t),t},SVGShapeElement.prototype.createGroupElement=function(n){var e=new ShapeGroupData;return n.ln&&e.gr.setAttribute("id",n.ln),n.cl&&e.gr.setAttribute("class",n.cl),n.bm&&(e.gr.style["mix-blend-mode"]=getBlendMode(n.bm)),e},SVGShapeElement.prototype.createTransformElement=function(n,e){var t=TransformPropertyFactory.getTransformProperty(this,n,this),r=new SVGTransformData(t,t.o,e);return this.addToAnimatedContents(n,r),r},SVGShapeElement.prototype.createShapeElement=function(n,e,t){var r=4;n.ty==="rc"?r=5:n.ty==="el"?r=6:n.ty==="sr"&&(r=7);var a=new SVGShapeData(e,t,ShapePropertyFactory.getShapeProp(this,n,r,this));return this.shapes.push(a),this.addShapeToModifiers(a),this.addToAnimatedContents(n,a),a},SVGShapeElement.prototype.addToAnimatedContents=function(n,e){for(var t=0,r=this.animatedContents.length;t<r;){if(this.animatedContents[t].element===e)return;t+=1}this.animatedContents.push({fn:SVGElementsRenderer.createRenderFunction(n),element:e,data:n})},SVGShapeElement.prototype.setElementStyles=function(n){for(var e=n.styles,t=this.stylesList.length,r=0;r<t;r+=1)this.stylesList[r].closed||e.push(this.stylesList[r])},SVGShapeElement.prototype.reloadShapes=function(){this._isFirstFrame=!0;for(var n=this.itemsData.length,e=0;e<n;e+=1)this.prevViewData[e]=this.itemsData[e];for(this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],!0),this.filterUniqueShapes(),n=this.dynamicProperties.length,e=0;e<n;e+=1)this.dynamicProperties[e].getValue();this.renderModifiers()},SVGShapeElement.prototype.searchShapes=function(n,e,t,r,a,s,o){for(var l,d,c,f,_,m=[].concat(s),g=n.length-1,y=[],x=[],u=g;0<=u;--u){if((_=this.searchProcessedElement(n[u]))?e[u]=t[_-1]:n[u]._render=o,n[u].ty=="fl"||n[u].ty=="st"||n[u].ty=="gf"||n[u].ty=="gs")_?e[u].style.closed=!1:e[u]=this.createStyleElement(n[u],a),n[u]._render&&r.appendChild(e[u].style.pElem),y.push(e[u].style);else if(n[u].ty=="gr"){if(_)for(d=e[u].it.length,l=0;l<d;l+=1)e[u].prevViewData[l]=e[u].it[l];else e[u]=this.createGroupElement(n[u]);this.searchShapes(n[u].it,e[u].it,e[u].prevViewData,e[u].gr,a+1,m,o),n[u]._render&&r.appendChild(e[u].gr)}else n[u].ty=="tr"?(_||(e[u]=this.createTransformElement(n[u],r)),c=e[u].transform,m.push(c)):n[u].ty=="sh"||n[u].ty=="rc"||n[u].ty=="el"||n[u].ty=="sr"?(_||(e[u]=this.createShapeElement(n[u],m,a)),this.setElementStyles(e[u])):n[u].ty=="tm"||n[u].ty=="rd"||n[u].ty=="ms"?(_?(f=e[u]).closed=!1:((f=ShapeModifiers.getModifier(n[u].ty)).init(this,n[u]),e[u]=f,this.shapeModifiers.push(f)),x.push(f)):n[u].ty=="rp"&&(_?(f=e[u]).closed=!0:(f=ShapeModifiers.getModifier(n[u].ty),(e[u]=f).init(this,n,u,e),this.shapeModifiers.push(f),o=!1),x.push(f));this.addProcessedElement(n[u],u+1)}for(g=y.length,u=0;u<g;u+=1)y[u].closed=!0;for(g=x.length,u=0;u<g;u+=1)x[u].closed=!0},SVGShapeElement.prototype.renderInnerContent=function(){this.renderModifiers();for(var n=this.stylesList.length,e=0;e<n;e+=1)this.stylesList[e].reset();for(this.renderShape(),e=0;e<n;e+=1)(this.stylesList[e]._mdf||this._isFirstFrame)&&(this.stylesList[e].msElem&&(this.stylesList[e].msElem.setAttribute("d",this.stylesList[e].d),this.stylesList[e].d="M0 0"+this.stylesList[e].d),this.stylesList[e].pElem.setAttribute("d",this.stylesList[e].d||"M0 0"))},SVGShapeElement.prototype.renderShape=function(){for(var n,e=this.animatedContents.length,t=0;t<e;t+=1)n=this.animatedContents[t],(this._isFirstFrame||n.element._isAnimated)&&n.data!==!0&&n.fn(n.data,n.element,this._isFirstFrame)},SVGShapeElement.prototype.destroy=function(){this.destroyBaseElement(),this.shapesData=null,this.itemsData=null},SVGTintFilter.prototype.renderFrame=function(n){var e,t,r;(n||this.filterManager._mdf)&&(e=this.filterManager.effectElements[0].p.v,t=this.filterManager.effectElements[1].p.v,r=this.filterManager.effectElements[2].p.v/100,this.matrixFilter.setAttribute("values",t[0]-e[0]+" 0 0 0 "+e[0]+" "+(t[1]-e[1])+" 0 0 0 "+e[1]+" "+(t[2]-e[2])+" 0 0 0 "+e[2]+" 0 0 0 "+r+" 0"))},SVGFillFilter.prototype.renderFrame=function(n){var e,t;(n||this.filterManager._mdf)&&(e=this.filterManager.effectElements[2].p.v,t=this.filterManager.effectElements[6].p.v,this.matrixFilter.setAttribute("values","0 0 0 0 "+e[0]+" 0 0 0 0 "+e[1]+" 0 0 0 0 "+e[2]+" 0 0 0 "+t+" 0"))},SVGGaussianBlurEffect.prototype.renderFrame=function(n){var e,t,r,a,s;(n||this.filterManager._mdf)&&(e=.3*this.filterManager.effectElements[0].p.v,r=(t=this.filterManager.effectElements[1].p.v)==3?0:e,a=t==2?0:e,this.feGaussianBlur.setAttribute("stdDeviation",r+" "+a),s=this.filterManager.effectElements[2].p.v==1?"wrap":"duplicate",this.feGaussianBlur.setAttribute("edgeMode",s))},SVGStrokeEffect.prototype.initialize=function(){var n,e,t,r,a=this.elem.layerElement.children||this.elem.layerElement.childNodes;for(this.filterManager.effectElements[1].p.v===1?(r=this.elem.maskManager.masksProperties.length,t=0):r=(t=this.filterManager.effectElements[0].p.v-1)+1,(e=createNS("g")).setAttribute("fill","none"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-dashoffset",1);t<r;t+=1)n=createNS("path"),e.appendChild(n),this.paths.push({p:n,m:t});if(this.filterManager.effectElements[10].p.v===3){var s=createNS("mask"),o=createElementID();s.setAttribute("id",o),s.setAttribute("mask-type","alpha"),s.appendChild(e),this.elem.globalData.defs.appendChild(s);var l=createNS("g");for(l.setAttribute("mask","url("+locationHref+"#"+o+")");a[0];)l.appendChild(a[0]);this.elem.layerElement.appendChild(l),this.masker=s,e.setAttribute("stroke","#fff")}else if(this.filterManager.effectElements[10].p.v===1||this.filterManager.effectElements[10].p.v===2){if(this.filterManager.effectElements[10].p.v===2)for(a=this.elem.layerElement.children||this.elem.layerElement.childNodes;a.length;)this.elem.layerElement.removeChild(a[0]);this.elem.layerElement.appendChild(e),this.elem.layerElement.removeAttribute("mask"),e.setAttribute("stroke","#fff")}this.initialized=!0,this.pathMasker=e},SVGStrokeEffect.prototype.renderFrame=function(n){this.initialized||this.initialize();for(var e,t,r,a=this.paths.length,s=0;s<a;s+=1)if(this.paths[s].m!==-1&&(e=this.elem.maskManager.viewData[this.paths[s].m],t=this.paths[s].p,(n||this.filterManager._mdf||e.prop._mdf)&&t.setAttribute("d",e.lastPath),n||this.filterManager.effectElements[9].p._mdf||this.filterManager.effectElements[4].p._mdf||this.filterManager.effectElements[7].p._mdf||this.filterManager.effectElements[8].p._mdf||e.prop._mdf)){if(this.filterManager.effectElements[7].p.v!==0||this.filterManager.effectElements[8].p.v!==100){for(var o=Math.min(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)/100,l=Math.max(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)/100,d=t.getTotalLength(),c="0 0 0 "+d*o+" ",f=d*(l-o),_=1+2*this.filterManager.effectElements[4].p.v*this.filterManager.effectElements[9].p.v/100,m=Math.floor(f/_),g=0;g<m;g+=1)c+="1 "+2*this.filterManager.effectElements[4].p.v*this.filterManager.effectElements[9].p.v/100+" ";c+="0 "+10*d+" 0 0"}else c="1 "+2*this.filterManager.effectElements[4].p.v*this.filterManager.effectElements[9].p.v/100;t.setAttribute("stroke-dasharray",c)}(n||this.filterManager.effectElements[4].p._mdf)&&this.pathMasker.setAttribute("stroke-width",2*this.filterManager.effectElements[4].p.v),(n||this.filterManager.effectElements[6].p._mdf)&&this.pathMasker.setAttribute("opacity",this.filterManager.effectElements[6].p.v),this.filterManager.effectElements[10].p.v!==1&&this.filterManager.effectElements[10].p.v!==2||(n||this.filterManager.effectElements[3].p._mdf)&&(r=this.filterManager.effectElements[3].p.v,this.pathMasker.setAttribute("stroke","rgb("+bm_floor(255*r[0])+","+bm_floor(255*r[1])+","+bm_floor(255*r[2])+")"))},SVGTritoneFilter.prototype.renderFrame=function(n){var e,t,r,a,s,o;(n||this.filterManager._mdf)&&(e=this.filterManager.effectElements[0].p.v,t=this.filterManager.effectElements[1].p.v,a=(r=this.filterManager.effectElements[2].p.v)[0]+" "+t[0]+" "+e[0],s=r[1]+" "+t[1]+" "+e[1],o=r[2]+" "+t[2]+" "+e[2],this.feFuncR.setAttribute("tableValues",a),this.feFuncG.setAttribute("tableValues",s),this.feFuncB.setAttribute("tableValues",o))},SVGProLevelsFilter.prototype.createFeFunc=function(n,e){var t=createNS(n);return t.setAttribute("type","table"),e.appendChild(t),t},SVGProLevelsFilter.prototype.getTableValue=function(n,e,t,r,a){for(var s,o,l=0,d=Math.min(n,e),c=Math.max(n,e),f=Array.call(null,{length:256}),_=0,m=a-r,g=e-n;l<=256;)o=(s=l/256)<=d?g<0?a:r:c<=s?g<0?r:a:r+m*Math.pow((s-n)/g,1/t),f[_++]=o,l+=256/255;return f.join(" ")},SVGProLevelsFilter.prototype.renderFrame=function(n){var e,t;(n||this.filterManager._mdf)&&(t=this.filterManager.effectElements,this.feFuncRComposed&&(n||t[3].p._mdf||t[4].p._mdf||t[5].p._mdf||t[6].p._mdf||t[7].p._mdf)&&(e=this.getTableValue(t[3].p.v,t[4].p.v,t[5].p.v,t[6].p.v,t[7].p.v),this.feFuncRComposed.setAttribute("tableValues",e),this.feFuncGComposed.setAttribute("tableValues",e),this.feFuncBComposed.setAttribute("tableValues",e)),this.feFuncR&&(n||t[10].p._mdf||t[11].p._mdf||t[12].p._mdf||t[13].p._mdf||t[14].p._mdf)&&(e=this.getTableValue(t[10].p.v,t[11].p.v,t[12].p.v,t[13].p.v,t[14].p.v),this.feFuncR.setAttribute("tableValues",e)),this.feFuncG&&(n||t[17].p._mdf||t[18].p._mdf||t[19].p._mdf||t[20].p._mdf||t[21].p._mdf)&&(e=this.getTableValue(t[17].p.v,t[18].p.v,t[19].p.v,t[20].p.v,t[21].p.v),this.feFuncG.setAttribute("tableValues",e)),this.feFuncB&&(n||t[24].p._mdf||t[25].p._mdf||t[26].p._mdf||t[27].p._mdf||t[28].p._mdf)&&(e=this.getTableValue(t[24].p.v,t[25].p.v,t[26].p.v,t[27].p.v,t[28].p.v),this.feFuncB.setAttribute("tableValues",e)),this.feFuncA&&(n||t[31].p._mdf||t[32].p._mdf||t[33].p._mdf||t[34].p._mdf||t[35].p._mdf)&&(e=this.getTableValue(t[31].p.v,t[32].p.v,t[33].p.v,t[34].p.v,t[35].p.v),this.feFuncA.setAttribute("tableValues",e)))},SVGDropShadowEffect.prototype.renderFrame=function(n){var e,t,r,a,s;(n||this.filterManager._mdf)&&((n||this.filterManager.effectElements[4].p._mdf)&&this.feGaussianBlur.setAttribute("stdDeviation",this.filterManager.effectElements[4].p.v/4),(n||this.filterManager.effectElements[0].p._mdf)&&(e=this.filterManager.effectElements[0].p.v,this.feFlood.setAttribute("flood-color",rgbToHex(Math.round(255*e[0]),Math.round(255*e[1]),Math.round(255*e[2])))),(n||this.filterManager.effectElements[1].p._mdf)&&this.feFlood.setAttribute("flood-opacity",this.filterManager.effectElements[1].p.v/255),(n||this.filterManager.effectElements[2].p._mdf||this.filterManager.effectElements[3].p._mdf)&&(t=this.filterManager.effectElements[3].p.v,r=(this.filterManager.effectElements[2].p.v-90)*degToRads,a=t*Math.cos(r),s=t*Math.sin(r),this.feOffset.setAttribute("dx",a),this.feOffset.setAttribute("dy",s)))};var _svgMatteSymbols=[];function SVGMatte3Effect(n,e,t){this.initialized=!1,this.filterManager=e,this.filterElem=n,(this.elem=t).matteElement=createNS("g"),t.matteElement.appendChild(t.layerElement),t.matteElement.appendChild(t.transformedElement),t.baseElement=t.matteElement}function SVGEffects(n){var e,t,r=n.data.ef?n.data.ef.length:0,a=createElementID(),s=filtersFactory.createFilter(a),o=0;for(this.filters=[],e=0;e<r;e+=1)t=null,n.data.ef[e].ty===20?(o+=1,t=new SVGTintFilter(s,n.effectsManager.effectElements[e])):n.data.ef[e].ty===21?(o+=1,t=new SVGFillFilter(s,n.effectsManager.effectElements[e])):n.data.ef[e].ty===22?t=new SVGStrokeEffect(n,n.effectsManager.effectElements[e]):n.data.ef[e].ty===23?(o+=1,t=new SVGTritoneFilter(s,n.effectsManager.effectElements[e])):n.data.ef[e].ty===24?(o+=1,t=new SVGProLevelsFilter(s,n.effectsManager.effectElements[e])):n.data.ef[e].ty===25?(o+=1,t=new SVGDropShadowEffect(s,n.effectsManager.effectElements[e])):n.data.ef[e].ty===28?t=new SVGMatte3Effect(s,n.effectsManager.effectElements[e],n):n.data.ef[e].ty===29&&(o+=1,t=new SVGGaussianBlurEffect(s,n.effectsManager.effectElements[e])),t&&this.filters.push(t);o&&(n.globalData.defs.appendChild(s),n.layerElement.setAttribute("filter","url("+locationHref+"#"+a+")")),this.filters.length&&n.addRenderableComponent(this)}SVGMatte3Effect.prototype.findSymbol=function(n){for(var e=0,t=_svgMatteSymbols.length;e<t;){if(_svgMatteSymbols[e]===n)return _svgMatteSymbols[e];e+=1}return null},SVGMatte3Effect.prototype.replaceInParent=function(n,e){var t=n.layerElement.parentNode;if(t){for(var r,a=t.children,s=0,o=a.length;s<o&&a[s]!==n.layerElement;)s+=1;s<=o-2&&(r=a[s+1]);var l=createNS("use");l.setAttribute("href","#"+e),r?t.insertBefore(l,r):t.appendChild(l)}},SVGMatte3Effect.prototype.setElementAsMask=function(n,e){var t,r,a,s,o;this.findSymbol(e)||(t=createElementID(),(r=createNS("mask")).setAttribute("id",e.layerId),r.setAttribute("mask-type","alpha"),_svgMatteSymbols.push(e),(a=n.globalData.defs).appendChild(r),(s=createNS("symbol")).setAttribute("id",t),this.replaceInParent(e,t),s.appendChild(e.layerElement),a.appendChild(s),(o=createNS("use")).setAttribute("href","#"+t),r.appendChild(o),e.data.hd=!1,e.show()),n.setMatte(e.layerId)},SVGMatte3Effect.prototype.initialize=function(){for(var n=this.filterManager.effectElements[0].p.v,e=this.elem.comp.elements,t=0,r=e.length;t<r;)e[t]&&e[t].data.ind===n&&this.setElementAsMask(this.elem,e[t]),t+=1;this.initialized=!0},SVGMatte3Effect.prototype.renderFrame=function(){this.initialized||this.initialize()},SVGEffects.prototype.renderFrame=function(n){for(var e=this.filters.length,t=0;t<e;t+=1)this.filters[t].renderFrame(n)};var animationManager=(uM={},vM=[],wM=0,xM=0,yM=0,zM=!0,AM=!1,uM.registerAnimation=CM,uM.loadAnimation=function(n){var e=new AnimationItem;return GM(e,null),e.setParams(n),e},uM.setSpeed=function(n,e){for(var t=0;t<xM;t+=1)vM[t].animation.setSpeed(n,e)},uM.setDirection=function(n,e){for(var t=0;t<xM;t+=1)vM[t].animation.setDirection(n,e)},uM.play=function(n){for(var e=0;e<xM;e+=1)vM[e].animation.play(n)},uM.pause=function(n){for(var e=0;e<xM;e+=1)vM[e].animation.pause(n)},uM.stop=function(n){for(var e=0;e<xM;e+=1)vM[e].animation.stop(n)},uM.togglePause=function(n){for(var e=0;e<xM;e+=1)vM[e].animation.togglePause(n)},uM.searchAnimations=function(n,e,t){for(var r,a,s=[].concat([].slice.call(document.getElementsByClassName("lottie")),[].slice.call(document.getElementsByClassName("bodymovin"))),o=s.length,l=0;l<o;l+=1)t&&s[l].setAttribute("data-bm-type",t),CM(s[l],n);e&&o===0&&(t=t||"svg",(r=document.getElementsByTagName("body")[0]).innerHTML="",(a=createTag("div")).style.width="100%",a.style.height="100%",a.setAttribute("data-bm-type",t),r.appendChild(a),CM(a,n))},uM.resize=function(){for(var n=0;n<xM;n+=1)vM[n].animation.resize()},uM.goToAndStop=function(n,e,t){for(var r=0;r<xM;r+=1)vM[r].animation.goToAndStop(n,e,t)},uM.destroy=function(n){for(var e=xM-1;0<=e;--e)vM[e].animation.destroy(n)},uM.freeze=function(){AM=!0},uM.unfreeze=function(){AM=!1,UM()},uM.getRegisteredAnimations=function(){for(var n=vM.length,e=[],t=0;t<n;t+=1)e.push(vM[t].animation);return e},uM),uM,vM,wM,xM,yM,zM,AM;function BM(n){for(var e=0,t=n.target;e<xM;)vM[e].animation===t&&(vM.splice(e,1),--e,--xM,t.isPaused||FM()),e+=1}function CM(n,e){if(!n)return null;for(var t=0;t<xM;){if(vM[t].elem==n&&vM[t].elem!==null)return vM[t].animation;t+=1}var r=new AnimationItem;return GM(r,n),r.setData(n,e),r}function EM(){yM+=1,UM()}function FM(){--yM}function GM(n,e){n.addEventListener("destroy",BM),n.addEventListener("_active",EM),n.addEventListener("_idle",FM),vM.push({elem:e,animation:n}),xM+=1}function LM(n){for(var e=n-wM,t=0;t<xM;t+=1)vM[t].animation.advanceTime(e);wM=n,yM&&!AM?window.requestAnimationFrame(LM):zM=!0}function MM(n){wM=n,window.requestAnimationFrame(LM)}function UM(){!AM&&yM&&zM&&(window.requestAnimationFrame(MM),zM=!1)}var AnimationItem=function(){this._cbs=[],this.name="",this.path="",this.isLoaded=!1,this.currentFrame=0,this.currentRawFrame=0,this.firstFrame=0,this.totalFrames=0,this.frameRate=0,this.frameMult=0,this.playSpeed=1,this.playDirection=1,this.playCount=0,this.animationData={},this.assets=[],this.isPaused=!0,this.autoplay=!1,this.loop=!0,this.renderer=null,this.animationID=createElementID(),this.assetsPath="",this.timeCompleted=0,this.segmentPos=0,this.isSubframeEnabled=subframeEnabled,this.segments=[],this._idle=!0,this._completedLoop=!1,this.projectInterface=ProjectInterface(),this.imagePreloader=new ImagePreloader};extendPrototype([BaseEvent],AnimationItem),AnimationItem.prototype.setParams=function(n){n.context&&(this.context=n.context),(n.wrapper||n.container)&&(this.wrapper=n.wrapper||n.container);var e=n.animType?n.animType:n.renderer?n.renderer:"svg";switch(e){case"canvas":this.renderer=new CanvasRenderer(this,n.rendererSettings);break;case"svg":this.renderer=new SVGRenderer(this,n.rendererSettings);break;default:this.renderer=new HybridRenderer(this,n.rendererSettings)}this.imagePreloader.setCacheType(e),this.renderer.setProjectInterface(this.projectInterface),this.animType=e,n.loop===""||n.loop===null||n.loop===void 0||n.loop===!0?this.loop=!0:n.loop===!1?this.loop=!1:this.loop=parseInt(n.loop),this.autoplay=!("autoplay"in n)||n.autoplay,this.name=n.name?n.name:"",this.autoloadSegments=!n.hasOwnProperty("autoloadSegments")||n.autoloadSegments,this.assetsPath=n.assetsPath,this.initialSegment=n.initialSegment,n.animationData?this.configAnimation(n.animationData):n.path&&(n.path.lastIndexOf("\\")!==-1?this.path=n.path.substr(0,n.path.lastIndexOf("\\")+1):this.path=n.path.substr(0,n.path.lastIndexOf("/")+1),this.fileName=n.path.substr(n.path.lastIndexOf("/")+1),this.fileName=this.fileName.substr(0,this.fileName.lastIndexOf(".json")),assetLoader.load(n.path,this.configAnimation.bind(this),(function(){this.trigger("data_failed")}).bind(this)))},AnimationItem.prototype.setData=function(n,e){var t={wrapper:n,animationData:e?typeof e=="object"?e:JSON.parse(e):null},r=n.attributes;t.path=r.getNamedItem("data-animation-path")?r.getNamedItem("data-animation-path").value:r.getNamedItem("data-bm-path")?r.getNamedItem("data-bm-path").value:r.getNamedItem("bm-path")?r.getNamedItem("bm-path").value:"",t.animType=r.getNamedItem("data-anim-type")?r.getNamedItem("data-anim-type").value:r.getNamedItem("data-bm-type")?r.getNamedItem("data-bm-type").value:r.getNamedItem("bm-type")?r.getNamedItem("bm-type").value:r.getNamedItem("data-bm-renderer")?r.getNamedItem("data-bm-renderer").value:r.getNamedItem("bm-renderer")?r.getNamedItem("bm-renderer").value:"canvas";var a=r.getNamedItem("data-anim-loop")?r.getNamedItem("data-anim-loop").value:r.getNamedItem("data-bm-loop")?r.getNamedItem("data-bm-loop").value:r.getNamedItem("bm-loop")?r.getNamedItem("bm-loop").value:"";a===""||(t.loop=a!=="false"&&(a==="true"||parseInt(a)));var s=r.getNamedItem("data-anim-autoplay")?r.getNamedItem("data-anim-autoplay").value:r.getNamedItem("data-bm-autoplay")?r.getNamedItem("data-bm-autoplay").value:!r.getNamedItem("bm-autoplay")||r.getNamedItem("bm-autoplay").value;t.autoplay=s!=="false",t.name=r.getNamedItem("data-name")?r.getNamedItem("data-name").value:r.getNamedItem("data-bm-name")?r.getNamedItem("data-bm-name").value:r.getNamedItem("bm-name")?r.getNamedItem("bm-name").value:"",(r.getNamedItem("data-anim-prerender")?r.getNamedItem("data-anim-prerender").value:r.getNamedItem("data-bm-prerender")?r.getNamedItem("data-bm-prerender").value:r.getNamedItem("bm-prerender")?r.getNamedItem("bm-prerender").value:"")==="false"&&(t.prerender=!1),this.setParams(t)},AnimationItem.prototype.includeLayers=function(n){n.op>this.animationData.op&&(this.animationData.op=n.op,this.totalFrames=Math.floor(n.op-this.animationData.ip));for(var e,t=this.animationData.layers,r=t.length,a=n.layers,s=a.length,o=0;o<s;o+=1)for(e=0;e<r;){if(t[e].id==a[o].id){t[e]=a[o];break}e+=1}if((n.chars||n.fonts)&&(this.renderer.globalData.fontManager.addChars(n.chars),this.renderer.globalData.fontManager.addFonts(n.fonts,this.renderer.globalData.defs)),n.assets)for(r=n.assets.length,e=0;e<r;e+=1)this.animationData.assets.push(n.assets[e]);this.animationData.__complete=!1,dataManager.completeData(this.animationData,this.renderer.globalData.fontManager),this.renderer.includeLayers(n.layers),expressionsPlugin&&expressionsPlugin.initExpressions(this),this.loadNextSegment()},AnimationItem.prototype.loadNextSegment=function(){var n=this.animationData.segments;if(!n||n.length===0||!this.autoloadSegments)return this.trigger("data_ready"),void(this.timeCompleted=this.totalFrames);var e=n.shift();this.timeCompleted=e.time*this.frameRate;var t=this.path+this.fileName+"_"+this.segmentPos+".json";this.segmentPos+=1,assetLoader.load(t,this.includeLayers.bind(this),(function(){this.trigger("data_failed")}).bind(this))},AnimationItem.prototype.loadSegments=function(){this.animationData.segments||(this.timeCompleted=this.totalFrames),this.loadNextSegment()},AnimationItem.prototype.imagesLoaded=function(){this.trigger("loaded_images"),this.checkLoaded()},AnimationItem.prototype.preloadImages=function(){this.imagePreloader.setAssetsPath(this.assetsPath),this.imagePreloader.setPath(this.path),this.imagePreloader.loadAssets(this.animationData.assets,this.imagesLoaded.bind(this))},AnimationItem.prototype.configAnimation=function(n){if(this.renderer)try{this.animationData=n,this.initialSegment?(this.totalFrames=Math.floor(this.initialSegment[1]-this.initialSegment[0]),this.firstFrame=Math.round(this.initialSegment[0])):(this.totalFrames=Math.floor(this.animationData.op-this.animationData.ip),this.firstFrame=Math.round(this.animationData.ip)),this.renderer.configAnimation(n),n.assets||(n.assets=[]),this.assets=this.animationData.assets,this.frameRate=this.animationData.fr,this.frameMult=this.animationData.fr/1e3,this.renderer.searchExtraCompositions(n.assets),this.trigger("config_ready"),this.preloadImages(),this.loadSegments(),this.updaFrameModifier(),this.waitForFontsLoaded()}catch(e){this.triggerConfigError(e)}},AnimationItem.prototype.waitForFontsLoaded=function(){this.renderer&&(this.renderer.globalData.fontManager.isLoaded?this.checkLoaded():setTimeout(this.waitForFontsLoaded.bind(this),20))},AnimationItem.prototype.checkLoaded=function(){this.isLoaded||!this.renderer.globalData.fontManager.isLoaded||!this.imagePreloader.loaded()&&this.renderer.rendererType==="canvas"||(this.isLoaded=!0,dataManager.completeData(this.animationData,this.renderer.globalData.fontManager),expressionsPlugin&&expressionsPlugin.initExpressions(this),this.renderer.initItems(),setTimeout((function(){this.trigger("DOMLoaded")}).bind(this),0),this.gotoFrame(),this.autoplay&&this.play())},AnimationItem.prototype.resize=function(){this.renderer.updateContainerSize()},AnimationItem.prototype.setSubframe=function(n){this.isSubframeEnabled=!!n},AnimationItem.prototype.gotoFrame=function(){this.currentFrame=this.isSubframeEnabled?this.currentRawFrame:~~this.currentRawFrame,this.timeCompleted!==this.totalFrames&&this.currentFrame>this.timeCompleted&&(this.currentFrame=this.timeCompleted),this.trigger("enterFrame"),this.renderFrame()},AnimationItem.prototype.renderFrame=function(){if(this.isLoaded!==!1)try{this.renderer.renderFrame(this.currentFrame+this.firstFrame)}catch(n){this.triggerRenderFrameError(n)}},AnimationItem.prototype.play=function(n){n&&this.name!=n||this.isPaused===!0&&(this.isPaused=!1,this._idle&&(this._idle=!1,this.trigger("_active")))},AnimationItem.prototype.pause=function(n){n&&this.name!=n||this.isPaused===!1&&(this.isPaused=!0,this._idle=!0,this.trigger("_idle"))},AnimationItem.prototype.togglePause=function(n){n&&this.name!=n||(this.isPaused===!0?this.play():this.pause())},AnimationItem.prototype.stop=function(n){n&&this.name!=n||(this.pause(),this.playCount=0,this._completedLoop=!1,this.setCurrentRawFrameValue(0))},AnimationItem.prototype.goToAndStop=function(n,e,t){t&&this.name!=t||(e?this.setCurrentRawFrameValue(n):this.setCurrentRawFrameValue(n*this.frameModifier),this.pause())},AnimationItem.prototype.goToAndPlay=function(n,e,t){this.goToAndStop(n,e,t),this.play()},AnimationItem.prototype.advanceTime=function(n){var e,t;this.isPaused!==!0&&this.isLoaded!==!1&&(t=!1,(e=this.currentRawFrame+n*this.frameModifier)>=this.totalFrames-1&&0<this.frameModifier?this.loop&&this.playCount!==this.loop?e>=this.totalFrames?(this.playCount+=1,this.checkSegments(e%this.totalFrames)||(this.setCurrentRawFrameValue(e%this.totalFrames),this._completedLoop=!0,this.trigger("loopComplete"))):this.setCurrentRawFrameValue(e):this.checkSegments(e>this.totalFrames?e%this.totalFrames:0)||(t=!0,e=this.totalFrames-1):e<0?this.checkSegments(e%this.totalFrames)||(!this.loop||this.playCount--<=0&&this.loop!==!0?(t=!0,e=0):(this.setCurrentRawFrameValue(this.totalFrames+e%this.totalFrames),this._completedLoop?this.trigger("loopComplete"):this._completedLoop=!0)):this.setCurrentRawFrameValue(e),t&&(this.setCurrentRawFrameValue(e),this.pause(),this.trigger("complete")))},AnimationItem.prototype.adjustSegment=function(n,e){this.playCount=0,n[1]<n[0]?(0<this.frameModifier&&(this.playSpeed<0?this.setSpeed(-this.playSpeed):this.setDirection(-1)),this.timeCompleted=this.totalFrames=n[0]-n[1],this.firstFrame=n[1],this.setCurrentRawFrameValue(this.totalFrames-.001-e)):n[1]>n[0]&&(this.frameModifier<0&&(this.playSpeed<0?this.setSpeed(-this.playSpeed):this.setDirection(1)),this.timeCompleted=this.totalFrames=n[1]-n[0],this.firstFrame=n[0],this.setCurrentRawFrameValue(.001+e)),this.trigger("segmentStart")},AnimationItem.prototype.setSegment=function(n,e){var t=-1;this.isPaused&&(this.currentRawFrame+this.firstFrame<n?t=n:this.currentRawFrame+this.firstFrame>e&&(t=e-n)),this.firstFrame=n,this.timeCompleted=this.totalFrames=e-n,t!==-1&&this.goToAndStop(t,!0)},AnimationItem.prototype.playSegments=function(n,e){if(e&&(this.segments.length=0),typeof n[0]=="object")for(var t=n.length,r=0;r<t;r+=1)this.segments.push(n[r]);else this.segments.push(n);this.segments.length&&e&&this.adjustSegment(this.segments.shift(),0),this.isPaused&&this.play()},AnimationItem.prototype.resetSegments=function(n){this.segments.length=0,this.segments.push([this.animationData.ip,this.animationData.op]),n&&this.checkSegments(0)},AnimationItem.prototype.checkSegments=function(n){return!!this.segments.length&&(this.adjustSegment(this.segments.shift(),n),!0)},AnimationItem.prototype.destroy=function(n){n&&this.name!=n||!this.renderer||(this.renderer.destroy(),this.imagePreloader.destroy(),this.trigger("destroy"),this._cbs=null,this.onEnterFrame=this.onLoopComplete=this.onComplete=this.onSegmentStart=this.onDestroy=null,this.renderer=null)},AnimationItem.prototype.setCurrentRawFrameValue=function(n){this.currentRawFrame=n,this.gotoFrame()},AnimationItem.prototype.setSpeed=function(n){this.playSpeed=n,this.updaFrameModifier()},AnimationItem.prototype.setDirection=function(n){this.playDirection=n<0?-1:1,this.updaFrameModifier()},AnimationItem.prototype.updaFrameModifier=function(){this.frameModifier=this.frameMult*this.playSpeed*this.playDirection},AnimationItem.prototype.getPath=function(){return this.path},AnimationItem.prototype.getAssetsPath=function(n){var e,t="";return n.e?t=n.p:this.assetsPath?((e=n.p).indexOf("images/")!==-1&&(e=e.split("/")[1]),t=this.assetsPath+e):(t=this.path,t+=n.u?n.u:"",t+=n.p),t},AnimationItem.prototype.getAssetData=function(n){for(var e=0,t=this.assets.length;e<t;){if(n==this.assets[e].id)return this.assets[e];e+=1}},AnimationItem.prototype.hide=function(){this.renderer.hide()},AnimationItem.prototype.show=function(){this.renderer.show()},AnimationItem.prototype.getDuration=function(n){return n?this.totalFrames:this.totalFrames/this.frameRate},AnimationItem.prototype.trigger=function(n){if(this._cbs&&this._cbs[n])switch(n){case"enterFrame":this.triggerEvent(n,new BMEnterFrameEvent(n,this.currentFrame,this.totalFrames,this.frameModifier));break;case"loopComplete":this.triggerEvent(n,new BMCompleteLoopEvent(n,this.loop,this.playCount,this.frameMult));break;case"complete":this.triggerEvent(n,new BMCompleteEvent(n,this.frameMult));break;case"segmentStart":this.triggerEvent(n,new BMSegmentStartEvent(n,this.firstFrame,this.totalFrames));break;case"destroy":this.triggerEvent(n,new BMDestroyEvent(n,this));break;default:this.triggerEvent(n)}n==="enterFrame"&&this.onEnterFrame&&this.onEnterFrame.call(this,new BMEnterFrameEvent(n,this.currentFrame,this.totalFrames,this.frameMult)),n==="loopComplete"&&this.onLoopComplete&&this.onLoopComplete.call(this,new BMCompleteLoopEvent(n,this.loop,this.playCount,this.frameMult)),n==="complete"&&this.onComplete&&this.onComplete.call(this,new BMCompleteEvent(n,this.frameMult)),n==="segmentStart"&&this.onSegmentStart&&this.onSegmentStart.call(this,new BMSegmentStartEvent(n,this.firstFrame,this.totalFrames)),n==="destroy"&&this.onDestroy&&this.onDestroy.call(this,new BMDestroyEvent(n,this))},AnimationItem.prototype.triggerRenderFrameError=function(n){var e=new BMRenderFrameErrorEvent(n,this.currentFrame);this.triggerEvent("error",e),this.onError&&this.onError.call(this,e)},AnimationItem.prototype.triggerConfigError=function(n){var e=new BMConfigErrorEvent(n,this.currentFrame);this.triggerEvent("error",e),this.onError&&this.onError.call(this,e)};var Expressions=($O={},$O.initExpressions=function(n){var e=0,t=[];n.renderer.compInterface=CompExpressionInterface(n.renderer),n.renderer.globalData.projectInterface.registerComposition(n.renderer),n.renderer.globalData.pushExpression=function(){e+=1},n.renderer.globalData.popExpression=function(){--e==0&&function(){var r,a=t.length;for(r=0;r<a;r+=1)t[r].release();t.length=0}()},n.renderer.globalData.registerExpressionProperty=function(r){t.indexOf(r)===-1&&t.push(r)}},$O),$O,expressionsPlugin=Expressions,ExpressionManager=function(){var ob={},Math=BMMath;BezierFactory.getBezierEasing(.333,0,.833,.833,"easeIn").get,BezierFactory.getBezierEasing(.167,.167,.667,1,"easeOut").get,BezierFactory.getBezierEasing(.33,0,.667,1,"easeInOut").get;function initiateExpression(elem,data,property){var val=data.x,needsVelocity=/velocity(?![\w\d])/.test(val),_needsRandom=val.indexOf("random")!==-1,elemType=elem.data.ty,transform,content,effect,thisProperty=property;thisProperty.valueAtTime=thisProperty.getValueAtTime,Object.defineProperty(thisProperty,"value",{get:function(){return thisProperty.v}}),elem.comp.frameDuration=1/elem.comp.globalData.frameRate,elem.comp.displayStartTime=0,elem.data.ip/elem.comp.globalData.frameRate,elem.data.op/elem.comp.globalData.frameRate,elem.data.sw&&elem.data.sw,elem.data.sh&&elem.data.sh,elem.data.nm;var loopIn,loopOut,fromComp,thisLayer,velocityAtTime,scoped_bm_rt;if(data.xf)for(var i,len=data.xf.length,i=0;i<len;i+=1)eval("(function(){ return "+data.xf[i]+"}())");var expression_function=eval("[function _expression_function(){"+val+";scoped_bm_rt=$bm_rt}]")[0];property.kf&&data.k.length,!this.data||this.data.hd,(function(n,e){for(var t=this.pv.length?this.pv.length:1,r=createTypedArray("float32",t),a=Math.floor(5*time),s=0,o=0;s<a;){for(o=0;o<t;o+=1)r[o]+=-e+2*e*BMMath.random();s+=1}var l=5*time,d=l-Math.floor(l),c=createTypedArray("float32",t);if(1<t){for(o=0;o<t;o+=1)c[o]=this.pv[o]+r[o]+(-e+2*e*BMMath.random())*d;return c}return this.pv+r[0]+(-e+2*e*BMMath.random())*d}).bind(this),thisProperty.loopIn&&(loopIn=thisProperty.loopIn.bind(thisProperty)),thisProperty.loopOut&&(loopOut=thisProperty.loopOut.bind(thisProperty)),thisProperty.smooth&&thisProperty.smooth.bind(thisProperty),this.getValueAtTime&&this.getValueAtTime.bind(this),this.getVelocityAtTime&&(velocityAtTime=this.getVelocityAtTime.bind(this)),elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);var time,value;function seedRandom(n){BMMath.seedrandom(randSeed+n)}elem.data.ind,!elem.hierarchy||elem.hierarchy.length;var parent,randSeed=Math.floor(1e6*Math.random());elem.globalData;function executeExpression(n){return value=n,_needsRandom&&seedRandom(randSeed),this.frameExpressionId===elem.globalData.frameId&&this.propType!=="textSelector"?value:(this.propType==="textSelector"&&(this.textIndex,this.textTotal,this.selectorValue),thisLayer||(elem.layerInterface.text,thisLayer=elem.layerInterface,elem.comp.compInterface,thisLayer.toWorld.bind(thisLayer),thisLayer.fromWorld.bind(thisLayer),fromComp=thisLayer.fromComp.bind(thisLayer),thisLayer.toComp.bind(thisLayer),thisLayer.mask&&thisLayer.mask.bind(thisLayer)),transform||(transform=elem.layerInterface("ADBE Transform Group"),transform&&transform.anchorPoint),elemType!==4||content||(content=thisLayer("ADBE Root Vectors Group")),effect=effect||thisLayer(4),!(!elem.hierarchy||!elem.hierarchy.length)&&!parent&&(parent=elem.hierarchy[0].layerInterface),time=this.comp.renderedFrame/this.comp.globalData.frameRate,needsVelocity&&velocityAtTime(time),expression_function(),this.frameExpressionId=elem.globalData.frameId,scoped_bm_rt.propType,scoped_bm_rt)}return executeExpression}return ob.initiateExpression=initiateExpression,ob}(),expressionHelpers={searchExpressions:function(n,e,t){e.x&&(t.k=!0,t.x=!0,t.initiateExpression=ExpressionManager.initiateExpression,t.effectsSequence.push(t.initiateExpression(n,e,t).bind(t)))},getSpeedAtTime:function(n){var e=this.getValueAtTime(n),t=this.getValueAtTime(n+-.01),r=0;if(e.length){for(var a=0;a<e.length;a+=1)r+=Math.pow(t[a]-e[a],2);r=100*Math.sqrt(r)}else r=0;return r},getVelocityAtTime:function(n){if(this.vel!==void 0)return this.vel;var e=this.getValueAtTime(n),t=this.getValueAtTime(n+-.001);if(e.length)for(var r=createTypedArray("float32",e.length),a=0;a<e.length;a+=1)r[a]=(t[a]-e[a])/-.001;else r=(t-e)/-.001;return r},getValueAtTime:function(n){return n*=this.elem.globalData.frameRate,(n-=this.offsetTime)!==this._cachingAtTime.lastFrame&&(this._cachingAtTime.lastIndex=this._cachingAtTime.lastFrame<n?this._cachingAtTime.lastIndex:0,this._cachingAtTime.value=this.interpolateValue(n,this._cachingAtTime),this._cachingAtTime.lastFrame=n),this._cachingAtTime.value},getStaticValueAtTime:function(){return this.pv},setGroupProperty:function(n){this.propertyGroup=n}};(function(){function n(c,f,_){if(!this.k||!this.keyframes)return this.pv;c=c?c.toLowerCase():"";var m,g,y,x,u,p=this.comp.renderedFrame,M=this.keyframes,S=M[M.length-1].t;if(p<=S)return this.pv;if(_?g=S-(m=f?Math.abs(S-elem.comp.globalData.frameRate*f):Math.max(0,S-this.elem.data.ip)):((!f||f>M.length-1)&&(f=M.length-1),m=S-(g=M[M.length-1-f].t)),c==="pingpong"){if(Math.floor((p-g)/m)%2!=0)return this.getValueAtTime((m-(p-g)%m+g)/this.comp.globalData.frameRate,0)}else{if(c==="offset"){var b=this.getValueAtTime(g/this.comp.globalData.frameRate,0),A=this.getValueAtTime(S/this.comp.globalData.frameRate,0),T=this.getValueAtTime(((p-g)%m+g)/this.comp.globalData.frameRate,0),E=Math.floor((p-g)/m);if(this.pv.length){for(x=(u=new Array(b.length)).length,y=0;y<x;y+=1)u[y]=(A[y]-b[y])*E+T[y];return u}return(A-b)*E+T}if(c==="continue"){var B=this.getValueAtTime(S/this.comp.globalData.frameRate,0),P=this.getValueAtTime((S-.001)/this.comp.globalData.frameRate,0);if(this.pv.length){for(x=(u=new Array(B.length)).length,y=0;y<x;y+=1)u[y]=B[y]+(B[y]-P[y])*((p-S)/this.comp.globalData.frameRate)/5e-4;return u}return B+(p-S)/.001*(B-P)}}return this.getValueAtTime(((p-g)%m+g)/this.comp.globalData.frameRate,0)}function e(c,f,_){if(!this.k)return this.pv;c=c?c.toLowerCase():"";var m,g,y,x,u,p=this.comp.renderedFrame,M=this.keyframes,S=M[0].t;if(S<=p)return this.pv;if(_?g=S+(m=f?Math.abs(elem.comp.globalData.frameRate*f):Math.max(0,this.elem.data.op-S)):((!f||f>M.length-1)&&(f=M.length-1),m=(g=M[f].t)-S),c==="pingpong"){if(Math.floor((S-p)/m)%2==0)return this.getValueAtTime(((S-p)%m+S)/this.comp.globalData.frameRate,0)}else{if(c==="offset"){var b=this.getValueAtTime(S/this.comp.globalData.frameRate,0),A=this.getValueAtTime(g/this.comp.globalData.frameRate,0),T=this.getValueAtTime((m-(S-p)%m+S)/this.comp.globalData.frameRate,0),E=Math.floor((S-p)/m)+1;if(this.pv.length){for(x=(u=new Array(b.length)).length,y=0;y<x;y+=1)u[y]=T[y]-(A[y]-b[y])*E;return u}return T-(A-b)*E}if(c==="continue"){var B=this.getValueAtTime(S/this.comp.globalData.frameRate,0),P=this.getValueAtTime((S+.001)/this.comp.globalData.frameRate,0);if(this.pv.length){for(x=(u=new Array(B.length)).length,y=0;y<x;y+=1)u[y]=B[y]+(B[y]-P[y])*(S-p)/.001;return u}return B+(B-P)*(S-p)/.001}}return this.getValueAtTime((m-(S-p)%m+S)/this.comp.globalData.frameRate,0)}function t(c,f){if(!this.k)return this.pv;if(c=.5*(c||.4),(f=Math.floor(f||5))<=1)return this.pv;for(var _,m=this.comp.renderedFrame/this.comp.globalData.frameRate,g=m-c,y=1<f?(m+c-g)/(f-1):1,x=0,u=0,p=this.pv.length?createTypedArray("float32",this.pv.length):0;x<f;){if(_=this.getValueAtTime(g+x*y),this.pv.length)for(u=0;u<this.pv.length;u+=1)p[u]+=_[u];else p+=_;x+=1}if(this.pv.length)for(u=0;u<this.pv.length;u+=1)p[u]/=f;else p/=f;return p}var r=TransformPropertyFactory.getTransformProperty;TransformPropertyFactory.getTransformProperty=function(c,f,_){var m=r(c,f,_);return m.dynamicProperties.length?m.getValueAtTime=(function(g){console.warn("Transform at time not supported")}).bind(m):m.getValueAtTime=(function(g){}).bind(m),m.setGroupProperty=expressionHelpers.setGroupProperty,m};var a=PropertyFactory.getProp;PropertyFactory.getProp=function(c,f,_,m,g){var y=a(c,f,_,m,g);y.kf?y.getValueAtTime=expressionHelpers.getValueAtTime.bind(y):y.getValueAtTime=expressionHelpers.getStaticValueAtTime.bind(y),y.setGroupProperty=expressionHelpers.setGroupProperty,y.loopOut=n,y.loopIn=e,y.smooth=t,y.getVelocityAtTime=expressionHelpers.getVelocityAtTime.bind(y),y.getSpeedAtTime=expressionHelpers.getSpeedAtTime.bind(y),y.numKeys=f.a===1?f.k.length:0,y.propertyIndex=f.ix;var x=0;return _!==0&&(x=createTypedArray("float32",f.a===1?f.k[0].s.length:f.k.length)),y._cachingAtTime={lastFrame:initialDefaultFrame,lastIndex:0,value:x},expressionHelpers.searchExpressions(c,f,y),y.k&&g.addDynamicProperty(y),y};var s=ShapePropertyFactory.getConstructorFunction(),o=ShapePropertyFactory.getKeyframedConstructorFunction();function l(){}l.prototype={vertices:function(c,f){this.k&&this.getValue();var _=this.v;f!==void 0&&(_=this.getValueAtTime(f,0));for(var m=_._length,g=_[c],y=_.v,x=createSizedArray(m),u=0;u<m;u+=1)x[u]=c==="i"||c==="o"?[g[u][0]-y[u][0],g[u][1]-y[u][1]]:[g[u][0],g[u][1]];return x},points:function(c){return this.vertices("v",c)},inTangents:function(c){return this.vertices("i",c)},outTangents:function(c){return this.vertices("o",c)},isClosed:function(){return this.v.c},pointOnPath:function(c,f){var _=this.v;f!==void 0&&(_=this.getValueAtTime(f,0)),this._segmentsLength||(this._segmentsLength=bez.getSegmentsLength(_));for(var m=this._segmentsLength,g=m.lengths,y=m.totalLength*c,x=0,u=g.length,p=0;x<u;){if(p+g[x].addedLength>y){var M=_.c&&x===u-1?0:x+1,S=(y-p)/g[x].addedLength,b=bez.getPointInSegment(_.v[x],_.v[M],_.o[x],_.i[M],S,g[x]);break}p+=g[x].addedLength,x+=1}return b=b||(_.c?[_.v[0][0],_.v[0][1]]:[_.v[_._length-1][0],_.v[_._length-1][1]])},vectorOnPath:function(c,f,_){c=c==1?this.v.c?0:.999:c;var m=this.pointOnPath(c,f),g=this.pointOnPath(c+.001,f),y=g[0]-m[0],x=g[1]-m[1],u=Math.sqrt(Math.pow(y,2)+Math.pow(x,2));return u===0?[0,0]:_==="tangent"?[y/u,x/u]:[-x/u,y/u]},tangentOnPath:function(c,f){return this.vectorOnPath(c,f,"tangent")},normalOnPath:function(c,f){return this.vectorOnPath(c,f,"normal")},setGroupProperty:expressionHelpers.setGroupProperty,getValueAtTime:expressionHelpers.getStaticValueAtTime},extendPrototype([l],s),extendPrototype([l],o),o.prototype.getValueAtTime=function(c){return this._cachingAtTime||(this._cachingAtTime={shapeValue:shape_pool.clone(this.pv),lastIndex:0,lastTime:initialDefaultFrame}),c*=this.elem.globalData.frameRate,(c-=this.offsetTime)!==this._cachingAtTime.lastTime&&(this._cachingAtTime.lastIndex=this._cachingAtTime.lastTime<c?this._caching.lastIndex:0,this._cachingAtTime.lastTime=c,this.interpolateShape(c,this._cachingAtTime.shapeValue,this._cachingAtTime)),this._cachingAtTime.shapeValue},o.prototype.initiateExpression=ExpressionManager.initiateExpression;var d=ShapePropertyFactory.getShapeProp;ShapePropertyFactory.getShapeProp=function(c,f,_,m,g){var y=d(c,f,_,m,g);return y.propertyIndex=f.ix,y.lock=!1,_===3?expressionHelpers.searchExpressions(c,f.pt,y):_===4&&expressionHelpers.searchExpressions(c,f.ks,y),y.k&&c.addDynamicProperty(y),y}})(),TextProperty.prototype.getExpressionValue=function(n,e){var t=this.calculateExpression(e);if(n.t===t)return n;var r={};return this.copyData(r,n),r.t=t.toString(),r.__complete=!1,r},TextProperty.prototype.searchProperty=function(){var n=this.searchKeyframes(),e=this.searchExpressions();return this.kf=n||e,this.kf},TextProperty.prototype.searchExpressions=function(){if(this.data.d.x)return this.calculateExpression=ExpressionManager.initiateExpression.bind(this)(this.elem,this.data.d,this),this.addEffect(this.getExpressionValue.bind(this)),!0};var ShapeExpressionInterface=function(n,e,t){var r;function a(s){if(typeof s=="number")return r[s-1];for(var o=0,l=r.length;o<l;){if(r[o]._name===s)return r[o];o+=1}}return a.propertyGroup=t,r=fV(n,e,a),a.numProperties=r.length,a};function fV(n,e,t){for(var r,a,s,o=[],l=n?n.length:0,d=0;d<l;d+=1)n[d].ty=="gr"?o.push(function(f,_,m){var g=function(u){switch(u){case"ADBE Vectors Group":case"Contents":case 2:return g.content;default:return g.transform}};g.propertyGroup=function(u){return u===1?g:m(u-1)};var y=function(u,p,M){function S(A){for(var T=0,E=b.length;T<E;){if(b[T]._name===A||b[T].mn===A||b[T].propertyIndex===A||b[T].ix===A||b[T].ind===A)return b[T];T+=1}if(typeof A=="number")return b[A-1]}var b;return S.propertyGroup=function(A){return A===1?S:M(A-1)},b=fV(u.it,p.it,S.propertyGroup),S.numProperties=b.length,S.propertyIndex=u.cix,S._name=u.nm,S}(f,_,g.propertyGroup),x=function(u,p,M){function S(A){return A==1?b:M(--A)}p.transform.mProps.o.setGroupProperty(S),p.transform.mProps.p.setGroupProperty(S),p.transform.mProps.a.setGroupProperty(S),p.transform.mProps.s.setGroupProperty(S),p.transform.mProps.r.setGroupProperty(S),p.transform.mProps.sk&&(p.transform.mProps.sk.setGroupProperty(S),p.transform.mProps.sa.setGroupProperty(S));function b(A){return u.a.ix===A||A==="Anchor Point"?b.anchorPoint:u.o.ix===A||A==="Opacity"?b.opacity:u.p.ix===A||A==="Position"?b.position:u.r.ix===A||A==="Rotation"||A==="ADBE Vector Rotation"?b.rotation:u.s.ix===A||A==="Scale"?b.scale:u.sk&&u.sk.ix===A||A==="Skew"?b.skew:u.sa&&u.sa.ix===A||A==="Skew Axis"?b.skewAxis:void 0}return p.transform.op.setGroupProperty(S),Object.defineProperties(b,{opacity:{get:ExpressionPropertyInterface(p.transform.mProps.o)},position:{get:ExpressionPropertyInterface(p.transform.mProps.p)},anchorPoint:{get:ExpressionPropertyInterface(p.transform.mProps.a)},scale:{get:ExpressionPropertyInterface(p.transform.mProps.s)},rotation:{get:ExpressionPropertyInterface(p.transform.mProps.r)},skew:{get:ExpressionPropertyInterface(p.transform.mProps.sk)},skewAxis:{get:ExpressionPropertyInterface(p.transform.mProps.sa)},_name:{value:u.nm}}),b.ty="tr",b.mn=u.mn,b.propertyGroup=M,b}(f.it[f.it.length-1],_.it[_.it.length-1],g.propertyGroup);return g.content=y,g.transform=x,Object.defineProperty(g,"_name",{get:function(){return f.nm}}),g.numProperties=f.np,g.propertyIndex=f.ix,g.nm=f.nm,g.mn=f.mn,g}(n[d],e[d],t)):n[d].ty=="fl"?o.push((r=n[d],a=e[d],s=t,Object.defineProperties(c,{color:{get:ExpressionPropertyInterface(a.c)},opacity:{get:ExpressionPropertyInterface(a.o)},_name:{value:r.nm},mn:{value:r.mn}}),a.c.setGroupProperty(s),a.o.setGroupProperty(s),c)):n[d].ty=="st"?o.push(function(f,_,m){function g(S){return S===1?ob:m(S-1)}function y(S){return S===1?p:g(S-1)}var x,u=f.d?f.d.length:0,p={};for(x=0;x<u;x+=1)(function(S){Object.defineProperty(p,f.d[S].nm,{get:ExpressionPropertyInterface(_.d.dataProps[S].p)})})(x),_.d.dataProps[x].p.setGroupProperty(y);function M(S){return S==="Color"||S==="color"?M.color:S==="Opacity"||S==="opacity"?M.opacity:S==="Stroke Width"||S==="stroke width"?M.strokeWidth:void 0}return Object.defineProperties(M,{color:{get:ExpressionPropertyInterface(_.c)},opacity:{get:ExpressionPropertyInterface(_.o)},strokeWidth:{get:ExpressionPropertyInterface(_.w)},dash:{get:function(){return p}},_name:{value:f.nm},mn:{value:f.mn}}),_.c.setGroupProperty(g),_.o.setGroupProperty(g),_.w.setGroupProperty(g),M}(n[d],e[d],t)):n[d].ty=="tm"?o.push(function(f,_,m){function g(x){return x==1?y:m(--x)}function y(x){return x===f.e.ix||x==="End"||x==="end"?y.end:x===f.s.ix?y.start:x===f.o.ix?y.offset:void 0}return y.propertyIndex=f.ix,_.s.setGroupProperty(g),_.e.setGroupProperty(g),_.o.setGroupProperty(g),y.propertyIndex=f.ix,y.propertyGroup=m,Object.defineProperties(y,{start:{get:ExpressionPropertyInterface(_.s)},end:{get:ExpressionPropertyInterface(_.e)},offset:{get:ExpressionPropertyInterface(_.o)},_name:{value:f.nm}}),y.mn=f.mn,y}(n[d],e[d],t)):n[d].ty=="tr"||(n[d].ty=="el"?o.push(function(f,_,m){function g(u){return u==1?x:m(--u)}x.propertyIndex=f.ix;var y=_.sh.ty==="tm"?_.sh.prop:_.sh;function x(u){return f.p.ix===u?x.position:f.s.ix===u?x.size:void 0}return y.s.setGroupProperty(g),y.p.setGroupProperty(g),Object.defineProperties(x,{size:{get:ExpressionPropertyInterface(y.s)},position:{get:ExpressionPropertyInterface(y.p)},_name:{value:f.nm}}),x.mn=f.mn,x}(n[d],e[d],t)):n[d].ty=="sr"?o.push(function(f,_,m){function g(u){return u==1?x:m(--u)}var y=_.sh.ty==="tm"?_.sh.prop:_.sh;x.propertyIndex=f.ix,y.or.setGroupProperty(g),y.os.setGroupProperty(g),y.pt.setGroupProperty(g),y.p.setGroupProperty(g),y.r.setGroupProperty(g),f.ir&&(y.ir.setGroupProperty(g),y.is.setGroupProperty(g));function x(u){return f.p.ix===u?x.position:f.r.ix===u?x.rotation:f.pt.ix===u?x.points:f.or.ix===u||u==="ADBE Vector Star Outer Radius"?x.outerRadius:f.os.ix===u?x.outerRoundness:!f.ir||f.ir.ix!==u&&u!=="ADBE Vector Star Inner Radius"?f.is&&f.is.ix===u?x.innerRoundness:void 0:x.innerRadius}return Object.defineProperties(x,{position:{get:ExpressionPropertyInterface(y.p)},rotation:{get:ExpressionPropertyInterface(y.r)},points:{get:ExpressionPropertyInterface(y.pt)},outerRadius:{get:ExpressionPropertyInterface(y.or)},outerRoundness:{get:ExpressionPropertyInterface(y.os)},innerRadius:{get:ExpressionPropertyInterface(y.ir)},innerRoundness:{get:ExpressionPropertyInterface(y.is)},_name:{value:f.nm}}),x.mn=f.mn,x}(n[d],e[d],t)):n[d].ty=="sh"?o.push(function(f,_,m){var g=_.sh;function y(x){if(x==="Shape"||x==="shape"||x==="Path"||x==="path"||x==="ADBE Vector Shape"||x===2)return y.path}return g.setGroupProperty(function(x){return x==1?y:m(--x)}),Object.defineProperties(y,{path:{get:function(){return g.k&&g.getValue(),g}},shape:{get:function(){return g.k&&g.getValue(),g}},_name:{value:f.nm},ix:{value:f.ix},propertyIndex:{value:f.ix},mn:{value:f.mn}}),y}(n[d],e[d],t)):n[d].ty=="rc"?o.push(function(f,_,m){function g(u){return u==1?x:m(--u)}var y=_.sh.ty==="tm"?_.sh.prop:_.sh;function x(u){return f.p.ix===u?x.position:f.r.ix===u?x.roundness:f.s.ix===u||u==="Size"||u==="ADBE Vector Rect Size"?x.size:void 0}return x.propertyIndex=f.ix,y.p.setGroupProperty(g),y.s.setGroupProperty(g),y.r.setGroupProperty(g),Object.defineProperties(x,{position:{get:ExpressionPropertyInterface(y.p)},roundness:{get:ExpressionPropertyInterface(y.r)},size:{get:ExpressionPropertyInterface(y.s)},_name:{value:f.nm}}),x.mn=f.mn,x}(n[d],e[d],t)):n[d].ty=="rd"?o.push(function(f,_,m){var g=_;function y(x){if(f.r.ix===x||x==="Round Corners 1")return y.radius}return y.propertyIndex=f.ix,g.rd.setGroupProperty(function(x){return x==1?y:m(--x)}),Object.defineProperties(y,{radius:{get:ExpressionPropertyInterface(g.rd)},_name:{value:f.nm}}),y.mn=f.mn,y}(n[d],e[d],t)):n[d].ty=="rp"&&o.push(function(f,_,m){function g(u){return u==1?x:m(--u)}var y=_;function x(u){return f.c.ix===u||u==="Copies"?x.copies:f.o.ix===u||u==="Offset"?x.offset:void 0}return x.propertyIndex=f.ix,y.c.setGroupProperty(g),y.o.setGroupProperty(g),Object.defineProperties(x,{copies:{get:ExpressionPropertyInterface(y.c)},offset:{get:ExpressionPropertyInterface(y.o)},_name:{value:f.nm}}),x.mn=f.mn,x}(n[d],e[d],t)));function c(f){return f==="Color"||f==="color"?c.color:f==="Opacity"||f==="opacity"?c.opacity:void 0}return o}var TextExpressionInterface=function(n){var e;function t(){}return Object.defineProperty(t,"sourceText",{get:function(){n.textProperty.getValue();var r=n.textProperty.currentData.t;return r!==void 0&&(n.textProperty.currentData.t=void 0,(e=new String(r)).value=r||new String(r)),e}}),t},LayerExpressionInterface=function(n){var e;function t(a){switch(a){case"ADBE Root Vectors Group":case"Contents":case 2:return t.shapeInterface;case 1:case 6:case"Transform":case"transform":case"ADBE Transform Group":return e;case 4:case"ADBE Effect Parade":case"effects":case"Effects":return t.effect}}t.toWorld=DX,t.fromWorld=EX,t.toComp=DX,t.fromComp=FX,t.sampleImage=GX,t.sourceRectAtTime=n.sourceRectAtTime.bind(n);var r=getDescriptor(e=TransformExpressionInterface((t._elem=n).finalTransform.mProp),"anchorPoint");return Object.defineProperties(t,{hasParent:{get:function(){return n.hierarchy.length}},parent:{get:function(){return n.hierarchy[0].layerInterface}},rotation:getDescriptor(e,"rotation"),scale:getDescriptor(e,"scale"),position:getDescriptor(e,"position"),opacity:getDescriptor(e,"opacity"),anchorPoint:r,anchor_point:r,transform:{get:function(){return e}},active:{get:function(){return n.isInRange}}}),t.startTime=n.data.st,t.index=n.data.ind,t.source=n.data.refId,t.height=n.data.ty===0?n.data.h:100,t.width=n.data.ty===0?n.data.w:100,t.inPoint=n.data.ip/n.comp.globalData.frameRate,t.outPoint=n.data.op/n.comp.globalData.frameRate,t._name=n.data.nm,t.registerMaskInterface=function(a){t.mask=new MaskManagerInterface(a,n)},t.registerEffectsInterface=function(a){t.effect=a},t};function DX(n,e){var t=new Matrix;if(t.reset(),this._elem.finalTransform.mProp.applyToMatrix(t),this._elem.hierarchy&&this._elem.hierarchy.length){for(var r=this._elem.hierarchy.length,a=0;a<r;a+=1)this._elem.hierarchy[a].finalTransform.mProp.applyToMatrix(t);return t.applyToPointArray(n[0],n[1],n[2]||0)}return t.applyToPointArray(n[0],n[1],n[2]||0)}function EX(n,e){var t=new Matrix;if(t.reset(),this._elem.finalTransform.mProp.applyToMatrix(t),this._elem.hierarchy&&this._elem.hierarchy.length){for(var r=this._elem.hierarchy.length,a=0;a<r;a+=1)this._elem.hierarchy[a].finalTransform.mProp.applyToMatrix(t);return t.inversePoint(n)}return t.inversePoint(n)}function FX(n){var e=new Matrix;if(e.reset(),this._elem.finalTransform.mProp.applyToMatrix(e),this._elem.hierarchy&&this._elem.hierarchy.length){for(var t=this._elem.hierarchy.length,r=0;r<t;r+=1)this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);return e.inversePoint(n)}return e.inversePoint(n)}function GX(){return[1,1,1,1]}var CompExpressionInterface=function(n){function e(t){for(var r=0,a=n.layers.length;r<a;){if(n.layers[r].nm===t||n.layers[r].ind===t)return n.elements[r].layerInterface;r+=1}return null}return Object.defineProperty(e,"_name",{value:n.data.nm}),(e.layer=e).pixelAspect=1,e.height=n.data.h||n.globalData.compSize.h,e.width=n.data.w||n.globalData.compSize.w,e.pixelAspect=1,e.frameDuration=1/n.globalData.frameRate,e.displayStartTime=0,e.numLayers=n.layers.length,e},TransformExpressionInterface=function(n){function e(r){switch(r){case"scale":case"Scale":case"ADBE Scale":case 6:return e.scale;case"rotation":case"Rotation":case"ADBE Rotation":case"ADBE Rotate Z":case 10:return e.rotation;case"ADBE Rotate X":return e.xRotation;case"ADBE Rotate Y":return e.yRotation;case"position":case"Position":case"ADBE Position":case 2:return e.position;case"ADBE Position_0":return e.xPosition;case"ADBE Position_1":return e.yPosition;case"ADBE Position_2":return e.zPosition;case"anchorPoint":case"AnchorPoint":case"Anchor Point":case"ADBE AnchorPoint":case 1:return e.anchorPoint;case"opacity":case"Opacity":case 11:return e.opacity}}var t;return Object.defineProperty(e,"rotation",{get:ExpressionPropertyInterface(n.r||n.rz)}),Object.defineProperty(e,"zRotation",{get:ExpressionPropertyInterface(n.rz||n.r)}),Object.defineProperty(e,"xRotation",{get:ExpressionPropertyInterface(n.rx)}),Object.defineProperty(e,"yRotation",{get:ExpressionPropertyInterface(n.ry)}),Object.defineProperty(e,"scale",{get:ExpressionPropertyInterface(n.s)}),n.p&&(t=ExpressionPropertyInterface(n.p)),Object.defineProperty(e,"position",{get:function(){return n.p?t():[n.px.v,n.py.v,n.pz?n.pz.v:0]}}),Object.defineProperty(e,"xPosition",{get:ExpressionPropertyInterface(n.px)}),Object.defineProperty(e,"yPosition",{get:ExpressionPropertyInterface(n.py)}),Object.defineProperty(e,"zPosition",{get:ExpressionPropertyInterface(n.pz)}),Object.defineProperty(e,"anchorPoint",{get:ExpressionPropertyInterface(n.a)}),Object.defineProperty(e,"opacity",{get:ExpressionPropertyInterface(n.o)}),Object.defineProperty(e,"skew",{get:ExpressionPropertyInterface(n.sk)}),Object.defineProperty(e,"skewAxis",{get:ExpressionPropertyInterface(n.sa)}),Object.defineProperty(e,"orientation",{get:ExpressionPropertyInterface(n.or)}),e},ProjectInterface=function(){function n(e){for(var t=0,r=this.compositions.length;t<r;){if(this.compositions[t].data&&this.compositions[t].data.nm===e)return this.compositions[t].prepareFrame&&this.compositions[t].data.xt&&this.compositions[t].prepareFrame(this.currentFrame),this.compositions[t].compInterface;t+=1}}return n.compositions=[],n.currentFrame=0,n.registerComposition=nY,n};function nY(n){this.compositions.push(n)}var EffectsExpressionInterface={createEffectsInterface:function(n,e){if(n.effectsManager){var t,r=[],a=n.data.ef,s=n.effectsManager.effectElements.length;for(t=0;t<s;t+=1)r.push(function o(l,d,c,f){var _,m=[],g=l.ef.length;for(_=0;_<g;_+=1)l.ef[_].ty===5?m.push(o(l.ef[_],d.effectElements[_],d.effectElements[_].propertyGroup,f)):m.push(wY(d.effectElements[_],l.ef[_].ty,f,y));function y(u){return u===1?x:c(u-1)}var x=function(u){for(var p=l.ef,M=0,S=p.length;M<S;){if(u===p[M].nm||u===p[M].mn||u===p[M].ix)return p[M].ty===5?m[M]:m[M]();M+=1}return m[0]()};return x.propertyGroup=y,l.mn==="ADBE Color Control"&&Object.defineProperty(x,"color",{get:function(){return m[0]()}}),Object.defineProperty(x,"numProperties",{get:function(){return l.np}}),x.active=x.enabled=l.en!==0,x}(a[t],n.effectsManager.effectElements[t],e,n));return function(o){for(var l=n.data.ef||[],d=0,c=l.length;d<c;){if(o===l[d].nm||o===l[d].mn||o===l[d].ix)return r[d];d+=1}}}}};function wY(n,e,t,r){var a=ExpressionPropertyInterface(n.p);return n.p.setGroupProperty&&n.p.setGroupProperty(r),function(){return e===10?t.comp.compInterface(n.p.v):a()}}var MaskManagerInterface=function(){function n(e,t){this._mask=e,this._data=t}return Object.defineProperty(n.prototype,"maskPath",{get:function(){return this._mask.prop.k&&this._mask.prop.getValue(),this._mask.prop}}),Object.defineProperty(n.prototype,"maskOpacity",{get:function(){return this._mask.op.k&&this._mask.op.getValue(),100*this._mask.op.v}}),function(e,t){for(var r=createSizedArray(e.viewData.length),a=e.viewData.length,s=0;s<a;s+=1)r[s]=new n(e.viewData[s],e.masksProperties[s]);return function(o){for(s=0;s<a;){if(e.masksProperties[s].nm===o)return r[s];s+=1}}}}(),ExpressionPropertyInterface=(mZ={pv:0,v:0,mult:1},nZ={pv:[0,0,0],v:[0,0,0],mult:1},function(n){return n?(n.propType==="unidimensional"?function(e){e&&"pv"in e||(e=mZ);var t=1/e.mult,r=e.pv*t,a=new Number(r);return a.value=r,oZ(a,e,"unidimensional"),function(){return e.k&&e.getValue(),r=e.v*t,a.value!==r&&((a=new Number(r)).value=r,oZ(a,e,"unidimensional")),a}}:function(e){e&&"pv"in e||(e=nZ);var t=1/e.mult,r=e.pv.length,a=createTypedArray("float32",r),s=createTypedArray("float32",r);return a.value=s,oZ(a,e,"multidimensional"),function(){e.k&&e.getValue();for(var o=0;o<r;o+=1)a[o]=s[o]=e.v[o]*t;return a}})(n):rZ}),mZ,nZ,JZ,KZ;function oZ(n,e,t){Object.defineProperty(n,"velocity",{get:function(){return e.getVelocityAtTime(e.comp.currentFrame)}}),n.numKeys=e.keyframes?e.keyframes.length:0,n.key=function(r){if(n.numKeys){var a="",a="s"in e.keyframes[r-1]?e.keyframes[r-1].s:"e"in e.keyframes[r-2]?e.keyframes[r-2].e:e.keyframes[r-2].s,s=t==="unidimensional"?new Number(a):Object.assign({},a);return s.time=e.keyframes[r-1].t/e.elem.comp.globalData.frameRate,s}return 0},n.valueAtTime=e.getValueAtTime,n.speedAtTime=e.getSpeedAtTime,n.velocityAtTime=e.getVelocityAtTime,n.propertyGroup=e.propertyGroup}function rZ(){return mZ}function LZ(n,e){return this.textIndex=n+1,this.textTotal=e,this.v=this.getValue()*this.mult,this.v}function SliderEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,0,0,t)}function AngleEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,0,0,t)}function ColorEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,1,0,t)}function PointEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,1,0,t)}function LayerIndexEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,0,0,t)}function MaskIndexEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,0,0,t)}function CheckboxEffect(n,e,t){this.p=PropertyFactory.getProp(e,n.v,0,0,t)}function NoValueEffect(){this.p={}}function EffectsManager(n,e){var t=n.ef||[];this.effectElements=[];for(var r,a=t.length,s=0;s<a;s++)r=new GroupEffect(t[s],e),this.effectElements.push(r)}function GroupEffect(n,e){this.init(n,e)}JZ=function(n,e){this.pv=1,this.comp=n.comp,this.elem=n,this.mult=.01,this.propType="textSelector",this.textTotal=e.totalChars,this.selectorValue=100,this.lastValue=[1,1,1],this.k=!0,this.x=!0,this.getValue=ExpressionManager.initiateExpression.bind(this)(n,e,this),this.getMult=LZ,this.getVelocityAtTime=expressionHelpers.getVelocityAtTime,this.kf?this.getValueAtTime=expressionHelpers.getValueAtTime.bind(this):this.getValueAtTime=expressionHelpers.getStaticValueAtTime.bind(this),this.setGroupProperty=expressionHelpers.setGroupProperty},KZ=TextSelectorProp.getTextSelectorProp,TextSelectorProp.getTextSelectorProp=function(n,e,t){return e.t===1?new JZ(n,e,t):KZ(n,e,t)},extendPrototype([DynamicPropertyContainer],GroupEffect),GroupEffect.prototype.getValue=GroupEffect.prototype.iterateDynamicProperties,GroupEffect.prototype.init=function(n,e){this.data=n,this.effectElements=[],this.initDynamicPropertyContainer(e);for(var t,r=this.data.ef.length,a=this.data.ef,s=0;s<r;s+=1){switch(t=null,a[s].ty){case 0:t=new SliderEffect(a[s],e,this);break;case 1:t=new AngleEffect(a[s],e,this);break;case 2:t=new ColorEffect(a[s],e,this);break;case 3:t=new PointEffect(a[s],e,this);break;case 4:case 7:t=new CheckboxEffect(a[s],e,this);break;case 10:t=new LayerIndexEffect(a[s],e,this);break;case 11:t=new MaskIndexEffect(a[s],e,this);break;case 5:t=new EffectsManager(a[s],e,this);break;default:t=new NoValueEffect(a[s])}t&&this.effectElements.push(t)}};var lottie={};function setLocationHref(n){locationHref=n}function searchAnimations(){animationManager.searchAnimations()}function setSubframeRendering(n){subframeEnabled=n}function loadAnimation(n){return animationManager.loadAnimation(n)}function setQuality(n){if(typeof n=="string")switch(n){case"high":defaultCurveSegments=200;break;case"medium":defaultCurveSegments=50;break;case"low":defaultCurveSegments=10}else!isNaN(n)&&1<n&&(defaultCurveSegments=n)}function inBrowser(){return typeof navigator<"u"}function installPlugin(n,e){n==="expressions"&&(expressionsPlugin=e)}function getFactory(n){switch(n){case"propertyFactory":return PropertyFactory;case"shapePropertyFactory":return ShapePropertyFactory;case"matrix":return Matrix}}function checkReady(){document.readyState==="complete"&&(clearInterval(readyStateCheckInterval),searchAnimations())}function getQueryVariable(n){for(var e=queryString.split("&"),t=0;t<e.length;t++){var r=e[t].split("=");if(decodeURIComponent(r[0])==n)return decodeURIComponent(r[1])}}lottie.play=animationManager.play,lottie.pause=animationManager.pause,lottie.setLocationHref=setLocationHref,lottie.togglePause=animationManager.togglePause,lottie.setSpeed=animationManager.setSpeed,lottie.setDirection=animationManager.setDirection,lottie.stop=animationManager.stop,lottie.searchAnimations=searchAnimations,lottie.registerAnimation=animationManager.registerAnimation,lottie.loadAnimation=loadAnimation,lottie.setSubframeRendering=setSubframeRendering,lottie.resize=animationManager.resize,lottie.goToAndStop=animationManager.goToAndStop,lottie.destroy=animationManager.destroy,lottie.setQuality=setQuality,lottie.inBrowser=inBrowser,lottie.installPlugin=installPlugin,lottie.freeze=animationManager.freeze,lottie.unfreeze=animationManager.unfreeze,lottie.getRegisteredAnimations=animationManager.getRegisteredAnimations,lottie.__getFactory=getFactory,lottie.version="5.6.10";var scripts,index,myScript,queryString;scripts=document.getElementsByTagName("script"),index=scripts.length-1,myScript=scripts[index]||{src:""},queryString=myScript.src.replace(/^[^\?]+\??/,""),getQueryVariable("renderer");var readyStateCheckInterval=setInterval(checkReady,100);return lottie})})(lottie_svg_min);var lottie_svg_minExports=lottie_svg_min.exports;const lottie=getDefaultExportFromCjs(lottie_svg_minExports),v="5.9.0",fr=60,ip=0,op=44,w=195,h=38,nm="pen roll 2",ddd=0,assets=[],layers=[{ddd:0,ind:1,ty:4,nm:"9 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1}],ip:24,op:44,st:24,bm:0},{ddd:0,ind:2,ty:4,nm:"8 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,1.415],[0,0],[1.416,0],[0,0],[0,-1.415],[0,0],[-1.416,0],[0,0]],o:[[0,0],[0,-1.415],[0,0],[-1.416,0],[0,0],[0,1.415],[0,0],[1.416,0]],v:[[71.893,.025],[71.893,-.025],[69.329,-2.587],[-69.329,-2.587],[-71.893,-.025],[-71.893,.025],[-69.329,2.587],[69.329,2.587]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[105.847,22.438],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,10.651],[17.298,20.533]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,.396],[0,0],[-1.088,0],[0,0],[0,-5.821],[5.822,0],[0,0],[.955,.361],[0,0]],o:[[0,0],[1.008,-.408],[0,0],[5.822,0],[0,5.822],[0,0],[-1.021,0],[0,0],[-.986,-.372]],v:[[-89.543,-1.031],[-66.856,-9.924],[-63.682,-10.542],[79.979,-10.542],[90.521,-.001],[79.979,10.542],[-63.597,10.542],[-66.586,9.995],[-89.518,1.126]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.542],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:21,op:24,st:21,bm:0},{ddd:0,ind:3,ty:4,nm:"7 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,1.934],[0,0],[1.935,0],[0,0],[0,-1.934],[-1.934,0],[0,0]],o:[[0,0],[0,-1.934],[0,0],[-1.934,0],[0,1.934],[0,0],[1.935,0]],v:[[72.655,0],[72.655,0],[69.152,-3.503],[-69.153,-3.503],[-72.655,0],[-69.153,3.503],[69.152,3.503]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[106.609,21.344],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,10.685],[17.298,20.567]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,.396],[0,0],[-1.088,0],[0,0],[0,-5.822],[5.822,0],[0,0],[.955,.36],[0,0]],o:[[0,0],[1.008,-.408],[0,0],[5.822,0],[0,5.822],[0,0],[-1.021,0],[0,0],[-.986,-.372]],v:[[-89.543,-1.038],[-66.856,-9.923],[-63.682,-10.541],[79.979,-10.541],[90.521,0],[79.979,10.541],[-63.597,10.541],[-66.586,9.996],[-89.518,1.12]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:18,op:21,st:18,bm:0},{ddd:0,ind:4,ty:4,nm:"6 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,2.368],[0,0],[2.368,0],[0,0],[0,-2.368],[-2.369,0],[0,0]],o:[[0,0],[0,-2.368],[0,0],[-2.369,0],[0,2.368],[0,0],[2.368,0]],v:[[72.98,.001],[72.98,.001],[68.692,-4.288],[-68.691,-4.288],[-72.98,.001],[-68.691,4.288],[68.692,4.288]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[106.915,19.861],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.272,10.617],[17.272,20.499]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,.396],[0,0],[-1.088,0],[0,0],[0,-5.822],[5.822,0],[0,0],[.955,.36],[0,0]],o:[[0,0],[1.009,-.408],[0,0],[5.822,0],[0,5.822],[0,0],[-1.021,0],[0,0],[-.986,-.372]],v:[[-89.533,-1.027],[-66.865,-9.924],[-63.691,-10.541],[79.971,-10.541],[90.512,0],[79.971,10.541],[-63.607,10.541],[-66.594,9.996],[-89.508,1.131]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.511,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:15,op:18,st:15,bm:0},{ddd:0,ind:5,ty:4,nm:"5 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,-2.846],[0,0],[2.846,0],[0,0],[0,2.846],[-2.846,0],[0,0]],o:[[0,0],[0,2.846],[0,0],[-2.846,0],[0,-2.846],[0,0],[2.846,0]],v:[[73.266,0],[73.266,0],[68.113,5.153],[-68.113,5.153],[-73.266,0],[-68.113,-5.153],[68.113,-5.153]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[107.22,15.597],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:12,op:15,st:12,bm:0},{ddd:0,ind:6,ty:4,nm:"4 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,-2.368],[0,0],[2.368,0],[0,0],[0,2.368],[-2.369,0],[0,0]],o:[[0,0],[0,2.368],[0,0],[-2.369,0],[0,-2.368],[0,0],[2.368,0]],v:[[72.98,0],[72.98,0],[68.692,4.288],[-68.691,4.288],[-72.98,0],[-68.691,-4.288],[68.692,-4.288]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[106.934,11.221],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:9,op:12,st:9,bm:0},{ddd:0,ind:7,ty:4,nm:"3 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,-1.934],[0,0],[1.935,0],[0,0],[0,1.934],[-1.934,0],[0,0]],o:[[0,0],[0,1.934],[0,0],[-1.934,0],[0,-1.934],[0,0],[1.935,0]],v:[[72.655,0],[72.655,0],[69.152,3.503],[-69.153,3.503],[-72.655,0],[-69.153,-3.503],[69.152,-3.503]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[106.609,9.738],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:6,op:9,st:6,bm:0},{ddd:0,ind:8,ty:4,nm:"2 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,-1.415],[0,0],[1.416,0],[0,0],[0,1.415],[0,0],[-1.416,0],[0,0]],o:[[0,0],[0,1.415],[0,0],[-1.416,0],[0,0],[0,-1.415],[0,0],[1.416,0]],v:[[71.893,-.025],[71.893,.025],[69.329,2.587],[-69.329,2.587],[-71.893,.025],[-71.893,-.025],[-69.329,-2.587],[69.329,-2.587]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[105.847,8.645],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:3,op:6,st:3,bm:0},{ddd:0,ind:9,ty:4,nm:"1 윤곽선",sr:1,ks:{p:{a:0,k:[97.373,18.945,0],ix:2,l:2},a:{a:0,k:[95.521,15.541,0],ix:1,l:2}},ao:0,shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,-1.035],[0,0],[1.036,0],[0,0],[0,1.035],[-1.035,0],[0,0]],o:[[0,0],[0,1.035],[0,0],[-1.035,0],[0,-1.035],[0,0],[1.036,0]],v:[[71.39,0],[71.39,0],[69.515,1.875],[-69.515,1.875],[-71.39,0],[-69.515,-1.875],[69.515,-1.875]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"fl",c:{a:0,k:[.772549079446,.768627510819,.823529471603,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[105.342,7.932],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 1",np:2,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[0,0],[0,0]],o:[[0,0],[0,0]],v:[[17.298,20.482],[17.298,10.6]],c:!1},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 2",np:3,cix:2,bm:0,ix:2,mn:"ADBE Vector Group",hd:!1},{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-.978,-.396],[0,0],[-1.088,0],[0,0],[0,5.822],[5.822,0],[0,0],[.955,-.36],[0,0]],o:[[0,0],[1.008,.408],[0,0],[5.822,0],[0,-5.822],[0,0],[-1.021,0],[0,0],[-.986,.372]],v:[[-89.543,1.123],[-66.856,9.923],[-63.682,10.541],[79.979,10.541],[90.521,0],[79.979,-10.541],[-63.597,-10.541],[-66.586,-9.996],[-89.518,-1.035]],c:!0},ix:2},nm:"패스 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.270588235294,.278431372549,.321568627451,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:2,ix:5},lc:2,lj:1,ml:10,bm:0,nm:"선 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"fl",c:{a:0,k:[1,1,1,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"칠 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[95.521,15.541],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"변형"}],nm:"그룹 3",np:3,cix:2,bm:0,ix:3,mn:"ADBE Vector Group",hd:!1}],ip:0,op:3,st:0,bm:0}],markers=[],penRollAnimation={v,fr,ip,op,w,h,nm,ddd,assets,layers,markers},_sfc_main$g=defineComponent({__name:"PenRoll",setup(n){const e=useTemplateRef("animContainer");return onMounted(()=>{lottie.loadAnimation({container:e.value,animationData:penRollAnimation,loop:!0})}),(t,r)=>(openBlock(),createElementBlock("div",{ref_key:"animContainer",ref:e,class:"w-[90px]"},null,512))}}),_hoisted_1$G={class:"absolute inset-0 flex items-center justify-center"},_sfc_main$f=defineComponent({__name:"LoadingModal",props:{show:{type:Boolean}},setup(n){return(e,t)=>(openBlock(),createBlock(Teleport,{to:"body"},[createVNode(unref(Se),{show:e.show,enter:"ease-out transition-opacity duration-150",leave:"ease-in transition-opacity duration-150","enter-from":"opacity-0","enter-to":"opacity-100","leave-from":"opacity-100","leave-to":"opacity-0",class:"fixed inset-0 z-50 flex items-center justify-center"},{default:withCtx(()=>[t[0]||(t[0]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-900"},null,-1)),createBaseVNode("div",_hoisted_1$G,[e.show?(openBlock(),createBlock(_sfc_main$g,{key:0})):createCommentVNode("",!0)])]),_:1},8,["show"])]))}}),copyToClipboard=async n=>{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(n);return}const e=document.createElement("textarea");e.value=n,document.body.appendChild(e),e.select(),e.setSelectionRange(0,9999),document.execCommand("copy"),document.body.removeChild(e)},escape=(n,e=!0)=>{const t=(n??"").replace(/[\u00A0-\u9999<>\&]/g,r=>"&#"+r.charCodeAt(0)+";");return e?t.replace(/\n/g,"<br>"):t},_hoisted_1$F={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$q(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$F,e[0]||(e[0]=[createBaseVNode("path",{d:"M10.376 16.1465C10.3848 15.0391 10.4946 14.1426 10.7056 13.457C10.9253 12.7627 11.2285 12.209 11.6152 11.7959C12.002 11.374 12.5205 10.9609 13.1709 10.5566C14.4717 9.76562 15.1221 8.75488 15.1221 7.52441C15.1221 6.98828 14.9946 6.51807 14.7397 6.11377C14.4937 5.70068 14.1509 5.38428 13.7114 5.16455C13.2808 4.94482 12.8018 4.83496 12.2744 4.83496C11.7822 4.83496 11.3208 4.94043 10.8901 5.15137C10.4595 5.35352 10.1035 5.66553 9.82227 6.0874C9.54102 6.50928 9.38281 7.03223 9.34766 7.65625H6.5C6.53516 6.56641 6.80762 5.63037 7.31738 4.84814C7.83594 4.06592 8.52588 3.47266 9.38721 3.06836C10.2485 2.66406 11.2109 2.46191 12.2744 2.46191C13.3994 2.46191 14.3926 2.67725 15.2539 3.10791C16.124 3.52979 16.7964 4.12305 17.271 4.8877C17.7544 5.65234 17.9961 6.53125 17.9961 7.52441C17.9961 8.54395 17.7676 9.42725 17.3105 10.1743C16.8535 10.9126 16.1855 11.5498 15.3066 12.0859C14.7617 12.4199 14.3311 12.7627 14.0146 13.1143C13.6982 13.457 13.4609 13.8701 13.3027 14.3535C13.1533 14.8369 13.0742 15.4346 13.0654 16.1465V16.3047H10.376V16.1465ZM9.9541 20.1543C9.9541 19.8115 10.0376 19.4951 10.2046 19.2051C10.3716 18.915 10.5957 18.6865 10.877 18.5195C11.167 18.3438 11.4834 18.2559 11.8262 18.2559C12.1602 18.2559 12.4678 18.3394 12.749 18.5063C13.0391 18.6733 13.2676 18.9019 13.4346 19.1919C13.6104 19.4819 13.6982 19.7939 13.6982 20.1279C13.6982 20.4619 13.6104 20.7739 13.4346 21.064C13.2676 21.3452 13.0391 21.5737 12.749 21.7495C12.4678 21.9165 12.1602 22 11.8262 22C11.4922 22 11.1802 21.9165 10.8901 21.7495C10.6089 21.5825 10.3804 21.3584 10.2046 21.0771C10.0376 20.7959 9.9541 20.4883 9.9541 20.1543Z"},null,-1)]))}const Support2Icon={render:render$q},_hoisted_1$E={class:"absolute flex w-full h-10 gap-3 px-4 top-4"},_hoisted_2$c={class:"relative z-10 flex items-center justify-center"},_hoisted_3$a={key:0,class:"relative ml-auto flex items-center shrink-0 h-10 overflow-hidden rounded-full pl-4 pr-5"},_hoisted_4$9={class:"relative z-10 flex items-center gap-1 select-none"},_hoisted_5$8={class:"relative z-10 flex items-center justify-center"},_hoisted_6$7={class:"relative z-10 flex items-center justify-center"},_sfc_main$e=defineComponent({__name:"WorkTopFloating",emits:["openNavGuide"],setup(n){const e=useRouter(),t=ref(!1),r=async()=>{const s=window.location.href;try{await copyToClipboard(s),t.value=!0,setTimeout(()=>{t.value=!1},2e3)}catch(o){console.error("failed to copy link",o)}},a=()=>{window.history.length>1?e.back():e.replace("/")};return(s,o)=>(openBlock(),createElementBlock("div",_hoisted_1$E,[createBaseVNode("button",{onClick:a,class:"group relative flex items-center justify-center rounded-full cursor-pointer shrink-0 size-10 overflow-hidden"},[o[2]||(o[2]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 mix-blend-multiply bg-opacity-50 group-hover:bg-opacity-100 group-active:bg-opacity-100 force-gpu-accel"},null,-1)),createBaseVNode("div",_hoisted_2$c,[createVNode(unref(CrossIcon),{class:"size-6 text-fgray-100"})])]),t.value?(openBlock(),createElementBlock("div",_hoisted_3$a,[o[4]||(o[4]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-100 mix-blend-multiply pointer-events-none force-gpu-accel"},null,-1)),createBaseVNode("div",_hoisted_4$9,[createVNode(unref(CheckBigIcon),{class:"size-6 text-fgray-0"}),o[3]||(o[3]=createBaseVNode("span",{class:"text-[16px] leading-[120%] text-fgray-0"},"Link copied",-1))])])):createCommentVNode("",!0),t.value?createCommentVNode("",!0):(openBlock(),createElementBlock("button",{key:1,onClick:r,onPointerup:o[0]||(o[0]=l=>l.currentTarget.blur()),class:"group relative flex items-center justify-center ml-auto rounded-full cursor-pointer shrink-0 size-10 overflow-hidden"},[o[5]||(o[5]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 mix-blend-multiply force-gpu-accel bg-opacity-50 group-hover:bg-opacity-100 group-active:bg-opacity-100"},null,-1)),createBaseVNode("div",_hoisted_5$8,[createVNode(unref(LinkIcon),{class:"size-6 text-fgray-100"})])],32)),createBaseVNode("button",{onClick:o[1]||(o[1]=l=>s.$emit("openNavGuide")),class:"group relative flex items-center justify-center rounded-full cursor-pointer shrink-0 size-10 overflow-hidden"},[o[6]||(o[6]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 mix-blend-multiply force-gpu-accel bg-opacity-50 group-hover:bg-opacity-100 group-active:bg-opacity-100"},null,-1)),createBaseVNode("div",_hoisted_6$7,[createVNode(unref(Support2Icon),{class:"size-6 text-fgray-100"})])])]))}}),WorkTopFloating=_export_sfc(_sfc_main$e,[["__scopeId","data-v-8e56d04a"]]),_hoisted_1$D={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$p(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$D,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.26578 3.84187C9.26578 2.22911 10.573 0.921875 12.1858 0.921875C13.7985 0.921875 15.1058 2.22911 15.1058 3.84187V10.0297C15.395 9.93381 15.7043 9.88188 16.0258 9.88188C17.1484 9.88188 18.1229 10.5152 18.6116 11.4441C18.9916 11.2632 19.4169 11.1619 19.8658 11.1619C20.9884 11.1619 21.9629 11.7952 22.4516 12.7241C22.8316 12.5432 23.2569 12.4419 23.7058 12.4419C25.3185 12.4419 26.6258 13.7491 26.6258 15.3619V20.4819C26.6258 26.3359 21.8798 31.0819 16.0258 31.0819C10.1717 31.0819 5.42578 26.3359 5.42578 20.4819V14.0819C5.42578 12.4691 6.73302 11.1619 8.34578 11.1619C8.66723 11.1619 8.97654 11.2138 9.26578 11.3097V3.84187ZM11.2658 18.5619C11.2658 19.1142 10.8181 19.5619 10.2658 19.5619C9.7135 19.5619 9.26578 19.1142 9.26578 18.5619V14.0819C9.26578 13.5737 8.85398 13.1619 8.34578 13.1619C7.83759 13.1619 7.42578 13.5737 7.42578 14.0819V20.4819C7.42578 25.2313 11.2763 29.0819 16.0258 29.0819C20.7753 29.0819 24.6258 25.2313 24.6258 20.4819V15.3619C24.6258 14.8537 24.214 14.4419 23.7058 14.4419C23.1976 14.4419 22.7858 14.8537 22.7858 15.3619C22.7858 15.9142 22.3381 16.3619 21.7858 16.3619C21.2335 16.3619 20.7858 15.9142 20.7858 15.3619V14.0819C20.7858 13.5737 20.374 13.1619 19.8658 13.1619C19.3576 13.1619 18.9458 13.5737 18.9458 14.0819C18.9458 14.6342 18.4981 15.0819 17.9458 15.0819C17.3935 15.0819 16.9458 14.6342 16.9458 14.0819V12.8019C16.9458 12.2937 16.534 11.8819 16.0258 11.8819C15.5176 11.8819 15.1058 12.2937 15.1058 12.8019C15.1058 13.3542 14.6581 13.8019 14.1058 13.8019C13.5535 13.8019 13.1058 13.3542 13.1058 12.8019V3.84187C13.1058 3.33368 12.694 2.92188 12.1858 2.92188C11.6776 2.92188 11.2658 3.33368 11.2658 3.84187V18.5619Z",fill:"white"},null,-1),createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M23.6535 1.92188C23.6535 1.36959 24.1012 0.921875 24.6535 0.921875H27.6535C28.2058 0.921875 28.6535 1.36959 28.6535 1.92188V5.42188C28.6535 5.97416 28.2058 6.42188 27.6535 6.42188H25.6535V7.92188H27.6535C28.2058 7.92188 28.6535 8.36959 28.6535 8.92188C28.6535 9.47416 28.2058 9.92188 27.6535 9.92188H24.6535C24.1012 9.92188 23.6535 9.47416 23.6535 8.92188V5.42188C23.6535 4.86959 24.1012 4.42188 24.6535 4.42188H26.6535V2.92188H24.6535C24.1012 2.92188 23.6535 2.47416 23.6535 1.92188ZM17.5839 3.21477C17.9744 2.82424 18.6076 2.82424 18.9981 3.21477L19.9375 4.15415L20.8769 3.21477C21.2674 2.82424 21.9006 2.82424 22.2911 3.21477C22.6816 3.60529 22.6816 4.23846 22.2911 4.62898L21.3517 5.56836L22.2911 6.50774C22.6816 6.89826 22.6816 7.53143 22.2911 7.92195C21.9006 8.31247 21.2674 8.31247 20.8769 7.92195L19.9375 6.98257L18.9981 7.92195C18.6076 8.31247 17.9744 8.31247 17.5839 7.92195C17.1934 7.53143 17.1934 6.89826 17.5839 6.50774L18.5233 5.56836L17.5839 4.62898C17.1934 4.23846 17.1934 3.60529 17.5839 3.21477Z",fill:"#A1A4B3"},null,-1)]))}const FingerOneDoubleIcon={render:render$p},_hoisted_1$C={width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$o(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$C,e[0]||(e[0]=[createStaticVNode('<g clip-path="url(#clip0_2214_14165)"><path d="M26.2129 0.292893C26.6034 -0.0976311 27.2366 -0.0976311 27.6271 0.292893L29.5471 2.21289C29.9376 2.60342 29.9376 3.23658 29.5471 3.62711C29.1566 4.01763 28.5234 4.01763 28.1329 3.62711L27.92 3.41421V7.54579L28.1329 7.33289C28.5234 6.94237 29.1566 6.94237 29.5471 7.33289C29.9376 7.72342 29.9376 8.35658 29.5471 8.74711L27.6271 10.6671C27.4395 10.8546 27.1852 10.96 26.92 10.96C26.6548 10.96 26.4004 10.8546 26.2129 10.6671L24.2929 8.74711C23.9023 8.35658 23.9023 7.72342 24.2929 7.33289C24.6834 6.94237 25.3166 6.94237 25.7071 7.33289L25.92 7.54579V3.41421L25.7071 3.62711C25.3166 4.01763 24.6834 4.01763 24.2929 3.62711C23.9023 3.23658 23.9023 2.60342 24.2929 2.21289L26.2129 0.292893Z" fill="#A1A4B3"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.6 0.639983C13.4774 0.639983 12.5029 1.27334 12.0142 2.20224C11.6342 2.02127 11.2089 1.91998 10.76 1.91998C9.14724 1.91998 7.84 3.22722 7.84 4.83998V12.286C7.54024 12.1999 7.22881 12.16 6.92 12.16C5.30724 12.16 4 13.4672 4 15.08V20.2C4 26.054 8.74595 30.8 14.6 30.8C20.454 30.8 25.2 26.054 25.2 20.2V15.08C25.2 13.4672 23.8928 12.16 22.28 12.16C21.9584 12.16 21.6489 12.212 21.3595 12.308V4.82234C21.3595 3.20967 20.0522 1.90234 18.4395 1.90234C17.9878 1.90234 17.5601 2.00491 17.1783 2.18802C16.6872 1.26688 15.7168 0.639983 14.6 0.639983ZM15.52 4.76946C15.5197 4.78705 15.5195 4.80468 15.5195 4.82234L15.52 13.8C15.52 14.3523 15.9677 14.8 16.52 14.8C17.0723 14.8 17.52 14.3523 17.52 13.8V4.79268C17.5357 4.29831 17.9414 3.90234 18.4395 3.90234C18.9476 3.90234 19.3595 4.31424 19.3595 4.82234L19.36 15.08C19.36 15.6323 19.8077 16.08 20.36 16.08C20.9123 16.08 21.36 15.6323 21.36 15.08C21.36 14.5718 21.7718 14.16 22.28 14.16C22.7882 14.16 23.2 14.5718 23.2 15.08V20.2C23.2 24.9495 19.3495 28.8 14.6 28.8C9.85052 28.8 6 24.9495 6 20.2V15.08C6 14.5718 6.4118 14.16 6.92 14.16C7.25473 14.16 7.47453 14.2598 7.60022 14.3755C7.71244 14.4789 7.84 14.6765 7.84 15.08V18.28C7.84 18.8323 8.28772 19.28 8.84 19.28C9.39228 19.28 9.84 18.8323 9.84 18.28V4.83998C9.84 4.33179 10.2518 3.91998 10.76 3.91998C11.2682 3.91998 11.68 4.33179 11.68 4.83998V12.52C11.68 13.0723 12.1277 13.52 12.68 13.52C13.2323 13.52 13.68 13.0723 13.68 12.52V3.55998C13.68 3.05179 14.0918 2.63998 14.6 2.63998C15.1082 2.63998 15.52 3.05179 15.52 3.55998V4.76946Z" fill="white"></path></g><defs><clipPath id="clip0_2214_14165"><rect width="32" height="32" fill="white"></rect></clipPath></defs>',2)]))}const FingerThreeVscrollIcon={render:render$o},_hoisted_1$B={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$n(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$B,e[0]||(e[0]=[createStaticVNode('<g clip-path="url(#clip0_2214_14169)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.3598 0.921875C10.2372 0.921875 9.26262 1.55524 8.77392 2.48414C8.39394 2.30316 7.96869 2.20187 7.51977 2.20187C5.907 2.20187 4.59977 3.50911 4.59977 5.12187V12.5679C4.30001 12.4817 3.98858 12.4419 3.67977 12.4419C2.067 12.4419 0.759766 13.7491 0.759766 15.3619V20.4819C0.759766 26.3359 5.50572 31.0819 11.3598 31.0819C17.2138 31.0819 21.9598 26.3359 21.9598 20.4819V15.3619C21.9598 13.7491 20.6525 12.4419 19.0398 12.4419C18.7181 12.4419 18.4087 12.4939 18.1193 12.5899V5.10424C18.1193 3.49156 16.812 2.18424 15.1993 2.18424C14.7476 2.18424 14.3199 2.2868 13.9381 2.46991C13.4469 1.54878 12.4766 0.921875 11.3598 0.921875ZM12.2798 5.05136C12.2795 5.06894 12.2793 5.08657 12.2793 5.10424L12.2798 14.0819C12.2798 14.6342 12.7275 15.0819 13.2798 15.0819C13.8321 15.0819 14.2798 14.6342 14.2798 14.0819V5.07457C14.2954 4.5802 14.7011 4.18424 15.1993 4.18424C15.7074 4.18424 16.1193 4.59613 16.1193 5.10424L16.1198 15.3619C16.1198 15.9142 16.5675 16.3619 17.1198 16.3619C17.6721 16.3619 18.1198 15.9142 18.1198 15.3619C18.1198 14.8537 18.5316 14.4419 19.0398 14.4419C19.548 14.4419 19.9598 14.8537 19.9598 15.3619V20.4819C19.9598 25.2313 16.1092 29.0819 11.3598 29.0819C6.61029 29.0819 2.75977 25.2313 2.75977 20.4819V15.3619C2.75977 14.8537 3.17157 14.4419 3.67977 14.4419C4.0145 14.4419 4.2343 14.5417 4.35998 14.6574C4.47221 14.7608 4.59977 14.9583 4.59977 15.3619V18.5619C4.59977 19.1142 5.04748 19.5619 5.59977 19.5619C6.15205 19.5619 6.59977 19.1142 6.59977 18.5619V5.12187C6.59977 4.61368 7.01157 4.20187 7.51977 4.20187C8.02796 4.20187 8.43977 4.61368 8.43977 5.12187V12.8019C8.43977 13.3542 8.88748 13.8019 9.43977 13.8019C9.99205 13.8019 10.4398 13.3542 10.4398 12.8019V3.84188C10.4398 3.33368 10.8516 2.92188 11.3598 2.92188C11.868 2.92188 12.2798 3.33368 12.2798 3.84188V5.05136Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M25.9055 2.89453C25.9055 2.34225 26.3532 1.89453 26.9055 1.89453H29.9055C30.4578 1.89453 30.9055 2.34225 30.9055 2.89453V6.39453C30.9055 6.94682 30.4578 7.39453 29.9055 7.39453H27.9055V8.89453H29.9055C30.4578 8.89453 30.9055 9.34225 30.9055 9.89453C30.9055 10.4468 30.4578 10.8945 29.9055 10.8945H26.9055C26.3532 10.8945 25.9055 10.4468 25.9055 9.89453V6.39453C25.9055 5.84225 26.3532 5.39453 26.9055 5.39453H28.9055V3.89453H26.9055C26.3532 3.89453 25.9055 3.44682 25.9055 2.89453ZM19.8359 4.18742C20.2264 3.7969 20.8596 3.7969 21.2501 4.18742L22.1895 5.1268L23.1288 4.18742C23.5194 3.7969 24.1525 3.7969 24.543 4.18742C24.9336 4.57795 24.9336 5.21111 24.543 5.60164L23.6037 6.54102L24.543 7.48039C24.9336 7.87092 24.9336 8.50408 24.543 8.89461C24.1525 9.28513 23.5194 9.28513 23.1288 8.89461L22.1895 7.95523L21.2501 8.89461C20.8596 9.28513 20.2264 9.28513 19.8359 8.89461C19.4453 8.50408 19.4453 7.87092 19.8359 7.48039L20.7752 6.54102L19.8359 5.60164C19.4453 5.21111 19.4453 4.57795 19.8359 4.18742Z" fill="#A1A4B3"></path></g><defs><clipPath id="clip0_2214_14169"><rect width="32" height="32" fill="white" transform="translate(0.332031)"></rect></clipPath></defs>',2)]))}const FingerThreeDoubleIcon={render:render$n},_hoisted_1$A={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$m(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$A,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.26578 3.84187C9.26578 2.22911 10.573 0.921875 12.1858 0.921875C13.7985 0.921875 15.1058 2.22911 15.1058 3.84187V10.0297C15.395 9.93381 15.7043 9.88188 16.0258 9.88188C17.1484 9.88188 18.1229 10.5152 18.6116 11.4441C18.9916 11.2632 19.4169 11.1619 19.8658 11.1619C20.9884 11.1619 21.9629 11.7952 22.4516 12.7241C22.8316 12.5432 23.2569 12.4419 23.7058 12.4419C25.3185 12.4419 26.6258 13.7491 26.6258 15.3619V20.4819C26.6258 26.3359 21.8798 31.0819 16.0258 31.0819C10.1717 31.0819 5.42578 26.3359 5.42578 20.4819V14.0819C5.42578 12.4691 6.73302 11.1619 8.34578 11.1619C8.66723 11.1619 8.97654 11.2138 9.26578 11.3097V3.84187ZM11.2658 18.5619C11.2658 19.1142 10.8181 19.5619 10.2658 19.5619C9.7135 19.5619 9.26578 19.1142 9.26578 18.5619V14.0819C9.26578 13.5737 8.85398 13.1619 8.34578 13.1619C7.83759 13.1619 7.42578 13.5737 7.42578 14.0819V20.4819C7.42578 25.2313 11.2763 29.0819 16.0258 29.0819C20.7753 29.0819 24.6258 25.2313 24.6258 20.4819V15.3619C24.6258 14.8537 24.214 14.4419 23.7058 14.4419C23.1976 14.4419 22.7858 14.8537 22.7858 15.3619C22.7858 15.9142 22.3381 16.3619 21.7858 16.3619C21.2335 16.3619 20.7858 15.9142 20.7858 15.3619V14.0819C20.7858 13.5737 20.374 13.1619 19.8658 13.1619C19.3576 13.1619 18.9458 13.5737 18.9458 14.0819C18.9458 14.6342 18.4981 15.0819 17.9458 15.0819C17.3935 15.0819 16.9458 14.6342 16.9458 14.0819V12.8019C16.9458 12.2937 16.534 11.8819 16.0258 11.8819C15.5176 11.8819 15.1058 12.2937 15.1058 12.8019C15.1058 13.3542 14.6581 13.8019 14.1058 13.8019C13.5535 13.8019 13.1058 13.3542 13.1058 12.8019V3.84187C13.1058 3.33368 12.694 2.92188 12.1858 2.92188C11.6776 2.92188 11.2658 3.33368 11.2658 3.84187V18.5619Z",fill:"white"},null,-1),createBaseVNode("path",{d:"M23.6387 2.4948C24.0292 2.10427 24.6624 2.10427 25.0529 2.4948L26.9729 4.4148C27.0787 4.52061 27.1559 4.64422 27.2044 4.776C27.2562 4.91686 27.2752 5.06705 27.2615 5.21477C27.254 5.29663 27.2366 5.37563 27.2105 5.45057C27.1625 5.5888 27.0833 5.7186 26.9729 5.82901L25.0529 7.74901C24.6624 8.13954 24.0292 8.13954 23.6387 7.74901C23.2482 7.35849 23.2482 6.72532 23.6387 6.3348L23.8516 6.12189H19.72L19.9329 6.3348C20.3234 6.72532 20.3234 7.35849 19.9329 7.74901C19.5424 8.13954 18.9092 8.13954 18.5187 7.74901L16.5987 5.82901C16.5005 5.73084 16.427 5.61734 16.3782 5.49622C16.3315 5.3806 16.3058 5.25424 16.3058 5.12189C16.3058 4.98306 16.3341 4.85084 16.3852 4.73068C16.4286 4.62855 16.4897 4.53216 16.5686 4.44622C16.5795 4.43431 16.5907 4.42266 16.6022 4.41129L18.5187 2.4948C18.9092 2.10427 19.5424 2.10427 19.9329 2.4948C20.3234 2.88532 20.3234 3.51849 19.9329 3.90901L19.72 4.12189H23.8516L23.6387 3.90901C23.2482 3.51849 23.2482 2.88532 23.6387 2.4948Z",fill:"#A1A4B3"},null,-1)]))}const FingerOneHscrollIcon={render:render$m},_hoisted_1$z={width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$l(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$z,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13.4441 2.99999C12.9331 2.99999 12.5504 3.42509 12.5504 3.90908V17.797C12.5504 19.9385 10.1007 20.928 8.70252 19.4757L6.11403 16.787C5.76567 16.4252 5.19385 16.4252 4.84549 16.787C4.53354 17.1117 4.50774 17.6178 4.7791 17.9728L11.321 26.5293C12.8101 28.0557 14.8568 28.9999 17.1207 28.9999C21.6918 28.9999 25.3663 25.1556 25.3663 20.4545V14.0514C25.3663 13.5674 24.9836 13.1423 24.4726 13.1423C23.9616 13.1423 23.5789 13.5674 23.5789 14.0514V14.7272C23.5789 15.2795 23.1561 15.7272 22.6346 15.7272C22.1131 15.7272 21.6903 15.2795 21.6903 14.7272V12.8181C21.6903 12.3341 21.3076 11.909 20.7966 11.909C20.2856 11.909 19.9029 12.3341 19.9029 12.8181C19.9029 13.3704 19.4802 13.8181 18.9586 13.8181C18.4371 13.8181 18.0144 13.3704 18.0144 12.8181V11.5454C18.0144 11.0614 17.6317 10.6363 17.1207 10.6363C16.6097 10.6363 16.2269 11.0614 16.2269 11.5454C16.2269 11.5574 16.2267 11.5694 16.2264 11.5814V12.8181C16.2264 13.3704 15.8036 13.8181 15.2821 13.8181C14.7606 13.8181 14.3378 13.3704 14.3378 12.8181V3.90908C14.3378 3.42509 13.9551 2.99999 13.4441 2.99999ZM16.2264 8.79043V3.90908C16.2264 2.28417 14.9634 1 13.4441 1C11.9247 1 10.6618 2.28417 10.6618 3.90908V17.797C10.6618 17.9499 10.5849 18.0687 10.4398 18.1311C10.2935 18.1941 10.1422 18.1696 10.0249 18.0478L7.43645 15.3592C6.35363 14.2345 4.6059 14.2345 3.52308 15.3592C2.51933 16.4027 2.42484 18.0718 3.31133 19.2313L9.88826 27.8336C9.91098 27.8633 9.93528 27.8916 9.96106 27.9184C11.7956 29.8232 14.3284 30.9999 17.1207 30.9999C22.7001 30.9999 27.2549 26.2965 27.2549 20.4545V14.0514C27.2549 12.4265 25.992 11.1423 24.4726 11.1423C24.0351 11.1423 23.6188 11.2488 23.2479 11.4393C22.7753 10.5231 21.8473 9.90905 20.7966 9.90905C20.3654 9.90905 19.9548 10.0125 19.5878 10.1979C19.1204 9.26442 18.1832 8.63633 17.1207 8.63633C16.8089 8.63633 16.5079 8.69042 16.2264 8.79043Z",fill:"white"},null,-1),createBaseVNode("path",{d:"M9.3343 5.03276C9.45625 5.14792 9.54284 5.28648 9.59367 5.43486L9.64456 5.68015C9.64664 5.70647 9.6477 5.73309 9.6477 5.75995V8.31994C9.6477 8.87222 9.19999 9.31994 8.6477 9.31994C8.09542 9.31994 7.6477 8.87222 7.6477 8.31994V8.2754L4.31961 11.7999H4.41736C4.96964 11.7999 5.41736 12.2476 5.41736 12.7999C5.41736 13.3521 4.96964 13.7999 4.41736 13.7999H2C1.83264 13.7999 1.67488 13.7587 1.53627 13.6861C1.49949 13.6668 1.46363 13.6451 1.42894 13.6209C1.36791 13.5783 1.31184 13.5292 1.26179 13.4744C1.09919 13.2966 1 13.0598 1 12.7999V10.2399C1 9.68758 1.44772 9.23987 2 9.23987C2.55228 9.23987 3 9.68758 3 10.2399V10.2843L6.32796 6.75995H6.23035C5.67806 6.75995 5.23035 6.31223 5.23035 5.75995C5.23035 5.20766 5.67806 4.75995 6.23035 4.75995H8.63224C8.88375 4.75603 9.13696 4.84642 9.3343 5.03276Z",fill:"#A1A4B3"},null,-1)]))}const FingerPinchOutIcon={render:render$l},_hoisted_1$y={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$k(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$y,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M23.9453 0.574143C24.3358 0.183619 24.969 0.183619 25.3595 0.574143L27.2795 2.49414C27.67 2.88467 27.67 3.51783 27.2795 3.90836C26.889 4.29888 26.2558 4.29888 25.8653 3.90836L25.6524 3.69546V7.82704L25.8653 7.61414C26.2558 7.22362 26.889 7.22362 27.2795 7.61414C27.67 8.00467 27.67 8.63783 27.2795 9.02836L25.3595 10.9484C25.172 11.1359 24.9176 11.2413 24.6524 11.2413C24.3872 11.2413 24.1328 11.1359 23.9453 10.9484L22.0253 9.02836C21.6348 8.63783 21.6348 8.00467 22.0253 7.61414C22.4158 7.22362 23.049 7.22362 23.4395 7.61414L23.6524 7.82704V3.69546L23.4395 3.90836C23.049 4.29888 22.4158 4.29888 22.0253 3.90836C21.6348 3.51783 21.6348 2.88467 22.0253 2.49414L23.9453 0.574143Z",fill:"#A1A4B3"},null,-1),createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13.7466 2.48349C14.2353 1.55459 15.2098 0.921233 16.3324 0.921233C17.9452 0.921233 19.2524 2.22847 19.2524 3.84123V11.3091C19.5417 11.2132 19.851 11.1612 20.1724 11.1612C21.295 11.1612 22.2696 11.7946 22.7583 12.7235C23.1382 12.5425 23.5635 12.4412 24.0124 12.4412C25.6252 12.4412 26.9324 13.7485 26.9324 15.3612V20.4812C26.9324 26.3353 22.1865 31.0812 16.3324 31.0812C10.4784 31.0812 5.73242 26.3353 5.73242 20.4812V15.3612C5.73242 13.7485 7.03966 12.4412 8.65242 12.4412C8.96124 12.4412 9.27266 12.4811 9.57242 12.5673V5.12123C9.57242 3.50847 10.8797 2.20123 12.4924 2.20123C12.9413 2.20123 13.3666 2.30252 13.7466 2.48349ZM15.4124 12.8012C15.4124 13.3535 14.9647 13.8012 14.4124 13.8012C13.8601 13.8012 13.4124 13.3535 13.4124 12.8012V5.12123C13.4124 4.61304 13.0006 4.20123 12.4924 4.20123C11.9842 4.20123 11.5724 4.61304 11.5724 5.12123V18.5612C11.5724 19.1135 11.1247 19.5612 10.5724 19.5612C10.0201 19.5612 9.57242 19.1135 9.57242 18.5612V15.3612C9.57242 14.9577 9.44486 14.7602 9.33264 14.6568C9.20695 14.541 8.98715 14.4412 8.65242 14.4412C8.14423 14.4412 7.73242 14.853 7.73242 15.3612V20.4812C7.73242 25.2307 11.5829 29.0812 16.3324 29.0812C21.0819 29.0812 24.9324 25.2307 24.9324 20.4812V15.3612C24.9324 14.853 24.5206 14.4412 24.0124 14.4412C23.5042 14.4412 23.0924 14.853 23.0924 15.3612C23.0924 15.9135 22.6447 16.3612 22.0924 16.3612C21.5401 16.3612 21.0924 15.9135 21.0924 15.3612V14.0812C21.0924 13.573 20.6806 13.1612 20.1724 13.1612C19.6642 13.1612 19.2524 13.573 19.2524 14.0812C19.2524 14.6335 18.8047 15.0812 18.2524 15.0812C17.7001 15.0812 17.2524 14.6335 17.2524 14.0812V3.84123C17.2524 3.33304 16.8406 2.92123 16.3324 2.92123C15.8242 2.92123 15.4124 3.33304 15.4124 3.84123V12.8012Z",fill:"white"},null,-1)]))}const FingerTwoVscrollIcon={render:render$k},_hoisted_1$x={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$j(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$x,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.60284 7.46543C11.4202 6.28516 13.739 5.60938 16.6664 5.60938C19.5939 5.60938 21.9126 6.28516 23.73 7.46543C25.5458 8.6447 26.8006 10.2882 27.6661 12.1263C29.3791 15.7645 29.6105 20.2673 29.6452 23.7824C29.6595 25.229 28.4827 26.385 27.0543 26.385H6.27859C4.85014 26.385 3.67333 25.229 3.68763 23.7824C3.72238 20.2673 3.95374 15.7645 5.66678 12.1263C6.53223 10.2882 7.78701 8.6447 9.60284 7.46543ZM17.5321 24.6537V21.9477C19.0255 21.5633 20.129 20.2076 20.129 18.5942V13.4002C20.129 11.7868 19.0255 10.4311 17.5321 10.0467V7.36322C19.7566 7.48153 21.4642 8.05831 22.787 8.9174C24.278 9.88572 25.3409 11.2522 26.0997 12.8638C27.6352 16.125 27.8792 20.2801 27.914 23.7995C27.9186 24.2651 27.5382 24.6537 27.0543 24.6537H17.5321ZM14.9351 18.5942C14.9351 19.5503 15.7102 20.3255 16.6664 20.3255C17.6226 20.3255 18.3977 19.5503 18.3977 18.5942V13.4002C18.3977 12.4441 17.6226 11.6689 16.6664 11.6689C15.7102 11.6689 14.9351 12.4441 14.9351 13.4002V18.5942Z",fill:"white"},null,-1)]))}const MouseLeftIcon={render:render$j},_hoisted_1$w={width:"32",height:"32",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$i(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$w,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12.9789 5.61328C10.0515 5.61328 7.73271 6.28906 5.91534 7.46933C4.09951 8.64861 2.84473 10.2922 1.97928 12.1302C0.266239 15.7684 0.0348824 20.2712 0.000129016 23.7863C-0.0141739 25.2329 1.16264 26.389 2.59109 26.389H23.3668C24.7952 26.389 25.972 25.2329 25.9577 23.7863C25.923 20.2712 25.6916 15.7684 23.9786 12.1302C23.1131 10.2922 21.8583 8.64861 20.0425 7.46933C18.2251 6.28906 15.9064 5.61328 12.9789 5.61328ZM1.73135 23.8034C1.76615 20.284 2.01012 16.1289 3.54564 12.8677C4.30448 11.2561 5.3673 9.88963 6.85831 8.92131C8.18113 8.06222 9.88873 7.48544 12.1133 7.36712V10.0506C10.6198 10.435 9.51631 11.7907 9.51631 13.4042V18.5981C9.51631 20.2115 10.6198 21.5672 12.1133 21.9516V24.6576H2.59109C2.10718 24.6576 1.72675 24.269 1.73135 23.8034ZM13.8446 21.9516V24.6576H23.3668C23.8507 24.6576 24.2311 24.269 24.2265 23.8034C24.1917 20.284 23.9477 16.1289 22.4122 12.8677C21.6534 11.2561 20.5905 9.88963 19.0995 8.92131C17.7767 8.06222 16.0691 7.48544 13.8446 7.36712V10.0506C15.338 10.435 16.4415 11.7907 16.4415 13.4042V18.5981C16.4415 20.2115 15.338 21.5672 13.8446 21.9516Z",fill:"white"},null,-1),createBaseVNode("path",{d:"M28.1699 2.3593C28.5604 1.96878 29.1936 1.96878 29.5841 2.3593L31.5041 4.2793C31.8947 4.66982 31.8947 5.30299 31.5041 5.69351C31.1136 6.08404 30.4805 6.08404 30.0899 5.69351L29.877 5.48062V9.61219L30.0899 9.3993C30.4805 9.00877 31.1136 9.00877 31.5041 9.3993C31.8947 9.78982 31.8947 10.423 31.5041 10.8135L29.5841 12.7335C29.3966 12.921 29.1422 13.0264 28.877 13.0264C28.6118 13.0264 28.3575 12.921 28.1699 12.7335L26.2499 10.8135C25.8594 10.423 25.8594 9.78982 26.2499 9.3993C26.6404 9.00877 27.2736 9.00877 27.6641 9.3993L27.877 9.61219V5.48062L27.6641 5.69351C27.2736 6.08404 26.6404 6.08404 26.2499 5.69351C25.8594 5.30299 25.8594 4.66982 26.2499 4.2793L28.1699 2.3593Z",fill:"#A1A4B3"},null,-1)]))}const MouseWheelScrollIcon={render:render$i},_hoisted_1$v={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$h(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$v,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M9.2669 7.46543C11.0843 6.28516 13.403 5.60938 16.3305 5.60938C19.2579 5.60938 21.5767 6.28516 23.3941 7.46543C25.2099 8.6447 26.4647 10.2882 27.3301 12.1263C29.0432 15.7645 29.2745 20.2673 29.3093 23.7824C29.3236 25.229 28.1468 26.385 26.7183 26.385H5.94265C4.5142 26.385 3.33739 25.229 3.35169 23.7824C3.38644 20.2673 3.6178 15.7645 5.33085 12.1263C6.19629 10.2882 7.45107 8.6447 9.2669 7.46543ZM6.89721 12.8638C5.36168 16.125 5.11771 20.2801 5.08291 23.7995C5.07831 24.2651 5.45874 24.6537 5.94265 24.6537H15.4648V21.9477C13.971 21.5636 12.8672 20.2077 12.8672 18.594V13.4001C12.8672 11.7864 13.971 10.4306 15.4648 10.0464V7.36322C13.2403 7.48153 11.5327 8.05831 10.2099 8.9174C8.71886 9.88572 7.65604 11.2522 6.89721 12.8638ZM16.2671 20.3242H16.3925C17.3197 20.2912 18.0611 19.5292 18.0611 18.594V13.4001C18.0611 12.4697 17.3271 11.7107 16.4066 11.6705H16.253C15.3325 11.7107 14.5985 12.4697 14.5985 13.4001V18.594C14.5985 19.5292 15.3399 20.2912 16.2671 20.3242Z",fill:"white"},null,-1)]))}const MouseRightIcon={render:render$h},_hoisted_1$u={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$g(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$u,e[0]||(e[0]=[createStaticVNode('<g clip-path="url(#clip0_2214_14203)"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.58136 7.46933C8.39872 6.28906 10.7175 5.61328 13.6449 5.61328C16.5724 5.61328 18.8911 6.28906 20.7085 7.46933C22.5243 8.64861 23.7791 10.2922 24.6446 12.1302C26.3576 15.7684 26.589 20.2712 26.6237 23.7863C26.638 25.2329 25.4612 26.389 24.0328 26.389H3.2571C1.82866 26.389 0.651842 25.2329 0.666145 23.7863C0.700898 20.2712 0.932255 15.7684 2.6453 12.1302C3.51075 10.2922 4.76552 8.64861 6.58136 7.46933ZM14.5106 24.6576V21.9516C16.004 21.5672 17.1075 20.2115 17.1075 18.5981V13.4042C17.1075 11.7907 16.004 10.435 14.5106 10.0506V7.36712C16.7351 7.48544 18.4427 8.06222 19.7655 8.92131C21.2566 9.88963 22.3194 11.2561 23.0782 12.8677C24.6137 16.1289 24.8577 20.284 24.8925 23.8034C24.8971 24.269 24.5167 24.6576 24.0328 24.6576H14.5106ZM11.9136 18.5981C11.9136 19.5542 12.6888 20.3294 13.6449 20.3294C14.6011 20.3294 15.3762 19.5542 15.3762 18.5981V13.4042C15.3762 12.448 14.6011 11.6729 13.6449 11.6729C12.6888 11.6729 11.9136 12.448 11.9136 13.4042V18.5981Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M27.6653 1C27.6653 0.447715 28.113 0 28.6653 0H31.6652C32.2175 0 32.6652 0.447715 32.6652 1V4.5C32.6652 5.05228 32.2175 5.5 31.6652 5.5H29.6652V7H31.6652C32.2175 7 32.6652 7.44772 32.6652 8C32.6652 8.55228 32.2175 9 31.6652 9H28.6653C28.113 9 27.6653 8.55228 27.6653 8V4.5C27.6653 3.94772 28.113 3.5 28.6653 3.5H30.6652V2H28.6653C28.113 2 27.6653 1.55228 27.6653 1ZM21.5956 2.29289C21.9862 1.90237 22.6193 1.90237 23.0098 2.29289L23.9492 3.23227L24.8886 2.29289C25.2791 1.90237 25.9123 1.90237 26.3028 2.29289C26.6933 2.68342 26.6933 3.31658 26.3028 3.70711L25.3634 4.64648L26.3028 5.58586C26.6933 5.97639 26.6933 6.60955 26.3028 7.00008C25.9123 7.3906 25.2791 7.3906 24.8886 7.00008L23.9492 6.0607L23.0098 7.00008C22.6193 7.3906 21.9862 7.3906 21.5956 7.00008C21.2051 6.60955 21.2051 5.97639 21.5956 5.58586L22.535 4.64648L21.5956 3.70711C21.2051 3.31658 21.2051 2.68342 21.5956 2.29289Z" fill="#A1A4B3"></path></g><defs><clipPath id="clip0_2214_14203"><rect width="32" height="32" fill="white" transform="translate(0.666016)"></rect></clipPath></defs>',2)]))}const MouseLeftDoubleIcon={render:render$g},_hoisted_1$t={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$f(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$t,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M15.9789 5.61328C13.0515 5.61328 10.7327 6.28906 8.91534 7.46933C7.09951 8.64861 5.84473 10.2922 4.97928 12.1302C3.26624 15.7684 3.03488 20.2712 3.00013 23.7863C2.98583 25.2329 4.16264 26.389 5.59109 26.389H26.3668C27.7952 26.389 28.972 25.2329 28.9577 23.7863C28.923 20.2712 28.6916 15.7684 26.9786 12.1302C26.1131 10.2922 24.8583 8.64861 23.0425 7.46933C21.2251 6.28906 18.9064 5.61328 15.9789 5.61328ZM4.73135 23.8034C4.76615 20.284 5.01012 16.1289 6.54564 12.8677C7.30448 11.2561 8.3673 9.88963 9.85831 8.92131C11.1811 8.06222 12.8887 7.48544 15.1133 7.36712V10.0506C13.6198 10.435 12.5163 11.7907 12.5163 13.4042V18.5981C12.5163 20.2115 13.6198 21.5672 15.1133 21.9516V24.6576H5.59109C5.10718 24.6576 4.72675 24.269 4.73135 23.8034ZM16.8446 21.9516V24.6576H26.3668C26.8507 24.6576 27.2311 24.269 27.2265 23.8034C27.1917 20.284 26.9477 16.1289 25.4122 12.8677C24.6534 11.2561 23.5905 9.88963 22.0995 8.92131C20.7767 8.06222 19.0691 7.48544 16.8446 7.36712V10.0506C18.338 10.435 19.4415 11.7907 19.4415 13.4042V18.5981C19.4415 20.2115 18.338 21.5672 16.8446 21.9516Z",fill:"white"},null,-1)]))}const MouseWheelIcon={render:render$f},_hoisted_1$s={width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"};function render$e(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$s,e[0]||(e[0]=[createStaticVNode('<g clip-path="url(#clip0_2858_14239)"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.3755 7.46933C18.5581 6.28906 16.2394 5.61328 13.3119 5.61328C10.3845 5.61328 8.06572 6.28906 6.24835 7.46933C4.43252 8.64861 3.17774 10.2922 2.31229 12.1302C0.599248 15.7684 0.367891 20.2712 0.333137 23.7863C0.318835 25.2329 1.49565 26.389 2.92409 26.389H23.6998C25.1282 26.389 26.305 25.2329 26.2907 23.7863C26.256 20.2712 26.0246 15.7684 24.3116 12.1302C23.4461 10.2922 22.1913 8.64861 20.3755 7.46933ZM12.4463 24.6576V21.9516C10.9528 21.5672 9.84932 20.2115 9.84932 18.5981V13.4042C9.84932 11.7907 10.9528 10.435 12.4463 10.0506V7.36712C10.2217 7.48544 8.51414 8.06222 7.19132 8.92131C5.70031 9.88963 4.63749 11.2561 3.87865 12.8677C2.34313 16.1289 2.09915 20.284 2.06436 23.8034C2.05975 24.269 2.44019 24.6576 2.92409 24.6576H12.4463ZM15.0432 18.5981C15.0432 19.5542 14.2681 20.3294 13.3119 20.3294C12.3558 20.3294 11.5806 19.5542 11.5806 18.5981V13.4042C11.5806 12.448 12.3558 11.6729 13.3119 11.6729C14.2681 11.6729 15.0432 12.448 15.0432 13.4042V18.5981Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M27.3342 1C27.3342 0.447715 27.7819 0 28.3342 0H31.3342C31.8865 0 32.3342 0.447715 32.3342 1V4.5C32.3342 5.05228 31.8865 5.5 31.3342 5.5H29.3342V7H31.3342C31.8865 7 32.3342 7.44772 32.3342 8C32.3342 8.55228 31.8865 9 31.3342 9H28.3342C27.7819 9 27.3342 8.55228 27.3342 8V4.5C27.3342 3.94772 27.7819 3.5 28.3342 3.5H30.3342V2H28.3342C27.7819 2 27.3342 1.55228 27.3342 1ZM21.2646 2.29289C21.6551 1.90237 22.2883 1.90237 22.6788 2.29289L23.6182 3.23227L24.5575 2.29289C24.9481 1.90237 25.5812 1.90237 25.9718 2.29289C26.3623 2.68342 26.3623 3.31658 25.9718 3.70711L25.0324 4.64648L25.9718 5.58586C26.3623 5.97639 26.3623 6.60955 25.9718 7.00008C25.5812 7.3906 24.9481 7.3906 24.5575 7.00008L23.6182 6.0607L22.6788 7.00008C22.2883 7.3906 21.6551 7.3906 21.2646 7.00008C20.874 6.60955 20.874 5.97639 21.2646 5.58586L22.204 4.64648L21.2646 3.70711C20.874 3.31658 20.874 2.68342 21.2646 2.29289Z" fill="#A1A4B3"></path></g><defs><clipPath id="clip0_2858_14239"><rect width="32" height="32" fill="white" transform="translate(0.333984)"></rect></clipPath></defs>',2)]))}const MouseRightDoubleIcon={render:render$e},_hoisted_1$r={class:"flex items-center justify-center h-12 p-2 bg-opacity-50"},_hoisted_2$b={class:"flex flex-col gap-2 m-2"},_hoisted_3$9={class:"flex items-center justify-center w-full h-10 box-border border-b border-fgray-1050 text-[14px] leading-[120%] text-fgray-500"},_hoisted_4$8={class:"flex flex-wrap justify-center gap-0.5"},_hoisted_5$7={class:"flex items-center w-full h-8 rounded-full jusify-center shrink-0"},_hoisted_6$6={class:"text-center"},_hoisted_7$6={class:"block text-[12px] leading-[120%] text-fgray-0"},_hoisted_8$4={class:"block text-[12px] leading-[120%] text-fgray-500"},_sfc_main$d=defineComponent({__name:"WorkNavGuide",emits:["close"],setup(n){const e=[{title:"Touch",controls:[{icon:FingerOneHscrollIcon,action:"Drag",description:"Rotate"},{icon:FingerPinchOutIcon,action:"Pinch",description:"Zoom"},{icon:FingerTwoVscrollIcon,action:"Drag",description:"Pan"},{icon:FingerOneDoubleIcon,action:"Double tap",description:"Perfect View"},{icon:FingerThreeVscrollIcon,action:"Drag",description:"Change FOV"},{icon:FingerThreeDoubleIcon,action:"Double tap",description:"Switch View"}]},{title:"Mouse",controls:[{icon:MouseLeftIcon,action:"Drag",description:"Rotate"},{icon:MouseWheelScrollIcon,action:"Scroll",description:"Zoom"},{icon:MouseWheelIcon,action:"Drag",description:"Pan"},{icon:MouseLeftDoubleIcon,action:"Double click",description:"Perfect View"},{icon:MouseRightIcon,action:"Drag",description:"Change FOV"},{icon:MouseRightDoubleIcon,action:"Double click",description:"Switch View"}]}];return(t,r)=>(openBlock(),createElementBlock("div",{onClick:r[2]||(r[2]=a=>t.$emit("close")),class:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"},[createBaseVNode("div",{onClick:r[1]||(r[1]=withModifiers(()=>{},["stop"])),class:"flex flex-col bg-fgray-1000 rounded-xl max-w-[360px] w-full"},[createBaseVNode("div",_hoisted_1$r,[r[3]||(r[3]=createBaseVNode("div",{class:"ml-2 text-[16px] leading-[100%] text-fgray-300"},"Navigation guide",-1)),createBaseVNode("button",{onClick:r[0]||(r[0]=a=>t.$emit("close")),class:"flex items-center justify-center ml-auto size-8 text-fgray-600"},[createVNode(unref(XSmallIcon))])]),createBaseVNode("div",_hoisted_2$b,[(openBlock(),createElementBlock(Fragment,null,renderList(e,a=>createBaseVNode("div",{key:a.title,class:"flex flex-col items-center justify-center bg-fgray-800 rounded-[8px]"},[createBaseVNode("div",_hoisted_3$9,toDisplayString(a.title),1),createBaseVNode("div",_hoisted_4$8,[(openBlock(!0),createElementBlock(Fragment,null,renderList(a.controls,(s,o)=>(openBlock(),createElementBlock("div",{key:o,class:"flex flex-col items-center pt-3 pb-4 gap-2 min-w-[100px] w-[113px] h-24"},[createBaseVNode("div",_hoisted_5$7,[(openBlock(),createBlock(resolveDynamicComponent(s.icon),{class:"m-auto"}))]),createBaseVNode("div",_hoisted_6$6,[createBaseVNode("span",_hoisted_7$6,toDisplayString(s.action),1),createBaseVNode("span",_hoisted_8$4,toDisplayString(s.description),1)])]))),128))])])),64))])])]))}}),_hoisted_1$q={width:"24",height:"25",viewBox:"0 0 24 25",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$d(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$q,e[0]||(e[0]=[createBaseVNode("path",{d:"M17.0155 10.2849C18.3447 11.0555 18.3447 12.9749 17.0155 13.7455L9.20326 18.2743C7.86993 19.0472 6.2002 18.0852 6.2002 16.544L6.2002 7.48639C6.2002 5.94522 7.86993 4.98317 9.20326 5.75611L17.0155 10.2849Z"},null,-1)]))}const PlayIcon={render:render$d},_hoisted_1$p={width:"24",height:"25",viewBox:"0 0 24 25",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$c(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$p,e[0]||(e[0]=[createBaseVNode("path",{d:"M14 7.01562C14 5.91106 14.8954 5.01562 16 5.01562C17.1046 5.01562 18 5.91106 18 7.01562V17.0156C18 18.1202 17.1046 19.0156 16 19.0156C14.8954 19.0156 14 18.1202 14 17.0156V7.01562Z"},null,-1),createBaseVNode("path",{d:"M6 7.01562C6 5.91106 6.89543 5.01562 8 5.01562C9.10457 5.01562 10 5.91106 10 7.01562V17.0156C10 18.1202 9.10457 19.0156 8 19.0156C6.89543 19.0156 6 18.1202 6 17.0156V7.01562Z"},null,-1)]))}const PauseIcon={render:render$c},_hoisted_1$o={width:"24",height:"25",viewBox:"0 0 24 25",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$b(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$o,e[0]||(e[0]=[createBaseVNode("path",{d:"M8.46973 4.54779C8.76262 4.2549 9.23738 4.2549 9.53027 4.54779L12.5303 7.54779C12.5787 7.59619 12.616 7.65126 12.6484 7.70795C12.664 7.7351 12.6803 7.76182 12.6924 7.79096C12.7131 7.84096 12.7279 7.89266 12.7373 7.94526C12.745 7.98842 12.75 8.03269 12.75 8.07807C12.75 8.12312 12.7449 8.16704 12.7373 8.2099C12.7279 8.26254 12.713 8.31416 12.6924 8.3642C12.6803 8.39337 12.6639 8.42003 12.6484 8.44721C12.616 8.50417 12.5789 8.55974 12.5303 8.60834L9.53027 11.6083C9.23738 11.9012 8.76262 11.9012 8.46973 11.6083C8.17683 11.3154 8.17683 10.8407 8.46973 10.5478L10.1895 8.82807H8C6.20507 8.82807 4.75 10.2831 4.75 12.0781C4.75 13.873 6.20507 15.3281 8 15.3281H16C17.7949 15.3281 19.25 13.873 19.25 12.0781C19.25 10.2831 17.7949 8.82807 16 8.82807C15.5858 8.82807 15.25 8.49228 15.25 8.07807C15.25 7.66385 15.5858 7.32807 16 7.32807C18.6234 7.32807 20.75 9.45472 20.75 12.0781C20.75 14.7014 18.6234 16.8281 16 16.8281H8C5.37665 16.8281 3.25 14.7014 3.25 12.0781C3.25 9.45472 5.37665 7.32807 8 7.32807H10.1895L8.46973 5.60834C8.17683 5.31545 8.17683 4.84069 8.46973 4.54779Z"},null,-1)]))}const LoopIcon={render:render$b},_hoisted_1$n={width:"24",height:"25",viewBox:"0 0 24 25",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$a(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$n,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7.53033 8.54779C7.82322 8.84069 7.82322 9.31556 7.53033 9.60846L5.81066 11.3281L18.1893 11.3281L16.4697 9.60845C16.1768 9.31556 16.1768 8.84069 16.4697 8.54779C16.7626 8.2549 17.2374 8.2549 17.5303 8.5478L20.5303 11.5478C20.671 11.6884 20.75 11.8792 20.75 12.0781C20.75 12.277 20.671 12.4678 20.5303 12.6085L17.5303 15.6085C17.2374 15.9013 16.7626 15.9013 16.4697 15.6085C16.1768 15.3156 16.1768 14.8407 16.4697 14.5478L18.1893 12.8281L5.81066 12.8281L7.53033 14.5478C7.82322 14.8407 7.82322 15.3156 7.53033 15.6085C7.23744 15.9013 6.76256 15.9013 6.46967 15.6085L3.46967 12.6085C3.17678 12.3156 3.17678 11.8407 3.46967 11.5478L6.46967 8.54779C6.76256 8.2549 7.23744 8.2549 7.53033 8.54779Z"},null,-1)]))}const PingPongIcon={render:render$a},_hoisted_1$m={width:"24",height:"25",viewBox:"0 0 24 25",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$9(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$m,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16.0009 8.54779C16.2938 8.2549 16.7687 8.2549 17.0616 8.54779L20.0616 11.5478C20.3545 11.8407 20.3545 12.3156 20.0616 12.6085L17.0616 15.6085C16.7687 15.9013 16.2938 15.9013 16.0009 15.6085C15.708 15.3156 15.708 14.8407 16.0009 14.5478L17.7206 12.8281H4.46875C4.05454 12.8281 3.71875 12.4923 3.71875 12.0781C3.71875 11.6639 4.05454 11.3281 4.46875 11.3281H17.7206L16.0009 9.60846C15.708 9.31556 15.708 8.84069 16.0009 8.54779Z"},null,-1)]))}const OneWayIcon={render:render$9},_hoisted_1$l={class:"relative w-full max-w-[480px] h-[92px] overflow-hidden rounded-[20px]"},_hoisted_2$a={class:"relative flex flex-col items-center justify-center gap-3 p-3 w-full h-full text-[14px] text-fgray-0 select-none"},_hoisted_3$8={class:"flex items-center justify-between w-full h-10"},_hoisted_4$7={class:"relative z-10"},_hoisted_5$6={class:"flex items-center justify-between h-10"},_hoisted_6$5={class:"relative flex items-center justify-between w-full h-4 rounded-[8px] p-[3px] bg-fgray-0 bg-opacity-40"},_hoisted_7$5={class:"absolute top-0 left-0 size-full py-[2.5px] z-20 pointer-events-none"},cursorHalfWidth=20,_sfc_main$c=defineComponent({__name:"WorkBottomFloating",props:{isPlaying:{type:Boolean},isOnTrack:{type:Boolean}},emits:["playAnimation","cancelAnimation","setOnTrack"],setup(n,{emit:e}){const t=e,r=n,a=useNoteStore(),s=ref(0),o=ref(!1);let l=0,d=!0;const c=ref(0);let f=null,_=!1;const m=z=>calcBezierInterpolation(z),g=["1x","2x","0.5x"],y=ref(0),x=()=>{y.value=(y.value+1)%g.length},u=()=>{const z=g[y.value],X=CAMERA.PLAY_TRANSIT_FRAMES/60*1e3;return z==="2x"?X/2:z==="0.5x"?X/.5:X},p=()=>{const z=g[y.value],X=CAMERA.PLAY_STAY_FRAMES/60*1e3;return z==="2x"?X/2:z==="0.5x"?X/.5:X},M=()=>CAMERA.MANUAL_TRANSIT_FRAMES/60*1e3,S=()=>{const z=ae.value.findIndex(Y=>Y>=c.value),X=z-1;if(X<0)return 0;const re=(c.value-ae.value[X])/(ae.value[z]-ae.value[X]);return X+re},b=["loop","pingpong","oneway"],A=ref(0),T=()=>{A.value=(A.value+1)%b.length,!d&&E.value!=="pingpong"&&(d=!0)},E=computed(()=>b[A.value]),B=()=>{r.isPlaying?t("cancelAnimation"):t("playAnimation")},P=()=>{t("cancelAnimation")},C=()=>{if(!r.isPlaying)return;const z=ae.value[l];if(Math.abs(c.value-z)<1){I(),C();return}const X=N(l);D(z,u()),Sequence.shared.animateBetweenIndex(X,l,u(),()=>{I(),f=window.setTimeout(()=>{C()},p())})},I=()=>{const z=ae.value.length;if(E.value==="loop")l=(l+1)%z;else if(E.value==="oneway"){if(l>=z-1){t("cancelAnimation");return}l+=1}else E.value==="pingpong"&&(d?l>=z-1?(d=!1,l=z-2):l++:l<=0?(d=!0,l=1):l--)},N=z=>{const X=ae.value.length;let re=z;return E.value==="loop"?(re=re-1,re<0&&(re=X-1)):E.value==="oneway"?re=re-1:E.value==="pingpong"&&(d?(re=re-1,re<0&&(re=X-1)):(re=re+1,re>X-1&&(re=0))),re},D=(z,X)=>{_=!1;const re=c.value,Y=performance.now(),de=z===ae.value[0]&&re===ae.value[ae.value.length-1],fe=Te=>{if(_)return;const O=Te-Y,Ae=Math.min(Math.max(0,O/X),1),Fe=m(Ae);c.value=de?re:re+(z-re)*Fe,Ae<1?requestAnimationFrame(fe):c.value=z};requestAnimationFrame(fe)},V=()=>{P();const z=ae.value.findIndex(X=>X>c.value);z!==-1&&(l=z,c.value=ae.value[l]),t("setOnTrack"),Sequence.shared.animateToIndex(l)},R=()=>{P();const z=[...ae.value].reverse().find(X=>X<c.value);z!==void 0&&(l=ae.value.indexOf(z),c.value=z),t("setOnTrack"),Sequence.shared.animateToIndex(l)},F=ref(!1),$=z=>{z.preventDefault(),F.value=!0,_=!0,t("setOnTrack"),r.isPlaying&&t("cancelAnimation"),window.addEventListener("pointermove",W),window.addEventListener("pointerup",J)},W=z=>{if(!F.value||!j.value)return;const{clientX:X}=z,{left:re,width:Y}=j.value.getBoundingClientRect(),de=Math.max(0,Math.min(X-re,Y)),fe=Math.max(cursorHalfWidth,Math.min(de,Y-cursorHalfWidth));c.value=fe;const Te=S();Sequence.shared.moveToHandlePosition(Te)},J=()=>{F.value=!1;const z=c.value,X=ae.value;if(d){const re=X.findIndex(Y=>Y>z);l=re!==-1?re:X.length-1}else{const Y=[...X].reverse().find(de=>de<z);l=Y!==void 0?X.indexOf(Y):0}window.removeEventListener("pointermove",W),window.removeEventListener("pointerup",J)},j=ref(null),ie=ref(0),ae=computed(()=>{const z=s.value,X=ie.value-cursorHalfWidth*2;if(z<2||X<=0)return[];const re=X/(z-1);return Array.from({length:z},(Y,de)=>cursorHalfWidth+re*de)}),he=()=>{j.value&&(ie.value=j.value.offsetWidth)};return watch(()=>a.shots.length,z=>{z<=1||(s.value=z,o.value=!0,he(),nextTick(()=>{const X=ae.value[0];c.value=X!==void 0?X:0,l=0}))},{immediate:!0}),watch(()=>r.isPlaying,z=>{if(z){const X=ae.value[l];Math.abs(c.value-X)<1&&r.isOnTrack?(C(),r.isOnTrack||t("setOnTrack")):(D(X,M()),Sequence.shared.animateToIndex(l,M(),()=>{r.isOnTrack||t("setOnTrack"),f=window.setTimeout(()=>{C()},p())}))}else _=!0,f!==null&&(clearTimeout(f),f=null),Sequence.shared.cancelAnimation()},{immediate:!0}),onMounted(()=>{he(),window.addEventListener("resize",he),nextTick(()=>{const z=ae.value[0];c.value=z!==void 0?z:0,l=0})}),onBeforeUnmount(()=>{_=!0,f!==null&&(clearTimeout(f),f=null),window.removeEventListener("resize",he)}),(z,X)=>(openBlock(),createElementBlock("div",{class:normalizeClass(["absolute flex items-center justify-center w-full px-4 select-none bottom-4",{visible:o.value,invisible:!o.value}])},[createBaseVNode("div",_hoisted_1$l,[X[5]||(X[5]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-50 mix-blend-multiply pointer-events-none rounded-[20px] force-gpu-accel"},null,-1)),createBaseVNode("div",_hoisted_2$a,[createBaseVNode("div",_hoisted_3$8,[createBaseVNode("button",{onClick:x,class:"group relative flex items-center justify-center size-10 rounded-[12px] overflow-hidden"},[X[0]||(X[0]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-0 mix-blend-multiply group-hover:bg-opacity-50 pointer-events-none rounded-[12px] force-gpu-accel"},null,-1)),createBaseVNode("span",_hoisted_4$7,toDisplayString(g[y.value]),1)]),createBaseVNode("div",_hoisted_5$6,[createBaseVNode("button",{onClick:R,class:"group relative flex items-center justify-center size-10 rounded-[12px] overflow-hidden"},[X[1]||(X[1]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-0 mix-blend-multiply group-hover:bg-opacity-50 pointer-events-none rounded-[12px] translate3ds"},null,-1)),createVNode(unref(ChevronLeftIcon),{class:"relative z-10 m-auto"})]),createBaseVNode("button",{onClick:B,class:"group relative flex items-center justify-center size-10 rounded-[12px] overflow-hidden"},[X[2]||(X[2]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-0 mix-blend-multiply group-hover:bg-opacity-50 pointer-events-none rounded-[12px] force-gpu-accel"},null,-1)),z.isPlaying?(openBlock(),createBlock(unref(PauseIcon),{key:1,class:"relative z-10 m-auto"})):(openBlock(),createBlock(unref(PlayIcon),{key:0,class:"relative z-10 m-auto"}))]),createBaseVNode("button",{onClick:V,class:"group relative flex items-center justify-center size-10 rounded-[12px] overflow-hidden"},[X[3]||(X[3]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-0 mix-blend-multiply group-hover:bg-opacity-50 pointer-events-none rounded-[12px] force-gpu-accel"},null,-1)),createVNode(unref(ChevronRightIcon),{class:"relative z-10 m-auto"})])]),createBaseVNode("button",{onClick:T,class:"group relative flex items-center justify-center size-10 rounded-[12px] overflow-hidden"},[X[4]||(X[4]=createBaseVNode("div",{class:"absolute inset-0 bg-fgray-500 bg-opacity-0 mix-blend-multiply group-hover:bg-opacity-50 pointer-events-none rounded-[12px] force-gpu-accel"},null,-1)),A.value===0?(openBlock(),createBlock(unref(LoopIcon),{key:0,class:"relative z-10 m-auto"})):A.value===1?(openBlock(),createBlock(unref(PingPongIcon),{key:1,class:"relative z-10 m-auto"})):(openBlock(),createBlock(unref(OneWayIcon),{key:2,class:"relative z-10 m-auto"}))])]),createBaseVNode("div",_hoisted_6$5,[createBaseVNode("div",{ref_key:"timelineRef",ref:j,class:"relative w-full h-full"},[createBaseVNode("div",{class:"absolute top-0 w-10 h-2.5 bg-white rounded-full cursor-pointer z-10",style:normalizeStyle({left:`${c.value-cursorHalfWidth}px`,opacity:`${r.isOnTrack?"1.0":"0.4"}`}),onPointerdown:$},null,36),createBaseVNode("div",_hoisted_7$5,[(openBlock(!0),createElementBlock(Fragment,null,renderList(ae.value,(re,Y)=>(openBlock(),createElementBlock("div",{key:Y,class:"absolute w-[2px] h-[5px] rounded-full bg-fgray-1100 bg-opacity-20",style:normalizeStyle({left:`${re}px`})},null,4))),128))])],512)])])])],2))}}),WorkBottomFloating=_export_sfc(_sfc_main$c,[["__scopeId","data-v-cf316b70"]]),_hoisted_1$k={class:"flex items-center gap-1 size-full"},_hoisted_2$9={class:"flex items-center flex-grow h-8 gap-2 overflow-hidden"},_hoisted_3$7={class:"font-[500] text-[14px] leading-[140%] text-fgray-300 truncate"},_hoisted_4$6={key:0,class:"shrink-0 size-8 rounded-[8px] bg-fgray-900"},_sfc_main$b=defineComponent({__name:"WorkTitleBar",props:{work:{}},setup(n){return(e,t)=>{const r=resolveComponent("RouterLink");return openBlock(),createElementBlock("div",_hoisted_1$k,[createVNode(r,{to:`/${e.work.author.handle}`,class:"p-1 shrink-0 size-10"},{default:withCtx(()=>[createVNode(_sfc_main$i,{image:e.work.author.image,class:"size-full"},null,8,["image"])]),_:1},8,["to"]),createBaseVNode("div",_hoisted_2$9,[createBaseVNode("div",_hoisted_3$7,toDisplayString(e.work.title),1),e.work.wip?(openBlock(),createElementBlock("button",_hoisted_4$6,[createVNode(unref(HourglassIcon),{class:"mx-auto text-fyellow-75"})])):createCommentVNode("",!0)])])}}}),_hoisted_1$j={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$8(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$j,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M16.5303 9.71967C16.2374 9.42678 15.7626 9.42678 15.4697 9.71967L12 13.1893L8.53033 9.71967C8.23744 9.42678 7.76256 9.42678 7.46967 9.71967C7.17678 10.0126 7.17678 10.4874 7.46967 10.7803L11.4697 14.7803C11.7626 15.0732 12.2374 15.0732 12.5303 14.7803L16.5303 10.7803C16.8232 10.4874 16.8232 10.0126 16.5303 9.71967Z"},null,-1)]))}const ChevronDownSmallIcon={render:render$8},_hoisted_1$i={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$7(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$i,e[0]||(e[0]=[createBaseVNode("path",{d:"M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"},null,-1),createBaseVNode("path",{d:"M7.5 12C7.5 12.8284 6.82843 13.5 6 13.5C5.17157 13.5 4.5 12.8284 4.5 12C4.5 11.1716 5.17157 10.5 6 10.5C6.82843 10.5 7.5 11.1716 7.5 12Z"},null,-1),createBaseVNode("path",{d:"M19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12Z"},null,-1)]))}const DotsIcon={render:render$7},_hoisted_1$h={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$6(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$h,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.37109 3.0752C5.92338 3.0752 6.37109 3.52291 6.37109 4.0752V4.37207H18.6281C18.9524 4.37207 19.2565 4.52927 19.444 4.79379C19.6315 5.05831 19.6791 5.39732 19.5717 5.70325L18.0957 9.9084L19.5717 14.1135C19.6791 14.4195 19.6315 14.7585 19.444 15.023C19.2565 15.2875 18.9524 15.4447 18.6281 15.4447H6.37109L6.37109 19.9244C6.37109 20.4767 5.92338 20.9244 5.37109 20.9244C4.81881 20.9244 4.37109 20.4767 4.37109 19.9244L4.37109 4.0752C4.37109 3.52291 4.81881 3.0752 5.37109 3.0752ZM6.37109 13.4447H17.2173L16.0924 10.2396C16.0171 10.0252 16.0171 9.79159 16.0924 9.57722L17.2173 6.37207H6.37109L6.37109 13.4447Z"},null,-1)]))}const FlagIcon={render:render$6},_hoisted_1$g={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$5(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$g,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M21.161 4.97176L19.0396 2.85044C18.3562 2.16702 17.2482 2.16702 16.5648 2.85044L4.49385 14.9214C4.25946 15.1557 4.09646 15.4519 4.02382 15.7753L3.4127 18.4964C3.132 19.7462 4.24508 20.8642 5.49613 20.589L8.23026 19.9876C8.55656 19.9158 8.85549 19.7521 9.09173 19.5159L21.161 7.44664C21.8444 6.76322 21.8444 5.65518 21.161 4.97176ZM17.979 3.9111L20.1003 6.03242C20.1979 6.13005 20.1979 6.28835 20.1003 6.38598L18.5394 7.94684L16.0646 5.47196L17.6254 3.9111C17.7231 3.81347 17.8813 3.81347 17.979 3.9111ZM15.0039 6.53262L5.55451 15.982C5.52103 16.0155 5.49774 16.0578 5.48736 16.104L4.87624 18.8251C4.83614 19.0036 4.99515 19.1633 5.17388 19.124L7.90801 18.5226C7.95462 18.5123 7.99732 18.4889 8.03107 18.4552L17.4788 9.0075L15.0039 6.53262Z"},null,-1)]))}const SettingsEditIcon={render:render$5},_hoisted_1$f={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$4(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$f,e[0]||(e[0]=[createBaseVNode("path",{d:"M20 5.00015L4 5.00015C3.73478 5.00015 3.48043 5.10551 3.29289 5.29304C3.10536 5.48058 3 5.73493 3 6.00015C3 6.26537 3.10536 6.51972 3.29289 6.70726C3.48043 6.89479 3.73478 7.00015 4 7.00015H5L5 20.0001C5 20.5306 5.21071 21.0393 5.58579 21.4144C5.96086 21.7894 6.46957 22.0001 7 22.0001H17C17.5304 22.0001 18.0391 21.7894 18.4142 21.4144C18.7893 21.0393 19 20.5306 19 20.0001V7.00015H20C20.2652 7.00015 20.5196 6.89479 20.7071 6.70726C20.8946 6.51972 21 6.26537 21 6.00015C21 5.73493 20.8946 5.48058 20.7071 5.29304C20.5196 5.10551 20.2652 5.00015 20 5.00015ZM17 20.0001H7L7 7.00015L17 7.00015V20.0001Z"},null,-1),createBaseVNode("path",{d:"M15.9999 3C15.9999 2.73478 15.8946 2.48043 15.707 2.29289C15.5195 2.10536 15.2651 2 14.9999 2L8.99992 2C8.73471 2 8.48035 2.10536 8.29282 2.29289C8.10528 2.48043 7.99992 2.73478 7.99992 3V4L15.9999 4V3Z"},null,-1),createBaseVNode("path",{d:"M9.99981 18.9998C10.265 18.9998 10.5194 18.8945 10.7069 18.7069C10.8945 18.5194 10.9998 18.265 10.9998 17.9998V8.99981C10.9998 8.73459 10.8945 8.48024 10.7069 8.2927C10.5194 8.10517 10.265 7.99981 9.99981 7.99981C9.73459 7.99981 9.48024 8.10517 9.2927 8.2927C9.10517 8.48024 8.99981 8.73459 8.99981 8.99981V17.9998C8.99981 18.265 9.10517 18.5194 9.2927 18.7069C9.48024 18.8945 9.73459 18.9998 9.99981 18.9998Z"},null,-1),createBaseVNode("path",{d:"M13.9998 18.9998C14.2651 18.9998 14.5194 18.8945 14.707 18.7069C14.8945 18.5194 14.9998 18.265 14.9998 17.9998L14.9998 8.99981C14.9998 8.73459 14.8945 8.48024 14.707 8.2927C14.5194 8.10517 14.2651 7.99981 13.9998 7.99981C13.7346 7.99981 13.4803 8.10517 13.2927 8.2927C13.1052 8.48024 12.9998 8.73459 12.9998 8.99981L12.9998 17.9998C12.9998 18.265 13.1052 18.5194 13.2927 18.7069C13.4803 18.8945 13.7346 18.9998 13.9998 18.9998Z"},null,-1)]))}const TrashcanIcon={render:render$4},_hoisted_1$e={key:0,class:"relative flex items-center w-[16px] h-[16px] mr-0.5"},_sfc_main$a=defineComponent({__name:"WorkTagItem",props:{label:{},icon:{},variant:{},noLink:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},focused:{type:Boolean,default:!1}},emits:["remove"],setup(n){return(e,t)=>(openBlock(),createBlock(resolveDynamicComponent(e.editable||e.noLink?"div":unref(RouterLink)),{to:e.editable?void 0:`/?q=${encodeURIComponent(e.label)}`,title:e.label,class:normalizeClass(["inline-flex items-center gap-[2px] max-w-full h-[28px] pl-[10px] py-[2px] rounded-full bg-fgray-900",e.editable?"pr-0.5":"pr-2.5",e.variant==="yellow"?"bg-fyellow-75 bg-opacity-10":""])},{default:withCtx(()=>[e.icon?(openBlock(),createElementBlock("div",_hoisted_1$e,[(openBlock(),createBlock(resolveDynamicComponent(e.icon),{class:normalizeClass(["absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2",e.variant==="yellow"?"text-fyellow-75":"text-fgray-500"])},null,8,["class"]))])):createCommentVNode("",!0),createBaseVNode("div",{class:normalizeClass(["flex-1 min-w-0 truncate text-[14px] mt-[1px]",e.focused?"text-fgray-0":e.variant==="yellow"?"text-fyellow-75":"text-fgray-500"])},toDisplayString(e.label),3),e.editable?(openBlock(),createElementBlock("button",{key:1,onMousedown:t[0]||(t[0]=withModifiers(()=>{},["prevent"])),onClick:t[1]||(t[1]=r=>e.$emit("remove")),class:"relative my-auto shrink-0 w-[24px] h-[24px] text-fgray-750"},[createVNode(unref(XSmallIcon))],32)):createCommentVNode("",!0)]),_:1},8,["to","title","class"]))}}),_hoisted_1$d={class:"flex flex-col size-full bg-fgray-1050"},_hoisted_2$8={class:"flex flex-col w-full p-2"},_hoisted_3$6={class:"flex gap-3 p-2"},_hoisted_4$5={class:"px-1 py-0.5 font-[500] text-[16px] leading-[120%] text-fgray-300 break-words"},_hoisted_5$5={class:"p-1 size-10 shrink-0"},_hoisted_6$4={class:"pr-6 font-[500] text-[14px] leading-[120%] text-fgray-500 break-words"},_hoisted_7$4={class:"flex-1 px-2 pt-2 pb-16 overflow-y-scroll size-full overscroll-y-contain"},_hoisted_8$3={class:"flex flex-col w-full gap-4"},_hoisted_9$3={class:"flex flex-col gap-2 p-2 bg-fgray-1000 rounded-xl"},_hoisted_10$3={class:"flex items-center w-full h-8"},_hoisted_11$3={class:"flex items-center w-full h-8 p-1"},_hoisted_12$2={class:"flex-1 text-[12px] leading-[120%] text-fgray-700"},_hoisted_13$2={key:0,class:"flex flex-col gap-1 absolute right-0 top-9 w-[198px] p-1 rounded-xl bg-fgray-1050 outline outline-[1px] outline-fgray-800"},_hoisted_14$1={class:"flex items-center w-full p-1"},_hoisted_15$1=["innerHTML"],_hoisted_16$1={class:"flex flex-wrap w-full gap-2 p-1"},_hoisted_17$1={class:"flex items-center gap-1 w-full pl-2 text-[14px] leading-[120%] text-fgray-700"},_hoisted_18$1={href:"https://creativecommons.org/share-your-work/cclicenses/",target:"_blank",rel:"noopener noreferrer",class:"flex items-center shrink-0"},_hoisted_19$1={class:"underline"},_sfc_main$9=defineComponent({__name:"WorkDetail",props:{modelValue:{required:!0},modelModifiers:{}},emits:mergeModels(["info","edit"],["update:modelValue"]),setup(n){const e=useRouter(),t=useUserStore(),r=useModel(n,"modelValue"),a=computed(()=>t.user&&(t.user.handle==r.value.author.handle||["sho","won"].includes(t.user.handle))),s=computed(()=>dayjs().to(dayjs.unix(r.value.inserted_time))),o=computed(()=>r.value.tags.map(u=>({label:u}))??[]),l={"CC BY":"CC BY","CC BY-SA":"CC BY-SA","CC BY-ND":"CC BY-ND","CC BY-NC":"CC BY-NC","CC BY-NC-SA":"CC BY-NC-SA","CC BY-NC-ND":"CC BY-NC-ND",all:"All rights reserved by the author.",default:"All rights reserved by the author."},d=computed(()=>l[r.value.license]||l.default),c=computed(()=>r.value.license.startsWith("CC")?"cc":r.value.license==="all"?"all":"other"),f=ref(null),_=ref(!1),m=()=>{_.value=!_.value},g=u=>{_.value&&f.value&&!f.value.contains(u.target)&&(_.value=!1)},y=ref(!1),x=()=>{y.value||!confirm("Are you sure you want to delete this?")||(y.value=!0,$axios.delete(`/work/${r.value.wid}`).then(()=>{alert("Successfully deleted."),e.back()}).catch(u=>{var M,S,b;const p=(M=u.response)==null?void 0:M.status;useErrorStore().showError(((b=(S=u==null?void 0:u.response)==null?void 0:S.data)==null?void 0:b.error)||"Something went wrong.",p),console.error("Failed to delete file:",u)}).finally(()=>{y.value=!1}))};return onMounted(()=>{window.addEventListener("pointerdown",g)}),onBeforeUnmount(()=>{window.removeEventListener("pointerdown",g)}),(u,p)=>{const M=resolveComponent("RouterLink");return openBlock(),createElementBlock("div",_hoisted_1$d,[createBaseVNode("div",_hoisted_2$8,[createBaseVNode("div",_hoisted_3$6,[createBaseVNode("div",_hoisted_4$5,toDisplayString(r.value.title),1),createBaseVNode("button",{onClick:p[0]||(p[0]=S=>u.$emit("info")),class:"ml-auto rounded-full size-6 bg-fgray-900"},[createVNode(unref(ChevronDownSmallIcon),{class:"mx-auto text-fgray-500"})])]),createVNode(M,{to:`/${r.value.author.handle}`,class:"flex items-center gap-1 pl-2"},{default:withCtx(()=>[createBaseVNode("div",_hoisted_5$5,[createVNode(_sfc_main$i,{image:r.value.author.image,class:"size-full"},null,8,["image"])]),createBaseVNode("div",_hoisted_6$4,toDisplayString(r.value.author.handle),1)]),_:1},8,["to"])]),createBaseVNode("div",_hoisted_7$4,[createBaseVNode("div",_hoisted_8$3,[createBaseVNode("div",_hoisted_9$3,[createBaseVNode("div",_hoisted_10$3,[createBaseVNode("div",_hoisted_11$3,[createBaseVNode("div",_hoisted_12$2,toDisplayString(s.value),1)]),createBaseVNode("div",{class:"relative",ref_key:"menuRef",ref:f},[createBaseVNode("button",{onClick:m,onPointerup:p[1]||(p[1]=S=>S.currentTarget.blur()),class:normalizeClass(["flex items-center p-1 rounded-lg size-8 hover:bg-fgray-800 active:bg-fgray-800",_.value?"bg-fgray-800":"bg-transparent"])},[createVNode(unref(DotsIcon),{class:"text-fgray-600"})],34),_.value?(openBlock(),createElementBlock("div",_hoisted_13$2,[createBaseVNode("button",{onPointerup:p[2]||(p[2]=S=>S.currentTarget.blur()),class:"flex gap-2 items-center w-full h-11 p-2 rounded-[8px] hover:bg-fgray-1000 active:bg-fgray-1000"},[createVNode(unref(FlagIcon),{class:"text-fgray-400"}),p[5]||(p[5]=createBaseVNode("div",{class:"text-[14px] leading-[120%] text-fgray-400"},toDisplayString("Report"),-1))],32),a.value?(openBlock(),createElementBlock(Fragment,{key:0},[createBaseVNode("button",{onClick:p[3]||(p[3]=S=>u.$emit("edit")),class:"flex gap-2 items-center w-full h-11 p-2 rounded-[8px] hover:bg-fgray-1000 active:bg-fgray-1000"},[createVNode(unref(SettingsEditIcon),{class:"text-fgray-400"}),p[6]||(p[6]=createBaseVNode("div",{class:"text-[14px] leading-[120%] text-fgray-400"},"Edit details",-1))]),createBaseVNode("button",{onClick:x,onPointerup:p[4]||(p[4]=S=>S.currentTarget.blur()),class:"flex gap-2 items-center w-full h-11 p-2 rounded-[8px] hover:bg-fgray-1000 active:bg-fgray-1000"},[createVNode(unref(TrashcanIcon),{class:"text-fred-100"}),p[7]||(p[7]=createBaseVNode("div",{class:"text-[14px] leading-[120%] text-fred-100"},"Remove from gallery",-1))],32)],64)):createCommentVNode("",!0)])):createCommentVNode("",!0)],512)]),createBaseVNode("div",_hoisted_14$1,[createBaseVNode("div",{class:"flex-1 text-[14px] leading-[140%] text-fgray-500 break-all",innerHTML:unref(escape)(r.value.description,!0)},null,8,_hoisted_15$1)]),createBaseVNode("div",_hoisted_16$1,[r.value.wip?(openBlock(),createBlock(_sfc_main$a,{key:0,label:"Work-in-progress",icon:unref(HourglassSmallIcon),variant:"yellow","no-link":""},null,8,["icon"])):createCommentVNode("",!0),(openBlock(!0),createElementBlock(Fragment,null,renderList(o.value,(S,b)=>(openBlock(),createBlock(_sfc_main$a,{key:b,label:S.label,icon:S.icon,variant:S.variant},null,8,["label","icon","variant"]))),128))])]),createBaseVNode("div",_hoisted_17$1,[c.value==="cc"?(openBlock(),createElementBlock(Fragment,{key:0},[p[8]||(p[8]=createTextVNode(toDisplayString("Licensed under")+" ")),createBaseVNode("a",_hoisted_18$1,[createBaseVNode("div",_hoisted_19$1,toDisplayString(d.value),1)])],64)):c.value==="all"?(openBlock(),createElementBlock(Fragment,{key:1},[createTextVNode(toDisplayString(d.value),1)],64)):(openBlock(),createElementBlock(Fragment,{key:2},[createTextVNode(toDisplayString("Licensed under")+" "+toDisplayString(d.value),1)],64))])])])])}}}),_hoisted_1$c={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$3(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$c,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M20.7105 11.2964C21.0965 11.6861 21.0965 12.3139 20.7105 12.7036L13.7752 19.7053C13.386 20.0982 12.7548 20.0982 12.3656 19.7053C11.9763 19.3123 11.9763 18.6751 12.3656 18.2822L17.5914 13.0063L4 13.0063L4 10.9937L17.5914 10.9937L12.3656 5.71784C11.9763 5.32486 11.9763 4.68772 12.3656 4.29474C12.7548 3.90176 13.386 3.90176 13.7752 4.29474L20.7105 11.2964Z"},null,-1)]))}const ArrowRightLineIcon={render:render$3};var relativeTime$1={exports:{}};(function(n,e){(function(t,r){n.exports=r()})(commonjsGlobal,function(){return function(t,r,a){t=t||{};var s=r.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function l(c,f,_,m){return s.fromToBase(c,f,_,m)}a.en.relativeTime=o,s.fromToBase=function(c,f,_,m,g){for(var y,x,u,p=_.$locale().relativeTime||o,M=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],S=M.length,b=0;b<S;b+=1){var A=M[b];A.d&&(y=m?a(c).diff(_,A.d,!0):_.diff(c,A.d,!0));var T=(t.rounding||Math.round)(Math.abs(y));if(u=y>0,T<=A.r||!A.r){T<=1&&b>0&&(A=M[b-1]);var E=p[A.l];g&&(T=g(""+T)),x=typeof E=="string"?E.replace("%d",T):E(T,f,A.l,u);break}}if(f)return x;var B=u?p.future:p.past;return typeof B=="function"?B(x):B.replace("%s",x)},s.to=function(c,f){return l(c,f,this,!0)},s.from=function(c,f){return l(c,f,this)};var d=function(c){return c.$u?a.utc():a()};s.toNow=function(c){return this.to(d(this),c)},s.fromNow=function(c){return this.from(d(this),c)}}})})(relativeTime$1);var relativeTimeExports=relativeTime$1.exports;const relativeTime=getDefaultExportFromCjs(relativeTimeExports);var updateLocale$1={exports:{}};(function(n,e){(function(t,r){n.exports=r()})(commonjsGlobal,function(){return function(t,r,a){a.updateLocale=function(s,o){var l=a.Ls[s];if(l)return(o?Object.keys(o):[]).forEach(function(d){l[d]=o[d]}),l}}})})(updateLocale$1);var updateLocaleExports=updateLocale$1.exports;const updateLocale=getDefaultExportFromCjs(updateLocaleExports);dayjs.extend(updateLocale);dayjs.extend(relativeTime);dayjs.updateLocale("en",{relativeTime:{future:n=>n==="Just now"?n:`in ${n}`,past:n=>n==="Just now"?n:`${n} ago`,s:"Just now",ss:"Just now",m:"1 minute",mm:"%d minutes",h:"1 hour",hh:"%d hours",d:"1 day",dd:n=>{if(n>=7){const e=Math.floor(n/7);return`${e} week${e>1?"s":""}`}return`${n} days`},M:"1 month",MM:"%d months",y:"1 year",yy:"%d years"}});const _hoisted_1$b={class:"flex flex-col w-full min-w-0 gap-1 p-1"},_hoisted_2$7={class:"flex items-start w-full gap-1"},_hoisted_3$5={class:"flex flex-col w-full h-full min-w-0 gap-1"},_hoisted_4$4={class:"flex items-baseline w-full gap-1"},_hoisted_5$4={class:"shrink-0 whitespace-nowrap text-[12px] leading-[140%] text-fgray-600"},_hoisted_6$3={class:"text-[14px] leading-[120%] text-fgray-400 whitespace-pre-wrap break-words"},_hoisted_7$3=["innerHTML"],_hoisted_8$2={key:0,class:"text-fgray-400"},_hoisted_9$2={class:"flex gap-3 text-fgray-600"},_hoisted_10$2={class:"text-[12px] leading-[140%]"},_hoisted_11$2={class:"relative size-3"},_sfc_main$8=defineComponent({__name:"WorkCommentContent",props:{wid:{},comment:{},showReply:{type:Boolean}},emits:["deleted","mention","reply"],setup(n,{emit:e}){const t=useUserStore(),r=e,a=n,s=computed(()=>dayjs().to(dayjs.unix(a.comment.inserted_time))),o=ref(!1),l=()=>o.value=!o.value,d=computed(()=>a.comment.content?a.comment.content.length>140:!1),c=computed(()=>{var b;return((b=a.comment.content)==null?void 0:b.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/@[a-zA-Z0-9._-]+/g,A=>`<span class="text-fgreen-100">${A}</span>`))??""}),f=computed(()=>{var b;return((b=a.comment.content)==null?void 0:b.slice(0,140).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/@[a-zA-Z0-9._-]+/g,A=>`<span class="text-fgreen-100">${A}</span>`))??""}),_=ref(!1),m=ref(!1),g=ref(null),y=ref(null),x=()=>{_.value=!_.value};watch(_,async S=>{S&&(await nextTick(),u())});const u=()=>{const S=g.value,b=y.value;if(!S||!b)return;const A=S.getBoundingClientRect(),T=b.getBoundingClientRect(),E=window.innerHeight-A.bottom,B=A.top,P=(T.height||160)+58;m.value=E<P&&B>E},p=()=>{r("deleted")},M=S=>{_.value&&g.value&&!g.value.contains(S.target)&&(_.value=!1)};return onMounted(()=>{window.addEventListener("pointerdown",M)}),onBeforeUnmount(()=>{window.removeEventListener("pointerdown",M)}),(S,b)=>{var T;const A=resolveComponent("RouterLink");return openBlock(),createElementBlock("div",{class:normalizeClass(["flex items-start w-full gap-1",[]])},[createVNode(A,{to:`/${S.comment.author.handle}`,class:"p-1 size-10 shrink-0"},{default:withCtx(()=>[createVNode(_sfc_main$i,{image:S.comment.author.image,class:"size-full"},null,8,["image"])]),_:1},8,["to"]),createBaseVNode("div",_hoisted_1$b,[createBaseVNode("div",_hoisted_2$7,[createBaseVNode("div",_hoisted_3$5,[createBaseVNode("div",_hoisted_4$4,[createVNode(A,{to:`/${S.comment.author.handle}`,class:"block truncate text-[14px] leading-[120%] text-fgray-300"},{default:withCtx(()=>[createTextVNode(toDisplayString(S.comment.author.handle),1)]),_:1},8,["to"]),createBaseVNode("div",_hoisted_5$4,toDisplayString(s.value),1)]),createBaseVNode("div",_hoisted_6$3,[createBaseVNode("span",{innerHTML:o.value?c.value:f.value},null,8,_hoisted_7$3),!o.value&&d.value?(openBlock(),createElementBlock("span",_hoisted_8$2,"...")):createCommentVNode("",!0),d.value&&!o.value?(openBlock(),createElementBlock("button",{key:1,onClick:l,class:"inline text-fgray-300 text-[12px] leading-[140%] ml-1"}," More ")):createCommentVNode("",!0)])]),createBaseVNode("div",{class:"relative",ref_key:"menuRef",ref:g},[createBaseVNode("button",{onClick:x,onPointerup:b[0]||(b[0]=E=>E.currentTarget.blur()),class:normalizeClass(["flex items-center p-1 rounded-lg size-8 hover:bg-fgray-800 active:bg-fgray-800",_.value?"bg-fgray-800":"bg-transparent"])},[createVNode(unref(DotsIcon),{class:"text-fgray-600"})],34),_.value?(openBlock(),createElementBlock("div",{key:0,ref_key:"dropdownRef",ref:y,class:normalizeClass(["flex flex-col gap-1 absolute right-0 w-[102px] p-1 rounded-xl bg-fgray-1050 outline outline-[1px] outline-fgray-800",m.value?"bottom-9":"top-9"])},[createBaseVNode("button",{onClick:E=>"",onPointerup:b[1]||(b[1]=E=>E.currentTarget.blur()),class:"flex gap-2 items-center justify-start w-full h-11 p-2 rounded-[8px] bg-fgray-1050 hover:bg-fgray-1000 active:bg-fgray-1000 text-fgray-400 z-10"},[createVNode(unref(FlagIcon)),b[5]||(b[5]=createBaseVNode("div",{class:"text-[14px] leading-[120%]"},toDisplayString("Report"),-1))],32),S.comment.author.handle===((T=unref(t).user)==null?void 0:T.handle)?(openBlock(),createElementBlock("button",{key:0,onClick:p,onPointerup:b[2]||(b[2]=E=>E.currentTarget.blur()),class:"flex gap-2 items-center justify-start w-full h-11 p-2 rounded-[8px] bg-fgray-1050 hover:bg-fgray-1000 active:bg-fgray-1000 text-fred-100 z-10"},[createVNode(unref(TrashcanIcon)),b[6]||(b[6]=createBaseVNode("div",{class:"text-[14px] leading-[120%]"},toDisplayString("Delete"),-1))],32)):createCommentVNode("",!0)],2)):createCommentVNode("",!0)],512)]),createBaseVNode("div",_hoisted_9$2,[createBaseVNode("button",{class:"text-[12px] leading-[140%]",onClick:b[3]||(b[3]=E=>S.$emit("mention"))},toDisplayString("Reply")),"reply_count"in S.comment&&S.comment.reply_count?(openBlock(),createElementBlock("button",{key:0,onClick:b[4]||(b[4]=E=>S.$emit("reply")),class:"flex items-center gap-1"},[createBaseVNode("div",_hoisted_10$2,toDisplayString(S.comment.reply_count===1?"1 reply":`${S.comment.reply_count} replies`),1),createBaseVNode("div",_hoisted_11$2,[createVNode(unref(ChevronDownSmallIcon),{class:normalizeClass(["text-fgray-600",["absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",S.showReply?"rotate-180":""]])},null,8,["class"])])])):createCommentVNode("",!0)])])])}}}),_hoisted_1$a={class:"flex flex-col gap-4"},_hoisted_2$6={key:0,class:"flex flex-col gap-2"},_sfc_main$7=defineComponent({__name:"WorkCommentItem",props:{wid:{},comment:{},loadReplies:{type:Function},highlight:{type:Boolean},highlightReplyId:{}},emits:["deleted","mention"],setup(n){const e=n,t=ref(!1),r=ref(!1);watch([()=>e.highlightReplyId,()=>e.highlight],async([s,o])=>{if(s&&o){if(!e.comment.replies&&e.comment.reply_count>0){t.value=!0;try{await e.loadReplies(e.comment)}finally{t.value=!1}}r.value=!0}},{immediate:!0}),watch(()=>e.comment.replies,s=>{e.highlightReplyId&&s&&e.highlight&&(r.value=!0)});const a=async()=>{if(r.value){r.value=!1;return}if(!(t.value||e.comment.reply_count==0)){if(e.comment.replies!==void 0){r.value=!0;return}t.value=!0,await e.loadReplies(e.comment),t.value=!1,r.value=!0}};return watch(()=>e.comment.replies,()=>{var s;(s=e.comment.replies)!=null&&s.length&&!r.value&&(r.value=!0)},{deep:!0}),(s,o)=>{var l;return openBlock(),createElementBlock("div",_hoisted_1$a,[createVNode(_sfc_main$8,{wid:s.wid,comment:s.comment,onDeleted:o[0]||(o[0]=d=>s.$emit("deleted",s.comment)),class:normalizeClass({"bg-fgreen-50/10 rounded-lg p-3":s.highlight&&!s.highlightReplyId}),onMention:o[1]||(o[1]=d=>s.$emit("mention",s.comment.author.handle,s.comment.idx)),onReply:a},null,8,["wid","comment","class"]),r.value&&((l=s.comment.replies)!=null&&l.length)?(openBlock(),createElementBlock("div",_hoisted_2$6,[(openBlock(!0),createElementBlock(Fragment,null,renderList(s.comment.replies,d=>(openBlock(),createBlock(_sfc_main$8,{key:d.idx,class:normalizeClass(["pl-8",{"bg-fgreen-50/10 rounded-lg p-3":String(d.idx)===s.highlightReplyId}]),wid:s.wid,comment:d,onDeleted:c=>s.$emit("deleted",s.comment,d.idx),onMention:c=>s.$emit("mention",d.author.handle,s.comment.idx)},null,8,["class","wid","comment","onDeleted","onMention"]))),128))])):createCommentVNode("",!0)])}}}),_hoisted_1$9={class:"flex items-center justify-center gap-2 size-full"},_hoisted_2$5={class:"flex items-center justify-center gap-2 size-full"},_sfc_main$6=defineComponent({__name:"DeleteCommentModal",props:{modelValue:{type:Boolean},status:{}},emits:["update:modelValue","delete","cancel"],setup(n,{emit:e}){const t=n,r=e,a=ref(t.modelValue);watch(()=>t.modelValue,l=>{a.value=l}),watch(a,l=>{r("update:modelValue",l)});const s=()=>{a.value=!1,r("cancel")},o=()=>{r("delete")};return(l,d)=>(openBlock(),createBlock(_sfc_main$j,{show:a.value,"onUpdate:show":d[0]||(d[0]=c=>a.value=c),preload:!0,panelClass:l.status==="error"||l.status==="success"?"flex w-full max-w-[360px] flex-col justify-center items-center rounded-[16px] bg-fgray-900 h-[160px]":"flex w-full max-w-[360px] flex-col justify-center items-center rounded-[16px] bg-fgray-900"},createSlots({_:2},[t.status==="pending"?{name:"body",fn:withCtx(()=>[d[1]||(d[1]=createBaseVNode("div",{class:normalizeClass(["flex h-12 p-2 justify-end items-center self-stretch"])},null,-1)),d[2]||(d[2]=createBaseVNode("div",{class:"flex min-h-[180px] px-2 pt-2 pb-7 flex-col justify-center items-center self-stretch"},[createBaseVNode("div",{class:"flex px-4 flex-col gap-5 self-stretch items-center text-center text-fgray-300"},[createBaseVNode("div",{class:"text-2xl font-semibold"},"Delete comment"),createBaseVNode("div",{class:"flex min-h-[40px] flex-col items-center gap-3 self-stretch text-base"}," This action cannot be reversed. ")])],-1)),createBaseVNode("div",{class:"flex p-2 items-start gap-2 w-full"},[createBaseVNode("button",{onClick:s,class:"flex h-11 justify-center items-center flex-1 rounded-lg text-white"}," Cancel "),createBaseVNode("button",{onClick:o,class:"flex h-11 justify-center items-center gap-[10px] flex-1 rounded-lg bg-fred-100 text-white"}," Delete ")])]),key:"0"}:t.status==="error"?{name:"body",fn:withCtx(()=>[createBaseVNode("div",_hoisted_1$9,[createVNode(unref(XCircleIcon),{class:"size-12 text-fred-100"}),d[3]||(d[3]=createBaseVNode("div",{class:"text-[24px] font-[600] text-fgray-300"},toDisplayString("Failed to delete comment."),-1))])]),key:"1"}:t.status==="success"?{name:"body",fn:withCtx(()=>[createBaseVNode("div",_hoisted_2$5,[createVNode(unref(CheckIcon),{class:"size-12 text-fgray-600"}),d[4]||(d[4]=createBaseVNode("div",{class:"text-[24px] font-[600] text-fgray-300"}," Removed ",-1))])]),key:"2"}:void 0]),1032,["show","panelClass"]))}}),_hoisted_1$8={class:"w-full p-2 h-14"},_hoisted_2$4={class:"flex items-center w-full h-10 gap-2 p-2"},_hoisted_3$4={class:"font-[500] text-[16px] leading-[120%] text-fgray-300 break-words"},_hoisted_4$3={class:"flex-1 overflow-y-scroll size-full overscroll-y-contain"},_hoisted_5$3={class:"flex flex-col gap-4 p-2 size-full"},_hoisted_6$2={key:0},_hoisted_7$2={key:1,class:"m-auto text-[16px] text-fgray-700"},_hoisted_8$1={class:"w-full bg-fgray-1050"},_hoisted_9$1={key:0,class:"w-full h-11 px-4 flex items-center justify-between gap-2 text-fgray-750"},_hoisted_10$1={class:"flex items-end gap-1 p-2"},_hoisted_11$1={key:1,class:"p-1 size-10 shrink-0"},_hoisted_12$1=["disabled"],_hoisted_13$1=["disabled"],_sfc_main$5=defineComponent({__name:"WorkComments",props:mergeModels({highlightCommentId:{},highlightReplyId:{}},{work:{required:!0},workModifiers:{},modelValue:{},modelModifiers:{}}),emits:mergeModels(["info","toggleComment"],["update:work","update:modelValue"]),setup(n){const e=useUserStore(),t=computed(()=>e.user),r=useModel(n,"work"),a=useModel(n,"modelValue"),s=ref(""),o=ref(),l=useTemplateRef("wrapperRef"),d=useTemplateRef("textareaRef"),c=async()=>{await nextTick();const T=d.value;T&&(T.style.height="auto",T.style.height=`${Math.max(T.scrollHeight,24)}px`)},f=ref(!1),_=()=>{var B;if(f.value||(s.value=s.value.trim(),!s.value))return;f.value=!0;const T=(B=o.value)==null?void 0:B.commentIdx,E=T?`/work/${r.value.wid}/comment/${T}`:`/work/${r.value.wid}/comment`;$axios.post(E,{content:s.value}).then(async P=>{var I,N;if(!a.value)return;T||(a.value.push(P.data.comment),r.value.comment_count+=1);const C=a.value.find(D=>D.idx==T);if(!C){s.value="",o.value=void 0;return}C.reply_count=(C.reply_count??0)+1,C.replies===void 0?C.reply_count===0?(C.replies=[],(I=C.replies)==null||I.push(P.data.comment)):await b(C):(N=C.replies)==null||N.push(P.data.comment),r.value.comment_count+=1,s.value="",o.value=void 0,c()}).catch(P=>{var I,N,D;console.error(P);const C=(I=P.response)==null?void 0:I.status;useErrorStore().showError(((D=(N=P==null?void 0:P.response)==null?void 0:N.data)==null?void 0:D.error)||"Something went wrong.",C)}).finally(()=>{f.value=!1})},m=(T,E)=>{s.value=`@${T} `,o.value={commentIdx:E,handle:`@${T}`},nextTick(()=>{var B;(B=d.value)==null||B.focus(),c()})};watch(s,()=>{if(!o.value||s.value.startsWith(o.value.handle))return;const T=s.value.split(" ")[0];o.value.handle.startsWith(T)&&(s.value=s.value.substring(T.length+1)),o.value=void 0});const g=()=>{var T;t.value||(e.$patch({showSignIn:!0}),(T=d.value)==null||T.blur())},y=ref(!1),x=ref("pending"),u=ref(null),p=(T,E)=>{u.value={comment:T,replyIdx:E},y.value=!0},M=()=>{if(!u.value)return;const{comment:T,replyIdx:E}=u.value,B=r.value.wid,P=E?`/work/${B}/comment/${E}`:`/work/${B}/comment/${T.idx}`;$axios.delete(P).then(()=>{S(T,E),x.value="success"}).catch(C=>{console.error(C),x.value="error"}).finally(()=>{u.value=null,setTimeout(async()=>{y.value=!1},1500)})};watch(y,async T=>{T&&(await nextTick(),x.value="pending")});const S=(T,E)=>{var B,P,C,I;if(E===void 0){const N=((B=a.value)==null?void 0:B.findIndex(D=>D.idx==T.idx))??-1;if(N==-1)return;(P=a.value)==null||P.splice(N,1),r.value.comment_count-=1}else{const N=((C=T.replies)==null?void 0:C.findIndex(D=>D.idx==E))??-1;if(N==-1)return;(I=T.replies)==null||I.splice(N,1),T.reply_count-=1,r.value.comment_count-=1}},b=T=>$axios.get(`/work/${r.value.wid}/comment/${T.idx}`).then(E=>{T.replies=E.data.items}).catch(()=>{T.replies=[]}),A=T=>{var P;const E=l.value;if(!E)return;T.composedPath().includes(E)||(P=d.value)==null||P.blur()};return(T,E)=>{var P,C;const B=resolveComponent("RouterLink");return openBlock(),createElementBlock(Fragment,null,[createBaseVNode("div",{onPointerdownCapture:A,class:"flex flex-col size-full bg-fgray-1050"},[createBaseVNode("div",_hoisted_1$8,[createBaseVNode("div",_hoisted_2$4,[createBaseVNode("button",{onClick:E[0]||(E[0]=I=>T.$emit("toggleComment")),class:"size-6"},[createVNode(unref(ChevronLeftIcon),{class:"mx-auto text-fgray-500"})]),createBaseVNode("div",_hoisted_3$4,toDisplayString(r.value.comment_count)+" "+toDisplayString("Comments"),1),createBaseVNode("button",{onClick:E[1]||(E[1]=I=>T.$emit("info")),class:"ml-auto rounded-full size-6 bg-fgray-900"},[createVNode(unref(ChevronDownSmallIcon),{class:"mx-auto text-fgray-500"})])])]),createBaseVNode("div",_hoisted_4$3,[createBaseVNode("div",_hoisted_5$3,[a.value===void 0?(openBlock(),createElementBlock("div",_hoisted_6$2," ...TODO loading... ")):a.value.length===0?(openBlock(),createElementBlock("div",_hoisted_7$2,toDisplayString("No comments yet."))):createCommentVNode("",!0),(openBlock(!0),createElementBlock(Fragment,null,renderList(a.value,I=>(openBlock(),createBlock(_sfc_main$7,{key:I.idx,wid:r.value.wid,comment:I,loadReplies:b,highlight:String(I.idx)===T.highlightCommentId,highlightReplyId:T.highlightReplyId,onDeleted:p,onMention:m},null,8,["wid","comment","highlight","highlightReplyId"]))),128))])]),createBaseVNode("div",_hoisted_8$1,[(P=o.value)!=null&&P.handle?(openBlock(),createElementBlock("div",_hoisted_9$1,[createTextVNode(toDisplayString(`Replying to ${o.value.handle}.`)+" ",1),createBaseVNode("div",{onClick:E[2]||(E[2]=()=>{o.value=void 0,s.value=""})},[createVNode(unref(XSmallIcon))])])):createCommentVNode("",!0),createBaseVNode("div",_hoisted_10$1,[t.value?(openBlock(),createBlock(B,{key:0,to:`/${(C=t.value)==null?void 0:C.handle}`,class:"p-1 size-10 shrink-0"},{default:withCtx(()=>{var I;return[createVNode(_sfc_main$i,{image:(I=t.value)==null?void 0:I.image,class:"size-full"},null,8,["image"])]}),_:1},8,["to"])):(openBlock(),createElementBlock("div",_hoisted_11$1,[createVNode(_sfc_main$i,{class:"size-full"})])),createBaseVNode("div",{ref_key:"wrapperRef",ref:l,class:"flex items-end w-full p-2 rounded-lg bg-fgray-850"},[withDirectives(createBaseVNode("textarea",{"onUpdate:modelValue":E[3]||(E[3]=I=>s.value=I),ref_key:"textareaRef",ref:d,rows:"1",placeholder:"Leave a comment...",onFocus:g,onInput:c,disabled:f.value,class:"w-full min-h-6 p-1 resize-none overflow-hidden bg-fgray-850 text-fgray-200 text-[14px] leading-[112%] border-none focus:ring-0"},null,40,_hoisted_12$1),[[vModelText,s.value]]),createBaseVNode("button",{onClick:_,disabled:!s.value||f.value,class:normalizeClass(["ml-2 size-6",[s.value?"text-fgray-0":"text-fgray-500"]])},[createVNode(unref(ArrowRightLineIcon),{class:"mx-auto"})],10,_hoisted_13$1)],512)])])],32),createVNode(_sfc_main$6,{status:x.value,modelValue:y.value,"onUpdate:modelValue":E[4]||(E[4]=I=>y.value=I),onDelete:M,onCancel:E[5]||(E[5]=I=>u.value=null)},null,8,["status","modelValue"])],64)}}}),_hoisted_1$7={width:"16",height:"15",viewBox:"0 0 16 15",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$2(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$7,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8 13.125C11.1066 13.125 13.625 10.6066 13.625 7.5C13.625 4.3934 11.1066 1.875 8 1.875C4.8934 1.875 2.375 4.3934 2.375 7.5C2.375 10.6066 4.8934 13.125 8 13.125ZM8.62526 5.00018C8.62526 5.34535 8.34544 5.62518 8.00026 5.62518C7.65508 5.62518 7.37526 5.34535 7.37526 5.00018C7.37526 4.655 7.65508 4.37518 8.00026 4.37518C8.34544 4.37518 8.62526 4.655 8.62526 5.00018ZM7.3752 6.87498C7.3752 6.5298 7.65502 6.24998 8.0002 6.24998C8.34538 6.24998 8.6252 6.5298 8.6252 6.87498V9.99998C8.6252 10.3452 8.34538 10.625 8.0002 10.625C7.65502 10.625 7.3752 10.3452 7.3752 9.99998V6.87498Z"},null,-1)]))}const ICircleSolidIcon={render:render$2},_hoisted_1$6={width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render$1(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$6,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"},null,-1),createBaseVNode("path",{d:"M10.8678 14.2502C10.8729 13.6296 10.9334 13.1276 11.0495 12.7441C11.1655 12.3607 11.327 12.0529 11.5338 11.8208C11.7458 11.5887 12.0283 11.3642 12.3815 11.1472C12.7397 10.9151 13.0198 10.6654 13.2216 10.3979C13.4234 10.1305 13.5218 9.82023 13.5168 9.46704C13.5168 9.18953 13.4512 8.94735 13.32 8.74048C13.1938 8.52856 13.0172 8.36458 12.7902 8.24854C12.5631 8.13249 12.3109 8.07446 12.0334 8.07446C11.776 8.07446 11.5338 8.12996 11.3068 8.24097C11.0797 8.35197 10.8931 8.521 10.7467 8.74805C10.6004 8.9751 10.5197 9.25008 10.5045 9.573H8.61246C8.62759 8.91707 8.78905 8.35954 9.09683 7.90039C9.40461 7.4362 9.8133 7.08805 10.3229 6.85596C10.8376 6.61881 11.4128 6.50024 12.0485 6.50024C12.7246 6.50024 13.3225 6.62134 13.8422 6.86353C14.3669 7.10067 14.7731 7.44124 15.0607 7.88525C15.3533 8.32926 15.4997 8.84644 15.4997 9.43677C15.4946 10.0271 15.3533 10.5342 15.0758 10.958C14.8034 11.3818 14.4098 11.7476 13.8952 12.0554C13.5924 12.2421 13.3503 12.4313 13.1686 12.623C12.992 12.8148 12.8608 13.0393 12.7751 13.2966C12.6893 13.554 12.6439 13.8718 12.6388 14.2502V14.3865H10.8678V14.2502ZM10.6256 16.551C10.6256 16.3442 10.6786 16.1524 10.7846 15.9758C10.8905 15.7942 11.0343 15.6504 11.216 15.5444C11.3976 15.4385 11.5944 15.3855 11.8063 15.3855C12.0132 15.3855 12.2049 15.4385 12.3815 15.5444C12.5631 15.6504 12.7069 15.7942 12.8129 15.9758C12.9189 16.1524 12.9718 16.3442 12.9718 16.551C12.9718 16.7629 12.9189 16.9597 12.8129 17.1414C12.7069 17.323 12.5631 17.4668 12.3815 17.5728C12.2049 17.6787 12.0132 17.7317 11.8063 17.7317C11.5944 17.7317 11.3976 17.6787 11.216 17.5728C11.0343 17.4668 10.8905 17.323 10.7846 17.1414C10.6786 16.9597 10.6256 16.7629 10.6256 16.551Z"},null,-1)]))}const SupportCircleIcon={render:render$1},_hoisted_1$5=["placeholder"],_sfc_main$4=defineComponent({__name:"TagsForm",props:{modelValue:{required:!0},modelModifiers:{}},emits:["update:modelValue"],setup(n){const e=u=>u,t=useModel(n,"modelValue"),r=ref(""),a=ref(),s=ref(!1),o=()=>{var u;return(u=a.value)==null?void 0:u.focus()},l=(u,p)=>{const M=document.createElement("span");M.style.position="absolute",M.style.visibility="hidden",M.style.whiteSpace="pre";const S=window.getComputedStyle(p);M.style.font=S.font,M.textContent=u||"",document.body.appendChild(M);const b=M.getBoundingClientRect().width;return document.body.removeChild(M),b},d=()=>{const u=a.value;if(!u)return;const p=r.value.length>0,M=l(r.value,u),S=p?M+40:t.value.length>0?40:120;u.style.width=`${Math.ceil(S)}px`};onUpdated(async()=>{await nextTick(),d()});const c=()=>{d();const u=r.value;/\s$/.test(u)&&(r.value=u.trim(),m())},f=u=>{var S;u.preventDefault(),(((S=u.clipboardData)==null?void 0:S.getData("text"))||"").split(/[\s,]+/).filter(Boolean).forEach(_),r.value="",nextTick(()=>{var b;return(b=a.value)==null?void 0:b.focus()})},_=u=>{const p=u.trim();p&&!t.value.includes(p)&&t.value.push(p)},m=()=>{const u=r.value.trim();u&&!t.value.includes(u)&&t.value.push(u),r.value="",nextTick(()=>{var p;return(p=a.value)==null?void 0:p.focus()})},g=u=>{t.value.splice(u,1),nextTick(()=>{var p;return(p=a.value)==null?void 0:p.focus()})},y=u=>{r.value===""&&(u.preventDefault(),t.value.pop(),nextTick(()=>{var p;return(p=a.value)==null?void 0:p.focus()}))},x=()=>{s.value=!1,r.value="",d()};return onMounted(async()=>{await nextTick(),d()}),(u,p)=>(openBlock(),createElementBlock("div",{ref:"tagsContainer",onMousedown:withModifiers(o,["prevent"]),class:"flex flex-wrap gap-2 w-full p-[7px] rounded-[10px] box-border border border-fgray-800 focus-within:border-fgray-600 bg-transparent"},[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.value,(M,S)=>(openBlock(),createBlock(_sfc_main$a,{key:M,label:M,editable:"",focused:s.value,onRemove:b=>g(S)},null,8,["label","focused","onRemove"]))),128)),withDirectives(createBaseVNode("input",{"onUpdate:modelValue":p[0]||(p[0]=M=>r.value=M),ref_key:"tagInput",ref:a,type:"text",onFocus:p[1]||(p[1]=M=>s.value=!0),onBlur:x,onInput:c,onPaste:withModifiers(f,["prevent"]),onKeydown:[p[2]||(p[2]=withKeys(withModifiers(M=>m(),["prevent"]),["space"])),p[3]||(p[3]=withKeys(withModifiers(M=>m(),["prevent"]),["enter"])),withKeys(y,["backspace"])],class:normalizeClass(["flex-initial w-auto min-w-[40px] h-[28px] bg-transparent border-none focus:border-none focus:ring-0 outline-none focus:outline-none text-[14px] text-fgray-50 placeholder:text-fgray-800",[r.value.length===0?"pl-[4px]":"pl-[10px]"]]),placeholder:t.value.length===0?e("Add tags here"):""},null,42,_hoisted_1$5),[[vModelText,r.value]])],544))}}),_hoisted_1$4={class:"w-full p-2 h-14"},_hoisted_2$3={class:"flex items-center w-full h-10 gap-2 p-2"},_hoisted_3$3={class:"flex flex-col w-full gap-4 p-2"},_hoisted_4$2={class:"flex flex-col gap-1.5 w-full"},_hoisted_5$2={key:0,class:"flex items-center gap-1 text-fred-100 text-[12px]"},_hoisted_6$1={class:"flex flex-col gap-1.5 w-full"},_hoisted_7$1={class:"flex flex-col gap-1.5 w-full"},_hoisted_8={class:"flex flex-col w-full gap-2"},_hoisted_9={class:"flex items-center p-3 gap-2 h-[58px] bg-fgray-1000 rounded-[10px]"},_hoisted_10={class:"flex items-center size-8 shrink-0"},_hoisted_11={class:"relative inline-flex items-center ml-auto cursor-pointer"},_hoisted_12={class:"relative flex items-center p-3 gap-2 h-[58px] bg-fgray-1000 rounded-[10px]"},_hoisted_13={class:"flex items-center size-8 shrink-0"},_hoisted_14={class:"flex flex-col gap-[3px]"},_hoisted_15={class:"flex items-center gap-[4.5px] text-fgray-600"},_hoisted_16={class:"flex flex-col justify-between items-start gap-2"},_hoisted_17={class:"flex w-full h-[24px] items-center justify-between text-[16px] font-[600]"},_hoisted_18={class:"relative inline-flex items-center ml-auto cursor-pointer"},_hoisted_19=["checked"],_hoisted_20={class:"flex items-center gap-2 rounded-[10px] relative"},_hoisted_21={class:"flex items-center gap-1"},_hoisted_22={href:"https://creativecommons.org/share-your-work/cclicenses/",target:"_blank",rel:"noopener noreferrer",class:"flex items-center size-8 shrink-0"},_hoisted_23={class:"relative w-full"},_hoisted_24={class:"flex items-center flex-1 h-5 text-[11px] text-fgray-600 text-left"},_hoisted_25={class:"relative my-auto size-3 shrink-0"},_hoisted_26={key:0,class:"flex flex-col gap-1 absolute bottom-0 left-0 w-full p-1 rounded-[10px] bg-fgray-1050 outline outline-[1px] outline-fgray-850 z-50"},_hoisted_27=["onClick"],_hoisted_28={class:"flex items-center flex-1 h-5 text-left text-fgray-600"},_hoisted_29={class:"text-[11px]"},_hoisted_30={key:0,class:"ml-1 text-[11px]"},_hoisted_31={key:0,class:"relative my-auto size-3 shrink-0"},_hoisted_32={class:"w-full px-2 py-2 bg-fgray-1050"},_hoisted_33={class:"flex items-center gap-2"},_hoisted_34=["disabled"],_sfc_main$3=defineComponent({__name:"WorkEdit",props:{modelValue:{required:!0},modelModifiers:{}},emits:mergeModels(["info","edit"],["update:modelValue"]),setup(n,{emit:e}){const t=useModel(n,"modelValue"),r=e,a=ref({title:"",description:"",tags:[],wip:!1,downloadable:!1,license:"all",use_sequence:!1,showCapture:!1});watch(()=>t.value,I=>{a.value={title:I.title,description:I.description,tags:[...I.tags],wip:I.wip,downloadable:I.downloadable,license:I.license??"all",use_sequence:I.use_sequence,showCapture:!1}},{immediate:!0});const s=ref(null),o=ref(null),l=ref(null),d=ref(null),c=I=>{I.style.height="auto",I.style.height=`${I.scrollHeight}px`},f=computed(()=>a.value.title.trim().length===0);onMounted(()=>{l.value&&c(l.value),d.value&&c(d.value)}),watch(()=>a.value.title,()=>{nextTick(()=>{l.value&&c(l.value)})}),watch(()=>a.value.description,()=>{nextTick(()=>{d.value&&c(d.value)})});const _=I=>c(I.target),m=I=>c(I.target),g=I=>{var V;I.preventDefault();const D=(((V=I.clipboardData)==null?void 0:V.getData("text"))||"").replace(/\r?\n/g,"");if(l.value){const R=l.value,F=R.selectionStart,$=R.selectionEnd,W=a.value.title,J=W.slice(0,F),j=W.slice($),ie=(J+D+j).slice(0,64);a.value.title=ie,nextTick(()=>{const ae=Math.min(F+D.length,ie.length);R.selectionStart=ae,R.selectionEnd=ae,c(R)})}else{const R=(a.value.title+D).slice(0,64);a.value.title=R,nextTick(()=>{l.value&&c(l.value)})}};watch(()=>a.value.title,I=>{const N=I.replace(/\r?\n/g,"").slice(0,64);N!==I&&(a.value.title=N),nextTick(()=>{l.value&&c(l.value)})});const y=I=>{var V;const N=I.target;if(N.closest("input, textarea")||(V=o.value)!=null&&V.contains(N))return;I.preventDefault(),I.stopPropagation();const D=document.activeElement;if(D&&(D.tagName==="INPUT"||D.tagName==="TEXTAREA")&&D.blur(),x.value){const R=u.value;R!=null&&R.contains(N)||(x.value=!1)}},x=ref(!1),u=ref(null),p=I=>{if(!x.value)return;const N=u.value,D=I.target;N&&!N.contains(D)&&(x.value=!1)};onMounted(()=>{document.addEventListener("pointerdown",p)}),onBeforeUnmount(()=>{document.removeEventListener("pointerdown",p)});const M=async()=>{var I;a.value.downloadable=!a.value.downloadable,a.value.downloadable&&(await nextTick(),(I=s.value)==null||I.scrollBy({top:68}))},S=ref(!1),b=[{id:"CC BY",label:"CC BY",sublabel:"(A: Attribution)"},{id:"CC BY-NC",label:"CC BY-NC",sublabel:"(A-NonCommercial)"},{id:"CC BY-ND",label:"CC BY-ND",sublabel:"(A-NoDerivatives)"},{id:"CC BY-SA",label:"CC BY-SA",sublabel:"(A-ShareAlike)"},{id:"CC BY-NC-SA",label:"CC BY-NC-SA",sublabel:"(A-NonCom.-ShareAlike)"},{id:"CC BY-NC-ND",label:"CC BY-NC-ND",sublabel:"(A-NonCom.-NoDeriv.)"},{id:"all",label:"All rights reserved",sublabel:""}],A=computed(()=>b.find(I=>I.id==a.value.license)),T=()=>{S.value=!S.value},E=I=>{a.value.license=I,S.value=!1},B=()=>{a.value={title:t.value.title,description:t.value.description,tags:[...t.value.tags],wip:t.value.wip??!1,downloadable:t.value.downloadable,license:t.value.license,use_sequence:!1,showCapture:!1},S.value=!1,nextTick(()=>{l.value&&c(l.value),d.value&&c(d.value)})},P=ref(!1);function C(){if(P.value)return;const{title:I,description:N,tags:D,wip:V,downloadable:R,license:F,use_sequence:$}=a.value,W={title:I,description:N,tags:D,wip:V,downloadable:R,license:F,use_sequence:$};P.value=!0,$axios.patch(`/work/${t.value.wid}`,W).then(J=>{t.value=J.data.item,r("edit")}).catch(J=>{var ie,ae,he;console.error(J);const j=(ie=J.response)==null?void 0:ie.status;useErrorStore().showError(((he=(ae=J==null?void 0:J.response)==null?void 0:ae.data)==null?void 0:he.error)||"Something went wrong.",j)}).finally(()=>{P.value=!1})}return(I,N)=>(openBlock(),createElementBlock("div",{class:"flex flex-col size-full bg-fgray-1050",onPointerdownCapture:y},[createBaseVNode("div",_hoisted_1$4,[createBaseVNode("div",_hoisted_2$3,[createBaseVNode("button",{onClick:N[0]||(N[0]=D=>I.$emit("edit")),class:"size-6"},[createVNode(unref(ChevronLeftIcon),{class:"mx-auto text-fgray-500"})]),N[10]||(N[10]=createBaseVNode("div",{class:"font-[500] text-base leading-[120%] text-fgray-300"},"Edit details",-1)),createBaseVNode("button",{onClick:N[1]||(N[1]=D=>I.$emit("info")),class:"ml-auto rounded-full size-6 bg-fgray-900"},[createVNode(unref(ChevronDownSmallIcon),{class:"mx-auto text-fgray-500"})])])]),createBaseVNode("div",{ref_key:"scrollContainer",ref:s,class:"flex-1 overflow-y-scroll size-full overscroll-y-contain"},[createBaseVNode("div",_hoisted_3$3,[createBaseVNode("div",_hoisted_4$2,[N[12]||(N[12]=createBaseVNode("div",{class:"text-[14px] leading-[140%] text-fgray-500"},"Title",-1)),withDirectives(createBaseVNode("textarea",{ref_key:"titleRef",ref:l,"onUpdate:modelValue":N[2]||(N[2]=D=>a.value.title=D),rows:"1",onInput:_,maxlength:"64",onKeydown:N[3]||(N[3]=withKeys(withModifiers(()=>{},["prevent"]),["enter"])),onPaste:g,class:normalizeClass(["box-border w-full min-h-11 p-3 rounded-[10px] bg-transparent","text-[14px] leading-[140%] text-fgray-600 focus:text-fgray-0","outline-none focus:outline-none focus:ring-0","whitespace-pre-wrap break-words resize-none",f.value?"border border-fred-100 focus:border-fred-100":"border border-fgray-800 focus:border-fgray-600"])},null,34),[[vModelText,a.value.title]]),f.value?(openBlock(),createElementBlock("div",_hoisted_5$2,[createVNode(unref(XCircleIcon),{class:"size-4"}),N[11]||(N[11]=createBaseVNode("span",null,"Your artwork needs a title.",-1))])):createCommentVNode("",!0)]),createBaseVNode("div",_hoisted_6$1,[N[13]||(N[13]=createBaseVNode("div",{class:"text-[14px] leading-[140%] text-fgray-500"},"Description",-1)),withDirectives(createBaseVNode("textarea",{ref_key:"descriptionRef",ref:d,"onUpdate:modelValue":N[4]||(N[4]=D=>a.value.description=D),rows:"2",placeholder:"Write something about your work...",onInput:m,class:"box-border w-full min-h-16 p-3 rounded-[10px] bg-transparent text-[14px] leading-[140%] text-fgray-600 focus:text-fgray-0 outline-none focus:outline-none focus:ring-0 border border-fgray-800 focus:border-fgray-600 whitespace-pre-wrap break-words resize-none placeholder:text-fgray-800"},null,544),[[vModelText,a.value.description]])]),createBaseVNode("div",_hoisted_7$1,[N[14]||(N[14]=createBaseVNode("div",{class:"text-[14px] leading-[140%] text-fgray-500"},"Tags",-1)),createVNode(_sfc_main$4,{modelValue:a.value.tags,"onUpdate:modelValue":N[5]||(N[5]=D=>a.value.tags=D)},null,8,["modelValue"])]),createBaseVNode("div",_hoisted_8,[createBaseVNode("div",_hoisted_9,[createBaseVNode("div",_hoisted_10,[createVNode(unref(HourglassIcon),{class:"mx-auto text-fgray-500"})]),N[17]||(N[17]=createBaseVNode("div",{class:"flex flex-col gap-[3px]"},[createBaseVNode("div",{class:"text-[14px] leading-[120%] text-fgray-600"},"Work-in-progress"),createBaseVNode("div",{class:"text-[12px] leading-[120%] text-fgray-600"},"Label this note as an on-going work")],-1)),createBaseVNode("label",_hoisted_11,[withDirectives(createBaseVNode("input",{type:"checkbox",class:"absolute sr-only peer","onUpdate:modelValue":N[6]||(N[6]=D=>a.value.wip=D)},null,512),[[vModelCheckbox,a.value.wip]]),N[15]||(N[15]=createBaseVNode("div",{class:"w-[30px] h-5 bg-fgray-700 rounded-full transition-colors duration-150 peer-checked:bg-fgreen-100"},null,-1)),N[16]||(N[16]=createBaseVNode("div",{class:"absolute top-[2px] left-[2px] size-4 bg-white rounded-full shadow transform transition-transform duration-150 peer-checked:translate-x-[10px]"},null,-1))])]),createBaseVNode("div",_hoisted_12,[createBaseVNode("div",_hoisted_13,[createVNode(unref(CupAndArrowDownIcon),{class:"mx-auto text-fgray-500"})]),createBaseVNode("div",_hoisted_14,[createBaseVNode("div",_hoisted_15,[N[18]||(N[18]=createBaseVNode("div",{class:"text-[14px] leading-[120%] text-fgray-600"},"Downloadable",-1)),createBaseVNode("button",{onClick:N[7]||(N[7]=withModifiers(D=>x.value=!x.value,["stop"])),class:"relative"},[createVNode(unref(ICircleSolidIcon))])]),N[19]||(N[19]=createBaseVNode("div",{class:"text-[12px] leading-[120%] text-fgray-600"},"Anyone can download a copy to Feather",-1))]),x.value?(openBlock(),createElementBlock("div",{key:0,ref_key:"downloadableInfoRef",ref:u,class:"absolute bottom-[49px] left-1/2 -translate-x-1/2 z-50 p-4 w-[320px] rounded-[16px] bg-fgray-750 text-fgray-0 text-[12px] leading-[140%] shadow-2xl"},[createBaseVNode("div",_hoisted_16,[createBaseVNode("div",_hoisted_17,[N[20]||(N[20]=createTextVNode(" Note ")),createBaseVNode("button",{onClick:N[8]||(N[8]=D=>x.value=!1),class:"text-fgray-600"},[createVNode(unref(XSmallIcon))])]),N[21]||(N[21]=createBaseVNode("div",{class:"text-[14px] leading-[140%] whitespace-pre-wrap break-words"},"Uploaded file does not include hidden groups, hidden images, any 3D models or guides, or clipboard contents. Rendering is turned off by default when the downloaded file is opened. ",-1))])],512)):createCommentVNode("",!0),createBaseVNode("label",_hoisted_18,[createBaseVNode("input",{type:"checkbox",class:"absolute sr-only peer",checked:a.value.downloadable,onChange:M},null,40,_hoisted_19),N[22]||(N[22]=createBaseVNode("div",{class:"w-[30px] h-5 bg-fgray-700 rounded-full transition-colors duration-150 peer-checked:bg-fgreen-100"},null,-1)),N[23]||(N[23]=createBaseVNode("div",{class:"absolute top-[2px] left-[2px] size-4 bg-white rounded-full shadow transform transition-transform duration-150 peer-checked:translate-x-[10px]"},null,-1))])])]),createBaseVNode("div",_hoisted_20,[createBaseVNode("div",_hoisted_21,[N[24]||(N[24]=createBaseVNode("div",{class:"text-[14px] leading-[140%] text-fgray-500"},"License",-1)),createBaseVNode("a",_hoisted_22,[createVNode(unref(SupportCircleIcon),{class:"mx-auto text-fgray-500"})])]),createBaseVNode("div",_hoisted_23,[createBaseVNode("button",{onClick:T,class:"flex items-center gap-2 px-4 py-3 w-full h-11 rounded-[10px] outline outline-1 outline-fgray-800"},[createBaseVNode("div",_hoisted_24,toDisplayString(A.value?A.value.label??A.value.id:a.value.license),1),createBaseVNode("div",_hoisted_25,[createVNode(unref(ChevronDownSmallIcon),{class:"absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-fgray-600"})])]),S.value?(openBlock(),createElementBlock("div",_hoisted_26,[(openBlock(),createElementBlock(Fragment,null,renderList(b,D=>createBaseVNode("button",{key:D.id,onClick:V=>E(D.id),class:normalizeClass(["flex gap-1 items-center px-3 w-full h-[36px] rounded-[6px]",a.value.license===D.id?"bg-fgray-1100":""])},[createBaseVNode("div",_hoisted_28,[createBaseVNode("span",_hoisted_29,toDisplayString(D.label??D.id),1),D.sublabel?(openBlock(),createElementBlock("span",_hoisted_30,toDisplayString(D.sublabel),1)):createCommentVNode("",!0)]),a.value.license===D.id?(openBlock(),createElementBlock("div",_hoisted_31,[createVNode(unref(CheckBigIcon),{class:"absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-fgreen-100"})])):createCommentVNode("",!0)],10,_hoisted_27)),64))])):createCommentVNode("",!0),S.value?(openBlock(),createElementBlock("div",{key:1,class:"fixed inset-0 z-40 bg-black bg-opacity-50",onClick:N[9]||(N[9]=D=>S.value=!1)})):createCommentVNode("",!0)])])])],512),createBaseVNode("div",_hoisted_32,[createBaseVNode("div",_hoisted_33,[createBaseVNode("button",{onClick:B,class:"flex-1 h-10 text-[14px] leading-[120%] text-fgray-600"}," Reset "),createBaseVNode("button",{onClick:C,disabled:f.value,class:"flex-1 h-10 rounded-[8px] disabled:bg-fgray-700 bg-fgreen-100 text-[14px] leading-[120%] text-fgray-0"}," Save changes ",8,_hoisted_34)])])],32))}}),_hoisted_1$3={width:"25",height:"24",viewBox:"0 0 25 24",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"};function render(n,e){return openBlock(),createElementBlock("svg",_hoisted_1$3,e[0]||(e[0]=[createBaseVNode("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12.2705 6.83307C12.4335 6.61018 12.6156 6.39693 12.8169 6.19561C13.1017 5.91081 13.4104 5.6644 13.7365 5.4564C15.829 4.12163 18.639 4.36804 20.4665 6.19561C22.5789 8.30799 22.5789 11.7328 20.4665 13.8452L13.6847 20.627C12.9037 21.4081 11.6374 21.4081 10.8563 20.627L4.07452 13.8452C1.96214 11.7328 1.96214 8.30799 4.07452 6.19561C5.9021 4.36804 8.71209 4.12163 10.8046 5.4564C11.1307 5.6644 11.4393 5.91081 11.7241 6.19561C11.9255 6.39693 12.1076 6.61018 12.2705 6.83307Z"},null,-1)]))}const HeartSolidIcon={render},_hoisted_1$2={class:normalizeClass(["h-12 shrink-0 px-1 flex items-center justify-between"])},_hoisted_2$2={class:"flex items-center justify-center mx-auto rounded-full size-6 bg-fgray-850 text-fgray-500"},_hoisted_3$2={class:"flex items-end h-20 p-4"},_hoisted_4$1={key:1,class:"relative w-full h-3 overflow-hidden rounded-full bg-fgray-1000"},_hoisted_5$1={class:"flex items-center justify-center gap-2 size-full"},_sfc_main$2=defineComponent({__name:"DownloadModal",props:mergeModels({wid:{}},{modelValue:{type:Boolean,required:!0},modelModifiers:{}}),emits:mergeModels(["success"],["update:modelValue"]),setup(n,{emit:e}){const t=ref(),r=IPC.environment,a=useModel(n,"modelValue"),s=e,o=n;watch(a,()=>{var m,g;a.value?(l.value=void 0,c.value=void 0,(m=t.value)==null||m.show()):(g=t.value)==null||g.close()},{immediate:!0});const l=ref();watch(l,()=>{l.value!==void 0&&setTimeout(()=>{a.value=!1},2e3)});const d=()=>{if(!t.value){a.value=!1;return}c.value!==void 0?(f==null||f.abort(),l.value="cancel"):a.value=!1},c=ref();let f;const _=()=>{c.value=0,f=new AbortController,$axios.get(`/work/${o.wid}/download.feather`,{responseType:"arraybuffer",signal:f.signal,onDownloadProgress:m=>{if(!m.total){c.value=1;return}c.value=m.loaded/m.total*100}}).then(m=>{c.value=100;const g=new Uint8Array(m.data);let y="";for(let x=0;x<g.length;x+=1024)y+=String.fromCharCode.apply(null,g.subarray(x,x+1024));return IPC.post({cmd:"fs.write",file:btoa(y)})}).then(()=>{s("success"),l.value="success"}).catch(m=>{console.error(m),l.value="cancel"}).finally(()=>{c.value=void 0})};return(m,g)=>(openBlock(),createBlock(_sfc_main$j,{ref_key:"modal",ref:t,autoClose:!1,panelClass:l.value===void 0?"w-full max-w-[360px]":"w-full max-w-[300px] h-[160px]"},createSlots({_:2},[l.value===void 0?{name:"body",fn:withCtx(()=>[createBaseVNode("header",_hoisted_1$2,[g[0]||(g[0]=createBaseVNode("div",{class:"flex-1"},null,-1)),createBaseVNode("button",{onClick:d,class:"size-10"},[createBaseVNode("div",_hoisted_2$2,[createVNode(unref(XSmallIcon),{class:"size-6 text-fgray-600"})])])]),unref(r)=="web"?(openBlock(),createElementBlock(Fragment,{key:0},[g[1]||(g[1]=createBaseVNode("div",{class:"h-[160px] p-4 flex items-center justify-center"},[createBaseVNode("div",{class:"text-center"},[createBaseVNode("h5",{class:"text-fgray-300 font-[600] text-[24px]"},"Feather required"),createBaseVNode("div",{class:"mt-5 text-fgray-500"},[createTextVNode(" To download this file, install Feather"),createBaseVNode("br"),createTextVNode("on your iPad. ")])])],-1)),g[2]||(g[2]=createBaseVNode("div",{class:"h-20 p-4"},[createBaseVNode("a",{href:"https://apps.apple.com/us/app/id6737254232",target:"_blank",class:"flex items-center justify-center w-full h-12 rounded-[8px] text-white bg-fgreen-100 hover:bg-fgreen-200 font-[500]"}," Go to iPad App Store ")],-1))],64)):(openBlock(),createElementBlock(Fragment,{key:1},[g[3]||(g[3]=createBaseVNode("div",{class:"h-[160px] p-4 flex items-center justify-center"},[createBaseVNode("div",{class:"text-center"},[createBaseVNode("h5",{class:"text-fgray-300 font-[600] text-[24px]"},"Download"),createBaseVNode("div",{class:"mt-5 text-fgray-500"},[createTextVNode(" A copy will be added to your Feather app."),createBaseVNode("br"),createTextVNode(" It will take a few moments. ")])])],-1)),createBaseVNode("div",_hoisted_3$2,[c.value===void 0?(openBlock(),createElementBlock("button",{key:0,onClick:_,class:"w-full h-12 rounded-[8px] text-white bg-fgreen-100 hover:bg-fgreen-200 font-[500]"}," Download ")):(openBlock(),createElementBlock("div",_hoisted_4$1,[createBaseVNode("div",{class:"h-full bg-fgreen-100",style:normalizeStyle({width:`${c.value}%`})},null,4)]))])],64))]),key:"0"}:{name:"body",fn:withCtx(()=>[createBaseVNode("div",_hoisted_5$1,[l.value=="cancel"?(openBlock(),createElementBlock(Fragment,{key:0},[createVNode(unref(XCircleIcon),{class:"size-12 text-fred-100"}),g[4]||(g[4]=createBaseVNode("div",{class:"text-[24px] font-[600] text-fgray-300"}," Cancelled ",-1))],64)):(openBlock(),createElementBlock(Fragment,{key:1},[createVNode(unref(CheckIcon),{class:"size-12 text-fgreen-100"}),g[5]||(g[5]=createBaseVNode("div",{class:"text-[24px] font-[600] text-fgray-300"}," Downloaded ",-1))],64))])]),key:"1"}]),1032,["panelClass"]))}}),_hoisted_1$1={class:"flex items-center justify-center gap-2 size-full"},_hoisted_2$1=["disabled"],_hoisted_3$1={key:0},_sfc_main$1=defineComponent({__name:"WorkButtonBar",props:{modelValue:{required:!0},modelModifiers:{}},emits:mergeModels(["comment"],["update:modelValue"]),setup(n){const e=useUserStore(),t=useModel(n,"modelValue"),r=ref(!1),a=()=>{if(t.value.downloadable){if(!e.user){e.showSignIn=!0;return}r.value=!0}},s=()=>{t.value.download_count+=1},o=ref({byMe:!1,count:0});watch(()=>t.value.like_count,()=>{o.value={byMe:t.value.liked_by_me,count:t.value.like_count}},{immediate:!0});const l=ref(!1),d=()=>{if(l.value)return;if(!e.user){e.showSignIn=!0;return}o.value={byMe:!o.value.byMe,count:o.value.count+(o.value.byMe?-1:1)},l.value=!0;const c=t.value.liked_by_me;$axios.request({method:c?"DELETE":"POST",url:`/work/${t.value.wid}/like`}).then(f=>{t.value.liked_by_me=!c,t.value.like_count=f.data.like_count}).catch(f=>{var _,m,g,y;if(console.error(f),((_=f==null?void 0:f.response)==null?void 0:_.status)===401)useErrorStore().showError("Login required.",401);else{console.error(f);const x=(m=f.response)==null?void 0:m.status;useErrorStore().showError(((y=(g=f==null?void 0:f.response)==null?void 0:g.data)==null?void 0:y.error)||"Something went wrong.",x)}}).finally(()=>{l.value=!1})};return(c,f)=>(openBlock(),createElementBlock("div",_hoisted_1$1,[createBaseVNode("button",{onClick:a,onPointerup:f[0]||(f[0]=_=>_.currentTarget.blur()),disabled:!t.value.downloadable,class:normalizeClass(["flex gap-1.5 items-center justify-center size-full rounded-[8px]","bg-fgray-1050 border border-fgray-800 text-[12px]",t.value.downloadable?"text-fgray-50 hover:bg-fgray-800 active:bg-fgray-800":"text-fgray-800 cursor-not-allowed"])},[createVNode(unref(CupAndArrowDownIcon)),t.value.downloadable?(openBlock(),createElementBlock("div",_hoisted_3$1,toDisplayString(t.value.download_count),1)):createCommentVNode("",!0)],42,_hoisted_2$1),createVNode(_sfc_main$2,{wid:t.value.wid,modelValue:r.value,"onUpdate:modelValue":f[1]||(f[1]=_=>r.value=_),onSuccess:s},null,8,["wid","modelValue"]),createBaseVNode("button",{onClick:f[2]||(f[2]=_=>c.$emit("comment")),class:"flex gap-1.5 items-center justify-center size-full rounded-[8px] bg-fgray-1050 hover:bg-fgray-800 active:bg-fgray-800 border border-fgray-800 text-fgray-50 text-[12px]"},[createVNode(unref(CommentIcon)),createTextVNode(" "+toDisplayString(t.value.comment_count),1)]),createBaseVNode("button",{onClick:d,class:normalizeClass(["flex gap-1.5 items-center justify-center border","size-full rounded-[8px] text-[12px]",o.value.byMe?"bg-fxred-250 border-fxred-250 text-fxred-150":"bg-fgray-1050 border-fgray-800 text-fgray-50 hover:bg-fgray-800 active:bg-fgray-800"])},[o.value.byMe?(openBlock(),createBlock(unref(HeartSolidIcon),{key:1})):(openBlock(),createBlock(unref(HeartIcon),{key:0})),createTextVNode(" "+toDisplayString(o.value.count),1)],2)]))}}),_hoisted_1={key:0,class:"fixed inset-0 flex flex-col h-full overflow-hidden overscroll-none touch-pan-y"},_hoisted_2={key:0,class:"w-[356px] h-full"},_hoisted_3={key:0,class:"w-full h-14 py-2 pl-2 pr-[364px] bg-fgray-1050"},_hoisted_4={key:1,class:"absolute z-10 w-full h-[104px] px-2 pt-2 pb-14 bg-fgray-1050"},_hoisted_5={key:2,class:"relative",style:{height:"calc(100dvh - 100vw / 1.4)"}},_hoisted_6={key:1,class:"fixed z-20 bottom-0 right-0 w-[356px] h-14 p-2"},_hoisted_7={key:2,class:"fixed bottom-0 z-20 w-full p-2 h-14 bg-fgray-1050"},TRANSITION_MS=150,_sfc_main=defineComponent({__name:"WorkView",setup(n){const e=useRoute(),t=computed(()=>e.params.wid),r=computed(()=>e.query.comment),a=computed(()=>e.query.reply),s=ref(),o=ref(!1),l=ref(),d=ref(!1),c=ref(!1),f=()=>{s.value=void 0,o.value=!1,d.value=!1,c.value=!1,$axios.get(`/work/${t.value}`).then(async Y=>{var de;if(Y.data.item)s.value=Y.data.item,await BookNote.init(Y.data.item.file_url),o.value=!0;else{const fe=Y.status;useErrorStore().showError(((de=Y==null?void 0:Y.data)==null?void 0:de.error)||"Something went wrong.",fe)}}).then(()=>t.value!==void 0?$axios.get(`/work/${t.value}/comment`):null).then(Y=>{Y&&(l.value=Y.data.items)}).catch(Y=>{var fe,Te,O;console.error(Y);const de=(fe=Y.response)==null?void 0:fe.status;useErrorStore().showError(((O=(Te=Y==null?void 0:Y.response)==null?void 0:Te.data)==null?void 0:O.error)||"Something went wrong.",de)})};watch(t,()=>{f()},{immediate:!0});const _=ref(!1),m=computed(()=>_.value?"transition-all duration-150":""),g=ref(!1),y=ref(!1),x=ref(!1),u=ref(!1),p=ref(!0),M=ref(!0),S=ref(!1),b=ref(!1),A=ref(!1),T=ref(!1),E=ref(!1),B=ref(!1),P=ref(!1),C=ref(!1),I=ref(!1),N=ref(!1),D=ref(window.innerWidth>window.innerHeight);r.value&&(D.value?(g.value=!0,x.value=!0,p.value=!1,S.value=!0,A.value=!0,E.value=!1):(y.value=!0,u.value=!0,M.value=!1,b.value=!0,T.value=!0,B.value=!1));const V=ref(!0);let R=null;const F=()=>{$(),R=setTimeout(()=>{V.value=!1},2e3)},$=()=>{R&&(clearTimeout(R),R=null)},W=()=>{V.value=!V.value,V.value&&d.value?F():$()};watch(d,Y=>{Y?V.value&&F():($(),V.value=!0)});const J=()=>{_.value=!0;const Y=g.value;g.value=!g.value,Y&&(E.value=!1),setTimeout(()=>{_.value=!1,Y&&(S.value&&(S.value=!1),P.value&&(P.value=!1))},TRANSITION_MS)},j=()=>{_.value=!0;const Y=y.value;y.value=!y.value,Y&&(B.value=!1,b.value&&(b.value=!1),C.value&&(C.value=!1)),setTimeout(()=>{_.value=!1},TRANSITION_MS)},ie=()=>{const Y=S.value;S.value=!S.value,Y||g.value?E.value=!0:(E.value=!1,g.value=!0,_.value=!0,setTimeout(()=>{_.value=!1},TRANSITION_MS))},ae=()=>{const Y=b.value;b.value=!b.value,Y||y.value?B.value=!0:(B.value=!1,y.value=!0,_.value=!0,setTimeout(()=>{_.value=!1},TRANSITION_MS))},he=()=>{P.value=!P.value},z=()=>{C.value=!C.value};watch(g,Y=>{Y?(x.value=!0,setTimeout(()=>{p.value=!1},TRANSITION_MS)):(setTimeout(()=>{x.value=!1},TRANSITION_MS),p.value=!0)}),watch(y,Y=>{Y?(u.value=!0,setTimeout(()=>{M.value=!1},TRANSITION_MS)):(setTimeout(()=>{u.value=!1},TRANSITION_MS),M.value=!0)}),watch(S,Y=>{Y?A.value=!0:setTimeout(()=>{A.value=!1},TRANSITION_MS)}),watch(b,Y=>{Y?T.value=!0:setTimeout(()=>{T.value=!1},TRANSITION_MS)}),watch(P,Y=>{Y?I.value=!0:setTimeout(()=>{I.value=!1},TRANSITION_MS)}),watch(C,Y=>{Y?N.value=!0:setTimeout(()=>{N.value=!1},TRANSITION_MS)}),watch(D,Y=>{_.value=!1,Y?(y.value&&(y.value=!!C.value),b.value&&(b.value=!1)):(g.value&&(g.value=!1),S.value&&(S.value=!1))});const X=()=>{D.value=window.innerWidth>window.innerHeight};onMounted(async()=>{window.addEventListener("resize",X)}),onBeforeUnmount(()=>{window.removeEventListener("resize",X),$()});const re=ref(!1);return(Y,de)=>(openBlock(),createElementBlock(Fragment,null,[s.value?(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",{class:normalizeClass(["flex",[m.value]]),style:normalizeStyle({height:D.value?g.value?"100dvh":"calc(100dvh - 56px)":y.value?"calc(100vw / 1.4)":"calc(100dvh - 104px)"})},[createBaseVNode("div",{class:normalizeClass(["relative",[m.value]]),style:normalizeStyle({width:D.value&&g.value?"calc(100% - 356px)":"100%"})},[createVNode(NoteView,{initialized:o.value,onCanvasTapped:W,onCancelAnimation:de[0]||(de[0]=fe=>{d.value=!1,c.value=!1})},null,8,["initialized"]),withDirectives(createVNode(WorkTopFloating,{onOpenNavGuide:de[1]||(de[1]=fe=>re.value=!0)},null,512),[[vShow,V.value]]),re.value?(openBlock(),createBlock(_sfc_main$d,{key:0,onClose:de[2]||(de[2]=fe=>re.value=!1)})):createCommentVNode("",!0),s.value.use_sequence?withDirectives((openBlock(),createBlock(WorkBottomFloating,{key:1,"is-playing":d.value,isOnTrack:c.value,onPlayAnimation:de[3]||(de[3]=fe=>d.value=!0),onCancelAnimation:de[4]||(de[4]=fe=>d.value=!1),onSetOnTrack:de[5]||(de[5]=fe=>c.value=!0)},null,8,["is-playing","isOnTrack"])),[[vShow,V.value]]):createCommentVNode("",!0)],6),D.value?(openBlock(),createElementBlock("div",{key:0,class:normalizeClass(["relative right-0 h-full",[m.value]]),style:normalizeStyle({width:g.value?"356px":"0px"})},[x.value?(openBlock(),createElementBlock("div",_hoisted_2,[createVNode(_sfc_main$9,{modelValue:s.value,"onUpdate:modelValue":de[6]||(de[6]=fe=>s.value=fe),onInfo:J,onEdit:he},null,8,["modelValue"])])):createCommentVNode("",!0),createBaseVNode("div",{class:normalizeClass(["absolute z-30 top-0 w-[356px] h-[100dvh]",[E.value?"transition-transform duration-150":""]]),style:normalizeStyle({transform:S.value?"translateX(0)":"translateX(100%)"})},[A.value?(openBlock(),createBlock(_sfc_main$5,{key:0,work:s.value,"onUpdate:work":de[7]||(de[7]=fe=>s.value=fe),modelValue:l.value,"onUpdate:modelValue":de[8]||(de[8]=fe=>l.value=fe),onToggleComment:ie,onInfo:J,highlightCommentId:r.value,highlightReplyId:a.value},null,8,["work","modelValue","highlightCommentId","highlightReplyId"])):createCommentVNode("",!0)],6),createBaseVNode("div",{class:"absolute z-30 top-0 w-[356px] h-[100dvh] transition-transform duration-150",style:normalizeStyle({transform:P.value?"translateX(0)":"translateX(100%)"})},[I.value?(openBlock(),createBlock(_sfc_main$3,{key:0,modelValue:s.value,"onUpdate:modelValue":de[9]||(de[9]=fe=>s.value=fe),onEdit:he,onInfo:J},null,8,["modelValue"])):createCommentVNode("",!0)],4)],6)):createCommentVNode("",!0)],6),createBaseVNode("div",{class:normalizeClass(["flex flex-col",[m.value]]),style:normalizeStyle({height:D.value?g.value?"0px":"56px":y.value?"calc(100dvh - 100vw / 1.4)":"0px"})},[D.value?(openBlock(),createElementBlock("div",_hoisted_3,[withDirectives(createVNode(_sfc_main$b,{work:s.value,onClick:J},null,8,["work"]),[[vShow,p.value]])])):(openBlock(),createElementBlock("div",_hoisted_4,[withDirectives(createVNode(_sfc_main$b,{work:s.value,onClick:j},null,8,["work"]),[[vShow,M.value]])])),D.value?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_5,[u.value?(openBlock(),createElementBlock("div",{key:0,class:"relative size-full",style:normalizeStyle({zIndex:y.value?"20":"0"})},[createVNode(_sfc_main$9,{modelValue:s.value,"onUpdate:modelValue":de[10]||(de[10]=fe=>s.value=fe),onInfo:j,onEdit:z},null,8,["modelValue"])],4)):createCommentVNode("",!0),createBaseVNode("div",{class:normalizeClass(["absolute bottom-0 left-0 z-30 size-full",[B.value?"transition-transform duration-150":""]]),style:normalizeStyle({transform:b.value?"translateX(0)":"translateX(100%)"})},[T.value?(openBlock(),createBlock(_sfc_main$5,{key:0,work:s.value,"onUpdate:work":de[11]||(de[11]=fe=>s.value=fe),modelValue:l.value,"onUpdate:modelValue":de[12]||(de[12]=fe=>l.value=fe),onToggleComment:ae,onInfo:j,highlightCommentId:r.value,highlightReplyId:a.value},null,8,["work","modelValue","highlightCommentId","highlightReplyId"])):createCommentVNode("",!0)],6),createBaseVNode("div",{class:"absolute bottom-0 left-0 z-30 transition-transform duration-150 size-full",style:normalizeStyle({transform:C.value?"translateX(0)":"translateX(100%)"})},[N.value?(openBlock(),createBlock(_sfc_main$3,{key:0,modelValue:s.value,"onUpdate:modelValue":de[13]||(de[13]=fe=>s.value=fe),onEdit:z,onInfo:j},null,8,["modelValue"])):createCommentVNode("",!0)],4)]))],6),D.value?(openBlock(),createElementBlock("div",{key:0,class:normalizeClass(["fixed bottom-0 right-0 z-0 h-14 bg-fgray-1050",[m.value]]),style:normalizeStyle({width:g.value?"356px":"0px"})},null,6)):createCommentVNode("",!0),D.value?(openBlock(),createElementBlock("div",_hoisted_6,[createVNode(_sfc_main$1,{modelValue:s.value,"onUpdate:modelValue":de[14]||(de[14]=fe=>s.value=fe),onComment:ie},null,8,["modelValue"])])):(openBlock(),createElementBlock("div",_hoisted_7,[createVNode(_sfc_main$1,{modelValue:s.value,"onUpdate:modelValue":de[15]||(de[15]=fe=>s.value=fe),onComment:ae},null,8,["modelValue"])])),createVNode(_sfc_main$k)])):createCommentVNode("",!0),createVNode(_sfc_main$f,{show:!s.value||!o.value},null,8,["show"])],64))}});export{_sfc_main as default};
