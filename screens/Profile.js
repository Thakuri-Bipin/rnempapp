import React from 'react';
import { StyleSheet, Text,Alert, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import { dataUrl } from '../server/Connection';
import { cloudinaryUrl } from '../server/Connection';


const Profile = (props) => {

    //receiving profile data as props after clicking each profile from home
    const {_id, name, picture, salary, phone, email,position} = props.route.params.item
    
    const deleteEmployee = () => {
        fetch(dataUrl + "/delete",{
            method:'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id:_id
            })
        })
        .then(res => res.json())
        .then(deletedEmp => {
            Alert.alert(`${deletedEmp.name} deleted!!`)
            props.navigation.navigate("Home")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const openDial = () =>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient 
            colors={["#0033ff","#6bc1ff"]}
            style={{height:"20%"}}
            />
            
            <View style={{alignItems:"center"}}>
                <Image
                style={{width:200,height:200,borderRadius:100,marginTop:-80}}
                source={{uri:picture}}
                />
            </View>

            <View style={{alignItems:"center", margin:18}}>
                <Title>{name}</Title>
                <Text style={{fontSize:15}}>{position}</Text>
            </View>

            <Card style={styles.myCard} onPress={() => {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{email}</Text>
                </View>
            </Card>

            <Card style={styles.myCard} onPress={() =>{
                openDial()
            }}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{phone}</Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff" />
                    <Text style={styles.mytext}>{salary}</Text>
                </View>
            </Card>

            <View style={{flexDirection:"row", justifyContent:"space-around", padding:10}}>
                <Button icon="account-edit" theme={theme} mode="contained" 
                onPress={() => 
                props.navigation.navigate("Create",{
                    _id, name, picture, salary, phone, email,position
                })} >
                    Edit
                </Button>
                <Button icon="delete" theme={theme} mode="contained" onPress={() => deleteEmployee()} >
                    Fire Employee
                </Button>
            </View>

        </View>
    )
}

const theme = {
    colors : {
        primary : "#006aff"
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        marginLeft:5
    }
})

export default Profile