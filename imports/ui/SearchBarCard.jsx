import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
      marginRight: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 320
    }
  },
  toolbar: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 8,
      marginRight: 33
    }
  }
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [searchField, setSearchField] = React.useState("");

  async function handleOnChange(value) {
    await setSearchField(value);
    await props.handleOnChange(value);
  }

  return (
    <AppBar position="static">
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            id="github-input"
            placeholder="Github Repository: e.g. hkmgosu/yourtracker"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "Search" }}
            value={searchField}
            onChange={event => handleOnChange(event.target.value)}
          />
        </div>
        <div className={classes.grow} />
        <Button
          color="inherit"
          onClick={() => props.handleSearch(searchField)}
          disabled={props.loading || props.error}
        >
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
}
