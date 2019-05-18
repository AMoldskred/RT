import styled,{keyframes} from "styled-components";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import * as Color from "./colors.js";

export const fadeIn = keyframes`
  from{opacity:0}
  to{opacity:1}
`;
export const StyledBottomNavigation = styled(BottomNavigation)`
    position:fixed;
    bottom:0;
    width:100%;
    max-width:1000px !important;
    margin-left:auto;
    margin-right:auto;
    & > * {
        color:${Color.blue} !important;
        min-width: auto !important;
    }
`;
export const Wrapper = styled.div`
   display:flex;
   height:calc(100% - 56px);
   width:100%;
   max-width:1000px;
   margin-left:auto;
   margin-right:auto;
   & > ${StyledBottomNavigation} {
    max-width: initial;
   }
   animation: ${fadeIn} .3s ease;
`;
