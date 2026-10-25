/**
 * Dicionário de Contrabando — app.js
 * Motor assíncrono para o laboratório multimédia em paulolopes.org
 */

document.addEventListener('DOMContentLoaded', async () => {
    const letterButtons = document.querySelectorAll('.letter-btn');
    const displayContainer = document.getElementById('dictionary-display');

    let dictionaryData = {};

    async function initDictionary() {
        try {
            const response = await fetch('manifest.json');
            if (!response.ok) throw new Error('Incapaz de aceder ao manifesto.');
            
            const data = await response.json();
            const files = data.verbetes;

            for (const file of files) {
                const res = await fetch(`verbetes/${file}`);
                if (!res.ok) continue;
                const text = await res.text();
                
                const match = text.match(/^#\s+(.+)$/m);
                if (match) {
                    const word = match[1].trim();
                    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
                    const firstLetter = word.charAt(0).toLowerCase();
                    const normalizedLetter = firstLetter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    if (!dictionaryData[normalizedLetter]) {
                        dictionaryData[normalizedLetter] = [];
                    }
                    
                    dictionaryData[normalizedLetter].push({
                        file: file,
                        word: capitalizedWord,
                        content: text
                    });
                }
            }
        } catch (error) {
            console.error("Erro ao carregar o manifesto:", error);
            displayContainer.innerHTML = '<p class="error-notice">Erro ao estruturar os registos de campo no arquivo.</p>';
        }
    }

    await initDictionary();

    letterButtons.forEach(button => {
        button.addEventListener('click', () => {
            letterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedLetter = button.getAttribute('data-letter');
            const entries = dictionaryData[selectedLetter];

            if (!entries || entries.length === 0) {
                displayContainer.innerHTML = `
                    <div class="empty-notice">
                        <p>Nenhum verbete registado sob a letra <strong>${selectedLetter.toUpperCase()}</strong> no presente arquivo.</p>
                    </div>`;
                return;
            }

            let renderedHTML = '';

            for (const entry of entries) {
                const cleanedContent = entry.content.replace(/^#\s+.+$/m, '');
                const parsedHTML = marked.parse(cleanedContent);
                
                renderedHTML += `
                    <article class="verbete-card">
                        <h2>${entry.word}</h2>
                        <div class="verbete-content">
                            ${parsedHTML}
                        </div>
                    </article>
                `;
            }

            displayContainer.innerHTML = renderedHTML;
        });
    });
});
