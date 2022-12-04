import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";

// Cloudinary imports
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { UserContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";

const AvatarSetup = () => {
  const { cred } = useContext(AuthContext);
  const { actions: {createUser} } = useContext(UserContext);
  const { user } = useAuth0();
  const [startingAvatars, setStartingAvatars] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: cred.cloudName,
    },
  });

  // Redirect to homepage when user is successfully created
  useEffect(() => {
    if (success === true) {
      navigate("/");
    }
  }, [success]);

  // Get all cloudinary public Ids for avatars
  useEffect(() => {
    fetch("/avatars")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          // Scale Gif to be larger
          const tempArray = data.data.map((avatar) => {
            const avatarGif = cld.image(avatar.public_id);

            return avatarGif
          });

          setStartingAvatars(tempArray);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <Wrapper>
      <Title>Choose your Companion!</Title>
      {error && <Error>Oops.. Something went wrong. Please try again!</Error>}
      <Grid>
      {!startingAvatars ? (
          <h1>Loading</h1>
        ) : (
          startingAvatars.map((avatar, i) => {
            return (
              <Nav key={avatar.publicID} onClick={() => {
                  const type= avatar.publicID.split("/")[2].split("_")[1]; 
                  
                  createUser({firstName: user.given_name, lastName: user.family_name, handler: user.nickname, email: user.email, avatar: avatar.publicID, avatarType: type, profileImg: user.picture, level: 1, karma: 500, admin: false})
                  .then(res => setSuccess(res))
                  .catch(err => setError(true));
              }} >
                <Image key={i} cldImg={avatar} />
                <Name>{avatar.publicID.split("/")[2].split("_")[0].toUpperCase()} </Name>
                {avatar.publicID.split("/")[2].split("_")[1] === "water" && <Type src="../assets/water.png"/>}
                {avatar.publicID.split("/")[2].split("_")[1] === "electric" && <Type src="../assets/electric.png"/>}
                {avatar.publicID.split("/")[2].split("_")[1] === "fire" && <Type src="../assets/fire.png"/>}
                {avatar.publicID.split("/")[2].split("_")[1] === "plant" && <Type src="../assets/plant.png"/>}
              </Nav>
            );
          })
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 250px;
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 50px;
  color: var(--color-dark-grey);
  align-self: center;
`;
const Error = styled.p`
  text-align: center;
  font-size: 24px;
  color: var(--color-red);
  margin-bottom: 30px;
`
const Grid = styled.div`
  align-self: center;
  display: flex;
  width: 60vw;
  justify-content: space-between;
`;
const Nav = styled.div`
  min-width: 200px;
  height: 400px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px var(--color-purple);
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px var(--color-red);
  }
`;
const Image = styled(AdvancedImage)`
  overflow: visible;
  margin-bottom: 20px;
`;
const Name = styled.p`
  text-align: center;
  color: var(--color-purple);
  font-weight: 500;
  margin: 20px 0px;
`;
const Type =styled.img`
  height: 35px;
  width: 35px;
`;
export default AvatarSetup;
