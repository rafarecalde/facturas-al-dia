// Set ENDPOINT to your Cloudflare Worker URL (default) or a Formspree URL: https://formspree.io/f/XXXX
const ENDPOINT = "https://leads.example.workers.dev/lead";
document.querySelectorAll(".lead-form").forEach(f=>f.addEventListener("submit",async e=>{
  e.preventDefault();const m=f.querySelector(".msg");const d=Object.fromEntries(new FormData(f));
  if(d._gotcha)return; d.source=f.dataset.source; d.page=location.pathname; d.referrer=document.referrer;
  const u=new URLSearchParams(location.search);["utm_source","utm_medium","utm_campaign"].forEach(k=>d[k]=u.get(k)||"");
  m.textContent="Enviando…";
  try{const r=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(d)});
    if(!r.ok)throw 0;f.reset();m.textContent="Gracias. Le contactaremos en un día hábil.";}
  catch{m.textContent="No se pudo enviar. Intente de nuevo o escríbanos por correo.";}
}));
