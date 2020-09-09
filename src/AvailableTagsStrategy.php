<?php

namespace ClarkWinkelmann\FollowTagsPrompt;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;

class AvailableTagsStrategy
{
    static $strategy;
    static $tagIds = [];

    public static function isAvailable(Tag $tag): bool
    {
        if (!self::$strategy) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            self::$strategy = $settings->get('clarkwinkelmann-follow-tags-prompt.availableTagStrategy') ?: 'primary';

            if (self::$strategy === 'list') {
                self::$tagIds = json_decode($settings->get('clarkwinkelmann-follow-tags-prompt.availableTagIds', '[]'));
            }
        }

        switch (self::$strategy) {
            case 'all':
                return true;
            case 'primary':
                return !is_null($tag->position) && !$tag->parent_id;
            case 'primaryAndChildren':
                return !is_null($tag->position) || $tag->parent_id;
            case 'primaryAndSecondary':
                return !$tag->parent_id;
            case 'secondary':
                return is_null($tag->position);
            case 'list':
                return in_array($tag->id, self::$tagIds);
        }

        return false;
    }
}
