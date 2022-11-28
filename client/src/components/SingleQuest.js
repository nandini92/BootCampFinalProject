import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { AdvancedImage } from "@cloudinary/react";
import styled from "styled-components";

import { UsersContext } from "../contexts/UsersContext";

const SingleQuest = ({ selectedQuest }) => {
  const { cld, user } = useContext(UserContext);
  const [quest, setQuest] = useState();
  const [owner, setOwner] = useState();
  const [participants, setParticipants] = useState();
  const [ownerAvatar, setOwnerAvatar] = useState();
  const {
    actions: { getOtherUser },
  } = useContext(UsersContext);

  // Fetch quest details from database
  useEffect(() => {
    fetch(`/quest/${selectedQuest}`)
      .then((res) => res.json())
      .then((data) => {
        setQuest(data.data);
        setParticipants(data.data.participants);
        getOtherUser(data.data.ownerId).then((res) => setOwner(res));
      });
  }, [selectedQuest]);

  // Set quest owner's avatar
  useEffect(() => {
    owner && setOwnerAvatar(cld.image(owner.avatar));
  }, [owner]);

  // Add user to quest 
  const addQuestParticipants = (id) => {
    fetch(`/quest/${selectedQuest}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant: user._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setParticipants(participants => participants - 1 );
          return true;
        } else if (data.status === 404) {
          return false;
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {!quest ? (
        <h1>Loading</h1>
      ) : (
        <QuestWrapper key={quest._id}>
          <AvatarWrapper className="front">
            {ownerAvatar && <Pokemon cldImg={ownerAvatar} />}
          </AvatarWrapper>
          <Desc>
            <Title>{quest.title}</Title>
            <p>
              <Label>Description:</Label> {quest.description}
            </p>
            <p>
              <Label>Slots available:</Label> {quest.participants}
            </p>
          </Desc>
          <Bottom>
              <Karma>{quest.karma}</Karma>
              <Button onClick={() => {addQuestParticipants(quest._id)}}>Sign Me Up!</Button>
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
const AvatarWrapper = styled.div`
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
