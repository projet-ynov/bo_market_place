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

interface AdminModel {
  _id: string;
  username: string;
  mail: string;
}

interface Image {
  image: string;
}

interface ModelAnnonceBuy {
  user: UserModel;
  annonce: ModelAnnonce;
}

interface ModelMessages {
  _id: string;
  title: string;
  description: string;
  date: string;
  profilUser: UserModel;
  reservedBy: string
}



