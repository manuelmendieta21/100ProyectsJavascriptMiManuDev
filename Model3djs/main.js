const toggleModeButton = document.getElementById('toggleMode');
        const body = document.body;

        toggleModeButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });