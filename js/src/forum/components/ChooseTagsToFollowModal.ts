import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Model from "flarum/common/Model";
import sortTags from 'flarum/tags/utils/sortTags';
import tagIcon from 'flarum/tags/helpers/tagIcon';

let SubscriptionMenu: any;

interface ChooseTagsToFollowModalAttrs {
    hasNotChosenYet?: boolean
}

// @ts-ignore Flarum missing view method type-hint
export default class ChooseTagsToFollowModal extends Modal {
    attrs!: ChooseTagsToFollowModalAttrs

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
            SubscriptionMenu = class extends OriginalSubscriptionMenu {
                view() {
                    const vdom = super.view();

                    // Remove .App-primaryControl class from dropdowns
                    vdom.attrs.className = vdom.attrs.className.replace('App-primaryControl', '');

                    return vdom;
                }
            }
        }

        const tags = sortTags(Model.hasMany('clarkwinkelmannFollowTagsList').call(app.forum));

        return [
            m('.Modal-body.ChooseTagsToFollowModal-scroll', SubscriptionMenu ? m('table', m('tbody', tags.map(tag => m('tr', [
                m('td.TagName', {
                    style: {
                        color: tag.color(),
                    },
                    onclick: (event: Event) => {
                        $(event.target as HTMLElement).parents('tr').find('.SubscriptionMenu-button').trigger('click');
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

    // @ts-ignore Missing event type-hint in Flarum
    onsubmit(event: Event) {
        // fof/follow-tags is using buttons without type, which cause the modal form to submit itself without this
        event.preventDefault();
    }
}
