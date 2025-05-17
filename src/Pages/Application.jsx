import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const statusOptions = ['Submitted', 'InProcess', 'Selected', 'Rejected'];

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/payment/applications');
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       setStatusLoadingId(id);
//       await axios.patch(`http://dikshabackend-env.eba-wxn4iyrj.ap-south-1.elasticbeanstalk.com/api/payment/applications/:${id}/status`, {
//         applicationStatus: newStatus,
//       });
//       await fetchApplications();
//     } catch (err) {
//       console.error('Error updating status', err);
//     } finally {
//       setStatusLoadingId(null);
//     }
//   };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        </div>
      ) : (
        <div className="overflow-auto rounded-lg shadow border">
          <table className="w-full table-auto text-sm text-left min-w-[1000px]">
            <thead className="bg-orange-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Father</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Alt Mobile</th>
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Qualification</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Aadhar</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Payment ID</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Status</th>
                {/* <th className="px-4 py-3">Update</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {applications.map((app) => (
                <tr key={app._id}>
                  <td className="px-4 py-2">{app.name}</td>
                  <td className="px-4 py-2">{app.fatherName}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">{app.mobile}</td>
                  <td className="px-4 py-2">{app.altMobile}</td>
                  <td className="px-4 py-2">{app.dob}</td>
                  <td className="px-4 py-2">{app.gender || '—'}</td>
                  <td className="px-4 py-2">{app.state}</td>
                  <td className="px-4 py-2">{app.district}</td>
                  <td className="px-4 py-2">{app.address}</td>
                  <td className="px-4 py-2">{app.category}</td>
                  <td className="px-4 py-2">{app.qualification}</td>
                  <td className="px-4 py-2">{app.experience}</td>
                  <td className="px-4 py-2">{app.aadhar}</td>
                  <td className="px-4 py-2">₹{app.paidAmount}</td>
                  <td className="px-4 py-2 text-xs break-all">{app.paymentId}</td>
                  <td className="px-4 py-2 text-xs break-all">{app.userId}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          app.applicationStatus === 'Submitted'
                            ? 'bg-blue-100 text-blue-700'
                            : app.applicationStatus === 'InProcess'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.applicationStatus === 'Selected'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>
                  {/* <td className="px-4 py-2">
                    <select
                      value={app.applicationStatus}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      className="border px-2 py-1 rounded text-sm"
                      disabled={statusLoadingId === app._id}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {statusLoadingId === app._id && (
                      <Loader2 className="inline ml-2 animate-spin h-4 w-4 text-orange-500" />
                    )}
                  </td> */}
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="18" className="text-center p-4 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Application;
