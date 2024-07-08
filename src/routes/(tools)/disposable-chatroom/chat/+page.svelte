<script>
  import { onMount } from 'svelte';
  import io from 'socket.io-client';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';

  let messages = writable([]);
  let message = '';
  let socket;
  let userName = page.state.userName || 'Anonymous';
  let roomId;

  $: {
    roomId = $page.params.id;
  }

  onMount(() => {
    socket = io('http://localhost:5173/disposable-chatroom');
    socket.emit('joinRoom', { roomId, userName });

    socket.on('userJoined', ({ userName }) => {
      messages.update(msgs => [...msgs, { system: true, text: `${userName} joined the room` }]);
    });

    socket.on('message', ({ userName, message }) => {
      messages.update(msgs => [...msgs, { system: false, userName, text: message }]);
    });

    socket.on('userLeft', ({ userName }) => {
      messages.update(msgs => [...msgs, { system: true, text: `${userName} left the room` }]);
    });

    socket.on('roomDeleted', () => {
      alert('Room deleted');
      window.location.href = '/';
    });

    return () => {
      socket.disconnect();
    };
  });

  function sendMessage() {
    if (message) {
      socket.emit('message', message);
      messages.update(msgs => [...msgs, { system: false, userName, text: message }]);
      message = '';
    }
  }
</script>

<div>
  <h1>Room: {roomId}</h1>
  <div class="chat-box">
    {#each $messages as { system, userName, text }}
      <div class={system ? 'system-message' : 'user-message'}>
        {#if !system}<strong>{userName}: </strong>{/if}{text}
      </div>
    {/each}
  </div>
  <div class="input-box">
    <input type="text" bind:value={message} on:keypress={(e) => e.key === 'Enter' && sendMessage()} />
    <button on:click={sendMessage}>Send</button>
  </div>
</div>

<style>
  .chat-box {
    border: 1px solid #ccc;
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
  }
  .system-message {
    color: gray;
    font-style: italic;
  }
  .user-message {
    color: black;
  }
  .input-box {
    display: flex;
    margin-top: 10px;
  }
  .input-box input {
    flex: 1;
    padding: 5px;
  }
  .input-box button {
    padding: 5px;
  }
</style>
