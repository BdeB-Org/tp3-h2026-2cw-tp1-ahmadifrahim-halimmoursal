const categorieForm = document.getElementById("categorie-form");
const categoriesBody = document.getElementById("categories-body");

async function chargerCategories() {
    try {
        const categories = await getAll(ENDPOINTS.categories);
        categoriesBody.innerHTML = "";

        categories.forEach(categorie => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${categorie.id_categorie}</td>
                <td>${categorie.nom}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="supprimerCategorie(${categorie.id_categorie})">
                        Supprimer
                    </button>
                </td>
            `;

            categoriesBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

categorieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nouvelleCategorie = {
        id_categorie: document.getElementById("id_categorie").value,
        nom: document.getElementById("nom").value
    };

    try {
        await create(ENDPOINTS.categories, nouvelleCategorie);
        categorieForm.reset();
        chargerCategories();
    } catch (error) {
        console.error(error);
    }
});

async function supprimerCategorie(id) {
    try {
        await remove(ENDPOINTS.categories, id);
        chargerCategories();
    } catch (error) {
        console.error(error);
    }
}

chargerCategories();