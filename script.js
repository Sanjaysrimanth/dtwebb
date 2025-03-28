
let lastLocation = '';
let lastDestination = '';

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';

    // Theme toggle event listener
    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

document.getElementById('busForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const location = document.getElementById('location').value;
    const destination = document.getElementById('destination').value;

    // Validation checks
    if (!location || !destination) {
        showNotification('Please select both location and destination.');
        return;
    }

    if (location === destination) {
        showNotification('Please select different location and destination.');
        return;
    }

    if (location === lastLocation && destination === lastDestination) {
        showNotification('Please select a different route.');
        return;
    }

    // Update last selected values
    lastLocation = location;
    lastDestination = destination;

    // Simulated bus data
    const busData = [
        { 
            number: '101', 
            occupancy: '30%', 
            occupancyLevel: 'low',
            arrivalTime: '5 mins', 
            imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800'
        },
        { 
            number: '102', 
            occupancy: '65%', 
            occupancyLevel: 'medium',
            arrivalTime: '10 mins', 
            imageUrl: 'https://images.unsplash.com/photo-1596584247608-8cbb4b3f6297?w=800'
        },
        { 
            number: '103', 
            occupancy: '85%', 
            occupancyLevel: 'high',
            arrivalTime: '2 mins', 
            imageUrl: 'https://images.unsplash.com/photo-1600320402673-4a969958d325?w=800'
        },
        { 
            number: '104', 
            occupancy: '45%', 
            occupancyLevel: 'medium',
            arrivalTime: '8 mins', 
            imageUrl: 'https://images.unsplash.com/photo-1597256123772-6694d69509c4?w=800'
        },
        { 
            number: '105', 
            occupancy: '20%', 
            occupancyLevel: 'low',
            arrivalTime: '15 mins', 
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'
        }
    ];

    // Show results container
    document.getElementById('results').style.display = 'block';
    
    // Clear and populate bus cards
    const busCardsContainer = document.getElementById('busCards');
    busCardsContainer.innerHTML = '';

    busData.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'bus-card';
        card.innerHTML = `
            <div class="bus-info">
                <span class="bus-number">Bus ${bus.number}</span>
                <span class="occupancy occupancy-${bus.occupancyLevel}">${bus.occupancy}</span>
            </div>
            <div class="arrival-time">
                <span>Arrives in: ${bus.arrivalTime}</span>
            </div>
            <button class="track-button" onclick="trackBus('${bus.imageUrl}')">
                Track Live Location
            </button>
        `;
        busCardsContainer.appendChild(card);
    });

    // Smooth scroll to results
    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

function trackBus(imageUrl) {
    const liveTrackContainer = document.getElementById('liveTrackImage');
    document.getElementById('selectedBusImage').src = imageUrl;
    liveTrackContainer.style.display = 'block';
}

function closeLiveTrack() {
    document.getElementById('liveTrackImage').style.display = 'none';
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        notification.addEventListener('animationend', () => {
            notification.remove();
        });
    }, 3000);
}