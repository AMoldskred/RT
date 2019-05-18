import styled, {keyframes} from "styled-components";
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button"
import {red, blue} from "colors";
export const flip = keyframes`
  0%,100%{transform: rotateX(0deg)}
  50%{transform: rotateX(560deg)}
`;
export const Wrapper = styled.div`
  top:0;
  z-index:100;
  width:100vw;
  max-width:1000px !important;
  margin:0 auto;
  position: fixed;
  background:black;
  display:flex;
  justify-content: center;
  align-items:center;
  height:100vh;
  padding: 0;
  box-sizing: border-box; 
  & > img {
  position:absolute;
    max-width:100vw;
    max-height:100vh;
  }
`;
export const SFab = styled(Fab)`
  position:fixed !important;
  bottom:0;
  right:0;
  background:${red};
  transition:all .3s ease;
  animation: ${props => props.loading ? flip : "none"} 3s ease infinite;
  transform: scale(${props => props.open ? 1 : 0});
  & > * {color:white;}
  margin:1em !important;
  z-index:9999;
`;
export const SButton = styled(Button)`
  background:${blue};
  padding: 1em 2em;
  letter-spacing: 1.6;
  & > * > input {display:none;}
  & > * {color:white;}
`;