
<!-- Composition Api -->
 <script setup>
 import {ref,onMounted} from 'vue'
 const title='Welcome to Vue Jobs!';
 const  status= ref('active');
 const  newJobTitle=ref('');
 const  newJobCompany=ref('');
 const  newJobLocation=ref('');
 const  jobs=ref(
  [
        {title: 'Software Engineer', company: 'ABC Corp', location: 'New York'},
        {title: 'Senior Software Engineer', company: 'XYZ Corp', location: 'San Francisco'},
        {title: 'Frontend Developer', company: 'PQR Corp', location: 'Los Angeles'}
      ]
 )
  const  addJob=()=> jobs.value.push({title: newJobTitle.value, company: newJobCompany.value, location: newJobLocation.value}) // Method to add new job{
  const  toggleStatus=()=> status.value = status.value === 'active'? 'pending' : 'active' // Method to toggle status{
  const  deleteJob=(index)=> jobs.value.splice(index, 1) // Method to delete job
  onMounted( async()=> {
    // fetch data from todos typecode
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    console.log(data) // Prints the fetched data to the console for debugging purposes
    // Add fetched data to jobs array
    // jobs.value.push({title: data.title, company: data.company, location: data.address.city})

    
  })
    
</script>
<template>
<h1>{{ title }}</h1>
<p v-if="status === 'active'">User is active</p>
<p v-else-if="status ==='pending'">Use is pending activation</p>
<p v-else>User status is unknown</p>
<h3>Vacancies</h3>
<ul>
  <!-- button to delete -->
  <li v-for="(job,index) in jobs" :key="job.title">
    <b>{{ job.title }}</b> at {{ job.company }} in {{ job.location }}
    <button @click="deleteJob(index)">Delete</button>

  </li>
</ul>
<br>
<!-- Form to add new job -->
 <form @submit.prevent="addJob">
  <input type="text" v-model="newJobTitle" placeholder="Job Title"/>
  <input type="text" v-model="newJobCompany" placeholder="Company"/>
  <input type="text" v-model="newJobLocation" placeholder="Location"/>
  <button type="submit">Add Job</button>
</form>
<button @click="toggleStatus">Chage Status</button>
</template>


