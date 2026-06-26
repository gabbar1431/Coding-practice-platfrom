// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router';

// // Zod schema matching the problem schema
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required')
//     })
//   ).min(1, 'At least one visible test case required'),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required')
//     })
//   ).min(1, 'At least one hidden test case required'),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       initialCode: z.string().min(1, 'Initial code is required')
//     })
//   ).length(3, 'All three languages required'),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       completeCode: z.string().min(1, 'Complete code is required')
//     })
//   ).length(3, 'All three languages required')
// });

// function AdminPanel() {
//   const navigate = useNavigate();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible
//   } = useFieldArray({
//     control,
//     name: 'visibleTestCases'
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden
//   } = useFieldArray({
//     control,
//     name: 'hiddenTestCases'
//   });

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.post('/problem/create', data);
//       alert('Problem created successfully!');
//       navigate('/');
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
            
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
                
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
            
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Create Problem
//         </button>
//       </form>
//     </div>
   
//   );
// }

// export default AdminPanel;

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  visibleTestCases: z.array(z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
  })),
  hiddenTestCases: z.array(z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
  })),
  startCode: z.array(z.object({
    initialCode: z.string(),
  })),
  referenceSolution: z.array(z.object({
    completeCode: z.string(),
  })),
});

export default function AdminPanel() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      visibleTestCases: [{ input: "", output: "" }],
      hiddenTestCases: [{ input: "", output: "" }],
      startCode: [
        { initialCode: "" },
        { initialCode: "" },
        { initialCode: "" },
      ],
      referenceSolution: [
        { completeCode: "" },
        { completeCode: "" },
        { completeCode: "" },
      ],
    },
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({ control, name: "visibleTestCases" });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({ control, name: "hiddenTestCases" });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* Basic Information */}
        <div className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
          <h2 className="text-2xl font-semibold text-black mb-6">📝 Basic Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-black mb-1">Title</label>
              <input
                {...register("title")}
                className={`input input-bordered w-full ${errors.title ? "border-red-500" : ""}`}
                placeholder="Enter the problem title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-black mb-1">Description</label>
              <textarea
                {...register("description")}
                className={`textarea textarea-bordered w-full ${errors.description ? "border-red-500" : ""}`}
                placeholder="Describe the problem"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-black mb-1">Difficulty</label>
              <select {...register("difficulty")} className="select select-bordered w-full">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visible Test Cases */}
        <div className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
          <h2 className="text-2xl font-semibold text-black mb-6">👁️ Visible Test Cases</h2>
          {visibleFields.map((field, index) => (
            <div key={field.id} className="mb-6 space-y-4 border border-gray-300 p-4 rounded-md">
              <div>
                <label className="block font-medium text-black mb-1">Input</label>
                <textarea
                  {...register(`visibleTestCases.${index}.input`)}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
                {errors.visibleTestCases?.[index]?.input && (
                  <p className="text-red-500 text-sm">{errors.visibleTestCases[index].input.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-black mb-1">Output</label>
                <textarea
                  {...register(`visibleTestCases.${index}.output`)}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
                {errors.visibleTestCases?.[index]?.output && (
                  <p className="text-red-500 text-sm">{errors.visibleTestCases[index].output.message}</p>
                )}
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline btn-error mt-2"
                onClick={() => removeVisible(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-primary mt-4"
            onClick={() => appendVisible({ input: "", output: "" })}
          >
            ➕ Add Visible Test Case
          </button>
        </div>

        {/* Hidden Test Cases */}
        <div className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
          <h2 className="text-2xl font-semibold text-black mb-6">🔒 Hidden Test Cases</h2>
          {hiddenFields.map((field, index) => (
            <div key={field.id} className="mb-6 space-y-4 border border-gray-300 p-4 rounded-md">
              <div>
                <label className="block font-medium text-black mb-1">Input</label>
                <textarea
                  {...register(`hiddenTestCases.${index}.input`)}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
                {errors.hiddenTestCases?.[index]?.input && (
                  <p className="text-red-500 text-sm">{errors.hiddenTestCases[index].input.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-black mb-1">Output</label>
                <textarea
                  {...register(`hiddenTestCases.${index}.output`)}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
                {errors.hiddenTestCases?.[index]?.output && (
                  <p className="text-red-500 text-sm">{errors.hiddenTestCases[index].output.message}</p>
                )}
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline btn-error mt-2"
                onClick={() => removeHidden(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-primary mt-4"
            onClick={() => appendHidden({ input: "", output: "" })}
          >
            ➕ Add Hidden Test Case
          </button>
        </div>

        {/* Code Templates */}
        <div className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200">
          <h2 className="text-2xl font-semibold text-black mb-6">💻 Code Templates</h2>
          {[0, 1, 2].map((index) => {
            const lang = ["C++", "Java", "JavaScript"][index];
            return (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold text-black mb-2">{lang}</h3>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-black font-medium">Initial Code</span>
                  </label>
                  <textarea
                    {...register(`startCode.${index}.initialCode`)}
                    className="textarea textarea-bordered w-full font-mono bg-black text-white"
                    rows={6}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black font-medium">Reference Solution</span>
                  </label>
                  <textarea
                    {...register(`referenceSolution.${index}.completeCode`)}
                    className="textarea textarea-bordered w-full font-mono bg-black text-white"
                    rows={6}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success text-white font-semibold">
            ✅ Submit Problem
          </button>
        </div>
      </form>
    </div>
  );
}
