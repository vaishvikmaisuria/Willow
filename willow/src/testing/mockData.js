// This file contains mock (fake) data which will be used to substitute api calls.

export const createMockTask = ({ tid, name, status }) => ({
  tid,
  name,
  status,
});

export const mockTasks = [
  createMockTask({
    tid: 1,
    name: "Task 1",
    status: "Pending",
  }),
  createMockTask({
    tid: 2,
    name: "Task 2",
    status: "Functioning",
  }),
];
