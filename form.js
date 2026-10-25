// Inbound notification only, via FormSubmit AJAX.
// The inbox must confirm FormSubmit's first activation email before live submits are delivered.
const ENDPOINT = "https://formsubmit.co/ajax/rrlegal82@gmail.com";
document.querySelectorAll(".lead-form").forEach(f=>f.addEventListener("submit",async e=>{
  e.preventDefault();const m=f.querySelector(".msg");const d=Object.fromEntries(new FormData(f));
  if(d._honey)return;
  d._subject="Lead Cartera Vencida";
  // FormSubmit's default captcha is a separate page. This fetch flow never shows it, so disable it
  // and keep the honeypot (_honey) as the spam check.
  d._captcha="false";
  d.source=f.dataset.source; d.page=location.pathname; d.referrer=document.referrer;
  const u=new URLSearchParams(location.search);["utm_source","utm_medium","utm_campaign"].forEach(k=>d[k]=u.get(k)||"");
  m.textContent="Enviando…";
  try{const r=await fetch(ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(d)});
    const data=await r.json().catch(()=>({}));
    // Refusals come back as HTTP 200 with success: "false" (a non-empty string).
    if(!r.ok||String(data.success)!=="true")throw 0;
    f.reset();m.textContent="Gracias. Le contactaremos en un día hábil.";}
  catch{m.textContent="No se pudo enviar. Intente de nuevo o escríbanos por correo.";}
}));
