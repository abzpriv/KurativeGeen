import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is Daily Pink?',
    answer: 'Daily Pink is a comprehensive multivitamin supplement designed to support overall health and well-being.',
    translatedQuestion: 'ڈیلی پنک کیا ہے؟',
    translatedAnswer: 'ڈیلی پنک ایک مکمل ملٹی وٹامن سپلیمنٹ ہے جو صحت اور تندرستی کی حمایت کے لیے ڈیزائن کیا گیا ہے۔'
  },
  {
    question: 'How should I take Daily Pink?',
    answer: 'Take Daily Pink as directed by your doctor, usually with or without food.',
    translatedQuestion: 'ڈیلی پنک کیسے لینی ہے؟',
    translatedAnswer: 'ڈیلی پنک کو اپنے ڈاکٹر کی ہدایت کے مطابق لیں، عموماً کھانے کے ساتھ یا بغیر۔'
  },
  {
    question: 'Can Daily Pink be taken by pregnant women?',
    answer: 'Yes, Daily Pink is formulated to support the health of pregnant women, including folic acid and essential nutrients.',
    translatedQuestion: 'کیا حاملہ خواتین ڈیلی پنک لے سکتی ہیں؟',
    translatedAnswer: 'جی ہاں، ڈیلی پنک حاملہ خواتین کی صحت کی حمایت کے لیے بنایا گیا ہے، جس میں فولک ایسڈ اور اہم غذائی اجزاء شامل ہیں۔'
  },
  {
    question: 'What are the benefits of Vitamin C in Daily Pink?',
    answer: 'Vitamin C helps support immune health, promotes skin healing, and functions as an antioxidant.',
    translatedQuestion: 'ڈیلی پنک میں وٹامن سی کے فوائد کیا ہیں؟',
    translatedAnswer: 'وٹامن سی مدافعتی صحت کی حمایت، جلد کی شفا یابی میں مدد کرتا ہے، اور اینٹی آکسیڈنٹ کی حیثیت سے کام کرتا ہے۔'
  },
  {
    question: 'How does Daily Pink support immune function?',
    answer: 'It contains essential nutrients such as Zinc and Vitamin C, which help strengthen immune responses.',
    translatedQuestion: 'ڈیلی پنک مدافعتی نظام کی حمایت کیسے کرتا ہے؟',
    translatedAnswer: 'اس میں زنک اور وٹامن سی جیسے اہم غذائی اجزاء شامل ہیں، جو مدافعتی ردعمل کو مضبوط کرنے میں مدد کرتے ہیں۔'
  },
  // Add more questions here...
];

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isUrdu, setIsUrdu] = useState<boolean>(false); // State to toggle language

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleLanguage = () => {
    setIsUrdu(!isUrdu);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-12 text-center tracking-wider">
          Frequently Asked Questions
        </h2>
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-white bg-green-700 rounded-md focus:outline-none"
          >  
            {isUrdu ? 'Show English Translation' : 'اردو ترجمہ دکھائیں'}
          </button>
        </div>

        <div className="divide-y divide-gray-300 shadow-2xl rounded-xl border border-gray-300 bg-gradient-to-t from-white to-green-50">
          {faqs.map((faq, index) => (
            <div key={index} className="transition-all duration-500">
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full py-5 px-8 font-semibold text-lg md:text-xl focus:outline-none flex items-center justify-between transition-colors duration-300 ${
                  openIndex === index ? 'bg-green-100' : 'hover:bg-green-50'
                } ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <span className={`${isUrdu ? 'ml-4' : 'mr-4'} text-green-800`}>
                  {isUrdu ? faq.translatedQuestion : faq.question}
                </span>
                <span>
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`${
                  openIndex === index ? 'block' : 'hidden'
                } bg-white border-t border-gray-200 transition-all duration-300 ease-in-out`}
              >
                <p className={`py-5 px-8 text-gray-700 text-base md:text-lg ${isUrdu ? 'text-right' : 'text-left'}`}>
                  {isUrdu ? faq.translatedAnswer : faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
