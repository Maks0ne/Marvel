import { Component } from 'react'
import Spinner from '../spinner/spinner';
import ErrorMEssage from '../errorMessage/errorMessage';
import MarvelService from '../../services/marvelService';


import './randomChar.scss'
import mjolnir from '../../resources/img/randomChar_decoration.png'

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService()

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000)
    this.marvelService
      .getCharacters(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  render() {
    const { char, loading, error } = this.state
    const errorMessage = error ? <ErrorMEssage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">Random character for today!<br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <a href="/#" className="button button__main">
            <div className="inner">TRY IT</div>
          </a>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
};

const View = ({ char }) => {
  const { name, description, homepage, thumbnail, wiki } = char
  return (
    < div className="randomchar__block" >
      <img src={thumbnail} alt="Random charachter" className='randomchar__img' />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">HOMEPAGE</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">WIKI</div>
          </a>
        </div>
      </div>
    </div >
  )
}

export default RandomChar