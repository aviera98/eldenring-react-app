import{a as e,c as t,f as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./entity.fragments-2JLPTsBB.js";import{H as d,V as f,a as p,l as m,n as h,o as g,r as _,s as v,u as y}from"./index-ClUHiT0g.js";import{a as b,i as x,o as S,s as C,t as w}from"./explorer.service-CflyySk6.js";import{t as T}from"./EmptyState-BzpB5XJo.js";import{i as E,n as D}from"./categories-DjUbIlp7.js";var O=d(f(),1),k={bosses:n`
    query GetBossDetail($id: String!) {
      getBoss(id: $id) {
        ...BossFields
      }
    }
    ${a}
  `,weapons:n`
    query GetWeaponDetail($id: String!) {
      getWeapon(id: $id) {
        ...WeaponFields
      }
    }
    ${t}
  `,armor:n`
    query GetArmorDetail($id: String!) {
      getArmor(id: $id) {
        ...ArmorFields
      }
    }
    ${l}
  `,items:n`
    query GetItemDetail($id: String!) {
      getItem(id: $id) {
        ...ItemFields
      }
    }
    ${r}
  `,talismans:n`
    query GetTalismanDetail($id: String!) {
      getTalisman(id: $id) {
        ...TalismanFields
      }
    }
    ${c}
  `,classes:n`
    query GetClassDetail($id: String!) {
      getClass(id: $id) {
        ...ClassFields
      }
    }
    ${s}
  `,spirits:n`
    query GetSpiritDetail($id: String!) {
      getSpirit(id: $id) {
        ...SpiritFields
      }
    }
    ${o}
  `,sorceries:n`
    query GetSorceryDetail($id: String!) {
      getSorcery(id: $id) {
        ...SorceryFields
      }
    }
    ${e}
  `},A=n`
  query ResolveDetailById($id: ID!) {
    boss(id: $id) {
      ...BossFields
    }
    weapon(id: $id) {
      ...WeaponFields
    }
    armor(id: $id) {
      ...ArmorFields
    }
    item(id: $id) {
      ...ItemFields
    }
    talisman(id: $id) {
      ...TalismanFields
    }
    class(id: $id) {
      ...ClassFields
    }
    spirit(id: $id) {
      ...SpiritFields
    }
    sorcery(id: $id) {
      ...SorceryFields
    }
  }
  ${a}
  ${t}
  ${l}
  ${r}
  ${c}
  ${s}
  ${o}
  ${e}
`,j=g(),M=()=>{let{id:e}=m(),[t]=y(),{isFavorite:n,toggleFavorite:r}=h(),a=t.get(`category`),o=a&&E(a)?a:null,s=u(o?k[o]:A,{skip:!e,variables:{id:e}}),c=(0,O.useMemo)(()=>o?w(o,s.data):x(s.data),[o,s.data]);if(!e)return(0,j.jsx)(T,{title:`Invalid detail path`,description:`The requested entity does not have a valid identifier.`});if(s.loading&&!c)return(0,j.jsx)(p,{});if(s.error)return(0,j.jsx)(i,{message:s.error.message,onRetry:()=>{s.refetch()}});if(!c)return(0,j.jsx)(T,{title:`Entity not found`,description:`The archive could not resolve that entity. It may have been removed or the identifier is invalid.`,action:(0,j.jsx)(v,{to:_.home,className:`rounded-full border border-amber-200/30 px-4 py-2 text-sm font-semibold text-amber-50`,children:`Return home`})});let l=n(c.id,c.category);return(0,j.jsxs)(`div`,{className:`space-y-8`,children:[(0,j.jsx)(C,{items:[{label:`Home`,to:_.home},{label:D[c.category].label,to:D[c.category].route},{label:c.name}]}),(0,j.jsx)(`section`,{className:`surface-panel rounded-[2.5rem] p-6 md:p-8`,children:(0,j.jsxs)(`div`,{className:`grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]`,children:[(0,j.jsx)(`div`,{className:`overflow-hidden rounded-[2rem] border border-white/8 bg-black/25`,children:c.image?(0,j.jsx)(`img`,{src:c.image,alt:c.name,className:`h-full min-h-96 w-full object-cover`}):(0,j.jsx)(`div`,{className:`flex min-h-96 items-center justify-center bg-gradient-to-br from-amber-200/10 to-black/40 text-sm uppercase tracking-[0.3em] text-amber-100/65`,children:`No image`})}),(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(`div`,{className:`flex flex-col gap-5 md:flex-row md:items-start md:justify-between`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`text-xs uppercase tracking-[0.35em] text-amber-100/70`,children:c.categoryLabel}),(0,j.jsx)(`h1`,{className:`mt-3 font-display text-5xl text-amber-50`,children:c.name}),c.subtitle?(0,j.jsx)(`p`,{className:`mt-3 text-lg text-stone-300`,children:c.subtitle}):null]}),(0,j.jsx)(S,{isActive:l,onToggle:()=>{r(b(c))}})]}),(0,j.jsx)(`p`,{className:`mt-6 max-w-3xl text-base leading-8 text-stone-300`,children:c.description}),(0,j.jsx)(`div`,{className:`mt-8 grid gap-5 md:grid-cols-2`,children:c.statGroups.map(e=>(0,j.jsxs)(`section`,{className:`rounded-[1.75rem] border border-white/8 bg-black/20 p-5`,children:[(0,j.jsx)(`h2`,{className:`font-display text-2xl text-amber-50`,children:e.title}),(0,j.jsx)(`dl`,{className:`mt-4 space-y-3`,children:e.entries.map(t=>(0,j.jsxs)(`div`,{className:`flex items-start justify-between gap-3 border-b border-white/6 pb-3 text-sm`,children:[(0,j.jsx)(`dt`,{className:`text-stone-400`,children:t.label}),(0,j.jsx)(`dd`,{className:`max-w-[60%] text-right text-stone-100`,children:t.value})]},`${e.title}-${t.label}`))})]},e.title))})]})]})})]})};export{M as default};