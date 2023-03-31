<template>
    <ProgressBar bar-color="#dc720f" val="60" text="60%"></ProgressBar>
<!-- <progress-bar bar-color="#dc720f" val="60" text="60%"></progress-bar> -->
</template>
    
<script>
import ProgressBar from 'vue-simple-progress';

export default {
    name: 'LinearProgressBar',
    components: { ProgressBar }
}
</script>
