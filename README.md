# IntelliQ Star Wars Custom UI

Welcome to the **IntelliQ Star Wars Custom UI** project! This application uses **Atlassian Forge** to create an interactive UI that fetches Star Wars character data (via the **SWAPI**) and creates **Jira tickets** with character details.

### Table of Contents

- [IntelliQ Star Wars Custom UI](#intelliq-star-wars-custom-ui)
    - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Pre-requisites](#pre-requisites)
  - [Installation](#installation)
  - [Viewing the UI](#viewing-the-ui)
  - [Usage](#usage)
  - [Technologies](#technologies)
  - [Contributing](#contributing)
  - [License](#license)
    - [Acknowledgements](#acknowledgements)

---

## Overview

The **IntelliQ Star Wars Custom UI** is a web application built with **React** that integrates with **Jira** and **SWAPI**. It displays details about a specific Star Wars character and allows users to create a Jira ticket using the character's details. The application uses **Atlassian Forge** for backend logic and APIs.

---

## Features

- **Character Information Display**: View character data such as name, height, mass, hair color, and skin color.
- **Jira Ticket Creation**: Generate Jira tickets with character information.
- **Interactive UI**: Provides a clean, responsive user interface for easy interaction.
- **Error Handling**: Displays error messages if character details or Jira ticket creation fails.
- **Loading State**: Displays a loading message when data is being fetched.

---

## Pre-requisites

Before running the application, you need the following tools set up:

1. **Node.js & npm**: The project uses Node.js. You can download and install it from the [official website](https://nodejs.org/).
2. **Atlassian Forge CLI**: To interact with the Forge platform and deploy the app.
   - Install Forge CLI:  
     `npm install -g @forge/cli`
   - Login to Forge:  
     `forge login`
3. **Jira Cloud Instance**: A Jira Cloud account is required to create tickets. You can sign up for one [here](https://www.atlassian.com/software/jira).

---

## Installation

Follow these steps to install the application locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ivsuleman/intelliq-star-wars-custom-ui.git
   ```

2. **Navigate into the project folder**:

   ```bash
   cd intelliq-star-wars-custom-ui
   ```

3. **Install project dependencies**:

   ```bash
   npm install
   ```

4. **Set up Forge**:

   - If you haven’t already set up Forge, you need to initialize it. Run the following command:

     ```bash
     forge init
     ```

   - Select a suitable template and connect the app to your Jira Cloud instance.

5. **Deploy the application to Forge**:

   ```bash
   forge deploy
   ```

---

## Viewing the UI

Once the app is deployed, you can view it by accessing the provided URL in your browser.

1. **Get the app URL**:

   - After deploying the application, Forge will provide a URL where the app is hosted. You can view the URL in the Forge CLI output.

2. **Open the app**:
   - Visit the provided URL to see the Star Wars character UI. You will be able to see the character details fetched from the SWAPI and interact with the Jira ticket creation feature.

---

## Usage

1. After navigating to the deployed UI, you will see a Star Wars character's details (e.g., Luke Skywalker).
2. Click the **Create Jira Ticket** button to create a Jira ticket using the character's details.
3. Upon success, a message will appear with a clickable Jira ticket link.
4. The link directs you to the newly created Jira ticket in your Jira Cloud instance.

---

## Technologies

- **React**: Front-end framework used to build the UI.
- **Atlassian Forge**: Atlassian Forge is used for backend functionality (resolvers and API requests).
- **Jira API**: REST API to create Jira tickets.
- **SWAPI (Star Wars API)**: Provides data about Star Wars characters.
- **CSS**: Basic styling for the user interface.

---

## Contributing

We welcome contributions to improve this project. If you want to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request with a clear description of what you've changed.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Acknowledgements

- **SWAPI**: Thanks to the [SWAPI](https://swapi.dev/) for providing free Star Wars data.
- **Atlassian Forge**: The Forge platform allows for custom Jira apps and integrations.
