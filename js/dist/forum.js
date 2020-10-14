module.exports=function(t){var o={};function n(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=o,n.d=function(t,o,e){n.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,o){if(1&o&&(t=n(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var r in t)n.d(e,r,function(o){return t[o]}.bind(null,r));return e},n.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(o,"a",o),o},n.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},n.p="",n(n.s=14)}([function(t,o){t.exports=flarum.core.compat.app},function(t,o){t.exports=flarum.core.compat.extend},function(t,o,n){"use strict";function e(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,t.__proto__=o}n.d(o,"a",(function(){return e}))},function(t,o){t.exports=flarum.core.compat["tags/utils/sortTags"]},function(t,o){t.exports=flarum.core.compat["components/Button"]},function(t,o){t.exports=flarum.core.compat["components/IndexPage"]},,function(t,o){t.exports=flarum.core.compat["components/DiscussionList"]},function(t,o){t.exports=flarum.core.compat["components/Modal"]},function(t,o){t.exports=flarum.core.compat["tags/helpers/tagIcon"]},function(t,o){t.exports=flarum.core.compat["components/Page"]},,,,function(t,o,n){"use strict";n.r(o);var e=n(0),r=n.n(e),a=n(1),l=n(7),s=n.n(l),i=n(5),c=n.n(i),u=n(4),f=n.n(u),p=n(2),d=n(8),g=n.n(d),w=n(3),b=n.n(w),y=n(9),h=n.n(y),k=function(t){function o(){return t.apply(this,arguments)||this}Object(p.a)(o,t);var n=o.prototype;return n.className=function(){return"ChooseTagsToFollowModal"},n.title=function(){return r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.title")},n.content=function(){var t,o=this,n=flarum.extensions["fof-follow-tags"]&&flarum.extensions["fof-follow-tags"].components.SubscriptionMenu;return n&&(t=function(t){function o(){return t.apply(this,arguments)||this}return Object(p.a)(o,t),o.prototype.view=function(){var o=t.prototype.view.call(this);return o.attrs.className=o.attrs.className.replace("App-primaryControl",""),o},o}(n)),m(".Modal-body",[t?m("table",m("tbody",b()(r.a.store.all("tags")).filter((function(t){return t.attribute("clarkwinkelmannFollowTagsPromptAvailable")})).map((function(o){return m("tr",[m("td.TagName",{style:{color:o.color()},onclick:function(t){$(t.target).parents("tr").find(".SubscriptionMenu-button").click()}},[h()(o),o.name()]),m("td.TagDescription",o.description()),m("td.TagFollow",t.component({tag:o}))])})))):"Error: Follow Tags is not enabled",m(".Form-group",[this.props.hasNotChosenYet?f.a.component({className:"Button Button--link",children:r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.later"),onclick:function(){r.a.modal.close()}}):null,f.a.component({loading:this.loading,className:"Button Button--primary",children:r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.modal.continue"),onclick:function(){o.props.hasNotChosenYet?(o.loading=!0,r.a.session.user.save({followTagsConfigured:!0}).then((function(){o.loading=!1,m.redraw(),r.a.modal.close()})).catch((function(t){throw o.loading=!1,m.redraw(),t}))):r.a.modal.close()}})])])},n.onsubmit=function(t){t.preventDefault()},o}(g.a);function x(){return!!flarum.extensions["fof-follow-tags"]&&flarum.extensions["fof-follow-tags"].utils.isFollowingPage()}var v=n(10),T=n.n(v);r.a.initializers.add("clarkwinkelmann/follow-tags-prompt",(function(){var t;Object(a.extend)(s.a.prototype,"requestParams",(function(t){x()&&!r.a.session.user&&r.a.forum.attribute("clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests")&&t.filter.q&&(t.filter.q=t.filter.q.replace(" is:following",""))})),Object(a.extend)(c.a.prototype,"viewItems",(function(t){x()&&r.a.session.user&&r.a.forum.attribute("clarkwinkelmannFollowTagsPromptButton")&&t.add("clarkwinkelmann-follow-tags-prompt",f.a.component({className:"Button Button--primary",onclick:function(){r.a.modal.show(new k)}},r.a.translator.trans("clarkwinkelmann-follow-tags-prompt.forum.controls.choose")),-10)})),t=!1,Object(a.extend)(T.a.prototype,"init",(function(){t||(r.a.current instanceof c.a&&r.a.forum.attribute("clarkwinkelmannFollowTagsShouldPrompt")&&setTimeout((function(){return r.a.modal.show(new k({hasNotChosenYet:!0}))}),0),t=!0)}))}))}]);
//# sourceMappingURL=forum.js.map