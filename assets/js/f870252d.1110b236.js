"use strict";(self.webpackChunkphaser_plus_docs=self.webpackChunkphaser_plus_docs||[]).push([[992],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>b});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(r),u=a,b=m["".concat(i,".").concat(u)]||m[u]||d[u]||o;return r?n.createElement(b,c(c({ref:t},p),{},{components:r})):n.createElement(b,c({ref:t},p))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[m]="string"==typeof e?e:a,c[1]=s;for(var l=2;l<o;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4900:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:2},c="Create game object",s={unversionedId:"guide/create-object",id:"guide/create-object",title:"Create game object",description:"Learn how to create game objects and reuse them.",source:"@site/docs/guide/create-object.md",sourceDirName:"guide",slug:"/guide/create-object",permalink:"/docs/guide/create-object",draft:!1,editUrl:"https://github.com/kalevski/phaser-plus/tree/main/_docs/docs/guide/create-object.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Project structure",permalink:"/docs/guide/project-structure"},next:{title:"Scene Layers",permalink:"/docs/guide/scene-layers"}},i={},l=[{value:"GameObject class",id:"gameobject-class",level:2},{value:"Game Object Pool",id:"game-object-pool",level:2}],p={toc:l},m="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(m,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-game-object"},"Create game object"),(0,a.kt)("p",null,"Learn how to create game objects and reuse them."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"phaser-plus")," provides a subclass of ",(0,a.kt)("strong",{parentName:"p"},"Phaser.GameObjects.Container")," with its own lifecycle and API for the object pool pattern."),(0,a.kt)("h2",{id:"gameobject-class"},"GameObject class"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"GameObject")," is a class that extends ",(0,a.kt)("strong",{parentName:"p"},"Phaser.GameObjects.Container")," to provide a lifecycle inside the class (onCreate, onAdd, onRemove, onUpdate, onDestroy). It also has a unique identifier property called id."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title=prefabs/MyGameObject.js showLineNumbers",title:"prefabs/MyGameObject.js",showLineNumbers:!0},"import { GameObject } from '@phaser-plus/core'\n\nclass MyGameObject extends GameObject {\n\n    onCreate() {\n        // invoked only once when the object is created or instantiated\n    }\n\n    onAdd(parent) {\n        // invoked when the object is added as a child of another GameObject or Layer\n    }\n\n    onUpdate(time, delta) {\n        // invoked on each frame while the object is a child of another game object\n    }\n\n    onRemove(parent) {\n        // invoked when the object is removed from the parent\n    }\n\n    onDestroy() {\n        // invoked when the object is destroyed\n    }\n\n}\n\nexport default MyGameObject\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("strong",{parentName:"p"},"GameObject")," lifecycle moethds are invoked if the ",(0,a.kt)("strong",{parentName:"p"},"GameObject")," is added as a child of another GameObject or ",(0,a.kt)("strong",{parentName:"p"},"Layer"),", To learn more about layers go to ",(0,a.kt)("a",{parentName:"p",href:"/docs/guide/scene-layers"},"next guide"),".")),(0,a.kt)("h2",{id:"game-object-pool"},"Game Object Pool"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"@phaser-plus/core#Scene")," provides pool API for managing game object instances.\nA game object pool can help boost game performance and reduce the workload on the garbage collector."),(0,a.kt)("p",null,"To use the Game Object Pool, you first need to register the ",(0,a.kt)("strong",{parentName:"p"},"GameObject"),". This can be done by executing:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"this.pool.register('my-game-object', MyGameObject)\n")),(0,a.kt)("p",null,"After registration, you can use the ",(0,a.kt)("strong",{parentName:"p"},"obtain")," method to get an object from the pool."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"let myGameObject = this.pool.obtain('my-game-object') // returns instance of MyGameObject \n")),(0,a.kt)("p",null,"When you need to remove a game object from the scene, simply remove it from the parent container and execute:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"this.pool.release(myGameObject)\n")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/examples/run?demo=create-game-objects"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/CHECK_EXAMPLE-blue?style=for-the-badge",alt:"Check example"}))))}d.isMDXComponent=!0}}]);