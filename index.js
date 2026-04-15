// Selecting DOM elements based on the project requirements
const stateInput = document.querySelector('#state-input');
const submitButton = document.querySelector('#fetch-alerts');
const weatherDisplay = document.querySelector('#alerts-display');
const errorMessage = document.querySelector('#error-message');

async function fetchWeatherAlerts(stateCode) {
    try {
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${stateCode}`);
        
        if (!response.ok) {
            throw new Error("network failure"); // Matching the test's expected text [Test Results]
        }

        const data = await response.json();
        
        // Task 3: Clear and hide error message on success [1, 3]
        hideError();
        displayAlerts(data);
        
    } catch (error) {
        // Task 2, Step 4: Display error message when fetch fails [2, 4]
        showError(error.message);
    }
}

function displayAlerts(data) {
    weatherDisplay.innerHTML = '';
    const summary = document.createElement('h2');
    const alertCount = data.features ? data.features.length : 0;
    summary.textContent = `${data.title}: ${alertCount}`;
    weatherDisplay.appendChild(summary);

    if (data.features) {
        const list = document.createElement('ul');
        data.features.forEach(alert => {
            const listItem = document.createElement('li');
            listItem.textContent = alert.properties.headline;
            list.appendChild(listItem);
        });
        weatherDisplay.appendChild(list);
    }
}

/**
 * FIXED FUNCTIONS: Using classList to pass the Jest tests
 */
function showError(message) {
    weatherDisplay.innerHTML = ''; 
    errorMessage.textContent = message;
    // The test expects the 'hidden' class to be REMOVED to show the error [Test Results]
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.textContent = '';
    // The test expects the 'hidden' class to be ADDED to hide the error [9, Test Results]
    errorMessage.classList.add('hidden');
}

submitButton.addEventListener('click', () => {
    const state = stateInput.value.trim();
    stateInput.value = ''; // Task 3: Clear input after click [1, 3]
    
    if (state) {
        fetchWeatherAlerts(state);
    } else {
        showError("Please enter a state abbreviation.");
    }
});