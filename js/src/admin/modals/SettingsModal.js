import app from 'flarum/app';
import BaseSettingsModal from 'flarum/components/SettingsModal';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';
import sortTags from 'flarum/tags/utils/sortTags';

/* global m */

const settingsPrefix = 'clarkwinkelmann-follow-tags-prompt.';
const translationPrefix = 'clarkwinkelmann-follow-tags-prompt.admin.settings.';

export default class SettingsModal extends BaseSettingsModal {
    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        let tagIds = [];

        try {
            tagIds = JSON.parse(this.setting(settingsPrefix + 'availableTagIds')() || '[]');
        } catch (e) {
            console.warn('Could not parse existing value for ' + settingsPrefix + 'availableTagIds', e);
        }

        if (!Array.isArray(tagIds)) {
            tagIds = [];
        }

        return [
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'buttonOnFollowingPage', '1')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + 'buttonOnFollowingPage')(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + 'buttonOnFollowingPage'))),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.setting(settingsPrefix + 'allDiscussionsOnFollowingPageForGuests')() === '1',
                    onchange: value => {
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
                    onchange: this.setting(settingsPrefix + 'availableTagStrategy'),
                }),
            ]),
            this.setting(settingsPrefix + 'availableTagStrategy')() === 'list' ? sortTags(app.store.all('tags')).map(tag => {
                const state = tagIds.indexOf(tag.id()) !== -1;

                return m('.Form-group', [
                    m('label', Switch.component({
                        state,
                        onchange: value => {
                            this.setting(settingsPrefix + 'availableTagIds')(JSON.stringify(value ?
                                [...tagIds, tag.id()] :
                                tagIds.filter(id => id !== tag.id())
                            ));
                        },
                    }, tag.name())),
                ]);
            }) : null,
        ];
    }
}
