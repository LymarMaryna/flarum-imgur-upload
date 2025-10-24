<?php

namespace ImgurUpload;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Settings)
        ->serializeToForum('imgur-upload.aws-bucket', 'imgur-upload.aws-bucket')
        ->serializeToForum('imgur-upload.aws-region', 'imgur-upload.aws-region')
        ->serializeToForum('imgur-upload.aws-key', 'imgur-upload.aws-key')
        ->serializeToForum('imgur-upload.aws-secret', 'imgur-upload.aws-secret')
];
