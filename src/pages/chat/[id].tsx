import Sidebar from '@/components/Sidebar'
import { Avatar, Button, ChakraProvider, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import { addDoc, collection, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore'
import { auth, db } from 'firebaseconfig'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { getOtherEmail } from 'utils/getOtherEmail'

// const TopBar = () => {
//     return (
//         <Flex bg={'gray.100'} h='80px' w={'100%'} align='center' p={5}>
//             <Avatar marginEnd={3} />
//             <Heading size={'lg'}>{email}</Heading>
//         </Flex>
//     )
// }

const ChatId = () => {
    const router = useRouter()
    const bottomChat = React.useRef()
    const { id } = router.query
    const [user] = useAuthState(auth)
    // const [chat] = useDocumentData(doc(db, "chats", id))

    //GET
    const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'))
    const [messages] = useCollectionData(q)

    //POST
    const BottomBar = () => {
        const [input, setInput] = React.useState('')

        const sendMsg = async (e: any) => {
            e.preventDefault()
            try {
                await addDoc(collection(db, `chats/${id}/messages`), {
                    text: input,
                    sender: user?.email,
                    timestamp: serverTimestamp()
                })
                setInput('')
            } catch {
                alert('Something is wrong...')
            }
        }

        return (
            <FormControl bg={'blue.200'} w='100%' p={3}
                onSubmit={sendMsg} as='form'>
                <Input type={'text'} placeholder={'Type a message...'} autoComplete='off' onChange={(e) => setInput(e.target.value)} />
                <Button type='submit' hidden>Sumbit</Button>
            </FormControl>
        )
    }

    //DELETE
    const onDelete = async () => {
        try {
            await deleteDoc(doc(db, `chats/${id}/messages`))
        } catch {
            alert('Something is wrong...')
        }
    }

    //MESSAGES
    const getMessages = () =>
        messages?.map(msg => {
            const sender = msg.sender === user?.email
            return (
                <Flex key={Math.random()} bg={sender ? 'green.200' : 'gray.100'} alignSelf={sender ? 'flex-end' : 'flex-start'}
                    w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1} justifyContent='space-between'>
                    <Text>{msg.text}</Text>
                    <img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" width='24px' height='26px' style={{ cursor: 'pointer' }} onClick={onDelete} />
                    {/* <Text>{msg.timestamp}</Text> */}
                </Flex>
            )
        })

    //SCROLL
    React.useEffect(() => {
        setTimeout(
            bottomChat.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            }), 100
        )
    }, [messages])

    return (
        <ChakraProvider>
            <Flex>
                <Sidebar />
                <Flex h={'100vh'} width='100%'>
                    <Flex bg={'blue.100'} flex={1} direction='column'>
                        {/* <TopBar email={getOtherEmail(chat?.users, user)} /> */}
                        <Flex flex={1} direction='column' pt={4} mx={5}>
                            {getMessages()}
                            <div ref={bottomChat}></div>
                        </Flex>
                        <BottomBar />
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}

export default ChatId