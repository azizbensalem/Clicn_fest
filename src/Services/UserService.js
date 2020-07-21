import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:56407/api/";

const getProduit = () => {
  return axios.get(API_URL + "Produit", { headers: authHeader() });
};

const getLieux = () => {
  return axios.get(API_URL + "Lieux", { headers: authHeader() });
};

const getMenu = () => {
  return axios.get(API_URL + "Menus", { headers: authHeader() });
};

const getEvent = () => {
  return axios.get(API_URL + "Evenements", { headers: authHeader() });
};

const getEventPublic = () => {
  return axios.get(API_URL + "Evenements/EvenementsPublic", { headers: authHeader() });
};

const getCommande = () => {
  return axios.get(API_URL + "Commandes", { headers: authHeader() });
};

const getCommandeID = (id) => {
  return axios.get(API_URL + "Commandes/" + id , { headers: authHeader() });
};

export default {
  getProduit,
  getLieux,
  getMenu,
  getEvent,
  getCommande,
  getCommandeID,
  getEventPublic,
};
