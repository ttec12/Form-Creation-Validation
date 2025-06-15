document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const apiDataContainer = document.getElementById('api-data');
    const refreshBtn = document.getElementById('refresh-btn');
    
    // API URL
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    
    // Function to display loading state
    function showLoading() {
        apiDataContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <div class="loading-text">Loading user data...</div>
            </div>
        `;
    }
    
    // Function to display error
    function showError() {
        apiDataContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Failed to load user data</h2>
                <p>Please check your connection and try again</p>
            </div>
        `;
    }
    
    // Function to display users
    function displayUsers(users) {
        // Create user list
        const userList = document.createElement('div');
        userList.className = 'user-list';
        
        // Process each user
        users.forEach(user => {
            const firstLetter = user.name.charAt(0);
            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;
            
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="card-header">
                    <div class="user-avatar">${firstLetter}</div>
                    <div>
                        <div class="user-name">${user.name}</div>
                        <div class="user-username">@${user.username}</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="user-info">
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <div>${user.email}</div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-phone"></i>
                            <div>${user.phone}</div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>${address}</div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="company">${user.company.name}</div>
                    <div class="website">
                        <a href="http://${user.website}" target="_blank">
                            <i class="fas fa-globe"></i> Website
                        </a>
                    </div>
                </div>
            `;
            userList.appendChild(userCard);
        });
        
        // Clear container and display user list
        apiDataContainer.innerHTML = '';
        apiDataContainer.appendChild(userList);
    }
    
    // Main function to fetch user data
    async function fetchUserData() {
        showLoading();
        
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching user data:', error);
            showError();
        }
    }
    
    // Initial fetch
    fetchUserData();
    
    // Event listeners
    refreshBtn.addEventListener('click', fetchUserData);
});