import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionListState from 'flarum/states/DiscussionListState';
import IndexPage from 'flarum/components/IndexPage';
import Button from 'flarum/components/Button';
import ChooseTagsToFollowModal from './components/ChooseTagsToFollowModal';

/* global flarum */

// We wrap the import in a function, that way the order the extensions are loaded in doesn't matter
function isFollowingPage() {
    if (!flarum.extensions['fof-follow-tags']) {
        return false;
    }

    return flarum.extensions['fof-follow-tags'].utils.isFollowingPage();
}

export default function () {
    extend(DiscussionListState.prototype, 'requestParams', function (params) {
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
                    app.modal.show(ChooseTagsToFollowModal);
                },
            }, app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.controls.choose')),
            -10
        );
    });
}
