import styled from "styled-components";

const Welcome = () => {
    return (
    <Wrapper>
        <h2>Welcome to Quest!</h2>
        <p>Explore your neighborhood to make new friends and build new experiences together all while training your little pal in various activities.</p>
        <p>Sign In to embark on a quest with your Pokémon companion. </p>
    </Wrapper>)
}

const Wrapper = styled.div`
  max-width: 450px;
  margin: 20px;
  font-family: var(--font);
  color: var(--color-dark-grey);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2{
    color: var(--color-dark-grey);
  }

  p{
    margin: 10px;
    line-height: 19px;
    text-align: center;
  }
`;
export default Welcome;