# CinematicIndex 🎬

A modern, responsive movie discovery application built with Next.js 14, TypeScript, and TMDB API.

## ✨ Features

- **Movie Discovery**: Browse popular and top-rated movies
- **Search Functionality**: Real-time search with debouncing
- **Genre-based Browsing**: Explore movies by genre categories
- **Movie Details**: Comprehensive movie information and recommendations
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Infinite Scroll**: Smooth pagination for movie lists
- **Modern UI**: Clean, modern interface with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript 5.3
- **Styling**: SCSS Modules
- **State Management**: React Hooks
- **API**: TMDB (The Movie Database)
- **HTTP Client**: Axios
- **Animations**: GSAP
- **Code Quality**: ESLint, Prettier

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cinematic-index
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieList/      # Movie grid/list display
│   ├── MoviePage/      # Individual movie details
│   ├── SearchBar/      # Search functionality
│   ├── Header/         # Navigation header
│   └── GenreList/      # Genre browsing
├── pages/              # Next.js pages and routing
├── utils/              # API utilities and helpers
├── data/               # Configuration and interfaces
└── styles/             # SCSS styling
```

## 🎨 Key Components

- **MovieList**: Handles movie display with infinite scroll
- **MoviePage**: Detailed movie information and recommendations
- **SearchBar**: Movie search with debounced input
- **Header**: Navigation with responsive hamburger menu
- **GenreList**: Genre-based movie browsing

## 🔌 API Integration

The app integrates with **The Movie Database (TMDB) API** for:
- Movie data (popular, top-rated, search)
- Movie details and recommendations
- Genre information
- High-quality movie posters and images

## 📱 Responsive Design

- **Desktop**: Full-featured layout with movie grids
- **Tablet**: Optimized for medium screens
- **Mobile**: Touch-friendly interface with hamburger menu

## 🚀 Performance Features

- **Image Optimization**: Optimized movie posters and backdrops
- **Lazy Loading**: Images load as needed
- **Infinite Scroll**: Efficient pagination
- **Code Splitting**: Automatic route-based code splitting
- **TypeScript**: Type safety and better developer experience

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [GSAP](https://greensock.com/gsap/) for smooth animations
