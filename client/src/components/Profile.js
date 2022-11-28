import { useContext } from "react";
import { UsersContext } from "../contexts/UserContext";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import QuestAdmin from "./QuestAdmin";

const Profile = ({id}) => {
  const { users } = useContext(UsersContext);

  if (users) {
    return (
      <Wrapper>
        <Title>Hi {users.firstName} !</Title>
        <UserDetails>
          {/* {userAvatar && (
            <AvatarWrapper className="front">
              <Pokemon cldImg={userAvatar} />
            </AvatarWrapper>
          )} */}
          <Info>
          </Info>
        </UserDetails>
        <MyQuests>
        </MyQuests>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  align-self: flex-start;
  padding-bottom: 40px;
  width: 50%;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  width: 60%;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 2px 5px 10px var(--color-purple);
`;
const AvatarWrapper = styled.div`
  margin: 30px;
  border: 5px solid var(--color-grey);
  border-radius: 50%;
  background-color: var(--color-red);
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 200px;
  width: 200px;
`;
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 17px;
  left: 30px;
  height: 130px;
  width: 130px;
`;
const Info = styled.div`
  width: 70%;
  color: var(--color-dark-grey);
  font-size: 22px;
  margin: 35px;
`;
const MyQuests = styled.div`
  margin-top: 50px;
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 55%;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 2px 5px 10px var(--color-purple);
  max-height: 50%;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default Profile;
