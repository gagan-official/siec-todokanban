import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import data from "./assets/data";
import Column from "./components/Column";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

const localData = localStorage.getItem("todos") ?? JSON.stringify(data);

function App() {
  const [todos, setTodos] = useState(JSON.parse(localData));

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

    // Deep cloning of todos array was necessary as nested arrays and objects were still
    // mutable even after copying them using Array.from() method or spreading them [...]
    const newData = cloneDeep(todos);

    const destinationColumn = newData.find(
      ({ id }) => id === destination.droppableId
    );
    const sourceColumn = newData.find(({ id }) => id === source.droppableId);

    const [removedItem] = sourceColumn.tasks.splice(source.index, 1);
    console.log({ removedItem });
    destinationColumn.tasks.splice(destination.index, 0, removedItem);

    setTodos(newData);
    console.log({ k: 2, todos });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="rounded-xl bg-white p-3 pb-8 m-[10px]">
      <h1 className="text-lg font-semibold text-center mb-4 uppercase">
        Todos Kanban
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          {todos.map(({ id, column, tasks }) => (
            <Column key={id} id={id} heading={column} tasks={tasks}></Column>
          ))}
        </DragDropContext>
      </div>
      <button
        className="bg-[rgb(var(--redText))] text-[rgb(var(--redBg))] text-sm mt-4 mx-auto block px-3 py-2 rounded-md hover:opacity-80 active:scale-95 transition"
        onClick={() => setTodos(data)}
      >
        Reset Local Storage
      </button>
    </section>
  );
}

export default App;
