import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const QuestList = ({ quests, setSelectedQuest, setOpenQuest}) => {
  return (
    <>
      {!quests ? (
        <Loading color="#3d7dca" />
      ) : (
        quests.filter((item) => !item.completed)
        .map((quest) => {
          return (
            <QuestWrapper key={quest._id} onClick={() => {setSelectedQuest(quest._id); setOpenQuest(true)}}>
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
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;
const Loading = styled(BeatLoader)`
  align-self: center;
`;
const Desc = styled.div`
  align-self: center;
  font-size: 14px;
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
  height: 80px;
  width: 80px;
  font-size: 14px;
  text-align: center;
  line-height: 80px;
  color: var(--color-grey);


`;
export default QuestList;
