<template>
    <div>
        <input :value="message" @InputEvent="updateMessage" />
        <button @click="sendMessage">{{ buttonLabel }}</button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    message: string
    sendMessage: () => void
    buttonLabel: string
}

const props: Props = {
    message: '',
    sendMessage: () => { },
    buttonLabel: 'Send'
}

const buttonLabel=ref(props.buttonLabel) 
const message = ref(props.message)

const updateMessage = (event: InputEvent) => {
    message.value = (event.target as HTMLInputElement).value
}

const sendMessage = () => {
    props.sendMessage()
}
</script>
