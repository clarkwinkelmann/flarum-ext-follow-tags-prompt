module.exports=function(t){var n={};function a(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=t,a.c=n,a.d=function(t,n,r){a.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,n){if(1&n&&(t=a(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)a.d(r,o,function(n){return t[n]}.bind(null,o));return r},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a.p="",a(a.s=15)}([function(t,n){t.exports=flarum.core.compat.app},function(t,n){t.exports=flarum.core.compat.extend},function(t,n,a){"use strict";function r(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}a.d(n,"a",(function(){return r}))},function(t,n){t.exports=flarum.core.compat["tags/utils/sortTags"]},,,function(t,n){t.exports=flarum.core.compat["components/Switch"]},,,,,function(t,n){t.exports=flarum.core.compat["components/BasicsPage"]},function(t,n){t.exports=flarum.core.compat["components/ExtensionPage"]},function(t,n){t.exports=flarum.core.compat["components/Select"]},,function(t,n,a){"use strict";a.r(n);var r=a(0),o=a.n(r),e=a(1),i=a(11),l=a.n(i),s=a(2),c=a(12),u=a.n(c),p=a(13),g=a.n(p),f=a(6),d=a.n(f),y=a(3),b=a.n(y),w="clarkwinkelmann-follow-tags-prompt.",h="clarkwinkelmann-follow-tags-prompt.admin.settings.",S=function(t){function n(){return t.apply(this,arguments)||this}return Object(s.a)(n,t),n.prototype.content=function(){var t=this,n=[];try{n=JSON.parse(this.setting(w+"availableTagIds")()||"[]")}catch(t){console.warn("Could not parse existing value for "+w+"availableTagIds",t)}return Array.isArray(n)||(n=[]),m(".ExtensionPage-settings",m(".container",[m(".Form-group",[m("label",d.a.component({state:"1"===this.setting(w+"buttonOnFollowingPage","1")(),onchange:function(n){t.setting(w+"buttonOnFollowingPage")(n?"1":"0")}},o.a.translator.trans(h+"buttonOnFollowingPage")))]),m(".Form-group",[m("label",d.a.component({state:"1"===this.setting(w+"allDiscussionsOnFollowingPageForGuests")(),onchange:function(n){t.setting(w+"allDiscussionsOnFollowingPageForGuests")(n?"1":"0")}},o.a.translator.trans(h+"allDiscussionsOnFollowingPageForGuests")))]),m(".Form-group",[m("label",o.a.translator.trans(h+"availableTagStrategy")),g.a.component({options:{primary:o.a.translator.trans(h+"tagStrategy.primary"),primaryAndChildren:o.a.translator.trans(h+"tagStrategy.primaryAndChildren"),primaryAndSecondary:o.a.translator.trans(h+"tagStrategy.primaryAndSecondary"),secondary:o.a.translator.trans(h+"tagStrategy.secondary"),all:o.a.translator.trans(h+"tagStrategy.all"),list:o.a.translator.trans(h+"tagStrategy.list")},value:this.setting(w+"availableTagStrategy")()||"primary",onchange:this.setting(w+"availableTagStrategy")})]),"list"===this.setting(w+"availableTagStrategy")()?b()(o.a.store.all("tags")).map((function(a){var r=-1!==n.indexOf(a.id());return m(".Form-group",[m("label",d.a.component({state:r,onchange:function(r){t.setting(w+"availableTagIds")(JSON.stringify(r?[].concat(n,[a.id()]):n.filter((function(t){return t!==a.id()}))))}},a.name()))])})):null,m(".Form-group",this.submitButton())]))},n}(u.a);o.a.initializers.add("clarkwinkelmann/follow-tags-prompt",(function(){o.a.extensionData.for("clarkwinkelmann-follow-tags-prompt").registerPage(S),Object(e.extend)(l.a.prototype,"homePageItems",(function(t){t.add("clarkwinkelmann-following-tags-prompt",{path:"/following",label:o.a.translator.trans("clarkwinkelmann-follow-tags-prompt.admin.homepage.following")})}))}))}]);
//# sourceMappingURL=admin.js.map