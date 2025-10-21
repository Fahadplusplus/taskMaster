<template>
  <div class=" sm:flex sm:justify-center sm:items-center mt-20 shadow-lg rounded mx-2 p-2  sm:py-10 md:mt-28 md:mx-20  xl:mt-40 xl:mx-40 2xl:mx-96 ">
    <div>
       <img class="sm:w-72 md:w-80 lg:w-96 2xl:w-[700px] " src="/src/assets/image.png" alt="">
       
    </div>
   
    <div class="sm:w-96 2xl:w-[800px] 2xl:px-2 ">
        <h2 class="text-2xl font-bold text-blue-600 text-center mb-6 2xl:text-5xl">Create Account</h2>

    <form @submit.prevent="submitForm">
      <div class="mb-1 2xl:my-2">
        <label for="name" class="block text-sm font-medium text-blue-600 2xl:text-2xl"
          >Name</label
        >
        <input
          v-model="userDetails.name"
          id="name"
          type="text"
          class="w-full px-4 py-2  2xl:text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your name"
        />
      </div>
      <span v-if="isName" class="text-red-700">*Enter a valid Name</span>

      <div class="mb-1 2xl:my-2">
        <label for="email" class="block text-sm font-medium text-blue-600 2xl:text-2xl"
          >Email</label
        >
        <input
          v-model="userDetails.email"
          id="email"
          type="email"
          class="w-full px-4 py-2 border border-gray-300 2xl:text-2xl rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <span v-if="isEmail" class="text-red-700">*Enter a valid Valid</span>

      <div class="mb-1 2xl:my-2">
        <label for="password" class="block text-sm font-medium text-blue-600 2xl:text-2xl"
          >Password</label
        >
        <input
          v-model="userDetails.password"
          id="password"
          type="password"
          class="w-full px-4 py-2 border border-gray-300 2xl:text-2xl rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>
      <span v-if="isPass" class="text-red-700">*Enter a valid Password</span>

      <div class="mb-1 2xl:my-2">
        <label
          for="confirmPassword"
          class="block text-sm font-medium text-blue-600 2xl:text-2xl"
          >Confirm Password</label
        >
        <input
          v-model="userDetails.confirmPassword"
          id="confirmPassword"
          type="password"
          class="w-full px-4 py-2 border border-gray-300 2xl:text-2xl rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Confirm your password"
        />
      </div>
      <span v-if="isConfirmPass" class="text-red-700">*passwords dont match</span>

   
       <button
        @click.prevent="handelSubmit"
        type="submit"
        class="w-full 2xl:my-2 py-2 2xl:text-3xl bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
   
    </form>

    <p class="mt-4 text-center text-sm text-gray-600 2xl:text-3xl">
      Already have an account?
      <RouterLink to="/">
          <button  class="text-blue-600 hover:text-blue-700">Log in</button>
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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

let isName = ref(false);
let isEmail = ref(false);
let isPass = ref(false);
let isConfirmPass = ref(false);

function handelSubmit() {
  isName.value = false;
  isEmail.value = false;
  isPass.value = false;
  isConfirmPass.value = false;

  if (userDetails.name.length < 3 || !/^[A-Za-z]+$/.test(userDetails.name)) {
    isName.value = true;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
    isEmail.value = true;
  }
  if (userDetails.password.length < 5) {
    isPass.value = true;
  }
  if (userDetails.password != userDetails.confirmPassword) {
    isConfirmPass.value = true;
  }

  if (
    !isName.value &&
    !isEmail.value &&
    !isPass.value &&
    !isConfirmPass.value
  ) {
    async function submitForm() {
      try {
       let result  = await axios.post('http://localhost:3000/users', {
             "name": userDetails.name,
        "email": userDetails.email,
        "password": userDetails.password
        });
        userDetails.name = "";
        userDetails.email = "";
        userDetails.password = "";
        userDetails.confirmPassword = "";
        localStorage.setItem("user-info",JSON.stringify(result.data))
          router.push("/home")
        
      } catch(error) {
         console.error('Error submitting form:', error);
            alert('Failed to submit data.');
      }


    }
    submitForm()

  }


}
  onMounted(()=>{
      let user = localStorage.getItem('user-info')
   if(user){
    router.push("/home")
   }

  })

</script>
