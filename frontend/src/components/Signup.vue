<template>
    <div class="container">
        <div class="row py-5 d-flex-column align-items-center justify-content-center middle-content">
            <div class="col-md-8">
                <h3 class="tex-muted text-start text-monospace">Create a new Account</h3>
                <hr>
                <form @submit.prevent="submitForm">
                    <div class="form-group my-2 ">
                        <div v-if="errors.wrong_credentials" class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            {{errors.wrong_credentials}}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div class="form-group my-2 text-start">
                            <input v-model="username"  class="form-control" type="username" name="username" placeholder="Enter Your Username">
                            <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
                        </div>
                        <div class="form-group my-2 text-start">
                            <input v-model="password" class="form-control" type="password" name="password" placeholder="Enter Your Password">
                            <small v-if="errors.password" class=" text-danger">{{ errors.password }}</small>
                        </div>
                        <div class="form-group my-2 text-start">
                            <input v-model="password2" class="form-control" type="password" name="password2" placeholder="Confirm Your Password">
                            <small v-if="errors.password2" class=" text-danger">{{ errors.password2 }}</small>
                        </div>
                        <div class="form-group d-grid gap-2 my-2">
                            <button type="submit" class="btn btn-primary ">Create Your Account</button>
                        </div>
                        <div class="form-group d-grid gap-2 my-2">
                            <p>Alredy have an account? <router-link class="text-decoration-none" to="/login">Click</router-link> here and Login now</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name:'Login',
    data(){
        return{
            username : "",
            password: "",
            password2: "",
            errors: {
                username: "",
                password: "",
                password2: "",
                wrong_credentials: ""
            }
        }
    },
    methods:{
        isValid(){
            let valid = true;
            if(!this.username){
                this.errors.username = "this feild can't be blank";
            }
            else {
                this.errors.username = "";
            }
            if(!this.password){
                this.errors.password = "this feild can't be blank";
            }
            else {
                this.errors.password = "";
            }
            if (this.password && this.password2 && this.password !== this.password2) {
                this.errors.password2 = 'Password Mismatch';
            } 
            else if (!this.password2) {
                this.errors.password2 = "This field can't be blank";
            }
            else {
                this.errors.password2 = "";
            }

            if (this.errors.username || this.errors.password || this.errors.password2){
                valid = false;
            }
            return valid;
        },
        submitForm(){
            if (this.isValid()){
                const url = '/auth/users/'
                axios.post(url, {username:this.username, password:this.password})
                .then(response=>(
                    this.username = "",
                    this.password = "",
                    this.password2 = "",
                    this.$router.push('/login')
                ))
                .catch(error=>{
                    console.log(error);
                   if(error.response.data.username){
                    this.errors.username = error.response.data.username.join();
                   }
                   else{
                    this.errors.username = "";
                   }
                   if(error.response.data.password){
                    this.errors.password = error.response.data.password.join();
                   }
                   else{
                    this.errors.password = "";
                   }
                })
            }
            else{
                console.log('invalid');
            }

        }
    }
}
</script>

<style scoped lang="scss">
.middle-content{
    height: 100vh;
}
</style>