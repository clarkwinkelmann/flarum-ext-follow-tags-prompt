import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import sortTags from 'flarum/tags/utils/sortTags';
import tagIcon from 'flarum/tags/helpers/tagIcon';

/* global m, $, flarum */

let SubscriptionMenu;

export default class ChooseTagsToFollowModal extends Modal {
    className() {
        return 'ChooseTagsToFollowModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.title');
    }

    content() {
        const OriginalSubscriptionMenu = flarum.extensions['fof-follow-tags'] && flarum.extensions['fof-follow-tags'].components.SubscriptionMenu;

        // If the extended class does not exist, create it
        // We need to create it a single time, otherwise Mithril cannot know it's the same component
        if (OriginalSubscriptionMenu && !SubscriptionMenu) {
            SubscriptionMenu = class SubscriptionMenu extends OriginalSubscriptionMenu {
                view() {
                    const vdom = super.view();

                    // Remove .App-primaryControl class from dropdowns
                    vdom.attrs.className = vdom.attrs.className.replace('App-primaryControl', '');

                    return vdom;
                }
            }
        }

        return [
            m('.Modal-body.ChooseTagsToFollowModal-scroll', SubscriptionMenu ? m('table', m('tbody', sortTags(app.store.all('tags'))
                .filter(tag => tag.attribute('clarkwinkelmannFollowTagsPromptAvailable'))
                .map(tag => m('tr', [
                    m('td.TagName', {
                        style: {
                            color: tag.color(),
                        },
                        onclick: event => {
                            $(event.target).parents('tr').find('.SubscriptionMenu-button').click();
                        },
                    }, [
                        tagIcon(tag),
                        tag.name(),
                    ]),
                    m('td.TagDescription', tag.description()),
                    m('td.TagFollow', SubscriptionMenu.component({
                        model: tag,
                    })),
                ])))) : 'Error: Follow Tags is not enabled'),
            m('.Modal-body.ChooseTagsToFollowModal-footer', [
                this.attrs.hasNotChosenYet ? Button.component({
                    className: 'Button Button--link',
                    onclick() {
                        app.modal.close();
                    },
                }, app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.later')) : null,
                Button.component({
                    loading: this.loading,
                    className: 'Button Button--primary',
                    onclick: () => {
                        // If we are not in the "forced to choose" mode, there's no need to send a request again
                        // since it's already marked as done
                        if (!this.attrs.hasNotChosenYet) {
                            app.modal.close();
                            return;
                        }

                        this.loading = true;

                        app.session.user.save({
                            followTagsConfigured: true,
                        }).then(() => {
                            this.loading = false;
                            m.redraw();
                            app.modal.close();
                        }).catch(err => {
                            this.loading = false;
                            m.redraw();
                            throw err;
                        });
                    }
                }, app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.continue')),
            ]),
        ];
    }

    onsubmit(event) {
        // fof/follow-tags is using buttons without type, which cause the modal form to submit itself without this
        event.preventDefault();
    }
}
