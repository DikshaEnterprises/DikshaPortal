import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://dikshaenterprisesbackend.onrender.com/api/contact/all')
      .then(res => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch contacts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading contacts...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full p-6 overflow-x-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Callback Request</h1>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{contact.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{contact.email || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{contact.phone || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contact;
