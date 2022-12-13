import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import { useState } from "react";

const ReportUser = ({ open, setOpen, id }) => {
  const [formData, setFormData] = useState();

  // States to control display on error / confirmation banner once report is sent
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Send form details containing brief text on issue
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/report/${id}`,{
        "method": "POST",
        "headers" : {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({report: formData})
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === 200) {
          setSuccess(true);
          setError(false);
        } else {
            setError(true);
            setSuccess(false);
        }
      })
    .catch(() => setError(true));
  }

  const handleChange = (value) => {
    setFormData(value);
  }
  
  return (
    <Dialog open={open}  onClose={() => {setOpen(false); setError(false); setSuccess(false)}} maxWidth="xs">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Label>Please provide a reason for this report.</Label>
        <Input onChange={(e) => handleChange(e.target.value)}></Input>
        <Button type="submit">Submit</Button>
        {error !== false && <Error>Oops.. failed to submit. Please try again.</Error>}
        {success !== false && <Success>Your report has been submitted for review.</Success>}
      </Form>
    </Dialog>
  );
};

const Form = styled.form`
  padding: 20px;
  background-color: var(--color-grey);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Label = styled.p`
    margin: 10px;
`;
const Input = styled.textarea`
    max-width: 100%;
    margin: 10px;
    font-family: var(--font); 
`;
const Button = styled.button`
    margin: 10px;
`;
const Error = styled.p`
text-align: center;
  font-family: var(--font);
  color: var(--color-red);
  font-size: 16px;
  padding: 20px;
`
const Success = styled.p`
text-align: center;
  font-family: var(--font);
  color: var(--color-green);
  font-size: 16px;
  padding: 20px;
`
export default ReportUser;
