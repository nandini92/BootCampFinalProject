import { useContext } from "react";
import styled from "styled-components";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";

import { UsersContext } from "../contexts/UsersContext";
import  { QuestsContext } from "../contexts/QuestsContext";

// TO DO: REFRESH QUEST LIST ON DELETE
const QuestAdmin = ({quests}) => {
  const { users } = useContext(UsersContext);
  const { actions:{completeQuest, deleteQuest} } = useContext(QuestsContext);

  return (
    <>
      {!quests ? (
        <h1>Loading</h1>
      ) : (
        quests
        .filter((item) => !item.completed)
        .map((quest) => {
          return (
            <QuestWrapper key={quest._id}>
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
              <Karma><p>{quest.karma}</p></Karma>
              {!quest.participantIds
                ?<Delete onClick={() => deleteQuest(quest._id)}/>
                :<Complete onClick={() => completeQuest(quest._id)}/>
              }
            </QuestWrapper>
          );
        })
      )}
    </>
  );
};

const QuestWrapper = styled.div`
  min-width: 90%;
  margin: 20px;
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 10px var(--color-purple);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  p {
    margin: 5px 0px;
  }
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
  font-weight: 500;
`;
const Karma = styled.div`
  border-radius: 15px;
  background-color: var(--color-blue);
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 80px;
  width: 80px;
  text-align: center;
  line-height: 80px;
  color: var(--color-grey);
`;
const Delete = styled(FiXCircle)`
  border-radius: 5px;
  padding: 5px;
  margin:20px;
  background-color: var(--color-red);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
const Complete = styled(FiCheckCircle)`
  border-radius: 5px;
  padding: 5px;
  margin:20px;
  background-color: var(--color-green);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
export default QuestAdmin;
