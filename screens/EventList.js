import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

const EventList = (props) => {
  console.log('props in eventlist screen', props);
  const eventList = props.events.map((event, i) => {
    if (props.creator === event.creator) {
      return (
        <TouchableOpacity
          key={`event${i}`}
          onPress={() => {
            event.owner = true;
            props.navigation.navigate('CardDetails', event);
          }}
        >
          <View style={styles.myEventCard}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventLabel}>
                Event Name: <Text style={styles.eventValue}>{event.name}</Text>
              </Text>
              <Text style={styles.eventLabel}>
                Event Location:{' '}
                <Text style={styles.eventValue}>
                  {event.location ? event.location : 'TBD'}
                </Text>
              </Text>
              <Text style={styles.eventLabel}>
                Event Date:{' '}
                <Text style={styles.eventValue}>
                  {event.date ? event.date : 'TBD'}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={`event${i}`}
          onPress={() => {
            props.navigation.navigate('CardDetails', event);
          }}
        >
          <View style={styles.friendEventCard}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventLabel}>
                Event Name: <Text style={styles.eventValue}>{event.name}</Text>{' '}
              </Text>
              <Text style={styles.eventLabel}>
                Event Location:{' '}
                <Text style={styles.eventValue}>{event.location}</Text>{' '}
              </Text>
              <Text style={styles.eventLabel}>
                Event Date:{' '}
                <Text style={styles.eventValue}>
                  {event.date ? event.date : 'TBD'}
                </Text>{' '}
              </Text>
              <Text style={styles.eventLabel}>
                Event Creator:{' '}
                <Text style={styles.eventValue}>{event.creator}</Text>{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  });

  return <ScrollView style={styles.eventContainer}>{eventList}</ScrollView>;
};

const styles = StyleSheet.create({
  eventLabel: {
    color: '#102A43',
    fontWeight: 'bold',
  },
  eventValue: {
    color: '#D9E2EC',
    fontWeight: 'bold',
  },
  friendEventCard: {
    flexDirection: 'row',
    backgroundColor: '#486581',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#243B53',
    margin: 5,
    maxHeight: 100,
    padding: 5,
  },
  eventContainer: {
    flex: 0.75,
    backgroundColor: '#486581',
    width: '90%',
    overflow: 'scroll',
    maxHeight: 500,
  },
  myEventCard: {
    flexDirection: 'row',
    backgroundColor: '#829AB1',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#243B53',
    margin: 5,
    maxHeight: 100,
    padding: 5,
  },
  eventDetails: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default EventList;
