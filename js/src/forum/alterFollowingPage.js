import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionList from 'flarum/components/DiscussionList';
import IndexPage from 'flarum/components/IndexPage';
import Button from 'flarum/components/Button';
import isFollowingPage from '@fof-follow-tags/utils/isFollowingPage';
import ChooseTagsToFollowModal from './components/ChooseTagsToFollowModal';

export default function () {
    extend(DiscussionList.prototype, 'requestParams', function (params) {
        if (!isFollowingPage() || app.session.user || !app.forum.attribute('clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests')) return;

        // If this is the following page and we are guest, show all discussions like if it was the homepage
        // That way the following page can be used as homepage without negative impact on guests
        if (params.filter.q) {
            params.filter.q = params.filter.q.replace(' is:following', '');
        }
    });

    extend(IndexPage.prototype, 'viewItems', function (items) {
        if (!isFollowingPage() || !app.session.user || !app.forum.attribute('clarkwinkelmannFollowTagsPromptButton')) return;

        items.add(
            'clarkwinkelmann-follow-tags-prompt',
            Button.component({
                className: 'Button Button--primary',
                onclick() {
                    app.modal.show(new ChooseTagsToFollowModal());
                },
            }, app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.controls.choose')),
            -10
        );
    });
}
