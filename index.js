import{a as p,S as d,i as a}from"./assets/vendor-D8hBcPQM.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const m="52827069-8d460a0c946a5f422e59aa590",h="https://pixabay.com/api/";function g(i){const o={key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};return p.get(h,{params:o}).then(t=>t.data).catch(t=>{throw console.error("Помилка запиту:",t),t})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),y=new d(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const o=i.map(({webformatURL:t,largeImageURL:s,tags:e,likes:r,views:n,comments:u,downloads:f})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${t}" alt="${e}" />
      </a>
      <div class="info">
        <p>👍 ${r}</p>
        <p>👁️ ${n}</p>
        <p>💬 ${u}</p>
        <p>⬇️ ${f}</p>
      </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",o),y.refresh()}function S(){c.innerHTML=""}function b(){l.classList.remove("hidden")}function q(){l.classList.add("hidden")}const w=document.querySelector(".form"),v=document.querySelector('input[name="search-text"]');w.addEventListener("submit",i=>{i.preventDefault();const o=v.value.trim();if(!o){a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}S(),b(),g(o).then(t=>{if(!t.hits||t.hits.length===0){a.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(t.hits)}).catch(t=>{console.error("Fetch error:",t),a.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})}).finally(()=>{q(),i.target.reset()})});
//# sourceMappingURL=index.js.map
