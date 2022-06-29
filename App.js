import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Colors from './Colors';
import { getPopularMovies } from './services/services';



const App = () => {
  const [movies, setMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopularMovies().then(movies => {
      setMovies(movies[0]);
    }).catch(err => {
      setError(err);
    });
  }, [])


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Movie Name: {movies.original_title}</Text>
      <Text>Release Date: {movies.release_date}</Text>
      {error && <Text style={{ color: 'red' }}>Error in the server</Text>}
    </View>
  );
};


export default App;
