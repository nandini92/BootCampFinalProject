import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import { FiFrown } from "react-icons/fi";
import Tippy from "@tippyjs/react";

import { UsersContext } from "../contexts/UsersContext";
import { UserContext } from "../contexts/UserContext";

import QuestAdmin from "./QuestAdmin";
import QuestList from "./QuestList";
import UserRatings from "./UserRatings";
import ReportUser from "./ReportUser";

const Profile = () => {
  const userId = useParams().id;
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const [quests, setQuests] = useState();
  const [ratings, setRatings] = useState();
  const [open, setOpen] = useState(false);
  const [ratingsSent, setRatingsSent] = useState(false);
  const { loggedIn } = useContext(UserContext);
  const {
    actions: { getOtherUser, getUsersAvatar, getUsersQuests },
  } = useContext(UsersContext);
  const navigate = useNavigate();

  // Logged in user should be redirected to MyProfile
  useEffect(() => {
    if(loggedIn){
      loggedIn._id === userId && navigate('/my-profile');
    }
  }, [loggedIn, userId])

  // Get User info based on user id.
  useEffect(() => {
    getOtherUser(userId).then((data) => {
      setUser(data);
      setAvatar(getUsersAvatar(data));
    });

    // Get User quests based on user id.
    getUsersQuests(userId).then((data) => setQuests(data));
  }, [userId]);

  // Submit user ratings to  database
  const handleSubmit = (e) => {
    // TO DO: VAlidate that all categories are filled
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
  };

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
                <p>
                  {avatar.publicID.split("/")[2].split("_")[0].toUpperCase()}{" "}
                </p>
                <p>LEVEL {user.level}</p>
              </Info>
              <Outer>
                <Feedback onSubmit={(e) => handleSubmit(e)}>
                  <UserRatings
                    category="charisma"
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings?.charisma}
                  />
                  <UserRatings
                    category="intelligence"
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings?.intelligence}
                  />
                  <UserRatings
                    category="wisdom"
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings?.wisdom}
                  />
                  <UserRatings
                    category="dexterity"
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings?.dexterity}
                  />
                  <UserRatings
                    category="strength"
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings?.strength}
                  />
                  <Ratings>
                    {ratingsSent && <p>You've successfully rated this user!</p>}
                    <SubmitDiv>
                      <Button type="submit">Submit</Button>
                    </SubmitDiv>
                  </Ratings>
                </Feedback>
                <Tippy content={<p>Report User</p>}>
                  <IconWrap onClick={() => setOpen(true)}>
                    <Report />
                  </IconWrap>
                </Tippy>
              </Outer>
            </UserDetails>
            <Panels>
              <Panel>
                {quests?.questsOwned?.length > 0 ? (
                  <>
                    <SubTitle>Quests {user.handler} owns</SubTitle>
                    <MyQuests>
                      <Scroll>
                        <QuestAdmin quests={quests.questsOwned} />
                      </Scroll>
                    </MyQuests>
                  </>
                ) : (
                  <SubTitle>
                    {user.handler} has not created any quests!
                  </SubTitle>
                )}
              </Panel>
              <Panel>
                {quests?.questsOn?.length > 0 ? (
                  <>
                    <SubTitle>Quests {user.handler} is on</SubTitle>
                    <MyQuests>
                      <Scroll>
                        <QuestList
                          quests={quests.questsOn}
                          setSelectedQuest={null}
                        />
                      </Scroll>
                    </MyQuests>
                  </>
                ) : (
                  <SubTitle>
                    {user.handler} is not on any quests currently!
                  </SubTitle>
                )}
              </Panel>
            </Panels>
            <ReportUser open={open} setOpen={setOpen} id={user._id} />
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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font);
  background: linear-gradient(120deg, white, var(--color-blue));
`;
const Body = styled.div`
  position: absolute;
  min-width: 1137px;
  top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;
const UserDetails = styled.div`
  align-self: center;
  display: flex;
  width: 50%;
  min-width: 700px;
  height: 50%;
  justify-content: space-evenly;
  border-radius: 15px;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 8px var(--color-blue);
`;
const Info = styled.div`
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
const Outer = styled.div`
  display: flex;
  flex-direction: row;
`
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
  max-width: 750px;
  margin: 50px;
`;
const MyQuests = styled.div`
  width: 100%;
  max-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  margin: 20px;
  box-shadow: 0px 0px 8px var(--color-blue);
  background-color: var(--color-grey);
`;
const Scroll = styled.div`
  padding: 10px;
  margin: 10px;
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px var(--color-grey); 
}
 
::-webkit-scrollbar-thumb {
  background: var(--color-blue); 
}
`;
const Ratings = styled.div`
  display: flex;
  flex-direction: row;

  p {
    font-size: 16px;
    align-self: center;
    color: var(--color-purple);
  }
`;

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
  margin: 5px 0px;
`;
const IconWrap = styled.div`
`;
const Report = styled(FiFrown)`
  align-self: flex-start;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
  background-color: var(--color-red);
  box-shadow: 0px 0px 3px var(--color-dark-grey);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
export default Profile;
