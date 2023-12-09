import { LuSendHorizonal } from 'react-icons/lu';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Popup = ({ onClose, onResponse }) => {
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Simulate fetching data from Chatbase API
      const chatbaseEndpoint = 'https://www.chatbase.co/api/v1/chat';
      const chatbotId = 'YOWjRvRoWkd3BHIDzNd51'; // Replace with your actual Chatbot ID
      const apiKey = '272f571d-4481-4c88-a100-1368bf7a7443'; // Replace with your actual API Key

      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      const requestBody = {
        messages: [
          { content: 'How can I help you?', role: 'assistant' },
          { content: course, role: 'user' },
        ],
        chatbotId: chatbotId,
        stream: false,
        temperature: 0,
        model: 'gpt-3.5-turbo',
        conversationId: '<Generate a unique ID on your end for the conversation>',
      };

      const response = await fetch(chatbaseEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Chatbase API error: ${errorData.message}`);
      }

      const data = await response.json();
      onResponse(data);

      // Capture the HTML content of the response
      const responseElement = document.createElement('div');
      responseElement.innerHTML = data.messages
        .map((message) => `<p>${message.content}</p>`)
        .join('');

      // Use html2canvas to create a canvas from the HTML content
      const canvas = await html2canvas(responseElement);

      // Generate a PDF from the canvas using jsPDF
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);

      // Set the PDF URL and show the download button
      setPdfUrl(url);
      setShowDownloadButton(true);

      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'chatbot_response.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="popup">
      <div className="popup-close">
        <button onClick={onClose}>x</button>
      </div>
      <div className="course-sec">
        <h5 className="popup-heading">Enter A Course Name</h5>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter a query"
            required
          />
          <span className="send-arrow" onClick={handleSendMessage}>
            <LuSendHorizonal style={{ color: 'blue', backgroundColor: 'blue', padding: '5px' }} />
          </span>
        </form>
      </div>
      {showDownloadButton && (
        <div>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
