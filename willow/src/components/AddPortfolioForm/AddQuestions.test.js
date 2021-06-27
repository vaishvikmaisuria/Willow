import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddQuestions from ".";
import { wrapInTheme, wrapInRouter } from "../../testing/helpers";

describe("AddQuestions", () => {
  const renderAddQ = (props) => {
    const defaultProps = {
      values: {
        question_names: ["Q1", "Q2"],
        max_marks_per_question: [0, 0],
      },
      setFieldValue: () => {},
    };

    return render(
      wrapInTheme(wrapInRouter(<AddQuestions {...defaultProps} {...props} />))
    );
  };

  it("Renders questions based on provided values", () => {
    const mockValues = {
      question_names: ["Q1", "Q2"],
      max_marks_per_question: [0, 0],
    };

    const { getByRole } = renderAddQ({ values: mockValues });

    mockValues.question_names.forEach((name, index) => {
      expect(
        getByRole("textbox", { name: `question-${index}-input` }).value
      ).toBe(name);
      expect(
        getByRole("spinbutton", { name: `num-${index}-input` })
      ).toBeInTheDocument();
    });
  });

  it("Clicking add button sets field values accordingly", () => {
    const setFieldValueSpy = jest.fn();
    const { getByRole } = renderAddQ({ setFieldValue: setFieldValueSpy });
    fireEvent.click(getByRole("button", { name: /add question/i }));
    expect(setFieldValueSpy).toHaveBeenCalledWith("question_names", [
      "Q1",
      "Q2",
      "Q3",
    ]);
    expect(setFieldValueSpy).toHaveBeenCalledWith("max_marks_per_question", [
      0,
      0,
      0,
    ]);
  });

  it("Clicking delete button sets field values accordingly", () => {
    const setFieldValueSpy = jest.fn();
    const { getByTestId } = renderAddQ({ setFieldValue: setFieldValueSpy });
    act(() => {
      fireEvent.click(getByTestId("delete-btn-1"));
    });
    expect(setFieldValueSpy).toHaveBeenCalledWith("question_names", ["Q1"]);
    expect(setFieldValueSpy).toHaveBeenCalledWith("max_marks_per_question", [
      0,
    ]);
  });

  it("Changing question name changes field values", () => {
    const setFieldValueSpy = jest.fn();
    const { getByRole } = renderAddQ({ setFieldValue: setFieldValueSpy });
    act(() => {
      fireEvent.change(getByRole("textbox", { name: /question\-0\-input/i }), {
        target: { value: "Q1a" },
      });
    });
    expect(setFieldValueSpy).toHaveBeenCalledWith("question_names", [
      "Q1a",
      "Q2",
    ]);
  });
});
