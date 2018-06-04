import React, { Component } from 'react';
import { Text, Image, Dimensions, FlatList, StyleSheet } from 'react-native';
import PostInstalura from './src/components/feed/postInstalura';

const width = Dimensions.get('screen').width;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: [],
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resp => resp.json())
      .then(json => this.setState({ image: json }));
  }

  render() {
    const { image } = this.state;
    return (
      <FlatList
        style={style.container}
        keyExtractor={item => String(item.id)}
        data={image}
        renderItem={({ item }) => (
          <PostInstalura
            width={width}
            like={item.likeada}
            likers={item.likers}
            comentario={item.comentario}
            comentarios={item.comentarios}
            fotoPerfil={item.urlPerfil}
            urlFoto={item.urlFoto}
            nome={item.loginUsuario}
          />
        )}
      />
    );
  }
}

const style = StyleSheet.create({
  container: { marginTop: 20 },
});
