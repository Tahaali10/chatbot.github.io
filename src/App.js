// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbox from './components/Chatbox';
import CourseButton from './components/CourseButton';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import CourseCreation from "./components/CourseCreation";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <Sidebar />
          <Chatbox />
        </main>
        {/* <Routes>
          <Route path="/response" element={<CourseCreation />} />
        </Routes> */}
        <CourseButton />
      </div>
    </Router>
  );
}

export default App;
