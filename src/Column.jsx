import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task.jsx'; // .jsx एक्सटेंशन का ध्यान रखें
import './Column.css'; // नई CSS फाइल इंपोर्ट करें

const Column = (props) => {
  return (
    <div className="column-container"> {/* CSS क्लास लगाएं */}
      <h3 className="column-title"> {/* CSS क्लास लगाएं */}
        {props.column.title} <span className="task-count">({props.tasks.length})</span>
      </h3>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} /* CSS क्लास लगाएं */
          >
            {props.tasks.map((task, index) => (
              <Task 
                key={task.id} 
                task={task} 
                index={index} 
                onDelete={props.onDelete} 
                columnId={props.column.id} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;