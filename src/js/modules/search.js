
export function setupSearchRedirect() {
    const searchIcon = document.getElementById('search');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            window.location.href = '/src/html/search.html';
        });
    } else {
        console.error('Search page not found');
    }
}