import React, { Component } from 'react';
import { Wrapper, Load, Title, StyledTabs, Feed, StyledAvatar, SCard, SLink, PostImg } from "./style.js";
import Tab from '@material-ui/core/Tab';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography"
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {Helmet} from "react-helmet";



class Timeline extends Component {
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
        axios.get(`/api/feed?limit=${limit}&offset=${offset}`)
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
    handleChange = (event, value) => {
        this.setState({ value });
    };
    componentDidMount(){
        this.getFeed();
    }
    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>Russeknuter Tidslinje</title>
                    <meta name="keywords" content="Russeknute, russ, knute, challenge"/>
                    <meta
                        name="description"
                        content="Tidslinje av knuter til de du følger"
                    />
                </Helmet>
                    <StyledTabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Timeline" />
                        <Tab label="Scoreboard" disabled />
                    </StyledTabs>
                <Feed>
                {
                    this.state.loading ? (
                        <Load />
                    ) : this.state.error ? (
                        <Title>Noe gikk galt?</Title>
                    ) : this.state.value === 0 ?
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
                                    <SLink to={`/profil/${post.creator}`}>
                                        <CardHeader
                                            avatar={
                                                <StyledAvatar src={post.body.profile_picture} />
                                            }
                                            title={post.body.knuteTitle}
                                            subheader={post.body.user}
                                        />
                                    </SLink>

                                        <PostImg className={"loading"} draggable={false} src={post.body.img} onLoad={(e) => {e.target.classList.toggle('loading')}}/>
                                    <CardContent>
                                        <Typography variant="subtitle1">{post.body.description}</Typography>
                                    </CardContent>
                                </SCard>
                            ))}
                        </InfiniteScroll>
                    ) : (<Title>Tomt? Følg noen da vel!</Title>) : (
                            <Title>Her kommer scoreboard</Title>
                        )
                }
                </Feed>
            </Wrapper>
        );
    }
}

export default Timeline;
