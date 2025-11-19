import { FiUserPlus, FiUsers, FiBriefcase, FiGrid } from "react-icons/fi";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Job Poster",
      value: "1,247",
      icon: <FiUserPlus className="text-xl text-gray-500" />,
    },
    {
      title: "Total Job Candidates",
      value: "8,325",
      icon: <FiUsers className="text-xl text-gray-500" />,
    },
    {
      title: "Total Jobs",
      value: "454",
      icon: <FiBriefcase className="text-xl text-gray-500" />,
    },
    {
      title: "Total Applications",
      value: "12,847",
      icon: <FiGrid className="text-xl text-gray-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-[#F5F5F5] rounded-md px-6 py-5 flex flex-col space-y-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{item.title}</p>
            {item.icon}
          </div>

          <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
