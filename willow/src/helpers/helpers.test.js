import { formatFieldToTitle } from ".";

describe("formatFieldToTitle", () => {
  it("standard input", () => {
    expect(formatFieldToTitle("assignment_id")).toBe("Assignment Id");
  });

  it("doesn't contain a _", () => {
    expect(formatFieldToTitle("assignmentid")).toBe("Assignmentid");
  });
});
