import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import Project from "./components/Project";

function App() {
   const [projectsState, setProjectsState] = useState({
      selectedProjectID: undefined,
      projects: JSON.parse(localStorage.getItem("projects")) || [],
   });

   function handleStartNewProject() {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            selectedProjectID: null,
         };
      });
   }
   function handleSaveProject(newProject) {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            projects: [
               ...prevState.projects,
               { ...newProject, id: crypto.randomUUID() },
            ].sort((a, b) => a.title.localeCompare(b.title)),
         };
      });
   }

   function handleCancelProject() {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            selectedProjectID: undefined,
         };
      });
   }
   function handleSelectedProject(projectID) {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            selectedProjectID: projectID,
         };
      });
   }
   function handleDeleteProject() {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            projects: prevState.projects.filter(
               (project) => project.id !== prevState.selectedProjectID,
            ),
            selectedProjectID: undefined,
         };
      });
   }
   function handleRemoveProjects() {
      setProjectsState({
         selectedProjectID: undefined,
         projects: [],
      });
   }
   function handleAddTask(newTask) {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            projects: prevState.projects.map((project) =>
               project.id === prevState.selectedProjectID
                  ? { ...project, tasks: [...(project.tasks || []), newTask] }
                  : project,
            ),
         };
      });
   }
   function handleToggleTaskStatue(taskID) {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            projects: prevState.projects.map((project) =>
               project.id === prevState.selectedProjectID
                  ? {
                     ...project,
                     tasks: project.tasks.map((task) =>
                        task.id === taskID
                           ? {
                              ...task,
                              statue:
                                 task.statue === "complete"
                                    ? "incomplete"
                                    : "complete",
                           }
                           : task,
                     ),
                  }
                  : project,
            ),
         };
      });
   }
   function handleDeleteTask(taskID) {
      setProjectsState((prevState) => {
         return {
            ...prevState,
            projects: prevState.projects.map((project) =>
               project.id === prevState.selectedProjectID
                  ? {
                     ...project,
                     tasks: project.tasks.filter(
                        (task) => task.id !== taskID,
                     ),
                  }
                  : project,
            ),
         };
      });
   }
   useEffect(() => {
      localStorage.setItem("projects", JSON.stringify(projectsState.projects));
   }, [projectsState.projects]);
   return (
      <main className="h-[100vh] flex gap-8">
         <ProjectsSidebar
            onStartNewProject={handleStartNewProject}
            projects={projectsState.projects}
            onSelectProject={handleSelectedProject} onRemoveProjects={handleRemoveProjects}
            selectedProjectID={projectsState.selectedProjectID}
         />
         {projectsState.selectedProjectID === null && (
            <NewProject
               onSaveProject={handleSaveProject}
               onCancelProject={handleCancelProject}
               projects={projectsState.projects}
            />
         )}
         {projectsState.selectedProjectID === undefined && (
            <NoProjectSelected onStartNewProject={handleStartNewProject} />
         )}
         {projectsState.selectedProjectID !== undefined &&
            projectsState.selectedProjectID !== null && (
               <Project
                  project={projectsState.projects.find(
                     (project) =>
                        project.id === projectsState.selectedProjectID,
                  )}
                  onDeleteProject={handleDeleteProject}
                  onCancelProject={handleCancelProject}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleAddTask}
                  onToggleTaskStatue={handleToggleTaskStatue}
               />
            )}
      </main>
   );
}

export default App;
