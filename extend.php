<?php

namespace AwsUpload;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Settings)
        ->serializeToForum('aws-upload.aws-bucket', 'aws-upload.aws-bucket')
        ->serializeToForum('aws-upload.aws-region', 'aws-upload.aws-region')
        ->serializeToForum('aws-upload.aws-key', 'aws-upload.aws-key')
        ->serializeToForum('aws-upload.aws-secret', 'aws-upload.aws-secret')
];
