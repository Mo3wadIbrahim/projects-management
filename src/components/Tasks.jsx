import { useState, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";
export default function Tasks({
   projectTitle,
   projectTasks,
   onAddTask,
   onToggleTaskStatue,
   onDeleteTask,
}) {
   const invalidInputsModalRef = useRef();
   const [newTask, setNewTask] = useState({
      title: "",
      date: "",
      statue: "incomplete",
      projectTitle: projectTitle,
   });

   return (
      <>
         <Modal ref={invalidInputsModalRef}>
            <div className="p-6 w-80 bg-stone-50 rounded-lg shadow-md">
               <h2 className="text-xl font-bold text-stone-900 mb-4">
                  Please fill all the inputs before saving the Task
               </h2>
               <menu className="flex items-center justify-end gap-4">
                  <Button
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 transition-colors"
                     onClick={() => invalidInputsModalRef.current.close()}
                  >
                     Close
                  </Button>
               </menu>
            </div>
         </Modal>
         <section>
            <h1 className="text-3xl font-bold text-stone-600 mb-3">Tasks</h1>
            <form
               className="mt-6 flex items-center gap-6 w-[100%]"
               onSubmit={(e) => {
                  e.preventDefault();
                  if (
                     newTask.title.trim() === "" ||
                     newTask.date.trim() === ""
                  ) {
                     invalidInputsModalRef.current.open();
                     return;
                  }
                  onAddTask({ ...newTask, id: crypto.randomUUID() });
                  setNewTask({
                     title: "",
                     date: "",
                     statue: "incomplete",
                     projectTitle: projectTitle,
                  });
               }}
            >
               <input
                  className="w-[30%] border border-stone-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newTask.date}
                  onChange={(e) =>
                     setNewTask({ ...newTask, date: e.target.value })
                  }
                  type="date"
                  placeholder="Add Due Date"
               />
               <input
                  className="w-[50%] border border-stone-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newTask.title}
                  onChange={(e) =>
                     setNewTask({ ...newTask, title: e.target.value })
                  }
                  type="text"
                  placeholder="Add Task Title or Description"
               />
               <button
                  className="w-[20%] ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                  onClick={(e) => {
                     e.preventDefault();
                     if (
                        newTask.title.trim() === "" ||
                        newTask.date.trim() === ""
                     ) {
                        invalidInputsModalRef.current.open();
                        return;
                     }
                     onAddTask({ ...newTask, id: crypto.randomUUID() });
                     setNewTask({
                        title: "",
                        date: "",
                        statue: "incomplete",
                        projectTitle: projectTitle,
                     });
                  }}
               >
                  Add Task
               </button>
            </form>
            <hr className="my-6 border-stone-300" />
            {projectTasks.length === 0 && (
               <p>This Project does not have any tasks yet</p>
            )}
            <ul>
               {projectTasks.length > 0 &&
                  projectTasks.map((task) => (
                     <li
                        className="flex items-center justify-between mb-4"
                        key={task.id}
                     >
                        <div className="flex items-center gap-4">
                           <span
                              className={
                                 task.statue === "complete"
                                    ? "line-through"
                                    : ""
                              }
                           >
                              {task.date}
                           </span>
                           <span
                              className={
                                 task.statue === "complete"
                                    ? "line-through"
                                    : ""
                              }
                           >
                              {task.title}
                           </span>
                        </div>
                        <div className="flex items-end gap-6">
                           <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => onDeleteTask(task.id)}
                           >
                              Delete Task
                           </button>
                           <input
                              className="mr-2 cursor-pointer w-5 h-5"
                              type="checkbox"
                              checked={
                                 task.statue === "complete" ? true : false
                              }
                              onChange={() => onToggleTaskStatue(task.id)}
                           />
                        </div>
                     </li>
                  ))}
            </ul>
         </section>
      </>
   );
}
