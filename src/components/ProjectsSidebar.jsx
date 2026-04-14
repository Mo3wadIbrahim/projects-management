import { useRef } from "react";
import Button from "./Button";
import Modal from "./Modal";
export default function ProjectsSidebar({
   onStartNewProject,
   projects,
   onSelectProject,
   selectedProjectID,
   onRemoveProjects,
}) {
   const removeProjectsModalRef = useRef();
   function handleRemoveProjects() {
      removeProjectsModalRef.current.open();
   }
   return (
      <>
         <Modal ref={removeProjectsModalRef}>
            <div className="p-6 w-80 bg-stone-50 rounded-lg shadow-md">
               <h2 className="text-xl font-bold text-stone-900 mb-4">
                  Are you sure you want to remove all projects?
               </h2>
               <menu className="flex items-center justify-end gap-4">
                  <Button
                     onClick={() => {
                        onRemoveProjects();
                        removeProjectsModalRef.current.close();
                     }}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:bg-red-400"
                  >
                     Yes, Remove All
                  </Button>
                  <Button
                     onClick={() => removeProjectsModalRef.current.close()}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 transition-colors"
                  >
                     Cancel
                  </Button>
               </menu>
            </div>
         </Modal>
         <aside className="w-1/3 px-4 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl h-[100%] overflow-hidden">
            <h2 className="text-xl font-bold text-stone-700 my-4">Your Projects</h2>
            <div>
               <Button
                  onClick={onStartNewProject}
                  className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
               >
                  + Add New Project
               </Button>
            </div>
            <ul className="p-2 mt-8 rounded-md h-[100%] overflow-y-auto">
               {projects.length ? (
                  projects.map((project) => {
                     return (
                        <li
                           key={project.id}
                           className={`flex justify-between my-2 text-slate-100 hover:bg-stone-600 hover:text-stone-100 hover:cursor-pointer ${selectedProjectID === project.id ? "bg-stone-600 text-stone-100" : ""}`}
                           onClick={() => onSelectProject(project.id)}
                        >
                           {project.title}
                        </li>
                     );
                  })
               ) : (
                  <li
                     className="flex justify-between my-4 text-slate-500"
                     key="no-projects"
                  >
                     {" "}
                     No Projects Saved
                  </li>
               )}
               {projects.length > 0 && (
                  <div className="my-4">
                     <Button
                        onClick={handleRemoveProjects}
                        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-100 hover:text-red-900 fixed bottom-4 left-6"
                     >
                        Remove All Projects
                     </Button>
                  </div>
               )}
            </ul>
         </aside>
      </>
   );
}
