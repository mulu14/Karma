/**
 * App component class
 * @author Mulugeta Forsido
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import {locationApi} from './Service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: false,
      locations: [],
    };
  }

  /**
   * Set state on component mount
   * @param {void}
   * @return
   */
  componentDidMount() {
    locationApi().then(data => {
      this.setState({
        locations: data,
        following: false,
      });
    });
  }

  /**
   * Get selected item/place from list and update value
   * @param {item}
   * @return new state
   */
  get_selected_place(place) {
    this.setState(prevState => ({
      locations: prevState.locations.map(location =>
        location.id === place.id
          ? {...location, following: !location.following}
          : location,
      ),
    }));
    //API call for data persistence
    //send(data.id)
    //There is no url for that
    // I use compontent state to update follow and following status
  }

  render() {
    return (
      <View>
        <Text style={style.header}>Wel come to Karma</Text>
        <ScrollView>
          {this.state.locations.map(location => (
            <View key={location.name} style={style.root}>
              <Text style={style.textStyle}>Address: {location.name}</Text>
              <Text style={style.textStyle}>
                Distance: {location.distance} km
              </Text>
              <Button
                onPress={e => this.get_selected_place(location, e)}
                color={location.following ? '#008000' : '#000000'}
                title={location.following ? 'Following' : 'Follow'}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
/**
 * Component sytle
 */
const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 12,
    borderColor: '#f46084',
    borderWidth: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    margin: 5,
    fontStyle: 'italic',
  },
});

export default App;
