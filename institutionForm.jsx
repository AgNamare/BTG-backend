import React, { useState } from 'react';

const InstitutionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    websiteUrl: '',
    institutionType: '', 
    contactInformation: '',
    enrollmentInfo: '',
    socialMediaLinks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('/api/institutions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const error = await response.json();
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name of Institution:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="websiteUrl" className="block text-gray-700 font-bold mb-2">Website URL:</label>
        <input
          type="url"
          id="websiteUrl"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="institutionType" className="block text-gray-700 font-bold mb-2">Type of Institution:</label>
        <select
          id="institutionType"
          name="institutionType"
          value={formData.institutionType}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Type</option>
          <option value="University">University</option>
          <option value="Technical School">Technical School</option>
          <option value="Online Learning Platform">Online Learning Platform</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="contactInformation" className="block text-gray-700 font-bold mb-2">Contact Information:</label>
        <input
          type="text"
          id="contactInformation"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="enrollmentInfo" className="block text-gray-700 font-bold mb-2">Enrollment Info:</label>
        <textarea
          id="enrollmentInfo"
          name="enrollmentInfo"
          value={formData.enrollmentInfo}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="socialMediaLinks" className="block text-gray-700 font-bold mb-2">Social Media Links:</label>
        <input
          type="text"
          id="socialMediaLinks"
          name="socialMediaLinks"
          value={formData.socialMediaLinks}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
  );
};

export default InstitutionForm;
