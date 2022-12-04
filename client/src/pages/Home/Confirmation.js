import styled from "styled-components";

const Confirmation = () => {
  return (
    <Wrapper>
      <Title>Your quest has been created!</Title>
      <Disclaimer>Be prepared! Fellow heroes will be on your way any time now.</Disclaimer>
      <Disclaimer>Please always respect community guidelines.</Disclaimer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 37vh;
  width: 100%;
  font-family: var(--font);
  color: var(--color-dark-grey);
  padding: 10px;
  border-radius: 15px;
  background-image: url("/assets/Pikachu_wallpaper.jpg");
  background-size: cover;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 50px 20px 15px;
`;
const Disclaimer = styled.p`
  font-size: 16px;
  margin: 30px 20px;
  width: 50%;
`;
export default Confirmation;
