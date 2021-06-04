import { getRequest, postRequest } from "../../network";

// Get a list of all tasks
export async function fetchDividend() {
  const response = await getRequest("/getDividend/");
  return response.data;
}

// Post request to add a Stock given body ("Symbol",	"Price", "Quantity")
export async function addStock(body) {
  //validation for prohibited keys
  const reqBody = {
    Symbol: body.name ? body.name : "NONE",
    Price: body.price ? body.price : "NONE",
    Quantity: body.quantity ? body.quantity : "NONE"
  };
  try {
    const response = await postRequest("/addStock/", reqBody);
    return response.data;
  } catch (e) {
    console.log(e);
    return {
      error: true,
      status: e.response && e.response.status,
      message: e.response && e.response.data,
    };
  }
}

// post request to upload the task files given files path in files parameter
export async function uploadTaskFiles({ files }) {
  const form = new FormData();
  files.forEach((file) => {
    form.append(file.meta.name.slice(0, -4), file.file);
  });
  const response = await postRequest("/api/tasks/upload", form);
  return response.data;
}
