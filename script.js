var museumDatabase = []

fetch("data.json")
.then(valasz => valasz.json())
.then(adatok => museumDatabase = adatok)
.then(() => console.log("ready to work"))

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
        filteredDevices = museumDatabase.filter(device => device.title.includes(selectionFilter));
    }
    
    filteredDevices.forEach(device => { //image doesn't work ${new Image(device.image)}
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
