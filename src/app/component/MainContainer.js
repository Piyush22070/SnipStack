'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Loading from './Loading';

const LANGUAGES = [
  'All', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
  'C#', 'Go', 'Ruby', 'PHP', 'Swift',
];

export default function MainContainer() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setSnippets(response.data))
      .catch(error => console.error('Error fetching snippets:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('/api/data', { data: { id } });
      if (response.data.success) {
        setSnippets(prev => prev.filter(snippet => snippet.id !== id));
        alert('Snippet deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting snippet:', error);
      alert('Failed to delete snippet');
    }
  };

  const filteredSnippets = snippets.filter(snippet =>
    snippet.snippetName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLanguage === 'All' || snippet.language === selectedLanguage)
  );

  return (
    <div className="p-4">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by snippet name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="max-h-[600px] overflow-y-auto pr-2">
          <ul className="space-y-4">
            {filteredSnippets.length > 0 ? (
              filteredSnippets.map(snippet => (
                <li key={snippet.id} className="border p-4 rounded shadow relative">
                  <h2 className="text-lg font-semibold">{snippet.snippetName}</h2>
                  <p className="text-sm text-gray-500 mb-2">Language: {snippet.language}</p>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                    {snippet.codeSnippet}
                  </pre>
                  {snippet.snippetNote && (
                    <p className="text-sm text-gray-600 mt-2">Note: {snippet.snippetNote}</p>
                  )}
                  <button
                    onClick={() => handleDelete(snippet.id)}
                    className="absolute top-2 right-2 p-4 text-black hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </li>
              ))
            ) : (
              <p>No snippets found matching your criteria.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
