# GUARD-ON - Facebook Profile Guard Activator

A modern web application for activating Facebook Profile Guard with an aesthetic cyan-themed design.

## Features

- **User Authentication**: Secure login and registration system
- **Token Generation**: Obtain Facebook access tokens securely
- **Profile Guard Activation**: Protect your Facebook profile picture from unauthorized downloads
- **Admin Panel**: Administrators can view and manage all Facebook accounts (admin credentials: Username: divon143, Password: divon1433)
- **Modern UI**: Beautiful cyan-themed dark interface

## Technology Stack

- **Frontend**: React with TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Express.js API server
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth

## Deployment Guide

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/fbguard
SESSION_SECRET=your-session-secret
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/EzekielClervo/GUARD-ON.git
cd GUARD-ON
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npm run db:push
```

4. Start the development server
```bash
npm run dev
```

### Deploying to Render

1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set the following configuration:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Set DATABASE_URL and SESSION_SECRET
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational purposes only. Users are responsible for adhering to Facebook's Terms of Service when using this application.