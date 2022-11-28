import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";

// Cloudinary imports
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const AvatarSetup = () => {
  const { actions: {createUser} } = useContext(UserContext);
  const { user, isAuthenticated } = useAuth0();

  // TO DO: Error banner to retry in case of failure
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  const [startingAvatars, setStartingAvatars] = useState();

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    // TO DO: Replace with cred
    cloud: {
      cloudName: "daeu4xdvz",
    },
  });

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
      <Grid>
      {!startingAvatars ? (
          <h1>Loading</h1>
        ) : (
          startingAvatars.map((avatar, i) => {
            return (
              <Nav key={avatar.publicID} onClick={() => {
                if (isAuthenticated === true) {
                  const type= avatar.publicID.split("/")[2].split("_")[1]; 
                  
                  const success = createUser({firstName: user.given_name, lastName: user.family_name, handler: user.nickname, email: user.email, avatar: avatar.publicID, avatarType: type, profileImg: user.picture, level: 1, karma: 100});
                  success ? navigate("/") : setError(true);
                }
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
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 30px;
  color: var(--color-dark-grey);
  align-self: center;
  padding-bottom: 80px;
`;
const Grid = styled.div`
  align-self: center;
  display: flex;
  width: 60%;
  justify-content: space-between;
`;
const Nav = styled.div`
  width: 200px;
  height: 400px;
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
