import React, { useEffect, useState } from "react"
import { events, invoke } from "@forge/bridge"

function App() {
  // const [data, setData] = useState(null)
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("") // ✅ Declare successMessage state

  // useEffect(() => {
  //   invoke("getText", { example: "my-invoke-variable" }).then(setData)
  // }, [])

  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>.. useEffect is running")
    const fetchCharacter = async () => {
      try {
        if (!invoke) {
          throw new Error("🚀 Forge invoke is not defined!")
        }
        console.log("🚀 Fetching character from resolver...")

        const data = await invoke("fetchSwCharacter")

        console.log("🚀 IRFAN-LOG - Received Data:", data)

        if (!data || data.error) {
          throw new Error("No valid character data received")
        }

        setCharacter(data)
      } catch (err) {
        setError("Failed to fetch character details.")
        console.error("🚀 Error:", err)
      }
    }

    fetchCharacter()
  }, [])

  // ✅ Function to create a Jira ticket
  const createJiraTicket = async () => {
    try {
      const response = await invoke("createJiraTicket", { character })
      console.log("Ticket Response:", response)
      console.log("Ticket ID:", response.ticketKey.id)

      if (response && response.ticketKey.id) {
        console.log(
          "🚀 IRFAN-LOG - App.js:48 - createJiraTicket - response.id:",
          response.ticketKey.id
        )
        setSuccessMessage(`✅ Ticket Created: ${response.ticketKey.key}`) // ✅ Update success message
      } else {
        setError("Failed to create Jira ticket.")
      }
    } catch (err) {
      setError("Error creating Jira ticket.")
      console.error(err)
    }
  }

  if (error) return <div>{error}</div>
  if (!character) return <div>Loading...</div>

  return (
    <div>
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

      {/* ✅ Button to create a Jira ticket */}
      <button onClick={createJiraTicket}>Create Jira Ticket</button>

      {/* ✅ Show success message if available */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  )
}

export default App
