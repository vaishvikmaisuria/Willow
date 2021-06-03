import axios from "axios";
import { serverUrl, getRequest } from ".";

jest.mock("axios");

describe("Get Request", () => {
  it("Appends a trailing slash if not present", async (done) => {
    const path = "/foo/bar";
    await getRequest(path);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(serverUrl + path + "/");
    done();
  });

  it("Includes searchParams if provided", async (done) => {
    const path = "/foo/bar/";
    const params = "?value=10";
    await getRequest(path, params);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(serverUrl + path + params);
    done();
  });
});
