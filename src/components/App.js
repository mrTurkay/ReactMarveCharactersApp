import React, { Component } from 'react';
import md5 from 'md5';
import axios from 'axios';
import _ from 'lodash';

import CharacterList from './character-list';
import Detail from './detail';
import SearchBar from './search-bar';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = '6f09fabc92d597aea63eaa08ffe16a08';
const privateKey = 'ba7610298d04e2694cac4b770e157aeaa71ab972';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      selectedCharacter: null,
    };

    this.GetInitialChararcters();
  }

  GetInitialChararcters() {
    // axios promise yapısını kullanacağız. promiselerde eğer sonuç başarılı ise then extensionu...
    // içine bir parametre gönderiyor. bizde o parametreyi alacağız ve state'imizi güncelleyeceğiz.
    axios.get(`${API_URL}/characters?${auth}&limit=5`).then(result => {
      const characters = result.data.data.results;
      this.setState({ characters });
    });
  }

  CharacterSearch(term) {
    axios.get(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`).then(result => {
      const characters = result.data.data.results;
      this.setState({ characters });
    });
  }

  CharacterSelect(character) {
    this.setState({ selectedCharacter: character });
  }

  render() {
    const characterSearch = _.debounce(term => {
      this.CharacterSearch(term);
    }, 500);

    return (
      <div className="container">
        <SearchBar onSearchTermChange={characterSearch} />
        <CharacterList
          characters={this.state.characters}
          onCharacterSelect={this.CharacterSelect.bind(this)}
        />
        <Detail
          character={
            this.state.selectedCharacter ? this.state.selectedCharacter : this.state.characters[0]
          }
        />
      </div>
    );
  }
}

export default App;
