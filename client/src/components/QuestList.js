import styled from "styled-components";

const QuestList = ({ quests }) => {
  return (
    <Wrapper>
      {!quests ? (
        <h1>Loading</h1>
      ) : (
        quests.map((quest) => {
          return (
            <QuestWrapper key={quest._id}>
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
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  width: 30%;
  height: 100%;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
  border-radius: 15px;
`;
const QuestWrapper = styled.div`
  width: 90%;
  margin: 20px;
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 10px var(--color-purple);
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
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
  background-color: var(--color-purple);
  box-shadow: 2px 5px 10px var(--color-purple);
  height: 80px;
  width: 80px;
  transition: transform 0.3s ease-in-out;
  text-align: center;
  line-height: 80px;
  color: var(--color-grey);

  &:hover {
    transform: scale(1.1);
  }
`;
export default QuestList;
