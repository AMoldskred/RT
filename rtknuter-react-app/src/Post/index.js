import React, { Component } from 'react';
import { Wrapper, Styledimg, Back, Title, StyledButton } from "./style.js";
import {Redirect} from "react-router-dom";
import {Clear, SaveAlt} from "@material-ui/icons";
import axios from "axios";
class Post extends Component {
    state = {
        img: decodeURIComponent(this.props.img),
        k: this.props.id,
        goHome: false,
        knute:this.props.knute,
    }
    savePost (){
        axios.post('/api/postknute', {
            img: this.state.img,
            title: this.state.knute.title,
            id: Number(this.state.k),
            description: this.state.knute.description
        }).then(()=>{
            this.setState({
                goHome: true,
            });
        })

    }

    render() {
        return (
            <Wrapper>
                {
                    this.state.goHome ? (
                        <Redirect to={'/'}/>
                    ) : null
                }
                <Back to={`/knute/do/${this.state.k}`}><Clear/></Back>
                <Title>{this.state.knute.title}</Title>
                <Styledimg src={`${this.state.img}`} alt={`Knute-${this.state.k}`}/>
                <StyledButton variant="extended" onClick={() => this.savePost()}><SaveAlt/>Lagre knute</StyledButton>

            </Wrapper>
        );
    }
}

export default Post;
