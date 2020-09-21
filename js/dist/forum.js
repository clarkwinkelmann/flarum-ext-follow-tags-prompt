module.exports=function(o){var t={};function n(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return o[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=o,n.c=t,n.d=function(o,t,e){n.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:e})},n.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},n.t=function(o,t){if(1&t&&(o=n(o)),8&t)return o;if(4&t&&"object"==typeof o&&o&&o.__esModule)return o;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:o}),2&t&&"string"!=typeof o)for(var r in o)n.d(e,r,function(t){return o[t]}.bind(null,r));return e},n.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(t,"a",t),t},n.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},n.p="",n(n.s=14)}([function(o,t){o.exports=flarum.core.compat.app},function(o,t){o.exports=flarum.core.compat.extend},function(o,t,n){"use strict";function e(o,t){o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.__proto__=t}n.d(t,"a",(function(){return e}))},function(o,t){o.exports=flarum.core.compat["tags/utils/sortTags"]},function(o,t){o.exports=flarum.core.compat["components/Button"]},function(o,t){o.exports=flarum.core.compat["components/IndexPage"]},,function(o,t){o.exports=flarum.core.compat["components/DiscussionList"]},function(o,t){o.exports=flarum.core.compat["components/Modal"]},function(o,t){o.exports=flarum.core.compat["tags/helpers/tagIcon"]},function(o,t){o.exports=flarum.core.compat["components/Page"]},,,,function(o,t,n){"use strict";n.r(t);var e=n(0),r=n.n(e),a=n(1),l=n(7),s=n.n(l),i=n(5),c=n.n(i),u=n(4),f=n.n(u),p=n(2),d=n(8),g=n.n(d),w=n(3),b=n.n(w),y=n(9),k=n.n(y),x=function(o){function t(){return o.apply(this,arguments)||this}Object(p.a)(t,o);var n=t.prototype;return n.className=function(){return"ChooseTagsToFollowModal"},n.title=function(){return r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.title")},n.content=function(){var o=this,t=flarum.extensions["fof-follow-tags"]&&flarum.extensions["fof-follow-tags"].components.SubscriptionMenu;return m(".Modal-body",[t?m("table",m("tbody",b()(r.a.store.all("tags")).filter((function(o){return o.attribute("clarkwinkelmannFollowTagsPromptAvailable")})).map((function(o){return m("tr",[m("td.TagName",{style:{color:o.color()}},[k()(o),o.name()]),m("td.TagDescription",o.description()),m("td.TagFollow",t.component({tag:o}))])})))):"Error: Follow Tags is not enabled",m(".Form-group",[this.props.hasNotChosenYet?f.a.component({className:"Button Button--link",children:r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.later"),onclick:function(){r.a.modal.close()}}):null,f.a.component({loading:this.loading,className:"Button Button--primary",children:r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.continue"),onclick:function(){o.props.hasNotChosenYet?(o.loading=!0,r.a.session.user.save({followTagsConfigured:!0}).then((function(){o.loading=!1,m.redraw(),r.a.modal.close()})).catch((function(t){throw o.loading=!1,m.redraw(),t}))):r.a.modal.close()}})])])},t}(g.a);function h(){return!!flarum.extensions["fof-follow-tags"]&&flarum.extensions["fof-follow-tags"].utils.isFollowingPage()}var v=n(10),T=n.n(v);r.a.initializers.add("clarkwinkelmann/follow-tags-prompt",(function(){var o;Object(a.extend)(s.a.prototype,"requestParams",(function(o){h()&&!r.a.session.user&&r.a.forum.attribute("clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests")&&o.filter.q&&(o.filter.q=o.filter.q.replace(" is:following",""))})),Object(a.extend)(c.a.prototype,"viewItems",(function(o){h()&&r.a.session.user&&r.a.forum.attribute("clarkwinkelmannFollowTagsPromptButton")&&o.add("clarkwinkelmann-follow-tags-prompt",f.a.component({className:"Button Button--primary",onclick:function(){r.a.modal.show(new x)}},r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.controls.choose")),-10)})),o=!1,Object(a.extend)(T.a.prototype,"init",(function(){o||(r.a.current instanceof c.a&&r.a.forum.attribute("clarkwinkelmannFollowTagsShouldPrompt")&&setTimeout((function(){return r.a.modal.show(new x({hasNotChosenYet:!0}))}),0),o=!0)}))}))}]);
//# sourceMappingURL=forum.js.map