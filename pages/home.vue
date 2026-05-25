<template>
  <section>
    <AppNav />
    <div class="wrapper">
      <RandomWord />
    </div>
    <playsong />
  </section>
</template>

<style>
section {
  padding: 20px;
  background-color: yellow;
  min-height: 100vh;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 400px;
}
</style>
