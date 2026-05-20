// TODO Day 1: convert your Stage 1 form HTML to JSX
//             (remember: class → className, self-closing tags need />)
// TODO Day 2: add useState for jobDescription, prompt, file, status
//             make the textareas controlled inputs
// TODO Day 3: add errorMessage and result state
//             complete the handleSubmit function with validation and simulated response
//             add conditional rendering to the results area
// TODO Day 5: move all state and logic to src/hooks/useEvaluator.js
//             import and use the hook here instead
import useEvaluator from '../hooks/useEvaluator'
import { FaHome } from "react-icons/fa";

export default function EvaluatorPage() {
  const {
    jobDescription,
    setJobDescription,
    prompt,
    setPrompt,
    file,
    status,
    errorMessage,
    result,
    handleFileChange,
    handleSubmit,
    footer, setFooter,
  } = useEvaluator()

  return (
    <main>
      <section className="form-section">
        <h2>Evaluate a Resume</h2>
        
        <form id="evaluator-form" onSubmit={handleSubmit}>
          <label>
            Job Description
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          </label>

          <label>
            Custom Prompt (optional)
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          </label>

          <label>
            Upload Resume
            <input type="file" onChange={handleFileChange} />
          </label>

          <button type="submit">Evaluate</button>
        </form>
      </section>

      <section className="results-section">
        <h2>Results</h2>
        <div id="results">
          {status === 'error' && <p className="error-message">{errorMessage}</p>}
          {status === 'loading' && <p>Evaluating resume, please wait...</p>}
          {status === 'success' && result && (
            <pre className="result-output">{result}</pre>
          )}
          {status === 'idle' && <p>Fill the form and click Evaluate to see the results</p>}
        </div>
      </section>
    </main>
  ) 
}
