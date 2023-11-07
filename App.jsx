import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
export default function App() {

  const [cep, setCep] = useState('')
  const [data, setData] = useState({})

  async function searchCep() {
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
      console.log('data:', response.data)
      setData(response.data)

    }
    catch (error) {
      console.log('ERROR:', error.message)
      setData(error)
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulte um cep</Text>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.inputCep}
          value={cep}
          onChangeText={(text) => setCep(text)}
        />
      </View>
      <TouchableOpacity style={styles.btnArea} onPress={()=> searchCep()}>
        <View style={styles.botao}>
          <Text>Pesquisar</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text>{data.cep}</Text>
        <Text>{data.logradouro}</Text>
        <Text>{data.complemento}</Text>
        <Text>{data.bairro}</Text>
        <Text>{data.localidade}</Text>
        <Text>{data.uf}</Text>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 30
  },
  viewInput: {
    paddingHorizontal: 30,
    width: '100%'
  },
  inputCep: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  btnArea: {
    marginTop: 10
  },
  botao: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'cyan'
  }
});
