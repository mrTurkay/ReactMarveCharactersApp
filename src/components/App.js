import React, { Component } from 'react';
import md5 from 'md5';
import $ from 'jquery';

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
      characters: null,
      selectedCharacter: null,
      term: null,
    };

    this.GetInitialChararcters();
    this.CharacterSearch = this.CharacterSearch.bind(this);
  }

  GetInitialChararcters() {
    // axios promise yapısını kullanacağız. promiselerde eğer sonuç başarılı ise then extensionu...
    // içine bir parametre gönderiyor. bizde o parametreyi alacağız ve state'imizi güncelleyeceğiz.
    $.getJSON(`${API_URL}/characters?${auth}&limit=5`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
  }

  CharacterSearch(term) {
    $.getJSON(`${API_URL}/characters?${auth}&limit=5&nameStartsWith=${term}`, result => {
      const characters = result.data.results;
      this.setState({ characters });
    });
    this.setState({ term });
  }

  CharacterSelect(character) {
    this.setState({ selectedCharacter: character });
  }

  render() {
    return (
      <div className="container">
        <SearchBar onSearchButtonClick={this.CharacterSearch} />
        {this.state.characters &&
          <div>
            <CharacterList
              characters={this.state.characters}
              term={this.state.term}
              onCharacterSelect={this.CharacterSelect.bind(this)}
            />
            <Detail
              character={
                this.state.selectedCharacter
                  ? this.state.selectedCharacter
                  : this.state.characters[0]
              }
            />
          </div>}
      </div>
    );
  }
}

export default App;
