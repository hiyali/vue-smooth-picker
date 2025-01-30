(function(c,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],a):(c=typeof globalThis<"u"?globalThis:c||self,a(c.VueSmoothPicker={},c.Vue))})(this,function(c,a){"use strict";const S={class:"smooth-picker flex-box"},G={class:"smooth-list"},T=((d,_)=>{const g=d.__vccOpts||d;for(const[s,v]of _)g[s]=v;return g})(a.defineComponent({__name:"SmoothPicker",props:{data:{default:()=>[]},onChange:{type:Function,default:()=>{}}},emits:["onChange"],setup(d,{expose:_,emit:g}){const s=d,v=g,r=a.ref(s.data.map(e=>{var o;const t=e.currentIndex;return typeof t=="number"&&t>=0&&((o=e.list)!=null&&o.length)&&t<=e.list.length-1?Math.round(t):0})),m=a.ref([...r.value]),l=a.ref({isTouchable:"ontouchstart"in window,isMouseDown:!1,isDragging:!1,groupIndex:null,startPageY:null}),x=a.ref([]),E=a.ref([]),f=a.ref(),w=a.ref(null),y=a.ref(null),u=()=>{E.value&&(x.value=E.value.map(e=>e.getBoundingClientRect()))},b=e=>{e.cancelable&&(e.preventDefault(),e.stopPropagation());const t=l.value.isTouchable?e.touches[0]:e;l.value.startPageY=t.pageY,l.value.isTouchable||(l.value.isMouseDown=!0)},k=e=>{if(e.cancelable&&(e.preventDefault(),e.stopPropagation()),l.value.isTouchable||l.value.isMouseDown){l.value.isDragging=!0;const t=B(e);l.value.groupIndex===null&&(l.value.groupIndex=M(e));const o=l.value.groupIndex;if(typeof o!="number"||s.data[o].divider||!s.data[o].list||!l.value.startPageY||!("pageY"in t))return;const n=(l.value.startPageY-t.pageY)/32,i=r.value[o]+n;r.value[o]=i,l.value.startPageY=t.pageY}},p=e=>{e.cancelable&&(e.preventDefault(),e.stopPropagation()),l.value.isDragging||N(e),l.value.isDragging=!1,l.value.isMouseDown=!1,O()},C=p,N=e=>{const t=M(e),o=e.target;if(typeof t=="number")switch(o.dataset.type){case"top":X(e,t);break;case"middle":R(e,t);break;case"bottom":j(e,t);break}},B=e=>l.value.isTouchable?e.changedTouches[0]||e.touches[0]:e,M=e=>{const t=B(e);if(!("pageX"in t))return null;for(let o=0;o<x.value.length;o++){const n=x.value[o];if(n.left<t.pageX&&t.pageX<n.right)return o}return null},O=()=>{const e=l.value.groupIndex;if(typeof e=="number"&&s.data[e].divider!==!0&&s.data[e].list&&s.data[e].list.length>0){const t=r.value[e];let o=t;t>s.data[e].list.length-1?o=s.data[e].list.length-1:t<0&&(o=0),o=Math.round(o),r.value[e]=o,o!==m.value[e]&&v("onChange",e,o),m.value=[...r.value]}l.value.groupIndex=null,l.value.startPageY=null},V=(e,t)=>{const o=r.value[e]-t;if(Math.abs(o)<4){let n=`transform: rotateX(${o*23}deg) translate3d(0, 0, 5.625em);`;return l.value.isDragging||(n+=" transition: transform 150ms ease-out;"),n}return o>0?"transform: rotateX(90deg) translate3d(0, 0, 5.625em)":"transform: rotateX(-90deg) translate3d(0, 0, 5.625em)"},z=e=>{const t=s.data[e],n=["flex-"+(t.flex||1)];return t.className&&n.push(t.className),n},D=(e,t,o=!1)=>{const n=[],i=s.data[e];return i.textAlign&&n.push("text-"+i.textAlign),!o&&r.value[e]===t&&n.push("smooth-item-selected"),n},F=e=>{const t=s.data;typeof e=="number"&&typeof t[e].onClick=="function"&&t[e].onClick(e,r.value[e])},X=(e,t)=>{const o=r.value[t]+1;r.value[t]=o,P(e,t)},R=(e,t)=>{F(t)},j=(e,t)=>{const o=r.value[t]-1;r.value[t]=o,P(e,t)},P=(e,t)=>{setTimeout(()=>{if(!(typeof t!="number"||!s.data[t]||!s.data[t].list)&&s.data[t].divider!==!0&&s.data[t].list.length>0){const o=r.value[t];let n=o;o>s.data[t].list.length-1?n=s.data[t].list.length-1:o<0&&(n=0),n=Math.round(n),r.value[t]=n,n!==m.value[t]&&v("onChange",t,n),m.value=[...r.value]}},100)},A=(e,t)=>{const o=t.currentIndex;let n=0;typeof o=="number"&&o>=0&&t.list&&t.list.length&&o<=t.list.length-1&&(n=Math.round(o)),r.value[e]=n,m.value=[...r.value];const i=t.flex;i&&s.data[e].flex!==i&&H(),s.data[e]=t},H=()=>{h.value!==null&&clearTimeout(h.value),h.value=setTimeout(()=>{u()},200)},h=a.ref(null),q=()=>new MutationObserver(e=>{e.forEach(t=>{if(t.type==="attributes"){const n=t.target.style.display;n!=="none"&&w.value!==n&&(w.value=n,a.nextTick(u))}})});return _({setGroupData:A,getCurrentIndexList:()=>r.value,getGroupsRectList:u}),a.onMounted(()=>{if(u(),a.nextTick(u),y.value=q(),y.value.observe(f.value,{attributes:!0}),window.addEventListener("resize",u),f.value){const e=l.value.isTouchable?{touchstart:b,touchmove:k,touchend:p,touchcancel:C}:{mousedown:b,mousemove:k,mouseup:p,mouseleave:C};Object.entries(e).forEach(([t,o])=>{var n;(n=f.value)==null||n.addEventListener(t,o)})}}),a.onBeforeUnmount(()=>{if(h.value!==null&&clearTimeout(h.value),y.value&&y.value.disconnect(),window.removeEventListener("resize",u),f.value){const e=l.value.isTouchable?{touchstart:b,touchmove:k,touchend:p,touchcancel:C}:{mousedown:b,mousemove:k,mouseup:p,mouseleave:C};Object.entries(e).forEach(([t,o])=>{var n;(n=f.value)==null||n.removeEventListener(t,o)})}}),(e,t)=>(a.openBlock(),a.createElementBlock("div",S,[(a.openBlock(!0),a.createElementBlock(a.Fragment,null,a.renderList(e.data,(o,n)=>(a.openBlock(),a.createElementBlock("div",{ref_for:!0,ref_key:"smoothGroup",ref:E,key:n,class:a.normalizeClass(["smooth-group",z(n)])},[a.createElementVNode("div",G,[o.divider?(a.openBlock(),a.createElementBlock("div",{key:0,class:a.normalizeClass(["smooth-item divider",D(n,0,!0)])},a.toDisplayString(o.text),3)):(a.openBlock(!0),a.createElementBlock(a.Fragment,{key:1},a.renderList(o.list,(i,L)=>(a.openBlock(),a.createElementBlock("div",{key:L,class:a.normalizeClass(["smooth-item",D(n,L)]),style:a.normalizeStyle(V(n,L))},a.toDisplayString(i.value||i),7))),128))])],2))),128)),a.createElementVNode("div",{ref_key:"smoothHandleLayer",ref:f,class:"smooth-handle-layer flex-box direction-column"},t[0]||(t[0]=[a.createElementVNode("div",{"data-type":"top",class:"smooth-top flex-1"},null,-1),a.createElementVNode("div",{"data-type":"middle",class:"smooth-middle"},null,-1),a.createElementVNode("div",{"data-type":"bottom",class:"smooth-bottom flex-1"},null,-1)]),512)]))}}),[["__scopeId","data-v-1403f61c"]]),Y="1.0.0-beta.6",I={install:d=>{d.component("smooth-picker",T)}};c.SmoothPicker=T,c.default=I,c.version=Y,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
