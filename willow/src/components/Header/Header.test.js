import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from ".";
import { localUrl } from "../../network";
import { wrapInTheme, wrapInRouter } from "../../testing/helpers";

describe("NavBar", () => {
  const renderNavBar = () => {
    return render(wrapInTheme(wrapInRouter(<NavBar />)));
  };

  it("Renders link to /tasks", async () => {
    const { getByText } = renderNavBar();
    const tasksLink = getByText("Tasks");
    expect(tasksLink).toBeInTheDocument();
    expect(tasksLink.href).toBe(`${localUrl}/tasks`);
  });
});
