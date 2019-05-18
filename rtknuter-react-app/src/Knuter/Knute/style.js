import styled, { keyframes } from "styled-components";
import * as Color from "../../colors.js";
import {LocalBar} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const load = keyframes`
  0% {
   transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`
export const KnuteWrap = styled.div`
  height: 100%;
  background: ${props => !props.lokal ? Color.blue : Color.red};
  color:white;
  margin-bottom: calc(56px + 1rem);
  box-shadow: 0 3px 6px rgba(0,24,36,0.16), 0 3px 6px rgba(0,24,36,0.23);
  border-radius:3px; 
  display:flex;
  transition: all .3s ease;
  flex-direction:row;
  animation-name: ${load};
  animation-duration: ${props => (props.k%10)/10+0.3}s;
  animation-timing-function: ease;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

export const KnuteIcon = styled(LocalBar)`
  font-size: 2rem !important;
  text-align: center;
  margin:auto;
  font-weight:300;
  display:block !important;
  margin-left:.5rem !important;
`;
export const KnuteTitle = styled.h2`
  font-weight:300;
  text-align:center;
  margin: 0;
  overflow:hidden;
  text-overflow:ellipsis;
`;
export const StyledGrid = styled(Grid)`
  flex: 1;
`;
export const StyledLink = styled.div`
  height:6rem;
  width:96%;
  text-decoration: none;
  margin-top:${props => props.first ? 'calc(.5rem + 56px)': '.5rem'};
  cursor:pointer;
`;
