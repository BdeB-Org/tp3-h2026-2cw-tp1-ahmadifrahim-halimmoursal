const API_BASE = "http://localhost:8080/ords/commande";

const ENDPOINTS = {
    categories: `${API_BASE}/categorie/`,
    clients: `${API_BASE}/client/`,
    produits: `${API_BASE}/produit/`,
    commandes: `${API_BASE}/commande/`
};

async function getAll(endpoint) {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
    }

    const data = await response.json();
    return data.items || [];
}

async function getById(endpoint, id) {
    const response = await fetch(`${endpoint}${id}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'élément.");
    }

    return await response.json();
}

async function create(endpoint, element) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(element)
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout.");
    }

    return await response.json();
}

async function update(endpoint, id, element) {
    const response = await fetch(`${endpoint}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(element)
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la modification.");
    }

    return await response.json();
}

async function remove(endpoint, id) {
    const response = await fetch(`${endpoint}${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression.");
    }

    return true;
}