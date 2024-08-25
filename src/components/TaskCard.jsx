import { Draggable } from "react-beautiful-dnd";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

export default function TaskCard({ task, resolved, index }) {
  const { id, title, date } = task;
  const color = resolved ? "green" : "red";
  const iconProps = { className: "inline" }; // Why I've used className this way? I was trying to inject same properties like classname, id etc to all the icons as needed

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snap) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snap.isDragging}
        >
          <div
            style={{
              "--bg": `rgba(var(--${color}Text),.07)`,
              backdropFilter: snap.isDragging ? "blur(10px)" : "",
            }}
            className={`taskCard flex flex-col gap-1 rounded-md bg-[--bg] p-3 text-xs`}
          >
            <a
              style={{ "--text": `rgb(var(--${color}Text))` }}
              className={`font-semibold text-sm w-fit hover:opacity-60 text-[--text]`}
              href="https://siec-dashboard.netlify.app"
              target="blank"
            >
              {title} <LuExternalLink {...iconProps} />
            </a>
            <span className="flex gap-1 items-center font-medium text-gray-500">
              <FaRegCalendarAlt />
              {date}
            </span>
          </div>
          {provided.placeholder}
        </li>
      )}
    </Draggable>
  );
}
