import app from 'flarum/forum/app';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';
import Model from 'flarum/common/Model';
import sortTags from 'flarum/tags/common/utils/sortTags';
import tagIcon from 'flarum/tags/common/helpers/tagIcon';

let SubscriptionMenu: any;
let SubscriptionStateButton: any;

interface ChooseTagsToFollowModalAttrs extends IInternalModalAttrs {
    hasNotChosenYet?: boolean
}

// @ts-ignore Flarum missing view method type-hint
export default class ChooseTagsToFollowModal extends Modal<ChooseTagsToFollowModalAttrs> {
    className() {
        return 'ChooseTagsToFollowModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.title');
    }

    content() {
        // SubscriptionMenu is a component in Follow Tags <1.2.0
        // This code is kept for now for backward-compatibility
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

        // The state button and modal are the new components in Follow Tags 1.2.0
        // Since the states are now extensible it would be crazy to re-implement a custom component
        // Instead we'll open the native modal
        // No issue since Flarum supports nested modals since 1.5
        const {SubscriptionModal} = flarum.extensions['fof-follow-tags'] && flarum.extensions['fof-follow-tags'].components;
        const OriginalSubscriptionStateButton = flarum.extensions['fof-follow-tags'] && flarum.extensions['fof-follow-tags'].components.SubscriptionStateButton;

        if (OriginalSubscriptionStateButton && !SubscriptionStateButton) {
            SubscriptionStateButton = class extends OriginalSubscriptionStateButton {
                view() {
                    const vdom = super.view();

                    // Move tooltip to the right, so it doesn't block access to the button below
                    if (typeof vdom === 'object' && vdom.tag === Tooltip && vdom.attrs) {
                        vdom.attrs.position = 'right';
                    }

                    return vdom;
                }
            }
        }

        // Render the modal content if either the old backward-compatible component or the new ones are available
        const supported = SubscriptionMenu || (SubscriptionStateButton && SubscriptionModal)

        const tags = sortTags(Model.hasMany('clarkwinkelmannFollowTagsList').call(app.forum) as any || []);

        return [
            m('.Modal-body.ChooseTagsToFollowModal-scroll', supported ? m('table', m('tbody', tags.map(tag => m('tr', [
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
                m('td.TagFollow', SubscriptionMenu ? SubscriptionMenu.component({
                    model: tag,
                }) : SubscriptionStateButton.component({
                    className: 'Button',
                    // @ts-ignore additional method from Follow Tags is not type-hinted
                    subscription: tag.subscription(),
                    onclick() {
                        app.modal.show(SubscriptionModal, {model: tag}, true);
                    },
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

                        app.session.user!.save({
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
