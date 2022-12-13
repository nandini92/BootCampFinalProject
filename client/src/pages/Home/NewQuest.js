import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styled from "styled-components";

const NewQuest = ({
  loggedIn,
  setQuests,
  quests,
  newMarker,
  setUserUpdate,
  setConfirmation
}) => {
  const [formData, setFormData] = useState();
  const [error, setError] = useState(false);

  // Store Autocomplete address
  const location = useRef();
  
  // Form for creating new Quest
  const formSubmit = (e) => {
    e.preventDefault();
    
    // CASE 1: User selected create new quest from module. Google react autocomplete library sets the address which  needs to be geocoded(server) for marker to be placed on google map.
    if (!newMarker) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/new-quest/${loggedIn._id}`, {
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
          if (data.status === 201) {
            setQuests([...quests, data.data]);
            setUserUpdate(data.data._id);
            setConfirmation(true);
            setError(false);
          } else if (data.status === 404){
            throw new RangeError(data.message);
          } else if (data.status === 400){
            throw new SyntaxError(data.message);
          } else {
            throw Error("Oops something went wrong. Please try again later.");
          }
        })
        .catch((error) => setError(error));
    // CASE 2: User dropped a pin on map to create Quest. Googlemaps provides the coordinates of pin but this will be reverse geocoded(server) for address to be displayed in Single Quest module.
    } else {
      fetch(`${process.env.REACT_APP_SERVER_URL}/new-quest/${loggedIn._id}`, {
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
          if (data.status === 201) {
            setQuests([...quests, data.data]);
            setUserUpdate(data.data._id);
            setConfirmation(true);
            setError(false);
          } else if (data.status === 404){
            throw new RangeError(data.message);
          } else if (data.status === 400){
            throw new SyntaxError(data.message);
          } else {
            throw Error("Oops something went wrong. Please try again later.");
          }
        })
        .catch((error) => setError(error));
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
        {/*User will have option of inputting address manually if pin was not dropped on map. Autocomplete library provides drop down for user to select properly formatted address. */}
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
        {/* Display error message in case failed to create new quest */}
        {error !== false && <Error>{error.message}</Error>}
      </QuestForm>
    </>
  );
};

const QuestForm = styled.form`
  display: flex;
  flex-direction: column;
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
const Error = styled.p`
text-align: center;
  font-family: var(--font);
  color: var(--color-red);
  font-size: 16px;
  padding: 20px;
`
export default NewQuest;
