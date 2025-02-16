document.getElementById('menu-icon').addEventListener('click', function () {
    const overlayMenu = document.getElementById('overlay-menu');
    const menuIcon = document.getElementById('menu-icon');
    if (overlayMenu.classList.contains('open')) {
        overlayMenu.classList.remove('open');
        menuIcon.classList.remove('open');
    } else {
        overlayMenu.classList.add('open');
        menuIcon.classList.add('open');
    }
});

const tabs = document.querySelectorAll('.shop-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});
async function fetchInstagramPosts() {
    try {
        const response = await fetch('http://localhost:3000/instagram');  // Updated URL
        const data = await response.json();
        const postsContainer = document.getElementById('instagram-posts');
        postsContainer.innerHTML = '';
        
        data.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('instagram-post');
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank">
                    <img src="${post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}" alt="${post.caption || 'Instagram Post'}">
                </a>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Failed to fetch Instagram posts', error);
    }
}

fetchInstagramPosts();
setInterval(fetchInstagramPosts, 60000); // Refresh posts every minute




