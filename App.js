import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Image, FlatList, Text, View, TouchableOpacity, StyleSheet, Card } from 'react-native';




function HomeScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     paddingTop: 10,
     backgroundColor: "#ecf0f1",
     padding: 8,
   },
   flatList: {
     paddingHorizontal: 16,
     paddingVertical: 16,
   },
   cardContainer: {
     height: 100,
     marginRight: 8,
     backgroundColor: "#000000",
     marginTop: 10,
   },
   card: {
     height: 100,
     borderRadius: 12,
     padding: 10,
   },
   text: { color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }
 });

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => {
            var title = item.title
            return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => navigation.navigate(title)}
            >
                <Text style={styles.text}> {item.title} - {item.releaseYear} </Text>
            </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  );
}

function StarWars(styles) {

  return (
    <ScrollView style={{ backgroundColor: 'red', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Star Wars </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/starwars.jpg')} />
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader. </Text>

    </ScrollView>
  );
}

function bttf(styles) {

  return (
    <ScrollView style={{ backgroundColor: 'red', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Back to the Future </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/bttf.jpg')} />
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown. </Text>

    </ScrollView>
  );
}

function TheMatrix(styles) {

  return (
    <ScrollView style={{ backgroundColor: 'red', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > The Matrix </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/thmatrix.jpg')} />
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} >When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence. </Text>

    </ScrollView>
  );
}

function Inception(styles) {

  return (
    <ScrollView style={{ backgroundColor: 'red', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Inception </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/inception.jpg')} />
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. </Text>

    </ScrollView>
  );
}

function Interstellar(styles) {

  return (
    <ScrollView style={{ backgroundColor: 'red', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > Interstellar </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/interstellar.jpg')} />
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster. </Text>

    </ScrollView>
  );
}



const Stack = createNativeStackNavigator();

export default App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Star Wars" component={StarWars} />
        <Stack.Screen name="Back to the Future" component={bttf} />
        <Stack.Screen name="The Matrix" component={TheMatrix} />
        <Stack.Screen name="Inception" component={Inception} />
        <Stack.Screen name="Interstellar" component={Interstellar} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};