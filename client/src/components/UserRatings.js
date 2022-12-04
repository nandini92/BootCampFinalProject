import { useState } from "react";
import styled from "styled-components";
import { FiStar } from "react-icons/fi";

const UserRatings = ({ category, ratings, setRatings, currentRatings }) => {
  // State to track user clicked value on Stars array
  const [currentValue, setCurrentValue] = useState(currentRatings);
  // State to track star index during mouseover
  const [hoverValue, setHoverValue] = useState(undefined);

  // Create a temporary array with 5 elements to be filled with stars later
  const stars = Array(5).fill(0);
  const colors = {
    yellow: "#FDD85D",
  };

  return (
    <Characteristic>
      <span>{category}: </span>
      <div>
        {stars.map((i, index) => {
          return ratings !== null ? (
            <FiStar
              key={`${category}-${index}`}
              style={{
                margin: "5px",
                cursor: "pointer",
              }}
              color={
                (hoverValue || currentValue) > index ? colors.yellow : "black"
              }
              onClick={() => {
                setCurrentValue(index + 1);
                setRatings({ ...ratings, [category]: index + 1 });
              }}
              onMouseOver={() => setHoverValue(index + 1)}
              onMouseLeave={() => setHoverValue(currentValue)}
            />
          ) : (
            <FiStar
              key={`${category}-${index}`}
              style={{
                margin: "5px"
              }}
              color={
                (hoverValue || currentValue) > index ? colors.yellow : "black"
              }
            />
          );
        })}
      </div>
    </Characteristic>
  );
};

const Characteristic = styled.div`
  width: 100%;
  font-family: var(--font);
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;

  span {
    margin: 10px;
    line-height: 9px;
  }
`;

export default UserRatings;
