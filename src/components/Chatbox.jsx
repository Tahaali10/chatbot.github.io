import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

const Chatbox = () => {
  const [question, setQuestion] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const chatbaseEndpoint = 'https://www.chatbase.co/api/v1/chat';
    const chatbotId = '03DWyEsy-Rh1mGLv2oQCd'; // Replace with your actual Chatbot ID
    const apiKey = '272f571d-4481-4c88-a100-1368bf7a7443'; // Replace with your actual API Key

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const requestBody = {
      messages: [
        { content: 'How can I help you?', role: 'assistant' },
        { content: question, role: 'user' }
      ],
      chatbotId: chatbotId,
      stream: false,
      temperature: 0,
      model: 'gpt-3.5-turbo',
      conversationId: '<Generate a unique ID on your end for the conversation>',
    };

    try {
      const response = await fetch(chatbaseEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setApiResponse(data); // Store the API response in the state
    } catch (error) {
      console.error('Chatbase API error:', error.message);
      // Handle error gracefully, update state, show error message, etc.
    } finally {
      setLoading(false);
      setShowQuestion(true);
    }
  };

  return (
    <section className="chatbox">
      <article>
        {showQuestion ? (
          <div className="prompt">
            <h2>{question}</h2>
            <div className="box">
              <p>
                {/* Display the response from Chatbase */}
                {/* You can customize how you want to display the chatbot's reply */}
                {/* For example: */}
                {loading ? 'Loading...' : apiResponse ? apiResponse.text : 'Chatbot response goes here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="default">
            <h1>Hi there,</h1>
            <p>Tell me how can I help you</p>
          </div>
        )}
      </article>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter a query"
          required
        />
        <span onClick={handleSubmit} className="send-arrow">
          <LuSendHorizonal
            style={{ color: "blue", backgroundColor: "blue", padding: "5px"}}
          />
        </span>
      </form>

      {loading && (
        <div className="loader-section">
          <div className="loader">
            <ClipLoader color="#000000" loading={loading} /> <p>Loading.....</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Chatbox;
