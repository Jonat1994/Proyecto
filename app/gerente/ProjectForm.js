import React, { useState } from "react";

const ProjectForm =  () => {

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', status: 'New', progress: 0, startDate: '', finishDate: '', tasks: [] });
  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'New', assignedTo: '', updates: [] });
  const [users, setUsers] = useState([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSubmit = (event) => {
      event.preventDefault();
      if (newProject.name === '' || newProject.description === '' || newProject.startDate === '' || newProject.finishDate === '') {
          alert('Please fill in all fields to create a project');
          return;
      }
      const startDate = new Date(newProject.startDate);
      const currentDate = new Date();
      if (startDate < currentDate) {
          alert('The project start date cannot be less than the current date');
          return;
      }
      if (startDate > new Date(newProject.finishDate)) {
          alert('The project finish date cannot be less than the start date');
          return;
      }
      setProjects([...projects, { ...newProject, status: 'New' }]);
      setNewProject({ name: '', description: '', status: 'New', progress: 0, startDate: '', finishDate: '', tasks: [] });
  };

  const handleCreateTask = (projectIndex) => {
      if (newTask.name === '' || newTask.description === '') {
          alert('Please fill in all fields to create a task');
          return;
      }
      const updatedProjects = projects.map((project, index) => {
          if (index === projectIndex) {
              return { ...project, tasks: [...project.tasks, { ...newTask, status: 'New', updates: [] }] };
          }
          return project;
      });
      setProjects(updatedProjects);
      setNewTask({ name: '', description: '', status: 'New', assignedTo: '', updates: [] });
      setShowModal(false);
  };

  const handleUpdateTaskStatus = (projectIndex, taskIndex, status) => {
    const updatedProjects = projects.map((project, index) => {
      if (index === projectIndex) {
        return {
          ...project,
          tasks: project.tasks.map((task, taskIndexInner) => {
            if (taskIndexInner === taskIndex) {
              return { ...task, status };
            }
            return task;
          }),
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleAddUpdate = (projectIndex, taskIndex, update) => {
      const updatedProjects = projects.map((project, index) => {
          if (index === projectIndex) {
              return {
                  ...project,
                  tasks: project.tasks.map((task, taskIndexInner) => {
                      if (taskIndexInner === taskIndex) {
                          return { ...task, updates: [...task.updates, update] };
                      }
                      return task;
                  }),
              };
          }
          return project;
      });
      setProjects(updatedProjects);
  };

const handleDeleteTask = (projectIndex, taskIndex) => {
  const updatedProjects = projects.map((project, index) => {
    if (index === projectIndex) {
      return {
        ...project,
        tasks: project.tasks.filter((task, taskIndexInner) => taskIndexInner !== taskIndex),
      };
    }
    return project;
  });
  setProjects(updatedProjects);
};

  const handleShowModal = (projectIndex) => {
      setShowModal(true);
      setSelectedProject(projects[projectIndex]);
  };

  const handleHideModal = () => {
      setShowModal(false);
      setSelectedProject(null);
  };

  const handleShowTaskModal = (projectIndex, taskIndex) => {
    setShowTaskModal(true);
    setSelectedProject(projects[projectIndex]);
    setSelectedTask(projects[projectIndex].tasks[taskIndex]);
  };

  const handleHideTaskModal = () => {
      setShowTaskModal(false);
      setSelectedTask(null);
  };

  return (
      <div>
          <h1>Project Manager</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  Project Name:
                  <input type="text" value ={newProject.name} onChange={(event) => setNewProject({ ...newProject, name: event.target.value })} />
              </ label>
              <br />
              <label>
                  Project Description:
                  <textarea value={newProject.description} onChange={(event) => setNewProject({ ...newProject, description: event.target.value })} />
              </label>
              <br />
              <label>
 Start Date:
                  <input type="date" value={newProject.startDate} onChange={(event) => setNewProject({ ...newProject, startDate: event.target.value })} />
              </label>
              <br />
              <label>
                  Finish Date:
                  <input type="date" value={newProject.finishDate} onChange={(event) => setNewProject({ ...newProject, finishDate: event.target.value })} />
              </label>
              <br />
              <button type="submit">Create Project</button>
          </form>
          <ul>
  {projects.map((project, index) => (
    <li key={index}>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Start Date: {project.startDate}</p>
      <p>Finish Date: {project.finishDate}</p>
      <button onClick={() => handleShowModal(index)}>Create Task</button>
      <button onClick={() => handleShowTaskModal(index, 0)}>View Tasks</button>
    </li>
  ))}
</ul>
          {showModal && (
              <div>
                  <div>
                      <h2>Create Task</h2>
                      <form>
                          <label>
                              Task Name:
                              <input type="text" value={newTask.name} onChange={(event) => setNewTask({ ...newTask, name: event.target.value })} />
                          </label>
                          <br />
                          <label>
                              Task Description:
                              <textarea value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
                          </label>
                          <br />
                          <label>
                              Assign To:
                              <select value={newTask.assignedTo} onChange={(event) => setNewTask({ ...newTask, assignedTo: event.target.value })}>
                                  <option value="">Select User</option>
                                  {users.map((user) => (
                                      <option key={user.id} value={user.name}>
                                          {user.name}
                                      </option>
                                  ))}
                              </select>
                          </label>
                          <br />
                          <button type="button" onClick={() => handleCreateTask(projects.indexOf(selectedProject))}>Create Task</button>
                          <button onClick={handleHideModal}>Close</button>
                      </form>
                  </div>
              </div>
          )}
{showTaskModal && selectedTask && (
  <div>
    <div>
      <h2>Task Details</h2>
      <p>Task Name: {selectedTask.name}</p>
      <p>Task Description: {selectedTask.description}</p>
      <p>Status: {selectedTask.status}</p>
      <p>Assigned To: {selectedTask.assignedTo}</p>
      <button onClick={() => handleUpdateTaskStatus(projects.indexOf(selectedProject), selectedProject.tasks.indexOf(selectedTask), 'In Progress')}>Mark as In Progress</button>
      <button onClick={() => handleUpdateTaskStatus(projects.indexOf(selectedProject), selectedProject.tasks.indexOf(selectedTask), 'Completed')}>Mark as Completed</button>
      <button onClick={() => handleDeleteTask(projects.indexOf(selectedProject), selectedProject.tasks.indexOf(selectedTask))}>Delete Task</button>
      <button onClick={handleHideTaskModal}>Close</button>
    </div>
  </div>
)}
      </div>
  );
}

export default ProjectForm;
