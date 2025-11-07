(function(){"use strict";const s=document.getElementById("search-input"),e=document.getElementById("search-results-container");let n=null;async function j(){try{const e=await fetch(`${window.baseURL}index.json`);n=await e.json(),console.log(`Loaded ${n.length} search items`)}catch(e){console.error("Failed to load search data:",e)}}function p(e,t){let n;return function(...s){const o=()=>{clearTimeout(n),e(...s)};clearTimeout(n),n=setTimeout(o,t)}}function h(e,t,n=150){if(!e||!t)return"";const c=e.toLowerCase(),l=t.toLowerCase(),a=c.indexOf(l);if(a===-1)return"";const r=Math.floor(n/2);let o=Math.max(0,a-r),s=Math.min(e.length,a+t.length+r);if(o>0){const n=e.lastIndexOf(".",o),s=e.lastIndexOf(`
`,o),t=Math.max(n,s);t>o-50&&(o=t+1)}if(s<e.length){const t=e.indexOf(".",s),n=e.indexOf(`
`,s),o=t!==-1&&t<s+50?t+1:n!==-1&&n<s+50?n+1:s;s=o}let i=e.substring(o,s).trim();return o>0&&(i="..."+i),s<e.length&&(i=i+"..."),i}function r(e,t){const s=t.toLowerCase();let n=0;if(e.title&&e.title.toLowerCase().includes(s)&&(n+=100,e.title.toLowerCase()===s&&(n+=50)),e.pageTitle&&e.pageTitle.toLowerCase().includes(s)&&(n+=80),e.content&&e.content.toLowerCase().includes(s)){n+=30;const t=(e.content.toLowerCase().match(new RegExp(s,"g"))||[]).length;n+=Math.min(t*5,20)}return e.tags&&e.tags.forEach(e=>{e.toLowerCase().includes(s)&&(n+=10)}),e.categories&&e.categories.forEach(e=>{e.toLowerCase().includes(s)&&(n+=10)}),e.type==="section"&&(n+=5),n}function c(e){if(!n||!e)return[];const t=e.toLowerCase(),s=n.filter(e=>e.title&&e.title.toLowerCase().includes(t)||e.pageTitle&&e.pageTitle.toLowerCase().includes(t)||e.content&&e.content.toLowerCase().includes(t)||e.tags&&e.tags.some(e=>e.toLowerCase().includes(t))||e.categories&&e.categories.some(e=>e.toLowerCase().includes(t)));return s.sort((t,n)=>{const s=r(t,e),o=r(n,e);return o-s}),s}function l(e,t){if(t<=1)return"";let s='<nav class="pagination" role="navigation"><ul>';e>1?s+=`<li><a href="#" class="pagination-prev" data-page="${e-1}">‹</a></li>`:s+=`<li class="disabled"><span>‹</span></li>`;let o=Math.max(1,e-2),i=Math.min(t,o+4);i-o<4&&(o=Math.max(1,i-4)),o>1&&(s+=`<li><a href="#" data-page="1">1</a></li>`,o>2&&(s+=`<li class="disabled"><span>...</span></li>`));for(let t=o;t<=i;t++)t===e?s+=`<li class="active"><span>${t}</span></li>`:s+=`<li><a href="#" data-page="${t}">${t}</a></li>`;return i<t&&(i<t-1&&(s+=`<li class="disabled"><span>...</span></li>`),s+=`<li><a href="#" data-page="${t}">${t}</a></li>`),e<t?s+=`<li><a href="#" class="pagination-next" data-page="${e+1}">›</a></li>`:s+=`<li class="disabled"><span>›</span></li>`,s+="</ul></nav>",s}function d(t){setTimeout(()=>{const n=e.querySelectorAll(".pagination a");n.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const s=parseInt(e.dataset.page);v(t,s)})})},0)}function f(){setTimeout(()=>{const e=document.querySelector(".list-title");e&&e.scrollIntoView({behavior:"smooth"})},100)}function u(e,n){const a=e.anchor&&e.type==="section",r=a?`${e.permalink}#${e.anchor}`:e.permalink,f=h(e.content,n,150),c=m(f||e.summary,n),s=e.tags?e.tags.map(e=>`<a href="${window.baseURL}tags/${e.toLowerCase()}/">#${t(e)}</a>`).join(" "):"",l=e.images&&e.images.length>0,d=l?e.images[0]:null;let i="";e.type==="section"&&e.pageTitle&&e.pageTitle!==e.title?i=`
        <div class="card-header">
          <a href="${r}" class="card-title">${t(e.title)}</a>
          <div class="section-breadcrumb">来自: ${t(e.pageTitle)}</div>
        </div>
      `:i=`
        <div class="card-header">
          <a href="${r}" class="card-title">${t(e.title)}</a>
        </div>
      `;const u=a?`<span class="anchor-indicator" title="跳转到具体段落">📍</span>`:"";return l&&d?`
        <div class="card-item has-image">
          <div class="card-image">
            <img src="${d}" alt="${t(e.title)}" loading="lazy">
          </div>
          <div class="card-content">
            ${i}
            <div class="card-preview">
              <p class="card-summary">${c}</p>
              ${u}
            </div>
            <div class="article-meta">
              <time datetime="${e.date}">${o(e.date)}</time>
              ${s?`<span class="tags">${s}</span>`:""}
            </div>
          </div>
        </div>
      `:`
        <div class="card-item">
          ${i}
          <div class="card-preview">
            <p class="card-summary">${c}</p>
            ${u}
          </div>
          <div class="article-meta">
            <time datetime="${e.date}">${o(e.date)}</time>
            ${s?`<span class="tags">${s}</span>`:""}
          </div>
        </div>
      `}function o(e){const t=new Date(e);return t.toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"})}function m(e,n){if(!e||!n)return t(e);const s=t(e),o=t(n),i=new RegExp(`(${o})`,"gi");return s.replace(i,"<mark>$1</mark>")}function t(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function a(t){if(!n||!t){e&&(e.innerHTML="");return}const s=c(t);g(s,t)}function g(n,s){if(!e)return;if(n.length===0){e.innerHTML=`
        <div class="search-no-results">
          <p>没有找到与 "${t(s)}" 相关的结果</p>
        </div>
      `;return}const o=10,i=Math.ceil(n.length/o),a=n.slice(0,o),r=a.map(e=>u(e,s)).join(""),c=l(1,i,s);e.innerHTML=r+c,d(s)}function v(t,s){if(!n||!t){e&&(e.innerHTML="");return}const o=c(t);b(o,t,s),f()}function b(n,s,o){if(!e)return;if(n.length===0){e.innerHTML=`
        <div class="search-no-results">
          <p>没有找到与 "${t(s)}" 相关的结果</p>
        </div>
      `;return}const i=10,r=Math.ceil(n.length/i),a=(o-1)*i,c=a+i,h=n.slice(a,c),m=h.map(e=>u(e,s)).join(""),f=l(o,r,s);e.innerHTML=m+f,d(s)}function i(){s&&(s.addEventListener("input",p(e=>{a(e.target.value)},300)),s.addEventListener("keydown",e=>{e.key==="Escape"&&(s.value="",a(""),s.blur())})),j()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i()})()