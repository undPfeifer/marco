<template>
    <div>
        <router-link to="/home" active-class="active-link">♋︎</router-link>
<router-link to="/beat" active-class="active-link">❡</router-link>
<router-link to="/" active-class="active-link">☭</router-link>

    </div>
</template>

<style scoped>
    div{
        position: fixed;
        bottom: 0px;
        height: 50px;
        display: flex;
        gap: 0px;
        width: 100%;
        
    }
    a {
        background-color: rgb(0, 0, 0);
        color: rgb(125, 125, 125);

        font-size: 32px;

        padding: 0px 0px 10px 0px;        
        width: 100%;
        text-align: center;
    }
    .active-link {
        color: white;
    }
</style>