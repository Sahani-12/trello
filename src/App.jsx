import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import initialData from './initialData';
import Column from './Column.jsx'; 
import './App.css'; 


const loadData = () => {
  const savedData = localStorage.getItem('taskflow-data');
  return savedData ? JSON.parse(savedData) : initialData;
};

function App() {
  const [state, setState] = useState(loadData);
  const [newTaskContent, setNewTaskContent] = useState('');

  
  useEffect(() => {
    localStorage.setItem('taskflow-data', JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setState({ ...state, columns: { ...state.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startColumn, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, taskIds: finishTaskIds };
    setState({ ...state, columns: { ...state.columns, [newStart.id]: newStart, [newFinish.id]: newFinish } });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskContent.trim()) return;

    const newTaskId = 'task-' + Date.now();
    const newTask = { id: newTaskId, content: newTaskContent };

    setState(prevState => {
      const newTasks = { ...prevState.tasks, [newTaskId]: newTask };
      const newToDoColumn = {
        ...prevState.columns['column-1'],
        taskIds: [...prevState.columns['column-1'].taskIds, newTaskId]
      };
      return { ...prevState, tasks: newTasks, columns: { ...prevState.columns, 'column-1': newToDoColumn } };
    });
    setNewTaskContent('');
  };

  const handleDeleteTask = (taskId, columnId) => {
    setState(prevState => {
      const newTasks = { ...prevState.tasks };
      delete newTasks[taskId];

      const column = prevState.columns[columnId];
      const newTaskIds = column.taskIds.filter(id => id !== taskId);

      return {
        ...prevState,
        tasks: newTasks,
        columns: { ...prevState.columns, [columnId]: { ...column, taskIds: newTaskIds } }
      };
    });
  };

  return (
    <div className="app-container">
      <h1 className="board-title">TaskFlow Board Pro</h1>   
      
      <form onSubmit={handleAddTask} className="add-task-form"> 
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="add-task-button">
          Add Card
        </button>
      </form>

      <div className="columns-container"> 
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            const validTasks = tasks.filter(task => task !== undefined);

            return <Column key={column.id} column={column} tasks={validTasks} onDelete={handleDeleteTask} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;