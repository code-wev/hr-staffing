import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const jobs = [
  {
    title: "Warehouse Lead",
    reqId: "Req ID: 14293457",
    location:
      "Culver, Anaheim, Fullerton, Fullerton, Pasadena, California, Long Beach, Bakersfield regions, SouthCoast",
    category: "Enterprise",
  },
  {
    title: "Sales Executive",
    reqId: "Req ID: 14293454",
    location:
      "San Mateo, Fresno, Daly City regions, Bakersfield, Stockton, California, San Jose Tech Parks, San Francisco Bay Area",
    category: "Sales",
  },
  {
    title: "Human Resources Coordinator",
    reqId: "Req ID: 14293453",
    location:
      "Anaheim, Costa Mesa, Newport Beach, Huntington Beach, Irvine regions, Southern California",
    category: "Human Resources",
  },
  {
    title: "Software Engineer",
    reqId: "Req ID: 14293450",
    location:
      "Santa Monica, Oakland, San Jose, Sacramento, California, Silicon Valley, San Francisco",
    category: "Engineering",
  },
  {
    title: "Graphic Designer",
    reqId: "Req ID: 14293448",
    location:
      "Downtown LA, Torrance, Pomona, Irvine, Long Beach, San Bernardino, Riverside, Livermore",
    category: "Design",
  },
  {
    title: "Marketing Specialist",
    reqId: "Req ID: 14293447",
    location:
      "San Diego, Chula Vista, Mission Hills, El Dorado, Orange City, Pasadena",
    category: "Marketing",
  },
  {
    title: "Warehouse Lead",
    reqId: "Req ID: 14293457",
    location:
      "Anaheim, Fullerton, Pasadena, Bakersfield, Ontario West, Costa Mesa",
    category: "Enterprise",
  },
  {
    title: "Operations Manager",
    reqId: "Req ID: 14293441",
    location:
      "Los Angeles, Burbank Terminal, Huntington Beach, Newport, Fullerton, Pasadena, Pomona, Orange County",
    category: "Management",
  },
  {
    title: "Data Analyst",
    reqId: "Req ID: 14293436",
    location:
      "Los Angeles, Culver City, Oceanside, Rancho Cucamonga, Ontario, Glendale, El Cajon, LA Westside",
    category: "Analytics",
  },
];

const JobList = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* JOB LIST */}
        <div className="divide-y divide-gray-200">

          {jobs.map((job, i) => (
            <div
              key={i}
              className="py-6 flex items-start justify-between gap-6 text-sm"
            >
              {/* LEFT - TITLE */}
              <div className="w-1/4">
                <h3 className="font-medium text-[16px] text-gray-900">{job.title}</h3>
                <p className="text-gray-500 text-[16px] mt-1">{job.reqId}</p>
              </div>

              {/* MIDDLE - LOCATION */}
              <div className="w-1/2">
                <p className="text-gray-800 font-medium text-[16px] mb-1">Location</p>
                <p className="text-gray-600 text-[16px] leading-relaxed">
                  {job.location}
                </p>
              </div>

              {/* RIGHT - CATEGORY + APPLY BUTTON */}
              <div className="w-1/4 flex items-start justify-between">
                <div>
                  <p className="text-gray-800 font-medium text-[16px] mb-1">
                    Categories
                  </p>
                  <p className="text-gray-600 text-[16px]">{job.category}</p>
                </div>

                <button className="bg-[#0497AE] text-white flex items-center gap-1 px-4 py-2 rounded-full text-[16px] shadow hover:bg-[#037e92] transition mt-3">
                  Apply <FiArrowUpRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-8 gap-2 text-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-700">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            4
          </button>
        </div>

      </div>
    </section>
  );
};

export default JobList;
