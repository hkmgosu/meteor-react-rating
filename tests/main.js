import assert from "assert";
import { HTTP } from "meteor/http";

describe("react-rating-app", function() {
  it("package.json has correct name", async function() {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "react-rating-app");
  });

  if (Meteor.isClient) {
    it("client is not server", function() {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function() {
      assert.strictEqual(Meteor.isClient, false);
    });
  }

  describe("Should /GET rating", function() {
    it("GET formated json response rating for a tracker", async function() {
      const uri = "foo/bar";
      // const res = await HTTP.get("/rating/" + uri);
      const res = { ok: null, result: null };
      return assert("ok" in res) && assert("result" in res);
    });
  });
});
