function loadCSS() {
    // Get the script's URL to extract the API key
    const scripts = document.getElementsByTagName('script');
    let apiKey = '';

    // Loop through all scripts to find the one with the specific src
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('fg_fonts.js')) {
            const urlParams = new URLSearchParams(scripts[i].src.split('?')[1]);
            apiKey = urlParams.get('api_key'); // Use 'api_key' to match the correct parameter name
            break;
        }
    }

    // Check if the API key is present
    if (!apiKey) {
        console.error('API key not found in the script URL.');
        alert('API key not found. Please provide a valid API key in the script URL.');
        return;
    }

    fetch(`../fg_fonts.php?api_key=${apiKey}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to validate API key.');
            }
        })
        .then(cssContent => {
            // Load the CSS if authorized
            const styleElement = document.createElement('style');
            styleElement.innerHTML = cssContent;
            document.head.appendChild(styleElement);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Could not validate API key: ' + error.message);
        });
}

// Attempt to load CSS with the API key from the script URL
loadCSS();
