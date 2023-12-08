// CourseButton.jsx
import React, { useState } from "react";
import Popup from "./Popup";

const CourseButton = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleCreateCourseClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div
      className="create-btn-main"
      style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",    
        marginTop: "10px",
      }}
    >
      <button className="course-btn" onClick={handleCreateCourseClick}>
        Create A Course
      </button>

      {isPopupVisible && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default CourseButton;
