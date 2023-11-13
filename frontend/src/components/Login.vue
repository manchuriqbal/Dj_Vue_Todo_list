<template>
    <div class="container">
        <div class="row py-5 d-flex-column align-items-center justify-content-center middle-content">
            <div class="col-md-8">
                <h3 class="tex-muted text-start text-monospace">Login your Account</h3>
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
                        <div class="form-group d-grid gap-2 my-2">
                            <button type="submit" class="btn btn-primary ">Login Your Account</button>
                        </div>
                        <div class="form-group d-grid gap-2 my-2">
                            <p>Don't have any account? <router-link class="text-decoration-none" to="/signup">Click</router-link> here and Register now</p>
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
            errors: {
                username: "",
                password: "",
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
            if (this.errors.username || this.errors.password){
                valid = false;
            }
            return valid;
        },
        submitForm(){
            if (this.isValid()){
                const url = '/login/'
                axios.post(url, {username:this.username, password:this.password})
                .then(response=>(
                    this.$store.commit("setToken", response.data),
                    this.username = "",
                    this.password = "",
                    this.$router.push('/')
                ))
                .catch(error=>{
                    if (error.response.data.non_field_errors){
                        this.errors.wrong_credentials = error.response.data.non_field_errors.join()
                    }
                    else { 
                        this.errors.wrong_credentials = ""
                    }
                })
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