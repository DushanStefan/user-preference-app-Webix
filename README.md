# User Preferences Page

This project is a **User Preferences Page** built using the **Webix framework**. It allows users to customize their settings, including account details, notifications, themes, and privacy preferences.

## Features
- **Preference Categories:**
  - **Account Settings**: Manage username, email, and password.
  - **Notification Settings**: Control email and push notifications.
  - **Theme Settings**: Customize colors, fonts, and layout.
  - **Privacy Settings**: Manage profile visibility and data sharing.
- **Responsive Design:** Works across desktops, tablets, and mobile devices.
- **Validation & Error Handling:** Ensures data integrity with meaningful error messages.
- **Accessibility:** Supports keyboard navigation and screen readers.
- **Testing:** Includes unit and functional tests for reliability.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/user-preferences-webix.git
   ```
2. Navigate to the project folder:
   ```sh
   cd user-preferences-webix
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run start
   ```

## Usage

- Modify your preferences and save changes.

## Project Structure
```
user-preferences-webix/
│-- src/
│   ├── components/  # Reusable UI components
│   ├── views/       # Webix views for settings
│   ├── styles/      # Custom styling
│   ├── utils/       # Helper functions
│   └── index.js     # Main entry point
│-- tests/           # Unit and functional tests
│-- package.json     # Project dependencies
│-- README.md        # Documentation
```

## Deployment
To deploy the project:
```sh
npm run build
```
This generates a production-ready build in the `dist/` folder.

## Testing
Run tests using:
```sh
npm test
```


