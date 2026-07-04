const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Studio-CtJGkN2I.js","assets/motion-BiYXI9Xw.js","assets/react-BrQ0XQIh.js","assets/flow-DbKgUXe5.js","assets/designTokens-BUYmQlS7.js","assets/Studio-BZV40eAE.css","assets/Projects-A_0bnYkM.js"])))=>i.map(i=>d[i]);
import{j as e,m as Ve,A as Ni}from"./motion-BiYXI9Xw.js";import{a as _o,r as l,R as Mr,L as Ct,N as Qo,u as Mi,b as $i,c as Nn,B as Ii}from"./react-BrQ0XQIh.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();var no={},qo=_o;no.createRoot=qo.createRoot,no.hydrateRoot=qo.hydrateRoot;const Li="modulepreload",Ei=function(t){return"/"+t},Go={},$r=function(n,s,o){let i=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),g=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));i=Promise.allSettled(s.map(m=>{if(m=Ei(m),m in Go)return;Go[m]=!0;const $=m.endsWith(".css"),x=$?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${x}`))return;const y=document.createElement("link");if(y.rel=$?"stylesheet":Li,$||(y.as="script"),y.crossOrigin="",y.href=m,g&&y.setAttribute("nonce",g),document.head.appendChild(y),$)return new Promise((w,R)=>{y.addEventListener("load",w),y.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(d){const g=new Event("vite:preloadError",{cancelable:!0});if(g.payload=d,window.dispatchEvent(g),!g.defaultPrevented)throw d}return i.then(d=>{for(const g of d||[])g.status==="rejected"&&r(g.reason);return n().catch(r)})};var Ri=`.styles-module__popup___IhzrD svg[fill=none] {
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
}`,Bi={popup:"styles-module__popup___IhzrD",enter:"styles-module__enter___L7U7N",entered:"styles-module__entered___COX-w",exit:"styles-module__exit___5eGjE",shake:"styles-module__shake___jdbWe",header:"styles-module__header___wWsSi",element:"styles-module__element___fTV2z",headerToggle:"styles-module__headerToggle___WpW0b",chevron:"styles-module__chevron___ZZJlR",expanded:"styles-module__expanded___2Hxgv",stylesWrapper:"styles-module__stylesWrapper___pnHgy",stylesInner:"styles-module__stylesInner___YYZe2",stylesBlock:"styles-module__stylesBlock___VfQKn",styleLine:"styles-module__styleLine___1YQiD",styleProperty:"styles-module__styleProperty___84L1i",styleValue:"styles-module__styleValue___q51-h",timestamp:"styles-module__timestamp___Dtpsv",quote:"styles-module__quote___mcMmQ",textarea:"styles-module__textarea___jrSae",actions:"styles-module__actions___D6x3f",cancel:"styles-module__cancel___hRjnL",submit:"styles-module__submit___K-mIR",deleteWrapper:"styles-module__deleteWrapper___oSjdo",deleteButton:"styles-module__deleteButton___4VuAE",light:"styles-module__light___6AaSQ"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-annotation-popup-css-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-annotation-popup-css-styles",document.head.appendChild(t)),t.textContent=Ri}var Ge=Bi,Pi=`.icon-transitions-module__iconState___uqK9J {
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
}`,Di={iconState:"icon-transitions-module__iconState___uqK9J",iconStateFast:"icon-transitions-module__iconStateFast___HxlMm",iconFade:"icon-transitions-module__iconFade___nPwXg",iconFadeFast:"icon-transitions-module__iconFadeFast___Ofb2t",visible:"icon-transitions-module__visible___PlHsU",visibleScaled:"icon-transitions-module__visibleScaled___8Qog-",hidden:"icon-transitions-module__hidden___ETykt",hiddenScaled:"icon-transitions-module__hiddenScaled___JXn-m",sending:"icon-transitions-module__sending___uaLN-"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-components-icon-transitions");t||(t=document.createElement("style"),t.id="feedback-tool-styles-components-icon-transitions",document.head.appendChild(t)),t.textContent=Pi}var Qe=Di,Ti=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M8 3v10M3 8h10",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})}),Ai=({size:t=24,style:n={}})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",style:n,children:[e.jsxs("g",{clipPath:"url(#clip0_list_sparkle)",children:[e.jsx("path",{d:"M11.5 12L5.5 12",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M18.5 6.75L5.5 6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M9.25 17.25L5.5 17.25",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinejoin:"round"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_list_sparkle",children:e.jsx("rect",{width:"24",height:"24",fill:"white"})})})]}),zi=({size:t=20,...n})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",...n,children:[e.jsx("circle",{cx:"10",cy:"10",r:"5.375",stroke:"currentColor",strokeWidth:"1.25"}),e.jsx("path",{d:"M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("circle",{cx:"10",cy:"12.625",r:"0.625",fill:"currentColor"})]}),Wi=({size:t=24,copied:n=!1,tint:s})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",style:s?{color:s,transition:"color 0.3s ease"}:void 0,children:[e.jsxs("g",{className:`${Qe.iconState} ${n?Qe.hiddenScaled:Qe.visibleScaled}`,children:[e.jsx("path",{d:"M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),e.jsxs("g",{className:`${Qe.iconState} ${n?Qe.visibleScaled:Qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})]}),Oi=({size:t=24,state:n="idle"})=>{const s=n==="idle",o=n==="sent",i=n==="failed",r=n==="sending";return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("g",{className:`${Qe.iconStateFast} ${s?Qe.visibleScaled:r?Qe.sending:Qe.hiddenScaled}`,children:e.jsx("path",{d:"M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsxs("g",{className:`${Qe.iconStateFast} ${o?Qe.visibleScaled:Qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M15 10L11 14.25L9.25 12.25",stroke:"var(--agentation-color-green)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("g",{className:`${Qe.iconStateFast} ${i?Qe.visibleScaled:Qe.hiddenScaled}`,children:[e.jsx("path",{d:"M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M12 8V12",stroke:"var(--agentation-color-red)",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("circle",{cx:"12",cy:"15",r:"0.5",fill:"var(--agentation-color-red)",stroke:"var(--agentation-color-red)",strokeWidth:"1"})]})]})},Fi=({size:t=24,isOpen:n=!0})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{className:`${Qe.iconFade} ${n?Qe.visible:Qe.hidden}`,children:[e.jsx("path",{d:"M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsxs("g",{className:`${Qe.iconFade} ${n?Qe.hidden:Qe.visible}`,children:[e.jsx("path",{d:"M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z",fill:"currentColor"}),e.jsx("path",{d:"M5 19L19 5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})]}),Hi=({size:t=24,isPaused:n=!1})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{className:`${Qe.iconFadeFast} ${n?Qe.hidden:Qe.visible}`,children:[e.jsx("path",{d:"M8 6L8 18",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("path",{d:"M16 18L16 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]}),e.jsx("path",{className:`${Qe.iconFadeFast} ${n?Qe.visible:Qe.hidden}`,d:"M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z",stroke:"currentColor",strokeWidth:"1.5"})]}),Yi=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("circle",{cx:"12",cy:"12",r:"2.5",stroke:"currentColor",strokeWidth:"1.5"})]}),Xi=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),Ir=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsxs("g",{clipPath:"url(#clip0_2_53)",children:[e.jsx("path",{d:"M16.25 16.25L7.75 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M7.75 16.25L16.25 7.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_2_53",children:e.jsx("rect",{width:"24",height:"24",fill:"white"})})})]}),Ui=({size:t=24})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M16.7198 6.21973C17.0127 5.92683 17.4874 5.92683 17.7803 6.21973C18.0732 6.51262 18.0732 6.9874 17.7803 7.28027L13.0606 12L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4875 18.0731 17.0127 18.0731 16.7198 17.7803L12.0001 13.0605L7.28033 17.7803C6.98746 18.0731 6.51268 18.0731 6.21979 17.7803C5.92689 17.4874 5.92689 17.0126 6.21979 16.7197L10.9395 12L6.21979 7.28027C5.92689 6.98738 5.92689 6.51262 6.21979 6.21973C6.51268 5.92683 6.98744 5.92683 7.28033 6.21973L12.0001 10.9395L16.7198 6.21973Z",fill:"currentColor"})}),Vi=({size:t=16})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",children:[e.jsx("path",{d:"M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M10 3.9585V5.05698",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M10 14.9429V16.0414",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M5.7269 5.72656L6.50682 6.50649",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13.4932 13.4932L14.2731 14.2731",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M3.95834 10H5.05683",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M14.9432 10H16.0417",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M5.7269 14.2731L6.50682 13.4932",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13.4932 6.50649L14.2731 5.72656",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]}),Qi=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 20 20",fill:"none",children:e.jsx("path",{d:"M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z",stroke:"currentColor",strokeWidth:"1.13793",strokeLinecap:"round",strokeLinejoin:"round"})}),qi=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375",stroke:"currentColor",strokeWidth:"0.9",strokeLinecap:"round",strokeLinejoin:"round"})}),Gi=({size:t=24})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4383 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z",fill:"currentColor"})}),Ki=({size:t=16})=>e.jsx("svg",{width:t,height:t,viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M8.5 3.5L4 8L8.5 12.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),Ji=({size:t=24})=>e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("line",{x1:"3",y1:"9",x2:"21",y2:"9",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("line",{x1:"9",y1:"9",x2:"9",y2:"21",stroke:"currentColor",strokeWidth:"1.5"})]}),Lr=["data-feedback-toolbar","data-annotation-popup","data-annotation-marker"],Ys=Lr.flatMap(t=>[`:not([${t}])`,`:not([${t}] *)`]).join(""),so="feedback-freeze-styles",Xs="__agentation_freeze";function Zi(){if(typeof window>"u")return{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:n=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]};const t=window;return t[Xs]||(t[Xs]={frozen:!1,installed:!1,origSetTimeout:null,origSetInterval:null,origRAF:null,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}),t[Xs]}var Ne=Zi();typeof window<"u"&&!Ne.installed&&(Ne.origSetTimeout=window.setTimeout.bind(window),Ne.origSetInterval=window.setInterval.bind(window),Ne.origRAF=window.requestAnimationFrame.bind(window),window.setTimeout=(t,n,...s)=>typeof t=="string"?Ne.origSetTimeout(t,n):Ne.origSetTimeout((...o)=>{Ne.frozen?Ne.frozenTimeoutQueue.push(()=>t(...o)):t(...o)},n,...s),window.setInterval=(t,n,...s)=>typeof t=="string"?Ne.origSetInterval(t,n):Ne.origSetInterval((...o)=>{Ne.frozen||t(...o)},n,...s),window.requestAnimationFrame=t=>Ne.origRAF(n=>{Ne.frozen?Ne.frozenRAFQueue.push(t):t(n)}),Ne.installed=!0);var re=Ne.origSetTimeout,ea=Ne.origSetInterval,Ln=Ne.origRAF;function ta(t){return t?Lr.some(n=>{var s;return!!((s=t.closest)!=null&&s.call(t,`[${n}]`))}):!1}function na(){if(typeof document>"u"||Ne.frozen)return;Ne.frozen=!0,Ne.frozenTimeoutQueue=[],Ne.frozenRAFQueue=[];let t=document.getElementById(so);t||(t=document.createElement("style"),t.id=so),t.textContent=`
    *${Ys},
    *${Ys}::before,
    *${Ys}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `,document.head.appendChild(t),Ne.pausedAnimations=[];try{document.getAnimations().forEach(n=>{var o;if(n.playState!=="running")return;const s=(o=n.effect)==null?void 0:o.target;ta(s)||(n.pause(),Ne.pausedAnimations.push(n))})}catch{}document.querySelectorAll("video").forEach(n=>{n.paused||(n.dataset.wasPaused="false",n.pause())})}function Ko(){var s;if(typeof document>"u"||!Ne.frozen)return;Ne.frozen=!1;const t=Ne.frozenTimeoutQueue;Ne.frozenTimeoutQueue=[];for(const o of t)Ne.origSetTimeout(()=>{if(Ne.frozen){Ne.frozenTimeoutQueue.push(o);return}try{o()}catch(i){console.warn("[agentation] Error replaying queued timeout:",i)}},0);const n=Ne.frozenRAFQueue;Ne.frozenRAFQueue=[];for(const o of n)Ne.origRAF(i=>{if(Ne.frozen){Ne.frozenRAFQueue.push(o);return}o(i)});for(const o of Ne.pausedAnimations)try{o.play()}catch(i){console.warn("[agentation] Error resuming animation:",i)}Ne.pausedAnimations=[],(s=document.getElementById(so))==null||s.remove(),document.querySelectorAll("video").forEach(o=>{o.dataset.wasPaused==="false"&&(o.play().catch(()=>{}),delete o.dataset.wasPaused)})}function Us(t){if(!t)return;const n=s=>s.stopImmediatePropagation();document.addEventListener("focusin",n,!0),document.addEventListener("focusout",n,!0);try{t.focus()}finally{document.removeEventListener("focusin",n,!0),document.removeEventListener("focusout",n,!0)}}var js=l.forwardRef(function({element:n,timestamp:s,selectedText:o,placeholder:i="What should change?",initialValue:r="",submitLabel:d="Add",onSubmit:g,onCancel:m,onDelete:$,style:x,accentColor:y="#3c82f7",isExiting:w=!1,lightMode:R=!1,computedStyles:k},B){const[U,A]=l.useState(r),[pe,Te]=l.useState(!1),[I,ne]=l.useState("initial"),[me,z]=l.useState(!1),[je,Le]=l.useState(!1),be=l.useRef(null),ue=l.useRef(null),Fe=l.useRef(null),Xe=l.useRef(null);l.useEffect(()=>{w&&I!=="exit"&&ne("exit")},[w,I]),l.useEffect(()=>{re(()=>{ne("enter")},0);const he=re(()=>{ne("entered")},200),Ae=re(()=>{const Je=be.current;Je&&(Us(Je),Je.selectionStart=Je.selectionEnd=Je.value.length,Je.scrollTop=Je.scrollHeight)},50);return()=>{clearTimeout(he),clearTimeout(Ae),Fe.current&&clearTimeout(Fe.current),Xe.current&&clearTimeout(Xe.current)}},[]);const ge=l.useCallback(()=>{Xe.current&&clearTimeout(Xe.current),Te(!0),Xe.current=re(()=>{Te(!1),Us(be.current)},250)},[]);l.useImperativeHandle(B,()=>({shake:ge}),[ge]);const $e=l.useCallback(()=>{ne("exit"),Fe.current=re(()=>{m()},150)},[m]),J=l.useCallback(()=>{U.trim()&&g(U.trim())},[U,g]),it=l.useCallback(he=>{he.stopPropagation(),!he.nativeEvent.isComposing&&(he.key==="Enter"&&!he.shiftKey&&(he.preventDefault(),J()),he.key==="Escape"&&$e())},[J,$e]),T=[Ge.popup,R?Ge.light:"",I==="enter"?Ge.enter:"",I==="entered"?Ge.entered:"",I==="exit"?Ge.exit:"",pe?Ge.shake:""].filter(Boolean).join(" ");return e.jsxs("div",{ref:ue,className:T,"data-annotation-popup":!0,style:x,onClick:he=>he.stopPropagation(),children:[e.jsxs("div",{className:Ge.header,children:[k&&Object.keys(k).length>0?e.jsxs("button",{className:Ge.headerToggle,onClick:()=>{const he=je;Le(!je),he&&re(()=>Us(be.current),0)},type:"button",children:[e.jsx("svg",{className:`${Ge.chevron} ${je?Ge.expanded:""}`,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M5.5 10.25L9 7.25L5.75 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsx("span",{className:Ge.element,children:n})]}):e.jsx("span",{className:Ge.element,children:n}),s&&e.jsx("span",{className:Ge.timestamp,children:s})]}),k&&Object.keys(k).length>0&&e.jsx("div",{className:`${Ge.stylesWrapper} ${je?Ge.expanded:""}`,children:e.jsx("div",{className:Ge.stylesInner,children:e.jsx("div",{className:Ge.stylesBlock,children:Object.entries(k).map(([he,Ae])=>e.jsxs("div",{className:Ge.styleLine,children:[e.jsx("span",{className:Ge.styleProperty,children:he.replace(/([A-Z])/g,"-$1").toLowerCase()}),": ",e.jsx("span",{className:Ge.styleValue,children:Ae}),";"]},he))})})}),o&&e.jsxs("div",{className:Ge.quote,children:["“",o.slice(0,80),o.length>80?"...":"","”"]}),e.jsx("textarea",{ref:be,className:Ge.textarea,style:{borderColor:me?y:void 0},placeholder:i,value:U,onChange:he=>A(he.target.value),onFocus:()=>z(!0),onBlur:()=>z(!1),rows:2,onKeyDown:it}),e.jsxs("div",{className:Ge.actions,children:[$&&e.jsx("div",{className:Ge.deleteWrapper,children:e.jsx("button",{className:Ge.deleteButton,onClick:$,type:"button",children:e.jsx(Gi,{size:22})})}),e.jsx("button",{className:Ge.cancel,onClick:$e,children:"Cancel"}),e.jsx("button",{className:Ge.submit,style:{backgroundColor:y,opacity:U.trim()?1:.4},onClick:J,disabled:!U.trim(),children:d})]})]})}),sa=({content:t,children:n,...s})=>{const[o,i]=l.useState(!1),[r,d]=l.useState(!1),[g,m]=l.useState({top:0,right:0}),$=l.useRef(null),x=l.useRef(null),y=l.useRef(null),w=()=>{if($.current){const B=$.current.getBoundingClientRect();m({top:B.top+B.height/2,right:window.innerWidth-B.left+8})}},R=()=>{d(!0),y.current&&(clearTimeout(y.current),y.current=null),w(),x.current=re(()=>{i(!0)},500)},k=()=>{x.current&&(clearTimeout(x.current),x.current=null),i(!1),y.current=re(()=>{d(!1)},150)};return l.useEffect(()=>()=>{x.current&&clearTimeout(x.current),y.current&&clearTimeout(y.current)},[]),e.jsxs(e.Fragment,{children:[e.jsx("span",{ref:$,onMouseEnter:R,onMouseLeave:k,...s,children:n}),r&&_o.createPortal(e.jsx("div",{"data-feedback-toolbar":!0,style:{position:"fixed",top:g.top,right:g.right,transform:"translateY(-50%)",padding:"6px 10px",background:"#383838",color:"rgba(255, 255, 255, 0.7)",fontSize:"11px",fontWeight:400,lineHeight:"14px",borderRadius:"10px",width:"180px",textAlign:"left",zIndex:100020,pointerEvents:"none",boxShadow:"0px 1px 8px rgba(0, 0, 0, 0.28)",opacity:o?1:0,transition:"opacity 0.15s ease"},children:t}),document.body)]})},oa=`.styles-module__tooltip___mcXL2 {
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
}`,ra={tooltip:"styles-module__tooltip___mcXL2",tooltipIcon:"styles-module__tooltipIcon___Nq2nD"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-help-tooltip-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-help-tooltip-styles",document.head.appendChild(t)),t.textContent=oa}var Jo=ra,gn=({content:t})=>e.jsx(sa,{className:Jo.tooltip,content:t,children:e.jsx(zi,{className:Jo.tooltipIcon})}),H={navigation:{width:800,height:56},hero:{width:800,height:320},header:{width:800,height:80},section:{width:800,height:400},sidebar:{width:240,height:400},footer:{width:800,height:160},modal:{width:480,height:300},card:{width:280,height:240},text:{width:400,height:120},image:{width:320,height:200},video:{width:480,height:270},table:{width:560,height:220},grid:{width:600,height:300},list:{width:300,height:180},chart:{width:400,height:240},button:{width:140,height:40},input:{width:280,height:56},form:{width:360,height:320},tabs:{width:480,height:240},dropdown:{width:200,height:200},toggle:{width:44,height:24},search:{width:320,height:44},avatar:{width:48,height:48},badge:{width:80,height:28},breadcrumb:{width:300,height:24},pagination:{width:300,height:36},progress:{width:240,height:8},divider:{width:600,height:1},accordion:{width:400,height:200},carousel:{width:600,height:300},toast:{width:320,height:64},tooltip:{width:180,height:40},pricing:{width:300,height:360},testimonial:{width:360,height:200},cta:{width:600,height:160},alert:{width:400,height:56},banner:{width:800,height:48},stat:{width:200,height:120},stepper:{width:480,height:48},tag:{width:72,height:28},rating:{width:160,height:28},map:{width:480,height:300},timeline:{width:360,height:320},fileUpload:{width:360,height:180},codeBlock:{width:480,height:200},calendar:{width:300,height:300},notification:{width:360,height:72},productCard:{width:280,height:360},profile:{width:280,height:200},drawer:{width:320,height:400},popover:{width:240,height:160},logo:{width:120,height:40},faq:{width:560,height:320},gallery:{width:560,height:360},checkbox:{width:20,height:20},radio:{width:20,height:20},slider:{width:240,height:32},datePicker:{width:300,height:320},skeleton:{width:320,height:120},chip:{width:96,height:32},icon:{width:24,height:24},spinner:{width:32,height:32},feature:{width:360,height:200},team:{width:560,height:280},login:{width:360,height:360},contact:{width:400,height:320}},Er=[{section:"Layout",items:[{type:"navigation",label:"Navigation",...H.navigation},{type:"header",label:"Header",...H.header},{type:"hero",label:"Hero",...H.hero},{type:"section",label:"Section",...H.section},{type:"sidebar",label:"Sidebar",...H.sidebar},{type:"footer",label:"Footer",...H.footer},{type:"modal",label:"Modal",...H.modal},{type:"banner",label:"Banner",...H.banner},{type:"drawer",label:"Drawer",...H.drawer},{type:"popover",label:"Popover",...H.popover},{type:"divider",label:"Divider",...H.divider}]},{section:"Content",items:[{type:"card",label:"Card",...H.card},{type:"text",label:"Text",...H.text},{type:"image",label:"Image",...H.image},{type:"video",label:"Video",...H.video},{type:"table",label:"Table",...H.table},{type:"grid",label:"Grid",...H.grid},{type:"list",label:"List",...H.list},{type:"chart",label:"Chart",...H.chart},{type:"codeBlock",label:"Code Block",...H.codeBlock},{type:"map",label:"Map",...H.map},{type:"timeline",label:"Timeline",...H.timeline},{type:"calendar",label:"Calendar",...H.calendar},{type:"accordion",label:"Accordion",...H.accordion},{type:"carousel",label:"Carousel",...H.carousel},{type:"logo",label:"Logo",...H.logo},{type:"faq",label:"FAQ",...H.faq},{type:"gallery",label:"Gallery",...H.gallery}]},{section:"Controls",items:[{type:"button",label:"Button",...H.button},{type:"input",label:"Input",...H.input},{type:"search",label:"Search",...H.search},{type:"form",label:"Form",...H.form},{type:"tabs",label:"Tabs",...H.tabs},{type:"dropdown",label:"Dropdown",...H.dropdown},{type:"toggle",label:"Toggle",...H.toggle},{type:"stepper",label:"Stepper",...H.stepper},{type:"rating",label:"Rating",...H.rating},{type:"fileUpload",label:"File Upload",...H.fileUpload},{type:"checkbox",label:"Checkbox",...H.checkbox},{type:"radio",label:"Radio",...H.radio},{type:"slider",label:"Slider",...H.slider},{type:"datePicker",label:"Date Picker",...H.datePicker}]},{section:"Elements",items:[{type:"avatar",label:"Avatar",...H.avatar},{type:"badge",label:"Badge",...H.badge},{type:"tag",label:"Tag",...H.tag},{type:"breadcrumb",label:"Breadcrumb",...H.breadcrumb},{type:"pagination",label:"Pagination",...H.pagination},{type:"progress",label:"Progress",...H.progress},{type:"alert",label:"Alert",...H.alert},{type:"toast",label:"Toast",...H.toast},{type:"notification",label:"Notification",...H.notification},{type:"tooltip",label:"Tooltip",...H.tooltip},{type:"stat",label:"Stat",...H.stat},{type:"skeleton",label:"Skeleton",...H.skeleton},{type:"chip",label:"Chip",...H.chip},{type:"icon",label:"Icon",...H.icon},{type:"spinner",label:"Spinner",...H.spinner}]},{section:"Blocks",items:[{type:"pricing",label:"Pricing",...H.pricing},{type:"testimonial",label:"Testimonial",...H.testimonial},{type:"cta",label:"CTA",...H.cta},{type:"productCard",label:"Product Card",...H.productCard},{type:"profile",label:"Profile",...H.profile},{type:"feature",label:"Feature",...H.feature},{type:"team",label:"Team",...H.team},{type:"login",label:"Login",...H.login},{type:"contact",label:"Contact",...H.contact}]}],Wt={};for(const t of Er)for(const n of t.items)Wt[n.type]=n;function M({w:t,h:n=3,strong:s}){return e.jsx("div",{style:{width:typeof t=="number"?`${t}px`:t,height:n,borderRadius:2,background:s?"var(--agd-bar-strong)":"var(--agd-bar)",flexShrink:0}})}function Ue({w:t,h:n,radius:s=3,style:o}){return e.jsx("div",{style:{width:typeof t=="number"?`${t}px`:t,height:typeof n=="number"?`${n}px`:n,borderRadius:s,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0,...o}})}function St({size:t}){return e.jsx("div",{style:{width:t,height:t,borderRadius:"50%",border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",flexShrink:0}})}function ia({width:t,height:n}){const s=Math.max(8,n*.2);return e.jsxs("div",{style:{display:"flex",alignItems:"center",height:"100%",padding:`0 ${s}px`,gap:t*.02},children:[e.jsx(Ue,{w:Math.max(20,n*.5),h:Math.max(12,n*.4),radius:2}),e.jsxs("div",{style:{flex:1,display:"flex",gap:t*.03,marginLeft:t*.04},children:[e.jsx(M,{w:t*.06}),e.jsx(M,{w:t*.07}),e.jsx(M,{w:t*.05}),e.jsx(M,{w:t*.06})]}),e.jsx(Ue,{w:t*.1,h:Math.min(28,n*.5),radius:4})]})}function aa({width:t,height:n,text:s}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.05},children:[s?e.jsx("span",{style:{fontSize:Math.min(20,n*.08),fontWeight:600,color:"var(--agd-text-3)",textAlign:"center",maxWidth:"80%"},children:s}):e.jsx(M,{w:t*.5,h:Math.max(6,n*.04),strong:!0}),e.jsx(M,{w:t*.6}),e.jsx(M,{w:t*.4}),e.jsx(Ue,{w:Math.min(140,t*.2),h:Math.min(36,n*.12),radius:6,style:{marginTop:n*.06}})]})}function la({width:t,height:n}){const s=Math.max(3,Math.floor(n/36));return e.jsxs("div",{style:{padding:t*.08,display:"flex",flexDirection:"column",gap:n*.03},children:[e.jsx(M,{w:t*.6,h:4,strong:!0}),Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(Ue,{w:10,h:10,radius:2}),e.jsx(M,{w:t*(.4+i*17%30/100)})]},i))]})}function ca({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/160)));return e.jsx("div",{style:{display:"flex",padding:`${n*.12}px ${t*.03}px`,gap:t*.05},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:"60%",h:3,strong:!0}),e.jsx(M,{w:"80%",h:2}),e.jsx(M,{w:"70%",h:2}),e.jsx(M,{w:"60%",h:2})]},i))})}function da({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"10px 12px",borderBottom:"1px solid var(--agd-stroke)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),e.jsxs("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[e.jsx(M,{w:"90%"}),e.jsx(M,{w:"70%"}),e.jsx(M,{w:"80%"})]}),e.jsxs("div",{style:{padding:"10px 12px",borderTop:"1px solid var(--agd-stroke)",display:"flex",justifyContent:"flex-end",gap:8},children:[e.jsx(Ue,{w:70,h:26,radius:4}),e.jsx(Ue,{w:70,h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})}function _a({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{height:"40%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),e.jsxs("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"70%",h:4,strong:!0}),e.jsx(M,{w:"95%",h:2}),e.jsx(M,{w:"85%",h:2}),e.jsx(M,{w:"50%",h:2})]})]})}function ua({width:t,height:n,text:s}){if(s)return e.jsx("div",{style:{padding:4,fontSize:Math.min(14,n*.3),lineHeight:1.5,color:"var(--agd-text-3)",wordBreak:"break-word",overflow:"hidden"},children:s});const o=Math.max(2,Math.floor(n/18));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6,padding:4},children:[e.jsx(M,{w:t*.6,h:5,strong:!0}),Array.from({length:o},(i,r)=>e.jsx(M,{w:`${70+r*13%25}%`,h:2},r))]})}function ha({width:t,height:n}){return e.jsx("div",{style:{height:"100%",position:"relative"},children:e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,preserveAspectRatio:"none",fill:"none",children:[e.jsx("line",{x1:"0",y1:"0",x2:t,y2:n,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("line",{x1:t,y1:"0",x2:"0",y2:n,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("circle",{cx:t*.3,cy:n*.3,r:Math.min(t,n)*.08,fill:"var(--agd-fill)",stroke:"var(--agd-stroke)",strokeWidth:"0.8"})]})})}function ma({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(t/100))),o=Math.max(2,Math.min(6,Math.floor(n/32)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{display:"flex",borderBottom:"1px solid var(--agd-stroke)",padding:"6px 0"},children:Array.from({length:s},(i,r)=>e.jsx("div",{style:{flex:1,padding:"0 8px"},children:e.jsx(M,{w:"70%",h:3,strong:!0})},r))}),Array.from({length:o},(i,r)=>e.jsx("div",{style:{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.03)",padding:"6px 0"},children:Array.from({length:s},(d,g)=>e.jsx("div",{style:{flex:1,padding:"0 8px"},children:e.jsx(M,{w:`${50+(r*7+g*13)%40}%`,h:2})},g))},r))]})}function pa({width:t,height:n}){const s=Math.max(2,Math.floor(n/28));return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,padding:4},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"4px 0"},children:[e.jsx(St,{size:8}),e.jsx(M,{w:`${55+i*17%35}%`,h:2})]},i))})}function ga({width:t,height:n,text:s}){return e.jsx("div",{style:{height:"100%",borderRadius:Math.min(8,n/3),border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:s?e.jsx("span",{style:{fontSize:Math.min(13,n*.4),fontWeight:500,color:"var(--agd-text-3)",letterSpacing:"-0.01em"},children:s}):e.jsx(M,{w:Math.max(20,t*.5),h:3,strong:!0})})}function xa({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,height:"100%",justifyContent:"center"},children:[e.jsx(M,{w:Math.min(80,t*.3),h:2}),e.jsx("div",{style:{height:Math.min(36,n*.6),borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",paddingLeft:8},children:e.jsx(M,{w:"40%",h:2})})]})}function fa({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(n/56)));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:n*.04,padding:8},children:[Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:60+i*17%30,h:2}),e.jsx(Ue,{w:"100%",h:28,radius:4})]},i)),e.jsx(Ue,{w:Math.min(120,t*.35),h:30,radius:6,style:{marginTop:8,alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}function ya({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{display:"flex",gap:2,borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:s},(o,i)=>e.jsx("div",{style:{padding:"8px 12px",borderBottom:i===0?"2px solid var(--agd-bar-strong)":"none"},children:e.jsx(M,{w:60,h:3,strong:i===0})},i))}),e.jsxs("div",{style:{flex:1,padding:12,display:"flex",flexDirection:"column",gap:6},children:[e.jsx(M,{w:"80%",h:2}),e.jsx(M,{w:"65%",h:2}),e.jsx(M,{w:"75%",h:2})]})]})}function ba({width:t,height:n}){const s=Math.min(t,n)/2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s-1,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"1.5",strokeDasharray:"3 2"}),e.jsx("circle",{cx:t/2,cy:n*.38,r:s*.28,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"}),e.jsx("path",{d:`M${t/2-s*.55} ${n*.78} C${t/2-s*.55} ${n*.55} ${t/2+s*.55} ${n*.55} ${t/2+s*.55} ${n*.78}`,stroke:"var(--agd-stroke)",fill:"var(--agd-fill)",strokeWidth:"0.8"})]})}function wa({width:t,height:n}){return e.jsx("div",{style:{height:"100%",borderRadius:n/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(M,{w:Math.max(16,t*.5),h:2,strong:!0})})}function va({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.08},children:[e.jsx(M,{w:t*.5,h:Math.max(5,n*.06),strong:!0}),e.jsx(M,{w:t*.35})]})}function ka({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100%",gap:n*.04,padding:t*.04},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx(M,{w:t*.7}),e.jsx(M,{w:t*.5}),e.jsxs("div",{style:{flex:1,display:"flex",gap:t*.03,marginTop:n*.06},children:[e.jsx(Ue,{w:"33%",h:"100%",radius:4}),e.jsx(Ue,{w:"33%",h:"100%",radius:4}),e.jsx(Ue,{w:"33%",h:"100%",radius:4})]})]})}function ja({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/140))),o=Math.max(1,Math.min(3,Math.floor(n/120)));return e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${s}, 1fr)`,gridTemplateRows:`repeat(${o}, 1fr)`,gap:6,height:"100%"},children:Array.from({length:s*o},(i,r)=>e.jsx(Ue,{w:"100%",h:"100%",radius:4},r))})}function Ca({width:t,height:n}){const s=Math.max(2,Math.floor((n-32)/28));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{padding:"6px 8px",borderBottom:"1px solid var(--agd-stroke)"},children:e.jsx(M,{w:t*.5,h:3,strong:!0})}),e.jsx("div",{style:{flex:1,padding:4,display:"flex",flexDirection:"column",gap:2},children:Array.from({length:s},(o,i)=>e.jsx("div",{style:{padding:"4px 6px",borderRadius:3,background:i===0?"var(--agd-fill)":"transparent"},children:e.jsx(M,{w:`${50+i*17%35}%`,h:2,strong:i===0})},i))})]})}function Sa({width:t,height:n}){const s=Math.min(t,n)/2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:t-2,height:n-2,rx:s,stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("circle",{cx:t-s,cy:n/2,r:s*.7,fill:"var(--agd-bar)"})]})}function Na({width:t,height:n}){const s=Math.min(n/2,20);return e.jsxs("div",{style:{height:"100%",borderRadius:s,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${s*.6}px`,gap:6},children:[e.jsx(St,{size:Math.min(14,n*.4)}),e.jsx(M,{w:"50%",h:2})]})}function Ma({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx(St,{size:Math.min(20,n*.5)}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"60%",h:3,strong:!0}),e.jsx(M,{w:"80%",h:2})]}),e.jsx("div",{style:{width:14,height:14,border:"1px solid var(--agd-stroke)",borderRadius:3,flexShrink:0}})]})}function $a({width:t,height:n}){return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"0",y:"0",width:t,height:n,rx:n/2,stroke:"var(--agd-stroke)",strokeWidth:"0.8"}),e.jsx("rect",{x:"1",y:"1",width:t*.65,height:n-2,rx:(n-2)/2,fill:"var(--agd-bar)"})]})}function Ia({width:t,height:n}){const s=Math.max(3,Math.min(7,Math.floor(t/50))),o=t/(s*2);return e.jsx("div",{style:{height:"100%",display:"flex",alignItems:"flex-end",justifyContent:"space-around",padding:"0 4px",borderBottom:"1px solid var(--agd-stroke)"},children:Array.from({length:s},(i,r)=>{const d=30+(r*37+17)%55;return e.jsx(Ue,{w:o,h:`${d}%`,radius:2},r)})})}function La({width:t,height:n}){const s=Math.min(t,n)*.12;return e.jsxs("div",{style:{height:"100%",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx(Ue,{w:"100%",h:"100%",radius:4}),e.jsx("div",{style:{position:"absolute",width:s*2,height:s*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:0,height:0,borderLeft:`${s*.6}px solid var(--agd-bar-strong)`,borderTop:`${s*.4}px solid transparent`,borderBottom:`${s*.4}px solid transparent`,marginLeft:s*.15}})})]})}function Ea({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("div",{style:{flex:1,width:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(M,{w:"60%",h:2})}),e.jsx("div",{style:{width:8,height:8,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-5}})]})}function Ra({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/80)));return e.jsx("div",{style:{display:"flex",alignItems:"center",height:"100%",gap:4},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[i>0&&e.jsx("span",{style:{color:"var(--agd-stroke)",fontSize:10},children:"/"}),e.jsx(M,{w:40+i*13%20,h:2,strong:i===s-1})]},i))})}function Ba({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(t/40))),o=Math.min(28,n*.8);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:4},children:Array.from({length:s},(i,r)=>e.jsx(Ue,{w:o,h:o,radius:4,style:r===1?{background:"var(--agd-bar)"}:void 0},r))})}function Pa({width:t}){return e.jsx("div",{style:{display:"flex",alignItems:"center",height:"100%"},children:e.jsx("div",{style:{width:"100%",height:1,background:"var(--agd-stroke)"}})})}function Da({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(n/40)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:i===0?2:1},children:[e.jsx(M,{w:`${40+i*17%25}%`,h:3,strong:!0}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:i===0?"▼":"▶"})]},i))})}function Ta({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{style:{flex:1,display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(Ue,{w:"100%",h:"100%",radius:4}),e.jsx("span",{style:{fontSize:12,color:"var(--agd-stroke)"},children:"›"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:4},children:[e.jsx(St,{size:5}),e.jsx(St,{size:5}),e.jsx(St,{size:5})]})]})}function Aa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:10,gap:n*.04},children:[e.jsx(M,{w:t*.4,h:3,strong:!0}),e.jsx(M,{w:t*.3,h:6,strong:!0}),e.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4,width:"100%",padding:"8px 0"},children:Array.from({length:4},(s,o)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx(St,{size:5}),e.jsx(M,{w:`${50+o*17%35}%`,h:2})]},o))}),e.jsx(Ue,{w:t*.7,h:Math.min(32,n*.1),radius:6,style:{background:"var(--agd-bar)"}})]})}function za({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:8},children:[e.jsx("span",{style:{fontSize:18,lineHeight:1,color:"var(--agd-stroke)",fontFamily:"serif"},children:"“"}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:"90%",h:2}),e.jsx(M,{w:"75%",h:2}),e.jsx(M,{w:"60%",h:2})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx(St,{size:20}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2},children:[e.jsx(M,{w:60,h:3,strong:!0}),e.jsx(M,{w:40,h:2})]})]})]})}function Wa({width:t,height:n}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:n*.08},children:[e.jsx(M,{w:t*.5,h:Math.max(4,n*.05),strong:!0}),e.jsx(M,{w:t*.35}),e.jsx(Ue,{w:Math.min(140,t*.25),h:Math.min(32,n*.15),radius:6,style:{marginTop:n*.04,background:"var(--agd-bar)"}})]})}function Oa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx("div",{style:{width:16,height:16,borderRadius:"50%",border:"1.5px solid var(--agd-bar-strong)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:e.jsx("div",{style:{width:2,height:6,background:"var(--agd-bar-strong)",borderRadius:1}})}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"40%",h:3,strong:!0}),e.jsx(M,{w:"70%",h:2})]})]})}function Fa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"0 12px"},children:[e.jsx(M,{w:t*.4,h:3,strong:!0}),e.jsx(Ue,{w:60,h:Math.min(24,n*.6),radius:4})]})}function Ha({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsx(M,{w:t*.5,h:2}),e.jsx(M,{w:t*.4,h:Math.max(8,n*.18),strong:!0}),e.jsx(M,{w:t*.3,h:2})]})}function Ya({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(t/100))),o=Math.min(12,n*.35);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 8px"},children:Array.from({length:s},(i,r)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:0,flex:1},children:[e.jsx("div",{style:{width:o,height:o,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:r===0?"var(--agd-bar)":"transparent",flexShrink:0}}),r<s-1&&e.jsx("div",{style:{flex:1,height:1,background:"var(--agd-stroke)",margin:"0 4px"}})]},r))})}function Xa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:4,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"0 6px"},children:[e.jsx(M,{w:Math.max(16,t*.5),h:2,strong:!0}),e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0}})]})}function Ua({width:t,height:n}){const o=Math.min(n*.7,t/7.5);return e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",gap:o*.2},children:Array.from({length:5},(i,r)=>e.jsx("svg",{width:o,height:o,viewBox:"0 0 16 16",fill:"none",children:e.jsx("path",{d:"M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z",stroke:"var(--agd-stroke)",strokeWidth:"0.8",fill:r<3?"var(--agd-bar)":"none"})},r))})}function Va({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",position:"relative",borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",overflow:"hidden"},children:[e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",style:{position:"absolute",inset:0},children:[e.jsx("line",{x1:0,y1:n*.3,x2:t,y2:n*.7,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".2"}),e.jsx("line",{x1:0,y1:n*.6,x2:t,y2:n*.2,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"}),e.jsx("line",{x1:t*.4,y1:0,x2:t*.6,y2:n,stroke:"var(--agd-stroke)",strokeWidth:"0.5",opacity:".15"})]}),e.jsx("div",{style:{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%, -100%)"},children:e.jsxs("svg",{width:"16",height:"22",viewBox:"0 0 16 22",fill:"none",children:[e.jsx("path",{d:"M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z",fill:"var(--agd-bar)",opacity:".4"}),e.jsx("circle",{cx:"8",cy:"8",r:"3",fill:"var(--agd-fill)"})]})})]})}function Qa({width:t,height:n}){const s=Math.max(3,Math.min(5,Math.floor(n/60)));return e.jsxs("div",{style:{display:"flex",height:"100%",padding:"8px 0"},children:[e.jsx("div",{style:{width:16,display:"flex",flexDirection:"column",alignItems:"center"},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[e.jsx(St,{size:8}),i<s-1&&e.jsx("div",{style:{flex:1,width:1,background:"var(--agd-stroke)"}})]},i))}),e.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-around",paddingLeft:8},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:`${35+i*13%25}%`,h:3,strong:!0}),e.jsx(M,{w:`${50+i*17%30}%`,h:2})]},i))})]})}function qa({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"2px dashed var(--agd-stroke)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M12 16V4m0 0l-4 4m4-4l4 4",stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("path",{d:"M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2",stroke:"var(--agd-stroke)",strokeWidth:"1.5"})]}),e.jsx(M,{w:t*.4,h:2}),e.jsx(M,{w:t*.25,h:2})]})}function Ga({width:t,height:n}){const s=Math.max(3,Math.min(8,Math.floor(n/20)));return e.jsxs("div",{style:{height:"100%",borderRadius:6,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",padding:8,display:"flex",flexDirection:"column",gap:4},children:[e.jsxs("div",{style:{display:"flex",gap:3,marginBottom:4},children:[e.jsx(St,{size:6}),e.jsx(St,{size:6}),e.jsx(St,{size:6})]}),Array.from({length:s},(o,i)=>e.jsx("div",{style:{display:"flex",gap:6,paddingLeft:i>0&&i<s-1?12:0},children:e.jsx(M,{w:`${25+i*23%50}%`,h:2,strong:i===0})},i))]})}function Ka({width:t,height:n}){const i=Math.min((t-16)/7,(n-40)/6);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px"},children:[e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(M,{w:t*.3,h:3,strong:!0}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:"›"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:2,padding:"0 4px",flex:1},children:[Array.from({length:7},(r,d)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:i*.6},children:e.jsx(M,{w:i*.5,h:2})},`h${d}`)),Array.from({length:7*5},(r,d)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:i},children:e.jsx("div",{style:{width:i*.6,height:i*.6,borderRadius:"50%",background:d===12?"var(--agd-bar)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:2,height:2,borderRadius:1,background:"var(--agd-bar-strong)",opacity:d===12?1:.3}})})},d))]})]})}function Ja({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 10px",gap:8},children:[e.jsx(St,{size:Math.min(32,n*.55)}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:"50%",h:3,strong:!0}),e.jsx(M,{w:"75%",h:2})]}),e.jsx(M,{w:30,h:2})]})}function Za({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{height:"50%",background:"var(--agd-fill)",borderBottom:"1px dashed var(--agd-stroke)"}}),e.jsxs("div",{style:{flex:1,padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"65%",h:4,strong:!0}),e.jsx(M,{w:"40%",h:3}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(M,{w:"30%",h:5,strong:!0}),e.jsx(Ue,{w:Math.min(70,t*.3),h:26,radius:4,style:{background:"var(--agd-bar)"}})]})]})]})}function el({width:t,height:n}){const s=Math.min(48,n*.3);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:n*.06},children:[e.jsx(St,{size:s}),e.jsx(M,{w:t*.45,h:4,strong:!0}),e.jsx(M,{w:t*.3,h:2}),e.jsxs("div",{style:{display:"flex",gap:t*.08,marginTop:n*.04},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(M,{w:20,h:3,strong:!0}),e.jsx(M,{w:28,h:2})]})]})]})}function tl({width:t,height:n}){const s=Math.max(t*.6,80),o=Math.max(3,Math.floor(n/40));return e.jsxs("div",{style:{height:"100%",display:"flex"},children:[e.jsx("div",{style:{width:t-s,background:"var(--agd-fill)",opacity:.3}}),e.jsxs("div",{style:{flex:1,borderLeft:"1px solid var(--agd-stroke)",display:"flex",flexDirection:"column",padding:t*.04},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:n*.06},children:[e.jsx(M,{w:s*.4,h:4,strong:!0}),e.jsx("div",{style:{width:12,height:12,border:"1px solid var(--agd-stroke)",borderRadius:3}})]}),Array.from({length:o},(i,r)=>e.jsx("div",{style:{padding:"6px 0"},children:e.jsx(M,{w:`${50+r*17%35}%`,h:2,strong:r===0})},r))]})]})}function nl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs("div",{style:{flex:1,width:"100%",borderRadius:8,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",padding:10,display:"flex",flexDirection:"column",gap:5},children:[e.jsx(M,{w:"70%",h:3,strong:!0}),e.jsx(M,{w:"90%",h:2}),e.jsx(M,{w:"60%",h:2})]}),e.jsx("div",{style:{width:10,height:10,background:"var(--agd-fill)",border:"1px dashed var(--agd-stroke)",borderTop:"none",borderLeft:"none",transform:"rotate(45deg)",marginTop:-6}})]})}function sl({width:t,height:n}){const s=Math.min(n*.7,t*.3);return e.jsxs("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:t*.08},children:[e.jsx(Ue,{w:s,h:s,radius:s*.25}),e.jsx(M,{w:t*.45,h:Math.max(4,n*.2),strong:!0})]})}function ol({width:t,height:n}){const s=Math.max(2,Math.min(5,Math.floor(n/56)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%"},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{borderBottom:"1px solid var(--agd-stroke)",padding:"8px 6px",display:"flex",alignItems:"center",justifyContent:"space-between",flex:i===0?2:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{fontSize:9,fontWeight:700,color:"var(--agd-stroke)"},children:"Q"}),e.jsx(M,{w:t*(.3+i*13%25/100),h:3,strong:!0})]}),e.jsx("span",{style:{fontSize:8,color:"var(--agd-stroke)"},children:i===0?"▼":"▶"})]},i))})}function rl({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120))),o=Math.max(1,Math.min(3,Math.floor(n/120)));return e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${s}, 1fr)`,gridTemplateRows:`repeat(${o}, 1fr)`,gap:4,height:"100%"},children:Array.from({length:s*o},(i,r)=>e.jsx("div",{style:{borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",position:"relative",overflow:"hidden"},children:e.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"none",fill:"none",children:[e.jsx("line",{x1:"0",y1:"0",x2:"100",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"}),e.jsx("line",{x1:"100",y1:"0",x2:"0",y2:"100",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})},r))})}function il({width:t,height:n}){const s=Math.min(t,n);return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("rect",{x:"1",y:(n-s+2)/2,width:s-2,height:s-2,rx:s*.15,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("path",{d:`M${s*.25} ${n/2}l${s*.2} ${s*.2} ${s*.3}-${s*.35}`,stroke:"var(--agd-bar)",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})]})}function al({width:t,height:n}){const s=Math.min(t,n)/2-1;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s,stroke:"var(--agd-stroke)",strokeWidth:"1.5"}),e.jsx("circle",{cx:t/2,cy:n/2,r:s*.45,fill:"var(--agd-bar)"})]})}function ll({width:t,height:n}){const s=Math.max(2,n*.12),o=Math.min(n*.35,10),i=t*.55;return e.jsxs("div",{style:{height:"100%",display:"flex",alignItems:"center",position:"relative"},children:[e.jsx("div",{style:{width:"100%",height:s,borderRadius:s/2,background:"var(--agd-fill)",border:"1px solid var(--agd-stroke)",position:"relative"},children:e.jsx("div",{style:{width:i,height:"100%",borderRadius:s/2,background:"var(--agd-bar)"}})}),e.jsx("div",{style:{position:"absolute",left:i-o,width:o*2,height:o*2,borderRadius:"50%",border:"1.5px solid var(--agd-stroke)",background:"var(--agd-fill)"}})]})}function cl({width:t,height:n}){const s=Math.min(36,n*.15),o=7,i=4,r=Math.min((t-16)/o,(n-s-40)/(i+1));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:4},children:[e.jsxs("div",{style:{height:s,borderRadius:4,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:"0 8px",justifyContent:"space-between"},children:[e.jsx(M,{w:"40%",h:2}),e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 16 16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"12",height:"11",rx:"1",stroke:"var(--agd-stroke)",strokeWidth:"1"}),e.jsx("line",{x1:"2",y1:"6",x2:"14",y2:"6",stroke:"var(--agd-stroke)",strokeWidth:"0.5"})]})]}),e.jsxs("div",{style:{flex:1,borderRadius:6,border:"1px dashed var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 6px"},children:[e.jsx("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"‹"}),e.jsx(M,{w:t*.25,h:2,strong:!0}),e.jsx("span",{style:{fontSize:7,color:"var(--agd-stroke)"},children:"›"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${o}, 1fr)`,gap:1,padding:"0 4px",flex:1},children:Array.from({length:o*i},(d,g)=>e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:r},children:e.jsx("div",{style:{width:r*.5,height:r*.5,borderRadius:"50%",background:g===10?"var(--agd-bar)":"transparent"},children:e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{width:1.5,height:1.5,borderRadius:1,background:"var(--agd-bar-strong)",opacity:g===10?1:.25}})})})},g))})]})]})}function dl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",gap:n*.08,padding:4},children:[e.jsx("div",{style:{width:"100%",height:n*.2,borderRadius:4,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"70%",height:Math.max(6,n*.1),borderRadius:3,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"90%",height:Math.max(4,n*.06),borderRadius:3,background:"var(--agd-fill)"}}),e.jsx("div",{style:{width:"50%",height:Math.max(4,n*.06),borderRadius:3,background:"var(--agd-fill)"}})]})}function _l({width:t,height:n}){return e.jsx("div",{style:{height:"100%",display:"flex",alignItems:"center",gap:6},children:e.jsxs("div",{style:{height:"100%",flex:1,borderRadius:n/2,border:"1px solid var(--agd-stroke)",background:"var(--agd-fill)",display:"flex",alignItems:"center",padding:`0 ${n*.3}px`,gap:4},children:[e.jsx(M,{w:"60%",h:2,strong:!0}),e.jsx("div",{style:{width:Math.max(6,n*.3),height:Math.max(6,n*.3),borderRadius:"50%",border:"1px solid var(--agd-stroke)",flexShrink:0,marginLeft:"auto"}})]})})}function ul({width:t,height:n}){const s=Math.min(t,n);return e.jsx("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:e.jsx("path",{d:`M${t/2} ${(n-s)/2+s*.1}l${s*.12} ${s*.25} ${s*.28} ${s*.04}-${s*.2} ${s*.2} ${s*.05} ${s*.28}-${s*.25}-${s*.12}-${s*.25} ${s*.12} ${s*.05}-${s*.28}-${s*.2}-${s*.2} ${s*.28}-${s*.04}z`,stroke:"var(--agd-stroke)",strokeWidth:"1",fill:"var(--agd-fill)"})})}function hl({width:t,height:n}){const s=Math.min(t,n)/2-2;return e.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${t} ${n}`,fill:"none",children:[e.jsx("circle",{cx:t/2,cy:n/2,r:s,stroke:"var(--agd-stroke)",strokeWidth:"1.5",opacity:".2"}),e.jsx("path",{d:`M${t/2} ${n/2-s}a${s} ${s} 0 0 1 ${s} ${s}`,stroke:"var(--agd-bar-strong)",strokeWidth:"1.5",strokeLinecap:"round"})]})}function ml({width:t,height:n}){const s=Math.min(36,n*.25,t*.12),o=Math.max(1,Math.min(3,Math.floor(n/80)));return e.jsx("div",{style:{display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-around",padding:8},children:Array.from({length:o},(i,r)=>e.jsxs("div",{style:{display:"flex",gap:t*.04,alignItems:"flex-start"},children:[e.jsx(Ue,{w:s,h:s,radius:s*.25}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:4},children:[e.jsx(M,{w:`${40+r*13%20}%`,h:3,strong:!0}),e.jsx(M,{w:`${60+r*17%25}%`,h:2})]})]},r))})}function pl({width:t,height:n}){const s=Math.max(2,Math.min(4,Math.floor(t/120))),o=Math.min(36,n*.25);return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:n*.06,padding:n*.06},children:[e.jsx(M,{w:t*.3,h:4,strong:!0}),e.jsx("div",{style:{display:"flex",gap:t*.06,justifyContent:"center",flex:1,alignItems:"center"},children:Array.from({length:s},(i,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsx(St,{size:o}),e.jsx(M,{w:t*.12,h:3,strong:!0}),e.jsx(M,{w:t*.08,h:2})]},r))})]})}function gl({width:t,height:n}){const s=Math.max(2,Math.min(3,Math.floor(n/80)));return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:t*.06,gap:n*.04},children:[e.jsx(M,{w:t*.5,h:Math.max(5,n*.04),strong:!0}),e.jsx(M,{w:t*.35,h:2}),e.jsx("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:n*.03,marginTop:n*.04},children:Array.from({length:s},(o,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:Math.min(60,t*.2),h:2}),e.jsx(Ue,{w:"100%",h:Math.min(32,n*.1),radius:4})]},i))}),e.jsx(Ue,{w:"100%",h:Math.min(36,n*.12),radius:6,style:{marginTop:n*.03,background:"var(--agd-bar)"}}),e.jsx(M,{w:t*.4,h:2})]})}function xl({width:t,height:n}){return e.jsxs("div",{style:{height:"100%",display:"flex",flexDirection:"column",padding:t*.04,gap:n*.03},children:[e.jsx(M,{w:t*.4,h:4,strong:!0}),e.jsx(M,{w:t*.6,h:2}),e.jsxs("div",{style:{display:"flex",gap:6,marginTop:n*.03},children:[e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:50,h:2}),e.jsx(Ue,{w:"100%",h:Math.min(28,n*.1),radius:4})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:40,h:2}),e.jsx(Ue,{w:"100%",h:Math.min(28,n*.1),radius:4})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3},children:[e.jsx(M,{w:50,h:2}),e.jsx(Ue,{w:"100%",h:Math.min(28,n*.1),radius:4})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:3,flex:1},children:[e.jsx(M,{w:60,h:2}),e.jsx(Ue,{w:"100%",h:"100%",radius:4})]}),e.jsx(Ue,{w:Math.min(120,t*.3),h:Math.min(30,n*.1),radius:6,style:{alignSelf:"flex-end",background:"var(--agd-bar)"}})]})}var fl={navigation:ia,hero:aa,sidebar:la,footer:ca,modal:da,card:_a,text:ua,image:ha,table:ma,list:pa,button:ga,input:xa,form:fa,tabs:ya,avatar:ba,badge:wa,header:va,section:ka,grid:ja,dropdown:Ca,toggle:Sa,search:Na,toast:Ma,progress:$a,chart:Ia,video:La,tooltip:Ea,breadcrumb:Ra,pagination:Ba,divider:Pa,accordion:Da,carousel:Ta,pricing:Aa,testimonial:za,cta:Wa,alert:Oa,banner:Fa,stat:Ha,stepper:Ya,tag:Xa,rating:Ua,map:Va,timeline:Qa,fileUpload:qa,codeBlock:Ga,calendar:Ka,notification:Ja,productCard:Za,profile:el,drawer:tl,popover:nl,logo:sl,faq:ol,gallery:rl,checkbox:il,radio:al,slider:ll,datePicker:cl,skeleton:dl,chip:_l,icon:ul,spinner:hl,feature:ml,team:pl,login:gl,contact:xl};function yl({type:t,width:n,height:s,text:o}){const i=fl[t];return i?e.jsx("div",{style:{width:"100%",height:"100%",padding:8,position:"relative",pointerEvents:"none"},children:e.jsx(i,{width:n,height:s,text:o})}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:10,fontWeight:600,color:"var(--agd-text-3)",textTransform:"uppercase",letterSpacing:"0.06em",opacity:.5},children:t})})}var bl=`svg[fill=none] {
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
}`,wl={overlayExiting:"styles-module__overlayExiting___iEmYr",overlay:"styles-module__overlay___aWh-q",overlayFadeIn:"styles-module__overlayFadeIn___aECVy",light:"styles-module__light___ORIft",wireframe:"styles-module__wireframe___itvQU",placing:"styles-module__placing___45yD8",passthrough:"styles-module__passthrough___xaFeE",blankCanvas:"styles-module__blankCanvas___t2Eue",visible:"styles-module__visible___OKKqX",gridActive:"styles-module__gridActive___OZ-cf",paletteHeader:"styles-module__paletteHeader___-Q5gQ",paletteHeaderTitle:"styles-module__paletteHeaderTitle___oHqZC",paletteHeaderDesc:"styles-module__paletteHeaderDesc___6i74T",wireframePurposeWrap:"styles-module__wireframePurposeWrap___To-tS",collapsed:"styles-module__collapsed___Ms9vS",wireframePurposeInner:"styles-module__wireframePurposeInner___Lrahs",wireframePurposeInput:"styles-module__wireframePurposeInput___7EtBN",canvasToggle:"styles-module__canvasToggle___-QqSy",active:"styles-module__active___hosp7",canvasToggleIcon:"styles-module__canvasToggleIcon___7pJ82",canvasToggleLabel:"styles-module__canvasToggleLabel___OanpY",canvasPurposeWrap:"styles-module__canvasPurposeWrap___hj6zk",canvasPurposeInner:"styles-module__canvasPurposeInner___VWiyu",canvasPurposeToggle:"styles-module__canvasPurposeToggle___byDH2",canvasPurposeCheck:"styles-module__canvasPurposeCheck___xqd7l",checked:"styles-module__checked___-1JGH",canvasPurposeLabel:"styles-module__canvasPurposeLabel___Zu-tD",canvasPurposeHelp:"styles-module__canvasPurposeHelp___jijwR",placement:"styles-module__placement___zcxv8",placementEnter:"styles-module__placementEnter___TdRhf",selected:"styles-module__selected___6yrp6",dragging:"styles-module__dragging___le6KZ",exiting:"styles-module__exiting___YrM8F",placementContent:"styles-module__placementContent___f64A4",placementLabel:"styles-module__placementLabel___0KvWl",placementAnnotation:"styles-module__placementAnnotation___78pTr",annotationVisible:"styles-module__annotationVisible___mrUyA",sectionAnnotation:"styles-module__sectionAnnotation___aUIs0",handle:"styles-module__handle___Ikbxm",sectionOutline:"styles-module__sectionOutline___s0hy-",ghostOutline:"styles-module__ghostOutline___po-kO",handleNw:"styles-module__handleNw___4TMIj",handleNe:"styles-module__handleNe___mnsTh",handleSe:"styles-module__handleSe___oSFnk",handleSw:"styles-module__handleSw___pi--Z",handleN:"styles-module__handleN___aBA-Q",handleE:"styles-module__handleE___0hM5u",handleS:"styles-module__handleS___JjDRv",handleW:"styles-module__handleW___ERWGQ",edgeHandle:"styles-module__edgeHandle___XxXdT",edgeN:"styles-module__edgeN___-JJDj",edgeS:"styles-module__edgeS___66lMX",edgeE:"styles-module__edgeE___1bGDa",edgeW:"styles-module__edgeW___lHQNo",deleteButton:"styles-module__deleteButton___LkGCb",rearrangeOverlay:"styles-module__rearrangeOverlay___-3R3t",drawBox:"styles-module__drawBox___BrVAa",selectBox:"styles-module__selectBox___Iu8kB",sizeIndicator:"styles-module__sizeIndicator___7zJ4y",guideLine:"styles-module__guideLine___DUQY2",dragPreview:"styles-module__dragPreview___onPbU",dragPreviewWireframe:"styles-module__dragPreviewWireframe___jsg0G",palette:"styles-module__palette___C7iSH",paletteItem:"styles-module__paletteItem___6TlnA",paletteItemLabel:"styles-module__paletteItemLabel___6ncO4",paletteSectionTitle:"styles-module__paletteSectionTitle___PqnjX",paletteFooter:"styles-module__paletteFooter___QYnAG",enter:"styles-module__enter___6LYk5",exit:"styles-module__exit___iSGRw",paletteSection:"styles-module__paletteSection___V8DEA",paletteItemIcon:"styles-module__paletteItemIcon___0NPQK",placeScroll:"styles-module__placeScroll___7sClM",fadeTop:"styles-module__fadeTop___KT9tF",fadeBottom:"styles-module__fadeBottom___x3ShT",paletteFooterWrap:"styles-module__paletteFooterWrap___71-fI",footerHidden:"styles-module__footerHidden___fJUik",paletteFooterInnerContent:"styles-module__paletteFooterInnerContent___VC26h",paletteFooterInner:"styles-module__paletteFooterInner___dfylY",paletteFooterCount:"styles-module__paletteFooterCount___D3Fia",paletteFooterClear:"styles-module__paletteFooterClear___ybBoa",paletteFooterActions:"styles-module__paletteFooterActions___fLzv8",rollingWrap:"styles-module__rollingWrap___S75jM",rollingNum:"styles-module__rollingNum___1RKDx",exitUp:"styles-module__exitUp___AFDRW",numExitUp:"styles-module__numExitUp___FRQqx",enterUp:"styles-module__enterUp___CPlXb",numEnterUp:"styles-module__numEnterUp___2Yd-w",exitDown:"styles-module__exitDown___-1yAy",numExitDown:"styles-module__numExitDown___xm5by",enterDown:"styles-module__enterDown___DDuFR",numEnterDown:"styles-module__numEnterDown___hpxBk",hoverHighlight:"styles-module__hoverHighlight___8eT-v",highlightFadeIn:"styles-module__highlightFadeIn___Lg7KY",sectionEnter:"styles-module__sectionEnter___-8BXT",settled:"styles-module__settled___b5U5o",sectionLabel:"styles-module__sectionLabel___F80HQ",movedBadge:"styles-module__movedBadge___s8z-q",sectionDimensions:"styles-module__sectionDimensions___RcJSL",badgeVisible:"styles-module__badgeVisible___npbdS",resizedBadge:"styles-module__resizedBadge___u51V8",wireframeNotice:"styles-module__wireframeNotice___4GJyB",wireframeOpacityRow:"styles-module__wireframeOpacityRow___CJXzi",wireframeOpacityLabel:"styles-module__wireframeOpacityLabel___afkfT",wireframeOpacitySlider:"styles-module__wireframeOpacitySlider___YcoEs",wireframeNoticeTitleRow:"styles-module__wireframeNoticeTitleRow___PJqyG",wireframeNoticeTitle:"styles-module__wireframeNoticeTitle___okr08",wireframeNoticeDivider:"styles-module__wireframeNoticeDivider___PNKQ6",wireframeStartOver:"styles-module__wireframeStartOver___YFk-I",ghostEnter:"styles-module__ghostEnter___EC3Mb",ghostBadge:"styles-module__ghostBadge___tsQUK",badgeSlideIn:"styles-module__badgeSlideIn___typJ7",ghostBadgeExtra:"styles-module__ghostBadgeExtra___6CVoD",badgeExtraIn:"styles-module__badgeExtraIn___i4W8F",originalOutline:"styles-module__originalOutline___Y6DD1",originalLabel:"styles-module__originalLabel___HqI9g",connectorSvg:"styles-module__connectorSvg___Lovld",connectorLine:"styles-module__connectorLine___XeWh-",connectorDraw:"styles-module__connectorDraw___8sK5I",connectorDot:"styles-module__connectorDot___yvf7C",connectorDotIn:"styles-module__connectorDotIn___NwTUq",connectorExiting:"styles-module__connectorExiting___2lLOs",connectorOut:"styles-module__connectorOut___5QoPl",connectorDotOut:"styles-module__connectorDotOut___FEq7e"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-design-mode-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-design-mode-styles",document.head.appendChild(t)),t.textContent=bl}var C=wl,Mn=24,_s=5;function Zo(t,n,s,o,i){let r=1/0,d=1/0;const g=t.x,m=t.x+t.width,$=t.x+t.width/2,x=t.y,y=t.y+t.height,w=t.y+t.height/2,R=!o,k=R?[g,m,$]:[...o.left?[g]:[],...o.right?[m]:[]],B=R?[x,y,w]:[...o.top?[x]:[],...o.bottom?[y]:[]],U=[];for(const ue of n)s.has(ue.id)||U.push(ue);i&&U.push(...i);for(const ue of U){const Fe=ue.x,Xe=ue.x+ue.width,ge=ue.x+ue.width/2,$e=ue.y,J=ue.y+ue.height,it=ue.y+ue.height/2;for(const T of k)for(const he of[Fe,Xe,ge]){const Ae=he-T;Math.abs(Ae)<_s&&Math.abs(Ae)<Math.abs(r)&&(r=Ae)}for(const T of B)for(const he of[$e,J,it]){const Ae=he-T;Math.abs(Ae)<_s&&Math.abs(Ae)<Math.abs(d)&&(d=Ae)}}const A=Math.abs(r)<_s?r:0,pe=Math.abs(d)<_s?d:0,Te=[],I=new Set,ne=g+A,me=m+A,z=$+A,je=x+pe,Le=y+pe,be=w+pe;for(const ue of U){const Fe=ue.x,Xe=ue.x+ue.width,ge=ue.x+ue.width/2,$e=ue.y,J=ue.y+ue.height,it=ue.y+ue.height/2;for(const T of[Fe,ge,Xe])for(const he of[ne,z,me])if(Math.abs(he-T)<.5){const Ae=`x:${Math.round(T)}`;I.has(Ae)||(I.add(Ae),Te.push({axis:"x",pos:T}))}for(const T of[$e,it,J])for(const he of[je,be,Le])if(Math.abs(he-T)<.5){const Ae=`y:${Math.round(T)}`;I.has(Ae)||(I.add(Ae),Te.push({axis:"y",pos:T}))}}return{dx:A,dy:pe,guides:Te}}function er(){return`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function vl({placements:t,onChange:n,activeComponent:s,onActiveComponentChange:o,isDarkMode:i,exiting:r,onInteractionChange:d,className:g,passthrough:m,extraSnapRects:$,onSelectionChange:x,deselectSignal:y,onDragMove:w,onDragEnd:R,clearSignal:k,wireframe:B}){const[U,A]=l.useState(new Set),[pe,Te]=l.useState(null),[I,ne]=l.useState(null),[me,z]=l.useState(null),[je,Le]=l.useState([]),[be,ue]=l.useState(null),[Fe,Xe]=l.useState(!1),ge=l.useRef(!1),[$e,J]=l.useState(new Set),it=l.useRef(new Map),T=l.useRef(null),he=l.useRef(null),Ae=l.useRef(t);Ae.current=t;const Je=l.useRef(x);Je.current=x;const ft=l.useRef(w);ft.current=w;const gt=l.useRef(R);gt.current=R;const Gt=l.useRef(y);l.useEffect(()=>{y!==Gt.current&&(Gt.current=y,A(new Set))},[y]);const It=l.useRef(k);l.useEffect(()=>{if(k!==void 0&&k!==It.current){It.current=k;const S=new Set(Ae.current.map(Z=>Z.id));S.size>0&&(J(S),A(new Set),he.current=null,re(()=>{n([]),J(new Set)},180))}},[k,n]),l.useEffect(()=>{const S=Z=>{const xe=Z.target;if(!(xe.tagName==="INPUT"||xe.tagName==="TEXTAREA"||xe.isContentEditable)){if((Z.key==="Backspace"||Z.key==="Delete")&&U.size>0){Z.preventDefault();const Ee=new Set(U);J(Ee),A(new Set),re(()=>{n(Ae.current.filter(ke=>!Ee.has(ke.id))),J(new Set)},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(Z.key)&&U.size>0){Z.preventDefault();const Ee=Z.shiftKey?20:1,ke=Z.key==="ArrowLeft"?-Ee:Z.key==="ArrowRight"?Ee:0,Re=Z.key==="ArrowUp"?-Ee:Z.key==="ArrowDown"?Ee:0;n(t.map(we=>U.has(we.id)?{...we,x:Math.max(0,we.x+ke),y:Math.max(0,we.y+Re)}:we));return}if(Z.key==="Escape"){s?o(null):U.size>0&&A(new Set);return}}};return document.addEventListener("keydown",S),()=>document.removeEventListener("keydown",S)},[U,s,t,n,o]);const Kt=l.useCallback(S=>{if(S.button!==0||m||S.target.closest(`.${C.placement}`))return;S.preventDefault(),S.stopPropagation();const xe=window.scrollY,le=S.clientX,Ee=S.clientY;if(s){he.current="place",d==null||d(!0);let ke=!1,Re=le,we=Ee;const ze=ee=>{Re=ee.clientX,we=ee.clientY;const f=Math.abs(Re-le),b=Math.abs(we-Ee);if((f>5||b>5)&&(ke=!0),ke){const N=Math.min(le,Re),L=Math.min(Ee,we),K=Math.abs(Re-le),q=Math.abs(we-Ee);Te({x:N,y:L,w:K,h:q}),z({x:ee.clientX+12,y:ee.clientY+12,text:`${Math.round(K)} × ${Math.round(q)}`})}},et=ee=>{window.removeEventListener("mousemove",ze),window.removeEventListener("mouseup",et),Te(null),z(null),he.current=null,d==null||d(!1);const f=H[s];let b,N,L,K;ke?(b=Math.min(le,Re),N=Math.min(Ee,we)+xe,L=Math.max(Mn,Math.abs(Re-le)),K=Math.max(Mn,Math.abs(we-Ee))):(L=f.width,K=f.height,b=le-L/2,N=Ee+xe-K/2),b=Math.max(0,b),N=Math.max(0,N);const q={id:er(),type:s,x:b,y:N,width:L,height:K,scrollY:xe,timestamp:Date.now()},D=[...t,q];n(D),A(new Set([q.id])),o(null)};window.addEventListener("mousemove",ze),window.addEventListener("mouseup",et)}else{S.shiftKey||A(new Set),he.current="select";let ke=!1;const Re=ze=>{const et=Math.abs(ze.clientX-le),ee=Math.abs(ze.clientY-Ee);if((et>4||ee>4)&&(ke=!0),ke){const f=Math.min(le,ze.clientX),b=Math.min(Ee,ze.clientY);ne({x:f,y:b,w:Math.abs(ze.clientX-le),h:Math.abs(ze.clientY-Ee)})}},we=ze=>{if(window.removeEventListener("mousemove",Re),window.removeEventListener("mouseup",we),he.current=null,ke){const et=Math.min(le,ze.clientX),ee=Math.min(Ee,ze.clientY)+xe,f=Math.abs(ze.clientX-le),b=Math.abs(ze.clientY-Ee),N=new Set(S.shiftKey?U:new Set);for(const L of t)L.y-xe,L.x+L.width>et&&L.x<et+f&&L.y+L.height>ee&&L.y<ee+b&&N.add(L.id);A(N)}ne(null)};window.addEventListener("mousemove",Re),window.addEventListener("mouseup",we)}},[s,m,t,n,U]),Pt=l.useCallback((S,Z)=>{var q;if(S.button!==0)return;const xe=S.target;if(xe.closest(`.${C.handle}`)||xe.closest(`.${C.deleteButton}`))return;S.preventDefault(),S.stopPropagation();let le;S.shiftKey?(le=new Set(U),le.has(Z)?le.delete(Z):le.add(Z)):U.has(Z)?le=new Set(U):le=new Set([Z]),A(le),(le.size!==U.size||[...le].some(D=>!U.has(D)))&&((q=Je.current)==null||q.call(Je,le,S.shiftKey));const ke=S.clientX,Re=S.clientY,we=new Map;for(const D of t)le.has(D.id)&&we.set(D.id,{x:D.x,y:D.y});he.current="move",d==null||d(!0);let ze=!1,et=!1,ee=t,f=0,b=0;const N=new Map;for(const D of t)we.has(D.id)&&N.set(D.id,{w:D.width,h:D.height});const L=D=>{var lt;const Me=D.clientX-ke,fe=D.clientY-Re;if((Math.abs(Me)>2||Math.abs(fe)>2)&&(ze=!0),!ze)return;if(D.altKey&&!et){et=!0;const se=[];for(const We of t)we.has(We.id)&&se.push({...We,id:er(),timestamp:Date.now()});ee=[...t,...se]}let Be=1/0,ie=1/0,V=-1/0,Pe=-1/0;for(const[se,We]of we){const ut=N.get(se);ut&&(Be=Math.min(Be,We.x+Me),ie=Math.min(ie,We.y+fe),V=Math.max(V,We.x+Me+ut.w),Pe=Math.max(Pe,We.y+fe+ut.h))}const He={x:Be,y:ie,width:V-Be,height:Pe-ie},{dx:at,dy:Y,guides:De}=Zo(He,ee,new Set(we.keys()),void 0,$);Le(De);const Ce=Me+at,ve=fe+Y;f=Ce,b=ve,n(ee.map(se=>{const We=we.get(se.id);return We?{...se,x:Math.max(0,We.x+Ce),y:Math.max(0,We.y+ve)}:se})),(lt=ft.current)==null||lt.call(ft,Ce,ve)},K=()=>{var D;window.removeEventListener("mousemove",L),window.removeEventListener("mouseup",K),he.current=null,d==null||d(!1),Le([]),(D=gt.current)==null||D.call(gt,f,b,ze)};window.addEventListener("mousemove",L),window.addEventListener("mouseup",K)},[U,t,n,d]),Ut=l.useCallback((S,Z,xe)=>{S.preventDefault(),S.stopPropagation();const le=t.find(N=>N.id===Z);if(!le)return;A(new Set([Z])),he.current="resize",d==null||d(!0);const Ee=S.clientX,ke=S.clientY,Re=le.width,we=le.height,ze=le.x,et=le.y,ee={left:xe.includes("w"),right:xe.includes("e"),top:xe.includes("n"),bottom:xe.includes("s")},f=N=>{const L=N.clientX-Ee,K=N.clientY-ke;let q=Re,D=we,Me=ze,fe=et;xe.includes("e")&&(q=Math.max(Mn,Re+L)),xe.includes("w")&&(q=Math.max(Mn,Re-L),Me=ze+Re-q),xe.includes("s")&&(D=Math.max(Mn,we+K)),xe.includes("n")&&(D=Math.max(Mn,we-K),fe=et+we-D);const Be={x:Me,y:fe,width:q,height:D},{dx:ie,dy:V,guides:Pe}=Zo(Be,Ae.current,new Set([Z]),ee,$);Le(Pe),ie!==0&&(ee.right?q+=ie:ee.left&&(Me+=ie,q-=ie)),V!==0&&(ee.bottom?D+=V:ee.top&&(fe+=V,D-=V)),n(Ae.current.map(He=>He.id===Z?{...He,x:Me,y:fe,width:q,height:D}:He)),z({x:N.clientX+12,y:N.clientY+12,text:`${Math.round(q)} × ${Math.round(D)}`})},b=()=>{window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",b),z(null),he.current=null,d==null||d(!1),Le([])};window.addEventListener("mousemove",f),window.addEventListener("mouseup",b)},[t,n,d]),Jt=l.useCallback(S=>{he.current=null,J(Z=>{const xe=new Set(Z);return xe.add(S),xe}),A(Z=>{const xe=new Set(Z);return xe.delete(S),xe}),re(()=>{n(Ae.current.filter(Z=>Z.id!==S)),J(Z=>{const xe=new Set(Z);return xe.delete(S),xe})},180)},[n]),Zt={hero:"Headline text",button:"Button label",badge:"Badge label",cta:"Call to action text",toast:"Notification message",modal:"Dialog title",card:"Card title",navigation:"Brand / nav items",tabs:"Tab labels",input:"Placeholder text",search:"Search placeholder",pricing:"Plan name or price",testimonial:"Quote text",alert:"Alert message",banner:"Banner text",tag:"Tag label",notification:"Notification message",stat:"Metric value",productCard:"Product name"},Nt=l.useCallback(S=>{const Z=t.find(xe=>xe.id===S);Z&&(ge.current=!!Z.text,ue(S),Xe(!1))},[t]),Ze=l.useCallback(()=>{be&&(Xe(!0),re(()=>{ue(null),Xe(!1)},150))},[be]);l.useEffect(()=>{r&&be&&Ze()},[r]);const yt=l.useCallback(S=>{be&&(n(t.map(Z=>Z.id===be?{...Z,text:S.trim()||void 0}:Z)),Ze())},[be,t,n,Ze]),xt=typeof window<"u"?window.scrollY:0,en=["nw","ne","se","sw"],Vt=B?"#f97316":"#3c82f7",tn=[{dir:"n",cls:C.edgeN,arrow:e.jsx("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:e.jsx("path",{d:"M4 0.5L1 4.5h6z",fill:Vt})})},{dir:"e",cls:C.edgeE,arrow:e.jsx("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:e.jsx("path",{d:"M5.5 4L1.5 1v6z",fill:Vt})})},{dir:"s",cls:C.edgeS,arrow:e.jsx("svg",{width:"8",height:"6",viewBox:"0 0 8 6",fill:"none",children:e.jsx("path",{d:"M4 5.5L1 1.5h6z",fill:Vt})})},{dir:"w",cls:C.edgeW,arrow:e.jsx("svg",{width:"6",height:"8",viewBox:"0 0 6 8",fill:"none",children:e.jsx("path",{d:"M0.5 4L4.5 1v6z",fill:Vt})})}];return e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:T,className:`${C.overlay} ${i?"":C.light} ${s?C.placing:""} ${m?C.passthrough:""} ${r?C.overlayExiting:""} ${B?C.wireframe:""}${g?` ${g}`:""}`,"data-feedback-toolbar":!0,onMouseDown:Kt,children:t.map(S=>{var Ee;const Z=U.has(S.id),xe=((Ee=Wt[S.type])==null?void 0:Ee.label)||S.type,le=S.y-xt;return e.jsxs("div",{"data-design-placement":S.id,className:`${C.placement} ${Z?C.selected:""} ${$e.has(S.id)?C.exiting:""}`,style:{left:S.x,top:le,width:S.width,height:S.height,position:"fixed"},onMouseDown:ke=>Pt(ke,S.id),onDoubleClick:()=>Nt(S.id),children:[e.jsx("span",{className:C.placementLabel,children:xe}),e.jsx("span",{className:`${C.placementAnnotation} ${S.text?C.annotationVisible:""}`,children:(S.text&&it.current.set(S.id,S.text),S.text||it.current.get(S.id)||"")}),e.jsx("div",{className:C.placementContent,children:e.jsx(yl,{type:S.type,width:S.width,height:S.height,text:S.text})}),e.jsx("div",{className:C.deleteButton,onMouseDown:ke=>ke.stopPropagation(),onClick:()=>Jt(S.id),children:"✕"}),en.map(ke=>e.jsx("div",{className:`${C.handle} ${C[`handle${ke.charAt(0).toUpperCase()}${ke.slice(1)}`]}`,onMouseDown:Re=>Ut(Re,S.id,ke)},ke)),tn.map(({dir:ke,cls:Re,arrow:we})=>e.jsx("div",{className:`${C.edgeHandle} ${Re}`,onMouseDown:ze=>Ut(ze,S.id,ke),children:we},ke))]},S.id)})}),be&&(()=>{var et;const S=t.find(ee=>ee.id===be);if(!S)return null;const Z=S.y-xt,xe=S.x+S.width/2,le=Z-8,Ee=Z+S.height+8,ke=le>200,Re=Ee<window.innerHeight-100,we=Math.max(160,Math.min(window.innerWidth-160,xe));let ze;return ke?ze={left:we,bottom:window.innerHeight-le}:Re?ze={left:we,top:Ee}:ze={left:we,top:Math.max(80,window.innerHeight/2-80)},e.jsx(js,{element:((et=Wt[S.type])==null?void 0:et.label)||S.type,placeholder:Zt[S.type]||"Label or content text",initialValue:S.text??"",submitLabel:ge.current?"Save":"Set",onSubmit:yt,onCancel:Ze,onDelete:ge.current?()=>{yt("")}:void 0,isExiting:Fe,lightMode:!i,style:ze})})(),pe&&e.jsx("div",{className:C.drawBox,style:{left:pe.x,top:pe.y,width:pe.w,height:pe.h},"data-feedback-toolbar":!0}),I&&e.jsx("div",{className:C.selectBox,style:{left:I.x,top:I.y,width:I.w,height:I.h},"data-feedback-toolbar":!0}),me&&e.jsx("div",{className:C.sizeIndicator,style:{left:me.x,top:me.y},"data-feedback-toolbar":!0,children:me.text}),je.map((S,Z)=>e.jsx("div",{className:C.guideLine,style:S.axis==="x"?{position:"fixed",left:S.pos,top:0,width:1,bottom:0}:{position:"fixed",left:0,top:S.pos-xt,right:0,height:1},"data-feedback-toolbar":!0},`${S.axis}-${S.pos}-${Z}`))]})}function kl(t){if(!t)return"";const n=t.scrollTop>2,s=t.scrollTop+t.clientHeight<t.scrollHeight-2;return`${n?C.fadeTop:""} ${s?C.fadeBottom:""}`}var c="currentColor",j="0.5";function jl({type:t}){switch(t){case"navigation":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"4",width:"18",height:"8",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"7",width:"3",height:"1.5",rx:".5",fill:c,opacity:".4"}),e.jsx("rect",{x:"7",y:"7",width:"2.5",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"11",y:"7",width:"2.5",height:"1.5",rx:".5",fill:c,opacity:".25"})]});case"header":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"5.5",width:"8",height:"2",rx:".5",fill:c,opacity:".35"}),e.jsx("rect",{x:"3",y:"9",width:"12",height:"1",rx:".5",fill:c,opacity:".15"})]});case"hero":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"5",width:"10",height:"1.5",rx:".5",fill:c,opacity:".35"}),e.jsx("rect",{x:"7",y:"8",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"7.5",y:"10.5",width:"5",height:"2.5",rx:"1",stroke:c,strokeWidth:j})]});case"section":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"18",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"4",width:"6",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"3",y:"6.5",width:"14",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"3",y:"9",width:"10",height:"1",rx:".5",fill:c,opacity:".15"})]});case"sidebar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"4",width:"4",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"2.5",y:"6.5",width:"3.5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2.5",y:"9",width:"4",height:"1",rx:".5",fill:c,opacity:".15"})]});case"footer":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"7",width:"18",height:"8",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"9.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"9.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"15",y:"9.5",width:"3",height:"1",rx:".5",fill:c,opacity:".2"})]});case"modal":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"7",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"5",y:"7",width:"10",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"11",y:"11",width:"5",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"divider":return e.jsx("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:e.jsx("line",{x1:"2",y1:"8",x2:"18",y2:"8",stroke:c,strokeWidth:"0.5",opacity:".3"})});case"card":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"1",width:"16",height:"5.5",rx:"1",fill:c,opacity:".04"}),e.jsx("rect",{x:"4",y:"8.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"4",y:"11",width:"11",height:"1",rx:".5",fill:c,opacity:".12"})]});case"text":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"14",height:"1.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"2",y:"7",width:"11",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"9.5",width:"13",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"12",width:"8",height:"1",rx:".5",fill:c,opacity:".12"})]});case"image":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"2",x2:"18",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"18",y1:"2",x2:"2",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"})]});case"video":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M8.5 5.5v5l4.5-2.5z",stroke:c,strokeWidth:j,fill:c,opacity:".15"})]});case"table":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"1",y1:"5.5",x2:"19",y2:"5.5",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"1",y1:"9",x2:"19",y2:"9",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"7",y1:"2",x2:"7",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"}),e.jsx("line",{x1:"13",y1:"2",x2:"13",y2:"14",stroke:c,strokeWidth:".3",opacity:".25"})]});case"grid":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11.5",y:"2",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11.5",y:"9.5",width:"7",height:"5.5",rx:"1",stroke:c,strokeWidth:j})]});case"list":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"3.5",cy:"4.5",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"4",width:"10",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"3.5",cy:"8",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"3.5",cy:"11.5",r:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"11",width:"11",height:"1",rx:".5",fill:c,opacity:".2"})]});case"chart":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"9",width:"2.5",height:"4",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"7",y:"6",width:"2.5",height:"7",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"11",y:"3",width:"2.5",height:"10",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"15",y:"5",width:"2.5",height:"8",rx:".5",fill:c,opacity:".2"})]});case"accordion":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"2",width:"17",height:"4",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"3.5",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"1.5",y:"7.5",width:"17",height:"3",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"12",width:"17",height:"3",rx:"1",stroke:c,strokeWidth:j})]});case"carousel":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"10",rx:"1",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M1.5 7L3 8.5 1.5 10",stroke:c,strokeWidth:j,opacity:".35"}),e.jsx("path",{d:"M18.5 7L17 8.5 18.5 10",stroke:c,strokeWidth:j,opacity:".35"}),e.jsx("circle",{cx:"8.5",cy:"14",r:".6",fill:c,opacity:".35"}),e.jsx("circle",{cx:"10",cy:"14",r:".6",fill:c,opacity:".15"}),e.jsx("circle",{cx:"11.5",cy:"14",r:".6",fill:c,opacity:".15"})]});case"button":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"2",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"7.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"})]});case"input":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"5.5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"6.5",width:"16",height:"5.5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"8.5",width:"7",height:"1",rx:".5",fill:c,opacity:".12"})]});case"search":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4.5",width:"16",height:"7",rx:"3.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"6",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("line",{x1:"7.5",y1:"9.5",x2:"9",y2:"11",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"9.5",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"form":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1.5",width:"5.5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"3.5",width:"16",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"8",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"2",y:"10",width:"16",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"12",y:"14",width:"6",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"tabs":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"5",width:"18",height:"10",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1",y:"2",width:"6",height:"3.5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"3.25",width:"3",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"2",width:"6",height:"3.5",rx:".75",stroke:c,strokeWidth:j})]});case"dropdown":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"4",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"3.5",width:"7",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("path",{d:"M15 3.5l1.5 1.5L18 3.5",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"2",y:"7",width:"16",height:"7",rx:"1",stroke:c,strokeWidth:j,strokeDasharray:"2 1",opacity:".3"})]});case"toggle":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"4",y:"5",width:"12",height:"6",rx:"3",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"13",cy:"8",r:"2",fill:c,opacity:".3"})]});case"avatar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"6",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"10",cy:"6.5",r:"2",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5",stroke:c,strokeWidth:j})]});case"badge":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"3",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"})]});case"breadcrumb":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"7",width:"3.5",height:"1",rx:".5",fill:c,opacity:".3"}),e.jsx("path",{d:"M6.5 7l1 1-1 1",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"9",y:"7",width:"3.5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("path",{d:"M14 7l1 1-1 1",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"16.5",y:"7",width:"2",height:"1",rx:".5",fill:c,opacity:".15"})]});case"pagination":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11",y:"5.5",width:"3.5",height:"5",rx:"1",fill:c,opacity:".15",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"15.5",y:"5.5",width:"3.5",height:"5",rx:"1",stroke:c,strokeWidth:j})]});case"progress":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"7",width:"16",height:"2",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2",y:"7",width:"10",height:"2",rx:"1",fill:c,opacity:".2"})]});case"toast":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"5",cy:"8",r:"1.5",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"8",y:"6.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"8",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".12"})]});case"tooltip":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"3",width:"14",height:"7",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5.5",y:"5.5",width:"9",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("path",{d:"M9 10l1 2.5 1-2.5",stroke:c,strokeWidth:j})]});case"pricing":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"5.5",width:"6",height:"2",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"5",y:"9",width:"10",height:"1",rx:".5",fill:c,opacity:".1"}),e.jsx("rect",{x:"5",y:"11",width:"10",height:"1",rx:".5",fill:c,opacity:".1"}),e.jsx("rect",{x:"6",y:"13",width:"8",height:"1.5",rx:".5",fill:c,opacity:".2"})]});case"testimonial":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("text",{x:"4",y:"5.5",fontSize:"4",fill:c,opacity:".2",fontFamily:"serif",children:"“"}),e.jsx("rect",{x:"4",y:"7",width:"12",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"9",width:"9",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("circle",{cx:"5.5",cy:"12.5",r:"1.5",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"8",y:"12",width:"5",height:"1",rx:".5",fill:c,opacity:".15"})]});case"cta":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"2",width:"18",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"10",height:"1.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"6",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"7",y:"10",width:"6",height:"2.5",rx:"1",stroke:c,strokeWidth:j})]});case"alert":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"4",width:"16",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"6",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("line",{x1:"6",y1:"7",x2:"6",y2:"8.5",stroke:c,strokeWidth:"0.6",opacity:".5"}),e.jsx("circle",{cx:"6",cy:"9.3",r:".3",fill:c,opacity:".5"}),e.jsx("rect",{x:"9.5",y:"7",width:"6",height:"1",rx:".5",fill:c,opacity:".2"})]});case"banner":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1",y:"5",width:"18",height:"6",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"7.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"14",y:"7",width:"3.5",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"stat":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"4.5",width:"8",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"5",y:"7",width:"10",height:"2.5",rx:".5",fill:c,opacity:".3"}),e.jsx("rect",{x:"7",y:"11",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"stepper":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"4",cy:"8",r:"2",fill:c,opacity:".2",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"6",y1:"8",x2:"8",y2:"8",stroke:c,strokeWidth:".4",opacity:".3"}),e.jsx("circle",{cx:"10",cy:"8",r:"2",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"12",y1:"8",x2:"14",y2:"8",stroke:c,strokeWidth:".4",opacity:".3"}),e.jsx("circle",{cx:"16",cy:"8",r:"2",stroke:c,strokeWidth:j})]});case"tag":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"5",width:"14",height:"6",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5.5",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("line",{x1:"14",y1:"6.5",x2:"15.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("line",{x1:"15.5",y1:"6.5",x2:"14",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"})]});case"rating":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("path",{d:"M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z",fill:c,opacity:".25"}),e.jsx("path",{d:"M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z",fill:c,opacity:".25"}),e.jsx("path",{d:"M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z",stroke:c,strokeWidth:j,opacity:".25"})]});case"map":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"6",x2:"18",y2:"10",stroke:c,strokeWidth:".3",opacity:".15"}),e.jsx("line",{x1:"7",y1:"2",x2:"11",y2:"14",stroke:c,strokeWidth:".3",opacity:".15"}),e.jsx("path",{d:"M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z",fill:c,opacity:".15",stroke:c,strokeWidth:j})]});case"timeline":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("line",{x1:"5",y1:"2",x2:"5",y2:"14",stroke:c,strokeWidth:".4",opacity:".25"}),e.jsx("circle",{cx:"5",cy:"4",r:"1.5",fill:c,opacity:".2",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"3",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("circle",{cx:"5",cy:"8.5",r:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"7.5",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("circle",{cx:"5",cy:"13",r:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"8",y:"12",width:"7",height:"1",rx:".5",fill:c,opacity:".15"})]});case"fileUpload":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"12",rx:"1.5",stroke:c,strokeWidth:j,strokeDasharray:"2 1"}),e.jsx("path",{d:"M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"7",y:"11.5",width:"6",height:"1",rx:".5",fill:c,opacity:".15"})]});case"codeBlock":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"4",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"5.5",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"7",cy:"4",r:".6",fill:c,opacity:".3"}),e.jsx("rect",{x:"4",y:"7",width:"7",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"6",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"11",width:"8",height:"1",rx:".5",fill:c,opacity:".12"})]});case"calendar":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"16",height:"12",rx:"1",stroke:c,strokeWidth:j}),e.jsx("line",{x1:"2",y1:"6.5",x2:"18",y2:"6.5",stroke:c,strokeWidth:".4",opacity:".25"}),e.jsx("rect",{x:"5",y:"4",width:"1",height:"1.5",rx:".3",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"4",width:"1",height:"1.5",rx:".3",fill:c,opacity:".2"}),e.jsx("circle",{cx:"7",cy:"9",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"9",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"13",cy:"9",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"7",cy:"12",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"12",r:".6",fill:c,opacity:".2"})]});case"notification":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"16",height:"10",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"5.5",cy:"8",r:"2",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"9",y:"6",width:"6",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"8.5",width:"4.5",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("circle",{cx:"16.5",cy:"4.5",r:"1.5",fill:c,opacity:".25"})]});case"productCard":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3",y:"1",width:"14",height:"6",rx:"1",fill:c,opacity:".04"}),e.jsx("rect",{x:"5",y:"8.5",width:"7",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"10.5",width:"4",height:"1.5",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"12",y:"12",width:"4",height:"2",rx:".75",stroke:c,strokeWidth:j})]});case"profile":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"5",r:"3",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"10",width:"10",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"12.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"})]});case"drawer":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"9",y:"1",width:"10",height:"14",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"10.5",y:"4",width:"5",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"10.5",y:"6.5",width:"7",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"10.5",y:"9",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"1",y:"1",width:"7",height:"14",rx:"1",stroke:c,strokeWidth:j,opacity:".15"})]});case"popover":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"2",width:"14",height:"9",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"4.5",width:"8",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"7",width:"6",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("path",{d:"M9 11l1 2.5 1-2.5",stroke:c,strokeWidth:j})]});case"logo":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"3",width:"10",height:"10",rx:"2",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M5 9.5l2-4 2 4",stroke:c,strokeWidth:j,opacity:".3"}),e.jsx("rect",{x:"14",y:"6",width:"4",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"8.5",width:"3",height:"1",rx:".5",fill:c,opacity:".12"})]});case"faq":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("text",{x:"2.5",y:"5.5",fontSize:"4",fill:c,opacity:".3",fontWeight:"bold",children:"?"}),e.jsx("rect",{x:"7",y:"3",width:"10",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"5.5",width:"8",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("text",{x:"2.5",y:"11.5",fontSize:"4",fill:c,opacity:".3",fontWeight:"bold",children:"?"}),e.jsx("rect",{x:"7",y:"9",width:"9",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"7",y:"11.5",width:"7",height:"1",rx:".5",fill:c,opacity:".12"})]});case"gallery":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"7.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"13.5",y:"1.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"1.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"7.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"13.5",y:"9.5",width:"5",height:"5",rx:".75",stroke:c,strokeWidth:j})]});case"checkbox":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"5",y:"4",width:"8",height:"8",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M7.5 8l1.5 1.5 3-3",stroke:c,strokeWidth:j,opacity:".35"})]});case"radio":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"4",stroke:c,strokeWidth:j}),e.jsx("circle",{cx:"10",cy:"8",r:"2",fill:c,opacity:".3"})]});case"slider":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"7.5",width:"16",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"2",y:"7.5",width:"10",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("circle",{cx:"12",cy:"8",r:"2.5",stroke:c,strokeWidth:j})]});case"datePicker":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"5",rx:"1",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"3.5",y:"3",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"14",y:"2.5",width:"2.5",height:"2",rx:".5",fill:c,opacity:".12"}),e.jsx("rect",{x:"2",y:"7",width:"16",height:"8",rx:"1",stroke:c,strokeWidth:j,strokeDasharray:"2 1",opacity:".3"}),e.jsx("circle",{cx:"6",cy:"10",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"10",r:".6",fill:c,opacity:".3"}),e.jsx("circle",{cx:"14",cy:"10",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"6",cy:"13",r:".6",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"13",r:".6",fill:c,opacity:".2"})]});case"skeleton":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"16",height:"3",rx:"1",fill:c,opacity:".08"}),e.jsx("rect",{x:"2",y:"7",width:"10",height:"2",rx:".75",fill:c,opacity:".08"}),e.jsx("rect",{x:"2",y:"11",width:"13",height:"2",rx:".75",fill:c,opacity:".08"})]});case"chip":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"1.5",y:"5",width:"10",height:"6",rx:"3",fill:c,opacity:".08",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"7.5",width:"4",height:"1",rx:".5",fill:c,opacity:".25"}),e.jsx("line",{x1:"9.5",y1:"6.5",x2:"10.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("line",{x1:"10.5",y1:"6.5",x2:"9.5",y2:"9.5",stroke:c,strokeWidth:j,opacity:".2"}),e.jsx("rect",{x:"13",y:"5",width:"5.5",height:"6",rx:"3",stroke:c,strokeWidth:j,opacity:".25"})]});case"icon":return e.jsx("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:e.jsx("path",{d:"M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z",stroke:c,strokeWidth:j,opacity:".3"})});case"spinner":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"10",cy:"8",r:"5",stroke:c,strokeWidth:j,opacity:".12"}),e.jsx("path",{d:"M10 3a5 5 0 0 1 5 5",stroke:c,strokeWidth:j,opacity:".35",strokeLinecap:"round"})]});case"feature":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("path",{d:"M4.5 3.5v3m-1.5-1.5h3",stroke:c,strokeWidth:j,opacity:".25"}),e.jsx("rect",{x:"9",y:"2.5",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"5.5",width:"6",height:"1",rx:".5",fill:c,opacity:".12"}),e.jsx("rect",{x:"2",y:"10",width:"5",height:"5",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"9",y:"10.5",width:"7",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"9",y:"13.5",width:"5",height:"1",rx:".5",fill:c,opacity:".12"})]});case"team":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("circle",{cx:"5",cy:"5",r:"2.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"2.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"15",cy:"5",r:"2.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"12.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("circle",{cx:"10",cy:"5",r:"2.5",stroke:c,strokeWidth:j,opacity:".5"}),e.jsx("rect",{x:"7.5",y:"9",width:"5",height:"1",rx:".5",fill:c,opacity:".15"}),e.jsx("rect",{x:"4",y:"12",width:"12",height:"1",rx:".5",fill:c,opacity:".1"})]});case"login":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"3",y:"1",width:"14",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6",y:"3",width:"8",height:"1.5",rx:".5",fill:c,opacity:".25"}),e.jsx("rect",{x:"5",y:"5.5",width:"10",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"5",y:"9.5",width:"10",height:"3",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"6.5",y:"13.5",width:"7",height:"2",rx:".75",fill:c,opacity:".2"})]});case"contact":return e.jsxs("svg",{viewBox:"0 0 20 16",width:"20",height:"16",fill:"none",children:[e.jsx("rect",{x:"2",y:"1",width:"16",height:"14",rx:"1.5",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"3",width:"5",height:"1",rx:".5",fill:c,opacity:".2"}),e.jsx("rect",{x:"4",y:"5",width:"12",height:"2.5",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"4",y:"8.5",width:"12",height:"4",rx:".75",stroke:c,strokeWidth:j}),e.jsx("rect",{x:"11",y:"13.5",width:"5",height:"1.5",rx:".5",fill:c,opacity:".2"})]});default:return null}}function Cl({activeType:t,onSelect:n,onDragStart:s,scrollRef:o,fadeClass:i,blankCanvas:r}){return e.jsx("div",{ref:o,className:`${C.placeScroll} ${i||""}`,children:Er.map(d=>e.jsxs("div",{className:C.paletteSection,children:[e.jsx("div",{className:C.paletteSectionTitle,children:d.section}),d.items.map(g=>e.jsxs("div",{className:`${C.paletteItem} ${t===g.type?C.active:""} ${r?C.wireframe:""}`,onClick:()=>n(g.type),onMouseDown:m=>{m.button===0&&s(g.type,m)},children:[e.jsx("div",{className:C.paletteItemIcon,children:e.jsx(jl,{type:g.type})}),e.jsx("span",{className:C.paletteItemLabel,children:g.label})]},g.type))]},d.section))})}function Sl({value:t,suffix:n}){const[s,o]=l.useState(null),[i,r]=l.useState(n),[d,g]=l.useState("up"),m=l.useRef(t),$=l.useRef(n),x=l.useRef(),y=s!==null&&i!==n;return l.useEffect(()=>{if(t!==m.current){if(t===0){m.current=t,$.current=n,o(null);return}g(t>m.current?"up":"down"),o(m.current),r($.current),m.current=t,$.current=n,clearTimeout(x.current),x.current=re(()=>o(null),250)}else $.current=n},[t,n]),s===null?e.jsxs(e.Fragment,{children:[t,n?` ${n}`:""]}):y?e.jsxs("span",{className:C.rollingWrap,children:[e.jsxs("span",{style:{visibility:"hidden"},children:[t," ",n]}),e.jsxs("span",{className:`${C.rollingNum} ${d==="up"?C.exitUp:C.exitDown}`,children:[s," ",i]},`o${s}-${t}`),e.jsxs("span",{className:`${C.rollingNum} ${d==="up"?C.enterUp:C.enterDown}`,children:[t," ",n]},`n${t}`)]}):e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:C.rollingWrap,children:[e.jsx("span",{style:{visibility:"hidden"},children:t}),e.jsx("span",{className:`${C.rollingNum} ${d==="up"?C.exitUp:C.exitDown}`,children:s},`o${s}-${t}`),e.jsx("span",{className:`${C.rollingNum} ${d==="up"?C.enterUp:C.enterDown}`,children:t},`n${t}`)]}),n?` ${n}`:""]})}function Nl({activeType:t,onSelect:n,isDarkMode:s,sectionCount:o,onDetectSections:i,visible:r,onExited:d,placementCount:g,onClearPlacements:m,onDragStart:$,blankCanvas:x,onBlankCanvasChange:y,wireframePurpose:w,onWireframePurposeChange:R,Tooltip:k}){const[B,U]=l.useState(!1),[A,pe]=l.useState("exit"),[Te,I]=l.useState(!1),[ne,me]=l.useState(!0),z=l.useRef(0),je=l.useRef(""),Le=l.useRef(0),be=l.useRef(),ue=l.useRef(null),[Fe,Xe]=l.useState("");l.useEffect(()=>(r?(U(!0),clearTimeout(be.current),cancelAnimationFrame(Le.current),Le.current=Ln(()=>{Le.current=Ln(()=>{pe("enter")})})):(cancelAnimationFrame(Le.current),pe("exit"),clearTimeout(be.current),be.current=re(()=>{U(!1),d==null||d()},200)),()=>cancelAnimationFrame(Le.current)),[r]);const ge=g>0||o>0,$e=g+o;return $e>0&&(z.current=$e,je.current=x?$e===1?"Component":"Components":$e===1?"Change":"Changes"),l.useEffect(()=>{if(ge)Te?me(!1):(me(!0),I(!0),Ln(()=>{Ln(()=>{me(!1)})}));else{me(!0);const J=re(()=>I(!1),300);return()=>clearTimeout(J)}},[ge]),l.useEffect(()=>{if(!B)return;const J=ue.current;if(!J)return;const it=()=>Xe(kl(J));it(),J.addEventListener("scroll",it,{passive:!0});const T=new ResizeObserver(it);return T.observe(J),()=>{J.removeEventListener("scroll",it),T.disconnect()}},[B]),B?e.jsxs("div",{className:`${C.palette} ${C[A]} ${s?"":C.light}`,"data-feedback-toolbar":!0,"data-agentation-palette":!0,onClick:J=>J.stopPropagation(),onMouseDown:J=>J.stopPropagation(),onTransitionEnd:J=>{J.target===J.currentTarget&&(r||(clearTimeout(be.current),U(!1),pe("exit"),d==null||d()))},children:[e.jsxs("div",{className:C.paletteHeader,children:[e.jsx("div",{className:C.paletteHeaderTitle,children:"Layout Mode"}),e.jsxs("div",{className:C.paletteHeaderDesc,children:["Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary."," ",e.jsx("a",{href:"https://agentation.dev/features#layout-mode",target:"_blank",rel:"noopener noreferrer",children:"Learn more."})]})]}),e.jsxs("div",{className:`${C.canvasToggle} ${x?C.active:""}`,onClick:()=>y(!x),children:[e.jsx("span",{className:C.canvasToggleIcon,children:e.jsxs("svg",{viewBox:"0 0 14 14",width:"14",height:"14",fill:"none",children:[e.jsx("rect",{x:"1",y:"1",width:"12",height:"12",rx:"2",stroke:"currentColor",strokeWidth:"1"}),e.jsx("circle",{cx:"4.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"4.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"4.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"7",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"4.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"7",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"}),e.jsx("circle",{cx:"9.5",cy:"9.5",r:"0.8",fill:"currentColor",opacity:".6"})]})}),e.jsx("span",{className:C.canvasToggleLabel,children:"Wireframe New Page"})]}),e.jsx("div",{className:`${C.wireframePurposeWrap} ${x?"":C.collapsed}`,children:e.jsx("div",{className:C.wireframePurposeInner,children:e.jsx("textarea",{className:C.wireframePurposeInput,placeholder:"Describe this page to provide additional context for your agent.",value:w,onChange:J=>R(J.target.value),rows:2})})}),e.jsx(Cl,{activeType:t,onSelect:n,onDragStart:$,scrollRef:ue,fadeClass:Fe,blankCanvas:x}),Te&&e.jsx("div",{className:`${C.paletteFooterWrap} ${ne?C.footerHidden:""}`,children:e.jsx("div",{className:C.paletteFooterInner,children:e.jsx("div",{className:C.paletteFooterInnerContent,children:e.jsxs("div",{className:C.paletteFooter,children:[e.jsx("span",{className:C.paletteFooterCount,children:e.jsx(Sl,{value:z.current,suffix:je.current})}),e.jsx("button",{className:C.paletteFooterClear,onClick:m,children:"Clear"})]})})})})]}):null}function Rn(t){if(t.parentElement)return t.parentElement;const n=t.getRootNode();return n instanceof ShadowRoot?n.host:null}function jt(t,n){let s=t;for(;s;){if(s.matches(n))return s;s=Rn(s)}return null}function Ml(t,n=4){const s=[];let o=t,i=0;for(;o&&i<n;){const r=o.tagName.toLowerCase();if(r==="html"||r==="body")break;let d=r;if(o.id)d=`#${o.id}`;else if(o.className&&typeof o.className=="string"){const m=o.className.split(/\s+/).find($=>$.length>2&&!$.match(/^[a-z]{1,2}$/)&&!$.match(/[A-Z0-9]{5,}/));m&&(d=`.${m.split("_")[0]}`)}const g=Rn(o);!o.parentElement&&g&&(d=`⟨shadow⟩ ${d}`),s.unshift(d),o=g,i++}return s.join(" > ")}function En(t){var o,i,r,d,g,m,$,x;const n=Ml(t);if(t.dataset.element)return{name:t.dataset.element,path:n};const s=t.tagName.toLowerCase();if(["path","circle","rect","line","g"].includes(s)){const y=jt(t,"svg");if(y){const w=Rn(y);if(w instanceof HTMLElement)return{name:`graphic in ${En(w).name}`,path:n}}return{name:"graphic element",path:n}}if(s==="svg"){const y=Rn(t);if((y==null?void 0:y.tagName.toLowerCase())==="button"){const w=(o=y.textContent)==null?void 0:o.trim();return{name:w?`icon in "${w}" button`:"button icon",path:n}}return{name:"icon",path:n}}if(s==="button"){const y=(i=t.textContent)==null?void 0:i.trim(),w=t.getAttribute("aria-label");return w?{name:`button [${w}]`,path:n}:{name:y?`button "${y.slice(0,25)}"`:"button",path:n}}if(s==="a"){const y=(r=t.textContent)==null?void 0:r.trim(),w=t.getAttribute("href");return y?{name:`link "${y.slice(0,25)}"`,path:n}:w?{name:`link to ${w.slice(0,30)}`,path:n}:{name:"link",path:n}}if(s==="input"){const y=t.getAttribute("type")||"text",w=t.getAttribute("placeholder"),R=t.getAttribute("name");return w?{name:`input "${w}"`,path:n}:R?{name:`input [${R}]`,path:n}:{name:`${y} input`,path:n}}if(["h1","h2","h3","h4","h5","h6"].includes(s)){const y=(d=t.textContent)==null?void 0:d.trim();return{name:y?`${s} "${y.slice(0,35)}"`:s,path:n}}if(s==="p"){const y=(g=t.textContent)==null?void 0:g.trim();return y?{name:`paragraph: "${y.slice(0,40)}${y.length>40?"...":""}"`,path:n}:{name:"paragraph",path:n}}if(s==="span"||s==="label"){const y=(m=t.textContent)==null?void 0:m.trim();return y&&y.length<40?{name:`"${y}"`,path:n}:{name:s,path:n}}if(s==="li"){const y=($=t.textContent)==null?void 0:$.trim();return y&&y.length<40?{name:`list item: "${y.slice(0,35)}"`,path:n}:{name:"list item",path:n}}if(s==="blockquote")return{name:"blockquote",path:n};if(s==="code"){const y=(x=t.textContent)==null?void 0:x.trim();return y&&y.length<30?{name:`code: \`${y}\``,path:n}:{name:"code",path:n}}if(s==="pre")return{name:"code block",path:n};if(s==="img"){const y=t.getAttribute("alt");return{name:y?`image "${y.slice(0,30)}"`:"image",path:n}}if(s==="video")return{name:"video",path:n};if(["div","section","article","nav","header","footer","aside","main"].includes(s)){const y=t.className,w=t.getAttribute("role"),R=t.getAttribute("aria-label");if(R)return{name:`${s} [${R}]`,path:n};if(w)return{name:`${w}`,path:n};if(typeof y=="string"&&y){const k=y.split(/[\s_-]+/).map(B=>B.replace(/[A-Z0-9]{5,}.*$/,"")).filter(B=>B.length>2&&!/^[a-z]{1,2}$/.test(B)).slice(0,2);if(k.length>0)return{name:k.join(" "),path:n}}return{name:s==="div"?"container":s,path:n}}return{name:s,path:n}}function Xn(t){var r,d,g;const n=[],s=(r=t.textContent)==null?void 0:r.trim();s&&s.length<100&&n.push(s);const o=t.previousElementSibling;if(o){const m=(d=o.textContent)==null?void 0:d.trim();m&&m.length<50&&n.unshift(`[before: "${m.slice(0,40)}"]`)}const i=t.nextElementSibling;if(i){const m=(g=i.textContent)==null?void 0:g.trim();m&&m.length<50&&n.push(`[after: "${m.slice(0,40)}"]`)}return n.join(" ")}function us(t){const n=Rn(t);if(!n)return"";const i=(t.getRootNode()instanceof ShadowRoot&&t.parentElement?Array.from(t.parentElement.children):Array.from(n.children)).filter(x=>x!==t&&x instanceof HTMLElement);if(i.length===0)return"";const r=i.slice(0,4).map(x=>{var k;const y=x.tagName.toLowerCase(),w=x.className;let R="";if(typeof w=="string"&&w){const B=w.split(/\s+/).map(U=>U.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(U=>U.length>2&&!/^[a-z]{1,2}$/.test(U));B&&(R=`.${B}`)}if(y==="button"||y==="a"){const B=(k=x.textContent)==null?void 0:k.trim().slice(0,15);if(B)return`${y}${R} "${B}"`}return`${y}${R}`});let g=n.tagName.toLowerCase();if(typeof n.className=="string"&&n.className){const x=n.className.split(/\s+/).map(y=>y.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(y=>y.length>2&&!/^[a-z]{1,2}$/.test(y));x&&(g=`.${x}`)}const m=n.children.length,$=m>r.length+1?` (${m} total in ${g})`:"";return r.join(", ")+$}function Un(t){const n=t.className;return typeof n!="string"||!n?"":n.split(/\s+/).filter(o=>o.length>0).map(o=>{const i=o.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);return i?i[1]:o}).filter((o,i,r)=>r.indexOf(o)===i).join(", ")}var Rr=new Set(["none","normal","auto","0px","rgba(0, 0, 0, 0)","transparent","static","visible"]),$l=new Set(["p","span","h1","h2","h3","h4","h5","h6","label","li","td","th","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","a","time","cite","q"]),Il=new Set(["input","textarea","select"]),Ll=new Set(["img","video","canvas","svg"]),El=new Set(["div","section","article","nav","header","footer","aside","main","ul","ol","form","fieldset"]);function hs(t){if(typeof window>"u")return{};const n=window.getComputedStyle(t),s={},o=t.tagName.toLowerCase();let i;$l.has(o)?i=["color","fontSize","fontWeight","fontFamily","lineHeight"]:o==="button"||o==="a"&&t.getAttribute("role")==="button"?i=["backgroundColor","color","padding","borderRadius","fontSize"]:Il.has(o)?i=["backgroundColor","color","padding","borderRadius","fontSize"]:Ll.has(o)?i=["width","height","objectFit","borderRadius"]:El.has(o)?i=["display","padding","margin","gap","backgroundColor"]:i=["color","fontSize","margin","padding","backgroundColor"];for(const r of i){const d=r.replace(/([A-Z])/g,"-$1").toLowerCase(),g=n.getPropertyValue(d);g&&!Rr.has(g)&&(s[r]=g)}return s}var Rl=["color","backgroundColor","borderColor","fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","textAlign","width","height","padding","margin","border","borderRadius","display","position","top","right","bottom","left","zIndex","flexDirection","justifyContent","alignItems","gap","opacity","visibility","overflow","boxShadow","transform"];function ms(t){if(typeof window>"u")return"";const n=window.getComputedStyle(t),s=[];for(const o of Rl){const i=o.replace(/([A-Z])/g,"-$1").toLowerCase(),r=n.getPropertyValue(i);r&&!Rr.has(r)&&s.push(`${i}: ${r}`)}return s.join("; ")}function Bl(t){if(!t)return;const n={},s=t.split(";").map(o=>o.trim()).filter(Boolean);for(const o of s){const i=o.indexOf(":");if(i>0){const r=o.slice(0,i).trim(),d=o.slice(i+1).trim();r&&d&&(n[r]=d)}}return Object.keys(n).length>0?n:void 0}function ps(t){const n=[],s=t.getAttribute("role"),o=t.getAttribute("aria-label"),i=t.getAttribute("aria-describedby"),r=t.getAttribute("tabindex"),d=t.getAttribute("aria-hidden");return s&&n.push(`role="${s}"`),o&&n.push(`aria-label="${o}"`),i&&n.push(`aria-describedby="${i}"`),r&&n.push(`tabindex=${r}`),d==="true"&&n.push("aria-hidden"),t.matches("a, button, input, select, textarea, [tabindex]")&&n.push("focusable"),n.join(", ")}function gs(t){const n=[];let s=t;for(;s&&s.tagName.toLowerCase()!=="html";){const o=s.tagName.toLowerCase();let i=o;if(s.id)i=`${o}#${s.id}`;else if(s.className&&typeof s.className=="string"){const d=s.className.split(/\s+/).map(g=>g.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(g=>g.length>2);d&&(i=`${o}.${d}`)}const r=Rn(s);!s.parentElement&&r&&(i=`⟨shadow⟩ ${i}`),n.unshift(i),s=r}return n.join(" > ")}var Pl=new Set(["nav","header","main","section","article","footer","aside"]),oo={banner:"Header",navigation:"Navigation",main:"Main Content",contentinfo:"Footer",complementary:"Sidebar",region:"Section"},tr={nav:"Navigation",header:"Header",main:"Main Content",section:"Section",article:"Article",footer:"Footer",aside:"Sidebar"},Dl=new Set(["script","style","noscript","link","meta"]),Tl=40;function Br(t){let n=t;for(;n&&n!==document.body&&n!==document.documentElement;){const s=window.getComputedStyle(n).position;if(s==="fixed"||s==="sticky")return!0;n=n.parentElement}return!1}function xn(t){const n=t.tagName.toLowerCase();if(["nav","header","footer","main"].includes(n)&&document.querySelectorAll(n).length===1)return n;if(t.id)return`#${CSS.escape(t.id)}`;if(t.className&&typeof t.className=="string"){const i=t.className.split(/\s+/).filter(r=>r.length>0).find(r=>r.length>2&&!/^[a-zA-Z0-9]{6,}$/.test(r)&&!/^[a-z]{1,2}$/.test(r));if(i){const r=`${n}.${CSS.escape(i)}`;if(document.querySelectorAll(r).length===1)return r}}const s=t.parentElement;if(s){const i=Array.from(s.children).indexOf(t)+1;return`${s===document.body?"body":xn(s)} > ${n}:nth-child(${i})`}return n}function Cs(t){var d;const n=t.tagName.toLowerCase(),s=t.getAttribute("aria-label");if(s)return s;const o=t.getAttribute("role");if(o&&oo[o])return oo[o];if(tr[n])return tr[n];const i=t.querySelector("h1, h2, h3, h4, h5, h6");if(i){const g=(d=i.textContent)==null?void 0:d.trim();if(g&&g.length<=50)return g;if(g)return g.slice(0,47)+"..."}const{name:r}=En(t);return r.charAt(0).toUpperCase()+r.slice(1)}function Pr(t){const n=t.className;return typeof n!="string"||!n?null:n.split(/\s+/).map(o=>o.replace(/[_][a-zA-Z0-9]{5,}.*$/,"")).find(o=>o.length>2&&!/^[a-z]{1,2}$/.test(o))||null}function Dr(t){var o;const n=(o=t.textContent)==null?void 0:o.trim();if(!n)return null;const s=n.replace(/\s+/g," ");return s.length<=30?s:s.slice(0,30)+"…"}function Al(){const t=document.querySelector("main")||document.body,n=Array.from(t.children);let s=n;t!==document.body&&n.length<3&&(s=Array.from(document.body.children));const o=[];return s.forEach((i,r)=>{if(!(i instanceof HTMLElement))return;const d=i.tagName.toLowerCase();if(Dl.has(d)||i.hasAttribute("data-feedback-toolbar")||i.closest("[data-feedback-toolbar]"))return;const g=window.getComputedStyle(i);if(g.display==="none"||g.visibility==="hidden")return;const m=i.getBoundingClientRect();if(m.height<Tl)return;const $=Pl.has(d),x=i.getAttribute("role")&&oo[i.getAttribute("role")],y=d==="div"&&m.height>=60;if(!$&&!x&&!y)return;const w=window.scrollY,R=Br(i),k={x:m.x,y:R?m.y:m.y+w,width:m.width,height:m.height};o.push({id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Cs(i),tagName:d,selector:xn(i),role:i.getAttribute("role"),className:Pr(i),textSnippet:Dr(i),originalRect:k,currentRect:{...k},originalIndex:r,isFixed:R})}),o}function zl(t){const n=window.scrollY,s=t.getBoundingClientRect(),o=Br(t),i={x:s.x,y:o?s.y:s.y+n,width:s.width,height:s.height},r=t.parentElement;let d=0;return r&&(d=Array.from(r.children).indexOf(t)),{id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Cs(t),tagName:t.tagName.toLowerCase(),selector:xn(t),role:t.getAttribute("role"),className:Pr(t),textSnippet:Dr(t),originalRect:i,currentRect:{...i},originalIndex:d,isFixed:o}}var nr={bg:"rgba(59, 130, 246, 0.08)",border:"rgba(59, 130, 246, 0.5)",pill:"#3b82f6"},sr=["nw","n","ne","e","se","s","sw","w"],xs=24,or=16,fs=5;function rr(t,n,s,o){let i=1/0,r=1/0;const d=t.x,g=t.x+t.width,m=t.x+t.width/2,$=t.y,x=t.y+t.height,y=t.y+t.height/2,w=[];for(const z of n)s.has(z.id)||w.push(z.currentRect);o&&w.push(...o);for(const z of w){const je=z.x,Le=z.x+z.width,be=z.x+z.width/2,ue=z.y,Fe=z.y+z.height,Xe=z.y+z.height/2;for(const ge of[d,g,m])for(const $e of[je,Le,be]){const J=$e-ge;Math.abs(J)<fs&&Math.abs(J)<Math.abs(i)&&(i=J)}for(const ge of[$,x,y])for(const $e of[ue,Fe,Xe]){const J=$e-ge;Math.abs(J)<fs&&Math.abs(J)<Math.abs(r)&&(r=J)}}const R=Math.abs(i)<fs?i:0,k=Math.abs(r)<fs?r:0,B=[],U=new Set,A=d+R,pe=g+R,Te=m+R,I=$+k,ne=x+k,me=y+k;for(const z of w){const je=z.x,Le=z.x+z.width,be=z.x+z.width/2,ue=z.y,Fe=z.y+z.height,Xe=z.y+z.height/2;for(const ge of[je,be,Le])for(const $e of[A,Te,pe])if(Math.abs($e-ge)<.5){const J=`x:${Math.round(ge)}`;U.has(J)||(U.add(J),B.push({axis:"x",pos:ge}))}for(const ge of[ue,Xe,Fe])for(const $e of[I,me,ne])if(Math.abs($e-ge)<.5){const J=`y:${Math.round(ge)}`;U.has(J)||(U.add(J),B.push({axis:"y",pos:ge}))}}return{dx:R,dy:k,guides:B}}var Wl=new Set(["script","style","noscript","link","meta","br","hr"]);function ir(t){let n=t;for(;n&&n!==document.body&&n!==document.documentElement;){if(n.closest("[data-feedback-toolbar]"))return null;if(Wl.has(n.tagName.toLowerCase())){n=n.parentElement;continue}const s=n.getBoundingClientRect();if(s.width>=or&&s.height>=or)return n;n=n.parentElement}return null}function Ol({rearrangeState:t,onChange:n,isDarkMode:s,exiting:o,className:i,blankCanvas:r,extraSnapRects:d,onSelectionChange:g,deselectSignal:m,onDragMove:$,onDragEnd:x,clearSignal:y}){const{sections:w}=t,R=l.useRef(t);R.current=t;const[k,B]=l.useState(new Set),[U,A]=l.useState(!1),pe=l.useRef(y);l.useEffect(()=>{y!==void 0&&y!==pe.current&&(pe.current=y,w.length>0&&A(!0))},[y,w.length]);const Te=l.useRef(m);l.useEffect(()=>{m!==Te.current&&(Te.current=m,B(new Set))},[m]);const[I,ne]=l.useState(null),[me,z]=l.useState(!1),je=l.useRef(!1),Le=l.useCallback(f=>{const b=w.find(N=>N.id===f);b&&(je.current=!!b.note,ne(f),z(!1))},[w]),be=l.useCallback(()=>{I&&(z(!0),re(()=>{ne(null),z(!1)},150))},[I]),ue=l.useCallback(f=>{I&&(n({...t,sections:w.map(b=>b.id===I?{...b,note:f.trim()||void 0}:b)}),be())},[I,w,t,n,be]);l.useEffect(()=>{o&&I&&be()},[o]);const[Fe,Xe]=l.useState(new Set),ge=l.useRef(new Map),[$e,J]=l.useState(null),[it,T]=l.useState(null),[he,Ae]=l.useState([]),[Je,ft]=l.useState(0),gt=l.useRef(null),Gt=l.useRef(new Set),It=l.useRef(new Map),[Kt,Pt]=l.useState(new Map),[Ut,Jt]=l.useState(new Map),Zt=l.useRef(new Set),Nt=l.useRef(new Map),Ze=l.useRef(g);Ze.current=g;const yt=l.useRef($);yt.current=$;const xt=l.useRef(x);xt.current=x,l.useEffect(()=>{r&&B(new Set)},[r]);const[en,Vt]=l.useState(()=>!t.sections.some(f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1||Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1}));l.useEffect(()=>{if(!en){const f=re(()=>Vt(!0),380);return()=>clearTimeout(f)}},[]);const tn=l.useRef(new Set);l.useEffect(()=>{tn.current=new Set(w.map(f=>f.selector))},[w]),l.useEffect(()=>{const f=()=>ft(window.scrollY);return f(),window.addEventListener("scroll",f,{passive:!0}),window.addEventListener("resize",f,{passive:!0}),()=>{window.removeEventListener("scroll",f),window.removeEventListener("resize",f)}},[]),l.useEffect(()=>{const f=b=>{if(gt.current){J(null);return}const N=document.elementFromPoint(b.clientX,b.clientY);if(!N){J(null);return}if(N.closest("[data-feedback-toolbar]")){J(null);return}if(N.closest("[data-design-placement]")){J(null);return}if(N.closest("[data-annotation-popup]")){J(null);return}const L=ir(N);if(!L){J(null);return}for(const q of tn.current)try{const D=document.querySelector(q);if(D&&(D===L||L.contains(D))){J(null);return}}catch{}const K=L.getBoundingClientRect();J({x:K.x,y:K.y,w:K.width,h:K.height})};return document.addEventListener("mousemove",f,{passive:!0}),()=>document.removeEventListener("mousemove",f)},[w]),l.useEffect(()=>{const f=document.body.style.userSelect;return document.body.style.userSelect="none",()=>{document.body.style.userSelect=f}},[]),l.useEffect(()=>{const f=b=>{var D,Me,fe,Be;if(gt.current||b.button!==0)return;const N=b.target;if(!N||N.closest("[data-feedback-toolbar]")||N.closest("[data-design-placement]")||N.closest("[data-annotation-popup]"))return;const L=ir(N);let K=!1;if(L)for(const ie of tn.current)try{const V=document.querySelector(ie);if(V&&(V===L||L.contains(V))){K=!0;break}}catch{}const q=!!(b.shiftKey||b.metaKey||b.ctrlKey);if(L&&!K){b.preventDefault(),b.stopPropagation();const ie=zl(L),V=[...w,ie],Pe=[...t.originalOrder,ie.id];n({...t,sections:V,originalOrder:Pe});const He=new Set([ie.id]);B(He),(D=Ze.current)==null||D.call(Ze,He,q),J(null);const at=b.clientX,Y=b.clientY,De={x:ie.currentRect.x,y:ie.currentRect.y};ie.originalRect;let Ce=!1,ve=0,lt=0;gt.current="move";const se=ut=>{var Lt;const vt=ut.clientX-at,bt=ut.clientY-Y;if(!Ce&&(Math.abs(vt)>2||Math.abs(bt)>2)&&(Ce=!0),!Ce)return;const fn={x:De.x+vt,y:De.y+bt,width:ie.currentRect.width,height:ie.currentRect.height},Qt=rr(fn,V,new Set([ie.id]),d);Ae(Qt.guides);const Mt=vt+Qt.dx,nt=bt+Qt.dy;ve=Mt,lt=nt;const Dt=document.querySelector(`[data-rearrange-section="${ie.id}"]`);Dt&&(Dt.style.transform=`translate(${Mt}px, ${nt}px)`),Pt(new Map([[ie.id,{x:De.x+Mt,y:De.y+nt,width:ie.currentRect.width,height:ie.currentRect.height}]])),(Lt=yt.current)==null||Lt.call(yt,Mt,nt)},We=()=>{var vt;window.removeEventListener("mousemove",se),window.removeEventListener("mouseup",We),gt.current=null,Ae([]),Pt(new Map);const ut=document.querySelector(`[data-rearrange-section="${ie.id}"]`);ut&&(ut.style.transform=""),Ce&&n({...t,sections:V.map(bt=>bt.id===ie.id?{...bt,currentRect:{...bt.currentRect,x:Math.max(0,De.x+ve),y:Math.max(0,De.y+lt)}}:bt),originalOrder:Pe}),(vt=xt.current)==null||vt.call(xt,ve,lt,Ce)};window.addEventListener("mousemove",se),window.addEventListener("mouseup",We)}else if(K&&L){b.preventDefault();for(const ie of w)try{const V=document.querySelector(ie.selector);if(V&&V===L){const Pe=new Set([ie.id]);B(Pe),(Me=Ze.current)==null||Me.call(Ze,Pe,q);return}}catch{}q||(B(new Set),(fe=Ze.current)==null||fe.call(Ze,new Set,!1))}else q||(B(new Set),(Be=Ze.current)==null||Be.call(Ze,new Set,!1))};return document.addEventListener("mousedown",f,!0),()=>document.removeEventListener("mousedown",f,!0)},[w,t,n]),l.useEffect(()=>{const f=b=>{const N=b.target;if(!(N.tagName==="INPUT"||N.tagName==="TEXTAREA"||N.isContentEditable)){if((b.key==="Backspace"||b.key==="Delete")&&k.size>0){b.preventDefault();const L=new Set(k);Xe(K=>{const q=new Set(K);for(const D of L)q.add(D);return q}),B(new Set),re(()=>{const K=R.current;n({...K,sections:K.sections.filter(q=>!L.has(q.id)),originalOrder:K.originalOrder.filter(q=>!L.has(q))}),Xe(q=>{const D=new Set(q);for(const Me of L)D.delete(Me);return D})},180);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(b.key)&&k.size>0){b.preventDefault();const L=b.shiftKey?20:1,K=b.key==="ArrowLeft"?-L:b.key==="ArrowRight"?L:0,q=b.key==="ArrowUp"?-L:b.key==="ArrowDown"?L:0;n({...t,sections:w.map(D=>k.has(D.id)?{...D,currentRect:{...D.currentRect,x:Math.max(0,D.currentRect.x+K),y:Math.max(0,D.currentRect.y+q)}}:D)});return}b.key==="Escape"&&k.size>0&&B(new Set)}};return document.addEventListener("keydown",f),()=>document.removeEventListener("keydown",f)},[k,w,t,n]);const S=l.useCallback((f,b)=>{var at;if(f.button!==0)return;const N=f.target;if(N.closest(`.${C.handle}`)||N.closest(`.${C.deleteButton}`))return;f.preventDefault(),f.stopPropagation();let L;f.shiftKey||f.metaKey||f.ctrlKey?(L=new Set(k),L.has(b)?L.delete(b):L.add(b)):k.has(b)?L=new Set(k):L=new Set([b]),B(L),(L.size!==k.size||[...L].some(Y=>!k.has(Y)))&&((at=Ze.current)==null||at.call(Ze,L,!!(f.shiftKey||f.metaKey||f.ctrlKey)));const q=f.clientX,D=f.clientY,Me=new Map;for(const Y of w)L.has(Y.id)&&Me.set(Y.id,{x:Y.currentRect.x,y:Y.currentRect.y});gt.current="move";let fe=!1,Be=0,ie=0;const V=new Map;for(const Y of w)if(L.has(Y.id)){const De=document.querySelector(`[data-rearrange-section="${Y.id}"]`);V.set(Y.id,{outlineEl:De,curW:Y.currentRect.width,curH:Y.currentRect.height})}const Pe=Y=>{var Qt;const De=Y.clientX-q,Ce=Y.clientY-D;if(De===0&&Ce===0)return;fe=!0;let ve=1/0,lt=1/0,se=-1/0,We=-1/0;for(const[Mt,{curW:nt,curH:Dt}]of V){const Lt=Me.get(Mt);if(!Lt)continue;const yn=Lt.x+De,F=Lt.y+Ce;ve=Math.min(ve,yn),lt=Math.min(lt,F),se=Math.max(se,yn+nt),We=Math.max(We,F+Dt)}const ut=rr({x:ve,y:lt,width:se-ve,height:We-lt},w,L,d),vt=De+ut.dx,bt=Ce+ut.dy;Be=vt,ie=bt,Ae(ut.guides);for(const[,{outlineEl:Mt}]of V)Mt&&(Mt.style.transform=`translate(${vt}px, ${bt}px)`);const fn=new Map;for(const[Mt,{curW:nt,curH:Dt}]of V){const Lt=Me.get(Mt);if(Lt){const yn={x:Math.max(0,Lt.x+vt),y:Math.max(0,Lt.y+bt),width:nt,height:Dt};fn.set(Mt,yn)}}Pt(fn),(Qt=yt.current)==null||Qt.call(yt,vt,bt)},He=Y=>{var De,Ce;window.removeEventListener("mousemove",Pe),window.removeEventListener("mouseup",He),gt.current=null,Ae([]),Pt(new Map);for(const[,{outlineEl:ve}]of V)ve&&(ve.style.transform="");if(fe){const ve=Y.clientX-q,lt=Y.clientY-D;if(Math.abs(ve)<5&&Math.abs(lt)<5)n({...t,sections:w.map(se=>{const We=Me.get(se.id);return We?{...se,currentRect:{...se.currentRect,x:We.x,y:We.y}}:se})});else{n({...t,sections:w.map(se=>{const We=Me.get(se.id);return We?{...se,currentRect:{...se.currentRect,x:Math.max(0,We.x+Be),y:Math.max(0,We.y+ie)}}:se})}),(De=xt.current)==null||De.call(xt,Be,ie,!0);return}}(Ce=xt.current)==null||Ce.call(xt,0,0,!1)};window.addEventListener("mousemove",Pe),window.addEventListener("mouseup",He)},[k,w,t,n]),Z=l.useCallback((f,b,N)=>{f.preventDefault(),f.stopPropagation();const L=w.find(Pe=>Pe.id===b);if(!L)return;B(new Set([b])),gt.current="resize";const K=f.clientX,q=f.clientY,D={...L.currentRect};L.originalRect;const Me=D.width/D.height;let fe={...D};const Be=document.querySelector(`[data-rearrange-section="${b}"]`),ie=Pe=>{const He=Pe.clientX-K,at=Pe.clientY-q;let Y=D.x,De=D.y,Ce=D.width,ve=D.height;if(N.includes("e")&&(Ce=Math.max(xs,D.width+He)),N.includes("w")&&(Ce=Math.max(xs,D.width-He),Y=D.x+D.width-Ce),N.includes("s")&&(ve=Math.max(xs,D.height+at)),N.includes("n")&&(ve=Math.max(xs,D.height-at),De=D.y+D.height-ve),Pe.shiftKey)if(N.length===2){const se=Math.abs(Ce-D.width),We=Math.abs(ve-D.height);se>We?ve=Ce/Me:Ce=ve*Me,N.includes("w")&&(Y=D.x+D.width-Ce),N.includes("n")&&(De=D.y+D.height-ve)}else N==="e"||N==="w"?ve=Ce/Me:Ce=ve*Me,N==="w"&&(Y=D.x+D.width-Ce),N==="n"&&(De=D.y+D.height-ve);fe={x:Y,y:De,width:Ce,height:ve},Be&&(Be.style.left=`${Y}px`,Be.style.top=`${De-Je}px`,Be.style.width=`${Ce}px`,Be.style.height=`${ve}px`),T({x:Pe.clientX+12,y:Pe.clientY+12,text:`${Math.round(Ce)} × ${Math.round(ve)}`}),Pt(new Map([[b,fe]]))},V=()=>{window.removeEventListener("mousemove",ie),window.removeEventListener("mouseup",V),T(null),gt.current=null,Pt(new Map),n({...t,sections:w.map(Pe=>Pe.id===b?{...Pe,currentRect:fe}:Pe)})};window.addEventListener("mousemove",ie),window.addEventListener("mouseup",V)},[w,t,n,Je]),xe=l.useCallback(f=>{Xe(b=>{const N=new Set(b);return N.add(f),N}),B(b=>{const N=new Set(b);return N.delete(f),N}),re(()=>{const b=R.current;n({...b,sections:b.sections.filter(N=>N.id!==f),originalOrder:b.originalOrder.filter(N=>N!==f)}),Xe(N=>{const L=new Set(N);return L.delete(f),L})},180)},[n]),le=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1||Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1},Ee=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.x-N.x)>1||Math.abs(b.y-N.y)>1},ke=f=>{const b=f.originalRect,N=f.currentRect;return Math.abs(b.width-N.width)>1||Math.abs(b.height-N.height)>1};for(const f of w)It.current.has(f.id)||(Ee(f)?It.current.set(f.id,"move"):ke(f)&&It.current.set(f.id,"resize"));for(const f of It.current.keys())w.some(b=>b.id===f)||It.current.delete(f);const Re=w.filter(f=>{try{if(Fe.has(f.id)||k.has(f.id))return!0;const b=document.querySelector(f.selector);if(!b)return!1;const N=b.getBoundingClientRect(),L=f.originalRect;return Math.abs(N.width-L.width)+Math.abs(N.height-L.height)<200}catch{return!1}}),we=Re.filter(f=>le(f)),ze=Re.filter(f=>!le(f)),et=new Set(we.map(f=>f.id));for(const f of Gt.current)et.has(f)||Gt.current.delete(f);const ee=[...et].sort().join(",");for(const f of we)Nt.current.set(f.id,{currentRect:f.currentRect,originalRect:f.originalRect,isFixed:f.isFixed});return l.useEffect(()=>{const f=Zt.current;Zt.current=et;const b=new Map;for(const N of f)if(!et.has(N)){if(!w.some(K=>K.id===N))continue;const L=Nt.current.get(N);L&&(b.set(N,{orig:L.originalRect,target:L.currentRect,isFixed:L.isFixed}),Nt.current.delete(N))}if(b.size>0){Jt(L=>{const K=new Map(L);for(const[q,D]of b)K.set(q,D);return K});const N=re(()=>{Jt(L=>{const K=new Map(L);for(const q of b.keys())K.delete(q);return K})},250);return()=>clearTimeout(N)}},[ee,w]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`${C.rearrangeOverlay} ${s?"":C.light} ${o?C.overlayExiting:""}${i?` ${i}`:""}`,"data-feedback-toolbar":!0,children:[$e&&e.jsx("div",{className:C.hoverHighlight,style:{left:$e.x,top:$e.y,width:$e.w,height:$e.h}}),ze.map(f=>{const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=nr,K=k.has(f.id);return e.jsxs("div",{"data-rearrange-section":f.id,className:`${C.sectionOutline} ${K?C.selected:""} ${U||o||Fe.has(f.id)?C.exiting:""}`,style:{left:b.x,top:N,width:b.width,height:b.height,borderColor:L.border,backgroundColor:L.bg,...en?{}:{opacity:0,animation:"none",transition:"none"}},onMouseDown:q=>S(q,f.id),onDoubleClick:()=>Le(f.id),children:[e.jsx("span",{className:C.sectionLabel,style:{backgroundColor:L.pill},children:f.label}),e.jsx("span",{className:`${C.sectionAnnotation} ${f.note?C.annotationVisible:""}`,children:(f.note&&ge.current.set(f.id,f.note),f.note||ge.current.get(f.id)||"")}),e.jsxs("span",{className:C.sectionDimensions,children:[Math.round(b.width)," × ",Math.round(b.height)]}),e.jsx("div",{className:C.deleteButton,onMouseDown:q=>q.stopPropagation(),onClick:()=>xe(f.id),children:"✕"}),sr.map(q=>e.jsx("div",{className:`${C.handle} ${C[`handle${q.charAt(0).toUpperCase()}${q.slice(1)}`]}`,onMouseDown:D=>Z(D,f.id,q)},q))]},f.id)}),we.map(f=>{const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=k.has(f.id),K=Ee(f),q=ke(f);if(r&&!L)return null;const Me=!Gt.current.has(f.id);return Me&&Gt.current.add(f.id),e.jsxs("div",{"data-rearrange-section":f.id,className:`${C.ghostOutline} ${L?C.selected:""} ${U||o||Fe.has(f.id)?C.exiting:""}`,style:{left:b.x,top:N,width:b.width,height:b.height,...en?{}:{opacity:0,animation:"none",transition:"none"},...Me?{}:{animation:"none"}},onMouseDown:fe=>S(fe,f.id),onDoubleClick:()=>Le(f.id),children:[e.jsx("span",{className:C.sectionLabel,style:{backgroundColor:nr.pill},children:f.label}),e.jsx("span",{className:`${C.sectionAnnotation} ${f.note?C.annotationVisible:""}`,children:(f.note&&ge.current.set(f.id,f.note),f.note||ge.current.get(f.id)||"")}),e.jsxs("span",{className:C.sectionDimensions,children:[Math.round(b.width)," × ",Math.round(b.height)]}),e.jsx("div",{className:C.deleteButton,onMouseDown:fe=>fe.stopPropagation(),onClick:()=>xe(f.id),children:"✕"}),sr.map(fe=>e.jsx("div",{className:`${C.handle} ${C[`handle${fe.charAt(0).toUpperCase()}${fe.slice(1)}`]}`,onMouseDown:Be=>Z(Be,f.id,fe)},fe)),e.jsx("span",{className:C.ghostBadge,children:(()=>{const fe=It.current.get(f.id);if(K&&q){const[Be,ie]=fe==="resize"?["Resize","Move"]:["Move","Resize"];return e.jsxs(e.Fragment,{children:["Suggested ",Be," ",e.jsxs("span",{className:C.ghostBadgeExtra,children:["& ",ie]})]})}return`Suggested ${q?"Resize":"Move"}`})()})]},f.id)})]}),!r&&(()=>{const f=[];for(const b of we){const N=Kt.get(b.id);f.push({id:b.id,orig:b.originalRect,target:N||b.currentRect,isFixed:b.isFixed,isSelected:k.has(b.id),isExiting:Fe.has(b.id)})}for(const[b,N]of Kt)if(!f.some(L=>L.id===b)){const L=w.find(K=>K.id===b);L&&f.push({id:b,orig:L.originalRect,target:N,isFixed:L.isFixed,isSelected:k.has(b)})}for(const[b,N]of Ut)f.some(L=>L.id===b)||f.push({id:b,orig:N.orig,target:N.target,isFixed:N.isFixed,isSelected:!1,isExiting:!0});return f.length===0?null:e.jsxs("svg",{className:`${C.connectorSvg} ${U||o?C.connectorExiting:""}`,children:[f.map(({id:b,orig:N,target:L,isFixed:K,isSelected:q,isExiting:D})=>{const Me=N.x+N.width/2,fe=(K?N.y:N.y-Je)+N.height/2,Be=L.x+L.width/2,ie=(K?L.y:L.y-Je)+L.height/2,V=Be-Me,Pe=ie-fe,He=Math.sqrt(V*V+Pe*Pe);if(He<2)return null;const at=Math.min(1,He/40),Y=Math.min(He*.3,60),De=He>0?-Pe/He:0,Ce=He>0?V/He:0,ve=(Me+Be)/2+De*Y,lt=(fe+ie)/2+Ce*Y,se=Kt.has(b),We=se||q?1:.4,ut=se||q?1:.5;return e.jsxs("g",{className:D?C.connectorExiting:"",children:[e.jsx("path",{className:C.connectorLine,d:`M ${Me} ${fe} Q ${ve} ${lt} ${Be} ${ie}`,fill:"none",stroke:"rgba(59, 130, 246, 0.45)",strokeWidth:"1.5",opacity:We*at}),e.jsx("circle",{className:C.connectorDot,cx:Me,cy:fe,r:4*at,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:ut*at,filter:"url(#connDotShadow)"}),e.jsx("circle",{className:C.connectorDot,cx:Be,cy:ie,r:4*at,fill:"rgba(59, 130, 246, 0.8)",stroke:"#fff",strokeWidth:"1.5",opacity:ut*at,filter:"url(#connDotShadow)"})]},`conn-${b}`)}),e.jsx("defs",{children:e.jsx("filter",{id:"connDotShadow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:e.jsx("feDropShadow",{dx:"0",dy:"0.5",stdDeviation:"1",floodOpacity:"0.15"})})})]})})(),I&&(()=>{const f=w.find(ie=>ie.id===I);if(!f)return null;const b=f.currentRect,N=f.isFixed?b.y:b.y-Je,L=b.x+b.width/2,K=N-8,q=N+b.height+8,D=K>200,Me=q<window.innerHeight-100,fe=Math.max(160,Math.min(window.innerWidth-160,L));let Be;return D?Be={left:fe,bottom:window.innerHeight-K}:Me?Be={left:fe,top:q}:Be={left:fe,top:Math.max(80,window.innerHeight/2-80)},e.jsx(js,{element:f.label,placeholder:"Add a note about this section",initialValue:f.note??"",submitLabel:je.current?"Save":"Set",onSubmit:ue,onCancel:be,onDelete:je.current?()=>{ue("")}:void 0,isExiting:me,lightMode:!s,style:Be})})(),it&&e.jsx("div",{className:C.sizeIndicator,style:{left:it.x,top:it.y},"data-feedback-toolbar":!0,children:it.text}),he.map((f,b)=>e.jsx("div",{className:C.guideLine,style:f.axis==="x"?{position:"fixed",left:f.pos,top:0,width:1,height:"100vh"}:{position:"fixed",left:0,top:f.pos-Je,width:"100vw",height:1}},`${f.axis}-${f.pos}-${b}`))]})}var ro=new Set(["script","style","noscript","link","meta","br","hr"]);function Fl(){const t=document.querySelector("main")||document.body,n=[],s=Array.from(t.children),o=t!==document.body&&s.length<3?Array.from(document.body.children):s;for(const i of o){if(!(i instanceof HTMLElement)||ro.has(i.tagName.toLowerCase())||i.hasAttribute("data-feedback-toolbar"))continue;const r=window.getComputedStyle(i);if(r.display==="none"||r.visibility==="hidden")continue;const d=i.getBoundingClientRect();if(!(d.height<10||d.width<10)){n.push({label:Cs(i),selector:xn(i),top:d.top,bottom:d.bottom,left:d.left,right:d.right,area:d.width*d.height});for(const g of Array.from(i.children)){if(!(g instanceof HTMLElement)||ro.has(g.tagName.toLowerCase())||g.hasAttribute("data-feedback-toolbar"))continue;const m=window.getComputedStyle(g);if(m.display==="none"||m.visibility==="hidden")continue;const $=g.getBoundingClientRect();$.height<10||$.width<10||n.push({label:Cs(g),selector:xn(g),top:$.top,bottom:$.bottom,left:$.left,right:$.right,area:$.width*$.height})}}}return n}function Hl(t){const n=window.scrollY;return t.map(({label:s,selector:o,rect:i})=>{const r=i.y-n;return{label:s,selector:o,top:r,bottom:r+i.height,left:i.x,right:i.x+i.width,area:i.width*i.height}})}function Yl(t){const n=window.scrollY,s=t.y-n,o=t.x;return{top:s,bottom:s+t.height,left:o,right:o+t.width,area:t.width*t.height}}function io(t,n){const s=n?Hl(n):Fl(),o=Yl(t);let i=null,r=null,d=null,g=null,m=null;for(const k of s){if(Math.abs(k.left-o.left)<2&&Math.abs(k.top-o.top)<2&&Math.abs(k.right-k.left-t.width)<2&&Math.abs(k.bottom-k.top-t.height)<2)continue;k.left<=o.left+2&&k.right>=o.right-2&&k.top<=o.top+2&&k.bottom>=o.bottom-2&&k.area>o.area*1.5&&(!m||k.area<m._area)&&(m={label:k.label,selector:k.selector,_area:k.area});const B=o.right>k.left+5&&o.left<k.right-5,U=o.bottom>k.top+5&&o.top<k.bottom-5;if(B&&k.bottom<=o.top+5){const A=Math.round(o.top-k.bottom);(!i||A<i._dist)&&(i={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(B&&k.top>=o.bottom-5){const A=Math.round(k.top-o.bottom);(!r||A<r._dist)&&(r={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(U&&k.right<=o.left+5){const A=Math.round(o.left-k.right);(!d||A<d._dist)&&(d={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}if(U&&k.left>=o.right-5){const A=Math.round(k.left-o.right);(!g||A<g._dist)&&(g={label:k.label,selector:k.selector,gap:Math.max(0,A),_dist:A})}}const $=window.innerWidth,x=window.innerHeight,y=Ul(t,$),w=k=>k?{label:k.label,selector:k.selector,gap:k.gap}:null,R=Xl(o,t,$,x,m?{label:m.label,selector:m.selector,_area:m._area}:null,s);return{above:w(i),below:w(r),left:w(d),right:w(g),alignment:y,containedIn:m?{label:m.label,selector:m.selector}:null,outOfBounds:R}}function Xl(t,n,s,o,i,r){const d={};let g=!1;const m=[];if(t.left<-2&&m.push("left"),t.right>s+2&&m.push("right"),t.top<-2&&m.push("top"),t.bottom>o+2&&m.push("bottom"),m.length>0&&(d.viewport=m,g=!0),i){const $=r.find(x=>x.label===i.label&&x.selector===i.selector&&Math.abs(x.area-i._area)<10);if($){const x=[];t.left<$.left-2&&x.push("left"),t.right>$.right+2&&x.push("right"),t.top<$.top-2&&x.push("top"),t.bottom>$.bottom+2&&x.push("bottom"),x.length>0&&(d.container={label:i.label,edges:x},g=!0)}}return g?d:null}function Ul(t,n){if(t.width/n>.85)return"full-width";const o=t.x+t.width/2,i=n/2,r=o-i,d=n*.08;return Math.abs(r)<d?"center":r<0?"left":"right"}function Tr(t){switch(t){case"full-width":return"full-width";case"center":return"centered";case"left":return"left-aligned";case"right":return"right-aligned"}}function Ar(t,n={}){const s=[];t.above&&s.push(`Below \`${t.above.label}\`${t.above.gap>0?` (${t.above.gap}px gap)`:""}`),t.below&&s.push(`Above \`${t.below.label}\`${t.below.gap>0?` (${t.below.gap}px gap)`:""}`),n.includeLeftRight&&(t.left&&s.push(`Right of \`${t.left.label}\`${t.left.gap>0?` (${t.left.gap}px gap)`:""}`),t.right&&s.push(`Left of \`${t.right.label}\`${t.right.gap>0?` (${t.right.gap}px gap)`:""}`));const o=Tr(t.alignment);return t.containedIn?s.push(`${o.charAt(0).toUpperCase()+o.slice(1)} in \`${t.containedIn.label}\``):s.push(`${o.charAt(0).toUpperCase()+o.slice(1)} in page`),n.includePixelRef&&n.pixelRef&&s.push(`Pixel ref: \`${n.pixelRef}\``),t.outOfBounds&&(t.outOfBounds.viewport&&s.push(`**Outside viewport** (${t.outOfBounds.viewport.join(", ")} edge${t.outOfBounds.viewport.length>1?"s":""})`),t.outOfBounds.container&&s.push(`**Outside \`${t.outOfBounds.container.label}\`** (${t.outOfBounds.container.edges.join(", ")} edge${t.outOfBounds.container.edges.length>1?"s":""})`)),s}function Vl(t,n,s){var r,d;const o=[];t.above&&o.push(`below \`${t.above.label}\``),t.below&&o.push(`above \`${t.below.label}\``),t.left&&o.push(`right of \`${t.left.label}\``),t.right&&o.push(`left of \`${t.right.label}\``),t.containedIn&&o.push(`inside \`${t.containedIn.label}\``),o.push(Tr(t.alignment)),(r=t.outOfBounds)!=null&&r.viewport&&o.push(`**outside viewport** (${t.outOfBounds.viewport.join(", ")})`),(d=t.outOfBounds)!=null&&d.container&&o.push(`**outside \`${t.outOfBounds.container.label}\`** (${t.outOfBounds.container.edges.join(", ")})`);const i=s?`, ${Math.round(s.width)}×${Math.round(s.height)}px`:"";return`at (${Math.round(n.x)}, ${Math.round(n.y)})${i}: ${o.join(", ")}`}var ar=15;function lr(t){if(t.length<2)return[];const n=[],s=new Set;for(let o=0;o<t.length;o++){if(s.has(o))continue;const i=[o];for(let r=o+1;r<t.length;r++)s.has(r)||Math.abs(t[o].rect.y-t[r].rect.y)<ar&&i.push(r);if(i.length>=2){const r=i.map(m=>t[m]);r.sort((m,$)=>m.rect.x-$.rect.x);const d=[];for(let m=0;m<r.length-1;m++)d.push(Math.round(r[m+1].rect.x-(r[m].rect.x+r[m].rect.width)));const g=Math.round(r.reduce((m,$)=>m+$.rect.y,0)/r.length);n.push({labels:r.map(m=>m.label),type:"row",sharedEdge:g,gaps:d,avgGap:d.length?Math.round(d.reduce((m,$)=>m+$,0)/d.length):0}),i.forEach(m=>s.add(m))}}for(let o=0;o<t.length;o++){if(s.has(o))continue;const i=[o];for(let r=o+1;r<t.length;r++)s.has(r)||Math.abs(t[o].rect.x-t[r].rect.x)<ar&&i.push(r);if(i.length>=2){const r=i.map(m=>t[m]);r.sort((m,$)=>m.rect.y-$.rect.y);const d=[];for(let m=0;m<r.length-1;m++)d.push(Math.round(r[m+1].rect.y-(r[m].rect.y+r[m].rect.height)));const g=Math.round(r.reduce((m,$)=>m+$.rect.x,0)/r.length);n.push({labels:r.map(m=>m.label),type:"column",sharedEdge:g,gaps:d,avgGap:d.length?Math.round(d.reduce((m,$)=>m+$,0)/d.length):0}),i.forEach(m=>s.add(m))}}return n}function Ql(t){if(t.length<2)return[];const n=lr(t.map(d=>({label:d.label,rect:d.originalRect}))),s=lr(t.map(d=>({label:d.label,rect:d.currentRect}))),o=[],i=new Set;for(const d of n){const g=new Set(d.labels);let m=null,$=0;for(const x of s){const y=x.labels.filter(w=>g.has(w)).length;y>=2&&y>$&&(m=x,$=y)}if(m){const x=m.labels.filter(w=>g.has(w)),y=x.join(", ");if(m.type!==d.type){const w=d.type==="row"?"y":"x",R=m.type==="row"?"y":"x";o.push(`**${y}**: ${d.type} (${w}≈${d.sharedEdge}, ${d.avgGap}px gaps) → ${m.type} (${R}≈${m.sharedEdge}, ${m.avgGap}px gaps)`)}else if(Math.abs(d.sharedEdge-m.sharedEdge)>20||Math.abs(d.avgGap-m.avgGap)>5){const w=d.type==="row"?"y":"x",R=Math.abs(d.sharedEdge-m.sharedEdge)>20?` ${w}: ${d.sharedEdge} → ${m.sharedEdge}`:"",k=Math.abs(d.avgGap-m.avgGap)>5?` gaps: ${d.avgGap}px → ${m.avgGap}px`:"";o.push(`**${y}**: ${d.type} shifted —${R}${k}`)}x.forEach(w=>i.add(w))}else{const x=d.labels.join(", "),y=d.type==="row"?"y":"x";o.push(`**${x}**: ${d.type} (${y}≈${d.sharedEdge}) dissolved`),d.labels.forEach(w=>i.add(w))}}for(const d of s){if(d.labels.every($=>i.has($))||d.labels.filter($=>!i.has($)).length<2)continue;if(!n.some($=>$.labels.filter(y=>d.labels.includes(y)).length>=2)){const $=d.type==="row"?"y":"x";o.push(`**${d.labels.join(", ")}**: new ${d.type} (${$}≈${d.sharedEdge}, ${d.avgGap}px gaps)`),d.labels.forEach(x=>i.add(x))}}const r=t.filter(d=>!i.has(d.label));if(r.length>=2){const d={};for(const g of r){const m=Math.round(g.currentRect.x/5)*5;(d[m]??(d[m]=[])).push(g.label)}for(const[g,m]of Object.entries(d))m.length>=2&&o.push(`**${m.join(", ")}**: shared left edge at x≈${g}`)}return o}function zr(t){if(typeof document>"u")return{viewport:t,contentArea:null};const n=[],s=new Set,o=g=>{s.has(g)||g instanceof HTMLElement&&(g.hasAttribute("data-feedback-toolbar")||ro.has(g.tagName.toLowerCase())||(s.add(g),n.push(g)))},i=document.querySelector("main");i&&o(i);const r=document.querySelector("[role='main']");r&&o(r);for(const g of Array.from(document.body.children))if(o(g),g.children){for(const m of Array.from(g.children))if(o(m),m.children)for(const $ of Array.from(m.children))o($)}let d=null;for(const g of n){const m=g.getBoundingClientRect();if(m.height<50)continue;const $=getComputedStyle(g);if($.maxWidth&&$.maxWidth!=="none"&&$.maxWidth!=="0px"){(!d||m.width<d.rect.width)&&(d={el:g,rect:m});continue}!d&&m.width<t.width-20&&m.width>100&&(d={el:g,rect:m})}if(d){const{el:g,rect:m}=d;return{viewport:t,contentArea:{width:Math.round(m.width),left:Math.round(m.left),right:Math.round(m.right),centerX:Math.round(m.left+m.width/2),selector:xn(g)}}}return{viewport:t,contentArea:null}}function ql(t){if(typeof document>"u")return null;const n=document.querySelector(t);if(!(n!=null&&n.parentElement))return null;const s=getComputedStyle(n.parentElement),o={parentDisplay:s.display,parentSelector:xn(n.parentElement)};return s.display.includes("flex")&&(o.flexDirection=s.flexDirection),s.display.includes("grid")&&s.gridTemplateColumns!=="none"&&(o.gridCols=s.gridTemplateColumns),s.gap&&s.gap!=="normal"&&s.gap!=="0px"&&(o.gap=s.gap),o}function Wr(t,n){const s=n.contentArea,o=s?s.width:n.viewport.width,i=s?s.left:0,r=s?s.centerX:Math.round(n.viewport.width/2),d=Math.round(t.x-i),g=Math.round(i+o-(t.x+t.width)),m=(t.width/o*100).toFixed(1),$=t.x+t.width/2,x=Math.abs($-r)<20,y=t.width/o>.95,w=[];return y?w.push("`width: 100%` of container"):w.push(`left \`${d}px\` in container, right \`${g}px\`, width \`${m}%\` (\`${Math.round(t.width)}px\`)`),x&&!y&&w.push("centered — `margin-inline: auto`"),w.join(" — ")}function Or(t){const{viewport:n,contentArea:s}=t;let o=`### Reference Frame
`;if(o+=`- Viewport: \`${n.width}×${n.height}px\`
`,s){const i=s;o+=`- Content area: \`${i.width}px\` wide, left edge at \`x=${i.left}\`, right at \`x=${i.right}\` (\`${i.selector}\`)
`,o+=`- Pixel → CSS translation:
`,o+=`  - **Horizontal position in container**: \`element.x - ${i.left}\` → use as \`margin-left\` or \`left\`
`,o+=`  - **Width as % of container**: \`element.width / ${i.width} × 100\` → use as \`width: X%\`
`,o+="  - **Vertical gap between elements**: `nextElement.y - (prevElement.y + prevElement.height)` → use as `margin-top` or `gap`\n",o+=`  - **Centered**: if \`|element.centerX - ${i.centerX}| < 20px\` → use \`margin-inline: auto\`
`}else o+=`- No distinct content container — elements positioned relative to full viewport
`,o+=`- Pixel → CSS translation:
`,o+=`  - **Width as % of viewport**: \`element.width / ${n.width} × 100\` → use as \`width: X%\`
`,o+=`  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(n.width/2)}| < 20px\` → use \`margin-inline: auto\`
`;return o+=`
`,o}function Gl(t){const n=ql(t);if(!n)return null;let s=`\`${n.parentDisplay}\``;return n.flexDirection&&(s+=`, flex-direction: \`${n.flexDirection}\``),n.gridCols&&(s+=`, grid-template-columns: \`${n.gridCols}\``),n.gap&&(s+=`, gap: \`${n.gap}\``),`Parent: ${s} (\`${n.parentSelector}\`)`}function cr(t,n,s,o="standard"){var U,A,pe,Te;if(t.length===0)return"";const i=[...t].sort((I,ne)=>Math.abs(I.y-ne.y)<20?I.x-ne.x:I.y-ne.y);let r="";if(s!=null&&s.blankCanvas?(r+=`## Wireframe: New Page

`,s.wireframePurpose&&(r+=`> **Purpose:** ${s.wireframePurpose}
>
`),r+=`> ${t.length} component${t.length!==1?"s":""} placed — this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`):r+=`## Design Layout

> ${t.length} component${t.length!==1?"s":""} placed

`,o==="compact")return r+=`### Components
`,i.forEach((I,ne)=>{var z;const me=((z=Wt[I.type])==null?void 0:z.label)||I.type;r+=`${ne+1}. **${me}** — \`${Math.round(I.width)}×${Math.round(I.height)}px\` at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`}),r;const d=zr(n);r+=Or(d),r+=`### Components
`,i.forEach((I,ne)=>{var Fe;const me=((Fe=Wt[I.type])==null?void 0:Fe.label)||I.type,z={x:I.x,y:I.y,width:I.width,height:I.height};r+=`${ne+1}. **${me}** — \`${Math.round(I.width)}×${Math.round(I.height)}px\` at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`;const je=io(z),be=Ar(je,{includeLeftRight:o==="detailed"||o==="forensic"});for(const Xe of be)r+=`   - ${Xe}
`;const ue=Wr(z,d);ue&&(r+=`   - CSS: ${ue}
`)}),r+=`
### Layout Analysis
`;const g=[];for(const I of i){const ne=g.find(me=>Math.abs(me.y-I.y)<30);ne?ne.items.push(I):g.push({y:I.y,items:[I]})}if(g.sort((I,ne)=>I.y-ne.y),g.forEach((I,ne)=>{I.items.sort((z,je)=>z.x-je.x);const me=I.items.map(z=>{var je;return((je=Wt[z.type])==null?void 0:je.label)||z.type});if(I.items.length===1){const je=I.items[0].width>n.width*.8;r+=`- Row ${ne+1} (y≈${Math.round(I.y)}): ${me[0]}${je?" — full width":""}
`}else r+=`- Row ${ne+1} (y≈${Math.round(I.y)}): ${me.join(" | ")} — ${I.items.length} items side by side
`}),o==="detailed"||o==="forensic"){r+=`
### Spacing & Gaps
`;for(let I=0;I<i.length-1;I++){const ne=i[I],me=i[I+1],z=((U=Wt[ne.type])==null?void 0:U.label)||ne.type,je=((A=Wt[me.type])==null?void 0:A.label)||me.type,Le=Math.round(me.y-(ne.y+ne.height)),be=Math.round(me.x-(ne.x+ne.width));Math.abs(ne.y-me.y)<30?r+=`- ${z} → ${je}: \`${be}px\` horizontal gap
`:r+=`- ${z} → ${je}: \`${Le}px\` vertical gap
`}if(o==="forensic"&&i.length>2){r+=`
### All Pairwise Gaps
`;for(let I=0;I<i.length;I++)for(let ne=I+1;ne<i.length;ne++){const me=i[I],z=i[ne],je=((pe=Wt[me.type])==null?void 0:pe.label)||me.type,Le=((Te=Wt[z.type])==null?void 0:Te.label)||z.type,be=Math.round(z.y-(me.y+me.height)),ue=Math.round(z.x-(me.x+me.width));r+=`- ${je} ↔ ${Le}: h=\`${ue}px\` v=\`${be}px\`
`}}o==="forensic"&&(r+=`
### Z-Order (placement order)
`,t.forEach((I,ne)=>{var z;const me=((z=Wt[I.type])==null?void 0:z.label)||I.type;r+=`${ne}. ${me} at \`(${Math.round(I.x)}, ${Math.round(I.y)})\`
`}))}r+=`
### Suggested Implementation
`;const m=i.some(I=>I.type==="navigation"),$=i.some(I=>I.type==="hero"),x=i.some(I=>I.type==="sidebar"),y=i.some(I=>I.type==="footer"),w=i.filter(I=>I.type==="card"),R=i.filter(I=>I.type==="form"),k=i.filter(I=>I.type==="table"),B=i.filter(I=>I.type==="modal");if(m&&(r+=`- Top navigation bar with logo + nav links + CTA
`),$&&(r+=`- Hero section with heading, subtext, and call-to-action
`),x&&(r+=`- Sidebar layout — use CSS Grid with sidebar + main content area
`),w.length>1?r+=`- ${w.length}-column card grid — use CSS Grid or Flexbox
`:w.length===1&&(r+=`- Card component with image + content area
`),R.length>0&&(r+=`- ${R.length} form${R.length>1?"s":""} — add proper labels, validation, and submit handling
`),k.length>0&&(r+=`- Data table — consider sortable columns and pagination
`),B.length>0&&(r+=`- Modal dialog — add overlay backdrop and focus trapping
`),y&&(r+=`- Multi-column footer with links
`),o==="detailed"||o==="forensic"){if(r+=`
### CSS Suggestions
`,x){const I=i.find(ne=>ne.type==="sidebar");r+=`- \`display: grid; grid-template-columns: ${Math.round(I.width)}px 1fr;\`
`}if(w.length>1){const I=Math.round(w[0].width);r+=`- \`display: grid; grid-template-columns: repeat(${w.length}, ${I}px); gap: 16px;\`
`}m&&(r+="- Navigation: `position: sticky; top: 0; z-index: 50;`\n")}return r}function dr(t,n="standard",s){const{sections:o}=t,i=[];for(const x of o){const y=x.originalRect,w=x.currentRect,R=Math.abs(y.x-w.x)>1||Math.abs(y.y-w.y)>1,k=Math.abs(y.width-w.width)>1||Math.abs(y.height-w.height)>1;if(!R&&!k){n==="forensic"&&i.push({section:x,posMoved:!1,sizeChanged:!1});continue}i.push({section:x,posMoved:R,sizeChanged:k})}if(i.length===0||n!=="forensic"&&i.every(x=>!x.posMoved&&!x.sizeChanged))return"";let r=`## Suggested Layout Changes

`;const d=s?s.width:typeof window<"u"?window.innerWidth:0,g=s?s.height:typeof window<"u"?window.innerHeight:0,m=zr({width:d,height:g});n!=="compact"&&(r+=Or(m)),n==="forensic"&&(r+=`> Detected at: \`${new Date(t.detectedAt).toISOString()}\`
`,r+=`> Total sections: ${o.length}

`);const $=x=>o.map(y=>({label:y.label,selector:y.selector,rect:x==="original"?y.originalRect:y.currentRect}));r+=`**Changes:**
`;for(const{section:x,posMoved:y,sizeChanged:w}of i){const R=x.originalRect,k=x.currentRect;if(!y&&!w){r+=`- ${x.label} — unchanged at (${Math.round(k.x)}, ${Math.round(k.y)}) ${Math.round(k.width)}×${Math.round(k.height)}px
`;continue}if(n==="compact"){y&&w?r+=`- Suggested: move **${x.label}** to (${Math.round(k.x)}, ${Math.round(k.y)}) ${Math.round(k.width)}×${Math.round(k.height)}px
`:y?r+=`- Suggested: move **${x.label}** to (${Math.round(k.x)}, ${Math.round(k.y)})
`:r+=`- Suggested: resize **${x.label}** to ${Math.round(k.width)}×${Math.round(k.height)}px
`;continue}if(y&&w?r+=`- Suggested: move and resize **${x.label}**
`:y?r+=`- Suggested: move **${x.label}**
`:r+=`- Suggested: resize **${x.label}** from ${Math.round(R.width)}×${Math.round(R.height)}px to ${Math.round(k.width)}×${Math.round(k.height)}px
`,y){const U=io(R,$("original")),A=io(k,$("current")),pe=w?{width:R.width,height:R.height}:void 0;r+=`  - Currently ${Vl(U,{x:R.x,y:R.y},pe)}
`;const Te=w?{width:k.width,height:k.height}:void 0,I=`at (${Math.round(k.x)}, ${Math.round(k.y)})`,ne=Te?`, ${Math.round(Te.width)}×${Math.round(Te.height)}px`:"",z=Ar(A,{includeLeftRight:n==="detailed"||n==="forensic"});if(z.length>0){r+=`  - Suggested position ${I}${ne}: ${z[0]}
`;for(let Le=1;Le<z.length;Le++)r+=`    ${z[Le]}
`}else r+=`  - Suggested position ${I}${ne}
`;const je=Wr(k,m);je&&(r+=`  - CSS: ${je}
`)}const B=Gl(x.selector);if(B&&(r+=`  - ${B}
`),r+=`  - Selector: \`${x.selector}\`
`,n==="detailed"||n==="forensic"){const U=x.className?`${x.tagName}.${x.className.split(" ")[0]}`:x.tagName;U!==x.selector&&(r+=`  - Element: \`${U}\`
`),x.role&&(r+=`  - Role: \`${x.role}\`
`),n==="forensic"&&x.textSnippet&&(r+=`  - Text: "${x.textSnippet}"
`)}n==="forensic"&&(r+=`  - Original rect: \`{ x: ${Math.round(R.x)}, y: ${Math.round(R.y)}, w: ${Math.round(R.width)}, h: ${Math.round(R.height)} }\`
`,r+=`  - Current rect: \`{ x: ${Math.round(k.x)}, y: ${Math.round(k.y)}, w: ${Math.round(k.width)}, h: ${Math.round(k.height)} }\`
`)}if(n!=="compact"){const x=i.filter(w=>w.posMoved).map(w=>({label:w.section.label,originalRect:w.section.originalRect,currentRect:w.section.currentRect})),y=Ql(x);if(y.length>0){r+=`
### Layout Summary
`;for(const w of y)r+=`- ${w}
`}}if(n!=="compact"&&o.length>1){r+=`
### All Sections (current positions)
`;const x=[...o].sort((y,w)=>Math.abs(y.currentRect.y-w.currentRect.y)<20?y.currentRect.x-w.currentRect.x:y.currentRect.y-w.currentRect.y);for(const y of x){const w=y.currentRect,R=Math.abs(w.x-y.originalRect.x)>1||Math.abs(w.y-y.originalRect.y)>1||Math.abs(w.width-y.originalRect.width)>1||Math.abs(w.height-y.originalRect.height)>1;r+=`- ${y.label}: \`${Math.round(w.width)}×${Math.round(w.height)}px\` at \`(${Math.round(w.x)}, ${Math.round(w.y)})\`${R?" ← suggested":""}
`}}return r}var ao="feedback-annotations-",Fr=7;function Ss(t){return`${ao}${t}`}function Vs(t){if(typeof window>"u")return[];try{const n=localStorage.getItem(Ss(t));if(!n)return[];const s=JSON.parse(n),o=Date.now()-Fr*24*60*60*1e3;return s.filter(i=>!i.timestamp||i.timestamp>o)}catch{return[]}}function Hr(t,n){if(!(typeof window>"u"))try{localStorage.setItem(Ss(t),JSON.stringify(n))}catch{}}function Kl(){const t=new Map;if(typeof window>"u")return t;try{const n=Date.now()-Fr*24*60*60*1e3;for(let s=0;s<localStorage.length;s++){const o=localStorage.key(s);if(o!=null&&o.startsWith(ao)){const i=o.slice(ao.length),r=localStorage.getItem(o);if(r){const g=JSON.parse(r).filter(m=>!m.timestamp||m.timestamp>n);g.length>0&&t.set(i,g)}}}}catch{}return t}function Vn(t,n,s){const o=n.map(i=>({...i,_syncedTo:s}));Hr(t,o)}var uo="agentation-design-";function Jl(t){if(typeof window>"u")return[];try{const n=localStorage.getItem(`${uo}${t}`);return n?JSON.parse(n):[]}catch{return[]}}function Zl(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${uo}${t}`,JSON.stringify(n))}catch{}}function ec(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${uo}${t}`)}catch{}}var ho="agentation-rearrange-";function tc(t){if(typeof window>"u")return null;try{const n=localStorage.getItem(`${ho}${t}`);return n?JSON.parse(n):null}catch{return null}}function nc(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${ho}${t}`,JSON.stringify(n))}catch{}}function sc(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${ho}${t}`)}catch{}}var mo="agentation-wireframe-";function oc(t){if(typeof window>"u")return null;try{const n=localStorage.getItem(`${mo}${t}`);return n?JSON.parse(n):null}catch{return null}}function _r(t,n){if(!(typeof window>"u"))try{localStorage.setItem(`${mo}${t}`,JSON.stringify(n))}catch{}}function ys(t){if(!(typeof window>"u"))try{localStorage.removeItem(`${mo}${t}`)}catch{}}var Yr="agentation-session-";function po(t){return`${Yr}${t}`}function rc(t){if(typeof window>"u")return null;try{return localStorage.getItem(po(t))}catch{return null}}function Qs(t,n){if(!(typeof window>"u"))try{localStorage.setItem(po(t),n)}catch{}}function ic(t){if(!(typeof window>"u"))try{localStorage.removeItem(po(t))}catch{}}var Xr=`${Yr}toolbar-hidden`;function ac(){if(typeof window>"u")return!1;try{return sessionStorage.getItem(Xr)==="1"}catch{return!1}}function lc(t){if(!(typeof window>"u"))try{t&&sessionStorage.setItem(Xr,"1")}catch{}}async function qs(t,n){const s=await fetch(`${t}/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:n})});if(!s.ok)throw new Error(`Failed to create session: ${s.status}`);return s.json()}async function ur(t,n){const s=await fetch(`${t}/sessions/${n}`);if(!s.ok)throw new Error(`Failed to get session: ${s.status}`);return s.json()}async function $n(t,n,s){const o=await fetch(`${t}/sessions/${n}/annotations`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!o.ok)throw new Error(`Failed to sync annotation: ${o.status}`);return o.json()}async function hr(t,n,s){const o=await fetch(`${t}/annotations/${n}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!o.ok)throw new Error(`Failed to update annotation: ${o.status}`);return o.json()}async function on(t,n){const s=await fetch(`${t}/annotations/${n}`,{method:"DELETE"});if(!s.ok)throw new Error(`Failed to delete annotation: ${s.status}`)}var Ye={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16,IncompleteClassComponent:17,DehydratedFragment:18,SuspenseListComponent:19,ScopeComponent:21,OffscreenComponent:22,LegacyHiddenComponent:23,CacheComponent:24,TracingMarkerComponent:25,HostHoistable:26,HostSingleton:27,IncompleteFunctionComponent:28,Throw:29,ViewTransitionComponent:30,ActivityComponent:31},mr=new Set(["Component","PureComponent","Fragment","Suspense","Profiler","StrictMode","Routes","Route","Outlet","Root","ErrorBoundaryHandler","HotReload","Hot"]),pr=[/Boundary$/,/BoundaryHandler$/,/Provider$/,/Consumer$/,/^(Inner|Outer)/,/Router$/,/^Client(Page|Segment|Root)/,/^Segment(ViewNode|Node)$/,/^LayoutSegment/,/^Server(Root|Component|Render)/,/^RSC/,/Context$/,/^Hot(Reload)?$/,/^(Dev|React)(Overlay|Tools|Root)/,/Overlay$/,/Handler$/,/^With[A-Z]/,/Wrapper$/,/^Root$/],cc=[/Page$/,/View$/,/Screen$/,/Section$/,/Card$/,/List$/,/Item$/,/Form$/,/Modal$/,/Dialog$/,/Button$/,/Nav$/,/Header$/,/Footer$/,/Layout$/,/Panel$/,/Tab$/,/Menu$/];function dc(t){const n=(t==null?void 0:t.mode)??"filtered";let s=mr;if(t!=null&&t.skipExact){const o=t.skipExact instanceof Set?t.skipExact:new Set(t.skipExact);s=new Set([...mr,...o])}return{maxComponents:(t==null?void 0:t.maxComponents)??6,maxDepth:(t==null?void 0:t.maxDepth)??30,mode:n,skipExact:s,skipPatterns:t!=null&&t.skipPatterns?[...pr,...t.skipPatterns]:pr,userPatterns:(t==null?void 0:t.userPatterns)??cc,filter:t==null?void 0:t.filter}}function _c(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z][a-z])/g,"$1-$2").toLowerCase()}function uc(t,n=10){const s=new Set;let o=t,i=0;for(;o&&i<n;)o.className&&typeof o.className=="string"&&o.className.split(/\s+/).forEach(r=>{if(r.length>1){const d=r.replace(/[_][a-zA-Z0-9]{5,}.*$/,"").toLowerCase();d.length>1&&s.add(d)}}),o=o.parentElement,i++;return s}function hc(t,n){const s=_c(t);for(const o of n){if(o===s)return!0;const i=s.split("-").filter(d=>d.length>2),r=o.split("-").filter(d=>d.length>2);for(const d of i)for(const g of r)if(d===g||d.includes(g)||g.includes(d))return!0}return!1}function mc(t,n,s,o){if(s.filter)return s.filter(t,n);switch(s.mode){case"all":return!0;case"filtered":return!(s.skipExact.has(t)||s.skipPatterns.some(i=>i.test(t)));case"smart":return s.skipExact.has(t)||s.skipPatterns.some(i=>i.test(t))?!1:!!(o&&hc(t,o)||s.userPatterns.some(i=>i.test(t)));default:return!0}}var In=null,pc=new WeakMap;function Gs(t){return Object.keys(t).some(n=>n.startsWith("__reactFiber$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactProps$"))}function gc(){if(In!==null)return In;if(typeof document>"u")return!1;if(document.body&&Gs(document.body))return In=!0,!0;const t=["#root","#app","#__next","[data-reactroot]"];for(const n of t){const s=document.querySelector(n);if(s&&Gs(s))return In=!0,!0}if(document.body){for(const n of document.body.children)if(Gs(n))return In=!0,!0}return In=!1,!1}var Qn={map:pc};function xc(t){return Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"))||null}function fc(t){const n=xc(t);return n?t[n]:null}function hn(t){return t?t.displayName?t.displayName:t.name?t.name:null:null}function yc(t){var i;const{tag:n,type:s,elementType:o}=t;if(n===Ye.HostComponent||n===Ye.HostText||n===Ye.HostHoistable||n===Ye.HostSingleton||n===Ye.Fragment||n===Ye.Mode||n===Ye.Profiler||n===Ye.DehydratedFragment||n===Ye.HostRoot||n===Ye.HostPortal||n===Ye.ScopeComponent||n===Ye.OffscreenComponent||n===Ye.LegacyHiddenComponent||n===Ye.CacheComponent||n===Ye.TracingMarkerComponent||n===Ye.Throw||n===Ye.ViewTransitionComponent||n===Ye.ActivityComponent)return null;if(n===Ye.ForwardRef){const r=o;if(r!=null&&r.render){const d=hn(r.render);if(d)return d}return r!=null&&r.displayName?r.displayName:hn(s)}if(n===Ye.MemoComponent||n===Ye.SimpleMemoComponent){const r=o;if(r!=null&&r.type){const d=hn(r.type);if(d)return d}return r!=null&&r.displayName?r.displayName:hn(s)}if(n===Ye.ContextProvider){const r=s;return(i=r==null?void 0:r._context)!=null&&i.displayName?`${r._context.displayName}.Provider`:null}if(n===Ye.ContextConsumer){const r=s;return r!=null&&r.displayName?`${r.displayName}.Consumer`:null}if(n===Ye.LazyComponent){const r=o;return(r==null?void 0:r._status)===1&&r._result?hn(r._result):null}return n===Ye.SuspenseComponent||n===Ye.SuspenseListComponent?null:n===Ye.IncompleteClassComponent||n===Ye.IncompleteFunctionComponent||n===Ye.FunctionComponent||n===Ye.ClassComponent||n===Ye.IndeterminateComponent?hn(s):null}function bc(t){return t.length<=2||t.length<=3&&t===t.toLowerCase()}function wc(t,n){const s=dc(n),o=s.mode==="all";if(o){const m=Qn.map.get(t);if(m!==void 0)return m}if(!gc()){const m={path:null,components:[]};return o&&Qn.map.set(t,m),m}const i=s.mode==="smart"?uc(t):void 0,r=[];try{let m=fc(t),$=0;for(;m&&$<s.maxDepth&&r.length<s.maxComponents;){const x=yc(m);x&&!bc(x)&&mc(x,$,s,i)&&r.push(x),m=m.return,$++}}catch{const m={path:null,components:[]};return o&&Qn.map.set(t,m),m}if(r.length===0){const m={path:null,components:[]};return o&&Qn.map.set(t,m),m}const g={path:r.slice().reverse().map(m=>`<${m}>`).join(" "),components:r};return o&&Qn.map.set(t,g),g}var qn={FunctionComponent:0,IndeterminateComponent:2,ForwardRef:11,MemoComponent:14,SimpleMemoComponent:15};function vc(t){if(!t||typeof t!="object")return null;const n=Object.keys(t),s=n.find(r=>r.startsWith("__reactFiber$"));if(s)return t[s]||null;const o=n.find(r=>r.startsWith("__reactInternalInstance$"));if(o)return t[o]||null;const i=n.find(r=>{if(!r.startsWith("__react"))return!1;const d=t[r];return d&&typeof d=="object"&&"_debugSource"in d});return i&&t[i]||null}function Zn(t){if(!t.type||typeof t.type=="string")return null;if(typeof t.type=="object"||typeof t.type=="function"){const n=t.type;if(n.displayName)return n.displayName;if(n.name)return n.name}return null}function kc(t,n=50){var i;let s=t,o=0;for(;s&&o<n;){if(s._debugSource)return{source:s._debugSource,componentName:Zn(s)};if((i=s._debugOwner)!=null&&i._debugSource)return{source:s._debugOwner._debugSource,componentName:Zn(s._debugOwner)};s=s.return,o++}return null}function jc(t){let n=t,s=0;const o=50;for(;n&&s<o;){const i=n,r=["_debugSource","__source","_source","debugSource"];for(const d of r){const g=i[d];if(g&&typeof g=="object"&&"fileName"in g)return{source:g,componentName:Zn(n)}}if(n.memoizedProps){const d=n.memoizedProps;if(d.__source&&typeof d.__source=="object"){const g=d.__source;if(g.fileName&&g.lineNumber)return{source:{fileName:g.fileName,lineNumber:g.lineNumber,columnNumber:g.columnNumber},componentName:Zn(n)}}}n=n.return,s++}return null}var bs=new Map;function Cc(t){var i;const n=t.tag,s=t.type,o=t.elementType;if(typeof s=="string"||s==null||typeof s=="function"&&((i=s.prototype)!=null&&i.isReactComponent))return null;if((n===qn.FunctionComponent||n===qn.IndeterminateComponent)&&typeof s=="function")return s;if(n===qn.ForwardRef&&o){const r=o.render;if(typeof r=="function")return r}if((n===qn.MemoComponent||n===qn.SimpleMemoComponent)&&o){const r=o.type;if(typeof r=="function")return r}return typeof s=="function"?s:null}function Sc(){const t=Mr,n=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;if(n&&"H"in n)return{get:()=>n.H,set:o=>{n.H=o}};const s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;if(s){const o=s.ReactCurrentDispatcher;if(o&&"current"in o)return{get:()=>o.current,set:i=>{o.current=i}}}return null}function Nc(t){const n=t.split(`
`),s=[/source-location/,/\/dist\/index\./,/node_modules\//,/react-dom/,/react\.development/,/react\.production/,/chunk-[A-Z0-9]+/i,/react-stack-bottom-frame/,/react-reconciler/,/scheduler/,/<anonymous>/],o=/^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/,i=/^[^@]*@(.+?):(\d+):(\d+)$/;for(const r of n){const d=r.trim();if(!d||s.some(m=>m.test(d)))continue;const g=o.exec(d)||i.exec(d);if(g)return{fileName:g[1],line:parseInt(g[2],10),column:parseInt(g[3],10)}}return null}function Mc(t){let n=t;return n=n.replace(/[?#].*$/,""),n=n.replace(/^turbopack:\/\/\/\[project\]\//,""),n=n.replace(/^webpack-internal:\/\/\/\.\//,""),n=n.replace(/^webpack-internal:\/\/\//,""),n=n.replace(/^webpack:\/\/\/\.\//,""),n=n.replace(/^webpack:\/\/\//,""),n=n.replace(/^turbopack:\/\/\//,""),n=n.replace(/^https?:\/\/[^/]+\//,""),n=n.replace(/^file:\/\/\//,"/"),n=n.replace(/^\([^)]+\)\/\.\//,""),n=n.replace(/^\.\//,""),n}function $c(t){const n=Cc(t);if(!n)return null;if(bs.has(n))return bs.get(n);const s=Sc();if(!s)return bs.set(n,null),null;const o=s.get();let i=null;try{const r=new Proxy({},{get(){throw new Error("probe")}});s.set(r);try{n({})}catch(d){if(d instanceof Error&&d.message==="probe"&&d.stack){const g=Nc(d.stack);g&&(i={fileName:Mc(g.fileName),lineNumber:g.line,columnNumber:g.column,componentName:Zn(t)||void 0})}}}finally{s.set(o)}return bs.set(n,i),i}function Ic(t,n=15){let s=t,o=0;for(;s&&o<n;){const i=$c(s);if(i)return i;s=s.return,o++}return null}function lo(t){const n=vc(t);if(!n)return{found:!1,reason:"no-fiber",isReactApp:!1,isProduction:!1};let s=kc(n);if(s||(s=jc(n)),s!=null&&s.source)return{found:!0,source:{fileName:s.source.fileName,lineNumber:s.source.lineNumber,columnNumber:s.source.columnNumber,componentName:s.componentName||void 0},isReactApp:!0,isProduction:!1};const o=Ic(n);return o?{found:!0,source:o,isReactApp:!0,isProduction:!1}:{found:!1,reason:"no-debug-source",isReactApp:!0,isProduction:!1}}function Lc(t,n="path"){const{fileName:s,lineNumber:o,columnNumber:i}=t;let r=`${s}:${o}`;return i!==void 0&&(r+=`:${i}`),n==="vscode"?`vscode://file${s.startsWith("/")?"":"/"}${r}`:r}function Ec(t,n=10){let s=t,o=0;for(;s&&o<n;){const i=lo(s);if(i.found)return i;s=s.parentElement,o++}return lo(t)}var Rc=`.styles-module__toolbar___wNsdK svg[fill=none],
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
}`,Bc={toolbar:"styles-module__toolbar___wNsdK",markersLayer:"styles-module__markersLayer___-25j1",fixedMarkersLayer:"styles-module__fixedMarkersLayer___ffyX6",controlsContent:"styles-module__controlsContent___9GJWU",disableTransitions:"styles-module__disableTransitions___EopxO",toolbarContainer:"styles-module__toolbarContainer___dIhma",entrance:"styles-module__entrance___sgHd8",toolbarEnter:"styles-module__toolbarEnter___u8RRu",hiding:"styles-module__hiding___1td44",toolbarHide:"styles-module__toolbarHide___y8kaT",collapsed:"styles-module__collapsed___Rydsn",expanded:"styles-module__expanded___ofKPx",serverConnected:"styles-module__serverConnected___Gfbou",toggleContent:"styles-module__toggleContent___0yfyP",visible:"styles-module__visible___KHwEW",hidden:"styles-module__hidden___Ae8H4",badge:"styles-module__badge___2XsgF",fadeOut:"styles-module__fadeOut___6Ut6-",badgeEnter:"styles-module__badgeEnter___mVQLj",controlButton:"styles-module__controlButton___8Q0jc",statusShowing:"styles-module__statusShowing___te6iu",buttonBadge:"styles-module__buttonBadge___NeFWb",mcpIndicator:"styles-module__mcpIndicator___zGJeL",connected:"styles-module__connected___7c28g",mcpIndicatorPulseConnected:"styles-module__mcpIndicatorPulseConnected___EDodZ",connecting:"styles-module__connecting___uo-CW",mcpIndicatorPulseConnecting:"styles-module__mcpIndicatorPulseConnecting___cCYte",connectionIndicatorWrapper:"styles-module__connectionIndicatorWrapper___L-e-3",connectionIndicator:"styles-module__connectionIndicator___afk9p",connectionIndicatorVisible:"styles-module__connectionIndicatorVisible___C-i5B",connectionIndicatorConnected:"styles-module__connectionIndicatorConnected___IY8pR",connectionPulse:"styles-module__connectionPulse___-Zycw",connectionIndicatorDisconnected:"styles-module__connectionIndicatorDisconnected___kmpaZ",connectionIndicatorConnecting:"styles-module__connectionIndicatorConnecting___QmSLH",buttonWrapper:"styles-module__buttonWrapper___rBcdv",buttonTooltip:"styles-module__buttonTooltip___Burd9",tooltipsInSession:"styles-module__tooltipsInSession___-0lHH",sendButtonWrapper:"styles-module__sendButtonWrapper___UUxG6",sendButtonVisible:"styles-module__sendButtonVisible___WPSQU",shortcut:"styles-module__shortcut___lEAQk",tooltipBelow:"styles-module__tooltipBelow___m6ats",tooltipsHidden:"styles-module__tooltipsHidden___VtLJG",tooltipVisible:"styles-module__tooltipVisible___0jcCv",buttonWrapperAlignLeft:"styles-module__buttonWrapperAlignLeft___myzIp",buttonWrapperAlignRight:"styles-module__buttonWrapperAlignRight___HCQFR",divider:"styles-module__divider___c--s1",overlay:"styles-module__overlay___Q1O9y",hoverHighlight:"styles-module__hoverHighlight___ogakW",enter:"styles-module__enter___WFIki",hoverHighlightIn:"styles-module__hoverHighlightIn___6WYHY",multiSelectOutline:"styles-module__multiSelectOutline___cSJ-m",fadeIn:"styles-module__fadeIn___b9qmf",exit:"styles-module__exit___fyOJ0",singleSelectOutline:"styles-module__singleSelectOutline___QhX-O",hoverTooltip:"styles-module__hoverTooltip___bvLk7",hoverTooltipIn:"styles-module__hoverTooltipIn___FYGQx",hoverReactPath:"styles-module__hoverReactPath___gx1IJ",hoverElementName:"styles-module__hoverElementName___QMLMl",marker:"styles-module__marker___6sQrs",clearing:"styles-module__clearing___FQ--7",markerIn:"styles-module__markerIn___5FaAP",markerOut:"styles-module__markerOut___GU5jX",pending:"styles-module__pending___2IHLC",fixed:"styles-module__fixed___dBMHC",multiSelect:"styles-module__multiSelect___YWiuz",hovered:"styles-module__hovered___ZgXIy",renumber:"styles-module__renumber___nCTxD",renumberRoll:"styles-module__renumberRoll___Wgbq3",markerTooltip:"styles-module__markerTooltip___aLJID",tooltipIn:"styles-module__tooltipIn___0N31w",markerQuote:"styles-module__markerQuote___FHmrz",markerNote:"styles-module__markerNote___QkrrS",markerHint:"styles-module__markerHint___2iF-6",settingsPanel:"styles-module__settingsPanel___OxX3Y",settingsHeader:"styles-module__settingsHeader___pwDY9",settingsBrand:"styles-module__settingsBrand___0gJeM",settingsBrandSlash:"styles-module__settingsBrandSlash___uTG18",settingsVersion:"styles-module__settingsVersion___TUcFq",settingsSection:"styles-module__settingsSection___m-YM2",settingsLabel:"styles-module__settingsLabel___8UjfX",cycleButton:"styles-module__cycleButton___FMKfw",cycleDot:"styles-module__cycleDot___nPgLY",dropdownButton:"styles-module__dropdownButton___16NPz",toggleLabel:"styles-module__toggleLabel___Xm8Aa",customCheckbox:"styles-module__customCheckbox___U39ax",sliderLabel:"styles-module__sliderLabel___U8sPr",slider:"styles-module__slider___GLdxp",themeToggle:"styles-module__themeToggle___2rUjA",settingsOption:"styles-module__settingsOption___UNa12",selected:"styles-module__selected___OwRqP",settingsPanelContainer:"styles-module__settingsPanelContainer___Xksv8",settingsPage:"styles-module__settingsPage___6YfHH",slideLeft:"styles-module__slideLeft___Ps01J",automationsPage:"styles-module__automationsPage___uvCq6",slideIn:"styles-module__slideIn___4-qXe",settingsNavLink:"styles-module__settingsNavLink___wCzJt",settingsNavLinkRight:"styles-module__settingsNavLinkRight___ZWwhj",mcpNavIndicator:"styles-module__mcpNavIndicator___cl9pO",mcpPulse:"styles-module__mcpPulse___uNggr",settingsBackButton:"styles-module__settingsBackButton___bIe2j",automationHeader:"styles-module__automationHeader___InP0r",automationDescription:"styles-module__automationDescription___NKlmo",learnMoreLink:"styles-module__learnMoreLink___8xv-x",autoSendRow:"styles-module__autoSendRow___UblX5",autoSendLabel:"styles-module__autoSendLabel___icDc2",active:"styles-module__active___-zoN6",webhookUrlInput:"styles-module__webhookUrlInput___2375C",settingsSectionExtraPadding:"styles-module__settingsSectionExtraPadding___jdhFV",settingsSectionGrow:"styles-module__settingsSectionGrow___h-5HZ",settingsRow:"styles-module__settingsRow___3sdhc",settingsRowMarginTop:"styles-module__settingsRowMarginTop___zA0Sp",dropdownContainer:"styles-module__dropdownContainer___BVnxe",settingsRowDisabled:"styles-module__settingsRowDisabled___EgS0V",toggleSwitch:"styles-module__toggleSwitch___l4Ygm",cycleButtonText:"styles-module__cycleButtonText___fD1LR",cycleTextIn:"styles-module__cycleTextIn___Q6zJf",cycleDots:"styles-module__cycleDots___LWuoQ",dropdownMenu:"styles-module__dropdownMenu___k73ER",scaleIn:"styles-module__scaleIn___c-r1K",dropdownItem:"styles-module__dropdownItem___ylsLj",settingsLabelMarker:"styles-module__settingsLabelMarker___ewdtV",settingsOptions:"styles-module__settingsOptions___LyrBA",sliderContainer:"styles-module__sliderContainer___ducXj",sliderLabels:"styles-module__sliderLabels___FhLDB",colorOptions:"styles-module__colorOptions___iHCNX",colorOption:"styles-module__colorOption___IodiY",colorOptionRing:"styles-module__colorOptionRing___U2xpo",settingsToggle:"styles-module__settingsToggle___fBrFn",settingsToggleMarginBottom:"styles-module__settingsToggleMarginBottom___MZUyF",checked:"styles-module__checked___mnZLo",toggleSlider:"styles-module__toggleSlider___wprIn",disabled:"styles-module__disabled___332Jw",mcpStatusDot:"styles-module__mcpStatusDot___ibgkc",disconnected:"styles-module__disconnected___cHPxR",mcpPulseError:"styles-module__mcpPulseError___fov9B",drawCanvas:"styles-module__drawCanvas___7cG9U",dragSelection:"styles-module__dragSelection___kZLq2",dragCount:"styles-module__dragCount___KM90j",highlightsContainer:"styles-module__highlightsContainer___-0xzG",selectedElementHighlight:"styles-module__selectedElementHighlight___fyVlI",scaleOut:"styles-module__scaleOut___Wctwz",slideUp:"styles-module__slideUp___kgD36",slideDown:"styles-module__slideDown___zcdje"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-page-toolbar-css-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-page-toolbar-css-styles",document.head.appendChild(t)),t.textContent=Rc}var E=Bc,Gn=[{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"detailed",label:"Detailed"},{value:"forensic",label:"Forensic"}];function gr(t,n,s="standard"){if(t.length===0)return"";const o=typeof window<"u"?`${window.innerWidth}×${window.innerHeight}`:"unknown";let i=`## Page Feedback: ${n}
`;return s==="forensic"?(i+=`
**Environment:**
`,i+=`- Viewport: ${o}
`,typeof window<"u"&&(i+=`- URL: ${window.location.href}
`,i+=`- User Agent: ${navigator.userAgent}
`,i+=`- Timestamp: ${new Date().toISOString()}
`,i+=`- Device Pixel Ratio: ${window.devicePixelRatio}
`),i+=`
---
`):s!=="compact"&&(i+=`**Viewport:** ${o}
`),i+=`
`,t.forEach((r,d)=>{s==="compact"?(i+=`${d+1}. **${r.element}**${r.sourceFile?` (${r.sourceFile})`:""}: ${r.comment}`,r.selectedText&&(i+=` (re: "${r.selectedText.slice(0,30)}${r.selectedText.length>30?"...":""}")`),i+=`
`):s==="forensic"?(i+=`### ${d+1}. ${r.element}
`,r.isMultiSelect&&r.fullPath&&(i+=`*Forensic data shown for first element of selection*
`),r.fullPath&&(i+=`**Full DOM Path:** ${r.fullPath}
`),r.cssClasses&&(i+=`**CSS Classes:** ${r.cssClasses}
`),r.boundingBox&&(i+=`**Position:** x:${Math.round(r.boundingBox.x)}, y:${Math.round(r.boundingBox.y)} (${Math.round(r.boundingBox.width)}×${Math.round(r.boundingBox.height)}px)
`),i+=`**Annotation at:** ${r.x.toFixed(1)}% from left, ${Math.round(r.y)}px from top
`,r.selectedText&&(i+=`**Selected text:** "${r.selectedText}"
`),r.nearbyText&&!r.selectedText&&(i+=`**Context:** ${r.nearbyText.slice(0,100)}
`),r.computedStyles&&(i+=`**Computed Styles:** ${r.computedStyles}
`),r.accessibility&&(i+=`**Accessibility:** ${r.accessibility}
`),r.nearbyElements&&(i+=`**Nearby Elements:** ${r.nearbyElements}
`),r.sourceFile&&(i+=`**Source:** ${r.sourceFile}
`),r.reactComponents&&(i+=`**React:** ${r.reactComponents}
`),i+=`**Feedback:** ${r.comment}

`):(i+=`### ${d+1}. ${r.element}
`,i+=`**Location:** ${r.elementPath}
`,r.sourceFile&&(i+=`**Source:** ${r.sourceFile}
`),r.reactComponents&&(i+=`**React:** ${r.reactComponents}
`),s==="detailed"&&(r.cssClasses&&(i+=`**Classes:** ${r.cssClasses}
`),r.boundingBox&&(i+=`**Position:** ${Math.round(r.boundingBox.x)}px, ${Math.round(r.boundingBox.y)}px (${Math.round(r.boundingBox.width)}×${Math.round(r.boundingBox.height)}px)
`)),r.selectedText&&(i+=`**Selected text:** "${r.selectedText}"
`),s==="detailed"&&r.nearbyText&&!r.selectedText&&(i+=`**Context:** ${r.nearbyText.slice(0,100)}
`),i+=`**Feedback:** ${r.comment}

`)}),i.trim()}var Pc=`@keyframes styles-module__markerIn___x4G8D {
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
}`,Dc={marker:"styles-module__marker___9CKF7",enter:"styles-module__enter___8kI3q",exit:"styles-module__exit___KBdR3",clearing:"styles-module__clearing___8rM7K",pending:"styles-module__pending___BiY-U",fixed:"styles-module__fixed___aKrQO",multiSelect:"styles-module__multiSelect___CPfTC",hovered:"styles-module__hovered___-mg2N",renumber:"styles-module__renumber___16lvD",markerTooltip:"styles-module__markerTooltip___-VUm-",markerQuote:"styles-module__markerQuote___tQake",markerNote:"styles-module__markerNote___Rh4eI"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-annotation-marker-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-annotation-marker-styles",document.head.appendChild(t)),t.textContent=Pc}var rt=Dc;function xr({annotation:t,globalIndex:n,layerIndex:s,layerSize:o,isExiting:i,isClearing:r,isAnimated:d,isHovered:g,isDeleting:m,isEditingAny:$,renumberFrom:x,markerClickBehavior:y,tooltipStyle:w,onHoverEnter:R,onHoverLeave:k,onClick:B,onContextMenu:U}){const A=(g||m)&&!$,pe=A&&y==="delete",Te=t.isMultiSelect,I=Te?"var(--agentation-color-green)":"var(--agentation-color-accent)",ne=i?rt.exit:r?rt.clearing:d?"":rt.enter,me=i?`${(o-1-s)*20}ms`:`${s*20}ms`;return e.jsxs("div",{className:`${rt.marker} ${Te?rt.multiSelect:""} ${ne} ${pe?rt.hovered:""}`,"data-annotation-marker":!0,style:{left:`${t.x}%`,top:t.y,backgroundColor:pe?void 0:I,animationDelay:me},onMouseEnter:()=>R(t),onMouseLeave:k,onClick:z=>{z.stopPropagation(),i||B(t)},onContextMenu:U?z=>{y==="delete"&&(z.preventDefault(),z.stopPropagation(),i||U(t))}:void 0,children:[A?pe?e.jsx(Ir,{size:Te?18:16}):e.jsx(qi,{size:16}):e.jsx("span",{className:x!==null&&n>=x?rt.renumber:void 0,children:n+1}),g&&!$&&e.jsxs("div",{className:`${rt.markerTooltip} ${rt.enter}`,style:w,children:[e.jsxs("span",{className:rt.markerQuote,children:[t.element,t.selectedText&&` "${t.selectedText.slice(0,30)}${t.selectedText.length>30?"...":""}"`]}),e.jsx("span",{className:rt.markerNote,children:t.comment})]})]})}function Tc({x:t,y:n,isMultiSelect:s,isExiting:o}){return e.jsx("div",{className:`${rt.marker} ${rt.pending} ${s?rt.multiSelect:""} ${o?rt.exit:rt.enter}`,style:{left:`${t}%`,top:n,backgroundColor:s?"var(--agentation-color-green)":"var(--agentation-color-accent)"},children:e.jsx(Ti,{size:12})})}function fr({annotation:t,fixed:n}){const s=t.isMultiSelect;return e.jsx("div",{className:`${rt.marker} ${n?rt.fixed:""} ${rt.hovered} ${s?rt.multiSelect:""} ${rt.exit}`,"data-annotation-marker":!0,style:{left:`${t.x}%`,top:t.y},children:e.jsx(Ir,{size:s?12:10})})}var Ac=`.styles-module__switchContainer___Ka-AB {
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
}`,zc={switchContainer:"styles-module__switchContainer___Ka-AB",switchInput:"styles-module__switchInput___kYDSD",switchThumb:"styles-module__switchThumb___4sCPH"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-switch-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-switch-styles",document.head.appendChild(t)),t.textContent=Ac}var Ks=zc,Js=({className:t="",...n})=>e.jsxs("div",{className:`${Ks.switchContainer} ${t}`,children:[e.jsx("input",{className:Ks.switchInput,type:"checkbox",...n}),e.jsx("div",{className:Ks.switchThumb})]}),Wc=`.styles-module__checkboxContainer___joqZk {
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
}`,Oc={checkboxContainer:"styles-module__checkboxContainer___joqZk",checkboxInput:"styles-module__checkboxInput___ECzzO",checkboxCheck:"styles-module__checkboxCheck___fUXpr",checkboxCheckPath:"styles-module__checkboxCheckPath___cDyh8"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-checkbox-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-checkbox-styles",document.head.appendChild(t)),t.textContent=Wc}var ws=Oc,Fc=({className:t="",...n})=>e.jsxs("div",{className:`${ws.checkboxContainer} ${t}`,children:[e.jsx("input",{className:ws.checkboxInput,type:"checkbox",...n}),e.jsx("svg",{className:ws.checkboxCheck,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{className:ws.checkboxCheckPath,d:"M3.94 7L6.13 9.19L10.5 4.81",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),Hc=`.styles-module__container___w8eAF {
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
}`,Yc={container:"styles-module__container___w8eAF",label:"styles-module__label___J5mxE"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-checkbox-field-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-checkbox-field-styles",document.head.appendChild(t)),t.textContent=Hc}var yr=Yc,br=({className:t="",label:n,tooltip:s,checked:o,onChange:i,...r})=>{const d=l.useId();return e.jsxs("div",{className:`${yr.container} ${t}`,...r,children:[e.jsx(Fc,{id:d,onChange:i,checked:o}),e.jsx("label",{className:yr.label,htmlFor:d,children:n}),s&&e.jsx(gn,{content:s})]})},Xc=`@keyframes styles-module__cycleTextIn___VBNTi {
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
}`,Uc={settingsPanel:"styles-module__settingsPanel___qNkn-",settingsHeader:"styles-module__settingsHeader___Fn1DP",settingsBrand:"styles-module__settingsBrand___OoKlM",settingsBrandSlash:"styles-module__settingsBrandSlash___Q-AU9",settingsVersion:"styles-module__settingsVersion___rXmL9",settingsSection:"styles-module__settingsSection___n5V-4",settingsLabel:"styles-module__settingsLabel___VCVOQ",cycleButton:"styles-module__cycleButton___XMBx3",cycleDot:"styles-module__cycleDot___zgSXY",dropdownButton:"styles-module__dropdownButton___mKHe8",sliderLabel:"styles-module__sliderLabel___6K5v1",slider:"styles-module__slider___v5z-c",themeToggle:"styles-module__themeToggle___3imlT",enter:"styles-module__enter___wginS",exit:"styles-module__exit___A4iJc",settingsOption:"styles-module__settingsOption___JoyH-",selected:"styles-module__selected___k1-Vq",settingsPanelContainer:"styles-module__settingsPanelContainer___5it-H",settingsPage:"styles-module__settingsPage___BMn-3",slideLeft:"styles-module__slideLeft___qUvW4",automationsPage:"styles-module__automationsPage___N7By0",slideIn:"styles-module__slideIn___uXDSu",themeIconWrapper:"styles-module__themeIconWrapper___pyaYa",themeIcon:"styles-module__themeIcon___w7lAm",themeIconIn:"styles-module__themeIconIn___qUWMV",settingsSectionGrow:"styles-module__settingsSectionGrow___eZTRw",settingsRow:"styles-module__settingsRow___y-tDE",settingsRowMarginTop:"styles-module__settingsRowMarginTop___uLpGb",settingsRowDisabled:"styles-module__settingsRowDisabled___ydl3Q",cycleButtonText:"styles-module__cycleButtonText___mbbnD",cycleTextIn:"styles-module__cycleTextIn___VBNTi",cycleDots:"styles-module__cycleDots___ehp6i",active:"styles-module__active___dpAhM",colorOptions:"styles-module__colorOptions___pbxZx",colorOption:"styles-module__colorOption___Co955",settingsNavLink:"styles-module__settingsNavLink___uYIwM",settingsNavLinkRight:"styles-module__settingsNavLinkRight___XBUzC",settingsBackButton:"styles-module__settingsBackButton___fflll",automationHeader:"styles-module__automationHeader___Avra9",automationDescription:"styles-module__automationDescription___vFTmJ",learnMoreLink:"styles-module__learnMoreLink___cG7OI",autoSendContainer:"styles-module__autoSendContainer___VpkXk",autoSendLabel:"styles-module__autoSendLabel___ngNdC",disabled:"styles-module__disabled___9AZYS",mcpStatusDot:"styles-module__mcpStatusDot___8AMxP",connecting:"styles-module__connecting___QEO1r",mcpPulse:"styles-module__mcpPulse___5Q3Jj",connected:"styles-module__connected___WyFkx",disconnected:"styles-module__disconnected___mvmvQ",mcpPulseError:"styles-module__mcpPulseError___VHxhx",mcpNavIndicator:"styles-module__mcpNavIndicator___auBHI",webhookUrlInput:"styles-module__webhookUrlInput___WDDDC",checkboxField:"styles-module__checkboxField___ZrSqv",divider:"styles-module__divider___h6Yux",scaleIn:"styles-module__scaleIn___QpQ8E"};if(typeof document<"u"){let t=document.getElementById("feedback-tool-styles-settings-panel-styles");t||(t=document.createElement("style"),t.id="feedback-tool-styles-settings-panel-styles",document.head.appendChild(t)),t.textContent=Xc}var Q=Uc;function Vc({settings:t,onSettingsChange:n,isDarkMode:s,onToggleTheme:o,isDevMode:i,connectionStatus:r,endpoint:d,isVisible:g,toolbarNearBottom:m,settingsPage:$,onSettingsPageChange:x,onHideToolbar:y}){var w;return e.jsx("div",{className:`${Q.settingsPanel} ${g?Q.enter:Q.exit}`,style:m?{bottom:"auto",top:"calc(100% + 0.5rem)"}:void 0,"data-agentation-settings-panel":!0,children:e.jsxs("div",{className:Q.settingsPanelContainer,children:[e.jsxs("div",{className:`${Q.settingsPage} ${$==="automations"?Q.slideLeft:""}`,children:[e.jsxs("div",{className:Q.settingsHeader,children:[e.jsx("a",{className:Q.settingsBrand,href:"https://agentation.com",target:"_blank",rel:"noopener noreferrer",children:e.jsx("svg",{width:"72",height:"16",viewBox:"0 0 676 151",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M79.6666 100.561L104.863 15.5213C107.828 4.03448 99.1201 -3.00582 88.7449 1.25541L3.52015 39.6065C1.48217 40.5329 0 42.7562 0 45.1647C0 48.6848 2.77907 51.4639 6.29922 51.4639C7.22558 51.4639 8.15193 51.2786 9.07829 50.9081L93.7472 12.7422C97.2674 11.0748 93.7472 8.29572 92.6356 12.1864L67.624 97.2259C66.5123 100.931 69.4767 105.193 73.7379 105.193C76.517 105.193 79.1108 103.155 79.6666 100.561ZM663.641 100.005C665.679 107.231 677.537 104.081 675.499 96.8553L666.05 66.2856C663.456 57.7631 655.489 55.7251 648.82 61.098L618.991 86.6654C617.324 87.9623 621.029 89.815 621.214 88.1476L625.846 61.6538C626.958 55.3546 624.179 50.5375 615.841 50.5375L579.158 51.0934C576.008 51.0934 578.417 53.8724 578.417 57.022C578.417 60.1716 580.825 61.6538 583.975 61.6538L616.212 60.9127C616.397 60.9127 614.544 59.6158 614.544 59.8011L609.727 88.7034C607.875 99.6344 617.694 102.784 626.031 95.7437L655.86 70.1763L654.192 69.6205L663.641 100.005ZM571.191 89.0739C555.443 88.7034 562.298 61.4685 578.787 61.8391C594.72 62.0243 587.124 89.2592 571.191 89.0739ZM571.006 100.375C601.575 100.931 611.024 51.6492 579.158 51.0934C547.847 50.5375 540.065 99.8197 571.006 100.375ZM521.909 46.4616C525.985 46.4616 529.505 42.9414 529.505 38.6802C529.505 34.4189 525.985 31.0841 521.909 31.0841C517.833 31.0841 514.127 34.6042 514.127 38.6802C514.127 42.7562 517.648 46.4616 521.909 46.4616ZM472.256 103.525C493.192 103.71 515.98 73.3259 519.13 62.3949L509.866 60.9127C505.234 73.3259 497.638 101.672 519.871 102.043C536.545 102.228 552.479 85.3685 563.595 70.1763C564.151 69.2499 564.706 68.1383 564.706 66.8414C564.706 63.6918 563.965 61.098 560.816 61.098C558.963 61.098 557.296 62.0243 556.184 63.5065C546.365 77.0313 530.802 90.9266 522.094 90.7414C511.904 90.5561 517.462 71.4732 519.871 64.9887C523.391 55.7251 512.831 53.5019 509.681 60.9127C506.531 68.6941 488.19 92.4088 475.035 92.2235C467.439 92.0383 464.29 83.8863 472.441 59.9864L486.707 17.7445C487.634 14.4097 485.41 10.519 481.334 10.519C478.741 10.519 476.517 12.1864 475.962 14.4097L461.696 56.4662C451.506 86.4801 455.211 103.155 472.256 103.525ZM447.43 42.5709L496.527 41.4593C499.306 41.4593 501.529 39.0507 501.529 36.2717C501.529 33.3073 499.306 31.0841 496.341 31.0841L447.245 32.1957C444.466 32.1957 442.242 34.4189 442.242 37.3833C442.242 40.1624 444.466 42.5709 447.43 42.5709ZM422.974 106.304C435.387 106.489 457.249 94.8173 472.441 53.8724C473.553 50.7228 472.071 48.3143 468.365 48.3143C466.142 48.3143 464.29 49.6112 463.548 51.6492C450.394 87.2212 431.682 96.1142 424.456 95.929C419.454 95.929 417.972 93.3352 418.713 85.5538C419.454 78.1429 410.376 74.9933 406.114 81.1073C401.297 87.777 394.442 94.2615 385.549 94.0763C370.172 93.891 376.471 67.0267 399.815 67.3972C408.338 67.5825 414.452 71.4732 417.045 76.6608C417.786 78.3282 419.454 79.6251 421.492 79.6251C424.271 79.6251 426.679 77.2166 426.679 74.4375C426.679 73.6964 426.494 72.9553 426.124 72.2143C421.862 63.6918 412.414 57.3926 400 57.2073C363.502 56.6515 353.497 104.451 383.326 104.822C397.036 105.193 410.005 94.0763 413.34 85.9243C412.599 86.8507 408.338 86.6654 408.523 84.4422C407.411 97.4111 410.931 106.119 422.974 106.304ZM335.897 104.266C335.897 115.012 347.569 117.606 347.569 103.34C347.569 89.0739 358.5 54.4282 361.464 45.1647L396.666 43.6825C405.929 43.1267 404.262 33.1221 397.036 33.3073L364.984 34.4189L368.875 22.7469C369.801 20.1531 370.542 17.9298 370.542 16.2624C370.542 13.4833 368.504 11.8159 365.911 11.8159C362.946 11.8159 360.352 12.7422 357.573 21.0794L352.942 35.16L330.153 36.0864C326.263 36.4569 323.483 38.1244 323.483 41.6445C323.483 45.5352 326.448 47.0174 330.709 46.8321L349.421 45.9058C345.901 56.6515 335.897 90.7414 335.897 104.266ZM186.939 78.6988C193.979 56.4662 212.877 54.984 212.877 62.9507C212.877 68.3236 203.984 77.0313 186.939 78.6988ZM113.942 150.955C142.844 152.437 159.704 111.492 160.63 80.5515C161.556 73.3259 153.96 70.3616 148.773 75.7344C141.918 83.1453 129.505 93.1499 119.685 93.1499C103.011 93.1499 116.165 59.8011 143.956 59.8011C149.514 59.8011 153.59 61.6538 156.184 64.0623C160.815 68.3236 170.82 62.0243 165.818 56.0957C161.927 51.4639 155.072 48.129 144.882 48.129C102.455 48.129 83.7426 105.007 116.721 105.007C134.692 105.007 151.367 88.3329 155.257 82.7747C154.516 83.5158 149.329 81.2925 149.699 79.4398L149.143 83.5158C148.958 107.045 134.322 141.506 116.536 139.838C113.386 139.468 112.089 137.43 112.089 134.836C112.089 128.907 122.094 119.273 145.067 113.53C159.518 109.824 152.293 101.487 143.4 104.081C111.163 113.53 99.6759 127.425 99.6759 137.8C99.6759 145.026 105.605 150.584 113.942 150.955ZM194.72 109.454C214.359 109.454 239 95.3732 251.228 77.9577C250.301 82.96 246.596 96.8553 246.596 101.487C246.596 110.01 254.748 109.454 261.232 102.784L288.097 75.5491L290.32 85.7391C293.284 99.4491 299.213 104.822 308.847 104.822C326.263 104.822 342.196 85.7391 349.421 74.8081L344.049 63.6918C339.787 74.8081 321.631 92.5941 311.626 92.5941C306.994 92.5941 304.771 89.815 303.289 83.7011L300.325 71.2879C297.916 60.7275 289.023 58.3189 279.018 68.1383L261.788 84.8127L264.382 69.991C266.235 59.2453 255.674 58.1337 250.116 65.915C241.779 77.0313 216.767 97.7817 196.387 97.7817C187.865 97.7817 185.456 93.7057 185.456 88.3329C230.848 84.998 239.185 47.2027 208.986 47.2027C172.858 47.2027 157.11 109.454 194.72 109.454Z",fill:"currentColor"})})}),e.jsxs("p",{className:Q.settingsVersion,children:["v","3.0.2"]}),e.jsx("button",{className:Q.themeToggle,onClick:o,title:s?"Switch to light mode":"Switch to dark mode",children:e.jsx("span",{className:Q.themeIconWrapper,children:e.jsx("span",{className:Q.themeIcon,children:s?e.jsx(Vi,{size:20}):e.jsx(Qi,{size:20})},s?"sun":"moon")})})]}),e.jsx("div",{className:Q.divider}),e.jsxs("div",{className:Q.settingsSection,children:[e.jsxs("div",{className:Q.settingsRow,children:[e.jsxs("div",{className:Q.settingsLabel,children:["Output Detail",e.jsx(gn,{content:"Controls how much detail is included in the copied output"})]}),e.jsxs("button",{className:Q.cycleButton,onClick:()=>{const k=(Gn.findIndex(B=>B.value===t.outputDetail)+1)%Gn.length;n({outputDetail:Gn[k].value})},children:[e.jsx("span",{className:Q.cycleButtonText,children:(w=Gn.find(R=>R.value===t.outputDetail))==null?void 0:w.label},t.outputDetail),e.jsx("span",{className:Q.cycleDots,children:Gn.map(R=>e.jsx("span",{className:`${Q.cycleDot} ${t.outputDetail===R.value?Q.active:""}`},R.value))})]})]}),e.jsxs("div",{className:`${Q.settingsRow} ${Q.settingsRowMarginTop} ${i?"":Q.settingsRowDisabled}`,children:[e.jsxs("div",{className:Q.settingsLabel,children:["React Components",e.jsx(gn,{content:i?"Include React component names in annotations":"Disabled — production builds minify component names, making detection unreliable. Use in development mode."})]}),e.jsx(Js,{checked:i&&t.reactEnabled,onChange:R=>n({reactEnabled:R.target.checked}),disabled:!i})]}),e.jsxs("div",{className:`${Q.settingsRow} ${Q.settingsRowMarginTop}`,children:[e.jsxs("div",{className:Q.settingsLabel,children:["Hide Until Restart",e.jsx(gn,{content:"Hides the toolbar until you open a new tab"})]}),e.jsx(Js,{checked:!1,onChange:R=>{R.target.checked&&y()}})]})]}),e.jsx("div",{className:Q.divider}),e.jsxs("div",{className:Q.settingsSection,children:[e.jsx("div",{className:`${Q.settingsLabel} ${Q.settingsLabelMarker}`,children:"Marker Color"}),e.jsx("div",{className:Q.colorOptions,children:Jn.map(R=>e.jsx("button",{className:`${Q.colorOption} ${t.annotationColorId===R.id?Q.selected:""}`,style:{"--swatch":R.srgb,"--swatch-p3":R.p3},onClick:()=>n({annotationColorId:R.id}),title:R.label,type:"button"},R.id))})]}),e.jsx("div",{className:Q.divider}),e.jsxs("div",{className:Q.settingsSection,children:[e.jsx(br,{className:"checkbox-field",label:"Clear on copy/send",checked:t.autoClearAfterCopy,onChange:R=>n({autoClearAfterCopy:R.target.checked}),tooltip:"Automatically clear annotations after copying"}),e.jsx(br,{className:Q.checkboxField,label:"Block page interactions",checked:t.blockInteractions,onChange:R=>n({blockInteractions:R.target.checked})})]}),e.jsx("div",{className:Q.divider}),e.jsxs("button",{className:Q.settingsNavLink,onClick:()=>x("automations"),children:[e.jsx("span",{children:"Manage MCP & Webhooks"}),e.jsxs("span",{className:Q.settingsNavLinkRight,children:[d&&r!=="disconnected"&&e.jsx("span",{className:`${Q.mcpNavIndicator} ${Q[r]}`}),e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M7.5 12.5L12 8L7.5 3.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]})]}),e.jsxs("div",{className:`${Q.settingsPage} ${Q.automationsPage} ${$==="automations"?Q.slideIn:""}`,children:[e.jsxs("button",{className:Q.settingsBackButton,onClick:()=>x("main"),children:[e.jsx(Ki,{size:16}),e.jsx("span",{children:"Manage MCP & Webhooks"})]}),e.jsx("div",{className:Q.divider}),e.jsxs("div",{className:Q.settingsSection,children:[e.jsxs("div",{className:Q.settingsRow,children:[e.jsxs("span",{className:Q.automationHeader,children:["MCP Connection",e.jsx(gn,{content:"Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time."})]}),d&&e.jsx("div",{className:`${Q.mcpStatusDot} ${Q[r]}`,title:r==="connected"?"Connected":r==="connecting"?"Connecting...":"Disconnected"})]}),e.jsxs("p",{className:Q.automationDescription,style:{paddingBottom:6},children:["MCP connection allows agents to receive and act on annotations."," ",e.jsx("a",{href:"https://agentation.dev/mcp",target:"_blank",rel:"noopener noreferrer",className:Q.learnMoreLink,children:"Learn more"})]})]}),e.jsx("div",{className:Q.divider}),e.jsxs("div",{className:`${Q.settingsSection} ${Q.settingsSectionGrow}`,children:[e.jsxs("div",{className:Q.settingsRow,children:[e.jsxs("span",{className:Q.automationHeader,children:["Webhooks",e.jsx(gn,{content:"Send annotation data to any URL endpoint when annotations change. Useful for custom integrations."})]}),e.jsxs("div",{className:Q.autoSendContainer,children:[e.jsx("label",{htmlFor:"agentation-auto-send",className:`${Q.autoSendLabel} ${t.webhooksEnabled?Q.active:""} ${t.webhookUrl?"":Q.disabled}`,children:"Auto-Send"}),e.jsx(Js,{id:"agentation-auto-send",checked:t.webhooksEnabled,onChange:R=>n({webhooksEnabled:R.target.checked}),disabled:!t.webhookUrl})]})]}),e.jsx("p",{className:Q.automationDescription,children:"The webhook URL will receive live annotation changes and annotation data."}),e.jsx("textarea",{className:Q.webhookUrlInput,placeholder:"Webhook URL",value:t.webhookUrl,onKeyDown:R=>R.stopPropagation(),onChange:R=>n({webhookUrl:R.target.value})})]})]})]})})}function Zs(t,n="filtered"){const{name:s,path:o}=En(t);if(n==="off")return{name:s,elementName:s,path:o,reactComponents:null};const i=wc(t,{mode:n});return{name:i.path?`${i.path} ${s}`:s,elementName:s,path:o,reactComponents:i.path}}var wr=!1,eo={outputDetail:"standard",autoClearAfterCopy:!1,annotationColorId:"blue",blockInteractions:!0,reactEnabled:!0,markerClickBehavior:"edit",webhookUrl:"",webhooksEnabled:!0},Xt=t=>{if(!t||!t.trim())return!1;try{const n=new URL(t.trim());return n.protocol==="http:"||n.protocol==="https:"}catch{return!1}},Jn=[{id:"indigo",label:"Indigo",srgb:"#6155F5",p3:"color(display-p3 0.38 0.33 0.96)"},{id:"blue",label:"Blue",srgb:"#0088FF",p3:"color(display-p3 0.00 0.53 1.00)"},{id:"cyan",label:"Cyan",srgb:"#00C3D0",p3:"color(display-p3 0.00 0.76 0.82)"},{id:"green",label:"Green",srgb:"#34C759",p3:"color(display-p3 0.20 0.78 0.35)"},{id:"yellow",label:"Yellow",srgb:"#FFCC00",p3:"color(display-p3 1.00 0.80 0.00)"},{id:"orange",label:"Orange",srgb:"#FF8D28",p3:"color(display-p3 1.00 0.55 0.16)"},{id:"red",label:"Red",srgb:"#FF383C",p3:"color(display-p3 1.00 0.22 0.24)"}],Qc=()=>{if(typeof document>"u"||document.getElementById("agentation-color-tokens"))return;const t=document.createElement("style");t.id="agentation-color-tokens",t.textContent=[...Jn.map(n=>`
      [data-agentation-accent="${n.id}"] {
        --agentation-color-accent: ${n.srgb};
      }

      @supports (color: color(display-p3 0 0 0)) {
        [data-agentation-accent="${n.id}"] {
          --agentation-color-accent: ${n.p3};
        }
      }
    `),`:root {
      ${Jn.map(n=>`--agentation-color-${n.id}: ${n.srgb};`).join(`
`)}
    }`,`@supports (color: color(display-p3 0 0 0)) {
      :root {
        ${Jn.map(n=>`--agentation-color-${n.id}: ${n.p3};`).join(`
`)}
      }
    }`].join(""),document.head.appendChild(t)};Qc();function mn(t,n){let s=document.elementFromPoint(t,n);if(!s)return null;for(;s!=null&&s.shadowRoot;){const o=s.shadowRoot.elementFromPoint(t,n);if(!o||o===s)break;s=o}return s}function to(t){let n=t;for(;n&&n!==document.body;){const o=window.getComputedStyle(n).position;if(o==="fixed"||o==="sticky")return!0;n=n.parentElement}return!1}function pn(t){return t.status!=="resolved"&&t.status!=="dismissed"}function vs(t){const n=lo(t),s=n.found?n:Ec(t);if(s.found&&s.source)return Lc(s.source,"path")}function qc({demoAnnotations:t,demoDelay:n=1e3,enableDemoMode:s=!1,onAnnotationAdd:o,onAnnotationDelete:i,onAnnotationUpdate:r,onAnnotationsClear:d,onCopy:g,onSubmit:m,copyToClipboard:$=!0,endpoint:x,sessionId:y,onSessionCreated:w,webhookUrl:R,className:k}={}){var Fo,Ho,Yo,Xo,Uo,Vo;const[B,U]=l.useState(!1),[A,pe]=l.useState([]),[Te,I]=l.useState(!0),[ne,me]=l.useState(()=>ac()),[z,je]=l.useState(!1),Le=l.useRef(null);l.useEffect(()=>{const a=h=>{const u=Le.current;u&&u.contains(h.target)&&h.stopPropagation()},_=["mousedown","click","pointerdown"];return _.forEach(h=>document.body.addEventListener(h,a)),()=>{_.forEach(h=>document.body.removeEventListener(h,a))}},[]);const[be,ue]=l.useState(!1),[Fe,Xe]=l.useState(!1),[ge,$e]=l.useState(null),[J,it]=l.useState({x:0,y:0}),[T,he]=l.useState(null),[Ae,Je]=l.useState(!1),[ft,gt]=l.useState("idle"),[Gt,It]=l.useState(!1),[Kt,Pt]=l.useState(!1),[Ut,Jt]=l.useState(null),[Zt,Nt]=l.useState(null),[Ze,yt]=l.useState([]),[xt,en]=l.useState(null),[Vt,tn]=l.useState(null),[S,Z]=l.useState(null),[xe,le]=l.useState(null),[Ee,ke]=l.useState([]),[Re,we]=l.useState(0),[ze,et]=l.useState(!1),[ee,f]=l.useState(!1),[b,N]=l.useState(!1),[L,K]=l.useState(!1),[q,D]=l.useState(!1),[Me,fe]=l.useState("main"),[Be,ie]=l.useState(!1),[V,Pe]=l.useState(!1),[He,at]=l.useState(!1),[Y,De]=l.useState([]),[Ce,ve]=l.useState(null),lt=l.useRef(!1),[se,We]=l.useState(!1),[ut,vt]=l.useState(!1),[bt,fn]=l.useState(1),[Qt,Mt]=l.useState("new-page"),[nt,Dt]=l.useState(""),[Lt,yn]=l.useState(!1),[F,Et]=l.useState(null),Ms=l.useRef(!1),$s=l.useRef({rearrange:null,placements:[]}),rn=l.useRef({rearrange:null,placements:[]}),[ni,xo]=l.useState(0),[si,oi]=l.useState(0),[ri,Is]=l.useState(0),[ii,fo]=l.useState(0),Bn=l.useRef(new Set),ts=l.useRef(new Set),Tt=l.useRef(null),ns=l.useRef(),yo=V&&B&&!He&&se;l.useEffect(()=>{if(yo){vt(!1);const a=Ln(()=>{vt(!0)});return()=>cancelAnimationFrame(a)}else vt(!1)},[yo]);const Pn=l.useRef(new Map),Dn=l.useRef(new Map),Tn=l.useRef(),[At,Ls]=l.useState(!1),[Rt,ai]=l.useState([]),li=l.useRef(Rt);li.current=Rt;const[bo,L_]=l.useState(null),Es=l.useRef(null);l.useRef(!1),l.useRef([]),l.useRef(0),l.useRef(null),l.useRef(null),l.useRef(1);const[wo,vo]=l.useState(!1),bn=l.useRef(null),[ct,wn]=l.useState([]),Ot=l.useRef({cmd:!1,shift:!1}),wt=()=>{ie(!0)},ci=()=>{ie(!1)},di=()=>{wo||(bn.current=re(()=>vo(!0),850))},_i=()=>{bn.current&&(clearTimeout(bn.current),bn.current=null),vo(!1),ci()};l.useEffect(()=>()=>{bn.current&&clearTimeout(bn.current)},[]);const[Ie,ui]=l.useState(()=>{try{const a=JSON.parse(localStorage.getItem("feedback-toolbar-settings")??"");return{...eo,...a,annotationColorId:Jn.find(_=>_.id===a.annotationColorId)?a.annotationColorId:eo.annotationColorId}}catch{return eo}}),[Ft,ko]=l.useState(!0),[jo,Co]=l.useState(!1),hi=()=>{var a;(a=Le.current)==null||a.classList.add(E.disableTransitions),ko(_=>!_),Ln(()=>{var _;(_=Le.current)==null||_.classList.remove(E.disableTransitions)})},mi=!1,an="off",[ht,Rs]=l.useState(y??null),So=l.useRef(!1),[zt,ln]=l.useState(x?"connecting":"disconnected"),[qe,Bs]=l.useState(null),[cn,No]=l.useState(!1),[vn,Mo]=l.useState(null),Ps=l.useRef(!1),[$o,An]=l.useState(new Set),[Io,ss]=l.useState(new Set),[zn,os]=l.useState(!1),[pi,kn]=l.useState(!1),[qt,Lo]=l.useState(!1),jn=l.useRef(null),Ht=l.useRef(null),Wn=l.useRef(null),On=l.useRef(null),rs=l.useRef(!1),Eo=l.useRef(0),is=l.useRef(null),Ro=l.useRef(null),Ds=8,gi=50,Bo=l.useRef(null),Po=l.useRef(null),Fn=l.useRef(null),ae=typeof window<"u"?window.location.pathname:"/";l.useEffect(()=>{if(L)D(!0);else{ie(!1),fe("main");const a=re(()=>D(!1),0);return()=>clearTimeout(a)}},[L]);const Ts=B&&Te&&!V;l.useEffect(()=>{if(Ts){Xe(!1),ue(!0),An(new Set);const a=re(()=>{An(_=>{const h=new Set(_);return A.forEach(u=>h.add(u.id)),h})},350);return()=>clearTimeout(a)}else if(be){Xe(!0);const a=re(()=>{ue(!1),Xe(!1)},250);return()=>clearTimeout(a)}},[Ts]),l.useEffect(()=>{f(!0),we(window.scrollY);const a=Vs(ae);pe(a.filter(pn)),wr||(Co(!0),wr=!0,re(()=>Co(!1),750));try{const _=localStorage.getItem("feedback-toolbar-theme");_!==null&&ko(_==="dark")}catch{}try{const _=localStorage.getItem("feedback-toolbar-position");if(_){const h=JSON.parse(_);typeof h.x=="number"&&typeof h.y=="number"&&Bs(h)}}catch{}},[ae]),l.useEffect(()=>{ee&&localStorage.setItem("feedback-toolbar-settings",JSON.stringify(Ie))},[Ie,ee]),l.useEffect(()=>{ee&&localStorage.setItem("feedback-toolbar-theme",Ft?"dark":"light")},[Ft,ee]);const Do=l.useRef(!1);l.useEffect(()=>{const a=Do.current;Do.current=cn,a&&!cn&&qe&&ee&&localStorage.setItem("feedback-toolbar-position",JSON.stringify(qe))},[cn,qe,ee]),l.useEffect(()=>{if(!x||!ee||So.current)return;So.current=!0,ln("connecting"),(async()=>{try{const _=rc(ae),h=y||_;let u=!1;if(h)try{const p=await ur(x,h);Rs(p.id),ln("connected"),Qs(ae,p.id),u=!0;const v=Vs(ae),P=new Set(p.annotations.map(O=>O.id)),W=v.filter(O=>!P.has(O.id));if(W.length>0){const G=`${typeof window<"u"?window.location.origin:""}${ae}`,ce=(await Promise.allSettled(W.map(oe=>$n(x,p.id,{...oe,sessionId:p.id,url:G})))).map((oe,X)=>oe.status==="fulfilled"?oe.value:(console.warn("[Agentation] Failed to sync annotation:",oe.reason),W[X])),Se=[...p.annotations,...ce];pe(Se.filter(pn)),Vn(ae,Se.filter(pn),p.id)}else pe(p.annotations.filter(pn)),Vn(ae,p.annotations.filter(pn),p.id)}catch(p){console.warn("[Agentation] Could not join session, creating new:",p),ic(ae)}if(!u){const p=typeof window<"u"?window.location.href:"/",v=await qs(x,p);Rs(v.id),ln("connected"),Qs(ae,v.id),w==null||w(v.id);const P=Kl(),W=typeof window<"u"?window.location.origin:"",O=[];for(const[G,te]of P){const ce=te.filter(X=>!X._syncedTo);if(ce.length===0)continue;const Se=`${W}${G}`,oe=G===ae;O.push((async()=>{try{const X=oe?v:await qs(x,Se),dt=(await Promise.allSettled(ce.map(Oe=>$n(x,X.id,{...Oe,sessionId:X.id,url:Se})))).map((Oe,ot)=>Oe.status==="fulfilled"?Oe.value:(console.warn("[Agentation] Failed to sync annotation:",Oe.reason),ce[ot])).filter(pn);if(Vn(G,dt,X.id),oe){const Oe=new Set(ce.map(ot=>ot.id));pe(ot=>{const _e=ot.filter(ye=>!Oe.has(ye.id));return[...dt,..._e]})}}catch(X){console.warn(`[Agentation] Failed to sync annotations for ${G}:`,X)}})())}await Promise.allSettled(O)}}catch(_){ln("disconnected"),console.warn("[Agentation] Failed to initialize session, using local storage:",_)}})()},[x,y,ee,w,ae]),l.useEffect(()=>{if(!x||!ee)return;const a=async()=>{try{(await fetch(`${x}/health`)).ok?ln("connected"):ln("disconnected")}catch{ln("disconnected")}};a();const _=ea(a,1e4);return()=>clearInterval(_)},[x,ee]),l.useEffect(()=>{if(!x||!ee||!ht)return;const a=new EventSource(`${x}/sessions/${ht}/events`),_=["resolved","dismissed"],h=u=>{var p;try{const v=JSON.parse(u.data);if(_.includes((p=v.payload)==null?void 0:p.status)){const P=v.payload.id,W=v.payload.kind;if(W==="placement"){for(const[O,G]of Pn.current)if(G===P){Pn.current.delete(O),De(te=>te.filter(ce=>ce.id!==O));break}}else if(W==="rearrange"){for(const[O,G]of Dn.current)if(G===P){Dn.current.delete(O),Et(te=>{if(!te)return null;const ce=te.sections.filter(Se=>Se.id!==O);return ce.length===0?null:{...te,sections:ce}});break}}else ss(O=>new Set(O).add(P)),re(()=>{pe(O=>O.filter(G=>G.id!==P)),ss(O=>{const G=new Set(O);return G.delete(P),G})},150)}}catch{}};return a.addEventListener("annotation.updated",h),()=>{a.removeEventListener("annotation.updated",h),a.close()}},[x,ee,ht]),l.useEffect(()=>{if(!x||!ee)return;const a=Ro.current==="disconnected",_=zt==="connected";Ro.current=zt,a&&_&&(async()=>{try{const u=Vs(ae);if(u.length===0)return;const v=`${typeof window<"u"?window.location.origin:""}${ae}`;let P=ht,W=[];if(P)try{W=(await ur(x,P)).annotations}catch{P=null}P||(P=(await qs(x,v)).id,Rs(P),Qs(ae,P));const O=new Set(W.map(te=>te.id)),G=u.filter(te=>!O.has(te.id));if(G.length>0){const ce=(await Promise.allSettled(G.map(X=>$n(x,P,{...X,sessionId:P,url:v})))).map((X,st)=>X.status==="fulfilled"?X.value:(console.warn("[Agentation] Failed to sync annotation on reconnect:",X.reason),G[st])),oe=[...W,...ce].filter(pn);pe(oe),Vn(ae,oe,P)}}catch(u){console.warn("[Agentation] Failed to sync on reconnect:",u)}})()},[zt,x,ee,ht,ae]);const xi=l.useCallback(()=>{z||(je(!0),K(!1),U(!1),re(()=>{lc(!0),me(!0),je(!1)},400))},[z]);l.useEffect(()=>{if(!s||!ee||!t||t.length===0||A.length>0)return;const a=[];return a.push(re(()=>{U(!0)},n-200)),t.forEach((_,h)=>{const u=n+h*300;a.push(re(()=>{const p=document.querySelector(_.selector);if(!p)return;const v=p.getBoundingClientRect(),{name:P,path:W}=En(p),O={id:`demo-${Date.now()}-${h}`,x:(v.left+v.width/2)/window.innerWidth*100,y:v.top+v.height/2+window.scrollY,comment:_.comment,element:P,elementPath:W,timestamp:Date.now(),selectedText:_.selectedText,boundingBox:{x:v.left,y:v.top+window.scrollY,width:v.width,height:v.height},nearbyText:Xn(p),cssClasses:Un(p)};pe(G=>[...G,O])},u))}),()=>{a.forEach(clearTimeout)}},[s,ee,t,n]),l.useEffect(()=>{const a=()=>{we(window.scrollY),et(!0),Fn.current&&clearTimeout(Fn.current),Fn.current=re(()=>{et(!1)},150)};return window.addEventListener("scroll",a,{passive:!0}),()=>{window.removeEventListener("scroll",a),Fn.current&&clearTimeout(Fn.current)}},[]),l.useEffect(()=>{ee&&A.length>0?ht?Vn(ae,A,ht):Hr(ae,A):ee&&A.length===0&&localStorage.removeItem(Ss(ae))},[A,ae,ee,ht]),l.useEffect(()=>{if(ee&&!lt.current){lt.current=!0;const a=Jl(ae);a.length>0&&De(a)}},[ee,ae]),l.useEffect(()=>{ee&&lt.current&&!se&&(Y.length>0?Zl(ae,Y):ec(ae))},[Y,ae,ee,se]),l.useEffect(()=>{if(ee&&!Ms.current){Ms.current=!0;const a=tc(ae);if(a){const _={...a,sections:a.sections.map(h=>({...h,currentRect:h.currentRect??{...h.originalRect}}))};Et(_)}}},[ee,ae]),l.useEffect(()=>{ee&&Ms.current&&!se&&(F?nc(ae,F):sc(ae))},[F,ae,ee,se]);const As=l.useRef(!1);l.useEffect(()=>{if(ee&&!As.current){As.current=!0;const a=oc(ae);a&&(rn.current={rearrange:a.rearrange,placements:a.placements||[]},a.purpose&&Dt(a.purpose))}},[ee,ae]),l.useEffect(()=>{var _,h,u;if(!ee||!As.current)return;const a=rn.current;se?(((_=F==null?void 0:F.sections)==null?void 0:_.length)??0)>0||Y.length>0||nt?_r(ae,{rearrange:F,placements:Y,purpose:nt}):ys(ae):(((u=(h=a.rearrange)==null?void 0:h.sections)==null?void 0:u.length)??0)>0||a.placements.length>0||nt?_r(ae,{rearrange:a.rearrange,placements:a.placements,purpose:nt}):ys(ae)},[F,Y,nt,se,ae,ee]),l.useEffect(()=>{V&&!F&&Et({sections:[],originalOrder:[],detectedAt:Date.now()})},[V,F]),l.useEffect(()=>{if(!x||!ht)return;const a=Pn.current,_=new Set(Y.map(h=>h.id));for(const h of Y){if(a.has(h.id))continue;a.set(h.id,"");const u=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:ae;$n(x,ht,{id:h.id,x:h.x/window.innerWidth*100,y:h.y,comment:`Place ${h.type} at (${Math.round(h.x)}, ${Math.round(h.y)}), ${h.width}×${h.height}px${h.text?` — "${h.text}"`:""}`,element:`[design:${h.type}]`,elementPath:"[placement]",timestamp:h.timestamp,url:u,intent:"change",severity:"important",kind:"placement",placement:{componentType:h.type,width:h.width,height:h.height,scrollY:h.scrollY,text:h.text}}).then(p=>{a.has(h.id)&&a.set(h.id,p.id)}).catch(p=>{console.warn("[Agentation] Failed to sync placement annotation:",p),a.delete(h.id)})}for(const[h,u]of a)_.has(h)||(a.delete(h),u&&on(x,u).catch(()=>{}))},[Y,x,ht,ae]),l.useEffect(()=>{if(!(!x||!ht))return Tn.current&&clearTimeout(Tn.current),Tn.current=re(()=>{const a=Dn.current;if(!F||F.sections.length===0){for(const[,u]of a)u&&on(x,u).catch(()=>{});a.clear();return}const _=new Set(F.sections.map(u=>u.id)),h=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:ae;for(const u of F.sections){const p=u.originalRect,v=u.currentRect;if(!(Math.abs(p.x-v.x)>1||Math.abs(p.y-v.y)>1||Math.abs(p.width-v.width)>1||Math.abs(p.height-v.height)>1)){const O=a.get(u.id);O&&(a.delete(u.id),on(x,O).catch(()=>{}));continue}const W=a.get(u.id);W?hr(x,W,{comment:`Move ${u.label} section (${u.tagName}) — from (${Math.round(p.x)},${Math.round(p.y)}) ${Math.round(p.width)}×${Math.round(p.height)} to (${Math.round(v.x)},${Math.round(v.y)}) ${Math.round(v.width)}×${Math.round(v.height)}`}).catch(O=>{console.warn("[Agentation] Failed to update rearrange annotation:",O)}):(a.set(u.id,""),$n(x,ht,{id:u.id,x:v.x/window.innerWidth*100,y:v.y,comment:`Move ${u.label} section (${u.tagName}) — from (${Math.round(p.x)},${Math.round(p.y)}) ${Math.round(p.width)}×${Math.round(p.height)} to (${Math.round(v.x)},${Math.round(v.y)}) ${Math.round(v.width)}×${Math.round(v.height)}`,element:u.selector,elementPath:"[rearrange]",timestamp:Date.now(),url:h,intent:"change",severity:"important",kind:"rearrange",rearrange:{selector:u.selector,label:u.label,tagName:u.tagName,originalRect:p,currentRect:v}}).then(O=>{a.has(u.id)&&a.set(u.id,O.id)}).catch(O=>{console.warn("[Agentation] Failed to sync rearrange annotation:",O),a.delete(u.id)}))}for(const[u,p]of a)_.has(u)||(a.delete(u),p&&on(x,p).catch(()=>{}))},300),()=>{Tn.current&&clearTimeout(Tn.current)}},[F,x,ht,ae]);const Cn=l.useRef(new Map);l.useLayoutEffect(()=>{const a=(F==null?void 0:F.sections)??[],_=new Set;if((V||He)&&B)for(const h of a){_.add(h.id);try{const u=document.querySelector(h.selector);if(!u)continue;if(!Cn.current.has(h.id)){const p={transform:u.style.transform,transformOrigin:u.style.transformOrigin,opacity:u.style.opacity,position:u.style.position,zIndex:u.style.zIndex,display:u.style.display},v=[];let P=u.parentElement;for(;P&&P!==document.body;){const O=getComputedStyle(P);(O.overflow!=="visible"||O.overflowX!=="visible"||O.overflowY!=="visible")&&(v.push({el:P,overflow:P.style.overflow}),P.style.overflow="visible"),P=P.parentElement}getComputedStyle(u).display==="inline"&&(u.style.display="inline-block"),Cn.current.set(h.id,{el:u,origStyles:p,ancestors:v}),u.style.transformOrigin="top left",u.style.zIndex="9999"}}catch{}}for(const[h,u]of Cn.current)if(!_.has(h)){const{el:p,origStyles:v,ancestors:P}=u;p.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",p.style.transform=v.transform,p.style.transformOrigin=v.transformOrigin,p.style.opacity=v.opacity,p.style.position=v.position,p.style.zIndex=v.zIndex,Cn.current.delete(h),re(()=>{p.style.transition="",p.style.display=v.display;for(const W of P)W.el.style.overflow=W.overflow},450)}},[F,V,He,B]),l.useEffect(()=>()=>{for(const[,a]of Cn.current){const{el:_,origStyles:h,ancestors:u}=a;_.style.transition="transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",_.style.transform=h.transform,_.style.transformOrigin=h.transformOrigin,_.style.opacity=h.opacity,_.style.position=h.position,_.style.zIndex=h.zIndex,re(()=>{_.style.transition="",_.style.display=h.display;for(const p of u)p.el.style.overflow=p.overflow},450)}Cn.current.clear()},[]);const as=l.useCallback(()=>{at(!0),Pe(!1),ve(null),clearTimeout(ns.current),ns.current=re(()=>{at(!1)},300)},[]),To=l.useCallback(()=>{V&&(at(!0),Pe(!1),ve(null),clearTimeout(ns.current),ns.current=re(()=>{at(!1)},300)),U(!1)},[V]),Ao=l.useCallback(()=>{b||(na(),N(!0))},[b]),ls=l.useCallback(()=>{b&&(Ko(),N(!1))},[b]),zs=l.useCallback(()=>{b?ls():Ao()},[b,Ao,ls]),zo=l.useCallback(()=>{if(ct.length===0)return;const a=ct[0],_=a.element,h=ct.length>1,u=ct.map(p=>p.element.getBoundingClientRect());if(h){const p={left:Math.min(...u.map(X=>X.left)),top:Math.min(...u.map(X=>X.top)),right:Math.max(...u.map(X=>X.right)),bottom:Math.max(...u.map(X=>X.bottom))},v=ct.slice(0,5).map(X=>X.name).join(", "),P=ct.length>5?` +${ct.length-5} more`:"",W=u.map(X=>({x:X.left,y:X.top+window.scrollY,width:X.width,height:X.height})),G=ct[ct.length-1].element,te=u[u.length-1],ce=te.left+te.width/2,Se=te.top+te.height/2,oe=to(G);he({x:ce/window.innerWidth*100,y:oe?Se:Se+window.scrollY,clientY:Se,element:`${ct.length} elements: ${v}${P}`,elementPath:"multi-select",boundingBox:{x:p.left,y:p.top+window.scrollY,width:p.right-p.left,height:p.bottom-p.top},isMultiSelect:!0,isFixed:oe,elementBoundingBoxes:W,multiSelectElements:ct.map(X=>X.element),targetElement:G,fullPath:gs(_),accessibility:ps(_),computedStyles:ms(_),computedStylesObj:hs(_),nearbyElements:us(_),cssClasses:Un(_),nearbyText:Xn(_),sourceFile:vs(_)})}else{const p=u[0],v=to(_);he({x:p.left/window.innerWidth*100,y:v?p.top:p.top+window.scrollY,clientY:p.top,element:a.name,elementPath:a.path,boundingBox:{x:p.left,y:v?p.top:p.top+window.scrollY,width:p.width,height:p.height},isFixed:v,fullPath:gs(_),accessibility:ps(_),computedStyles:ms(_),computedStylesObj:hs(_),nearbyElements:us(_),cssClasses:Un(_),nearbyText:Xn(_),reactComponents:a.reactComponents,sourceFile:vs(_)})}wn([]),$e(null)},[ct]);l.useEffect(()=>{B||(he(null),Z(null),le(null),ke([]),$e(null),K(!1),wn([]),Ot.current={cmd:!1,shift:!1},b&&ls())},[B,b,ls]),l.useEffect(()=>()=>{Ko()},[]),l.useEffect(()=>{if(!B)return;const a=["p","span","h1","h2","h3","h4","h5","h6","li","td","th","label","blockquote","figcaption","caption","legend","dt","dd","pre","code","em","strong","b","i","u","s","a","time","address","cite","q","abbr","dfn","mark","small","sub","sup","[contenteditable]"].join(", "),_=":not([data-agentation-root]):not([data-agentation-root] *)",h=document.createElement("style");return h.id="feedback-cursor-styles",h.textContent=`
      body ${_} {
        cursor: crosshair !important;
      }

      body :is(${a})${_} {
        cursor: text !important;
      }
    `,document.head.appendChild(h),()=>{const u=document.getElementById("feedback-cursor-styles");u&&u.remove()}},[B]),l.useEffect(()=>{if(bo!==null&&B)return document.documentElement.setAttribute("data-drawing-hover",""),()=>document.documentElement.removeAttribute("data-drawing-hover")},[bo,B]),l.useEffect(()=>{if(!B||T||At||V)return;const a=_=>{const h=_.composedPath()[0]||_.target;if(jt(h,"[data-feedback-toolbar]")){$e(null);return}const u=mn(_.clientX,_.clientY);if(!u||jt(u,"[data-feedback-toolbar]")){$e(null);return}const{name:p,elementName:v,path:P,reactComponents:W}=Zs(u,an),O=u.getBoundingClientRect();$e({element:p,elementName:v,elementPath:P,rect:O,reactComponents:W}),it({x:_.clientX,y:_.clientY})};return document.addEventListener("mousemove",a),()=>document.removeEventListener("mousemove",a)},[B,T,At,V,an,Rt]);const cs=l.useCallback(a=>{var _;if(Z(a),Jt(null),Nt(null),yt([]),(_=a.elementBoundingBoxes)!=null&&_.length){const h=[];for(const u of a.elementBoundingBoxes){const p=u.x+u.width/2,v=u.y+u.height/2-window.scrollY,P=mn(p,v);P&&h.push(P)}ke(h),le(null)}else if(a.boundingBox){const h=a.boundingBox,u=h.x+h.width/2,p=a.isFixed?h.y+h.height/2:h.y+h.height/2-window.scrollY,v=mn(u,p);if(v){const P=v.getBoundingClientRect(),W=P.width/h.width,O=P.height/h.height;W<.5||O<.5?le(null):le(v)}else le(null);ke([])}else le(null),ke([])},[]);l.useEffect(()=>{if(!B||At||V)return;const a=_=>{var Ke,dt;if(rs.current){rs.current=!1;return}const h=_.composedPath()[0]||_.target;if(jt(h,"[data-feedback-toolbar]")||jt(h,"[data-annotation-popup]")||jt(h,"[data-annotation-marker]"))return;if(_.metaKey&&_.shiftKey&&!T&&!S){_.preventDefault(),_.stopPropagation();const Oe=mn(_.clientX,_.clientY);if(!Oe)return;const ot=Oe.getBoundingClientRect(),{name:_e,path:ye,reactComponents:mt}=Zs(Oe,an),tt=ct.findIndex(kt=>kt.element===Oe);tt>=0?wn(kt=>kt.filter(($t,pt)=>pt!==tt)):wn(kt=>[...kt,{element:Oe,rect:ot,name:_e,path:ye,reactComponents:mt??void 0}]);return}const u=jt(h,"button, a, input, select, textarea, [role='button'], [onclick]");if(Ie.blockInteractions&&u&&(_.preventDefault(),_.stopPropagation()),T){if(u&&!Ie.blockInteractions)return;_.preventDefault(),(Ke=Bo.current)==null||Ke.shake();return}if(S){if(u&&!Ie.blockInteractions)return;_.preventDefault(),(dt=Po.current)==null||dt.shake();return}_.preventDefault();const p=mn(_.clientX,_.clientY);if(!p)return;const{name:v,path:P,reactComponents:W}=Zs(p,an),O=p.getBoundingClientRect(),G=_.clientX/window.innerWidth*100,te=to(p),ce=te?_.clientY:_.clientY+window.scrollY,Se=window.getSelection();let oe;Se&&Se.toString().trim().length>0&&(oe=Se.toString().trim().slice(0,500));const X=hs(p),st=ms(p);he({x:G,y:ce,clientY:_.clientY,element:v,elementPath:P,selectedText:oe,boundingBox:{x:O.left,y:te?O.top:O.top+window.scrollY,width:O.width,height:O.height},nearbyText:Xn(p),cssClasses:Un(p),isFixed:te,fullPath:gs(p),accessibility:ps(p),computedStyles:st,computedStylesObj:X,nearbyElements:us(p),reactComponents:W??void 0,sourceFile:vs(p),targetElement:p}),$e(null)};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)},[B,At,V,T,S,Ie.blockInteractions,an,ct]),l.useEffect(()=>{if(!B)return;const a=u=>{u.key==="Meta"&&(Ot.current.cmd=!0),u.key==="Shift"&&(Ot.current.shift=!0)},_=u=>{const p=Ot.current.cmd&&Ot.current.shift;u.key==="Meta"&&(Ot.current.cmd=!1),u.key==="Shift"&&(Ot.current.shift=!1);const v=Ot.current.cmd&&Ot.current.shift;p&&!v&&ct.length>0&&zo()},h=()=>{Ot.current={cmd:!1,shift:!1},wn([])};return document.addEventListener("keydown",a),document.addEventListener("keyup",_),window.addEventListener("blur",h),()=>{document.removeEventListener("keydown",a),document.removeEventListener("keyup",_),window.removeEventListener("blur",h)}},[B,ct,zo]),l.useEffect(()=>{if(!B||T||At||V)return;const a=_=>{const h=_.composedPath()[0]||_.target;jt(h,"[data-feedback-toolbar]")||jt(h,"[data-annotation-marker]")||jt(h,"[data-annotation-popup]")||new Set(["P","SPAN","H1","H2","H3","H4","H5","H6","LI","TD","TH","LABEL","BLOCKQUOTE","FIGCAPTION","CAPTION","LEGEND","DT","DD","PRE","CODE","EM","STRONG","B","I","U","S","A","TIME","ADDRESS","CITE","Q","ABBR","DFN","MARK","SMALL","SUB","SUP"]).has(h.tagName)||h.isContentEditable||(_.preventDefault(),jn.current={x:_.clientX,y:_.clientY})};return document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[B,T,At,V]),l.useEffect(()=>{if(!B||T)return;const a=_=>{if(!jn.current)return;const h=_.clientX-jn.current.x,u=_.clientY-jn.current.y,p=h*h+u*u,v=Ds*Ds;if(!qt&&p>=v&&(Ht.current=jn.current,Lo(!0),_.preventDefault()),(qt||p>=v)&&Ht.current){if(Wn.current){const _e=Math.min(Ht.current.x,_.clientX),ye=Math.min(Ht.current.y,_.clientY),mt=Math.abs(_.clientX-Ht.current.x),tt=Math.abs(_.clientY-Ht.current.y);Wn.current.style.transform=`translate(${_e}px, ${ye}px)`,Wn.current.style.width=`${mt}px`,Wn.current.style.height=`${tt}px`}const P=Date.now();if(P-Eo.current<gi)return;Eo.current=P;const W=Ht.current.x,O=Ht.current.y,G=Math.min(W,_.clientX),te=Math.min(O,_.clientY),ce=Math.max(W,_.clientX),Se=Math.max(O,_.clientY),oe=(G+ce)/2,X=(te+Se)/2,st=new Set,Ke=[[G,te],[ce,te],[G,Se],[ce,Se],[oe,X],[oe,te],[oe,Se],[G,X],[ce,X]];for(const[_e,ye]of Ke){const mt=document.elementsFromPoint(_e,ye);for(const tt of mt)tt instanceof HTMLElement&&st.add(tt)}const dt=document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav");for(const _e of dt)if(_e instanceof HTMLElement){const ye=_e.getBoundingClientRect(),mt=ye.left+ye.width/2,tt=ye.top+ye.height/2,kt=mt>=G&&mt<=ce&&tt>=te&&tt<=Se,$t=Math.min(ye.right,ce)-Math.max(ye.left,G),pt=Math.min(ye.bottom,Se)-Math.max(ye.top,te),Yn=$t>0&&pt>0?$t*pt:0,_n=ye.width*ye.height,nn=_n>0?Yn/_n:0;(kt||nn>.5)&&st.add(_e)}const Oe=[],ot=new Set(["BUTTON","A","INPUT","IMG","P","H1","H2","H3","H4","H5","H6","LI","LABEL","TD","TH","SECTION","ARTICLE","ASIDE","NAV"]);for(const _e of st){if(jt(_e,"[data-feedback-toolbar]")||jt(_e,"[data-annotation-marker]"))continue;const ye=_e.getBoundingClientRect();if(!(ye.width>window.innerWidth*.8&&ye.height>window.innerHeight*.5)&&!(ye.width<10||ye.height<10)&&ye.left<ce&&ye.right>G&&ye.top<Se&&ye.bottom>te){const mt=_e.tagName;let tt=ot.has(mt);if(!tt&&(mt==="DIV"||mt==="SPAN")){const kt=_e.textContent&&_e.textContent.trim().length>0,$t=_e.onclick!==null||_e.getAttribute("role")==="button"||_e.getAttribute("role")==="link"||_e.classList.contains("clickable")||_e.hasAttribute("data-clickable");(kt||$t)&&!_e.querySelector("p, h1, h2, h3, h4, h5, h6, button, a")&&(tt=!0)}if(tt){let kt=!1;for(const $t of Oe)if($t.left<=ye.left&&$t.right>=ye.right&&$t.top<=ye.top&&$t.bottom>=ye.bottom){kt=!0;break}kt||Oe.push(ye)}}}if(On.current){const _e=On.current;for(;_e.children.length>Oe.length;)_e.removeChild(_e.lastChild);Oe.forEach((ye,mt)=>{let tt=_e.children[mt];tt||(tt=document.createElement("div"),tt.className=E.selectedElementHighlight,_e.appendChild(tt)),tt.style.transform=`translate(${ye.left}px, ${ye.top}px)`,tt.style.width=`${ye.width}px`,tt.style.height=`${ye.height}px`})}}};return document.addEventListener("mousemove",a,{passive:!0}),()=>document.removeEventListener("mousemove",a)},[B,T,qt,Ds]),l.useEffect(()=>{if(!B)return;const a=_=>{const h=qt,u=Ht.current;if(qt&&u){rs.current=!0;const p=Math.min(u.x,_.clientX),v=Math.min(u.y,_.clientY),P=Math.max(u.x,_.clientX),W=Math.max(u.y,_.clientY),O=[];document.querySelectorAll("button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th").forEach(oe=>{if(!(oe instanceof HTMLElement)||jt(oe,"[data-feedback-toolbar]")||jt(oe,"[data-annotation-marker]"))return;const X=oe.getBoundingClientRect();X.width>window.innerWidth*.8&&X.height>window.innerHeight*.5||X.width<10||X.height<10||X.left<P&&X.right>p&&X.top<W&&X.bottom>v&&O.push({element:oe,rect:X})});const te=O.filter(({element:oe})=>!O.some(({element:X})=>X!==oe&&oe.contains(X))),ce=_.clientX/window.innerWidth*100,Se=_.clientY+window.scrollY;if(te.length>0){const oe=te.reduce((ot,{rect:_e})=>({left:Math.min(ot.left,_e.left),top:Math.min(ot.top,_e.top),right:Math.max(ot.right,_e.right),bottom:Math.max(ot.bottom,_e.bottom)}),{left:1/0,top:1/0,right:-1/0,bottom:-1/0}),X=te.slice(0,5).map(({element:ot})=>En(ot).name).join(", "),st=te.length>5?` +${te.length-5} more`:"",Ke=te[0].element,dt=hs(Ke),Oe=ms(Ke);he({x:ce,y:Se,clientY:_.clientY,element:`${te.length} elements: ${X}${st}`,elementPath:"multi-select",boundingBox:{x:oe.left,y:oe.top+window.scrollY,width:oe.right-oe.left,height:oe.bottom-oe.top},isMultiSelect:!0,fullPath:gs(Ke),accessibility:ps(Ke),computedStyles:Oe,computedStylesObj:dt,nearbyElements:us(Ke),cssClasses:Un(Ke),nearbyText:Xn(Ke),sourceFile:vs(Ke)})}else{const oe=Math.abs(P-p),X=Math.abs(W-v);oe>20&&X>20&&he({x:ce,y:Se,clientY:_.clientY,element:"Area selection",elementPath:`region at (${Math.round(p)}, ${Math.round(v)})`,boundingBox:{x:p,y:v+window.scrollY,width:oe,height:X},isMultiSelect:!0})}$e(null)}else h&&(rs.current=!0);jn.current=null,Ht.current=null,Lo(!1),On.current&&(On.current.innerHTML="")};return document.addEventListener("mouseup",a),()=>document.removeEventListener("mouseup",a)},[B,qt]);const Yt=l.useCallback(async(a,_,h)=>{const u=Ie.webhookUrl||R;if(!u||!Ie.webhooksEnabled&&!h)return!1;try{return(await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:a,timestamp:Date.now(),url:typeof window<"u"?window.location.href:void 0,..._})})).ok}catch(p){return console.warn("[Agentation] Webhook failed:",p),!1}},[R,Ie.webhookUrl,Ie.webhooksEnabled]),fi=l.useCallback(a=>{var h;if(!T)return;const _={id:Date.now().toString(),x:T.x,y:T.y,comment:a,element:T.element,elementPath:T.elementPath,timestamp:Date.now(),selectedText:T.selectedText,boundingBox:T.boundingBox,nearbyText:T.nearbyText,cssClasses:T.cssClasses,isMultiSelect:T.isMultiSelect,isFixed:T.isFixed,fullPath:T.fullPath,accessibility:T.accessibility,computedStyles:T.computedStyles,nearbyElements:T.nearbyElements,reactComponents:T.reactComponents,sourceFile:T.sourceFile,elementBoundingBoxes:T.elementBoundingBoxes,...x&&ht?{sessionId:ht,url:typeof window<"u"?window.location.href:void 0,status:"pending"}:{}};pe(u=>[...u,_]),is.current=_.id,re(()=>{is.current=null},300),re(()=>{An(u=>new Set(u).add(_.id))},250),o==null||o(_),Yt("annotation.add",{annotation:_}),os(!0),re(()=>{he(null),os(!1)},150),(h=window.getSelection())==null||h.removeAllRanges(),x&&ht&&$n(x,ht,_).then(u=>{u.id!==_.id&&(pe(p=>p.map(v=>v.id===_.id?{...v,id:u.id}:v)),An(p=>{const v=new Set(p);return v.delete(_.id),v.add(u.id),v}))}).catch(u=>{console.warn("[Agentation] Failed to sync annotation:",u)})},[T,o,Yt,x,ht]),Ws=l.useCallback(()=>{os(!0),re(()=>{he(null),os(!1)},150)},[]),Os=l.useCallback(a=>{const _=A.findIndex(u=>u.id===a),h=A[_];(S==null?void 0:S.id)===a&&(kn(!0),re(()=>{Z(null),le(null),ke([]),kn(!1)},150)),en(a),ss(u=>new Set(u).add(a)),h&&(i==null||i(h),Yt("annotation.delete",{annotation:h})),x&&on(x,a).catch(u=>{console.warn("[Agentation] Failed to delete annotation from server:",u)}),re(()=>{pe(u=>u.filter(p=>p.id!==a)),ss(u=>{const p=new Set(u);return p.delete(a),p}),en(null),_<A.length-1&&(tn(_),re(()=>tn(null),200))},150)},[A,S,i,Yt,x]),ds=l.useCallback(a=>{var _;if(!a){Jt(null),Nt(null),yt([]);return}if(Jt(a.id),(_=a.elementBoundingBoxes)!=null&&_.length){const h=[];for(const u of a.elementBoundingBoxes){const p=u.x+u.width/2,v=u.y+u.height/2-window.scrollY,W=document.elementsFromPoint(p,v).find(O=>!O.closest("[data-annotation-marker]")&&!O.closest("[data-agentation-root]"));W&&h.push(W)}yt(h),Nt(null)}else if(a.boundingBox){const h=a.boundingBox,u=h.x+h.width/2,p=a.isFixed?h.y+h.height/2:h.y+h.height/2-window.scrollY,v=mn(u,p);if(v){const P=v.getBoundingClientRect(),W=P.width/h.width,O=P.height/h.height;W<.5||O<.5?Nt(null):Nt(v)}else Nt(null);yt([])}else Nt(null),yt([])},[]),yi=l.useCallback(a=>{if(!S)return;const _={...S,comment:a};pe(h=>h.map(u=>u.id===S.id?_:u)),r==null||r(_),Yt("annotation.update",{annotation:_}),x&&hr(x,S.id,{comment:a}).catch(h=>{console.warn("[Agentation] Failed to update annotation on server:",h)}),kn(!0),re(()=>{Z(null),le(null),ke([]),kn(!1)},150)},[S,r,Yt,x]),bi=l.useCallback(()=>{kn(!0),re(()=>{Z(null),le(null),ke([]),kn(!1)},150)},[]),dn=l.useCallback(()=>{const a=A.length,_=Y.length>0||!!F;if(a===0&&Rt.length===0&&!_)return;if(d==null||d(A),Yt("annotations.clear",{annotations:A}),x){Promise.all(A.map(p=>on(x,p.id).catch(v=>{console.warn("[Agentation] Failed to delete annotation from server:",v)})));for(const[,p]of Pn.current)p&&on(x,p).catch(()=>{});Pn.current.clear();for(const[,p]of Dn.current)p&&on(x,p).catch(()=>{});Dn.current.clear()}Pt(!0),It(!0),ai([]);const h=Es.current;if(h){const p=h.getContext("2d");p&&p.clearRect(0,0,h.width,h.height)}(Y.length>0||F)&&(Is(p=>p+1),fo(p=>p+1),re(()=>{De([]),Et(null)},200)),se&&We(!1),nt&&Dt(""),rn.current={rearrange:null,placements:[]},ys(ae);const u=a*30+200;re(()=>{pe([]),An(new Set),localStorage.removeItem(Ss(ae)),Pt(!1)},u),re(()=>It(!1),1500)},[ae,A,Rt,Y,F,se,nt,d,Yt,x]),Fs=l.useCallback(async()=>{const a=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:ae,_=V&&se;let h;if(_){if(Y.length===0&&!F&&!nt)return;h=""}else{if(h=gr(A,a,Ie.outputDetail),!h&&Rt.length===0&&Y.length===0&&!F)return;h||(h=`## Page Feedback: ${a}
`)}if(!_&&Rt.length>0){const u=new Set;for(const W of A)W.drawingIndex!=null&&u.add(W.drawingIndex);const p=Es.current;p&&(p.style.visibility="hidden");const v=[],P=window.scrollY;for(let W=0;W<Rt.length;W++){if(u.has(W))continue;const O=Rt[W];if(O.points.length<2)continue;const G=O.fixed?O.points:O.points.map(_t=>({x:_t.x,y:_t.y-P}));let te=1/0,ce=1/0,Se=-1/0,oe=-1/0;for(const _t of G)te=Math.min(te,_t.x),ce=Math.min(ce,_t.y),Se=Math.max(Se,_t.x),oe=Math.max(oe,_t.y);const X=Se-te,st=oe-ce,Ke=Math.hypot(X,st),dt=G[0],Oe=G[G.length-1],ot=Math.hypot(Oe.x-dt.x,Oe.y-dt.y);let _e;const ye=ot<Ke*.35,mt=X/Math.max(st,1);if(ye&&Ke>20){const _t=Math.max(X,st)*.15;let sn=0;for(const un of G){const ki=un.x-te<_t,ji=Se-un.x<_t,Ci=un.y-ce<_t,Si=oe-un.y<_t;(ki||ji)&&(Ci||Si)&&sn++}_e=sn>G.length*.15?"box":"circle"}else mt>3&&st<40?_e="underline":ot>Ke*.5?_e="arrow":_e="drawing";const tt=Math.min(10,G.length),kt=Math.max(1,Math.floor(G.length/tt)),$t=new Set,pt=[],Yn=[dt];for(let _t=kt;_t<G.length-1;_t+=kt)Yn.push(G[_t]);Yn.push(Oe);for(const _t of Yn){const sn=mn(_t.x,_t.y);if(!sn||$t.has(sn)||jt(sn,"[data-feedback-toolbar]"))continue;$t.add(sn);const{name:un}=En(sn);pt.includes(un)||pt.push(un)}const _n=`${Math.round(te)},${Math.round(ce)} → ${Math.round(Se)},${Math.round(oe)}`;let nn;(_e==="circle"||_e==="box")&&pt.length>0?nn=`${_e==="box"?"Boxed":"Circled"} **${pt[0]}**${pt.length>1?` (and ${pt.slice(1).join(", ")})`:""} (region: ${_n})`:_e==="underline"&&pt.length>0?nn=`Underlined **${pt[0]}** (${_n})`:_e==="arrow"&&pt.length>=2?nn=`Arrow from **${pt[0]}** to **${pt[pt.length-1]}** (${Math.round(dt.x)},${Math.round(dt.y)} → ${Math.round(Oe.x)},${Math.round(Oe.y)})`:pt.length>0?nn=`${_e==="arrow"?"Arrow":"Drawing"} near **${pt.join("**, **")}** (region: ${_n})`:nn=`Drawing at ${_n}`,v.push(nn)}p&&(p.style.visibility=""),v.length>0&&(h+=`
**Drawings:**
`,v.forEach((W,O)=>{h+=`${O+1}. ${W}
`}))}if((Y.length>0||_&&nt)&&(h+=`
`+cr(Y,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:se,wireframePurpose:nt||void 0},Ie.outputDetail)),F){const u=dr(F,Ie.outputDetail,{width:window.innerWidth,height:window.innerHeight});u&&(h+=`
`+u)}if($)try{await navigator.clipboard.writeText(h)}catch{}g==null||g(h),Je(!0),re(()=>Je(!1),2e3),Ie.autoClearAfterCopy&&re(()=>dn(),500)},[A,Rt,Y,F,se,V,Qt,nt,ae,Ie.outputDetail,an,Ie.autoClearAfterCopy,dn,$,g]),Hs=l.useCallback(async()=>{const a=typeof window<"u"?window.location.pathname+window.location.search+window.location.hash:ae;let _=gr(A,a,Ie.outputDetail);if(!_&&Y.length===0&&!F)return;if(_||(_=`## Page Feedback: ${a}
`),Y.length>0&&(_+=`
`+cr(Y,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:se,wireframePurpose:nt||void 0},Ie.outputDetail)),F){const u=dr(F,Ie.outputDetail,{width:window.innerWidth,height:window.innerHeight});u&&(_+=`
`+u)}m&&m(_,A),gt("sending"),await new Promise(u=>re(u,150));const h=await Yt("submit",{output:_,annotations:A},!0);gt(h?"sent":"failed"),re(()=>gt("idle"),2500),h&&Ie.autoClearAfterCopy&&re(()=>dn(),500)},[m,Yt,A,Y,F,se,Qt,ae,Ie.outputDetail,an,Ie.autoClearAfterCopy,dn]);l.useEffect(()=>{if(!vn)return;const a=10,_=u=>{const p=u.clientX-vn.x,v=u.clientY-vn.y,P=Math.sqrt(p*p+v*v);if(!cn&&P>a&&No(!0),cn||P>a){let W=vn.toolbarX+p,O=vn.toolbarY+v;const G=20,te=337,ce=44,oe=te-(B?zt==="connected"?297:257:44),X=G-oe,st=window.innerWidth-G-te;W=Math.max(X,Math.min(st,W)),O=Math.max(G,Math.min(window.innerHeight-ce-G,O)),Bs({x:W,y:O})}},h=()=>{cn&&(Ps.current=!0),No(!1),Mo(null)};return document.addEventListener("mousemove",_),document.addEventListener("mouseup",h),()=>{document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",h)}},[vn,cn,B,zt]);const wi=l.useCallback(a=>{if(a.target.closest("button")||a.target.closest("[data-agentation-settings-panel]"))return;const _=a.currentTarget.parentElement;if(!_)return;const h=_.getBoundingClientRect(),u=(qe==null?void 0:qe.x)??h.left,p=(qe==null?void 0:qe.y)??h.top;Mo({x:a.clientX,y:a.clientY,toolbarX:u,toolbarY:p})},[qe]);if(l.useEffect(()=>{if(!qe)return;const a=()=>{let p=qe.x,v=qe.y;const O=20-(337-(B?zt==="connected"?297:257:44)),G=window.innerWidth-20-337;p=Math.max(O,Math.min(G,p)),v=Math.max(20,Math.min(window.innerHeight-44-20,v)),(p!==qe.x||v!==qe.y)&&Bs({x:p,y:v})};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[qe,B,zt]),l.useEffect(()=>{const a=_=>{const h=_.target,u=h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable;if(_.key==="Escape"){if(V){Ce?ve(null):as();return}if(At){Ls(!1);return}if(ct.length>0){wn([]);return}T||B&&(wt(),U(!1))}if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key==="f"||_.key==="F")){_.preventDefault(),wt(),B?To():U(!0);return}if(!(u||_.metaKey||_.ctrlKey)&&((_.key==="p"||_.key==="P")&&(_.preventDefault(),wt(),zs()),(_.key==="l"||_.key==="L")&&(_.preventDefault(),wt(),At&&Ls(!1),L&&K(!1),T&&Ws(),V?as():Pe(!0)),(_.key==="h"||_.key==="H")&&A.length>0&&(_.preventDefault(),wt(),I(p=>!p)),(_.key==="c"||_.key==="C")&&(A.length>0||Y.length>0||F)&&(_.preventDefault(),wt(),Fs()),(_.key==="x"||_.key==="X")&&(A.length>0||Y.length>0||F)&&(_.preventDefault(),wt(),dn(),Y.length>0&&De([]),F&&Et(null)),_.key==="s"||_.key==="S")){const p=Xt(Ie.webhookUrl)||Xt(R||"");A.length>0&&p&&ft==="idle"&&(_.preventDefault(),wt(),Hs())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[B,At,V,Ce,Y,F,T,A.length,Ie.webhookUrl,R,ft,Hs,zs,Fs,dn,ct]),!ee||ne)return null;const Hn=A.length>0,Sn=A.filter(a=>!Io.has(a.id)&&a.kind!=="placement"&&a.kind!=="rearrange"),vi=Sn.length>0,Wo=A.filter(a=>Io.has(a.id)),Oo=a=>{const v=a.x/100*window.innerWidth,P=typeof a.y=="string"?parseFloat(a.y):a.y,W={};window.innerHeight-P-22-10<80&&(W.top="auto",W.bottom="calc(100% + 10px)");const G=v-200/2,te=10;if(G<te){const ce=te-G;W.left=`calc(50% + ${ce}px)`}else if(G+200>window.innerWidth-te){const ce=G+200-(window.innerWidth-te);W.left=`calc(50% - ${ce}px)`}return W};return _o.createPortal(e.jsxs("div",{ref:Le,style:{display:"contents"},"data-agentation-theme":Ft?"dark":"light","data-agentation-accent":Ie.annotationColorId,"data-agentation-root":"",children:[e.jsx("div",{className:`${E.toolbar}${k?` ${k}`:""}`,"data-feedback-toolbar":!0,"data-agentation-toolbar":!0,style:qe?{left:qe.x,top:qe.y,right:"auto",bottom:"auto"}:void 0,children:e.jsxs("div",{className:`${E.toolbarContainer} ${B?E.expanded:E.collapsed} ${jo?E.entrance:""} ${z?E.hiding:""} ${!Ie.webhooksEnabled&&(Xt(Ie.webhookUrl)||Xt(R||""))?E.serverConnected:""}`,onClick:B?void 0:a=>{if(Ps.current){Ps.current=!1,a.preventDefault();return}U(!0)},onMouseDown:wi,role:B?void 0:"button",tabIndex:B?-1:0,title:B?void 0:"Start feedback mode",children:[e.jsxs("div",{className:`${E.toggleContent} ${B?E.hidden:E.visible}`,children:[e.jsx(Ai,{size:24}),vi&&e.jsx("span",{className:`${E.badge} ${B?E.fadeOut:""} ${jo?E.entrance:""}`,children:Sn.length})]}),e.jsxs("div",{className:`${E.controlsContent} ${B?E.visible:E.hidden} ${qe&&qe.y<100?E.tooltipBelow:""} ${Be||L?E.tooltipsHidden:""} ${wo?E.tooltipsInSession:""}`,onMouseEnter:di,onMouseLeave:_i,children:[e.jsxs("div",{className:`${E.buttonWrapper} ${qe&&qe.x<120?E.buttonWrapperAlignLeft:""}`,children:[e.jsx("button",{className:E.controlButton,onClick:a=>{a.stopPropagation(),wt(),zs()},"data-active":b,children:e.jsx(Hi,{size:24,isPaused:b})}),e.jsxs("span",{className:E.buttonTooltip,children:[b?"Resume animations":"Pause animations",e.jsx("span",{className:E.shortcut,children:"P"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:`${E.controlButton} ${Ft?"":E.light}`,onClick:a=>{a.stopPropagation(),wt(),At&&Ls(!1),L&&K(!1),T&&Ws(),V?as():Pe(!0)},"data-active":V,style:V&&se?{color:"#f97316",background:"rgba(249, 115, 22, 0.25)"}:void 0,children:e.jsx(Ji,{size:21})}),e.jsxs("span",{className:E.buttonTooltip,children:[V?"Exit layout mode":"Layout mode",e.jsx("span",{className:E.shortcut,children:"L"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:a=>{a.stopPropagation(),wt(),I(!Te)},disabled:!Hn||V,children:e.jsx(Fi,{size:24,isOpen:Te})}),e.jsxs("span",{className:E.buttonTooltip,children:[Te?"Hide markers":"Show markers",e.jsx("span",{className:E.shortcut,children:"H"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:`${E.controlButton} ${Ae?E.statusShowing:""}`,onClick:a=>{a.stopPropagation(),wt(),Fs()},disabled:V&&se?Y.length===0&&!((Fo=F==null?void 0:F.sections)!=null&&Fo.length):!Hn&&Rt.length===0&&Y.length===0&&!((Ho=F==null?void 0:F.sections)!=null&&Ho.length),"data-active":Ae,children:e.jsx(Wi,{size:24,copied:Ae,tint:V&&se&&(Y.length>0||(Yo=F==null?void 0:F.sections)!=null&&Yo.length)?"#f97316":void 0})}),e.jsxs("span",{className:E.buttonTooltip,children:[V&&se?"Copy layout":"Copy feedback",e.jsx("span",{className:E.shortcut,children:"C"})]})]}),e.jsxs("div",{className:`${E.buttonWrapper} ${E.sendButtonWrapper} ${B&&!Ie.webhooksEnabled&&(Xt(Ie.webhookUrl)||Xt(R||""))?E.sendButtonVisible:""}`,children:[e.jsxs("button",{className:`${E.controlButton} ${ft==="sent"||ft==="failed"?E.statusShowing:""}`,onClick:a=>{a.stopPropagation(),wt(),Hs()},disabled:!Hn||!Xt(Ie.webhookUrl)&&!Xt(R||"")||ft==="sending","data-no-hover":ft==="sent"||ft==="failed",tabIndex:Xt(Ie.webhookUrl)||Xt(R||"")?0:-1,children:[e.jsx(Oi,{size:24,state:ft}),Hn&&ft==="idle"&&e.jsx("span",{className:E.buttonBadge,children:A.length})]}),e.jsxs("span",{className:E.buttonTooltip,children:["Send Annotations",e.jsx("span",{className:E.shortcut,children:"S"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:a=>{a.stopPropagation(),wt(),dn()},disabled:!Hn&&Rt.length===0&&Y.length===0&&!((Xo=F==null?void 0:F.sections)!=null&&Xo.length),"data-danger":!0,children:e.jsx(Xi,{size:24})}),e.jsxs("span",{className:E.buttonTooltip,children:["Clear all",e.jsx("span",{className:E.shortcut,children:"X"})]})]}),e.jsxs("div",{className:E.buttonWrapper,children:[e.jsx("button",{className:E.controlButton,onClick:a=>{a.stopPropagation(),wt(),V&&as(),K(!L)},children:e.jsx(Yi,{size:24})}),x&&zt!=="disconnected"&&e.jsx("span",{className:`${E.mcpIndicator} ${E[zt]} ${L?E.hidden:""}`,title:zt==="connected"?"MCP Connected":"MCP Connecting..."}),e.jsx("span",{className:E.buttonTooltip,children:"Settings"})]}),e.jsx("div",{className:E.divider}),e.jsxs("div",{className:`${E.buttonWrapper} ${qe&&typeof window<"u"&&qe.x>window.innerWidth-120?E.buttonWrapperAlignRight:""}`,children:[e.jsx("button",{className:E.controlButton,onClick:a=>{a.stopPropagation(),wt(),To()},children:e.jsx(Ui,{size:24})}),e.jsxs("span",{className:E.buttonTooltip,children:["Exit",e.jsx("span",{className:E.shortcut,children:"Esc"})]})]})]}),e.jsx(Nl,{visible:V&&B,activeType:Ce,onSelect:a=>{ve(Ce===a?null:a)},isDarkMode:Ft,sectionCount:(F==null?void 0:F.sections.length)??0,onDetectSections:()=>{const a=Al(),_=(F==null?void 0:F.sections)??[],h=new Set(_.map(P=>P.selector)),u=a.filter(P=>!h.has(P.selector)),p=[..._,...u],v=[...(F==null?void 0:F.originalOrder)??[],...u.map(P=>P.id)];Et({sections:p,originalOrder:v,detectedAt:Date.now()})},placementCount:Y.length,onClearPlacements:()=>{Is(a=>a+1),fo(a=>a+1),re(()=>{Et({sections:[],originalOrder:[],detectedAt:Date.now()})},200)},blankCanvas:se,onBlankCanvasChange:a=>{const _={sections:[],originalOrder:[],detectedAt:Date.now()};a?($s.current={rearrange:F,placements:Y},Et(rn.current.rearrange||_),De(rn.current.placements),ve(null)):(rn.current={rearrange:F,placements:Y},Et($s.current.rearrange||_),De($s.current.placements)),We(a)},wireframePurpose:nt,onWireframePurposeChange:Dt,Tooltip:gn,onDragStart:(a,_)=>{_.preventDefault();const h=H[a];let u=null,p=!1;const v=_.clientX,P=_.clientY,W=_.target.closest("[data-feedback-toolbar]"),O=(W==null?void 0:W.getBoundingClientRect().top)??window.innerHeight,G=ce=>{const Se=ce.clientX-v,oe=ce.clientY-P;if(!p&&(Math.abs(Se)>4||Math.abs(oe)>4)&&(p=!0,u=document.createElement("div"),u.className=`${C.dragPreview}${se?` ${C.dragPreviewWireframe}`:""}`,document.body.appendChild(u)),!u)return;const X=Math.max(0,O-ce.clientY),st=Math.min(1,X/180),Ke=1-Math.pow(1-st,2),dt=28,Oe=20,ot=Math.min(140,h.width*.18),_e=Math.min(90,h.height*.18),ye=dt+(ot-dt)*Ke,mt=Oe+(_e-Oe)*Ke;u.style.width=`${ye}px`,u.style.height=`${mt}px`,u.style.left=`${ce.clientX-ye/2}px`,u.style.top=`${ce.clientY-mt/2}px`,u.style.opacity=`${.5+.5*Ke}`,u.textContent=Ke>.25?a:""},te=ce=>{if(window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",te),u&&document.body.removeChild(u),p){const Se=h.width,oe=h.height,X=window.scrollY,st=Math.max(0,ce.clientX-Se/2),Ke=Math.max(0,ce.clientY+X-oe/2),dt={id:`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type:a,x:st,y:Ke,width:Se,height:oe,scrollY:X,timestamp:Date.now()};De(Oe=>[...Oe,dt]),ve(null),Bn.current=new Set,xo(Oe=>Oe+1)}};window.addEventListener("mousemove",G),window.addEventListener("mouseup",te)}}),e.jsx(Vc,{settings:Ie,onSettingsChange:a=>ui(_=>({..._,...a})),isDarkMode:Ft,onToggleTheme:hi,isDevMode:mi,connectionStatus:zt,endpoint:x,isVisible:q,toolbarNearBottom:!!qe&&qe.y<230,settingsPage:Me,onSettingsPageChange:fe,onHideToolbar:xi})]})}),(V||He)&&e.jsx("div",{className:`${C.blankCanvas} ${ut?C.visible:""} ${Lt?C.gridActive:""}`,style:{"--canvas-opacity":bt},"data-feedback-toolbar":!0}),V&&se&&ut&&e.jsxs("div",{className:C.wireframeNotice,"data-feedback-toolbar":!0,children:[e.jsxs("div",{className:C.wireframeOpacityRow,children:[e.jsx("span",{className:C.wireframeOpacityLabel,children:"Toggle Opacity"}),e.jsx("input",{type:"range",className:C.wireframeOpacitySlider,min:0,max:1,step:.01,value:bt,onChange:a=>fn(Number(a.target.value))})]}),e.jsxs("div",{className:C.wireframeNoticeTitleRow,children:[e.jsx("span",{className:C.wireframeNoticeTitle,children:"Wireframe Mode"}),e.jsx("span",{className:C.wireframeNoticeDivider}),e.jsx("button",{className:C.wireframeStartOver,onClick:()=>{Is(a=>a+1),Et({sections:[],originalOrder:[],detectedAt:Date.now()}),rn.current={rearrange:null,placements:[]},Dt(""),ys(ae)},children:"Start Over"})]}),"Drag components onto the canvas.",e.jsx("br",{}),"Copied output will only include the wireframed layout."]}),(V||He)&&e.jsx(vl,{placements:Y,onChange:De,activeComponent:He?null:Ce,onActiveComponentChange:ve,isDarkMode:Ft,exiting:He,onInteractionChange:yn,passthrough:!Ce,extraSnapRects:F==null?void 0:F.sections.map(a=>a.currentRect),deselectSignal:ni,clearSignal:ri,wireframe:se,onSelectionChange:(a,_)=>{Bn.current=a,_||(ts.current=new Set,oi(h=>h+1))},onDragMove:(a,_)=>{const h=ts.current;if(!(!h.size||!F)){if(!Tt.current){Tt.current=new Map;for(const u of F.sections)h.has(u.id)&&Tt.current.set(u.id,{x:u.currentRect.x,y:u.currentRect.y})}for(const u of F.sections){if(!h.has(u.id)||!Tt.current.get(u.id))continue;const v=document.querySelector(`[data-rearrange-section="${u.id}"]`);v&&(v.style.transform=`translate(${a}px, ${_}px)`)}}},onDragEnd:(a,_,h)=>{const u=ts.current,p=Tt.current;if(Tt.current=null,!(!u.size||!F||!p)){for(const v of u){const P=document.querySelector(`[data-rearrange-section="${v}"]`);P&&(P.style.transform="")}h&&Et(v=>v&&{...v,sections:v.sections.map(P=>{const W=p.get(P.id);return W?{...P,currentRect:{...P.currentRect,x:Math.max(0,W.x+a),y:Math.max(0,W.y+_)}}:P})})}}}),(V||He)&&F&&e.jsx(Ol,{rearrangeState:F,onChange:Et,isDarkMode:Ft,exiting:He,blankCanvas:se,extraSnapRects:Y.map(a=>({x:a.x,y:a.y,width:a.width,height:a.height})),clearSignal:ii,deselectSignal:si,onSelectionChange:(a,_)=>{ts.current=a,_||(Bn.current=new Set,xo(h=>h+1))},onDragMove:(a,_)=>{const h=Bn.current;if(h.size){if(!Tt.current){Tt.current=new Map;for(const u of Y)h.has(u.id)&&Tt.current.set(u.id,{x:u.x,y:u.y})}for(const u of h){const p=document.querySelector(`[data-design-placement="${u}"]`);p&&(p.style.transform=`translate(${a}px, ${_}px)`)}}},onDragEnd:(a,_,h)=>{const u=Bn.current,p=Tt.current;if(Tt.current=null,!(!u.size||!p)){for(const v of u){const P=document.querySelector(`[data-design-placement="${v}"]`);P&&(P.style.transform="")}h&&De(v=>v.map(P=>{const W=p.get(P.id);return W?{...P,x:Math.max(0,W.x+a),y:Math.max(0,W.y+_)}:P}))}}}),e.jsx("canvas",{ref:Es,className:`${E.drawCanvas} ${At?E.active:""}`,style:{opacity:Ts?1:0,transition:"opacity 0.15s ease"},"data-feedback-toolbar":!0}),e.jsxs("div",{className:E.markersLayer,"data-feedback-toolbar":!0,children:[be&&Sn.filter(a=>!a.isFixed).map((a,_,h)=>e.jsx(xr,{annotation:a,globalIndex:Sn.findIndex(u=>u.id===a.id),layerIndex:_,layerSize:h.length,isExiting:Fe,isClearing:Kt,isAnimated:$o.has(a.id),isHovered:!Fe&&Ut===a.id,isDeleting:xt===a.id,isEditingAny:!!S,renumberFrom:Vt,markerClickBehavior:Ie.markerClickBehavior,tooltipStyle:Oo(a),onHoverEnter:u=>!Fe&&u.id!==is.current&&ds(u),onHoverLeave:()=>ds(null),onClick:u=>Ie.markerClickBehavior==="delete"?Os(u.id):cs(u),onContextMenu:cs},a.id)),be&&!Fe&&Wo.filter(a=>!a.isFixed).map(a=>e.jsx(fr,{annotation:a},a.id))]}),e.jsxs("div",{className:E.fixedMarkersLayer,"data-feedback-toolbar":!0,children:[be&&Sn.filter(a=>a.isFixed).map((a,_,h)=>e.jsx(xr,{annotation:a,globalIndex:Sn.findIndex(u=>u.id===a.id),layerIndex:_,layerSize:h.length,isExiting:Fe,isClearing:Kt,isAnimated:$o.has(a.id),isHovered:!Fe&&Ut===a.id,isDeleting:xt===a.id,isEditingAny:!!S,renumberFrom:Vt,markerClickBehavior:Ie.markerClickBehavior,tooltipStyle:Oo(a),onHoverEnter:u=>!Fe&&u.id!==is.current&&ds(u),onHoverLeave:()=>ds(null),onClick:u=>Ie.markerClickBehavior==="delete"?Os(u.id):cs(u),onContextMenu:cs},a.id)),be&&!Fe&&Wo.filter(a=>a.isFixed).map(a=>e.jsx(fr,{annotation:a,fixed:!0},a.id))]}),B&&e.jsxs("div",{className:E.overlay,"data-feedback-toolbar":!0,style:T||S?{zIndex:99999}:void 0,children:[(ge==null?void 0:ge.rect)&&!T&&!ze&&!qt&&e.jsx("div",{className:`${E.hoverHighlight} ${E.enter}`,style:{left:ge.rect.left,top:ge.rect.top,width:ge.rect.width,height:ge.rect.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)"}}),ct.filter(a=>document.contains(a.element)).map((a,_)=>{const h=a.element.getBoundingClientRect(),u=ct.length>1;return e.jsx("div",{className:u?E.multiSelectOutline:E.singleSelectOutline,style:{position:"fixed",left:h.left,top:h.top,width:h.width,height:h.height,...u?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}},_)}),Ut&&!T&&(()=>{var p;const a=A.find(v=>v.id===Ut);if(!(a!=null&&a.boundingBox))return null;if((p=a.elementBoundingBoxes)!=null&&p.length)return Ze.length>0?Ze.filter(v=>document.contains(v)).map((v,P)=>{const W=v.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:W.left,top:W.top,width:W.width,height:W.height}},`hover-outline-live-${P}`)}):a.elementBoundingBoxes.map((v,P)=>e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:v.x,top:v.y-Re,width:v.width,height:v.height}},`hover-outline-${P}`));const _=Zt&&document.contains(Zt)?Zt.getBoundingClientRect():null,h=_?{x:_.left,y:_.top,width:_.width,height:_.height}:{x:a.boundingBox.x,y:a.isFixed?a.boundingBox.y:a.boundingBox.y-Re,width:a.boundingBox.width,height:a.boundingBox.height},u=a.isMultiSelect;return e.jsx("div",{className:`${u?E.multiSelectOutline:E.singleSelectOutline} ${E.enter}`,style:{left:h.x,top:h.y,width:h.width,height:h.height,...u?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}})})(),ge&&!T&&!ze&&!qt&&e.jsxs("div",{className:`${E.hoverTooltip} ${E.enter}`,style:{left:Math.max(8,Math.min(J.x,window.innerWidth-100)),top:Math.max(J.y-(ge.reactComponents?48:32),8)},children:[ge.reactComponents&&e.jsx("div",{className:E.hoverReactPath,children:ge.reactComponents}),e.jsx("div",{className:E.hoverElementName,children:ge.elementName})]}),T&&e.jsxs(e.Fragment,{children:[(Uo=T.multiSelectElements)!=null&&Uo.length?T.multiSelectElements.filter(a=>document.contains(a)).map((a,_)=>{const h=a.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${zn?E.exit:E.enter}`,style:{left:h.left,top:h.top,width:h.width,height:h.height}},`pending-multi-${_}`)}):T.targetElement&&document.contains(T.targetElement)?(()=>{const a=T.targetElement.getBoundingClientRect();return e.jsx("div",{className:`${E.singleSelectOutline} ${zn?E.exit:E.enter}`,style:{left:a.left,top:a.top,width:a.width,height:a.height,borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}})})():T.boundingBox&&e.jsx("div",{className:`${T.isMultiSelect?E.multiSelectOutline:E.singleSelectOutline} ${zn?E.exit:E.enter}`,style:{left:T.boundingBox.x,top:T.boundingBox.y-Re,width:T.boundingBox.width,height:T.boundingBox.height,...T.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}),(()=>{const a=T.x,_=T.isFixed?T.y:T.y-Re;return e.jsxs(e.Fragment,{children:[e.jsx(Tc,{x:a,y:_,isMultiSelect:T.isMultiSelect,isExiting:zn}),e.jsx(js,{ref:Bo,element:T.element,selectedText:T.selectedText,computedStyles:T.computedStylesObj,placeholder:T.element==="Area selection"?"What should change in this area?":T.isMultiSelect?"Feedback for this group of elements...":"What should change?",onSubmit:fi,onCancel:Ws,isExiting:zn,lightMode:!Ft,accentColor:T.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:{left:Math.max(160,Math.min(window.innerWidth-160,a/100*window.innerWidth)),..._>window.innerHeight-290?{bottom:window.innerHeight-_+20}:{top:_+20}}})]})})()]}),S&&e.jsxs(e.Fragment,{children:[(Vo=S.elementBoundingBoxes)!=null&&Vo.length?Ee.length>0?Ee.filter(a=>document.contains(a)).map((a,_)=>{const h=a.getBoundingClientRect();return e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:h.left,top:h.top,width:h.width,height:h.height}},`edit-multi-live-${_}`)}):S.elementBoundingBoxes.map((a,_)=>e.jsx("div",{className:`${E.multiSelectOutline} ${E.enter}`,style:{left:a.x,top:a.y-Re,width:a.width,height:a.height}},`edit-multi-${_}`)):(()=>{const a=xe&&document.contains(xe)?xe.getBoundingClientRect():null,_=a?{x:a.left,y:a.top,width:a.width,height:a.height}:S.boundingBox?{x:S.boundingBox.x,y:S.isFixed?S.boundingBox.y:S.boundingBox.y-Re,width:S.boundingBox.width,height:S.boundingBox.height}:null;return _?e.jsx("div",{className:`${S.isMultiSelect?E.multiSelectOutline:E.singleSelectOutline} ${E.enter}`,style:{left:_.x,top:_.y,width:_.width,height:_.height,...S.isMultiSelect?{}:{borderColor:"color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)",backgroundColor:"color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)"}}}):null})(),e.jsx(js,{ref:Po,element:S.element,selectedText:S.selectedText,computedStyles:Bl(S.computedStyles),placeholder:"Edit your feedback...",initialValue:S.comment,submitLabel:"Save",onSubmit:yi,onCancel:bi,onDelete:()=>Os(S.id),isExiting:pi,lightMode:!Ft,accentColor:S.isMultiSelect?"var(--agentation-color-green)":"var(--agentation-color-accent)",style:(()=>{const a=S.isFixed?S.y:S.y-Re;return{left:Math.max(160,Math.min(window.innerWidth-160,S.x/100*window.innerWidth)),...a>window.innerHeight-290?{bottom:window.innerHeight-a+20}:{top:a+20}}})()})]}),qt&&e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:Wn,className:E.dragSelection}),e.jsx("div",{ref:On,className:E.highlightsContainer})]})]})]}),document.body)}/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gc=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ur=(...t)=>t.filter((n,s,o)=>!!n&&n.trim()!==""&&o.indexOf(n)===s).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Kc={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=l.forwardRef(({color:t="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:i="",children:r,iconNode:d,...g},m)=>l.createElement("svg",{ref:m,...Kc,width:n,height:n,stroke:t,strokeWidth:o?Number(s)*24/Number(n):s,className:Ur("lucide",i),...g},[...d.map(([$,x])=>l.createElement($,x)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=(t,n)=>{const s=l.forwardRef(({className:o,...i},r)=>l.createElement(Jc,{ref:r,iconNode:n,className:Ur(`lucide-${Gc(t)}`,o),...i}));return s.displayName=`${t}`,s};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zc=de("Aperture",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=de("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ed=de("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const td=de("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nd=de("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=de("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=de("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sd=de("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const od=de("CirclePlay",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const go=de("Clapperboard",[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",key:"1tn4o7"}],["path",{d:"m6.2 5.3 3.1 3.9",key:"iuk76l"}],["path",{d:"m12.4 3.4 3.1 4",key:"6hsd6n"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",key:"ltgou9"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rd=de("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const id=de("Cpu",[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=de("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=de("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ld=de("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cd=de("GitFork",[["circle",{cx:"12",cy:"18",r:"3",key:"1mpf1b"}],["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["path",{d:"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9",key:"1uq4wg"}],["path",{d:"M12 12v3",key:"158kv8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dd=de("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=de("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ud=de("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=de("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hd=de("Languages",[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const md=de("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pd=de("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=de("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=de("MessageSquareText",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M13 8H7",key:"14i4kc"}],["path",{d:"M17 12H7",key:"16if0g"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=de("MicVocal",[["path",{d:"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",key:"80a601"}],["path",{d:"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",key:"j0ngtp"}],["circle",{cx:"16",cy:"7",r:"5",key:"d08jfb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fd=de("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gr=de("MousePointer2",[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=de("Music2",[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=de("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=de("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=de("Quote",[["path",{d:"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"rib7q0"}],["path",{d:"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",key:"1ymkrd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=de("Replace",[["path",{d:"M14 4a2 2 0 0 1 2-2",key:"1w2hp7"}],["path",{d:"M16 10a2 2 0 0 1-2-2",key:"shjach"}],["path",{d:"M20 2a2 2 0 0 1 2 2",key:"188mtx"}],["path",{d:"M22 8a2 2 0 0 1-2 2",key:"ddf4tu"}],["path",{d:"m3 7 3 3 3-3",key:"x25e72"}],["path",{d:"M6 10V5a3 3 0 0 1 3-3h1",key:"3y3t5z"}],["rect",{x:"2",y:"14",width:"8",height:"8",rx:"2",key:"4rksxw"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=de("Scissors",[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=de("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=de("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=de("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=de("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nd=de("SunMedium",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 3v1",key:"1asbbs"}],["path",{d:"M12 20v1",key:"1wcdkc"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M20 12h1",key:"1vloll"}],["path",{d:"m18.364 5.636-.707.707",key:"1hakh0"}],["path",{d:"m6.343 17.657-.707.707",key:"18m9nf"}],["path",{d:"m5.636 5.636.707.707",key:"1xv1c5"}],["path",{d:"m17.657 17.657.707.707",key:"vl76zb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=de("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=de("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Id=de("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jr=de("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=de("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ed=de("Video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ns=de("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=de("Workflow",[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=de("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=de("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);function Zr({className:t="",size:n=28}){return e.jsxs("div",{className:`flex items-center gap-2 ${t}`,children:[e.jsxs("svg",{width:n,height:n,viewBox:"0 0 32 32",fill:"none","aria-hidden":!0,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"pl-g",x1:"0",y1:"0",x2:"1",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D"}),e.jsx("stop",{offset:"55%",stopColor:"#FF3D7F"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF"})]})}),e.jsx("rect",{width:"32",height:"32",rx:"8",fill:"#0E0E14"}),e.jsx("path",{d:"M8 22 L8 10 L14 10 Q20 10 20 14.5 Q20 18.5 15 19 L12 19 L12 22 Z M12 13 L12 16 L14.5 16 Q16.2 16 16.2 14.5 Q16.2 13 14.5 13 Z",fill:"url(#pl-g)"}),e.jsx("circle",{cx:"23.5",cy:"20",r:"2.4",fill:"url(#pl-g)"})]}),e.jsxs("div",{className:"leading-none",children:[e.jsx("div",{className:"font-display text-[17px] font-semibold tracking-tight text-white",children:"PineLine"}),e.jsx("div",{className:"mt-0.5 text-[9px] font-medium uppercase tracking-[0.25em] text-ink-2",children:"AI Film Pipeline"})]})]})}const kr=[{to:"/",label:"首页"},{to:"/studio",label:"Studio"},{to:"/templates",label:"模板"},{to:"/showcase",label:"精选"},{to:"/pricing",label:"定价"}];function Dd(){const[t,n]=l.useState(!1),[s,o]=l.useState(!1);return l.useEffect(()=>{const i=()=>n(window.scrollY>8);return i(),window.addEventListener("scroll",i,{passive:!0}),()=>window.removeEventListener("scroll",i)},[]),e.jsxs(Ve.header,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6,ease:"easeOut"},className:`fixed inset-x-0 top-0 z-50 transition-all ${t?"border-b border-white/[0.06] bg-bg-0/70 backdrop-blur-xl":"border-b border-transparent"}`,children:[e.jsxs("div",{className:"container-x flex h-16 items-center justify-between",children:[e.jsx(Ct,{to:"/",className:"flex items-center",children:e.jsx(Zr,{})}),e.jsx("nav",{className:"hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 md:flex",children:kr.map(i=>e.jsx(Qo,{to:i.to,end:i.to==="/",className:({isActive:r})=>`rounded-full px-4 py-1.5 text-sm font-medium transition ${r?"bg-white/[0.08] text-white":"text-ink-1 hover:text-white"}`,children:i.label},i.to))}),e.jsxs("div",{className:"hidden items-center gap-3 md:flex",children:[e.jsx("a",{href:"https://docs.tapnow.ai/en/docs",target:"_blank",rel:"noreferrer",className:"text-sm font-medium text-ink-1 transition hover:text-white",children:"文档"}),e.jsxs(Ct,{to:"/studio",className:"btn-primary",children:[e.jsx(Bt,{size:14}),"开始创作"]})]}),e.jsx("button",{"aria-label":"toggle menu",className:"rounded-full border border-white/10 p-2 md:hidden",onClick:()=>o(i=>!i),children:s?e.jsx(Bd,{size:18}):e.jsx(gd,{size:18})})]}),s&&e.jsx("div",{className:"border-t border-white/[0.06] bg-bg-0/95 backdrop-blur-xl md:hidden",children:e.jsxs("div",{className:"container-x flex flex-col gap-1 py-3",children:[kr.map(i=>e.jsx(Qo,{to:i.to,end:i.to==="/",onClick:()=>o(!1),className:({isActive:r})=>`rounded-lg px-3 py-2 text-sm font-medium ${r?"bg-white/[0.06] text-white":"text-ink-1"}`,children:i.label},i.to)),e.jsxs(Ct,{to:"/studio",className:"btn-primary mt-2 justify-center",children:[e.jsx(Bt,{size:14}),"开始创作"]})]})})]})}const Td=[{title:"产品",links:[{label:"Studio 工作台",to:"/studio"},{label:"模板库",to:"/templates"},{label:"精选作品",to:"/showcase"},{label:"定价方案",to:"/pricing"}]},{title:"管线",links:[{label:"剧本到分镜",to:"/studio"},{label:"多模型视频生成",to:"/studio"},{label:"虚拟演员 / 数字人",to:"/studio"},{label:"镜头剪辑与声效",to:"/studio"}]},{title:"资源",links:[{label:"更新日志",to:"/"},{label:"教程与指南",to:"/"},{label:"API 文档",to:"/"},{label:"创作者社区",to:"/"}]},{title:"公司",links:[{label:"关于 PineLine",to:"/"},{label:"合作伙伴",to:"/"},{label:"加入我们",to:"/"},{label:"联系商务",to:"/"}]}];function Ad(){return e.jsx("footer",{className:"relative mt-24 border-t border-white/[0.06] bg-bg-0",children:e.jsxs("div",{className:"container-x py-16",children:[e.jsxs("div",{className:"grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]",children:[e.jsxs("div",{children:[e.jsx(Zr,{}),e.jsx("p",{className:"mt-4 max-w-xs text-sm leading-relaxed text-ink-2",children:"PineLine 是面向专业影视与品牌创意的 AIGC 创作管线。从一段文本到一条成片， 由 AI 自动贯通分镜、角色、镜头、生成、剪辑、调色与声效。"}),e.jsx("div",{className:"mt-5 flex gap-2",children:[dd,$d,Pd,pd].map((t,n)=>e.jsx("a",{href:"#",className:"rounded-full border border-white/10 p-2 text-ink-1 transition hover:border-white/25 hover:text-white",children:e.jsx(t,{size:16})},n))})]}),Td.map(t=>e.jsxs("div",{children:[e.jsx("div",{className:"mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-2",children:t.title}),e.jsx("ul",{className:"space-y-2.5",children:t.links.map(n=>e.jsx("li",{children:e.jsx(Ct,{to:n.to,className:"text-sm text-ink-1 transition hover:text-white",children:n.label})},n.label))})]},t.title))]}),e.jsx("div",{className:"divider-grad my-10"}),e.jsxs("div",{className:"flex flex-col items-start justify-between gap-3 text-xs text-ink-2 md:flex-row md:items-center",children:[e.jsxs("div",{children:["© ",new Date().getFullYear()," PineLine Studio. All rights reserved."]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsx("span",{children:"隐私政策"}),e.jsx("span",{children:"服务条款"}),e.jsx("span",{children:"内容合规"}),e.jsx("span",{className:"text-ink-3",children:"v0.1 · Cinematic Pipeline"})]})]})]})})}function zd(){return e.jsxs("div",{className:"relative mx-auto aspect-[16/9] w-full max-w-[1180px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050506] shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-70"}),e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(255,255,255,0.06),transparent_65%)]"}),e.jsxs("div",{className:"absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[11px] text-ink-1 backdrop-blur-xl",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-brand"}),"PineLine Canvas · Agent mode"]}),e.jsx("div",{className:"absolute bottom-5 left-5 z-20 hidden flex-col gap-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl md:flex",children:[vr,Ns,Vr,qr].map((t,n)=>e.jsx("span",{className:`flex h-8 w-8 items-center justify-center rounded-full ${n===1?"bg-white text-black":"bg-white/[0.05] text-ink-1"}`,children:e.jsx(t,{size:15})},n))}),e.jsxs("svg",{className:"absolute inset-0 h-full w-full",viewBox:"0 0 1180 664",preserveAspectRatio:"none",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"heroWireA",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D",stopOpacity:"0.8"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF",stopOpacity:"0.75"})]}),e.jsxs("linearGradient",{id:"heroWireB",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#7C5CFF",stopOpacity:"0.75"}),e.jsx("stop",{offset:"100%",stopColor:"#22D3EE",stopOpacity:"0.8"})]})]}),e.jsx("path",{d:"M 260 245 C 360 245 430 180 532 178",stroke:"url(#heroWireA)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 302 468 C 420 430 498 382 592 356",stroke:"url(#heroWireA)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 745 215 C 842 245 865 315 936 338",stroke:"url(#heroWireB)",strokeWidth:"1.4",fill:"none"}),e.jsx("path",{d:"M 735 382 C 840 430 858 494 936 512",stroke:"url(#heroWireB)",strokeWidth:"1.4",fill:"none"})]}),e.jsx(jr,{x:"7%",y:"24%",title:"Reference frame",subtitle:"雨夜霓虹 · 角色气质",icon:e.jsx(vr,{size:13}),tone:"warm"}),e.jsx(Wd,{}),e.jsx(jr,{x:"43%",y:"13%",title:"图像生成",subtitle:"角色定妆照 · 4 variants",icon:e.jsx(Bt,{size:13}),tone:"portrait",large:!0}),e.jsx(Od,{}),e.jsx(Fd,{}),e.jsx(Hd,{}),e.jsxs(Ve.div,{initial:{x:314,y:250},animate:{x:[314,550,702,938,620,314],y:[250,178,356,338,520,250]},transition:{duration:10,repeat:1/0,ease:"easeInOut"},className:"pointer-events-none absolute left-0 top-0 z-30",children:[e.jsx(Gr,{className:"fill-white text-black drop-shadow",size:18}),e.jsx("div",{className:"ml-4 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black shadow",children:"Agent"})]})]})}function jr({x:t,y:n,title:s,subtitle:o,icon:i,tone:r,large:d}){const g=r==="warm"?"bg-[radial-gradient(circle_at_30%_25%,#FFE8A3_0%,#F3A66C_28%,#6D283E_58%,#071018_100%)]":"bg-[radial-gradient(circle_at_45%_18%,#F9D6BD_0%,#D78B92_26%,#7047A8_58%,#101019_100%)]";return e.jsxs(Ve.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:d?.16:.05},style:{left:t,top:n},className:`absolute z-10 ${d?"w-[310px]":"w-[260px]"} overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl`,children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1",children:[e.jsx("span",{className:"text-brand",children:i}),s]}),e.jsxs("div",{className:`${d?"h-[150px]":"h-[118px]"} ${g} relative overflow-hidden`,children:[e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] opacity-40"}),e.jsx("div",{className:"absolute bottom-3 left-3 rounded-full bg-black/55 px-2 py-1 text-[10px] text-white",children:o})]})]})}function Wd(){return e.jsxs(Ve.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.12},className:"absolute left-[12%] top-[62%] z-10 w-[270px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[11px] font-semibold uppercase text-brand",children:[e.jsx(Qr,{size:13}),"Script context"]}),e.jsx("p",{className:"mt-3 text-xs leading-relaxed text-ink-1",children:"女主穿过雨夜天桥，城市屏幕在她身后熄灭。保留冷蓝主色与湿润地面反光。"}),e.jsxs("div",{className:"mt-3 flex gap-1.5 text-[10px] text-ink-2",children:[e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5",children:"Chapter 02"}),e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5",children:"Neo noir"})]})]})}function Od(){return e.jsxs(Ve.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.24},className:"absolute right-[7%] top-[35%] z-10 w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#101014]/90 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 text-[11px] text-ink-1",children:[e.jsx(Ed,{size:13,className:"text-brand-cyan"}),"视频生成"]}),e.jsxs("div",{className:"relative h-[120px] bg-[linear-gradient(135deg,#06070C_0%,#142A35_34%,#22D3EE_58%,#FF3D7F_100%)]",children:[e.jsx("div",{className:"animate-scan absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-white/15 to-transparent"}),e.jsx("span",{className:"absolute bottom-3 left-3 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white",children:"24fps · 6s · dolly in"})]})]})}function Fd(){return e.jsxs(Ve.div,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},transition:{duration:.6,delay:.32},className:"absolute right-[11%] top-[70%] z-10 w-[230px] rounded-2xl border border-white/10 bg-[#101014]/90 p-4 shadow-card backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-ink-1",children:[e.jsx(qr,{size:13,className:"text-brand-lime"}),"音频生成"]}),e.jsx("div",{className:"mt-4 flex h-12 items-end gap-1",children:[18,30,22,42,28,48,35,25,40,20,32,26].map((t,n)=>e.jsx("span",{className:"w-full rounded-t bg-brand-gradient opacity-80",style:{height:t}},n))})]})}function Hd(){return e.jsxs(Ve.div,{initial:{opacity:0,y:18},animate:{opacity:1,y:0},transition:{duration:.7,delay:.38},className:"absolute bottom-[9%] left-1/2 z-20 w-[430px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#1A1A1E]/95 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs font-medium text-white",children:[e.jsx(Bt,{size:14,className:"text-brand"}),"PineLine Agent"]}),e.jsx("div",{className:"mt-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ink-2",children:"Describe your scene or pick nodes as context..."}),e.jsxs("div",{className:"mt-3 flex items-center justify-between text-[11px] text-ink-2",children:[e.jsx("span",{children:"已选择 Reference frame + Script context"}),e.jsx("button",{className:"rounded-full bg-white px-3 py-1 font-semibold text-black",children:"生成下一步"})]})]})}function Yd(){return e.jsxs("section",{className:"relative overflow-hidden pb-10 pt-28 md:pt-32",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 dot-bg opacity-35 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_32%,#000_28%,transparent_78%)]"}),e.jsx("div",{className:"pointer-events-none absolute left-1/2 top-20 h-[480px] w-[1040px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.12] blur-[150px]"}),e.jsxs("div",{className:"container-x relative",children:[e.jsxs(Ve.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.6},className:"max-w-4xl",children:[e.jsxs("span",{className:"chip",children:[e.jsx("span",{className:"h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand"}),"PineLine Agentic Film Canvas"]}),e.jsxs("h1",{className:"mt-7 max-w-4xl font-display text-display-xl font-semibold leading-[0.98] text-white [word-break:keep-all]",children:["你的影视",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"智能体创意画布"})]}),e.jsx("p",{className:"mt-6 max-w-2xl text-base leading-relaxed text-ink-1 md:text-lg",children:"PineLine 是面向专业影视创作的 AI Agent 工作台。统一调度剧本、图像、音频与视频模型， 把角色、分镜、镜头控制、生成与剪辑连成一张可复用的创意画布。"}),e.jsxs("div",{className:"mt-8 flex flex-col gap-3 sm:flex-row",children:[e.jsxs(Ct,{to:"/studio",className:"btn-light",children:[e.jsx(Bt,{size:14}),"免费开始创作",e.jsx(es,{size:14})]}),e.jsx(Ct,{to:"/templates",className:"btn-ghost",children:"查看工作流模板"})]}),e.jsxs("div",{className:"mt-8 grid max-w-3xl gap-3 text-xs text-ink-2 sm:grid-cols-3",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Ns,{size:13,className:"text-brand"}),"Agent Router · 12+ 模型编排"]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(go,{size:13,className:"text-brand-cyan"}),"Shot Control · 镜头参数可控"]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(Bt,{size:13,className:"text-brand-pink"}),"Recipe Clone · 公开画布可复用"]})]})]}),e.jsx(Ve.div,{initial:{opacity:0,y:40,scale:.97},animate:{opacity:1,y:0,scale:1},transition:{duration:.8,delay:.2,ease:[.22,1,.36,1]},className:"relative mt-14 md:mt-16",children:e.jsx(zd,{})})]})]})}const Xd=["广告公司","导演工作室","短剧厂牌","品牌内容部","MCN 制作团队","动画与游戏预演","商业摄影团队","后期剪辑团队"];function Ud(){return e.jsx("section",{className:"relative py-10 md:py-12",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"flex flex-col gap-5 border-y border-white/[0.06] py-7 md:flex-row md:items-center md:justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"eyebrow",children:"Built For Production Teams"}),e.jsx("p",{className:"mt-2 max-w-xl text-sm leading-relaxed text-ink-1",children:"参考 TapNow 的创意画布范式，PineLine 聚焦影视团队的专业生产场景。"})]}),e.jsx("div",{className:"grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 md:max-w-2xl",children:Xd.map(t=>e.jsx("div",{className:"rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-center text-xs font-medium text-ink-1",children:t},t))})]})})})}const Vd=[{title:"读懂上下文",desc:"选择剧本、参考图、角色或旧镜头，Agent 会把它们作为下一次生成的上下文。"},{title:"拆成任务",desc:"自动把一句创意拆成分镜、镜头、角色、光线、音效和剪辑节点。"},{title:"路由模型",desc:"按任务类型选择图像、视频、音频模型，并保留参数、版本与产物依赖。"}];function Qd(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center",children:[e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Agent"}),e.jsxs("h2",{className:"section-title mt-3",children:["你的 ",e.jsx("span",{className:"text-gradient",children:"AI 执行导演"})]}),e.jsx("p",{className:"mt-4 max-w-lg text-ink-1",children:"TapNow 用自然对话驱动画布，PineLine 在此基础上加入影视生产语义： Agent 不只生成素材，还会管理场景、镜头、角色一致性与下游剪辑依赖。"}),e.jsx("div",{className:"mt-8 space-y-4",children:Vd.map((t,n)=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("span",{className:"mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-white",children:n+1}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-1 text-sm leading-relaxed text-ink-1",children:t.desc})]})]},t.title))}),e.jsxs(Ct,{to:"/studio",className:"btn-primary mt-8",children:["试用 PineLine Agent",e.jsx(es,{size:14})]})]}),e.jsxs(Ve.div,{initial:{opacity:0,scale:.96},whileInView:{opacity:1,scale:1},viewport:{once:!0,margin:"-120px"},transition:{duration:.7},className:"relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#08080B] p-5 shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-50"}),e.jsx("div",{className:"absolute inset-x-10 top-10 h-44 rounded-full bg-brand-gradient opacity-10 blur-[90px]"}),e.jsxs("div",{className:"relative ml-auto mt-10 max-w-[460px] rounded-3xl border border-white/[0.08] bg-[#1A1A1F] p-5 shadow-card",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-semibold text-white",children:[e.jsx(td,{size:16,className:"text-brand"}),"Agent 控制台"]}),e.jsx("span",{className:"rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-ink-2",children:"Context aware"})]}),e.jsxs("div",{className:"mt-5 space-y-3",children:[e.jsx(Cr,{icon:e.jsx(xd,{size:13}),text:"把这段都市悬疑独白拆成 6 个可生成镜头，并保留女主角色一致性。"}),e.jsx(Cr,{icon:e.jsx(Bt,{size:13}),text:"已生成：剧本解析、角色参考、S35 镜头组、雨夜灯光方案。",active:!0})]}),e.jsxs("div",{className:"mt-5 rounded-2xl border border-white/10 bg-black/35 p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs font-semibold text-white",children:[e.jsx(ld,{size:13,className:"text-brand-cyan"}),"下一步推荐"]}),e.jsxs("div",{className:"mt-3 grid gap-2 text-xs text-ink-1 sm:grid-cols-2",children:[e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"生成分镜草图"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"训练角色 LoRA"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"创建镜头控制"}),e.jsx("span",{className:"rounded-xl bg-white/[0.04] px-3 py-2",children:"预估渲染成本"})]})]})]}),e.jsx("div",{className:"relative mt-6 grid gap-3 sm:grid-cols-3",children:["SCRIPT","SCENE","SHOT"].map((t,n)=>e.jsxs("div",{className:"rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur",children:[e.jsx("div",{className:"text-[10px] font-semibold uppercase tracking-[0.16em] text-brand",children:t}),e.jsx("div",{className:"mt-8 h-1.5 rounded-full bg-white/10",children:e.jsx("div",{className:"h-full rounded-full bg-brand-gradient",style:{width:`${76-n*18}%`}})}),e.jsx("p",{className:"mt-3 text-xs text-ink-2",children:["语义拆解","资产绑定","模型路由"][n]})]},t))})]})]})})})}function Cr({icon:t,text:n,active:s}){return e.jsxs("div",{className:`flex gap-3 rounded-2xl p-3 ${s?"bg-white text-black":"bg-white/[0.04] text-ink-1"}`,children:[e.jsx("span",{className:s?"text-black":"text-brand",children:t}),e.jsx("span",{className:"text-sm leading-relaxed",children:n})]})}const qd=[{icon:Zc,title:"专业级镜头控制",desc:"把景别、焦段、机位、旋转、俯仰和缩放直接写进镜头节点，减少随机生成。",panel:"lens"},{icon:Nd,title:"影棚级灯光控制",desc:"用主光、轮廓光、色温和全局亮度统一镜头质感，适合广告与短剧批量镜头。",panel:"light"},{icon:vd,title:"视频对象替换",desc:"替换角色、服装或道具，同时保留构图、光照、运镜和场景连续性。",panel:"replace"}];function Gd(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Creative Controls"}),e.jsxs("h2",{className:"section-title mt-3",children:["从好看的生成，到",e.jsx("span",{className:"text-gradient",children:"可导演的镜头"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"对标 TapNow 的镜头、灯光与替换能力，PineLine 把控制项落到影视团队熟悉的镜头语言中。"})]}),e.jsx("div",{className:"mt-14 grid gap-5 lg:grid-cols-3",children:qd.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-100px"},transition:{duration:.55,delay:n*.08},className:"overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] shadow-card",children:[e.jsxs("div",{className:"p-6",children:[e.jsx(t.icon,{size:20,className:"text-white"}),e.jsx("h3",{className:"mt-5 font-display text-2xl font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-3 text-sm leading-relaxed text-ink-1",children:t.desc})]}),e.jsx(Kd,{kind:t.panel})]},t.title))})]})})}function Kd({kind:t}){return t==="lens"?e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx(nd,{size:14,className:"text-brand"}),"镜头组合"]}),e.jsx("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:["18mm","35mm","50mm","85mm","135mm","200mm"].map((n,s)=>e.jsx("span",{className:`rounded-full border px-3 py-2 ${s===2?"border-white bg-white text-black":"border-white/10 bg-white/[0.04] text-ink-1"}`,children:n},n))}),e.jsx(ks,{label:"旋转",value:"32%"}),e.jsx(ks,{label:"俯仰",value:"62%"})]}):t==="light"?e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx(Sd,{size:14,className:"text-brand-cyan"}),"灯光参数"]}),e.jsx(ks,{label:"亮度",value:"58%"}),e.jsx(ks,{label:"色温 5600K",value:"72%"}),e.jsx("div",{className:"mt-4 grid grid-cols-3 gap-2 text-center text-xs text-ink-1",children:["主光","轮廓光","环境光"].map(n=>e.jsx("span",{className:"rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3",children:n},n))})]}):e.jsxs("div",{className:"border-t border-white/[0.06] bg-black/30 p-5",children:[e.jsxs("div",{className:"relative h-40 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#101018,#29344A_40%,#FF6A3D_100%)]",children:[e.jsx("div",{className:"absolute left-5 top-5 h-20 w-14 rounded-full border-2 border-dashed border-white/70"}),e.jsx("div",{className:"absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white",children:"Actor A"}),e.jsx("div",{className:"absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black",children:"Replace"})]}),e.jsx("p",{className:"mt-3 text-xs leading-relaxed text-ink-2",children:"保留背景、构图与运镜，只替换选中主体。"})]})}function ks({label:t,value:n}){return e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"mb-2 flex justify-between text-xs text-ink-2",children:[e.jsx("span",{children:t}),e.jsx("span",{children:n})]}),e.jsx("div",{className:"h-1.5 rounded-full bg-white/10",children:e.jsx("div",{className:"h-full rounded-full bg-brand-gradient",style:{width:n}})})]})}const Sr=["Veo","Kling","Luma","Sora","Midjourney","GPT Image","Hailuo","Jimeng","Vidu","Flux","Pixverse","Gemini"];function Jd(){return e.jsxs("section",{className:"relative py-16 md:py-20",children:[e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"mb-6 text-center",children:[e.jsx("div",{className:"eyebrow",children:"强大引擎支持"}),e.jsx("p",{className:"mt-2 text-sm text-ink-2",children:"接入图像、视频、音频与语言模型，由 Agent 按镜头任务自动选择最合适的引擎。"})]})}),e.jsx("div",{className:"marquee",children:e.jsx("div",{className:"marquee__track",children:[...Sr,...Sr].map((t,n)=>e.jsxs("div",{className:"flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-brand-gradient"}),e.jsx("span",{className:"whitespace-nowrap font-display text-sm font-medium text-ink-0",children:t})]},n))})})]})}const Zd=[{icon:Qr,title:"剧本 · Script",desc:"粘贴剧本或输入一段描述，AI 自动解析场景、角色、节奏与情绪。",tag:"NLP · Scene Graph",color:"#FF6A3D"},{icon:go,title:"分镜 · Storyboard",desc:"自动生成分镜草图，可拖拽调整镜头顺序、景别与时长。",tag:"Shot Graph",color:"#FF8A3D"},{icon:Vr,title:"镜头 · Shot Design",desc:"设定机位、焦距、运镜、光线与色调，一键对标导演参考。",tag:"Cinematography",color:"#FF3D7F"},{icon:Ns,title:"生成 · Generate",desc:"按镜头智能路由最佳模型，分布式并行生成，支持风格一致性。",tag:"Multi-Model",color:"#7C5CFF"},{icon:kd,title:"剪辑 · Edit",desc:"AI 剪辑节奏，镜头连接与转场，导出时间线到 DaVinci / PR。",tag:"NLE · Timeline",color:"#22D3EE"},{icon:yd,title:"音画 · Sound",desc:"台词配音、配乐、环境音与音效，一体化混音输出。",tag:"TTS · SFX · Score",color:"#B6FF5F"}];function e_(){return e.jsx("section",{id:"pipeline",className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"The PineLine"}),e.jsxs("h2",{className:"section-title mt-3",children:["一条贯穿全流程的 ",e.jsx("span",{className:"text-gradient",children:"影视创作管线"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"从文字到成片的六个阶段，每一步都由专用 AI 模块完成，节点与节点之间可视化连接， 状态、版本、参数全程可追溯。"})]}),e.jsxs("div",{className:"relative mt-16",children:[e.jsx("div",{className:"pointer-events-none absolute inset-x-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"}),e.jsx("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:Zd.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n*.05},className:"card group overflow-hidden",children:[e.jsx("div",{className:"absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-[0.18] blur-3xl transition group-hover:opacity-40",style:{background:t.color}}),e.jsxs("div",{className:"relative flex items-center justify-between",children:[e.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl border border-white/10",style:{background:`linear-gradient(135deg, ${t.color}22, transparent)`,color:t.color},children:e.jsx(t.icon,{size:18})}),e.jsxs("span",{className:"text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-2",children:["0",n+1]})]}),e.jsx("h3",{className:"relative mt-5 font-display text-xl font-semibold text-white",children:t.title}),e.jsx("p",{className:"relative mt-2 text-sm leading-relaxed text-ink-1",children:t.desc}),e.jsxs("div",{className:"relative mt-5 flex items-center justify-between text-xs",children:[e.jsx("span",{className:"chip",children:t.tag}),e.jsx(es,{size:14,className:"text-ink-3 transition group-hover:translate-x-1 group-hover:text-white"})]})]},t.title))})]})]})})}const t_=[{icon:md,title:"无限画布",desc:"任意缩放的工作板，把整部片子铺成一张地图。"},{icon:Gr,title:"克隆配方",desc:"公开作品可 fork 成模板，保留节点、参数、素材与模型路由。"},{icon:Jr,title:"实时协作",desc:"导演、编剧、制片同框评论，评论即批注、版本自动分叉。"},{icon:ud,title:"全链路回溯",desc:"每次生成都带时间线、Seed 与参数，一键回到任意历史版本。"}];function n_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]",children:[e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Board"}),e.jsxs("h2",{className:"section-title mt-3",children:["像",e.jsx("span",{className:"text-gradient",children:"Tapflow"}),"一样开放，",e.jsx("br",{}),"但为影视生产而设计"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"节点代表一次创作动作：文本、参考图、角色、镜头控制、模型生成与剪辑。 你可以从社区克隆配方，也可以在自己的项目里把每一次生成回溯到原始上下文。"}),e.jsx("div",{className:"mt-8 grid grid-cols-2 gap-4",children:t_.map(t=>e.jsxs("div",{className:"card",children:[e.jsx(t.icon,{size:16,className:"text-brand"}),e.jsx("div",{className:"mt-3 text-sm font-semibold text-white",children:t.title}),e.jsx("div",{className:"mt-1 text-xs leading-relaxed text-ink-2",children:t.desc})]},t.title))}),e.jsxs("div",{className:"mt-8 flex items-center gap-3",children:[e.jsxs(Ct,{to:"/studio",className:"btn-primary",children:["打开 Studio",e.jsx(ed,{size:14})]}),e.jsx(Ct,{to:"/templates",className:"btn-ghost",children:"浏览模板"})]})]}),e.jsxs(Ve.div,{initial:{opacity:0,scale:.96},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.8,ease:[.22,1,.36,1]},className:"relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-bg-2 to-bg-1 shadow-card",children:[e.jsx("div",{className:"absolute inset-0 dot-bg opacity-60"}),e.jsx(s_,{}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.07] bg-[#0a0a10]/80 px-4 py-2 text-[11px] text-ink-2 backdrop-blur",children:[e.jsx("span",{children:"18 nodes · 4 chapters · 02:34"}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"h-1.5 w-1.5 animate-pulseDot rounded-full bg-brand"}),"Rendering 3 shots · ETA 42s"]})]})]})]})})})}function s_(){return e.jsxs("svg",{className:"absolute inset-0 h-full w-full",viewBox:"0 0 640 480",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"w1",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#FF6A3D"}),e.jsx("stop",{offset:"100%",stopColor:"#7C5CFF"})]}),e.jsxs("linearGradient",{id:"w2",x1:"0",x2:"1",y1:"0",y2:"0",children:[e.jsx("stop",{offset:"0%",stopColor:"#7C5CFF"}),e.jsx("stop",{offset:"100%",stopColor:"#22D3EE"})]})]}),e.jsx("path",{d:"M 110 140 C 200 140 200 210 290 210",stroke:"url(#w1)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 110 260 C 200 260 200 210 290 210",stroke:"url(#w1)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 390 210 C 480 210 480 140 530 140",stroke:"url(#w2)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx("path",{d:"M 390 230 C 480 230 480 310 530 310",stroke:"url(#w2)",strokeWidth:"1.5",fill:"none",strokeDasharray:"4 4"}),e.jsx(Kn,{x:30,y:100,color:"#FF6A3D",w:160,h:80,title:"SCRIPT · Ch.2",sub:"雨夜屋顶 · 120 字"}),e.jsx(Kn,{x:30,y:220,color:"#FF6A3D",w:160,h:80,title:"CHARACTER",sub:"林夜 · 亚洲男 · 风衣"}),e.jsx(Kn,{x:230,y:170,color:"#7C5CFF",w:160,h:80,title:"STORYBOARD",sub:"3 shots · wide/med/close"}),e.jsx(Kn,{x:470,y:100,color:"#22D3EE",w:140,h:80,title:"VIDEO · Sora",sub:"24fps · 4K"}),e.jsx(Kn,{x:470,y:270,color:"#B6FF5F",w:140,h:80,title:"AUDIO · FX",sub:"雨声 + 环境低频"}),e.jsx("circle",{cx:"320",cy:"220",r:"3",fill:"#fff",children:e.jsx("animate",{attributeName:"opacity",values:"0.3;1;0.3",dur:"1.4s",repeatCount:"indefinite"})})]})}function Kn({x:t,y:n,w:s,h:o,color:i,title:r,sub:d}){return e.jsxs("g",{children:[e.jsx("rect",{x:t,y:n,width:s,height:o,rx:10,fill:"#0E0E14",stroke:"rgba(255,255,255,0.12)"}),e.jsx("rect",{x:t,y:n,width:s,height:3,rx:2,fill:i}),e.jsx("text",{x:t+12,y:n+28,fill:i,fontSize:"10",fontFamily:"Space Grotesk",fontWeight:"700",letterSpacing:"1.2",children:r}),e.jsx("text",{x:t+12,y:n+50,fill:"#C4C4CF",fontSize:"11",fontFamily:"Inter",children:d}),e.jsx("circle",{cx:t+s-12,cy:n+14,r:"3",fill:i,children:e.jsx("animate",{attributeName:"opacity",values:"0.4;1;0.4",dur:"1.8s",repeatCount:"indefinite"})})]})}const o_=[{icon:go,title:"电影级画质",desc:"HDR · 24/30/60fps · 最高 4K 输出，支持 ProRes / H.265 / DNxHR。",tone:"from-[#FF6A3D]/20 to-transparent"},{icon:Rd,title:"多模型路由",desc:"按镜头语言自动匹配最佳模型，并行渲染，画质 / 成本智能平衡。",tone:"from-[#7C5CFF]/20 to-transparent"},{icon:Ld,title:"角色一致性",desc:"训练专属角色 LoRA，全片统一面部、服装与身材比例。",tone:"from-[#FF3D7F]/20 to-transparent"},{icon:bd,title:"风格参考",desc:"上传参考片、剧照或大师画作，AI 提取色调、构图与节奏。",tone:"from-[#22D3EE]/20 to-transparent"},{icon:hd,title:"多语言配音",desc:"40+ 语种唇形对齐的克隆配音，保留原声情绪与韵律。",tone:"from-[#B6FF5F]/20 to-transparent"},{icon:Md,title:"极速交付",desc:"首稿 5 分钟完成，替代传统 2 周分镜 + 3 周拍摄周期。",tone:"from-[#FF6A3D]/20 to-transparent"},{icon:id,title:"企业私有部署",desc:"支持本地 GPU 集群 / VPC 部署，IP 与素材不出库。",tone:"from-[#7C5CFF]/20 to-transparent"},{icon:Cd,title:"内容合规",desc:"内置 C2PA 水印、AIGC 标注与版权审核，商业级安全。",tone:"from-[#FF3D7F]/20 to-transparent"}];function r_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Why PineLine"}),e.jsxs("h2",{className:"section-title mt-3",children:["为",e.jsx("span",{className:"text-gradient",children:"专业影视"}),"而生， 而非玩具"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"广告公司、短剧厂牌、品牌创意部门的真实工作流被完整映射到产品之中。"})]}),e.jsx("div",{className:"mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",children:o_.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n%4*.05},className:"card group relative overflow-hidden",children:[e.jsx("div",{className:`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br ${t.tone} opacity-60 transition group-hover:opacity-100`}),e.jsxs("div",{className:"relative",children:[e.jsx(t.icon,{size:18,className:"text-white"}),e.jsx("h3",{className:"mt-4 font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-2 text-sm leading-relaxed text-ink-1",children:t.desc})]})]},t.title))})]})})}const i_=[{name:"林夜",role:"都市 · 男主",tone:"from-[#1a0f2a] to-[#ff3d7f]"},{name:"Aria",role:"Sci-Fi · 女主",tone:"from-[#071029] to-[#22d3ee]"},{name:"苏白",role:"古风 · 少女",tone:"from-[#2a0f12] to-[#ff6a3d]"},{name:"老K",role:"悬疑 · 配角",tone:"from-[#161616] to-[#7c5cff]"}];function a_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid items-center gap-12 lg:grid-cols-2",children:[e.jsxs(Ve.div,{initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"Virtual Actors"}),e.jsxs("h2",{className:"section-title mt-3",children:["可签约的",e.jsx("span",{className:"text-gradient",children:"数字演员"}),"，",e.jsx("br",{}),"横跨全片保持一致性"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"训练一位属于你项目的数字演员，面部、体型、声线、表演风格可控。 不同镜头、不同模型下，她 / 他始终是同一个人。"}),e.jsxs("ul",{className:"mt-6 space-y-3 text-sm text-ink-1",children:[e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(Bt,{size:14,className:"mt-0.5 text-brand"}),"上传 3~10 张照片，10 分钟完成定制训练"]}),e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(Bt,{size:14,className:"mt-0.5 text-brand"}),"跨模型迁移：同一角色可在 Sora / Kling / Veo 下统一"]}),e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx(Bt,{size:14,className:"mt-0.5 text-brand"}),"声纹克隆 + 情绪曲线：台词按情绪节奏自动生成"]})]}),e.jsxs("div",{className:"mt-7 flex gap-3",children:[e.jsxs("button",{className:"btn-primary",children:[e.jsx(Id,{size:14}),"训练我的数字演员"]}),e.jsxs("button",{className:"btn-ghost",children:[e.jsx(Ns,{size:14}),"从公共演员库选择"]})]})]}),e.jsx(Ve.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},className:"grid grid-cols-2 gap-4",children:i_.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:n*.08},className:"relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.07]",children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${t.tone}`}),e.jsx("div",{className:"absolute inset-x-0 top-[18%] mx-auto h-[38%] w-[46%] rounded-full bg-gradient-to-b from-white/25 to-transparent blur-2xl"}),e.jsx("div",{className:"absolute inset-x-0 bottom-[26%] mx-auto h-[22%] w-[34%] rounded-full bg-gradient-to-b from-white/15 to-transparent blur-2xl"}),e.jsx("div",{className:"animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent"}),e.jsx("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-display text-sm font-semibold text-white",children:t.name}),e.jsx("div",{className:"text-[11px] text-ink-1",children:t.role})]}),e.jsxs("span",{className:"chip !py-0.5 !text-[10px]",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-brand"}),"LoRA·v3"]})]})})]},t.name))})]})})})}const l_=[{title:"雨夜都市悬疑",meta:"6 镜头 · 角色一致性 · 冷蓝灯光",tone:"from-[#111827] via-[#164E63] to-[#FF3D7F]"},{title:"高端腕表 TVC",meta:"产品微距 · 影棚反射 · 30s",tone:"from-[#120B08] via-[#92400E] to-[#FDE68A]"},{title:"国风短剧预告",meta:"场景资产 · 角色 LoRA · 配乐",tone:"from-[#0F172A] via-[#7C2D12] to-[#F97316]"},{title:"赛博城市片头",meta:"航拍运镜 · 霓虹雨景 · 12s",tone:"from-[#020617] via-[#3730A3] to-[#22D3EE]"}];function c_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center",children:[e.jsxs(Ve.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.6},children:[e.jsx("div",{className:"eyebrow",children:"PineLine Community"}),e.jsxs("h2",{className:"mt-4 font-display text-display-md text-white",children:["发现专业配方，",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"克隆配方"}),"再创作"]}),e.jsx("p",{className:"mt-4 max-w-md text-ink-1",children:"TapNow 的社区价值在于公开画布、复用流程。PineLine 把它转成影视配方： 你可以 fork 一套完整镜头、模型、角色和剪辑参数，而不是从空白开始。"}),e.jsxs(Ct,{to:"/showcase",className:"btn-light mt-8",children:["查看配方",e.jsx(es,{size:14})]})]}),e.jsx("div",{className:"grid gap-3 sm:grid-cols-2",children:l_.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:18},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-120px"},transition:{duration:.55,delay:n*.06},className:"group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E14]",children:[e.jsxs("div",{className:`relative h-36 bg-gradient-to-br ${t.tone}`,children:[e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.26),transparent_28%)]"}),e.jsx("button",{className:"absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white backdrop-blur",children:e.jsx(od,{size:16})})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-white",children:t.title}),e.jsx("p",{className:"mt-1 text-xs text-ink-2",children:t.meta}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 text-xs font-semibold text-ink-1",children:[e.jsx(cd,{size:13,className:"text-brand"}),"Fork 到 Studio"]})]})]},t.title))})]})})})}const d_=[{title:"《无声之城》",author:"寒川映画",cat:"短片 · 科幻",tone:"from-[#061127] via-[#0b2a3a] to-[#22d3ee]",ratio:"aspect-[16/9]"},{title:"Lumen Watch",author:"Noire Agency",cat:"广告 · 品牌",tone:"from-[#1a0a14] via-[#3a0c20] to-[#ff3d7f]",ratio:"aspect-[4/5]"},{title:"《归鹿》",author:"梨花工作室",cat:"短剧 · 古风",tone:"from-[#1a0f0a] via-[#2a160c] to-[#ff6a3d]",ratio:"aspect-[9/16]"},{title:"Hyperion",author:"Studio Vega",cat:"MV · 电子",tone:"from-[#10081f] via-[#1d1040] to-[#7c5cff]",ratio:"aspect-[16/9]"},{title:"夜行列车",author:"Mira Films",cat:"短片 · 悬疑",tone:"from-[#0a0a0a] via-[#1a1a1a] to-[#5a5a66]",ratio:"aspect-[1/1]"},{title:"Echo Chamber",author:"Acoustic Lab",cat:"MV · 实验",tone:"from-[#04131a] via-[#07283a] to-[#b6ff5f]",ratio:"aspect-[4/5]"}];function __(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"flex items-end justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"eyebrow",children:"Showcase Wall"}),e.jsxs("h2",{className:"section-title mt-3",children:["由 PineLine 生长的 ",e.jsx("span",{className:"text-gradient",children:"真实作品"})]})]}),e.jsx("a",{href:"/showcase",className:"btn-ghost hidden md:inline-flex",children:"查看全部"})]}),e.jsx("div",{className:"mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]",children:d_.map((t,n)=>e.jsx(Ve.article,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n%3*.05},className:"group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07]",children:e.jsxs("div",{className:`relative ${t.ratio} w-full`,children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${t.tone}`}),e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"}),e.jsx("div",{className:"noise absolute inset-0"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100",children:e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md",children:e.jsx(Kr,{size:20,fill:"#fff",className:"text-white"})})}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-display text-base font-semibold text-white",children:t.title}),e.jsx("div",{className:"text-xs text-ink-1",children:t.author})]}),e.jsx("span",{className:"chip !py-0.5 !text-[10px]",children:t.cat})]})]})},t.title))})]})})}const u_=[{quote:"以前一支 30 秒的品牌故事要跨 4 个团队协作两周。PineLine 把剧本到成片的 5 个阶段压进一个画布，客户连周五都能拿到终稿。",name:"林漫",role:"创意总监 · Noire Agency"},{quote:"多模型路由 + 角色一致性，是国内第一个真正让我敢在正片里落地 AIGC 的工具。",name:"许言",role:"导演 · 寒川映画"},{quote:"我们团队用 PineLine 同时推进 12 条短剧剧本，单集成本从 18 万降到 2 万。ROI 夸张到写不进预算表。",name:"Sara W.",role:"Head of Growth · 梨花工作室"}];function h_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"From the field"}),e.jsxs("h2",{className:"section-title mt-3",children:["一线团队的",e.jsx("span",{className:"text-gradient",children:"真话"})]})]}),e.jsx("div",{className:"mt-14 grid gap-4 lg:grid-cols-3",children:u_.map((t,n)=>e.jsxs(Ve.div,{initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.5,delay:n*.07},className:"card",children:[e.jsx(wd,{size:18,className:"text-brand"}),e.jsxs("p",{className:"mt-4 text-sm leading-relaxed text-ink-1",children:['"',t.quote,'"']}),e.jsxs("div",{className:"mt-6 flex items-center gap-3",children:[e.jsx("div",{className:"h-9 w-9 rounded-full bg-brand-gradient"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm font-medium text-white",children:t.name}),e.jsx("div",{className:"text-xs text-ink-2",children:t.role})]})]})]},t.name))})]})})}const m_=[{name:"Creator",price:"¥0",unit:"/ 月",desc:"给独立创作者与学生的起步套餐",cta:"免费开始",features:["每月 80 分钟生成","720p 导出","公共模型库","3 个工作画布"]},{name:"Studio",price:"¥599",unit:"/ 月",highlight:!0,desc:"为 5–15 人的专业团队",cta:"开始 14 天试用",features:["每月 1200 分钟生成","4K·24/30/60fps 导出","多模型路由 + 私有 LoRA","10 人实时协作","时间线导出 PR / DaVinci"]},{name:"Enterprise",price:"议价",unit:"",desc:"品牌方 / 广告公司 / 内容平台",cta:"预约 Demo",features:["私有化 / VPC 部署","企业 SSO + 审计日志","专属算力池与 SLA","IP 安全承诺与 C2PA 水印"]}];function p_(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Pricing"}),e.jsxs("h2",{className:"section-title mt-3",children:["按",e.jsx("span",{className:"text-gradient",children:"团队规模"}),"自由扩展"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"所有方案都包含管线编排、模板库与多模型路由。付费方案解锁更高算力与商用授权。"})]}),e.jsx("div",{className:"mt-14 grid gap-4 md:grid-cols-3",children:m_.map(t=>e.jsxs("div",{className:`relative flex flex-col rounded-2xl border p-7 ${t.highlight?"animated-border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]":"border-white/[0.07] bg-white/[0.02]"}`,children:[t.highlight&&e.jsx("div",{className:"absolute right-5 top-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white",children:"Most Popular"}),e.jsx("div",{className:"font-display text-lg font-semibold text-white",children:t.name}),e.jsx("div",{className:"mt-1 text-sm text-ink-2",children:t.desc}),e.jsxs("div",{className:"mt-6 flex items-baseline gap-1",children:[e.jsx("span",{className:`font-display text-4xl font-semibold ${t.highlight?"text-gradient":"text-white"}`,children:t.price}),e.jsx("span",{className:"text-sm text-ink-2",children:t.unit})]}),e.jsx("ul",{className:"mt-6 space-y-2.5 text-sm text-ink-1",children:t.features.map(n=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(co,{size:14,className:"mt-0.5 text-brand"}),n]},n))}),e.jsx(Ct,{to:"/pricing",className:`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${t.highlight?"btn-primary":"btn-ghost"}`,children:t.cta})]},t.name))})]})})}const g_=[{q:"PineLine 和单模型的视频生成工具有什么不同？",a:"单模型工具只负责一种生成能力。PineLine 是一条可视化管线——它把剧本解析、分镜、镜头设计、多模型路由、剪辑与音画合成统一成一张工作画布，并自动记录每一步的依赖与参数版本，让整个创作过程可回放、可分支。"},{q:"我的素材与模型微调数据是安全的吗？",a:"企业方案支持 VPC 私有化部署，一切素材与训练数据不会出私有网络。默认方案下，所有素材启用端到端加密传输与静态加密存储，符合主流内容合规标准，输出文件自动嵌入 C2PA 来源水印。"},{q:"输出的成片能直接用于商业项目吗？",a:"是的。Studio 与 Enterprise 方案包含完整商业授权，导出时会嵌入合规 AIGC 标注，并提供详细的模型来源与训练数据声明，便于客户侧合规送审。"},{q:"是否支持与 DaVinci Resolve / Premiere Pro 协作？",a:"支持。PineLine 的时间线可导出为 OTIO / EDL / XML，镜头分层（画面、字幕、音效、调色节点）将自动保留，让非线性剪辑软件开袋即用。"},{q:"需要 GPU 或本地算力吗？",a:"无需。所有模型推理均在 PineLine 的弹性 GPU 集群执行，你只需在浏览器中工作。Enterprise 客户可选择接入自有算力池或私有云。"},{q:"角色一致性的表现如何？",a:'上传 3–10 张角色参考，10 分钟可完成专属 LoRA 训练。我们的对齐模块会把角色特征注入不同视频模型的生成过程，保证角色跨镜头、跨模型仍然是"同一个人"。'}];function ei(){const[t,n]=l.useState(0);return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsxs("div",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"FAQ"}),e.jsx("h2",{className:"section-title mt-3",children:"关于 PineLine，你可能想问"})]}),e.jsx("div",{className:"mx-auto mt-12 max-w-3xl divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02]",children:g_.map((s,o)=>{const i=t===o;return e.jsxs("button",{onClick:()=>n(i?null:o),className:"block w-full px-6 py-5 text-left",children:[e.jsxs("div",{className:"flex items-center justify-between gap-6",children:[e.jsx("span",{className:"font-medium text-white",children:s.q}),e.jsx(sd,{size:16,className:`shrink-0 text-ink-2 transition ${i?"rotate-180 text-white":""}`})]}),e.jsx("div",{className:`grid overflow-hidden transition-all duration-300 ${i?"mt-3 grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`,children:e.jsx("div",{className:"overflow-hidden text-sm leading-relaxed text-ink-1",children:s.a})})]},s.q)})})]})})}function ti(){return e.jsx("section",{className:"relative py-24 md:py-32",children:e.jsx("div",{className:"container-x",children:e.jsxs("div",{className:"animated-border relative overflow-hidden rounded-3xl border border-transparent bg-[#0E0E16] p-10 text-center md:p-16",children:[e.jsx("div",{className:"pointer-events-none absolute inset-x-0 -top-20 mx-auto h-[300px] w-[900px] rounded-full bg-brand-gradient opacity-20 blur-[120px]"}),e.jsx("div",{className:"pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,#000,transparent)]"}),e.jsxs("span",{className:"chip relative",children:[e.jsx(Bt,{size:12,className:"text-brand"}),"你的下一部片子，从一条管线开始"]}),e.jsxs("h2",{className:"relative mt-6 font-display text-display-lg font-semibold text-white [word-break:keep-all]",children:["准备好把",e.jsx("span",{className:"text-gradient",children:"剧本"}),"变成",e.jsx("span",{className:"text-gradient",children:"电影"}),"了吗？"]}),e.jsx("p",{className:"relative mx-auto mt-5 max-w-xl text-ink-1",children:"14 天免费试用完整 Studio 权限。无需信用卡，打开浏览器就能开始。"}),e.jsxs("div",{className:"relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",children:[e.jsxs(Ct,{to:"/studio",className:"btn-primary",children:["进入 Studio",e.jsx(es,{size:14})]}),e.jsx(Ct,{to:"/pricing",className:"btn-ghost",children:"查看所有方案"})]})]})})})}function x_(){return e.jsxs(Ve.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},className:"relative flex-1",children:[e.jsx(Yd,{}),e.jsx(Ud,{}),e.jsx(Qd,{}),e.jsx(Gd,{}),e.jsx(Jd,{}),e.jsx(e_,{}),e.jsx(n_,{}),e.jsx(r_,{}),e.jsx(a_,{}),e.jsx(c_,{}),e.jsx(__,{}),e.jsx(h_,{}),e.jsx(p_,{}),e.jsx(ei,{}),e.jsx(ti,{})]})}const f_=["全部","短片","广告 / TVC","短剧","MV","电商","预告片","社交媒体"],y_=[{title:"电影级品牌 TVC · 30s",cat:"广告 / TVC",stages:6,est:"12 分钟",uses:2148,tone:"from-[#1a0a14] to-[#ff3d7f]"},{title:"雨夜都市独白短片",cat:"短片",stages:8,est:"18 分钟",uses:1320,tone:"from-[#061127] to-[#22d3ee]"},{title:"古风短剧 · 1 集 3 分钟",cat:"短剧",stages:9,est:"25 分钟",uses:876,tone:"from-[#1a0f0a] to-[#ff6a3d]"},{title:"电子 MV · 节奏卡点",cat:"MV",stages:7,est:"15 分钟",uses:542,tone:"from-[#10081f] to-[#7c5cff]"},{title:"电商主图视频 · 15s",cat:"电商",stages:4,est:"5 分钟",uses:4210,tone:"from-[#0a1f0a] to-[#b6ff5f]"},{title:"院线预告片节奏",cat:"预告片",stages:8,est:"20 分钟",uses:312,tone:"from-[#0a0a0a] to-[#ff6a3d]"},{title:"小红书竖屏种草",cat:"社交媒体",stages:5,est:"8 分钟",uses:3180,tone:"from-[#1a0a20] to-[#ff3d7f]"},{title:"科幻世界观预告",cat:"预告片",stages:9,est:"30 分钟",uses:198,tone:"from-[#04131a] to-[#22d3ee]"},{title:"悬疑短剧 · 开场钩子",cat:"短剧",stages:7,est:"14 分钟",uses:624,tone:"from-[#0a0a0a] to-[#5a5a66]"}];function b_(){const[t,n]=l.useState("全部"),[s,o]=l.useState(""),i=y_.filter(r=>(t==="全部"||r.cat===t)&&r.title.toLowerCase().includes(s.toLowerCase()));return e.jsx(Ve.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Templates"}),e.jsxs("h1",{className:"section-title mt-3",children:["从一个",e.jsx("span",{className:"text-gradient",children:"模板"}),"，到一部成片"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"官方与社区共建的工作流模板。加载即用，画布上所有节点、参数与资产都已预配置。"})]}),e.jsxs("div",{className:"mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-between",children:[e.jsxs("div",{className:"relative w-full md:max-w-sm",children:[e.jsx(jd,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-ink-2"}),e.jsx("input",{value:s,onChange:r=>o(r.target.value),placeholder:"搜索模板、风格或品类",className:"w-full rounded-full border border-white/[0.07] bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm text-white outline-none transition focus:border-white/20"})]}),e.jsx("div",{className:"flex flex-wrap items-center gap-1",children:f_.map(r=>e.jsx("button",{onClick:()=>n(r),className:`rounded-full px-3 py-1.5 text-xs font-medium transition ${t===r?"bg-white/[0.08] text-white":"text-ink-1 hover:text-white"}`,children:r},r))})]}),e.jsx("div",{className:"mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:i.map((r,d)=>e.jsxs(Ve.article,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:d*.03},className:"card group overflow-hidden",children:[e.jsxs("div",{className:`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${r.tone}`,children:[e.jsx("div",{className:"absolute inset-0 noise"}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[10px] text-white/70",children:[r.stages," stages · preset"]})]}),e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx("span",{className:"chip",children:r.cat}),e.jsxs("span",{className:"flex items-center gap-1 text-[11px] text-ink-2",children:[e.jsx(Jr,{size:11})," ",r.uses.toLocaleString()]})]}),e.jsx("h3",{className:"mt-3 font-display text-base font-semibold text-white",children:r.title}),e.jsxs("div",{className:"mt-2 flex items-center justify-between text-[11px] text-ink-2",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(rd,{size:11})," 首稿约 ",r.est]}),e.jsxs(Ct,{to:"/studio",className:"flex items-center gap-1 text-brand transition hover:text-white",children:[e.jsx(Bt,{size:11})," 加载到 Studio"]})]})]},r.title))})]})})}const w_=["全部","短片","广告","短剧","MV","实验艺术"],v_=[{title:"《无声之城》",author:"寒川映画",cat:"短片",tone:"from-[#061127] via-[#0b2a3a] to-[#22d3ee]",ratio:"aspect-[16/9]",likes:2180,views:"42.1k"},{title:"Lumen Watch",author:"Noire Agency",cat:"广告",tone:"from-[#1a0a14] via-[#3a0c20] to-[#ff3d7f]",ratio:"aspect-[4/5]",likes:1512,views:"21.8k"},{title:"《归鹿》",author:"梨花工作室",cat:"短剧",tone:"from-[#1a0f0a] via-[#2a160c] to-[#ff6a3d]",ratio:"aspect-[9/16]",likes:986,views:"18.2k"},{title:"Hyperion",author:"Studio Vega",cat:"MV",tone:"from-[#10081f] via-[#1d1040] to-[#7c5cff]",ratio:"aspect-[16/9]",likes:742,views:"11.4k"},{title:"夜行列车",author:"Mira Films",cat:"短片",tone:"from-[#0a0a0a] via-[#1a1a1a] to-[#5a5a66]",ratio:"aspect-[1/1]",likes:621,views:"9.4k"},{title:"Echo Chamber",author:"Acoustic Lab",cat:"实验艺术",tone:"from-[#04131a] via-[#07283a] to-[#b6ff5f]",ratio:"aspect-[4/5]",likes:540,views:"7.1k"},{title:"《旧日方舟》",author:"孤岛 Studio",cat:"短片",tone:"from-[#140a1a] via-[#320c42] to-[#ff6a3d]",ratio:"aspect-[16/9]",likes:1220,views:"16.9k"},{title:"Neon Drive",author:"Palette",cat:"MV",tone:"from-[#04081a] via-[#120a3a] to-[#22d3ee]",ratio:"aspect-[16/9]",likes:860,views:"12.0k"},{title:"《第七次浪潮》",author:"铃木 Jun",cat:"实验艺术",tone:"from-[#060c0c] via-[#0f2e2e] to-[#b6ff5f]",ratio:"aspect-[3/4]",likes:412,views:"5.3k"}];function k_(){const[t,n]=l.useState("全部"),s=v_.filter(o=>t==="全部"||o.cat===t);return e.jsx(Ve.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Showcase"}),e.jsxs("h1",{className:"section-title mt-3",children:["由 PineLine 生长的",e.jsx("span",{className:"text-gradient",children:"真实作品"})]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"所有作品均可查看工作画布、模板来源与镜头参数，可 fork 为你的新项目。"})]}),e.jsx("div",{className:"mt-10 flex flex-wrap items-center justify-center gap-1",children:w_.map(o=>e.jsx("button",{onClick:()=>n(o),className:`rounded-full px-4 py-1.5 text-xs font-medium transition ${t===o?"bg-white/[0.08] text-white":"text-ink-1 hover:text-white"}`,children:o},o))}),e.jsx("div",{className:"mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]",children:s.map((o,i)=>e.jsxs(Ve.article,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,delay:i%3*.04},className:"group mb-4 block break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07]",children:[e.jsxs("div",{className:`relative ${o.ratio} w-full`,children:[e.jsx("div",{className:`absolute inset-0 bg-gradient-to-br ${o.tone}`}),e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_100%)]"}),e.jsx("div",{className:"noise absolute inset-0"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100",children:e.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md",children:e.jsx(Kr,{size:20,fill:"#fff",className:"text-white"})})}),e.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-display text-base font-semibold text-white",children:o.title}),e.jsx("div",{className:"text-xs text-ink-1",children:o.author})]}),e.jsx("span",{className:"chip !py-0.5 !text-[10px]",children:o.cat})]})]}),e.jsxs("div",{className:"flex items-center justify-between border-t border-white/[0.06] bg-bg-1/80 px-3 py-2 text-[11px] text-ink-2",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(ad,{size:11})," ",o.views]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(_d,{size:11})," ",o.likes]}),e.jsx("button",{className:"text-brand hover:text-white",children:"Fork 画布"})]})]},o.title))})]})})}const j_=[{name:"Creator",priceM:0,priceY:0,desc:"给独立创作者与学生的起步套餐",cta:"免费开始",features:["80 分钟 / 月 视频生成","720p 导出 · 水印可选","公共模型库 + 10 个模板","3 个工作画布","1 人账号"]},{name:"Studio",priceM:599,priceY:499,highlight:!0,desc:"为 5–15 人的专业团队",cta:"14 天免费试用",features:["1200 分钟 / 月 · 可叠加","4K·24/30/60fps · 无水印","多模型路由 · 私有 LoRA","10 人实时协作","导出 PR / DaVinci 时间线","优先排队 · 算力加速"]},{name:"Enterprise",priceM:null,priceY:null,desc:"品牌方 / 广告公司 / 内容平台",cta:"预约 Demo",features:["私有化 / VPC 部署","企业 SSO + 审计日志","专属算力池与 SLA","商用授权 + IP 安全承诺","定制模型与训练","专属客户成功经理"]}],C_=[["每月生成时长",["80 分钟","1200 分钟","自定义"]],["最高导出分辨率",["720p","4K HDR","8K 定制"]],["水印 / AIGC 标注",["可选 C2PA","C2PA · 可选隐藏","C2PA · 企业配置"]],["多模型路由",[!1,!0,!0]],["数字演员 LoRA",[!1,!0,!0]],["实时协作人数",["1","10","无限"]],["时间线导出 (PR/DaVinci)",[!1,!0,!0]],["私有化 / VPC 部署",[!1,!1,!0]],["SSO · SAML · 审计",[!1,!1,!0]],["商用授权",[!1,!0,!0]],["优先算力 · SLA",[!1,"标准","专属"]]];function S_(){const[t,n]=l.useState(!0);return e.jsxs(Ve.main,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"flex-1 pt-28",children:[e.jsxs("section",{className:"container-x",children:[e.jsxs("div",{className:"mx-auto max-w-2xl text-center",children:[e.jsx("div",{className:"eyebrow",children:"Pricing"}),e.jsxs("h1",{className:"section-title mt-3",children:["按",e.jsx("span",{className:"text-gradient",children:"团队规模"}),"自由扩展"]}),e.jsx("p",{className:"mt-4 text-ink-1",children:"从独立创作者到全球广告公司，都能在 PineLine 找到合适的管线形态。"})]}),e.jsx("div",{className:"mt-8 flex justify-center",children:e.jsxs("div",{className:"inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 text-xs",children:[e.jsx("button",{onClick:()=>n(!1),className:`rounded-full px-4 py-1.5 transition ${t?"text-ink-1":"bg-white/[0.08] text-white"}`,children:"月付"}),e.jsxs("button",{onClick:()=>n(!0),className:`rounded-full px-4 py-1.5 transition ${t?"bg-white/[0.08] text-white":"text-ink-1"}`,children:["年付 ",e.jsx("span",{className:"ml-1 text-brand",children:"省 17%"})]})]})}),e.jsx("div",{className:"mt-10 grid gap-4 md:grid-cols-3",children:j_.map(s=>{const o=s.priceM==null?"议价":`¥${t?s.priceY:s.priceM}`;return e.jsxs("div",{className:`relative flex flex-col rounded-2xl border p-7 ${s.highlight?"animated-border border-transparent bg-gradient-to-b from-white/[0.05] to-white/[0.01]":"border-white/[0.07] bg-white/[0.02]"}`,children:[s.highlight&&e.jsx("div",{className:"absolute right-5 top-5 rounded-full bg-brand-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white",children:"Most Popular"}),e.jsx("div",{className:"font-display text-lg font-semibold text-white",children:s.name}),e.jsx("div",{className:"mt-1 text-sm text-ink-2",children:s.desc}),e.jsxs("div",{className:"mt-6 flex items-baseline gap-1",children:[e.jsx("span",{className:`font-display text-4xl font-semibold ${s.highlight?"text-gradient":"text-white"}`,children:o}),s.priceM!=null&&e.jsx("span",{className:"text-sm text-ink-2",children:"/ 月"})]}),e.jsx("ul",{className:"mt-6 space-y-2.5 text-sm text-ink-1",children:s.features.map(i=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(co,{size:14,className:"mt-0.5 text-brand"}),i]},i))}),e.jsx(Ct,{to:"/studio",className:`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${s.highlight?"btn-primary":"btn-ghost"}`,children:s.cta})]},s.name)})}),e.jsxs("div",{className:"mt-20 overflow-hidden rounded-2xl border border-white/[0.07]",children:[e.jsxs("div",{className:"grid grid-cols-4 border-b border-white/[0.06] bg-white/[0.02] px-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-ink-2",children:[e.jsx("div",{children:"能力对比"}),e.jsx("div",{className:"text-center",children:"Creator"}),e.jsx("div",{className:"text-center",children:"Studio"}),e.jsx("div",{className:"text-center",children:"Enterprise"})]}),C_.map((s,o)=>e.jsxs("div",{className:`grid grid-cols-4 border-b border-white/[0.04] px-6 py-4 text-sm last:border-0 ${o%2?"bg-white/[0.015]":""}`,children:[e.jsx("div",{className:"text-ink-1",children:s[0]}),s[1].map((i,r)=>e.jsx("div",{className:"flex justify-center text-ink-0",children:i===!0?e.jsx(co,{size:16,className:"text-brand"}):i===!1?e.jsx(fd,{size:16,className:"text-ink-3"}):e.jsx("span",{className:"text-xs",children:i})},r))]},s[0]))]})]}),e.jsx(ei,{}),e.jsx(ti,{})]})}const N_=l.lazy(()=>$r(()=>import("./Studio-CtJGkN2I.js"),__vite__mapDeps([0,1,2,3,4,5]))),M_=l.lazy(()=>$r(()=>import("./Projects-A_0bnYkM.js"),__vite__mapDeps([6,1,2,4,3]))),$_=typeof window<"u"&&new URLSearchParams(window.location.search).has("agentation");function Nr(){return e.jsx("div",{className:"flex h-screen w-full items-center justify-center bg-bg-0 text-ink-3",children:e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"h-2 w-2 animate-pulseDot rounded-full bg-brand"}),"加载 Studio…"]})})}function I_(){const t=Mi(),n=t.pathname.startsWith("/studio");return e.jsxs("div",{className:"relative flex min-h-screen flex-col",children:[!n&&e.jsx(Dd,{}),e.jsx(Ni,{mode:"wait",children:e.jsxs($i,{location:t,children:[e.jsx(Nn,{path:"/",element:e.jsx(x_,{})}),e.jsx(Nn,{path:"/studio",element:e.jsx(l.Suspense,{fallback:e.jsx(Nr,{}),children:e.jsx(N_,{})})}),e.jsx(Nn,{path:"/studio/projects",element:e.jsx(l.Suspense,{fallback:e.jsx(Nr,{}),children:e.jsx(M_,{})})}),e.jsx(Nn,{path:"/templates",element:e.jsx(b_,{})}),e.jsx(Nn,{path:"/showcase",element:e.jsx(k_,{})}),e.jsx(Nn,{path:"/pricing",element:e.jsx(S_,{})})]},t.pathname)}),!n&&e.jsx(Ad,{}),$_&&e.jsx(qc,{endpoint:"http://localhost:4747"})]})}no.createRoot(document.getElementById("root")).render(e.jsx(Mr.StrictMode,{children:e.jsx(Ii,{children:e.jsx(I_,{})})}));export{Zc as A,nd as B,sd as C,Qr as F,vr as I,md as L,Kr as P,Sd as S,Ed as V,Ns as W,Bd as X,Nd as a,Bt as b,de as c,jd as d,id as e,co as f,Vr as g,go as h,kd as i,ld as j,rd as k};
