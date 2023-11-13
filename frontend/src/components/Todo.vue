<template>
    <div class="container">
        <div class="row py-5 d-flex-column align-items-center justify-content-center middle-content">

            <div class="col-md-12">
                <h3 class="tex-muted text-monospace">Todos</h3>
                <hr>
                <form @submit.prevent="addTodo">
                    <div class="form-group my-2 ">

                        <div class="d-flex">
                            <input v-model="title" class="form-control" type="text" name="title" placeholder="What you want to do Today">
                            <button class="btn btn-primary ms-2" type="submit">Add</button>
                        </div>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody class="text-start">
                                <tr v-for="todo in todos" :key="todo.id">
                                <td>{{ todo.title }}</td>
                                <td v-if="todo.completed">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                </td>
                                <td v-else>
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                                </td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square ms-2" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </form>
                <div class="form-group d-grid gap-2 my-2">
                    <button type="submit" class="btn btn-danger">Logout from this Account</button>
                </div>
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
            todos: []
        }
    },
    methods:{
        fetchTodoList(){
            axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`
            const url = '/list-create-todo/'
            axios.get(url)
            .then(response=>{
                this.todos = response.data
            })
            .catch(error=>{
                console.log(error);
            })
        }

    },
    mounted(){
        this.fetchTodoList()
    }
}
</script>

<style scoped lang="scss">
.middle-content{
    height: 100vh;
}
</style>