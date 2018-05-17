import React from "react";
import Dropzone from 'react-dropzone';
import {ajax,ajaxMultiparts,rBridge} from '../commons/helpers';

import { ToastContainer, toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import Loader from '../components/loader';


class CrudMake extends React.Component {

  state = {
  	entity: false,
  	mode : 'create',
  	message : 'has been created!',
  	dates : {},
  	select : {},
  	options:{},
  }

  componentWillMount() {

  	this.tfiles = {};
  	this.upload_names = [];

  	var options = {};
  	let obj = this;



  }

  componentDidMount() {
  	  let obj = this;

  	  var dates = {};
	  var select = {};
	  var options = {};

	  /**
  	 * Populate entities
  	 */
  	Object.keys(this.props.config.form_elements.main).map(key => {


	  		if(this.props.config.form_elements.main[key].type === 'entity') {

  	 				ajax({ entity : this.props.config.form_elements.main[key].entity , 'name' : this.props.config.form_elements.main[key].name },function(response){

  	 					var temp = [], select = obj.state.select;



  	 					Object.keys(response.entities).map(key => {

  	 						temp.push({ label: response.entities[key].name, value: response.entities[key]._id });

  	 					});

  	 					options[response.name] = temp;

  	 					obj.setState({ options });


  	 				},'/v1/api/entities','get');

  	 			}

	  });

	  /**
	   * Edit mode
	   */

  	 if( "slug" in this.props.params ) {

  	 	this.setState({ mode : 'edit' });

	    /**
	     * Get entity details
	     */
	    ajax({},function(response){

	    	var r = response;

	    	if(obj.props.config.post_type==='movie')
	    		r = response.movie;

	        obj.setState({ entity : r  });

	        Object.keys(obj.props.config.form_elements.main).map(key => {
	        	var input = obj.props.config.form_elements.main[key];

  	 			if(input.type === 'date')
  	 				dates[input.name] = moment(r[input.name]);

  	 			if(input.type === 'entity') {

				     var tselect = [];

				      for(var i=0;i<r[input.name].length;i++){

				      	tselect.push({ value:r[input.name][i]._id , label:r[input.name][i].name });

				      }

				      select[input.name] = tselect;

  	 			}


  	 			if(input.type === 'select2') {

  	 				options[input.name] = [];
  	 				select[input.name] = [];

 					var o = input.options;
 					var name = input.name;

 					Object.keys(o).map(key => {
 						options[name].push({ value : key , label : o[key] });
 					});


 					Object.keys(r[input.name]).map(k => {

 						var okey = r[input.name][k];
 						var olabel =  o[okey];

 						if(typeof o[okey] === "undefined") {
 							okey = olabel = r[input.name][k];
 						}

  	 					select[input.name].push({ label : olabel , value :okey });
  	 				});


  	 			}


	  		 })	;

	  		 obj.setState({ dates , select, options });

	    },this.props.config.get_route+this.props.params.slug,'get');

  	 } else {

  	 	obj.setState({ entity : {}});
  	 	obj.setState({ mode : 'create' });

  	 	Object.keys(this.props.config.form_elements.main).map(key => {

  	 		if(this.props.config.form_elements.main[key].type === 'date')
  	 			dates[this.props.config.form_elements.main[key].name] = moment();

  	 		if(this.props.config.form_elements.main[key].type === 'entity' || this.props.config.form_elements.main[key].type === 'select2') {

  	 				options[this.props.config.form_elements.main[key].name] = [];
  	 				select[this.props.config.form_elements.main[key].name] = [];

  	 				if(this.props.config.form_elements.main[key].type === 'select2') {

  	 					var o = this.props.config.form_elements.main[key].options;
  	 					var name = this.props.config.form_elements.main[key].name;

  	 					Object.keys(o).map(key => {

  	 						options[name].push({ value : key , label : o[key] });

  	 					});

  	 				}

  	 			}

	  	 })

	  	 obj.setState({ dates , select, options });

  	 }




  }

  reCheckEntities = (name,values,obj) =>{


      var options = [...this.state.options[name]];
      var select = {...this.state.select};
      var tselect = [];
      var mapped_pair = {}

      for(var i=0;i<options.length;i++)
      		mapped_pair[options[i].value] = options[i];

      for(var i=0;i<values.length;i++){

      	tselect.push(mapped_pair[values[i]]);

      }

      select[name] = tselect;

      obj.setState({ select : select  });

	}

  onDrop(name,f) {

    var src = f[0].preview;

    this.tfiles[name].src = src;

  }

	render() {



		if(this.state.mode == 'edit') {

			if( this.state.entity == false )
				return <Loader />;

		}

		if(this.props.user.role === 'customer')
      return("You are not allowed to access this page !!");

		return (<div>

				{this.createForm()}


			</div>);

	}

	updateForm = (event) => {

		event.preventDefault();

		var submitButton = this.form.querySelector('.btn-primary') , html = submitButton.innerHTML;
		var request=  'post';
		var route = this.props.config.create_route;
	    let obj = this;

		if(this.state.mode === 'edit') {
			request = 'put';
			route = this.props.config.edit_route+this.props.params.slug;
		}

		submitButton.innerHTML = "Saving...";

	    ajaxMultiparts(route,this.form,function(){

		      var message = obj.props.config.title+" has been created !";

		      if(obj.state.mode === 'edit')
		      	 message = obj.props.config.title+" has been updated !";

		      	submitButton.innerHTML = html;

		      toast.success(message, {
			      position: toast.POSITION.TOP_CENTER
			    });

		},request);


	}

	back = (e) => {
		e.preventDefault();

		this.props.history.goBack();

	}

	createForm = () => {

		var back_button = '';

		var indentifier = ( typeof this.props.config.indentifier == "undefined" ) ? 'name' : this.props.config.indentifier;



		var form = (
			  <form ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>

			  		<div className="row padding-50">
			  			<div className="col-12 col-lg-8">
           				    <div className="fr-widget">

                                <div className="title">
                                    <h3>{ this.state.mode == 'create' ? 'Create '+this.props.config.title : 'Edit '+this.props.config.title+' : '+this.state.entity[indentifier] }</h3>
                                    {back_button}
                                </div>

                                <div className="fr-widget-body">
           							{Object.keys(this.props.config.form_elements.main).map(key => this.createInput(this.props.config.form_elements.main[key],key))}
					  				<br/>
					  				<button className='btn btn-primary' type="submit">Submit</button>
           						</div>
							</div>
			  			</div>

			  		</div>

			  		<input type="hidden" name="cr_uploads" value={this.upload_names.join(',')} />
			  		<input type="hidden" name="cr_mode" value={this.state.mode} />
			  </form>

			);

		return form;
	}

	handleChange = (name,date) => {

    	var dates = this.state.dates;

  		dates[name] = date;

  		console.log(date);

  		this.setState({ dates  });

  	}


  	handleSelectChange = (name,value) => {


		var select = this.state.select;

		select[name] = value;

		this.setState({ select });
	}



	createInput = (config,key) => {

		var multi = true,input = '';

		if( this.state.entity == false )
				return 'Loading...';



		switch(config.type) {

			case 'entity' :

						input = (
							<div key={key} className="row">

                                  <div className="col mb-3">
                                  <label >{config.label}</label>

                                  <Select
                                   		className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this,config.name)}
										options={this.state.options[config.name]}
										placeholder={"Select "+config.label}
										simpleValue
										value={this.state.select[config.name]}
										name={config.name}
									/>

                                  </div>

                            </div>);
					break;
			case 'select2' :

						input = (
							<div key={key} className="row">

                                  <div className="col mb-3">
                                  <label >{config.label}</label>

                                  <Creatable
                                   		className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this,config.name)}
										options={this.state.options[config.name]}
										placeholder={"Select "+config.label}
										simpleValue
										value={this.state.select[config.name]}
										name={config.name}
									/>

                                  </div>

                            </div>);
					break;
			case 'date' : input = (
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
                                	<DatePicker selected={this.state.dates[config.name]} className="form-control" name={config.name} onChange={this.handleChange.bind(this,config.name)} />
                                </div>
                            </div>);
					break;


			case 'text' : input = (
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
                                	<input type="text" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />
                                </div>
                            </div>);
					break;

			case 'tel' : input = (
						<div key={key} className="row">
							<div  className="col mb-3">
                            	<label >{config.label}</label>
                            	<input type="tel" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />
                            </div>
                        </div>);
			break;

			case 'email' : input = (
				<div key={key} className="row">
					<div  className="col mb-3">
                    	<label >{config.label}</label>
                    	<input type="email" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />
                    </div>
                </div>);
			break;

			case 'password' : input = (
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
                                	<input type="password" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" name={config.name} />
                                </div>
                            </div>);
					break;

			case 'textarea' : input = (
							<div key={key} className="row">

                                  <div className="col mb-3">
                                  <label >{config.label}</label>
                                   <textarea className="form-control" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } name={config.name} id="" cols="30" rows="10"></textarea>
                                  </div>

                            </div>);
					break;
			case 'select' : input = (
							<div key={key} className="row">

                                  <div className="col mb-3">
                                  <label >{config.label}</label>
                                   <select name={config.name} defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } title={config.selectlabel} className="form-control">
                                   		{Object.keys(config.options).map( key => <option key={key} value={key}>{config.options[key]}</option> )}
                                   </select>
                                  </div>

                            </div>);
					break;

			case 'upload' : input = (<div key={key} className="row">
                                            <div className="col mb-3">
                                             <label >{config.label}</label>
                                             <div className="dropzon-wrap">
                                                <div className="dropzone">
                                                  <Dropzone  onDrop={this.onDrop.bind(this,config.name)} name={config.name} style={{}} accept={config.accept}>
                                                   <span> <svg x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g fill="#222222"><path fill="#222222" d="M13,7.1c0,0,0-0.1,0-0.1c0-2.8-2.2-5-5-5C5.5,2,3.4,3.8,3.1,6.3C1.3,6.9,0,8.5,0,10.5C0,13,2,15,4.5,15 c1.7,0,5.9,0,7.5,0c2.2,0,4-1.8,4-4C16,9.1,14.7,7.6,13,7.1z M9,10v3H7v-3H4l4-4l4,4H9z"></path></g></svg></span>
                                                  </Dropzone>
                                                </div>
                                                   <input type="hidden" name={"proxy"+config.name} defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } />
                                                   <img ref={ (el) => {this.tfiles[config.name] = el;} } src={(config.name in this.state.entity) ? "/uploads/"+this.state.entity[config.name] : '' } alt=""/>
                                             </div>
                                                   <h6> Following formats are support - {config.accept}.</h6>
                                            </div>
                                          </div>);


								this.upload_names.push(config.name);

						break;




		}

		return input;

	}

}

export default rBridge(CrudMake);
