import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./App.css";

const makeRequestAPI = async (prompt) => {
  const res = await axios.post("http://localhost:8080/generate", { prompt });
  return res.data;
};

function App() {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });
  // The useMutation hook is used to make an API call to the backend server. The makeRequestAPI function is an async function that makes a POST request to the /generate endpoint of the backend server. The mutationKey is a unique identifier for the mutation.

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt); // This will trigger the API call to the backend server and update the state accordingly
  };

  console.log(mutation);

  return (
    <div className="App">
      <header>Gemini AI content Generator</header>
      <p>Enter a prompt and let Gemini AI craft content for you. </p>

      <form className="App-form" onSubmit={submitHandler}>
        <label htmlFor="Enter your prompt:"></label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a content about..."
          className="App-input"
        />
        <button className="App-button" type="submit">
          Generate Content
        </button>
        <section className="App-response">
          {mutation.isPending && <p>Loading...</p>}
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
          {mutation.isSuccess && <p>{mutation.data}</p>}
        </section>
      </form>
    </div>
  );
}

export default App;
