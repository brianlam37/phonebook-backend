(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),l=(t(5),t(2)),o=function(e){var n=e.person,t=e.handleClick;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},i=function(e){var n=e.persons,t=e.handleClick;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement(o,{key:e.id,handleClick:t,person:e})})))},m=function(e){var n=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,"filter shown with",r.a.createElement("input",{onChange:n}))},s=function(e){var n=e.newName,t=e.newNumber,a=e.handleNameChange,c=e.handleNumberChange,u=e.handleClick;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:u},"add")))},f=t(3),d=t.n(f),h="/api/persons",b=function(){return d.a.get(h).then((function(e){return e.data}))},E=function(e){return d.a.post(h,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),o=Object(l.a)(u,2),f=o[0],d=o[1],h=Object(a.useState)(""),g=Object(l.a)(h,2),C=g[0],k=g[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),O=j[0],N=j[1],S=Object(a.useState)(""),y=Object(l.a)(S,2),T=y[0],F=y[1],D=Object(a.useState)(""),I=Object(l.a)(D,2),J=I[0],L=I[1];return Object(a.useEffect)((function(){b().then((function(e){c(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{message:T,type:J}),r.a.createElement(m,{handleFilterChange:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(s,{newName:f,newNumber:C,handleNameChange:function(e){d(e.target.value)},handleClick:function(e){e.preventDefault(),E({name:f,number:C}).then((function(e){F("Added ".concat(f)),L("success"),setTimeout((function(){F(null),L(null)}),5e3),c(t.concat(e)),d(""),k("")})).catch((function(e){F("There was an error adding ".concat(f)),L("error"),setTimeout((function(){F(null),L(null)}),5e3)}))},handleNumberChange:function(e){k(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(i,{handleClick:function(e){var n=t.filter((function(n){return n.id!==e.id}));window.confirm("Delete ".concat(e.name,"?"))&&p(e.id).then((function(t){c(n),F("Deleted ".concat(e.name)),L("success"),setTimeout((function(){F(null),L(null)}),5e3)})).catch((function(t){c(n),F("Information of ".concat(e.name," has already been removed from server")),L("error"),setTimeout((function(){F(null),L(null)}),5e3)}))},persons:t.filter((function(e){return e.name.toLowerCase().includes(O.toLowerCase())}))}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root"))},5:function(e,n,t){}},[[15,1,2]]]);
//# sourceMappingURL=main.9e019b28.chunk.js.map