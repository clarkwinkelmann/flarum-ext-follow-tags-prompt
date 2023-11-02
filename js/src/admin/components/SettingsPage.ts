import {Vnode} from 'mithril';
import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';
import sortTags from 'flarum/tags/common/utils/sortTags';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

const settingsPrefix = 'clarkwinkelmann-follow-tags-prompt.';
const translationPrefix = 'clarkwinkelmann-follow-tags-prompt.admin.settings.';

// @ts-ignore missing view type-hint
export default class SettingsPage extends ExtensionPage {
    allTagsLoaded: boolean = false
    loadingAllTags: boolean = false

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        if (this.setting(settingsPrefix + 'availableTagStrategy')() === 'list') {
            this.loadAllTags();
        }
    }

    loadAllTags() {
        this.loadingAllTags = true;

        // Only the primary tags are loaded by default, so we need to make the same request that
        // the tags page settings does to load the full list
        app.store.find('tags', {include: 'parent,lastPostedDiscussion'}).then(() => {
            this.loadingAllTags = false;
            this.allTagsLoaded = true;

            m.redraw();
        });
    }

    content() {
        return m('.ExtensionPage-settings', m('.container', [
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'buttonOnFollowingPage', '1')() === '1',
                    onchange: (value: boolean) => {
                        this.setting(settingsPrefix + 'buttonOnFollowingPage')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'buttonOnFollowingPage'))),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'allDiscussionsOnFollowingPageForGuests')() === '1',
                    onchange: (value: boolean) => {
                        this.setting(settingsPrefix + 'allDiscussionsOnFollowingPageForGuests')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'allDiscussionsOnFollowingPageForGuests'))),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans(translationPrefix + 'availableTagStrategy')),
                Select.component({
                    options: {
                        primary: app.translator.trans(translationPrefix + 'tagStrategy.primary'),
                        primaryAndChildren: app.translator.trans(translationPrefix + 'tagStrategy.primaryAndChildren'),
                        primaryAndSecondary: app.translator.trans(translationPrefix + 'tagStrategy.primaryAndSecondary'),
                        secondary: app.translator.trans(translationPrefix + 'tagStrategy.secondary'),
                        all: app.translator.trans(translationPrefix + 'tagStrategy.all'),
                        list: app.translator.trans(translationPrefix + 'tagStrategy.list'),
                    },
                    value: this.setting(settingsPrefix + 'availableTagStrategy')() || 'primary',
                    onchange: (value: string) => {
                        if (value === 'list' && !this.allTagsLoaded && !this.loadingAllTags) {
                            this.loadAllTags();
                        }

                        this.setting(settingsPrefix + 'availableTagStrategy')(value);
                    },
                }),
            ]),
            this.tagList(),
            m('.Form-group', this.submitButton()),
        ]));
    }

    tagList() {
        if (this.setting(settingsPrefix + 'availableTagStrategy')() !== 'list') {
            return null;
        }

        if (this.loadingAllTags) {
            return LoadingIndicator.component();
        }

        let tagIds: string[] = [];

        try {
            tagIds = JSON.parse(this.setting(settingsPrefix + 'availableTagIds')() || '[]');
        } catch (e) {
            console.warn('Could not parse existing value for ' + settingsPrefix + 'availableTagIds', e);
        }

        if (!Array.isArray(tagIds)) {
            tagIds = [];
        }

        return sortTags(app.store.all('tags')).map(tag => {
            const state = tagIds.indexOf(tag.id()!) !== -1;

            return m('.Form-group', [
                m('label', Switch.component({
                    state,
                    onchange: (value: boolean) => {
                        this.setting(settingsPrefix + 'availableTagIds')(JSON.stringify(value ?
                            [...tagIds, tag.id()] :
                            tagIds.filter(id => id !== tag.id())
                        ));
                    },
                }, tag.name())),
            ]);
        });
    }
}
