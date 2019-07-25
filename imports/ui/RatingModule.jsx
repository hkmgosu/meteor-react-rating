import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import SearchBar from "./SearchBarCard";
import Rating from "./RatingCard";
import { getGithubRepo } from "../api/searchGithubRepos";
import { Meteor } from "meteor/meteor";

const RatingModule = props => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [rating, setRating] = React.useState({ ok: false, result: null });

  async function handleSearch(searchField) {
    await setLoading(true);
    // const result = await getGithubRepo(searchField);
    await Meteor.call("searchGithubRepos.find", searchField, (err, res) => {
      if (err) {
        setError(err);
      } else {
        setRating(res);
        setLoading(false);
        return res;
      }
    });
  }

  useEffect(() => {
    console.log("state", { loading, error, rating });
  });

  return (
    <Paper
      style={{
        minHeight: 300,
        overflow: "hidden",
        backgroundColor: "#3f51b53d"
      }}
    >
      <SearchBar handleSearch={handleSearch} />
      <Rating rating={rating} />
    </Paper>
  );
};
export default RatingModule;
