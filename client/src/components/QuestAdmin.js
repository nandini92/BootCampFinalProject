import styled from "styled-components";
import { FiXCircle } from "react-icons/fi";

// TO DO: REFRESH QUEST LIST ON DELETE
const QuestAdmin = ({quests}) => {

  // Function to delete quest 
  const deleteQuest = (id) => {
    fetch(`/quest/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 500) {
          throw new Error(data.message);
        }
      })
    .catch((error) => window.alert(error));
  }


  return (
    <>
      {!quests ? (
        <h1>Loading</h1>
      ) : (
        quests.map((quest) => {
          return (
            <QuestWrapper key={quest._id}>
              <Desc>
                <Title>{quest.title}</Title>
                <p>
                  <Label>Slots available:</Label> {quest.participants}
                </p>
              </Desc>
              <Karma><p>{quest.karma}</p></Karma>
              <Delete onClick={() => deleteQuest(quest._id)}/>
            </QuestWrapper>
          );
        })
      )}
    </>
  );
};

const QuestWrapper = styled.div`
  width: 90%;
  margin: 20px;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
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
  font-weight: bold;
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
`
export default QuestAdmin;
