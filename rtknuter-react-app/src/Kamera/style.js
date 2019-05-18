import styled, {keyframes} from "styled-components";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Camera  from 'react-html5-camera-photo';
const load = keyframes`
  0% {
   margin-left:120%
  }
  100% {
    margin-left:0;
  }
`
export const Wrapper = styled(Grid)`
  top:0;
  z-index:10;
  width:100%;
  max-width:1000px !important;
  margin:0 auto;
  position: fixed;
  background:black;
  height:100vh;
  padding: 0;
  box-sizing: border-box; 
  animation-timing-function: cubic-bezier(.7,.34,.52,.98);
  animation: ${load} .5s;
`;
export const Back = styled(Link)`
  position:absolute;
  z-index:2;
  top:0;
  width:auto;
  margin:1rem;
  color:white;
  font-size:2rem;
  left:0;
  text-decoration: none;
`;
export const Angle = styled.div`
  background:transparent;
  border:0;
  cursor:pointer;
  position:absolute;
  z-index:2;
  top:0;
  width:auto;
  margin:1rem;
  color:white;
  font-size:2rem;
  right:0;
  text-decoration: none;
`;
export const StyledCamera = styled(Camera)`
    transform:  ${props => props.flip ? 'translateX(calc((100% - 100vw) / 2)) rotateY(180deg)' : 'translateX(calc((100% - 100vw) / 2)) rotateY(0deg)'}!Important;
    
`;