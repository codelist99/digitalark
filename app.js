const offers = [
  { id:'wificode', name:'WiFi Code', short:'WC', admin:'https://wificode.dev/admin', description:'Campaign performance, payments, leads, buyers and automations.' },
  { id:'cashtap', name:'CashTap AI', short:'CT', admin:'https://cashtapai-peach.vercel.app/admin', description:'NMI funnel performance, upsells, payments, leads and buyers.' }
];
const $=id=>document.getElementById(id),tabs=$('offer-tabs'),frame=$('dashboard');
let active;
function select(id,push=true){
  active=offers.find(x=>x.id===id)||offers[0];
  tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x.dataset.id===active.id));
  $('offer-name').textContent=active.name;
  $('offer-description').textContent=active.description;
  $('open').href=active.admin;
  $('loading').hidden=false;
  frame.src=active.admin;
  if(push)history.replaceState(null,'',`#${active.id}`);
  check();
}
async function check(){
  const status=$('status');status.className='status checking';status.innerHTML='<i></i> Checking';
  try{await fetch(active.admin,{mode:'no-cors',cache:'no-store'});status.className='status good';status.innerHTML='<i></i> Online'}catch{status.className='status bad';status.innerHTML='<i></i> Unreachable'}
}
tabs.innerHTML=offers.map(x=>`<button data-id="${x.id}"><span>${x.short}</span>${x.name}</button>`).join('')+'<button class="add" disabled>＋ Add offer</button>';
tabs.onclick=e=>{const button=e.target.closest('button[data-id]');if(button)select(button.dataset.id)};
frame.onload=()=>{$('loading').hidden=true};
$('reload').onclick=()=>{frame.src=active.admin;check()};
setInterval(()=>{$('clock').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})},1000);
select(location.hash.slice(1),false);
