<template>
  
  <div class=" sm:flex sm:justify-center sm:items-center mt-20 shadow-lg rounded mx-2 p-2  sm:py-10 md:mt-28 md:mx-20  xl:mt-40 xl:mx-40 2xl:mx-96 ">
    <div>
      <img class="sm:w-72 md:w-80 lg:w-96 2xl:w-[700px] " src="/src/assets/image.png" alt="">
    </div>
    <div class="sm:w-96 2xl:w-[800px] 2xl:px-2  ">
       <h2 class="text-2xl font-bold text-blue-600 text-center  mb-6 2xl:text-5xl">Welcome Back</h2>
   

    <form @submit.prevent="submitForm">
     

      <div class="mb-1 2xl:my-4">
        <label for="email" class="block text-sm font-medium text-blue-600 2xl:text-2xl"
          >Email</label
        >
        <input
          v-model="userDetails.email"
          id="email"
          type="email"
          class="w-full px-4 py-2 border 2xl:text-2xl border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
   

      <div class="mb-4 2xl:my-4">
        <label for="password" class="block text-sm  font-medium text-blue-600 2xl:text-2xl"
          >Password</label
        >
        <input
          v-model="userDetails.password"
          id="password"
          type="password"
          class="w-full px-4 py-2 border 2xl:text-2xl border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>
    

     
      <button
        @click.prevent="login"
        type="submit"
        class="w-full 2xl:my-2 py-2 2xl:text-3xl bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Log In
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600 2xl:text-3xl">
      Don't have an account?
      <RouterLink to="/SignUp">
          <button   class="text-blue-600 hover:text-blue-700">Sign Up</button>
      </RouterLink>
      
    </p>
    </div>
   
  </div>
</template>

<script setup>
import { reactive, ref,onMounted } from "vue";
import axios from "axios";
import { RouterLink,useRouter} from "vue-router";

const router = useRouter()

const userDetails = reactive({
  email: "",
  password: "",
  
});
 
async function login() {
  
  if (!userDetails.email || !userDetails.password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const result = await axios.get(
      `http://localhost:3000/users?email=${userDetails.email}&password=${userDetails.password}`
    );

    if (result.status === 200 && result.data.length > 0) {
      localStorage.setItem("user-info", JSON.stringify(result.data[0]));
      router.push("/home");
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
}




  onMounted(()=>{
      let user = localStorage.getItem('user-info')
   if(user){
    router.push("/home")
   }

  })
</script>
