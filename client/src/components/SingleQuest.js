import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import styled from "styled-components";

import { UserContext } from "../contexts/UserContext";
import { UsersContext } from "../contexts/UsersContext";
import { QuestsContext } from "../contexts/QuestsContext";

const SingleQuest = ({ selectedQuest }) => {
  const { cld, user } = useContext(UserContext);
  const { users,actions: { getOtherUser }} = useContext(UsersContext);
  const { actions:{addQuestParticipants}} =useContext(QuestsContext);

  const [quest, setQuest] = useState();
  const [owner, setOwner] = useState();
  const [ownerAvatar, setOwnerAvatar] = useState();
  const [success, setSuccess] = useState();

  // Fetch quest details from database
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
    <>
      {!quest ? (
        <h1>Loading</h1>
      ) : (
        <QuestWrapper key={quest._id}>
          <AvatarWrapper to={`/profile/${quest.ownerId}`}>
            {ownerAvatar && <Pokemon cldImg={ownerAvatar} />}
          </AvatarWrapper>
          <Desc>
            <Title>{quest.title}</Title>
            <p>
              <Label>Description:</Label> {quest.description}
            </p>
            {quest.participants !== 0 &&
            <p><Label>Slots available:</Label> {quest.participants}</p>
            }
            {quest?.participantIds &&
            <p><Label>Heroes on this quest</Label>
            {quest.participantIds && quest.participantIds.map((id) => {
              const userInfo = users.filter(otherUser => {
                return otherUser._id === id && otherUser;
              })
              return ( <p key={id}>{userInfo[0].handler}</p>)
            })}
            </p>
            }
          </Desc>
          <Bottom>
              <Karma>{quest.karma}</Karma>
              {quest.participants > 0 && 
              <Button 
              onClick={() => {
                setSuccess(addQuestParticipants(selectedQuest, user._id, (quest.participants - 1)));
                }}
                >Sign Me Up!
                </Button>
              }
          </Bottom>
        </QuestWrapper>
      )}
    </>
  );
};

const QuestWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 20px;
  font-family: var(--font);
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const AvatarWrapper = styled(NavLink)`
  align-self: center;
  margin: 20px 0px;
  border: 5px solid var(--color-grey);
  border-radius: 50%;
  background-color: var(--color-red);
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 150px;
  width: 150px;
  transition: transform 0.3s ease-in-out;
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

  p {
    margin-bottom: 15px;
  }
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0px 15px 0px;
`;
const Label = styled.span`
  font-weight: 500;
`;
const Karma = styled.div`
  align-self: flex-end;
  margin: 15px;
  border-radius: 15px;
  background-color: var(--color-blue);
  box-shadow: 2px 5px 10px var(--color-dark-grey);
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
`;
export default SingleQuest;
