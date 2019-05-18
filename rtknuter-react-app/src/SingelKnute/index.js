import React, { Component } from 'react';
import { Wrapper, Top, Title, Bottom, SubTitle, Task, Back, Action, Return } from "./style.js";
import { ArrowBack} from "@material-ui/icons";
import AddIcon from '@material-ui/icons/LocalBar';
import axios from "axios";
import DialogChoice from "../Dialog";
import {Redirect} from "react-router";
import { Helmet } from "react-helmet";

class SingelKnute extends Component {
    state={
        k: this.props.match ? this.props.match.params.id : this.props.knute.id,
        knute: "",
        description: '',
        dialog: false,
        done:true,
        lokalknute: false,
        loadingpost:false,
        redirect:false,
    };
    componentDidMount() {
        let {knute} = this.props;
        if(this.props.knute === undefined) {
            axios.get(`/api/knute/${this.props.match.params.id}`)
                .then((res) => {
                    if (res.data.knute.length < 1) return;
                    this.setState({
                        knute: res.data.knute[0].title,
                        description: res.data.knute[0].description,
                        lokalknute: res.data.knute[0].lokal ? true : false,
                        shareable: res.data.knute[0].shareable,
                        k: res.data.knute[0].id
                    }, () => {
                        axios.get(`/api/isdone/${this.props.match.params.id}`).then((d) => {
                            this.setState({done: d.data.done})
                        });
                    })

                })
        }else{
            this.setState({
                knute: knute.title,
                k:knute.id,
                description: knute.description,
                lokalknute:knute.lokal ? true : false,
                shareable: knute.shareable,
            }, () => {
                axios.get(`/api/isdone/${this.state.k}`).then((d) => {
                    this.setState({done: d.data.done})
                });
            })
        }
    }
    openDialog(){
        this.setState({
            dialog: !this.state.dialog
        })
    }
    postKnute = () =>{
        this.setState({
            loadingpost:true,
        })
        axios.post('/api/postknute', {
            shareable: false,
            title: this.state.knute,
            id: Number(this.state.k),
            description: this.state.description
        }).then(() => {
            this.setState({
                redirect:true,
            })
        })
    }
    render() {
        return (
            <Wrapper>
                {
                    typeof this.props.handleClose === 'function' ? (
                    <Helmet>
                        <title>Knute: {this.state.knute}</title>
                        <meta name="keywords" content="Russeknute, russ, knute, challenge"/>
                        <meta
                            name="description"
                            content={this.state.description}
                        />
                    </Helmet>) : null
                }
                {this.state.redirect ? (<Redirect to={'/'}/>) :null}
                { typeof this.props.handleClose === 'function' ? (
                        <Return onClick={() => this.props.handleClose()}><ArrowBack/></Return>
                ) :
                    (<Back to={'/knuter'}><ArrowBack/></Back>)
                }
                <Top lokal={this.state.lokalknute}>
                    <Title>{this.state.k}.</Title>
                    <Title>{this.state.knute}</Title>
                </Top>
                <Bottom>
                    <DialogChoice loading={this.state.loadingpost} PostKnute={this.postKnute} shareimage={this.state.shareable} k={this.state.k} open={this.state.dialog} onClose={() =>this.openDialog()} />
                    <SubTitle>Oppgave:</SubTitle>
                    <Task>{this.state.description}</Task>
                    { this.state.done || this.state.done === null ? null :(
                        <Action onClick={() => this.openDialog()}><AddIcon/></Action>
                        )
                    }
                </Bottom>
            </Wrapper>
        );
    }
}

export default SingelKnute;
