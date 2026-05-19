let form = document.getElementById("categorie-form");
let body = document.getElementById("categories-body");

async function afficherCategories() {
    let categories = await getAll(URL_CATEGORIE);
    body.innerHTML = "";

    for (let categorie of categories) {
        body.innerHTML += `
            <tr>
                <td>${categorie.id_categorie}</td>
                <td>${categorie.nom}</td>
                <td>
                    <button onclick="supprimerCategorie(${categorie.id_categorie})">Supprimer</button>
                </td>
            </tr>
        `;
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    let categorie = {
        id_categorie: document.getElementById("id_categorie").value,
        nom: document.getElementById("nom").value
    };

    await create(URL_CATEGORIE, categorie);
    form.reset();
    afficherCategories();
});

async function supprimerCategorie(id) {
    await remove(URL_CATEGORIE, id);
    afficherCategories();
}

afficherCategories();