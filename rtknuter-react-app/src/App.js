import React, { Component } from 'react';
import { Route, Link, withRouter } from "react-router-dom";

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import axios from "axios";
//Icons
import KontoIcon from '@material-ui/icons/Person';
import HjemIcon from '@material-ui/icons/Home';
import KnuterIcon from '@material-ui/icons/LocalBar';
import Search from '@material-ui/icons/Search';

//Custom
import Timeline from "./Timeline";
import Knuter from "./Knuter";
import Profil from "./Profil";
import SinglePost from "./SinglePost";
import SingelKnute from "./SingelKnute";
import Kamera from './Kamera';
import Follow from './Search';
import Login from './Login';
import CropTool from './Crop';
import Settings from './Settings';
import AdminTimeline from './Admintimeline';
//Styling
import { StyledBottomNavigation, Wrapper } from "./style.js";

class App extends Component {
  handleChange = (e,value) => this.setState({value: value});

  state = {
      value: this.props.location.pathname,
      login: null, //Må endres til false
  };
  componentDidMount() {

      axios.get('/api/ping')
          .then((res) => {
              this.setState({
                  login: res.data.login
              })
          })

  }

    render() {
    const { value } = this.state;
    return (
        <Wrapper>
            {
                this.state.login ? (
                    <>
                    <Route path={"/timeline"} exact component={Timeline}/>
                    <Route path={"/profil"} exact component={Profil}/>
                    <Route path={"/profil/:id"} component={Profil}/>
                    <Route path={"/post/:id/:return"} component={SinglePost}/>
                    <Route exact path={"/knute/do/:id"} component={Kamera}/>
                    <Route exact path={"/knute/upload/:id"} component={CropTool}/>
                    <Route path={"/Search"} component={Follow}/>
                    <Route path={"/settings"} component={Settings}/>
                    <Route path={"/admin"} component={AdminTimeline}/>

                    </>
                ) : (
                    <>
                        <Route path={"/timeline"} exact render={props => ( <Login ready={this.state.login !== null}/>)}/>
                        <Route path={"/profil"} exact render={props => ( <Login ready={this.state.login !== null}/>)}/>
                        <Route path={"/Search"} exact render={props => ( <Login ready={this.state.login !== null}/>)}/>
                    </>
                )
            }
        <Route path={"/"} exact component={Knuter}/>
        <Route path={"/knuter"} component={Knuter}/>
        <Route exact path={"/knute/:id"} component={SingelKnute}/>
        <StyledBottomNavigation value={value} onChange={this.handleChange} >
            <BottomNavigationAction component={Link} to={'/timeline'} value={"/timeline"} label="Hjem" icon={<HjemIcon />} />
            <BottomNavigationAction component={Link} to={'/'} value={"/" || "/knuter"} label="Knuter" icon={<KnuterIcon />}/>
            <BottomNavigationAction component={Link} to={'/Search'} value={"/Search"} label="Søk" icon={<Search />} />
            <BottomNavigationAction component={Link} to={'/profil'} value={"/profil"} label="Profil" icon={<KontoIcon />} />
        </StyledBottomNavigation>
        </Wrapper>
    );
  }
}



export default withRouter(App);
