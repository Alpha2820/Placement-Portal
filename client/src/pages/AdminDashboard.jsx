import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  getPendingPlacements,
  approvePlacement,
  rejectPlacement,
} from "../utils/api";

function AdminDashboard() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingPlacements();
  }, []);

  const fetchPendingPlacements = async () => {
    try {
      const data = await getPendingPlacements();
      setPlacements(data.placements);
    } catch (error) {
      console.error("Error fetching placements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this placement?"))
      return;

    try {
      await approvePlacement(id);
      alert("✅ Placement approved successfully!");
      fetchPendingPlacements();
    } catch (error) {
      alert("❌ Error approving placement");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this placement?"))
      return;

    try {
      await rejectPlacement(id);
      alert("❌ Placement rejected!");
      fetchPendingPlacements();
    } catch (error) {
      alert("Error rejecting placement");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-purple-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage pending placement approvals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin/company-visits">
                <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-200">
                  🏢 Manage Companies
                </button>
              </Link>
              <span className="text-gray-700 font-semibold">
                👋 {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="mb-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">
                Pending Approvals
              </p>
              <p className="text-5xl font-bold mt-2">{placements.length}</p>
            </div>
            <div className="text-6xl opacity-50">⏳</div>
          </div>
        </div>

        {/* Pending Placements */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          📋 Pending Placements
        </h3>

        {placements.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-gray-600 text-lg font-semibold">
              All caught up!
            </p>
            <p className="text-gray-500 mt-2">
              No pending placements to review at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {placements.map((placement) => (
              <div
                key={placement._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                        {placement.company}
                      </h4>
                      <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        ⏳ Pending Review
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Student:</strong>{" "}
                          {placement.studentName}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">
                            Roll Number:
                          </strong>{" "}
                          {placement.userId?.rollNumber}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Email:</strong>{" "}
                          {placement.userId?.email}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Package:</strong>
                          <span className="text-green-600 font-bold text-xl ml-2">
                            ₹{placement.package} LPA
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Batch:</strong>{" "}
                          {placement.batch}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Submitted:</strong>{" "}
                          {new Date(placement.createdAt).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>

                    {placement.interviewExperience && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <strong className="text-gray-800 block mb-2">
                          💬 Interview Experience:
                        </strong>
                        <p className="text-gray-700 leading-relaxed">
                          {placement.interviewExperience}
                        </p>
                      </div>
                    )}

                    {/* Documents */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={placement.offerLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-semibold"
                      >
                        📄 View Offer Letter
                      </a>
                      <a
                        href={placement.idCardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-semibold"
                      >
                        🆔 View ID Card
                      </a>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="lg:w-48 flex lg:flex-col gap-3">
                    <button
                      onClick={() => handleApprove(placement._id)}
                      className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">✓</span>
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(placement._id)}
                      className="flex-1 bg-linear-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">✗</span>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
