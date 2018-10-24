const fs = require("fs");

const tasks = [];

tasks.push({
  name: "Task 1",
  description: "",
  stage: 3,
  id: 1
});

tasks.push({
  name: "Task 2",
  description: "",
  stage: 1,
  id: 2
});

tasks.push({
  name: "Task 3",
  description: "",
  stage: 1,
  id: 3
});

tasks.push({
  name: "Task 4",
  description: "",
  stage: 3,
  id: 4
});

tasks.push({
  name: "Task 5",
  description: "",
  stage: 2,
  id: 5
});

tasks.push({
  name: "Task 7",
  description: "",
  stage: 2,
  id: 7
});

tasks.push({
  name: "Task 8",
  description: "",
  stage: 1,
  id: 8
});

tasks.push({
  name: "Task 9",
  description: "",
  stage: 1,
  id: 9
});

tasks.push({
  name: "Task 10",
  description: "",
  stage: 3,
  id: 10
});

fs.writeFile("db.json", JSON.stringify({ tasks }, null, 2), "utf8", err => {
  if (err) throw err;
  console.log("db seed complete");
});
