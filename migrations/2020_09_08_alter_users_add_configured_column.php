<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'clarkwinkelmann_follow_tags_configured_at' => ['timestamp', 'nullable' => true],
]);
