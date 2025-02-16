document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('search');
    const priceButtons = document.querySelectorAll('.price-button');
    const searchButton = document.querySelector('.search-button');
    const carContainers = document.querySelectorAll('.car-container');
    const vehicleNameInput = document.querySelector('input[type="text"]');
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = "The car with your criteria is currently not available";
    noResultsMessage.style.display = 'none';
    noResultsMessage.classList.add('no-results');

    // Add no results message to each car container
    carContainers.forEach(container => {
        container.appendChild(noResultsMessage.cloneNode(true));
    });

    // Function to highlight selected price button
    function selectPriceButton(button) {
        priceButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
    }

    // Function to filter cars based on search criteria and selected price range
    function filterCars() {
        const vehicleName = vehicleNameInput.value.trim().toLowerCase();

        carContainers.forEach(container => {
            let hasMatch = false;
            const cars = container.querySelectorAll('.car');

            cars.forEach(car => {
                const carName = car.querySelector('.details span').textContent.toLowerCase();
                const nameMatch = vehicleName === '' || carName.includes(vehicleName);

                const carPriceSpan = car.querySelector('.description .details .Price');
                if (carPriceSpan) {
                    const carPrice = parsePrice(carPriceSpan.textContent);

                    const selectedButton = document.querySelector('.price-button.selected');
                    if (selectedButton) {
                        const minPrice = parsePrice(selectedButton.dataset.min);
                        const maxPrice = parsePrice(selectedButton.dataset.max);

                        // Check if the car matches the search criteria and falls within the price range
                        if (nameMatch && carPrice >= minPrice && carPrice <= maxPrice) {
                            car.style.display = 'block';
                            hasMatch = true;
                        } else {
                            car.style.display = 'none';
                        }
                    } else {
                        // No price range selected, only filter based on search criteria
                        if (nameMatch) {
                            car.style.display = 'block';
                            hasMatch = true;
                        } else {
                            car.style.display = 'none';
                        }
                    }
                }
            });

            // Show/hide no results message based on filter results
            const noResults = container.querySelector('.no-results');
            if (noResults) {
                noResults.style.display = hasMatch ? 'none' : 'block';
            }
        });
    }
    function filterByBrand(brandName) {
        const carContainers = document.querySelectorAll('.car-container');
    
        carContainers.forEach(container => {
            let hasMatch = false;
            const cars = container.querySelectorAll('.car');
    
            cars.forEach(car => {
                const carDetails = car.querySelector('.details span');
                if (carDetails) {
                    const carName = carDetails.textContent.toLowerCase();
    
                    // Check if the car matches the brand name
                    if (carName.includes(brandName.toLowerCase())) {
                        car.style.display = 'block';
                        hasMatch = true;
                    } else {
                        car.style.display = 'none';
                    }
                }
            });
    
            // Show/hide no results message based on filter results
            const noResults = container.querySelector('.no-results');
            if (noResults) {
                noResults.style.display = hasMatch ? 'none' : 'block';
            }
        });
    }
    

    // Helper function to extract and parse numeric values from price strings
    function parsePrice(priceStr) {
        const numericValue = parseInt(priceStr.replace(/\D/g, ''), 10);
        return isNaN(numericValue) ? 0 : numericValue;
    }

    // Event listeners for price buttons
    priceButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectPriceButton(button);
            filterCars(); // Update filtering when price button is clicked
        });
    });

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        filterCars(); // Update filtering when search button is clicked
    });

    // Initial filtering when the page is loaded
    filterCars(); // Initially filter based on default state
    filterByBrand(brandName);
});