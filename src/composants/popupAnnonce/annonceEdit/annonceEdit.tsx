import { Dialog } from '@mui/material';
import { useRef, useState } from 'react';
import './annonceEdit.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnnonceEdit({ annonceId }: { annonceId: string }
) {
    const [open, setOpen] = useState(false);
    const [annonceData, setAnnonceData] = useState<ModelAnnonce>();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [images, setImages] = useState<Image[]>([]);

    const navigate = useNavigate();

    // Fonction pour formater la date
    const formatDate = (date: string | number | Date) => {
        const currentDate = new Date(date);

        // Obtenir les composantes de la date
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Concaténer les composantes dans le format souhaité
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };


    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/annonce/${annonceId}`, {
                title: title,
                price: price,
                location: location,
                description: description,
                status: status,
                images: images,
            }).then((response) => {
                window.location.reload(); // Rafraîchir la page
            });
            navigate("/app/users");
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
    };


    const fetchAnnonce = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/annonce/${annonceId}`);
            const annonceData = response.data;
            setAnnonceData(annonceData);

            // Formater la date récupérée
            const formattedDate = formatDate(annonceData.date);

            setTitle(annonceData.title);
            setPrice(annonceData.price);
            setLocation(annonceData.location);
            setDescription(annonceData.description);
            setStatus(annonceData.status);
            setImages(annonceData.images);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'annonce :', error);
        }
    };

    const handleOpen = () => {
        fetchAnnonce()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // @ts-ignore
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // @ts-ignore
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    // @ts-ignore
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    // @ts-ignore
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    // @ts-ignore
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    // @ts-ignore
    const handleImagesChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = (reader.result as string);
                if (base64) {
                    setTimeout(() => {
                        const imageData = base64.split(/[, ]+/).pop() as string;
                        const newImage: Image = {
                            image: imageData
                        }
                        setImages([...images, newImage]);
                    }, 500)
                }
            }
        } else {
        }
    };

    const deleteImage = (index: number) => {
        let img = [...images];
        img.splice(index, 1)
        setImages(img)
    }

    return (
        <>
            <button className="button-edition" onClick={handleOpen}>Edition</button>
            <Dialog open={open} onClose={handleClose}>
                <div className="popupEdit">
                    <h1 className="title">Edition de l'annonce</h1>
                    <div className="buttonDivEdition">

                        <form onSubmit={handleSubmit}>

                            <div className="inputDiv">
                                <label htmlFor="title">Title :</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="price">Price :</label>
                                <input
                                    type="text"
                                    id="price"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="location">Location :</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={handleLocationChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="description">Description :</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="status">Status :</label>
                                <input
                                    type="status"
                                    id="status"
                                    value={status}
                                    onChange={handleStatusChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="images">Images :</label>
                                <input
                                    type="file"
                                    id="images"
                                    onChange={handleImagesChange}
                                />
                                <div className='divImage'>
                                    {images.map((img, index) => (
                                        <div className='containImgDelete'>
                                            <img src={"data:image/png;base64," + img.image} alt="Image" key={index} className='imgEdit' />
                                            <button type={"button"} onClick={() => deleteImage(index)} className='buttonDel'>X</button>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>

                            <div className="buttonDiv">
                                <button className="buttonPadding button" type="submit">
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default AnnonceEdit;
