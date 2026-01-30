(function(){"use strict";const r={active:!1,highlightOverlay:null,currentElement:null};let s=null;function E(){const e=document.createElement("div");return e.id="quillmonkey-element-picker-overlay",e.style.cssText=`
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    border: 2px solid oklch(57.4% 0.195 257.9);
    background-color: oklch(57.4% 0.195 257.9 / 0.1);
    transition: all 0.05s ease-out;
    box-shadow: 0 0 0 2px oklch(57.4% 0.195 257.9 / 0.3);
    display: none;
  `,document.body.appendChild(e),s=document.createElement("div"),s.id="quillmonkey-xpath-label",s.style.cssText=`
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    background-color: oklch(0% 0 0 / 0.8);
    color: white;
    font-family: monospace;
    font-size: 11px;
    padding: 4px 8px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
  `,document.body.appendChild(s),e}function k(e){if(!r.highlightOverlay)return;const i=e.getBoundingClientRect(),t=r.highlightOverlay;if(t.style.top=`${i.top}px`,t.style.left=`${i.left}px`,t.style.width=`${i.width}px`,t.style.height=`${i.height}px`,t.style.display="block",s){const n=f(e);s.textContent=n;const o=24,c=4;let l=i.top-o-c;l<0&&(l=i.bottom+c);let u=i.left;u+400>window.innerWidth&&(u=Math.max(0,window.innerWidth-400-c)),s.style.top=`${l}px`,s.style.left=`${u}px`,s.style.display="block"}}function b(e){if(e.id)return`#${CSS.escape(e.id)}`;if(e.classList.length>0){const n=Array.from(e.classList).map(c=>`.${CSS.escape(c)}`).join("");if(document.querySelectorAll(n).length===1)return n}const i=[];let t=e;for(;t&&t!==document.body;){let n=t.tagName.toLowerCase();if(t.id){i.unshift(`#${CSS.escape(t.id)}`);break}const o=t.classList[0];o&&(n+=`.${CSS.escape(o)}`);const c=t.parentElement;if(c){const l=t.tagName,u=Array.from(c.children);if(u.filter(d=>d.tagName===l).length>1){const d=u.indexOf(t)+1;n+=`:nth-child(${d})`}}i.unshift(n),t=t.parentElement}return i.join(" > ")}function h(e,i){const t=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let n=0;n<t.snapshotLength;n++)if(t.snapshotItem(n)===i)return n+1;return 1}function f(e){const i=e.tagName.toLowerCase();if(e.id){const o=`//${i}[@id="${e.id}"]`;if(document.querySelectorAll(`${i}#${CSS.escape(e.id)}`).length>1){const l=h(o,e);return`(${o})[${l}]`}return o}const t=[];let n=e;for(;n&&n!==document.body&&n!==document.documentElement;){let o=n.tagName.toLowerCase();if(n.id){const l=`//${o}[@id="${n.id}"]`;if(document.querySelectorAll(`${o}#${CSS.escape(n.id)}`).length>1){const m=h(l,n);t.unshift(`(${o}[@id="${n.id}"])[${m}]`)}else t.unshift(`${o}[@id="${n.id}"]`);break}const c=n.parentElement;if(c){const l=n.tagName,m=Array.from(c.children).filter(d=>d.tagName===l);if(m.length>1){const d=m.indexOf(n)+1;o+=`[${d}]`}}t.unshift(o),n=n.parentElement}return"//"+t.join("/")}function p(e){if(!r.active)return;const i=e.target;i!==r.highlightOverlay&&i.id!=="quillmonkey-element-picker-overlay"&&(r.currentElement=i,k(i))}function g(e){var i,t;if(r.active&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),r.currentElement)){const n=b(r.currentElement),o=f(r.currentElement);chrome.runtime.sendMessage({action:"elementSelected",selectors:{css:n,xpath:o},elementInfo:{tag:r.currentElement.tagName.toLowerCase(),id:r.currentElement.id||null,classes:Array.from(r.currentElement.classList),text:(t=(i=r.currentElement.textContent)==null?void 0:i.slice(0,50))==null?void 0:t.trim()}}),v()}}function y(e){r.active&&e.key==="Escape"&&(e.preventDefault(),v(),chrome.runtime.sendMessage({action:"elementPickerCancelled"}))}function $(){r.active||(r.active=!0,r.highlightOverlay=E(),document.addEventListener("mousemove",p,!0),document.addEventListener("click",g,!0),document.addEventListener("keydown",y,!0),document.body.style.cursor="crosshair")}function v(){r.active&&(r.active=!1,r.highlightOverlay&&(r.highlightOverlay.remove(),r.highlightOverlay=null),s&&(s.remove(),s=null),document.removeEventListener("mousemove",p,!0),document.removeEventListener("click",g,!0),document.removeEventListener("keydown",y,!0),document.body.style.cursor="",r.currentElement=null)}let a=null;function w(){x(),a=document.createElement("iframe"),a.id="quillmonkey-mic-permission-iframe",a.src=chrome.runtime.getURL("requestPermission.html"),a.setAttribute("allow","microphone"),a.style.cssText=`
    position: fixed;
    top: -1000px;
    left: -1000px;
    width: 1px;
    height: 1px;
    border: none;
    opacity: 0;
    pointer-events: none;
  `,document.body.appendChild(a)}function x(){a&&(a.remove(),a=null)}chrome.runtime.onMessage.addListener((e,i,t)=>(e.action==="ping"?t({success:!0}):e.action==="startElementPicker"?($(),t({success:!0})):e.action==="injectMicPermissionIframe"?(w(),t({success:!0})):e.action==="removeMicPermissionIframe"&&(x(),t({success:!0})),!0)),window.addEventListener("message",e=>{var i;((i=e.data)==null?void 0:i.type)==="quillmonkey:openUserscriptSettings"&&chrome.runtime.sendMessage({action:"openUserscriptSettings"})})})();
