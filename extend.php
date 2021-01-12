<?php

namespace ClarkWinkelmann\FollowTagsPrompt;

use Carbon\Carbon;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Tag;
use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->mutate(function (ForumSerializer $serializer) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $actor = $serializer->getActor();

            return [
                'clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests' => $settings->get('clarkwinkelmann-follow-tags-prompt.allDiscussionsOnFollowingPageForGuests') === '1',
                'clarkwinkelmannFollowTagsPromptButton' => $settings->get('clarkwinkelmann-follow-tags-prompt.buttonOnFollowingPage') !== '0',
                'clarkwinkelmannFollowTagsShouldPrompt' => $actor->exists && is_null($actor->clarkwinkelmann_follow_tags_configured_at),
            ];
        }),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attribute('clarkwinkelmannFollowTagsPromptAvailable', function (TagSerializer $serializer, Tag $tag) {
            return AvailableTagsStrategy::isAvailable($tag);
        }),

    (new Extend\Event())
        ->listen(Saving::class, function (Saving $event) {
            if (isset($event->data['attributes']['followTagsConfigured'])) {
                // Not using a permission because we want this to work even for unconfirmed or suspended users
                if ($event->actor->id !== $event->user->id) {
                    throw new PermissionDeniedException();
                }

                if (is_null($event->user->clarkwinkelmann_follow_tags_configured_at)) {
                    $event->user->clarkwinkelmann_follow_tags_configured_at = Carbon::now();
                }
            }
        }),
];
