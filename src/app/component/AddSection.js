'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

export default function MainContainer() {
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [newSnippet, setNewSnippet] = useState({
    snippetName: '',
    codeSnippet: '',
    snippetNote: '',
    language: '',
  });

  // Handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSnippet(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddSnippet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/data', newSnippet);
      if (response.data.success) {
        alert('Snippet added successfully!');
        setShowModal(false); 
        setNewSnippet({
          snippetName: '',
          codeSnippet: '',
          snippetNote: '',
          language: '',
        });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding snippet:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Code Snippet</h1>

      {/* Add Snippet Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white p-2 rounded mb-4 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Snippet
      </button>

      {/* Modal for adding snippet */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96 md:w-[600px]">
            <h2 className="text-xl font-semibold mb-4">Add New Snippet</h2>

            {/* Form to input new snippet details */}
            <form onSubmit={handleAddSnippet}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Snippet Name</label>
                <input
                  type="text"
                  name="snippetName"
                  value={newSnippet.snippetName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Code Snippet</label>
                <textarea
                  name="codeSnippet"
                  value={newSnippet.codeSnippet}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Snippet Note (Optional)</label>
                <input
                  type="text"
                  name="snippetNote"
                  value={newSnippet.snippetNote}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              <div className="mb-4">
              <select
                name="language"
                value={newSnippet.language}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
                >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="C#">C#</option>
                <option value="Go">Go</option>
                <option value="Ruby">Ruby</option>
                <option value="PHP">PHP</option>
                <option value="Swift">Swift</option>
                </select>

              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Add Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
