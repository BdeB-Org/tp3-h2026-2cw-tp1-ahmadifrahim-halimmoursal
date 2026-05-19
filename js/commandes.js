let form = document.getElementById("commande-form");
let body = document.getElementById("commandes-body");

async function afficherCommandes() {
    let commandes = await getAll(URL_COMMANDE);
    body.innerHTML = "";

    for (let commande of commandes) {
        body.innerHTML += `
            <tr>
                <td>${commande.id_commande}</td>
                <td>${commande.date_commande}</td>
                <td>${commande.total}</td>
                <td>${commande.id_client}</td>
                <td>
                    <button onclick="supprimerCommande(${commande.id_commande})">Supprimer</button>
                </td>
            </tr>
        `;
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    let commande = {
        id_commande: document.getElementById("id_commande").value,
        date_commande: document.getElementById("date_commande").value,
        total: document.getElementById("total").value,
        id_client: document.getElementById("id_client").value
    };

    await create(URL_COMMANDE, commande);
    form.reset();
    afficherCommandes();
});

async function supprimerCommande(id) {
    await remove(URL_COMMANDE, id);
    afficherCommandes();
}

afficherCommandes();