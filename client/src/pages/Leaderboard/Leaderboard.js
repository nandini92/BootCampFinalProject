import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {UsersContext} from "../../contexts/UsersContext";

const Leaderboard = () => {
  const { users } = useContext(UsersContext);
  const [sortedUsers, setSortedUsers] = useState();

  useEffect(() => {
    users &&
    setSortedUsers(users.sort(function(a, b){return b.karma - a.karma} ));
  }, [users])

  return (
    <Wrapper>
      <Board>
        <UserList>
            <Line>
                <Label>User Handle</Label>
                <Label>Karma</Label>
            </Line>
            <Separator></Separator>
          {sortedUsers && 
          sortedUsers.map((user, i) => {
           return i < 14 && (
              <Line key={user._id}>
                <Link to={`/profile/${user._id}`}>{user.handler}</Link>
                <Link to={`/profile/${user._id}`}>{user.karma}</Link>
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
  background: linear-gradient(120deg, white, var(--color-blue));
`;
const Board = styled.div`
  position: relative;
  align-self: center;
  top: 50px;
  height: 62%;
  width: 40%;
  border-radius: 15px;
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  background-color: white;
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

    a {
        text-decoration: none;
        color: var(--color-dark-grey);
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
export default Leaderboard;
