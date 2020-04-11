import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { dataUrl } from '../server/Connection';
import { cloudinaryUrl } from '../server/Connection';

const CreateEmployee = ({ navigation, route }) => {

    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [modal, setModal] = useState(false)
    const [enableShit, setEnableShift] = useState(false)

    const submitData = () => {
        fetch(dataUrl + "/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} is Saved Successfully`)
                navigation.navigate("Home")
            })
    }

    const UpdateDetails = () => {
        fetch(dataUrl + "/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} is Updated Successfully`)
                navigation.navigate("Home")
            })
    }

    const pickFromGallery = async () => {
        //ask for permission to access gallery
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        }
        else {
            Alert.alert("Permission is required!!!")
        }
    }

    const pickFromCamera = async () => {
        //ask for permission to access camera
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        }
        else {
            Alert.alert("Permission is required!!!")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'reactnative_employeeApp')
        data.append("cloud_name", "dallp4d1v")

        fetch(cloudinaryUrl, {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                setPicture(data.url)
                setModal(false)
            })
            .catch(err => {
                Alert.alert("Error while Uploading!!")
            })
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShit}>
            <View>
                <TextInput
                    label='Name'
                    style={styles.inputStyle}
                    value={name}
                    theme={theme}
                    onFocus={() => { setEnableShift(false) }}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    label='Email'
                    style={styles.inputStyle}
                    value={email}
                    theme={theme}
                    onFocus={() => { setEnableShift(false) }}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    label='Phone'
                    style={styles.inputStyle}
                    value={phone}
                    theme={theme}
                    onFocus={() => { setEnableShift(false) }}
                    keyboardType="number-pad"
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                />

                <TextInput
                    label='Salary'
                    style={styles.inputStyle}
                    value={salary}
                    theme={theme}
                    mode="outlined"
                    onFocus={() => { setEnableShift(true) }}
                    onChangeText={text => setSalary(text)}
                />

                <TextInput
                    label='Postion'
                    style={styles.inputStyle}
                    value={position}
                    theme={theme}
                    onFocus={() => { setEnableShift(true) }}
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                />

                <Button
                    style={styles.inputStyle}
                    theme={theme}
                    icon={picture == "" ? "upload" : "check"}
                    mode="contained"
                    onPress={() => setModal(true)} >
                    Upload Image
                </Button>
                {route.params ?
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => UpdateDetails()} >
                        Update
                    </Button>
                    :
                    <Button
                        style={styles.inputStyle}
                        theme={theme}
                        icon="content-save"
                        mode="contained"
                        onPress={() => submitData()} >
                        Save
                    </Button>

                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" theme={theme} mode="contained" onPress={() => pickFromCamera()} >
                                Camera
                    </Button>
                            <Button icon="image-area" theme={theme} mode="contained" onPress={() => pickFromGallery()} >
                                Gallery
                    </Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)} >
                            Cancel
                </Button>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})


export default CreateEmployee