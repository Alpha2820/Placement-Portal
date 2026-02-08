import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCompanyVisits } from "../utils/api";

function CompanyVisits() {
  const [companyVisits, setCompanyVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: "",
    role: "",
    batch: "",
    minPackage: "",
    maxPackage: "",
  });

  useEffect(() => {
    fetchCompanyVisits();
  }, []);

  const fetchCompanyVisits = async () => {
    try {
      const data = await getAllCompanyVisits();
      setCompanyVisits(data.companyVisits);
    } catch (error) {
      console.error("Error fetching company visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      company: "",
      role: "",
      batch: "",
      minPackage: "",
      maxPackage: "",
    });
  };

  const filteredVisits = companyVisits.filter((visit) => {
    const matchCompany =
      filters.company === "" ||
      visit.companyName.toLowerCase().includes(filters.company.toLowerCase());

    const matchRole =
      filters.role === "" ||
      visit.rolesOffered.some((role) =>
        role.toLowerCase().includes(filters.role.toLowerCase()),
      );

    const matchBatch =
      filters.batch === "" || visit.batch.includes(filters.batch);

    const matchMinPackage =
      filters.minPackage === "" ||
      visit.packageRange.max >= parseFloat(filters.minPackage);

    const matchMaxPackage =
      filters.maxPackage === "" ||
      visit.packageRange.min <= parseFloat(filters.maxPackage);

    return (
      matchCompany &&
      matchRole &&
      matchBatch &&
      matchMinPackage &&
      matchMaxPackage
    );
  });

  const uniqueCompanies = [...new Set(companyVisits.map((v) => v.companyName))];
  const uniqueBatches = [...new Set(companyVisits.map((v) => v.batch))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-semibold">
            Loading company visits...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Company Visits
              </h1>
              <p className="text-gray-600 mt-1">
                Explore companies recruiting at our college
              </p>
            </div>
            <Link to="/">
              <button className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-blue-100 text-sm font-semibold uppercase">
              Total Companies
            </p>
            <p className="text-4xl font-bold mt-2">{uniqueCompanies.length}</p>
          </div>
          <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-green-100 text-sm font-semibold uppercase">
              Total Opportunities
            </p>
            <p className="text-4xl font-bold mt-2">{companyVisits.length}</p>
          </div>
          <div className="bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-purple-100 text-sm font-semibold uppercase">
              Active Batches
            </p>
            <p className="text-4xl font-bold mt-2">{uniqueBatches.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              🔍 Filter Companies
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                placeholder="Search company..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                placeholder="Search role..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Batch
              </label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">All Batches</option>
                {uniqueBatches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Package (LPA)
              </label>
              <input
                type="number"
                name="minPackage"
                value={filters.minPackage}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Package (LPA)
              </label>
              <input
                type="number"
                name="maxPackage"
                value={filters.maxPackage}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <strong>{filteredVisits.length}</strong> of{" "}
            <strong>{companyVisits.length}</strong> companies
          </div>
        </div>

        {/* Company Visits List */}
        {filteredVisits.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg font-semibold">
              No companies found
            </p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredVisits.map((visit) => (
              <div
                key={visit._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-l-4 border-blue-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {visit.companyName}
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            Batch {visit.batch}
                          </div>
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            📍 {visit.location}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">
                          Package Range
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{visit.packageRange.min} - {visit.packageRange.max}
                        </p>
                        <p className="text-sm text-gray-500">LPA</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          🎯 Roles Offered:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {visit.rolesOffered.map((role, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          ✅ Eligibility Criteria:
                        </p>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {visit.eligibilityCriteria}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          📋 Job Description:
                        </p>
                        <div className="text-gray-700 bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg leading-relaxed whitespace-pre-line">
                          {visit.jobDescription}
                        </div>
                      </div>

                      <div className="text-sm text-gray-500">
                        Added on:{" "}
                        {new Date(visit.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
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

export default CompanyVisits;
