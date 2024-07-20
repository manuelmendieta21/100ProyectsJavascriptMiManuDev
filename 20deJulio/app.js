const fireworksContainer = document.createElement('div');
            fireworksContainer.classList.add('firework-container');

            for (let i = 0; i < 6; i++) {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                fireworksContainer.appendChild(firework);
            }
            // Agregar el contenedor de fuegos artificiales al cuerpo del documento
            document.body.appendChild(fireworksContainer);