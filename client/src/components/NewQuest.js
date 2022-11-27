import { useState, useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

import { Autocomplete } from "@react-google-maps/api";

const NewQuest = ({ setQuestList, questList, newMarker }) => {
  const { user, cred } = useContext(UserContext);
  const [formData, setFormData] = useState();
  const location = useRef();
  const coordinates = useRef();

  // Form for creating new Quest
  const formSubmit = (e) => {
    e.preventDefault();
    
    // CASE 1: User selected create new quest from side bar
    if(!newMarker){
    const encodedAddress = encodeURI(location.current.value);

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${cred.googleMaps}`
    )
      .then((res) => res.json())
      .then((res) => {
        coordinates.current = res.results[0].geometry.location;
        console.log(coordinates.current);
      })
      .then((res) => {
        // Run fetch only ones coordinates are set
        if (!user._id) {
          throw new Error(
            "ERROR: User ID is not set. Unable to retrieve account details."
          );
        } else {
          fetch(`/new-quest/${user._id}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, location: coordinates.current, type: user.avatarType }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 500) {
                throw new Error(data.message);
              } else {
                setQuestList([...questList, data.data]);
              }
            })
            .catch((error) => window.alert(error));
        }
      });
    // CASE 2: User dropped a pin on map to create Quest
    } else {
      fetch(`/new-quest/${user._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, location: newMarker }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          } else {
            setQuestList([...questList, data.data]);
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

  //TO DO: Find more interesting background image
  return (
    <>
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
        {!newMarker &&
        <Autocomplete >
          <Input
            type="text"
            placeholder="Address"
            id="location"
            ref={location}
          />
        </Autocomplete> 
        }
        <Input
          type="number"
          placeholder="How many people do you need on this quest?"
          id="participants"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
        <Input
          type="number"
          placeholder="Karma Points"
          id="karma"
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
  background-color: var(--color-yellow);
  box-shadow: 0px 0px 10px var(--color-dark-grey);
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
  background-color: var(--color-dark-grey);

  &:hover {
    background-color: var(--color-yellow);
    color: var(--color-dark-grey);
    border: 2px solid var(--color-dark-grey);
  }
`;
export default NewQuest;