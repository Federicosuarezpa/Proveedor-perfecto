import profile from '../../svg/caja.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../shared/hooks/useAuth';
import '../../stylesPages/newProduct.css';
import { useState, useEffect } from 'react';
import { productsBought } from '../../http/api2';
import '../../stylesPages/newProduct.css';

export default function Buys(props) {
  const { userData } = useAuth();
  function useFetch() {
    const [data, setData] = useState([]);
    async function getData() {
      let dataInfo = await productsBought(userData?.id);
      dataInfo = dataInfo.message.info;
      const listCategory = dataInfo.map((item) => (
        <Link to={`/profile/${userData?.id}/buy/${item.id_product}/rate/${item.id_deal}`}>
          <li class="itemProductUser">
            <div className="item-image">
              <img
                className="imagen"
                src={`http://localhost:3000/uploads/${String.fromCharCode.apply(null, item?.foto.data)}`}
                alt="productsUser"
              ></img>
            </div>
            <div className="item-detail">
              <p className="nombreItem">{item.name}</p>
            </div>
          </li>
        </Link>
      ));

      setData(listCategory);
    }

    useEffect(() => {
      getData();
    }, []);
    return (
      <>
        {' '}
        <ul className="item-list-user">{data}</ul>
      </>
    );
  }
  return (
    <div className="backgroundProfile">
      <div className="recuadroProduct">
        <div className="panel">
          <Link to={`/profile/${userData?.id}`}>
            <p className="opcion">Información personal</p>
          </Link>
          <Link to={`/profile/${userData?.id}/newProduct`}>
            <p className="opcion">Añadir Producto</p>
          </Link>
          <Link to={`/profile/${userData?.id}/buy`}>
            <p className="selected opcion">Compras realizadas</p>
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
          <h1>Productos Comprados</h1>
          <img src={profile} className="profile" alt="website logo" />
          <div>{useFetch()}</div>
        </div>
      </div>
    </div>
  );
}
