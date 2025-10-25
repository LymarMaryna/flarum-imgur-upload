import app from 'flarum/app';
import {extend} from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';
import UploadButton from './components/UploadButton';

app.initializers.add('aws-upload', () => {
    extend(TextEditor.prototype, 'controlItems', function (items) {
        items.add(
            'aws-upload',
            <UploadButton textArea={this.$().parents('.Composer')[0]}
                          editor={this.attrs.composer.editor}/>
        );
    });
});
