import app from 'flarum/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';
import classList from "flarum/common/utils/classList";

export default class UploadButton extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.isLoading = false;
        this.isSuccess = false;
        this.isError = false;
        this.isPasteListenerAttached = false;
    }

    oncreate(vnode) {
        super.oncreate(vnode);
    }

    onupdate(vnode) {
        super.onupdate(vnode);

        if (!this.isPasteListenerAttached && app.forum.attribute('aws-upload.allow-paste') === '1') {
            this.isPasteListenerAttached = true;
            this.attrs.textArea.addEventListener('paste', this.paste.bind(this));
        }
    }

    view() {
        let buttonIcon;
        if (this.isSuccess) buttonIcon = 'fas fa-check green';
        else if (this.isError) buttonIcon = 'fas fa-times red';
        else if (!this.isLoading) buttonIcon = 'far fa-image';

        let label = '';
        if (this.isLoading) label = app.translator.trans('aws-upload.forum.loading');
        else if (this.isSuccess) label = app.translator.trans('aws-upload.forum.done');
        else if (this.isError) label = app.translator.trans('aws-upload.forum.error');

        return <Tooltip text={app.translator.trans('aws-upload.forum.upload')}>
            <Button
                className={classList([
                    'Button',
                    'hasIcon',
                    'aws-upload-button',
                    label === '' && 'Button--icon',
                ])}
                icon={buttonIcon}
                onclick={this.buttonClicked.bind(this)}>
                {this.isLoading && <LoadingIndicator size="small" display="inline" />}
                <span className="Button-label">{label}</span>
                <form>
                    <input type="file" accept="image/*" onchange={this.formUpload.bind(this)}
                           disabled={this.isLoading || this.isSuccess || this.isError}/>
                </form>
            </Button>
        </Tooltip>
    }

    paste(e) {
        if (this.isLoading) return;

        if (e.clipboardData && e.clipboardData.items) {
            let item = e.clipboardData.items[0];

            if (!item.type.startsWith('image')) {
                return;
            }

            let file = item.getAsFile();
            this.upload(file);
        }
    }

    buttonClicked(e) {
        this.$('input').click();
    }

    formUpload(e) {
        const files = this.$('input').prop('files');

        if (files.length === 0) {
            return;
        }

        this.upload(files[0]);
    }

    upload(file) {
        this.isLoading = true;
        m.redraw();

        const formData = new FormData();
        formData.append('image', file);

        // $.ajax({
        //     url: 'https://api.aws.com/3/image',
        //     headers: {
        //         'Authorization': 'Client-ID ' + app.forum.attribute('aws-upload.client-id')
        //     },
        //     type: 'POST',
        //     data: formData,
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     success: this.success.bind(this),
        //     error: this.error.bind(this)
        // });
        this.success();
    }

    success() {
        this.$('input').val('');

        this.isLoading = false;
        this.isSuccess = true;
        m.redraw();

        let imageUrl = 'https://screenshots.pixelfederation.com/ShareX/2025/10/chrome_7QWYS0NGBR.png';

        let stringToInject = this.buildEmbedCode(imageUrl);

        this.attrs.editor.insertAtCursor(stringToInject);

        // After a bit, re-enable upload
        setTimeout(() => {
            this.isSuccess = false;
            m.redraw();
        }, 2000);
    }

    buildEmbedCode(imageUrl) {
        return `[URL=${imageUrl}][IMG]${imageUrl}[/IMG][/URL]\n`;
    }

    previewUrl(url) {
        let extensionIndex = url.lastIndexOf('.');
        return url.slice(0, extensionIndex) + 'h' + url.slice(extensionIndex);
    }

    error(response) {
        $('#aws-upload-form').val('');

        this.isLoading = false;
        this.isError = true;
        m.redraw();

        // Output the error to the console, for debugging purposes
        console.error(response);

        // After a bit, re-enable upload
        setTimeout(() => {
            this.isError = false;
            m.redraw();
        }, 2000);
    }
}
