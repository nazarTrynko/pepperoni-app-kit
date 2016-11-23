import React, {PropTypes} from 'react';
import * as CityState from '../city/CityState';
import Button from '../../components/Button';
import * as theme from '../../utils/theme';
import * as Utils from '../../utils/Utils';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';

const window = Dimensions.get('window');

const LocationView = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    office: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  },

  onNextPress() {
    this.props.dispatch(CityState.retryPlace(this.props.office, this.props.place));
  },

  buildPhotosURL() {
    var size = this.props.place.photos.groups[0].items.length;
    var photo = this.props.place.photos.groups[0].items[Utils.getRamdonNumberBetweenRange(size, 0)];
    return (photo.prefix + '500x500' + photo.suffix);
  },

  getImage() {
    return (this.props.place.photos.count && this.props.place.photos.count > 0)
      ? (<Image style={styles.image} source={{uri: this.buildPhotosURL()}}/>)
      : (<View/>);
  },

  getPrice() {
    var price = '';
    if (this.props.place.price) {
      for (let i = 0; i < this.props.place.price.tier; i++) {
        price += this.props.place.price.currency;
      }
    }
    return price;
  },

  getCategories() {
    var categories = '';
    if (this.props.place.categories) {
      for (let i = 0; i < this.props.place.categories.length; i++) {
        categories += this.props.place.categories[i].name + ', ';
      }
    }
    return categories.slice(0, -2);
  },

  getAddress() {
    var address = (this.props.place.location.address)
    ? this.props.place.location.address + ' '
    : '';
    address += (this.props.place.location.postalCode)
    ? this.props.place.location.postalCode
    : '';
    return address;
  },

  getRatingStyles() {
    return (this.props.place.ratingColor)
    ? ({backgroundColor: '#' + this.props.place.ratingColor})
    : '';
  },

  getHours() {
    return (this.props.place.hours)
    ? (this.props.place.hours.status)
    : '';
  },

  getContact() {
    return (this.props.place.contact)
    ? (this.props.place.contact.formattedPhone)
    : '';
  },

  getLinkURL() {
    var url = (Platform.OS === 'android')
      ? 'https://maps.google.com?q='
      : 'http://maps.apple.com/?q=';
    return url + this.props.place.location.lat + ',' + this.props.place.location.lng;
  },

  render() {
    var spinner = this.props.loading
      ? (<ActivityIndicator style={styles.spinner} size='large' color='white'/>)
      : (<View/>);

    return (
      <View style={styles.container}>
      <ScrollView>
        {this.getImage()}
        <View style={styles.cardInfo}>
          <Text style={[styles.rating, this.getRatingStyles()]}>
            {this.props.place.rating}
          </Text>
          <Text numberOfLines={2} style={styles.title}>
            {this.props.place.name}
          </Text>
          <Text numberOfLines={2} style={styles.text}>
            {this.getAddress()}
          </Text>
          <Text style={styles.text}>
            {this.getCategories()}
          </Text>
          <Text style={styles.text}>
            {this.getPrice()}
          </Text>
          <Text style={styles.text}>
            {this.getHours()}
          </Text>
          <Text style={styles.text}>
            {this.getContact()}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text='Yeah, take me there!'
            action={() => Linking.openURL(this.getLinkURL())
              .catch(err => console.error('An error occurred', err))} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text='Nah, try another one'
            action={this.onNextPress} />
        </View>
      </ScrollView>
      {spinner}
      </View>
    );
  }
});

const spacing = {
  marginHorizontal: 20
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  title: {
    ...spacing,
    ...theme.fonts.h3,
    margin: 8
  },
  text: {
    ...spacing,
    ...theme.fonts.body,
    marginBottom: 5
  },
  buttonContainer: {
    margin: 10
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  image: {
    height: 200,
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardInfo: {
    backgroundColor: theme.colors.selectedTab
  },
  rating: {
    ...Platform.select({
      ios: {
        top: -20,
        paddingTop: 6,
        left: (window.width / 2) - 20
      },
      android: {
        top: 6,
        left: window.width - 46
      }
    }),
    textAlign: 'center',
    textAlignVertical: 'center',
    ...theme.fonts.h3,
    backgroundColor: 'transparent', // default backgroundColor
    width: 40,
    height: 40
  }
});

export default LocationView;
