(this.webpackJsonpphonebook_app=this.webpackJsonpphonebook_app||[]).push([[0],{30:function(e,n,t){},31:function(e,n,t){},53:function(e,n,t){"use strict";t.r(n);var o,a=t(20),r=t.n(a),c=(t(30),t(3)),u=(t(31),t(0)),i=t(1),l=function(e){var n=e.person,t=e.onDeleteClick;return Object(i.jsxs)("div",{children:[n.name," ",n.number,Object(i.jsx)("button",{onClick:function(e){return t(e,n)},children:"Delete"})]})},d=function(e){var n=e.people,t=e.filterValue,o=e.handlePeopleChange,a=""===t?n:n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())}));return Object(i.jsx)("div",{children:a.map((function(e){return Object(i.jsx)(l,{person:e,onDeleteClick:o},e.name)}))})},s=function(e){var n=e.filterValue,t=e.onValueChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},p=t(5),b=t(7),f={name:"",number:""},j=function(e){var n=e.addPersonHandled,t=e.updatePersonHandled,o=e.people,a=Object(u.useState)(f),r=Object(c.a)(a,2),l=r[0],d=r[1];console.log("InputPerson Component Updated!");var s=function(e){var n=e.target,t=n.name,o=n.value;d(Object(b.a)(Object(b.a)({},l),{},Object(p.a)({},t,o)))};return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("div",{children:["name:",Object(i.jsx)("input",{value:l.name,onChange:s,name:"name"})]}),Object(i.jsxs)("div",{children:["number:",Object(i.jsx)("input",{value:l.number,onChange:s,name:"number"})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:function(e){return function(e,a){if(a.name)if(a.number){var r=o.find((function(e){return e.name.toUpperCase()===a.name.toUpperCase()}));r?window.confirm("".concat(a.name," is already in the phonebook, replace the old number with updated number?"))&&(r.number=a.number,t(e,r)):n(e,a),d(f)}else alert("Number can not be empty");else alert("Name can not be empty")}(e,l)},children:"add"})})]})},m=t(21),h=t(22).a.div(o||(o=Object(m.a)(["\n  background: lightgray;\n  position: absolute;\n  color: green;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n  padding: 5px;\n  border: 3px solid;\n  border-radius: 3px;\n  border-color: green;\n"]))),O=function(e){var n=e.message;return n?Object(i.jsx)(h,{children:n}):null},v=t(4),x=t.n(v),g="/api/persons",C=function(){return x.a.get(g).then((function(e){return e.data}))},k={getAll:C,createNew:function(e){return x.a.post(g,e).then((function(e){return e.data}))},deleteItem:function(e){return x.a.delete("".concat(g,"/").concat(e)),C()},updateItem:function(e){return x.a.put("".concat(g,"/").concat(e.id),e).then((function(e){return e.data}))}},w=function(){var e=Object(u.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],a=Object(u.useState)(""),r=Object(c.a)(a,2),l=r[0],p=r[1],b=Object(u.useState)(null),f=Object(c.a)(b,2),m=f[0],h=f[1];Object(u.useEffect)((function(){console.log("Getting data"),k.getAll().then((function(e){o(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(s,{value:l,onValueChange:function(e){var n=e.target.value;p(n)}}),Object(i.jsx)("h2",{children:" add a new"}),Object(i.jsx)(j,{addPersonHandled:function(e,n){e.preventDefault(),k.createNew(n).then((function(e){o(t.concat(e))})).then((function(){h("Added ".concat(n.name," to phonebook")),setTimeout((function(){return h(null)}),3e3)})).catch((function(e){h(e.response.data),setTimeout((function(){return h(null)}),3e3)}))},updatePersonHandled:function(e,n){e.preventDefault(),k.updateItem(n).then((function(e){o(t.map((function(n){return n.id!==e.id?n:e})))})).then((function(){h("Updated ".concat(n.name," in phonebook")),setTimeout((function(){return h(null)}),3e3)})).catch((function(e){h("Note '".concat(n.name,"' was already removed from server")),setTimeout((function(){return h(null)}),5e3)}))},people:t}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(d,{people:t,filterValue:l,handlePeopleChange:function(e,n){e.preventDefault(),window.confirm("Are you sure you want to delete ".concat(n.name))&&k.deleteItem(n.id).then((function(e){o(e)})).then((function(){h("Deleted ".concat(n.name," from phonebook")),setTimeout((function(){return h(null)}),3e3)}))}}),Object(i.jsx)(O,{message:m})]})};r.a.render(Object(i.jsx)(w,{}),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.2df586c2.chunk.js.map