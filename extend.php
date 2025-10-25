<?php

namespace AwsImageUpload;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    // Add API route for uploads
    (new Extend\Routes('api'))
        ->post('/aws-upload-image', 'aws.upload-image', AwsUploadController::class),

    (new Extend\Settings)
        ->serializeToForum('aws-upload.aws-bucket', 'aws-upload.aws-bucket')
        ->serializeToForum('aws-upload.aws-region', 'aws-upload.aws-region')
        ->serializeToForum('aws-upload.aws-key', 'aws-upload.aws-key')
        ->serializeToForum('aws-upload.aws-secret', 'aws-upload.aws-secret')
];
