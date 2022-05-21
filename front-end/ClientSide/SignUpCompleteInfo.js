import React from "react";
import "./SignUpCompleteInfo.css"
import Navigation from "./Navigation";
import {Navigate} from "react-router-dom";
import HospitalService from "../Services/HospitalService";

class SignUpCompleteInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            listRaces: [
                "African American",
                "American-Indian",
                "Asian",
                "Hispanic or Latino",
                "Indian",
                "White"
            ].map((race) => <option key={race}>{race}</option>),
            listMaritalStatus: [
                "Single",
                "Married",
                "Widowed",
                "Divorced"
            ].map((maritalStatus) => <option key={maritalStatus}>{maritalStatus}</option>),
            listHospital: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState(
            {isValid: true}
        )
    }

    componentDidMount() {
        HospitalService.getHospitals().then(resp => this.setState({listHospital: resp.data}));
    }

    render() {

        return(
          <div>
              <Navigation />
              {
                  this.state.isValid &&
                  <Navigate to="/signin" />
              }
              {
                  !this.state.isValid &&
                  <form className="CompleteInfoBox">
                      <label>First Name <span style={{color: "red"}}>*</span>: </label>
                      <input required type="text" name="firstName"/><br/>
                      <label>Middle Name: </label>
                      <input type="text" name="middleName"/><br/>
                      <label>Last Name <span style={{color: "red"}}>*</span>: </label>
                      <input required type="text" name="lastName"/><br/>
                      <label>Phone Number <span style={{color: "red"}}>* </span>: </label>
                      <input required type="tel" name="phoneNumber"/><br/>
                      <label>Country <span style={{color: "red"}}>* </span>: </label>
                      <input required type="text" name="country"/><br/>
                      <label>State <span style={{color: "red"}}>* </span>: </label>
                      <input required type="text" name="state"/><br/>
                      <label>City <span style={{color: "red"}}>* </span>: </label>
                      <input required type="text" name="city"/><br/>
                      <label>Street <span style={{color: "red"}}>* </span>: </label>
                      <input required type="text" name="street"/><br/>
                      <label>Zipcode <span style={{color: "red"}}>* </span>: </label>
                      <input required type="text" name="zipcode"/><br/>
                      <label>Birth Date <span style={{color: "red"}}>* </span>: </label>
                      <input required type="date" name="birthDate"/><br/>
                      <label>Race <span style={{color: "red"}}>* </span>: </label>
                      <select required type="text" name="race">
                          <option>--Make a Selection--</option>
                          {this.state.listRaces}
                      </select><br/>
                      <label>Marital Status <span style={{color: "red"}}>* </span>: </label>
                      <select required name="maritalStatus">
                          <option>--Make a Selection--</option>
                          {this.state.listMaritalStatus}
                      </select><br/>
                      <label>Gender <span style={{color: "red"}}>* </span>: </label>
                      <select required name="gender">
                          <option>--Make a Selection--</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                      </select><br/>
                      <label>Insurance Number : </label>
                      <input type="text" name="insuranceNumber"/><br/>
                      <label>Blood Group <span style={{color: "red"}}>* </span>: </label>
                      <select required name="bloodGroup">
                          <option>--Make a Selection--</option>
                          <option>A</option>
                          <option>B</option>
                          <option>AB</option>
                          <option>O</option>
                      </select><br/>
                      <label>Hospital <span style={{color: "red"}}>* </span>: </label>
                      <select required name="hospital">
                          <option>--Make a Selection--</option>
                          {
                              this.state.listHospital
                                  .map((hospital) => <option key={hospital.id}>{hospital.name}</option>)
                          }
                      </select><br/>
                      <label>Insurance Company: </label>
                      <input type="text" name="insuranceCompany"/><br/><br/><br/>
                      <span style=
                                {{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                      >
                          <input type="submit" name="submitInfo" />
                      </span>
                  </form>
              }

          </div>
        );
    }
}

export default SignUpCompleteInfo;
