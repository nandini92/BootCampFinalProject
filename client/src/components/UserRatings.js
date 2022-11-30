import { useState } from "react";
import styled from "styled-components";
import { FiStar } from "react-icons/fi";

const UserRatings = ({category, ratings, setRatings}) => {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);
    const colors = {
        yellow:  '#FDD85D'
    }

    return (
        <Characteristic><span>{category}: </span>
        <div>{stars.map((i, index) => {
            return (
            <FiStar 
                key={`${category}-${index}`}
                style={{
                margin: "5px",
                cursor: "pointer"
                }}
                color={(hoverValue || currentValue) > index ? colors.yellow : "black"}
                onClick={() => {
                    setCurrentValue(index + 1);
                    setRatings({...ratings, [category]: (index + 1)})
                }}
                onMouseOver={() => setHoverValue(index + 1)}
                onMouseLeave={() => setHoverValue(currentValue)}
            />)
        })}
        </div>
        </Characteristic>
    )
}

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
`

export default UserRatings;