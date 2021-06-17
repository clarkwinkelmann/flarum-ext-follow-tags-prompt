import app from 'flarum/admin/app';
import {extend} from 'flarum/common/extend';
import BasicsPage from 'flarum/admin/components/BasicsPage';
import ItemList from 'flarum/common/utils/ItemList';
import SettingsPage from './components/SettingsPage';

app.initializers.add('clarkwinkelmann/follow-tags-prompt', () => {
    app.extensionData
        .for('clarkwinkelmann-follow-tags-prompt')
        .registerPage(SettingsPage);

    // Because neither flarum/subscription nor fof/follow-tags does it, we do it here
    extend(BasicsPage.prototype, 'homePageItems', function (items: ItemList) {
        items.add('clarkwinkelmann-following-tags-prompt', {
            path: '/following',
            label: app.translator.trans('clarkwinkelmann-follow-tags-prompt.admin.homepage.following'),
        });
    });
});
