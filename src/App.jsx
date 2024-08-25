import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import data from "./assets/data";
import Column from "./components/Column";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState(data);

  const handleDragEnd = ({ source, destination, draggableId }) => {
    console.log({ source, destination, draggableId });

    // Checking if tasks dropped out and didn't landed over any columns OR dropped in same place inside same column then do nothing.
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      console.log("if executed");
      return;
    }

    const newData = Array.from(todos);
    const destinationColumn = newData.find(
      ({ id }) => id === destination.droppableId
    );

    // Checking if tasks dropped inside same column but at different index place then do swapping.
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      setTodos((prevTodos) => {
        const localDestinationColumn = prevTodos.find(
          ({ id }) => id === destination.droppableId
        );

        const temp = localDestinationColumn.tasks[destination.index];
        localDestinationColumn.tasks[destination.index] =
          localDestinationColumn.tasks[source.index];
        localDestinationColumn.tasks[source.index] = temp;

        return prevTodos;
      });
      return;
    }

    const sourceColumn = newData.find(({ id }) => id === source.droppableId);

    destinationColumn.tasks.splice(
      destination.index,
      0,
      sourceColumn.tasks[source.index]
    );
    sourceColumn.tasks.splice(source.index, 1);

    setTodos(newData);
    console.log(todos);
  };

  return (
    <section className="rounded-xl bg-white p-3 pb-8">
      <h1 className="text-lg font-semibold text-center mb-4 uppercase">
        Todos Kanban
      </h1>
      <div className=" grid grid-cols-3 gap-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          {todos.map(({ id, column, tasks }) => (
            <Column key={id} id={id} heading={column} tasks={tasks}></Column>
          ))}
        </DragDropContext>
      </div>
    </section>
  );
}

export default App;
