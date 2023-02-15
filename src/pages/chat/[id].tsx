import Sidebar from '@/components/Sidebar'
import { Avatar, Button, ChakraProvider, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { auth, db } from 'firebaseconfig'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { getOtherEmail } from 'utils/getOtherEmail'

const TopBar = ({ email }) => {
    return (
        <Flex bg={'gray.100'} h='80px' w={'100%'} align='center' p={5}>
            <Avatar marginEnd={3} />
            <Heading size={'lg'}>{email}</Heading>
        </Flex>
    )
}

const BottomBar = () => {
    return (
        <FormControl bg={'blue.200'} w='100%' p={3}>
            <Input type={'Type a message...'} autoComplete='off' />
            <Button type='submit' hidden>Sumbit</Button>
        </FormControl>
    )
}

const ChatId = () => {
    const router = useRouter()
    const { id } = router.query
    const [user] = useAuthState(auth)
    const [chat] = useDocumentData(doc(db, 'chats', id))
    console.log(chat);

    const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'))
    const [messages] = useCollectionData(q)

    const getMessages = () =>
        messages?.map(msg => {
            const sender = msg.sender === user?.email
            return (
                <Flex key={Math.random()} bg={sender ? 'green.200' : 'gray.100'} alignSelf={sender ? 'flex-end' : 'flex-start'}
                    w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1}>
                    <Text>{msg.text}</Text>
                    {/* <Text>{msg.timestamp}</Text> */}
                </Flex>
            )
        })

    return (
        <ChakraProvider>
            <Flex>
                <Sidebar />
                <Flex h={'100vh'} width='100%'>
                    <Flex bg={'blue.100'} flex={1} direction='column'>
                        <TopBar email={getOtherEmail(chat?.users, user)} />
                        <Flex flex={1} direction='column' pt={4} mx={5}>
                            {getMessages()}
                        </Flex>
                        <BottomBar />
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}

export default ChatId