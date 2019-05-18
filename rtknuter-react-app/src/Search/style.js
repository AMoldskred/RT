import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js";
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

const intro = keyframes`
  0% {
   margin-top: -100vh;
  }
  100% {
    margin-top: initial;
  }
`;
const grow = keyframes`
  0% {
   transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  width:100%;
  padding-top:1rem;
  padding-bottom:calc(56px + 1rem);
  display: flex;
  height:calc(100% - 56px);
  flex-direction: column;
  align-items: center;
`;
export const StyledPaper = styled(Paper)`
  animation-name: ${intro};
  animation-duration: .3s;
  animation-timing-function: ease;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  width:98%;
  margin:1%;
  display:flex;
  align-items:center !important;
`;
export const StyledIconButton = styled(IconButton)`
  margin-left:auto !important;
`;
export const StyledBase = styled(InputBase)`
  margin-top:auto;
  margin-bottom:auto;
  margin-left:1rem;
`;
export const SDivider = styled(Divider)`
  width: 1px !important;
  height: 28px !important;
  margin: 4px !important;
`;
export const IconWrap = styled.div`
  height:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  margin:.3rem;
  & > *{
    color: ${Color.singleblue}
  }
`;
export const Load = styled(CircularProgress)`
  margin-top:auto;
  margin-bottom:auto;
  color: ${Color.singlered} !important;
`;
export const Title = styled.h1`
  color:${Color.grey};
  text-align: center;
  margin-top:auto;
  margin-bottom:auto;
  font-weight: 300;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  box-sizing: border-box;
  height:100%;
  width:100%;
  display:flex;
  align-items:center;
  justify-content: space-between;
  flex-direction: row;
`;
export const SResult = styled(Paper)`
  margin-top: ${props => props.timing === 0 ? 1 : 0.5}rem;
  height:5rem;
  width:98%;
  animation-name: ${grow};
  animation-duration: .3s;
  animation-timing-function: ease;
  animation-delay: ${props => props.timing/10}s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  overflow:hidden;
`;
export const ProfileImg = styled.img`
  height:4rem;
  width:4rem;
  background: ${Color.grey};
  border-radius: 50%;
  margin-left:.5rem;
`;
export const ProfileTitle = styled.h2`
  color: rgba(0, 0, 0, ${props => props.opacity});
  font-size: ${props => props.size}rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  margin-top:.25rem;
  margin-bottom:0;
  margin-right:auto;
  font-weight: 400;
`;
export const Styledform = styled.form`
  display: flex;
  width: 100%;
`;