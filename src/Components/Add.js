import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Add.css';
function Add() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for project details
  const [project, setProject] = useState({
    leaderName: '',
    numberOfMembers: 0,
    projectName: '',
    domain: '',
    driveLink: ''
  });

  // State for existing projects
  const [existingProjects, setExistingProjects] = useState([]);

  // Fetch existing projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3002/projects');
        setExistingProjects(response.data);
      } catch (error) {
        console.error('Error fetching existing projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if team leader's name already exists
    const existingLeader = existingProjects.find(proj => proj.leaderName === project.leaderName);
    if (existingLeader) {
      alert('Team leader already exists!');
      return;
    }
    try {
      // Make POST request to backend server to add project
      const response = await axios.post('http://localhost:3002/projects', project);
      console.log('Project added:', response.data);
      // Clear form fields after successful submission
      setProject({
        leaderName: '',
        numberOfMembers: 0,
        projectName: '',
        domain: '',
        driveLink: ''
      });
      // Update existing projects state
      setExistingProjects([...existingProjects, response.data]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Function to handle update button click
  const handleUpdate = (projectId) => {
    navigate(`/update/${projectId}`);
  };

  const myInlineStyles = {
    backgroundColor: '#009dff',
    height:'50px'
  };
  return (
    <div className='add'>
      <div className='AddCon'>
      
      <form onSubmit={handleSubmit} className='form'>
      <h2>Add Project</h2>
        <input className='input' type="text" name="leaderName" placeholder="Team Leader Name" value={project.leaderName} onChange={handleChange} /><br />
        <input className='input' type="number" name="numberOfMembers" placeholder="Number of Members" value={project.numberOfMembers} onChange={handleChange} /><br />
        <input className='input' type="text" name="projectName" placeholder="Project Name" value={project.projectName} onChange={handleChange} /><br />
        <input className='input' type="text" name="domain" placeholder="Domain" value={project.domain} onChange={handleChange} /><br />
        <input className='input' type="text" name="driveLink" placeholder="Drive Link" value={project.driveLink} onChange={handleChange} /><br />
        <button className='button' type="submit">Add Project</button>
      </form>
      <div className='tableCon'>
      <h2>Existing Projects</h2>
      <table className='table'>
        <thead className='thead'>
          <tr className='tr' style={myInlineStyles}>
            <th>Team Leader Name</th>
            <th>Number of Members</th>
            <th>Project Name</th>
            <th>Domain</th>
            <th>Drive Link</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {existingProjects.map((proj, index) => (
            <tr key={index}>
              <td>{proj.leaderName}</td>
              <td>{proj.numberOfMembers}</td>
              <td>{proj.projectName}</td>
              <td>{proj.domain}</td>
              <td>{proj.driveLink}</td>
              <td><button id='button' onClick={() => handleUpdate(proj.id)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

export default Add;
