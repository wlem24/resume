import { useState } from 'react'

export default function useEvaluator() {
  const [jobDescription, setJobDescription] = useState('')
  const [prompt, setPrompt] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [result, setResult] = useState('')

  function handleFileChange(event) {
    setFile(event.target.files[0] || null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setResult('')

    if (!jobDescription.trim()) {
      setErrorMessage('Please enter the job description before evaluating.')
      setStatus('error')
      return
    }

    if (!file) {
      setErrorMessage('Please upload a resume file to evaluate.')
      setStatus('error')
      return
    }

    setStatus('loading')

    await new Promise((resolve) => setTimeout(resolve, 900))

    const score = Math.floor(Math.random() * 31) + 70
    const recommendedAction = score >= 85 ? 'This resume is a strong match.' : score >= 75 ? 'This resume is a good match with room for improvement.' : 'This resume could be stronger for this role.'

    setResult(
      `Evaluation complete for ${file.name}.\n` +
        `Score: ${score}/100\n` +
        `Recommendation: ${recommendedAction}\n` +
        `Job description summary: ${jobDescription.slice(0, 120)}${jobDescription.length > 120 ? '...' : ''}` +
        (prompt.trim() ? `\nCustom prompt: ${prompt}` : '')
    )
    setStatus('success')
  }

  return {
    jobDescription,
    setJobDescription,
    prompt,
    setPrompt,
    file,
    setFile,
    status,
    errorMessage,
    result,
    handleFileChange,
    handleSubmit,
  }
}
