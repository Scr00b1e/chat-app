import Sidebar from '@/components/Sidebar'
import { Avatar, Button, ChakraProvider, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from 'firebaseconfig'
import { useRouter } from 'next/router'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const TopBar = () => {
    return (
        <Flex bg={'gray.100'} h='80px' w={'100%'} align='center' p={5}>
            <Avatar marginEnd={3} />
            <Heading size={'lg'}>SomeFella@gmail.com</Heading>
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

    const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'))
    const [messages] = useCollectionData(q)
    console.log(messages);

    return (
        <ChakraProvider>
            <Flex>
                <Sidebar />
                <Flex h={'100vh'} width='100%'>
                    <Flex bg={'blue.100'} flex={1} direction='column'>
                        <TopBar />
                        <Flex flex={1} direction='column' pt={4} mx={5}>
                            {
                                messages?.map(msg => (
                                    <Flex key={Math.random()} bg={'green.200'} w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1}>
                                        <Text>{msg.text}</Text>
                                    </Flex>
                                ))
                            }
                        </Flex>
                        <BottomBar />
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}

export default ChatId