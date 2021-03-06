import React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  createUsers,
  getCity,
  getCountry,
  getRegion,
} from "../../Redux/Actions/actions";
import RNPickerSelect from "react-native-picker-select";

import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const country = useSelector((state) => state.country);
  const region = useSelector((state) => state.region);
  const city = useSelector((state) => state.city);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
    age: "",
    document: "",
    phone2: "",
    state: "",
    city: "",
    country: "",
    photo:""
  });

  const [viewPassword, setViewPassword]= useState()

  const [fecha, setFecha] = useState(new Date())

  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  function changeDateIni(event, selectedDate) {
    const currentDate = selectedDate || fecha
    setFecha(currentDate)
    const date = new Date(currentDate)
    const actualDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    setUser(prev => ({ ...prev, age: actualDate }))
    setShow(false)
  }

  function changeEmail(email) {
    setUser({ ...user, email })
  }
  function changePassword(password) {
    setViewPassword(password)
    setUser({ ...user, password })
  }
  function changeName(name) {
    setUser({ ...user, name })
  }
  function changeSurname(surname) {
    setUser({ ...user, surname })
  }
  function changePhone(phone) {
    setUser({ ...user, phone })
  }
  function changeAddress(address) {
    setUser({ ...user, address })
  }

  function changeDocument(document) {
    setUser({ ...user, document })
  }
  function changePhone2(phone2) {
    setUser({ ...user, phone2 })
  }
  function changeState(state) {
    setUser({ ...user, state })
  }
  function changeCity(city) {
    setUser({ ...user, city })
  }
  function changeCountry(country) {
    setUser({ ...user, country })
  }

  function showMode(currentMode) {
    setShow(true)
    setMode(currentMode)
  }

  async function onSubmit() {
    if (!user.email) alert('ingrese datos')
    else {
      try {
        await dispatch(createUsers(user))
        alert('usuario creado, POR FAVOR REVISE SU CORREO PARA VALIDAR')
        navigation.navigate("Login")
      }
      catch (e) {
        Alert.alert(Object.keys(e.response.data.errors[0])[0], Object.values(e.response.data.errors[0])[0])
      }
    }
  }
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <View style={styles.containerInput}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          value={user.email}
          onChangeText={(email) => changeEmail(email)}
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.text}>Password</Text>
        <TextInput value={user.password} onChangeText={password => changePassword(password)} secureTextEntry={true} style={styles.input} />
        <Text style={styles.text}>Tu Password: {viewPassword}</Text>
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.text}>Nombres</Text>
        <TextInput value={user.name} onChangeText={name => changeName(name)} style={styles.input} />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.text}>Apellidos</Text>
        <TextInput value={user.surname} onChangeText={surname => changeSurname(surname)} style={styles.input} />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.text}>Fecha de nacimiento : {user.age}</Text>
        <TouchableHighlight onPress={() => showMode('date')}>
          <Text style={styles.textB}>Escoja Fecha</Text>
        </TouchableHighlight>
        {show && (<DateTimePicker
          testID='dateTimePicker'
          value={fecha}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={changeDateIni}
        />)}
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.text}>Telefono</Text>
        <TextInput
          value={user.phone}
          onChangeText={(phone) => changePhone(phone)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.text}>Telefono Secundario</Text>
        <TextInput value={user.phone2} onChangeText={phone2 => changePhone2(phone2)} keyboardType="numeric" style={styles.input} />
      </View>


      <View style={styles.containerInput}>
        <Text style={styles.text}>Documento de Identificaci??n</Text>
        <TextInput
          value={user.document}
          onChangeText={(document) => changeDocument(document)}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.containerInput}>

        <Text style={styles.text}>Direcci??n</Text>
        <TextInput
          value={user.address}
          onChangeText={(address) => changeAddress(address)}
          style={styles.input}
        />
      </View>
      <View style={styles.containerInfoSelect}>
        <View style={styles.containerInput}>
          <Text style={styles.text}>Pa??s</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              dispatch(getRegion(value));
              changeCountry(value);
            }}
            items={country?.map((data, index) => ({
              key: index,
              label: data.name,
              value: data.name,
            }))}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.text}>Estado</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              dispatch(getCity(value));
              changeState(value);
            }}
            items={region?.map((data, index) => ({
              key: index,
              label: data.name,
              value: data.name,
            }))}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.text}>ciudad</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              changeCity(value);
            }}
            items={city?.map((data, index) => ({
              key: index,
              label: data.name,
              value: data.name,
            }))}
          />
        </View>
      </View>

      <TouchableHighlight onPress={onSubmit} style={styles.butonContainer}>
        <Text style={styles.textB}>Crear</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#24b8b8",
    width: 300,
  },
  textArea: {
    height: 60,
  },
  containerInput: {
    marginTop: 20,
  },

  butonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#24b8b8",
    alignSelf: "stretch",
    marginBottom: 30,
  },
  text: {
    color: "#1d3454",
    fontSize: 18,
    marginLeft: 15,
    textShadowColor: "#7a7979",
  },
  textB: {
    color: "#1d3454",
    fontSize: 18,

    textShadowColor: "#7a7979",
  },
});
