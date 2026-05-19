const clientForm = document.getElementById("client-form");
const clientsBody = document.getElementById("clients-body");

async function chargerClients() {
    try {
        const clients = await getAll(ENDPOINTS.clients);
        clientsBody.innerHTML = "";

        clients.forEach(client => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${client.id_client}</td>
                <td>${client.nom}</td>
                <td>${client.email}</td>
                <td>${client.mot_de_passe}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="supprimerClient(${client.id_client})">Supprimer</button>
                </td>
            `;

            clientsBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

clientForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nouveauClient = {
        id_client: document.getElementById("id_client").value,
        nom: document.getElementById("nom").value,
        email: document.getElementById("email").value,
        mot_de_passe: document.getElementById("mot_de_passe").value
    };

    try {
        await create(ENDPOINTS.clients, nouveauClient);
        clientForm.reset();
        chargerClients();
    } catch (error) {
        console.error(error);
    }
});

async function supprimerClient(id) {
    try {
        await remove(ENDPOINTS.clients, id);
        chargerClients();
    } catch (error) {
        console.error(error);
    }
}

chargerClients();