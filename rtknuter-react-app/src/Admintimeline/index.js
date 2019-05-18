import React, { Component } from 'react';
import { Wrapper, Load, Title, Feed, StyledAvatar, SCard, PostImg } from "./style.js";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography"
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {DeleteSweep} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";


class AdminTimeline extends Component {
    state = {
        hasMore: true,
        loading: false,
        feed: [],
        error: false,
        value:0,
    };

    getFeed = () => {
        console.log('Get feed')
        const limit = 10;
        let offset = this.state.feed.length > 0 ? this.state.feed.length : 0;
        axios.get(`/api/adminfeed?limit=${limit}&offset=${offset}`)
            .then((res) =>{
                let p = this.state.feed;
                p = p.concat(res.data.posts);
                console.log(p)
                this.setState({
                    hasMore: res.data.posts.length !== 0,
                    feed: p,
                    error: false,
                    loading:false,
                })
            })
            .catch(() => {
                this.setState({
                    error: true,
                    loading:false,
                })
            })
    }
    componentDidMount(){
        this.getFeed();
    }
    deletePost = (id) => {
        axios.get(`/api/admindelete/${id}`)
        .then(res => {
            this.setState({
                feed: this.state.feed.filter(e => e._id !== id)
            })
        });
    }
    render() {
        return (
            <Wrapper>
                <Feed>
                {
                    this.state.loading ? (
                        <Load />
                    ) : this.state.error ? (
                        <Title>Noe gikk galt?</Title>) :
                        this.state.feed.length > 0 ? (
                        <InfiniteScroll
                            dataLength={this.state.feed.length}
                            next={this.getFeed}
                            hasMore={this.state.hasMore}
                            loader={<Load style={{marginLeft:'auto' , marginRight: 'auto'}}/>}
                            style={{display:'flex' , flexDirection: 'column'}}
                            scrollableTarget="root"
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <i>Det var alt, følg noen!</i>
                                </p>
                            }
                        > {
                            this.state.feed.map((post, i) => (
                                <SCard key={`card${i}`}>
                                        <CardHeader
                                            avatar={
                                                <StyledAvatar src={post.body.profile_picture} />
                                            }
                                            title={post.body.knuteTitle}
                                            subheader={post.body.user}
                                            action={
                                                <IconButton onClick={() => this.deletePost(post._id,i)}>
                                                    <DeleteSweep />
                                                </IconButton>
                                            }
                                        />

                                        <PostImg className={"loading"} draggable={false} src={post.body.img} onLoad={(e) => {e.target.classList.toggle('loading')}}/>
                                    <CardContent>
                                        <Typography variant="subtitle1">{post.body.description}</Typography>
                                    </CardContent>
                                </SCard>
                            ))}
                        </InfiniteScroll>
                    ) : (<Title>Tomt? Følg noen da vel!</Title>)
                }
                </Feed>
            </Wrapper>
        );
    }
}

export default AdminTimeline;
