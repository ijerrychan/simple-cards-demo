(function(){"use strict";const o=document.getElementById("search-input"),e=document.getElementById("search-results-container");let n=null;async function h(){try{const e=await fetch("/index.json");n=await e.json()}catch(e){console.error("Failed to load search data:",e)}}function c(e,t){let n;return function(...s){const o=()=>{clearTimeout(n),e(...s)};clearTimeout(n),n=setTimeout(o,t)}}function i(e){return n.filter(t=>t.title.toLowerCase().includes(e.toLowerCase())||t.content.toLowerCase().includes(e.toLowerCase())||t.tags&&t.tags.some(t=>t.toLowerCase().includes(e.toLowerCase())))}function a(e,t){if(t<=1)return"";let s='<nav class="pagination" role="navigation"><ul>';e>1?s+=`<li><a href="#" class="pagination-prev" data-page="${e-1}">‹</a></li>`:s+=`<li class="disabled"><span>‹</span></li>`;for(let n=1;n<=t;n++)n===e?s+=`<li class="active"><span>${n}</span></li>`:s+=`<li><a href="#" data-page="${n}">${n}</a></li>`;return e<t?s+=`<li><a href="#" class="pagination-next" data-page="${e+1}">›</a></li>`:s+=`<li class="disabled"><span>›</span></li>`,s+="</ul></nav>",s}function r(t){setTimeout(()=>{const n=e.querySelectorAll(".pagination a");n.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const s=parseInt(e.dataset.page);p(t,s)})})},0)}function l(){setTimeout(()=>{const e=document.querySelector(".list-title");e&&e.scrollIntoView()},100)}function s(e,n){const o=d(u(e.content,150),n),s=e.tags?e.tags.map(e=>`<a href="/tags/${e.toLowerCase()}/">#${t(e)}</a>`).join(" "):"",i=e.images&&e.images.length>0,a=i?e.images[0]:null;return i&&a?`
        <div class="card-item has-image">
          <div class="card-image">
            <img src="${a}" alt="${t(e.title)}" loading="lazy">
          </div>
          <div class="card-content">
            <div class="card-header">
              <a href="${e.permalink||e.url}" class="card-title">${e.title}</a>
            </div>
            <div class="card-preview">
              <p class="card-summary">${o}</p>
            </div>
            <div class="article-meta">
              <time datetime="${e.date}">${e.date}</time>
              ${s?`<span class="tags">${s}</span>`:""}
            </div>
          </div>
        </div>
      `:`
        <div class="card-item">
          <div class="card-header">
            <a href="${e.permalink||e.url}" class="card-title">${e.title}</a>
          </div>
          <div class="card-preview">
            <p class="card-summary">${o}</p>
          </div>
          <div class="article-meta">
            <time datetime="${e.date}">${e.date}</time>
            ${s?`<span class="tags">${s}</span>`:""}
          </div>
        </div>
      `}function d(e,n){if(!e||!n)return t(e);const s=t(e),o=t(n),i=new RegExp(`(${o})`,"gi");return s.replace(i,"<mark>$1</mark>")}function u(e,t){return e.length<=t?e:e.substring(0,t)+"..."}function t(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function m(t){if(!n||!t){e&&(e.innerHTML="");return}const s=i(t);f(s,t)}function f(n,o){if(!e)return;if(n.length===0){e.innerHTML=`
        <div class="search-no-results">
          <p>No results found for "${t(o)}"</p>
        </div>
      `;return}const i=10,c=Math.ceil(n.length/i),l=n.slice(0,i),d=l.map(e=>s(e,o)).join(""),u=a(1,c,o);e.innerHTML=d+u,r(o)}function p(t,s){if(!n||!t){e&&(e.innerHTML="");return}const o=i(t);g(o,t,s),l()}function g(n,o,i){if(!e)return;if(n.length===0){e.innerHTML=`
        <div class="search-no-results">
          <p>No results found for "${t(o)}"</p>
        </div>
      `;return}const c=10,d=Math.ceil(n.length/c),l=(i-1)*c,u=l+c,h=n.slice(l,u),m=h.map(e=>s(e,o)).join(""),f=a(i,d,o);e.innerHTML=m+f,r(o)}function v(){o&&o.addEventListener("input",c(e=>{m(e.target.value)},300)),h()}v()})()