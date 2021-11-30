import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Image, FlatList, Text, View, TouchableOpacity, StyleSheet, Card } from 'react-native';


const detailsData = require('./details.json');
const favoriData = require('./favorites.json');

var fav_list = [];

var fav_list2 = JSON.stringify(fav_list)

function HomeScreen({ navigation }) {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();

      console.log(json[0])
      
      json["movies"][0]["img"] = require('./img/starwars.jpg')
      json["movies"][1]["img"] = require('./img/bttf.jpg')
      json["movies"][2]["img"] = require('./img/thmatrix.jpg')
      json["movies"][3]["img"] = require('./img/inception.jpg')
      json["movies"][4]["img"] = require('./img/interstellar.jpg')
      
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
     backgroundColor: "white",
     padding: 8,
   },
   flatList: {
     paddingHorizontal: 16,
     paddingVertical: 16,
   },
   cardContainer: {
     height: 300,
     marginRight: 8,
     backgroundColor: "green",
     marginTop: 10,
     borderWidth: 5,
     borderBottomLeftRadius: 20,
     borderBottomRightRadius: 20,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
   },
   card: {
     height: 100,
     borderRadius: 12,
     padding: 10,
   },
   text: { color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }
 });


 console.log( 'wmwmwmwmwmwmwmwmwmwmwmwmwmw' )
 console.log( data )
 console.log( 'wmwmwmwmwmwmwmwmwmwmwmwmwmw' )

  return (
    <View style={styles.container}>
      <Button title="Open Favorites List" onPress={() => navigation.navigate('Favorites')}
        color='green'/>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => {
            var title = item.title
            var img = item.img
            console.log(img)
            return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => navigation.navigate(title)}
            >    
                <Image style = {{width: 350, height: 150, margin: 8}} source={item.img} />
                <Text style={styles.text}> {item.title} - {item.releaseYear} </Text>

            </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  );
}

var favStatus = [];
function StarWars({ navigation }) {
  var isFav = [];
  
  Object.keys(fav_list).forEach(function(prop) {
    console.log(fav_list[prop].id)
    isFav.push(fav_list[prop].id)
  }); 
 

 
  if (isFav.indexOf("1") !== -1) {
    console.log('fav')
    favStatus = <Button
                  color='green'
                  title="Delete Fav"
                  onPress={delFavSW}
                />               
  } else {
  favStatus = <Button
                color='green'
                title="Add Fav"
                onPress={AddFavSW}
              />   
  console.log('notfav')  
  }

  function AddFavSW() {
    navigation.navigate("Home")

    fav_list.push({"id": "1", "title": "Star Wars", "releaseYear": "1977" })

    navigation.navigate("Star Wars")
  }

  function delFavSW() {
    navigation.navigate("Home")

    var delId = false;

    Object.keys(fav_list).forEach(function(prop) {
      //console.log(fav_list[prop].id)
      if (fav_list[prop].id == 1){
        delId = prop
      }
    }); 

    const index = fav_list.indexOf(fav_list[delId]);
    console.log(index)
    if (index > -1) {
      fav_list.splice(index, 1);
    }    


    navigation.navigate("Star Wars")
  }

  return (
    <ScrollView style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[0]['title']} </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/starwars.jpg')} />
      {favStatus}
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[0]['description']} </Text>

    </ScrollView>
  );
}

function bttf({ navigation }) {
  var isFav = [];

  Object.keys(fav_list).forEach(function(prop) {
    console.log(fav_list[prop].id)
    isFav.push(fav_list[prop].id)
  }); 
 
  console.log(!(1 in isFav))

 
  if (isFav.indexOf("2") !== -1) {
    console.log('fav')
    favStatus = <Button
                  color='green'
                  title="Delete Fav"
                  onPress={delFavBTTF}
                />               
  } else {
  favStatus = <Button
                color='green'
                title="Add Fav"
                onPress={AddFavBTTF}
              />   
  console.log('notfav')  
  }

    function AddFavBTTF(){
      navigation.navigate("Home")

      fav_list.push({ "id": "2", "title": "Back to the Future", "releaseYear": "1985" })

      navigation.navigate("Back to the Future")
    }

    function delFavBTTF() {
      navigation.navigate("Home")
  
      var delId = false;
  
      Object.keys(fav_list).forEach(function(prop) {
        //console.log(fav_list[prop].id)
        if (fav_list[prop].id == 2){
          delId = prop
        }
      }); 
  
      const index = fav_list.indexOf(fav_list[delId]);
      console.log(index)
      if (index > -1) {
        fav_list.splice(index, 1);
      }    
  
  
      navigation.navigate("Back to the Future")
    }

  return (
    <ScrollView style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[1]['title']} </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/bttf.jpg')} />
      {favStatus}
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[1]['description']} </Text>

    </ScrollView>
  );
}

function TheMatrix({ navigation }) {
  var isFav = [];

  Object.keys(fav_list).forEach(function(prop) {
    console.log(fav_list[prop].id)
    isFav.push(fav_list[prop].id)
  }); 
 

 
  if (isFav.indexOf("3") !== -1) {
    console.log('fav')
    favStatus = <Button
                  color='green'
                  title="Delete Fav"
                  onPress={delFavTM}
                />               
  } else {
  favStatus = <Button
                color='green'
                title="Add Fav"
                onPress={AddFavTM}
              />   
  console.log('notfav')  
  }

  function AddFavTM() {
    navigation.navigate("Home")

    fav_list.push({ "id": "3", "title": "The Matrix", "releaseYear": "1999" })

    navigation.navigate("The Matrix")
  }

  function delFavTM() {
    navigation.navigate("Home")

    var delId = false;

    Object.keys(fav_list).forEach(function(prop) {
      //console.log(fav_list[prop].id)
      if (fav_list[prop].id == 3){
        delId = prop
      }
    }); 

    const index = fav_list.indexOf(fav_list[delId]);
    console.log(index)
    if (index > -1) {
      fav_list.splice(index, 1);
    }    


    navigation.navigate("The Matrix")
  }

  return (
    <ScrollView style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[2]['title']} </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/thmatrix.jpg')} />
      {favStatus}
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[2]['description']} </Text>

    </ScrollView>
  );
}

function Inception({ navigation }) {
  var isFav = [];

  Object.keys(fav_list).forEach(function(prop) {
    console.log(fav_list[prop].id)
    isFav.push(fav_list[prop].id)
  }); 
 

 
  if (isFav.indexOf("4") !== -1) {
    console.log('fav')
    favStatus = <Button
                  color='green'
                  title="Delete Fav"
                  onPress={delFavINC}
                />               
  } else {
  favStatus = <Button
                color='green'
                title="Add Fav"
                onPress={AddFavINC}
              />   
  console.log('notfav')  
  }

  function AddFavINC() {
    navigation.navigate("Home")

    fav_list.push({ "id": "4", "title": "Inception", "releaseYear": "2010" })

    navigation.navigate("Inception")
  }

  function delFavINC() {
    navigation.navigate("Home")

    var delId = false;

    Object.keys(fav_list).forEach(function(prop) {
      //console.log(fav_list[prop].id)
      if (fav_list[prop].id == 4){
        delId = prop
      }
    }); 

    const index = fav_list.indexOf(fav_list[delId]);
    console.log(index)
    if (index > -1) {
      fav_list.splice(index, 1);
    }    

    navigation.navigate("Inception")

  }

  return (
    <ScrollView style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[3]['title']} </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/inception.jpg')} />
      {favStatus}
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[3]['description']} </Text>

    </ScrollView>
  );
}

function Interstellar({ navigation }) {
  var isFav = [];

  Object.keys(fav_list).forEach(function(prop) {
    console.log(fav_list[prop].id)
    isFav.push(fav_list[prop].id)
  }); 
 

 
  if (isFav.indexOf("5") !== -1) {
    console.log('fav')
    favStatus = <Button
                  color='green'
                  title="Delete Fav"
                  onPress={delFavINT}
                />               
  } else {
  favStatus = <Button
                color='green'
                title="Add Fav"
                onPress={AddFavINT}
              />   
  console.log('notfav')  
  }

  function AddFavINT() {
    navigation.navigate("Home")

    fav_list.push({ "id": "5", "title": "Interstellar", "releaseYear": "2014" })

    navigation.navigate("Interstellar")

  }

  function delFavINT() {
    navigation.navigate("Home")

    var delId = false;

    Object.keys(fav_list).forEach(function(prop) {
      //console.log(fav_list[prop].id)
      if (fav_list[prop].id == 5){
        delId = prop
      }
    }); 

    const index = fav_list.indexOf(fav_list[delId]);
    console.log(index)
    if (index > -1) {
      fav_list.splice(index, 1);
    }    

    navigation.navigate("Interstellar")

  }

  return (
    <ScrollView style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 10 }}>

      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[4]['title']} </Text>
      <Image style={{width: 355, height: 200, margin: 8}} source={require('./img/interstellar.jpg')} />
      {favStatus}
      <Text style={{  textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 30, margin: 15 }} > {detailsData.movies[4]['description']} </Text>

    </ScrollView>
  );
}

function Favorites({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = fav_list2
      const json = response;
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
          data={fav_list}
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
        <Stack.Screen name="Favorites" component={Favorites} />

      </Stack.Navigator>
    </NavigationContainer>

  );
};