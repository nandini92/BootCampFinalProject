import styled from "styled-components";
import pikachu from "../assets/images/Pikachu.PNG";

const Error = () => {
    return (
    <Wrapper>
        <Body>
        <Image src={pikachu} />
        <Text>404</Text>
        <Text>OOPS... WE COULDN'T FIND THE PAGE YOU WERE LOOKING FOR.</Text>
        </Body>
    </Wrapper>)
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: var(--color-yellow);
    display: flex;
    justify-content: center;
`;
const Body = styled.div`
    width: 35%;
    position: absolute;
    top: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Image = styled.img`
    width: 400px;
    align-self: center;
`;
const Text = styled.p`
    color: var(--color-dark-grey);
    font-size: 28px;
    text-align: center;
    margin: 10px;
`;
export default Error;