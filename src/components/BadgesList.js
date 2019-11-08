import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgesList.css';
import Gravatar from './Gravatar';

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.badge.email}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

function useSearchBadges(badges){//22- vamso a crear la funcion donde pegamos el react.useMemo con sus variables.
  const[ query, setQuery ] = React.useState('')
  const [filteredBadges, setFilteredBadges] = React.useState(badges)//20 quitamos filteredBadges por React.useMemo( para convertirlo en un estado, y creamos esta variable para generar un resultado.

  React.useMemo(() => { //17 - sustiuimos const filteredBadges por React.useMemo(
      const result = badges.filter(badge =>{ //18 guardamos este valor con una variable.
    return `${badge.firstName} ${badge.LastName}`.toLowerCase().includes(query.toLowerCase());
  });
  setFilteredBadges (result)//21- cuando tengamos ya el resultasdo , lo que va hacer este apartado es guardar el valor
  }, [ badges, query ]); //19- [] esto es un argumento de useMemo que lo que va hacer es una lista, estos son los argumentos que siempre que sean iguales la contestacion si ya esta memoriazada te la regresa en el momento, sino la calcula por primera vez. Los argumentos que usamos en esta funcion son badges y query.
  
  return { query, setQuery, filteredBadges } //23- añadimos el return de setQuery junto a lista que filtramos filteredBadges. Y el query de value.
}

function BadgesList (props) {
  //1- Los hooks siempre funcionan dentro de componentes funcionales, en este caso cambiamos la clase con la funcion y recibimos unos props.

  const badges = props.badges;
  //2- vamos a borrar los this.props y añadir una const 

  const { query, setQuery, filteredBadges} = useSearchBadges(badges) // 24- vamso a crear la variable junto a la lista de los badges.
  //8- useSState nos da dos valores; el query => que es lo que se esta escribiendo y el setQuery => 
  //realmente es state y setState pero podemos renombrarlo de otrass maneras.
  //const { query, setQuery} = React.useState('')

  //const filteredBadges = badges.filter.(badge => {badge.firstName.toLowerCase().includes(query);} )

  //11- para empezar a filtrar vamos a usar la combinacion de la lista de los badges y del query.
  //el resultado lo vamos a guardar dentro de una nueva variable, vamos a decir que;
  //sobre los badges. vamos a flitrar y a la funcion filter le pasamos otra funcion como argumento, 
  //en este caso nos va a dar cada uno de los filters. dentro del parentesis badges incluye el query? 
  //esto es como una pregunta, si si lo incluye esto sera true en cuyo caso ese badge quedara dentro de esta lista

  //12- al comprobarlo nos da un error badge.firstName.includes(query no es una funcion tenemos que añadir firstName. badge.firstName.includes(query).

  //13- añadimos toLowerCase() para normalizar el estado, es decir que a pesar de que busquemos el nombre en minusculas lo filtre en mayusculas. Por ejemplo => input= "text" /* manuel /* =>> Manuel Garcia.
   
  //14- agregamos despues del return un stream`${badge.firstName} ${badge.lastName}` vamos agregar esto para que nos busque a parte del nombre, tambien por el apellido.

  //15- agregamos al query .. .includes.(query.toLowerCasse()) => para normalizar el estado desde el input, es decir que si buscamos en mayusculas interprete solo la letra.
  //este filtrado es muy costoso, la lista aora es ccorta, pero cuando sea de miles hacer este filtrado es intrabajable. para esto vamos a usar otro hook es uno que ya trae React y se llama useMemo() y le vamos a dar una funtcion y unos argumentos.
  //useMemo le vamos a dar una function y unos argumentos, la primera vez que reciba ese par de argumentos va a correr la funcion, va a calcular los resultados, y los regresa. Pero la segunda vez que tenga esos argumentos de nuevo ya sabe la contestacion asi que la tienen memorizada y te la regresa rapido.
  //16 - vamos a anclar todo el apartado y lo vamos a subir al aprato 17.

  if (filteredBadges.length === 0) { //12- reemplazamos el badges por filteredBadges, 
      return (
        <div>
          <div className="form-group">
            <label> Filter Badges</label>
            <input 
            type="text" 
            ClassName="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            />
            <h3>No badges were found</h3>
            <Link className="btn btn-primary" to="/badges/new">
              Create new badge
            </Link>
        </div></div>
      );
    }

    return (
      <div className="BadgesList">
        <div className="form-group"> 
        {/* 3- vamos a crear un div y el className son de Bootstrap */}
          <label> Filter Badges</label> 
          {/* //4- ccreamos el label */}
          <input
          //5- y un input de tipo texto, aún con esto, no filtra. tenemos que hacer un input controlado que cada vez que escribamos algo lo filtre.
          //queremos que cada vez que escriba, guardar el valor que hay, para luego utilizarlo pasandolo atraves del value.
          type="text" 
          ClassName="form-control"
          value={query} //6- para hacer esto meteremos dos props; el value y el onChange.
          //9- el query de setState lo vamos a agregar al valor del input.
          onChange={(e) => {//7- cuando ocurra el onChange esto va a pasar el e (evento) y vamos a leer el valor con console.log=(e.target.value) y de alguna forma tenemos que guardar el e.target.value para pasarlo a value="". esto lo vamos hacer con useState
            setQuery(e.target.value)//10- vamos a cambiar el console.log por setQuery del setState. Si todo funciona correctamente podremos escribir en el input text. Aún no filtramos.
          }}
          />
          </div>
        <ul className="list-unstyled">
          {filteredBadges.map(badge => {
            return (
              <li key={badge.id}>
                <Link
                  className="text-reset text-decoration-none"
                  to={`/badges/${badge.id}`}
                >
                  <BadgesListItem badge={badge} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }


export default BadgesList;