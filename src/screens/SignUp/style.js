import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#fff",
        padding:20,
    },
    cont_top:{
        flex: 1,
        width:"100%",
        height:"50%",
        justifyContent:'flex-end',
        alignItems:'center'
    },
    cont_bottom:{
        flex: 1,
        width:"100%",
        height:"50%",
        justifyContent:'space-around',
        alignItems:'center',
        paddingTop:30
    },
    cont_input:{
        flexDirection:"row",
        width:"100%",
        height:50,
        alignItems:'center',
        borderBottomWidth:1,
        backgroundColor:'rgba(rgba(238,238,238,0.1))',
        borderBottomColor:"#8F8369",
        marginBottom:20,
        paddingHorizontal:6,
    },
    input:{
        width:"100%",
        height:50,
        marginLeft:8
    },
    primaty_btn:{
        width:"100%",
        height:50,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#21242d",
    },
    secundary_btn:{
        width:"100%",
        height:30,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
    },
    text_login:{
        color:"#dedede",
        fontSize:18,
        fontWeight:'600'
    },
    text_signup:{
        color:"#8F8369",
        fontSize:14,
        fontWeight:'600'
    },
    cont_options:{
        width:"100%",
        height:'100%',
    }

})

export default styles;