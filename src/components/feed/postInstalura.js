import React, { Component, Fragment } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PerfilUsuario from '../perfil/perfilUsuario';

export default class PostInstalura extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.like,
      likers: this.props.likers,
      comentarios: this.props.comentarios,
      novoComment: '',
    };
  }

  likeada(isLike) {
    return isLike
      ? require('../../image/s2-checked.png')
      : require('../../image/s2.png');
  }

  like() {
    const { liked, likers } = this.state;
    let novaLista = [];
    if (!liked) {
      novaLista = [...likers, { login: 'meuUser' }];
    } else {
      novaLista = likers.filter(liker => liker.login !== 'meuUser');
    }
    this.setState({ liked: !liked, likers: novaLista });
  }
  addComentario() {
    const { novoComment, comentarios } = this.state;
    if (novoComment !== '') {
      const novaLista = [
        ...comentarios,
        { id: novoComment, login: 'meuUser', texto: novoComment },
      ];

      this.setState({ comentarios: novaLista, novoComment: '' });
      this.novoComentario.clear();
    }
  }

  exibeLikers(quantityLike) {
    return (
      quantityLike > 0 && (
        <Text style={style.likes}>{`${quantityLike} ${
          quantityLike > 1 ? 'curtidas' : 'curtida'
        }`}</Text>
      )
    );
  }

  exibeLegenda(comentario, nome) {
    return (
      comentario && (
        <View style={style.comentario}>
          <Text style={style.likes}>{nome}</Text>
          <Text style={{ marginLeft: 5 }}>{comentario}</Text>
        </View>
      )
    );
  }

  exibeComentario(comentarios) {
    return comentarios.map(comment => (
      <View style={style.comentario} key={comment.id}>
        <Text style={style.likes}>{comment.login}</Text>
        <Text style={{ marginLeft: 5 }}>{comment.texto}</Text>
      </View>
    ));
  }

  render() {
    const { nome, width, fotoPerfil, urlFoto, comentario } = this.props;
    const { liked, likers, comentarios } = this.state;
    return (
      <Fragment>
        <PerfilUsuario nome={nome} fotoPerfil={fotoPerfil} />
        <TouchableOpacity onPress={() => this.like()}>
          <Image source={{ uri: urlFoto }} style={{ width, height: width }} />
        </TouchableOpacity>
        <View style={style.rodape}>
          <TouchableOpacity onPress={() => this.like()}>
            <Image style={style.botaoLike} source={this.likeada(liked)} />
          </TouchableOpacity>
          <Fragment>{this.exibeLikers(likers.length)}</Fragment>
          <Fragment>{this.exibeLegenda(comentario, nome)}</Fragment>
          <Fragment>{this.exibeComentario(comentarios)}</Fragment>
          <View style={style.imageContainer}>
            <Image
              style={style.imagePerfil}
              source={{
                uri:
                  'https://img.elo7.com.br/product/zoom/F14743/adesivo-chaves-seu-madruga-sertoes.jpg',
              }}
            />
            <View style={style.novoComentario}>
              <TextInput
                style={{ flex: 1 }}
                ref={input => (this.novoComentario = input)}
                placeholder="Adicione um comentário..."
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ novoComment: text })}
              />
              <TouchableOpacity onPress={() => this.addComentario()}>
                <Image
                  style={style.icone}
                  source={require('../../image/send.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Fragment>
    );
  }
}

const style = StyleSheet.create({
  botaoLike: { height: 30, width: 30, marginBottom: 10 },
  rodape: { margin: 10 },
  likes: { fontWeight: 'bold' },
  comentario: { flexDirection: 'row' },
  imagePerfil: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  novoComentario: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icone: { width: 30, height: 30 },
});
