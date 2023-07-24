<template>
    <div class="prograssbar">
        <div class="circle" :style="circleStyle">
            <div class="circle-inside" :style="circleInsideStyle">{{ percent }}%</div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Prograssbar',
    props: ['percent'],
    data: function () {
        return {
            width: '50px',
            barWidth: '12px'
        }
    },
    computed: {
        circleStyle: function () {
            var deg = 'calc(360deg * ' + this.percent / 100 + ')';
            var color;
            if (this.percent < 25) {
                color = 'red';
            } else if (this.percent < 60) {
                color = 'orange';
            } else if (this.percent < 80) {
                color = 'yellow';
            } else if (this.percent <= 100) {
                color = 'green';
            }
            return {
                width: this.width,
                height: this.width,
                backgroundImage: 'conic-gradient(' + color + ' ' + deg + ', #131b3b ' + deg + ')'
            };
        },
        circleInsideStyle: function () {
            return {
                width: 'calc(' + this.width + ' - ' + this.barWidth + ')',
                height: 'calc(' + this.width + ' - ' + this.barWidth + ')',
                borderRadius: '50%',
                color: "white",
                background: 'black',
                position: 'absolute',
                display: 'flex',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid white'
            };
        },
    }
}
</script>

<style>
.circle {
    stroke: url(#gradientStyle);
    stroke-width: 4px;
    stroke-dasharray: 503;
    stroke-dashoffset: 503;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    transition: 2s stroke-dashoffset;
    border-radius: 50%;
    margin: 0px auto;
    position: relative;
    border: 1px solid white;
}
</style>