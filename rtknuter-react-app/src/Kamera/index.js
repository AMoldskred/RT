import React, { Component } from 'react';
import { Wrapper, Back, Angle, StyledCamera} from "./style.js";
import { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import './index.css';
import {ArrowBack, CameraFront, CameraRear} from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Bilde from './Bilde';
import CropTool from '../Crop';
import axios from "axios";

class Kamera extends Component {
    state = {
        k: this.props.match.params.id,
        cameraAngle: FACING_MODES.USER,
        error: {
            state: false,
            message: '',
        },
        width: Math.max(document.documentElement.clientWidth, window.innerWidth),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight),
        img: null,
        knute: {},
        postReady: false,
    }
    componentDidMount() {
        axios.get(`/api/knute/${Number(this.state.k) +1}`).then((res) =>{
            this.setState({
                knute: res.data.knute[0]
            })
        })
        document.getElementById('outer-circle').onclick = this.captureVideoFrame;
    }
    onTakePhoto (dataUri) {
        this.setState({
            img: dataUri
        })
    }
    redoImage = () =>{
        this.setState({
            img: null
        })
    };
    captureVideoFrame() {
        if(!this.cam) return;
        const video = this.cam.videoRef.current;
        let canv = document.createElement("CANVAS");
        let ctx = canv.getContext('2d')
        window.c = canv;
        const ratio = video.clientHeight > video.clientWidth ? video.clientHeight/video.clientWidth : video.clientWidth/video.clientHeight;
        console.log(ratio)
        canv.width = video.videoWidth < video.videoHeight ? video.videoWidth : video.videoHeight;
        canv.height = video.videoWidth < video.videoHeight ? video.videoWidth*ratio : video.videoHeight*ratio;

        if(this.state.cameraAngle ===  FACING_MODES.USER){
            ctx.translate(canv.width, 0);
            ctx.scale(-1, 1);
        }

        ctx.drawImage(video, 0, 0);
        let dataUri = canv.toDataURL('image/JPEG');
        this.setState({
            img: dataUri
        })
    };
    changeFace(){
        if(this.state.cameraAngle === FACING_MODES.USER){
            this.setState({
                cameraAngle: FACING_MODES.ENVIRONMENT
            })
        }else{
            this.setState({
                cameraAngle: FACING_MODES.USER
            })
        }
    }
    onCameraError (error) {
        if(this.state.error.state) return;
        this.setState({
            error: {
                state: true,
                message: error
            }
        })
        console.error('onCameraError', error);
    }
    askForCamera() {
        navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
            console.log(stream)
            this.setState({
                error: {
                    state: !stream.active
                },
            })
        })

    }
    ready = () =>{
        this.setState({
            postReady:!this.state.postReady,
        })
    }
    render() {
        return (
            !this.state.postReady ? (
        <Wrapper>
            <Back to={`/knute/${this.state.k}`}><ArrowBack/></Back>
            <Angle onClick={() => this.changeFace()}>{this.state.cameraAngle === FACING_MODES.USER ? (<CameraRear/>) : (
                <CameraFront/>)}</Angle>
            {
                this.state.error.state ? (
                    <Dialog
                        open={true}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Vi har problemer med å åpne kamera"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Vennligst tillat bruk av kamera
                            </DialogContentText>
                        </DialogContent>
                        <Button onClick={() => {
                            this.askForCamera()
                        }} color="primary" autoFocus>Tillat</Button>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>) : (
                    <StyledCamera
                        ref={el => (this.cam = el)}
                        onTakePhoto={(dataUri) => {
                            this.captureVideoFrame()
                        }}
                        onCameraError={(error) => {
                            this.onCameraError(error);
                        }}
                        idealFacingMode={this.state.cameraAngle}
                        isFullscreen={true}
                        isMaxResolution = {true}
                        imageType={IMAGE_TYPES.JPG}
                        imageCompression={1}
                        isImageMirror={this.state.cameraAngle === FACING_MODES.USER}
                        isDisplayStartCameraError={false}
                        sizeFactor={1}
                        flip={this.state.cameraAngle === FACING_MODES.USER}
                    />
                )
            }
            {
                this.state.img !== null ? (
                    <Bilde img={this.state.img} k={this.state.k} knute={this.state.knute !== {} ? this.state.knute : {}}
                           redo={this.redoImage} setReady={this.ready}/>
                ) : null
            }
        </Wrapper>) : (
            <CropTool img={this.state.img} id={this.state.k} knute={this.state.knute}/>
            )
        );
    }
}

export default Kamera;
