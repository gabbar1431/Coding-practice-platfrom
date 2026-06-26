import React, { useState } from "react";

const cards = [
  {
    id: 1,
    icon: (
      <svg className="w-13 h-13 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    bg: "bg-blue-100",
    title: "Code Editor",
    text: "Professional coding environment with syntax highlighting and autocomplete"
  },
  {
    id: 2,
    icon: (
      <svg className="w-13 h-13 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10,16 16,12 10,8" fill="currentColor" />
      </svg>
    ),
    bg: "bg-green-100",
    title: "Test Runner",
    text: "Run your code against test cases instantly and see results in real-time"
  },
  {
    id: 3,
    icon: (
      <svg className="w-13 h-13 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="20 17 12 7 4 17" />
      </svg>
    ),
    bg: "bg-purple-100",
    title: "Progress Tracking",
    text: "Track your solving progress with detailed analytics and performance metrics"
  },
  {
    id: 4,
    icon: (
      <svg className="w-13 h-13 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    bg: "bg-orange-100",
    title: "Competitions",
    text: "Participate in coding contests and compete with developers worldwide"
  }
];

export default function FeaturesCard() {
  const [active, setActive] = useState(null);

  return (
    <div className="w-full min-h-[350px] bg-white  flex justify-center items-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={
              `rounded-xl px-8 py-10 flex flex-col items-start shadow-md transition transform
              cursor-pointer
              ${card.bg}
              ${active === idx ? "scale-105 shadow-2xl border border-orange-400" : ""}
               hover:scale-105 hover:shadow-lg ` 
            }
            style={{ transitionProperty: "transform,box-shadow", transitionDuration: "0.3s" }}
            onClick={() => setActive(idx)}
          >
            <div className={`mb-6 flex items-center justify-center `}>
              {card.icon}
            </div>
            <div className="font-bold text-lg mb-2 text-gray-800">{card.title}</div>
            <div className="text-gray-600">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
