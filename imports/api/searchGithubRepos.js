import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import moment from "moment";
import { HTTP } from "meteor/http";

// export const getGithubRepo = async url => {
//   const repoInfo = await HTTP.get("https://api.github.com/repos/" + url, {
//     headers: {
//       "User-Agent": "request"
//     }
//   });
//   const repoCommits = await HTTP.get(
//     "https://api.github.com/repos/" + url + "/commits",
//     {
//       headers: {
//         "User-Agent": "request"
//       }
//     }
//   );
//   const data = {
//     info: JSON.parse(repoInfo.content),
//     lastCommits: JSON.parse(repoCommits.content)
//   };
//   console.log("stdata", data);
//   return {
//     ok: repoInfo.statusCode === 200 && repoCommits.statusCode === 200,
//     result: {
//       ...data.info,
//       last_commit_in_days:
//         repoInfo.statusCode === 200 && repoCommits.statusCode === 200
//           ? moment(Date.now()).diff(
//               moment(data.lastCommits[0].commit.author.date),
//               "days"
//             )
//           : null
//     }
//   };
// };

if (Meteor.isServer) {
  // This code only runs on the server
  const getGithubRepo = async url => {
    try {
      const options = {
        headers: {
          "User-Agent": "request"
        }
      };
      const repoInfo = await HTTP.get(
        "https://api.github.com/repos/" + url,
        options
      );
      const repoCommits = await HTTP.get(
        "https://api.github.com/repos/" + url + "/commits",
        options
      );
      const data = {
        info: JSON.parse(repoInfo.content),
        lastCommits: JSON.parse(repoCommits.content)
      };
      return {
        ok: true,
        result: {
          ...data.info,
          last_commit_in_days: moment(Date.now()).diff(
            moment(data.lastCommits[0].commit.author.date),
            "days"
          )
        }
      };
    } catch (error) {
      return { ok: false, result: JSON.parse(error.response.content) };
    }
  };

  Meteor.methods({
    async "searchGithubRepos.find"(repoUrl) {
      check(repoUrl, String);

      const result = await getGithubRepo(repoUrl);
      return result;
    }
  });
}
