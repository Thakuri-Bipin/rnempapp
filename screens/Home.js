import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';

import { MyContext } from '../App';

import { dataUrl } from '../server/Connection';

//using redux
import { useSelector, useDispatch } from 'react-redux';

const Home = ({navigation}) => { //creating function modern way

    // const empdata = [
    //     {_id : "1", name : "Jimmy", email: "abc@gmail.com",salary : "5 LPA", phone : "23754", position : "Web Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ix_id=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {_id : "1", name : "Bipin", email: "asdf@gmail.com",salary : "4 LPA", phone : "2344", position : "ml Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid_=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {_id : "1", name : "John", email: "aer@gmail.com",salary : "2 LPA", phone : "2342424", position : "perl Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ix_id=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {_id : "1", name : "Max", email: "abch@gmail.com",salary : "1 LPA", phone : "234242", position : "c# Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=e_yJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {_id : "1", name : "Dany", email: "abcjj@gmail.com",salary : "10 LPA", phone : "2034", position : "c Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=ey_JhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {_id : "1", name : "Mark", email: "abcjjg@gmail.com",salary : "50 LPA", phone : "20034", position : "Web Dev", picture:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid_=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
        
    // ]

    //using map instead of flatlist
    // const renderList = empdata.map((item) =>{
    //     return(
    //         <Card style={styles.mycard} key={item.id}>
    //         <View style={styles.cardView}>
    //             <Image
    //                 style={{ width: 60, height: 60, borderRadius: 30 }}
    //                 source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }}
    //             />
    //             <View style={{ marginLeft: 10 }}>
    //                 <Text style={styles.text}>{item.name}</Text>
    //                 <Text style={styles.text}>{item.position}</Text>
    //             </View>
    //         </View>
    //     </Card>
    //     )
    // })

    //using redux
    //need to dispatch some action to update central store
    // const dispatch = useDispatch()

    // const {data,loading} = useSelector((state) => {
    //     return state
    // })

    // using redux instead
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    //using context api
    const {state, dispatch} = useContext(MyContext)
    const {data,loading} = state

    const fetchData = () => {
        fetch(dataUrl)
        .then(res => res.json())
        .then(results => {
            // setData(results)
            // setLoading(false)
            //using redux, (dispatch)
            dispatch({
                type :'ADD_DATA',
                payload : results
            })
            dispatch({
                type :'SET_LOADING',
                payload : false
            })
            //heading to reducer
        }).catch(err => {
            Alert.alert("Something Went Wrong!!")
        })
    }

    //fetch external data
    useEffect(() => {
        fetchData()
    }, [])

    const renderList = ((item) =>{
        return(
            //sending item data of each profile to the profile page for dynamic data content 
            <Card style={styles.mycard} onPress={() => navigation.navigate("Profile", {item})}> 
            <View style={styles.cardView}>
                <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{ uri: item.picture }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.position}</Text>
                </View>
            </View>
        </Card>
        )
    })

    return (
        <View>
            {/* 
            {renderList}
            //Instead of map flatlist is used
            */}

            <FlatList 
            data={data}
            renderItem={({item}) =>{
              return  renderList(item)
            }}
            keyExtractor={item => item._id}
            onRefresh={() => fetchData()}
            refreshing={loading}
            />
   

            <FAB onPress={() => navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"blue"}}}
            />


            
        </View>
    );
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,


    },
    cardView: {
        flexDirection: "row",
        padding: 6,
    },
    text: {
        fontSize: 18,

    },
    fab:{
        position: 'absolute',
        margin : 16,
        right : 0,
        bottom: 0
        
    },
})

export default Home;