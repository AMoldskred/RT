import styled, {keyframes} from "styled-components";
import Grid from "@material-ui/core/Grid";
const load = keyframes`
  0% {
   opacity:0;
  }
  100% {
    opacity:1;
  }
`
export const Styledimg = styled.img`
  max-width:100vw;
  width:100%;
  height:auto;
`;
export const Wrapper = styled(Grid)`
  top:0;
  left:0;
  width:100%;
  z-index:15;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background:white;
  background-image: url(${props => props.bg});
  background-size:contain;
  background-repeat: no-repeat;
  height:100vh;
  padding: 0;
  box-sizing: border-box; 
  animation-timing-function: cubic-bezier(.7,.34,.52,.98);
  animation: ${load} .3s;
`;
export const Back = styled.div`
  cursor: pointer;
  position:fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:20;
  top:0;
  padding:.3rem;
  margin:1rem;
  color:white;
  font-size:2rem;
  left:0;
  text-decoration: none;
  background:rgba(0,0,0,0.7);
  border-radius: 50%;
`;
export const Bottom = styled.div`
  position: fixed;
  height:4rem;
  width:100%;
  z-index: 20;
  background: rgba(0,0,0,0.7);
  bottom:0;
  left:0;
  display: flex;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 1.8rem;
  color:white;
  margin-right:auto;
  margin-left:1rem;
  line-height: 1.6;
  font-weight: 300;
`;
export const PostContent = styled.a`
  color:white;
  font-size: 2rem !important;
  margin-right: 1rem;
`;
