interface ModelAnnonce {
  _id: string;
  title: string;
  images: Image[];
  description: string;
  price: number;
  date: string;
  location: string;
  profil: UserModel;
  status: number;
}

interface UserModel {
  _id: string;
  username: string;
  mail: string;
  photo: string;
  city: string;
}

interface Image {
  image: string;
}

interface ModelAnnonceBuy {
  user: UserModel;
  annonce: ModelAnnonce;
}

interface ModelMessages {
  title: string;
  description: string;
  date: string;
  profilUser: UserModel
}



