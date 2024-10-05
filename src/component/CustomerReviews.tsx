import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './Navbar.module.css';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  { id: 1, name: 'Alice', rating: 5, comment: 'Fantastic product! Highly recommend.' },
  { id: 2, name: 'Bob', rating: 4, comment: 'Very good, will buy again!' },
  { id: 3, name: 'Charlie', rating: 5, comment: 'Exceeded my expectations!' },
  { id: 4, name: 'Dana', rating: 3, comment: 'It’s okay, nothing special.' },
  { id: 5, name: 'Evan', rating: 5, comment: 'Absolutely love it!' },
];

// Duplicating reviews for seamless scrolling (5 times)
const duplicatedReviews = Array.from({ length: 5 }, () => reviews).flat();

const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <h2 className=" text-3xl md:text-4xl font-extrabold text-green-700 mb-10 text-center tracking-wide">
          Reviews
        </h2>
        <div className="overflow-hidden">
          <div className={`flex space-x-8 ${styles.animateMarquee}`}>
            {duplicatedReviews.map((review, index) => (
              <div
                key={review.id + index}
                className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] bg-white rounded-2xl shadow-xl p-8 mx-2 transition-transform duration-300 hover:shadow-2xl transform-gpu"
              >
                <h3 className="font-semibold text-xl mb-2 text-green-700">{review.name}</h3>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`h-6 w-6 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-green-700 text-md italic mb-4">{`"${review.comment}"`}</p>
                <div className="mt-4 border-t border-gray-300 pt-2">
                  <p className="text-green-700 text-xs uppercase tracking-wide">Customer Review</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
