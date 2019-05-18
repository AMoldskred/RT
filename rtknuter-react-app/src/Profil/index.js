import React, { Component } from 'react';
import { KontoWrap, Profile, ProfileCircle, Title, Content, Title2, Stats, FollowBtn, ImgCard, SettingsLink } from "./style.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from "react-router-dom";
import {Settings} from "@material-ui/icons";
import axios from 'axios';
import {Helmet} from "react-helmet";
class Profil extends Component {
    state={
        image: "",
        name: "",
        knuter: [],
        loading: true,
        following: false,
        me: true,
        id: null,
        followLoad: false,
    };
    componentDidMount() {
        if(this.props.match.params.id){
            axios.get(`/api/profile/${this.props.match.params.id}`).then((res) => {
                this.setState({
                    id: this.props.match.params.id,
                    loading: false,
                    image: res.data.user.profile_picture,
                    name: res.data.user.full_name,
                    knuter: res.data.posts.reverse(),
                })
            });
            axios.get(`/api/following/${this.props.match.params.id}`).then((res) => {
                this.setState({
                    following: res.data.follow,
                })
            })
            axios.get('/api/me').then((res) => {
                this.setState({
                    me:res.data.id === this.props.match.params.id
                })
            })
        }else{
            axios.get('/api/profile')
            .then((res) => {
                if(!res.data.user || res.data.error ) return;
                this.setState({
                    me: true,
                    loading: false,
                    image: res.data.user.profile_picture,
                    name: res.data.user.full_name,
                    knuter: res.data.posts.reverse(),
                })
            })
        }
    }
    follow = () =>{
        this.setState({followLoad:true});
        if(this.state.following && this.state.id !== null){
            axios.post(`/api/unfollow/${this.state.id}`).then((res) => {
                if(res.data.error) return;
                this.setState({
                    following: false,
                    followLoad:false
                })
            })
        }else if(this.state.id !== null){
            axios.post(`/api/follow/${this.state.id}`).then((res) => {
                if(res.data.error) return;
                this.setState({
                    following: true,
                    followLoad:false
                })
            })
        }
    }
    render() {
        return (
            <KontoWrap>
                <Helmet>
                    <title>Russeprofil: {this.state.name}</title>
                    <meta name="keywords" content="Russeknute, russ, knute, challenge"/>
                    <meta
                        name="description"
                        content="Din russeprofil"
                    />
                </Helmet>
                <Profile me={this.state.me}>
                    <ProfileCircle image={this.state.image} score={this.state.knuter.length}/>
                    <Title>{this.state.name}</Title>
                    <Stats>
                        {
                            this.state.me ? (<SettingsLink to={'/settings'}><Settings/></SettingsLink>) : (
                                <FollowBtn onClick={() => this.follow()} variant="outlined">{this.state.followLoad ? (<CircularProgress size={24}/>) : !this.state.following ? 'Follow' : 'Unfollow'}</FollowBtn>
                            )
                        }
                    </Stats>
                </Profile>
                <Content>
                    {
                        this.state.knuter.length > 0 ? (
                                this.state.knuter.map((knute,i) => (
                                <ImgCard key={`profilknute-${i}`} img={knute.body.minified} to={`/post/${knute._id}/${encodeURIComponent(this.props.match.url)}`}/>
                                ))
                        ) : (
                            <Title2>Ingen knuter her</Title2>
                        )
                    }
                </Content>
            </KontoWrap>
        );
    }
}

export default withRouter(Profil);
