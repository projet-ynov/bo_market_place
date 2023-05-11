import axios from "axios";

export function login(email: string, password: string) {
  axios.post('http://localhost:3000/admin/login', {
    username: email,
    password: password
  })
  .then(response => {
    // Vérification réussie, l'utilisateur peut se connecter
    console.log('Connexion réussie', response.data);
  })
  .catch(error => {
    // Une erreur s'est produite lors de la vérification, gérer l'erreur
    console.error('Erreur de connexion', error);
  });
}
