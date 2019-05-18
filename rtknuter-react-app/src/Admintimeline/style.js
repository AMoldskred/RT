import styled, {keyframes} from "styled-components";
import * as Color from "../colors.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import {Link} from "react-router-dom";

export const grow = keyframes `
  from{filter:blur(5px)}
  to{filter:blur(0px)}
`;
export const Wrapper = styled.div`
  width:100%;
  min-height:calc(100% - 56px);
  flex-direction: column;
  overflow: hidden;
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
export const StyledTabs = styled(Tabs)`
  color:${Color.singleblue};
  width:100%;
  & > div > div > span{
    background:${Color.singleblue};
    width:50%;
    max-width: none;
  }
  & > div >div> div > button{
    flex-grow:1;
    max-width: none;
  }
  
`;
export const Feed = styled.div`
  height:calc(100% - 56px);
  padding-top:1rem;
  margin-bottom: 56px;
  width:100%;
  flex-grow: 1;
  display: flex;
  overflow-y: hidden;
  justify-content: center;
  flex-direction: column;
  & > div{overflow-y: scroll}
`;
export const StyledAvatar = styled(Avatar)`
  margin:2%;
`;
export const SCard = styled(Card)`
  width:95%;
  margin:2.5%;
`;
export const PostImg = styled.img`
  width:95%;
  margin:2.5%;
  transform-origin: top center;
  animation: ${grow} .3s ease;
  background-color: #eec0c6;
  background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%);
  padding-bottom:0;
  
`;
export const SLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
