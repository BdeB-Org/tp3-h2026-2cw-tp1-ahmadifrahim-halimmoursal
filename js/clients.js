let form = document.getElementById("client-form");
let body = document.getElementById("clients-body");

async function afficherClients() {
    let clients = await getAll(URL_CLIENT);
    body.innerHTML = "";

    for (let client of clients) {
        body.innerHTML += `
            <tr>
                <td>${client.id_client}</td>
                <td>${client.nom_client}</td>
                <td>${client.adresse}</td>
                <td>${client.pays}</td>
                <td>${client.telephone}</td>
                <td>${client.vendeur}</td>
                <td>${client.region}</td>
                <td>
                    <button onclick="supprimerClient(${client.id_client})">Supprimer</button>
                </td>
            </tr>
        `;
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    let client = {
        id_client: document.getElementById("id_client").value,
        nom_client: document.getElementById("nom_client").value,
        adresse: document.getElementById("adresse").value,
        pays: document.getElementById("pays").value,
        telephone: document.getElementById("telephone").value,
        vendeur: document.getElementById("vendeur").value,
        region: document.getElementById("region").value
    };

    await create(URL_CLIENT, client);
    form.reset();
    afficherClients();
});

async function supprimerClient(id) {
    await remove(URL_CLIENT, id);
    afficherClients();
}

afficherClients();