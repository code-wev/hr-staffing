import { FiUsers, FiGrid, FiMapPin, FiExternalLink } from "react-icons/fi";

export default function JobStats() {
  const items = [
    {
      title: "Total Applicants",
      value: "24",
      icon: <FiUsers className="text-lg text-gray-500" />,
    },
    {
      title: "Interviews",
      value: "03",
      icon: <FiGrid className="text-lg text-gray-500" />,
    },
    {
      title: "Location",
      value: "San Francisco, CA",
      icon: <FiMapPin className="text-lg text-gray-500" />,
    },
    {
      title: "Salary range",
      value: "$120,000 - $150,000",
      icon: <FiExternalLink className="text-lg text-gray-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-[#F5F5F5] rounded-md px-5 py-5"
        >
          {/* Title + Icon */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">{item.title}</p>
            {item.icon}
          </div>

          {/* Value */}
          <p className="text-[20px] font-semibold text-black">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
