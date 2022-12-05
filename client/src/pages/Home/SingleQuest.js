import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

import { UserContext } from "../../contexts/UserContext";
import { UsersContext } from "../../contexts/UsersContext";
import { QuestsContext } from "../../contexts/QuestsContext";

const SingleQuest = ({ selectedQuest }) => {
  const { cld, loggedIn } = useContext(UserContext);
  const {
    users,
    actions: { getOtherUser },
  } = useContext(UsersContext);
  const {
    actions: { addQuestParticipants },
  } = useContext(QuestsContext);

  const [quest, setQuest] = useState();
  const [owner, setOwner] = useState();
  const [ownerAvatar, setOwnerAvatar] = useState();
  const [success, setSuccess] = useState(false);

  // Fetch selected quest details from database
  useEffect(() => {
    fetch(`/quest/${selectedQuest}`)
      .then((res) => res.json())
      .then((data) => {
        setQuest(data.data);
        getOtherUser(data.data.ownerId).then((res) => setOwner(res));
      });
  }, [selectedQuest, success]);

  // Set quest owner's avatar
  useEffect(() => {
    owner && setOwnerAvatar(cld.image(owner.avatar));
  }, [owner]);

  return (
    <QuestWrapper>
      {(!quest && !owner) ? (
        <Loading color="#3d7dca" />
      ) : (
        <>
          <AvatarWrapper to={`/profile/${quest.ownerId}`}>
            {ownerAvatar && <Pokemon cldImg={ownerAvatar} />}
          </AvatarWrapper>
          <Desc>
            <Title>{owner?.handler} invites you to {quest.title}</Title>
            <p>
              <Label>Description:</Label> {quest.description}
            </p>
            <p>
              <Label>Address:</Label> {quest.address}
            </p>
            {quest.participants !== 0 && (
              <p>
                <Label>Slots available:</Label> {quest.participants}
              </p>
            )}
            {quest?.participantIds && (
              <Heroes>
                <Label> Heroes on this quest </Label>
                {quest.participantIds &&
                  quest.participantIds.map((id) => {
                    const userInfo = users.filter((otherUser) => {
                      return otherUser._id === id && otherUser;
                    });
                    return (userInfo && <Hero key={id} to={`/profile/${id}`}>{userInfo[0]?.handler}</Hero>);
                  })}
              </Heroes>
            )}
          </Desc>
          <Bottom>
            <Karma>{quest.karma}</Karma>
            {quest.participants > 0 &&
              loggedIn._id !== quest.ownerId &&
              !quest?.participantIds?.includes(loggedIn._id)
              && (
                <Button
                  onClick={() => {
                    // Trigger fetch to pull quest updates from database
                    setSuccess(
                      // Trigger post to add user to participant list on quest 
                      addQuestParticipants(
                        selectedQuest,
                        loggedIn._id,
                        quest.participants - 1
                      )
                    );
                  }}
                >
                  Sign Me Up!
                </Button>
              )}
          </Bottom>
        </>
      )}
    </QuestWrapper>
  );
};

const QuestWrapper = styled.div`
  width: 95%;
  height: 100%;
  margin: 15px;
  font-family: var(--font);
  color: var(--color-dark-grey);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const Loading = styled(BeatLoader)`
  align-self: center;
`;
const AvatarWrapper = styled(Link)`
  align-self: center;
  border-radius: 50%;
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  height: 150px;
  width: 150px;
`;
const Pokemon = styled(AdvancedImage)`
  position: relative;
  top: 15px;
  left: 30px;
  height: 100px;
  width: 100px;
`;
const Desc = styled.div`
  align-self: center;
  text-align: center;

  p {
    margin-bottom: 15px;
  }
`;
const Title = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0px 15px 0px;
`;
const Label = styled.span`
  font-weight: 500;
  margin-bottom: 20px;
`;
const Heroes = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Hero = styled(Link)`
    color: white;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    background-color: var(--color-purple);
    text-decoration: none;
`;
const Karma = styled.div`
  align-self: flex-end;
  margin: 15px;
  border-radius: 15px;
  background-color: var(--color-blue);
  height: 80px;
  width: 80px;
  text-align: center;
  line-height: 80px;
  color: var(--color-grey);
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.button`
  height: 50px;
  align-self: center;
  margin: 0px 15px;

  &:hover {
    cursor: pointer;
  }
`;
export default SingleQuest;
