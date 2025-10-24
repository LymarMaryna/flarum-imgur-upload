import app from 'flarum/app';

app.initializers.add('imgur-upload', () => {
    app.extensionData
        .for('lymarmaryna-imgur-upload')
        .registerSetting(
            {
                setting: 'imgur-upload.aws-bucket',
                label: 'AWS Bucket Name',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'imgur-upload.aws-region',
                label: 'AWS region',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'imgur-upload.aws-key',
                label: 'AWS key',
                type: 'text'
            }
        )
        .registerSetting(
            {
                setting: 'imgur-upload.aws-secret',
                label: 'AWS Secret Key',
                type: 'password',
            }
        )
});
