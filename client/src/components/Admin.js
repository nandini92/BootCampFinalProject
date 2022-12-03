import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {UsersContext} from "../contexts/UsersContext";

const Admin = () => {
  const { users } = useContext(UsersContext);
  const [reports, setReports] = useState();

  useEffect(() => {
    fetch("/reports")
    .then(res => res.json())
    .then((data) => {
      if(data.status === 200){
        setReports(data.data);
      }
      else {
        throw new Error(data.message);
      }})
    .catch((error) => console.log(error));

  }, [users])

  return (
    <Wrapper>
      <Board>
        <UserList>
            <Line>
                <Label>Reports</Label>
            </Line>
            <Separator></Separator>
          {reports && 
          reports.map((report, i) => {
           return (
              <Line>
                <Link to={`/profile/${report.userId}`}>{report.userId}</Link>
                <p>{report.report}</p>
              </Line>
            );
          })}
        </UserList>
      </Board>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Board = styled.div`
  position: relative;
  align-self: center;
  top: 50px;
  height: 62%;
  width: 40%;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-dark-grey);
`;
const UserList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Line = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--color-grey);
    padding: 10px;
    color: var(--color-dark-grey);

    a {
        text-decoration: none;
    }
`
const Label = styled.p`
    font-weight: 500;
`;
const Separator = styled.div`
    width: 97%;
    align-self:center;
    margin: 10px 0px;
    border-bottom: 1px solid var(--color-dark-grey);
`;
export default Admin;
