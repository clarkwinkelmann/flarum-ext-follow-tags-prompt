import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import sortTags from 'flarum/tags/utils/sortTags';
import tagIcon from 'flarum/tags/helpers/tagIcon';
import SubscriptionMenu from '@fof-follow-tags/components/SubscriptionMenu';

/* global m */

export default class ChooseTagsToFollowModal extends Modal {
    className() {
        return 'ChooseTagsToFollowModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.title');
    }

    content() {
        return m('.Modal-body', [
            SubscriptionMenu ? m('table', m('tbody', sortTags(app.store.all('tags'))
                .filter(tag => tag.attribute('clarkwinkelmannFollowTagsPromptAvailable'))
                .map(tag => m('tr', [
                    m('td.TagName', {
                        style: {
                            color: tag.color(),
                        },
                    }, [
                        tagIcon(tag),
                        tag.name(),
                    ]),
                    m('td.TagDescription', tag.description()),
                    m('td.TagFollow', SubscriptionMenu.component({tag})),
                ])))) : 'Error: Follow Tags is not enabled',
            m('.Form-group', [
                this.props.hasNotChosenYet ? Button.component({
                    className: 'Button Button--link',
                    children: app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.later'),
                    onclick() {
                        app.modal.close();
                    },
                }) : null,
                Button.component({
                    loading: this.loading,
                    className: 'Button Button--primary',
                    children: app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.modal.continue'),
                    onclick: () => {
                        // If we are not in the "forced to choose" mode, there's no need to send a request again
                        // since it's already marked as done
                        if (!this.props.hasNotChosenYet) {
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
                }),
            ]),
        ]);
    }
}
