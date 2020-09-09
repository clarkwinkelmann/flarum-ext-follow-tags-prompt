<?php

namespace ClarkWinkelmann\FollowTagsPrompt\Extenders;

use Carbon\Carbon;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\User\AssertPermissionTrait;
use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Contracts\Container\Container;

class SaveConfigured implements ExtenderInterface
{
    use AssertPermissionTrait;

    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Saving::class, [$this, 'saving']);
    }

    public function saving(Saving $event)
    {
        if (isset($event->data['attributes']['followTagsConfigured'])) {
            // Not using a permission because we want this to work even for unconfirmed or suspended users
            if ($event->actor->id !== $event->user->id) {
                throw new PermissionDeniedException();
            }

            if (is_null($event->user->clarkwinkelmann_follow_tags_configured_at)) {
                $event->user->clarkwinkelmann_follow_tags_configured_at = Carbon::now();
            }
        }
    }
}
