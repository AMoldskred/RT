import React, { Component } from 'react';
import {Wrapper, StyledTabs} from "./style.js";
import Knute from "./Knute";
import axios from "axios";
import Tab from '@material-ui/core/Tab';
import {Redirect} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleKnute from "SingelKnute";
class Knuter extends Component {
    state = {
        knuter: [],
        lokalknuter: [],
        lokal: false,
        setskole:false,
        login:false,
        hasMore: true,
        openKnute: null,
    };
    componentDidMount() {
        this.getFeed()
        axios.get('/api/ping')
            .then((res) => {
                this.setState({
                    login: res.data.login
                })
            })
    }
    getFeed = () => {
        console.log('Get feed')
        const limit = 10;
        let offset = this.state.knuter.length > 0 ? this.state.knuter.length : 0;
        axios.get(`/api/knuter?limit=${limit}&offset=${offset}`)
            .then((res) => {
                let p = this.state.knuter;
                p = p.concat(res.data.knuter);
                console.log(p)
                this.setState({
                    hasMore: res.data.knuter.length !== 0,
                    knuter: p,
                })
            })
    }
    handleChange = () =>{
        if(!this.state.login){
            this.setState({
                setskole:true,
            })
        }
        if(!Array.isArray(this.state.lokalknuter))return;
        if(this.state.lokalknuter.length < 1){
            axios.get(`/api/knuter/skole`).then((res) =>{
                if(res.data.knuter === false){
                    this.setState({
                        setskole:true,
                    })
                }else{
                    this.setState({
                        lokal:!this.state.lokal,
                        lokalknuter: res.data.knuter
                    })
                }

            })
        }else{
            this.setState({
                lokal:!this.state.lokal
            })
        }
    }
    openKnute = (knute) => {
        this.setState({
            openKnute: knute
        })
    };
    closeKnute = () =>{
        this.setState({openKnute:null})
    }
    render() {
        return (
            <Wrapper>
                {this.state.setskole ? this.state.login ? (<Redirect to={'/settings'}/>): (<Redirect to={'/profil'}/>):null}
                {this.state.openKnute !== null ? (
                    <SingleKnute handleClose={this.closeKnute} knute={this.state.openKnute}/>
                ) : null}
                <StyledTabs
                    value={!this.state.lokal ? 0 : 1}
                    onChange={this.handleChange}
                    variant="fullWidth"
                >
                    <Tab label="Knuter" />
                    <Tab label="Skoleknuter"/>
                </StyledTabs>
                {
                        this.state.lokal ?
                            Array.isArray(this.state.lokalknuter) ?
                            this.state.lokalknuter.length > 0 ?
                                this.state.lokalknuter.map((knute,i) => (
                                    <Knute handleClick={this.openKnute} key={i} k={i} knute={knute} lokal={this.state.lokal}/>
                                ))
                            : null : null
                        :
                            this.state.knuter.length > 0 ? (
                                    <InfiniteScroll
                                        dataLength={this.state.knuter.length}
                                        next={this.getFeed}
                                        hasMore={this.state.hasMore}
                                        style={{display:'flex' , flexDirection: 'column',alignItems: 'center',overflow: 'initial'}}
                                        scrollableTarget="root"
                                        endMessage={
                                            <p style={{textAlign: 'center'}}>
                                                <i>Det var alt!</i>
                                            </p>
                                        }
                                    >{
                                        this.state.knuter.map((knute,i) => (
                                            <Knute handleClick={this.openKnute} key={i} k={i} knute={knute} lokal={this.state.lokal}/>
                                        ))
                                    }
                                    </InfiniteScroll>
                                )
                            : null
                }

            </Wrapper>
        );
    }
}

export default Knuter;
