import React from 'react';

const Portal = () => {
  const cards = [
    { title: 'Application', link: '/application' },
    { title: 'Call Back Request', link: '/callback' },
    { title: 'Product Contact', link: '/product-contact' },
    { title: 'Referral Claim', link: '/referral-claim' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Main content */}
      <main className="flex flex-col items-center justify-center py-12 px-4">
        <h2 className="text-xl font-semibold mb-8 text-gray-800">Select an Option</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center border border-gray-200 hover:border-[#ea5430]"
            >
              <h3 className="text-lg font-medium text-gray-700 hover:text-[#ea5430]">{card.title}</h3>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Portal;
