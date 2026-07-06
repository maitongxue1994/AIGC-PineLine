const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Studio-Btyz4nTg.js","assets/motion-CsxRcwNB.js","assets/react-BBRMhjAv.js","assets/flow-YPDRCUp7.js","assets/designTokens-I4_I-z61.js","assets/Studio-BZV40eAE.css","assets/Projects-BmdvsrOU.js"])))=>i.map(i=>d[i]);
var Ri=Object.defineProperty;var Bi=(t,n,s)=>n in t?Ri(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s;var Vn=(t,n,s)=>Bi(t,typeof n!="symbol"?n+"":n,s);import{j as e,m as Xe,A as Ti}from"./motion-CsxRcwNB.js";import{a as go,r as a,R as fo,L as xt,N as er,u as Di,b as Pi,c as on,B as Ai}from"./react-BBRMhjAv.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();var co={},tr=go;co.createRoot=tr.createRoot,co.hydrateRoot=tr.hydrateRoot;const zi="modulepreload",Wi=function(t){return"/"+t},nr={},Tr=function(n,s,i){let o=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));o=Promise.allSettled(s.map(m=>{if(m=Wi(m),m in nr)return;nr[m]=!0;const $=m.endsWith(".css"),g=$?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${g}`))return;const y=document.createElement("link");if(y.rel=$?"stylesheet":zi,$||(y.as="script"),y.crossOrigin="",y.href=m,p&&y.setAttribute("nonce",p),document.head.appendChild(y),$)return new Promise((w,R)=>{y.addEventListener("load",w),y.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(d){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return o.then(d=>{for(const p of d||[])p.status==="rejected"&&r(p.reason);return n().catch(r)})};var Oi=`.styles-module__popup___IhzrD svg[fill=none] {
  fill: none !important;
}
.styles-module__popup___IhzrD svg[fill=none] :not([fill]) {
  fill: none !important;
}

@keyframes styles-module__popupEnter___AuQDN {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}
@keyframes styles-module__popupExit___JJKQX {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
}
@keyframes styles-module__shake___jdbWe {
  0%, 100% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(0);
  }
  20% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);
  }
  40% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);
  }
  60% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);
  }
  80% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);
  }
}
.styles-module__popup___IhzrD {
  position: fixed;
  transform: translateX(-50%);
  width: 280px;
  padding: 0.75rem 1rem 14px;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  z-index: 100001;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  will-change: transform, opacity;
  opacity: 0;
}
.styles-module__popup___IhzrD.styles-module__enter___L7U7N {
  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w {
  opacity: 1;
  transform: translateX(-50%) scale(1) translateY(0);
}
.styles-module__popup___IhzrD.styles-module__exit___5eGjE {
  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {
  animation: styles-module__shake___jdbWe 0.25s ease-out;
}

.styles-module__header___wWsSi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5625rem;
}

.styles-module__element___fTV2z {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.styles-module__headerToggle___WpW0b {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {
  flex: 1;
}

.styles-module__chevron___ZZJlR {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {
  transform: rotate(90deg);
}

.styles-module__stylesWrapper___pnHgy {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {
  grid-template-rows: 1fr;
}

.styles-module__stylesInner___YYZe2 {
  overflow: hidden;
}

.styles-module__stylesBlock___VfQKn {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.6875rem;
  line-height: 1.5;
}

.styles-module__styleLine___1YQiD {
  color: rgba(255, 255, 255, 0.85);
  word-break: break-word;
}

.styles-module__styleProperty___84L1i {
  color: #c792ea;
}

.styles-module__styleValue___q51-h {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__timestamp___Dtpsv {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.styles-module__quote___mcMmQ {
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  line-height: 1.45;
}

.styles-module__textarea___jrSae {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
}
.styles-module__textarea___jrSae:focus {
  border-color: var(--agentation-color-blue);
}
.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {
  border-color: var(--agentation-color-green);
}
.styles-module__textarea___jrSae::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__textarea___jrSae::-webkit-scrollbar {
  width: 6px;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-track {
  background: transparent;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.styles-module__actions___D6x3f {
  display: flex;
  justify-content: flex-end;
  gap: 0.375rem;
  margin-top: 0.5rem;
}

.styles-module__cancel___hRjnL,
.styles-module__submit___K-mIR {
  padding: 0.4rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.styles-module__cancel___hRjnL {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__cancel___hRjnL:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.styles-module__submit___K-mIR {
  color: white;
}
.styles-module__submit___K-mIR:hover:not(:disabled) {
  filter: brightness(0.9);
}
.styles-module__submit___K-mIR:disabled {
  cursor: not-allowed;
}

.styles-module__deleteWrapper___oSjdo {
  margin-right: auto;
}

.styles-module__deleteButton___4VuAE {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__deleteButton___4VuAE:active {
  transform: scale(0.92);
}

.styles-module__light___6AaSQ.styles-module__popup___IhzrD {
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___6AaSQ .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.6);
}
.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {
  background: rgba(0, 0, 0, 0.03);
}
.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {
  color: #7c3aed;
}
.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.04);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae {
  background: rgba(0, 0, 0, 0.03);
  color: #1a1a1a;
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}`,Fi={popup:"styles-module__popup___IhzrD",enter:"styles-module__enter___L7U7N",entered:"styles-module__entered___COX-w",exit:"styles-module__exit___5eGjE",shake:"styles-module__shake___jdbWe",header:"styles-module__header___wWsSi",element:"styles-module__element___fTV2z",headerToggle:"styles-module__headerToggle___WpW0b",chevron:"styles-module__chevron___ZZJlR",expanded:"styles-module__expanded___2Hxgv",stylesWrapper:"styles-module__stylesWrapper___pnHgy",stylesInner:"styles-module__stylesInner___YYZe2",stylesBlock:"styles-module__stylesBlock___VfQKn",styleLine:"styles-module__styleLine___1YQiD",styleProperty:"styles-module__styleProperty___84L1i",styleValue:"styles-module__styleValue___q51-h",timestamp:"styles-module__timestamp___Dtpsv",quote:"styles-module__quote___mcMmQ",textarea:"styles-module__textarea___jrSae",actions:"styles-module__actions___D6x3f",cancel:"styles-module__cancel___hRjnL",submit:"styles-module__submit___K-mIR",deleteWrapper:"styles-module__deleteWrapper___oSjdo",deleteButton:"styles-module__deleteButton___4VuAE",light:"styles-module__light___6AaSQ"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-annotation-popup-css-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-annotation-popup-css-styles",document.head.appendChild(t)),t.textContent=Oi}var Ge=Fi,Hi=`.icon-transitions-module__iconState___uqK9J {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center;
}

.icon-transitions-module__iconStateFast___HxlMm {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: center;
}

.icon-transitions-module__iconFade___nPwXg {
  transition: opacity 0.2s ease;
}

.icon-transitions-module__iconFadeFast___Ofb2t {
  transition: opacity 0.15s ease;
}

.icon-transitions-module__visible___PlHsU {
  opacity: 1 !important;
}

.icon-transitions-module__visibleScaled___8Qog- {
  opacity: 1 !important;
  transform: scale(1);
}

.icon-transitions-module__hidden___ETykt {
  opacity: 0 !important;
}

.icon-transitions-module__hiddenScaled___JXn-m {
  opacity: 0 !important;
  transform: scale(0.8);
}

.icon-transitions-module__sending___uaLN- {
  opacity: 0.5 !important;
  transform: scale(0.8);
}`,Yi={iconState:"icon-transitions-module__iconState___uqK9J",iconStateFast:"icon-transitions-module__iconStateFast___HxlMm",iconFade:"icon-transitions-module__iconFade___nPwXg",iconFadeFast:"icon-transitions-module__iconFadeFast___Ofb2t",visible:"icon-transitions-module__visible___PlHsU",visibleScaled:"icon-transitions-module__visibleScaled___8Qog-",hidden:"icon-transitions-module__hidden___ETykt",hiddenScaled:"icon-transitions-module__hiddenScaled___JXn-m",sending:"icon-transitions-module__sending___uaLN-"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-components-icon-transitions");t||(t=document.createElement("style"),t.id="feedback-tool-styles-components-icon-transitions",document.head.appendChild(t)),t.textContent=Hi}var qe=Yi,Ui=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M8 3v10M3 8h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),Xi=({size:t=24,style:n={}})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",style:n,children:[e.jsxs("g",{clipPath:"url(#clip0_list_sparkle)",children:[e.jsx("path",{d:"M11.5 12L5.5 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M18.5 6.75L5.5 6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M9.25 17.25L5.5 17.25",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_list_sparkle",children:e.jsx("rect",{width:"24",height:"24",fill:"white"})})})]}),Qi=({size:t=20,...n})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",...n,children:[e.jsx("circle",{cx:"10",cy:"10",r:"5.375",stroke:"currentColor",strokeWidth:"1.25"}),e.jsx("path",{d:"M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("circle",{cx:"10",cy:"12.625",r:"0.625",fill:"currentColor"})]}),qi=({size:t=24,copied:n=!1,tint:s})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",style:s?{color:s,transition:"color 0.3s ease"}:void 0,children:[e.jsxs("g",{className:`${qe.iconState} ${n?qe.hiddenScaled:qe.visibleScaled}`,children:[e.jsx("path",{d:"M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),e.jsxs("g",{className:`${qe.iconState} ${n?qe.visibleScaled:qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})]}),Vi=({size:t=24,state:n="idle"})=>{const s=n==="idle",i=n==="sent",o=n==="failed",r=n==="sending";return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("g",{className:`${qe.iconStateFast} ${s?qe.visibleScaled:r?qe.sending:qe.hiddenScaled}`,children:e.jsx("path",{d:"M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsxs("g",{className:`${qe.iconStateFast} ${i?qe.visibleScaled:qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("g",{className:`${qe.iconStateFast} ${o?qe.visibleScaled:qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M12 8V12",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"15",r:"0.5",fill:"var(--agentation-color-red)",stroke:"var(--agentation-color-red)",strokeWidth:"1"})]})]})},Gi=({size:t=24,isOpen:n=!0})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{className:`${qe.iconFade} ${n?qe.visible:qe.hidden}`,children:[e.jsx("path",{d:"M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("g",{className:`${qe.iconFade} ${n?qe.hidden:qe.visible}`,children:[e.jsx("path",{d:"M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z",fill:"currentColor"}),e.jsx("path",{d:"M5 19L19 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})]}),Ki=({size:t=24,isPaused:n=!1})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{className:`${qe.iconFadeFast} ${n?qe.hidden:qe.visible}`,children:[e.jsx("path",{d:"M8 6L8 18",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("path",{d:"M16 18L16 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),e.jsx("path",{className:`${qe.iconFadeFast} ${n?qe.visible:qe.hidden}`,d:"M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z",stroke:"currentColor",strokeWidth:"1.5"})]}),Ji=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("circle",{cx:"12",cy:"12",r:"2.5",stroke:"currentColor",strokeWidth:"1.5"})]}),Zi=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),Dr=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{clipPath:"url(#clip0_2_53)",children:[e.jsx("path",{d:"M16.25 16.25L7.75 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M7.75 16.25L16.25 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2_53",children:e.jsx("rect",{width:"24",height:"24",fill:"white"})})})]}),el=({size:t=24})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M16.7198 6.21973C17.0127 5.92683 17.4874 5.92683 17.7803 6.21973C18.0732 6.51262 18.0732 6.9874 17.7803 7.28027L13.0606 12L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4875 18.0731 17.0127 18.0731 16.7198 17.7803L12.0001 13.0605L7.28033 17.7803C6.98746 18.0731 6.51268 18.0731 6.21979 17.7803C5.92689 17.4874 5.92689 17.0126 6.21979 16.7197L10.9395 12L6.21979 7.28027C5.92689 6.98738 5.92689 6.51262 6.21979 6.21973C6.51268 5.92683 6.98744 5.92683 7.28033 6.21973L12.0001 10.9395L16.7198 6.21973Z",fill:"currentColor"})}),tl=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",children:[e.jsx("path",{d:"M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M10 3.9585V5.05698",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M10 14.9429V16.0414",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M5.7269 5.72656L6.50682 6.50649",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13.4932 13.4932L14.2731 14.2731",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M3.95834 10H5.05683",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M14.9432 10H16.0417",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M5.7269 14.2731L6.50682 13.4932",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13.4932 6.50649L14.2731 5.72656",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]}),nl=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",children:e.jsx("path",{d:"M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z",stroke:"currentColor",strokeWidth:"1.13793",strokeLinecap:"round",strokeLinejoin:"round"})}),sl=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375",stroke:"currentColor",strokeWidth:"0.9",strokeLinecap:"round",strokeLinejoin:"round"})}),ol=({size:t=24})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),rl=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M8.5 3.5L4 8L8.5 12.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),il=({size:t=24})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("line",{x1:"9",y1:"9",x2:"9",y2:"21",stroke:"currentColor",strokeWidth:"1.5"})]}),Pr=["data-feedback-toolbar","data-annotation-popup","data-annotation-marker"],Ks=Pr.flatMap(t=>[`:not([${t}])`,`:not([${t}] *)`]).join(""),_o="feedback-freeze-styles",Js="__agentation_freeze";function ll(){if(typeof window>"u")return{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:n=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]};const t=window;return t[Js]||(t[Js]={frozen:!1,installed:!1,origSetTimeout:null,origSetInterval:null,origRAF:null,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}),t[Js]}var Ne=ll();typeof window<"u"&&!Ne.installed&&(Ne.origSetTimeout=window.setTimeout.bind(window),Ne.origSetInterval=window.setInterval.bind(window),Ne.origRAF=window.requestAnimationFrame.bind(window),window.setTimeout=(t,n,...s)=>typeof t=="string"?Ne.origSetTimeout(t,n):Ne.origSetTimeout((...i)=>{Ne.frozen?Ne.frozenTimeoutQueue.push(()=>t(...i)):t(...i)},n,...s),window.setInterval=(t,n,...s)=>typeof t=="string"?Ne.origSetInterval(t,n):Ne.origSetInterval((...i)=>{Ne.frozen||t(...i)},n,...s),window.requestAnimationFrame=t=>Ne.origRAF(n=>{Ne.frozen?Ne.frozenRAFQueue.push(t):t(n)}),Ne.installed=!0);var re=Ne.origSetTimeout,al=Ne.origSetInterval,Bn=Ne.origRAF;function cl(t){return t?Pr.some(n=>{var s;return!!((s=t.closest)!=null&&s.call(t,`[${n}]`))}):!1}function dl(){if(typeof document>"u"||Ne.frozen)return;Ne.frozen=!0,Ne.frozenTimeoutQueue=[],Ne.frozenRAFQueue=[];let t=document.getElementById(_o);t||(t=document.createElement("style"),t.id=_o),t.textContent=`
    *${Ks},
    *${Ks}::before,
    *${Ks}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `,document.head.appendChild(t),Ne.pausedAnimations=[];try{document.getAnimations().forEach(n=>{var i;if(n.playState!=="running")return;const s=(i=n.effect)==null?void 0:i.target;cl(s)||(n.pause(),Ne.pausedAnimations.push(n))})}catch{}document.querySelectorAll("video").forEach(n=>{n.paused||(n.dataset.wasPaused="false",n.pause())})}function sr(){var s;if(typeof document>"u"||!Ne.frozen)return;Ne.frozen=!1;const t=Ne.frozenTimeoutQueue;Ne.frozenTimeoutQueue=[];for(const i of t)Ne.origSetTimeout(()=>{if(Ne.frozen){Ne.frozenTimeoutQueue.push(i);return}try{i()}catch(o){console.warn("[agentation] Error replaying queued timeout:",o)}},0);const n=Ne.frozenRAFQueue;Ne.frozenRAFQueue=[];for(const i of n)Ne.origRAF(o=>{if(Ne.frozen){Ne.frozenRAFQueue.push(i);return}i(o)});for(const i of Ne.pausedAnimations)try{i.play()}catch(o){console.warn("[agentation] Error resuming animation:",o)}Ne.pausedAnimations=[],(s=document.getElementById(_o))==null||s.remove(),document.querySelectorAll("video").forEach(i=>{i.dataset.wasPaused==="false"&&(i.play().catch(()=>{}),delete i.dataset.wasPaused)})}function Zs(t){if(!t)return;const n=s=>s.stopImmediatePropagation();document.addEventListener("focusin",n,!0),document.addEventListener("focusout",n,!0);try{t.focus()}finally{document.removeEventListener("focusin",n,!0),document.removeEventListener("focusout",n,!0)}}var $s=a.forwardRef(function({element:n,timestamp:s,selectedText:i,placeholder:o="What should change?",initialValue:r="",submitLabel:d="Add",onSubmit:p,onCancel:m,onDelete:$,style:g,accentColor:y="#3c82f7",isExiting:w=!1,lightMode:R=!1,computedStyles:k},B){const[X,A]=a.useState(r),[me,Pe]=a.useState(!1),[I,ne]=a.useState("initial"),[he,z]=a.useState(!1),[je,Le]=a.useState(!1),be=a.useRef(null),_e=a.useRef(null),Fe=a.useRef(null),Ue=a.useRef(null);a.useEffect(()=>{w&&I!=="exit"&&ne("exit")},[w,I]),a.useEffect(()=>{re(()=>{ne("enter")},0);const ue=re(()=>{ne("entered")},200),Ae=re(()=>{const Je=be.current;Je&&(Zs(Je),Je.selectionStart=Je.selectionEnd=Je.value.length,Je.scrollTop=Je.scrollHeight)},50);return()=>{clearTimeout(ue),clearTimeout(Ae),Fe.current&&clearTimeout(Fe.current),Ue.current&&clearTimeout(Ue.current)}},[]);const pe=a.useCallback(()=>{Ue.current&&clearTimeout(Ue.current),Pe(!0),Ue.current=re(()=>{Pe(!1),Zs(be.current)},250)},[]);a.useImperativeHandle(B,()=>({shake:pe}),[pe]);const $e=a.useCallback(()=>{ne("exit"),Fe.current=re(()=>{m()},150)},[m]),J=a.useCallback(()=>{X.trim()&&p(X.trim())},[X,p]),it=a.useCallback(ue=>{ue.stopPropagation(),!ue.nativeEvent.isComposing&&(ue.key==="Enter"&&!ue.shiftKey&&(ue.preventDefault(),J()),ue.key==="Escape"&&$e())},[J,$e]),P=[Ge.popup,R?Ge.light:"",I==="enter"?Ge.enter:"",I==="entered"?Ge.entered:"",I==="exit"?Ge.exit:"",me?Ge.shake:""].filter(Boolean).join(" ");return e.jsxs("div",{ref:_e,className:P,"data-annotation-popup":!0,style:g,onClick:ue=>ue.stopPropagation(),children:[e.jsxs("div",{className:Ge.header,children:[k&&Object.keys(k).length>0?e.jsxs("button",{className:Ge.headerToggle,onClick:()=>{const ue=je;Le(!je),ue&&re(()=>Zs(be.current),0)},type:"button",children:[e.jsx("svg",{className:`${Ge.chevron} ${je?Ge.expanded:""}`,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M5.5 10.25L9 7.25L5.75 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsx("span",{className:Ge.element,children:n})]}):e.jsx("span",{className:Ge.element,children:n}),s&&e.jsx("span",{className:Ge.timestamp,children:s})]}),k&&Object.keys(k).length>0&&e.jsx("div",{className:`${Ge.stylesWrapper} ${je?Ge.expanded:""}`,children:e.jsx("div",{className:Ge.stylesInner,children:e.jsx("div",{className:Ge.stylesBlock,children:Object.entries(k).map(([ue,Ae])=>e.jsxs("div",{className:Ge.styleLine,children:[e.jsx("span",{className:Ge.styleProperty,children:ue.replace(/([A-Z])/g,"-$1").toLowerCase()}),": ",e.jsx("span",{className:Ge.styleValue,children:Ae}),";"]},ue))})})}),i&&e.jsxs("div",{className:Ge.quote,children:["“",i.slice(0,80),i.length>80?"...":"","”"]}),e.jsx("textarea",{ref:be,className:Ge.textarea,style:{borderColor:he?y:void 0},placeholder:o,value:X,onChange:ue=>A(ue.target.value),onFocus:()=>z(!0),onBlur:()=>z(!1),rows:2,onKeyDown:it}),e.jsxs("div",{className:Ge.actions,children:[$&&e.jsx("div",{className:Ge.deleteWrapper,children:e.jsx("button",{className:Ge.deleteButton,onClick:$,type:"button",children:e.jsx(ol,{size:22})})}),e.jsx("button",{className:Ge.cancel,onClick:$e,children:"Cancel"}),e.jsx("button",{className:Ge.submit,style:{backgroundColor:y,opacity:X.trim()?1:.4},onClick:J,disabled:!X.trim(),children:d})]})]})}),_l=({content:t,children:n,...s})=>{const[i,o]=a.useState(!1),[r,d]=a.useState(!1),[p,m]=a.useState({top:0,right:0}),$=a.useRef(null),g=a.useRef(null),y=a.useRef(null),w=()=>{if($.current){const B=$.current.getBoundingClientRect();m({top:B.top+B.height/2,right:window.innerWidth-B.left+8})}},R=()=>{d(!0),y.current&&(clearTimeout(y.current),y.current=null),w(),g.current=re(()=>{o(!0)},500)},k=()=>{g.current&&(clearTimeout(g.current),g.current=null),o(!1),y.current=re(()=>{d(!1)},150)};return a.useEffect(()=>()=>{g.current&&clearTimeout(g.current),y.current&&clearTimeout(y.current)},[]),e.jsxs(e.Fragment,{children:[e.jsx("span",{ref:$,onMouseEnter:R,onMouseLeave:k,...s,children:n}),r&&go.createPortal(e.jsx("div",{"data-feedback-toolbar":!0,style:{position:"fixed",top:p.top,right:p.right,transform:"translateY(-50%)",padding:"6px 10px",background:"#383838",color:"rgba(255, 255, 255, 0.7)",fontSize:"11px",fontWeight:400,lineHeight:"14px",borderRadius:"10px",width:"180px",textAlign:"left",zIndex:100020,pointerEvents:"none",boxShadow:"0px 1px 8px rgba(0, 0, 0, 0.28)",opacity:i?1:0,transition:"opacity 0.15s ease"},children:t}),document.body)]})},ul=`.styles-module__tooltip___mcXL2 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
}

.styles-module__tooltipIcon___Nq2nD {
  transform: translateY(0.5px);
  color: #fff;
  opacity: 0.2;
  transition: opacity 0.15s ease;
  will-change: transform;
}
.styles-module__tooltip___mcXL2:hover .styles-module__tooltipIcon___Nq2nD {
  opacity: 0.5;
}
[data-agentation-theme=light] .styles-module__tooltipIcon___Nq2nD {
  color: #000;
}`,hl={tooltip:"styles-module__tooltip___mcXL2",tooltipIcon:"styles-module__tooltipIcon___Nq2nD"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-help-tooltip-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-help-tooltip-styles",document.head.appendChild(t)),t.textContent=ul}var or=hl,yn=({content:t})=>e.jsx(_l,{className:or.tooltip,content:t,children:e.jsx(Qi,{className:or.tooltipIcon})}),H={navigation:{width:800,height:56},hero:{width:800,height:320},header:{width:800,height:80},section:{width:800,height:400},sidebar:{width:240,height:400},footer:{width:800,height:160},modal:{width:480,height:300},card:{width:280,height:240},text:{width:400,height:120},image:{width:320,height:200},video:{width:480,height:270},table:{width:560,height:220},grid:{width:600,height:300},list:{width:300,height:180},chart:{width:400,height:240},button:{width:140,height:40},input:{width:280,height:56},form:{width:360,height:320},tabs:{width:480,height:240},dropdown:{width:200,height:200},toggle:{width:44,height:24},search:{width:320,height:44},avatar:{width:48,height:48},badge:{width:80,height:28},breadcrumb:{width:300,height:24},pagination:{width:300,height:36},progress:{width:240,height:8},divider:{width:600,height:1},accordion:{width:400,height:200},carousel:{width:600,height:300},toast:{width:320,height:64},tooltip:{width:180,height:40},pricing:{width:300,height:360},testimonial:{width:360,height:200},cta:{width:600,height:160},alert:{width:400,height:56},banner:{width:800,height:48},stat:{width:200,height:120},stepper:{width:480,height:48},tag:{width:72,height:28},rating:{width:160,height:28},map:{width:480,height:300},timeline:{width:360,height:320},fileUpload:{width:360,height:180},codeBlock:{width:480,height:200},calendar:{width:300,height:300},notification:{width:360,height:72},productCard:{width:280,height:360},profile:{width:280,height:200},drawer:{width:320,height:400},popover:{width:240,height:160},logo:{width:120,height:40},faq:{width:560,height:320},gallery:{width:560,height:360},checkbox:{width:20,height:20},radio:{width:20,height:20},slider:{width:240,height:32},datePicker:{width:300,height:320},skeleton:{width:320,height:120},chip:{width:96,height:32},icon:{width:24,height:24},spinner:{width:32,height:32},feature:{width:360,height:200},team:{width:560,height:280},login:{width:360,height:360},contact:{width:400,height:320}},Ar=[{section:"Layout",items:[{type:"navigation",label:"Navigation",...H.navigation},{type:"header",label:"Header",...H.header},{type:"hero",label:"Hero",...H.hero},{type:"section",label:"Section",...H.section},{type:"sidebar",label:"Sidebar",...H.sidebar},{type:"footer",label:"Footer",...H.footer},{type:"modal",label:"Modal",...H.modal},{type:"banner",label:"Banner",...H.banner},{type:"drawer",label:"Drawer",...H.drawer},{type:"popover",label:"Popover",...H.popover},{type:"divider",label:"Divider",...H.divider}]},{section:"Content",items:[{type:"card",label:"Card",...H.card},{type:"text",label:"Text",...H.text},{type:"image",label:"Image",...H.image},{type:"video",label:"Video",...H.video},{type:"table",label:"Table",...H.table},{type:"grid",label:"Grid",...H.grid},{type:"list",label:"List",...H.list},{type:"chart",label:"Chart",...H.chart},{type:"codeBlock",label:"Code Block",...H.codeBlock},{type:"map",label:"Map",...H.map},{type:"timeline",label:"Timeline",...H.timeline},{type:"calendar",label:"Calendar",...H.calendar},{type:"accordion",label:"Accordion",...H.accordion},{type:"carousel",label:"Carousel",...H.carousel},{type:"logo",label:"Logo",...H.logo},{type:"faq",label:"FAQ",...H.faq},{type:"gallery",label:"Gallery",...H.gallery}]},{section:"Controls",items:[{type:"button",label:"Button",...H.button},{type:"input",label:"Input",...H.input},{type:"search",label:"Search",...H.search},{type:"form",label:"Form",...H.form},{type:"tabs",label:"Tabs",...H.tabs},{type:"dropdown",label:"Dropdown",...H.dropdown},{type:"toggle",label:"Toggle",...H.toggle},{type:"stepper",label:"Stepper",...H.stepper},{type:"rating",label:"Rating",...H.rating},{type:"fileUpload",label:"File Upload",...H.fileUpload},{type:"checkbox",label:"Checkbox",...H.checkbox},{type:"radio",label:"Radio",...H.radio},{type:"slider",label:"Slider",...H.slider},{type:"datePicker",label:"Date Picker",...H.datePicker}]},{section:"Elements",items:[{type:"avatar",label:"Avatar",...H.avatar},{type:"badge",label:"Badge",...H.badge},{type:"tag",label:"Tag",...H.tag},{type:"breadcrumb",label:"Breadcrumb",...H.breadcrumb},{type:"pagination",label:"Pagination",...H.pagination},{type:"progress",label:"Progress",...H.progress},{type:"alert",label:"Alert",...H.alert},{type:"toast",label:"Toast",...H.toast},{type:"notification",label:"Notification",...H.notification},{type:"tooltip",label:"Tooltip",...H.tooltip},{type:"stat",label:"Stat",...H.stat},{type:"skeleton",label:"Skeleton",...H.skeleton},{type:"chip",label:"Chip",...H.chip},{type:"icon",label:"Icon",...H.icon},{type:"spinner",label:"Spinner",...H.spinner}]},{section:"Blocks",items:[{type:"pricing",label:"Pricing",...H.pricing},{type:"testimonial",label:"Testimonial",...H.testimonial},{type:"cta",label:"CTA",...H.cta},{type:"productCard",label:"Product Card",...H.productCard},{type:"profile",label:"Profile",...H.profile},{type:"feature",label:"Feature",...H.feature},{type:"team",label:"Team",...H.team},{type:"login",label:"Login",...H.login},{type:"contact",label:"Contact",...H.contact}]}],Wt={};for(const t of Ar)for(const n of t.items)Wt[n.type]=n;function M({w:t,h:n=3,strong:s}){return e.jsx("div",{style:{width:typeof t=="number"?`${t}px`:t,height:n,borderRadius:2,background:s?"var(--agd-bar-strong)":"var(--agd-bar)",flexShrink:0}})}function Qe({w:t,h:n,radius:s=3,style:i}){return e.jsx("div",{style:{width:typeof t=="number"?`${t}px`:t,height:typeof n=="number"?`${n}px`:n,borderRadius:s,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0,...i}})}function St({size:t}){return e.jsx("div",{style:{width:t,height:t,borderRadius:"50%",border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0}})}function ml({width:t,height:n}){const s=Math.max(8,n*.2);return e.jsxs("div",{style:{display:"flex",alignItems:"center",height:"100%",padding:`0 ${s}px`,gap:t*.02},children:[e.jsx(Qe,{w:Math.max(20,n*.5),h:Math.max(12,n*.4),radius:2}),e.jsxs("div",{style:{flex:1,display:"flex",gap:t*.03,marginLeft:t*.04},children:[e.jsx(M,{w:t*.06}),e.jsx(M,{w:t*.07}),e.jsx(M,{w:t*.05}),e.jsx(M,{w:t*.06})]}),e.jsx(Qe,{w:t*.1,h:Math.min(28,n*.5),radius:4})]})}function pl({width:t,height:n,text:s}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.05},children:[s?e.jsx("span",{style:{fontSize:Math.min(20,n*.08),fontWeight:600,color:"var(--agd-text-3)",textAlign:"center",maxWidth:"80%"},children:s}):e.jsx(M,{w:t*.5,h:Math.max(6,n*.04),strong:!0}),e.jsx(M,{w:t*.6}),e.jsx(M,{w:t*.4}),e.jsx(Qe,{w:Math.min(140,t*.2),h:Math.min(36,n*.12),radius:6,style:{marginTop:n*.06}})]})}function xl({width:t,height:n}){const s=Math.max(3,Math.floor(n/36));return e.jsxs("div",{style:{padding:t*.08,display:"flex",flexDirection:"column",gap:n*.03},children:[e.jsx(M,{w:t*.6,h:4,strong:!0}),Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(Qe,{w:10,h:10,radius:2}),e.jsx(M,{w:t*(.4+o*17%30/100)})]},o))]})}function gl({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/160)));return e.jsx("div",{style:{display:"flex",padding:`${n*.12}px ${t*.03}px`,gap:t*.05},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:"60%",h:3,strong:!0}),e.jsx(M,{w:"80%",h:2}),e.jsx(M,{w:"70%",h:2}),e.jsx(M,{w:"60%",h:2})]},o))})}function fl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px 12px",borderBottom:"1px solid var(--agd-stroke)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),e.jsxs("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[e.jsx(M,{w:"90%"}),e.jsx(M,{w:"70%"}),e.jsx(M,{w:"80%"})]}),e.jsxs("div",{style:{padding:"10px 12px",borderTop:"1px solid var(--agd-stroke)",display:"flex",justifyContent:"flex-end",gap:8},children:[e.jsx(Qe,{w:70,h:26,radius:4}),e.jsx(Qe,{w:70,h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})}function yl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{height:"40%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),e.jsxs("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"70%",h:4,strong:!0}),e.jsx(M,{w:"95%",h:2}),e.jsx(M,{w:"85%",h:2}),e.jsx(M,{w:"50%",h:2})]})]})}function bl({width:t,height:n,text:s}){if(s)return e.jsx("div",{style:{padding:4,fontSize:Math.min(14,n*.3),lineHeight:1.5,color:"var(--agd-text-3)",wordBreak:"break-word",overflow:"hidden"},children:s});const i=Math.max(2,Math.floor(n/18));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,padding:4},children:[e.jsx(M,{w:t*.6,h:5,strong:!0}),Array.from({length:i},(o,r)=>e.jsx(M,{w:`${70+r*13%25}%`,h:2},r))]})}function wl({width:t,height:n}){return e.jsx("div",{style:{height:"100%",position:"relative"},children:e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,preserveAspectRatio:"none",fill:"none",children:[e.jsx("line",{x1:"0",y1:"0",x2:t,y2:n,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("line",{x1:t,y1:"0",x2:"0",y2:n,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("circle",{cx:t*.3,cy:n*.3,r:Math.min(t,n)*.08,fill:"var(--agd-fill)",stroke:"var(--agd-stroke)",strokeWidth:"0.8"})]})})}function vl({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(t/100))),i=Math.max(2,Math.min(6,Math.floor(n/32)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--agd-stroke)",padding:"6px 0"},children:Array.from({length:s},(o,r)=>e.jsx("div",{style:{flex:1,padding:"0 8px"},children:e.jsx(M,{w:"70%",h:3,strong:!0})},r))}),Array.from({length:i},(o,r)=>e.jsx("div",{style:{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.03)",padding:"6px 0"},children:Array.from({length:s},(d,p)=>e.jsx("div",{style:{flex:1,padding:"0 8px"},children:e.jsx(M,{w:`${50+(r*7+p*13)%40}%`,h:2})},p))},r))]})}function kl({width:t,height:n}){const s=Math.max(2,Math.floor(n/28));return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,padding:4},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"4px 0"},children:[e.jsx(St,{size:8}),e.jsx(M,{w:`${55+o*17%35}%`,h:2})]},o))})}function jl({width:t,height:n,text:s}){return e.jsx("div",{style:{height:"100%",borderRadius:Math.min(8,n/3),border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:s?e.jsx("span",{style:{fontSize:Math.min(13,n*.4),fontWeight:500,color:"var(--agd-text-3)",letterSpacing:"-0.01em"},children:s}):e.jsx(M,{w:Math.max(20,t*.5),h:3,strong:!0})})}function Cl({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,height:"100%",justifyContent:"center"},children:[e.jsx(M,{w:Math.min(80,t*.3),h:2}),e.jsx("div",{style:{height:Math.min(36,n*.6),borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",paddingLeft:8},children:e.jsx(M,{w:"40%",h:2})})]})}function Sl({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(n/56)));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:n*.04,padding:8},children:[Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:60+o*17%30,h:2}),e.jsx(Qe,{w:"100%",h:28,radius:4})]},o)),e.jsx(Qe,{w:Math.min(120,t*.35),h:30,radius:6,style:{marginTop:8,alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}function Nl({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{display:"flex",gap:2,borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:s},(i,o)=>e.jsx("div",{style:{padding:"8px 12px",borderBottom:o===0?"2px solid var(--agd-bar-strong)":"none"},children:e.jsx(M,{w:60,h:3,strong:o===0})},o))}),e.jsxs("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[e.jsx(M,{w:"80%",h:2}),e.jsx(M,{w:"65%",h:2}),e.jsx(M,{w:"75%",h:2})]})]})}function Ml({width:t,height:n}){const s=Math.min(t,n)/2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s-1,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"1.5",strokeDasharray:"3 2"}),e.jsx("circle",{cx:t/2,cy:n*.38,r:s*.28,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"}),e.jsx("path",{d:`M${t/2-s*.55} ${n*.78} C${t/2-s*.55} ${n*.55} ${t/2+s*.55} ${n*.55} ${t/2+s*.55} ${n*.78}`,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"})]})}function $l({width:t,height:n}){return e.jsx("div",{style:{height:"100%",borderRadius:n/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(M,{w:Math.max(16,t*.5),h:2,strong:!0})})}function Il({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.08},children:[e.jsx(M,{w:t*.5,h:Math.max(5,n*.06),strong:!0}),e.jsx(M,{w:t*.35})]})}function Ll({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",gap:n*.04,padding:t*.04},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx(M,{w:t*.7}),e.jsx(M,{w:t*.5}),e.jsxs("div",{style:{flex:1,display:"flex",gap:t*.03,marginTop:n*.06},children:[e.jsx(Qe,{w:"33%",h:"100%",radius:4}),e.jsx(Qe,{w:"33%",h:"100%",radius:4}),e.jsx(Qe,{w:"33%",h:"100%",radius:4})]})]})}function El({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/140))),i=Math.max(1,Math.min(3,Math.floor(n/120)));return e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${s}, 1fr)`,gridTemplateRows:`repeat(${i}, 1fr)`,gap:6,height:"100%"},children:Array.from({length:s*i},(o,r)=>e.jsx(Qe,{w:"100%",h:"100%",radius:4},r))})}function Rl({width:t,height:n}){const s=Math.max(2,Math.floor((n-32)/28));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{padding:"6px 8px",borderBottom:"1px solid var(--agd-stroke)"},children:e.jsx(M,{w:t*.5,h:3,strong:!0})}),e.jsx("div",{style:{flex:1,padding:4,display:"flex",flexDirection:"column",gap:2},children:Array.from({length:s},(i,o)=>e.jsx("div",{style:{padding:"4px 6px",borderRadius:3,background:o===0?"var(--agd-fill)":"transparent"},children:e.jsx(M,{w:`${50+o*17%35}%`,h:2,strong:o===0})},o))})]})}function Bl({width:t,height:n}){const s=Math.min(t,n)/2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:t-2,height:n-2,rx:s,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("circle",{cx:t-s,cy:n/2,r:s*.7,fill:"var(--agd-bar)"})]})}function Tl({width:t,height:n}){const s=Math.min(n/2,20);return e.jsxs("div",{style:{height:"100%",borderRadius:s,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${s*.6}px`,gap:6},children:[e.jsx(St,{size:Math.min(14,n*.4)}),e.jsx(M,{w:"50%",h:2})]})}function Dl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx(St,{size:Math.min(20,n*.5)}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"60%",h:3,strong:!0}),e.jsx(M,{w:"80%",h:2})]}),e.jsx("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3,flexShrink:0}})]})}function Pl({width:t,height:n}){return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"0",y:"0",width:t,height:n,rx:n/2,stroke:"var(--agd-stroke)",strokeWidth:"0.8"}),e.jsx("rect",{x:"1",y:"1",width:t*.65,height:n-2,rx:(n-2)/2,fill:"var(--agd-bar)"})]})}function Al({width:t,height:n}){const s=Math.max(3,Math.min(7,Math.floor(t/50))),i=t/(s*2);return e.jsx("div",{style:{height:"100%",display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"0 4px",borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:s},(o,r)=>{const d=30+(r*37+17)%55;return e.jsx(Qe,{w:i,h:`${d}%`,radius:2},r)})})}function zl({width:t,height:n}){const s=Math.min(t,n)*.12;return e.jsxs("div",{style:{height:"100%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(Qe,{w:"100%",h:"100%",radius:4}),e.jsx("div",{style:{position:"absolute",width:s*2,height:s*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:0,height:0,borderLeft:`${s*.6}px solid var(--agd-bar-strong)`,borderTop:`${s*.4}px solid transparent`,borderBottom:`${s*.4}px solid transparent`,marginLeft:s*.15}})})]})}function Wl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{flex:1,width:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(M,{w:"60%",h:2})}),e.jsx("div",{style:{width:8,height:8,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-5}})]})}function Ol({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/80)));return e.jsx("div",{style:{display:"flex",alignItems:"center",height:"100%",gap:4},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[o>0&&e.jsx("span",{style:{color:"var(--agd-stroke)",fontSize:10},children:"/"}),e.jsx(M,{w:40+o*13%20,h:2,strong:o===s-1})]},o))})}function Fl({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(t/40))),i=Math.min(28,n*.8);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:4},children:Array.from({length:s},(o,r)=>e.jsx(Qe,{w:i,h:i,radius:4,style:r===1?{background:"var(--agd-bar)"}:void 0},r))})}function Hl({width:t}){return e.jsx("div",{style:{display:"flex",alignItems:"center",height:"100%"},children:e.jsx("div",{style:{width:"100%",height:1,background:"var(--agd-stroke)"}})})}function Yl({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(n/40)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:o===0?2:1},children:[e.jsx(M,{w:`${40+o*17%25}%`,h:3,strong:!0}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:o===0?"▼":"▶"})]},o))})}function Ul({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{flex:1,display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(Qe,{w:"100%",h:"100%",radius:4}),e.jsx("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"›"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:4},children:[e.jsx(St,{size:5}),e.jsx(St,{size:5}),e.jsx(St,{size:5})]})]})}function Xl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,gap:n*.04},children:[e.jsx(M,{w:t*.4,h:3,strong:!0}),e.jsx(M,{w:t*.3,h:6,strong:!0}),e.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,width:"100%",padding:"8px 0"},children:Array.from({length:4},(s,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx(St,{size:5}),e.jsx(M,{w:`${50+i*17%35}%`,h:2})]},i))}),e.jsx(Qe,{w:t*.7,h:Math.min(32,n*.1),radius:6,style:{background:"var(--agd-bar)"}})]})}function Ql({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:8},children:[e.jsx("span",{style:{fontSize:18,lineHeight:1,color:"var(--agd-stroke)",fontFamily:"serif"},children:"“"}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:"90%",h:2}),e.jsx(M,{w:"75%",h:2}),e.jsx(M,{w:"60%",h:2})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(St,{size:20}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[e.jsx(M,{w:60,h:3,strong:!0}),e.jsx(M,{w:40,h:2})]})]})]})}function ql({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.08},children:[e.jsx(M,{w:t*.5,h:Math.max(4,n*.05),strong:!0}),e.jsx(M,{w:t*.35}),e.jsx(Qe,{w:Math.min(140,t*.25),h:Math.min(32,n*.15),radius:6,style:{marginTop:n*.04,background:"var(--agd-bar)"}})]})}function Vl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx("div",{style:{width:16,height:16,borderRadius:"50%",border:"1.5px solid var(--agd-bar-strong)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx("div",{style:{width:2,height:6,background:"var(--agd-bar-strong)",borderRadius:1}})}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"40%",h:3,strong:!0}),e.jsx(M,{w:"70%",h:2})]})]})}function Gl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"0 12px"},children:[e.jsx(M,{w:t*.4,h:3,strong:!0}),e.jsx(Qe,{w:60,h:Math.min(24,n*.6),radius:4})]})}function Kl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsx(M,{w:t*.5,h:2}),e.jsx(M,{w:t*.4,h:Math.max(8,n*.18),strong:!0}),e.jsx(M,{w:t*.3,h:2})]})}function Jl({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(t/100))),i=Math.min(12,n*.35);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 8px"},children:Array.from({length:s},(o,r)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0,flex:1},children:[e.jsx("div",{style:{width:i,height:i,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:r===0?"var(--agd-bar)":"transparent",flexShrink:0}}),r<s-1&&e.jsx("div",{style:{flex:1,height:1,background:"var(--agd-stroke)",margin:"0 4px"}})]},r))})}function Zl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:4,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"0 6px"},children:[e.jsx(M,{w:Math.max(16,t*.5),h:2,strong:!0}),e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0}})]})}function ea({width:t,height:n}){const i=Math.min(n*.7,t/7.5);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:i*.2},children:Array.from({length:5},(o,r)=>e.jsx("svg",{width:i,height:i,viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z",stroke:"var(--agd-stroke)",strokeWidth:"0.8",fill:r<3?"var(--agd-bar)":"none"})},r))})}function ta({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",position:"relative",borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",overflow:"hidden"},children:[e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",style:{position:"absolute",inset:0},children:[e.jsx("line",{x1:0,y1:n*.3,x2:t,y2:n*.7,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".2"}),e.jsx("line",{x1:0,y1:n*.6,x2:t,y2:n*.2,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"}),e.jsx("line",{x1:t*.4,y1:0,x2:t*.6,y2:n,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"})]}),e.jsx("div",{style:{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%, -100%)"},children:e.jsxs("svg",{width:"16",height:"22",viewBox:"0 0 16 22",fill:"none",children:[e.jsx("path",{d:"M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z",fill:"var(--agd-bar)",opacity:".4"}),e.jsx("circle",{cx:"8",cy:"8",r:"3",fill:"var(--agd-fill)"})]})})]})}function na({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(n/60)));return e.jsxs("div",{style:{display:"flex",height:"100%",padding:"8px 0"},children:[e.jsx("div",{style:{width:16,display:"flex",flexDirection:"column",alignItems:"center"},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[e.jsx(St,{size:8}),o<s-1&&e.jsx("div",{style:{flex:1,width:1,background:"var(--agd-stroke)"}})]},o))}),e.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-around",paddingLeft:8},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:`${35+o*13%25}%`,h:3,strong:!0}),e.jsx(M,{w:`${50+o*17%30}%`,h:2})]},o))})]})}function sa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"2px dashed var(--agd-stroke)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M12 16V4m0 0l-4 4m4-4l4 4",stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("path",{d:"M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2",stroke:"var(--agd-stroke)",strokeWidth:"1.5"})]}),e.jsx(M,{w:t*.4,h:2}),e.jsx(M,{w:t*.25,h:2})]})}function oa({width:t,height:n}){const s=Math.max(3,Math.min(8,Math.floor(n/20)));return e.jsxs("div",{style:{height:"100%",borderRadius:6,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",padding:8,display:"flex",flexDirection:"column",gap:4},children:[e.jsxs("div",{style:{display:"flex",gap:3,marginBottom:4},children:[e.jsx(St,{size:6}),e.jsx(St,{size:6}),e.jsx(St,{size:6})]}),Array.from({length:s},(i,o)=>e.jsx("div",{style:{display:"flex",gap:6,paddingLeft:o>0&&o<s-1?12:0},children:e.jsx(M,{w:`${25+o*23%50}%`,h:2,strong:o===0})},o))]})}function ra({width:t,height:n}){const o=Math.min((t-16)/7,(n-40)/6);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px"},children:[e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(M,{w:t*.3,h:3,strong:!0}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"›"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:2,padding:"0 4px",flex:1},children:[Array.from({length:7},(r,d)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:o*.6},children:e.jsx(M,{w:o*.5,h:2})},`h${d}`)),Array.from({length:7*5},(r,d)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:o},children:e.jsx("div",{style:{width:o*.6,height:o*.6,borderRadius:"50%",background:d===12?"var(--agd-bar)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:2,height:2,borderRadius:1,background:"var(--agd-bar-strong)",opacity:d===12?1:.3}})})},d))]})]})}function ia({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx(St,{size:Math.min(32,n*.55)}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"50%",h:3,strong:!0}),e.jsx(M,{w:"75%",h:2})]}),e.jsx(M,{w:30,h:2})]})}function la({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{height:"50%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),e.jsxs("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"65%",h:4,strong:!0}),e.jsx(M,{w:"40%",h:3}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(M,{w:"30%",h:5,strong:!0}),e.jsx(Qe,{w:Math.min(70,t*.3),h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})]})}function aa({width:t,height:n}){const s=Math.min(48,n*.3);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsx(St,{size:s}),e.jsx(M,{w:t*.45,h:4,strong:!0}),e.jsx(M,{w:t*.3,h:2}),e.jsxs("div",{style:{display:"flex",gap:t*.08,marginTop:n*.04},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]})]})]})}function ca({width:t,height:n}){const s=Math.max(t*.6,80),i=Math.max(3,Math.floor(n/40));return e.jsxs("div",{style:{height:"100%",display:"flex"},children:[e.jsx("div",{style:{width:t-s,background:"var(--agd-fill)",opacity:.3}}),e.jsxs("div",{style:{flex:1,borderLeft:"1px solid var(--agd-stroke)",display:"flex",flexDirection:"column",padding:t*.04},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:n*.06},children:[e.jsx(M,{w:s*.4,h:4,strong:!0}),e.jsx("div",{style:{width:12,height:12,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),Array.from({length:i},(o,r)=>e.jsx("div",{style:{padding:"6px 0"},children:e.jsx(M,{w:`${50+r*17%35}%`,h:2,strong:r===0})},r))]})]})}function da({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{flex:1,width:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"70%",h:3,strong:!0}),e.jsx(M,{w:"90%",h:2}),e.jsx(M,{w:"60%",h:2})]}),e.jsx("div",{style:{width:10,height:10,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-6}})]})}function _a({width:t,height:n}){const s=Math.min(n*.7,t*.3);return e.jsxs("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:t*.08},children:[e.jsx(Qe,{w:s,h:s,radius:s*.25}),e.jsx(M,{w:t*.45,h:Math.max(4,n*.2),strong:!0})]})}function ua({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(n/56)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:o===0?2:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontSize:9,fontWeight:700,color:"var(--agd-stroke)"},children:"Q"}),e.jsx(M,{w:t*(.3+o*13%25/100),h:3,strong:!0})]}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:o===0?"▼":"▶"})]},o))})}function ha({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120))),i=Math.max(1,Math.min(3,Math.floor(n/120)));return e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${s}, 1fr)`,gridTemplateRows:`repeat(${i}, 1fr)`,gap:4,height:"100%"},children:Array.from({length:s*i},(o,r)=>e.jsx("div",{style:{borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",position:"relative",overflow:"hidden"},children:e.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"none",fill:"none",children:[e.jsx("line",{x1:"0",y1:"0",x2:"100",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"}),e.jsx("line",{x1:"100",y1:"0",x2:"0",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})},r))})}function ma({width:t,height:n}){const s=Math.min(t,n);return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"1",y:(n-s+2)/2,width:s-2,height:s-2,rx:s*.15,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("path",{d:`M${s*.25} ${n/2}l${s*.2} ${s*.2} ${s*.3}-${s*.35}`,stroke:"var(--agd-bar)",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function pa({width:t,height:n}){const s=Math.min(t,n)/2-1;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("circle",{cx:t/2,cy:n/2,r:s*.45,fill:"var(--agd-bar)"})]})}function xa({width:t,height:n}){const s=Math.max(2,n*.12),i=Math.min(n*.35,10),o=t*.55;return e.jsxs("div",{style:{height:"100%",display:"flex",alignItems:"center",position:"relative"},children:[e.jsx("div",{style:{width:"100%",height:s,borderRadius:s/2,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",position:"relative"},children:e.jsx("div",{style:{width:o,height:"100%",borderRadius:s/2,background:"var(--agd-bar)"}})}),e.jsx("div",{style:{position:"absolute",left:o-i,width:i*2,height:i*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)"}})]})}function ga({width:t,height:n}){const s=Math.min(36,n*.15),i=7,o=4,r=Math.min((t-16)/i,(n-s-40)/(o+1));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:4},children:[e.jsxs("div",{style:{height:s,borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 8px",justifyContent:"space-between"},children:[e.jsx(M,{w:"40%",h:2}),e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"12",height:"11",rx:"1",stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("line",{x1:"2",y1:"6",x2:"14",y2:"6",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})]}),e.jsxs("div",{style:{flex:1,borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 6px"},children:[e.jsx("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(M,{w:t*.25,h:2,strong:!0}),e.jsx("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"›"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${i}, 1fr)`,gap:1,padding:"0 4px",flex:1},children:Array.from({length:i*o},(d,p)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:r},children:e.jsx("div",{style:{width:r*.5,height:r*.5,borderRadius:"50%",background:p===10?"var(--agd-bar)":"transparent"},children:e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:1.5,height:1.5,borderRadius:1,background:"var(--agd-bar-strong)",opacity:p===10?1:.25}})})})},p))})]})]})}function fa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:n*.08,padding:4},children:[e.jsx("div",{style:{width:"100%",height:n*.2,borderRadius:4,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"70%",height:Math.max(6,n*.1),borderRadius:3,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"90%",height:Math.max(4,n*.06),borderRadius:3,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"50%",height:Math.max(4,n*.06),borderRadius:3,background:"var(--agd-fill)"}})]})}function ya({width:t,height:n}){return e.jsx("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:6},children:e.jsxs("div",{style:{height:"100%",flex:1,borderRadius:n/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${n*.3}px`,gap:4},children:[e.jsx(M,{w:"60%",h:2,strong:!0}),e.jsx("div",{style:{width:Math.max(6,n*.3),height:Math.max(6,n*.3),borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0,marginLeft:"auto"}})]})})}function ba({width:t,height:n}){const s=Math.min(t,n);return e.jsx("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:e.jsx("path",{d:`M${t/2} ${(n-s)/2+s*.1}l${s*.12} ${s*.25} ${s*.28} ${s*.04}-${s*.2} ${s*.2} ${s*.05} ${s*.28}-${s*.25}-${s*.12}-${s*.25} ${s*.12} ${s*.05}-${s*.28}-${s*.2}-${s*.2} ${s*.28}-${s*.04}z`,stroke:"var(--agd-stroke)",strokeWidth:"1",fill:"var(--agd-fill)"})})}function wa({width:t,height:n}){const s=Math.min(t,n)/2-2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s,stroke:"var(--agd-stroke)",strokeWidth:"1.5",opacity:".2"}),e.jsx("path",{d:`M${t/2} ${n/2-s}a${s} ${s} 0 0 1 ${s} ${s}`,stroke:"var(--agd-bar-strong)",strokeWidth:"1.5",strokeLinecap:"round"})]})}function va({width:t,height:n}){const s=Math.min(36,n*.25,t*.12),i=Math.max(1,Math.min(3,Math.floor(n/80)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-around",padding:8},children:Array.from({length:i},(o,r)=>e.jsxs("div",{style:{display:"flex",gap:t*.04,alignItems:"flex-start"},children:[e.jsx(Qe,{w:s,h:s,radius:s*.25}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:`${40+r*13%20}%`,h:3,strong:!0}),e.jsx(M,{w:`${60+r*17%25}%`,h:2})]})]},r))})}function ka({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120))),i=Math.min(36,n*.25);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:n*.06,padding:n*.06},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx("div",{style:{display:"flex",gap:t*.06,justifyContent:"center",flex:1,alignItems:"center"},children:Array.from({length:s},(o,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx(St,{size:i}),e.jsx(M,{w:t*.12,h:3,strong:!0}),e.jsx(M,{w:t*.08,h:2})]},r))})]})}function ja({width:t,height:n}){const s=Math.max(2,Math.min(3,Math.floor(n/80)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:t*.06,gap:n*.04},children:[e.jsx(M,{w:t*.5,h:Math.max(5,n*.04),strong:!0}),e.jsx(M,{w:t*.35,h:2}),e.jsx("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:n*.03,marginTop:n*.04},children:Array.from({length:s},(i,o)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:Math.min(60,t*.2),h:2}),e.jsx(Qe,{w:"100%",h:Math.min(32,n*.1),radius:4})]},o))}),e.jsx(Qe,{w:"100%",h:Math.min(36,n*.12),radius:6,style:{marginTop:n*.03,background:"var(--agd-bar)"}}),e.jsx(M,{w:t*.4,h:2})]})}function Ca({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:t*.04,gap:n*.03},children:[e.jsx(M,{w:t*.4,h:4,strong:!0}),e.jsx(M,{w:t*.6,h:2}),e.jsxs("div",{style:{display:"flex",gap:6,marginTop:n*.03},children:[e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:50,h:2}),e.jsx(Qe,{w:"100%",h:Math.min(28,n*.1),radius:4})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:40,h:2}),e.jsx(Qe,{w:"100%",h:Math.min(28,n*.1),radius:4})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:50,h:2}),e.jsx(Qe,{w:"100%",h:Math.min(28,n*.1),radius:4})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3,flex:1},children:[e.jsx(M,{w:60,h:2}),e.jsx(Qe,{w:"100%",h:"100%",radius:4})]}),e.jsx(Qe,{w:Math.min(120,t*.3),h:Math.min(30,n*.1),radius:6,style:{alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}var Sa={navigation:ml,hero:pl,sidebar:xl,footer:gl,modal:fl,card:yl,text:bl,image:wl,table:vl,list:kl,button:jl,input:Cl,form:Sl,tabs:Nl,avatar:Ml,badge:$l,header:Il,section:Ll,grid:El,dropdown:Rl,toggle:Bl,search:Tl,toast:Dl,progress:Pl,chart:Al,video:zl,tooltip:Wl,breadcrumb:Ol,pagination:Fl,divider:Hl,accordion:Yl,carousel:Ul,pricing:Xl,testimonial:Ql,cta:ql,alert:Vl,banner:Gl,stat:Kl,stepper:Jl,tag:Zl,rating:ea,map:ta,timeline:na,fileUpload:sa,codeBlock:oa,calendar:ra,notification:ia,productCard:la,profile:aa,drawer:ca,popover:da,logo:_a,faq:ua,gallery:ha,checkbox:ma,radio:pa,slider:xa,datePicker:ga,skeleton:fa,chip:ya,icon:ba,spinner:wa,feature:va,team:ka,login:ja,contact:Ca};function Na({type:t,width:n,height:s,text:i}){const o=Sa[t];return o?e.jsx("div",{style:{width:"100%",height:"100%",padding:8,position:"relative",pointerEvents:"none"},children:e.jsx(o,{width:n,height:s,text:i})}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:10,fontWeight:600,color:"var(--agd-text-3)",textTransform:"uppercase",letterSpacing:"0.06em",opacity:.5},children:t})})}var Ma=`svg[fill=none] {
  fill: none !important;
}

.styles-module__overlayExiting___iEmYr {
  opacity: 0 !important;
  transition: opacity 0.25s ease !important;
  pointer-events: none !important;
}

.styles-module__overlay___aWh-q {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: auto;
  cursor: default;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
  --agd-stroke: rgba(59, 130, 246, 0.35);
  --agd-fill: rgba(59, 130, 246, 0.06);
  --agd-bar: rgba(59, 130, 246, 0.18);
  --agd-bar-strong: rgba(59, 130, 246, 0.28);
  --agd-text-3: rgba(255, 255, 255, 0.6);
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q.styles-module__light___ORIft {
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) {
  --agd-surface: #141414;
}
.styles-module__overlay___aWh-q.styles-module__wireframe___itvQU {
  --agd-stroke: rgba(249, 115, 22, 0.35);
  --agd-fill: rgba(249, 115, 22, 0.06);
  --agd-bar: rgba(249, 115, 22, 0.18);
  --agd-bar-strong: rgba(249, 115, 22, 0.28);
}
.styles-module__overlay___aWh-q.styles-module__placing___45yD8 {
  cursor: crosshair;
}
.styles-module__overlay___aWh-q.styles-module__passthrough___xaFeE {
  pointer-events: none;
}

.styles-module__blankCanvas___t2Eue {
  position: fixed;
  inset: 0;
  z-index: 99994;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__visible___OKKqX {
  opacity: var(--canvas-opacity, 1);
  pointer-events: auto;
}
.styles-module__blankCanvas___t2Eue::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__gridActive___OZ-cf::after {
  opacity: 1;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.22) 1px, transparent 1px);
}

.styles-module__paletteHeader___-Q5gQ {
  padding: 0 1rem 0.375rem;
}

.styles-module__paletteHeaderTitle___oHqZC {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.0094em;
}
.styles-module__light___ORIft .styles-module__paletteHeaderTitle___oHqZC {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__paletteHeaderDesc___6i74T {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
  line-height: 14px;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T {
  color: rgba(0, 0, 0, 0.45);
}
.styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__paletteHeaderDesc___6i74T a:hover {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__wireframePurposeWrap___To-tS {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__wireframePurposeWrap___To-tS.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__wireframePurposeInner___Lrahs {
  overflow: hidden;
}

.styles-module__wireframePurposeInput___7EtBN {
  display: block;
  width: calc(100% - 2rem);
  margin: 0.25rem 1rem 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN {
  color: rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__canvasToggle___-QqSy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0.25rem 1rem 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.styles-module__canvasToggle___-QqSy:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}
.styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy {
  border-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}

.styles-module__canvasToggleIcon___7pJ82 {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__light___ORIft .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(0, 0, 0, 0.25);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__canvasToggleLabel___OanpY {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.0094em;
}
.styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__canvasToggleLabel___OanpY {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}

.styles-module__canvasPurposeWrap___hj6zk {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__canvasPurposeWrap___hj6zk.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__canvasPurposeInner___VWiyu {
  overflow: hidden;
}

.styles-module__canvasPurposeToggle___byDH2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin: 0.375rem 1rem 0.375rem 1.1875rem;
}
.styles-module__canvasPurposeToggle___byDH2 input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.styles-module__canvasPurposeCheck___xqd7l {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.styles-module__canvasPurposeCheck___xqd7l svg {
  color: #1a1a1a;
  opacity: 1;
  transition: opacity 0.15s ease;
}
.styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgb(255, 255, 255);
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
.styles-module__light___ORIft .styles-module__canvasPurposeCheck___xqd7l.styles-module__checked___-1JGH svg {
  color: #fff;
}

.styles-module__canvasPurposeLabel___Zu-tD {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.styles-module__light___ORIft .styles-module__canvasPurposeLabel___Zu-tD {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__canvasPurposeHelp___jijwR {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}
.styles-module__canvasPurposeHelp___jijwR svg {
  color: rgba(255, 255, 255, 0.2);
  transform: translateY(2px);
  transition: color 0.15s ease;
}
.styles-module__canvasPurposeHelp___jijwR:hover svg {
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR svg {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__canvasPurposeHelp___jijwR:hover svg {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__placement___zcxv8 {
  position: absolute;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.08);
  cursor: grab;
  transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s ease, transform 0.15s ease;
  user-select: none;
  pointer-events: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  animation: styles-module__placementEnter___TdRhf 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.styles-module__placement___zcxv8:active {
  cursor: grabbing;
}
.styles-module__placement___zcxv8:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #3c82f7;
  border-style: solid;
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8 {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.08);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.12);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__placement___zcxv8.styles-module__dragging___le6KZ {
  opacity: 0.85;
  z-index: 50;
}
.styles-module__placement___zcxv8.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__placementContent___f64A4 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.styles-module__placementLabel___0KvWl {
  position: absolute;
  top: -18px;
  left: 0;
  font-size: 10px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.7);
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.5);
}
.styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__placementLabel___0KvWl {
  color: rgba(249, 115, 22, 0.7);
}
.styles-module__wireframe___itvQU .styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #f97316;
}

.styles-module__placementAnnotation___78pTr {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__placementAnnotation___78pTr.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__sectionAnnotation___aUIs0 {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(59, 130, 246, 0.6);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__sectionAnnotation___aUIs0.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__handle___Ikbxm {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1.5px solid #3c82f7;
  border-radius: 2px;
  z-index: 12;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.styles-module__placement___zcxv8:hover .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:hover .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:hover .styles-module__handle___Ikbxm, .styles-module__placement___zcxv8:active .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:active .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:active .styles-module__handle___Ikbxm, .styles-module__selected___6yrp6 .styles-module__handle___Ikbxm {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__sectionOutline___s0hy- .styles-module__handle___Ikbxm {
  border-color: inherit;
}
.styles-module__wireframe___itvQU .styles-module__handle___Ikbxm {
  border-color: #f97316;
}

.styles-module__handleNw___4TMIj {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.styles-module__handleNe___mnsTh {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.styles-module__handleSe___oSFnk {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

.styles-module__handleSw___pi--Z {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.styles-module__handleN___aBA-Q, .styles-module__handleE___0hM5u, .styles-module__handleS___JjDRv, .styles-module__handleW___ERWGQ {
  opacity: 0 !important;
  pointer-events: none !important;
}

.styles-module__edgeHandle___XxXdT {
  position: absolute;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__edgeHandle___XxXdT::after {
  content: "";
  position: absolute;
  border-radius: 4px;
  background: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__edgeHandle___XxXdT::after {
  background: #f97316;
}
.styles-module__edgeHandle___XxXdT::after {
  opacity: 0;
  transition: opacity 0.1s ease, transform 0.1s ease;
  transform: scale(0.8);
}
.styles-module__edgeHandle___XxXdT:hover::after {
  opacity: 0.85;
  transform: scale(1);
}
.styles-module__edgeHandle___XxXdT svg {
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.1s ease;
  filter: drop-shadow(0 0 2px var(--agd-surface));
}
.styles-module__edgeHandle___XxXdT:hover svg {
  opacity: 1;
}

.styles-module__edgeN___-JJDj, .styles-module__edgeS___66lMX {
  left: 12px;
  right: 12px;
  height: 12px;
  cursor: n-resize;
}
.styles-module__edgeN___-JJDj::after, .styles-module__edgeS___66lMX::after {
  width: 24px;
  height: 4px;
}

.styles-module__edgeN___-JJDj {
  top: -6px;
}

.styles-module__edgeS___66lMX {
  bottom: -6px;
  cursor: s-resize;
}

.styles-module__edgeE___1bGDa, .styles-module__edgeW___lHQNo {
  top: 12px;
  bottom: 12px;
  width: 12px;
  cursor: e-resize;
}
.styles-module__edgeE___1bGDa::after, .styles-module__edgeW___lHQNo::after {
  width: 4px;
  height: 24px;
}

.styles-module__edgeE___1bGDa {
  right: -6px;
}

.styles-module__edgeW___lHQNo {
  left: -6px;
  cursor: w-resize;
}

.styles-module__deleteButton___LkGCb {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  z-index: 15;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8);
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.styles-module__placement___zcxv8:hover .styles-module__deleteButton___LkGCb, .styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-:hover .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO:hover .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.styles-module__drawBox___BrVAa {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 2px solid #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
}

.styles-module__selectBox___Iu8kB {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 1px dashed #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 2px;
}

.styles-module__sizeIndicator___7zJ4y {
  position: fixed;
  pointer-events: none;
  z-index: 100001;
  font-size: 10px;
  color: #fff;
  background: #3c82f7;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.styles-module__guideLine___DUQY2 {
  pointer-events: none;
  z-index: 100001;
  background: #f0f;
  opacity: 0.5;
}

.styles-module__dragPreview___onPbU {
  position: fixed;
  z-index: 100002;
  pointer-events: none;
  border: 1.5px dashed #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  color: #3c82f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transition: width 0.08s ease, height 0.08s ease, opacity 0.08s ease;
}

.styles-module__dragPreviewWireframe___jsg0G {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);
}

.styles-module__palette___C7iSH {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  width: 256px;
  overflow: hidden;
  background: #1c1c1c;
  border: none;
  border-radius: 1rem;
  padding: 13px 0 16px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  z-index: 100001;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  cursor: default;
  opacity: 0;
  filter: blur(5px);
}
.styles-module__palette___C7iSH .styles-module__paletteItem___6TlnA,
.styles-module__palette___C7iSH .styles-module__paletteItemLabel___6ncO4,
.styles-module__palette___C7iSH .styles-module__paletteSectionTitle___PqnjX,
.styles-module__palette___C7iSH .styles-module__paletteFooter___QYnAG {
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__palette___C7iSH.styles-module__enter___6LYk5 {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__palette___C7iSH.styles-module__exit___iSGRw {
  opacity: 0;
  transform: translateY(6px);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
.styles-module__palette___C7iSH.styles-module__light___ORIft {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.styles-module__paletteSection___V8DEA {
  padding: 0 1rem;
}
.styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteSectionTitle___PqnjX {
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  padding: 0 0 3px 3px;
}
.styles-module__light___ORIft .styles-module__paletteSectionTitle___PqnjX {
  color: rgba(0, 0, 0, 0.4);
}

.styles-module__paletteItem___6TlnA {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.25rem;
  margin-bottom: 1px;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
  user-select: none;
  min-height: 24px;
}
.styles-module__paletteItem___6TlnA:hover {
  background: rgba(255, 255, 255, 0.1);
}
.styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}

.styles-module__paletteItemIcon___0NPQK {
  width: 20px;
  height: 16px;
  border-radius: 2px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.45);
}
.styles-module__paletteItemIcon___0NPQK svg {
  display: block;
  width: 20px;
  height: 16px;
}
.styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__paletteItemLabel___6ncO4 {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: -0.0094em;
  line-height: 1;
  min-width: 0;
}
.styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}
.styles-module__light___ORIft .styles-module__paletteItemLabel___6ncO4 {
  color: rgba(0, 0, 0, 0.7);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}

.styles-module__placeScroll___7sClM {
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0.25rem;
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px);
}
.styles-module__placeScroll___7sClM.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar {
  width: 3px;
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}
.styles-module__light___ORIft .styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}

.styles-module__paletteFooterWrap___71-fI {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__paletteFooterWrap___71-fI.styles-module__footerHidden___fJUik {
  grid-template-rows: 0fr;
}

.styles-module__paletteFooterInnerContent___VC26h {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__footerHidden___fJUik .styles-module__paletteFooterInnerContent___VC26h {
  opacity: 0;
  transform: translateY(4px);
}

.styles-module__paletteFooterInner___dfylY {
  overflow: hidden;
}

.styles-module__paletteFooter___QYnAG {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  padding: 0 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteFooter___QYnAG {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteFooterCount___D3Fia {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterCount___D3Fia {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__paletteFooterClear___ybBoa {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.15s ease;
}
.styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__paletteFooterActions___fLzv8 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.styles-module__rollingWrap___S75jM {
  display: inline-block;
  overflow: hidden;
  height: 1.15em;
  position: relative;
  vertical-align: bottom;
}

.styles-module__rollingNum___1RKDx {
  position: absolute;
  left: 0;
  top: 0;
}

.styles-module__exitUp___AFDRW {
  animation: styles-module__numExitUp___FRQqx 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterUp___CPlXb {
  animation: styles-module__numEnterUp___2Yd-w 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__exitDown___-1yAy {
  animation: styles-module__numExitDown___xm5by 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterDown___DDuFR {
  animation: styles-module__numEnterDown___hpxBk 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

@keyframes styles-module__numExitUp___FRQqx {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterUp___2Yd-w {
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes styles-module__numExitDown___xm5by {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterDown___hpxBk {
  from {
    transform: translateY(-110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.styles-module__rearrangeOverlay___-3R3t {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: none;
  cursor: default;
  user-select: none;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
}

.styles-module__hoverHighlight___8eT-v {
  position: fixed;
  pointer-events: none;
  z-index: 99994;
  border: 2px dashed rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.06);
  animation: styles-module__highlightFadeIn___Lg7KY 0.12s ease;
}

.styles-module__sectionOutline___s0hy- {
  position: fixed;
  border: 2px solid;
  border-radius: 4px;
  cursor: grab;
}
.styles-module__sectionOutline___s0hy-:active {
  cursor: grabbing;
}
.styles-module__sectionOutline___s0hy- {
  transition: box-shadow 0.15s, border-color 0.3s, background-color 0.3s, border-style 0s;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}
.styles-module__sectionOutline___s0hy-:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 {
  border-style: solid;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) {
  border: 1.5px dashed rgba(150, 150, 150, 0.35);
  background-color: transparent !important;
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover {
  border-color: rgba(150, 150, 150, 0.6);
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionLabel___F80HQ {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionLabel___F80HQ {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__movedBadge___s8z-q,
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionDimensions___RcJSL {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionDimensions___RcJSL {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__sectionLabel___F80HQ {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 8px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__movedBadge___s8z-q {
  position: absolute;
  bottom: 22px;
  right: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__movedBadge___s8z-q.styles-module__badgeVisible___npbdS {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.styles-module__resizedBadge___u51V8 {
  background: #3c82f7;
  bottom: 40px;
}

.styles-module__sectionDimensions___RcJSL {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.styles-module__light___ORIft .styles-module__sectionDimensions___RcJSL {
  color: rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.7);
}

.styles-module__wireframeNotice___4GJyB {
  position: fixed;
  bottom: 16px;
  left: 24px;
  z-index: 99995;
  font-size: 9.5px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: auto;
  animation: styles-module__overlayFadeIn___aECVy 0.3s ease;
  line-height: 1.5;
  max-width: 280px;
}

.styles-module__wireframeOpacityRow___CJXzi {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.styles-module__wireframeOpacityLabel___afkfT {
  font-size: 9px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.32);
  letter-spacing: 0.02em;
  white-space: nowrap;
  user-select: none;
}

.styles-module__wireframeOpacitySlider___YcoEs {
  -webkit-appearance: none;
  appearance: none;
  width: 56px;
  height: 4px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs:hover {
  background: rgba(0, 0, 0, 0.13);
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb:hover {
  background: rgb(224.4209205021, 95.3548117155, 5.7790794979);
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  border: none;
  cursor: pointer;
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-track {
  background: rgba(0, 0, 0, 0.08);
  height: 4px;
  border-radius: 2px;
}

.styles-module__wireframeNoticeTitleRow___PJqyG {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
}

.styles-module__wireframeNoticeTitle___okr08 {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
}

.styles-module__wireframeNoticeDivider___PNKQ6 {
  width: 1px;
  height: 8px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0 8px;
  flex-shrink: 0;
}

.styles-module__wireframeStartOver___YFk-I {
  font-size: 9.5px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  text-decoration: none;
  transition: color 0.12s ease;
  white-space: nowrap;
}
.styles-module__wireframeStartOver___YFk-I:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__ghostOutline___po-kO {
  position: fixed;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.04);
  cursor: grab;
  opacity: 0.5;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__ghostEnter___EC3Mb 0.25s ease;
  transition: box-shadow 0.15s, border-color 0.3s, opacity 0.25s;
}
.styles-module__ghostOutline___po-kO:active {
  cursor: grabbing;
}
.styles-module__ghostOutline___po-kO:hover {
  opacity: 0.7;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
}
.styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 {
  opacity: 1;
  border-style: solid;
  border-width: 2px;
  border-color: #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__ghostOutline___po-kO.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__ghostBadge___tsQUK {
  position: absolute;
  bottom: calc(100% + 4px);
  left: -1px;
  font-size: 9px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.2;
  animation: styles-module__badgeSlideIn___typJ7 0.2s ease both;
}

@keyframes styles-module__badgeSlideIn___typJ7 {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__ghostBadgeExtra___6CVoD {
  display: inline;
  animation: styles-module__badgeExtraIn___i4W8F 0.2s ease both;
}

@keyframes styles-module__badgeExtraIn___i4W8F {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.styles-module__originalOutline___Y6DD1 {
  position: fixed;
  border: 1.5px dashed rgba(150, 150, 150, 0.3);
  border-radius: 4px;
  background: transparent;
  pointer-events: none;
  user-select: none;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}

.styles-module__originalLabel___HqI9g {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(150, 150, 150, 0.5);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: rgba(150, 150, 150, 0.08);
}

.styles-module__connectorSvg___Lovld {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__connectorLine___XeWh- {
  transition: opacity 0.2s ease;
  animation: styles-module__connectorDraw___8sK5I 0.3s ease both;
}

.styles-module__connectorDot___yvf7C {
  transform-box: fill-box;
  transform-origin: center;
  animation: styles-module__connectorDotIn___NwTUq 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes styles-module__connectorDraw___8sK5I {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__connectorDotIn___NwTUq {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.styles-module__connectorExiting___2lLOs {
  animation: styles-module__connectorOut___5QoPl 0.2s ease forwards;
}
.styles-module__connectorExiting___2lLOs .styles-module__connectorDot___yvf7C {
  animation: styles-module__connectorDotOut___FEq7e 0.2s ease forwards;
}

@keyframes styles-module__connectorOut___5QoPl {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__connectorDotOut___FEq7e {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes styles-module__placementEnter___TdRhf {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__sectionEnter___-8BXT {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__highlightFadeIn___Lg7KY {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__overlayFadeIn___aECVy {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__ghostEnter___EC3Mb {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 0.6;
    transform: scale(1);
  }
}`,$a={overlayExiting:"styles-module__overlayExiting___iEmYr",overlay:"styles-module__overlay___aWh-q",overlayFadeIn:"styles-module__overlayFadeIn___aECVy",light:"styles-module__light___ORIft",wireframe:"styles-module__wireframe___itvQU",placing:"styles-module__placing___45yD8",passthrough:"styles-module__passthrough___xaFeE",blankCanvas:"styles-module__blankCanvas___t2Eue",visible:"styles-module__visible___OKKqX",gridActive:"styles-module__gridActive___OZ-cf",paletteHeader:"styles-module__paletteHeader___-Q5gQ",paletteHeaderTitle:"styles-module__paletteHeaderTitle___oHqZC",paletteHeaderDesc:"styles-module__paletteHeaderDesc___6i74T",wireframePurposeWrap:"styles-module__wireframePurposeWrap___To-tS",collapsed:"styles-module__collapsed___Ms9vS",wireframePurposeInner:"styles-module__wireframePurposeInner___Lrahs",wireframePurposeInput:"styles-module__wireframePurposeInput___7EtBN",canvasToggle:"styles-module__canvasToggle___-QqSy",active:"styles-module__active___hosp7",canvasToggleIcon:"styles-module__canvasToggleIcon___7pJ82",canvasToggleLabel:"styles-module__canvasToggleLabel___OanpY",canvasPurposeWrap:"styles-module__canvasPurposeWrap___hj6zk",canvasPurposeInner:"styles-module__canvasPurposeInner___VWiyu",canvasPurposeToggle:"styles-module__canvasPurposeToggle___byDH2",canvasPurposeCheck:"styles-module__canvasPurposeCheck___xqd7l",checked:"styles-module__checked___-1JGH",canvasPurposeLabel:"styles-module__canvasPurposeLabel___Zu-tD",canvasPurposeHelp:"styles-module__canvasPurposeHelp___jijwR",placement:"styles-module__placement___zcxv8",placementEnter:"styles-module__placementEnter___TdRhf",selected:"styles-module__selected___6yrp6",dragging:"styles-module__dragging___le6KZ",exiting:"styles-module__exiting___YrM8F",placementContent:"styles-module__placementContent___f64A4",placementLabel:"styles-module__placementLabel___0KvWl",placementAnnotation:"styles-module__placementAnnotation___78pTr",annotationVisible:"styles-module__annotationVisible___mrUyA",sectionAnnotation:"styles-module__sectionAnnotation___aUIs0",handle:"styles-module__handle___Ikbxm",sectionOutline:"styles-module__sectionOutline___s0hy-",ghostOutline:"styles-module__ghostOutline___po-kO",handleNw:"styles-module__handleNw___4TMIj",handleNe:"styles-module__handleNe___mnsTh",handleSe:"styles-module__handleSe___oSFnk",handleSw:"styles-module__handleSw___pi--Z",handleN:"styles-module__handleN___aBA-Q",handleE:"styles-module__handleE___0hM5u",handleS:"styles-module__handleS___JjDRv",handleW:"styles-module__handleW___ERWGQ",edgeHandle:"styles-module__edgeHandle___XxXdT",edgeN:"styles-module__edgeN___-JJDj",edgeS:"styles-module__edgeS___66lMX",edgeE:"styles-module__edgeE___1bGDa",edgeW:"styles-module__edgeW___lHQNo",deleteButton:"styles-module__deleteButton___LkGCb",rearrangeOverlay:"styles-module__rearrangeOverlay___-3R3t",drawBox:"styles-module__drawBox___BrVAa",selectBox:"styles-module__selectBox___Iu8kB",sizeIndicator:"styles-module__sizeIndicator___7zJ4y",guideLine:"styles-module__guideLine___DUQY2",dragPreview:"styles-module__dragPreview___onPbU",dragPreviewWireframe:"styles-module__dragPreviewWireframe___jsg0G",palette:"styles-module__palette___C7iSH",paletteItem:"styles-module__paletteItem___6TlnA",paletteItemLabel:"styles-module__paletteItemLabel___6ncO4",paletteSectionTitle:"styles-module__paletteSectionTitle___PqnjX",paletteFooter:"styles-module__paletteFooter___QYnAG",enter:"styles-module__enter___6LYk5",exit:"styles-module__exit___iSGRw",paletteSection:"styles-module__paletteSection___V8DEA",paletteItemIcon:"styles-module__paletteItemIcon___0NPQK",placeScroll:"styles-module__placeScroll___7sClM",fadeTop:"styles-module__fadeTop___KT9tF",fadeBottom:"styles-module__fadeBottom___x3ShT",paletteFooterWrap:"styles-module__paletteFooterWrap___71-fI",footerHidden:"styles-module__footerHidden___fJUik",paletteFooterInnerContent:"styles-module__paletteFooterInnerContent___VC26h",paletteFooterInner:"styles-module__paletteFooterInner___dfylY",paletteFooterCount:"styles-module__paletteFooterCount___D3Fia",paletteFooterClear:"styles-module__paletteFooterClear___ybBoa",paletteFooterActions:"styles-module__paletteFooterActions___fLzv8",rollingWrap:"styles-module__rollingWrap___S75jM",rollingNum:"styles-module__rollingNum___1RKDx",exitUp:"styles-module__exitUp___AFDRW",numExitUp:"styles-module__numExitUp___FRQqx",enterUp:"styles-module__enterUp___CPlXb",numEnterUp:"styles-module__numEnterUp___2Yd-w",exitDown:"styles-module__exitDown___-1yAy",numExitDown:"styles-module__numExitDown___xm5by",enterDown:"styles-module__enterDown___DDuFR",numEnterDown:"styles-module__numEnterDown___hpxBk",hoverHighlight:"styles-module__hoverHighlight___8eT-v",highlightFadeIn:"styles-module__highlightFadeIn___Lg7KY",sectionEnter:"styles-module__sectionEnter___-8BXT",settled:"styles-module__settled___b5U5o",sectionLabel:"styles-module__sectionLabel___F80HQ",movedBadge:"styles-module__movedBadge___s8z-q",sectionDimensions:"styles-module__sectionDimensions___RcJSL",badgeVisible:"styles-module__badgeVisible___npbdS",resizedBadge:"styles-module__resizedBadge___u51V8",wireframeNotice:"styles-module__wireframeNotice___4GJyB",wireframeOpacityRow:"styles-module__wireframeOpacityRow___CJXzi",wireframeOpacityLabel:"styles-module__wireframeOpacityLabel___afkfT",wireframeOpacitySlider:"styles-module__wireframeOpacitySlider___YcoEs",wireframeNoticeTitleRow:"styles-module__wireframeNoticeTitleRow___PJqyG",wireframeNoticeTitle:"styles-module__wireframeNoticeTitle___okr08",wireframeNoticeDivider:"styles-module__wireframeNoticeDivider___PNKQ6",wireframeStartOver:"styles-module__wireframeStartOver___YFk-I",ghostEnter:"styles-module__ghostEnter___EC3Mb",ghostBadge:"styles-module__ghostBadge___tsQUK",badgeSlideIn:"styles-module__badgeSlideIn___typJ7",ghostBadgeExtra:"styles-module__ghostBadgeExtra___6CVoD",badgeExtraIn:"styles-module__badgeExtraIn___i4W8F",originalOutline:"styles-module__originalOutline___Y6DD1",originalLabel:"styles-module__originalLabel___HqI9g",connectorSvg:"styles-module__connectorSvg___Lovld",connectorLine:"styles-module__connectorLine___XeWh-",connectorDraw:"styles-module__connectorDraw___8sK5I",connectorDot:"styles-module__connectorDot___yvf7C",connectorDotIn:"styles-module__connectorDotIn___NwTUq",connectorExiting:"styles-module__connectorExiting___2lLOs",connectorOut:"styles-module__connectorOut___5QoPl",connectorDotOut:"styles-module__connectorDotOut___FEq7e"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-design-mode-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-design-mode-styles",document.head.appendChild(t)),t.textContent=Ma}var C=$a,In=24,xs=5;function rr(t,n,s,i,o){let r=1/0,d=1/0;const p=t.x,m=t.x+t.width,$=t.x+t.width/2,g=t.y,y=t.y+t.height,w=t.y+t.height/2,R=!i,k=R?[p,m,$]:[...i.left?[p]:[],...i.right?[m]:[]],B=R?[g,y,w]:[...i.top?[g]:[],...i.bottom?[y]:[]],X=[];for(const _e of n)s.has(_e.id)||X.push(_e);o&&X.push(...o);for(const _e of X){const Fe=_e.x,Ue=_e.x+_e.width,pe=_e.x+_e.width/2,$e=_e.y,J=_e.y+_e.height,it=_e.y+_e.height/2;for(const P of k)for(const ue of[Fe,Ue,pe]){const Ae=ue-P;Math.abs(Ae)<xs&&Math.abs(Ae)<Math.abs(r)&&(r=Ae)}for(const P of B)for(const ue of[$e,J,it]){const Ae=ue-P;Math.abs(Ae)<xs&&Math.abs(Ae)<Math.abs(d)&&(d=Ae)}}const A=Math.abs(r)<xs?r:0,me=Math.abs(d)<xs?d:0,Pe=[],I=new Set,ne=p+A,he=m+A,z=$+A,je=g+me,Le=y+me,be=w+me;for(const _e of X){const Fe=_e.x,Ue=_e.x+_e.width,pe=_e.x+_e.width/2,$e=_e.y,J=_e.y+_e.height,it=_e.y+_e.height/2;for(const P of[Fe,pe,Ue])for(const ue of[ne,z,he])if(Math.abs(ue-P)<.5){const Ae=`x:${Math.round(P)}`;I.has(Ae)||(I.add(Ae),Pe.push({axis:"x",pos:P}))}for(const P of[$e,it,J])for(const ue of[je,be,Le])if(Math.abs(ue-P)<.5){const Ae=`y:${Math.round(P)}`;I.has(Ae)||(I.add(Ae),Pe.push({axis:"y",pos:P}))}}return{dx:A,dy:me,guides:Pe}}function ir(){return`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function Ia({placements:t,onChange:n,activeComponent:s,onActiveComponentChange:i,isDarkMode:o,exiting:r,onInteractionChange:d,className:p,passthrough:m,extraSnapRects:$,onSelectionChange:g,deselectSignal:y,onDragMove:w,onDragEnd:R,clearSignal:k,wireframe:B}){const[X,A]=a.useState(new Set),[me,Pe]=a.useState(null),[I,ne]=a.useState(null),[he,z]=a.useState(null),[je,Le]=a.useState([]),[be,_e]=a.useState(null),[Fe,Ue]=a.useState(!1),pe=a.useRef(!1),[$e,J]=a.useState(new Set),it=a.useRef(new Map),P=a.useRef(null),ue=a.useRef(null),Ae=a.useRef(t);Ae.current=t;const Je=a.useRef(g);Je.current=g;const yt=a.useRef(w);yt.current=w;const gt=a.useRef(R);gt.current=R;const Gt=a.useRef(y);a.useEffect(()=>{y!==Gt.current&&(Gt.current=y,A(new Set))},[y]);const Lt=a.useRef(k);a.useEffect(()=>{if(k!==void 0&&k!==Lt.current){Lt.current=k;const S=new Set(Ae.current.map(Z=>Z.id));S.size>0&&(J(S),A(new Set),ue.current=null,re(()=>{n([]),J(new Set)},180))}},[k,n]),a.useEffect(()=>{const S=Z=>{const xe=Z.target;if(!(xe.tagName==="INPUT"||xe.tagName==="TEXTAREA"||xe.isContentEditable)){if((Z.key==="Backspace"||Z.key==="Delete")&&X.size>0){Z.preventDefault();const Ee=new Set(X);J(Ee),A(new Set),re(()=>{n(Ae.current.filter(ke=>!Ee.has(ke.id))),J(new Set)},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(Z.key)&&X.size>0){Z.preventDefault();const Ee=Z.shiftKey?20:1,ke=Z.key==="ArrowLeft"?-Ee:Z.key==="ArrowRight"?Ee:0,Re=Z.key==="ArrowUp"?-Ee:Z.key==="ArrowDown"?Ee:0;n(t.map(we=>X.has(we.id)?{...we,x:Math.max(0,we.x+ke),y:Math.max(0,we.y+Re)}:we));return}if(Z.key==="Escape"){s?i(null):X.size>0&&A(new Set);return}}};return document.addEventListener("keydown",S),()=>document.removeEventListener("keydown",S)},[X,s,t,n,i]);const Kt=a.useCallback(S=>{if(S.button!==0||m||S.target.closest(`.${C.placement}`))return;S.preventDefault(),S.stopPropagation();const xe=window.scrollY,ae=S.clientX,Ee=S.clientY;if(s){ue.current="place",d==null||d(!0);let ke=!1,Re=ae,we=Ee;const ze=ee=>{Re=ee.clientX,we=ee.clientY;const f=Math.abs(Re-ae),b=Math.abs(we-Ee);if((f>5||b>5)&&(ke=!0),ke){const N=Math.min(ae,Re),L=Math.min(Ee,we),K=Math.abs(Re-ae),V=Math.abs(we-Ee);Pe({x:N,y:L,w:K,h:V}),z({x:ee.clientX+12,y:ee.clientY+12,text:`${Math.round(K)} × ${Math.round(V)}`})}},et=ee=>{window.removeEventListener("mousemove",ze),window.removeEventListener("mouseup",et),Pe(null),z(null),ue.current=null,d==null||d(!1);const f=H[s];let b,N,L,K;ke?(b=Math.min(ae,Re),N=Math.min(Ee,we)+xe,L=Math.max(In,Math.abs(Re-ae)),K=Math.max(In,Math.abs(we-Ee))):(L=f.width,K=f.height,b=ae-L/2,N=Ee+xe-K/2),b=Math.max(0,b),N=Math.max(0,N);const V={id:ir(),type:s,x:b,y:N,width:L,height:K,scrollY:xe,timestamp:Date.now()},D=[...t,V];n(D),A(new Set([V.id])),i(null)};window.addEventListener("mousemove",ze),window.addEventListener("mouseup",et)}else{S.shiftKey||A(new Set),ue.current="select";let ke=!1;const Re=ze=>{const et=Math.abs(ze.clientX-ae),ee=Math.abs(ze.clientY-Ee);if((et>4||ee>4)&&(ke=!0),ke){const f=Math.min(ae,ze.clientX),b=Math.min(Ee,ze.clientY);ne({x:f,y:b,w:Math.abs(ze.clientX-ae),h:Math.abs(ze.clientY-Ee)})}},we=ze=>{if(window.removeEventListener("mousemove",Re),window.removeEventListener("mouseup",we),ue.current=null,ke){const et=Math.min(ae,ze.clientX),ee=Math.min(Ee,ze.clientY)+xe,f=Math.abs(ze.clientX-ae),b=Math.abs(ze.clientY-Ee),N=new Set(S.shiftKey?X:new Set);for(const L of t)L.y-xe,L.x+L.width>et&&L.x<et+f&&L.y+L.height>ee&&L.y<ee+b&&N.add(L.id);A(N)}ne(null)};window.addEventListener("mousemove",Re),window.addEventListener("mouseup",we)}},[s,m,t,n,X]),Tt=a.useCallback((S,Z)=>{var V;if(S.button!==0)return;const xe=S.target;if(xe.closest(`.${C.handle}`)||xe.closest(`.${C.deleteButton}`))return;S.preventDefault(),S.stopPropagation();let ae;S.shiftKey?(ae=new Set(X),ae.has(Z)?ae.delete(Z):ae.add(Z)):X.has(Z)?ae=new Set(X):ae=new Set([Z]),A(ae),(ae.size!==X.size||[...ae].some(D=>!X.has(D)))&&((V=Je.current)==null||V.call(Je,ae,S.shiftKey));const ke=S.clientX,Re=S.clientY,we=new Map;for(const D of t)ae.has(D.id)&&we.set(D.id,{x:D.x,y:D.y});ue.current="move",d==null||d(!0);let ze=!1,et=!1,ee=t,f=0,b=0;const N=new Map;for(const D of t)we.has(D.id)&&N.set(D.id,{w:D.width,h:D.height});const L=D=>{var at;const Me=D.clientX-ke,fe=D.clientY-Re;if((Math.abs(Me)>2||Math.abs(fe)>2)&&(ze=!0),!ze)return;if(D.altKey&&!et){et=!0;const se=[];for(const We of t)we.has(We.id)&&se.push({...We,id:ir(),timestamp:Date.now()});ee=[...t,...se]}let Be=1/0,ie=1/0,Q=-1/0,Te=-1/0;for(const[se,We]of we){const ut=N.get(se);ut&&(Be=Math.min(Be,We.x+Me),ie=Math.min(ie,We.y+fe),Q=Math.max(Q,We.x+Me+ut.w),Te=Math.max(Te,We.y+fe+ut.h))}const He={x:Be,y:ie,width:Q-Be,height:Te-ie},{dx:lt,dy:Y,guides:De}=rr(He,ee,new Set(we.keys()),void 0,$);Le(De);const Ce=Me+lt,ve=fe+Y;f=Ce,b=ve,n(ee.map(se=>{const We=we.get(se.id);return We?{...se,x:Math.max(0,We.x+Ce),y:Math.max(0,We.y+ve)}:se})),(at=yt.current)==null||at.call(yt,Ce,ve)},K=()=>{var D;window.removeEventListener("mousemove",L),window.removeEventListener("mouseup",K),ue.current=null,d==null||d(!1),Le([]),(D=gt.current)==null||D.call(gt,f,b,ze)};window.addEventListener("mousemove",L),window.addEventListener("mouseup",K)},[X,t,n,d]),Xt=a.useCallback((S,Z,xe)=>{S.preventDefault(),S.stopPropagation();const ae=t.find(N=>N.id===Z);if(!ae)return;A(new Set([Z])),ue.current="resize",d==null||d(!0);const Ee=S.clientX,ke=S.clientY,Re=ae.width,we=ae.height,ze=ae.x,et=ae.y,ee={left:xe.includes("w"),right:xe.includes("e"),top:xe.includes("n"),bottom:xe.includes("s")},f=N=>{const L=N.clientX-Ee,K=N.clientY-ke;let V=Re,D=we,Me=ze,fe=et;xe.includes("e")&&(V=Math.max(In,Re+L)),xe.includes("w")&&(V=Math.max(In,Re-L),Me=ze+Re-V),xe.includes("s")&&(D=Math.max(In,we+K)),xe.includes("n")&&(D=Math.max(In,we-K),fe=et+we-D);const Be={x:Me,y:fe,width:V,height:D},{dx:ie,dy:Q,guides:Te}=rr(Be,Ae.current,new Set([Z]),ee,$);Le(Te),ie!==0&&(ee.right?V+=ie:ee.left&&(Me+=ie,V-=ie)),Q!==0&&(ee.bottom?D+=Q:ee.top&&(fe+=Q,D-=Q)),n(Ae.current.map(He=>He.id===Z?{...He,x:Me,y:fe,width:V,height:D}:He)),z({x:N.clientX+12,y:N.clientY+12,text:`${Math.round(V)} × ${Math.round(D)}`})},b=()=>{window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",b),z(null),ue.current=null,d==null||d(!1),Le([])};window.addEventListener("mousemove",f),window.addEventListener("mouseup",b)},[t,n,d]),Jt=a.useCallback(S=>{ue.current=null,J(Z=>{const xe=new Set(Z);return xe.add(S),xe}),A(Z=>{const xe=new Set(Z);return xe.delete(S),xe}),re(()=>{n(Ae.current.filter(Z=>Z.id!==S)),J(Z=>{const xe=new Set(Z);return xe.delete(S),xe})},180)},[n]),Zt={hero:"Headline text",button:"Button label",badge:"Badge label",cta:"Call to action text",toast:"Notification message",modal:"Dialog title",card:"Card title",navigation:"Brand / nav items",tabs:"Tab labels",input:"Placeholder text",search:"Search placeholder",pricing:"Plan name or price",testimonial:"Quote text",alert:"Alert message",banner:"Banner text",tag:"Tag label",notification:"Notification message",stat:"Metric value",productCard:"Product name"},Nt=a.useCallback(S=>{const Z=t.find(xe=>xe.id===S);Z&&(pe.current=!!Z.text,_e(S),Ue(!1))},[t]),Ze=a.useCallback(()=>{be&&(Ue(!0),re(()=>{_e(null),Ue(!1)},150))},[be]);a.useEffect(()=>{r&&be&&Ze()},[r]);const bt=a.useCallback(S=>{be&&(n(t.map(Z=>Z.id===be?{...Z,text:S.trim()||void 0}:Z)),Ze())},[be,t,n,Ze]),ft=typeof window<"u"?window.scrollY:0,en=["nw","ne","se","sw"],Qt=B?"#f97316":"#3c82f7",tn=[{dir:"n",cls:C.edgeN,arrow:e.jsx("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:e.jsx("path",{d:"M4 0.5L1 4.5h6z",fill:Qt})})},{dir:"e",cls:C.edgeE,arrow:e.jsx("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:e.jsx("path",{d:"M5.5 4L1.5 1v6z",fill:Qt})})},{dir:"s",cls:C.edgeS,arrow:e.jsx("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:e.jsx("path",{d:"M4 5.5L1 1.5h6z",fill:Qt})})},{dir:"w",cls:C.edgeW,arrow:e.jsx("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:e.jsx("path",{d:"M0.5 4L4.5 1v6z",fill:Qt})})}];return e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:P,className:`${C.overlay} ${o?"":C.light} ${s?C.placing:""} ${m?C.passthrough:""} ${r?C.overlayExiting:""} ${B?C.wireframe:""}${p?` ${p}`:""}`,"data-feedback-toolbar":!0,onMouseDown:Kt,children:t.map(S=>{var Ee;const Z=X.has(S.id),xe=((Ee=Wt[S.type])==null?void 0:Ee.label)||S.type,ae=S.y-ft;return e.jsxs("div",{"data-design-placement":S.id,className:`${C.placement} ${Z?C.selected:""} ${$e.has(S.id)?C.exiting:""}`,style:{left:S.x,top:ae,width:S.width,height:S.height,position:"fixed"},onMouseDown:ke=>Tt(ke,S.id),onDoubleClick:()=>Nt(S.id),children:[e.jsx("span",{className:C.placementLabel,children:xe}),e.jsx("span",{className:`${C.placementAnnotation} ${S.text?C.annotationVisible:""}`,children:(S.text&&it.current.set(S.id,S.text),S.text||it.current.get(S.id)||"")}),e.jsx("div",{className:C.placementContent,children:e.jsx(Na,{type:S.type,width:S.width,height:S.height,text:S.text})}),e.jsx("div",{className:C.deleteButton,onMouseDown:ke=>ke.stopPropagation(),onClick:()=>Jt(S.id),children:"✕"}),en.map(ke=>e.jsx("div",{className:`${C.handle} ${C[`handle${ke.charAt(0).toUpperCase()}${ke.slice(1)}`]}`,onMouseDown:Re=>Xt(Re,S.id,ke)},ke)),tn.map(({dir:ke,cls:Re,arrow:we})=>e.jsx("div",{className:`${C.edgeHandle} ${Re}`,onMouseDown:ze=>Xt(ze,S.id,ke),children:we},ke))]},S.id)})}),be&&(()=>{var et;const S=t.find(ee=>ee.id===be);if(!S)return null;const Z=S.y-ft,xe=S.x+S.width/2,ae=Z-8,Ee=Z+S.height+8,ke=ae>200,Re=Ee<window.innerHeight-100,we=Math.max(160,Math.min(window.innerWidth-160,xe));let ze;return ke?ze={left:we,bottom:window.innerHeight-ae}:Re?ze={left:we,top:Ee}:ze={left:we,top:Math.max(80,window.innerHeight/2-80)},e.jsx($s,{element:((et=Wt[S.type])==null?void 0:et.label)||S.type,placeholder:Zt[S.type]||"Label or content text",initialValue:S.text??"",submitLabel:pe.current?"Save":"Set",onSubmit:bt,onCancel:Ze,onDelete:pe.current?()=>{bt("")}:void 0,isExiting:Fe,lightMode:!o,style:ze})})(),me&&e.jsx("div",{className:C.drawBox,style:{left:me.x,top:me.y,width:me.w,height:me.h},"data-feedback-toolbar":!0}),I&&e.jsx("div",{className:C.selectBox,style:{left:I.x,top:I.y,width:I.w,height:I.h},"data-feedback-toolbar":!0}),he&&e.jsx("div",{className:C.sizeIndicator,style:{left:he.x,top:he.y},"data-feedback-toolbar":!0,children:he.text}),je.map((S,Z)=>e.jsx("div",{className:C.guideLine,style:S.axis==="x"?{position:"fixed",left:S.pos,top:0,width:1,bottom:0}:{position:"fixed",left:0,top:S.pos-ft,right:0,height:1},"data-feedback-toolbar":!0},`${S.axis}-${S.pos}-${Z}`))]})}function La(t){if(!t)return"";const n=t.scrollTop>2,s=t.scrollTop+t.clientHeight<t.scrollHeight-2;return`${n?C.fadeTop:""} ${s?C.fadeBottom:""}`}var c="currentColor",j="0.5";function Ea({type:t}){switch(t){case"navigation":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"4",width:"18",height:"8",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"7",width:"3",height:"1.5",rx:".5",fill:c,opacity:".4"}),e.jsx("rect",{x:"7",y:"7",width:"2.5",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"11",y:"7",width:"2.5",height:"1.5",rx:".5",fill:c,opacity:".25"})]});case"header":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"5.5",width:"8",height:"2",rx:".5",fill:c,opacity:".35"}),e.jsx("rect",{x:"3",y:"9",width:"12",height:"1",rx:".5",fill:c,opacity:".15"})]});case"hero":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"5",width:"10",height:"1.5",rx:".5",fill:c,opacity:".35"}),e.jsx("rect",{x:"7",y:"8",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"7.5",y:"10.5",width:"5",height:"2.5",rx:"1",stroke:c,strokeWidth:j})]});case"section":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"4",width:"6",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"3",y:"6.5",width:"14",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"3",y:"9",width:"10",height:"1",rx:".5",fill:c,opacity:".15"})]});case"sidebar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"4",width:"4",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"2.5",y:"6.5",width:"3.5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2.5",y:"9",width:"4",height:"1",rx:".5",fill:c,opacity:".15"})]});case"footer":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"7",width:"18",height:"8",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"9.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"9.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"15",y:"9.5",width:"3",height:"1",rx:".5",fill:c,opacity:".2"})]});case"modal":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"7",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"5",y:"7",width:"10",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"11",y:"11",width:"5",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"divider":return e.jsx("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:e.jsx("line",{x1:"2",y1:"8",x2:"18",y2:"8",stroke:c,strokeWidth:"0.5",opacity:".3"})});case"card":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"1",width:"16",height:"5.5",rx:"1",fill:c,opacity:".04"}),e.jsx("rect",{x:"4",y:"8.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"4",y:"11",width:"11",height:"1",rx:".5",fill:c,opacity:".12"})]});case"text":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"14",height:"1.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"2",y:"7",width:"11",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"9.5",width:"13",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"12",width:"8",height:"1",rx:".5",fill:c,opacity:".12"})]});case"image":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"2",x2:"18",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"18",y1:"2",x2:"2",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"})]});case"video":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M8.5 5.5v5l4.5-2.5z",stroke:c,strokeWidth:j,fill:c,opacity:".15"})]});case"table":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"1",y1:"5.5",x2:"19",y2:"5.5",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"1",y1:"9",x2:"19",y2:"9",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"7",y1:"2",x2:"7",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"13",y1:"2",x2:"13",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"})]});case"grid":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j})]});case"list":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"3.5",cy:"4.5",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"4",width:"10",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"3.5",cy:"8",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"3.5",cy:"11.5",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"11",width:"11",height:"1",rx:".5",fill:c,opacity:".2"})]});case"chart":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"9",width:"2.5",height:"4",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"7",y:"6",width:"2.5",height:"7",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"11",y:"3",width:"2.5",height:"10",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"15",y:"5",width:"2.5",height:"8",rx:".5",fill:c,opacity:".2"})]});case"accordion":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"2",width:"17",height:"4",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"3.5",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"1.5",y:"7.5",width:"17",height:"3",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"12",width:"17",height:"3",rx:"1",stroke:c,strokeWidth:j})]});case"carousel":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"10",rx:"1",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M1.5 7L3 8.5 1.5 10",stroke:c,strokeWidth:j,opacity:".35"}),e.jsx("path",{d:"M18.5 7L17 8.5 18.5 10",stroke:c,strokeWidth:j,opacity:".35"}),e.jsx("circle",{cx:"8.5",cy:"14",r:".6",fill:c,opacity:".35"}),e.jsx("circle",{cx:"10",cy:"14",r:".6",fill:c,opacity:".15"}),e.jsx("circle",{cx:"11.5",cy:"14",r:".6",fill:c,opacity:".15"})]});case"button":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"2",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"7.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"})]});case"input":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"5.5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"6.5",width:"16",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"8.5",width:"7",height:"1",rx:".5",fill:c,opacity:".12"})]});case"search":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4.5",width:"16",height:"7",rx:"3.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"6",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("line",{x1:"7.5",y1:"9.5",x2:"9",y2:"11",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"9.5",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"form":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1.5",width:"5.5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"3.5",width:"16",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"8",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"10",width:"16",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"12",y:"14",width:"6",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"tabs":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"5",width:"18",height:"10",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1",y:"2",width:"6",height:"3.5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"3.25",width:"3",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"2",width:"6",height:"3.5",rx:".75",stroke:c,strokeWidth:j})]});case"dropdown":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"4",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"3.5",width:"7",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("path",{d:"M15 3.5l1.5 1.5L18 3.5",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"2",y:"7",width:"16",height:"7",rx:"1",stroke:c,strokeWidth:j,strokeDasharray:"2 1",opacity:".3"})]});case"toggle":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"4",y:"5",width:"12",height:"6",rx:"3",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"13",cy:"8",r:"2",fill:c,opacity:".3"})]});case"avatar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"6",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"10",cy:"6.5",r:"2",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5",stroke:c,strokeWidth:j})]});case"badge":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"3",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"})]});case"breadcrumb":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"7",width:"3.5",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("path",{d:"M6.5 7l1 1-1 1",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"9",y:"7",width:"3.5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("path",{d:"M14 7l1 1-1 1",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"16.5",y:"7",width:"2",height:"1",rx:".5",fill:c,opacity:".15"})]});case"pagination":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11",y:"5.5",width:"3.5",height:"5",rx:"1",fill:c,opacity:".15",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"15.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j})]});case"progress":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"7",width:"16",height:"2",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"7",width:"10",height:"2",rx:"1",fill:c,opacity:".2"})]});case"toast":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"5",cy:"8",r:"1.5",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"8",y:"6.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"8",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".12"})]});case"tooltip":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"3",width:"14",height:"7",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5.5",y:"5.5",width:"9",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("path",{d:"M9 10l1 2.5 1-2.5",stroke:c,strokeWidth:j})]});case"pricing":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"5.5",width:"6",height:"2",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"5",y:"9",width:"10",height:"1",rx:".5",fill:c,opacity:".1"}),e.jsx("rect",{x:"5",y:"11",width:"10",height:"1",rx:".5",fill:c,opacity:".1"}),e.jsx("rect",{x:"6",y:"13",width:"8",height:"1.5",rx:".5",fill:c,opacity:".2"})]});case"testimonial":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("text",{x:"4",y:"5.5",fontSize:"4",fill:c,opacity:".2",fontFamily:"serif",children:"“"}),e.jsx("rect",{x:"4",y:"7",width:"12",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"9",width:"9",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("circle",{cx:"5.5",cy:"12.5",r:"1.5",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"8",y:"12",width:"5",height:"1",rx:".5",fill:c,opacity:".15"})]});case"cta":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"10",height:"1.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"7",y:"10",width:"6",height:"2.5",rx:"1",stroke:c,strokeWidth:j})]});case"alert":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"6",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("line",{x1:"6",y1:"7",x2:"6",y2:"8.5",stroke:c,strokeWidth:"0.6",opacity:".5"}),e.jsx("circle",{cx:"6",cy:"9.3",r:".3",fill:c,opacity:".5"}),e.jsx("rect",{x:"9.5",y:"7",width:"6",height:"1",rx:".5",fill:c,opacity:".2"})]});case"banner":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"5",width:"18",height:"6",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"14",y:"7",width:"3.5",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"stat":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"4.5",width:"8",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"5",y:"7",width:"10",height:"2.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"7",y:"11",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"stepper":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"4",cy:"8",r:"2",fill:c,opacity:".2",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"6",y1:"8",x2:"8",y2:"8",stroke:c,strokeWidth:".4",opacity:".3"}),e.jsx("circle",{cx:"10",cy:"8",r:"2",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"12",y1:"8",x2:"14",y2:"8",stroke:c,strokeWidth:".4",opacity:".3"}),e.jsx("circle",{cx:"16",cy:"8",r:"2",stroke:c,strokeWidth:j})]});case"tag":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5.5",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("line",{x1:"14",y1:"6.5",x2:"15.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("line",{x1:"15.5",y1:"6.5",x2:"14",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"})]});case"rating":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("path",{d:"M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z",fill:c,opacity:".25"}),e.jsx("path",{d:"M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z",fill:c,opacity:".25"}),e.jsx("path",{d:"M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z",stroke:c,strokeWidth:j,opacity:".25"})]});case"map":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"6",x2:"18",y2:"10",stroke:c,strokeWidth:".3",opacity:".15"}),e.jsx("line",{x1:"7",y1:"2",x2:"11",y2:"14",stroke:c,strokeWidth:".3",opacity:".15"}),e.jsx("path",{d:"M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z",fill:c,opacity:".15",stroke:c,strokeWidth:j})]});case"timeline":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("line",{x1:"5",y1:"2",x2:"5",y2:"14",stroke:c,strokeWidth:".4",opacity:".25"}),e.jsx("circle",{cx:"5",cy:"4",r:"1.5",fill:c,opacity:".2",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"3",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("circle",{cx:"5",cy:"8.5",r:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("circle",{cx:"5",cy:"13",r:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"12",width:"7",height:"1",rx:".5",fill:c,opacity:".15"})]});case"fileUpload":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j,strokeDasharray:"2 1"}),e.jsx("path",{d:"M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"7",y:"11.5",width:"6",height:"1",rx:".5",fill:c,opacity:".15"})]});case"codeBlock":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"4",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"5.5",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"7",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("rect",{x:"4",y:"7",width:"7",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"6",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"11",width:"8",height:"1",rx:".5",fill:c,opacity:".12"})]});case"calendar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"6.5",x2:"18",y2:"6.5",stroke:c,strokeWidth:".4",opacity:".25"}),e.jsx("rect",{x:"5",y:"4",width:"1",height:"1.5",rx:".3",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"4",width:"1",height:"1.5",rx:".3",fill:c,opacity:".2"}),e.jsx("circle",{cx:"7",cy:"9",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"9",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"13",cy:"9",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"7",cy:"12",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"12",r:".6",fill:c,opacity:".2"})]});case"notification":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"16",height:"10",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"5.5",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"9",y:"6",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"8.5",width:"4.5",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("circle",{cx:"16.5",cy:"4.5",r:"1.5",fill:c,opacity:".25"})]});case"productCard":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"1",width:"14",height:"6",rx:"1",fill:c,opacity:".04"}),e.jsx("rect",{x:"5",y:"8.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"10.5",width:"4",height:"1.5",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"12",y:"12",width:"4",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"profile":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"5",r:"3",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"10",width:"10",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"12.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"drawer":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"9",y:"1",width:"10",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"10.5",y:"4",width:"5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"10.5",y:"6.5",width:"7",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"10.5",y:"9",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:c,strokeWidth:j,opacity:".15"})]});case"popover":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"9",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"7",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("path",{d:"M9 11l1 2.5 1-2.5",stroke:c,strokeWidth:j})]});case"logo":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"10",height:"10",rx:"2",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M5 9.5l2-4 2 4",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"14",y:"6",width:"4",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"8.5",width:"3",height:"1",rx:".5",fill:c,opacity:".12"})]});case"faq":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("text",{x:"2.5",y:"5.5",fontSize:"4",fill:c,opacity:".3",fontWeight:"bold",children:"?"}),e.jsx("rect",{x:"7",y:"3",width:"10",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"5.5",width:"8",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("text",{x:"2.5",y:"11.5",fontSize:"4",fill:c,opacity:".3",fontWeight:"bold",children:"?"}),e.jsx("rect",{x:"7",y:"9",width:"9",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"11.5",width:"7",height:"1",rx:".5",fill:c,opacity:".12"})]});case"gallery":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"7.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"13.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"7.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"13.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j})]});case"checkbox":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"5",y:"4",width:"8",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M7.5 8l1.5 1.5 3-3",stroke:c,strokeWidth:j,opacity:".35"})]});case"radio":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"4",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"10",cy:"8",r:"2",fill:c,opacity:".3"})]});case"slider":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"7.5",width:"16",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"7.5",width:"10",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("circle",{cx:"12",cy:"8",r:"2.5",stroke:c,strokeWidth:j})]});case"datePicker":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"3",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"2.5",width:"2.5",height:"2",rx:".5",fill:c,opacity:".12"}),e.jsx("rect",{x:"2",y:"7",width:"16",height:"8",rx:"1",stroke:c,strokeWidth:j,strokeDasharray:"2 1",opacity:".3"}),e.jsx("circle",{cx:"6",cy:"10",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"10",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"14",cy:"10",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"6",cy:"13",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"13",r:".6",fill:c,opacity:".2"})]});case"skeleton":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"3",rx:"1",fill:c,opacity:".08"}),e.jsx("rect",{x:"2",y:"7",width:"10",height:"2",rx:".75",fill:c,opacity:".08"}),e.jsx("rect",{x:"2",y:"11",width:"13",height:"2",rx:".75",fill:c,opacity:".08"})]});case"chip":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"5",width:"10",height:"6",rx:"3",fill:c,opacity:".08",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"7.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("line",{x1:"9.5",y1:"6.5",x2:"10.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("line",{x1:"10.5",y1:"6.5",x2:"9.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"13",y:"5",width:"5.5",height:"6",rx:"3",stroke:c,strokeWidth:j,opacity:".25"})]});case"icon":return e.jsx("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:e.jsx("path",{d:"M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z",stroke:c,strokeWidth:j,opacity:".3"})});case"spinner":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"5",stroke:c,strokeWidth:j,opacity:".12"}),e.jsx("path",{d:"M10 3a5 5 0 0 1 5 5",stroke:c,strokeWidth:j,opacity:".35",strokeLinecap:"round"})]});case"feature":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M4.5 3.5v3m-1.5-1.5h3",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"9",y:"2.5",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"5.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("rect",{x:"2",y:"10",width:"5",height:"5",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"9",y:"10.5",width:"7",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"13.5",width:"5",height:"1",rx:".5",fill:c,opacity:".12"})]});case"team":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"5",cy:"5",r:"2.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"15",cy:"5",r:"2.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"12.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"5",r:"2.5",stroke:c,strokeWidth:j,opacity:".5"}),e.jsx("rect",{x:"7.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"12",width:"12",height:"1",rx:".5",fill:c,opacity:".1"})]});case"login":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"5.5",width:"10",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"9.5",width:"10",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"13.5",width:"7",height:"2",rx:".75",fill:c,opacity:".2"})]});case"contact":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"3",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"4",y:"5",width:"12",height:"2.5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"8.5",width:"12",height:"4",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11",y:"13.5",width:"5",height:"1.5",rx:".5",fill:c,opacity:".2"})]});default:return null}}function Ra({activeType:t,onSelect:n,onDragStart:s,scrollRef:i,fadeClass:o,blankCanvas:r}){return e.jsx("div",{ref:i,className:`${C.placeScroll} ${o||""}`,children:Ar.map(d=>e.jsxs("div",{className:C.paletteSection,children:[e.jsx("div",{className:C.paletteSectionTitle,children:d.section}),d.items.map(p=>e.jsxs("div",{className:`${C.paletteItem} ${t===p.type?C.active:""} ${r?C.wireframe:""}`,onClick:()=>n(p.type),onMouseDown:m=>{m.button===0&&s(p.type,m)},children:[e.jsx("div",{className:C.paletteItemIcon,children:e.jsx(Ea,{type:p.type})}),e.jsx("span",{className:C.paletteItemLabel,children:p.label})]},p.type))]},d.section))})}function Ba({value:t,suffix:n}){const[s,i]=a.useState(null),[o,r]=a.useState(n),[d,p]=a.useState("up"),m=a.useRef(t),$=a.useRef(n),g=a.useRef(),y=s!==null&&o!==n;return a.useEffect(()=>{if(t!==m.current){if(t===0){m.current=t,$.current=n,i(null);return}p(t>m.current?"up":"down"),i(m.current),r($.current),m.current=t,$.current=n,clearTimeout(g.current),g.current=re(()=>i(null),250)}else $.current=n},[t,n]),s===null?e.jsxs(e.Fragment,{children:[t,n?` ${n}`:""]}):y?e.jsxs("span",{className:C.rollingWrap,children:[e.jsxs("span",{style:{visibility:"hidden"},children:[t," ",n]}),e.jsxs("span",{className:`${C.rollingNum} ${d==="up"?C.exitUp:C.exitDown}`,children:[s," ",o]},`o${s}-${t}`),e.jsxs("span",{className:`${C.rollingNum} ${d==="up"?C.enterUp:C.enterDown}`,children:[t," ",n]},`n${t}`)]}):e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:C.rollingWrap,children:[e.jsx("span",{style:{visibility:"hidden"},children:t}),e.jsx("span",{className:`${C.rollingNum} ${d==="up"?C.exitUp:C.exitDown}`,children:s},`o${s}-${t}`),e.jsx("span",{className:`${C.rollingNum} ${d==="up"?C.enterUp:C.enterDown}`,children:t},`n${t}`)]}),n?` ${n}`:""]})}function Ta({activeType:t,onSelect:n,isDarkMode:s,sectionCount:i,onDetectSections:o,visible:r,onExited:d,placementCount:p,onClearPlacements:m,onDragStart:$,blankCanvas:g,onBlankCanvasChange:y,wireframePurpose:w,onWireframePurposeChange:R,Tooltip:k}){const[B,X]=a.useState(!1),[A,me]=a.useState("exit"),[Pe,I]=a.useState(!1),[ne,he]=a.useState(!0),z=a.useRef(0),je=a.useRef(""),Le=a.useRef(0),be=a.useRef(),_e=a.useRef(null),[Fe,Ue]=a.useState("");a.useEffect(()=>(r?(X(!0),clearTimeout(be.current),cancelAnimationFrame(Le.current),Le.current=Bn(()=>{Le.current=Bn(()=>{me("enter")})})):(cancelAnimationFrame(Le.current),me("exit"),clearTimeout(be.current),be.current=re(()=>{X(!1),d==null||d()},200)),()=>cancelAnimationFrame(Le.current)),[r]);const pe=p>0||i>0,$e=p+i;return $e>0&&(z.current=$e,je.current=g?$e===1?"Component":"Components":$e===1?"Change":"Changes"),a.useEffect(()=>{if(pe)Pe?he(!1):(he(!0),I(!0),Bn(()=>{Bn(()=>{he(!1)})}));else{he(!0);const J=re(()=>I(!1),300);return()=>clearTimeout(J)}},[pe]),a.useEffect(()=>{if(!B)return;const J=_e.current;if(!J)return;const it=()=>Ue(La(J));it(),J.addEventListener("scroll",it,{passive:!0});const P=new ResizeObserver(it);return P.observe(J),()=>{J.removeEventListener("scroll",it),P.disconnect()}},[B]),B?e.jsxs("div",{className:`${C.palette} ${C[A]} ${s?"":C.light}`,"data-feedback-toolbar":!0,"data-agentation-palette":!0,onClick:J=>J.stopPropagation(),onMouseDown:J=>J.stopPropagation(),onTransitionEnd:J=>{J.target===J.currentTarget&&(r||(clearTimeout(be.current),X(!1),me("exit"),d==null||d()))},children:[e.jsxs("div",{className:C.paletteHeader,children:[e.jsx("div",{className:C.paletteHeaderTitle,children:"Layout Mode"}),e.jsxs("div",{className:C.paletteHeaderDesc,children:["Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary."," ",e.jsx("a",{href:"https://agentation.dev/features#layout-mode",target:"_blank",rel:"noopener noreferrer",children:"Learn more."})]})]}),e.jsxs("div",{className:`${C.canvasToggle} ${g?C.active:""}`,onClick:()=>y(!g),children:[e.jsx("span",{className:C.canvasToggleIcon,children:e.jsxs("svg",{viewBox:"0 0 14 14",width:"14",height:"14",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"12",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1"}),e.jsx("circle",{cx:"4.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"4.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"4.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"})]})}),e.jsx("span",{className:C.canvasToggleLabel,children:"Wireframe New Page"})]}),e.jsx("div",{className:`${C.wireframePurposeWrap} ${g?"":C.collapsed}`,children:e.jsx("div",{className:C.wireframePurposeInner,children:e.jsx("textarea",{className:C.wireframePurposeInput,placeholder:"Describe this page to provide additional context for your agent.",value:w,onChange:J=>R(J.target.value),rows:2})})}),e.jsx(Ra,{activeType:t,onSelect:n,onDragStart:$,scrollRef:_e,fadeClass:Fe,blankCanvas:g}),Pe&&e.jsx("div",{className:`${C.paletteFooterWrap} ${ne?C.footerHidden:""}`,children:e.jsx("div",{className:C.paletteFooterInner,children:e.jsx("div",{className:C.paletteFooterInnerContent,children:e.jsxs("div",{className:C.paletteFooter,children:[e.jsx("span",{className:C.paletteFooterCount,children:e.jsx(Ba,{value:z.current,suffix:je.current})}),e.jsx("button",{className:C.paletteFooterClear,onClick:m,children:"Clear"})]})})})})]}):null}function Pn(t){if(t.parentElement)return t.parentElement;const n=t.getRootNode();return n instanceof ShadowRoot?n.host:null}function Ct(t,n){let s=t;for(;s;){if(s.matches(n))return s;s=Pn(s)}return null}function Da(t,n=4){const s=[];let i=t,o=0;for(;i&&o<n;){const r=i.tagName.toLowerCase();if(r==="html"||r==="body")break;let d=r;if(i.id)d=`#${i.id}`;else if(i.className&&typeof i.className=="string"){const m=i.className.split(/\s+/).find($=>$.length>2&&!$.match(/^[a-z]{1,2}$/)&&!$.match(/[A-Z0-9]{5,}/));m&&(d=`.${m.split("_")[0]}`)}const p=Pn(i);!i.parentElement&&p&&(d=`⟨shadow⟩ ${d}`),s.unshift(d),i=p,o++}return s.join(" > ")}function Tn(t){var i,o,r,d,p,m,$,g;const n=Da(t);if(t.dataset.element)return{name:t.dataset.element,path:n};const s=t.tagName.toLowerCase();if(["path","circle","rect","line","g"].includes(s)){const y=Ct(t,"svg");if(y){const w=Pn(y);if(w instanceof HTMLElement)return{name:`graphic in ${Tn(w).name}`,path:n}}return{name:"graphic element",path:n}}if(s==="svg"){const y=Pn(t);if((y==null?void 0:y.tagName.toLowerCase())==="button"){const w=(i=y.textContent)==null?void 0:i.trim();return{name:w?`icon in "${w}" button`:"button icon",path:n}}return{name:"icon",path:n}}if(s==="button"){const y=(o=t.textContent)==null?void 0:o.trim(),w=t.getAttribute("aria-label");return w?{name:`button [${w}]`,path:n}:{name:y?`button "${y.slice(0,25)}"`:"button",path:n}}if(s==="a"){const y=(r=t.textContent)==null?void 0:r.trim(),w=t.getAttribute("href");return y?{name:`link "${y.slice(0,25)}"`,path:n}:w?{name:`link to ${w.slice(0,30)}`,path:n}:{name:"link",path:n}}if(s==="input"){const y=t.getAttribute("type")||"text",w=t.getAttribute("placeholder"),R=t.getAttribute("name");return w?{name:`input "${w}"`,path:n}:R?{name:`input [${R}]`,path:n}:{name:`${y} input`,path:n}}if(["h1","h2","h3","h4","h5","h6"].includes(s)){const y=(d=t.textContent)==null?void 0:d.trim();return{name:y?`${s} "${y.slice(0,35)}"`:s,path:n}}if(s==="p"){const y=(p=t.textContent)==null?void 0:p.trim();return y?{name:`paragraph: "${y.slice(0,40)}${y.length>40?"...":""}"`,path:n}:{name:"paragraph",path:n}}if(s==="span"||s==="label"){const y=(m=t.textContent)==null?void 0:m.trim();return y&&y.length<40?{name:`"${y}"`,path:n}:{name:s,path:n}}if(s==="li"){const y=($=t.textContent)==null?void 0:$.trim();return y&&y.length<40?{name:`list item: "${y.slice(0,35)}"`,path:n}:{name:"list item",path:n}}if(s==="blockquote")return{name:"blockquote",path:n};if(s==="code"){const y=(g=t.textContent)==null?void 0:g.trim();return y&&y.length<30?{name:`code: \`${y}\``,path:n}:{name:"code",path:n}}if(s==="pre")return{name:"code block",path:n};if(s==="img"){const y=t.getAttribute("alt");return{name:y?`image "${y.slice(0,30)}"`:"image",path:n}}if(s==="video")return{name:"video",path:n};if(["div","section","article","nav","header","footer","aside","main"].includes(s)){const y=t.className,w=t.getAttribute("role"),R=t.getAttribute("aria-label");if(R)return{name:`${s} [${R}]`,path:n};if(w)return{name:`${w}`,path:n};if(typeof y=="string"&&y){const k=y.split(/[\s_-]+/).map(B=>B.replace(/[A-Z0-9]{5,}.*$/,"")).filter(B=>B.length>2&&!/^[a-z]{1,2}$/.test(B)).slice(0,2);if(k.length>0)return{name:k.join(" "),path:n}}return{name:s==="div"?"container":s,path:n}}return{name:s,path:n}}function Gn(t){var r,d,p;const n=[],s=(r=t.textContent)==null?void 0:r.trim();s&&s.length<100&&n.push(s);const i=t.previousElementSibling;if(i){const m=(d=i.textContent)==null?void 0:d.trim();m&&m.length<50&&n.unshift(`[before: "${m.slice(0,40)}"]`)}const o=t.nextElementSibling;if(o){const m=(p=o.textContent)==null?void 0:p.trim();m&&m.length<50&&n.push(`[after: "${m.slice(0,40)}"]`)}return n.join(" ")}function gs(t){const n=Pn(t);if(!n)return"";const o=(t.getRootNode()instanceof ShadowRoot&&t.parentElement?Array.from(t.parentElement.children):Array.from(n.children)).filter(g=>g!==t&&g instanceof HTMLElement);if(o.length===0)return"";const r=o.slice(0,4).map(g=>{var k;const y=g.tagName.toLowerCase(),w=g.className;let R="";if(typeof w=="string"&&w){const B=w.split(/\s+/).map(X=>X.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(X=>X.length>2&&!/^[a-z]{1,2}$/.test(X));B&&(R=`.${B}`)}if(y==="button"||y==="a"){const B=(k=g.textContent)==null?void 0:k.trim().slice(0,15);if(B)return`${y}${R} "${B}"`}return`${y}${R}`});let p=n.tagName.toLowerCase();if(typeof n.className=="string"&&n.className){const g=n.className.split(/\s+/).map(y=>y.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(y=>y.length>2&&!/^[a-z]{1,2}$/.test(y));g&&(p=`.${g}`)}const m=n.children.length,$=m>r.length+1?` (${m} total in ${p})`:"";return r.join(", ")+$}function Kn(t){const n=t.className;return typeof n!="string"||!n?"":n.split(/\s+/).filter(i=>i.length>0).map(i=>{const o=i.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);return o?o[1]:i}).filter((i,o,r)=>r.indexOf(i)===o).join(", ")}var zr=new Set(["none","normal","auto","0px","rgba(0, 0, 0, 0)","transparent","static","visible"]),Pa=new Set(["p","span","h1","h2","h3","h4","h5","h6","label","li","td","th","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","a","time","cite","q"]),Aa=new Set(["input","textarea","select"]),za=new Set(["img","video","canvas","svg"]),Wa=new Set(["div","section","article","nav","header","footer","aside","main","ul","ol","form","fieldset"]);function fs(t){if(typeof window>"u")return{};const n=window.getComputedStyle(t),s={},i=t.tagName.toLowerCase();let o;Pa.has(i)?o=["color","fontSize","fontWeight","fontFamily","lineHeight"]:i==="button"||i==="a"&&t.getAttribute("role")==="button"?o=["backgroundColor","color","padding","borderRadius","fontSize"]:Aa.has(i)?o=["backgroundColor","color","padding","borderRadius","fontSize"]:za.has(i)?o=["width","height","objectFit","borderRadius"]:Wa.has(i)?o=["display","padding","margin","gap","backgroundColor"]:o=["color","fontSize","margin","padding","backgroundColor"];for(const r of o){const d=r.replace(/([A-Z])/g,"-$1").toLowerCase(),p=n.getPropertyValue(d);p&&!zr.has(p)&&(s[r]=p)}return s}var Oa=["color","backgroundColor","borderColor","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textAlign","width","height","padding","margin","border","borderRadius","display","position","top","right","bottom","left","zIndex","flexDirection","justifyContent","alignItems","gap","opacity","visibility","overflow","boxShadow","transform"];function ys(t){if(typeof window>"u")return"";const n=window.getComputedStyle(t),s=[];for(const i of Oa){const o=i.replace(/([A-Z])/g,"-$1").toLowerCase(),r=n.getPropertyValue(o);r&&!zr.has(r)&&s.push(`${o}: ${r}`)}return s.join("; ")}function Fa(t){if(!t)return;const n={},s=t.split(";").map(i=>i.trim()).filter(Boolean);for(const i of s){const o=i.indexOf(":");if(o>0){const r=i.slice(0,o).trim(),d=i.slice(o+1).trim();r&&d&&(n[r]=d)}}return Object.keys(n).length>0?n:void 0}function bs(t){const n=[],s=t.getAttribute("role"),i=t.getAttribute("aria-label"),o=t.getAttribute("aria-describedby"),r=t.getAttribute("tabindex"),d=t.getAttribute("aria-hidden");return s&&n.push(`role="${s}"`),i&&n.push(`aria-label="${i}"`),o&&n.push(`aria-describedby="${o}"`),r&&n.push(`tabindex=${r}`),d==="true"&&n.push("aria-hidden"),t.matches("a, button, input, select, textarea, [tabindex]")&&n.push("focusable"),n.join(", ")}function ws(t){const n=[];let s=t;for(;s&&s.tagName.toLowerCase()!=="html";){const i=s.tagName.toLowerCase();let o=i;if(s.id)o=`${i}#${s.id}`;else if(s.className&&typeof s.className=="string"){const d=s.className.split(/\s+/).map(p=>p.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(p=>p.length>2);d&&(o=`${i}.${d}`)}const r=Pn(s);!s.parentElement&&r&&(o=`⟨shadow⟩ ${o}`),n.unshift(o),s=r}return n.join(" > ")}var Ha=new Set(["nav","header","main","section","article","footer","aside"]),uo={banner:"Header",navigation:"Navigation",main:"Main Content",contentinfo:"Footer",complementary:"Sidebar",region:"Section"},lr={nav:"Navigation",header:"Header",main:"Main Content",section:"Section",article:"Article",footer:"Footer",aside:"Sidebar"},Ya=new Set(["script","style","noscript","link","meta"]),Ua=40;function Wr(t){let n=t;for(;n&&n!==document.body&&n!==document.documentElement;){const s=window.getComputedStyle(n).position;if(s==="fixed"||s==="sticky")return!0;n=n.parentElement}return!1}function bn(t){const n=t.tagName.toLowerCase();if(["nav","header","footer","main"].includes(n)&&document.querySelectorAll(n).length===1)return n;if(t.id)return`#${CSS.escape(t.id)}`;if(t.className&&typeof t.className=="string"){const o=t.className.split(/\s+/).filter(r=>r.length>0).find(r=>r.length>2&&!/^[a-zA-Z0-9]{6,}$/.test(r)&&!/^[a-z]{1,2}$/.test(r));if(o){const r=`${n}.${CSS.escape(o)}`;if(document.querySelectorAll(r).length===1)return r}}const s=t.parentElement;if(s){const o=Array.from(s.children).indexOf(t)+1;return`${s===document.body?"body":bn(s)} > ${n}:nth-child(${o})`}return n}function Is(t){var d;const n=t.tagName.toLowerCase(),s=t.getAttribute("aria-label");if(s)return s;const i=t.getAttribute("role");if(i&&uo[i])return uo[i];if(lr[n])return lr[n];const o=t.querySelector("h1, h2, h3, h4, h5, h6");if(o){const p=(d=o.textContent)==null?void 0:d.trim();if(p&&p.length<=50)return p;if(p)return p.slice(0,47)+"..."}const{name:r}=Tn(t);return r.charAt(0).toUpperCase()+r.slice(1)}function Or(t){const n=t.className;return typeof n!="string"||!n?null:n.split(/\s+/).map(i=>i.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(i=>i.length>2&&!/^[a-z]{1,2}$/.test(i))||null}function Fr(t){var i;const n=(i=t.textContent)==null?void 0:i.trim();if(!n)return null;const s=n.replace(/\s+/g," ");return s.length<=30?s:s.slice(0,30)+"…"}function Xa(){const t=document.querySelector("main")||document.body,n=Array.from(t.children);let s=n;t!==document.body&&n.length<3&&(s=Array.from(document.body.children));const i=[];return s.forEach((o,r)=>{if(!(o instanceof HTMLElement))return;const d=o.tagName.toLowerCase();if(Ya.has(d)||o.hasAttribute("data-feedback-toolbar")||o.closest("[data-feedback-toolbar]"))return;const p=window.getComputedStyle(o);if(p.display==="none"||p.visibility==="hidden")return;const m=o.getBoundingClientRect();if(m.height<Ua)return;const $=Ha.has(d),g=o.getAttribute("role")&&uo[o.getAttribute("role")],y=d==="div"&&m.height>=60;if(!$&&!g&&!y)return;const w=window.scrollY,R=Wr(o),k={x:m.x,y:R?m.y:m.y+w,width:m.width,height:m.height};i.push({id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Is(o),tagName:d,selector:bn(o),role:o.getAttribute("role"),className:Or(o),textSnippet:Fr(o),originalRect:k,currentRect:{...k},originalIndex:r,isFixed:R})}),i}function Qa(t){const n=window.scrollY,s=t.getBoundingClientRect(),i=Wr(t),o={x:s.x,y:i?s.y:s.y+n,width:s.width,height:s.height},r=t.parentElement;let d=0;return r&&(d=Array.from(r.children).indexOf(t)),{id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Is(t),tagName:t.tagName.toLowerCase(),selector:bn(t),role:t.getAttribute("role"),className:Or(t),textSnippet:Fr(t),originalRect:o,currentRect:{...o},originalIndex:d,isFixed:i}}var ar={bg:"rgba(59, 130, 246, 0.08)",border:"rgba(59, 130, 246, 0.5)",pill:"#3b82f6"},cr=["nw","n","ne","e","se","s","sw","w"],vs=24,dr=16,ks=5;function _r(t,n,s,i){let o=1/0,r=1/0;const d=t.x,p=t.x+t.width,m=t.x+t.width/2,$=t.y,g=t.y+t.height,y=t.y+t.height/2,w=[];for(const z of n)s.has(z.id)||w.push(z.currentRect);i&&w.push(...i);for(const z of w){const je=z.x,Le=z.x+z.width,be=z.x+z.width/2,_e=z.y,Fe=z.y+z.height,Ue=z.y+z.height/2;for(const pe of[d,p,m])for(const $e of[je,Le,be]){const J=$e-pe;Math.abs(J)<ks&&Math.abs(J)<Math.abs(o)&&(o=J)}for(const pe of[$,g,y])for(const $e of[_e,Fe,Ue]){const J=$e-pe;Math.abs(J)<ks&&Math.abs(J)<Math.abs(r)&&(r=J)}}const R=Math.abs(o)<ks?o:0,k=Math.abs(r)<ks?r:0,B=[],X=new Set,A=d+R,me=p+R,Pe=m+R,I=$+k,ne=g+k,he=y+k;for(const z of w){const je=z.x,Le=z.x+z.width,be=z.x+z.width/2,_e=z.y,Fe=z.y+z.height,Ue=z.y+z.height/2;for(const pe of[je,be,Le])for(const $e of[A,Pe,me])if(Math.abs($e-pe)<.5){const J=`x:${Math.round(pe)}`;X.has(J)||(X.add(J),B.push({axis:"x",pos:pe}))}for(const pe of[_e,Ue,Fe])for(const $e of[I,he,ne])if(Math.abs($e-pe)<.5){const J=`y:${Math.round(pe)}`;X.has(J)||(X.add(J),B.push({axis:"y",pos:pe}))}}return{dx:R,dy:k,guides:B}}var qa=new Set(["script","style","noscript","link","meta","br","hr"]);function ur(t){let n=t;for(;n&&n!==document.body&&n!==document.documentElement;){if(n.closest("[data-feedback-toolbar]"))return null;if(qa.has(n.tagName.toLowerCase())){n=n.parentElement;continue}const s=n.getBoundingClientRect();if(s.width>=dr&&s.height>=dr)return n;n=n.parentElement}return null}function Va({rearrangeState:t,onChange:n,isDarkMode:s,exiting:i,className:o,blankCanvas:r,extraSnapRects:d,onSelectionChange:p,deselectSignal:m,onDragMove:$,onDragEnd:g,clearSignal:y}){const{sections:w}=t,R=a.useRef(t);R.current=t;const[k,B]=a.useState(new Set),[X,A]=a.useState(!1),me=a.useRef(y);a.useEffect(()=>{y!==void 0&&y!==me.current&&(me.current=y,w.length>0&&A(!0))},[y,w.length]);const Pe=a.useRef(m);a.useEffect(()=>{m!==Pe.current&&(Pe.current=m,B(new Set))},[m]);const[I,ne]=a.useState(null),[he,z]=a.useState(!1),je=a.useRef(!1),Le=a.useCallback(f=>{const b=w.find(N=>N.id===f);b&&(je.current=!!b.note,ne(f),z(!1))},[w]),be=a.useCallback(()=>{I&&(z(!0),re(()=>{ne(null),z(!1)},150))},[I]),_e=a.useCallback(f=>{I&&(n({...t,sections:w.map(b=>b.id===I?{...b,note:f.trim()||void 0}:b)}),be())},[I,w,t,n,be]);a.useEffect(()=>{i&&I&&be()},[i]);const[Fe,Ue]=a.useState(new Set),pe=a.useRef(new Map),[$e,J]=a.useState(null),[it,P]=a.useState(null),[ue,Ae]=a.useState([]),[Je,yt]=a.useState(0),gt=a.useRef(null),Gt=a.useRef(new Set),Lt=a.useRef(new Map),[Kt,Tt]=a.useState(new Map),[Xt,Jt]=a.useState(new Map),Zt=a.useRef(new Set),Nt=a.useRef(new Map),Ze=a.useRef(p);Ze.current=p;const bt=a.useRef($);bt.current=$;const ft=a.useRef(g);ft.current=g,a.useEffect(()=>{r&&B(new Set)},[r]);const[en,Qt]=a.useState(()=>!t.sections.some(f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1||Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1}));a.useEffect(()=>{if(!en){const f=re(()=>Qt(!0),380);return()=>clearTimeout(f)}},[]);const tn=a.useRef(new Set);a.useEffect(()=>{tn.current=new Set(w.map(f=>f.selector))},[w]),a.useEffect(()=>{const f=()=>yt(window.scrollY);return f(),window.addEventListener("scroll",f,{passive:!0}),window.addEventListener("resize",f,{passive:!0}),()=>{window.removeEventListener("scroll",f),window.removeEventListener("resize",f)}},[]),a.useEffect(()=>{const f=b=>{if(gt.current){J(null);return}const N=document.elementFromPoint(b.clientX,b.clientY);if(!N){J(null);return}if(N.closest("[data-feedback-toolbar]")){J(null);return}if(N.closest("[data-design-placement]")){J(null);return}if(N.closest("[data-annotation-popup]")){J(null);return}const L=ur(N);if(!L){J(null);return}for(const V of tn.current)try{const D=document.querySelector(V);if(D&&(D===L||L.contains(D))){J(null);return}}catch{}const K=L.getBoundingClientRect();J({x:K.x,y:K.y,w:K.width,h:K.height})};return document.addEventListener("mousemove",f,{passive:!0}),()=>document.removeEventListener("mousemove",f)},[w]),a.useEffect(()=>{const f=document.body.style.userSelect;return document.body.style.userSelect="none",()=>{document.body.style.userSelect=f}},[]),a.useEffect(()=>{const f=b=>{var D,Me,fe,Be;if(gt.current||b.button!==0)return;const N=b.target;if(!N||N.closest("[data-feedback-toolbar]")||N.closest("[data-design-placement]")||N.closest("[data-annotation-popup]"))return;const L=ur(N);let K=!1;if(L)for(const ie of tn.current)try{const Q=document.querySelector(ie);if(Q&&(Q===L||L.contains(Q))){K=!0;break}}catch{}const V=!!(b.shiftKey||b.metaKey||b.ctrlKey);if(L&&!K){b.preventDefault(),b.stopPropagation();const ie=Qa(L),Q=[...w,ie],Te=[...t.originalOrder,ie.id];n({...t,sections:Q,originalOrder:Te});const He=new Set([ie.id]);B(He),(D=Ze.current)==null||D.call(Ze,He,V),J(null);const lt=b.clientX,Y=b.clientY,De={x:ie.currentRect.x,y:ie.currentRect.y};ie.originalRect;let Ce=!1,ve=0,at=0;gt.current="move";const se=ut=>{var Et;const kt=ut.clientX-lt,wt=ut.clientY-Y;if(!Ce&&(Math.abs(kt)>2||Math.abs(wt)>2)&&(Ce=!0),!Ce)return;const wn={x:De.x+kt,y:De.y+wt,width:ie.currentRect.width,height:ie.currentRect.height},qt=_r(wn,Q,new Set([ie.id]),d);Ae(qt.guides);const Mt=kt+qt.dx,nt=wt+qt.dy;ve=Mt,at=nt;const Dt=document.querySelector(`[data-rearrange-section="${ie.id}"]`);Dt&&(Dt.style.transform=`translate(${Mt}px, ${nt}px)`),Tt(new Map([[ie.id,{x:De.x+Mt,y:De.y+nt,width:ie.currentRect.width,height:ie.currentRect.height}]])),(Et=bt.current)==null||Et.call(bt,Mt,nt)},We=()=>{var kt;window.removeEventListener("mousemove",se),window.removeEventListener("mouseup",We),gt.current=null,Ae([]),Tt(new Map);const ut=document.querySelector(`[data-rearrange-section="${ie.id}"]`);ut&&(ut.style.transform=""),Ce&&n({...t,sections:Q.map(wt=>wt.id===ie.id?{...wt,currentRect:{...wt.currentRect,x:Math.max(0,De.x+ve),y:Math.max(0,De.y+at)}}:wt),originalOrder:Te}),(kt=ft.current)==null||kt.call(ft,ve,at,Ce)};window.addEventListener("mousemove",se),window.addEventListener("mouseup",We)}else if(K&&L){b.preventDefault();for(const ie of w)try{const Q=document.querySelector(ie.selector);if(Q&&Q===L){const Te=new Set([ie.id]);B(Te),(Me=Ze.current)==null||Me.call(Ze,Te,V);return}}catch{}V||(B(new Set),(fe=Ze.current)==null||fe.call(Ze,new Set,!1))}else V||(B(new Set),(Be=Ze.current)==null||Be.call(Ze,new Set,!1))};return document.addEventListener("mousedown",f,!0),()=>document.removeEventListener("mousedown",f,!0)},[w,t,n]),a.useEffect(()=>{const f=b=>{const N=b.target;if(!(N.tagName==="INPUT"||N.tagName==="TEXTAREA"||N.isContentEditable)){if((b.key==="Backspace"||b.key==="Delete")&&k.size>0){b.preventDefault();const L=new Set(k);Ue(K=>{const V=new Set(K);for(const D of L)V.add(D);return V}),B(new Set),re(()=>{const K=R.current;n({...K,sections:K.sections.filter(V=>!L.has(V.id)),originalOrder:K.originalOrder.filter(V=>!L.has(V))}),Ue(V=>{const D=new Set(V);for(const Me of L)D.delete(Me);return D})},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(b.key)&&k.size>0){b.preventDefault();const L=b.shiftKey?20:1,K=b.key==="ArrowLeft"?-L:b.key==="ArrowRight"?L:0,V=b.key==="ArrowUp"?-L:b.key==="ArrowDown"?L:0;n({...t,sections:w.map(D=>k.has(D.id)?{...D,currentRect:{...D.currentRect,x:Math.max(0,D.currentRect.x+K),y:Math.max(0,D.currentRect.y+V)}}:D)});return}b.key==="Escape"&&k.size>0&&B(new Set)}};return document.addEventListener("keydown",f),()=>document.removeEventListener("keydown",f)},[k,w,t,n]);const S=a.useCallback((f,b)=>{var lt;if(f.button!==0)return;const N=f.target;if(N.closest(`.${C.handle}`)||N.closest(`.${C.deleteButton}`))return;f.preventDefault(),f.stopPropagation();let L;f.shiftKey||f.metaKey||f.ctrlKey?(L=new Set(k),L.has(b)?L.delete(b):L.add(b)):k.has(b)?L=new Set(k):L=new Set([b]),B(L),(L.size!==k.size||[...L].some(Y=>!k.has(Y)))&&((lt=Ze.current)==null||lt.call(Ze,L,!!(f.shiftKey||f.metaKey||f.ctrlKey)));const V=f.clientX,D=f.clientY,Me=new Map;for(const Y of w)L.has(Y.id)&&Me.set(Y.id,{x:Y.currentRect.x,y:Y.currentRect.y});gt.current="move";let fe=!1,Be=0,ie=0;const Q=new Map;for(const Y of w)if(L.has(Y.id)){const De=document.querySelector(`[data-rearrange-section="${Y.id}"]`);Q.set(Y.id,{outlineEl:De,curW:Y.currentRect.width,curH:Y.currentRect.height})}const Te=Y=>{var qt;const De=Y.clientX-V,Ce=Y.clientY-D;if(De===0&&Ce===0)return;fe=!0;let ve=1/0,at=1/0,se=-1/0,We=-1/0;for(const[Mt,{curW:nt,curH:Dt}]of Q){const Et=Me.get(Mt);if(!Et)continue;const vn=Et.x+De,F=Et.y+Ce;ve=Math.min(ve,vn),at=Math.min(at,F),se=Math.max(se,vn+nt),We=Math.max(We,F+Dt)}const ut=_r({x:ve,y:at,width:se-ve,height:We-at},w,L,d),kt=De+ut.dx,wt=Ce+ut.dy;Be=kt,ie=wt,Ae(ut.guides);for(const[,{outlineEl:Mt}]of Q)Mt&&(Mt.style.transform=`translate(${kt}px, ${wt}px)`);const wn=new Map;for(const[Mt,{curW:nt,curH:Dt}]of Q){const Et=Me.get(Mt);if(Et){const vn={x:Math.max(0,Et.x+kt),y:Math.max(0,Et.y+wt),width:nt,height:Dt};wn.set(Mt,vn)}}Tt(wn),(qt=bt.current)==null||qt.call(bt,kt,wt)},He=Y=>{var De,Ce;window.removeEventListener("mousemove",Te),window.removeEventListener("mouseup",He),gt.current=null,Ae([]),Tt(new Map);for(const[,{outlineEl:ve}]of Q)ve&&(ve.style.transform="");if(fe){const ve=Y.clientX-V,at=Y.clientY-D;if(Math.abs(ve)<5&&Math.abs(at)<5)n({...t,sections:w.map(se=>{const We=Me.get(se.id);return We?{...se,currentRect:{...se.currentRect,x:We.x,y:We.y}}:se})});else{n({...t,sections:w.map(se=>{const We=Me.get(se.id);return We?{...se,currentRect:{...se.currentRect,x:Math.max(0,We.x+Be),y:Math.max(0,We.y+ie)}}:se})}),(De=ft.current)==null||De.call(ft,Be,ie,!0);return}}(Ce=ft.current)==null||Ce.call(ft,0,0,!1)};window.addEventListener("mousemove",Te),window.addEventListener("mouseup",He)},[k,w,t,n]),Z=a.useCallback((f,b,N)=>{f.preventDefault(),f.stopPropagation();const L=w.find(Te=>Te.id===b);if(!L)return;B(new Set([b])),gt.current="resize";const K=f.clientX,V=f.clientY,D={...L.currentRect};L.originalRect;const Me=D.width/D.height;let fe={...D};const Be=document.querySelector(`[data-rearrange-section="${b}"]`),ie=Te=>{const He=Te.clientX-K,lt=Te.clientY-V;let Y=D.x,De=D.y,Ce=D.width,ve=D.height;if(N.includes("e")&&(Ce=Math.max(vs,D.width+He)),N.includes("w")&&(Ce=Math.max(vs,D.width-He),Y=D.x+D.width-Ce),N.includes("s")&&(ve=Math.max(vs,D.height+lt)),N.includes("n")&&(ve=Math.max(vs,D.height-lt),De=D.y+D.height-ve),Te.shiftKey)if(N.length===2){const se=Math.abs(Ce-D.width),We=Math.abs(ve-D.height);se>We?ve=Ce/Me:Ce=ve*Me,N.includes("w")&&(Y=D.x+D.width-Ce),N.includes("n")&&(De=D.y+D.height-ve)}else N==="e"||N==="w"?ve=Ce/Me:Ce=ve*Me,N==="w"&&(Y=D.x+D.width-Ce),N==="n"&&(De=D.y+D.height-ve);fe={x:Y,y:De,width:Ce,height:ve},Be&&(Be.style.left=`${Y}px`,Be.style.top=`${De-Je}px`,Be.style.width=`${Ce}px`,Be.style.height=`${ve}px`),P({x:Te.clientX+12,y:Te.clientY+12,text:`${Math.round(Ce)} × ${Math.round(ve)}`}),Tt(new Map([[b,fe]]))},Q=()=>{window.removeEventListener("mousemove",ie),window.removeEventListener("mouseup",Q),P(null),gt.current=null,Tt(new Map),n({...t,sections:w.map(Te=>Te.id===b?{...Te,currentRect:fe}:Te)})};window.addEventListener("mousemove",ie),window.addEventListener("mouseup",Q)},[w,t,n,Je]),xe=a.useCallback(f=>{Ue(b=>{const N=new Set(b);return N.add(f),N}),B(b=>{const N=new Set(b);return N.delete(f),N}),re(()=>{const b=R.current;n({...b,sections:b.sections.filter(N=>N.id!==f),originalOrder:b.originalOrder.filter(N=>N!==f)}),Ue(N=>{const L=new Set(N);return L.delete(f),L})},180)},[n]),ae=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1||Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1},Ee=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1},ke=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1};for(const f of w)Lt.current.has(f.id)||(Ee(f)?Lt.current.set(f.id,"move"):ke(f)&&Lt.current.set(f.id,"resize"));for(const f of Lt.current.keys())w.some(b=>b.id===f)||Lt.current.delete(f);const Re=w.filter(f=>{try{if(Fe.has(f.id)||k.has(f.id))return!0;const b=document.querySelector(f.selector);if(!b)return!1;const N=b.getBoundingClientRect(),L=f.originalRect;return Math.abs(N.width-L.width)+Math.abs(N.height-L.height)<200}catch{return!1}}),we=Re.filter(f=>ae(f)),ze=Re.filter(f=>!ae(f)),et=new Set(we.map(f=>f.id));for(const f of Gt.current)et.has(f)||Gt.current.delete(f);const ee=[...et].sort().join(",");for(const f of we)Nt.current.set(f.id,{currentRect:f.currentRect,originalRect:f.originalRect,isFixed:f.isFixed});return a.useEffect(()=>{const f=Zt.current;Zt.current=et;const b=new Map;for(const N of f)if(!et.has(N)){if(!w.some(K=>K.id===N))continue;const L=Nt.current.get(N);L&&(b.set(N,{orig:L.originalRect,target:L.currentRect,isFixed:L.isFixed}),Nt.current.delete(N))}if(b.size>0){Jt(L=>{const K=new Map(L);for(const[V,D]of b)K.set(V,D);return K});const N=re(()=>{Jt(L=>{const K=new Map(L);for(const V of b.keys())K.delete(V);return K})},250);return()=>clearTimeout(N)}},[ee,w]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`${C.rearrangeOverlay} ${s?"":C.light} ${i?C.overlayExiting:""}${o?` ${o}`:""}`,"data-feedback-toolbar":!0,children:[$e&&e.jsx("div",{className:C.hoverHighlight,style:{left:$e.x,top:$e.y,width:$e.w,height:$e.h}}),ze.map(f=>{const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=ar,K=k.has(f.id);return e.jsxs("div",{"data-rearrange-section":f.id,className:`${C.sectionOutline} ${K?C.selected:""} ${X||i||Fe.has(f.id)?C.exiting:""}`,style:{left:b.x,top:N,width:b.width,height:b.height,borderColor:L.border,backgroundColor:L.bg,...en?{}:{opacity:0,animation:"none",transition:"none"}},onMouseDown:V=>S(V,f.id),onDoubleClick:()=>Le(f.id),children:[e.jsx("span",{className:C.sectionLabel,style:{backgroundColor:L.pill},children:f.label}),e.jsx("span",{className:`${C.sectionAnnotation} ${f.note?C.annotationVisible:""}`,children:(f.note&&pe.current.set(f.id,f.note),f.note||pe.current.get(f.id)||"")}),e.jsxs("span",{className:C.sectionDimensions,children:[Math.round(b.width)," × ",Math.round(b.height)]}),e.jsx("div",{className:C.deleteButton,onMouseDown:V=>V.stopPropagation(),onClick:()=>xe(f.id),children:"✕"}),cr.map(V=>e.jsx("div",{className:`${C.handle} ${C[`handle${V.charAt(0).toUpperCase()}${V.slice(1)}`]}`,onMouseDown:D=>Z(D,f.id,V)},V))]},f.id)}),we.map(f=>{const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=k.has(f.id),K=Ee(f),V=ke(f);if(r&&!L)return null;const Me=!Gt.current.has(f.id);return Me&&Gt.current.add(f.id),e.jsxs("div",{"data-rearrange-section":f.id,className:`${C.ghostOutline} ${L?C.selected:""} ${X||i||Fe.has(f.id)?C.exiting:""}`,style:{left:b.x,top:N,width:b.width,height:b.height,...en?{}:{opacity:0,animation:"none",transition:"none"},...Me?{}:{animation:"none"}},onMouseDown:fe=>S(fe,f.id),onDoubleClick:()=>Le(f.id),children:[e.jsx("span",{className:C.sectionLabel,style:{backgroundColor:ar.pill},children:f.label}),e.jsx("span",{className:`${C.sectionAnnotation} ${f.note?C.annotationVisible:""}`,children:(f.note&&pe.current.set(f.id,f.note),f.note||pe.current.get(f.id)||"")}),e.jsxs("span",{className:C.sectionDimensions,children:[Math.round(b.width)," × ",Math.round(b.height)]}),e.jsx("div",{className:C.deleteButton,onMouseDown:fe=>fe.stopPropagation(),onClick:()=>xe(f.id),children:"✕"}),cr.map(fe=>e.jsx("div",{className:`${C.handle} ${C[`handle${fe.charAt(0).toUpperCase()}${fe.slice(1)}`]}`,onMouseDown:Be=>Z(Be,f.id,fe)},fe)),e.jsx("span",{className:C.ghostBadge,children:(()=>{const fe=Lt.current.get(f.id);if(K&&V){const[Be,ie]=fe==="resize"?["Resize","Move"]:["Move","Resize"];return e.jsxs(e.Fragment,{children:["Suggested ",Be," ",e.jsxs("span",{className:C.ghostBadgeExtra,children:["& ",ie]})]})}return`Suggested ${V?"Resize":"Move"}`})()})]},f.id)})]}),!r&&(()=>{const f=[];for(const b of we){const N=Kt.get(b.id);f.push({id:b.id,orig:b.originalRect,target:N||b.currentRect,isFixed:b.isFixed,isSelected:k.has(b.id),isExiting:Fe.has(b.id)})}for(const[b,N]of Kt)if(!f.some(L=>L.id===b)){const L=w.find(K=>K.id===b);L&&f.push({id:b,orig:L.originalRect,target:N,isFixed:L.isFixed,isSelected:k.has(b)})}for(const[b,N]of Xt)f.some(L=>L.id===b)||f.push({id:b,orig:N.orig,target:N.target,isFixed:N.isFixed,isSelected:!1,isExiting:!0});return f.length===0?null:e.jsxs("svg",{className:`${C.connectorSvg} ${X||i?C.connectorExiting:""}`,children:[f.map(({id:b,orig:N,target:L,isFixed:K,isSelected:V,isExiting:D})=>{const Me=N.x+N.width/2,fe=(K?N.y:N.y-Je)+N.height/2,Be=L.x+L.width/2,ie=(K?L.y:L.y-Je)+L.height/2,Q=Be-Me,Te=ie-fe,He=Math.sqrt(Q*Q+Te*Te);if(He<2)return null;const lt=Math.min(1,He/40),Y=Math.min(He*.3,60),De=He>0?-Te/He:0,Ce=He>0?Q/He:0,ve=(Me+Be)/2+De*Y,at=(fe+ie)/2+Ce*Y,se=Kt.has(b),We=se||V?1:.4,ut=se||V?1:.5;return e.jsxs("g",{className:D?C.connectorExiting:"",children:[e.jsx("path",{className:C.connectorLine,d:`M ${Me} ${fe} Q ${ve} ${at} ${Be} ${ie}`,fill:"none",stroke:"rgba(59, 130, 246, 0.45)",strokeWidth:"1.5",opacity:We*lt}),e.jsx("circle",{className:C.connectorDot,cx:Me,cy:fe,r:4*lt,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:ut*lt,filter:"url(#connDotShadow)"}),e.jsx("circle",{className:C.connectorDot,cx:Be,cy:ie,r:4*lt,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:ut*lt,filter:"url(#connDotShadow)"})]},`conn-${b}`)}),e.jsx("defs",{children:e.jsx("filter",{id:"connDotShadow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:e.jsx("feDropShadow",{dx:"0",dy:"0.5",stdDeviation:"1",floodOpacity:"0.15"})})})]})})(),I&&(()=>{const f=w.find(ie=>ie.id===I);if(!f)return null;const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=b.x+b.width/2,K=N-8,V=N+b.height+8,D=K>200,Me=V<window.innerHeight-100,fe=Math.max(160,Math.min(window.innerWidth-160,L));let Be;return D?Be={left:fe,bottom:window.innerHeight-K}:Me?Be={left:fe,top:V}:Be={left:fe,top:Math.max(80,window.innerHeight/2-80)},e.jsx($s,{element:f.label,placeholder:"Add a note about this section",initialValue:f.note??"",submitLabel:je.current?"Save":"Set",onSubmit:_e,onCancel:be,onDelete:je.current?()=>{_e("")}:void 0,isExiting:he,lightMode:!s,style:Be})})(),it&&e.jsx("div",{className:C.sizeIndicator,style:{left:it.x,top:it.y},"data-feedback-toolbar":!0,children:it.text}),ue.map((f,b)=>e.jsx("div",{className:C.guideLine,style:f.axis==="x"?{position:"fixed",left:f.pos,top:0,width:1,height:"100vh"}:{position:"fixed",left:0,top:f.pos-Je,width:"100vw",height:1}},`${f.axis}-${f.pos}-${b}`))]})}var ho=new Set(["script","style","noscript","link","meta","br","hr"]);function Ga(){const t=document.querySelector("main")||document.body,n=[],s=Array.from(t.children),i=t!==document.body&&s.length<3?Array.from(document.body.children):s;for(const o of i){if(!(o instanceof HTMLElement)||ho.has(o.tagName.toLowerCase())||o.hasAttribute("data-feedback-toolbar"))continue;const r=window.getComputedStyle(o);if(r.display==="none"||r.visibility==="hidden")continue;const d=o.getBoundingClientRect();if(!(d.height<10||d.width<10)){n.push({label:Is(o),selector:bn(o),top:d.top,bottom:d.bottom,left:d.left,right:d.right,area:d.width*d.height});for(const p of Array.from(o.children)){if(!(p instanceof HTMLElement)||ho.has(p.tagName.toLowerCase())||p.hasAttribute("data-feedback-toolbar"))continue;const m=window.getComputedStyle(p);if(m.display==="none"||m.visibility==="hidden")continue;const $=p.getBoundingClientRect();$.height<10||$.width<10||n.push({label:Is(p),selector:bn(p),top:$.top,bottom:$.bottom,left:$.left,right:$.right,area:$.width*$.height})}}}return n}function Ka(t){const n=window.scrollY;return t.map(({label:s,selector:i,rect:o})=>{const r=o.y-n;return{label:s,selector:i,top:r,bottom:r+o.height,left:o.x,right:o.x+o.width,area:o.width*o.height}})}function Ja(t){const n=window.scrollY,s=t.y-n,i=t.x;return{top:s,bottom:s+t.height,left:i,right:i+t.width,area:t.width*t.height}}function mo(t,n){const s=n?Ka(n):Ga(),i=Ja(t);let o=null,r=null,d=null,p=null,m=null;for(const k of s){if(Math.abs(k.left-i.left)<2&&Math.abs(k.top-i.top)<2&&Math.abs(k.right-k.left-t.width)<2&&Math.abs(k.bottom-k.top-t.height)<2)continue;k.left<=i.left+2&&k.right>=i.right-2&&k.top<=i.top+2&&k.bottom>=i.bottom-2&&k.area>i.area*1.5&&(!m||k.area<m._area)&&(m={label:k.label,selector:k.selector,_area:k.area});const B=i.right>k.left+5&&i.left<k.right-5,X=i.bottom>k.top+5&&i.top<k.bottom-5;if(B&&k.bottom<=i.top+5){const A=Math.round(i.top-k.bottom);(!o||A<o._dist)&&(o={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(B&&k.top>=i.bottom-5){const A=Math.round(k.top-i.bottom);(!r||A<r._dist)&&(r={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(X&&k.right<=i.left+5){const A=Math.round(i.left-k.right);(!d||A<d._dist)&&(d={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(X&&k.left>=i.right-5){const A=Math.round(k.left-i.right);(!p||A<p._dist)&&(p={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}}const $=window.innerWidth,g=window.innerHeight,y=ec(t,$),w=k=>k?{label:k.label,selector:k.selector,gap:k.gap}:null,R=Za(i,t,$,g,m?{label:m.label,selector:m.selector,_area:m._area}:null,s);return{above:w(o),below:w(r),left:w(d),right:w(p),alignment:y,containedIn:m?{label:m.label,selector:m.selector}:null,outOfBounds:R}}function Za(t,n,s,i,o,r){const d={};let p=!1;const m=[];if(t.left<-2&&m.push("left"),t.right>s+2&&m.push("right"),t.top<-2&&m.push("top"),t.bottom>i+2&&m.push("bottom"),m.length>0&&(d.viewport=m,p=!0),o){const $=r.find(g=>g.label===o.label&&g.selector===o.selector&&Math.abs(g.area-o._area)<10);if($){const g=[];t.left<$.left-2&&g.push("left"),t.right>$.right+2&&g.push("right"),t.top<$.top-2&&g.push("top"),t.bottom>$.bottom+2&&g.push("bottom"),g.length>0&&(d.container={label:o.label,edges:g},p=!0)}}return p?d:null}function ec(t,n){if(t.width/n>.85)return"full-width";const i=t.x+t.width/2,o=n/2,r=i-o,d=n*.08;return Math.abs(r)<d?"center":r<0?"left":"right"}function Hr(t){switch(t){case"full-width":return"full-width";case"center":return"centered";case"left":return"left-aligned";case"right":return"right-aligned"}}function Yr(t,n={}){const s=[];t.above&&s.push(`Below \`${t.above.label}\`${t.above.gap>0?` (${t.above.gap}px gap)`:""}`),t.below&&s.push(`Above \`${t.below.label}\`${t.below.gap>0?` (${t.below.gap}px gap)`:""}`),n.includeLeftRight&&(t.left&&s.push(`Right of \`${t.left.label}\`${t.left.gap>0?` (${t.left.gap}px gap)`:""}`),t.right&&s.push(`Left of \`${t.right.label}\`${t.right.gap>0?` (${t.right.gap}px gap)`:""}`));const i=Hr(t.alignment);return t.containedIn?s.push(`${i.charAt(0).toUpperCase()+i.slice(1)} in \`${t.containedIn.label}\``):s.push(`${i.charAt(0).toUpperCase()+i.slice(1)} in page`),n.includePixelRef&&n.pixelRef&&s.push(`Pixel ref: \`${n.pixelRef}\``),t.outOfBounds&&(t.outOfBounds.viewport&&s.push(`**Outside viewport** (${t.outOfBounds.viewport.join(", ")} edge${t.outOfBounds.viewport.length>1?"s":""})`),t.outOfBounds.container&&s.push(`**Outside \`${t.outOfBounds.container.label}\`** (${t.outOfBounds.container.edges.join(", ")} edge${t.outOfBounds.container.edges.length>1?"s":""})`)),s}function tc(t,n,s){var r,d;const i=[];t.above&&i.push(`below \`${t.above.label}\``),t.below&&i.push(`above \`${t.below.label}\``),t.left&&i.push(`right of \`${t.left.label}\``),t.right&&i.push(`left of \`${t.right.label}\``),t.containedIn&&i.push(`inside \`${t.containedIn.label}\``),i.push(Hr(t.alignment)),(r=t.outOfBounds)!=null&&r.viewport&&i.push(`**outside viewport** (${t.outOfBounds.viewport.join(", ")})`),(d=t.outOfBounds)!=null&&d.container&&i.push(`**outside \`${t.outOfBounds.container.label}\`** (${t.outOfBounds.container.edges.join(", ")})`);const o=s?`, ${Math.round(s.width)}×${Math.round(s.height)}px`:"";return`at (${Math.round(n.x)}, ${Math.round(n.y)})${o}: ${i.join(", ")}`}var hr=15;function mr(t){if(t.length<2)return[];const n=[],s=new Set;for(let i=0;i<t.length;i++){if(s.has(i))continue;const o=[i];for(let r=i+1;r<t.length;r++)s.has(r)||Math.abs(t[i].rect.y-t[r].rect.y)<hr&&o.push(r);if(o.length>=2){const r=o.map(m=>t[m]);r.sort((m,$)=>m.rect.x-$.rect.x);const d=[];for(let m=0;m<r.length-1;m++)d.push(Math.round(r[m+1].rect.x-(r[m].rect.x+r[m].rect.width)));const p=Math.round(r.reduce((m,$)=>m+$.rect.y,0)/r.length);n.push({labels:r.map(m=>m.label),type:"row",sharedEdge:p,gaps:d,avgGap:d.length?Math.round(d.reduce((m,$)=>m+$,0)/d.length):0}),o.forEach(m=>s.add(m))}}for(let i=0;i<t.length;i++){if(s.has(i))continue;const o=[i];for(let r=i+1;r<t.length;r++)s.has(r)||Math.abs(t[i].rect.x-t[r].rect.x)<hr&&o.push(r);if(o.length>=2){const r=o.map(m=>t[m]);r.sort((m,$)=>m.rect.y-$.rect.y);const d=[];for(let m=0;m<r.length-1;m++)d.push(Math.round(r[m+1].rect.y-(r[m].rect.y+r[m].rect.height)));const p=Math.round(r.reduce((m,$)=>m+$.rect.x,0)/r.length);n.push({labels:r.map(m=>m.label),type:"column",sharedEdge:p,gaps:d,avgGap:d.length?Math.round(d.reduce((m,$)=>m+$,0)/d.length):0}),o.forEach(m=>s.add(m))}}return n}function nc(t){if(t.length<2)return[];const n=mr(t.map(d=>({label:d.label,rect:d.originalRect}))),s=mr(t.map(d=>({label:d.label,rect:d.currentRect}))),i=[],o=new Set;for(const d of n){const p=new Set(d.labels);let m=null,$=0;for(const g of s){const y=g.labels.filter(w=>p.has(w)).length;y>=2&&y>$&&(m=g,$=y)}if(m){const g=m.labels.filter(w=>p.has(w)),y=g.join(", ");if(m.type!==d.type){const w=d.type==="row"?"y":"x",R=m.type==="row"?"y":"x";i.push(`**${y}**: ${d.type} (${w}≈${d.sharedEdge}, ${d.avgGap}px gaps) → ${m.type} (${R}≈${m.sharedEdge}, ${m.avgGap}px gaps)`)}else if(Math.abs(d.sharedEdge-m.sharedEdge)>20||Math.abs(d.avgGap-m.avgGap)>5){const w=d.type==="row"?"y":"x",R=Math.abs(d.sharedEdge-m.sharedEdge)>20?` ${w}: ${d.sharedEdge} → ${m.sharedEdge}`:"",k=Math.abs(d.avgGap-m.avgGap)>5?` gaps: ${d.avgGap}px → ${m.avgGap}px`:"";i.push(`**${y}**: ${d.type} shifted —${R}${k}`)}g.forEach(w=>o.add(w))}else{const g=d.labels.join(", "),y=d.type==="row"?"y":"x";i.push(`**${g}**: ${d.type} (${y}≈${d.sharedEdge}) dissolved`),d.labels.forEach(w=>o.add(w))}}for(const d of s){if(d.labels.every($=>o.has($))||d.labels.filter($=>!o.has($)).length<2)continue;if(!n.some($=>$.labels.filter(y=>d.labels.includes(y)).length>=2)){const $=d.type==="row"?"y":"x";i.push(`**${d.labels.join(", ")}**: new ${d.type} (${$}≈${d.sharedEdge}, ${d.avgGap}px gaps)`),d.labels.forEach(g=>o.add(g))}}const r=t.filter(d=>!o.has(d.label));if(r.length>=2){const d={};for(const p of r){const m=Math.round(p.currentRect.x/5)*5;(d[m]??(d[m]=[])).push(p.label)}for(const[p,m]of Object.entries(d))m.length>=2&&i.push(`**${m.join(", ")}**: shared left edge at x≈${p}`)}return i}function Ur(t){if(typeof document>"u")return{viewport:t,contentArea:null};const n=[],s=new Set,i=p=>{s.has(p)||p instanceof HTMLElement&&(p.hasAttribute("data-feedback-toolbar")||ho.has(p.tagName.toLowerCase())||(s.add(p),n.push(p)))},o=document.querySelector("main");o&&i(o);const r=document.querySelector("[role='main']");r&&i(r);for(const p of Array.from(document.body.children))if(i(p),p.children){for(const m of Array.from(p.children))if(i(m),m.children)for(const $ of Array.from(m.children))i($)}let d=null;for(const p of n){const m=p.getBoundingClientRect();if(m.height<50)continue;const $=getComputedStyle(p);if($.maxWidth&&$.maxWidth!=="none"&&$.maxWidth!=="0px"){(!d||m.width<d.rect.width)&&(d={el:p,rect:m});continue}!d&&m.width<t.width-20&&m.width>100&&(d={el:p,rect:m})}if(d){const{el:p,rect:m}=d;return{viewport:t,contentArea:{width:Math.round(m.width),left:Math.round(m.left),right:Math.round(m.right),centerX:Math.round(m.left+m.width/2),selector:bn(p)}}}return{viewport:t,contentArea:null}}function sc(t){if(typeof document>"u")return null;const n=document.querySelector(t);if(!(n!=null&&n.parentElement))return null;const s=getComputedStyle(n.parentElement),i={parentDisplay:s.display,parentSelector:bn(n.parentElement)};return s.display.includes("flex")&&(i.flexDirection=s.flexDirection),s.display.includes("grid")&&s.gridTemplateColumns!=="none"&&(i.gridCols=s.gridTemplateColumns),s.gap&&s.gap!=="normal"&&s.gap!=="0px"&&(i.gap=s.gap),i}function Xr(t,n){const s=n.contentArea,i=s?s.width:n.viewport.width,o=s?s.left:0,r=s?s.centerX:Math.round(n.viewport.width/2),d=Math.round(t.x-o),p=Math.round(o+i-(t.x+t.width)),m=(t.width/i*100).toFixed(1),$=t.x+t.width/2,g=Math.abs($-r)<20,y=t.width/i>.95,w=[];return y?w.push("`width: 100%` of container"):w.push(`left \`${d}px\` in container, right \`${p}px\`, width \`${m}%\` (\`${Math.round(t.width)}px\`)`),g&&!y&&w.push("centered — `margin-inline: auto`"),w.join(" — ")}function Qr(t){const{viewport:n,contentArea:s}=t;let i=`### Reference Frame
`;if(i+=`- Viewport: \`${n.width}×${n.height}px\`
`,s){const o=s;i+=`- Content area: \`${o.width}px\` wide, left edge at \`x=${o.left}\`, right at \`x=${o.right}\` (\`${o.selector}\`)
`,i+=`- Pixel → CSS translation:
`,i+=`  - **Horizontal position in container**: \`element.x - ${o.left}\` → use as \`margin-left\` or \`left\`
`,i+=`  - **Width as % of container**: \`element.width / ${o.width} × 100\` → use as \`width: X%\`
`,i+="  - **Vertical gap between elements**: `nextElement.y - (prevElement.y + prevElement.height)` → use as `margin-top` or `gap`\n",i+=`  - **Centered**: if \`|element.centerX - ${o.centerX}| < 20px\` → use \`margin-inline: auto\`
`}else i+=`- No distinct content container — elements positioned relative to full viewport
`,i+=`- Pixel → CSS translation:
`,i+=`  - **Width as % of viewport**: \`element.width / ${n.width} × 100\` → use as \`width: X%\`
`,i+=`  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(n.width/2)}| < 20px\` → use \`margin-inline: auto\`
`;return i+=`
`,i}function oc(t){const n=sc(t);if(!n)return null;let s=`\`${n.parentDisplay}\``;return n.flexDirection&&(s+=`, flex-direction: \`${n.flexDirection}\``),n.gridCols&&(s+=`, grid-template-columns: \`${n.gridCols}\``),n.gap&&(s+=`, gap: \`${n.gap}\``),`Parent: ${s} (\`${n.parentSelector}\`)`}function pr(t,n,s,i="standard"){var X,A,me,Pe;if(t.length===0)return"";const o=[...t].sort((I,ne)=>Math.abs(I.y-ne.y)<20?I.x-ne.x:I.y-ne.y);let r="";if(s!=null&&s.blankCanvas?(r+=`## Wireframe: New Page

`,s.wireframePurpose&&(r+=`> **Purpose:** ${s.wireframePurpose}
>
`),r+=`> ${t.length} component${t.length!==1?"s":""} placed — this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`):r+=`## Design Layout

> ${t.length} component${t.length!==1?"s":""} placed

`,i==="compact")return r+=`### Components
`,o.forEach((I,ne)=>{var z;const he=((z=Wt[I.type])==null?void 0:z.label)||I.type;r+=`${ne+1}. **${he}** — \`${Math.round(I.width)}×${Math.round(I.height)}px\` at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`}),r;const d=Ur(n);r+=Qr(d),r+=`### Components
`,o.forEach((I,ne)=>{var Fe;const he=((Fe=Wt[I.type])==null?void 0:Fe.label)||I.type,z={x:I.x,y:I.y,width:I.width,height:I.height};r+=`${ne+1}. **${he}** — \`${Math.round(I.width)}×${Math.round(I.height)}px\` at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`;const je=mo(z),be=Yr(je,{includeLeftRight:i==="detailed"||i==="forensic"});for(const Ue of be)r+=`   - ${Ue}
`;const _e=Xr(z,d);_e&&(r+=`   - CSS: ${_e}
`)}),r+=`
### Layout Analysis
`;const p=[];for(const I of o){const ne=p.find(he=>Math.abs(he.y-I.y)<30);ne?ne.items.push(I):p.push({y:I.y,items:[I]})}if(p.sort((I,ne)=>I.y-ne.y),p.forEach((I,ne)=>{I.items.sort((z,je)=>z.x-je.x);const he=I.items.map(z=>{var je;return((je=Wt[z.type])==null?void 0:je.label)||z.type});if(I.items.length===1){const je=I.items[0].width>n.width*.8;r+=`- Row ${ne+1} (y≈${Math.round(I.y)}): ${he[0]}${je?" — full width":""}
`}else r+=`- Row ${ne+1} (y≈${Math.round(I.y)}): ${he.join(" | ")} — ${I.items.length} items side by side
`}),i==="detailed"||i==="forensic"){r+=`
### Spacing & Gaps
`;for(let I=0;I<o.length-1;I++){const ne=o[I],he=o[I+1],z=((X=Wt[ne.type])==null?void 0:X.label)||ne.type,je=((A=Wt[he.type])==null?void 0:A.label)||he.type,Le=Math.round(he.y-(ne.y+ne.height)),be=Math.round(he.x-(ne.x+ne.width));Math.abs(ne.y-he.y)<30?r+=`- ${z} → ${je}: \`${be}px\` horizontal gap
`:r+=`- ${z} → ${je}: \`${Le}px\` vertical gap
`}if(i==="forensic"&&o.length>2){r+=`
### All Pairwise Gaps
`;for(let I=0;I<o.length;I++)for(let ne=I+1;ne<o.length;ne++){const he=o[I],z=o[ne],je=((me=Wt[he.type])==null?void 0:me.label)||he.type,Le=((Pe=Wt[z.type])==null?void 0:Pe.label)||z.type,be=Math.round(z.y-(he.y+he.height)),_e=Math.round(z.x-(he.x+he.width));r+=`- ${je} ↔ ${Le}: h=\`${_e}px\` v=\`${be}px\`
`}}i==="forensic"&&(r+=`
### Z-Order (placement order)
`,t.forEach((I,ne)=>{var z;const he=((z=Wt[I.type])==null?void 0:z.label)||I.type;r+=`${ne}. ${he} at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`}))}r+=`
### Suggested Implementation
`;const m=o.some(I=>I.type==="navigation"),$=o.some(I=>I.type==="hero"),g=o.some(I=>I.type==="sidebar"),y=o.some(I=>I.type==="footer"),w=o.filter(I=>I.type==="card"),R=o.filter(I=>I.type==="form"),k=o.filter(I=>I.type==="table"),B=o.filter(I=>I.type==="modal");if(m&&(r+=`- Top navigation bar with logo + nav links + CTA
`),$&&(r+=`- Hero section with heading, subtext, and call-to-action
`),g&&(r+=`- Sidebar layout — use CSS Grid with sidebar + main content area
`),w.length>1?r+=`- ${w.length}-column card grid — use CSS Grid or Flexbox
`:w.length===1&&(r+=`- Card component with image + content area
`),R.length>0&&(r+=`- ${R.length} form${R.length>1?"s":""} — add proper labels, validation, and submit handling
`),k.length>0&&(r+=`- Data table — consider sortable columns and pagination
`),B.length>0&&(r+=`- Modal dialog — add overlay backdrop and focus trapping
`),y&&(r+=`- Multi-column footer with links
`),i==="detailed"||i==="forensic"){if(r+=`
### CSS Suggestions
`,g){const I=o.find(ne=>ne.type==="sidebar");r+=`- \`display: grid; grid-template-columns: ${Math.round(I.width)}px 1fr;\`
`}if(w.length>1){const I=Math.round(w[0].width);r+=`- \`display: grid; grid-template-columns: repeat(${w.length}, ${I}px); gap: 16px;\`
`}m&&(r+="- Navigation: `position: sticky; top: 0; z-index: 50;`\n")}return r}function xr(t,n="standard",s){const{sections:i}=t,o=[];for(const g of i){const y=g.originalRect,w=g.currentRect,R=Math.abs(y.x-w.x)>1||Math.abs(y.y-w.y)>1,k=Math.abs(y.width-w.width)>1||Math.abs(y.height-w.height)>1;if(!R&&!k){n==="forensic"&&o.push({section:g,posMoved:!1,sizeChanged:!1});continue}o.push({section:g,posMoved:R,sizeChanged:k})}if(o.length===0||n!=="forensic"&&o.every(g=>!g.posMoved&&!g.sizeChanged))return"";let r=`## Suggested Layout Changes

`;const d=s?s.width:typeof window<"u"?window.innerWidth:0,p=s?s.height:typeof window<"u"?window.innerHeight:0,m=Ur({width:d,height:p});n!=="compact"&&(r+=Qr(m)),n==="forensic"&&(r+=`> Detected at: \`${new Date(t.detectedAt).toISOString()}\`
`,r+=`> Total sections: ${i.length}

`);const $=g=>i.map(y=>({label:y.label,selector:y.selector,rect:g==="original"?y.originalRect:y.currentRect}));r+=`**Changes:**
`;for(const{section:g,posMoved:y,sizeChanged:w}of o){const R=g.originalRect,k=g.currentRect;if(!y&&!w){r+=`- ${g.label} — unchanged at (${Math.round(k.x)}, ${Math.round(k.y)}) ${Math.round(k.width)}×${Math.round(k.height)}px
`;continue}if(n==="compact"){y&&w?r+=`- Suggested: move **${g.label}** to (${Math.round(k.x)}, ${Math.round(k.y)}) ${Math.round(k.width)}×${Math.round(k.height)}px
`:y?r+=`- Suggested: move **${g.label}** to (${Math.round(k.x)}, ${Math.round(k.y)})
`:r+=`- Suggested: resize **${g.label}** to ${Math.round(k.width)}×${Math.round(k.height)}px
`;continue}if(y&&w?r+=`- Suggested: move and resize **${g.label}**
`:y?r+=`- Suggested: move **${g.label}**
`:r+=`- Suggested: resize **${g.label}** from ${Math.round(R.width)}×${Math.round(R.height)}px to ${Math.round(k.width)}×${Math.round(k.height)}px
`,y){const X=mo(R,$("original")),A=mo(k,$("current")),me=w?{width:R.width,height:R.height}:void 0;r+=`  - Currently ${tc(X,{x:R.x,y:R.y},me)}
`;const Pe=w?{width:k.width,height:k.height}:void 0,I=`at (${Math.round(k.x)}, ${Math.round(k.y)})`,ne=Pe?`, ${Math.round(Pe.width)}×${Math.round(Pe.height)}px`:"",z=Yr(A,{includeLeftRight:n==="detailed"||n==="forensic"});if(z.length>0){r+=`  - Suggested position ${I}${ne}: ${z[0]}
`;for(let Le=1;Le<z.length;Le++)r+=`    ${z[Le]}
`}else r+=`  - Suggested position ${I}${ne}
`;const je=Xr(k,m);je&&(r+=`  - CSS: ${je}
`)}const B=oc(g.selector);if(B&&(r+=`  - ${B}
`),r+=`  - Selector: \`${g.selector}\`
`,n==="detailed"||n==="forensic"){const X=g.className?`${g.tagName}.${g.className.split(" ")[0]}`:g.tagName;X!==g.selector&&(r+=`  - Element: \`${X}\`
`),g.role&&(r+=`  - Role: \`${g.role}\`
`),n==="forensic"&&g.textSnippet&&(r+=`  - Text: "${g.textSnippet}"
`)}n==="forensic"&&(r+=`  - Original rect: \`{ x: ${Math.round(R.x)}, y: ${Math.round(R.y)}, w: ${Math.round(R.width)}, h: ${Math.round(R.height)} }\`
`,r+=`  - Current rect: \`{ x: ${Math.round(k.x)}, y: ${Math.round(k.y)}, w: ${Math.round(k.width)}, h: ${Math.round(k.height)} }\`
`)}if(n!=="compact"){const g=o.filter(w=>w.posMoved).map(w=>({label:w.section.label,originalRect:w.section.originalRect,currentRect:w.section.currentRect})),y=nc(g);if(y.length>0){r+=`
### Layout Summary
`;for(const w of y)r+=`- ${w}
`}}if(n!=="compact"&&i.length>1){r+=`
### All Sections (current positions)
`;const g=[...i].sort((y,w)=>Math.abs(y.currentRect.y-w.currentRect.y)<20?y.currentRect.x-w.currentRect.x:y.currentRect.y-w.currentRect.y);for(const y of g){const w=y.currentRect,R=Math.abs(w.x-y.originalRect.x)>1||Math.abs(w.y-y.originalRect.y)>1||Math.abs(w.width-y.originalRect.width)>1||Math.abs(w.height-y.originalRect.height)>1;r+=`- ${y.label}: \`${Math.round(w.width)}×${Math.round(w.height)}px\` at \`(${Math.round(w.x)}, ${Math.round(w.y)})\`${R?" ← suggested":""}
`}}return r}var po="feedback-annotations-",qr=7;function Ls(t){return`${po}${t}`}function eo(t){if(typeof window>"u")return[];try{const n=localStorage.getItem(Ls(t));if(!n)return[];const s=JSON.parse(n),i=Date.now()-qr*24*60*60*1e3;return s.filter(o=>!o.timestamp||o.timestamp>i)}catch{return[]}}function Vr(t,n){if(!(typeof window>"u"))try{localStorage.setItem(Ls(t),JSON.stringify(n))}catch{}}function rc(){const t=new Map;if(typeof window>"u")return t;try{const n=Date.now()-qr*24*60*60*1e3;for(let s=0;s<localStorage.length;s++){const i=localStorage.key(s);if(i!=null&&i.startsWith(po)){const o=i.slice(po.length),r=localStorage.getItem(i);if(r){const p=JSON.parse(r).filter(m=>!m.timestamp||m.timestamp>n);p.length>0&&t.set(o,p)}}}}catch{}return t}function Jn(t,n,s){const i=n.map(o=>({...o,_syncedTo:s}));Vr(t,i)}var yo="agentation-design-";function ic(t){if(typeof window>"u")return[];try{const n=localStorage.getItem(`${yo}${t}`);return n?JSON.parse(n):[]}catch{return[]}}function lc(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${yo}${t}`,JSON.stringify(n))}catch{}}function ac(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${yo}${t}`)}catch{}}var bo="agentation-rearrange-";function cc(t){if(typeof window>"u")return null;try{const n=localStorage.getItem(`${bo}${t}`);return n?JSON.parse(n):null}catch{return null}}function dc(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${bo}${t}`,JSON.stringify(n))}catch{}}function _c(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${bo}${t}`)}catch{}}var wo="agentation-wireframe-";function uc(t){if(typeof window>"u")return null;try{const n=localStorage.getItem(`${wo}${t}`);return n?JSON.parse(n):null}catch{return null}}function gr(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${wo}${t}`,JSON.stringify(n))}catch{}}function js(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${wo}${t}`)}catch{}}var Gr="agentation-session-";function vo(t){return`${Gr}${t}`}function hc(t){if(typeof window>"u")return null;try{return localStorage.getItem(vo(t))}catch{return null}}function to(t,n){if(!(typeof window>"u"))try{localStorage.setItem(vo(t),n)}catch{}}function mc(t){if(!(typeof window>"u"))try{localStorage.removeItem(vo(t))}catch{}}var Kr=`${Gr}toolbar-hidden`;function pc(){if(typeof window>"u")return!1;try{return sessionStorage.getItem(Kr)==="1"}catch{return!1}}function xc(t){if(!(typeof window>"u"))try{t&&sessionStorage.setItem(Kr,"1")}catch{}}async function no(t,n){const s=await fetch(`${t}/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:n})});if(!s.ok)throw new Error(`Failed to create session: ${s.status}`);return s.json()}async function fr(t,n){const s=await fetch(`${t}/sessions/${n}`);if(!s.ok)throw new Error(`Failed to get session: ${s.status}`);return s.json()}async function Ln(t,n,s){const i=await fetch(`${t}/sessions/${n}/annotations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok)throw new Error(`Failed to sync annotation: ${i.status}`);return i.json()}async function yr(t,n,s){const i=await fetch(`${t}/annotations/${n}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!i.ok)throw new Error(`Failed to update annotation: ${i.status}`);return i.json()}async function rn(t,n){const s=await fetch(`${t}/annotations/${n}`,{method:"DELETE"});if(!s.ok)throw new Error(`Failed to delete annotation: ${s.status}`)}var Ye={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16,IncompleteClassComponent:17,DehydratedFragment:18,SuspenseListComponent:19,ScopeComponent:21,OffscreenComponent:22,LegacyHiddenComponent:23,CacheComponent:24,TracingMarkerComponent:25,HostHoistable:26,HostSingleton:27,IncompleteFunctionComponent:28,Throw:29,ViewTransitionComponent:30,ActivityComponent:31},br=new Set(["Component","PureComponent","Fragment","Suspense","Profiler","StrictMode","Routes","Route","Outlet","Root","ErrorBoundaryHandler","HotReload","Hot"]),wr=[/Boundary$/,/BoundaryHandler$/,/Provider$/,/Consumer$/,/^(Inner|Outer)/,/Router$/,/^Client(Page|Segment|Root)/,/^Segment(ViewNode|Node)$/,/^LayoutSegment/,/^Server(Root|Component|Render)/,/^RSC/,/Context$/,/^Hot(Reload)?$/,/^(Dev|React)(Overlay|Tools|Root)/,/Overlay$/,/Handler$/,/^With[A-Z]/,/Wrapper$/,/^Root$/],gc=[/Page$/,/View$/,/Screen$/,/Section$/,/Card$/,/List$/,/Item$/,/Form$/,/Modal$/,/Dialog$/,/Button$/,/Nav$/,/Header$/,/Footer$/,/Layout$/,/Panel$/,/Tab$/,/Menu$/];function fc(t){const n=(t==null?void 0:t.mode)??"filtered";let s=br;if(t!=null&&t.skipExact){const i=t.skipExact instanceof Set?t.skipExact:new Set(t.skipExact);s=new Set([...br,...i])}return{maxComponents:(t==null?void 0:t.maxComponents)??6,maxDepth:(t==null?void 0:t.maxDepth)??30,mode:n,skipExact:s,skipPatterns:t!=null&&t.skipPatterns?[...wr,...t.skipPatterns]:wr,userPatterns:(t==null?void 0:t.userPatterns)??gc,filter:t==null?void 0:t.filter}}function yc(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").toLowerCase()}function bc(t,n=10){const s=new Set;let i=t,o=0;for(;i&&o<n;)i.className&&typeof i.className=="string"&&i.className.split(/\s+/).forEach(r=>{if(r.length>1){const d=r.replace(/[_][a-zA-Z0-9]{5,}.*$/,"").toLowerCase();d.length>1&&s.add(d)}}),i=i.parentElement,o++;return s}function wc(t,n){const s=yc(t);for(const i of n){if(i===s)return!0;const o=s.split("-").filter(d=>d.length>2),r=i.split("-").filter(d=>d.length>2);for(const d of o)for(const p of r)if(d===p||d.includes(p)||p.includes(d))return!0}return!1}function vc(t,n,s,i){if(s.filter)return s.filter(t,n);switch(s.mode){case"all":return!0;case"filtered":return!(s.skipExact.has(t)||s.skipPatterns.some(o=>o.test(t)));case"smart":return s.skipExact.has(t)||s.skipPatterns.some(o=>o.test(t))?!1:!!(i&&wc(t,i)||s.userPatterns.some(o=>o.test(t)));default:return!0}}var En=null,kc=new WeakMap;function so(t){return Object.keys(t).some(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactProps$"))}function jc(){if(En!==null)return En;if(typeof document>"u")return!1;if(document.body&&so(document.body))return En=!0,!0;const t=["#root","#app","#__next","[data-reactroot]"];for(const n of t){const s=document.querySelector(n);if(s&&so(s))return En=!0,!0}if(document.body){for(const n of document.body.children)if(so(n))return En=!0,!0}return En=!1,!1}var Zn={map:kc};function Cc(t){return Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"))||null}function Sc(t){const n=Cc(t);return n?t[n]:null}function pn(t){return t?t.displayName?t.displayName:t.name?t.name:null:null}function Nc(t){var o;const{tag:n,type:s,elementType:i}=t;if(n===Ye.HostComponent||n===Ye.HostText||n===Ye.HostHoistable||n===Ye.HostSingleton||n===Ye.Fragment||n===Ye.Mode||n===Ye.Profiler||n===Ye.DehydratedFragment||n===Ye.HostRoot||n===Ye.HostPortal||n===Ye.ScopeComponent||n===Ye.OffscreenComponent||n===Ye.LegacyHiddenComponent||n===Ye.CacheComponent||n===Ye.TracingMarkerComponent||n===Ye.Throw||n===Ye.ViewTransitionComponent||n===Ye.ActivityComponent)return null;if(n===Ye.ForwardRef){const r=i;if(r!=null&&r.render){const d=pn(r.render);if(d)return d}return r!=null&&r.displayName?r.displayName:pn(s)}if(n===Ye.MemoComponent||n===Ye.SimpleMemoComponent){const r=i;if(r!=null&&r.type){const d=pn(r.type);if(d)return d}return r!=null&&r.displayName?r.displayName:pn(s)}if(n===Ye.ContextProvider){const r=s;return(o=r==null?void 0:r._context)!=null&&o.displayName?`${r._context.displayName}.Provider`:null}if(n===Ye.ContextConsumer){const r=s;return r!=null&&r.displayName?`${r.displayName}.Consumer`:null}if(n===Ye.LazyComponent){const r=i;return(r==null?void 0:r._status)===1&&r._result?pn(r._result):null}return n===Ye.SuspenseComponent||n===Ye.SuspenseListComponent?null:n===Ye.IncompleteClassComponent||n===Ye.IncompleteFunctionComponent||n===Ye.FunctionComponent||n===Ye.ClassComponent||n===Ye.IndeterminateComponent?pn(s):null}function Mc(t){return t.length<=2||t.length<=3&&t===t.toLowerCase()}function $c(t,n){const s=fc(n),i=s.mode==="all";if(i){const m=Zn.map.get(t);if(m!==void 0)return m}if(!jc()){const m={path:null,components:[]};return i&&Zn.map.set(t,m),m}const o=s.mode==="smart"?bc(t):void 0,r=[];try{let m=Sc(t),$=0;for(;m&&$<s.maxDepth&&r.length<s.maxComponents;){const g=Nc(m);g&&!Mc(g)&&vc(g,$,s,o)&&r.push(g),m=m.return,$++}}catch{const m={path:null,components:[]};return i&&Zn.map.set(t,m),m}if(r.length===0){const m={path:null,components:[]};return i&&Zn.map.set(t,m),m}const p={path:r.slice().reverse().map(m=>`<${m}>`).join(" "),components:r};return i&&Zn.map.set(t,p),p}var es={FunctionComponent:0,IndeterminateComponent:2,ForwardRef:11,MemoComponent:14,SimpleMemoComponent:15};function Ic(t){if(!t||typeof t!="object")return null;const n=Object.keys(t),s=n.find(r=>r.startsWith("__reactFiber$"));if(s)return t[s]||null;const i=n.find(r=>r.startsWith("__reactInternalInstance$"));if(i)return t[i]||null;const o=n.find(r=>{if(!r.startsWith("__react"))return!1;const d=t[r];return d&&typeof d=="object"&&"_debugSource"in d});return o&&t[o]||null}function os(t){if(!t.type||typeof t.type=="string")return null;if(typeof t.type=="object"||typeof t.type=="function"){const n=t.type;if(n.displayName)return n.displayName;if(n.name)return n.name}return null}function Lc(t,n=50){var o;let s=t,i=0;for(;s&&i<n;){if(s._debugSource)return{source:s._debugSource,componentName:os(s)};if((o=s._debugOwner)!=null&&o._debugSource)return{source:s._debugOwner._debugSource,componentName:os(s._debugOwner)};s=s.return,i++}return null}function Ec(t){let n=t,s=0;const i=50;for(;n&&s<i;){const o=n,r=["_debugSource","__source","_source","debugSource"];for(const d of r){const p=o[d];if(p&&typeof p=="object"&&"fileName"in p)return{source:p,componentName:os(n)}}if(n.memoizedProps){const d=n.memoizedProps;if(d.__source&&typeof d.__source=="object"){const p=d.__source;if(p.fileName&&p.lineNumber)return{source:{fileName:p.fileName,lineNumber:p.lineNumber,columnNumber:p.columnNumber},componentName:os(n)}}}n=n.return,s++}return null}var Cs=new Map;function Rc(t){var o;const n=t.tag,s=t.type,i=t.elementType;if(typeof s=="string"||s==null||typeof s=="function"&&((o=s.prototype)!=null&&o.isReactComponent))return null;if((n===es.FunctionComponent||n===es.IndeterminateComponent)&&typeof s=="function")return s;if(n===es.ForwardRef&&i){const r=i.render;if(typeof r=="function")return r}if((n===es.MemoComponent||n===es.SimpleMemoComponent)&&i){const r=i.type;if(typeof r=="function")return r}return typeof s=="function"?s:null}function Bc(){const t=fo,n=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;if(n&&"H"in n)return{get:()=>n.H,set:i=>{n.H=i}};const s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;if(s){const i=s.ReactCurrentDispatcher;if(i&&"current"in i)return{get:()=>i.current,set:o=>{i.current=o}}}return null}function Tc(t){const n=t.split(`
`),s=[/source-location/,/\/dist\/index\./,/node_modules\//,/react-dom/,/react\.development/,/react\.production/,/chunk-[A-Z0-9]+/i,/react-stack-bottom-frame/,/react-reconciler/,/scheduler/,/<anonymous>/],i=/^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/,o=/^[^@]*@(.+?):(\d+):(\d+)$/;for(const r of n){const d=r.trim();if(!d||s.some(m=>m.test(d)))continue;const p=i.exec(d)||o.exec(d);if(p)return{fileName:p[1],line:parseInt(p[2],10),column:parseInt(p[3],10)}}return null}function Dc(t){let n=t;return n=n.replace(/[?#].*$/,""),n=n.replace(/^turbopack:\/\/\/\[project\]\//,""),n=n.replace(/^webpack-internal:\/\/\/\.\//,""),n=n.replace(/^webpack-internal:\/\/\//,""),n=n.replace(/^webpack:\/\/\/\.\//,""),n=n.replace(/^webpack:\/\/\//,""),n=n.replace(/^turbopack:\/\/\//,""),n=n.replace(/^https?:\/\/[^/]+\//,""),n=n.replace(/^file:\/\/\//,"/"),n=n.replace(/^\([^)]+\)\/\.\//,""),n=n.replace(/^\.\//,""),n}function Pc(t){const n=Rc(t);if(!n)return null;if(Cs.has(n))return Cs.get(n);const s=Bc();if(!s)return Cs.set(n,null),null;const i=s.get();let o=null;try{const r=new Proxy({},{get(){throw new Error("probe")}});s.set(r);try{n({})}catch(d){if(d instanceof Error&&d.message==="probe"&&d.stack){const p=Tc(d.stack);p&&(o={fileName:Dc(p.fileName),lineNumber:p.line,columnNumber:p.column,componentName:os(t)||void 0})}}}finally{s.set(i)}return Cs.set(n,o),o}function Ac(t,n=15){let s=t,i=0;for(;s&&i<n;){const o=Pc(s);if(o)return o;s=s.return,i++}return null}function xo(t){const n=Ic(t);if(!n)return{found:!1,reason:"no-fiber",isReactApp:!1,isProduction:!1};let s=Lc(n);if(s||(s=Ec(n)),s!=null&&s.source)return{found:!0,source:{fileName:s.source.fileName,lineNumber:s.source.lineNumber,columnNumber:s.source.columnNumber,componentName:s.componentName||void 0},isReactApp:!0,isProduction:!1};const i=Ac(n);return i?{found:!0,source:i,isReactApp:!0,isProduction:!1}:{found:!1,reason:"no-debug-source",isReactApp:!0,isProduction:!1}}function zc(t,n="path"){const{fileName:s,lineNumber:i,columnNumber:o}=t;let r=`${s}:${i}`;return o!==void 0&&(r+=`:${o}`),n==="vscode"?`vscode://file${s.startsWith("/")?"":"/"}${r}`:r}function Wc(t,n=10){let s=t,i=0;for(;s&&i<n;){const o=xo(s);if(o.found)return o;s=s.parentElement,i++}return xo(t)}var Oc=`.styles-module__toolbar___wNsdK svg[fill=none],
.styles-module__markersLayer___-25j1 svg[fill=none],
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] {
  fill: none !important;
}
.styles-module__toolbar___wNsdK svg[fill=none] :not([fill]),
.styles-module__markersLayer___-25j1 svg[fill=none] :not([fill]),
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__controlsContent___9GJWU :where(button, input, select, textarea, label) {
  background: unset;
  border: unset;
  border-radius: unset;
  padding: unset;
  margin: unset;
  color: unset;
  font-family: unset;
  font-weight: unset;
  font-style: unset;
  line-height: unset;
  letter-spacing: unset;
  text-transform: unset;
  text-decoration: unset;
  box-shadow: unset;
  outline: unset;
}

@keyframes styles-module__toolbarEnter___u8RRu {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
@keyframes styles-module__toolbarHide___y8kaT {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
@keyframes styles-module__badgeEnter___mVQLj {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleIn___c-r1K {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleOut___Wctwz {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}
@keyframes styles-module__slideUp___kgD36 {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__slideDown___zcdje {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
}
@keyframes styles-module__fadeIn___b9qmf {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__fadeOut___6Ut6- {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__hoverHighlightIn___6WYHY {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__hoverTooltipIn___FYGQx {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.styles-module__disableTransitions___EopxO :is(*, *::before, *::after) {
  transition: none !important;
}

.styles-module__toolbar___wNsdK {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 337px;
  z-index: 100000;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: none;
  transition: left 0s, top 0s, right 0s, bottom 0s;
}

:where(.styles-module__toolbar___wNsdK) {
  bottom: 1.25rem;
  right: 1.25rem;
}

.styles-module__toolbarContainer___dIhma {
  position: relative;
  user-select: none;
  margin-left: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {
  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}
.styles-module__toolbarContainer___dIhma.styles-module__hiding___1td44 {
  animation: styles-module__toolbarHide___y8kaT 0.4s cubic-bezier(0.4, 0, 1, 1) forwards;
  pointer-events: none;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  padding: 0;
  cursor: pointer;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn svg {
  margin-top: -1px;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #2a2a2a;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {
  transform: scale(0.95);
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {
  height: 44px;
  border-radius: 1.5rem;
  padding: 0.375rem;
  width: 297px;
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {
  width: 337px;
}

.styles-module__toggleContent___0yfyP {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toggleContent___0yfyP.styles-module__visible___KHwEW {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.styles-module__toggleContent___0yfyP.styles-module__hidden___Ae8H4 {
  opacity: 0;
  pointer-events: none;
}

.styles-module__controlsContent___9GJWU {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: filter 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
}
.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
  pointer-events: none;
  opacity: 0;
  filter: blur(10px);
  transform: scale(0.4);
}

.styles-module__badge___2XsgF {
  position: absolute;
  top: -13px;
  right: -13px;
  user-select: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: scale(1);
}
.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {
  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;
}

.styles-module__controlButton___8Q0jc {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;
}
.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.styles-module__controlButton___8Q0jc:active:not(:disabled) {
  transform: scale(0.92);
}
.styles-module__controlButton___8Q0jc:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background-color: color-mix(in srgb, var(--agentation-color-blue) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {
  cursor: default;
  pointer-events: none;
  background: transparent !important;
}
.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
  cursor: default;
}
.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}

.styles-module__buttonBadge___NeFWb {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
[data-agentation-theme=light] .styles-module__buttonBadge___NeFWb {
  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-yellow) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-yellow) 0%, transparent);
  }
}
.styles-module__mcpIndicator___zGJeL {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: background-color 0.3s ease, opacity 0.15s ease, transform 0.15s ease;
  opacity: 1;
  transform: scale(1);
}
.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {
  opacity: 0;
  transform: scale(0);
  animation: none;
}

@keyframes styles-module__connectionPulse___-Zycw {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}
.styles-module__connectionIndicatorWrapper___L-e-3 {
  width: 8px;
  height: 34px;
  margin-left: 6px;
  margin-right: 6px;
}

.styles-module__connectionIndicator___afk9p {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  cursor: default;
}

.styles-module__connectionIndicatorVisible___C-i5B {
  opacity: 1;
}

.styles-module__connectionIndicatorConnected___IY8pR {
  background-color: var(--agentation-color-green);
  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;
}

.styles-module__connectionIndicatorDisconnected___kmpaZ {
  background-color: var(--agentation-color-red);
  animation: none;
}

.styles-module__connectionIndicatorConnecting___QmSLH {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;
}

.styles-module__buttonWrapper___rBcdv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition-delay: 0.85s;
}
.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {
  opacity: 0;
  visibility: hidden;
}

.styles-module__tooltipsInSession___-0lHH .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transition-delay: 0s;
}

.styles-module__sendButtonWrapper___UUxG6 {
  width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  margin-left: -0.375rem;
  transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1), margin 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {
  transform: scale(0.8);
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {
  width: 34px;
  opacity: 1;
  overflow: visible;
  pointer-events: auto;
  margin-left: 0;
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {
  transform: scale(1);
}

.styles-module__buttonTooltip___Burd9 {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 6px 10px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;
}
.styles-module__buttonTooltip___Burd9::after {
  content: "";
  position: absolute;
  top: calc(100% - 4px);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 0 0 2px 0;
}

.styles-module__shortcut___lEAQk {
  margin-left: 4px;
  opacity: 0.5;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {
  bottom: auto;
  top: calc(100% + 14px);
  transform: translateX(-50%) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {
  top: -4px;
  bottom: auto;
  border-radius: 2px 0 0 0;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-50%) scale(1);
}

.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {
  opacity: 0 !important;
  visibility: hidden !important;
  transition: none !important;
}

.styles-module__tooltipVisible___0jcCv,
.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) scale(1) !important;
  transition-delay: 0s !important;
}

.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(-12px) scale(0.95);
}
.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {
  left: 16px;
}
.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {
  left: auto;
  right: 8px;
}
.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__divider___c--s1 {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 0.125rem;
}

.styles-module__overlay___Q1O9y {
  position: fixed;
  inset: 0;
  z-index: 99997;
  pointer-events: none;
}
.styles-module__overlay___Q1O9y > * {
  pointer-events: auto;
}

.styles-module__hoverHighlight___ogakW {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-accent) 50%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-accent) 4%, transparent);
  pointer-events: none !important;
  box-sizing: border-box;
  will-change: opacity;
  contain: layout style;
}
.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {
  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;
}

.styles-module__multiSelectOutline___cSJ-m {
  position: fixed;
  border: 2px dashed color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-green) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__singleSelectOutline___QhX-O {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-blue) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-blue) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__hoverTooltip___bvLk7 {
  position: fixed;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  pointer-events: none !important;
  white-space: nowrap;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {
  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;
}

.styles-module__hoverReactPath___gx1IJ {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__hoverElementName___QMLMl {
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markersLayer___-25j1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__markersLayer___-25j1 > * {
  pointer-events: auto;
}

.styles-module__fixedMarkersLayer___ffyX6 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__fixedMarkersLayer___ffyX6 > * {
  pointer-events: auto;
}

.styles-module__marker___6sQrs {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___6sQrs:hover {
  z-index: 2;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___6sQrs.styles-module__enter___WFIki {
  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {
  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {
  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___6sQrs.styles-module__pending___2IHLC {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {
  position: fixed;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___nCTxD {
  display: block;
  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;
}

@keyframes styles-module__renumberRoll___Wgbq3 {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__markerTooltip___aLJID {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {
  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;
}

.styles-module__markerQuote___FHmrz {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___QkrrS {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

.styles-module__markerHint___2iF-6 {
  display: block;
  font-size: 0.625rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.375rem;
  white-space: nowrap;
}

.styles-module__settingsPanel___OxX3Y {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 1rem;
  padding: 13px 0 16px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___OxX3Y::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,
.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,
.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,
.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,
.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,
.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,
.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12 {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__settingsPanelContainer___Xksv8 {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 1rem;
}

.styles-module__settingsPage___6YfHH {
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 3px 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsNavLink___wCzJt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(255, 255, 255, 0.9);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(0, 0, 0, 0.8);
}
.styles-module__settingsNavLink___wCzJt svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___ZWwhj {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__mcpNavIndicator___cl9pO {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;
}

.styles-module__settingsBackButton___bIe2j {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0 12px 0;
  margin: -6px 0 0.5rem 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(255, 255, 255, 0.07);
}
.styles-module__settingsBackButton___bIe2j:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___InP0r {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___InP0r {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___NKlmo {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___NKlmo {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___8xv-x {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___8xv-x:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendRow___UblX5 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.styles-module__autoSendLabel___icDc2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: var(--agentation-color-blue);
}

.styles-module__webhookUrlInput___2375C {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__settingsHeader___pwDY9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 0.5rem;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.styles-module__settingsBrand___0gJeM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___uTG18 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___TUcFq {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {
  padding-top: calc(0.5rem + 4px);
}

.styles-module__settingsSectionGrow___h-5HZ {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___3sdhc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {
  margin-top: 8px;
}

.styles-module__dropdownContainer___BVnxe {
  position: relative;
}

.styles-module__dropdownButton___16NPz {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownButton___16NPz:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownButton___16NPz svg {
  opacity: 0.6;
}

.styles-module__cycleButton___FMKfw {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___FMKfw {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___FMKfw:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes styles-module__cycleTextIn___Q6zJf {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__cycleButtonText___fD1LR {
  display: inline-block;
  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;
}

.styles-module__cycleDots___LWuoQ {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___nPgLY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__dropdownMenu___k73ER {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.25rem;
  min-width: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;
}

.styles-module__dropdownItem___ylsLj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownItem___ylsLj:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
}

.styles-module__settingsLabel___8UjfX {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
[data-agentation-theme=light] .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__settingsLabelMarker___ewdtV {
  padding-top: 3px;
  margin-bottom: 10px;
}

.styles-module__settingsOptions___LyrBA {
  display: flex;
  gap: 0.25rem;
}

.styles-module__settingsOption___UNa12 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__settingsOption___UNa12:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
  color: var(--agentation-color-blue);
}

.styles-module__sliderContainer___ducXj {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.styles-module__slider___GLdxp {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.styles-module__slider___GLdxp::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.styles-module__slider___GLdxp:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.styles-module__sliderLabels___FhLDB {
  display: flex;
  justify-content: space-between;
}

.styles-module__sliderLabel___U8sPr {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__sliderLabel___U8sPr:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(255, 255, 255, 0.9);
}

.styles-module__colorOptions___iHCNX {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  margin-bottom: 1px;
}

.styles-module__colorOption___IodiY {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: var(--swatch);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___IodiY {
    background-color: var(--swatch-p3);
  }
}
.styles-module__colorOption___IodiY:hover {
  transform: scale(1.15);
}
.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {
  transform: scale(0.83);
}

.styles-module__colorOptionRing___U2xpo {
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
.styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
  border-color: var(--swatch);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
    border-color: var(--swatch-p3);
  }
}

.styles-module__settingsToggle___fBrFn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {
  margin-top: calc(0.5rem + 6px);
}
.styles-module__settingsToggle___fBrFn input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {
  margin-bottom: calc(0.5rem + 6px);
}

.styles-module__customCheckbox___U39ax {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.25s ease, border-color 0.25s ease;
}
.styles-module__customCheckbox___U39ax svg {
  color: #1a1a1a;
  opacity: 1;
  transition: opacity 0.15s ease;
}
input[type=checkbox]:checked + .styles-module__customCheckbox___U39ax {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgb(255, 255, 255);
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo {
  border-color: #1a1a1a;
  background: #1a1a1a;
}
[data-agentation-theme=light] .styles-module__customCheckbox___U39ax.styles-module__checked___mnZLo svg {
  color: #fff;
}

.styles-module__toggleLabel___Xm8Aa {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
[data-agentation-theme=light] .styles-module__toggleLabel___Xm8Aa {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__toggleSwitch___l4Ygm {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.styles-module__toggleSwitch___l4Ygm input {
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn {
  background-color: var(--agentation-color-blue);
}
.styles-module__toggleSwitch___l4Ygm input:checked + .styles-module__toggleSlider___wprIn::before {
  transform: translateX(8px);
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw {
  opacity: 0.4;
}
.styles-module__toggleSwitch___l4Ygm.styles-module__disabled___332Jw .styles-module__toggleSlider___wprIn {
  cursor: not-allowed;
}

.styles-module__toggleSlider___wprIn {
  position: absolute;
  cursor: pointer;
  inset: 0;
  border-radius: 16px;
  background: #484848;
}
[data-agentation-theme=light] .styles-module__toggleSlider___wprIn {
  background: #dddddd;
}
.styles-module__toggleSlider___wprIn::before {
  content: "";
  position: absolute;
  height: 12px;
  width: 12px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes styles-module__mcpPulse___uNggr {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___fov9B {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
.styles-module__mcpStatusDot___ibgkc {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___fov9B 2s infinite;
}

.styles-module__drawCanvas___7cG9U {
  position: fixed;
  inset: 0;
  z-index: 99996;
  pointer-events: none !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6 {
  pointer-events: auto !important;
  cursor: crosshair !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6[data-stroke-hover] {
  cursor: pointer !important;
}

.styles-module__dragSelection___kZLq2 {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-green) 8%, transparent);
  pointer-events: none;
  z-index: 99997;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__dragCount___KM90j {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--agentation-color-green);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 1.5rem;
  text-align: center;
}

.styles-module__highlightsContainer___-0xzG {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__selectedElementHighlight___fyVlI {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  border-radius: 4px;
  background: color-mix(in srgb, var(--agentation-color-green) 6%, transparent);
  pointer-events: none;
  will-change: transform, width, height;
  contain: layout style;
}

[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #f5f5f5;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9 {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9::after {
  background: #fff;
}
[data-agentation-theme=light] .styles-module__divider___c--s1 {
  background: rgba(0, 0, 0, 0.1);
}`,Fc={toolbar:"styles-module__toolbar___wNsdK",markersLayer:"styles-module__markersLayer___-25j1",fixedMarkersLayer:"styles-module__fixedMarkersLayer___ffyX6",controlsContent:"styles-module__controlsContent___9GJWU",disableTransitions:"styles-module__disableTransitions___EopxO",toolbarContainer:"styles-module__toolbarContainer___dIhma",entrance:"styles-module__entrance___sgHd8",toolbarEnter:"styles-module__toolbarEnter___u8RRu",hiding:"styles-module__hiding___1td44",toolbarHide:"styles-module__toolbarHide___y8kaT",collapsed:"styles-module__collapsed___Rydsn",expanded:"styles-module__expanded___ofKPx",serverConnected:"styles-module__serverConnected___Gfbou",toggleContent:"styles-module__toggleContent___0yfyP",visible:"styles-module__visible___KHwEW",hidden:"styles-module__hidden___Ae8H4",badge:"styles-module__badge___2XsgF",fadeOut:"styles-module__fadeOut___6Ut6-",badgeEnter:"styles-module__badgeEnter___mVQLj",controlButton:"styles-module__controlButton___8Q0jc",statusShowing:"styles-module__statusShowing___te6iu",buttonBadge:"styles-module__buttonBadge___NeFWb",mcpIndicator:"styles-module__mcpIndicator___zGJeL",connected:"styles-module__connected___7c28g",mcpIndicatorPulseConnected:"styles-module__mcpIndicatorPulseConnected___EDodZ",connecting:"styles-module__connecting___uo-CW",mcpIndicatorPulseConnecting:"styles-module__mcpIndicatorPulseConnecting___cCYte",connectionIndicatorWrapper:"styles-module__connectionIndicatorWrapper___L-e-3",connectionIndicator:"styles-module__connectionIndicator___afk9p",connectionIndicatorVisible:"styles-module__connectionIndicatorVisible___C-i5B",connectionIndicatorConnected:"styles-module__connectionIndicatorConnected___IY8pR",connectionPulse:"styles-module__connectionPulse___-Zycw",connectionIndicatorDisconnected:"styles-module__connectionIndicatorDisconnected___kmpaZ",connectionIndicatorConnecting:"styles-module__connectionIndicatorConnecting___QmSLH",buttonWrapper:"styles-module__buttonWrapper___rBcdv",buttonTooltip:"styles-module__buttonTooltip___Burd9",tooltipsInSession:"styles-module__tooltipsInSession___-0lHH",sendButtonWrapper:"styles-module__sendButtonWrapper___UUxG6",sendButtonVisible:"styles-module__sendButtonVisible___WPSQU",shortcut:"styles-module__shortcut___lEAQk",tooltipBelow:"styles-module__tooltipBelow___m6ats",tooltipsHidden:"styles-module__tooltipsHidden___VtLJG",tooltipVisible:"styles-module__tooltipVisible___0jcCv",buttonWrapperAlignLeft:"styles-module__buttonWrapperAlignLeft___myzIp",buttonWrapperAlignRight:"styles-module__buttonWrapperAlignRight___HCQFR",divider:"styles-module__divider___c--s1",overlay:"styles-module__overlay___Q1O9y",hoverHighlight:"styles-module__hoverHighlight___ogakW",enter:"styles-module__enter___WFIki",hoverHighlightIn:"styles-module__hoverHighlightIn___6WYHY",multiSelectOutline:"styles-module__multiSelectOutline___cSJ-m",fadeIn:"styles-module__fadeIn___b9qmf",exit:"styles-module__exit___fyOJ0",singleSelectOutline:"styles-module__singleSelectOutline___QhX-O",hoverTooltip:"styles-module__hoverTooltip___bvLk7",hoverTooltipIn:"styles-module__hoverTooltipIn___FYGQx",hoverReactPath:"styles-module__hoverReactPath___gx1IJ",hoverElementName:"styles-module__hoverElementName___QMLMl",marker:"styles-module__marker___6sQrs",clearing:"styles-module__clearing___FQ--7",markerIn:"styles-module__markerIn___5FaAP",markerOut:"styles-module__markerOut___GU5jX",pending:"styles-module__pending___2IHLC",fixed:"styles-module__fixed___dBMHC",multiSelect:"styles-module__multiSelect___YWiuz",hovered:"styles-module__hovered___ZgXIy",renumber:"styles-module__renumber___nCTxD",renumberRoll:"styles-module__renumberRoll___Wgbq3",markerTooltip:"styles-module__markerTooltip___aLJID",tooltipIn:"styles-module__tooltipIn___0N31w",markerQuote:"styles-module__markerQuote___FHmrz",markerNote:"styles-module__markerNote___QkrrS",markerHint:"styles-module__markerHint___2iF-6",settingsPanel:"styles-module__settingsPanel___OxX3Y",settingsHeader:"styles-module__settingsHeader___pwDY9",settingsBrand:"styles-module__settingsBrand___0gJeM",settingsBrandSlash:"styles-module__settingsBrandSlash___uTG18",settingsVersion:"styles-module__settingsVersion___TUcFq",settingsSection:"styles-module__settingsSection___m-YM2",settingsLabel:"styles-module__settingsLabel___8UjfX",cycleButton:"styles-module__cycleButton___FMKfw",cycleDot:"styles-module__cycleDot___nPgLY",dropdownButton:"styles-module__dropdownButton___16NPz",toggleLabel:"styles-module__toggleLabel___Xm8Aa",customCheckbox:"styles-module__customCheckbox___U39ax",sliderLabel:"styles-module__sliderLabel___U8sPr",slider:"styles-module__slider___GLdxp",themeToggle:"styles-module__themeToggle___2rUjA",settingsOption:"styles-module__settingsOption___UNa12",selected:"styles-module__selected___OwRqP",settingsPanelContainer:"styles-module__settingsPanelContainer___Xksv8",settingsPage:"styles-module__settingsPage___6YfHH",slideLeft:"styles-module__slideLeft___Ps01J",automationsPage:"styles-module__automationsPage___uvCq6",slideIn:"styles-module__slideIn___4-qXe",settingsNavLink:"styles-module__settingsNavLink___wCzJt",settingsNavLinkRight:"styles-module__settingsNavLinkRight___ZWwhj",mcpNavIndicator:"styles-module__mcpNavIndicator___cl9pO",mcpPulse:"styles-module__mcpPulse___uNggr",settingsBackButton:"styles-module__settingsBackButton___bIe2j",automationHeader:"styles-module__automationHeader___InP0r",automationDescription:"styles-module__automationDescription___NKlmo",learnMoreLink:"styles-module__learnMoreLink___8xv-x",autoSendRow:"styles-module__autoSendRow___UblX5",autoSendLabel:"styles-module__autoSendLabel___icDc2",active:"styles-module__active___-zoN6",webhookUrlInput:"styles-module__webhookUrlInput___2375C",settingsSectionExtraPadding:"styles-module__settingsSectionExtraPadding___jdhFV",settingsSectionGrow:"styles-module__settingsSectionGrow___h-5HZ",settingsRow:"styles-module__settingsRow___3sdhc",settingsRowMarginTop:"styles-module__settingsRowMarginTop___zA0Sp",dropdownContainer:"styles-module__dropdownContainer___BVnxe",settingsRowDisabled:"styles-module__settingsRowDisabled___EgS0V",toggleSwitch:"styles-module__toggleSwitch___l4Ygm",cycleButtonText:"styles-module__cycleButtonText___fD1LR",cycleTextIn:"styles-module__cycleTextIn___Q6zJf",cycleDots:"styles-module__cycleDots___LWuoQ",dropdownMenu:"styles-module__dropdownMenu___k73ER",scaleIn:"styles-module__scaleIn___c-r1K",dropdownItem:"styles-module__dropdownItem___ylsLj",settingsLabelMarker:"styles-module__settingsLabelMarker___ewdtV",settingsOptions:"styles-module__settingsOptions___LyrBA",sliderContainer:"styles-module__sliderContainer___ducXj",sliderLabels:"styles-module__sliderLabels___FhLDB",colorOptions:"styles-module__colorOptions___iHCNX",colorOption:"styles-module__colorOption___IodiY",colorOptionRing:"styles-module__colorOptionRing___U2xpo",settingsToggle:"styles-module__settingsToggle___fBrFn",settingsToggleMarginBottom:"styles-module__settingsToggleMarginBottom___MZUyF",checked:"styles-module__checked___mnZLo",toggleSlider:"styles-module__toggleSlider___wprIn",disabled:"styles-module__disabled___332Jw",mcpStatusDot:"styles-module__mcpStatusDot___ibgkc",disconnected:"styles-module__disconnected___cHPxR",mcpPulseError:"styles-module__mcpPulseError___fov9B",drawCanvas:"styles-module__drawCanvas___7cG9U",dragSelection:"styles-module__dragSelection___kZLq2",dragCount:"styles-module__dragCount___KM90j",highlightsContainer:"styles-module__highlightsContainer___-0xzG",selectedElementHighlight:"styles-module__selectedElementHighlight___fyVlI",scaleOut:"styles-module__scaleOut___Wctwz",slideUp:"styles-module__slideUp___kgD36",slideDown:"styles-module__slideDown___zcdje"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-page-toolbar-css-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-page-toolbar-css-styles",document.head.appendChild(t)),t.textContent=Oc}var E=Fc,ts=[{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"detailed",label:"Detailed"},{value:"forensic",label:"Forensic"}];function vr(t,n,s="standard"){if(t.length===0)return"";const i=typeof window<"u"?`${window.innerWidth}×${window.innerHeight}`:"unknown";let o=`## Page Feedback: ${n}
`;return s==="forensic"?(o+=`
**Environment:**
`,o+=`- Viewport: ${i}
`,typeof window<"u"&&(o+=`- URL: ${window.location.href}
`,o+=`- User Agent: ${navigator.userAgent}
`,o+=`- Timestamp: ${new Date().toISOString()}
`,o+=`- Device Pixel Ratio: ${window.devicePixelRatio}
`),o+=`
---
`):s!=="compact"&&(o+=`**Viewport:** ${i}
`),o+=`
`,t.forEach((r,d)=>{s==="compact"?(o+=`${d+1}. **${r.element}**${r.sourceFile?` (${r.sourceFile})`:""}: ${r.comment}`,r.selectedText&&(o+=` (re: "${r.selectedText.slice(0,30)}${r.selectedText.length>30?"...":""}")`),o+=`
`):s==="forensic"?(o+=`### ${d+1}. ${r.element}
`,r.isMultiSelect&&r.fullPath&&(o+=`*Forensic data shown for first element of selection*
`),r.fullPath&&(o+=`**Full DOM Path:** ${r.fullPath}
`),r.cssClasses&&(o+=`**CSS Classes:** ${r.cssClasses}
`),r.boundingBox&&(o+=`**Position:** x:${Math.round(r.boundingBox.x)}, y:${Math.round(r.boundingBox.y)} (${Math.round(r.boundingBox.width)}×${Math.round(r.boundingBox.height)}px)
`),o+=`**Annotation at:** ${r.x.toFixed(1)}% from left, ${Math.round(r.y)}px from top
`,r.selectedText&&(o+=`**Selected text:** "${r.selectedText}"
`),r.nearbyText&&!r.selectedText&&(o+=`**Context:** ${r.nearbyText.slice(0,100)}
`),r.computedStyles&&(o+=`**Computed Styles:** ${r.computedStyles}
`),r.accessibility&&(o+=`**Accessibility:** ${r.accessibility}
`),r.nearbyElements&&(o+=`**Nearby Elements:** ${r.nearbyElements}
`),r.sourceFile&&(o+=`**Source:** ${r.sourceFile}
`),r.reactComponents&&(o+=`**React:** ${r.reactComponents}
`),o+=`**Feedback:** ${r.comment}

`):(o+=`### ${d+1}. ${r.element}
`,o+=`**Location:** ${r.elementPath}
`,r.sourceFile&&(o+=`**Source:** ${r.sourceFile}
`),r.reactComponents&&(o+=`**React:** ${r.reactComponents}
`),s==="detailed"&&(r.cssClasses&&(o+=`**Classes:** ${r.cssClasses}
`),r.boundingBox&&(o+=`**Position:** ${Math.round(r.boundingBox.x)}px, ${Math.round(r.boundingBox.y)}px (${Math.round(r.boundingBox.width)}×${Math.round(r.boundingBox.height)}px)
`)),r.selectedText&&(o+=`**Selected text:** "${r.selectedText}"
`),s==="detailed"&&r.nearbyText&&!r.selectedText&&(o+=`**Context:** ${r.nearbyText.slice(0,100)}
`),o+=`**Feedback:** ${r.comment}

`)}),o.trim()}var Hc=`@keyframes styles-module__markerIn___x4G8D {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes styles-module__markerOut___6VhQN {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}
@keyframes styles-module__tooltipIn___aJslQ {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(2px) scale(0.891);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(0.909);
  }
}
@keyframes styles-module__renumberRoll___akV9B {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__marker___9CKF7 {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___9CKF7:hover {
  z-index: 2;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___9CKF7.styles-module__enter___8kI3q {
  animation: styles-module__markerIn___x4G8D 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___9CKF7.styles-module__exit___KBdR3 {
  animation: styles-module__markerOut___6VhQN 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7.styles-module__clearing___8rM7K {
  animation: styles-module__markerOut___6VhQN 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___9CKF7.styles-module__fixed___aKrQO {
  position: fixed;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___9CKF7.styles-module__hovered___-mg2N {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___16lvD {
  display: block;
  animation: styles-module__renumberRoll___akV9B 0.2s ease-out;
}

.styles-module__markerTooltip___-VUm- {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___-VUm-.styles-module__enter___8kI3q {
  animation: styles-module__tooltipIn___aJslQ 0.1s ease-out forwards;
}

.styles-module__markerQuote___tQake {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___Rh4eI {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- {
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerQuote___tQake {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__markerTooltip___-VUm- .styles-module__markerNote___Rh4eI {
  color: rgba(0, 0, 0, 0.85);
}`,Yc={marker:"styles-module__marker___9CKF7",enter:"styles-module__enter___8kI3q",exit:"styles-module__exit___KBdR3",clearing:"styles-module__clearing___8rM7K",pending:"styles-module__pending___BiY-U",fixed:"styles-module__fixed___aKrQO",multiSelect:"styles-module__multiSelect___CPfTC",hovered:"styles-module__hovered___-mg2N",renumber:"styles-module__renumber___16lvD",markerTooltip:"styles-module__markerTooltip___-VUm-",markerQuote:"styles-module__markerQuote___tQake",markerNote:"styles-module__markerNote___Rh4eI"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-annotation-marker-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-annotation-marker-styles",document.head.appendChild(t)),t.textContent=Hc}var rt=Yc;function kr({annotation:t,globalIndex:n,layerIndex:s,layerSize:i,isExiting:o,isClearing:r,isAnimated:d,isHovered:p,isDeleting:m,isEditingAny:$,renumberFrom:g,markerClickBehavior:y,tooltipStyle:w,onHoverEnter:R,onHoverLeave:k,onClick:B,onContextMenu:X}){const A=(p||m)&&!$,me=A&&y==="delete",Pe=t.isMultiSelect,I=Pe?"var(--agentation-color-green)":"var(--agentation-color-accent)",ne=o?rt.exit:r?rt.clearing:d?"":rt.enter,he=o?`${(i-1-s)*20}ms`:`${s*20}ms`;return e.jsxs("div",{className:`${rt.marker} ${Pe?rt.multiSelect:""} ${ne} ${me?rt.hovered:""}`,"data-annotation-marker":!0,style:{left:`${t.x}%`,top:t.y,backgroundColor:me?void 0:I,animationDelay:he},onMouseEnter:()=>R(t),onMouseLeave:k,onClick:z=>{z.stopPropagation(),o||B(t)},onContextMenu:X?z=>{y==="delete"&&(z.preventDefault(),z.stopPropagation(),o||X(t))}:void 0,children:[A?me?e.jsx(Dr,{size:Pe?18:16}):e.jsx(sl,{size:16}):e.jsx("span",{className:g!==null&&n>=g?rt.renumber:void 0,children:n+1}),p&&!$&&e.jsxs("div",{className:`${rt.markerTooltip} ${rt.enter}`,style:w,children:[e.jsxs("span",{className:rt.markerQuote,children:[t.element,t.selectedText&&` "${t.selectedText.slice(0,30)}${t.selectedText.length>30?"...":""}"`]}),e.jsx("span",{className:rt.markerNote,children:t.comment})]})]})}function Uc({x:t,y:n,isMultiSelect:s,isExiting:i}){return e.jsx("div",{className:`${rt.marker} ${rt.pending} ${s?rt.multiSelect:""} ${i?rt.exit:rt.enter}`,style:{left:`${t}%`,top:n,backgroundColor:s?"var(--agentation-color-green)":"var(--agentation-color-accent)"},children:e.jsx(Ui,{size:12})})}function jr({annotation:t,fixed:n}){const s=t.isMultiSelect;return e.jsx("div",{className:`${rt.marker} ${n?rt.fixed:""} ${rt.hovered} ${s?rt.multiSelect:""} ${rt.exit}`,"data-annotation-marker":!0,style:{left:`${t.x}%`,top:t.y},children:e.jsx(Dr,{size:s?12:10})})}var Xc=`.styles-module__switchContainer___Ka-AB {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  background-color: #cdcdcd;
  transition: background-color 0.15s, opacity 0.15s;
}
[data-agentation-theme=dark] .styles-module__switchContainer___Ka-AB {
  background-color: #484848;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) {
  background-color: var(--agentation-color-blue);
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:disabled) {
  opacity: 0.3;
}

.styles-module__switchInput___kYDSD {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}
.styles-module__switchInput___kYDSD:disabled {
  cursor: not-allowed;
}

.styles-module__switchThumb___4sCPH {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transition: transform 0.15s;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) .styles-module__switchThumb___4sCPH {
  transform: translateX(8px);
}`,Qc={switchContainer:"styles-module__switchContainer___Ka-AB",switchInput:"styles-module__switchInput___kYDSD",switchThumb:"styles-module__switchThumb___4sCPH"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-switch-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-switch-styles",document.head.appendChild(t)),t.textContent=Xc}var oo=Qc,ro=({className:t="",...n})=>e.jsxs("div",{className:`${oo.switchContainer} ${t}`,children:[e.jsx("input",{className:oo.switchInput,type:"checkbox",...n}),e.jsx("div",{className:oo.switchThumb})]}),qc=`.styles-module__checkboxContainer___joqZk {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(26, 26, 26, 0.2);
  border-radius: 4px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  transition: background-color 0.2s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: #252525;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #1a1a1a;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #fff;
}

.styles-module__checkboxInput___ECzzO {
  position: absolute;
  z-index: 1;
  inset: -1px;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}

.styles-module__checkboxCheck___fUXpr {
  color: #fafafa;
}
[data-agentation-theme=dark] .styles-module__checkboxCheck___fUXpr {
  color: #1a1a1a;
}

.styles-module__checkboxCheckPath___cDyh8 {
  stroke-dasharray: 9.29px;
  stroke-dashoffset: 9.29px;
  color: #fafafa;
  transition: stroke-dashoffset 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxCheckPath___cDyh8 {
  color: #1a1a1a;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) .styles-module__checkboxCheckPath___cDyh8 {
  transition-duration: 0.2s;
  stroke-dashoffset: 0;
}`,Vc={checkboxContainer:"styles-module__checkboxContainer___joqZk",checkboxInput:"styles-module__checkboxInput___ECzzO",checkboxCheck:"styles-module__checkboxCheck___fUXpr",checkboxCheckPath:"styles-module__checkboxCheckPath___cDyh8"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-checkbox-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-checkbox-styles",document.head.appendChild(t)),t.textContent=qc}var Ss=Vc,Gc=({className:t="",...n})=>e.jsxs("div",{className:`${Ss.checkboxContainer} ${t}`,children:[e.jsx("input",{className:Ss.checkboxInput,type:"checkbox",...n}),e.jsx("svg",{className:Ss.checkboxCheck,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{className:Ss.checkboxCheckPath,d:"M3.94 7L6.13 9.19L10.5 4.81",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),Kc=`.styles-module__container___w8eAF {
  display: flex;
  align-items: center;
  height: 24px;
}

.styles-module__label___J5mxE {
  padding-inline: 8px 2px;
  line-height: 20px;
  font-size: 13px;
  letter-spacing: -0.15px;
  color: rgba(26, 26, 26, 0.5);
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__label___J5mxE {
  color: rgba(255, 255, 255, 0.5);
}`,Jc={container:"styles-module__container___w8eAF",label:"styles-module__label___J5mxE"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-checkbox-field-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-checkbox-field-styles",document.head.appendChild(t)),t.textContent=Kc}var Cr=Jc,Sr=({className:t="",label:n,tooltip:s,checked:i,onChange:o,...r})=>{const d=a.useId();return e.jsxs("div",{className:`${Cr.container} ${t}`,...r,children:[e.jsx(Gc,{id:d,onChange:o,checked:i}),e.jsx("label",{className:Cr.label,htmlFor:d,children:n}),s&&e.jsx(yn,{content:s})]})},Zc=`@keyframes styles-module__cycleTextIn___VBNTi {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes styles-module__scaleIn___QpQ8E {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__mcpPulse___5Q3Jj {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___VHxhx {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
@keyframes styles-module__themeIconIn___qUWMV {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
.styles-module__settingsPanel___qNkn- {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 16px;
  padding: 12px 0;
  width: 100%;
  max-width: 253px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___qNkn-::before, .styles-module__settingsPanel___qNkn-::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___qNkn-::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn-::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrandSlash___Q-AU9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4,
.styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ,
.styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3,
.styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY,
.styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8,
.styles-module__settingsPanel___qNkn- .styles-module__sliderLabel___6K5v1,
.styles-module__settingsPanel___qNkn- .styles-module__slider___v5z-c,
.styles-module__settingsPanel___qNkn- .styles-module__themeToggle___3imlT {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___qNkn-.styles-module__enter___wginS {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___qNkn-.styles-module__exit___A4iJc {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH- {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-.styles-module__selected___k1-Vq {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__settingsPanelContainer___5it-H {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 16px;
}

.styles-module__settingsPage___BMn-3 {
  min-width: 100%;
  flex-basis: 0;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___BMn-3.styles-module__slideLeft___qUvW4 {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 0 16px 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0.styles-module__slideIn___uXDSu {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsHeader___Fn1DP {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
}

.styles-module__settingsBrand___OoKlM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___Q-AU9 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___rXmL9 {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__themeToggle___3imlT {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease;
  cursor: pointer;
}
.styles-module__themeToggle___3imlT:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.styles-module__themeIconWrapper___pyaYa {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
}

.styles-module__themeIcon___w7lAm {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: styles-module__themeIconIn___qUWMV 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.styles-module__settingsSectionGrow___eZTRw {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___y-tDE {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___y-tDE.styles-module__settingsRowMarginTop___uLpGb {
  margin-top: 8px;
}

.styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.2);
}

.styles-module__settingsLabel___VCVOQ {
  display: flex;
  align-items: center;
  column-gap: 2px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__cycleButton___XMBx3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___XMBx3:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__cycleButtonText___mbbnD {
  display: inline-block;
  animation: styles-module__cycleTextIn___VBNTi 0.2s ease-out;
}

.styles-module__cycleDots___ehp6i {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___zgSXY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__colorOptions___pbxZx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  height: 26px;
}

.styles-module__colorOption___Co955 {
  padding: 0;
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__colorOption___Co955 {
  background-color: #1a1a1a;
}
.styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--swatch);
  transition: opacity 0.2s, transform 0.2s;
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
    --color: var(--swatch-p3);
  }
}
.styles-module__colorOption___Co955::after {
  z-index: -1;
  transform: scale(1.2);
  opacity: 0;
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::before {
  transform: scale(0.8);
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::after {
  opacity: 1;
}

.styles-module__settingsNavLink___uYIwM {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.15s ease;
  cursor: pointer;
}
.styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(255, 255, 255, 0.9);
}
.styles-module__settingsNavLink___uYIwM svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___uYIwM:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(0, 0, 0, 0.8);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___XBUzC {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__settingsBackButton___fflll {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___fflll {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___Avra9 {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___Avra9 {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___vFTmJ {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___vFTmJ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___cG7OI {
  color: rgba(255, 255, 255, 0.8);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___cG7OI:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendContainer___VpkXk {
  display: flex;
  align-items: center;
}

.styles-module__autoSendLabel___ngNdC {
  padding-inline-end: 8px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s, opacity 0.15s;
  cursor: pointer;
}
.styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: var(--agentation-color-blue);
}
.styles-module__autoSendLabel___ngNdC.styles-module__disabled___9AZYS {
  opacity: 0.3;
  cursor: not-allowed;
}

.styles-module__mcpStatusDot___8AMxP {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__disconnected___mvmvQ {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___VHxhx 2s infinite;
}

.styles-module__mcpNavIndicator___auBHI {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s ease-in-out infinite;
}

.styles-module__webhookUrlInput___WDDDC {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::before {
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::after {
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM {
  color: #E5484D;
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4 {
  border-top-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8:hover {
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__checkboxField___ZrSqv:not(:first-child) {
  margin-top: 8px;
}

.styles-module__divider___h6Yux {
  margin-block: 8px;
  width: 100%;
  height: 1px;
  background-color: rgba(26, 26, 26, 0.07);
}
[data-agentation-theme=dark] .styles-module__divider___h6Yux {
  background-color: rgba(255, 255, 255, 0.07);
}`,ed={settingsPanel:"styles-module__settingsPanel___qNkn-",settingsHeader:"styles-module__settingsHeader___Fn1DP",settingsBrand:"styles-module__settingsBrand___OoKlM",settingsBrandSlash:"styles-module__settingsBrandSlash___Q-AU9",settingsVersion:"styles-module__settingsVersion___rXmL9",settingsSection:"styles-module__settingsSection___n5V-4",settingsLabel:"styles-module__settingsLabel___VCVOQ",cycleButton:"styles-module__cycleButton___XMBx3",cycleDot:"styles-module__cycleDot___zgSXY",dropdownButton:"styles-module__dropdownButton___mKHe8",sliderLabel:"styles-module__sliderLabel___6K5v1",slider:"styles-module__slider___v5z-c",themeToggle:"styles-module__themeToggle___3imlT",enter:"styles-module__enter___wginS",exit:"styles-module__exit___A4iJc",settingsOption:"styles-module__settingsOption___JoyH-",selected:"styles-module__selected___k1-Vq",settingsPanelContainer:"styles-module__settingsPanelContainer___5it-H",settingsPage:"styles-module__settingsPage___BMn-3",slideLeft:"styles-module__slideLeft___qUvW4",automationsPage:"styles-module__automationsPage___N7By0",slideIn:"styles-module__slideIn___uXDSu",themeIconWrapper:"styles-module__themeIconWrapper___pyaYa",themeIcon:"styles-module__themeIcon___w7lAm",themeIconIn:"styles-module__themeIconIn___qUWMV",settingsSectionGrow:"styles-module__settingsSectionGrow___eZTRw",settingsRow:"styles-module__settingsRow___y-tDE",settingsRowMarginTop:"styles-module__settingsRowMarginTop___uLpGb",settingsRowDisabled:"styles-module__settingsRowDisabled___ydl3Q",cycleButtonText:"styles-module__cycleButtonText___mbbnD",cycleTextIn:"styles-module__cycleTextIn___VBNTi",cycleDots:"styles-module__cycleDots___ehp6i",active:"styles-module__active___dpAhM",colorOptions:"styles-module__colorOptions___pbxZx",colorOption:"styles-module__colorOption___Co955",settingsNavLink:"styles-module__settingsNavLink___uYIwM",settingsNavLinkRight:"styles-module__settingsNavLinkRight___XBUzC",settingsBackButton:"styles-module__settingsBackButton___fflll",automationHeader:"styles-module__automationHeader___Avra9",automationDescription:"styles-module__automationDescription___vFTmJ",learnMoreLink:"styles-module__learnMoreLink___cG7OI",autoSendContainer:"styles-module__autoSendContainer___VpkXk",autoSendLabel:"styles-module__autoSendLabel___ngNdC",disabled:"styles-module__disabled___9AZYS",mcpStatusDot:"styles-module__mcpStatusDot___8AMxP",connecting:"styles-module__connecting___QEO1r",mcpPulse:"styles-module__mcpPulse___5Q3Jj",connected:"styles-module__connected___WyFkx",disconnected:"styles-module__disconnected___mvmvQ",mcpPulseError:"styles-module__mcpPulseError___VHxhx",mcpNavIndicator:"styles-module__mcpNavIndicator___auBHI",webhookUrlInput:"styles-module__webhookUrlInput___WDDDC",checkboxField:"styles-module__checkboxField___ZrSqv",divider:"styles-module__divider___h6Yux",scaleIn:"styles-module__scaleIn___QpQ8E"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-settings-panel-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-settings-panel-styles",document.head.appendChild(t)),t.textContent=Zc}var q=ed;function td({settings:t,onSettingsChange:n,isDarkMode:s,onToggleTheme:i,isDevMode:o,connectionStatus:r,endpoint:d,isVisible:p,toolbarNearBottom:m,settingsPage:$,onSettingsPageChange:g,onHideToolbar:y}){var w;return e.jsx("div",{className:`${q.settingsPanel} ${p?q.enter:q.exit}`,style:m?{bottom:"auto",top:"calc(100% + 0.5rem)"}:void 0,"data-agentation-settings-panel":!0,children:e.jsxs("div",{className:q.settingsPanelContainer,children:[e.jsxs("div",{className:`${q.settingsPage} ${$==="automations"?q.slideLeft:""}`,children:[e.jsxs("div",{className:q.settingsHeader,children:[e.jsx("a",{className:q.settingsBrand,href:"https://agentation.com",target:"_blank",rel:"noopener noreferrer",children:e.jsx("svg",{width:"72",height:"16",viewBox:"0 0 676 151",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M79.6666 100.561L104.863 15.5213C107.828 4.03448 99.1201 -3.00582 88.7449 1.25541L3.52015 39.6065C1.48217 40.5329 0 42.7562 0 45.1647C0 48.6848 2.77907 51.4639 6.29922 51.4639C7.22558 51.4639 8.15193 51.2786 9.07829 50.9081L93.7472 12.7422C97.2674 11.0748 93.7472 8.29572 92.6356 12.1864L67.624 97.2259C66.5123 100.931 69.4767 105.193 73.7379 105.193C76.517 105.193 79.1108 103.155 79.6666 100.561ZM663.641 100.005C665.679 107.231 677.537 104.081 675.499 96.8553L666.05 66.2856C663.456 57.7631 655.489 55.7251 648.82 61.098L618.991 86.6654C617.324 87.9623 621.029 89.815 621.214 88.1476L625.846 61.6538C626.958 55.3546 624.179 50.5375 615.841 50.5375L579.158 51.0934C576.008 51.0934 578.417 53.8724 578.417 57.022C578.417 60.1716 580.825 61.6538 583.975 61.6538L616.212 60.9127C616.397 60.9127 614.544 59.6158 614.544 59.8011L609.727 88.7034C607.875 99.6344 617.694 102.784 626.031 95.7437L655.86 70.1763L654.192 69.6205L663.641 100.005ZM571.191 89.0739C555.443 88.7034 562.298 61.4685 578.787 61.8391C594.72 62.0243 587.124 89.2592 571.191 89.0739ZM571.006 100.375C601.575 100.931 611.024 51.6492 579.158 51.0934C547.847 50.5375 540.065 99.8197 571.006 100.375ZM521.909 46.4616C525.985 46.4616 529.505 42.9414 529.505 38.6802C529.505 34.4189 525.985 31.0841 521.909 31.0841C517.833 31.0841 514.127 34.6042 514.127 38.6802C514.127 42.7562 517.648 46.4616 521.909 46.4616ZM472.256 103.525C493.192 103.71 515.98 73.3259 519.13 62.3949L509.866 60.9127C505.234 73.3259 497.638 101.672 519.871 102.043C536.545 102.228 552.479 85.3685 563.595 70.1763C564.151 69.2499 564.706 68.1383 564.706 66.8414C564.706 63.6918 563.965 61.098 560.816 61.098C558.963 61.098 557.296 62.0243 556.184 63.5065C546.365 77.0313 530.802 90.9266 522.094 90.7414C511.904 90.5561 517.462 71.4732 519.871 64.9887C523.391 55.7251 512.831 53.5019 509.681 60.9127C506.531 68.6941 488.19 92.4088 475.035 92.2235C467.439 92.0383 464.29 83.8863 472.441 59.9864L486.707 17.7445C487.634 14.4097 485.41 10.519 481.334 10.519C478.741 10.519 476.517 12.1864 475.962 14.4097L461.696 56.4662C451.506 86.4801 455.211 103.155 472.256 103.525ZM447.43 42.5709L496.527 41.4593C499.306 41.4593 501.529 39.0507 501.529 36.2717C501.529 33.3073 499.306 31.0841 496.341 31.0841L447.245 32.1957C444.466 32.1957 442.242 34.4189 442.242 37.3833C442.242 40.1624 444.466 42.5709 447.43 42.5709ZM422.974 106.304C435.387 106.489 457.249 94.8173 472.441 53.8724C473.553 50.7228 472.071 48.3143 468.365 48.3143C466.142 48.3143 464.29 49.6112 463.548 51.6492C450.394 87.2212 431.682 96.1142 424.456 95.929C419.454 95.929 417.972 93.3352 418.713 85.5538C419.454 78.1429 410.376 74.9933 406.114 81.1073C401.297 87.777 394.442 94.2615 385.549 94.0763C370.172 93.891 376.471 67.0267 399.815 67.3972C408.338 67.5825 414.452 71.4732 417.045 76.6608C417.786 78.3282 419.454 79.6251 421.492 79.6251C424.271 79.6251 426.679 77.2166 426.679 74.4375C426.679 73.6964 426.494 72.9553 426.124 72.2143C421.862 63.6918 412.414 57.3926 400 57.2073C363.502 56.6515 353.497 104.451 383.326 104.822C397.036 105.193 410.005 94.0763 413.34 85.9243C412.599 86.8507 408.338 86.6654 408.523 84.4422C407.411 97.4111 410.931 106.119 422.974 106.304ZM335.897 104.266C335.897 115.012 347.569 117.606 347.569 103.34C347.569 89.0739 358.5 54.4282 361.464 45.1647L396.666 43.6825C405.929 43.1267 404.262 33.1221 397.036 33.3073L364.984 34.4189L368.875 22.7469C369.801 20.1531 370.542 17.9298 370.542 16.2624C370.542 13.4833 368.504 11.8159 365.911 11.8159C362.946 11.8159 360.352 12.7422 357.573 21.0794L352.942 35.16L330.153 36.0864C326.263 36.4569 323.483 38.1244 323.483 41.6445C323.483 45.5352 326.448 47.0174 330.709 46.8321L349.421 45.9058C345.901 56.6515 335.897 90.7414 335.897 104.266ZM186.939 78.6988C193.979 56.4662 212.877 54.984 212.877 62.9507C212.877 68.3236 203.984 77.0313 186.939 78.6988ZM113.942 150.955C142.844 152.437 159.704 111.492 160.63 80.5515C161.556 73.3259 153.96 70.3616 148.773 75.7344C141.918 83.1453 129.505 93.1499 119.685 93.1499C103.011 93.1499 116.165 59.8011 143.956 59.8011C149.514 59.8011 153.59 61.6538 156.184 64.0623C160.815 68.3236 170.82 62.0243 165.818 56.0957C161.927 51.4639 155.072 48.129 144.882 48.129C102.455 48.129 83.7426 105.007 116.721 105.007C134.692 105.007 151.367 88.3329 155.257 82.7747C154.516 83.5158 149.329 81.2925 149.699 79.4398L149.143 83.5158C148.958 107.045 134.322 141.506 116.536 139.838C113.386 139.468 112.089 137.43 112.089 134.836C112.089 128.907 122.094 119.273 145.067 113.53C159.518 109.824 152.293 101.487 143.4 104.081C111.163 113.53 99.6759 127.425 99.6759 137.8C99.6759 145.026 105.605 150.584 113.942 150.955ZM194.72 109.454C214.359 109.454 239 95.3732 251.228 77.9577C250.301 82.96 246.596 96.8553 246.596 101.487C246.596 110.01 254.748 109.454 261.232 102.784L288.097 75.5491L290.32 85.7391C293.284 99.4491 299.213 104.822 308.847 104.822C326.263 104.822 342.196 85.7391 349.421 74.8081L344.049 63.6918C339.787 74.8081 321.631 92.5941 311.626 92.5941C306.994 92.5941 304.771 89.815 303.289 83.7011L300.325 71.2879C297.916 60.7275 289.023 58.3189 279.018 68.1383L261.788 84.8127L264.382 69.991C266.235 59.2453 255.674 58.1337 250.116 65.915C241.779 77.0313 216.767 97.7817 196.387 97.7817C187.865 97.7817 185.456 93.7057 185.456 88.3329C230.848 84.998 239.185 47.2027 208.986 47.2027C172.858 47.2027 157.11 109.454 194.72 109.454Z",fill:"currentColor"})})}),e.jsxs("p",{className:q.settingsVersion,children:["v","3.0.2"]}),e.jsx("button",{className:q.themeToggle,onClick:i,title:s?"Switch to light mode":"Switch to dark mode",children:e.jsx("span",{className:q.themeIconWrapper,children:e.jsx("span",{className:q.themeIcon,children:s?e.jsx(tl,{size:20}):e.jsx(nl,{size:20})},s?"sun":"moon")})})]}),e.jsx("div",{className:q.divider}),e.jsxs("div",{className:q.settingsSection,children:[e.jsxs("div",{className:q.settingsRow,children:[e.jsxs("div",{className:q.settingsLabel,children:["Output Detail",e.jsx(yn,{content:"Controls how much detail is included in the copied output"})]}),e.jsxs("button",{className:q.cycleButton,onClick:()=>{const k=(ts.findIndex(B=>B.value===t.outputDetail)+1)%ts.length;n({outputDetail:ts[k].value})},children:[e.jsx("span",{className:q.cycleButtonText,children:(w=ts.find(R=>R.value===t.outputDetail))==null?void 0:w.label},t.outputDetail),e.jsx("span",{className:q.cycleDots,children:ts.map(R=>e.jsx("span",{className:`${q.cycleDot} ${t.outputDetail===R.value?q.active:""}`},R.value))})]})]}),e.jsxs("div",{className:`${q.settingsRow} ${q.settingsRowMarginTop} ${o?"":q.settingsRowDisabled}`,children:[e.jsxs("div",{className:q.settingsLabel,children:["React Components",e.jsx(yn,{content:o?"Include React component names in annotations":"Disabled — production builds minify component names, making detection unreliable. Use in development mode."})]}),e.jsx(ro,{checked:o&&t.reactEnabled,onChange:R=>n({reactEnabled:R.target.checked}),disabled:!o})]}),e.jsxs("div",{className:`${q.settingsRow} ${q.settingsRowMarginTop}`,children:[e.jsxs("div",{className:q.settingsLabel,children:["Hide Until Restart",e.jsx(yn,{content:"Hides the toolbar until you open a new tab"})]}),e.jsx(ro,{checked:!1,onChange:R=>{R.target.checked&&y()}})]})]}),e.jsx("div",{className:q.divider}),e.jsxs("div",{className:q.settingsSection,children:[e.jsx("div",{className:`${q.settingsLabel} ${q.settingsLabelMarker}`,children:"Marker Color"}),e.jsx("div",{className:q.colorOptions,children:ss.map(R=>e.jsx("button",{className:`${q.colorOption} ${t.annotationColorId===R.id?q.selected:""}`,style:{"--swatch":R.srgb,"--swatch-p3":R.p3},onClick:()=>n({annotationColorId:R.id}),title:R.label,type:"button"},R.id))})]}),e.jsx("div",{className:q.divider}),e.jsxs("div",{className:q.settingsSection,children:[e.jsx(Sr,{className:"checkbox-field",label:"Clear on copy/send",checked:t.autoClearAfterCopy,onChange:R=>n({autoClearAfterCopy:R.target.checked}),tooltip:"Automatically clear annotations after copying"}),e.jsx(Sr,{className:q.checkboxField,label:"Block page interactions",checked:t.blockInteractions,onChange:R=>n({blockInteractions:R.target.checked})})]}),e.jsx("div",{className:q.divider}),e.jsxs("button",{className:q.settingsNavLink,onClick:()=>g("automations"),children:[e.jsx("span",{children:"Manage MCP & Webhooks"}),e.jsxs("span",{className:q.settingsNavLinkRight,children:[d&&r!=="disconnected"&&e.jsx("span",{className:`${q.mcpNavIndicator} ${q[r]}`}),e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M7.5 12.5L12 8L7.5 3.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})]}),e.jsxs("div",{className:`${q.settingsPage} ${q.automationsPage} ${$==="automations"?q.slideIn:""}`,children:[e.jsxs("button",{className:q.settingsBackButton,onClick:()=>g("main"),children:[e.jsx(rl,{size:16}),e.jsx("span",{children:"Manage MCP & Webhooks"})]}),e.jsx("div",{className:q.divider}),e.jsxs("div",{className:q.settingsSection,children:[e.jsxs("div",{className:q.settingsRow,children:[e.jsxs("span",{className:q.automationHeader,children:["MCP Connection",e.jsx(yn,{content:"Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time."})]}),d&&e.jsx("div",{className:`${q.mcpStatusDot} ${q[r]}`,title:r==="connected"?"Connected":r==="connecting"?"Connecting...":"Disconnected"})]}),e.jsxs("p",{className:q.automationDescription,style:{paddingBottom:6},children:["MCP connection allows agents to receive and act on annotations."," ",e.jsx("a",{href:"https://agentation.dev/mcp",target:"_blank",rel:"noopener noreferrer",className:q.learnMoreLink,children:"Learn more"})]})]}),e.jsx("div",{className:q.divider}),e.jsxs("div",{className:`${q.settingsSection} ${q.settingsSectionGrow}`,children:[e.jsxs("div",{className:q.settingsRow,children:[e.jsxs("span",{className:q.automationHeader,children:["Webhooks",e.jsx(yn,{content:"Send annotation data to any URL endpoint when annotations change. Useful for custom integrations."})]}),e.jsxs("div",{className:q.autoSendContainer,children:[e.jsx("label",{htmlFor:"agentation-auto-send",className:`${q.autoSendLabel} ${t.webhooksEnabled?q.active:""} ${t.webhookUrl?"":q.disabled}`,children:"Auto-Send"}),e.jsx(ro,{id:"agentation-auto-send",checked:t.webhooksEnabled,onChange:R=>n({webhooksEnabled:R.target.checked}),disabled:!t.webhookUrl})]})]}),e.jsx("p",{className:q.automationDescription,children:"The webhook URL will receive live annotation changes and annotation data."}),e.jsx("textarea",{className:q.webhookUrlInput,placeholder:"Webhook URL",value:t.webhookUrl,onKeyDown:R=>R.stopPropagation(),onChange:R=>n({webhookUrl:R.target.value})})]})]})]})})}function io(t,n="filtered"){const{name:s,path:i}=Tn(t);if(n==="off")return{name:s,elementName:s,path:i,reactComponents:null};const o=$c(t,{mode:n});return{name:o.path?`${o.path} ${s}`:s,elementName:s,path:i,reactComponents:o.path}}var Nr=!1,lo={outputDetail:"standard",autoClearAfterCopy:!1,annotationColorId:"blue",blockInteractions:!0,reactEnabled:!0,markerClickBehavior:"edit",webhookUrl:"",webhooksEnabled:!0},Ut=t=>{if(!t||!t.trim())return!1;try{const n=new URL(t.trim());return n.protocol==="http:"||n.protocol==="https:"}catch{return!1}},ss=[{id:"indigo",label:"Indigo",srgb:"#6155F5",p3:"color(display-p3 0.38 0.33 0.96)"},{id:"blue",label:"Blue",srgb:"#0088FF",p3:"color(display-p3 0.00 0.53 1.00)"},{id:"cyan",label:"Cyan",srgb:"#00C3D0",p3:"color(display-p3 0.00 0.76 0.82)"},{id:"green",label:"Green",srgb:"#34C759",p3:"color(display-p3 0.20 0.78 0.35)"},{id:"yellow",label:"Yellow",srgb:"#FFCC00",p3:"color(display-p3 1.00 0.80 0.00)"},{id:"orange",label:"Orange",srgb:"#FF8D28",p3:"color(display-p3 1.00 0.55 0.16)"},{id:"red",label:"Red",srgb:"#FF383C",p3:"color(display-p3 1.00 0.22 0.24)"}],nd=()=>{if(typeof document>"u"||document.getElementById("agentation-color-tokens"))return;const t=document.createElement("style");t.id="agentation-color-tokens",t.textContent=[...ss.map(n=>`
      [data-agentation-accent="${n.id}"] {
        --agentation-color-accent: ${n.srgb};
      }

      @supports (color: color(display-p3 0 0 0)) {
        [data-agentation-accent="${n.id}"] {
          --agentation-color-accent: ${n.p3};
        }
      }
    `),`:root {
      ${ss.map(n=>`--agentation-color-${n.id}: ${n.srgb};`).join(`
`)}
    }`,`@supports (color: color(display-p3 0 0 0)) {
      :root {
        ${ss.map(n=>`--agentation-color-${n.id}: ${n.p3};`).join(`
`)}
      }
    }`].join(""),document.head.appendChild(t)};nd();function xn(t,n){let s=document.elementFromPoint(t,n);if(!s)return null;for(;s!=null&&s.shadowRoot;){const i=s.shadowRoot.elementFromPoint(t,n);if(!i||i===s)break;s=i}return s}function ao(t){let n=t;for(;n&&n!==document.body;){const i=window.getComputedStyle(n).position;if(i==="fixed"||i==="sticky")return!0;n=n.parentElement}return!1}function gn(t){return t.status!=="resolved"&&t.status!=="dismissed"}function Ns(t){const n=xo(t),s=n.found?n:Wc(t);if(s.found&&s.source)return zc(s.source,"path")}function sd({demoAnnotations:t,demoDelay:n=1e3,enableDemoMode:s=!1,onAnnotationAdd:i,onAnnotationDelete:o,onAnnotationUpdate:r,onAnnotationsClear:d,onCopy:p,onSubmit:m,copyToClipboard:$=!0,endpoint:g,sessionId:y,onSessionCreated:w,webhookUrl:R,className:k}={}){var qo,Vo,Go,Ko,Jo,Zo;const[B,X]=a.useState(!1),[A,me]=a.useState([]),[Pe,I]=a.useState(!0),[ne,he]=a.useState(()=>pc()),[z,je]=a.useState(!1),Le=a.useRef(null);a.useEffect(()=>{const l=h=>{const u=Le.current;u&&u.contains(h.target)&&h.stopPropagation()},_=["mousedown","click","pointerdown"];return _.forEach(h=>document.body.addEventListener(h,l)),()=>{_.forEach(h=>document.body.removeEventListener(h,l))}},[]);const[be,_e]=a.useState(!1),[Fe,Ue]=a.useState(!1),[pe,$e]=a.useState(null),[J,it]=a.useState({x:0,y:0}),[P,ue]=a.useState(null),[Ae,Je]=a.useState(!1),[yt,gt]=a.useState("idle"),[Gt,Lt]=a.useState(!1),[Kt,Tt]=a.useState(!1),[Xt,Jt]=a.useState(null),[Zt,Nt]=a.useState(null),[Ze,bt]=a.useState([]),[ft,en]=a.useState(null),[Qt,tn]=a.useState(null),[S,Z]=a.useState(null),[xe,ae]=a.useState(null),[Ee,ke]=a.useState([]),[Re,we]=a.useState(0),[ze,et]=a.useState(!1),[ee,f]=a.useState(!1),[b,N]=a.useState(!1),[L,K]=a.useState(!1),[V,D]=a.useState(!1),[Me,fe]=a.useState("main"),[Be,ie]=a.useState(!1),[Q,Te]=a.useState(!1),[He,lt]=a.useState(!1),[Y,De]=a.useState([]),[Ce,ve]=a.useState(null),at=a.useRef(!1),[se,We]=a.useState(!1),[ut,kt]=a.useState(!1),[wt,wn]=a.useState(1),[qt,Mt]=a.useState("new-page"),[nt,Dt]=a.useState(""),[Et,vn]=a.useState(!1),[F,Rt]=a.useState(null),Ts=a.useRef(!1),Ds=a.useRef({rearrange:null,placements:[]}),an=a.useRef({rearrange:null,placements:[]}),[ai,ko]=a.useState(0),[ci,di]=a.useState(0),[_i,Ps]=a.useState(0),[ui,jo]=a.useState(0),An=a.useRef(new Set),is=a.useRef(new Set),Pt=a.useRef(null),ls=a.useRef(),Co=Q&&B&&!He&&se;a.useEffect(()=>{if(Co){kt(!1);const l=Bn(()=>{kt(!0)});return()=>cancelAnimationFrame(l)}else kt(!1)},[Co]);const zn=a.useRef(new Map),Wn=a.useRef(new Map),On=a.useRef(),[At,As]=a.useState(!1),[Bt,hi]=a.useState([]),mi=a.useRef(Bt);mi.current=Bt;const[So,L_]=a.useState(null),zs=a.useRef(null);a.useRef(!1),a.useRef([]),a.useRef(0),a.useRef(null),a.useRef(null),a.useRef(1);const[No,Mo]=a.useState(!1),kn=a.useRef(null),[ct,jn]=a.useState([]),Ot=a.useRef({cmd:!1,shift:!1}),vt=()=>{ie(!0)},pi=()=>{ie(!1)},xi=()=>{No||(kn.current=re(()=>Mo(!0),850))},gi=()=>{kn.current&&(clearTimeout(kn.current),kn.current=null),Mo(!1),pi()};a.useEffect(()=>()=>{kn.current&&clearTimeout(kn.current)},[]);const[Ie,fi]=a.useState(()=>{try{const l=JSON.parse(localStorage.getItem("feedback-toolbar-settings")??"");return{...lo,...l,annotationColorId:ss.find(_=>_.id===l.annotationColorId)?l.annotationColorId:lo.annotationColorId}}catch{return lo}}),[Ft,$o]=a.useState(!0),[Io,Lo]=a.useState(!1),yi=()=>{var l;(l=Le.current)==null||l.classList.add(E.disableTransitions),$o(_=>!_),Bn(()=>{var _;(_=Le.current)==null||_.classList.remove(E.disableTransitions)})},bi=!1,cn="off",[ht,Ws]=a.useState(y??null),Eo=a.useRef(!1),[zt,dn]=a.useState(g?"connecting":"disconnected"),[Ve,Os]=a.useState(null),[_n,Ro]=a.useState(!1),[Cn,Bo]=a.useState(null),Fs=a.useRef(!1),[To,Fn]=a.useState(new Set),[Do,as]=a.useState(new Set),[Hn,cs]=a.useState(!1),[wi,Sn]=a.useState(!1),[Vt,Po]=a.useState(!1),Nn=a.useRef(null),Ht=a.useRef(null),Yn=a.useRef(null),Un=a.useRef(null),ds=a.useRef(!1),Ao=a.useRef(0),_s=a.useRef(null),zo=a.useRef(null),Hs=8,vi=50,Wo=a.useRef(null),Oo=a.useRef(null),Xn=a.useRef(null),le=typeof window<"u"?window.location.pathname:"/";a.useEffect(()=>{if(L)D(!0);else{ie(!1),fe("main");const l=re(()=>D(!1),0);return()=>clearTimeout(l)}},[L]);const Ys=B&&Pe&&!Q;a.useEffect(()=>{if(Ys){Ue(!1),_e(!0),Fn(new Set);const l=re(()=>{Fn(_=>{const h=new Set(_);return A.forEach(u=>h.add(u.id)),h})},350);return()=>clearTimeout(l)}else if(be){Ue(!0);const l=re(()=>{_e(!1),Ue(!1)},250);return()=>clearTimeout(l)}},[Ys]),a.useEffect(()=>{f(!0),we(window.scrollY);const l=eo(le);me(l.filter(gn)),Nr||(Lo(!0),Nr=!0,re(()=>Lo(!1),750));try{const _=localStorage.getItem("feedback-toolbar-theme");_!==null&&$o(_==="dark")}catch{}try{const _=localStorage.getItem("feedback-toolbar-position");if(_){const h=JSON.parse(_);typeof h.x=="number"&&typeof h.y=="number"&&Os(h)}}catch{}},[le]),a.useEffect(()=>{ee&&localStorage.setItem("feedback-toolbar-settings",JSON.stringify(Ie))},[Ie,ee]),a.useEffect(()=>{ee&&localStorage.setItem("feedback-toolbar-theme",Ft?"dark":"light")},[Ft,ee]);const Fo=a.useRef(!1);a.useEffect(()=>{const l=Fo.current;Fo.current=_n,l&&!_n&&Ve&&ee&&localStorage.setItem("feedback-toolbar-position",JSON.stringify(Ve))},[_n,Ve,ee]),a.useEffect(()=>{if(!g||!ee||Eo.current)return;Eo.current=!0,dn("connecting"),(async()=>{try{const _=hc(le),h=y||_;let u=!1;if(h)try{const x=await fr(g,h);Ws(x.id),dn("connected"),to(le,x.id),u=!0;const v=eo(le),T=new Set(x.annotations.map(O=>O.id)),W=v.filter(O=>!T.has(O.id));if(W.length>0){const G=`${typeof window<"u"?window.location.origin:""}${le}`,ce=(await Promise.allSettled(W.map(oe=>Ln(g,x.id,{...oe,sessionId:x.id,url:G})))).map((oe,U)=>oe.status==="fulfilled"?oe.value:(console.warn("[Agentation] Failed to sync annotation:",oe.reason),W[U])),Se=[...x.annotations,...ce];me(Se.filter(gn)),Jn(le,Se.filter(gn),x.id)}else me(x.annotations.filter(gn)),Jn(le,x.annotations.filter(gn),x.id)}catch(x){console.warn("[Agentation] Could not join session, creating new:",x),mc(le)}if(!u){const x=typeof window<"u"?window.location.href:"/",v=await no(g,x);Ws(v.id),dn("connected"),to(le,v.id),w==null||w(v.id);const T=rc(),W=typeof window<"u"?window.location.origin:"",O=[];for(const[G,te]of T){const ce=te.filter(U=>!U._syncedTo);if(ce.length===0)continue;const Se=`${W}${G}`,oe=G===le;O.push((async()=>{try{const U=oe?v:await no(g,Se),dt=(await Promise.allSettled(ce.map(Oe=>Ln(g,U.id,{...Oe,sessionId:U.id,url:Se})))).map((Oe,ot)=>Oe.status==="fulfilled"?Oe.value:(console.warn("[Agentation] Failed to sync annotation:",Oe.reason),ce[ot])).filter(gn);if(Jn(G,dt,U.id),oe){const Oe=new Set(ce.map(ot=>ot.id));me(ot=>{const de=ot.filter(ye=>!Oe.has(ye.id));return[...dt,...de]})}}catch(U){console.warn(`[Agentation] Failed to sync annotations for ${G}:`,U)}})())}await Promise.allSettled(O)}}catch(_){dn("disconnected"),console.warn("[Agentation] Failed to initialize session, using local storage:",_)}})()},[g,y,ee,w,le]),a.useEffect(()=>{if(!g||!ee)return;const l=async()=>{try{(await fetch(`${g}/health`)).ok?dn("connected"):dn("disconnected")}catch{dn("disconnected")}};l();const _=al(l,1e4);return()=>clearInterval(_)},[g,ee]),a.useEffect(()=>{if(!g||!ee||!ht)return;const l=new EventSource(`${g}/sessions/${ht}/events`),_=["resolved","dismissed"],h=u=>{var x;try{const v=JSON.parse(u.data);if(_.includes((x=v.payload)==null?void 0:x.status)){const T=v.payload.id,W=v.payload.kind;if(W==="placement"){for(const[O,G]of zn.current)if(G===T){zn.current.delete(O),De(te=>te.filter(ce=>ce.id!==O));break}}else if(W==="rearrange"){for(const[O,G]of Wn.current)if(G===T){Wn.current.delete(O),Rt(te=>{if(!te)return null;const ce=te.sections.filter(Se=>Se.id!==O);return ce.length===0?null:{...te,sections:ce}});break}}else as(O=>new Set(O).add(T)),re(()=>{me(O=>O.filter(G=>G.id!==T)),as(O=>{const G=new Set(O);return G.delete(T),G})},150)}}catch{}};return l.addEventListener("annotation.updated",h),()=>{l.removeEventListener("annotation.updated",h),l.close()}},[g,ee,ht]),a.useEffect(()=>{if(!g||!ee)return;const l=zo.current==="disconnected",_=zt==="connected";zo.current=zt,l&&_&&(async()=>{try{const u=eo(le);if(u.length===0)return;const v=`${typeof window<"u"?window.location.origin:""}${le}`;let T=ht,W=[];if(T)try{W=(await fr(g,T)).annotations}catch{T=null}T||(T=(await no(g,v)).id,Ws(T),to(le,T));const O=new Set(W.map(te=>te.id)),G=u.filter(te=>!O.has(te.id));if(G.length>0){const ce=(await Promise.allSettled(G.map(U=>Ln(g,T,{...U,sessionId:T,url:v})))).map((U,st)=>U.status==="fulfilled"?U.value:(console.warn("[Agentation] Failed to sync annotation on reconnect:",U.reason),G[st])),oe=[...W,...ce].filter(gn);me(oe),Jn(le,oe,T)}}catch(u){console.warn("[Agentation] Failed to sync on reconnect:",u)}})()},[zt,g,ee,ht,le]);const ki=a.useCallback(()=>{z||(je(!0),K(!1),X(!1),re(()=>{xc(!0),he(!0),je(!1)},400))},[z]);a.useEffect(()=>{if(!s||!ee||!t||t.length===0||A.length>0)return;const l=[];return l.push(re(()=>{X(!0)},n-200)),t.forEach((_,h)=>{const u=n+h*300;l.push(re(()=>{const x=document.querySelector(_.selector);if(!x)return;const v=x.getBoundingClientRect(),{name:T,path:W}=Tn(x),O={id:`demo-${Date.now()}-${h}`,x:(v.left+v.width/2)/window.innerWidth*100,y:v.top+v.height/2+window.scrollY,comment:_.comment,element:T,elementPath:W,timestamp:Date.now(),selectedText:_.selectedText,boundingBox:{x:v.left,y:v.top+window.scrollY,width:v.width,height:v.height},nearbyText:Gn(x),cssClasses:Kn(x)};me(G=>[...G,O])},u))}),()=>{l.forEach(clearTimeout)}},[s,ee,t,n]),a.useEffect(()=>{const l=()=>{we(window.scrollY),et(!0),Xn.current&&clearTimeout(Xn.current),Xn.current=re(()=>{et(!1)},150)};return window.addEventListener("scroll",l,{passive:!0}),()=>{window.removeEventListener("scroll",l),Xn.current&&clearTimeout(Xn.current)}},[]),a.useEffect(()=>{ee&&A.length>0?ht?Jn(le,A,ht):Vr(le,A):ee&&A.length===0&&localStorage.removeItem(Ls(le))},[A,le,ee,ht]),a.useEffect(()=>{if(ee&&!at.current){at.current=!0;const l=ic(le);l.length>0&&De(l)}},[ee,le]),a.useEffect(()=>{ee&&at.current&&!se&&(Y.length>0?lc(le,Y):ac(le))},[Y,le,ee,se]),a.useEffect(()=>{if(ee&&!Ts.current){Ts.current=!0;const l=cc(le);if(l){const _={...l,sections:l.sections.map(h=>({...h,currentRect:h.currentRect??{...h.originalRect}}))};Rt(_)}}},[ee,le]),a.useEffect(()=>{ee&&Ts.current&&!se&&(F?dc(le,F):_c(le))},[F,le,ee,se]);const Us=a.useRef(!1);a.useEffect(()=>{if(ee&&!Us.current){Us.current=!0;const l=uc(le);l&&(an.current={rearrange:l.rearrange,placements:l.placements||[]},l.purpose&&Dt(l.purpose))}},[ee,le]),a.useEffect(()=>{var _,h,u;if(!ee||!Us.current)return;const l=an.current;se?(((_=F==null?void 0:F.sections)==null?void 0:_.length)??0)>0||Y.length>0||nt?gr(le,{rearrange:F,placements:Y,purpose:nt}):js(le):(((u=(h=l.rearrange)==null?void 0:h.sections)==null?void 0:u.length)??0)>0||l.placements.length>0||nt?gr(le,{rearrange:l.rearrange,placements:l.placements,purpose:nt}):js(le)},[F,Y,nt,se,le,ee]),a.useEffect(()=>{Q&&!F&&Rt({sections:[],originalOrder:[],detectedAt:Date.now()})},[Q,F]),a.useEffect(()=>{if(!g||!ht)return;const l=zn.current,_=new Set(Y.map(h=>h.id));for(const h of Y){if(l.has(h.id))continue;l.set(h.id,"");const u=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:le;Ln(g,ht,{id:h.id,x:h.x/window.innerWidth*100,y:h.y,comment:`Place ${h.type} at (${Math.round(h.x)}, ${Math.round(h.y)}), ${h.width}×${h.height}px${h.text?` — "${h.text}"`:""}`,element:`[design:${h.type}]`,elementPath:"[placement]",timestamp:h.timestamp,url:u,intent:"change",severity:"important",kind:"placement",placement:{componentType:h.type,width:h.width,height:h.height,scrollY:h.scrollY,text:h.text}}).then(x=>{l.has(h.id)&&l.set(h.id,x.id)}).catch(x=>{console.warn("[Agentation] Failed to sync placement annotation:",x),l.delete(h.id)})}for(const[h,u]of l)_.has(h)||(l.delete(h),u&&rn(g,u).catch(()=>{}))},[Y,g,ht,le]),a.useEffect(()=>{if(!(!g||!ht))return On.current&&clearTimeout(On.current),On.current=re(()=>{const l=Wn.current;if(!F||F.sections.length===0){for(const[,u]of l)u&&rn(g,u).catch(()=>{});l.clear();return}const _=new Set(F.sections.map(u=>u.id)),h=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:le;for(const u of F.sections){const x=u.originalRect,v=u.currentRect;if(!(Math.abs(x.x-v.x)>1||Math.abs(x.y-v.y)>1||Math.abs(x.width-v.width)>1||Math.abs(x.height-v.height)>1)){const O=l.get(u.id);O&&(l.delete(u.id),rn(g,O).catch(()=>{}));continue}const W=l.get(u.id);W?yr(g,W,{comment:`Move ${u.label} section (${u.tagName}) — from (${Math.round(x.x)},${Math.round(x.y)}) ${Math.round(x.width)}×${Math.round(x.height)} to (${Math.round(v.x)},${Math.round(v.y)}) ${Math.round(v.width)}×${Math.round(v.height)}`}).catch(O=>{console.warn("[Agentation] Failed to update rearrange annotation:",O)}):(l.set(u.id,""),Ln(g,ht,{id:u.id,x:v.x/window.innerWidth*100,y:v.y,comment:`Move ${u.label} section (${u.tagName}) — from (${Math.round(x.x)},${Math.round(x.y)}) ${Math.round(x.width)}×${Math.round(x.height)} to (${Math.round(v.x)},${Math.round(v.y)}) ${Math.round(v.width)}×${Math.round(v.height)}`,element:u.selector,elementPath:"[rearrange]",timestamp:Date.now(),url:h,intent:"change",severity:"important",kind:"rearrange",rearrange:{selector:u.selector,label:u.label,tagName:u.tagName,originalRect:x,currentRect:v}}).then(O=>{l.has(u.id)&&l.set(u.id,O.id)}).catch(O=>{console.warn("[Agentation] Failed to sync rearrange annotation:",O),l.delete(u.id)}))}for(const[u,x]of l)_.has(u)||(l.delete(u),x&&rn(g,x).catch(()=>{}))},300),()=>{On.current&&clearTimeout(On.current)}},[F,g,ht,le]);const Mn=a.useRef(new Map);a.useLayoutEffect(()=>{const l=(F==null?void 0:F.sections)??[],_=new Set;if((Q||He)&&B)for(const h of l){_.add(h.id);try{const u=document.querySelector(h.selector);if(!u)continue;if(!Mn.current.has(h.id)){const x={transform:u.style.transform,transformOrigin:u.style.transformOrigin,opacity:u.style.opacity,position:u.style.position,zIndex:u.style.zIndex,display:u.style.display},v=[];let T=u.parentElement;for(;T&&T!==document.body;){const O=getComputedStyle(T);(O.overflow!=="visible"||O.overflowX!=="visible"||O.overflowY!=="visible")&&(v.push({el:T,overflow:T.style.overflow}),T.style.overflow="visible"),T=T.parentElement}getComputedStyle(u).display==="inline"&&(u.style.display="inline-block"),Mn.current.set(h.id,{el:u,origStyles:x,ancestors:v}),u.style.transformOrigin="top left",u.style.zIndex="9999"}}catch{}}for(const[h,u]of Mn.current)if(!_.has(h)){const{el:x,origStyles:v,ancestors:T}=u;x.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",x.style.transform=v.transform,x.style.transformOrigin=v.transformOrigin,x.style.opacity=v.opacity,x.style.position=v.position,x.style.zIndex=v.zIndex,Mn.current.delete(h),re(()=>{x.style.transition="",x.style.display=v.display;for(const W of T)W.el.style.overflow=W.overflow},450)}},[F,Q,He,B]),a.useEffect(()=>()=>{for(const[,l]of Mn.current){const{el:_,origStyles:h,ancestors:u}=l;_.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",_.style.transform=h.transform,_.style.transformOrigin=h.transformOrigin,_.style.opacity=h.opacity,_.style.position=h.position,_.style.zIndex=h.zIndex,re(()=>{_.style.transition="",_.style.display=h.display;for(const x of u)x.el.style.overflow=x.overflow},450)}Mn.current.clear()},[]);const us=a.useCallback(()=>{lt(!0),Te(!1),ve(null),clearTimeout(ls.current),ls.current=re(()=>{lt(!1)},300)},[]),Ho=a.useCallback(()=>{Q&&(lt(!0),Te(!1),ve(null),clearTimeout(ls.current),ls.current=re(()=>{lt(!1)},300)),X(!1)},[Q]),Yo=a.useCallback(()=>{b||(dl(),N(!0))},[b]),hs=a.useCallback(()=>{b&&(sr(),N(!1))},[b]),Xs=a.useCallback(()=>{b?hs():Yo()},[b,Yo,hs]),Uo=a.useCallback(()=>{if(ct.length===0)return;const l=ct[0],_=l.element,h=ct.length>1,u=ct.map(x=>x.element.getBoundingClientRect());if(h){const x={left:Math.min(...u.map(U=>U.left)),top:Math.min(...u.map(U=>U.top)),right:Math.max(...u.map(U=>U.right)),bottom:Math.max(...u.map(U=>U.bottom))},v=ct.slice(0,5).map(U=>U.name).join(", "),T=ct.length>5?` +${ct.length-5} more`:"",W=u.map(U=>({x:U.left,y:U.top+window.scrollY,width:U.width,height:U.height})),G=ct[ct.length-1].element,te=u[u.length-1],ce=te.left+te.width/2,Se=te.top+te.height/2,oe=ao(G);ue({x:ce/window.innerWidth*100,y:oe?Se:Se+window.scrollY,clientY:Se,element:`${ct.length} elements: ${v}${T}`,elementPath:"multi-select",boundingBox:{x:x.left,y:x.top+window.scrollY,width:x.right-x.left,height:x.bottom-x.top},isMultiSelect:!0,isFixed:oe,elementBoundingBoxes:W,multiSelectElements:ct.map(U=>U.element),targetElement:G,fullPath:ws(_),accessibility:bs(_),computedStyles:ys(_),computedStylesObj:fs(_),nearbyElements:gs(_),cssClasses:Kn(_),nearbyText:Gn(_),sourceFile:Ns(_)})}else{const x=u[0],v=ao(_);ue({x:x.left/window.innerWidth*100,y:v?x.top:x.top+window.scrollY,clientY:x.top,element:l.name,elementPath:l.path,boundingBox:{x:x.left,y:v?x.top:x.top+window.scrollY,width:x.width,height:x.height},isFixed:v,fullPath:ws(_),accessibility:bs(_),computedStyles:ys(_),computedStylesObj:fs(_),nearbyElements:gs(_),cssClasses:Kn(_),nearbyText:Gn(_),reactComponents:l.reactComponents,sourceFile:Ns(_)})}jn([]),$e(null)},[ct]);a.useEffect(()=>{B||(ue(null),Z(null),ae(null),ke([]),$e(null),K(!1),jn([]),Ot.current={cmd:!1,shift:!1},b&&hs())},[B,b,hs]),a.useEffect(()=>()=>{sr()},[]),a.useEffect(()=>{if(!B)return;const l=["p","span","h1","h2","h3","h4","h5","h6","li","td","th","label","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","u","s","a","time","address","cite","q","abbr","dfn","mark","small","sub","sup","[contenteditable]"].join(", "),_=":not([data-agentation-root]):not([data-agentation-root] *)",h=document.createElement("style");return h.id="feedback-cursor-styles",h.textContent=`
      body ${_} {
        cursor: crosshair !important;
      }

      body :is(${l})${_} {
        cursor: text !important;
      }
    `,document.head.appendChild(h),()=>{const u=document.getElementById("feedback-cursor-styles");u&&u.remove()}},[B]),a.useEffect(()=>{if(So!==null&&B)return document.documentElement.setAttribute("data-drawing-hover",""),()=>document.documentElement.removeAttribute("data-drawing-hover")},[So,B]),a.useEffect(()=>{if(!B||P||At||Q)return;const l=_=>{const h=_.composedPath()[0]||_.target;if(Ct(h,"[data-feedback-toolbar]")){$e(null);return}const u=xn(_.clientX,_.clientY);if(!u||Ct(u,"[data-feedback-toolbar]")){$e(null);return}const{name:x,elementName:v,path:T,reactComponents:W}=io(u,cn),O=u.getBoundingClientRect();$e({element:x,elementName:v,elementPath:T,rect:O,reactComponents:W}),it({x:_.clientX,y:_.clientY})};return document.addEventListener("mousemove",l),()=>document.removeEventListener("mousemove",l)},[B,P,At,Q,cn,Bt]);const ms=a.useCallback(l=>{var _;if(Z(l),Jt(null),Nt(null),bt([]),(_=l.elementBoundingBoxes)!=null&&_.length){const h=[];for(const u of l.elementBoundingBoxes){const x=u.x+u.width/2,v=u.y+u.height/2-window.scrollY,T=xn(x,v);T&&h.push(T)}ke(h),ae(null)}else if(l.boundingBox){const h=l.boundingBox,u=h.x+h.width/2,x=l.isFixed?h.y+h.height/2:h.y+h.height/2-window.scrollY,v=xn(u,x);if(v){const T=v.getBoundingClientRect(),W=T.width/h.width,O=T.height/h.height;W<.5||O<.5?ae(null):ae(v)}else ae(null);ke([])}else ae(null),ke([])},[]);a.useEffect(()=>{if(!B||At||Q)return;const l=_=>{var Ke,dt;if(ds.current){ds.current=!1;return}const h=_.composedPath()[0]||_.target;if(Ct(h,"[data-feedback-toolbar]")||Ct(h,"[data-annotation-popup]")||Ct(h,"[data-annotation-marker]"))return;if(_.metaKey&&_.shiftKey&&!P&&!S){_.preventDefault(),_.stopPropagation();const Oe=xn(_.clientX,_.clientY);if(!Oe)return;const ot=Oe.getBoundingClientRect(),{name:de,path:ye,reactComponents:mt}=io(Oe,cn),tt=ct.findIndex(jt=>jt.element===Oe);tt>=0?jn(jt=>jt.filter(($t,pt)=>pt!==tt)):jn(jt=>[...jt,{element:Oe,rect:ot,name:de,path:ye,reactComponents:mt??void 0}]);return}const u=Ct(h,"button, a, input, select, textarea, [role='button'], [onclick]");if(Ie.blockInteractions&&u&&(_.preventDefault(),_.stopPropagation()),P){if(u&&!Ie.blockInteractions)return;_.preventDefault(),(Ke=Wo.current)==null||Ke.shake();return}if(S){if(u&&!Ie.blockInteractions)return;_.preventDefault(),(dt=Oo.current)==null||dt.shake();return}_.preventDefault();const x=xn(_.clientX,_.clientY);if(!x)return;const{name:v,path:T,reactComponents:W}=io(x,cn),O=x.getBoundingClientRect(),G=_.clientX/window.innerWidth*100,te=ao(x),ce=te?_.clientY:_.clientY+window.scrollY,Se=window.getSelection();let oe;Se&&Se.toString().trim().length>0&&(oe=Se.toString().trim().slice(0,500));const U=fs(x),st=ys(x);ue({x:G,y:ce,clientY:_.clientY,element:v,elementPath:T,selectedText:oe,boundingBox:{x:O.left,y:te?O.top:O.top+window.scrollY,width:O.width,height:O.height},nearbyText:Gn(x),cssClasses:Kn(x),isFixed:te,fullPath:ws(x),accessibility:bs(x),computedStyles:st,computedStylesObj:U,nearbyElements:gs(x),reactComponents:W??void 0,sourceFile:Ns(x),targetElement:x}),$e(null)};return document.addEventListener("click",l,!0),()=>document.removeEventListener("click",l,!0)},[B,At,Q,P,S,Ie.blockInteractions,cn,ct]),a.useEffect(()=>{if(!B)return;const l=u=>{u.key==="Meta"&&(Ot.current.cmd=!0),u.key==="Shift"&&(Ot.current.shift=!0)},_=u=>{const x=Ot.current.cmd&&Ot.current.shift;u.key==="Meta"&&(Ot.current.cmd=!1),u.key==="Shift"&&(Ot.current.shift=!1);const v=Ot.current.cmd&&Ot.current.shift;x&&!v&&ct.length>0&&Uo()},h=()=>{Ot.current={cmd:!1,shift:!1},jn([])};return document.addEventListener("keydown",l),document.addEventListener("keyup",_),window.addEventListener("blur",h),()=>{document.removeEventListener("keydown",l),document.removeEventListener("keyup",_),window.removeEventListener("blur",h)}},[B,ct,Uo]),a.useEffect(()=>{if(!B||P||At||Q)return;const l=_=>{const h=_.composedPath()[0]||_.target;Ct(h,"[data-feedback-toolbar]")||Ct(h,"[data-annotation-marker]")||Ct(h,"[data-annotation-popup]")||new Set(["P","SPAN","H1","H2","H3","H4","H5","H6","LI","TD","TH","LABEL","BLOCKQUOTE","FIGCAPTION","CAPTION","LEGEND","DT","DD","PRE","CODE","EM","STRONG","B","I","U","S","A","TIME","ADDRESS","CITE","Q","ABBR","DFN","MARK","SMALL","SUB","SUP"]).has(h.tagName)||h.isContentEditable||(_.preventDefault(),Nn.current={x:_.clientX,y:_.clientY})};return document.addEventListener("mousedown",l),()=>document.removeEventListener("mousedown",l)},[B,P,At,Q]),a.useEffect(()=>{if(!B||P)return;const l=_=>{if(!Nn.current)return;const h=_.clientX-Nn.current.x,u=_.clientY-Nn.current.y,x=h*h+u*u,v=Hs*Hs;if(!Vt&&x>=v&&(Ht.current=Nn.current,Po(!0),_.preventDefault()),(Vt||x>=v)&&Ht.current){if(Yn.current){const de=Math.min(Ht.current.x,_.clientX),ye=Math.min(Ht.current.y,_.clientY),mt=Math.abs(_.clientX-Ht.current.x),tt=Math.abs(_.clientY-Ht.current.y);Yn.current.style.transform=`translate(${de}px, ${ye}px)`,Yn.current.style.width=`${mt}px`,Yn.current.style.height=`${tt}px`}const T=Date.now();if(T-Ao.current<vi)return;Ao.current=T;const W=Ht.current.x,O=Ht.current.y,G=Math.min(W,_.clientX),te=Math.min(O,_.clientY),ce=Math.max(W,_.clientX),Se=Math.max(O,_.clientY),oe=(G+ce)/2,U=(te+Se)/2,st=new Set,Ke=[[G,te],[ce,te],[G,Se],[ce,Se],[oe,U],[oe,te],[oe,Se],[G,U],[ce,U]];for(const[de,ye]of Ke){const mt=document.elementsFromPoint(de,ye);for(const tt of mt)tt instanceof HTMLElement&&st.add(tt)}const dt=document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav");for(const de of dt)if(de instanceof HTMLElement){const ye=de.getBoundingClientRect(),mt=ye.left+ye.width/2,tt=ye.top+ye.height/2,jt=mt>=G&&mt<=ce&&tt>=te&&tt<=Se,$t=Math.min(ye.right,ce)-Math.max(ye.left,G),pt=Math.min(ye.bottom,Se)-Math.max(ye.top,te),qn=$t>0&&pt>0?$t*pt:0,hn=ye.width*ye.height,nn=hn>0?qn/hn:0;(jt||nn>.5)&&st.add(de)}const Oe=[],ot=new Set(["BUTTON","A","INPUT","IMG","P","H1","H2","H3","H4","H5","H6","LI","LABEL","TD","TH","SECTION","ARTICLE","ASIDE","NAV"]);for(const de of st){if(Ct(de,"[data-feedback-toolbar]")||Ct(de,"[data-annotation-marker]"))continue;const ye=de.getBoundingClientRect();if(!(ye.width>window.innerWidth*.8&&ye.height>window.innerHeight*.5)&&!(ye.width<10||ye.height<10)&&ye.left<ce&&ye.right>G&&ye.top<Se&&ye.bottom>te){const mt=de.tagName;let tt=ot.has(mt);if(!tt&&(mt==="DIV"||mt==="SPAN")){const jt=de.textContent&&de.textContent.trim().length>0,$t=de.onclick!==null||de.getAttribute("role")==="button"||de.getAttribute("role")==="link"||de.classList.contains("clickable")||de.hasAttribute("data-clickable");(jt||$t)&&!de.querySelector("p, h1, h2, h3, h4, h5, h6, button, a")&&(tt=!0)}if(tt){let jt=!1;for(const $t of Oe)if($t.left<=ye.left&&$t.right>=ye.right&&$t.top<=ye.top&&$t.bottom>=ye.bottom){jt=!0;break}jt||Oe.push(ye)}}}if(Un.current){const de=Un.current;for(;de.children.length>Oe.length;)de.removeChild(de.lastChild);Oe.forEach((ye,mt)=>{let tt=de.children[mt];tt||(tt=document.createElement("div"),tt.className=E.selectedElementHighlight,de.appendChild(tt)),tt.style.transform=`translate(${ye.left}px, ${ye.top}px)`,tt.style.width=`${ye.width}px`,tt.style.height=`${ye.height}px`})}}};return document.addEventListener("mousemove",l,{passive:!0}),()=>document.removeEventListener("mousemove",l)},[B,P,Vt,Hs]),a.useEffect(()=>{if(!B)return;const l=_=>{const h=Vt,u=Ht.current;if(Vt&&u){ds.current=!0;const x=Math.min(u.x,_.clientX),v=Math.min(u.y,_.clientY),T=Math.max(u.x,_.clientX),W=Math.max(u.y,_.clientY),O=[];document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th").forEach(oe=>{if(!(oe instanceof HTMLElement)||Ct(oe,"[data-feedback-toolbar]")||Ct(oe,"[data-annotation-marker]"))return;const U=oe.getBoundingClientRect();U.width>window.innerWidth*.8&&U.height>window.innerHeight*.5||U.width<10||U.height<10||U.left<T&&U.right>x&&U.top<W&&U.bottom>v&&O.push({element:oe,rect:U})});const te=O.filter(({element:oe})=>!O.some(({element:U})=>U!==oe&&oe.contains(U))),ce=_.clientX/window.innerWidth*100,Se=_.clientY+window.scrollY;if(te.length>0){const oe=te.reduce((ot,{rect:de})=>({left:Math.min(ot.left,de.left),top:Math.min(ot.top,de.top),right:Math.max(ot.right,de.right),bottom:Math.max(ot.bottom,de.bottom)}),{left:1/0,top:1/0,right:-1/0,bottom:-1/0}),U=te.slice(0,5).map(({element:ot})=>Tn(ot).name).join(", "),st=te.length>5?` +${te.length-5} more`:"",Ke=te[0].element,dt=fs(Ke),Oe=ys(Ke);ue({x:ce,y:Se,clientY:_.clientY,element:`${te.length} elements: ${U}${st}`,elementPath:"multi-select",boundingBox:{x:oe.left,y:oe.top+window.scrollY,width:oe.right-oe.left,height:oe.bottom-oe.top},isMultiSelect:!0,fullPath:ws(Ke),accessibility:bs(Ke),computedStyles:Oe,computedStylesObj:dt,nearbyElements:gs(Ke),cssClasses:Kn(Ke),nearbyText:Gn(Ke),sourceFile:Ns(Ke)})}else{const oe=Math.abs(T-x),U=Math.abs(W-v);oe>20&&U>20&&ue({x:ce,y:Se,clientY:_.clientY,element:"Area selection",elementPath:`region at (${Math.round(x)}, ${Math.round(v)})`,boundingBox:{x,y:v+window.scrollY,width:oe,height:U},isMultiSelect:!0})}$e(null)}else h&&(ds.current=!0);Nn.current=null,Ht.current=null,Po(!1),Un.current&&(Un.current.innerHTML="")};return document.addEventListener("mouseup",l),()=>document.removeEventListener("mouseup",l)},[B,Vt]);const Yt=a.useCallback(async(l,_,h)=>{const u=Ie.webhookUrl||R;if(!u||!Ie.webhooksEnabled&&!h)return!1;try{return(await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:l,timestamp:Date.now(),url:typeof window<"u"?window.location.href:void 0,..._})})).ok}catch(x){return console.warn("[Agentation] Webhook failed:",x),!1}},[R,Ie.webhookUrl,Ie.webhooksEnabled]),ji=a.useCallback(l=>{var h;if(!P)return;const _={id:Date.now().toString(),x:P.x,y:P.y,comment:l,element:P.element,elementPath:P.elementPath,timestamp:Date.now(),selectedText:P.selectedText,boundingBox:P.boundingBox,nearbyText:P.nearbyText,cssClasses:P.cssClasses,isMultiSelect:P.isMultiSelect,isFixed:P.isFixed,fullPath:P.fullPath,accessibility:P.accessibility,computedStyles:P.computedStyles,nearbyElements:P.nearbyElements,reactComponents:P.reactComponents,sourceFile:P.sourceFile,elementBoundingBoxes:P.elementBoundingBoxes,...g&&ht?{sessionId:ht,url:typeof window<"u"?window.location.href:void 0,status:"pending"}:{}};me(u=>[...u,_]),_s.current=_.id,re(()=>{_s.current=null},300),re(()=>{Fn(u=>new Set(u).add(_.id))},250),i==null||i(_),Yt("annotation.add",{annotation:_}),cs(!0),re(()=>{ue(null),cs(!1)},150),(h=window.getSelection())==null||h.removeAllRanges(),g&&ht&&Ln(g,ht,_).then(u=>{u.id!==_.id&&(me(x=>x.map(v=>v.id===_.id?{...v,id:u.id}:v)),Fn(x=>{const v=new Set(x);return v.delete(_.id),v.add(u.id),v}))}).catch(u=>{console.warn("[Agentation] Failed to sync annotation:",u)})},[P,i,Yt,g,ht]),Qs=a.useCallback(()=>{cs(!0),re(()=>{ue(null),cs(!1)},150)},[]),qs=a.useCallback(l=>{const _=A.findIndex(u=>u.id===l),h=A[_];(S==null?void 0:S.id)===l&&(Sn(!0),re(()=>{Z(null),ae(null),ke([]),Sn(!1)},150)),en(l),as(u=>new Set(u).add(l)),h&&(o==null||o(h),Yt("annotation.delete",{annotation:h})),g&&rn(g,l).catch(u=>{console.warn("[Agentation] Failed to delete annotation from server:",u)}),re(()=>{me(u=>u.filter(x=>x.id!==l)),as(u=>{const x=new Set(u);return x.delete(l),x}),en(null),_<A.length-1&&(tn(_),re(()=>tn(null),200))},150)},[A,S,o,Yt,g]),ps=a.useCallback(l=>{var _;if(!l){Jt(null),Nt(null),bt([]);return}if(Jt(l.id),(_=l.elementBoundingBoxes)!=null&&_.length){const h=[];for(const u of l.elementBoundingBoxes){const x=u.x+u.width/2,v=u.y+u.height/2-window.scrollY,W=document.elementsFromPoint(x,v).find(O=>!O.closest("[data-annotation-marker]")&&!O.closest("[data-agentation-root]"));W&&h.push(W)}bt(h),Nt(null)}else if(l.boundingBox){const h=l.boundingBox,u=h.x+h.width/2,x=l.isFixed?h.y+h.height/2:h.y+h.height/2-window.scrollY,v=xn(u,x);if(v){const T=v.getBoundingClientRect(),W=T.width/h.width,O=T.height/h.height;W<.5||O<.5?Nt(null):Nt(v)}else Nt(null);bt([])}else Nt(null),bt([])},[]),Ci=a.useCallback(l=>{if(!S)return;const _={...S,comment:l};me(h=>h.map(u=>u.id===S.id?_:u)),r==null||r(_),Yt("annotation.update",{annotation:_}),g&&yr(g,S.id,{comment:l}).catch(h=>{console.warn("[Agentation] Failed to update annotation on server:",h)}),Sn(!0),re(()=>{Z(null),ae(null),ke([]),Sn(!1)},150)},[S,r,Yt,g]),Si=a.useCallback(()=>{Sn(!0),re(()=>{Z(null),ae(null),ke([]),Sn(!1)},150)},[]),un=a.useCallback(()=>{const l=A.length,_=Y.length>0||!!F;if(l===0&&Bt.length===0&&!_)return;if(d==null||d(A),Yt("annotations.clear",{annotations:A}),g){Promise.all(A.map(x=>rn(g,x.id).catch(v=>{console.warn("[Agentation] Failed to delete annotation from server:",v)})));for(const[,x]of zn.current)x&&rn(g,x).catch(()=>{});zn.current.clear();for(const[,x]of Wn.current)x&&rn(g,x).catch(()=>{});Wn.current.clear()}Tt(!0),Lt(!0),hi([]);const h=zs.current;if(h){const x=h.getContext("2d");x&&x.clearRect(0,0,h.width,h.height)}(Y.length>0||F)&&(Ps(x=>x+1),jo(x=>x+1),re(()=>{De([]),Rt(null)},200)),se&&We(!1),nt&&Dt(""),an.current={rearrange:null,placements:[]},js(le);const u=l*30+200;re(()=>{me([]),Fn(new Set),localStorage.removeItem(Ls(le)),Tt(!1)},u),re(()=>Lt(!1),1500)},[le,A,Bt,Y,F,se,nt,d,Yt,g]),Vs=a.useCallback(async()=>{const l=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:le,_=Q&&se;let h;if(_){if(Y.length===0&&!F&&!nt)return;h=""}else{if(h=vr(A,l,Ie.outputDetail),!h&&Bt.length===0&&Y.length===0&&!F)return;h||(h=`## Page Feedback: ${l}
`)}if(!_&&Bt.length>0){const u=new Set;for(const W of A)W.drawingIndex!=null&&u.add(W.drawingIndex);const x=zs.current;x&&(x.style.visibility="hidden");const v=[],T=window.scrollY;for(let W=0;W<Bt.length;W++){if(u.has(W))continue;const O=Bt[W];if(O.points.length<2)continue;const G=O.fixed?O.points:O.points.map(_t=>({x:_t.x,y:_t.y-T}));let te=1/0,ce=1/0,Se=-1/0,oe=-1/0;for(const _t of G)te=Math.min(te,_t.x),ce=Math.min(ce,_t.y),Se=Math.max(Se,_t.x),oe=Math.max(oe,_t.y);const U=Se-te,st=oe-ce,Ke=Math.hypot(U,st),dt=G[0],Oe=G[G.length-1],ot=Math.hypot(Oe.x-dt.x,Oe.y-dt.y);let de;const ye=ot<Ke*.35,mt=U/Math.max(st,1);if(ye&&Ke>20){const _t=Math.max(U,st)*.15;let sn=0;for(const mn of G){const $i=mn.x-te<_t,Ii=Se-mn.x<_t,Li=mn.y-ce<_t,Ei=oe-mn.y<_t;($i||Ii)&&(Li||Ei)&&sn++}de=sn>G.length*.15?"box":"circle"}else mt>3&&st<40?de="underline":ot>Ke*.5?de="arrow":de="drawing";const tt=Math.min(10,G.length),jt=Math.max(1,Math.floor(G.length/tt)),$t=new Set,pt=[],qn=[dt];for(let _t=jt;_t<G.length-1;_t+=jt)qn.push(G[_t]);qn.push(Oe);for(const _t of qn){const sn=xn(_t.x,_t.y);if(!sn||$t.has(sn)||Ct(sn,"[data-feedback-toolbar]"))continue;$t.add(sn);const{name:mn}=Tn(sn);pt.includes(mn)||pt.push(mn)}const hn=`${Math.round(te)},${Math.round(ce)} → ${Math.round(Se)},${Math.round(oe)}`;let nn;(de==="circle"||de==="box")&&pt.length>0?nn=`${de==="box"?"Boxed":"Circled"} **${pt[0]}**${pt.length>1?` (and ${pt.slice(1).join(", ")})`:""} (region: ${hn})`:de==="underline"&&pt.length>0?nn=`Underlined **${pt[0]}** (${hn})`:de==="arrow"&&pt.length>=2?nn=`Arrow from **${pt[0]}** to **${pt[pt.length-1]}** (${Math.round(dt.x)},${Math.round(dt.y)} → ${Math.round(Oe.x)},${Math.round(Oe.y)})`:pt.length>0?nn=`${de==="arrow"?"Arrow":"Drawing"} near **${pt.join("**, **")}** (region: ${hn})`:nn=`Drawing at ${hn}`,v.push(nn)}x&&(x.style.visibility=""),v.length>0&&(h+=`
**Drawings:**
`,v.forEach((W,O)=>{h+=`${O+1}. ${W}
`}))}if((Y.length>0||_&&nt)&&(h+=`
`+pr(Y,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:se,wireframePurpose:nt||void 0},Ie.outputDetail)),F){const u=xr(F,Ie.outputDetail,{width:window.innerWidth,height:window.innerHeight});u&&(h+=`
`+u)}if($)try{await navigator.clipboard.writeText(h)}catch{}p==null||p(h),Je(!0),re(()=>Je(!1),2e3),Ie.autoClearAfterCopy&&re(()=>un(),500)},[A,Bt,Y,F,se,Q,qt,nt,le,Ie.outputDetail,cn,Ie.autoClearAfterCopy,un,$,p]),Gs=a.useCallback(async()=>{const l=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:le;let _=vr(A,l,Ie.outputDetail);if(!_&&Y.length===0&&!F)return;if(_||(_=`## Page Feedback: ${l}
`),Y.length>0&&(_+=`
`+pr(Y,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:se,wireframePurpose:nt||void 0},Ie.outputDetail)),F){const u=xr(F,Ie.outputDetail,{width:window.innerWidth,height:window.innerHeight});u&&(_+=`
`+u)}m&&m(_,A),gt("sending"),await new Promise(u=>re(u,150));const h=await Yt("submit",{output:_,annotations:A},!0);gt(h?"sent":"failed"),re(()=>gt("idle"),2500),h&&Ie.autoClearAfterCopy&&re(()=>un(),500)},[m,Yt,A,Y,F,se,qt,le,Ie.outputDetail,cn,Ie.autoClearAfterCopy,un]);a.useEffect(()=>{if(!Cn)return;const l=10,_=u=>{const x=u.clientX-Cn.x,v=u.clientY-Cn.y,T=Math.sqrt(x*x+v*v);if(!_n&&T>l&&Ro(!0),_n||T>l){let W=Cn.toolbarX+x,O=Cn.toolbarY+v;const G=20,te=337,ce=44,oe=te-(B?zt==="connected"?297:257:44),U=G-oe,st=window.innerWidth-G-te;W=Math.max(U,Math.min(st,W)),O=Math.max(G,Math.min(window.innerHeight-ce-G,O)),Os({x:W,y:O})}},h=()=>{_n&&(Fs.current=!0),Ro(!1),Bo(null)};return document.addEventListener("mousemove",_),document.addEventListener("mouseup",h),()=>{document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",h)}},[Cn,_n,B,zt]);const Ni=a.useCallback(l=>{if(l.target.closest("button")||l.target.closest("[data-agentation-settings-panel]"))return;const _=l.currentTarget.parentElement;if(!_)return;const h=_.getBoundingClientRect(),u=(Ve==null?void 0:Ve.x)??h.left,x=(Ve==null?void 0:Ve.y)??h.top;Bo({x:l.clientX,y:l.clientY,toolbarX:u,toolbarY:x})},[Ve]);if(a.useEffect(()=>{if(!Ve)return;const l=()=>{let x=Ve.x,v=Ve.y;const O=20-(337-(B?zt==="connected"?297:257:44)),G=window.innerWidth-20-337;x=Math.max(O,Math.min(G,x)),v=Math.max(20,Math.min(window.innerHeight-44-20,v)),(x!==Ve.x||v!==Ve.y)&&Os({x,y:v})};return l(),window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[Ve,B,zt]),a.useEffect(()=>{const l=_=>{const h=_.target,u=h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable;if(_.key==="Escape"){if(Q){Ce?ve(null):us();return}if(At){As(!1);return}if(ct.length>0){jn([]);return}P||B&&(vt(),X(!1))}if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key==="f"||_.key==="F")){_.preventDefault(),vt(),B?Ho():X(!0);return}if(!(u||_.metaKey||_.ctrlKey)&&((_.key==="p"||_.key==="P")&&(_.preventDefault(),vt(),Xs()),(_.key==="l"||_.key==="L")&&(_.preventDefault(),vt(),At&&As(!1),L&&K(!1),P&&Qs(),Q?us():Te(!0)),(_.key==="h"||_.key==="H")&&A.length>0&&(_.preventDefault(),vt(),I(x=>!x)),(_.key==="c"||_.key==="C")&&(A.length>0||Y.length>0||F)&&(_.preventDefault(),vt(),Vs()),(_.key==="x"||_.key==="X")&&(A.length>0||Y.length>0||F)&&(_.preventDefault(),vt(),un(),Y.length>0&&De([]),F&&Rt(null)),_.key==="s"||_.key==="S")){const x=Ut(Ie.webhookUrl)||Ut(R||"");A.length>0&&x&&yt==="idle"&&(_.preventDefault(),vt(),Gs())}};return document.addEventListener("keydown",l),()=>document.removeEventListener("keydown",l)},[B,At,Q,Ce,Y,F,P,A.length,Ie.webhookUrl,R,yt,Gs,Xs,Vs,un,ct]),!ee||ne)return null;const Qn=A.length>0,$n=A.filter(l=>!Do.has(l.id)&&l.kind!=="placement"&&l.kind!=="rearrange"),Mi=$n.length>0,Xo=A.filter(l=>Do.has(l.id)),Qo=l=>{const v=l.x/100*window.innerWidth,T=typeof l.y=="string"?parseFloat(l.y):l.y,W={};window.innerHeight-T-22-10<80&&(W.top="auto",W.bottom="calc(100% + 10px)");const G=v-200/2,te=10;if(G<te){const ce=te-G;W.left=`calc(50% + ${ce}px)`}else if(G+200>window.innerWidth-te){const ce=G+200-(window.innerWidth-te);W.left=`calc(50% - ${ce}px)`}return W};return go.createPortal(e.jsxs("div",{ref:Le,style:{display:"contents"},"data-agentation-theme":Ft?"dark":"light","data-agentation-accent":Ie.annotationColorId,"data-agentation-root":"",children:[e.jsx("div",{className:`${E.toolbar}${k?` ${k}`:""}`,"data-feedback-toolbar":!0,"data-agentation-toolbar":!0,style:Ve?{left:Ve.x,top:Ve.y,right:"auto",bottom:"auto"}:void 0,children:e.jsxs("div",{className:`${E.toolbarContainer} ${B?E.expanded:E.collapsed} ${Io?E.entrance:""} ${z?E.hiding:""} ${!Ie.webhooksEnabled&&(Ut(Ie.webhookUrl)||Ut(R||""))?E.serverConnected:""}`,onClick:B?void 0:l=>{if(Fs.current){Fs.current=!1,l.preventDefault();return}X(!0)},onMouseDown:Ni,role:B?void 0:"button",tabIndex:B?-1:0,title:B?void 0:"Start feedback mode",children:[e.jsxs("div",{className:`${E.toggleContent} ${B?E.hidden:E.visible}`,children:[e.jsx(Xi,{size:24}),Mi&&e.jsx("span",{className:`${E.badge} ${B?E.fadeOut:""} ${Io?E.entrance:""}`,children:$n.length})]}),e.jsxs("div",{className:`${E.controlsContent} ${B?E.visible:E.hidden} ${Ve&&Ve.y<100?E.tooltipBelow:""} ${Be||L?E.tooltipsHidden:""} ${No?E.tooltipsInSession:""}`,onMouseEnter:xi,onMouseLeave:gi,children:[e.jsxs("div",{className:`${E.buttonWrapper} ${Ve&&Ve.x<120?E.buttonWrapperAlignLeft:""}`,children:[e.jsx("button",{className:E.controlButton,onClick:l=>{l.stopPropagation(),vt(),Xs()},"data-active":b,children:e.jsx(Ki,{size:24,isPaused:b})}),e.jsxs("span",{className:E.buttonTooltip,children:[b?"Resume animations":"Pause animations",e.jsx("span",{className:E.shortcut,children:"P"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:`${E.controlButton} ${Ft?"":E.light}`,onClick:l=>{l.stopPropagation(),vt(),At&&As(!1),L&&K(!1),P&&Qs(),Q?us():Te(!0)},"data-active":Q,style:Q&&se?{color:"#f97316",background:"rgba(249, 115, 22, 0.25)"}:void 0,children:e.jsx(il,{size:21})}),e.jsxs("span",{className:E.buttonTooltip,children:[Q?"Exit layout mode":"Layout mode",e.jsx("span",{className:E.shortcut,children:"L"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:l=>{l.stopPropagation(),vt(),I(!Pe)},disabled:!Qn||Q,children:e.jsx(Gi,{size:24,isOpen:Pe})}),e.jsxs("span",{className:E.buttonTooltip,children:[Pe?"Hide markers":"Show markers",e.jsx("span",{className:E.shortcut,children:"H"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:`${E.controlButton} ${Ae?E.statusShowing:""}`,onClick:l=>{l.stopPropagation(),vt(),Vs()},disabled:Q&&se?Y.length===0&&!((qo=F==null?void 0:F.sections)!=null&&qo.length):!Qn&&Bt.length===0&&Y.length===0&&!((Vo=F==null?void 0:F.sections)!=null&&Vo.length),"data-active":Ae,children:e.jsx(qi,{size:24,copied:Ae,tint:Q&&se&&(Y.length>0||(Go=F==null?void 0:F.sections)!=null&&Go.length)?"#f97316":void 0})}),e.jsxs("span",{className:E.buttonTooltip,children:[Q&&se?"Copy layout":"Copy feedback",e.jsx("span",{className:E.shortcut,children:"C"})]})]}),e.jsxs("div",{className:`${E.buttonWrapper} ${E.sendButtonWrapper} ${B&&!Ie.webhooksEnabled&&(Ut(Ie.webhookUrl)||Ut(R||""))?E.sendButtonVisible:""}`,children:[e.jsxs("button",{className:`${E.controlButton} ${yt==="sent"||yt==="failed"?E.statusShowing:""}`,onClick:l=>{l.stopPropagation(),vt(),Gs()},disabled:!Qn||!Ut(Ie.webhookUrl)&&!Ut(R||"")||yt==="sending","data-no-hover":yt==="sent"||yt==="failed",tabIndex:Ut(Ie.webhookUrl)||Ut(R||"")?0:-1,children:[e.jsx(Vi,{size:24,state:yt}),Qn&&yt==="idle"&&e.jsx("span",{className:E.buttonBadge,children:A.length})]}),e.jsxs("span",{className:E.buttonTooltip,children:["Send Annotations",e.jsx("span",{className:E.shortcut,children:"S"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:l=>{l.stopPropagation(),vt(),un()},disabled:!Qn&&Bt.length===0&&Y.length===0&&!((Ko=F==null?void 0:F.sections)!=null&&Ko.length),"data-danger":!0,children:e.jsx(Zi,{size:24})}),e.jsxs("span",{className:E.buttonTooltip,children:["Clear all",e.jsx("span",{className:E.shortcut,children:"X"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:l=>{l.stopPropagation(),vt(),Q&&us(),K(!L)},children:e.jsx(Ji,{size:24})}),g&&zt!=="disconnected"&&e.jsx("span",{className:`${E.mcpIndicator} ${E[zt]} ${L?E.hidden:""}`,title:zt==="connected"?"MCP Connected":"MCP Connecting..."}),e.jsx("span",{className:E.buttonTooltip,children:"Settings"})]}),e.jsx("div",{className:E.divider}),e.jsxs("div",{className:`${E.buttonWrapper} ${Ve&&typeof window<"u"&&Ve.x>window.innerWidth-120?E.buttonWrapperAlignRight:""}`,children:[e.jsx("button",{className:E.controlButton,onClick:l=>{l.stopPropagation(),vt(),Ho()},children:e.jsx(el,{size:24})}),e.jsxs("span",{className:E.buttonTooltip,children:["Exit",e.jsx("span",{className:E.shortcut,children:"Esc"})]})]})]}),e.jsx(Ta,{visible:Q&&B,activeType:Ce,onSelect:l=>{ve(Ce===l?null:l)},isDarkMode:Ft,sectionCount:(F==null?void 0:F.sections.length)??0,onDetectSections:()=>{const l=Xa(),_=(F==null?void 0:F.sections)??[],h=new Set(_.map(T=>T.selector)),u=l.filter(T=>!h.has(T.selector)),x=[..._,...u],v=[...(F==null?void 0:F.originalOrder)??[],...u.map(T=>T.id)];Rt({sections:x,originalOrder:v,detectedAt:Date.now()})},placementCount:Y.length,onClearPlacements:()=>{Ps(l=>l+1),jo(l=>l+1),re(()=>{Rt({sections:[],originalOrder:[],detectedAt:Date.now()})},200)},blankCanvas:se,onBlankCanvasChange:l=>{const _={sections:[],originalOrder:[],detectedAt:Date.now()};l?(Ds.current={rearrange:F,placements:Y},Rt(an.current.rearrange||_),De(an.current.placements),ve(null)):(an.current={rearrange:F,placements:Y},Rt(Ds.current.rearrange||_),De(Ds.current.placements)),We(l)},wireframePurpose:nt,onWireframePurposeChange:Dt,Tooltip:yn,onDragStart:(l,_)=>{_.preventDefault();const h=H[l];let u=null,x=!1;const v=_.clientX,T=_.clientY,W=_.target.closest("[data-feedback-toolbar]"),O=(W==null?void 0:W.getBoundingClientRect().top)??window.innerHeight,G=ce=>{const Se=ce.clientX-v,oe=ce.clientY-T;if(!x&&(Math.abs(Se)>4||Math.abs(oe)>4)&&(x=!0,u=document.createElement("div"),u.className=`${C.dragPreview}${se?` ${C.dragPreviewWireframe}`:""}`,document.body.appendChild(u)),!u)return;const U=Math.max(0,O-ce.clientY),st=Math.min(1,U/180),Ke=1-Math.pow(1-st,2),dt=28,Oe=20,ot=Math.min(140,h.width*.18),de=Math.min(90,h.height*.18),ye=dt+(ot-dt)*Ke,mt=Oe+(de-Oe)*Ke;u.style.width=`${ye}px`,u.style.height=`${mt}px`,u.style.left=`${ce.clientX-ye/2}px`,u.style.top=`${ce.clientY-mt/2}px`,u.style.opacity=`${.5+.5*Ke}`,u.textContent=Ke>.25?l:""},te=ce=>{if(window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",te),u&&document.body.removeChild(u),x){const Se=h.width,oe=h.height,U=window.scrollY,st=Math.max(0,ce.clientX-Se/2),Ke=Math.max(0,ce.clientY+U-oe/2),dt={id:`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type:l,x:st,y:Ke,width:Se,height:oe,scrollY:U,timestamp:Date.now()};De(Oe=>[...Oe,dt]),ve(null),An.current=new Set,ko(Oe=>Oe+1)}};window.addEventListener("mousemove",G),window.addEventListener("mouseup",te)}}),e.jsx(td,{settings:Ie,onSettingsChange:l=>fi(_=>({..._,...l})),isDarkMode:Ft,onToggleTheme:yi,isDevMode:bi,connectionStatus:zt,endpoint:g,isVisible:V,toolbarNearBottom:!!Ve&&Ve.y<230,settingsPage:Me,onSettingsPageChange:fe,onHideToolbar:ki})]})}),(Q||He)&&e.jsx("div",{className:`${C.blankCanvas} ${ut?C.visible:""} ${Et?C.gridActive:""}`,style:{"--canvas-opacity":wt},"data-feedback-toolbar":!0}),Q&&se&&ut&&e.jsxs("div",{className:C.wireframeNotice,"data-feedback-toolbar":!0,children:[e.jsxs("div",{className:C.wireframeOpacityRow,children:[e.jsx("span",{className:C.wireframeOpacityLabel,children:"Toggle Opacity"}),e.jsx("input",{type:"range",className:C.wireframeOpacitySlider,min:0,max:1,step:.01,value:wt,onChange:l=>wn(Number(l.target.value))})]}),e.jsxs("div",{className:C.wireframeNoticeTitleRow,children:[e.jsx("span",{className:C.wireframeNoticeTitle,children:"Wireframe Mode"}),e.jsx("span",{className:C.wireframeNoticeDivider}),e.jsx("button",{className:C.wireframeStartOver,onClick:()=>{Ps(l=>l+1),Rt({sections:[],originalOrder:[],detectedAt:Date.now()}),an.current={rearrange:null,placements:[]},Dt(""),js(le)},children:"Start Over"})]}),"Drag components onto the canvas.",e.jsx("br",{}),"Copied output will only include the wireframed layout."]}),(Q||He)&&e.jsx(Ia,{placements:Y,onChange:De,activeComponent:He?null:Ce,onActiveComponentChange:ve,isDarkMode:Ft,exiting:He,onInteractionChange:vn,passthrough:!Ce,extraSnapRects:F==null?void 0:F.sections.map(l=>l.currentRect),deselectSignal:ai,clearSignal:_i,wireframe:se,onSelectionChange:(l,_)=>{An.current=l,_||(is.current=new Set,di(h=>h+1))},onDragMove:(l,_)=>{const h=is.current;if(!(!h.size||!F)){if(!Pt.current){Pt.current=new Map;for(const u of F.sections)h.has(u.id)&&Pt.current.set(u.id,{x:u.currentRect.x,y:u.currentRect.y})}for(const u of F.sections){if(!h.has(u.id)||!Pt.current.get(u.id))continue;const v=document.querySelector(`[data-rearrange-section="${u.id}"]`);v&&(v.style.transform=`translate(${l}px, ${_}px)`)}}},onDragEnd:(l,_,h)=>{const u=is.current,x=Pt.current;if(Pt.current=null,!(!u.size||!F||!x)){for(const v of u){const T=document.querySelector(`[data-rearrange-section="${v}"]`);T&&(T.style.transform="")}h&&Rt(v=>v&&{...v,sections:v.sections.map(T=>{const W=x.get(T.id);return W?{...T,currentRect:{...T.currentRect,x:Math.max(0,W.x+l),y:Math.max(0,W.y+_)}}:T})})}}}),(Q||He)&&F&&e.jsx(Va,{rearrangeState:F,onChange:Rt,isDarkMode:Ft,exiting:He,blankCanvas:se,extraSnapRects:Y.map(l=>({x:l.x,y:l.y,width:l.width,height:l.height})),clearSignal:ui,deselectSignal:ci,onSelectionChange:(l,_)=>{is.current=l,_||(An.current=new Set,ko(h=>h+1))},onDragMove:(l,_)=>{const h=An.current;if(h.size){if(!Pt.current){Pt.current=new Map;for(const u of Y)h.has(u.id)&&Pt.current.set(u.id,{x:u.x,y:u.y})}for(const u of h){const x=document.querySelector(`[data-design-placement="${u}"]`);x&&(x.style.transform=`translate(${l}px, ${_}px)`)}}},onDragEnd:(l,_,h)=>{const u=An.current,x=Pt.current;if(Pt.current=null,!(!u.size||!x)){for(const v of u){const T=document.querySelector(`[data-design-placement="${v}"]`);T&&(T.style.transform="")}h&&De(v=>v.map(T=>{const W=x.get(T.id);return W?{...T,x:Math.max(0,W.x+l),y:Math.max(0,W.y+_)}:T}))}}}),e.jsx("canvas",{ref:zs,className:`${E.drawCanvas} ${At?E.active:""}`,style:{opacity:Ys?1:0,transition:"opacity 0.15s ease"},"data-feedback-toolbar":!0}),e.jsxs("div",{className:E.markersLayer,"data-feedback-toolbar":!0,children:[be&&$n.filter(l=>!l.isFixed).map((l,_,h)=>e.jsx(kr,{annotation:l,globalIndex:$n.findIndex(u=>u.id===l.id),layerIndex:_,layerSize:h.length,isExiting:Fe,isClearing:Kt,isAnimated:To.has(l.id),isHovered:!Fe&&Xt===l.id,isDeleting:ft===l.id,isEditingAny:!!S,renumberFrom:Qt,markerClickBehavior:Ie.markerClickBehavior,tooltipStyle:Qo(l),onHoverEnter:u=>!Fe&&u.id!==_s.current&&ps(u),onHoverLeave:()=>ps(null),onClick:u=>Ie.markerClickBehavior==="delete"?qs(u.id):ms(u),onContextMenu:ms},l.id)),be&&!Fe&&Xo.filter(l=>!l.isFixed).map(l=>e.jsx(jr,{annotation:l},l.id))]}),e.jsxs("div",{className:E.fixedMarkersLayer,"data-feedback-toolbar":!0,children:[be&&$n.filter(l=>l.isFixed).map((l,_,h)=>e.jsx(kr,{annotation:l,globalIndex:$n.findIndex(u=>u.id===l.id),layerIndex:_,layerSize:h.length,isExiting:Fe,isClearing:Kt,isAnimated:To.has(l.id),isHovered:!Fe&&Xt===l.id,isDeleting:ft===l.id,isEditingAny:!!S,renumberFrom:Qt,markerClickBehavior:Ie.markerClickBehavior,tooltipStyle:Qo(l),onHoverEnter:u=>!Fe&&u.id!==_s.current&&ps(u),onHoverLeave:()=>ps(null),onClick:u=>Ie.markerClickBehavior==="delete"?qs(u.id):ms(u),onContextMenu:ms},l.id)),be&&!Fe&&Xo.filter(l=>l.isFixed).map(l=>e.jsx(jr,{annotation:l,fixed:!0},l.id))]}),B&&e.jsxs("div",{className:E.overlay,"data-feedback-toolbar":!0,style:P||S?{zIndex:99999}:void 0,children:[(pe==null?void 0:pe.rect)&&!P&&!ze&&!Vt&&e.jsx("div",{className:`${E.hoverHighlight} ${E.enter}`,style:{left:pe.rect.left,top:pe.rect.top,width:pe.rect.width,height:pe.rect.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)"}}),ct.filter(l=>document.contains(l.element)).map((l,_)=>{const h=l.element.getBoundingClientRect(),u=ct.length>1;return e.jsx("div",{className:u?E.multiSelectOutline:E.singleSelectOutline,style:{position:"fixed",left:h.left,top:h.top,width:h.width,height:h.height,...u?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}},_)}),Xt&&!P&&(()=>{var x;const l=A.find(v=>v.id===Xt);if(!(l!=null&&l.boundingBox))return null;if((x=l.elementBoundingBoxes)!=null&&x.length)return Ze.length>0?Ze.filter(v=>document.contains(v)).map((v,T)=>{const W=v.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:W.left,top:W.top,width:W.width,height:W.height}},`hover-outline-live-${T}`)}):l.elementBoundingBoxes.map((v,T)=>e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:v.x,top:v.y-Re,width:v.width,height:v.height}},`hover-outline-${T}`));const _=Zt&&document.contains(Zt)?Zt.getBoundingClientRect():null,h=_?{x:_.left,y:_.top,width:_.width,height:_.height}:{x:l.boundingBox.x,y:l.isFixed?l.boundingBox.y:l.boundingBox.y-Re,width:l.boundingBox.width,height:l.boundingBox.height},u=l.isMultiSelect;return e.jsx("div",{className:`${u?E.multiSelectOutline:E.singleSelectOutline} ${E.enter}`,style:{left:h.x,top:h.y,width:h.width,height:h.height,...u?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}})})(),pe&&!P&&!ze&&!Vt&&e.jsxs("div",{className:`${E.hoverTooltip} ${E.enter}`,style:{left:Math.max(8,Math.min(J.x,window.innerWidth-100)),top:Math.max(J.y-(pe.reactComponents?48:32),8)},children:[pe.reactComponents&&e.jsx("div",{className:E.hoverReactPath,children:pe.reactComponents}),e.jsx("div",{className:E.hoverElementName,children:pe.elementName})]}),P&&e.jsxs(e.Fragment,{children:[(Jo=P.multiSelectElements)!=null&&Jo.length?P.multiSelectElements.filter(l=>document.contains(l)).map((l,_)=>{const h=l.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${Hn?E.exit:E.enter}`,style:{left:h.left,top:h.top,width:h.width,height:h.height}},`pending-multi-${_}`)}):P.targetElement&&document.contains(P.targetElement)?(()=>{const l=P.targetElement.getBoundingClientRect();return e.jsx("div",{className:`${E.singleSelectOutline} ${Hn?E.exit:E.enter}`,style:{left:l.left,top:l.top,width:l.width,height:l.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}})})():P.boundingBox&&e.jsx("div",{className:`${P.isMultiSelect?E.multiSelectOutline:E.singleSelectOutline} ${Hn?E.exit:E.enter}`,style:{left:P.boundingBox.x,top:P.boundingBox.y-Re,width:P.boundingBox.width,height:P.boundingBox.height,...P.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}),(()=>{const l=P.x,_=P.isFixed?P.y:P.y-Re;return e.jsxs(e.Fragment,{children:[e.jsx(Uc,{x:l,y:_,isMultiSelect:P.isMultiSelect,isExiting:Hn}),e.jsx($s,{ref:Wo,element:P.element,selectedText:P.selectedText,computedStyles:P.computedStylesObj,placeholder:P.element==="Area selection"?"What should change in this area?":P.isMultiSelect?"Feedback for this group of elements...":"What should change?",onSubmit:ji,onCancel:Qs,isExiting:Hn,lightMode:!Ft,accentColor:P.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:{left:Math.max(160,Math.min(window.innerWidth-160,l/100*window.innerWidth)),..._>window.innerHeight-290?{bottom:window.innerHeight-_+20}:{top:_+20}}})]})})()]}),S&&e.jsxs(e.Fragment,{children:[(Zo=S.elementBoundingBoxes)!=null&&Zo.length?Ee.length>0?Ee.filter(l=>document.contains(l)).map((l,_)=>{const h=l.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:h.left,top:h.top,width:h.width,height:h.height}},`edit-multi-live-${_}`)}):S.elementBoundingBoxes.map((l,_)=>e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:l.x,top:l.y-Re,width:l.width,height:l.height}},`edit-multi-${_}`)):(()=>{const l=xe&&document.contains(xe)?xe.getBoundingClientRect():null,_=l?{x:l.left,y:l.top,width:l.width,height:l.height}:S.boundingBox?{x:S.boundingBox.x,y:S.isFixed?S.boundingBox.y:S.boundingBox.y-Re,width:S.boundingBox.width,height:S.boundingBox.height}:null;return _?e.jsx("div",{className:`${S.isMultiSelect?E.multiSelectOutline:E.singleSelectOutline} ${E.enter}`,style:{left:_.x,top:_.y,width:_.width,height:_.height,...S.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}):null})(),e.jsx($s,{ref:Oo,element:S.element,selectedText:S.selectedText,computedStyles:Fa(S.computedStyles),placeholder:"Edit your feedback...",initialValue:S.comment,submitLabel:"Save",onSubmit:Ci,onCancel:Si,onDelete:()=>qs(S.id),isExiting:wi,lightMode:!Ft,accentColor:S.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:(()=>{const l=S.isFixed?S.y:S.y-Re;return{left:Math.max(160,Math.min(window.innerWidth-160,S.x/100*window.innerWidth)),...l>window.innerHeight-290?{bottom:window.innerHeight-l+20}:{top:l+20}}})()})]}),Vt&&e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:Yn,className:E.dragSelection}),e.jsx("div",{ref:Un,className:E.highlightsContainer})]})]})]}),document.body)}/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Jr=(...t)=>t.filter((n,s,i)=>!!n&&n.trim()!==""&&i.indexOf(n)===s).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var rd={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const id=a.forwardRef(({color:t="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:o="",children:r,iconNode:d,...p},m)=>a.createElement("svg",{ref:m,...rd,width:n,height:n,stroke:t,strokeWidth:i?Number(s)*24/Number(n):s,className:Jr("lucide",o),...p},[...d.map(([$,g])=>a.createElement($,g)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=(t,n)=>{const s=a.forwardRef(({className:i,...o},r)=>a.createElement(id,{ref:r,iconNode:n,className:Jr(`lucide-${od(t)}`,i),...o}));return s.displayName=`${t}`,s};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=ge("Aperture",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=ge("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=ge("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cd=ge("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dd=ge("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zr=ge("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ei=ge("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=ge("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=ge("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=ge("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=ge("Clapperboard",[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",key:"1tn4o7"}],["path",{d:"m6.2 5.3 3.1 3.9",key:"iuk76l"}],["path",{d:"m12.4 3.4 3.1 4",key:"6hsd6n"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",key:"ltgou9"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hd=ge("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ti=ge("Coins",[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=ge("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=ge("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pd=ge("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=ge("GitFork",[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=ge("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=ge("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=ge("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=ge("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=ge("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=ge("MessageSquareText",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M13 8H7",key:"14i4kc"}],["path",{d:"M17 12H7",key:"16if0g"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=ge("MicVocal",[["path",{d:"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",key:"80a601"}],["path",{d:"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",key:"j0ngtp"}],["circle",{cx:"16",cy:"7",r:"5",key:"d08jfb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oi=ge("MousePointer2",[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=ge("Music2",[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=ge("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=ge("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=ge("Replace",[["path",{d:"M14 4a2 2 0 0 1 2-2",key:"1w2hp7"}],["path",{d:"M16 10a2 2 0 0 1-2-2",key:"shjach"}],["path",{d:"M20 2a2 2 0 0 1 2 2",key:"188mtx"}],["path",{d:"M22 8a2 2 0 0 1-2 2",key:"ddf4tu"}],["path",{d:"m3 7 3 3 3-3",key:"x25e72"}],["path",{d:"M6 10V5a3 3 0 0 1 3-3h1",key:"3y3t5z"}],["rect",{x:"2",y:"14",width:"8",height:"8",rx:"2",key:"4rksxw"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=ge("Scissors",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nd=ge("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=ge("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=ge("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=ge("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=ge("SunMedium",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 3v1",key:"1asbbs"}],["path",{d:"M12 20v1",key:"1wcdkc"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M20 12h1",key:"1vloll"}],["path",{d:"m18.364 5.636-.707.707",key:"1hakh0"}],["path",{d:"m6.343 17.657-.707.707",key:"18m9nf"}],["path",{d:"m5.636 5.636.707.707",key:"1xv1c5"}],["path",{d:"m17.657 17.657.707.707",key:"vl76zb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=ge("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=ge("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=ge("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=ge("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Td=ge("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=ge("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=ge("Workflow",[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=ge("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function ri({className:t="",size:n=28}){return e.jsxs("div",{className:`flex items-center gap-2 ${t}`,children:[e.jsxs("svg",{width:n,height:n,viewBox:"0 0 32 32",fill:"none","aria-hidden":!0,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"pl-g",x1:"0",y1:"0",x2:"1",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D"}),e.jsx("stop",{offset:"55%",stopColor:"#FF3D7F"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF"})]})}),e.jsx("rect",{width:"32",height:"32",rx:"8",fill:"#0E0E14"}),e.jsx("path",{d:"M8 22 L8 10 L14 10 Q20 10 20 14.5 Q20 18.5 15 19 L12 19 L12 22 Z M12 13 L12 16 L14.5 16 Q16.2 16 16.2 14.5 Q16.2 13 14.5 13 Z",fill:"url(#pl-g)"}),e.jsx("circle",{cx:"23.5",cy:"20",r:"2.4",fill:"url(#pl-g)"})]}),e.jsxs("div",{className:"leading-none",children:[e.jsx("div",{className:"font-display text-[17px] font-semibold tracking-tight text-white",children:"PineLine"}),e.jsx("div",{className:"mt-0.5 text-[9px] font-medium uppercase tracking-[0.25em] text-ink-2",children:"AI Film Pipeline"})]})]})}const $r=[{to:"/",label:"首页"},{to:"/studio",label:"Studio"},{to:"/templates",label:"模板"},{to:"/showcase",label:"精选"},{to:"/pricing",label:"定价"}];function Ad(){const[t,n]=a.useState(!1),[s,i]=a.useState(!1);return a.useEffect(()=>{const o=()=>n(window.scrollY>8);return o(),window.addEventListener("scroll",o,{passive:!0}),()=>window.removeEventListener("scroll",o)},[]),e.jsxs(Xe.header,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6,ease:"easeOut"},className:`fixed inset-x-0 top-0 z-50 transition-all ${t?"border-b border-white/[0.06] bg-bg-0/70 backdrop-blur-xl":"border-b border-transparent"}`,children:[e.jsxs("div",{className:"container-x flex h-16 items-center justify-between",children:[e.jsx(xt,{to:"/",className:"flex items-center",children:e.jsx(ri,{})}),e.jsx("nav",{className:"hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 md:flex",children:$r.map(o=>e.jsx(er,{to:o.to,end:o.to==="/",className:({isActive:r})=>`rounded-full px-4 py-1.5 text-sm font-medium transition ${r?"bg-white/[0.08] text-white":"text-ink-1 hover:text-white"}`,children:o.label},o.to))}),e.jsxs("div",{className:"hidden items-center gap-3 md:flex",children:[e.jsx("a",{href:"https://docs.tapnow.ai/en/docs",target:"_blank",rel:"noreferrer",className:"text-sm font-medium text-ink-1 transition hover:text-white",children:"文档"}),e.jsxs(xt,{to:"/studio",className:"btn-primary",children:[e.jsx(It,{size:14}),"开始创作"]})]}),e.jsx("button",{"aria-label":"toggle menu",className:"rounded-full border border-white/10 p-2 md:hidden",onClick:()=>i(o=>!o),children:s?e.jsx(Pd,{size:18}):e.jsx(bd,{size:18})})]}),s&&e.jsx("div",{className:"border-t border-white/[0.06] bg-bg-0/95 backdrop-blur-xl md:hidden",children:e.jsxs("div",{className:"container-x flex flex-col gap-1 py-3",children:[$r.map(o=>e.jsx(er,{to:o.to,end:o.to==="/",onClick:()=>i(!1),className:({isActive:r})=>`rounded-lg px-3 py-2 text-sm font-medium ${r?"bg-white/[0.06] text-white":"text-ink-1"}`,children:o.label},o.to)),e.jsxs(xt,{to:"/studio",className:"btn-primary mt-2 justify-center",children:[e.jsx(It,{size:14}),"开始创作"]})]})})]})}const ln={email:"hello@pineline.example"},Dn={creditPacks:[{id:"starter",name:"体验包",credits:1e3,priceCny:29,priceUsd:5,tag:"约 10 条短视频"},{id:"creator",name:"创作包",credits:6e3,priceCny:149,priceUsd:22,tag:"约 60 条 · 更划算",highlight:!0},{id:"pro",name:"专业包",credits:2e4,priceCny:449,priceUsd:68,tag:"约 200 条"}],subscriptions:[{id:"lite",name:"轻享版",credits:3e3,priceCnyM:79,priceUsdM:12,features:["每月 3000 积分","全模型可用","标准队列"]},{id:"plus",name:"进阶版",credits:12e3,priceCnyM:279,priceUsdM:42,features:["每月 12000 积分","全模型可用","优先队列","批量交付导出"],highlight:!0}],service:{items:["批量科普/产品短视频代制作（按月产能包）","定制画布工作流与模型调优","交付含 AI 生成标识 + 创作过程存证报告","专属对接与优先排期"]}},zd=[{title:"产品",links:[{label:"Studio 工作台",to:"/studio"},{label:"模板库",to:"/templates"},{label:"精选作品",to:"/showcase"},{label:"定价方案",to:"/pricing"}]},{title:"能力",links:[{label:"剧本到分镜",to:"/studio"},{label:"多模型视频生成",to:"/studio"},{label:"角色/场景一致性",to:"/studio"},{label:"分镜一键成片",to:"/studio"}]},{title:"条款",links:[{label:"服务条款",to:"/terms"},{label:"隐私政策",to:"/privacy"}]}];function Wd(){return e.jsx("footer",{className:"relative mt-24 border-t border-white/[0.06] bg-bg-0",children:e.jsxs("div",{className:"container-x py-16",children:[e.jsxs("div",{className:"grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]",children:[e.jsxs("div",{children:[e.jsx(ri,{}),e.jsx("p",{className:"mt-4 max-w-xs text-sm leading-relaxed text-ink-2",children:"PineLine 是节点画布式 AIGC 视频创作管线：从剧本到分镜、分镜图、镜头视频， 连线即上游产出自动喂下游，一键搭建完整生成链。"}),e.jsx("a",{href:`mailto:${ln.email}`,className:"mt-5 inline-block text-sm text-ink-1 transition hover:text-white",children:ln.email})]}),zd.map(t=>e.jsxs("div",{children:[e.jsx("div",{className:"mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2",children:t.title}),e.jsx("ul",{className:"space-y-2.5",children:t.links.map(n=>e.jsx("li",{children:e.jsx(xt,{to:n.to,className:"text-sm text-ink-1 transition hover:text-white",children:n.label})},n.label))})]},t.title))]}),e.jsx("div",{className:"divider-grad my-10"}),e.jsxs("div",{className:"flex flex-col items-start justify-between gap-3 text-xs text-ink-2 md:flex-row md:items-center",children:[e.jsxs("div",{children:["© ",new Date().getFullYear()," PineLine Studio. All rights reserved."]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx(xt,{to:"/privacy",className:"transition hover:text-white",children:"隐私政策"}),e.jsx(xt,{to:"/terms",className:"transition hover:text-white",children:"服务条款"}),e.jsx("span",{className:"text-ink-3",children:"v0.1 · Cinematic Pipeline"})]})]})]})})}function Od(){return e.jsxs("div",{className:"relative mx-auto aspect-[16/9] w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050506] shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-70"}),e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(255,255,255,0.06),transparent_65%)]"}),e.jsxs("div",{className:"absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[11px] text-ink-1 backdrop-blur-xl",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-brand"}),"PineLine Canvas · Agent mode"]}),e.jsx("div",{className:"absolute bottom-5 left-5 z-20 hidden flex-col gap-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl md:flex",children:[Mr,Bs,ei,si].map((t,n)=>e.jsx("span",{className:`flex h-8 w-8 items-center justify-center rounded-full ${n===1?"bg-white text-black":"bg-white/[0.05] text-ink-1"}`,children:e.jsx(t,{size:15})},n))}),e.jsxs("svg",{className:"absolute inset-0 h-full w-full",viewBox:"0 0 1180 664",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"heroWireA",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D",stopOpacity:"0.8"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF",stopOpacity:"0.75"})]}),e.jsxs("linearGradient",{id:"heroWireB",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#7C5CFF",stopOpacity:"0.75"}),e.jsx("stop",{offset:"100%",stopColor:"#22D3EE",stopOpacity:"0.8"})]})]}),e.jsx("path",{d:"M 260 245 C 360 245 430 180 532 178",stroke:"url(#heroWireA)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 302 468 C 420 430 498 382 592 356",stroke:"url(#heroWireA)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 745 215 C 842 245 865 315 936 338",stroke:"url(#heroWireB)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 735 382 C 840 430 858 494 936 512",stroke:"url(#heroWireB)",strokeWidth:"1.4",fill:"none"})]}),e.jsx(Ir,{x:"7%",y:"24%",title:"Reference frame",subtitle:"雨夜霓虹 · 角色气质",icon:e.jsx(Mr,{size:13}),tone:"warm"}),e.jsx(Fd,{}),e.jsx(Ir,{x:"43%",y:"13%",title:"图像生成",subtitle:"角色定妆照 · 4 variants",icon:e.jsx(It,{size:13}),tone:"portrait",large:!0}),e.jsx(Hd,{}),e.jsx(Yd,{}),e.jsx(Ud,{}),e.jsxs(Xe.div,{initial:{x:314,y:250},animate:{x:[314,550,702,938,620,314],y:[250,178,356,338,520,250]},transition:{duration:10,repeat:1/0,ease:"easeInOut"},className:"pointer-events-none absolute left-0 top-0 z-30",children:[e.jsx(oi,{className:"fill-white text-black drop-shadow",size:18}),e.jsx("div",{className:"ml-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black shadow",children:"Agent"})]})]})}function Ir({x:t,y:n,title:s,subtitle:i,icon:o,tone:r,large:d}){const p=r==="warm"?"bg-[radial-gradient(circle_at_30%_25%,#FFE8A3_0%,#F3A66C_28%,#6D283E_58%,#071018_100%)]":"bg-[radial-gradient(circle_at_45%_18%,#F9D6BD_0%,#D78B92_26%,#7047A8_58%,#101019_100%)]";return e.jsxs(Xe.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:d?.16:.05},style:{left:t,top:n},className:`absolute z-10 ${d?"w-[310px]":"w-[260px]"} overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl`,children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1",children:[e.jsx("span",{className:"text-brand",children:o}),s]}),e.jsxs("div",{className:`${d?"h-[150px]":"h-[118px]"} ${p} relative overflow-hidden`,children:[e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-40"}),e.jsx("div",{className:"absolute bottom-3 left-3 rounded-full bg-black/55 px-2 py-1 text-[10px] text-white",children:i})]})]})}function Fd(){return e.jsxs(Xe.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.12},className:"absolute left-[12%] top-[62%] z-10 w-[270px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[11px] font-semibold uppercase text-brand",children:[e.jsx(ni,{size:13}),"Script context"]}),e.jsx("p",{className:"mt-3 text-xs leading-relaxed text-ink-1",children:"女主穿过雨夜天桥，城市屏幕在她身后熄灭。保留冷蓝主色与湿润地面反光。"}),e.jsxs("div",{className:"mt-3 flex gap-1.5 text-[10px] text-ink-2",children:[e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5",children:"Chapter 02"}),e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5",children:"Neo noir"})]})]})}function Hd(){return e.jsxs(Xe.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.24},className:"absolute right-[7%] top-[35%] z-10 w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1",children:[e.jsx(Td,{size:13,className:"text-brand-cyan"}),"视频生成"]}),e.jsxs("div",{className:"relative h-[120px] bg-[linear-gradient(135deg,#06070C_0%,#142A35_34%,#22D3EE_58%,#FF3D7F_100%)]",children:[e.jsx("div",{className:"animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent"}),e.jsx("span",{className:"absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white",children:"24fps · 6s · dolly in"})]})]})}function Yd(){return e.jsxs(Xe.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.32},className:"absolute right-[11%] top-[70%] z-10 w-[230px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-ink-1",children:[e.jsx(si,{size:13,className:"text-brand-lime"}),"音频生成"]}),e.jsx("div",{className:"mt-4 flex h-12 items-end gap-1",children:[18,30,22,42,28,48,35,25,40,20,32,26].map((t,n)=>e.jsx("span",{className:"w-full rounded-t bg-brand-gradient opacity-80",style:{height:t}},n))})]})}function Ud(){return e.jsxs(Xe.div,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.7,delay:.38},className:"absolute bottom-[9%] left-1/2 z-20 w-[430px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#1A1A1E]/95 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs font-medium text-white",children:[e.jsx(It,{size:14,className:"text-brand"}),"PineLine Agent"]}),e.jsx("div",{className:"mt-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ink-2",children:"Describe your scene or pick nodes as context..."}),e.jsxs("div",{className:"mt-3 flex items-center justify-between text-[11px] text-ink-2",children:[e.jsx("span",{children:"已选择 Reference frame + Script context"}),e.jsx("button",{className:"rounded-full bg-white px-3 py-1 font-semibold text-black",children:"生成下一步"})]})]})}function Xd(){return e.jsxs("section",{className:"relative overflow-hidden pb-10 pt-28 md:pt-32",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 dot-bg opacity-35 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_32%,#000_28%,transparent_78%)]"}),e.jsx("div",{className:"pointer-events-none absolute left-1/2 top-20 h-[480px] w-[1040px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.12] blur-[150px]"}),e.jsxs("div",{className:"container-x relative",children:[e.jsxs(Xe.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6},className:"max-w-4xl",children:[e.jsxs("span",{className:"chip",children:[e.jsx("span",{className:"h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand"}),"PineLine Agentic Film Canvas"]}),e.jsxs("h1",{className:"mt-7 max-w-4xl font-display text-display-xl font-semibold leading-[0.98] text-white [word-break:keep-all]",children:["你的影视",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"智能体创意画布"})]}),e.jsx("p",{className:"mt-6 max-w-2xl text-base leading-relaxed text-ink-1 md:text-lg",children:"PineLine 是面向专业影视创作的 AI Agent 工作台。统一调度剧本、图像、音频与视频模型， 把角色、分镜、镜头控制、生成与剪辑连成一张可复用的创意画布。"}),e.jsxs("div",{className:"mt-8 flex flex-col gap-3 sm:flex-row",children:[e.jsxs(xt,{to:"/studio",className:"btn-light",children:[e.jsx(It,{size:14}),"进入画布体验",e.jsx(rs,{size:14})]}),e.jsx(xt,{to:"/templates",className:"btn-ghost",children:"查看工作流模板"})]}),e.jsxs("div",{className:"mt-8 grid max-w-3xl gap-3 text-xs text-ink-2 sm:grid-cols-3",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Bs,{size:13,className:"text-brand"}),"Agent Router · 12+ 模型编排"]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Rs,{size:13,className:"text-brand-cyan"}),"Shot Control · 镜头参数可控"]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(It,{size:13,className:"text-brand-pink"}),"Recipe Clone · 公开画布可复用"]})]})]}),e.jsx(Xe.div,{initial:{opacity:0,y:40,scale:.97},animate:{opacity:1,y:0,scale:1},transition:{duration:.8,delay:.2,ease:[.22,1,.36,1]},className:"relative mt-14 md:mt-16",children:e.jsx(Od,{})})]})]})}const Qd=["广告公司","导演工作室","短剧厂牌","品牌内容部","MCN 制作团队","动画与游戏预演","商业摄影团队","后期剪辑团队"];function qd(){return e.jsx("section",{className:"relative py-10 md:py-12",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"flex flex-col gap-5 border-y border-white/[0.06] py-7 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"eyebrow",children:"Built For Production Teams"}),e.jsx("p",{className:"mt-2 max-w-xl text-sm leading-relaxed text-ink-1",children:"参考 TapNow 的创意画布范式，PineLine 聚焦影视团队的专业生产场景。"})]}),e.jsx("div",{className:"grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 md:max-w-2xl",children:Qd.map(t=>e.jsx("div",{className:"rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-center text-xs font-medium text-ink-1",children:t},t))})]})})})}const Vd=[{title:"读懂上下文",desc:"选择剧本、参考图、角色或旧镜头，Agent 会把它们作为下一次生成的上下文。"},{title:"拆成任务",desc:"自动把一句创意拆成分镜、镜头、角色、光线、音效和剪辑节点。"},{title:"路由模型",desc:"按任务类型选择图像、视频、音频模型，并保留参数、版本与产物依赖。"}];function Gd(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",children:[e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Agent"}),e.jsxs("h2",{className:"section-title mt-3",children:["你的 ",e.jsx("span",{className:"text-gradient",children:"AI 执行导演"})]}),e.jsx("p",{className:"mt-4 max-w-lg text-ink-1",children:"TapNow 用自然对话驱动画布，PineLine 在此基础上加入影视生产语义： Agent 不只生成素材，还会管理场景、镜头、角色一致性与下游剪辑依赖。"}),e.jsx("div",{className:"mt-8 space-y-4",children:Vd.map((t,n)=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("span",{className:"mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-white",children:n+1}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-1 text-sm leading-relaxed text-ink-1",children:t.desc})]})]},t.title))}),e.jsxs(xt,{to:"/studio",className:"btn-primary mt-8",children:["试用 PineLine Agent",e.jsx(rs,{size:14})]})]}),e.jsxs(Xe.div,{initial:{opacity:0,scale:.96},whileInView:{opacity:1,scale:1},viewport:{once:!0,margin:"-120px"},transition:{duration:.7},className:"relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#08080B] p-5 shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-50"}),e.jsx("div",{className:"absolute inset-x-10 top-10 h-44 rounded-full bg-brand-gradient opacity-10 blur-[90px]"}),e.jsxs("div",{className:"relative ml-auto mt-10 max-w-[460px] rounded-3xl border border-white/[0.08] bg-[#1A1A1F] p-5 shadow-card",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold text-white",children:[e.jsx(cd,{size:16,className:"text-brand"}),"Agent 控制台"]}),e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-ink-2",children:"Context aware"})]}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsx(Lr,{icon:e.jsx(wd,{size:13}),text:"把这段都市悬疑独白拆成 6 个可生成镜头，并保留女主角色一致性。"}),e.jsx(Lr,{icon:e.jsx(It,{size:13}),text:"已生成：剧本解析、角色参考、S35 镜头组、雨夜灯光方案。",active:!0})]}),e.jsxs("div",{className:"mt-5 rounded-2xl border border-white/10 bg-black/35 p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs font-semibold text-white",children:[e.jsx(pd,{size:13,className:"text-brand-cyan"}),"下一步推荐"]}),e.jsxs("div",{className:"mt-3 grid gap-2 text-xs text-ink-1 sm:grid-cols-2",children:[e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"生成分镜草图"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"训练角色 LoRA"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"创建镜头控制"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"预估渲染成本"})]})]})]}),e.jsx("div",{className:"relative mt-6 grid gap-3 sm:grid-cols-3",children:["SCRIPT","SCENE","SHOT"].map((t,n)=>e.jsxs("div",{className:"rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur",children:[e.jsx("div",{className:"text-[10px] font-semibold uppercase tracking-[0.16em] text-brand",children:t}),e.jsx("div",{className:"mt-8 h-1.5 rounded-full bg-white/10",children:e.jsx("div",{className:"h-full rounded-full bg-brand-gradient",style:{width:`${76-n*18}%`}})}),e.jsx("p",{className:"mt-3 text-xs text-ink-2",children:["语义拆解","资产绑定","模型路由"][n]})]},t))})]})]})})})}function Lr({icon:t,text:n,active:s}){return e.jsxs("div",{className:`flex gap-3 rounded-2xl p-3 ${s?"bg-white text-black":"bg-white/[0.04] text-ink-1"}`,children:[e.jsx("span",{className:s?"text-black":"text-brand",children:t}),e.jsx("span",{className:"text-sm leading-relaxed",children:n})]})}const Kd=[{icon:ld,title:"专业级镜头控制",desc:"把景别、焦段、机位、旋转、俯仰和缩放直接写进镜头节点，减少随机生成。",panel:"lens"},{icon:Id,title:"影棚级灯光控制",desc:"用主光、轮廓光、色温和全局亮度统一镜头质感，适合广告与短剧批量镜头。",panel:"light"},{icon:Cd,title:"视频对象替换",desc:"替换角色、服装或道具，同时保留构图、光照、运镜和场景连续性。",panel:"replace"}];function Jd(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Creative Controls"}),e.jsxs("h2",{className:"section-title mt-3",children:["从好看的生成，到",e.jsx("span",{className:"text-gradient",children:"可导演的镜头"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"对标 TapNow 的镜头、灯光与替换能力，PineLine 把控制项落到影视团队熟悉的镜头语言中。"})]}),e.jsx("div",{className:"mt-14 grid gap-5 lg:grid-cols-3",children:Kd.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-100px"},transition:{duration:.55,delay:n*.08},className:"overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] shadow-card",children:[e.jsxs("div",{className:"p-6",children:[e.jsx(t.icon,{size:20,className:"text-white"}),e.jsx("h3",{className:"mt-5 font-display text-2xl font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-3 text-sm leading-relaxed text-ink-1",children:t.desc})]}),e.jsx(Zd,{kind:t.panel})]},t.title))})]})})}function Zd({kind:t}){return t==="lens"?e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx(dd,{size:14,className:"text-brand"}),"镜头组合"]}),e.jsx("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:["18mm","35mm","50mm","85mm","135mm","200mm"].map((n,s)=>e.jsx("span",{className:`rounded-full border px-3 py-2 ${s===2?"border-white bg-white text-black":"border-white/10 bg-white/[0.04] text-ink-1"}`,children:n},n))}),e.jsx(Ms,{label:"旋转",value:"32%"}),e.jsx(Ms,{label:"俯仰",value:"62%"})]}):t==="light"?e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx($d,{size:14,className:"text-brand-cyan"}),"灯光参数"]}),e.jsx(Ms,{label:"亮度",value:"58%"}),e.jsx(Ms,{label:"色温 5600K",value:"72%"}),e.jsx("div",{className:"mt-4 grid grid-cols-3 gap-2 text-center text-xs text-ink-1",children:["主光","轮廓光","环境光"].map(n=>e.jsx("span",{className:"rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3",children:n},n))})]}):e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"relative h-40 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#101018,#29344A_40%,#FF6A3D_100%)]",children:[e.jsx("div",{className:"absolute left-5 top-5 h-20 w-14 rounded-full border-2 border-dashed border-white/70"}),e.jsx("div",{className:"absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white",children:"Actor A"}),e.jsx("div",{className:"absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black",children:"Replace"})]}),e.jsx("p",{className:"mt-3 text-xs leading-relaxed text-ink-2",children:"保留背景、构图与运镜，只替换选中主体。"})]})}function Ms({label:t,value:n}){return e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"mb-2 flex justify-between text-xs text-ink-2",children:[e.jsx("span",{children:t}),e.jsx("span",{children:n})]}),e.jsx("div",{className:"h-1.5 rounded-full bg-white/10",children:e.jsx("div",{className:"h-full rounded-full bg-brand-gradient",style:{width:n}})})]})}const Er=["Veo","Kling","Luma","Sora","Midjourney","GPT Image","Hailuo","Jimeng","Vidu","Flux","Pixverse","Gemini"];function e_(){return e.jsxs("section",{className:"relative py-16 md:py-20",children:[e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"mb-6 text-center",children:[e.jsx("div",{className:"eyebrow",children:"强大引擎支持"}),e.jsx("p",{className:"mt-2 text-sm text-ink-2",children:"接入图像、视频、音频与语言模型，由 Agent 按镜头任务自动选择最合适的引擎。"})]})}),e.jsx("div",{className:"marquee",children:e.jsx("div",{className:"marquee__track",children:[...Er,...Er].map((t,n)=>e.jsxs("div",{className:"flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-brand-gradient"}),e.jsx("span",{className:"whitespace-nowrap font-display text-sm font-medium text-ink-0",children:t})]},n))})})]})}const t_=[{icon:ni,title:"剧本 · Script",desc:"粘贴剧本或输入一段描述，AI 自动解析场景、角色、节奏与情绪。",tag:"NLP · Scene Graph",color:"#FF6A3D"},{icon:Rs,title:"分镜 · Storyboard",desc:"自动生成分镜草图，可拖拽调整镜头顺序、景别与时长。",tag:"Shot Graph",color:"#FF8A3D"},{icon:ei,title:"镜头 · Shot Design",desc:"设定机位、焦距、运镜、光线与色调，一键对标导演参考。",tag:"Cinematography",color:"#FF3D7F"},{icon:Bs,title:"生成 · Generate",desc:"按镜头智能路由最佳模型，分布式并行生成，支持风格一致性。",tag:"Multi-Model",color:"#7C5CFF"},{icon:Sd,title:"剪辑 · Edit",desc:"AI 剪辑节奏，镜头连接与转场，导出时间线到 DaVinci / PR。",tag:"NLE · Timeline",color:"#22D3EE"},{icon:vd,title:"音画 · Sound",desc:"台词配音、配乐、环境音与音效，一体化混音输出。",tag:"TTS · SFX · Score",color:"#B6FF5F"}];function n_(){return e.jsx("section",{id:"pipeline",className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"The PineLine"}),e.jsxs("h2",{className:"section-title mt-3",children:["一条贯穿全流程的 ",e.jsx("span",{className:"text-gradient",children:"影视创作管线"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"从文字到成片的六个阶段，每一步都由专用 AI 模块完成，节点与节点之间可视化连接， 状态、版本、参数全程可追溯。"})]}),e.jsxs("div",{className:"relative mt-16",children:[e.jsx("div",{className:"pointer-events-none absolute inset-x-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"}),e.jsx("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:t_.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n*.05},className:"card group overflow-hidden",children:[e.jsx("div",{className:"absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-[0.18] blur-3xl transition group-hover:opacity-40",style:{background:t.color}}),e.jsxs("div",{className:"relative flex items-center justify-between",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl border border-white/10",style:{background:`linear-gradient(135deg, ${t.color}22, transparent)`,color:t.color},children:e.jsx(t.icon,{size:18})}),e.jsxs("span",{className:"text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-2",children:["0",n+1]})]}),e.jsx("h3",{className:"relative mt-5 font-display text-xl font-semibold text-white",children:t.title}),e.jsx("p",{className:"relative mt-2 text-sm leading-relaxed text-ink-1",children:t.desc}),e.jsxs("div",{className:"relative mt-5 flex items-center justify-between text-xs",children:[e.jsx("span",{className:"chip",children:t.tag}),e.jsx(rs,{size:14,className:"text-ink-3 transition group-hover:translate-x-1 group-hover:text-white"})]})]},t.title))})]})]})})}const s_=[{icon:yd,title:"无限画布",desc:"任意缩放的工作板，把整部片子铺成一张地图。"},{icon:oi,title:"克隆配方",desc:"公开作品可 fork 成模板，保留节点、参数、素材与模型路由。"},{icon:Rd,title:"实时协作",desc:"导演、编剧、制片同框评论，评论即批注、版本自动分叉。"},{icon:gd,title:"全链路回溯",desc:"每次生成都带时间线、Seed 与参数，一键回到任意历史版本。"}];function o_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]",children:[e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Board"}),e.jsxs("h2",{className:"section-title mt-3",children:["像",e.jsx("span",{className:"text-gradient",children:"Tapflow"}),"一样开放，",e.jsx("br",{}),"但为影视生产而设计"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"节点代表一次创作动作：文本、参考图、角色、镜头控制、模型生成与剪辑。 你可以从社区克隆配方，也可以在自己的项目里把每一次生成回溯到原始上下文。"}),e.jsx("div",{className:"mt-8 grid grid-cols-2 gap-4",children:s_.map(t=>e.jsxs("div",{className:"card",children:[e.jsx(t.icon,{size:16,className:"text-brand"}),e.jsx("div",{className:"mt-3 text-sm font-semibold text-white",children:t.title}),e.jsx("div",{className:"mt-1 text-xs leading-relaxed text-ink-2",children:t.desc})]},t.title))}),e.jsxs("div",{className:"mt-8 flex items-center gap-3",children:[e.jsxs(xt,{to:"/studio",className:"btn-primary",children:["打开 Studio",e.jsx(ad,{size:14})]}),e.jsx(xt,{to:"/templates",className:"btn-ghost",children:"浏览模板"})]})]}),e.jsxs(Xe.div,{initial:{opacity:0,scale:.96},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.8,ease:[.22,1,.36,1]},className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-bg-2 to-bg-1 shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-60"}),e.jsx(r_,{}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.07] bg-[#0a0a10]/80 px-4 py-2 text-[11px] text-ink-2 backdrop-blur",children:[e.jsx("span",{children:"18 nodes · 4 chapters · 02:34"}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand"}),"Rendering 3 shots · ETA 42s"]})]})]})]})})})}function r_(){return e.jsxs("svg",{className:"absolute inset-0 h-full w-full",viewBox:"0 0 640 480",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"w1",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF"})]}),e.jsxs("linearGradient",{id:"w2",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#7C5CFF"}),e.jsx("stop",{offset:"100%",stopColor:"#22D3EE"})]})]}),e.jsx("path",{d:"M 110 140 C 200 140 200 210 290 210",stroke:"url(#w1)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 110 260 C 200 260 200 210 290 210",stroke:"url(#w1)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 390 210 C 480 210 480 140 530 140",stroke:"url(#w2)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 390 230 C 480 230 480 310 530 310",stroke:"url(#w2)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx(ns,{x:30,y:100,color:"#FF6A3D",w:160,h:80,title:"SCRIPT · Ch.2",sub:"雨夜屋顶 · 120 字"}),e.jsx(ns,{x:30,y:220,color:"#FF6A3D",w:160,h:80,title:"CHARACTER",sub:"林夜 · 亚洲男 · 风衣"}),e.jsx(ns,{x:230,y:170,color:"#7C5CFF",w:160,h:80,title:"STORYBOARD",sub:"3 shots · wide/med/close"}),e.jsx(ns,{x:470,y:100,color:"#22D3EE",w:140,h:80,title:"VIDEO · Sora",sub:"24fps · 4K"}),e.jsx(ns,{x:470,y:270,color:"#B6FF5F",w:140,h:80,title:"AUDIO · FX",sub:"雨声 + 环境低频"}),e.jsx("circle",{cx:"320",cy:"220",r:"3",fill:"#fff",children:e.jsx("animate",{attributeName:"opacity",values:"0.3;1;0.3",dur:"1.4s",repeatCount:"indefinite"})})]})}function ns({x:t,y:n,w:s,h:i,color:o,title:r,sub:d}){return e.jsxs("g",{children:[e.jsx("rect",{x:t,y:n,width:s,height:i,rx:10,fill:"#0E0E14",stroke:"rgba(255,255,255,0.12)"}),e.jsx("rect",{x:t,y:n,width:s,height:3,rx:2,fill:o}),e.jsx("text",{x:t+12,y:n+28,fill:o,fontSize:"10",fontFamily:"Space Grotesk",fontWeight:"700",letterSpacing:"1.2",children:r}),e.jsx("text",{x:t+12,y:n+50,fill:"#C4C4CF",fontSize:"11",fontFamily:"Inter",children:d}),e.jsx("circle",{cx:t+s-12,cy:n+14,r:"3",fill:o,children:e.jsx("animate",{attributeName:"opacity",values:"0.4;1;0.4",dur:"1.8s",repeatCount:"indefinite"})})]})}const i_=[{icon:Dd,title:"节点画布管线",desc:"剧本 → 分镜 → 分镜图 → 视频，连线即上游产出自动喂下游，一键跑通整条链。",tone:"from-[#7C5CFF]/20 to-transparent"},{icon:md,title:"多模型接入",desc:"文本 MiniMax / 豆包、图像 Gemini / Seedream、视频 Seedance / 海螺，按需切换。",tone:"from-[#FF6A3D]/20 to-transparent"},{icon:Bd,title:"角色/场景一致性",desc:"从剧本提取角色、场景、道具生成三视图/宫格参考，派生分镜图时自动挂载。",tone:"from-[#FF3D7F]/20 to-transparent"},{icon:Rs,title:"分镜一键成片",desc:"分镜图批量派生镜头视频，按 Seedance 官方公式组装提示词，含音色一致性与纯净模式。",tone:"from-[#22D3EE]/20 to-transparent"},{icon:kd,title:"全能参考",desc:"图片、视频、音频多模态参考生视频，锁定画面风格、运镜与音色。",tone:"from-[#B6FF5F]/20 to-transparent"},{icon:Ld,title:"AI 助手编排",desc:"一句话让助手搭建/修改/运行管线，支持联网、传图分析、记忆你的偏好。",tone:"from-[#FF6A3D]/20 to-transparent"},{icon:fd,title:"本地留存",desc:"画布、素材、生成历史全存本机浏览器，项目档案完整保留媒体，刷新不丢。",tone:"from-[#7C5CFF]/20 to-transparent"},{icon:Md,title:"AI 生成标识",desc:"下载图片自动烧「AI 生成」角标，交付含标识与创作过程存证，合规送审。",tone:"from-[#FF3D7F]/20 to-transparent"}];function l_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Why PineLine"}),e.jsxs("h2",{className:"section-title mt-3",children:["为",e.jsx("span",{className:"text-gradient",children:"专业影视"}),"而生， 而非玩具"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"广告公司、短剧厂牌、品牌创意部门的真实工作流被完整映射到产品之中。"})]}),e.jsx("div",{className:"mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",children:i_.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n%4*.05},className:"card group relative overflow-hidden",children:[e.jsx("div",{className:`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br ${t.tone} opacity-60 transition group-hover:opacity-100`}),e.jsxs("div",{className:"relative",children:[e.jsx(t.icon,{size:18,className:"text-white"}),e.jsx("h3",{className:"mt-4 font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-ink-1",children:t.desc})]})]},t.title))})]})})}const a_=[{name:"林夜",role:"都市 · 男主",tone:"from-[#1a0f2a] to-[#ff3d7f]"},{name:"Aria",role:"Sci-Fi · 女主",tone:"from-[#071029] to-[#22d3ee]"},{name:"苏白",role:"古风 · 少女",tone:"from-[#2a0f12] to-[#ff6a3d]"},{name:"老K",role:"悬疑 · 配角",tone:"from-[#161616] to-[#7c5cff]"}];function c_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid items-center gap-12 lg:grid-cols-2",children:[e.jsxs(Xe.div,{initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"Virtual Actors"}),e.jsxs("h2",{className:"section-title mt-3",children:["可签约的",e.jsx("span",{className:"text-gradient",children:"数字演员"}),"，",e.jsx("br",{}),"横跨全片保持一致性"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"训练一位属于你项目的数字演员，面部、体型、声线、表演风格可控。 不同镜头、不同模型下，她 / 他始终是同一个人。"}),e.jsxs("ul",{className:"mt-6 space-y-3 text-sm text-ink-1",children:[e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(It,{size:14,className:"mt-0.5 text-brand"}),"上传 3~10 张照片，10 分钟完成定制训练"]}),e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(It,{size:14,className:"mt-0.5 text-brand"}),"跨模型迁移：同一角色可在 Sora / Kling / Veo 下统一"]}),e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(It,{size:14,className:"mt-0.5 text-brand"}),"声纹克隆 + 情绪曲线：台词按情绪节奏自动生成"]})]}),e.jsxs("div",{className:"mt-7 flex gap-3",children:[e.jsxs("button",{className:"btn-primary",children:[e.jsx(Ed,{size:14}),"训练我的数字演员"]}),e.jsxs("button",{className:"btn-ghost",children:[e.jsx(Bs,{size:14}),"从公共演员库选择"]})]})]}),e.jsx(Xe.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},className:"grid grid-cols-2 gap-4",children:a_.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:n*.08},className:"relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.07]",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${t.tone}`}),e.jsx("div",{className:"absolute inset-x-0 top-[18%] mx-auto h-[38%] w-[46%] rounded-full bg-gradient-to-b from-white/25 to-transparent blur-2xl"}),e.jsx("div",{className:"absolute inset-x-0 bottom-[26%] mx-auto h-[22%] w-[34%] rounded-full bg-gradient-to-b from-white/15 to-transparent blur-2xl"}),e.jsx("div",{className:"animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"}),e.jsx("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-display text-sm font-semibold text-white",children:t.name}),e.jsx("div",{className:"text-[11px] text-ink-1",children:t.role})]}),e.jsxs("span",{className:"chip !py-0.5 !text-[10px]",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-brand"}),"LoRA·v3"]})]})})]},t.name))})]})})})}const d_=[{title:"雨夜都市悬疑",meta:"6 镜头 · 角色一致性 · 冷蓝灯光",tone:"from-[#111827] via-[#164E63] to-[#FF3D7F]"},{title:"高端腕表 TVC",meta:"产品微距 · 影棚反射 · 30s",tone:"from-[#120B08] via-[#92400E] to-[#FDE68A]"},{title:"国风短剧预告",meta:"场景资产 · 角色 LoRA · 配乐",tone:"from-[#0F172A] via-[#7C2D12] to-[#F97316]"},{title:"赛博城市片头",meta:"航拍运镜 · 霓虹雨景 · 12s",tone:"from-[#020617] via-[#3730A3] to-[#22D3EE]"}];function __(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center",children:[e.jsxs(Xe.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Community"}),e.jsxs("h2",{className:"mt-4 font-display text-display-md text-white",children:["发现专业配方，",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"克隆配方"}),"再创作"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"TapNow 的社区价值在于公开画布、复用流程。PineLine 把它转成影视配方： 你可以 fork 一套完整镜头、模型、角色和剪辑参数，而不是从空白开始。"}),e.jsxs(xt,{to:"/showcase",className:"btn-light mt-8",children:["查看配方",e.jsx(rs,{size:14})]})]}),e.jsx("div",{className:"grid gap-3 sm:grid-cols-2",children:d_.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.55,delay:n*.06},className:"group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E14]",children:[e.jsxs("div",{className:`relative h-36 bg-gradient-to-br ${t.tone}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.26),transparent_28%)]"}),e.jsx("button",{className:"absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white backdrop-blur",children:e.jsx(ud,{size:16})})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-1 text-xs text-ink-2",children:t.meta}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx(xd,{size:13,className:"text-brand"}),"Fork 到 Studio"]})]})]},t.title))})]})})})}const u_=[{title:"《无声之城》",author:"寒川映画",cat:"短片 · 科幻",tone:"from-[#061127] via-[#0b2a3a] to-[#22d3ee]",ratio:"aspect-[16/9]"},{title:"Lumen Watch",author:"Noire Agency",cat:"广告 · 品牌",tone:"from-[#1a0a14] via-[#3a0c20] to-[#ff3d7f]",ratio:"aspect-[4/5]"},{title:"《归鹿》",author:"梨花工作室",cat:"短剧 · 古风",tone:"from-[#1a0f0a] via-[#2a160c] to-[#ff6a3d]",ratio:"aspect-[9/16]"},{title:"Hyperion",author:"Studio Vega",cat:"MV · 电子",tone:"from-[#10081f] via-[#1d1040] to-[#7c5cff]",ratio:"aspect-[16/9]"},{title:"夜行列车",author:"Mira Films",cat:"短片 · 悬疑",tone:"from-[#0a0a0a] via-[#1a1a1a] to-[#5a5a66]",ratio:"aspect-[1/1]"},{title:"Echo Chamber",author:"Acoustic Lab",cat:"MV · 实验",tone:"from-[#04131a] via-[#07283a] to-[#b6ff5f]",ratio:"aspect-[4/5]"}];function h_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"flex items-end justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"eyebrow",children:"Showcase Wall"}),e.jsxs("h2",{className:"section-title mt-3",children:["由 PineLine 生长的 ",e.jsx("span",{className:"text-gradient",children:"真实作品"})]})]}),e.jsx("a",{href:"/showcase",className:"btn-ghost hidden md:inline-flex",children:"查看全部"})]}),e.jsx("div",{className:"mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]",children:u_.map((t,n)=>e.jsx(Xe.article,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n%3*.05},className:"group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07]",children:e.jsxs("div",{className:`relative ${t.ratio} w-full`,children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${t.tone}`}),e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"}),e.jsx("div",{className:"noise absolute inset-0"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100",children:e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md",children:e.jsx(jd,{size:20,fill:"#fff",className:"text-white"})})}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-display text-base font-semibold text-white",children:t.title}),e.jsx("div",{className:"text-xs text-ink-1",children:t.author})]}),e.jsx("span",{className:"chip !py-0.5 !text-[10px]",children:t.cat})]})]})},t.title))})]})})}const m_=[{n:"01",title:"需求与脚本",desc:"给一段主题或一篇文章，AI 改写为剧本，你确认方向与调性。"},{n:"02",title:"分镜与资产",desc:"自动拆分镜、提取角色/场景/道具生成一致性参考，逐镜确认。"},{n:"03",title:"生成与迭代",desc:"分镜图与镜头视频一键成片，按 Seedance 官方公式组装提示词，可反复调。"},{n:"04",title:"交付与存证",desc:"打包成片 + AI 生成标识 + 创作过程报告，可直接交付客户或发布。"}];function p_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"How it works"}),e.jsxs("h2",{className:"section-title mt-3",children:["从一段文本到",e.jsx("span",{className:"text-gradient",children:"一条成片"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"四步走完剧本到交付，每一步都在你的确认下推进。"})]}),e.jsx("div",{className:"mt-14 grid gap-4 lg:grid-cols-4",children:m_.map((t,n)=>e.jsxs(Xe.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n*.07},className:"card",children:[e.jsx("div",{className:"font-display text-2xl font-semibold text-gradient",children:t.n}),e.jsx("h3",{className:"mt-3 text-sm font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-ink-1",children:t.desc})]},t.n))})]})})}function x_(){const t=Dn.creditPacks.find(n=>"highlight"in n&&n.highlight)??Dn.creditPacks[0];return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Pricing"}),e.jsxs("h2",{className:"section-title mt-3",children:["用",e.jsx("span",{className:"text-gradient",children:"积分"}),"，按需创作"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"充值积分或订阅按月产能，生成时按模型实际用量扣积分；企业批量制作可走定制服务。"})]}),e.jsxs("div",{className:"mx-auto mt-14 grid max-w-3xl gap-4 md:grid-cols-2",children:[e.jsxs("div",{className:"animated-border relative flex flex-col rounded-2xl border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ti,{size:18,className:"text-brand"}),e.jsx("div",{className:"font-display text-lg font-semibold text-white",children:"积分自助购买"})]}),e.jsxs("div",{className:"mt-5 flex items-baseline gap-1",children:[e.jsxs("span",{className:"font-display text-4xl font-semibold text-gradient",children:["¥",t.priceCny]}),e.jsxs("span",{className:"ml-1 text-sm text-ink-2",children:["/ ",t.credits.toLocaleString()," 积分"]})]}),e.jsx("ul",{className:"mt-6 space-y-2.5 text-sm text-ink-1",children:["充值即用，永不过期","按模型实际用量扣费","全模型可用","生成前显示消耗"].map(n=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Es,{size:14,className:"mt-0.5 text-brand"}),n]},n))}),e.jsx(xt,{to:"/pricing",className:"btn-primary mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",children:"查看套餐"})]}),e.jsxs("div",{className:"relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Zr,{size:18,className:"text-brand"}),e.jsx("div",{className:"font-display text-lg font-semibold text-white",children:"企业定制服务"})]}),e.jsx("div",{className:"mt-5 font-display text-4xl font-semibold text-white",children:"面议"}),e.jsx("ul",{className:"mt-6 space-y-2.5 text-sm text-ink-1",children:Dn.service.items.map(n=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Es,{size:14,className:"mt-0.5 text-brand"}),n]},n))}),e.jsx(xt,{to:"/pricing",className:"btn-ghost mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",children:"预约咨询"})]})]})]})})}const g_=[{q:"PineLine 和单点的视频生成工具有什么不同？",a:"单点工具只负责一次生成。PineLine 是一条可视化管线：剧本 → 分镜 → 分镜图 → 镜头视频在一张画布上连线贯通，上游产出自动喂下游，可一键跑通整条链，并自动记录每一步的提示词与版本。"},{q:"为什么生成能力要用积分/邀请码？",a:"视频生成会产生真实的模型调用成本。用积分预付费、按实际用量扣费，能保证服务稳定、避免被滥用。画布浏览、工程导入导出不需要积分，只有点击生成时才消耗。"},{q:"生成的内容能用于商业项目吗？如何标识？",a:"可以。我们只走模型服务商的付费商用通道。依据《人工智能生成合成内容标识办法》，下载的图片会自动烧「AI 生成」角标，视频交付需按手册叠加角标；每次交付可附带含提示词、模型、时间线的创作过程报告，便于合规送审与确权。"},{q:"我的画布和素材存在哪里？会不会丢？",a:"默认存在你浏览器本地（IndexedDB），项目档案完整保留媒体，刷新和重开项目会自动恢复。不会上传到我们的服务器；清除浏览器数据或更换设备会导致本地数据丢失，重要成片请及时下载。"},{q:"角色一致性怎么做？",a:"从剧本一键提取角色、场景、道具，生成三视图/宫格参考节点；派生分镜图时按名字自动挂载对应参考图，让同一角色跨镜头保持一致。含人物的画面建议用 Seedream 生成（Seedance 视频不接受疑似真人人脸的参考图）。"},{q:"企业批量制作怎么合作？",a:"出版社、杂志社、教育机构等批量视频需求可走定制服务：按月产能包交付，含 AI 标识与存证报告。在定价页「企业定制服务」预约咨询即可。"}];function ii(){const[t,n]=a.useState(0);return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"FAQ"}),e.jsx("h2",{className:"section-title mt-3",children:"关于 PineLine，你可能想问"})]}),e.jsx("div",{className:"mx-auto mt-12 max-w-3xl divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02]",children:g_.map((s,i)=>{const o=t===i;return e.jsxs("button",{onClick:()=>n(o?null:i),className:"block w-full px-6 py-5 text-left",children:[e.jsxs("div",{className:"flex items-center justify-between gap-6",children:[e.jsx("span",{className:"font-medium text-white",children:s.q}),e.jsx(_d,{size:16,className:`shrink-0 text-ink-2 transition ${o?"rotate-180 text-white":""}`})]}),e.jsx("div",{className:`grid overflow-hidden transition-all duration-300 ${o?"mt-3 grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`,children:e.jsx("div",{className:"overflow-hidden text-sm leading-relaxed text-ink-1",children:s.a})})]},s.q)})})]})})}function li(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"animated-border relative overflow-hidden rounded-3xl border border-transparent bg-[#0E0E16] p-10 text-center md:p-16",children:[e.jsx("div",{className:"pointer-events-none absolute inset-x-0 -top-20 mx-auto h-[300px] w-[900px] rounded-full bg-brand-gradient opacity-20 blur-[120px]"}),e.jsx("div",{className:"pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]"}),e.jsxs("span",{className:"chip relative",children:[e.jsx(It,{size:12,className:"text-brand"}),"你的下一部片子，从一条管线开始"]}),e.jsxs("h2",{className:"relative mt-6 font-display text-display-lg font-semibold text-white [word-break:keep-all]",children:["准备好把",e.jsx("span",{className:"text-gradient",children:"剧本"}),"变成",e.jsx("span",{className:"text-gradient",children:"电影"}),"了吗？"]}),e.jsx("p",{className:"relative mx-auto mt-5 max-w-xl text-ink-1",children:"打开浏览器就能进画布搭管线；充值积分后按用量生成，企业批量制作可走定制服务。"}),e.jsxs("div",{className:"relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",children:[e.jsxs(xt,{to:"/studio",className:"btn-primary",children:["进入 Studio",e.jsx(rs,{size:14})]}),e.jsx(xt,{to:"/pricing",className:"btn-ghost",children:"查看所有方案"})]})]})})})}function f_(){return e.jsxs(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},className:"relative flex-1",children:[e.jsx(Xd,{}),e.jsx(qd,{}),e.jsx(Gd,{}),e.jsx(Jd,{}),e.jsx(e_,{}),e.jsx(n_,{}),e.jsx(o_,{}),e.jsx(l_,{}),e.jsx(c_,{}),e.jsx(__,{}),e.jsx(h_,{}),e.jsx(p_,{}),e.jsx(x_,{}),e.jsx(ii,{}),e.jsx(li,{})]})}const y_=["全部","短片","广告 / TVC","短剧","MV","电商","预告片","社交媒体"],b_=[{title:"电影级品牌 TVC · 30s",cat:"广告 / TVC",stages:6,tone:"from-[#1a0a14] to-[#ff3d7f]"},{title:"雨夜都市独白短片",cat:"短片",stages:8,tone:"from-[#061127] to-[#22d3ee]"},{title:"古风短剧 · 1 集 3 分钟",cat:"短剧",stages:9,tone:"from-[#1a0f0a] to-[#ff6a3d]"},{title:"电子 MV · 节奏卡点",cat:"MV",stages:7,tone:"from-[#10081f] to-[#7c5cff]"},{title:"电商主图视频 · 15s",cat:"电商",stages:4,tone:"from-[#0a1f0a] to-[#b6ff5f]"},{title:"院线预告片节奏",cat:"预告片",stages:8,tone:"from-[#0a0a0a] to-[#ff6a3d]"},{title:"小红书竖屏种草",cat:"社交媒体",stages:5,tone:"from-[#1a0a20] to-[#ff3d7f]"},{title:"科幻世界观预告",cat:"预告片",stages:9,tone:"from-[#04131a] to-[#22d3ee]"},{title:"悬疑短剧 · 开场钩子",cat:"短剧",stages:7,tone:"from-[#0a0a0a] to-[#5a5a66]"}];function w_(){const[t,n]=a.useState("全部"),[s,i]=a.useState(""),o=b_.filter(r=>(t==="全部"||r.cat===t)&&r.title.toLowerCase().includes(s.toLowerCase()));return e.jsx(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Templates"}),e.jsxs("h1",{className:"section-title mt-3",children:["从一个",e.jsx("span",{className:"text-gradient",children:"模板"}),"，到一部成片"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"常见视频类型的工作流示例，帮你快速上手管线搭建思路；进入 Studio 即可动手。"})]}),e.jsxs("div",{className:"mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between",children:[e.jsxs("div",{className:"relative w-full md:max-w-sm",children:[e.jsx(Nd,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-ink-2"}),e.jsx("input",{value:s,onChange:r=>i(r.target.value),placeholder:"搜索模板、风格或品类",className:"w-full rounded-full border border-white/[0.07] bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm text-white outline-none transition focus:border-white/20"})]}),e.jsx("div",{className:"flex flex-wrap items-center gap-1",children:y_.map(r=>e.jsx("button",{onClick:()=>n(r),className:`rounded-full px-3 py-1.5 text-xs font-medium transition ${t===r?"bg-white/[0.08] text-white":"text-ink-1 hover:text-white"}`,children:r},r))})]}),e.jsx("div",{className:"mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:o.map((r,d)=>e.jsxs(Xe.article,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:d*.03},className:"card group overflow-hidden",children:[e.jsxs("div",{className:`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${r.tone}`,children:[e.jsx("div",{className:"absolute inset-0 noise"}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[10px] text-white/70",children:[r.stages," stages · preset"]})]}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx("span",{className:"chip",children:r.cat}),e.jsxs("span",{className:"flex items-center gap-1 text-[11px] text-ink-2",children:[e.jsx(hd,{size:11})," ",r.stages," 步管线"]})]}),e.jsx("h3",{className:"mt-3 font-display text-base font-semibold text-white",children:r.title}),e.jsx("div",{className:"mt-2 flex items-center justify-end text-[11px]",children:e.jsxs(xt,{to:"/studio",className:"flex items-center gap-1 text-brand transition hover:text-white",children:[e.jsx(It,{size:11})," 进入 Studio"]})})]},r.title))})]})})}function v_(){return e.jsx(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Showcase"}),e.jsxs("h1",{className:"section-title mt-3",children:["由 PineLine 生长的",e.jsx("span",{className:"text-gradient",children:"作品"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"我们正在整理用 PineLine 制作的真实案例，陆续上传中。"})]}),e.jsxs("div",{className:"mx-auto mt-14 max-w-xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center",children:[e.jsx("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient",children:e.jsx(Rs,{size:24,className:"text-white"})}),e.jsx("h2",{className:"mt-5 font-display text-lg font-semibold text-white",children:"作品陆续上传中"}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-ink-1",children:"想让你的作品或案例出现在这里？或有批量制作需求，欢迎联系我们。"}),e.jsxs("div",{className:"mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row",children:[e.jsxs(xt,{to:"/studio",className:"btn-primary inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold",children:[e.jsx(It,{size:14})," 进入 Studio 创作"]}),e.jsx("a",{href:`mailto:${ln.email}`,className:"btn-ghost inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold",children:"联系我们"})]})]})]})})}function k_(){const[t,n]=a.useState("credits"),s="联系购买",i=()=>{window.location.href=`mailto:${ln.email}?subject=${encodeURIComponent("PineLine 积分购买")}`};return e.jsxs(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:[e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Pricing"}),e.jsxs("h1",{className:"section-title mt-3",children:["用",e.jsx("span",{className:"text-gradient",children:"积分"}),"，按需创作"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"充值积分或订阅按月产能，生成时按模型实际用量扣积分；企业批量制作可走定制服务。"})]}),e.jsx("div",{className:"mt-8 flex justify-center",children:e.jsx("div",{className:"inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 text-xs",children:[["credits","积分包"],["subscription","月订阅"]].map(([o,r])=>e.jsx("button",{onClick:()=>n(o),className:`rounded-full px-4 py-1.5 transition ${t===o?"bg-white/[0.08] text-white":"text-ink-1"}`,children:r},o))})}),e.jsx("div",{className:"mt-10 grid gap-4 md:grid-cols-3",children:t==="credits"?Dn.creditPacks.map(o=>e.jsx(Rr,{name:o.name,priceCny:o.priceCny,priceUsd:o.priceUsd,unit:"",highlight:"highlight"in o&&o.highlight,lines:[`${o.credits.toLocaleString()} 积分`,o.tag,"永不过期","全模型可用"],cta:s,onBuy:i},o.id)):Dn.subscriptions.map(o=>e.jsx(Rr,{name:o.name,priceCny:o.priceCnyM,priceUsd:o.priceUsdM,unit:"/ 月",highlight:"highlight"in o&&o.highlight,lines:[...o.features],cta:s,onBuy:i},o.id))}),e.jsxs("p",{className:"mt-6 text-center text-[13px] text-ink-2",children:[e.jsx(ti,{size:13,className:"mr-1 inline"}),"生成按模型实际用量扣积分（如短视频约 100 积分/5 秒、生图约 5 积分/张）；具体消耗在生成前显示。"]}),e.jsxs("div",{className:"mx-auto mt-20 max-w-3xl rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Zr,{size:18,className:"text-brand"}),e.jsx("h2",{className:"font-display text-xl font-semibold text-white",children:"企业定制服务"})]}),e.jsx("p",{className:"mt-2 text-sm text-ink-1",children:"出版社、杂志社、教育机构、MCN 等批量视频需求，提供服务式交付与定制工作流。"}),e.jsx("ul",{className:"mt-5 grid gap-2.5 text-sm text-ink-1 sm:grid-cols-2",children:Dn.service.items.map(o=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Es,{size:14,className:"mt-0.5 text-brand"}),o]},o))}),e.jsxs("a",{href:`mailto:${ln.email}`,className:"btn-primary mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",children:["预约咨询 · ",ln.email]})]})]}),e.jsx(ii,{}),e.jsx(li,{})]})}function Rr({name:t,priceCny:n,priceUsd:s,unit:i,highlight:o,lines:r,cta:d,onBuy:p}){return e.jsxs("div",{className:`relative flex flex-col rounded-2xl border p-7 ${o?"animated-border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]":"border-white/[0.07] bg-white/[0.02]"}`,children:[o&&e.jsx("div",{className:"absolute right-5 top-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white",children:"推荐"}),e.jsx("div",{className:"font-display text-lg font-semibold text-white",children:t}),e.jsxs("div",{className:"mt-6 flex items-baseline gap-1",children:[e.jsxs("span",{className:`font-display text-4xl font-semibold ${o?"text-gradient":"text-white"}`,children:["¥",n]}),i&&e.jsx("span",{className:"text-sm text-ink-2",children:i}),e.jsxs("span",{className:"ml-1.5 text-xs text-ink-3",children:["约 $",s]})]}),e.jsx("ul",{className:"mt-6 space-y-2.5 text-sm text-ink-1",children:r.map(m=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Es,{size:14,className:"mt-0.5 text-brand"}),m]},m))}),e.jsx("button",{onClick:p,className:`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${o?"btn-primary":"btn-ghost"}`,children:d})]})}function j_(){return e.jsx(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28 pb-24",children:e.jsxs("section",{className:"container-x mx-auto max-w-3xl",children:[e.jsx("h1",{className:"section-title",children:"服务条款"}),e.jsx("p",{className:"mt-3 text-sm text-ink-2",children:"最后更新：2026 年 7 月"}),e.jsxs("div",{className:"mt-10 space-y-8 text-sm leading-relaxed text-ink-1",children:[e.jsx(fn,{title:"1. 服务性质",children:"PineLine 提供两类服务：(a) 在线创作工具（画布式 AIGC 视频创作，按积分计量）； (b) 受托内容创作服务（按需为客户制作视频成片）。使用本站即表示您同意本条款。"}),e.jsx(fn,{title:"2. AI 生成内容与标识",children:"本站生成的图片/视频均为人工智能生成合成内容。依据《人工智能生成合成内容标识办法》， 交付与发布时须带显式标识（「AI 生成」角标）与隐式标识（元数据/说明）。您不得删除、 篡改或隐匿标识，或将本站产物用于误导性用途。"}),e.jsx(fn,{title:"3. 知识产权与授权",children:"受托创作交付的成片，在您结清费用后，其可转让的权利归您所有；您对提供给我们的素材 （文字、图片、真人形象等）保证拥有合法权利或授权。AI 生成内容的著作权认定在中国法下 属个案判断，我们不对其权利的绝对性作出保证。"}),e.jsx(fn,{title:"4. 内容合规与责任",children:"您不得使用本站生成违法、侵权、虚假或违背公序良俗的内容。生成结果由第三方模型产出， 我们不对其准确性、适用性负责；涉专业领域（医疗、法律、食品安全等）内容请自行审校， 终审责任由您承担。"}),e.jsx(fn,{title:"5. 积分与退款",children:"积分为预付费用量凭证，用于抵扣模型生成成本，一经用于生成不可退还；未使用的积分退款 政策以购买时的说明为准。"}),e.jsx(fn,{title:"6. 免责与变更",children:"服务按「现状」提供，不保证不中断或无差错。我们可能不时更新本条款，重大变更会在本页公示。"}),e.jsxs(fn,{title:"7. 联系",children:["如有疑问请联系 ",ln.email,"。"]})]})]})})}function fn({title:t,children:n}){return e.jsxs("div",{children:[e.jsx("h2",{className:"font-display text-lg font-semibold text-white",children:t}),e.jsx("p",{className:"mt-2",children:n})]})}function C_(){return e.jsx(Xe.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28 pb-24",children:e.jsxs("section",{className:"container-x mx-auto max-w-3xl",children:[e.jsx("h1",{className:"section-title",children:"隐私政策"}),e.jsx("p",{className:"mt-3 text-sm text-ink-2",children:"最后更新：2026 年 7 月"}),e.jsxs("div",{className:"mt-10 space-y-8 text-sm leading-relaxed text-ink-1",children:[e.jsx(Rn,{title:"1. 数据本地存储",children:"您的画布、工程、素材库与生成历史默认存储在您浏览器本地（localStorage 与 IndexedDB）， 不会上传到我们的服务器。清除浏览器数据或更换设备将导致本地数据丢失。"}),e.jsx(Rn,{title:"2. 生成请求与第三方模型",children:"当您发起生成时，提示词与所需参考素材会发送到我们的服务端并转发给第三方模型服务商 （火山方舟 / MiniMax / Google 等）以完成生成。这些内容受各服务商的隐私与数据政策约束。"}),e.jsx(Rn,{title:"3. 日志",children:"为排障与对账，我们会记录生成请求的时间、路径、模型、耗时、成败与供应商 request-id （不含完整媒体内容），保留有限期限。"}),e.jsx(Rn,{title:"4. 无账号体系",children:"当前不设注册登录账号；访问码仅用于校验生成权限与计量积分，不关联您的真实身份信息。"}),e.jsx(Rn,{title:"5. Cookie 与分析",children:"本站不使用第三方广告追踪 Cookie。"}),e.jsxs(Rn,{title:"6. 联系",children:["隐私相关问题请联系 ",ln.email,"。"]})]})]})})}function Rn({title:t,children:n}){return e.jsxs("div",{children:[e.jsx("h2",{className:"font-display text-lg font-semibold text-white",children:t}),e.jsx("p",{className:"mt-2",children:n})]})}const S_=a.lazy(()=>Tr(()=>import("./Studio-Btyz4nTg.js"),__vite__mapDeps([0,1,2,3,4,5]))),N_=a.lazy(()=>Tr(()=>import("./Projects-BmdvsrOU.js"),__vite__mapDeps([6,1,2,4,3]))),M_=typeof window<"u"&&new URLSearchParams(window.location.search).has("agentation");function Br(){return e.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-bg-0 text-ink-3",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"h-2 w-2 animate-pulseDot rounded-full bg-brand"}),"加载 Studio…"]})})}function $_(){const t=Di(),n=t.pathname.startsWith("/studio");return e.jsxs("div",{className:"relative flex min-h-screen flex-col",children:[!n&&e.jsx(Ad,{}),e.jsx(Ti,{mode:"wait",children:e.jsxs(Pi,{location:t,children:[e.jsx(on,{path:"/",element:e.jsx(f_,{})}),e.jsx(on,{path:"/studio",element:e.jsx(a.Suspense,{fallback:e.jsx(Br,{}),children:e.jsx(S_,{})})}),e.jsx(on,{path:"/studio/projects",element:e.jsx(a.Suspense,{fallback:e.jsx(Br,{}),children:e.jsx(N_,{})})}),e.jsx(on,{path:"/templates",element:e.jsx(w_,{})}),e.jsx(on,{path:"/showcase",element:e.jsx(v_,{})}),e.jsx(on,{path:"/pricing",element:e.jsx(k_,{})}),e.jsx(on,{path:"/terms",element:e.jsx(j_,{})}),e.jsx(on,{path:"/privacy",element:e.jsx(C_,{})})]},t.pathname)}),!n&&e.jsx(Wd,{}),M_&&e.jsx(sd,{endpoint:"http://localhost:4747"})]})}class I_ extends fo.Component{constructor(){super(...arguments);Vn(this,"state",{error:null});Vn(this,"reload",()=>{window.location.reload()});Vn(this,"goProjects",()=>{window.location.href="/projects"});Vn(this,"clearCanvasCache",()=>{if(window.confirm(`将清除本地画布缓存（localStorage）后重新加载。
项目档案与生成历史保存在 IndexedDB 中，不受影响。继续？`)){try{window.localStorage.removeItem("pineline-studio-v1")}catch{}window.location.reload()}})}static getDerivedStateFromError(s){return{error:s}}componentDidCatch(s,i){console.error("[pineline] 渲染崩溃",s,i.componentStack)}render(){var s;return this.state.error?e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#0b0b0f] px-6 text-zinc-200",children:e.jsxs("div",{className:"w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6",children:[e.jsx("div",{className:"text-lg font-semibold",children:"页面遇到问题，已安全停住"}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-zinc-400",children:"画布渲染发生异常。你的项目档案与生成历史保存在浏览器 IndexedDB 中，通常不会丢失。可先尝试重新加载；若反复出现，再清除画布缓存。"}),e.jsx("pre",{className:"mt-3 max-h-28 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-red-300",children:String(((s=this.state.error)==null?void 0:s.message)??this.state.error)}),e.jsxs("div",{className:"mt-4 flex flex-wrap gap-2",children:[e.jsx("button",{onClick:this.reload,className:"rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200",children:"重新加载"}),e.jsx("button",{onClick:this.goProjects,className:"rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10",children:"回到项目列表"}),e.jsx("button",{onClick:this.clearCanvasCache,className:"rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10",children:"清除画布缓存并重载"})]})]})}):this.props.children}}co.createRoot(document.getElementById("root")).render(e.jsx(fo.StrictMode,{children:e.jsx(I_,{children:e.jsx(Ai,{children:e.jsx($_,{})})})}));export{ld as A,dd as B,_d as C,ni as F,Mr as I,yd as L,jd as P,$d as S,Rd as U,Td as V,Bs as W,Pd as X,Es as a,Id as b,ge as c,It as d,Nd as e,md as f,ei as g,Rs as h,pd as i,Sd as j,hd as k,ln as l};
