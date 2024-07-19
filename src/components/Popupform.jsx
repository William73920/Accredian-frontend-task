// src/components/PopupForm.js
import React, { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopupForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!name || !email || !referredBy || !course) {
        setErrors({
          name: name ? "" : "Name is required",
          email: email ? "" : "Email is required",
          referredBy: referredBy ? "" : "Referred by is required",
          course: course ? "" : "Course is required",
        });

        setLoading(false);
        return;
      }

      setErrors({});

      axios
        .post(
          "https://accredian-backend-task-frf1.onrender.com/api/referrals",
          {
            name,
            email,
            referredBy,
            course,
          }
        )
        .then((response) => {
          setErrors({});
          setName("");
          setEmail("");
          setReferredBy("");
          setCourse("");
          setLoading(false);
          toast.success("Referral email sent successfully");
          onClose();
        })
        .catch((error) => {
          setErrors(error.response.data.errors);
          setLoading(false);
          toast.error(error?.response?.data?.message);
        });
    } catch (error) {
      setErrors(error.response.data.errors);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Refer Someone</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
            />
            {errors.name && <p className="text-red-500">{errors?.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
            />
            {errors.email && <p className="text-red-500">{errors?.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="referredBy">
              Referred By
            </label>
            <input
              type="text"
              id="referredBy"
              value={referredBy}
              onChange={(e) => setReferredBy(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
            />
            {errors.referredBy && (
              <p className="text-red-500">{errors?.referredBy}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 mb-1 font-medium"
              htmlFor="course"
            >
              Course
            </label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select a course
              </option>
              <option value="Product-Management">Product Management</option>
              <option value="Business-Management">Business Management</option>
              <option value="Data-Science">Data Science</option>
            </select>
            {errors.course && <p className="text-red-500">{errors?.course}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
