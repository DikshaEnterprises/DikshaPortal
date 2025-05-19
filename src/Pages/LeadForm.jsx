import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('https://dikshaenterprisesbackend.onrender.com/api/lead-form/getAllLeads');
        setLeads(response.data);
      } catch (err) {
        setError('Failed to fetch leads');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Lead Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Submitted At</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leads.map((lead, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td className="px-4 py-2">{lead.product || '—'}</td>
                <td className="px-4 py-2">
                  {new Date(lead.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadForm;
