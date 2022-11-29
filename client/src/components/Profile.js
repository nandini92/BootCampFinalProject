import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";

import { UsersContext } from "../contexts/UsersContext";

import QuestAdmin from "./QuestAdmin";
import QuestList from "./QuestList";
import UserRatings from "./UserRatings";

const Profile = () => {
  // TO FIX: When navigating directly to profile. User context is undefined. Why?
  const userId = useParams().id;
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const [quests, setQuests] = useState();
  const [ratings, setRatings] = useState();
  const { actions: {getOtherUser, getUsersAvatar, getUsersQuests}} = useContext(UsersContext);

  // Get User info based on user id.
  useEffect(() => {
    getOtherUser(userId)
    .then(data => {
      setUser(data);
      setAvatar(getUsersAvatar(data));
    })

    // Get User quests based on user id.
    getUsersQuests(userId)
    .then(data => setQuests(data));
  }, [userId])

  // Submit user ratings to  database
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/user/${user._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ratings }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          throw new Error(data.message);
        } 
      })
      .catch((error) => window.alert(error));
  }


  if (user && avatar && quests) {
    return (
      <>
        <Wrapper>
            <Title>You are viewing {user.handler}'s profile !</Title>
          <Body>
            <UserDetails>
              {avatar && (
                <AvatarWrapper className="front">
                  <Pokemon cldImg={avatar} />
                </AvatarWrapper>
              )}
              <Feedback onSubmit={(e) => handleSubmit(e)}>
                <Info>
                  {" "}
                  {avatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}
                  is at level {user.level}
                </Info>
                <UserRatings category="charisma" ratings={ratings} setRatings={setRatings}/>
                <UserRatings category="intelligence" ratings={ratings} setRatings={setRatings}/>
                <UserRatings category="wisdom" ratings={ratings} setRatings={setRatings}/>
                <UserRatings category="dexterity" ratings={ratings} setRatings={setRatings}/>
                <UserRatings category="strength" ratings={ratings} setRatings={setRatings}/>
                <SubmitDiv><Button type="submit">Submit</Button></SubmitDiv>
              </Feedback>
            </UserDetails>
            <Panels>
            {quests.questsOwned && 
              <Panel>
                <SubTitle>Quests {user.handler} owns:</SubTitle>
                <MyQuests>
                  <QuestAdmin quests={quests.questsOwned} />
                </MyQuests>
              </Panel>
            }
            {quests.questsOn && (
              <Panel>
              <SubTitle>Quests {user.handler} is on:</SubTitle>
                <MyQuests>
                  <QuestList quests={quests.questsOn} setSelectedQuest={null} />
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
  justify-content: space-between;
  width: 90%;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  margin: 30px 0px 40px 0px;
`;
const SubTitle = styled.p`
  font-size: 26px;
  color: var(--color-dark-grey);
  margin-bottom: 25px;
  text-align: left;
`;
const Info = styled.p`
  margin-bottom: 40px;
  text-align: center;
`
const SubmitDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  margin: 15px 0px;
`
const UserDetails = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  border-radius: 15px;
  background-color: var(--color-grey);
  box-shadow: 2px 5px 10px var(--color-purple);
`;
const AvatarWrapper = styled.div`
  margin: 100px 30px;
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
const Feedback = styled.form`
  width: 50%;
  color: var(--color-dark-grey);
  font-size: 22px;
  margin: 35px 35px 35px 0px;
`;
const Panels = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Panel = styled.div`
  width: 90%;
`
const MyQuests = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 30vh;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 2px 5px 10px var(--color-purple);
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export default Profile;

