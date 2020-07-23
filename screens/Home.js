import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Alert,
  Share,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';
import ShareEvent from './ShareEvent.js';

const mapStateToProps = (state) => ({
  username: state.unBucket.username,
  creator: state.unBucket.creator,
  events: state.unBucket.events,
});

const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (username, eventId) => {
    dispatch(actions.deleteEvent(username, eventId));
  },
});

const Home = (props) => {
  const shareData = {
    title: `New event invitation from ${props.creator}`,
    message: `Come hang out with me`,
  };

  const shareEvent = async () => {
    const result = await Share.share(shareData);
    console.log('result', result);
  };

  const eventList = props.events.map((event, i) => {
    if (props.creator === event.creator) {
      return (
        <View key={`event${i}`} style={styles.myEventCard}>
          <View style={styles.eventDetails}>
            <Text>Event Name: {event.name}</Text>
            <Text>Event Location: {event.location}</Text>
            <Text>Event Date: {event.date}</Text>
            <TouchableOpacity
              onPress={() => {
                event.owner = true;
                props.navigation.navigate('CardDetails', event);
              }}
            >
              <Text color={'blue'}>More Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.deleteButton}>
            <TouchableOpacity
              title="X"
              onPress={() => {
                console.log('Delete opacity clicked');
                props.deleteEvent(props.username, event.event_id);
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shareButton}>
            <ShareEvent
              key={event.event_id}
              event={event}
              user={props.creator}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View key={`event${i}`} style={styles.friendEventCard}>
          <View style={styles.shareButton}>
            <ShareEvent
              key={event.event_id}
              event={event}
              user={props.creator}
            />
          </View>
          <Text>Event Name: {event.name}</Text>
          <Text>Event Location: {event.location}</Text>
          <Text>Event Date: {event.date}</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CardDetails', event);
            }}
          >
            <Text color={'blue'}>More Details</Text>
          </TouchableOpacity>
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

  myEventCard: {
    flexDirection: 'row',
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
  eventDetails: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  deleteButton: {
    flex: 0,
    position: 'absolute',
    right: 10,
    top: 5,
  },
  shareButton: {
    flex: 0,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
