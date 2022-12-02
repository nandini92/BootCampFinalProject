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
  const [ratingsSent, setRatingsSent] = useState(false);
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
        } else {
          setRatingsSent(true);
        }
      })
      .catch((error) => window.alert(error));
  }


  if (user && avatar && quests) {
    return (
      <>
        <Wrapper>
          <Body>
            <UserDetails>
            <Info>
            <Title>{user.handler}</Title>
              {avatar && (
                <AvatarWrapper>
                  <Pokemon cldImg={avatar} />
                </AvatarWrapper>
              )}
              <p>{avatar.publicID
                    .split("/")[2]
                    .split("_")[0]
                    .toUpperCase()}{" "}</p>
              <p>LEVEL {user.level}</p>
                </Info>
              <Feedback onSubmit={(e) => handleSubmit(e)}>
                <UserRatings category="charisma" ratings={ratings} setRatings={setRatings} currentRatings={user.ratings?.charisma}/>
                <UserRatings category="intelligence" ratings={ratings} setRatings={setRatings} currentRatings={user.ratings?.intelligence}/>
                <UserRatings category="wisdom" ratings={ratings} setRatings={setRatings} currentRatings={user.ratings?.wisdom}/>
                <UserRatings category="dexterity" ratings={ratings} setRatings={setRatings} currentRatings={user.ratings?.dexterity}/>
                <UserRatings category="strength" ratings={ratings} setRatings={setRatings} currentRatings={user.ratings?.strength}/>
                <Ratings>
                {ratingsSent && <p>You've successfully rated this user!</p>}
                <SubmitDiv><Button type="submit">Submit</Button></SubmitDiv>
                </Ratings>
              </Feedback>
            </UserDetails>
            <Panels>
            {quests.questsOwned && 
              <Panel>
                <SubTitle>Quests {user.handler} owns</SubTitle>
                <MyQuests>
                  <QuestAdmin quests={quests.questsOwned} />
                </MyQuests>
              </Panel>
            }
            {quests.questsOn && (
              <Panel>
              <SubTitle>Quests {user.handler} is on</SubTitle>
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

// FONTS
const Title = styled.h2`
font-size: 27px;
font-weight: 500;
color: var(--color-dark-grey);
margin-bottom: 15px;
`;
const SubTitle = styled.p`
text-align: center;
font-size: 26px;
color: var(--color-dark-grey);
`;

// DIVS
const Wrapper = styled.div`
position: absolute;
top: 200px;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
font-family: var(--font);
`;
const Body = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 90%;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  width: 50%;
  min-width: 650px;
  height: 50%;
  justify-content: space-evenly;
  border-radius: 15px;
  background: linear-gradient(120deg, white, var(--color-blue));
  box-shadow: 0px 0px 8px var(--color-blue);
`;
const Info = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-dark-grey);
  font-size: 22px;
  margin: 20px;

  p {
    text-align: center;
    margin: 3px;
  }
`
const AvatarWrapper = styled.div`
  align-self: center;
  margin: 20px 0px;
  border-radius: 50%;
  background-color: var(--color-grey);
  border: 5px solid var(--color-grey);
  box-shadow: 0px 0px 8px var(--color-blue);
  height: 180px;
  width: 180px;
`;
const Feedback = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
color: var(--color-dark-grey);
font-size: 22px;
margin: 20px;

p {
  text-align: center;
  margin: 3px;
}
`;
const SubmitDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Panels = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
`;
const Panel = styled.div`
  width: 100%;
  margin: 50px;
`;
const MyQuests = styled.div`
width: 100%;
max-height: 16vh;
display: flex;
flex-direction: column;
justify-content: space-between;
border-radius: 15px;
margin: 20px;
box-shadow: 0px 0px 8px var(--color-blue);
overflow: hidden;
overflow-y: scroll;
scroll-behavior: smooth;
`;
const MissingQuest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
   box-shadow: 0px 0px 5px var(--color-dark-grey);
  margin: 20px;
`;
const Ratings = styled.div`
  display: flex;
  flex-direction: row;

  p{
    font-size: 16px;
    align-self: center;
    color: var(--color-purple);
  }
`


// IMAGES
const Pokemon = styled(AdvancedImage)`
position: relative;
top: 17px;
left: 25px;
height: 120px;
width: 120px;
`;

// MISC
const Button = styled.button`
  margin: 15px 0px;
`
export default Profile;

