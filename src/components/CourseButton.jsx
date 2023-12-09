import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";

const CourseButton = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [response, setResponse] = useState(null);

  const handleCreateCourseClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleResponse = (apiResponse) => {
    // Handle the response as needed
    console.log("API Response:", apiResponse);
    setResponse(apiResponse);
  };

  const handleDownloadPDF = () => {
    // Implement download PDF logic if needed
  };

  return (
    <div className="create-btn-main" style={{ marginTop: "10px" }}>
      <button className="course-btn" onClick={handleCreateCourseClick}>
        Create A Course
      </button>

      {isPopupVisible && <Popup onClose={handleClosePopup} onResponse={handleResponse} />}

      {/* Display the response next to the button */}
      {response && (
        <div style={{ marginLeft: "10px", color: "#fff" }}>
          Response: {response.text}
          {response.pdfDownloadLink && (
            <button onClick={handleDownloadPDF}>Download as PDF</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseButton;
