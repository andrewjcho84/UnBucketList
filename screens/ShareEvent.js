import React from 'react';
import { Share, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ShareEvent = (props) => {
  console.log('Props in share button', props);
  const { event } = props;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${event.creator} cordially invites you to his/her event: ${event.name}. Let's ${event.description} on ${event.date}`,
        title: `You've got an unBucket list invite!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onShare}>
        <Text>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareEvent;
