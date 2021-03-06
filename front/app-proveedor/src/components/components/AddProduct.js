import { useForm } from 'react-hook-form';
import profile from '../../svg/caja.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import '../../stylesPages/newProduct.css';
import { newProduct } from '../../http/api2';
export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const { userData } = useAuth();
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const categorys = () => {
    const category = ['Tecnología', 'Ocio', 'Cocina', 'Limpieza', 'Baño', 'Actualidad', 'Revista', 'Libro'];
    const listCategory = category.map((item) => <option value={item}>{item}</option>);
    return <>{listCategory}</>;
  };
  const cities = () => {
    const cities = [
      'Barcelona',
      'Madrid',
      'Tarragona',
      'Malaga',
      'Lleida',
      'Zaragoza',
      'Asturias',
      'Coruña',
      'Vigo',
      'Lugo',
      'Valladolid',
    ];
    const listCities = cities.map((item) => <option value={item}>{item}</option>);
    return <>{listCities}</>;
  };
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSubmit = async (data) => {
    try {
      const serverResponse = await newProduct(data, userData?.id);
      if (errorMessage.length > 0) {
        setErrorMessage('');
      }
      if (serverResponse.status === 200) {
        setstatusMessage('');
        setErrorMessage('');
        setstatusMessage('El producto se ha publicado con exito');
      }
    } catch (error) {
      setstatusMessage('');
      setErrorMessage('');
      setErrorMessage('Ha ocurrido algún error');
    }
  };

  return (
    <div className="backgroundProfile">
      <div className="recuadroProduct">
        <div className="panel">
          <Link to={`/profile/${userData?.id}`}>
            <p className="opcion">Información personal</p>
          </Link>
          <Link to={`/profile/${userData?.id}/newProduct`}>
            <p className="selected opcion">Añadir Producto</p>
          </Link>
          <Link to={`/profile/${userData?.id}/buy`}>
            <p className="opcion">Compras realizadas</p>
          </Link>
          <Link Link to={`/profile/${userData?.id}/all`}>
            <p className="opcion">Productos publicados</p>
          </Link>
        </div>
        <div className="infoPanel">
          <div className="dropdown alineado">
            <p className=" op2">☰</p>
            <div className="dropdown-content">
              <Link to={`/profile/${userData?.id}`}>Información personal</Link>
              <Link to={`/profile/${userData?.id}/newProduct`}>Añadir Producto</Link>
              <Link to={`/profile/${userData?.id}/buy`}>Compras realizadas</Link>
              <Link Link to={`/profile/${userData?.id}/all`}>
                Productos publicados
              </Link>
            </div>
          </div>
          <div className="infoUser">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Publicar Producto</h1>
              <div className="parent">
                {!selectedFile && <img src={profile} className="profile" alt="website logo" />}

                {selectedFile && <img src={preview} alt="" className="image1"></img>}
                <label className="textEdit">
                  <input
                    className="image1"
                    type="file"
                    name="foto"
                    id="foto"
                    ref={register()}
                    onChange={onSelectFile}
                  />
                  Subir foto
                </label>
              </div>

              <label className="nameUser" htmlFor="name">
                Nombre del producto
              </label>
              <input
                id="name"
                autoComplete="off"
                name="name"
                placeholder="Introduzca el nombre"
                ref={register({ required: true })}
              />
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" ref={register({ required: true })}>
                {categorys()}
              </select>
              <label htmlFor="location">Ciudad</label>
              <select id="location" name="location" ref={register({ required: true })}>
                {cities()}
              </select>
              <label htmlFor="price">Precio en €</label>
              <input
                id="price"
                type="number"
                min="1"
                name="price"
                autoComplete="off"
                placeholder="Introduzca el precio"
                ref={register({ required: true })}
              />
              <label htmlFor="description">Descripción</label>
              <textarea
                htmlFor="textarea"
                rows="10"
                cols="40"
                id="description"
                name="description"
                placeholder="Escriba una breve descripción del producto..."
                ref={register({ required: true })}
              ></textarea>
              <input className="botonLogin" type="submit" value="Publicar Producto" />
              <hr></hr>
              {statusMessage.length > 0 && <p className="status-ok">{statusMessage}</p>}
              {errorMessage.length > 0 && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
