import React, { useEffect, useState } from "react"
import { events, invoke } from "@forge/bridge"

function App() {
  // const [data, setData] = useState(null)
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(null)

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
    </div>
  )
}

export default App
