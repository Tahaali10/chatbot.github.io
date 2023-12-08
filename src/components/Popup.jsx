import { LuSendHorizonal } from "react-icons/lu";
import { useState } from "react";

const Popup = ({ onClose }) => {
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const chatbaseEndpoint = 'https://www.chatbase.co/api/v1/chat';
      const chatbotId = 'YOWjRvRoWkd3BHIDzNd51'; // Replace with your actual Chatbot ID
      const apiKey = '272f571d-4481-4c88-a100-1368bf7a7443'; // Replace with your actual API Key

      const headers = {
        'Authorization': `Bearer ${apiKey}`,
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

      // Ensure that the response is a PDF
      const contentType = response.headers.get('content-type');
      if (contentType === 'application/pdf') {
        const data = await response.blob();

        // Dynamically generate a filename based on the current timestamp
        const timestamp = new Date().getTime();
        const filename = `response_${timestamp}.pdf`;

        var fileURL = URL.createObjectURL(data);
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.download = filename;
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
        console.log('PDF Downloaded successfully');
      } else {
        // Handle non-PDF response
        const errorData = await response.json();
        console.error(`Chatbase API returned non-PDF response: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Chatbase API error:', error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="popup">
      <div className="popup-close">
        <button onClick={onClose}>x</button>
      </div>
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
          <LuSendHorizonal style={{ color: "blue", backgroundColor: "blue", padding: "5px" }} />
        </span>
      </form>
    </div>
  );
};

export default Popup;
