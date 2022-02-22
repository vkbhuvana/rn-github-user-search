// import axios from 'axios';
import React, {useState} from 'react';
import {Appbar, Searchbar} from 'react-native-paper';

const App = () => {
  const [searchBarContent, setSearchBarContent] = useState('');
  const [apidata, setApidata] = useState(null);
  const updateSearchBar = newlyUpdatedText => {
    setSearchBarContent(newlyUpdatedText);
  };
  // const makeApiCall = async () => {
  //   const apiResponse = await axios.get(
  //     'https://api.github.com/users/svbala99',
  //   );
  //   console.log(apiResponse);
  // };
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Github User Search" />
      </Appbar.Header>
      <Searchbar
        // onIconPress={() => makeApiCall()}
        style={{margin: 24, padding: 8}}
        placeholder={'Search Users'}
        onChangeText={updateSearchBar}
        value={searchBarContent}
      />
    </>
  );
};

export default App;
