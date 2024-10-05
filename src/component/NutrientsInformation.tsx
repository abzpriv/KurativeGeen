import React, { useEffect, useState } from 'react';

const nutrientData = [
  { name: 'VITAMIN C', value: '90mg U.S.P' },
  { name: 'VITAMIN D', value: '400 IU U.S.P' },
  { name: 'VITAMIN E', value: '351U U.S.P' },
  { name: 'VITAMIN K', value: '30mcg U.S.P' },
  { name: 'THIAMIN', value: '1.4mg U.S.P' },
  { name: 'RIBOFLAVIN', value: '1.4mg U.S.P' },
  { name: 'NIACIN', value: '18 mg U.S.P' },
  { name: 'VITAMIN B6', value: '1.9 mg U.S.P' },
  { name: 'MYO-INOSITOL', value: '500mg U.S.P' },
  { name: 'FOLIC ACID', value: '800 mcg U.S.P' },
  { name: 'VITAMIN B12', value: '2.6mcg U.S.P' },
  { name: 'BIOTIN', value: '30mcg U.S.P' },
  { name: 'PANTOTHENIC ACID', value: '6 mg U.S.P' },
];

const ingredients = [
  'Zinc: Zinc is an essential mineral that supports your immune system and helps in DNA synthesis and wound healing.',
  'Selenium: A trace mineral important for enzyme function, stimulating antibody production and aiding male fertility.',
  'Copper: Known as the "workhorse mineral," copper supports growth, cardiovascular integrity, nerve health, and helps with iron metabolism.',
  'Manganese: This trace mineral helps form connective tissue, bones, and sex hormones, and regulates blood sugar.',
  'Chromium: Essential for fat and carbohydrate metabolism, chromium helps insulin in controlling blood sugar and may aid in managing type II diabetes.',
  'Biotin: Reduces the risk of birth defects and plays a role in metabolism and cell signaling.',
];

const urduIngredients = [
  'زنک: زنک ایک ضروری معدنیات ہے جو آپ کے مدافعتی نظام کی حمایت کرتا ہے اور ڈی این اے کی ترکیب اور زخموں کے شفا میں مدد کرتا ہے۔',
  'سیلینیئم: ایک سرخی معدنیات جو انزائم کے کام کے لیے اہم ہے، اینٹی باڈی کی پیداوار کو متحرک کرتا ہے اور مردانہ زرخیزی میں مدد کرتا ہے۔',
  'تانبا: "کام کا گھوڑا معدنیات" کے طور پر جانا جاتا ہے، تانبا نمو، قلبی سالمیت، عصبی صحت کی حمایت کرتا ہے اور آئرن کے میٹابولزم میں مدد کرتا ہے۔',
  'مینگنیج: یہ سرخی معدنیات کنیکٹیو ٹشوز، ہڈیاں، اور جنسی ہارمونز کی تشکیل میں مدد کرتا ہے، اور خون کی شکر کو منظم کرتا ہے۔',
  'کرومیم: چربی اور کاربوہائیڈریٹ کے میٹابولزم کے لیے ضروری، کرومیم انسولین کی مدد کرتا ہے خون کی شکر کو کنٹرول کرنے میں اور ٹائپ II ذیابیطس کے انتظام میں مدد کرتا ہے۔',
  'بیوٹین: پیدائشی نقص کے خطرے کو کم کرتا ہے اور میٹابولزم اور سیل سگنلنگ میں کردار ادا کرتا ہے۔',
];

const NutrientInformation: React.FC = () => {
  const [showUrdu, setShowUrdu] = useState(false);

  const toggleTranslation = () => {
    setShowUrdu(!showUrdu);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-10 text-center tracking-wider">
          Nutrient Information
        </h2>
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Nutrient Table */}
          <div className="overflow-hidden shadow-2xl rounded-xl border border-gray-300 w-full sm:w-4/12 mb-8 sm:mb-0">
            <table className="min-w-full table-auto bg-white">
              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="py-3 px-4 text-left text-sm md:text-base font-semibold uppercase tracking-widest">
                    Nutrient
                  </th>
                  <th className="py-3 px-4 text-right text-sm md:text-base font-semibold uppercase tracking-widest">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {nutrientData.map((nutrient, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition-colors duration-300 ease-in-out`}
                  >
                    <td className="py-3 px-4 text-green-800 font-medium text-sm md:text-base">
                      {nutrient.name}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-800 text-sm md:text-base font-semibold">
                      {nutrient.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Ingredients Section */}
<div className="w-full sm:w-5/12">
  <h3 className="text-2xl font-bold text-green-700 mb-6">Ingredients</h3>
  <ul
    className={`list-disc text-gray-800 text-sm md:text-base ${
      showUrdu ? 'text-right rtl list-inside' : 'list-inside'
    }`}
    style={showUrdu ? { direction: 'rtl', listStylePosition: 'inside' } : {}}
  >
    {(showUrdu ? urduIngredients : ingredients).map((ingredient, index) => (
      <li key={index} className={`mb-2 ${showUrdu ? 'pr-10 font-bold leading-6' : ''}`}>
        {ingredient}
      </li>
    ))}
  </ul>
  <button
    className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
    onClick={toggleTranslation}
  >
    {showUrdu ? 'Show English Translation' : 'اردو ترجمہ دکھائیں'}
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default NutrientInformation;
