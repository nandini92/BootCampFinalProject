import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import QuestAdmin from "./QuestAdmin";

const MyProfile = () => {
  // TO FIX: When navigating directly to profile. User context is undefined. Why?
  const { user, userQuests, userAvatar } = useContext(UserContext);

  if (user && userAvatar) {
    return (
      <>
      <Wrapper>
        <div>
        <Title>Hi {user.firstName} !</Title>
        <UserDetails>
          {userAvatar && (
            <AvatarWrapper className="front">
              <Pokemon cldImg={userAvatar} />
            </AvatarWrapper>
          )}
          <Info>
            <p>
              Your{" "}
              {userAvatar.publicID.split("/")[2].split("_")[0].toUpperCase()} is
              at level {user.level}. You are 33 tasks away from the next level!
            </p>
            <p>Charisma: </p>
            <p>Intelligence: </p>
            <p>Wisdom: </p>
            <p>Dexterity: </p>
            <p>Strength: </p>
          </Info>
        </UserDetails>
        </div>
        <MyQuests>
            {userQuests && <QuestAdmin quests={userQuests}/>}
        </MyQuests>
      </Wrapper>
      </>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 200px;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  align-self: flex-start;
  padding-bottom: 40px;
  width: 25%;
`;
const UserDetails = styled.div`
  display: flex;
  width: 75%;
  margin-left: 50px;
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
  height: 180px;
  width: 180px;
`;
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 17px;
  left: 25px;
  height: 120px;
  width: 120px;
`;
const Info = styled.div`
  width: 70%;
  color: var(--color-dark-grey);
  font-size: 22px;
  margin: 35px;
`;
const MyQuests = styled.div`
  margin: 50px 150px 0px 0px;
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 35%;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 2px 5px 10px var(--color-purple);
  max-height: 50%;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default MyProfile;
