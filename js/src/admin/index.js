import app from 'flarum/app';
import {extend} from 'flarum/extend';
import BasicsPage from 'flarum/components/BasicsPage';
import SettingsModal from './modals/SettingsModal';

app.initializers.add('clarkwinkelmann/follow-tags-prompt', () => {
    app.extensionSettings['clarkwinkelmann-follow-tags-prompt'] = () => app.modal.show(new SettingsModal());

    // Because neither flarum/subscription nor fof/follow-tags does it, we do it here
    // TODO: this does not appear to work on current Flarum, probably because it's a parameterized route
    // Maybe on beta 14 this will work
    /*extend(BasicsPage.prototype, 'homePageItems', items => {
        items.add('clarkwinkelmann-following-tags-prompt', {
            path: '/following',
            label: app.translator.trans('clarkwinkelmann-follow-tags-prompt.admin.homepage.following'),
        });
    });*/
});
