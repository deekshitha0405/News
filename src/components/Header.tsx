import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";

import { HeaderProps } from "./type";
import Searchbox from "./Searchbox";
import { Box } from "@mui/material";

const HeaderContainer = styled.header`
  background-color: black;
  color: white;
  height: 4.5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000; /* To it stays on top */
  .flexcontainer {
    display: flex;
    align-items: center;
  }
  svg {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  padding: 0 0.75rem;
  font-size: 1.95rem;
  font-family: cursive;
  font-weight: 600;
`;

const Header = ({ handleMenuClick, handleChange }: HeaderProps) => {
  return (
    <HeaderContainer>
      <Box className="flexcontainer">
        <MenuIcon onClick={() => handleMenuClick(true)} />
        <Title>News</Title>
      </Box>
      <Box sx={{ width: "45%" }}>
        <Searchbox handleChange={handleChange} />
      </Box>
    </HeaderContainer>
  );
};

export default Header;
