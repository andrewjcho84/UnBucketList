import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  username: state.unBucket.username,
  creator: state.unBucket.creator,
  events: state.unBucket.events,
});

const mapDispatchToProps = (dispatch) => ({
  // pertinent actions here
});

const Home = (props) => {
  console.log('Username in Home is', props.username);
  console.log('Creator name is', props.creator);
  console.log('Events in state are', props.events);

  const eventList = props.events.map((event, i) => {
    if (props.creator === event.creator) {
      return (
        <View key={`event${i}`} style={styles.myEventCard}>
          <View style={styles.deleteButton}>
            <Button
              color="red"
              title="X"
              onPress={() => {
                Alert.alert(
                  'Delete Event',
                  'Are you sure you want to delete this event?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => console.log('OK pressed'),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            ></Button>
          </View>
          <Text>Event Name: {event.name}</Text>
          <Text>Event Location: {event.location}</Text>
          <Text>Event Date: {event.date}</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditEvent');
            }}
          >
            <Text>Edit Event</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View key={`event${i}`} style={styles.friendEventCard}>
          <Text>Event Name: {event.name}</Text>
          <Text>Event Location: {event.location}</Text>
          <Text>Event Date: {event.date}</Text>
        </View>
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Welcome {props.creator}!</Text>
        <Text>Here is your unBucket List</Text>
      </View>
      <ScrollView style={styles.eventContainer}>{eventList}</ScrollView>
      <TouchableOpacity
        onPress={() => {
          console.log('Add event pressed');
          props.navigation.navigate('AddEvent');
        }}
      >
        <Text>Add an Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  header: {
    margin: 10,
    alignItems: 'center',
  },
  eventContainer: {
    flex: 0.75,
    backgroundColor: 'orange',
    width: '90%',
    borderWidth: 1,
    borderRadius: 3,
    overflow: 'scroll',
    maxHeight: 500,
  },
  deleteButton: {
    flex: 0,
    color: 'red',
    position: 'absolute',
    width: 30,
    height: 20,
    right: 5,
  },
  myEventCard: {
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 100,
    overflow: 'scroll',
    padding: 5,
  },
  friendEventCard: {
    backgroundColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 100,
    overflow: 'scroll',
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
