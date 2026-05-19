const API_BASE = "http://localhost:8080/ords/video";

const ENDPOINTS = {
    categories: `${API_BASE}/categorie/`,
    clients: `${API_BASE}/client/`,
    produits: `${API_BASE}/produit/`,
    commandes: `${API_BASE}/commande/`
};

const DEFAULT_FETCH_OPTIONS = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        'Accept': 'application/json'
    }
};

async function getAll(endpoint) {
    let response;
    try {
        response = await fetch(endpoint, DEFAULT_FETCH_OPTIONS);
    } catch (err) {
        throw new Error('Erreur réseau lors de la récupération des données: ' + err.message);
    }

    if (!response.ok) {
        let bodyText = '';
        try { bodyText = await response.text(); } catch (e) { /* ignore */ }
        throw new Error(`Erreur lors de la récupération des données. Status ${response.status}${bodyText ? ': ' + bodyText : ''}`);
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        let text = '';
        try { text = await response.text(); } catch (e) { /* ignore */ }
        throw new Error(`Impossible de parser JSON (${err.message}). Corps reçu: ${text}`);
    }

    if (Array.isArray(data)) {
        return data;
    }
    if (Array.isArray(data.items)) {
        return data.items;
    }
    if (Array.isArray(data.rows)) {
        return data.rows;
    }
    if (Array.isArray(data.data)) {
        return data.data;
    }

    const firstArray = Object.values(data).find(value => Array.isArray(value));
    return firstArray || [];
}

async function getById(endpoint, id) {
    let response;
    try {
        response = await fetch(`${endpoint}${id}`, DEFAULT_FETCH_OPTIONS);
    } catch (err) {
        throw new Error('Erreur réseau lors de la récupération de l\'élément: ' + err.message);
    }

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'élément.");
    }

    return await response.json();
}

async function create(endpoint, element) {
    let response;
    try {
        response = await fetch(endpoint, Object.assign({}, DEFAULT_FETCH_OPTIONS, {
            method: "POST",
            headers: Object.assign({}, DEFAULT_FETCH_OPTIONS.headers, {"Content-Type": "application/json"}),
            body: JSON.stringify(element)
        }));
    } catch (err) {
        throw new Error("Erreur réseau lors de l'ajout: " + err.message);
    }

    if (!response.ok) {
        let bodyText = '';
        try { bodyText = await response.text(); } catch (e) { /* ignore */ }
        throw new Error(`Erreur lors de l'ajout. Status ${response.status}${bodyText ? ': ' + bodyText : ''}`);
    }

    if (response.status === 204 || response.status === 201) {
        try {
            return await response.json();
        } catch {
            return true;
        }
    }

    return await response.json();
}

async function update(endpoint, id, element) {
    let response;
    try {
        response = await fetch(`${endpoint}${id}`, Object.assign({}, DEFAULT_FETCH_OPTIONS, {
            method: "PUT",
            headers: Object.assign({}, DEFAULT_FETCH_OPTIONS.headers, {"Content-Type": "application/json"}),
            body: JSON.stringify(element)
        }));
    } catch (err) {
        throw new Error('Erreur réseau lors de la modification: ' + err.message);
    }

    if (!response.ok) {
        let bodyText = '';
        try { bodyText = await response.text(); } catch (e) { /* ignore */ }
        throw new Error(`Erreur lors de la modification. Status ${response.status}${bodyText ? ': ' + bodyText : ''}`);
    }

    try { return await response.json(); } catch { return true; }
}

async function remove(endpoint, id) {
    const url = `${endpoint}${encodeURIComponent(id)}`;
    let response;
    try {
        response = await fetch(url, Object.assign({}, DEFAULT_FETCH_OPTIONS, { method: 'DELETE' }));
    } catch (err) {
        throw new Error('Erreur réseau lors de la suppression: ' + err.message);
    }

    if (!response.ok) {
        let body = null;
        try { body = await response.text(); } catch (e) { /* ignore */ }
        throw new Error("Erreur lors de la suppression." + (body ? ' ' + body : ''));
    }

    if (response.status === 204 || response.status === 200) {
        try { return await response.json(); } catch { return true; }
    }

    try { return await response.json(); } catch { return true; }
}