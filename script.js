/* Меню: правьте названия, состав, вес и цену */
const DISHES = [
  {n:"Тартар из лосося",        d:"Авокадо, каперсы, чипсы из нори",   w:"60 г",  p:420, t:["cold"]},
  {n:"Брускетта с рикоттой",    d:"Печёная свёкла, мёд, орех",          w:"50 г",  p:260, t:["cold","veg"]},
  {n:"Салат с тыквой",          d:"Рукола, фета, кедровый орех",        w:"180 г", p:390, t:["cold","veg","gf"]},
  {n:"Утиная грудка",           d:"Соус из вишни, пюре из сельдерея",   w:"220 г", p:890, t:["hot","gf"]},
  {n:"Ризотто с белыми грибами",d:"Пармезан, трюфельное масло",         w:"250 г", p:640, t:["hot","veg","gf"]},
  {n:"Стейк из индейки",        d:"Овощи гриль, соус демиглас",         w:"240 г", p:720, t:["hot"]},
  {n:"Панна-котта",             d:"Малиновое кули, мята",               w:"90 г",  p:310, t:["sweet","veg","gf"]},
  {n:"Эклеры ассорти",          d:"Фисташка, ваниль, карамель",         w:"40 г",  p:240, t:["sweet","veg"]}
];
const list = document.getElementById("dishes");
function render(f){
  list.innerHTML = DISHES.filter(d => f === "all" || d.t.includes(f)).map(d =>
    `<li><div><h3>${d.n}</h3><p>${d.d}</p></div><span class="w">${d.w}</span><span class="pr">${d.p} ₽</span></li>`).join("");
}
document.querySelector(".filters").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === b));
  render(b.dataset.f);
});
render("all");

/* Вкладки с работами */
const tabs=[...document.querySelectorAll(".tab")];
function openTab(t){
  tabs.forEach(b=>{
    const on=b===t;
    b.classList.toggle("on",on);
    b.setAttribute("aria-selected",on);
    b.tabIndex=on?0:-1;
    document.getElementById(b.getAttribute("aria-controls")).hidden=!on;
  });
}
tabs.forEach((t,i)=>{
  t.addEventListener("click",()=>openTab(t));
  t.addEventListener("keydown",e=>{
    const d={ArrowRight:1,ArrowLeft:-1}[e.key]; if(!d) return;
    const n=tabs[(i+d+tabs.length)%tabs.length]; n.focus(); openTab(n);
  });
});

/* Меню на телефоне (если не сработает, остальной сайт продолжит работать) */
(function(){try{
  var b=document.querySelector(".burger"),n=document.getElementById("nav");
  if(!b||!n)return;
  function set(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Закрыть меню":"Открыть меню");}
  b.addEventListener("click",function(){set(!n.classList.contains("open"));});
  n.addEventListener("click",function(e){if(e.target.closest("a"))set(false);});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")set(false);});
}catch(e){}})();
