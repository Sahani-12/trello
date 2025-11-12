import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import "./Task.css"; // नई CSS फाइल इंपोर्ट करें

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${
            snapshot.isDragging ? "is-dragging" : ""
          }`} /* CSS क्लास लगाएं */
          style={{
            ...provided.draggableProps.style,
          }} /* DnD लाइब्रेरी के स्टाइल्स को ओवरराइड न करें */
        >
          <span>{props.task.content}</span>
          <button
            onClick={() => props.onDelete(props.task.id, props.columnId)}
            className="delete-task-button"
          >
            ×
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
