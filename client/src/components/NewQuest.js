import { useState, useContext, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styled from "styled-components";
import { User } from "@auth0/auth0-react";

const NewQuest = ({
  loggedIn,
  setQuests,
  quests,
  newMarker,
  setUserUpdate,
  setConfirmation
}) => {
  const [formData, setFormData] = useState();
  const location = useRef();

  // Form for creating new Quest
  const formSubmit = (e) => {
    e.preventDefault();

    // CASE 1: User selected create new quest from side bar
    // TO DO : Show error if quest failed to create or not enough karma
    if (!newMarker) {
      fetch(`/new-quest/${loggedIn._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pinType: loggedIn.avatarType,
          location: encodeURI(location.current.value),
          address: location.current.value,
          type: loggedIn.avatarType,
          newMarker: false,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            setQuests([...quests, data.data]);
            setUserUpdate(data.data._id);
            setConfirmation(true);
          }
        })
        .catch((error) => window.alert(error));
      // CASE 2: User dropped a pin on map to create Quest
    } else {
      fetch(`/new-quest/${loggedIn._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pinType: loggedIn.avatarType,
          location: newMarker,
          newMarker: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            setQuests([...quests, data.data]);
            setUserUpdate(data.data._id);
            setConfirmation(true);
          }
        })
        .catch((error) => window.alert(error));
    }
  };

  // Store form values for all regular inputs
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <>
      <QuestForm onSubmit={(e) => formSubmit(e)}>
        <Title>New Quest</Title>
        <Input
          type="text"
          placeholder="Title"
          id="title"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <Input
          type="text"
          placeholder="Tell us a little about your quest!"
          id="description"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        {!newMarker && (
          <Autocomplete>
            <Input
              type="text"
              placeholder="Address"
              id="location"
              required
              ref={location}
            />
          </Autocomplete>
        )}
        <Input
          type="number"
          placeholder="How many people do you need on this quest?"
          id="participants"
          min="1"
          max="3"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <Input
          type="number"
          placeholder="Difficulty"
          id="difficulty"
          min="1"
          max="5"
          required
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <Button>Create Your Quest!</Button>
      </QuestForm>
    </>
  );
};

const QuestForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 0px 20px 20px 20px;
  font-family: var(--font);
  width: 90%;
  margin: 20px;
`;
const Title = styled.p`
  font-size: 22px;
  font-weight: bold;
  padding: 15px 0px;
  color: var(--color-dark-grey);
  align-self: center;
`;
const Input = styled.input`
  padding: 10px;
  margin: 10px;
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
  background-color: var(--color-purple);

  &:hover {
    cursor: pointer;
  }
`;
export default NewQuest;
