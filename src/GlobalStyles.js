import { StyleSheet } from "react-native";

const Globalstyles = StyleSheet.create({

    safearea:{
        flex: 1,
        width:"100%",
        height:"100%",
    },

    container: {
        flex: 1,
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#434957",
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
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:30
    },
    cont_input:{
        width:"100%",
        height:50,
        borderBottomWidth:1,
        backgroundColor:'rgba(rgba(238,238,238,0.1))',
        borderBottomColor:"#8F8369",
        marginBottom:20,
        paddingHorizontal:6,
    },
    input:{
        width:"100%",
        height:50,
    },
    btn_login:{
        width:"100%",
        height:50,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#21242d",
    },
    text_login:{
        color:"#dedede",
        fontSize:18,
        fontWeight:'600'
    },
    text_signup:{
        color:"#fff",
        fontSize:14,
        fontWeight:'600'
    },
    line:{
        width:"100%",
        height:50,
        flexDirection:'row',
        justifyContent:'flex-end'

    },
    lineFree:{
        width:'100%',
        height:100,
        justifyContent:'space-around',
        marginTop:30
    }


})

export default Globalstyles;