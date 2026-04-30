// FeaturedTourList.jsx
import React, { useState } from "react";
import Modal from "react-modal";

// Offline images
import ga1 from "../../assets/images/ga5.jpg";
import ga2 from "../../assets/images/ga2.jpg";
import ga3 from "../../assets/images/CA (2).jpg";
import ga4 from "../../assets/images/ga3.jpg";
import ga5 from "../../assets/images/ga1.jpg";
import ga6 from "../../assets/images/CA (36).jpg"; 
import ga7 from "../../assets/images/CA (3).jpg";

Modal.setAppElement("#root");

const FeaturedTourList = () => {
  const [selectedTour, setSelectedTour] = useState(null);

  const fakeTours = [
    {
      title: "Allée de Baobab",
      city: "Allée de Baobab",
      description:
        "Experience the iconic Allée de Baobab at sunset. Learn about the history of the baobabs and take professional photos.",
      attractions: ["Sunset view", "Guided walk", "Photography"],
      image: ga1,
    },
    {
      title: "Kirindy Forest",
      city: "Kirindy Forest",
      description:
        "Explore Kirindy forest with a guide. Spot endemic wildlife including lemurs, fosa, and many birds.",
      attractions: ["Wildlife spotting", "Guided trekking", "Birdwatching"],
      image: ga2,
    },
    {
      title: "Tsingy de Bemaraha",
      city: "Tsingy de Bemaraha",
      description:
        "Visit the unique limestone formations of Tsingy de Bemaraha. Includes scenic viewpoints.",
      attractions: ["Hiking", "Scenic viewpoints", "Guided tour"],
      image: ga3,
    },
    {
      title: "Kivalo",
      city: "Kivalo",
      description:
        "Discover the mangroves and local villages in Kivalo. Boat rides and cultural interactions included.",
      attractions: ["Boat tour", "Village visit", "Cultural experience"],
      image: ga4,
    },
    {
      title: "Zaza Malala",
      city: "Zaza Malala",
      description:
        "Premium tour of Zaza Malala with luxury accommodations and guided excursions.",
      attractions: ["Luxury accommodations", "Guided excursions", "Exclusive experiences"],
      image: ga5,
    },
    {
      title: "Belo-sur-mer",
      city: "Belo-sur-mer",
      description:
        "Explore the coastal village of Belo-sur-mer, learn traditional boat making, and enjoy beach activities.",
      attractions: ["Beach activities", "Village tour", "Boat making demonstration"],
      image: ga7,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {fakeTours.map((tour, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
              <p className="text-gray-700 mb-2">{tour.city}</p>
              <button
                onClick={() => setSelectedTour(tour)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded flex-1 mt-auto"
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal simplified */}
      {selectedTour && (
        <Modal
          isOpen={!!selectedTour}
          onRequestClose={() => setSelectedTour(null)}
          className="fixed inset-0 flex items-center justify-center z-50 outline-none"
          overlayClassName="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        >
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <img
              src={selectedTour.image}
              alt={selectedTour.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">{selectedTour.title}</h2>
            <p className="text-gray-700 mb-4 font-semibold">{selectedTour.city}</p>
            <h3 className="text-xl font-semibold mb-2">Overview</h3>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{selectedTour.description}</p>
            <h3 className="text-xl font-semibold mb-2">Attractions</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedTour.attractions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-green-500"
            >
              &times;
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FeaturedTourList;
