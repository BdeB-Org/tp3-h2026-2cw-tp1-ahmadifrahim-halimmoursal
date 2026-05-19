const commandeForm = document.getElementById("commande-form");
const commandesBody = document.getElementById("commandes-body");

async function chargerCommandes() {
    try {
        const commandes = await getAll(ENDPOINTS.commandes);
        commandesBody.innerHTML = "";

        commandes.forEach(commande => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${commande.id_commande}</td>
                <td>${commande.date_commande}</td>
                <td>${commande.total}</td>
                <td>${commande.id_client}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="supprimerCommande('${commande.id_commande}')">Supprimer</button>
                </td>
            `;

            commandesBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Erreur lors du chargement des commandes : " + error.message);
    }
}

commandeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dateInput = document.getElementById("date_commande").value; // format YYYY-MM-DD from <input type=date>
    let dateNumeric = null;
    if (dateInput) {
        // convert YYYY-MM-DD -> YYYYMMDD (number) to satisfy backends expecting numeric date
        dateNumeric = Number(dateInput.replace(/-/g, ''));
    }

    const nouvelleCommande = {
        id_commande: document.getElementById("id_commande").value,
        commande_id: document.getElementById("id_commande").value,
        // send numeric date as primary field to match server expectations
        date_commande: dateNumeric !== null ? dateNumeric : document.getElementById("date_commande").value,
        // also include ISO date string under an alternate key
        date: dateInput,
        total: parseFloat(document.getElementById("total").value) || 0,
        id_client: Number(document.getElementById("id_client").value) || document.getElementById("id_client").value,
        client_id: Number(document.getElementById("id_client").value) || document.getElementById("id_client").value
    };

    console.log('Envoi nouvelle commande:', nouvelleCommande);

    try {
        await create(ENDPOINTS.commandes, nouvelleCommande);
        commandeForm.reset();
        chargerCommandes();
    } catch (error) {
        console.error(error);
        alert("Erreur lors de l'ajout de la commande : " + error.message);
    }
});

async function supprimerCommande(id) {
    try {
        await remove(ENDPOINTS.commandes, id);
        chargerCommandes();
    } catch (error) {
        console.error(error);
    }
}

chargerCommandes();