import { useState, useEffect, useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import styled from "styled-components";

import { UsersContext } from "../contexts/UsersContext";

const SingleQuest = ({ selectedQuest }) => {
  const [quest, setQuest] = useState();
  const [owner, setOwner] = useState();
  const [ownerAvatar, setOwnerAvatar] = useState();
  const { actions: {getOtherUser }} = useContext(UsersContext);

  // Create a Cloudinary instance for avatar setup
  const cld = new Cloudinary({
    // TO DO: Replace with cred
    cloud: {
      cloudName: "daeu4xdvz",
    },
  });

  useEffect(() => {
    fetch(`/quest/${selectedQuest}`)
      .then((res) => res.json())
      .then((data) => {
        setQuest(data.data);
      });
  }, [selectedQuest]);

  useEffect(() => {
    quest &&
    getOtherUser(quest.ownerId)
    .then(res => setOwner(res));
  }, [quest]);

  useEffect(() => {
    owner && 
    setOwnerAvatar(cld.image(owner.avatar));
  }, [owner]);

  return (
    <Wrapper>
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
              <Label>Date/Time:</Label> {quest.schedule}
            </p>
            <p>
              <Label>Slots available:</Label> {quest.participants}
            </p>
          </Desc>
          <p>
            <Karma>{quest.karma}</Karma>
          </p>
        </QuestWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  min-width: 30%;
  height: 100%;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
  border-radius: 15px;
`;
const QuestWrapper = styled.div`
  width: 90%;
  margin: 20px;
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  padding: 10px;
  border-radius: 15px;
`;
const AvatarWrapper = styled.div`
  margin-top: 10px;
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
  height: 90px;
  width: 90px;
`;
const Desc = styled.div`
  align-self: center;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-family: var(--font);
  margin-bottom: 5px;
`;
const Label = styled.span`
  font-weight: bold;
`;
const Karma = styled.div`
  border-radius: 50%;
  background-color: var(--color-red);
  box-shadow: 2px 5px 10px var(--color-dark-grey);
  height: 80px;
  width: 80px;
  text-align: center;
  line-height: 80px;
  color: var(--color-grey);
`;

export default SingleQuest;
