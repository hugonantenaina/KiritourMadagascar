// src/components/services/ServicesList.jsx
import React from "react";
import { FaHotel, FaUtensils, FaHiking, FaBus } from "react-icons/fa";

const services = [
  {
    icon: <FaHotel size={30} />,
    title: "Accommodation",
    description: "Comfortable hotels and lodges during your stay in Madagascar.",
  },
  {
    icon: <FaUtensils size={30} />,
    title: "Food & Dining",
    description: "Delicious local cuisine and international dishes.",
  },
  {
    icon: <FaHiking size={30} />,
    title: "Adventure Tours",
    description: "Exciting hiking and adventure activities for all ages.",
  },
  {
    icon: <FaBus size={30} />,
    title: "Transport",
    description: "Safe and reliable transportation services across Madagascar.",
  },
];

const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center"
        >
          <div className="text-green-400 mb-4">{service.icon}</div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
