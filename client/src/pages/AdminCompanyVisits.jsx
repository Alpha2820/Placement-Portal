import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllCompanyVisits,
  addCompanyVisit,
  deleteCompanyVisit,
  updateCompanyVisit,
} from "../utils/api";

function AdminCompanyVisits() {
  const [companyVisits, setCompanyVisits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    rolesOffered: "",
    minPackage: "",
    maxPackage: "",
    eligibilityCriteria: "",
    jobDescription: "",
    batch: "",
  });

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanyVisits();
  }, []);

  const fetchCompanyVisits = async () => {
    try {
      const data = await getAllCompanyVisits();
      setCompanyVisits(data.companyVisits);
    } catch (error) {
      console.error("Error fetching company visits:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert roles from comma-separated string to array
      const rolesArray = formData.rolesOffered
        .split(",")
        .map((role) => role.trim());

      const visitData = {
        companyName: formData.companyName,
        location: formData.location,
        rolesOffered: rolesArray,
        packageRange: {
          min: parseFloat(formData.minPackage),
          max: parseFloat(formData.maxPackage),
        },
        eligibilityCriteria: formData.eligibilityCriteria,
        jobDescription: formData.jobDescription,
        batch: formData.batch,
      };
      if (editingId) {
        // Update existing company visit
        await updateCompanyVisit(editingId, visitData);
        alert("✅ Company visit updated successfully!");
        setEditingId(null);
      } else {
        // Add new company visit
        await addCompanyVisit(visitData);
        alert("✅ Company visit added successfully!");
      }
      setShowForm(false);
      fetchCompanyVisits();

      // Reset form
      setFormData({
        companyName: "",
        location: "",
        rolesOffered: "",
        minPackage: "",
        maxPackage: "",
        eligibilityCriteria: "",
        jobDescription: "",
        batch: "",
      });
    } catch (error) {
      alert(
        "Error adding company visit: " +
          (error.response?.data?.message || "Unknown error"),
      );
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (visit) => {
    setEditingId(visit._id);
    setFormData({
      companyName: visit.companyName,
      location: visit.location,
      rolesOffered: visit.rolesOffered.join(", "),
      minPackage: visit.packageRange.min,
      maxPackage: visit.packageRange.max,
      eligibilityCriteria: visit.eligibilityCriteria,
      jobDescription: visit.jobDescription,
      batch: visit.batch,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id, companyName) => {
    if (!window.confirm(`Are you sure you want to delete ${companyName}?`))
      return;

    try {
      await deleteCompanyVisit(id);
      alert("✅ Company visit deleted successfully!");
      fetchCompanyVisits();
    } catch (error) {
      alert("Error deleting company visit");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-purple-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manage Company Visits
              </h1>
              <p className="text-gray-600 mt-1">
                Add and manage company recruitment information
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <button className="px-6 py-2.5 bg-gray-600 text-white font-semibold rounded-xl shadow-md hover:bg-gray-700 transition duration-200">
                  ← Admin Dashboard
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
        {/* Add Company Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              companyName: "",
              location: "",
              rolesOffered: "",
              minPackage: "",
              maxPackage: "",
              eligibilityCriteria: "",
              jobDescription: "",
              batch: "",
            });
          }}
          className="mb-8 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 flex items-center gap-2"
        >
          {showForm ? "✕ Cancel" : "+ Add Company Visit"}
        </button>

        {/* Add Company Form */}
        {showForm && (
          <div className="mb-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {editingId
                ? "✏️ Edit Company Visit"
                : "🏢 Add Company Visit Information"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Google, Microsoft"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Bangalore, Remote, Hybrid"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch (Year)
                  </label>
                  <input
                    type="text"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 2025"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roles Offered (comma-separated)
                </label>
                <input
                  type="text"
                  name="rolesOffered"
                  value={formData.rolesOffered}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Software Engineer, Data Analyst, Product Manager"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple roles with commas
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Min Package (LPA)
                  </label>
                  <input
                    type="number"
                    name="minPackage"
                    value={formData.minPackage}
                    onChange={handleChange}
                    required
                    step="0.01"
                    placeholder="e.g., 8"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Package (LPA)
                  </label>
                  <input
                    type="number"
                    name="maxPackage"
                    value={formData.maxPackage}
                    onChange={handleChange}
                    required
                    step="0.01"
                    placeholder="e.g., 12"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eligibility Criteria
                </label>
                <textarea
                  name="eligibilityCriteria"
                  value={formData.eligibilityCriteria}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="e.g., CGPA >= 7.0, All branches eligible, No backlogs"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Detailed job description, responsibilities, required skills, etc."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                    ? "✓ Update Company Visit"
                    : "✓ Add Company Visit"}
              </button>
            </form>
          </div>
        )}

        {/* Company Visits List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            📊 All Company Visits ({companyVisits.length})
          </h3>

          {companyVisits.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">🏢</div>
              <p className="text-gray-600 text-lg">
                No company visits added yet.
              </p>
              <p className="text-gray-500 mt-2">
                Click the button above to add your first company!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {companyVisits.map((visit) => (
                <div
                  key={visit._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-l-4 border-purple-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                        {visit.companyName}
                      </h4>
                      <div className="space-y-3">
                        <p className="text-gray-600">
                          <strong>Batch:</strong> {visit.batch}
                        </p>
                        <p className="text-gray-600">
                          <strong>Package Range:</strong>{" "}
                          <span className="text-green-600 font-bold">
                            ₹{visit.packageRange.min} - {visit.packageRange.max}{" "}
                            LPA
                          </span>
                        </p>
                        <div>
                          <strong className="text-gray-600">Roles:</strong>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {visit.rolesOffered.map((role, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(visit)}
                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(visit._id, visit.companyName)
                        }
                        className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCompanyVisits;
