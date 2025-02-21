import Resolver from "@forge/resolver"
import api, { route } from "@forge/api"

const resolver = new Resolver()

// Fetch Jira labels from the issue
resolver.define("fetchLabels", async (req) => {
  const key = req.context.extension.issue.key

  try {
    const res = await api
      .asUser()
      .requestJira(`/rest/api/3/issue/${key}?fields=labels`)

    const data = await res.json()
    const labels = data.fields.labels

    if (!labels) {
      console.warn(`${key}: Failed to find labels`)
      return []
    }

    return labels // Return the list of labels
  } catch (error) {
    console.error(`Error fetching labels for issue ${key}:`, error)
    return [] // Return empty array if there's an error
  }
})

// A simple resolver function to return a text
resolver.define("getText", (req) => {
  console.log(req)
  return "Hello, world!"
})

// a resolver function to fetch Star Wars character details
resolver.define("fetchSwCharacter", async () => {
  try {
    // Make the API request to SWAPI
    const response = await api.fetch("https://swapi.dev/api/people/1/") // Luke Skywalker endpoint

    // Log the status and headers to check the response
    console.log("Response Status:", response.status)
    console.log("Response Headers:", response.headers)

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch character data. Status code: ${response.status}`
      )
    }

    // Parse the response body
    const characterData = await response.json()
    console.log("Character Data:", characterData) // Log the character data for debugging

    return characterData

    // You can process the character data, e.g., display or create Jira ticket
  } catch (error) {
    console.error("Error fetching data:", error)
  }
})

// Export the resolver handler to handle all resolver functions
export const handler = resolver.getDefinitions()
