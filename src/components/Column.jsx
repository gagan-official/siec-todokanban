import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default function Column({ id, heading, tasks }) {
  return (
    <Droppable droppableId={id}>
      {(provided, snap) => (
        <div
          className="columnCard p-3 pb-8 h-fit rounded-xl shadow-even border transition-colors border-gray-200"
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={snap.isDraggingOver ? { backgroundColor: "#f7f7f7" } : null}
        >
          <h2 className="uppercase text-gray-600 font-semibold mb-4">
            {heading}
          </h2>
          <ul className="flex flex-col gap-2">
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                index={i}
                resolved={heading === "resolved"}
                task={task}
              />
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
}
