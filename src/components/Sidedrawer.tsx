import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";

import { SidedrawerProps } from "./type";
import DatePickerComp from "./DatePicker";

import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFilterData } from "../store/slice/filterSlice";

const Header = styled.h4``;

const StyledList = styled(List)`
  li {
    margin-bottom: 1rem;
    p {
      padding: 0 0.5rem;
    }
  }
  h6 {
    font-size: 1rem;
    margin: 1rem 0;
  };
  .Mui-checked {
    color: black !important;
  };
  .Mui-checked:hover {
    backgroundcolor: transparent !important;
  };
  .MuiCheckbox-root {
    color: black !important;
  }
`;

const sourcelist = [
  { id: 1, name: "NewsAPI" },
  { id: 2, name: "The Guardian" },
  { id: 3, name: " New York Times" },
];

const Sidedrawer = ({
  open,
  toggleDrawer,
  handleFilterChange,
}: SidedrawerProps) => {
  const { data } = useSelector(selectFilterData);
  const handleChange = (key: string, value: any) => {
    handleFilterChange({ [key]: value });
  };

  const handleSourceChange = (value: boolean, id: number) => {
    const updatedSources = value
      ? [...data?.sources, id]
      : data?.sources.filter((el: Number) => el !== id);
    handleFilterChange({ sources: updatedSources });
  };
  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" m={2}>
        <Header>Filter By:</Header>
        <StyledList>
          <ListItem disablePadding>
            <DatePickerComp
              handleChange={(value: string) => handleChange("from", value)}
              // date={queryParams?.from}
            />
          </ListItem>
          <Divider />
          <h6>Sources</h6>
          {sourcelist?.map((el, index) => (
            <ListItem key={index} disablePadding>
              <Checkbox
                checked={Boolean(data?.sources.includes(el.id))}
                onChange={(e, value) => handleSourceChange(value, el?.id)}
              />
              <Typography>{el?.name}</Typography>
            </ListItem>
          ))}
        </StyledList>
      </Box>
    </Drawer>
  );
};

export default Sidedrawer;
