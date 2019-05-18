import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import {Wrapper, SFab,SButton} from "./style";
import 'react-image-crop/dist/ReactCrop.css';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import GTGO from '@material-ui/icons/Publish';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";
import {Redirect, withRouter} from "react-router";
class CropTool extends PureComponent {
    state = {
        src: this.props.img ? this.props.img : null,
        crop: {
            aspect: 1,
            width: 50,
            x: 0,
            y: 0,
        },
        croppedImg: null,
        goHome: false,
        uploading: false,
    };
    savePost (){
        if(this.state.croppedImg === null) return;
        this.setState({uploading:true})
        axios.get(`/api/knute/${Number(this.props.match.params.id)}`)
            .then((res) => {
                if(res.data.knute.length < 1) return this.setState({uploading:false});
                    axios.post('/api/postknute', {
                        img: this.state.croppedImg,
                        title: res.data.knute[0].title,
                        id: res.data.knute[0].id,
                        description: res.data.knute[0].description,
                        shareable:true,
                    }).then(()=>{
                        this.setState({
                            goHome: true,
                            uploading:false
                        });
                    });
            })

    }
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result }),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;
    };

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                `photo-${new Date().getTime()}.jpeg`,
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );
        this.setState({
            croppedImg:canvas.toDataURL('image/jpeg')
        });
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    render() {
        const { crop, src } = this.state;
        return (
            <Wrapper>
                {
                    this.state.goHome ? (
                        <Redirect to={'/'}/>
                    ) : null
                }
                {this.props.file === null && src === null ? (
                    <SButton variant="contained" component="label">
                        Upload
                        <CloudUploadIcon />
                        <input type="file" accept="image/*" onChange={this.onSelectFile} />
                    </SButton>
                ) : src ? (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                ): <CircularProgress/>}
                <SFab loading={this.state.uploading} open={this.state.croppedImg} aria-label="Send" onClick={() => this.savePost()}>
                    <GTGO/>
                </SFab>
            </Wrapper>
        );
    }
}
CropTool.defaultProps = {
    file: null
};
export default withRouter(CropTool);
