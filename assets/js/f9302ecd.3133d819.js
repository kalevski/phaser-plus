"use strict";(self.webpackChunkphaser_plus_docs=self.webpackChunkphaser_plus_docs||[]).push([[179],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>g});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(o),h=n,g=m["".concat(s,".").concat(h)]||m[h]||u[h]||a;return o?r.createElement(g,l(l({ref:t},p),{},{components:o})):r.createElement(g,l({ref:t},p))}));function g(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,l=new Array(a);l[0]=h;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[m]="string"==typeof e?e:n,l[1]=i;for(var c=2;c<a;c++)l[c]=o[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,o)}h.displayName="MDXCreateElement"},911:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=o(7462),n=(o(7294),o(3905));const a={slug:"tutorial-optimize-game-memory",title:"Tutorial - Optimizing Memory Consumption in HTML5 Games",authors:"kalevski",tags:["tutorial"]},l=void 0,i={permalink:"/blog/tutorial-optimize-game-memory",source:"@site/blog/2023-01-11-tutorial-optimize-game-memory.md",title:"Tutorial - Optimizing Memory Consumption in HTML5 Games",description:"Welcome to my blog post about improving game performance through the use of Object pools.",date:"2023-01-11T00:00:00.000Z",formattedDate:"January 11, 2023",tags:[{label:"tutorial",permalink:"/blog/tags/tutorial"}],readingTime:1.36,hasTruncateMarker:!1,authors:[{name:"Daniel Kalevski",title:"Maintainer",url:"https://github.com/kalevski",imageURL:"https://github.com/kalevski.png",key:"kalevski"}],frontMatter:{slug:"tutorial-optimize-game-memory",title:"Tutorial - Optimizing Memory Consumption in HTML5 Games",authors:"kalevski",tags:["tutorial"]},nextItem:{title:"Tutorial - Create Phaser Project",permalink:"/blog/tutorial-phaser-project"}},s={authorsImageUrls:[void 0]},c=[],p={toc:c};function m(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Welcome to my blog post about improving game performance through the use of Object pools."),(0,n.kt)("p",null,"As a game developer, it's likely that you've had to deal with the problem of instantiating a large number of objects for a specific class, such as particles with a short lifetime that need to be destroyed. One of the challenges of this type of game logic is that JavaScript's model is based on the garbage collection pattern, which means that developers do not have direct control over allocated memory."),(0,n.kt)("h1",{id:"problem"},"Problem"),(0,n.kt)("p",null,"When memory locations (variables) are marked as null, they are collected by the garbage collector and removed from memory. However, when the garbage collector needs to dispose of a lot of objects, it takes a lot of processing time, which can negatively impact the performance of the game."),(0,n.kt)("p",null,"In that case, if you profile the memory, you will see something like what is shown in the picture below"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/10467454/211951892-46ea9408-e75d-4804-9229-324a557c515b.jpg",alt:"before"})),(0,n.kt)("h1",{id:"solution"},"Solution"),(0,n.kt)("p",null,"But there's a solution to this problem, and it's called the Object pools pattern."),(0,n.kt)("p",null,"The Object pools pattern is an implementation that helps to reuse disposed objects instead of creating new ones. By reusing objects, we can reduce the number of objects that need to be created and collected by the garbage collector, which in turn improves the performance of the game."),(0,n.kt)("p",null,"After using Object pools, you will get results like this"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/10467454/211951895-162e0910-6e3c-414d-8f40-0e47a5860dca.jpg",alt:"after"})),(0,n.kt)("h1",{id:"phaser-plus-object-pools"},"Phaser Plus Object Pools"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-js"},"class CreateGameObjects extends Scene {\n\n    onCreate() {\n        this.pool.register('myObject', MyObject)\n\n        // create object using pool\n        let turtle = this.pool.obtain('myObject')\n        this.add.existing(turtle)\n\n        // remove object from scene and retreive back to the pool\n        this.children.remove(turtle)\n        this.pool.release(turtle)\n    }\n    \n}\n")))}m.isMDXComponent=!0}}]);