(function(){"use strict";const r={active:!1,highlightOverlay:null,currentElement:null};let s=null;function x(){const e=document.createElement("div");return e.id="quillmonkey-element-picker-overlay",e.style.cssText=`
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    border: 2px solid #1a73e8;
    background-color: rgba(26, 115, 232, 0.1);
    transition: all 0.05s ease-out;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
    display: none;
  `,document.body.appendChild(e),s=document.createElement("div"),s.id="quillmonkey-xpath-label",s.style.cssText=`
    position: fixed;
    pointer-events: none;
    z-index: 2147483647;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: monospace;
    font-size: 11px;
    padding: 4px 8px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: none;
  `,document.body.appendChild(s),e}function E(e){if(!r.highlightOverlay)return;const i=e.getBoundingClientRect(),t=r.highlightOverlay;if(t.style.top=`${i.top}px`,t.style.left=`${i.left}px`,t.style.width=`${i.width}px`,t.style.height=`${i.height}px`,t.style.display="block",s){const n=h(e);s.textContent=n;const o=24,c=4;let u=i.top-o-c;u<0&&(u=i.bottom+c);let l=i.left;l+400>window.innerWidth&&(l=Math.max(0,window.innerWidth-400-c)),s.style.top=`${u}px`,s.style.left=`${l}px`,s.style.display="block"}}function b(e){if(e.id)return`#${CSS.escape(e.id)}`;if(e.classList.length>0){const n=Array.from(e.classList).map(c=>`.${CSS.escape(c)}`).join("");if(document.querySelectorAll(n).length===1)return n}const i=[];let t=e;for(;t&&t!==document.body;){let n=t.tagName.toLowerCase();if(t.id){i.unshift(`#${CSS.escape(t.id)}`);break}t.classList.length>0&&(n+=`.${CSS.escape(t.classList[0])}`);const o=t.parentElement;if(o){const c=Array.from(o.children);if(c.filter(l=>l.tagName===t.tagName).length>1){const l=c.indexOf(t)+1;n+=`:nth-child(${l})`}}i.unshift(n),t=t.parentElement}return i.join(" > ")}function m(e,i){const t=document.evaluate(e,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let n=0;n<t.snapshotLength;n++)if(t.snapshotItem(n)===i)return n+1;return 1}function h(e){const i=e.tagName.toLowerCase();if(e.id){const o=`//${i}[@id="${e.id}"]`;if(document.querySelectorAll(`${i}#${CSS.escape(e.id)}`).length>1){const u=m(o,e);return`(${o})[${u}]`}return o}const t=[];let n=e;for(;n&&n!==document.body&&n!==document.documentElement;){let o=n.tagName.toLowerCase();if(n.id){const u=`//${o}[@id="${n.id}"]`;if(document.querySelectorAll(`${o}#${CSS.escape(n.id)}`).length>1){const d=m(u,n);t.unshift(`(${o}[@id="${n.id}"])[${d}]`)}else t.unshift(`${o}[@id="${n.id}"]`);break}const c=n.parentElement;if(c){const l=Array.from(c.children).filter(d=>d.tagName===n.tagName);if(l.length>1){const d=l.indexOf(n)+1;o+=`[${d}]`}}t.unshift(o),n=n.parentElement}return"//"+t.join("/")}function f(e){if(!r.active)return;const i=e.target;i!==r.highlightOverlay&&i.id!=="quillmonkey-element-picker-overlay"&&(r.currentElement=i,E(i))}function p(e){var i,t;if(r.active&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),r.currentElement)){const n=b(r.currentElement),o=h(r.currentElement);chrome.runtime.sendMessage({action:"elementSelected",selectors:{css:n,xpath:o},elementInfo:{tag:r.currentElement.tagName.toLowerCase(),id:r.currentElement.id||null,classes:Array.from(r.currentElement.classList),text:(t=(i=r.currentElement.textContent)==null?void 0:i.slice(0,50))==null?void 0:t.trim()}}),y()}}function g(e){r.active&&e.key==="Escape"&&(e.preventDefault(),y(),chrome.runtime.sendMessage({action:"elementPickerCancelled"}))}function $(){r.active||(r.active=!0,r.highlightOverlay=x(),document.addEventListener("mousemove",f,!0),document.addEventListener("click",p,!0),document.addEventListener("keydown",g,!0),document.body.style.cursor="crosshair")}function y(){r.active&&(r.active=!1,r.highlightOverlay&&(r.highlightOverlay.remove(),r.highlightOverlay=null),s&&(s.remove(),s=null),document.removeEventListener("mousemove",f,!0),document.removeEventListener("click",p,!0),document.removeEventListener("keydown",g,!0),document.body.style.cursor="",r.currentElement=null)}let a=null;function k(){v(),a=document.createElement("iframe"),a.id="quillmonkey-mic-permission-iframe",a.src=chrome.runtime.getURL("requestPermission.html"),a.setAttribute("allow","microphone"),a.style.cssText=`
    position: fixed;
    top: -1000px;
    left: -1000px;
    width: 1px;
    height: 1px;
    border: none;
    opacity: 0;
    pointer-events: none;
  `,document.body.appendChild(a)}function v(){a&&(a.remove(),a=null)}chrome.runtime.onMessage.addListener((e,i,t)=>(e.action==="ping"?t({success:!0}):e.action==="startElementPicker"?($(),t({success:!0})):e.action==="injectMicPermissionIframe"?(k(),t({success:!0})):e.action==="removeMicPermissionIframe"&&(v(),t({success:!0})),!0))})();
