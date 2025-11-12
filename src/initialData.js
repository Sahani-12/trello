const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Project setup create-react-app' },
    'task-2': { id: 'task-2', content: 'Design basic UI layout' },
    'task-3': { id: 'task-3', content: 'Implement Drag and Drop' },
    'task-4': { id: 'task-4', content: 'Push code to GitHub' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // कॉलम किस आर्डर में दिखेंगे
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;