import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import RatingModule from "./RatingModule";

// cointainer por all components

const App = () => (
  <Box>
    <Container maxWidth="lg" fixed>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        spacing={3}
        style={{ marginTop: 24 }}
      >
        <Typography variant="h4">Github Repositories Rating</Typography>
        <Grid item xs={12}>
          <RatingModule />
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default App;
