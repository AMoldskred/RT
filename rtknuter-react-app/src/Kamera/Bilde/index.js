import React, { Component } from 'react';
import { Wrapper, Back, Bottom, Title, PostContent, Styledimg } from "./style.js";
import {Clear, Send} from "@material-ui/icons";
class Bilde extends Component {

    render() {
        return (
            <Wrapper>
                <Back onClick={() => this.props.redo()}><Clear/></Back>
                <Styledimg src={`${this.props.img}`} alt={`Knute-${this.props.k}`}/>
                <Bottom>
                    <Title>{this.props.knute.title}</Title>
                    <PostContent onClick={() => this.props.setReady()}><Send/></PostContent>
                </Bottom>
            </Wrapper>
        );
    }
}

export default Bilde;
