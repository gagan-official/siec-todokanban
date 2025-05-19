const tasks = [
  {
    id: "task1",
    title: "Sidebar not working",
    date: "28/4/2023, 1:03pm",
  },
  {
    id: "task2",
    title: "Course search error",
    date: "15/4/2024, 2:42pm",
  },
  {
    id: "task3",
    title: "Responsive Issue",
    date: "29/4/2023, 12:09pm",
  },
  {
    id: "task4",
    title: "Undergraduate course in Malaysia",
    date: "21/2/2023, 4:51pm",
  },
];

const data = [
  {
    id: "col1",
    column: "to do",
    tasks: tasks.filter((_, i) => i < 2),
    // tasks: [tasks[0],tasks[1]],
  },
  {
    id: "col2",
    column: "in progress",
    tasks: [tasks[2]],
  },
  {
    id: "col3",
    column: "resolved",
    tasks: [tasks[3]],
  },
];

export default data;
