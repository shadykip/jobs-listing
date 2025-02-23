<!-- Options Api -->
 <script>
 export default {
  data(){
    return {
      title: 'Welcome to Vue Jobs!',
      status: 'pending',
      jobs:[
        {title: 'Software Engineer', company: 'ABC Corp', location: 'New York'},
        {title: 'Senior Software Engineer', company: 'XYZ Corp', location: 'San Francisco'},
        {title: 'Frontend Developer', company: 'PQR Corp', location: 'Los Angeles'}
      ]
    }
  },
  methods: {
    toggleStatus(){
      this.status = this.status === 'active'? 'pending' : 'active'
    }
  }
 }
</script>
<template>
<h1>{{ title }}</h1>
<p v-if="status === 'active'">User is active</p>
<p v-else-if="status ==='pending'">Use is pending activation</p>
<p v-else>User status is unknown</p>
<h3>Vacancies</h3>
<ul>
  <li v-for="job in jobs" :key="job.title">
    <b>{{ job.title }}</b> at {{ job.company }} in {{ job.location }}
  </li>
</ul>
<button @click="toggleStatus">Chage Status</button>
</template>


