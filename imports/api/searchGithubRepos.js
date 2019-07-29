import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";
import moment from "moment";
import { HTTP } from "meteor/http";
import router from "router";
// import bodyParser from "body-parser";
import mcache from "memory-cache";

const endpoint = router();
const GITHUB_API = "https://api.github.com/repos/";

if (Meteor.isServer) {
  // This code only runs on the server

  // get info from github
  const getGithubRepo = async url => {
    try {
      const options = {
        headers: {
          "User-Agent": "request"
        }
      };
      const repoInfo = await HTTP.get(GITHUB_API + url, options);
      const repoCommits = await HTTP.get(
        GITHUB_API + url + "/commits",
        options
      );
      // if repo exist, there is no error then and return results
      const data = {
        info: JSON.parse(repoInfo.content),
        lastCommits: JSON.parse(repoCommits.content)
      };
      return {
        ok: true,
        result: {
          owner_avatar_url: data.info.owner.avatar_url,
          open_issues_count: data.info.open_issues_count,
          owner_login: data.info.owner.login,
          updated_at: data.info.updated_at,
          name: data.info.name,
          last_commit_in_days: moment(Date.now()).diff(
            moment(data.lastCommits[0].commit.author.date),
            "days"
          )
        }
      };
    } catch (error) {
      // not found user, repo or user/repo
      return { ok: false, result: JSON.parse(error.response.content) };
    }
  };

  // POSSIBLE SOLUTIONS

  // Meteor.methods({
  //   async "searchGithubRepos.find"(repoUrl) {
  //     check(repoUrl, String);
  //   // cache validation
  //     const result = await getGithubRepo(repoUrl);
  //     return result;
  //   }
  // });

  // WebApp.connectHandlers.use("/rating", async (req, res, next) => {
  //   // cache validation
  //   const result = await getGithubRepo("hkmgosu/mobicongress");
  //   res.writeHead(200);
  //   res.set('Cache-Control', 'public, max-age=86400');
  //   res.end(JSON.stringify(result));
  // });

  // END POSSIBLE SOLUTIONS

  // -----------------------------

  // ****** api end point for github rating

  endpoint.get("/api/v1/rating", (req, res) => {
    res.end(
      JSON.stringify({
        ok: false,
        result: { message: "please, type 'user/yourTracker' and try again" }
      })
    );
  });

  endpoint.get("/api/v1/rating/:user", (req, res) => {
    res.end(
      JSON.stringify({
        ok: false,
        result: {
          message: `please, type '${req.params.user}/yourTracker' and try again`
        }
      })
    );
  });

  endpoint.get("/api/v1/rating/:user/:repo", async (req, res) => {
    // validate tracker name
    if (!req.params.repo) {
      res.end(
        JSON.stringify({
          ok: false,
          result: { message: "please type a GITHUB repository" }
        })
      );
    }

    const userRepoPath = req.params.user + "/" + req.params.repo;
    // memory cache validation
    if (mcache.get(userRepoPath)) {
      console.log("cache", mcache.get(userRepoPath));
      res.end(mcache.get(userRepoPath));
    } else {
      console.log("no cache");
      const result = await getGithubRepo(
        req.params.user + "/" + req.params.repo
      );
      // only save an existing repo in cache
      if (result.ok) mcache.put(userRepoPath, JSON.stringify(result), 86400);
      res.end(JSON.stringify(result));
    }
  });

  // ***** using WEBAPP meteor package for API CALLS.
  // WebApp.connectHandlers.use(bodyParser.urlencoded({ extended: true }));
  WebApp.connectHandlers.use(endpoint);
}
