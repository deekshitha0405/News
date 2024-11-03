import * as React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";

import { CardActionProps } from "./type";

const CardMedia = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 80%;
    height: 100%;
  }
`;

const DateContainer = styled.h6`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 0;
`;
export default function CardActionComponent({ data }: CardActionProps) {
  const handleOpenNewTab = () => {
    window.open(data?.url, "_blank"); // Open URL in new tab
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {Boolean(data?.urlToImage) && (
          <CardMedia>
            <img src={data?.urlToImage} />
          </CardMedia>
        )}
        <CardContent>
          <DateContainer>
            Published At: {dayjs(data?.publishedAt).format("DD/MM/YYYY")}
          </DateContainer>
          <Typography gutterBottom variant="h6" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleOpenNewTab}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
