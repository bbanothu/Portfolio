import React, { Component } from "react";
import Async from "react-async";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import Loading from "./images/loading.svg";
import "./css/index.css";

class main extends Component {
  async getNewProjectsPage() {
    var data = [];
    const promise1 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getProjects"
    ).then((res) => res.json());
    const promise2 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjects"
    ).then((res) => res.json());
    const promise3 = fetch(
      "https://us-central1-portfolio-6b427.cloudfunctions.net/getNewProjectTasks"
    ).then((res) => res.json());
    data = Promise.all([promise1, promise2, promise3]);
    return data;
  }

  // Render Function
  render() {
    // Conditonally render images
    const images = (image, image1, image2) => {
      if (image == null) {
        return <div></div>;
      } else {
        return (
          <div>
            <hr />
            <div className="row">
              <div id="rcorners" className="col-md-4 ">
                <div className="thumbnail">
                  <img
                    className="shadow"
                    id="rcorners"
                    alt=""
                    src={image}
                    style={{ width: "100%" }}
                  ></img>
                  <div className="caption"></div>
                </div>
              </div>
              <div id="rcorners" className="col-md-4">
                <div className="thumbnail">
                  <img
                    className="shadow"
                    id="rcorners"
                    alt=""
                    src={image1}
                    style={{ width: "100%" }}
                  ></img>
                  <div className="caption"></div>
                </div>
              </div>
              <div id="rcorners" className="col-md-4">
                <div className="thumbnail">
                  <img
                    className="shadow"
                    id="rcorners"
                    alt=""
                    src={image2}
                    style={{ width: "100%" }}
                  ></img>
                  <div className="caption"></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <Async promiseFn={this.getNewProjectsPage}>
        {({ data, error, isLoading }) => {
          if (isLoading)
            return (
              <div style={{ marginTop: "3em" }}>
                <img
                  alt="loading"
                  src={Loading}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
              </div>
            );
          if (error) return `Something went wrong: ${error.message}`;
          if (data)
            return (
              <Tabs
                defaultTab={data[0].title}
                vertical
                style={{ color: "white", marginTop: "3em" }}
              >
                <TabList
                  className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 "
                  style={{ height: "80%" }}
                >
                  {data[0].map((project, index) => (
                    <Tab key={index} tabFor={project.title}>
                      {project.title}
                    </Tab>
                  ))}

                  {data[1].map((project, index) => (
                    <Tab key={index} tabFor={project.title}>
                      {project.title}
                    </Tab>
                  ))}
                </TabList>
                {data[0].map((project, index) => (
                  <TabPanel
                    key={index}
                    tabId={project.title}
                    style={{ color: "black", width: "80%" }}
                  >
                    <div className="shadow p-3 mb-5 bg-white rounded mt-4 ml-3 ">
                      <h1>
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          href={project.github}
                        >
                          {project.title}
                        </a>
                      </h1>
                      <p>Project Description: {project.description}</p>
                      <p>Technologies Used: {project.tech}</p>
                      {images(project.image, project.image1, project.image2)}
                      {images(project.image3, project.image4, project.image5)}
                      {images(project.image6, project.image7, project.image8)}
                    </div>
                  </TabPanel>
                ))}
                {data[1].map((project, index) => (
                  <TabPanel
                    key={index}
                    tabId={project.title}
                    style={{ color: "black", width: "80%" }}
                  >
                    <div className="shadow p-3 mb-5 bg-white rounded mt-4  ">
                      <h1>
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          href={project.github}
                        >
                          {project.title}
                        </a>
                      </h1>
                      <p>My Role: {project.role}</p>
                      <p>Project Description: {project.description}</p>
                      <p>Technologies Used: {project.tech}</p>
                    </div>
                    <div className="shadow p-3 mb-5 bg-white rounded mt-2 ">
                      <div className="row container table-responsive">
                        <h3>Current Tasks</h3>
                        <table className="table table-hover table-borderless ">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">Task</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">Status</th>
                              <th scope="col">End Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data[2]
                              .filter((project1) =>
                                project1.id.includes(project.title)
                              )
                              .map((project1, index) => (
                                <tr key={index} index={index}>
                                  <th>{project1.task}</th>
                                  <td>{project1.startdate}</td>
                                  <td>{project1.status}</td>
                                  <td>{project1.enddate}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </Tabs>
            );
          return null;
        }}
      </Async>
    );
  }
}
export default main;
