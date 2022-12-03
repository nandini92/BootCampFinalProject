import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const Loading = () => {
    return (<Wrapper><Loader color="#3d7dca" /></Wrapper>)
}

const Wrapper = styled.div`
    height: 99vh;
    width: 99vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Loader = styled(BeatLoader)`
  align-self: center;
`;
export default Loading;