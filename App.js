/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  Dimensions,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [searchBarContent, setSearchBarContent] = useState('');
  const [firstApidata, setFirstApidata] = useState(null);
  const [secondApidata, setSecondApidata] = useState(null);
  const [error, setError] = useState(false);
  const updateSearchBar = newlyUpdatedText => {
    // setSearchBarContent(newlyUpdatedText.trim().toLowerCase());
    setSearchBarContent(newlyUpdatedText);
  };

  const makeApiCall = async () => {
    alert('triggered');
    if (searchBarContent.length < 1) {
      alert('Please enter username in searchbar');
      return;
    }
    try {
      const firstResponse = await axios.get(
        `https://api.github.com/users/${searchBarContent}`,
      );

      const secondResponse = await axios.get(
        `https://api.github.com/users/${searchBarContent}/repos`,
      );
      setFirstApidata(firstResponse?.data);
      setSecondApidata(secondResponse?.data);
    } catch (e) {
      setError(true);
    }
  };

  const tableHead = ['Particulars', 'Details'];
  const tableData = [
    ['Username', firstApidata?.login || 'NA'],
    ['Url', firstApidata?.url || 'NA'],
    ['Full Name', firstApidata?.name || 'NA'],
    ['Company', firstApidata?.company || 'NA'],
    ['Blog', firstApidata?.blog || 'NA'],
    ['Location', firstApidata?.location || 'NA'],
    ['Email', firstApidata?.email || 'NA'],
  ];
  return (
    <View style={{paddingBottom: 160}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Github user search'}</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder={'Search username'}
          value={searchBarContent}
          onChangeText={updateSearchBar}
        />
        <TouchableOpacity
          onPress={() => makeApiCall()}
          style={styles.iconContainer}>
          <Icon style={styles.searchIcon} name="search" size={30} />
        </TouchableOpacity>
      </View>
      {error && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Dimensions.get('window').height / 3,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 24, color: '#4267B2'}}>
            {'No Data Found'}
          </Text>
        </View>
      )}
      {firstApidata && !error && (
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 16,
          }}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#4267B2'}}>
            {/* <Row
              data={tableHead}
              style={{
                height: 40,
              }}
              textStyle={{margin: 6}}
            /> */}
            <Rows data={tableData} textStyle={{margin: 6, color: '#4267B2'}} />
          </Table>
          <Text style={styles.repoText}>Repositories</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {secondApidata?.map(repo => {
              return (
                <TouchableOpacity
                  key={repo?.id}
                  onPress={() =>
                    repo?.html_url?.length > 0 && Linking.openURL(repo.html_url)
                  }
                  style={{
                    borderWidth: 1,
                    borderColor: '#4267B2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 24,
                    backgroundColor: '#4267B2',
                    borderRadius: 50,
                    paddingHorizontal: 4,
                    margin: 4,
                  }}>
                  <Text style={{color: '#ffff'}}>{`${repo.name}`}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginLeft: 24,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffff',
  },
  headerContainer: {
    height: 64,
    justifyContent: 'center',
    backgroundColor: '#4267B2',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 56,
    borderColor: '#4267B2',
    borderWidth: 2,
    margin: 16,
  },
  input: {
    flex: 4,
    borderColor: '#4267B2',
    borderRightWidth: 2,
    color: '#4267B2',
  },
  searchIcon: {
    flex: 0.5,
    color: '#4267B2',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  repoText: {
    fontWeight: 'bold',
    fontSize: 24,
    textDecorationLine: 'underline',
    color: '#4267B2',
  },
});

export default App;
