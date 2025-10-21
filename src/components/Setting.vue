<template>
    <navbar></navbar>
    <sidebar></sidebar>
    <div>
         Setting
    </div>
    <div class="ml-3">
          <button @click="logout"> Logout</button> 
      </div>
</template>

<script setup>
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';

function logout(){
    if(window.confirm("do you want to log out")){
          localStorage.clear()
    router.push("/")
    }
}

</script>

