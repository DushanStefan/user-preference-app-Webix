# User Preferences Page

This project is a **User Preferences Page** built using the **Webix framework** for the frontend and **Django REST Framework** for the backend. It allows users to customize their settings, including account details, notifications, themes, and privacy preferences.

## Features

### Preference Categories:
- **Account Settings**: Manage username, email, and password.
- **Notification Settings**: Control email and push notifications.
- **Theme Settings**: Customize colors, fonts, and layout.
- **Privacy Settings**: Manage profile visibility and data sharing.

### General Features:
- **Responsive Design**: Works across desktops, tablets, and mobile devices.
- **Validation & Error Handling**: Ensures data integrity with meaningful error messages.
- **Accessibility**: Supports keyboard navigation and screen readers.
- **Testing**: Includes unit and functional tests for reliability.

---

## Installation
### Frontend (Webix)

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/user-preferences-webix.git
    ```
2. Navigate to the project folder:
    ```sh
    cd user-preference-app-Webix/clientSide_Webix
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm run start
    ```

### Backend (Django)

1. Install dependencies:
    ```sh
    pip install djangorestframework djangorestframework-simplejwt django django-cors-headers
    ```
2. Apply migrations:
    ```sh
    python manage.py migrate
    ```
3. Start the backend server:
    ```sh
    python manage.py runserver
    ```



---

## Project Structure

```
user-preferences-webix/
│-- backend/           # Django REST framework backend
│   ├── accounts/      # User authentication & management
│   ├── settings.py    # Backend configuration
│   ├── urls.py        # API endpoints
│   ├── manage.py      # Django management script
│-- frontend/          # Webix frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── views/       # Webix views for settings
│   │   ├── styles/      # Custom styling
│   │   ├── utils/       # Helper functions
│   │   └── index.js     # Main entry point
│   ├── package.json     # Frontend dependencies
│   ├── tests/           # Unit and functional tests
│-- README.md            # Documentation
```

---

## Testing



### Frontend Tests
Run the frontend tests:
```sh
npm test


