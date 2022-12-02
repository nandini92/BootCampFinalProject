import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import celebration from "../assets/images/Celebration.gif";
import { AdvancedImage } from "@cloudinary/react";

const Celebration = ({ userAvatar, open, setOpen, setLevelUpAnimation }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setLevelUpAnimation(false);
      }}
      maxWidth="lg"
    >
      <Image src={celebration} />
      <Pokemon cldImg={userAvatar} />
    </Dialog>
  );
};

const Image = styled.img`
  width: 500px;
  height: 500px;
`;
const Pokemon = styled(AdvancedImage)`
  position: absolute;
  z-index: 100;
  top: calc(50% - 60px);
  left: calc(50% - 60px);
  height: 120px;
  width: 120px;
`;

export default Celebration;
