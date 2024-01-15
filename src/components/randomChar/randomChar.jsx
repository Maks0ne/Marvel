import { Component } from 'react'
import Spinner from '../spinner/spinner';
import ErrorMEssage from '../errorMessage/errorMessage';
import MarvelService from '../../services/marvelService';


import './randomChar.scss'
import mjolnir from '../../resources/img/randomChar_decoration.png'

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
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
    this.onCharLoading()
    this.marvelService
      .getCharacters(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  tryRandomChar = () => {
    this.updateChar()
    clearInterval(this.timerId)

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
            <div className="inner" onClick={this.tryRandomChar}>TRY IT</div>
          </a>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }
};

const View = ({ char }) => {
  const { name, description, homepage, thumbnail, wiki } = char
  const notFoundImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  const imageStyle = thumbnail === notFoundImg ? { objectFit: 'contain' } : { objectFit: 'cover' };


  return (
    < div className="randomchar__block" >
      <img src={thumbnail} style={imageStyle} alt="Random charachter" className='randomchar__img' />
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