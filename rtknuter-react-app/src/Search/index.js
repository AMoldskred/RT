import React, { Component } from 'react';
import { Wrapper, StyledPaper, StyledIconButton, StyledBase, IconWrap, SDivider, Load, Title, SResult, ProfileImg,ProfileTitle, Styledform, StyledLink  } from "./style.js";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import PersonAdd from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import {Helmet} from "react-helmet";
class Search extends Component {
    state={
        loading:false,
        response: [],
        q: null,
    };
    onchange = (event) => {
        event.preventDefault();
        if(this.state.q === null) return;
        let usr = encodeURIComponent(this.state.q);
        axios.get(`/api/search/${usr}`)
            .then((response) => {
                this.setState({response: response.data.users})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <Wrapper>
                <Helmet>
                    <title>Søk etter russ</title>
                    <meta name="keywords" content="Russeknute, russ, knute, challenge"/>
                    <meta
                        name="description"
                        content="Søk etter andre russ"
                    />
                </Helmet>
                <StyledPaper elevation={1}>
                    <IconWrap><PersonAdd /></IconWrap>
                    <SDivider />
                    <Styledform action="#" onSubmit={this.onchange}>
                        <StyledBase  placeholder="Søk etter andre" onChange={(e) => {this.setState({q: e.target.value})}}/>
                        <StyledIconButton type={'submit'} aria-label="Search" onClick={this.onchange}>
                            <SearchIcon />
                        </StyledIconButton>
                    </Styledform>
                </StyledPaper>
                {
                    this.state.loading ? (
                        <Load />
                    ) : this.state.response ? this.state.response.length > 0 ?
                        (this.state.response.map((user, i) => (
                            <SResult timing={i} key={i}>
                                <StyledLink to={`/profil/${user._id}`}>
                                    <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    >
                                        <Grid item xs={3} sm={5}>
                                            <ProfileImg src={user.profile_picture}/>
                                        </Grid>
                                        <Grid item xs={9} sm={7}>
                                            <div style={{'display':'flex','flexDirection':'column', 'height':'100%','flex': '1','overflow':'hidden'}}>
                                                <ProfileTitle size={1.5} opacity={0.87}>{user.full_name}</ProfileTitle>
                                                <ProfileTitle size={1} opacity={0.6}>@{user.username}</ProfileTitle>
                                            </div>
                                        </Grid>
                                    </Grid>
                            </StyledLink>
                            </SResult>
                        ))
                    ) : (
                            <Title>Sorry, fant ingenting</Title>
                        ): (<Title>Sorry, fant ingenting</Title>)
                }
            </Wrapper>
        );
    }
}

export default Search;
