import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import ExampleComponent from "react-rounded-image";
import Background from './images/bgaaa.jpg';
import './index.css'
import axios from 'axios';



function TabPanel(props) {
  // Required code for proper tabs 
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  categories: {
    borderRadius: "25px",
    border: "solid",
    borderWidth: "thin",

    backgroundColor: "rgba(129, 139, 124, 0.1);",
    opacity: "90%",
    padding: "0px 4px 0px",
    height: "6px",
    fontSize: "0.9em",
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // For retriving all data for this page
  const [aboutme, aboutmeput] = useState([])
  const [skills, skillsput] = useState([])
  const [work, workput] = useState([])
  const [hobbies, hobbiesput] = useState([])
  useEffect(() => {

    async function fetchData() {
      const aboutme = [];
      var skills;
      var work;
      var hobbies;
      await axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getAboutMe').then((response) => {
        aboutme.push(response.data);
      })
      await axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getSkills').then((response) => {
        skills = response.data;
      })
      await axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getWork').then((response) => {
        work = response.data;
      })
      await axios.get('https://us-central1-portfolio-6b427.cloudfunctions.net/getHobbies').then((response) => {
        hobbies = response.data;
      })
      aboutmeput(aboutme);
      skillsput(skills);
      workput(work);
      hobbiesput(hobbies);
    } fetchData()
  }, []);



  // Main Body
  return (
    <div style={{ fontSize: "16px", fontFamily: "Proxima Nova, sans-serif", lineHeight: "1.0rem", marginTop: "5em" }} >
      {aboutme.map((aboutme, index) => (

        <div class="shadow p-3 mb-5 rounded "
          style={{
            color: "white",
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",

            backgroundAttachment: "fixed", backgroundRepeat: "noRepeat"
          }}>

          <div className="row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-6" >
              <br />
              <h3>{aboutme.name}</h3>
              <p>{aboutme.degree}</p>
              <p className="fa fa-graduation-cap"> {aboutme.college}</p><br />
              <p className="fa fa-map-marker"> {aboutme.currentlocation}</p>
            </div>
            <div className="col-sm-5">
              <br />
              <ExampleComponent
                image={aboutme.myface}
                roundedColor="white"
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
              />
            </div>
          </div>
        </div>
      ))}
      <br />
      <div className="row" style={{ textAlign: "left", fontSize: "16px", fontFamily: "Proxima Nova, sans-serif" }}>
        <div className="col-sm-1">
        </div>
        <div className="col-sm-5">
          <div class="shadow p-3 mb-5 bg-white rounded zoom">
            <table class="table table-borderless">
              <thead>
                <tr >
                  <th scope="col" >
                    <div >
                      <span style={{ display: "inline" }} className="fa fa-graduation-cap"></span>
                      <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> EDUCATION</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >
                    <div className="row">
                      <div className="col-sm-1">
                        <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-6b427.appspot.com/o/isu.png?alt=media&token=aa20d626-345e-41e2-bcd3-2224ba58dea6" height="40" width="40" ></img>
                        &nbsp; &nbsp;
                      </div>
                      <div className="col-sm-11 pl-4" style={{ verticalAlign: "center" }}>
                        Iowa State University <br />
                        <p className="fa fa-calendar"> 2015-2019</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>DEGREE <br /> Bachelor's</td>
                </tr>
                <tr>
                  <td>MAJOR <br /> Computer Science</td>
                </tr>
              </tbody>
            </table>

          </div>
          <br />
          <div class="shadow p-3 mb-5 bg-white rounded zoom">
            <table class="table  table-borderless" >
              <thead>
                <tr>
                  <th scope="col">
                    <span style={{ display: "inline" }} className="fa fa-pencil"></span>
                    <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Skills</span>

                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >LANGUAGES <br />  <br />
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>English</p>
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>Hindi</p>
                    <p style={{ display: "inline", wordBreak: "keep-all", marginRight: "5px" }} className={classes.categories}>Telegu</p>
                  </td>
                </tr>
                <tr>
                  <div style={{ paddingLeft: "15px", lineHeight: "1.5em" }}>
                    <td style={{ display: "inline" }} >
                      <p>SKILLS</p>
                      {skills.map((skills, index) => (
                        <p className={classes.categories} style={{ display: "inline", wordBreak: "keep-all", whiteSpace: "nowrap", marginRight: "5px" }} value={value} index={index}> {skills.name}</p>

                      ))}

                    </td>
                  </div>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div className="col-sm-5">
          <div class="shadow p-3 mb-5 bg-white rounded zoom">
            <table class="table  table-borderless">
              <thead>
                <tr>
                  <th scope="col">
                    <span style={{ display: "inline" }} className="fa fa-building"></span>
                    <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Work Experience</span>

                  </th>
                </tr>
              </thead>
              <tbody>
                {work.map((work, index) => (
                  <tr>
                    <td value={value} index={index}>
                      <p>{work.company}</p>
                      <p>{work.role}</p>
                      <p className="fa fa-calendar"> {work.duration}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div class="shadow p-3 mb-5 bg-white rounded zoom">
            <table class="table  table-borderless">
              <thead>
                <tr>
                  <th scope="col">
                    <span style={{ display: "inline", }} className="fa fa-pencil"></span>
                    <span style={{ fontFamily: "Proxima Nova, sans-serif" }}> Hobbies</span>
                  </th>

                </tr>
                <ul>
                  {hobbies.map((hobbies, index) => (

                    <li value={value} index={index}>{hobbies.name}</li>

                  ))}
                </ul>

              </thead>
            </table>
          </div>
        </div>
        <div className="col-sm-1">
        </div>
      </div>
    </div>
  );
}


