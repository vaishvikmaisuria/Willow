import React from "react";
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fetchDividend } from "../../requests/tasks";
import Tasks from ".";
import { wrapInAll } from "../../testing/helpers";
import { mockTasks } from "../../testing/mockData";

jest.mock("../../requests/tasks");

describe("Tasks", () => {
  const renderPage = (props) => {
    return render(wrapInAll(<Tasks {...props} />));
  };

  beforeEach(() => {
    fetchDividend.mockImplementationOnce(() => Promise.resolve(mockTasks));
  });

  it("Renders tasks", async () => {
    let component;
    await act(async () => {
      component = renderPage();
    });
    expect(
      component.getByRole("heading", { name: /tasks/i })
    ).toBeInTheDocument();
    mockTasks.forEach((task) => {
      expect(component.getByText(task.name)).toBeInTheDocument();
    });
    expect(fetchDividend).toHaveBeenCalledTimes(1);
  });
});
