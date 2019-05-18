import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
const load = keyframes`
  0% {
   margin-left:120%
  }
  100% {
    margin-left:0;
  }
`

export const Wrapper = styled(Grid)`
  width:100%;
  max-width:1000px !important;
  margin: 0 auto;
  height:calc(100% - 56px);
  padding: 0;
  z-index: 900;
  position:fixed;
  box-sizing: border-box; 
  animation-timing-function: cubic-bezier(.7,.34,.52,.98);
  animation: ${load} .5s;
`;
export const Top = styled(Grid)`
  min-height:40%;
  background: ${props => props.lokal ? Color.red : Color.blue};
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  flex-direction: column;
  display: flex;
`;
export const Title = styled.h1`
  margin:0;
  display:block;
  font-weight:500;
  color: white;
  letter-spacing: 2px;
  text-shadow:0 0 1px transparent;
`;
export const Bottom = styled(Grid)`
  min-height:calc(60% - 1rem);
  padding-top:1rem;
  padding-left:1rem;
  padding-right:1rem;
  overflow-y: auto;
  background: white;
  text-align: left;
  display: flex;
  flex-direction: column;
`;
export const SubTitle = styled.h2`
  margin:0;
  font-weight:500;
  color: ${Color.black};
  letter-spacing: 2px;
  text-shadow:0 0 1px transparent;
`;
export const Task = styled.h2`
  padding:.5rem;
  margin:0;
  font-weight:500;
  color: ${Color.singlered};
  letter-spacing: 2px;
  text-overflow: ellipsis;
  text-shadow:0 0 1px transparent;
`;
export const Back = styled(Link)`
  position:fixed;
  z-index:2;
  top:0;
  margin:1rem;
  color:white;
  font-size:2rem;
  left:0;
  text-decoration: none;
`;
export const Return = styled.div`
  position:fixed;
  z-index:2;
  top:0;
  margin:1rem;
  color:white;
  font-size:2rem;
  left:0;
  text-decoration: none;
`;
export const Action = styled(Fab)`
  background:${Color.red};
  color:white !important;
  margin-top:auto !important;
  align-self: flex-end;
  margin-bottom: 1rem !important;
`;