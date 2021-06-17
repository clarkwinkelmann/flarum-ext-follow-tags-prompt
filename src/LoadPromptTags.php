<?php

namespace ClarkWinkelmann\FollowTagsPrompt;

use Flarum\Api\Controller\ShowForumController;
use Flarum\Http\RequestUtil;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Psr\Http\Message\ServerRequestInterface;

class LoadPromptTags
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);

        $data['clarkwinkelmannFollowTagsList'] = $this->query($actor)->get();
    }

    protected function query(User $actor): Builder
    {
        /**
         * @var Builder $query
         */
        $query = Tag::query()->whereVisibleTo($actor);

        $strategy = $this->settings->get('clarkwinkelmann-follow-tags-prompt.availableTagStrategy') ?: 'primary';

        switch ($strategy) {
            case 'primary':
                return $query->where(function (Builder $query) {
                    $query
                        ->whereNull('parent_id')
                        ->whereNotNull('position');
                });
            case 'primaryAndChildren':
                return $query->where(function (Builder $query) {
                    $query
                        ->whereNotNull('parent_id')
                        ->orWhereNotNull('position');
                });
            case 'primaryAndSecondary':
                return $query->whereNull('parent_id');
            case 'secondary':
                return $query->whereNull('position');
            case 'list':
                $ids = json_decode($this->settings->get('clarkwinkelmann-follow-tags-prompt.availableTagIds', '[]'));

                return $query->whereIn('id', $ids);
        }

        // case 'all'
        return $query;
    }
}
