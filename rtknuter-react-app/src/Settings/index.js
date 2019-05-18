import React, { Component } from 'react';
import { Wrapper, Header, Back, StyledFormControl, Text, SubmitKnute } from "./style.js";
import axios from "axios";
import {Close} from "@material-ui/icons";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
class Settings extends Component {
    state = {
        skoler: [],
        currentschool:'',
    }
    componentDidMount() {
        axios.get('/api/skoler')
            .then((skoler) => {
                this.setState({
                    skoler:skoler.data.skoler,
                    currentschool: skoler.data.sattskole,
                })
            })
    }
    schoolChange = event => {
        let skole = event.target.value;
        console.log(skole)
        if(skole === this.state.skole)return;
        axios.get(`/api/joinlokalskole/${skole}`)
            .then((e) => {
                this.setState({
                    currentschool: skole,
                })
            })
    }
    render() {
        return (
            <Wrapper>
                <Back to={'/profil'}><Close/></Back>
                <Header>Settings</Header>
                <Text>Velg din skole for å få lokale russknuter</Text>
                <StyledFormControl>
                    <InputLabel htmlFor="skole-native-helper">Din skole</InputLabel>
                    <NativeSelect
                        value={this.state.currentschool}
                        onChange={this.schoolChange}
                        input={<Input name="skole" id="skole-native-helper" />}
                    >
                        <option value="" />
                        {this.state.skoler.length > 0 ?
                            this.state.skoler.map(skole => (<option key={`skole-${skole.skole}`} value={skole.skole} >{skole.skole}</option>)): null
                        }
                    </NativeSelect>
                </StyledFormControl>
                <Text>
                    Er du i ditt lokale russestyre, send inn deres russeknuter her:
                </Text>
                <SubmitKnute href={'https://forms.gle/c1PjxmxuDuvLWZ7d9'} target="_blank">
                    Send inn
                </SubmitKnute>
                <Text>
                    Har du funnet en post som er upassende, rapporter her:
                </Text>
                <SubmitKnute red href={'https://forms.gle/XxmXJ8YXfKyD5Zd58'} target="_blank">
                    Rapporter
                </SubmitKnute>
            </Wrapper>
        );
    }
}

export default Settings;
