<script>
  import { nav } from "./stores.js";
  import Messages from "./Messages.svelte";
  import Settings from "./Settings.svelte";
  import Nav from "./ui/Nav.svelte";
  import Page from "./ui/Page.svelte";
  import Footer from "./Footer.svelte";
</script>
<div class="small-card gap-4 items-center overflow-hidden rounded-lg ">

{#if $nav === "settings"}
  <Page>
    <Nav>Sign In</Nav>
    <Settings />
    <Footer />
  </Page>
{:else if $nav === "messages"}
  <Page>
    <Nav
      showBack
      backText="Sign In"
      on:back={() => {
        $nav = "settings";
      }}
    >
      Messages
    </Nav>
    <Messages />
  </Page>
{/if}
</div>

<style>
  .small-card {
        width: 500px; /* Adjust the width as needed */
        padding: 16px; /* Adjust the padding as needed */
        margin: 0 auto; /* Center the card horizontally */
        box-shadow: 0 5px 10px #8f8f8f;
        border-radius: 8px; /* Adjust the border-radius as needed */
        overflow: hidden;
        max-width: 100%;
    }
</style>
