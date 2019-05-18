import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js"
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';

const load = keyframes`
  0% {
   margin-left:120%
  }
  100% {
    margin-left:0;
  }
`;
export const Wrapper = styled(Grid)`
  top:0;
  left:0;
  z-index:10;
  width:100%;
  padding:1em;
  position: fixed;
  display:flex;
  flex-direction: column;
  align-items: center;
  background: white;
  height:100%;
  box-sizing: border-box; 
  animation-timing-function: cubic-bezier(.7,.34,.52,.98);
  animation: ${load} .5s;
`;
export const Header = styled.h1`
  font-weight: 300;
  color:#222222;
  text-align: center;
  margin:0.25em 0;
  
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
export const StyledFormControl = styled(FormControl)`
   width:100%;
   box-sizing: border-box;
   margin-left:5%;
`;
export const Text = styled.p`
  font-weight: 300;
  line-height: 1.6;
  font-size: 1.2em;
  text-align: left;
  width: 100%;
`;
export const SubmitKnute = styled.a`
  cursor: pointer;
  width:calc(100% - 0.5em);
  height:2em;
  background:${props => props.red ? Color.red : Color.blue};
  border-radius:5px;
  text-decoration: none;
  color:white;
  line-height: 2em;
  font-size: 1.7em;
  padding-left:0.5em;
  font-weight: 300;
`;