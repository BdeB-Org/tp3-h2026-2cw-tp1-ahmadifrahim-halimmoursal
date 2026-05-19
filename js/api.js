const BASE_URL = "http://localhost:8080/ords/commande";

const URL_CATEGORIE = BASE_URL + "/categorie/";
const URL_CLIENT = BASE_URL + "/client/";
const URL_PRODUIT = BASE_URL + "/produit/";
const URL_COMMANDE = BASE_URL + "/commande/";

async function getAll(url) {
    let reponse = await fetch(url);
    let data = await reponse.json();
    return data.items;
}

async function getById(url, id) {
    let reponse = await fetch(url + id);
    let data = await reponse.json();
    return data;
}

async function create(url, objet) {
    let reponse = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objet)
    });

    return await reponse.json();
}

async function update(url, id, objet) {
    let reponse = await fetch(url + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objet)
    });

    return await reponse.json();
}

async function remove(url, id) {
    await fetch(url + id, {
        method: "DELETE"
    });
}