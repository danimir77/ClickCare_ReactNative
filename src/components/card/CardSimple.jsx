import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function CardSimple(props){
    const dateIni= props.date_ini
    const dateByirde = dateIni
    const dayB =  new Date(dateByirde).getDate()
    const monthb = new Date(dateByirde).getMonth()+1
    const yearB =  new Date(dateByirde).getFullYear();
    console.log(props)

    const date= yearB+"-"+monthb+"-"+dayB
    

    return(
        <View key={props.id} style={styles.container}>
          <Text>Nombre del paciente: {props.namePatient} </Text>
          <Text>Edad del paciente: {props.agePatient} </Text>
          {/* <Text>Necesidad: {props.needs}</Text> */}
          <Text>Especialidad Necesitada: {props.specialty.specialty}</Text>
        </View>
    )
}
const styles =StyleSheet.create({
    container:{
        padding:20,
        paddingBottom:5,
        paddingTop:5, 
    }
})