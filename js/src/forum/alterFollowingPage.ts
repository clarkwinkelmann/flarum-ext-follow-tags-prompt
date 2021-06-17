import {extend} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';
import IndexPage from 'flarum/forum/components/IndexPage';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import ChooseTagsToFollowModal from './components/ChooseTagsToFollowModal';

// Similar implementation to fof/follow-tags, but will work even if the Subscriptions extension is disabled
function isFollowingPage() {
    return app.current.get('routeName') === 'following';
}

export default function () {
    extend(DiscussionListState.prototype, 'requestParams', function (params: any) {
        if (!isFollowingPage() || app.session.user || !app.forum.attribute('clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests')) return;

        // If this is the following page and we are guest, show all discussions like if it was the homepage
        // That way the following page can be used as homepage without negative impact on guests
        delete params.filter['following-tag'];
        delete params.filter.subscription;
    });

    extend(IndexPage.prototype, 'viewItems', function (items: ItemList) {
        if (!isFollowingPage() || !app.session.user || !app.forum.attribute('clarkwinkelmannFollowTagsPromptButton')) return;

        items.add(
            'clarkwinkelmann-follow-tags-prompt',
            Button.component({
                className: 'Button Button--primary',
                onclick() {
                    app.modal.show(ChooseTagsToFollowModal, { /* Flarum type-hints require attrs */});
                },
            }, app.translator.trans('clarkwinkelmann-follow-tags-prompt.forum.controls.choose')),
            -10
        );
    });
}
