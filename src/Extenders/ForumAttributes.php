<?php

namespace ClarkWinkelmann\FollowTagsPrompt\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class ForumAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes['clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests'] = $settings->get('clarkwinkelmann-follow-tags-prompt.allDiscussionsOnFollowingPageForGuests') === '1';
            $event->attributes['clarkwinkelmannFollowTagsPromptButton'] = $settings->get('clarkwinkelmann-follow-tags-prompt.buttonOnFollowingPage') !== '0';
            $event->attributes['clarkwinkelmannFollowTagsShouldPrompt'] = $event->actor->exists && is_null($event->actor->clarkwinkelmann_follow_tags_configured_at);
        }
    }
}
