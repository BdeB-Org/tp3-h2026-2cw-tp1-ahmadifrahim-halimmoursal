const produitForm = document.getElementById("produit-form");
const produitsBody = document.getElementById("produits-body");

async function chargerProduits() {
    try {
        const produits = await getAll(ENDPOINTS.produits);
        produitsBody.innerHTML = "";

        produits.forEach(produit => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${produit.id_produit}</td>
                <td>${produit.nom}</td>
                <td>${produit.prix}</td>
                <td>${produit.stock}</td>
                <td>${produit.id_categorie || produit.categorie}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="supprimerProduit(${produit.id_produit})">
                        Supprimer
                    </button>
                </td>
            `;

            produitsBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Erreur lors du chargement des produits : " + error.message);
    }
}

produitForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nouveauProduit = {
        id_produit: Number(document.getElementById("id_produit").value) || document.getElementById("id_produit").value,
        nom: document.getElementById("nom").value,
        prix: parseFloat(document.getElementById("prix").value) || 0,
        stock: Number(document.getElementById("stock").value) || 0,
        id_categorie: Number(document.getElementById("id_categorie").value) || document.getElementById("id_categorie").value
    };

    console.log('Envoi nouveau produit:', nouveauProduit);

    // Vérifier que la catégorie existe pour éviter la violation de contrainte FK
    try {
        const categories = await getAll(ENDPOINTS.categories);
        const exists = categories.some(c => {
            const cid = c.id_categorie || c.id || c.id_cat || c.idCategorie || c.categorie;
            return String(cid) === String(nouveauProduit.id_categorie);
        });

        if (!exists) {
            alert('La catégorie ' + nouveauProduit.id_categorie + " n\'existe pas. Créez-la d\'abord dans la page Catégories ou utilisez un id existant.");
            return;
        }
    } catch (err) {
        console.warn('Impossible de vérifier les catégories :', err);
        const proceed = confirm("Impossible de vérifier l'existence des catégories (erreur réseau). Continuer quand même ?");
        if (!proceed) return;
    }
    try {
        await create(ENDPOINTS.produits, nouveauProduit);
        produitForm.reset();
        chargerProduits();
    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'ajout du produit : " + error.message);
    }
});

async function supprimerProduit(id) {
    try {
        await remove(ENDPOINTS.produits, id);
        chargerProduits();
    } catch (error) {
        console.error(error);
    }
}

chargerProduits();