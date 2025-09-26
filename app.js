// --- Master Recipe Data (Simulating a Database) ---
const RECIPES = [
    {
        id: '101',
        name: 'Grandma\'s Meatloaf',
        shortDescription: 'The classic, comforting meatloaf your family will request again and again.',
        thumbnailUrl: 'https://www.onceuponachef.com/images/2016/01/italian-meatloaf-2-1120x745.jpg', 
        prepTime: '15 min',
        cookTime: '60 min',
        servingSize: '6 people',
        category: 'Non-veg',
        ingredients: ['1 lb ground beef', '1 cup bread crumbs', '1/2 cup milk', '1 egg', 'Ketchup glaze'],
        instructions: ['Preheat oven to 350°F.', 'Mix all ingredients (except glaze) by hand.', 'Form into a loaf.', 'Spread glaze on top.', 'Bake for 1 hour.'],
    },
    {
        id: '102',
        name: 'Lemon Garlic Shrimp Pasta',
        shortDescription: 'A light, bright, and quick weeknight seafood favorite.',
        thumbnailUrl: 'https://www.walderwellness.com/wp-content/uploads/2024/03/Lemon-Garlic-Shrimp-Pasta-Walder-Wellness-5-1024x1536.jpg',
        prepTime: '10 min',
        cookTime: '15 min',
        servingSize: '4 people',
        category: 'Non-veg',
        ingredients: ['1 lb linguine', '1 lb shrimp', '4 cloves garlic', 'Lemon juice', 'Butter and olive oil'],
        instructions: ['Cook pasta.', 'Sauté garlic and shrimp in butter/oil.', 'Toss with cooked pasta, lemon juice, salt, and pepper.'],
    },
    {
        id: '103',
        name: 'Triple Chocolate Brownies',
        shortDescription: 'Fudgy, chewy, and loaded with three kinds of chocolate chips.',
        thumbnailUrl: 'https://cdn-productdbimages.barry-callebaut.com/sites/default/files/styles/web_gm_vhp-detail/public/externals/c5cdd6793332306fe04604d6aca1ca20.png?itok=vzXhEMX6',
        prepTime: '20 min',
        cookTime: '30 min',
        servingSize: '16 brownies',
        category: 'Dessert',
        ingredients: ['1 cup butter', '1 1/2 cups sugar', '3 eggs', '1 cup cocoa powder', 'Chocolate chips (milk, dark, white)'],
        instructions: ['Melt butter.', 'Mix with sugar and eggs.', 'Add cocoa and flour.', 'Fold in chips.', 'Bake at 325°F for 30 min.'],
    },
    {
        id: '104',
        name: 'Spicy Veggie Tacos',
        shortDescription: 'Quick, spicy, and packed with colorful vegetables.',
        thumbnailUrl: 'https://i0.wp.com/s.lightorangebean.com/media/20240914145357/veggie-bean-tacos_done.png?fit=1376%2C864&amp;quality=80&amp;ssl=1',
        prepTime: '10 min',
        cookTime: '15 min',
        servingSize: '4 people',
        category: 'Veg',
        ingredients: ['1 can black beans', '1 bell pepper', '1 onion', 'Taco shells', 'Salsa'],
        instructions: ['Sauté onion and pepper.', 'Add beans and heat through.', 'Serve in tacos with salsa.'],
    },
    {
        id: '105',
        name: 'Crispy Samosas',
        shortDescription: 'Delicious, deep-fried pastries filled with spicy potatoes.',
        thumbnailUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe-500x375.jpg',
        prepTime: '20 min',
        cookTime: '20 min',
        servingSize: '10 pieces',
        category: 'Snacks',
        ingredients: ['2 cups all-purpose flour', '2 tbsp oil', '1/2 tsp salt', '2 boiled potatoes', '1 tsp cumin powder'],
        instructions: ['Knead dough with flour, oil, salt, and water.', 'Prepare filling with mashed potatoes and spices.', 'Fill and fold dough.', 'Deep fry until golden brown.'],
    },
    {
        id: '106',
        name: 'Tropical Fruit Smoothie',
        shortDescription: 'A refreshing and healthy drink to start your day.',
        thumbnailUrl: 'https://www.heinens.com/content/uploads/2021/12/800x550_Tropical-Fruit-Smoothie-1.jpg', 
        prepTime: '5 min',
        cookTime: '0 min',
        servingSize: '1 serving',
        category: 'Drinks',
        ingredients: ['1 cup mango chunks', '1 banana', '1/2 cup pineapple', '1 cup milk'],
        instructions: ['Combine all ingredients in a blender.', 'Blend until smooth.', 'Pour into a glass and enjoy.'],
    },
];

// --- Utility Functions for LocalStorage (Favorites & Ratings) ---

const getAppData = () => {
    const data = localStorage.getItem('arCloneAppData');
    return data ? JSON.parse(data) : { favorites: [], ratings: {} };
};

const saveAppData = (appData) => {
    localStorage.setItem('arCloneAppData', JSON.stringify(appData));
};

const getFavorites = () => getAppData().favorites;

const toggleFavorite = (recipeId) => {
    const appData = getAppData();
    const index = appData.favorites.indexOf(recipeId);

    if (index === -1) {
        appData.favorites.push(recipeId);
    } else {
        appData.favorites.splice(index, 1);
    }
    saveAppData(appData);
    return appData.favorites.includes(recipeId);
};

const updateRating = (recipeId, rating) => {
    const appData = getAppData();
    appData.ratings[recipeId] = rating;
    saveAppData(appData);
};

// --- View Rendering and Logic ---

/** Switches between views and manages browser history. */
let timerInterval;

const toggleView = (viewType, recipeId = null, pushState = true) => {
    const listView = document.getElementById('recipe-list-view');
    const detailView = document.getElementById('recipe-detail-view');
    const aboutView = document.getElementById('about-view'); // Added for About page

    // 1. Hide ALL main views
    listView.classList.add('hidden');
    detailView.classList.add('hidden');
    aboutView.classList.add('hidden');
    
    // Stop the timer when navigating away from the detail view
    clearInterval(timerInterval);
    
    // Reset active state for all navigation links
    document.querySelectorAll('nav a').forEach(btn => btn.classList.remove('active'));

    // 2. Show the requested view
    if (viewType === 'detail' && recipeId) {
        detailView.classList.remove('hidden');
        renderRecipeDetail(recipeId);
        if (pushState) {
            history.pushState({ view: 'detail', recipeId: recipeId }, '', `#recipe/${recipeId}`);
        }
    } else if (viewType === 'about') { // About page logic
        aboutView.classList.remove('hidden');
        renderAboutPage();
        document.getElementById('about-link').classList.add('active');
        if (pushState) {
            history.pushState({ view: 'about' }, '', '#about');
        }
    } else { // 'home' or 'favorites' view (list view)
        listView.classList.remove('hidden');
        
        const filter = document.querySelector('.filter-btn.active')?.dataset.category || 'All';
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        
        if (viewType === 'favorites') {
             if (pushState) {
                history.pushState({ view: 'favorites' }, '', '#favorites');
            }
            // Temporarily set filter to All and clear search for the favorites view header text
            renderRecipeList('All', '', true); 
            document.getElementById('recipes-link').classList.remove('active');
            document.getElementById('favorites-link').classList.add('active');
        } else { // 'home'
            if (pushState) {
                history.pushState({ view: 'home' }, '', '#home');
            }
            // Use current filter and search term
            const activeFilterButton = document.querySelector('#filter-bar .filter-btn.active');
            const currentCategory = activeFilterButton ? activeFilterButton.dataset.category : 'All';
            
            renderRecipeList(currentCategory, searchTerm);
            
            document.getElementById('recipes-link').classList.add('active');
            document.getElementById('favorites-link').classList.remove('active');
        }
    }
};

/** Renders the star rating HTML based on the recipe's saved rating. */
const renderStars = (recipeId) => {
    const appData = getAppData();
    const currentRating = appData.ratings[recipeId] || 0;
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= currentRating ? 'fas fa-star' : 'far fa-star';
        starsHtml += `<i class="${starClass}" data-rating="${i}"></i>`;
    }
    
    return starsHtml;
};

/** Creates a single HTML card element with a flip effect. */
const createRecipeCard = (recipe) => {
    const appData = getAppData();
    const isFavorite = appData.favorites.includes(recipe.id);
    const container = document.createElement('div');
    container.classList.add('recipe-card-container');
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    // --- CARD FRONT (Recipe Listing Data) ---
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-face-front');
    // Using thumbnailUrl for background image
    cardFront.innerHTML = `
        <div class="recipe-thumbnail" style="background-image: url('${recipe.thumbnailUrl}');"></div> 
        <div class="card-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <p class="description">${recipe.shortDescription}</p>
            <div class="star-rating">
                ${renderStars(recipe.id)}
            </div>
            <div class="card-footer">
                <span class="time-label">${recipe.prepTime} Prep</span>
                <button class="favorite-btn" data-id="${recipe.id}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    `;

    // --- CARD BACK (Additional Metadata/Link) ---
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-face-back');
    cardBack.innerHTML = `
        <h4>${recipe.name}</h4>
        <ul class="back-meta-data">
            <li><i class="fas fa-fire"></i> Cook Time: ${recipe.cookTime}</li>
            <li><i class="fas fa-utensils"></i> Serves: ${recipe.servingSize}</li>
            <li><i class="fas fa-tag"></i> Category: ${recipe.category}</li>
            <li><i class="fas fa-star"></i> Rating: ${appData.ratings[recipe.id] || 0}/5</li>
        </ul>
        <a class="back-link">
            View Full Recipe Details →
        </a>
    `;

    // Assemble the card
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    container.appendChild(card);
    
    // 1. CLICK TO FLIP LOGIC
    container.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn') || e.target.closest('.star-rating i') || e.target.classList.contains('back-link')) {
             return; 
        }
        card.classList.toggle('flipped');
    });

    // 2. Favorite button: Ensure functionality and stop propagation
    const favBtn = cardFront.querySelector('.favorite-btn');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const newStatus = toggleFavorite(recipe.id);
        e.target.innerHTML = newStatus ? '❤️' : '🤍';
        const mainTitle = document.querySelector('#recipe-list-view h2');
        if (mainTitle.textContent === 'Your Saved Recipes' && !newStatus) {
            container.remove();
        }
    });
    
    // 3. Rating stars: Ensure functionality and stop propagation
    const stars = cardFront.querySelectorAll('.star-rating i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const rating = parseInt(e.target.dataset.rating, 10);
            updateRating(recipe.id, rating);
            
            // Re-render stars for the card and update the back face
            const newStars = renderStars(recipe.id);
            cardFront.querySelector('.star-rating').innerHTML = newStars;
            cardBack.querySelector('li:last-child').innerHTML = `<i class="fas fa-star"></i> Rating: ${rating}/5`;
        });
    });

    // 4. Back Link Click Handler (Navigation)
    const backLink = cardBack.querySelector('.back-link');
    backLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        toggleView('detail', recipe.id);
    });

    return container;
};

/** Renders the list of recipes based on current filters and search. */
const renderRecipeList = (category = 'All', searchTerm = '', onlyFavorites = false) => {
    const container = document.getElementById('recipe-list-grid');
    if (!container) return;
    
    let recipesToRender = RECIPES;
    const appData = getAppData();
    const isSearchActive = !!searchTerm;

    if (onlyFavorites) {
        recipesToRender = RECIPES.filter(r => appData.favorites.includes(r.id));
    } else if (category !== 'All') {
        recipesToRender = recipesToRender.filter(r => r.category === category);
    }
    
    if (isSearchActive) {
        recipesToRender = recipesToRender.filter(r => 
            r.name.toLowerCase().includes(searchTerm) || 
            r.shortDescription.toLowerCase().includes(searchTerm) ||
            r.ingredients.some(i => i.toLowerCase().includes(searchTerm))
        );
    }

    container.innerHTML = '';
    if (recipesToRender.length === 0) {
        container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #666; font-size: 1.2em;">
            ${onlyFavorites ? 'You haven\'t saved any recipes yet!' : 'No recipes found matching your criteria.'}
        </p>`;
        return;
    }

    recipesToRender.forEach(recipe => {
        container.appendChild(createRecipeCard(recipe));
    });
    
    const mainTitle = document.querySelector('#recipe-list-view h2');
    if (onlyFavorites) {
        mainTitle.textContent = 'Your Saved Recipes';
    } else if (isSearchActive) {
        mainTitle.textContent = `Search Results for "${searchTerm}"`;
    } else {
        mainTitle.textContent = `Popular Recipes of the Week (${category})`;
    }
};

/** Renders the detailed information for a single recipe. */
let timeLeft;
let isPaused = false;
let startTime;
let remainingTimeOnPause = 0;

const renderRecipeDetail = (recipeId) => {
    const recipe = RECIPES.find(r => r.id === recipeId);
    const detailContainer = document.getElementById('recipe-detail-view');
    const appData = getAppData();
    const isFavorite = appData.favorites.includes(recipeId);

    if (!recipe) {
        detailContainer.innerHTML = '<h2>Recipe Not Found</h2>';
        return;
    }
    
    detailContainer.innerHTML = `
        <div class="detail-header">
            <h1>${recipe.name}</h1>
            <button id="detail-save-btn" class="favorite-btn" data-id="${recipe.id}">
                ${isFavorite ? '❤️' : '🤍'} Save Recipe
            </button>
        </div>
        
        <div class="star-rating detail-rating">
            ${renderStars(recipe.id)}
        </div>

        <p class="description">${recipe.shortDescription}</p>

        <div class="meta-data">
            <span>🕒 Prep: ${recipe.prepTime}</span>
            <span>🔥 Cook: ${recipe.cookTime}</span>
            <span>🍽️ Serves: ${recipe.servingSize}</span>
        </div>

        <div class="detail-sections">
            <div>
                <h3><i class="fas fa-list"></i> Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3><i class="fas fa-book-open"></i> Instructions</h3>
                <ol class="instructions-list">
                    ${recipe.instructions.map(s => `<li>${s}</li>`).join('')}
                </ol>
            </div>
        </div>
        
        <div class="timer-container">
            <h3><i class="fas fa-clock"></i> Cooking Timer (${recipe.cookTime})</h3>
            <div id="timer-display">00:00</div>
            <div class="timer-controls">
                <button id="start-timer"><i class="fas fa-play"></i> Start</button>
                <button id="pause-timer"><i class="fas fa-pause"></i> Pause</button>
                <button id="reset-timer"><i class="fas fa-undo"></i> Reset</button>
            </div>
        </div>

        <button onclick="history.back()" style="margin-top: 30px; padding: 10px 20px; background-color: #0a4f8a; color: white; border: none; border-radius: 5px; cursor: pointer;">
            ← Back
        </button>
    `;

    // Attach listeners for the detail page's save button and rating stars
    const saveBtn = document.getElementById('detail-save-btn');
    saveBtn.addEventListener('click', (e) => {
        const newStatus = toggleFavorite(recipe.id);
        e.target.innerHTML = newStatus ? '❤️ Save Recipe' : '🤍 Save Recipe'; 
    });

    const stars = detailContainer.querySelectorAll('.detail-rating i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating, 10);
            updateRating(recipe.id, rating);
            detailContainer.querySelector('.detail-rating').innerHTML = renderStars(recipe.id);
        });
    });
    
    // Initialize the timer logic
    initTimer(recipe.cookTime);
};

/** Renders the content for the About page. (UPDATED) */
const renderAboutPage = () => {
    const aboutContainer = document.getElementById('about-view');
    aboutContainer.innerHTML = `
        <div class="about-content">
            <h2>About AllRecipes Hub Demo 🍳</h2>
            <p>Welcome to this demo of a Single Page Application (SPA) designed to showcase modern web development concepts using HTML, CSS, and vanilla JavaScript.</p>
            <p>This project is built to demonstrate:</p>
            <ul>
                <li>Responsive layout using CSS Grid and Flexbox.</li>
                <li>Data handling and state management without a backend (using the local <code>RECIPES</code> array).</li>
                <li>Client-side routing (view switching) and browser history management using JavaScript's <code>history.pushState</code>.</li>
                <li>Interactive components like favoriting, search/filter, and card flipping.</li>
                <li>An integrated cooking timer on the detail page.</li>
            </ul>
            <h3>Developer Note</h3>
            <p>All recipes and images are for demonstration purposes only. The app is designed for easy content management directly within the <code>app.js</code> file.</p>
        </div>
    `;
};


/** Initializes and manages the cooking timer. */
const initTimer = (cookTime) => {
    // Determine total seconds from cookTime string (e.g., "60 min")
    const match = cookTime.match(/(\d+)\s*(min|sec)/i);
    let totalSeconds = 0;
    if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        if (unit === 'min') {
            totalSeconds = value * 60;
        } else if (unit === 'sec') {
            totalSeconds = value;
        }
    }

    if (totalSeconds === 0) totalSeconds = 1; // Prevent 0 time

    timeLeft = totalSeconds;
    
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function countdown() {
        if (!isPaused && timeLeft > 0) {
            timeLeft = totalSeconds - Math.floor((Date.now() - startTime) / 1000) + remainingTimeOnPause;
            updateDisplay();
        } else if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.textContent = "Time's up! 🎉";
        }
    }

    // Clear any existing timer from previous detail view
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    remainingTimeOnPause = 0;
    updateDisplay(); // Initialize display

    startBtn.onclick = () => {
        if (!timerInterval && timeLeft > 0) {
            if (isPaused) {
                startTime = Date.now(); 
            } else {
                startTime = Date.now();
                remainingTimeOnPause = 0;
            }
            isPaused = false;
            timerInterval = setInterval(countdown, 1000);
        }
    };
    
    pauseBtn.onclick = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            remainingTimeOnPause = timeLeft;
            isPaused = true;
        }
    };
    
    resetBtn.onclick = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingTimeOnPause = 0;
        timeLeft = totalSeconds;
        isPaused = false;
        updateDisplay();
    };
};

// --- Initialization and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Handle Navigation links
    document.getElementById('recipes-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleView('home');
    });

    document.getElementById('favorites-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleView('favorites');
    });
    
    // Listener for the About link
    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleView('about');
    });

    // Handle Category Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            document.getElementById('search-input').value = ''; // Clear search when filtering
            renderRecipeList(category);
        });
    });

    // Handle Search Input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const category = document.querySelector('.filter-btn.active').dataset.category;
        const searchTerm = searchInput.value.toLowerCase();
        renderRecipeList(category, searchTerm);
    });

    // Handle Browser History (Back/Forward buttons)
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            if (event.state.view === 'detail') {
                toggleView('detail', event.state.recipeId, false);
            } else if (event.state.view === 'favorites') {
                toggleView('favorites', null, false);
            } else if (event.state.view === 'about') {
                toggleView('about', null, false);
            } else {
                toggleView('home', null, false);
            }
        } else {
            toggleView('home', null, false);
        }
    });

    // Initial View Load based on URL hash
    if (window.location.hash.startsWith('#recipe/')) {
        const recipeId = window.location.hash.split('/')[1];
        toggleView('detail', recipeId, false);
    } else if (window.location.hash === '#favorites') {
        toggleView('favorites', null, false);
    } else if (window.location.hash === '#about') {
        toggleView('about', null, false);
    } else {
        toggleView('home', null, false);
    }
});