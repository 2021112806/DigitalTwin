import "./App.css";
import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Area } from '@antv/g2plot';
import { useEffect,useState,useRef } from "react";
import { Gauge, G2 } from '@antv/g2plot';
import { Pie } from '@antv/g2plot';
import DataTable from "./chart/lineChart";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const gauge = new Gauge(containerRef.current, {
        height:100,
        percent: 0.75,
  range: {
    color: 'l(0) 0:#B8E1FF 1:#3D76DD',
  },
  startAngle: Math.PI,
  endAngle: 2 * Math.PI,
  indicator: null,
  statistic: {
    title: {
      offsetY: -36,
      style: {
        fontSize: '36px',
        color: '#4B535E',
      },
      formatter: () => '4',
    },
    content: {
      style: {
        fontSize: '24px',
        lineHeight: '44px',
        color: '#4B535E',
      },
      formatter: () => '在线设备',
    },
  },
});

gauge.render();

      return () => {
        gauge.destroy();
      };
    }
  }, [containerRef]);

  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  useEffect(() => {
    let intervalId; // 保存定时器的ID

    if (chartContainerRef.current && !chart) {
      const base = +new Date(2014, 9, 3);
      const oneDay = 24 * 3600 * 1000;
      const date = [];
    
      const data = [];
      const values = [Math.random() * 150];
      let now = new Date(base);
    
      function addData(shift) {
        const item = {};
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
        item.date = now;
        item.value = (Math.random() - 0.4) * 10 + values[values.length - 1];
        values.push(item.value);
        now = new Date(+new Date(now) + oneDay);
        data.push(item);
      }
    
      // 创建图表
      const newChart = new G2.Chart({
        container: chartContainerRef.current,
        width: 400, // 宽度自适应
        height: 200,
      });
      // 声明字段度量类型
      newChart.source(data);
      newChart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      newChart.line().position('date*value').color('#f80').size(3);
      newChart.area().position('date*value').color('#f80');
      newChart.render();
    
      setChart(newChart);
    
      let init = true;
      intervalId = setInterval(function () {
        if (init) { // 第一次载入数据
          for (let i = 1; i < 100; i++) {
            addData();
          }
          init = false;
        }
        addData();
        newChart.changeData(data); // 动态更新数据
      }, 700);
    }

    return () => {
      clearInterval(intervalId); // 在组件卸载时清除定时器
    };
  }, []); // 移除依赖，确保只在组件挂载时执行一次

  const piecontainerRef = useRef(null);

  useEffect(() => {
    if (piecontainerRef.current) {
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
      ];

      const piePlot = new Pie(piecontainerRef.current, {
        appendPadding: 10,
        data,
        height:200,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [{ type: 'element-active' }],
      });

      piePlot.render();
      setInterval(() => {
        piePlot.changeData(data.map((d) => ({ ...d, value: d.value * Math.random() })));
      }, 1200);
      return () => {
        piePlot.destroy();
      };
    }
  }, []);
  
  
  return (
    <body>
    <header>
      <h1>
<div class="neon">数据可视化</div></h1>
      <div class="show-time">
      当前时间：
      {currentTime.getFullYear()}年
      {currentTime.getMonth() + 1}月
      {currentTime.getDate()}日-
      {currentTime.getHours()}时
      {currentTime.getMinutes()}分
      {currentTime.getSeconds()}秒
      </div>
    </header>


    <section class="mainbox">

      <div class="column">
        <div class="panel bar">
          <h2>柱形图-设备数据量</h2>
          <div style={{marginTop:'-160px'}}><div ref={chartContainerRef}></div></div>
         
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
        <h2>饼形图-设备数据量</h2>
          <div style={{marginTop:'-20px'}}><div ref={piecontainerRef} id="container"></div>
      </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-设备情况</h2>
          <table id="box-table-a" summary="Employee Pay Sheet">
    <thead>
    	<tr>
        	<th scope="col">设备名称</th>
            <th scope="col">状态</th>
            <th scope="col"> PLC报警</th>
            <th scope="col">开机时间</th>
            <th scope="col">使用时间</th>

        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>机械臂1</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>

        </tr>
        <tr>
        	<td>机械臂2</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
>
        </tr>
        <tr>
        	<td>机械臂3</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>

        </tr>
        <tr>
        	<td>agv</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>

        </tr>
    </tbody>
</table>
          <div class="panel-footer"> </div>
        </div>
      </div>

      <div class="column">

        <div class="no">
          <div class="no-hd">
          <div ref={containerRef}></div>
          </div>
        </div>
        <div class="map">
        <Canvas camera={{ fov: 64, position: [200, 300, 200] }}>
      {/* 调整光源的位置 */}
      <ambientLight intensity={5} position={[-2, 2, 2]} />
      {/* 添加一个点光源 */}
      <pointLight intensity={1} position={[5, 5, 5]} />
      <OrbitControls enableZoom={true} />
      <Model />
    </Canvas>
        </div>
      </div>
      <div class="column">
        <div class="panel bar2">
          <h2>设备目前坐标</h2>
           <table id="box-table-a" summary="Employee Pay Sheet">
    <thead>
    	<tr>
        	<th scope="col">设备名称</th>
            <th scope="col">C1</th>
            <th scope="col">C2</th>
            <th scope="col">C3</th>
            <th scope="col">C4</th>
            <th scope="col">C5</th>
            <th scope="col">C6</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>机械臂1</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>机械臂2</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>机械臂3</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>agv</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
    </tbody>
</table>
          
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>设备目前坐标</h2>
          <div class="chart"> <table id="box-table-a" summary="Employee Pay Sheet">
    <thead>
    	<tr>
        	<th scope="col">设备名称</th>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col">Z</th>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>机械臂1</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>机械臂2</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>机械臂3</td>
          <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
        <tr>
        	<td>agv</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
            <td>$300</td>
            <td>$50</td>
            <td>Bob</td>
        </tr>
    </tbody>
</table></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
          <h2>饼形图-设备数据量</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>

  </body>
  //   <body style={{ margin: 0, padding: 0, height: "100vh", width: "100vw" }}>
  //   <Canvas camera={{ fov: 64, position: [2, 2, 0] }}>
  //     {/* 调整光源的位置 */}
  //     <ambientLight intensity={5} position={[-2, 2, 2]} />
  //     {/* 添加一个点光源 */}
  //     <pointLight intensity={1} position={[5, 5, 5]} />
  //     <OrbitControls enableZoom={true} />
  //     <Model />
  //   </Canvas>
  // </body>
  );
}

export default App;