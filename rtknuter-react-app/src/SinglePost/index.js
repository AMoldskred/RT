import React, { Component } from 'react';
import { Wrapper, Loader } from "./style.js";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography"
import axios from "axios";
import {SCard, StyledAvatar, SLink} from "./style";
import IconButton from '@material-ui/core/IconButton';
import {ArrowBack, DeleteSweep} from "@material-ui/icons";
import {Redirect} from "react-router";
class SinglePost extends Component {
    state = {
        post: {},
        body: {},
        mypost:false,
        redirect:false,
    };



    componentWillMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
            .then((res) =>{
                if(res.data.post.body){
                    let post = res.data.post;
                    axios.get(`/api/me`)
                        .then(me => {
                            this.setState({
                                post:post,
                                mypost:post.creator === me.data.id
                            });
                        })
                }else{
                    this.setState({
                        error:true,
                    })
                }
            })
    }
    deletePost(){
        axios.get(`/api/deletePost/${this.state.post._id}`).then(r=> {
            this.setState({
                redirect:true
            })
        })
    }
    render() {
        let {post} = this.state;
        return (
            <Wrapper>
                {this.state.redirect ? (<Redirect to={'/'}/>):null}
                <SLink to={decodeURIComponent(this.props.match.params.return).toString()}>
                    <IconButton aria-label="Back">
                        <ArrowBack fontSize="large"/>
                    </IconButton>
                </SLink>
                {Object.keys(post).length ? (
                <SCard>
                    <CardHeader
                        avatar={
                            <StyledAvatar src={post.body.profile_picture} />
                        }
                        title={post.body.knuteTitle}
                        subheader={post.body.user}
                        action={
                            this.state.mypost ? (
                            <IconButton onClick={() => this.deletePost()}>
                                <DeleteSweep />
                            </IconButton>
                            ):null
                        }
                    />

                    <img draggable={false} src={post.body.img} alt={''}/>
                    <CardContent>
                        <Typography variant="subtitle1">{post.body.description}</Typography>
                    </CardContent>
                </SCard>)
                : (
                    <Wrapper>
                        <Loader />
                    </Wrapper>
                    )
                }
            </Wrapper>
        );
    }
}

export default SinglePost;
