import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Camera from '@material-ui/icons/CameraAlt';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Opplast from '@material-ui/icons/PhotoLibrary';
import {Link} from "react-router-dom";
import styled from "styled-components";
import LinearProgress from '@material-ui/core/LinearProgress';
export const SLink = styled(Link)`
  text-decoration: none;
`;
export const NoLink = styled.a`
  text-decoration: none;
`;

class DialogChoice extends React.Component {
    render() {
        const { onClose, ...other } = this.props;

        return (
            <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" {...other}>
                { this.props.loading ? ( <LinearProgress />) :(
                <>
                    <DialogTitle id="simple-dialog-title">Bevis knute</DialogTitle>
                    <div>
                        <List>
                            {this.props.shareimage ? (
                                <>
                                <SLink onClick={() =>onClose()} to={`/knute/do/${this.props.k}`}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Camera />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`Ta bilde`} />
                                    </ListItem>
                                </SLink>
                                <SLink onClick={() =>onClose()} to={`/knute/upload/${this.props.k}`}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Opplast />
                                            </Avatar>
                                        </ListItemAvatar>
                                    <ListItemText primary={`Last opp bilde`} />
                                    </ListItem>
                                </SLink>
                                </>
                            ) : (
                                <NoLink onClick={() =>this.props.PostKnute()} to={' '}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ThumbUp />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`Fullfør knuten`} />
                                    </ListItem>
                                </NoLink>
                            )}

                        </List>
                    </div>
                </>
                )}
            </Dialog>
        );
    }
}

DialogChoice.propTypes = {
    onClose: PropTypes.func,
};

export default DialogChoice;