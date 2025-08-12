<template>
    <section>
        <div class="container">
            <div class="bg-img flex-vert"> 
                
                
            </div>
            <div>
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, unde?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sunt iste ipsa optio obcaecati voluptas maxime itaque debitis aliquam nulla maiores quidem, fuga aut accusantium! Beatae eveniet nobis saepe!</p>
                
                <div class="flex-vert list">
                    <NuxtLink href="/stimm">                    
                        <h1> lieder wo mini stimm drin isch</h1>
                    </NuxtLink>
                    <h1> bilder wonich mis gsicht drin han</h1>
                    <h1> sache wonich ha welle ufsgchriebe ha</h1>
                    <h1> lieder woni mitgmacht ha</h1>
                    <h1> musig woni am liebschte ha</h1>

                </div>
                

            </div>
        </div>
    </section>
</template>

<script setup>
import { NuxtLink } from '#components';

 
    const array = ['dimi' , 'didi' , 'lori' , 'flo']
</script>

<style scoped>

h2 {
    font-family: Arial, Helvetica, sans-serif;
}
.item--container{
    background-color: aliceblue;
}

h1 {
    background-color: black;
    color: aliceblue;
    padding: 1px;
    display: inline-block;
    
    
    
}

h1:hover{
    color: aquamarine;
}

h1:active {
    color: aqua;
}

h1:nth-of-type(2n) {
    margin-left: 12px;
}

h1:nth-of-type(1) {
    color: rgb(234, 234, 234);
}
h1:nth-of-type(2) {
    color: rgb(213, 213, 213);
}
h1:nth-of-type(3) {
    color: rgb(179, 179, 179);
}
h1:nth-of-type(4) {
    color: rgb(142, 142, 142);
}

* {
    margin: 0px;
}
.container {
    display: grid;
    grid-template-columns: auto minmax(200px, 480px);
    height: 94.8dvh;
    overflow: hidden; /* prevent grid itself from scrolling */
    padding: 0;
}

.bg-img {
    background-image: url('public/_XT41876.webp');
    background-size: cover;
    background-position: 26%;
    height: 100%; /* fill the grid height */
}

.container > div:nth-child(2) {
    overflow-y: auto; /* enable scrolling for right column */
    height: 100%; /* match grid height */
    padding: 10px 20px;
}


    .list {
        padding: 12px 0px;
        gap: 12px !important;

    }

    div {
        padding: 10px 20px;
    }

    .flex-vert {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>