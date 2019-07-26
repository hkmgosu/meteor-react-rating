import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import SearchBar from "./SearchBarCard";
import Rating from "./RatingCard";
// import { getGithubRepo } from "../api/searchGithubRepos";
// import { Meteor } from "meteor/meteor";

const RatingModule = props => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [rating, setRating] = React.useState({ ok: false, result: null });

  async function handleSearch(searchField) {
    // METEOR METHOD CALL TEST
    //
    // await Meteor.call("searchGithubRepos.find", searchField, (err, res) => {
    //   if (err) {
    //     setError(err);
    //   } else {
    //     setRating(res);
    //     setLoading(false);
    //     return res;
    //   }
    // });
    // END TEST

    // validating fields and path
    if (searchField.split("/").length !== 2 || !searchField.split("/")[1]) {
      await setRating({
        ok: false,
        result: { message: "please, type 'user/repository' and try again" }
      });
      await setError(true);
    } else {
      // starts the request
      await setLoading(true);
      const result = await fetch("/api/v1/rating/" + searchField);
      const jsonRes = await result.json();
      await setRating(jsonRes);
      await setLoading(false);
    }
  }

  function handleOnChange(searchField) {
    setError(searchField.split("/").length !== 2 || !searchField.split("/")[1]);
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
      <SearchBar
        handleSearch={handleSearch}
        handleOnChange={handleOnChange}
        loading={loading}
        error={error}
      />
      <Rating rating={rating} loading={loading} />
    </Paper>
  );
};
export default RatingModule;
