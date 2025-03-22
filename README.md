# SensafrIQ - African Trivia Platform

SensafrIQ is a comprehensive, engaging, and gamified trivia platform focused on African-themed content. Test your knowledge about African history, geography, culture, and more through interactive quizzes and challenges.

## Features

- User authentication and profiles
- Diverse quiz categories about Africa
- Multiple question types (multiple-choice, true/false, etc.)
- Leaderboards and user rankings
- Achievement system and points
- Quiz creation tools
- Mobile-responsive design

## Tech Stack

- **Frontend**: React.js, Redux, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sensafriq.git
   cd sensafriq
   ```

2. Install dependencies:

   ```bash
   npm run install-all
   ```

3. Set up environment variables:

   - Create a `.env` file in the server directory based on the `.env.example` file
   - Configure your PostgreSQL database connection

4. Create the database:

   ```bash
   psql -U postgres
   CREATE DATABASE sensafriq;
   \q
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Project Structure

```
sensafriq/
├── client/               # React frontend
│   ├── public/           # Static files
│   └── src/              # Source files
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── store/        # Redux store
│       ├── services/     # API services
│       └── styles/       # Global styles and theme
├── server/               # Node.js backend
│   └── src/
│       ├── config/       # Configuration files
│       ├── controllers/  # Route controllers
│       ├── models/       # Sequelize models
│       ├── routes/       # API routes
│       └── middlewares/  # Express middlewares
└── package.json          # Project dependencies and scripts
```

## API Documentation

The API documentation can be accessed at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) when running the server locally.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
