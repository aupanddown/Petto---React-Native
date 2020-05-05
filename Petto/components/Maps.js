import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions } from "react-native";
import MapView from 'react-native-maps'
import { Appbar } from 'react-native-paper'



const Images = [
  { uri: "https://i.ibb.co/2v7XXcK/image.jpg" },
  { uri: "https://i.ibb.co/PxQWx5j/1390817967.jpg" },
  { uri: "https://i.ibb.co/K5dsSX7/Paw-Paws-Dog-Hotel-Opens-Sydney-o-S-z-ILMRg-TZl.jpg" },
  { uri: "https://i.ibb.co/MkT6Fwz/unnamed-1.jpg" },
  { uri: "https://i.ibb.co/kym5Y5s/image.png" },
  { uri: "https://i.ibb.co/MSshv4m/381f4901-3668-4c0a-bdf8-14b4de04e18b.jpg" },
  { uri: "https://i.ibb.co/SJ2fCzQ/4-DQpj-Utz-LUwm-JZZPFgj-FYai-FGeclwq-PBm-KPKw-Ab-MOvo-A.jpg"}
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 13.782008,
          longitude: 100.518085,
        },
        title: "Dog Hotel",
        description: "Dusit District",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 13.824047,
          longitude: 100.609339,
        },
        title: "Rabbit Hotel",
        description: "Lat Phrao District",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 13.746181,
          longitude: 100.534898,
        },
        title: "Dog&Cat Hotel",
        description: "Pathum Wan District",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 13.760591,
          longitude: 100.554945,
        },
        title: "Cat Hotel",
        description: "Din Daeng District",
        image: Images[3],
      },
      {
        coordinate: {
          latitude: 13.664050,
          longitude: 100.612658,
        },
        title: "Hamster Hotel",
        description: "Bang Na District",
        image: Images[4],
      },
      {
        coordinate: {
          latitude: 13.723991,
          longitude: 100.439294,
        },
        title: "Rabbit&Cat Hotel",
        description: "Phasi Charoen District",
        image: Images[5],
      },
      {
        coordinate: {
          latitude: 13.780835,
          longitude: 100.542923,
        },
        title: "Sugar Glider Hotel",
        description: "Phaya Thai District",
        image: Images[6],
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <Appbar.Header>
        <Appbar.BackAction
          onPress={() => this.props.navigation.navigate('DetailsScreen')}/>
        <Appbar.Content title="Maps"/>
     </Appbar.Header>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});