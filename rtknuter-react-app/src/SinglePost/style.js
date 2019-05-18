import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import  {Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = styled(CircularProgress)`
  display: block !important;
  margin: auto;
`;
export const Wrapper = styled.div`
  width:100%;
  min-height:calc(100% - 56px);
  flex-direction: column;
  overflow-y: scroll;
`;
export const SCard = styled(Card)`
  width:95%;
  margin:2.5%;
  & > img {
  width:95%;
  margin:2.5%;
  }
`;
export const StyledAvatar = styled(Avatar)`
  margin:2%;
`;
export const SLink = styled(Link)`
  width:100%;
  text-decoration: none;
  color:black;
`;