import styled from "styled-components";

const QuestAdmin = ({ formData, setFormData, formSubmit }) => {
 

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <QuestForm onSubmit={(e) => formSubmit(e)}>
      <Title>New Quest</Title>
      <Input
        type="text"
        placeholder="Title"
        id="title"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="Tell us a little about your quest!"
        id="description"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="Address"
        id="location"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="City"
        id="city"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="Date/Time"
        id="schedule"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="How many people do you need on this quest?"
        id="participants"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Input
        type="text"
        placeholder="Karma Points"
        id="karma"
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      />
      <Button>Create Your Quest!</Button>
    </QuestForm>
  );
};

const QuestForm = styled.form`
  position: absolute;
  z-index: 5;
  min-width: 30%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
  background-color: var(--color-grey);
  box-shadow: 0px 0px 10px var(--color-purple);
  font-family: var(--font);
`;
const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
  padding: 10px 0px;
  color: var(--color-dark-grey);
  align-self: center;
`;
const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-dark-grey);
  color: var(--color-dark-grey);
`;
const Button = styled.button`
  align-self: center;
  margin-top: 10px;
  font-size: 22px;
  padding: 20px;
  width: 300px;
  color: var(--color-yellow);
  border: none;
  border-radius: 10px;
  background-color: var(--color-dark-grey);

  &:hover {
    background-color: var(--color-yellow);
    color: var(--color-dark-grey);
  }
`;
export default QuestAdmin;
