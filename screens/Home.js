import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import EventList from './EventList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.unBucket.username,
  creator: state.unBucket.creator,
  events: state.unBucket.events,
});

const Home = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome {props.creator}!</Text>
        <Text style={styles.text}>Here is your unBucket List</Text>
      </View>
      <EventList
        creator={props.creator}
        events={props.events}
        navigation={props.navigation}
      />
      <TouchableOpacity
        onPress={() => {
          console.log('Add event pressed');
          props.navigation.navigate('AddEvent');
        }}
      >
        <Text style={styles.text}>Add an Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#486581',
    alignItems: 'center',
  },
  header: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: '#F0F4F8',
    fontSize: 18,
  },
});

export default connect(mapStateToProps, null)(Home);
