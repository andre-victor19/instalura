import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

export default class PerfilUsuario extends Component {
  render() {
    const { nome, fotoPerfil } = this.props;
    return (
      <View style={style.container}>
        <Image style={style.imagePerfil} source={{ uri: fotoPerfil }} />
        <Text style={{ fontWeight: 'bold' }}>{nome}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', margin: 10 },
  imagePerfil: { marginRight: 10, borderRadius: 20, width: 40, height: 40 },
});
