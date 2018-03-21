<template>
	<div>
		<div id="test">{{msg}}</div>
		<input type="text" v-model="msg" /> 
	</div>
</template>
<script>
export default {
	data() {
		return {
			msg:"1"
		}
	},
	render() {

	}
}
</script>
<style>
#test{
	color:red;
}
</style>