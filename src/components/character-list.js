import React from 'react';
import _ from 'lodash';

import CharacterListItem from './character-list-item';

const CharacterList = props => {
  if (!props.characters) return <div className="col-md-4 details">Loading...</div>;
  if (props.characters.length === 0)
    return (
      <div className="col-md-12 details">
        <h4>
          Sorry! There is no character starts with <b>{props.term}</b>
        </h4>
      </div>
    );
  return (
    <div className="col-md-4">
      {_.map(props.characters, character =>
        <CharacterListItem
          key={character.id}
          character={character}
          onCharacterSelect={props.onCharacterSelect}
        />,
      )}
    </div>
  );
};

export default CharacterList;
