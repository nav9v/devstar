<script>
	import { onMount } from 'svelte';
	
	let isDarkMode = false;
	let roomName = '';
	let displayName = '';
  
	// Function to toggle dark mode
	function toggleTheme() {
	  isDarkMode = !isDarkMode;
	  document.body.classList.toggle('light-mode');
      document.body.classList.toggle('dark-mode');
	  
	}
  
	// Function to handle form submission (create room logic)
	function createRoom() {
	  console.log('Creating room:', roomName, displayName);
	  
	}
  
	//check user's preferred theme or default to light
	onMount(() => {
	  // Example using prefers-color-scheme
	  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	  isDarkMode = prefersDark; 
	});
  </script>
  
  <style>
	/*Tailwind CSS classes here */
	@import url('https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
	@import url('https://fonts.cdnfonts.com/css/cascadia-code');
  
	/* Base styles */
	* {
	  margin: 0;
	  padding: 0;
	  box-sizing: border-box;
	  font-family: 'Plus Jakarta Display', sans-serif, 'Noto Color Emoji';
	}
  
	body, html {
	  width: 100%;
	  height: 100%;
	  overflow-x: hidden;
	  font-size: 100%;
	  transition: background-color 0.3s, ease, color 0.3s;
	}
  
	/* Light mode styles */
	body:not(.dark-mode) {
	  background-color: #fff;
	  color: #000;
	}
	body:not(.dark-mode) header {
    background-color: #fff; 
  }
  body:not(.dark-mode) .create-room input{
	  padding: 10px;
	  margin-bottom: 20px;
	  border: 1px solid #333;
	  border-radius: 5px;
	  background-color: #fff;
  }
  
	/* Dark mode styles */
	body.dark-mode {
	  background-color: #000;
	  color: #fff;
	}
  
	header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 20px;
	  background-color: #000;
	}
  
	.logo {
	  font-size: 1.5em;
	}
  
	.theme-btn {
	  padding: 10px;
	  background-color: #aa0ca5;
	  color: #fff;
	  border: none;
	  border-radius: 50%;
	  cursor: pointer;
	  width: 40px;
	  height: 40px;
	  box-sizing: border-box;
	}
	.theme-btn i {
  font-size: 20px; 
}
  
	main {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 50px 20px;
	}
  
	.intro {
	  text-align: center;
	  max-width: 600px;
	}
  
	.intro h1 {
	  font-size: 3em;
	  color: #aa0ca5;
	}
  
	.intro p {
	  margin: 10px 0;
	}
  
	.settings {
	  padding: 10px 20px;
	  background-color: #aa0ca5;
	  color: #fff;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	  margin-top: 20px;
	}
  
	.create-room {
	  margin-top: 50px;
	  max-width: 400px;
	  width: 100%;
	}
  
	.create-room h2 {
	  margin-bottom: 20px;
	}
  
	.create-room form {
	  display: flex;
	  flex-direction: column;
	}
  
	.create-room label {
	  margin-bottom: 5px;
	}
  
	.create-room input {
	  padding: 10px;
	  margin-bottom: 20px;
	  border: 1px solid #333;
	  border-radius: 5px;
	  background-color: #000;
	}
  
	.create-room button {
	  padding: 10px 20px;
	  background-color: #aa0ca5;
	  color: #fff;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.instructions {
	  margin-top: 20px;
	}
  
	.instructions ol {
	  list-style-type: decimal;
	  padding-left: 20px;
	}
  
	.instructions li {
	  margin-bottom: 10px;
	}
  
	/*for Responsiveness */
	@media (max-width: 768px) {
	  .intro h1 {
		font-size: 2.5em;
	  }
  
	  .settings {
		padding: 10px 16px;
	  }
  
	  .create-room {
		max-width: 100%;
	  }
	}
  
	@media (max-width: 480px) {
	  header {
		flex-direction: column;
		align-items: flex-start;
	  }
       .intro h1 {
		font-size: 2em;
	  }
  
	  .settings {
		width: 100%;
		padding: 10px;
	  }
  
	  .create-room input {
		padding: 8px;
	  }
  
	  .create-room button {
		padding: 10px;
	  }
	}
  </style>
  
  <svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  </svelte:head>
  
  <body class:dark-mode={isDarkMode}>
	<header>
	  <div class="logo">Chatroom</div>
	  <button class="theme-btn" on:click={toggleTheme}>
		{#if isDarkMode}
		  <i class="fas fa-sun"></i>
		{:else}
		  <i class="fas fa-moon"></i>
		{/if}
	  </button>
	</header>
  
	<main>
	  <section class="intro">
		<h1>Disposable Chatroom</h1>
		<p>Chat private. Chat free.</p>
		<p>Create your own Disposable Chatroom. It disposes after the last person leaves.</p>
		<button class="settings">Settings</button>
	  </section>
  
	  <section class="create-room">
		<h2>Create Your Room</h2>
		<form on:submit|preventDefault={createRoom}>
		  <label for="room-name">Room Name</label>
		  <input type="text" id="room-name" bind:value={roomName} placeholder="The Chatroom">
		  <label for="display-name">Display Name</label>
		  <input type="text" id="display-name" bind:value={displayName} placeholder="ex: team-74">
		  <button type="submit">Create Room</button>
		</form>
  
		<div class="instructions">
		  <p><strong>Remember:</strong></p>
		  <ol>
			<li>This is a Disposable Chatroom. Nothing is saved and it's encrypted too.</li>
			<li>Invite anyone to this chatroom by sharing the QR Code provided or copying the invite link by clicking on the button next to the link.</li>
			<li>Enjoy!</li>
		  </ol>
		</div>
	  </section>
	</main>
  </body>
  