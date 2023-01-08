(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{158:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a.n(n),l=a(11),r=a.n(l),m=a(13),o=function(){return c.a.createElement("div",null,c.a.createElement("h1",null,"404 - Not Found!"),c.a.createElement(m.b,{to:"/"},"Go Home"))},s=a(5),i=a(6),u=a(48),d=a.n(u),p=a(15),E=a.n(p),b=(a(31),a(18)),h=a(49),v=a(50),g=a(47),f=a(8);function y(e){var t=e.text,a=e.placement,l=e.id,r=Object(n.useState)(!1),m=Object(i.a)(r,2),o=m[0],s=m[1];return c.a.createElement(f.f,{placement:a,isOpen:o,target:l,toggle:function(){return s(!o)}},t)}var N=function(){var e=Object(s.f)(),t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],r=a[1],m=Object(n.useState)(""),o=Object(i.a)(m,2),u=o[0],p=o[1],N=Object(n.useState)(""),k=Object(i.a)(N,2),O=k[0],j=k[1],x=Object(n.useState)(!1),C=Object(i.a)(x,2),w=C[0],S=C[1],L=Object(n.useState)(""),R=Object(i.a)(L,2),U=R[0],I=R[1],D=Object(n.useState)(!1),T=Object(i.a)(D,2),q=T[0],B=T[1];function H(e){"url"===e.target.name?p(e.target.value):j(e.target.value)}function M(e){if(e.preventDefault(),!d.a.isURL(u))return I("Invalid URL"),void B(!0);var t=O.trim();if(0===t.length)E.a.post("/api/new",{url:u}).then((function(e){if(e.data.error)return I(e.data.error),void B(!0);S(!0),r(e.data.shorten)}));else{if(!(t.length>2))return I("Short ID must be 3 characters or more!"),void B(!0);E.a.post("/api/new-custom",{url:u,shortID:O}).then((function(e){if(e.data.error)return I(e.data.error),void B(!0);S(!0),r(e.data.shorten)}))}}return c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"container text-center"},c.a.createElement("h1",{className:" heading"},"Short Links, Big Results"),c.a.createElement("p",{className:"mt-3 para"},"These long links can't stop you , we are here to support you!"),c.a.createElement("div",{className:"fcont"},c.a.createElement("h3",{className:"topic mb-3"},"Shorten URL"),c.a.createElement(f.c,{onSubmit:M},w?c.a.createElement("div",{className:"row my-4"},c.a.createElement(f.e,{className:"mt-2 mb-2",name:"shortURL",id:"shortURL",value:l}),c.a.createElement(y,{placement:"top",text:"Copy to Clipboard",key:0,id:"paste"}),c.a.createElement(f.b,{onClick:function(){navigator.clipboard.writeText(l)},className:"icon-btn col-2 my-2 px-2 py-2 mx-3",id:"paste"},c.a.createElement(b.a,null)),c.a.createElement(y,{placement:"top",text:"Generate QR Code",key:1,id:"qr"}),c.a.createElement(f.b,{onClick:function(){!function(){var e=document.getElementById("qr-gen").toDataURL("image/png").replace("image/png","image/octet-stream"),t=document.createElement("a");t.href=e,t.download="".concat(Object(g.a)(5),".png"),document.body.appendChild(t),t.click(),document.body.removeChild(t)}()},className:"icon-btn col-2 my-2 px-2 py-2 mx-3",id:"qr"},c.a.createElement(b.b,null)),c.a.createElement(y,{placement:"top",text:"Open in New Tab",key:2,id:"share"}),c.a.createElement(f.b,{onClick:function(){window.open(l,"_blank")},className:"icon-btn col-2 my-2 px-2 py-2 mx-3",id:"share"},c.a.createElement(h.a,null)),c.a.createElement(y,{placement:"top",text:"Clear Text",key:3,id:"clear"}),c.a.createElement(f.b,{onClick:function(){p(""),j(""),r(""),S(!1)},className:"icon-btn col-2 my-2 px-2 py-2 mx-3",id:"clear"},c.a.createElement(b.c,null))):c.a.createElement(f.d,null,c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-8"},c.a.createElement(f.e,{className:"mt-2 mb-2",name:"url",value:u,id:"longUrl",placeholder:"Enter the Long Link",onChange:H})),c.a.createElement("div",{className:"col-12 col-md-4"},c.a.createElement(f.e,{className:"mt-2 mb-2",type:"text",id:"shortId",value:O,placeholder:"Short Id",onChange:H})))),q&&U.length>0&&c.a.createElement(f.a,{color:"danger",isOpen:q,toggle:function(){return B(!1)}},U),c.a.createElement("div",{className:"row"},c.a.createElement(f.b,{type:"submit",onClick:M,outline:!0,disabled:w,color:"success",className:"col-8 mt-2 py-3 mb-2 mx-2 col-sm-3"},"Make this short"),c.a.createElement(f.b,{onClick:function(){e("/click")},className:"col-8 my-2 py-3 mx-2 col-sm-3"},"How many Clicks?")),c.a.createElement(v.a,{style:{display:"none"},id:"qr-gen",value:u,size:290,level:"H",includeMargin:!0})))))};var k=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(0),m=Object(i.a)(r,2),o=m[0],u=m[1],d=Object(n.useState)(!1),p=Object(i.a)(d,2),b=p[0],h=p[1],v=Object(n.useState)(""),g=Object(i.a)(v,2),y=g[0],N=g[1],k=Object(n.useState)(!1),O=Object(i.a)(k,2),j=O[0],x=O[1],C=Object(s.f)();function w(e){e.preventDefault(),E.a.post("/api/click",{url:a}).then((function(e){e.data.error?(N(e.data.error),x(j)):200===e.status&&(h(!0),u(e.data.click))}))}return c.a.createElement("div",{className:"countClick"},c.a.createElement("div",{className:"container text-center"},c.a.createElement("h1",{className:" heading"},"Short Links, Big Results"),c.a.createElement("p",{className:"mt-3 para"},"These long links can't stop you , we are here to support you!"),c.a.createElement("div",{className:"fcont"},c.a.createElement("h3",{className:"topic mb-3"},"URL Clicks"),c.a.createElement(f.c,{onSubmit:w},c.a.createElement(f.d,null,c.a.createElement("div",{className:"row"},c.a.createElement(f.e,{className:"mt-2 mb-2",name:"url",id:"longUrl",placeholder:"URL",onChange:function(e){l(e.target.value)}}))),b&&c.a.createElement("div",{className:"row my-3"},c.a.createElement("h2",{className:"col-md-9"},"Your link has been visited"),c.a.createElement("div",{className:"count col-md-3"},o," ",o>1?"times":"time")),j&&y.length>0&&c.a.createElement(f.a,{color:"danger",isOpen:j,toggle:function(){return x(!1)}},y),c.a.createElement("div",{className:"row"},c.a.createElement(f.b,{type:"submit",onClick:w,outline:!0,color:"success",className:"col-8 mt-2 py-3 mb-2 mx-2 col-sm-3"},"How many Clicks?"),c.a.createElement(f.b,{onClick:function(){C("/")},className:"col-8 my-2 py-3 mx-2 col-sm-3"},"Make this short"))))))};var O=function(){return c.a.createElement(m.a,null,c.a.createElement(s.c,null,c.a.createElement(s.a,{path:"/",element:c.a.createElement(N,null)}),c.a.createElement(s.a,{path:"/:click",element:c.a.createElement(k,null)}),c.a.createElement(s.a,{path:"*",element:c.a.createElement(o,null)})))};r.a.render(c.a.createElement(O,null),document.getElementById("root"))},54:function(e,t,a){e.exports=a(158)}},[[54,1,2]]]);
//# sourceMappingURL=main.79aacf9d.chunk.js.map