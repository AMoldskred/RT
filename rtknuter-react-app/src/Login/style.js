import styled, {keyframes} from "styled-components";
export const Wrapper = styled.div`
  max-width: 1000px;
  position: absolute;
  background: white;
  height:calc(100% - 56px);
  width:100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 600% 600%;
  background-position: 100% 600%;
  & > p {
    text-align: center;
    width:80%;
    color:#f32c1e;
    font-size: x-large;
    font-weight: 100;
    letter-spacing: 1.6px;
    margin-bottom:10%;
    margin-top:0;
  }
`;
export const Title = styled.svg`
  width:95%;
  & > g > * {
    fill: #f32c1e;
  }
`;

export const InstagramLogin = styled.a`
  background:  #f32c1e;
  border: 2px solid #f32c1e;
  border-radius:10px;
  display:${props => props.ready ? 'flex' :'none'};
  padding:16px 0;
  justify-content: center;
  color:${props => props.ready ? 'white':'#f32c1e'};
  width:90%;
  text-decoration: none;
  letter-spacing:1.2px;
  font-size:1.4rem;
  cursor:pointer;
  margin-top:auto;
  margin-bottom: 5%;
  & > span {
    margin-left:5px;
    font-weight:500;
  }
`;
export const onboard = keyframes`
  0%,100%{transform: translateY(0px)}
  50%{transform: translateY(10px)}
`;
export const Styledsvg = styled.svg`
  height:25%;
  width:auto;
  margin-top:15%;
  animation: ${onboard} 5s ease-out infinite;
  & > .st0{
    fill:transparent;
  }
  & > .st1{
    fill:#222222;
  }
`;
