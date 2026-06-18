import{a as e,c as t,d as n,f as r,i,l as a,n as o,o as s,r as c,s as l,t as u,u as d}from"./entity.fragments-2JLPTsBB.js";import{H as f,V as p,o as m,r as h,s as g,u as _}from"./index-ClUHiT0g.js";import{n as v,r as y,s as b}from"./explorer.service-CflyySk6.js";import{t as x}from"./EmptyState-BzpB5XJo.js";import{i as S}from"./categories-DjUbIlp7.js";import{t as C}from"./ItemCard-Brx2dBcQ.js";import{i as w,n as T,r as E,t as D}from"./searchFallback.service-CVwLex1j.js";import{t as O}from"./SearchBar-CYqyZmtv.js";var k=f(p(),1),A=r`
  query SearchAcrossCategories($search: String, $limit: Int, $page: Int) {
    boss(search: $search, limit: $limit, page: $page) {
      ...BossFields
    }
    weapon(search: $search, limit: $limit, page: $page) {
      ...WeaponFields
    }
    armor(search: $search, limit: $limit, page: $page) {
      ...ArmorFields
    }
    item(search: $search, limit: $limit, page: $page) {
      ...ItemFields
    }
    talisman(search: $search, limit: $limit, page: $page) {
      ...TalismanFields
    }
    class(search: $search, limit: $limit, page: $page) {
      ...ClassFields
    }
    spirit(search: $search, limit: $limit, page: $page) {
      ...SpiritFields
    }
    sorcery(search: $search, limit: $limit, page: $page) {
      ...SorceryFields
    }
  }
  ${o}
  ${t}
  ${u}
  ${i}
  ${l}
  ${c}
  ${s}
  ${e}
`,j=(e,t=250)=>{let[n,r]=(0,k.useState)(e);return(0,k.useEffect)(()=>{let n=window.setTimeout(()=>{r(e)},t);return()=>{window.clearTimeout(n)}},[t,e]),n},M=e=>e===`all`?`all`:e&&S(e)?e:`all`,N=()=>{let e=n(),[t,r]=_(),i=M(t.get(`category`)),a=t.get(`q`)??``,o=Math.max(1,Number(t.get(`page`)??`1`)||1),s=j((0,k.useDeferredValue)(a.trim()),250),[c,l]=(0,k.useState)([]),[u,f]=(0,k.useState)(null),[p,m]=(0,k.useState)(!1),[h,g]=(0,k.useState)(0),b=s.length>0,x=d(i===`all`?A:E[i],{skip:b,variables:{limit:12,page:o,search:s||void 0},notifyOnNetworkStatusChange:!0});(0,k.useEffect)(()=>{if(!b)return;let t=!1;return(async()=>{m(!0),f(null);try{let n=i===`all`?await D(e,s):await T(e,i,s);t||l(n)}catch(e){t||(f(e instanceof Error?e.message:`Search failed.`),l([]))}finally{t||m(!1)}})(),()=>{t=!0}},[e,s,b,h,i]);let S=(0,k.useMemo)(()=>i===`all`?y(x.data):v(i,x.data),[x.data,i]),C=(0,k.useMemo)(()=>{if(!b)return S;let e=(o-1)*12;return c.slice(e,e+12)},[c,b,o,S]),w=e=>{r({category:e.category,page:`1`,...e.query?{q:e.query.trim()}:{}},{replace:!1})},O=e=>{r({category:i,page:String(e),...a?{q:a}:{}},{replace:!1})},N=(0,k.useCallback)(()=>{if(b){g(e=>e+1);return}x.refetch()},[b,x]);return{...x,error:b&&u?Error(u):x.error,items:C,loading:b?p:x.loading,page:o,query:a,retrySearch:N,scope:i,setPage:O,totalItems:b?c.length:S.length,updateSearch:w}},P=m(),F=()=>{let{error:e,items:t,loading:n,page:r,query:i,retrySearch:o,scope:s,setPage:c,totalItems:l,updateSearch:u}=N();return n&&t.length===0?(0,P.jsx)(`div`,{className:`surface-panel rounded-[2rem] px-6 py-12 text-center`,children:`Loading search...`}):e?(0,P.jsx)(a,{message:e.message,onRetry:()=>{o()}}):(0,P.jsxs)(`div`,{className:`space-y-8`,children:[(0,P.jsx)(b,{items:[{label:`Home`,to:h.home},{label:`Search`}]}),(0,P.jsxs)(`section`,{className:`surface-panel rounded-[2.5rem] px-6 py-8 md:px-8`,children:[(0,P.jsx)(`p`,{className:`text-xs uppercase tracking-[0.35em] text-amber-100/70`,children:`Global search`}),(0,P.jsx)(`h1`,{className:`mt-3 font-display text-5xl text-amber-50`,children:`Search the archive`}),(0,P.jsx)(`p`,{className:`mt-4 max-w-3xl text-base leading-8 text-stone-300`,children:`Search across every supported entity or narrow the scope to a single category without moving to another screen.`}),(0,P.jsx)(O,{className:`mt-8`,defaultValues:{category:s,query:i},onSearch:u,submitLabel:`Refresh results`})]}),t.length===0?(0,P.jsx)(x,{title:`No discoveries yet`,description:`Try another term or browse one of the archive categories directly.`,action:(0,P.jsx)(g,{to:h.home,className:`rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50`,children:`Back to home`})}):(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`p`,{className:`text-xs uppercase tracking-[0.35em] text-amber-100/70`,children:`Results`}),(0,P.jsx)(`h2`,{className:`mt-2 font-display text-3xl text-amber-50`,children:i?`Matches for "${i}"`:`Curated archive snapshot`})]}),(0,P.jsxs)(`p`,{className:`text-sm text-stone-300`,children:[l,` entries matched`]})]}),(0,P.jsx)(`div`,{className:`grid gap-6 lg:grid-cols-2`,children:t.map(e=>(0,P.jsx)(C,{item:e},`${e.category}-${e.id}`))}),(0,P.jsx)(w,{page:r,isLoading:n,canGoNext:r*12<l,onPageChange:c})]})]})};export{F as default};