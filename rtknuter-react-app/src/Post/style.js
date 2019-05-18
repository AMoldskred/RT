import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js"
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Fab from '@material-ui/core/Fab';

const load = keyframes`
  0% {
   margin-left:120%
  }
  100% {
    margin-left:0;
  }
`
export const Styledimg = styled.img`
  width:90%;
  margin:0 auto;
  max-width: 800px;
`;
export const Wrapper = styled(Grid)`
  top:0;
  left:0;
  z-index:10;
  width:100%;
  position: fixed;
  background:white;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height:100%;
  padding: 0;
  box-sizing: border-box; 
  animation-timing-function: cubic-bezier(.7,.34,.52,.98);
  animation: ${load} .5s;
`;
export const Back = styled(Link)`
  cursor: pointer;
  position:fixed;
  z-index:20;
  top:0;
  width:auto;
  margin:1rem;
  color:black;
  font-size:2rem;
  left:0;
  text-decoration: none;
`;
export const Title = styled.h1`
  color: black;
  margin-top:0;
  font-weight: 400;
  line-height: 1.5;
  font-size:3rem;
`;
export const StyledButton = styled(Fab)`
  position:absolute !important;
  z-index:22;
  bottom:0;
  right:0;
  margin-bottom:2em !important;;
  margin-right: 2em !important;;
  background: ${Color.red};
  color: white !important;
  
`;