import styled from "styled-components";

const QuestList = ({ quests, setSelectedQuest}) => {
  return (
    <>
      {!quests ? (
        <h1>Loading</h1>
      ) : (
        quests.filter((item) => !item.completed)
        .map((quest) => {
          return (
            <QuestWrapper key={quest._id} onClick={() => setSelectedQuest(quest._id)}>
              <Desc>
                <Title>{quest.title}</Title>
                <p>
                  <Label>Slots available:</Label> {quest.participants}
                </p>
              </Desc>
              <Karma><p>{quest.karma}</p></Karma>
            </QuestWrapper>
          );
        })
      )}
    </>
  );
};

const QuestWrapper = styled.div`
  width: 94%;
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
`;
const Desc = styled.div`
  align-self: center;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font);
  margin-bottom: 15px;
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
export default QuestList;
