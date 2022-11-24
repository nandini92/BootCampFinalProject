import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { scale } from "@cloudinary/url-gen/actions/resize";

// Import required actions and qualifiers.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

import styled from "styled-components";

const Avatars = ({ startingAvatars, setStartingAvatars }) => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
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
            .resize(scale().width(100))
            .resize(thumbnail().height(100).gravity(focusOn(FocusOn.face())))
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
              <Nav>
                <Image key={i} cldImg={avatar} />
              </Nav>
            );
          })
        )}
      </>
  );
};

const Nav = styled(NavLink)`
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
