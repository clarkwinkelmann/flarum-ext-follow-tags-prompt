<?php

namespace ClarkWinkelmann\FollowTagsPrompt\Extenders;

use ClarkWinkelmann\FollowTagsPrompt\AvailableTagsStrategy;
use Flarum\Api\Event\Serializing;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Illuminate\Contracts\Container\Container;

class TagAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(TagSerializer::class)) {
            $event->attributes['clarkwinkelmannFollowTagsPromptAvailable'] = AvailableTagsStrategy::isAvailable($event->model);
        }
    }
}
