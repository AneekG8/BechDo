const ChatBoxForSeller = (props) => {
    const {user,seller,messages,message,sendMessage,handleMessageChange} = props
    return ( 
        <>
        <div className="overflow-auto scrollbar-custom px-1" style={{maxHeight: "200px"}} id="chatBox">
        {
            messages.map( message => {
                if(message.from === 'user')
                    return (
                        <div className="d-flex mb-3" key={message._id}>
                            <a href="/profile" className="p-0">
                                <img className="avatar avatar-33 border bg-light rounded-circle text-white" alt="avatar" src={user.avatar}/>
                            </a>
                            <div className="ms-2 sellerMsg p-2 rounded">{message.body}</div>
                        </div>
                    )
                else
                    return (
                        <div className="d-flex justify-content-end mb-3" key={message._id}>
                            <div className="me-2 userMsg p-2 rounded">{message.body}</div>
                            <a href="/profile" className="p-0">
                                <img className="avatar avatar-32 border bg-light rounded-circle text-white" alt="avatar" src={seller.avatar}/>
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
        </>
     );
}
 
export default ChatBoxForSeller;