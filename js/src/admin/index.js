import app from 'flarum/app';
import {extend} from 'flarum/extend';
import BasicsPage from 'flarum/components/BasicsPage';
import SettingsPage from './components/SettingsPage';

app.initializers.add('clarkwinkelmann/follow-tags-prompt', () => {
    app.extensionData
        .for('clarkwinkelmann-follow-tags-prompt')
        .registerPage(SettingsPage);

    // Because neither flarum/subscription nor fof/follow-tags does it, we do it here
    extend(BasicsPage.prototype, 'homePageItems', items => {
        items.add('clarkwinkelmann-following-tags-prompt', {
            path: '/following',
            label: app.translator.trans('clarkwinkelmann-follow-tags-prompt.admin.homepage.following'),
        });
    });
});
