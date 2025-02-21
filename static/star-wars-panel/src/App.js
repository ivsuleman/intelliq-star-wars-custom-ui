import React, { useEffect, useState } from "react"
import { invoke } from "@forge/bridge"
import "./App.css"

function App() {
  const [character, setCharacter] = useState(null) //Star Wars character data following SWAPI API fetch
  const [error, setError] = useState(null) // errors from API calls
  const [successMessage, setSuccessMessage] = useState("") // Success message state following Jira API ticket creation
  const [loading, setLoading] = useState(true) // Loading state to handle the UI

  useEffect(() => {
    // Get Star Wars character details
    const fetchCharacter = async () => {
      setLoading(true) // Set loading to true before fetching
      try {
        const data = await invoke("fetchSwCharacter")

        if (!data || data.error) {
          throw new Error("No valid character data received")
        }

        setCharacter(data)
        setError(null) // Reset any previous errors
      } catch (err) {
        setError("Failed to fetch character details.")
      } finally {
        setLoading(false) // Set loading to false after the request
      }
    }

    fetchCharacter()
  }, [])

  // Create Jira ticket function
  const createJiraTicket = async () => {
    try {
      const response = await invoke("createJiraTicket", { character })

      if (response && response.ticketKey.id) {
        const ticketUrl = `https://irfan-suleman.atlassian.net/browse/${response.ticketKey.key}` // Replace 'your-domain' with your Jira instance domain

        setSuccessMessage(
          <>
            ✅ Ticket Created:{" "}
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {response.ticketKey.key}
            </a>
            <p style={{ color: "gray" }}>
              If the link doesn't open automatically, please click the link
              above to view your Jira ticket.
            </p>
          </>
        )
      } else {
        setError("Failed to create Jira ticket.")
      }
    } catch (err) {
      setError("Error creating Jira ticket.")
      console.error(err)
    }
  }

  // Render loading, error, or the character details
  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!character)
    return <div className="error-message">No character data available</div>

  return (
    <div className="container">
      <h2>Star Wars Character</h2>
      <p>
        <strong>Name:</strong> {character.name}
      </p>
      <p>
        <strong>Height:</strong> {character.height} cm
      </p>
      <p>
        <strong>Mass:</strong> {character.mass} kg
      </p>
      <p>
        <strong>Hair Colour:</strong> {character.hair_color}
      </p>
      <p>
        <strong>Skin Colour:</strong> {character.skin_color}
      </p>

      {/* Button to create Jira ticket */}
      <button onClick={createJiraTicket}>Create Jira Ticket</button>

      {/* Show success message if available */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  )
}

export default App
