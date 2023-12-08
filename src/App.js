import Chatbox from './components/Chatbox';
import CourseButton from './components/CourseButton';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <Sidebar />
          <Chatbox />
        </main>
        <CourseButton/>
      </div>
    </>
  );
}

export default App;
