import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom";
export const KontoWrap = styled(Grid)`
  height:100%;
  width:100%;
`;

export const Profile = styled.div`
  width:100%;
  padding-top:10%;
  min-height:40%;
  display:flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.me ? Color.red : Color.blue};
`;
const load = keyframes`
  0% {
   transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
export const ProfileCircle = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat !important;
  background:white;
  background-size: cover !important;
  background-image: ${props => props.image === "" ? "white" : `url('${props.image}')`};
  animation-name: ${load};
  animation-duration: .3s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  &::after{
    content:"${props => props.score ? props.score : ""}";
    animation:${load} .5s ease;
    position:absolute;
    bottom:0px;
    right:0px;
    font-size:1.5em;
    background:${Color.green};
    color:white;
    width:1.7em;height:1.7em;
    text-align:center;
    line-height:1.7em;
    border-radius:50%;
  }
`;
export const Title = styled.h1`
  font-weight:600;
  color: white;
  letter-spacing: 2px;
  text-align: center;
  text-shadow:0 0 1px transparent;
`;
export const Content = styled.div`
  width:100%;
  min-height: 60%;
  display:flex;
  flex-wrap:wrap;
  padding-bottom:calc(56px + 1rem);
`;
export const Title2 = styled.h1`
  width:100%;
  color:${Color.grey};
  text-align: center;
  margin-top:auto;
  margin-bottom:auto;
  font-weight: 300;
`;
export const Stats = styled.h2`
  margin-top:.5rem;
  margin-bottom:.5rem;
  font-size:1.6rem;
  font-weight:400;
  color:;
  line-height:1.6;
`;
export const FollowBtn = styled(Button)`
  color: white !important;
  border: 1px solid white !important;
  margin-left:1rem !important;
`;
export const ImgCard = styled(Link)`
  width:48vw;
  height:48vw;
  max-width:250px;
  max-height: 250px;
  padding:1vw;
  background: url(${props => props.img ? props.img : null}) no-repeat center center, linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
  background-size: contain;
`;
export const SettingsLink = styled(Link)`
  top:0;
  right:0;
  margin:0.25em 0.5em;
  position: fixed;
  text-decoration: none;
  color:white;
`;