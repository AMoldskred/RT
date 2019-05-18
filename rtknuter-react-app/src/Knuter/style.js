import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import * as Color from "../colors";

export const Wrapper = styled.div`
  width:100%;
  height:100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledTabs = styled(Tabs)`
  color:${Color.black};
  width:100%;
  position: fixed;
  z-index: 100;
  background: white;
  & > div > div > span{
    background:${Color.black};
    width:50%;
    max-width: none;
  }
  & > div >div> div > button{
    flex-grow:1;
    max-width: none;
  }
  & > div > .infinite-scroll-component {
    background:red;
  }
`;
