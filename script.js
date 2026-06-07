var museumDatabase = []

fetch("data.json")
.then(valasz => valasz.json())
.then(adatok => museumDatabase = adatok)
.then(() => console.log("ready to work"))

function applyFilters() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filteredDevices = museumDatabase.filter(device => {
        const matchesSearch = query === '' || device.title.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || device.category === category;
        return matchesSearch && matchesCategory;
    });

    const hasActiveFilter = query !== '' || category !== 'all';

    if (!hasActiveFilter) {
        navigateToHome();
        return;
    }

    document.getElementById('home-view').style.display = 'none';
    document.getElementById('era-view').style.display = 'block';

    const label = [
        query ? `"${query}"` : null,
        category !== 'all' ? category : null
    ].filter(Boolean).join(' + ');

    document.getElementById('era-page-title').innerText = `Szűrt eredmények: ${label}`;
    document.getElementById('era-page-subtitle').innerText = `${filteredDevices.length} műszer található`;

    const gridContainer = document.getElementById('filtered-hardware-grid');
    gridContainer.innerHTML = '';

    if (filteredDevices.length === 0) {
        gridContainer.innerHTML = `<p style="color: var(--text-muted); font-family: 'Roboto Mono', monospace;">Nincs találat.</p>`;
        return;
    }

    filteredDevices.forEach(device => {
        const cardHTML = `
            <div class="card">
                <div class="card-img">hi</div> 
                <div class="card-content">
                    <span class="card-era-badge">${device.era}-es évek</span>
                    <h3 class="card-title">${device.title}</h3>
                    <p style="color: var(--text-muted);">${device.desc}</p>
                </div>
            </div>
        `;
        gridContainer.innerHTML += cardHTML;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateDatabase(selectionFilter, selectionType) {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('era-view').style.display = 'block';

    document.getElementById('era-page-title').innerText = `${selectionFilter}-es Évek`;
    document.getElementById('era-page-subtitle').innerText = `A gyűjtemény ezen része a(z) ${selectionFilter}-es évek technológiáit mutatja be.`;

    const gridContainer = document.getElementById('filtered-hardware-grid');
    gridContainer.innerHTML = '';

    var filteredDevices
    if (selectionType == 'category'){
        filteredDevices = museumDatabase.filter(device => device.category === selectionFilter);
    }
    else if (selectionType == 'era'){
        filteredDevices = museumDatabase.filter(device => device.era == selectionFilter);
    }
    else if (selectionType == 'name'){
        filteredDevices = museumDatabase.filter(device => device.title.toLowerCase().includes(selectionFilter.toLowerCase()));
    }
    
    filteredDevices.forEach(device => {
        const cardHTML = `
            <div class="card">
                <div class="card-img">hi</div> 
                <div class="card-content">
                    <span class="card-era-badge">${device.era}-es évek</span>
                    <h3 class="card-title">${device.title}</h3>
                    <p style="color: var(--text-muted);">${device.desc}</p>
                </div>
            </div>
        `;
        gridContainer.innerHTML += cardHTML;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToHome() {
    document.getElementById('era-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        applyFilters();
    }
});
