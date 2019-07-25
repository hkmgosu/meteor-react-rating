import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    width: 420
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

export default function Rating(props) {
  const classes = useStyles();
  const rating = props.rating;

  console.log("rating?", rating);

  const Message =
    rating.result === null ? (
      <Grid item xs={10}>
        <Typography gutterBottom variant="h6" align="center">
          Want to know how stable and mature a GitHub-repository is?
        </Typography>
        <Typography gutterBottom variant="h6" align="center">
          Just type the repository-name and hit search.
        </Typography>
      </Grid>
    ) : (
      <Grid item xs={10}>
        <Typography gutterBottom variant="h6" align="center" color="error">
          {`search repository results: ${rating.result.message}`}
        </Typography>
      </Grid>
    );

  const RepoCard = (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="user avatar"
              src={rating.ok ? rating.result.owner.avatar_url : ""}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                {`The Rating is ${rating.ok &&
                  rating.result.open_issues_count * 10 +
                    rating.result.last_commit_in_days}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {rating.ok ? `Name: ${rating.result.name}` : ""}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {rating.ok ? `Owner: ${rating.result.owner.login}` : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                {rating.ok
                  ? `last update: ${moment(rating.result.updated_at).format(
                      "LL"
                    )}`
                  : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{ paddingTop: 18 }}
      >
        {rating.ok ? RepoCard : Message}
      </Grid>
    </div>
  );
}
