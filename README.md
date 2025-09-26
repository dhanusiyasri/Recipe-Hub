# Recipe Hub - Single Page Application (SPA)

A modern, responsive recipe application built with vanilla JavaScript, HTML, and CSS that demonstrates core web development concepts in a cooking-themed interface.

## 🚀 Features

- **Interactive Recipe Cards**: Flip animation to reveal additional recipe information
- **Smart Search & Filtering**: Search by recipe name, description, or ingredients with category filtering
- **Favorites System**: Save and manage favorite recipes with persistent local storage
- **Star Rating System**: Rate recipes with 1-5 star ratings
- **Cooking Timer**: Integrated countdown timer on recipe detail pages
- **Responsive Design**: Mobile-friendly layout using CSS Grid and Flexbox
- **Client-Side Routing**: Seamless navigation with browser history management
- **No Backend Required**: All data managed locally with JavaScript arrays

## 📁 Project Structure

```
recipe-hub/
├── index.html          # Main HTML structure
├── style.css           # Complete styling with modern UI
├── app.js              # Core application logic
└── README.md           # This file
```

## 🛠️ Technical Implementation

### Core Technologies
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks or external dependencies

### Key JavaScript Features
- **View Management**: Toggle between list, detail, and about views
- **Local Storage**: Persistent favorites and ratings data
- **Event Handling**: Comprehensive click, input, and history management
- **Timer System**: Pause/resume functionality with accurate countdown

### CSS Highlights
- **Card Flip Animation**: 3D transform effects for recipe cards
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Modern Design**: Clean typography, color scheme, and visual hierarchy

## 🍳 Recipe Data Structure

Recipes are stored in a JavaScript array with the following properties:

```javascript
{
    id: '101',
    name: 'Grandma\'s Meatloaf',
    shortDescription: 'Classic comfort food',
    thumbnailUrl: 'https://example.com/image.jpg',
    prepTime: '15 min',
    cookTime: '60 min',
    servingSize: '6 people',
    category: 'Non-veg',
    ingredients: ['ingredient1', 'ingredient2'],
    instructions: ['Step 1', 'Step 2']
}
```

## 🎯 How to Use

1. **Browse Recipes**: View all recipes on the home page
2. **Search & Filter**: Use the search bar and category filters
3. **Flip Cards**: Click any recipe card to see additional details
4. **Save Favorites**: Click the heart icon to save recipes
5. **Rate Recipes**: Click stars to assign ratings (1-5)
6. **View Details**: Click "View Full Recipe" for complete instructions
7. **Use Timer**: Start the cooking timer on detail pages

## 🔧 Customization

### Adding New Recipes
Edit the `RECIPES` array in `app.js`:

```javascript
const RECIPES = [
    // Add new recipe objects here
    {
        id: '107',
        name: 'Your Recipe Name',
        // ... other properties
    }
];
```

### Styling Modifications
- **Colors**: Update CSS custom properties in `style.css`
- **Layout**: Modify grid and flexbox configurations
- **Animations**: Adjust transition durations and effects

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Breakpoints

The application is optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🚀 Getting Started

1. Download all project files
2. Open `index.html` in a web browser
3. No build process or dependencies required

## 💡 Learning Objectives

This project demonstrates:
- Single Page Application (SPA) architecture
- Client-side state management
- DOM manipulation without frameworks
- CSS Grid and Flexbox layouts
- Local Storage API usage
- Browser History API integration
- Event delegation patterns
- Responsive design principles

## 📄 License

This project is for educational purposes. Recipe content and images are for demonstration only.

---

**Demo Note**: This is a frontend-only demonstration project. All data persists in browser local storage and resets when cleared.
