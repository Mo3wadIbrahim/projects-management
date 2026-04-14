import Input from "./Input";
import Button from "./Button";
import { useState, useRef } from "react";
import Modal from "./Modal";
export default function NewProject({
   onSaveProject,
   onCancelProject,
   projects,
}) {
   const [projectInput, setProjectInput] = useState({
      title: "",
      description: "",
      date: "",
   });
   function handleInputChange(value, input) {
      setProjectInput((prevProject) => {
         return {
            ...prevProject,
            [input]: value,
         };
      });
   }
   const isDuplicateTitle = projects.some(
      (project) => project.title === projectInput.title.trim(),
   );
   const invalidInputsModalRef = useRef();
   function handleSaveProject() {
      const isInputsValid =
         projectInput.title.trim() === "" ||
         projectInput.description.trim() === "" ||
         projectInput.date.trim() === "";
      if (isInputsValid || isDuplicateTitle) {
         invalidInputsModalRef.current.open();
         return;
      }
      onSaveProject(projectInput);
   }
   return (
      <>
         <Modal ref={invalidInputsModalRef}>
            <div className="p-6 w-80 bg-stone-50 rounded-lg shadow-md">
               <h2 className="text-xl font-bold text-stone-900 mb-4">
                  Please fill all the inputs before saving the project
               </h2>
               <menu className="flex items-center justify-end gap-4">
                  <Button
                     onClick={() => invalidInputsModalRef.current.close()}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 transition-colors"
                  >
                     Close
                  </Button>
               </menu>
            </div>
         </Modal>
         <div className="w-[50rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4 ">
               <li>
                  <Button
                     className="text-stone-800 hover:text-stone-950"
                     onClick={onCancelProject}
                  >
                     Cancel
                  </Button>
               </li>
               <li>
                  <Button
                     onClick={handleSaveProject}
                     className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-700"
                  >
                     Save
                  </Button>
               </li>
            </menu>
            <div>
               {isDuplicateTitle && (
                  <p className="text-red-500 text-sm mb-2">
                     A project with this title already exists. Please choose a
                     different title.
                  </p>
               )}
               <Input
                  type="text"
                  value={projectInput.title}
                  htmlFor="title"
                  label="Title"
                  onChange={(e) => handleInputChange(e.target.value, "title")}
               />
               <Input
                  type="text"
                  value={projectInput.description}
                  htmlFor="description"
                  label="Description"
                  textarea
                  onChange={(e) => handleInputChange(e.target.value, "description")}
               />
               <Input
                  type="date"
                  value={projectInput.date}
                  htmlFor="date"
                  label="Date"
                  onChange={(e) => handleInputChange(e.target.value, "date")}
               />
            </div>
         </div>
      </>
   );
}
