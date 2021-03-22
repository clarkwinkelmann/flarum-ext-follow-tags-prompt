import app from 'flarum/app';
import {extend} from 'flarum/extend';
import Page from 'flarum/components/Page';
import IndexPage from 'flarum/components/IndexPage';
import ChooseTagsToFollowModal from './components/ChooseTagsToFollowModal';

/* global m */

export default function () {
    let initialized = false;

    extend(Page.prototype, 'oninit', function () {
        if (initialized) {
            return;
        }

        // We only show the modal if the first page loaded was the index page
        // And that new updates are available
        // And that the user *must* accept them
        if (
            (app.current.matches(IndexPage) || m.route.get() === '/') &&
            app.forum.attribute('clarkwinkelmannFollowTagsShouldPrompt')
        ) {
            // This code is affected by the blue backdrop of death https://github.com/flarum/core/issues/1813
            // This can't be reliably reproduced, but happens mostly on Firefox
            // setTimeout doesn't solve the issue but brings a slight improvement, so we'll go with that for now
            setTimeout(() => app.modal.show(ChooseTagsToFollowModal, {
                hasNotChosenYet: true,
            }), 0);
        }

        initialized = true;
    });
}
