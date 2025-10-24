import app from 'flarum/app';

app.initializers.add('aws-upload', () => {
    app.extensionData
        .for('lymarmaryna-aws-upload')
        .registerSetting(
            {
                setting: 'aws-upload.aws-bucket',
                label: 'AWS Bucket Name',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'aws-upload.aws-region',
                label: 'AWS region',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'aws-upload.aws-key',
                label: 'AWS key',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'aws-upload.aws-secret',
                label: 'AWS Secret Key',
                type: 'password',
            }
        )
});
