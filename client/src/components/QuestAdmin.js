import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const QuestAdmin = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState();

  // Form for creating new Quest
  const formSubmit = (e) => {
    e.preventDefault();

    if(!user._id){
      throw new Error("ERROR: User ID is not set. Unable to retrieve account details.")
    } else {
      fetch(`/new-quest/${user._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 500) {
            throw new Error(data.message);
          }
        })
        .catch((error) => window.alert(error));
    }
  };

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
        <Autocomplete>
          <Input type="text" placeholder="Address" id="location" />
        </Autocomplete>
        <Input
          type="text"
          placeholder="Date/Time"
          id="schedule"
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />
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

const Wrapper = styled.div`
background-color: var(--color-yellow);
  position: absolute;
  top: 50px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QuestForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 0px 20px 20px 20px;
  font-family: var(--font);
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
  }
`;
export default QuestAdmin;
