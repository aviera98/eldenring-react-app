import{a as e,c as t,f as n,i as r,n as i,o as a,r as o,s,t as c}from"./entity.fragments-2JLPTsBB.js";import{o as l}from"./index-ClUHiT0g.js";import{n as u}from"./explorer.service-CflyySk6.js";import{r as d}from"./categories-DjUbIlp7.js";var f=l(),p=({canGoNext:e,isLoading:t=!1,onPageChange:n,page:r})=>(0,f.jsxs)(`div`,{className:`flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3`,children:[(0,f.jsx)(`button`,{type:`button`,onClick:()=>{n(r-1)},disabled:r<=1||t,className:`rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition enabled:hover:border-amber-200/30 enabled:hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-40`,children:`Previous`}),(0,f.jsxs)(`span`,{className:`text-sm uppercase tracking-[0.25em] text-amber-100/75`,children:[`Page `,r]}),(0,f.jsx)(`button`,{type:`button`,onClick:()=>{n(r+1)},disabled:!e||t,className:`rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition enabled:hover:border-amber-200/30 enabled:hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-40`,children:`Next`})]}),m={bosses:n`
    query GetBosses($search: String, $page: Int, $limit: Int) {
      boss(search: $search, page: $page, limit: $limit) {
        ...BossFields
      }
    }
    ${i}
  `,weapons:n`
    query GetWeapons($search: String, $page: Int, $limit: Int) {
      weapon(search: $search, page: $page, limit: $limit) {
        ...WeaponFields
      }
    }
    ${t}
  `,armor:n`
    query GetArmor($search: String, $page: Int, $limit: Int) {
      armor(search: $search, page: $page, limit: $limit) {
        ...ArmorFields
      }
    }
    ${c}
  `,items:n`
    query GetItems($search: String, $page: Int, $limit: Int) {
      item(search: $search, page: $page, limit: $limit) {
        ...ItemFields
      }
    }
    ${r}
  `,talismans:n`
    query GetTalismans($search: String, $page: Int, $limit: Int) {
      talisman(search: $search, page: $page, limit: $limit) {
        ...TalismanFields
      }
    }
    ${s}
  `,classes:n`
    query GetClasses($search: String, $page: Int, $limit: Int) {
      class(search: $search, page: $page, limit: $limit) {
        ...ClassFields
      }
    }
    ${o}
  `,spirits:n`
    query GetSpirits($search: String, $page: Int, $limit: Int) {
      spirit(search: $search, page: $page, limit: $limit) {
        ...SpiritFields
      }
    }
    ${a}
  `,sorceries:n`
    query GetSorceries($search: String, $page: Int, $limit: Int) {
      sorcery(search: $search, page: $page, limit: $limit) {
        ...SorceryFields
      }
    }
    ${e}
  `},h=50,g=20,_=e=>e.normalize(`NFD`).replaceAll(/\p{Diacritic}/gu,``).trim().toLocaleLowerCase(),v=(e,t)=>{let n=_(t);return n?_([e.name,e.description,e.subtitle,e.categoryLabel,...e.tags].filter(Boolean).join(` `)).includes(n):!0},y=async(e,t,n)=>u(t,(await e.query({query:m[t],variables:{limit:h,page:n},fetchPolicy:`network-only`})).data),b=async(e,t,n)=>{let r=[];for(let n=1;n<=g;n+=1){let i=await y(e,t,n);if(i.length===0||(r.push(...i),i.length<h))break}return r.filter(e=>v(e,n))},x=async(e,t)=>(await Promise.all(d.map(async n=>b(e,n,t)))).flat();export{p as i,b as n,m as r,x as t};