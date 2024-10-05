'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from './Footer';
import Navbar from './Navbar';
import { StaticImageData } from 'next/image';

type CartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: StaticImageData;
};

const ContactUs = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('')

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setSuccessMessage('');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Email sent successfully');
          formik.resetForm(); 
          setSuccessMessage('Your message has been sent successfully!'); 
        } else {
          console.error('Error sending email:', await response.json());
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <section>
        <Navbar cart={cart} setCart={setCart} />
      </section>

      <section className="bg-gradient-to-r from-white via-gray-100 mt-16 lg:mt-36 to-green-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-7xl mx-auto">
            {/* Left Section: Map and Address */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">
              <h2 className="text-4xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-lg mb-4">
                We`re located at: <br />
                123 Health St, Wellness City, State, 12345
              </p>

              <iframe
                className="w-full h-64 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8401088798496!2d144.9581014153166!3d-37.81732797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57776940f3d430!2sMelbourne%20CBD%2C%20VIC!5e0!3m2!1sen!2sau!4v1631493036477!5m2!1sen!2sau"
                allowFullScreen={false}
                loading="lazy"
                title="Company Location"
              ></iframe>
            </div>

            {/* Right Section: Contact Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-white">
              <h2 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-4  bg-white border ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-500 transition`}
                    required
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-2">{formik.errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-4 bg-white border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-500 transition`}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-4 bg-white border ${
                      formik.touched.subject && formik.errors.subject
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-500 transition`}
                    required
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm mt-2">{formik.errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full p-4 bg-white border ${
                      formik.touched.message && formik.errors.message
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-green-500 transition min-h-[150px] max-h-[400px]`}
                    rows={6}
                    required
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-2">{formik.errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-4 rounded-lg text-white transition-transform transform ${
                    loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'
                  }`}
                  disabled={loading} 
                >
                  {loading ? 'Processing...' : 'Send Message'}
                </button>

                {/* Success Message */}
                {successMessage && (
                  <p className="text-green-600 mt-4">{successMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </section>
  );
};

export default ContactUs;
