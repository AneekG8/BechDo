import './Product.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import ChatBoxForSeller from './ChatBoxForSeller'

const ChatForSeller = (props) => {
    const {seller,product_id} = props

    const initialState = {
        chat: {
            show: false,
            user: '',
            messages: [],
            message: ""
        },
        users: []
    }

    const [state,setState] = useState(initialState)

    const scroll = ()=>{

        const chatBox = document.querySelector('#chatBox')

        if(chatBox)
            chatBox.scrollTop = chatBox.scrollHeight
    }

    useEffect(()=>{
        scroll()
    },[state.chat.messages])


    useEffect(()=>{
        console.log('use effect from chat for seller')
        axios.get('/api/messages/'+product_id)
        .then( res => {
            setState(prevState => ({
                ...prevState,
                users: res.data
            }))
        })
    },[product_id])

    const showChat = (user_id) =>{
        axios.get(`/api/messages/${product_id}/${user_id}`)
        .then( res => {
            setState(prevState => ({
                ...prevState,
                chat: {
                    show: true,
                    user: res.data.user,
                    messages: res.data.messages,
                    message: ''
                }
            }))
        })
        .catch( err => {
            console.log(err)
        })
    }

    const hideChat = ()=>{
        setState(prevState => ({
            ...prevState,
            chat:{
                ...state.chat,
                show: false
            }
        }))
    }

    const sendMessage = (e)=>{
        e.preventDefault()

        if(state.chat.message){
            axios.post('/api/messages',{
                body: state.chat.message,
                product_id,
                user_id: state.chat.user._id,
                from: 'seller'
            })
            .then( res => {
                showChat(state.chat.user._id)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }

    const handleMessageChange = (e)=>{
        setState(prevState => ({
            ...prevState,
            chat: {
                ...state.chat,
                message: e.target.value
            }
        }))
    }

    return ( 
        <>
            <div className="accordion-item my-3 ">
                <h2 className="accordion-header" id="headingOne">
                    <button onClick={scroll} className="btn btn-dark w-100 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        chat with users <i className="ms-1 fas fa-chevron-down text-white" style={{fontSize: '15px'}}></i>
                    </button>
                    {state.chat.show && <div className="text-end pe-1"><i className="far fa-window-close cursor-pointer" onClick={hideChat}></i></div>}
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {
                            !state.chat.show ?
                            <div className="overflow-auto scrollbar-custom px-1" style={{maxHeight: "200px"}} id="chatBox">
                            {state.users.map( user => (
                                <div className="d-flex mb-3 cursor-pointer" onClick={()=>{showChat(user._id)}} key={user._id}>
                                    <div>
                                        <img className="avatar avatar-32 border bg-light rounded-circle text-white" alt="avatar" src={user.avatar}/>
                                    </div>
                                    <div className="ms-3">
                                        <div><b> {user.firstName + " " + user.lastName} </b></div>
                                    </div>
                                </div>
                            ))}
                            </div>
                            :
                            <ChatBoxForSeller
                                handleMessageChange={handleMessageChange}
                                message={state.chat.message} 
                                sendMessage={sendMessage} 
                                messages = {state.chat.messages} 
                                user={state.chat.user} 
                                seller={seller}
                            />
                        }
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default ChatForSeller;