import React, { Component } from 'react';
import  {KnuteWrap, KnuteIcon, KnuteTitle, StyledGrid, StyledLink} from "./style";
import Grid from '@material-ui/core/Grid';


class Knute extends Component {


    render() {
        const {knute} = this.props;
        return (
            <StyledLink first={this.props.k === 0} onClick={()=> this.props.handleClick(this.props.knute)}>
            <KnuteWrap k={this.props.k} lokal={this.props.lokal}>
                <Grid container direction={'row'} alignItems={'center'}>
                    <Grid item md={2} style={{'display':'block'}}>
                        <KnuteIcon/>
                    </Grid>
                    <Grid item md={2}>
                        <h2>{knute.id}.</h2>
                    </Grid>
                    <StyledGrid item md={8}>
                        <KnuteTitle>{knute.title}</KnuteTitle>
                    </StyledGrid>
                </Grid>
            </KnuteWrap>
            </StyledLink>
        );
    }
}

export default Knute;
