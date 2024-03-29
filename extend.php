<?php

namespace ClarkWinkelmann\FollowTagsPrompt;

use Carbon\Carbon;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Api\Serializer\TagSerializer;
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
        ->attributes(function (ForumSerializer $serializer): array {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = resolve(SettingsRepositoryInterface::class);

            $actor = $serializer->getActor();

            return [
                'clarkwinkelmannFollowTagsPromptAllDiscussionsForGuests' => $settings->get('clarkwinkelmann-follow-tags-prompt.allDiscussionsOnFollowingPageForGuests') === '1',
                'clarkwinkelmannFollowTagsPromptButton' => $settings->get('clarkwinkelmann-follow-tags-prompt.buttonOnFollowingPage') !== '0',
                'clarkwinkelmannFollowTagsShouldPrompt' => $actor->exists && is_null($actor->clarkwinkelmann_follow_tags_configured_at),
            ];
        }),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('clarkwinkelmannFollowTagsList', TagSerializer::class),

    (new Extend\ApiController(ShowForumController::class))
        // Needs to load parent, otherwise the Flarum Tags IndexPage side navigation will think second-level tags are first-level tags
        ->addInclude(['clarkwinkelmannFollowTagsList.parent'])
        ->prepareDataForSerialization(LoadPromptTags::class),

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
