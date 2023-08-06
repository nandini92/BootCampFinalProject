import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdvancedImage } from "@cloudinary/react";
import { FiFrown } from "react-icons/fi";
import Tippy from "@tippyjs/react";

import { UsersContext } from "../../contexts/UsersContext";
import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";

import QuestAdmin from "../../components/QuestAdmin";
import QuestList from "../../components/QuestList";
import UserRatings from "../../components/UserRatings";
import ReportUser from "./ReportUser";

const Profile = () => {
  const { URL } = useContext(AuthContext);
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

  // Logged in user should be redirected to MyProfile if they try to access this component
  useEffect(() => {
    if(loggedIn){
      loggedIn._id === userId && navigate('/my-profile');
    }
  }, [loggedIn, userId])

  // Get user info based on user id
  useEffect(() => {
    getOtherUser(userId).then((data) => {
      setUser(data);
      setAvatar(getUsersAvatar(data));
    });

    // Get user quests based on user id
    getUsersQuests(userId).then((data) => setQuests(data));
  }, [userId]);

  // Submit user ratings to database
  const handleSubmit = (e) => {
    // TO DO: VAlidate that all categories are filled. Incomplete review should not be accepted.
    e.preventDefault();
    fetch(`${URL}/user/${user._id}`, {
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
        <Wrapper>
          <Body>
            <UserDetails>
              <Info>
                <Tippy content={<p>Report User</p>}>
                  {/* Module for a form to report user if they breach community guidelines */}
                  <div onClick={() => setOpen(true)}>
                    <Report />
                  </div>
                </Tippy>
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
                {/* Form to provide ratings on user based on various characteristics. These are DnD based; should find a set more suitable to Pokemon */}
                <Feedback onSubmit={(e) => handleSubmit(e)}>
                  <UserRatings
                    ratings={ratings}
                    setRatings={setRatings}
                    currentRatings={user.ratings}
                  />
                  <Ratings>
                    {ratingsSent && <p>You've successfully rated this user!</p>}
                    <SubmitDiv>
                      <Button type="submit">Submit</Button>
                    </SubmitDiv>
                  </Ratings>
                </Feedback>
              </Info>
            </UserDetails>
            <Panels>
              <Panel>
                {/* Display all quests user has created. Logged In user is only able to view these*/}
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
                {/* Display all quests user is on. Logged In user is only able to view these*/}
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
display: flex;
justify-content: space-between;
align-items: center;
width: 90%;
height: 100%;
`;
const UserDetails = styled.div`
align-self: center;
display: flex;
min-width: 20%;
justify-content: space-evenly;
border-radius: 15px;
box-shadow: 0px 0px 10px var(--color-blue);
background-color: var(--color-grey);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  margin-top: 20px;
  max-height: 100%;
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
