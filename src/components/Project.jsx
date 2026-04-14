import Button from "./Button";
import Modal from "./Modal";
import { useRef } from "react";
import Tasks from "./Tasks";
export default function Project({
   project,
   onCancelProject,
   onDeleteProject,
   onAddTask,
   onToggleTaskStatue,
   onDeleteTask,
}) {
   const formatedDate = new Date(project.date).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
   const deleteProjectModalRef = useRef();
   function handleDeleteProject() {
      deleteProjectModalRef.current.open();
   }
   return (
      <>
         <Modal ref={deleteProjectModalRef}>
            <div className="p-6 w-80 bg-stone-50 rounded-lg shadow-md">
               <h2 className="text-xl font-bold text-stone-900 mb-4">
                  Are you sure you want to delete project?
                  <br />
                  <p className="text-blue-600 text-5xl">{project.title} </p>
               </h2>
               <menu className="flex items-center justify-end gap-4">
                  <Button
                     onClick={() => {
                        onDeleteProject();
                        deleteProjectModalRef.current.close();
                     }}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:bg-red-400"
                  >
                     Yes, delete it
                  </Button>
                  <Button
                     onClick={() => deleteProjectModalRef.current.close()}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 transition-colors"
                  >
                     No, keep it
                  </Button>
               </menu>
            </div>
         </Modal>
         <div className="p-6 w-9/12 mx-auto  mt-16 bg-stone-50 rounded-lg shadow-md max-h-screen">
            <div className="mb-6">
               <h1 className="text-3xl font-bold text-stone-600 mb-3">
                  {project.title}
               </h1>
               <p className="text-stone-700 text-lg mb-4">{project.description}</p>
               <p className="text-stone-600 text-sm italic">Date: {formatedDate}</p>
            </div>
            <hr className="my-6 border-stone-300" />
            <div>
               <h3 className="text-lg font-semibold text-stone-800 mb-4">Actions</h3>
               <menu className="flex items-center justify-end gap-4">
                  <li>
                     <Button
                        className="px-4 py-2 text-sm rounded-md bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 transition-colors"
                        onClick={onCancelProject}
                     >
                        Cancel
                     </Button>
                  </li>
                  <li>
                     <Button
                        onClick={handleDeleteProject}
                        className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:bg-red-400"
                     >
                        Delete
                     </Button>
                  </li>
               </menu>
               <hr />
               <div>
                  <Tasks
                     projectTitle={project.title}
                     projectTasks={project.tasks || []}
                     onAddTask={onAddTask}
                     onToggleTaskStatue={onToggleTaskStatue}
                     onDeleteTask={onDeleteTask}
                  />
               </div>
            </div>
         </div>
      </>
   );
}
