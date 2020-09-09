import app from 'flarum/app';
import alterFollowingPage from './alterFollowingPage';
import openAutomaticModal from './openAutomaticModal';

app.initializers.add('clarkwinkelmann/follow-tags-prompt', () => {
    alterFollowingPage();
    openAutomaticModal();
});
