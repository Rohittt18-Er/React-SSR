import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

export const Home = () => {
  const foodList: any = useLoaderData();
  const navigate = useNavigate();

  if (!foodList) {
    return <Typography variant="h6">No Food items found</Typography>;
  }

  const handleClick = (id: any) => {
    navigate(`/products/${id}`);
  };

  return (
    <Grid container spacing={2} padding={2}>
      {foodList?.map((food: any) => (
        <Grid item xs={12} sm={6} md={4} key={food.id}>
          <Card
            onClick={() => handleClick(food.id)}
            sx={{
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={food?.thumbnail}
              title="green iguana"
            />
            <CardContent>
              <Typography variant="h6">{food.brand}</Typography>
              <Typography color="textSecondary">{food.category}</Typography>
              <Typography variant="body1">${food.price}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Outlet />
    </Grid>
  );
};
