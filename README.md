# Boda de Karla & Juan - Wedding Website

An elegant wedding website built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 💌 **Animated Envelope Opening**: A beautiful initial experience.
- ⏳ **Countdown Timer**: Real-time countdown to the big day.
- 📍 **Venue Details**: Location info with Google Maps integration and calendar export.
- 🕒 **Timeline**: Interactive schedule of the day.
- 🎁 **Gifts Section**: Expandable bank details with copy functionality.
- 📝 **RSVP Form**: Connected to Supabase for real-time guest management.
- 🎵 **Background Music**: Auto-playing piano music with controls.

## Setup Instructions

### 1. Prerequisites

- Node.js (v18 or higher)
- A Supabase account

### 2. Installation

```bash
npm install
```

### 3. Supabase Configuration

1. Create a new project at [database.new](https://database.new).
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the content of `supabase/migrations/20240101000000_create_rsvp_table.sql` and run it.
   - This will create the `rsvp_responses` table and set up Row Level Security (RLS) policies.
4. Go to **Project Settings > API**.
5. Copy the `Project URL` and `anon` public key.

### 4. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the website.

## Technologies

- React + Vite
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Supabase
- React Hook Form
