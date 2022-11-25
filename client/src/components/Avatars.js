import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";

// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";

// Cloudinary imports
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";


const Avatars = ({ startingAvatars, setStartingAvatars }) => {
  const { actions: {createUser} } = useContext(UserContext);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

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

  // Render the image in a React component.
  return (
      <>
        {!startingAvatars ? (
          <h1>Loading</h1>
        ) : (
          startingAvatars.map((avatar, i) => {
            return (
              <Nav onClick={() => {
                if (isAuthenticated === true) {
                  createUser({firstName: user.given_name, lastName: user.family_name, handler: user.nickname, email: user.email, avatar: avatar.publicID, profileImg: user.picture, level: 1, karma: 100});
                  navigate("/");
                }
              }} >
                <Image key={i} cldImg={avatar} />
              </Nav>
            );
          })
        )}
      </>
  );
};

const Nav = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: 0px 0px 10px var(--color-dark-grey);
  border-radius: 15%;
  transition: transform 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 10px var(--color-red);
  }
`;
const Image = styled(AdvancedImage)`
  display: block;
  margin: auto;
  margin-top: 15px;
  overflow: visible;
`;
export default Avatars;
