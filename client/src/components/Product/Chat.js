import './Product.css'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Chat = (props) => {
    const {user,seller,product_id} = props

    console.log(user._id,product_id)

    const [messages,setMessages] = useState([])

    const [message,setMessage] = useState('')

    useEffect(()=>{
        axios.get('/api/messages',{
            params: {
                product_id,
                user_id: user._id
            }
        })
        .then( res => {
            setMessages(res.data)
        })
        .catch( err => {
            console.log(err)
        })
        
        const chatBox = document.querySelector('#chatBox')
        chatBox.scrollTop = chatBox.scrollHeight

    },[product_id,user])

    const sendMessage = (e)=>{
        e.preventDefault()

        if(message){
            axios.post('/api/messages',{
                body: message,
                product_id,
                user_id: user._id,
                from: 'user'
            })
            .then( res=> {
                // setMessages( prevMessages => {
                //     prevMessages.push(res.data)
                //     return prevMessages
                // })
                setMessage('')
            })
            .catch( err => {
                console.log(err)
            })
        }
    }

    const handleMessageChange = (e)=>{
        setMessage(e.target.value)
    }

    return ( 
        <>
            <div className="accordion-item mb-3">
                <h2 className="accordion-header" id="headingOne">
                <button className="btn btn-dark w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    chat with seller
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <div className="overflow-auto scrollbar-custom px-1" style={{maxHeight: "200px"}} id="chatBox">
                            {
                                messages.map( message => {
                                    if(message.from === 'seller'){
                                        return (
                                            <div className="d-flex mb-3" key={message._id}>
                                                <a href="/profile" className="p-0">
                                                    <img className="avatar avatar-33 border bg-light rounded-circle text-white" alt="avatar" src={seller.avatar}/>
                                                </a>
                                                <div className="ms-2 sellerMsg p-2 rounded">{message.body}</div>
                                            </div>
                                        )
                                    }
                                    else
                                        return (
                                            <div className="d-flex justify-content-end mb-3" key={message._id}>
                                                <div className="me-2 userMsg p-2 rounded">{message.body}</div>
                                                <a href="/profile" className="p-0">
                                                    <img className="avatar avatar-32 border bg-light rounded-circle text-white" alt="avatar" src={user.avatar}/>
                                                </a>
                                            </div>
                                        )
                                })
                            }
                        </div>
                        <form onSubmit={sendMessage}>
                            <div className="input-group mt-3">
                                <input type="text" name="message" value={message} onChange={handleMessageChange} required className="form-control" placeholder="Type your message here..." aria-label="message" aria-describedby="button-addon2"/>
                                <button className="btn btn-dark" type="submit" id="button-addon2">send</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Chat;