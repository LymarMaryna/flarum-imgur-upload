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
    }

    oncreate(vnode) {
        super.oncreate(vnode);
    }

    onupdate(vnode) {
        super.onupdate(vnode);
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

        const url = app.forum.attribute('apiUrl') + '/aws-upload-image'

        $.ajax({
            url: url,
            headers: {
                Authorization: `Token ${app.session.token}`,
                'X-CSRF-Token': app.session.csrfToken,
            },
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: this.success.bind(this),
            error: this.error.bind(this)
        });
    }

    success(response) {
        this.$('input').val('');

        this.isLoading = false;
        this.isSuccess = true;
        m.redraw();

        let stringToInject = this.buildEmbedCode(response.data.url);

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
