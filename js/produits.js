let form = document.getElementById("produit-form");
let body = document.getElementById("produits-body");

async function afficherProduits() {
    let produits = await getAll(URL_PRODUIT);
    body.innerHTML = "";

    for (let produit of produits) {
        body.innerHTML += `
            <tr>
                <td>${produit.id_produit}</td>
                <td>${produit.nom}</td>
                <td>${produit.prix}</td>
                <td>${produit.cout}</td>
                <td>${produit.stock}</td>
                <td>${produit.date_cree}</td>
                <td>${produit.categorie}</td>
                <td>
                    <button onclick="supprimerProduit(${produit.id_produit})">Supprimer</button>
                </td>
            </tr>
        `;
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    let produit = {
        id_produit: document.getElementById("id_produit").value,
        nom: document.getElementById("nom").value,
        prix: document.getElementById("prix").value,
        cout: document.getElementById("cout").value,
        stock: document.getElementById("stock").value,
        date_cree: document.getElementById("date_cree").value,
        categorie: document.getElementById("categorie").value
    };

    await create(URL_PRODUIT, produit);
    form.reset();
    afficherProduits();
});

async function supprimerProduit(id) {
    await remove(URL_PRODUIT, id);
    afficherProduits();
}

afficherProduits();