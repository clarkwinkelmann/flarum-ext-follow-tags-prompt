<?php

namespace ClarkWinkelmann\FollowTagsPrompt;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    new Extenders\TagAttributes(),
    new Extenders\SaveConfigured(),
    new Extenders\ForumAttributes(),
];
