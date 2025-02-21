import Resolver from "@forge/resolver"
import api, { route } from "@forge/api"

const resolver = new Resolver()

// fetch Jira labels from the issue
resolver.define("fetchLabels", async (req) => {
  const key = req.context.extension.issue.key

  // Request Jira API to fetch labels for the issue
  try {
    const res = await api
      .asUser()
      .requestJira(`/rest/api/3/issue/${key}?fields=labels`)

    const data = await res.json()
    const labels = data.fields.labels

    if (!labels) {
      console.warn(`${key}: Failed to find labels`)
      return [] // Return empty array if an error occurs
    }

    return labels // Return labels if found
  } catch (error) {
    console.error(`Error fetching labels for issue ${key}:`, error)
    return [] // Return empty array if an error occurs
  }
})

// function to fetch Star Wars character details from SWAPI
resolver.define("fetchSwCharacter", async () => {
  try {
    // Make the API request to fetch character data from SWAPI (Luke Skywalker)
    const response = await api.fetch("https://swapi.dev/api/people/1/")

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch character data. Status code: ${response.status}`
      )
    }

    // Parse the response body
    const characterData = await response.json()
    return characterData
  } catch (error) {
    throw new Error("Jira API Error: ", error)
  }
})

// function to create a Jira ticket based on the payload passed in
resolver.define("createJiraTicket", async ({ payload }) => {
  const { character } = payload

  try {
    // Prepare the request to create a Jira ticket using the Jira API
    const response = await api.asUser().requestJira(route`/rest/api/3/issue`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          project: { key: "SWK" }, // The Star Wars kanban board
          summary: `Character: ${character.name}`,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  { type: "text", text: `Height: ${character.height} cm` },
                  { type: "hardBreak" },
                  { type: "text", text: `Mass: ${character.mass} kg` },
                  { type: "hardBreak" },
                  { type: "text", text: `Hair Color: ${character.hair_color}` },
                  { type: "hardBreak" },
                  { type: "text", text: `Skin Color: ${character.skin_color}` },
                ],
              },
            ],
          },
          issuetype: { name: "Task" },
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Return error if ticket was not created successfully
      throw new Error(`Jira API Error: ${JSON.stringify(data)}`)
    }

    return { ticketKey: data } // Return successfully created ticket data
  } catch (error) {
    return { error: "Failed to create Jira ticket." }
  }
})

// Export the resolver handler to handle all resolver functions
export const handler = resolver.getDefinitions()
