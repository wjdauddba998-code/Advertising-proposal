
const slides=[...document.querySelectorAll('.slide')];
const nav=[...document.querySelectorAll('nav button')];
const current=document.getElementById('current');
const dots=document.getElementById('dots');
let index=0;
slides.forEach((_,i)=>{
  const b=document.createElement('button');
  b.setAttribute('aria-label',`${i+1}페이지`);
  b.addEventListener('click',()=>go(i));
  dots.appendChild(b);
});
function go(i){
  index=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===index));
  nav.forEach((b,n)=>b.classList.toggle('active',n===index));
  [...dots.children].forEach((b,n)=>b.classList.toggle('active',n===index));
  current.textContent=String(index+1).padStart(2,'0');
}
document.getElementById('prev').onclick=()=>go(index-1);
document.getElementById('next').onclick=()=>go(index+1);
nav.forEach((b,i)=>b.onclick=()=>go(i));
window.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='PageDown') go(index+1);
  if(e.key==='ArrowLeft'||e.key==='PageUp') go(index-1);
});
let startX=null;
window.addEventListener('touchstart',e=>startX=e.touches[0].clientX,{passive:true});
window.addEventListener('touchend',e=>{
  if(startX===null)return;
  const dx=e.changedTouches[0].clientX-startX;
  if(Math.abs(dx)>60) go(index+(dx<0?1:-1));
  startX=null;
},{passive:true});
go(0);
