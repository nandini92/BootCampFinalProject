import { useContext, useState } from "react";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";

import { UserContext } from "../contexts/UserContext";

import QuestAdmin from "./QuestAdmin";
import QuestList from "./QuestList";
import UserRatings from "./UserRatings";

const MyProfile = () => {
  // TO FIX: When navigating directly to profile. User context is undefined. Why?
  const { user, userQuests, userAvatar } = useContext(UserContext);
  const [ratings, setRatings] = useState();

  if (user && userAvatar) {
    return (
      <>
        <Wrapper>
          <Body>
            <Title>Hi {user.handler} !</Title>
            <UserDetails>
              {userAvatar && (
                <AvatarWrapper className="front">
                  <Pokemon cldImg={userAvatar} />
                </AvatarWrapper>
              )}
              <Info>
                  Your{" "}
                  {userAvatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}
                  is at level {user.level}. You are 33 tasks away from the next
                  level!
              </Info>
            </UserDetails>
            <Panels>
            {userQuests.questsOwned && 
              <Panel>
                <SubTitle>Quests I own:</SubTitle>
                <MyQuests>
                  <QuestAdmin quests={userQuests.questsOwned} />
                </MyQuests>
              </Panel>
            }
            {userQuests.questsOn && (
              <Panel>
              <SubTitle>Quests I'm on:</SubTitle>
                <MyQuests>
                  <QuestList quests={userQuests.questsOn} setSelectedQuest={null} />
                </MyQuests>
              </Panel>
            )}
            </Panels>
          </Body>
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
  flex-direction: column;
  align-items: center;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  text-align: left;
  padding-bottom: 50px;
`;
const SubTitle = styled.p`
  font-size: 26px;
  color: var(--color-dark-grey);
  margin:40px 0px 30px 0px;
  text-align: left;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  width: 75%;
  justify-content: space-between;
  border-radius: 15px;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
`;
const AvatarWrapper = styled.div`
  margin: 30px;
  border: 5px solid var(--color-grey);
  border-radius: 50%;
  background-color: var(--color-frey);
  box-shadow: 0px 0px 10px var(--color-purple);
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
const Panels = styled.div`
  align-self: flex-start;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Panel = styled.div`
  width: 45%;
`
const MyQuests = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 30vh;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-purple);
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default MyProfile;
