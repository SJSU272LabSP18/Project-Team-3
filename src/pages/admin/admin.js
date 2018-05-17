import React from "react";
import {rBridge,ajax,formHandler} from '../../commons/helpers';
import { AreaChart,Area,BarChart, Bar, LineChart,XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,ScatterChart,Scatter } from 'recharts';

class Dashboard extends React.Component {

  state = {

      chart1:[],
      chart2:[],
      chart3:[],
      chart4:[],
      chart5:[],
      chart6:[],
      chart7:[]

  }


  componentDidMount() {

      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');
          }

      },3400);

      this.makeRequestChart1();
      this.makeRequestChart2();
      this.makeRequestChart3();
      this.makeRequestChart4();
      this.makeRequestChart5();
      this.makeRequestChart6();
      this.makeRequestChart7();


  }

  makeRequestChart1 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];


          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp.revenue,
              name: temp.name
            });

          });

          obj.setState({ chart1 : chartData });

        }, "/v1/api/chart1","get");


    }


    makeRequestChart2 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];

          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp.revenue,
              name: temp.name
            });

          });

          obj.setState({ chart2 : chartData });

        }, "/v1/api/chart2","get");


    }

     makeRequestChart3 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];

          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp.tickets,
              name: temp.name
            });

          });

          obj.setState({ chart3 : chartData });

        }, "/v1/api/chart3","get");


    }


     makeRequestChart4 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];

          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp,
              name: k.replace("http://localhost:3000","").replace("/dashboard","")
            });

          });

          obj.setState({ chart4 : chartData });

        }, "/v1/api/chart4","get");


    }

      makeRequestChart5 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];

          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp,
              name: k
            });

          });

          obj.setState({ chart5: chartData });

        }, "/v1/api/chart5","get");


    }


     makeRequestChart6 = () => {

      let obj = this;

        ajax({},function(response){

          var chartData = [];

          Object.keys(response).map(k => {
              var temp = response[k];
              chartData.push({
              value: temp,
              name: k
            });

          });

          obj.setState({ chart6: chartData });

        }, "/v1/api/chart6","get");


    }


     makeRequestChart7 = () => {

      let obj = this;

        ajax({},function(response){

          obj.setState({ chart7 : response });

        }, "/v1/api/chart7","get");


    }


	render() {

     var opts = {}


     var trace = [];

     Object.keys(this.state.chart7).map(k => {


     });





		return (

        <div className="row">

            <div className="col-12 col-lg-4">

                <div className="fr-widget">
                 <div className="title">
                     <h3>First 10 Movies with Revenue</h3>
                  </div>

                  <div className="fr-widget-body">
                      <LineChart width={400} height={400} data={this.state.chart1}>
                        <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
                      </LineChart>
                  </div>
                </div>

            </div>

            <div className="col-12 col-lg-4">

                 <div className="fr-widget">
                 <div className="title">
                     <h3>First 10 Movies with Revenue for City San Jose</h3>
                  </div>

                  <div className="fr-widget-body">
                      <BarChart width={400} height={400} data={this.state.chart2}>
                        <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />

                         <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                  </div>
                </div>

            </div>

            <div className="col-12 col-lg-4">

                <div className="fr-widget">
                 <div className="title">
                     <h3>Revenue by Movie Hall</h3>
                  </div>

                  <div className="fr-widget-body">
                      <BarChart width={400} height={400} data={this.state.chart3}>
                        <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                  </div>
                </div>

            </div>

             <div className="col-12 col-lg-4">


                <div className="fr-widget">
                 <div className="title">
                      <h3>Clicks Per Page</h3>
                  </div>

                  <div className="fr-widget-body">
                     <AreaChart width={400} height={400} data={this.state.chart4} >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
                      </AreaChart>
                  </div>
                </div>

            </div>

            <div className="col-12 col-lg-4">


                <div className="fr-widget">
                 <div className="title">
                     <h3>Clicks Per Movie</h3>
                  </div>

                  <div className="fr-widget-body">
                      <BarChart width={400} height={400} data={this.state.chart5}>
                        <XAxis dataKey="name"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                  </div>
                </div>

            </div>

             <div className="col-12 col-lg-4">


                 <div className="fr-widget">
                 <div className="title">
                     <h3>Number of reviews per Movie</h3>
                  </div>

                  <div className="fr-widget-body">
                     <AreaChart width={400} height={400} data={this.state.chart5} >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='value' stroke='#d989de' fill='#d989de' />
                      </AreaChart>
                  </div>
                </div>

            </div>

                    { Object.keys(this.state.chart7).map(k =>
            <div key={k} className="col-12 col-lg-6">

              <div className="fr-widget">
                 <div className="title">
                    <h3>User Trace for {k}</h3>
                  </div>

                  <div className="fr-widget-body">
                     <LineChart width={600} height={400} data={this.state.chart7[k]}>
                        <XAxis dataKey="page"/>
                         <YAxis/>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <Tooltip/>
                         <Legend />
                         <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
                      </LineChart>

                  </div>
                </div>


            </div>
             )}

        </div>
		);

	}

}

export default rBridge(Dashboard);
