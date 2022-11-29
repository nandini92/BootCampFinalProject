import { useContext } from "react";
import styled from "styled-components";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";

import { UserContext } from "../contexts/UserContext";
import { UsersContext } from "../contexts/UsersContext";
import { QuestsContext } from "../contexts/QuestsContext";

// TO DO: REFRESH QUEST LIST ON DELETE
const QuestAdmin = ({ quests }) => {
  const { user } = useContext(UserContext);
  const { users } = useContext(UsersContext);
  const {
    actions: { completeQuest, deleteQuest },
  } = useContext(QuestsContext);

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
                <div>
                  <Title>{quest.title}</Title>
                  <p>
                    <Label>Description:</Label> {quest.description}
                  </p>
                  {quest.participants !== 0 && (
                    <p>
                      <Label>Slots available:</Label> {quest.participants}
                    </p>
                  )}
                  {quest?.participantIds && (
                    <>
                      {quest.participantIds &&
                        quest.participantIds.map((id) => {
                          const userInfo = users.filter((otherUser) => {
                            return otherUser._id === id && otherUser;
                          });
                          return <Hero key={id}>{userInfo[0].handler}</Hero>;
                        })}
                    </>
                  )}
                </div>
                <End>
                <Karma>
                  <p>{quest.karma}</p>
                </Karma>
                {user._id == quest.ownerId && (
                  <>
                    {!quest.participantIds ? (
                      <Delete onClick={() => deleteQuest(quest._id)} />
                    ) : (
                      <Complete onClick={() => completeQuest(quest._id)} />
                    )}
                  </>
                )}
                </End>
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
  padding: 15px;
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
const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font);
  margin-bottom: 8px;
`;
const Label = styled.span`
  font-weight: 500;
`;
const Hero = styled.button`
  font-size: 18px;
`
const End = styled.div`
  display: flex;
`
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
  justify-self: flex-start;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
  background-color: var(--color-red);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
const Complete = styled(FiCheckCircle)`
  justify-self: flex-start;
  border-radius: 5px;
  padding: 5px;
  margin-left: 15px;
  background-color: var(--color-green);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;
export default QuestAdmin;
