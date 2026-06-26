import React, { useState } from "react";
import { useNavigate, NavLink } from 'react-router';

const problems = [
  {
    id: 1,
    name: "Two Sum",
    solved: "1,254,389",
    acceptance: "49.1%",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Add Two Numbers",
    solved: "892,145",
    acceptance: "38.9%",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Longest Substring",
    solved: "743,021",
    acceptance: "33.8%",
    difficulty: "Medium",
  },
  {
    id: 4,
    name: "Container With Water",
    solved: "612,874",
    acceptance: "54.1%",
    difficulty: "Medium",
  },
];

const pillStyles = {
  Easy:
    "bg-green-100 text-green-700 font-semibold px-5 py-2 rounded-full transition-all duration-200",
  Medium:
    "bg-orange-100 text-orange-700 font-semibold px-5 py-2 rounded-full transition-all duration-200",
};

export default function Popular() {
  const [active, setActive] = useState(null);

  return (
    <section className="w-full bg-white px-4 md:px-20 py-14 ml-6">
      <div className="flex items-center justify-between mb-6 mt-4">
        <div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-2">Popular Problems</h2>
          <div className="text-xl text-gray-500">Start with these frequently asked interview questions</div>
        </div>
        <NavLink to="/home">
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-7 py-3 rounded-xl text-lg font-bold shadow hover:scale-105 transition">
          View All Problems &rarr;
        </button>
        </NavLink>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-15">
        {problems.map((prob, idx) => (
          <div
            key={prob.id}
            onClick={() => setActive(idx)}
            className={
              `cursor-pointer   transition-all transform duration-200
               rounded-2xl p-7 bg-gray-50 flex items-center justify-between
               shadow ${active === idx ? "shadow-gray-900" : "shadow-md"}
               ${active === idx ? "  scale-[1.02]" : ""}
              `
            }
            style={{ minHeight: "110px" }}
          >
            <div>
              <div className={`font-bold text-lg md:text-2xl mb-2 transition-all duration-200
                ${active === idx ? "text-orange-500" : "text-gray-900"}`}
              >
                {prob.id}. {prob.name}
              </div>
              <div className="text-base text-gray-700">{prob.solved} solved</div>
              <div className="text-sm text-gray-400">{prob.acceptance} acceptance</div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`${pillStyles[prob.difficulty]}
                  ${active === idx ? "scale-110 ring-2 ring-orange-400" : ""}
                `}
              >
                {prob.difficulty}
              </span>
              <span>
                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-15">
  {problems.map((prob) => (
    <div
      key={prob.id}
      className={`
        cursor-pointer transition-all transform duration-200
        rounded-2xl p-7 bg-gray-50 flex items-center justify-between
        shadow-md hover:shadow-gray-400
        hover:scale-[1.02]
      `}
      style={{ minHeight: "110px" }}
    >
      <div>
        <div className="
          font-bold text-lg md:text-2xl mb-2 transition-all duration-200 text-neutral-800
          hover:text-orange-500
        ">
          {prob.id}. {prob.name}
        </div>
        <div className="text-base text-gray-700">{prob.solved} solved</div>
        <div className="text-sm text-gray-400">{prob.acceptance} acceptance</div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`${pillStyles[prob.difficulty]} transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-orange-400`}
        >
          {prob.difficulty}
        </span>
        <span>
          <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </div>
  ))}
</div>

    </section>
  );
}
