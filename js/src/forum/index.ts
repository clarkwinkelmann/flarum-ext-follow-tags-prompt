import app from 'flarum/forum/app';
import alterFollowingPage from './alterFollowingPage';
import openAutomaticModal from './openAutomaticModal';

app.initializers.add('clarkwinkelmann/follow-tags-prompt', () => {
    alterFollowingPage();
    openAutomaticModal();
});
