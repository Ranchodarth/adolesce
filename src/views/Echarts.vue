<template>
  <div class="EchartPractice">
    <div id="main"></div>
  </div>
</template>

<script>
export default {
  name: "EchartPractice",
  methods: {
    drawChart() {
      let myEchart = this.$echarts.init(document.getElementById("main"));
      var symbolSize = 20;
      var data = [
        [40, -10],
        [-30, -5],
        [-76.5, 20],
        [-63.5, 40],
        [-22.1, 50],
      ];

      let option = {
        title: {
          text: "Try Dragging these Points",
          left: "center",
        },
        tooltip: {
          triggerOn: "none",
          formatter: function (params) {
            return (
              "X: " +
              params.data[0].toFixed(2) +
              "<br>Y: " +
              params.data[1].toFixed(2)
            );
          },
        },
        grid: {
          top: "8%",
          bottom: "12%",
        },
        xAxis: {
          min: -100,
          max: 70,
          type: "value",
          axisLine: { onZero: false },
        },
        yAxis: {
          min: -30,
          max: 60,
          type: "value",
          axisLine: { onZero: false },
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "none",
          },
          {
            type: "slider",
            yAxisIndex: 0,
            filterMode: "none",
          },
          {
            type: "inside",
            xAxisIndex: 0,
            filterMode: "none",
          },
          {
            type: "inside",
            yAxisIndex: 0,
            filterMode: "none",
          },
        ],
        series: [
          {
            id: "a",
            type: "line",
            smooth: true,
            symbolSize: symbolSize,
            data: data,
          },
        ],
      };

      setTimeout(function () {
        // Add shadow circles (which is not visible) to enable drag.
        myEchart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              type: "circle",
              position: myEchart.convertToPixel("grid", item),
              shape: {
                cx: 0,
                cy: 0,
                r: symbolSize / 2,
              },
              invisible: true,
              draggable: true,
              ondrag: function (dx, dy) {
                onPointDragging(dataIndex, [this.x, this.y]);
              },
              onmousemove: function () {
                showTooltip(dataIndex);
              },
              onmouseout: function () {
                hideTooltip(dataIndex);
              },
              z: 100,
            };
          }),
        });
      }, 0);

      window.addEventListener("resize", updatePosition);

      myEchart.on("dataZoom", updatePosition);

      function updatePosition() {
        myEchart.setOption({
          graphic: data.map(function (item, dataIndex) {
            return {
              position: myEchart.convertToPixel("grid", item),
            };
          }),
        });
      }

      function showTooltip(dataIndex) {
        myEchart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: dataIndex,
        });
      }

      function hideTooltip(dataIndex) {
        myEchart.dispatchAction({
          type: "hideTip",
        });
      }

      function onPointDragging(dataIndex, pos) {
        data[dataIndex] = myEchart.convertFromPixel("grid", pos);

        // Update data
        myEchart.setOption({
          series: [
            {
              id: "a",
              data: data,
            },
          ],
        });
      }
      myEchart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style scoped>
#main {
  width: 600px;
  height: 400px;
  margin: auto;
  margin-top: 100px;
}
</style>
