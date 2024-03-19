// Update.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    leaderName: '',
    numberOfMembers: 0,
    projectName: '',
    domain: '',
    driveLink: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3002/projects/${projectId}`, project);
      navigate('/Add');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/projects/${projectId}`);
      navigate('/Add');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
const style={
  backgroundColor: '#009dff'
}
const updateStyle={
  backgroundColor:'#f0f0f0',
display:'flex',
width:'100%',
flexDirection:'column',
justifyContent:'center',
alignItems:'center'
}
const form={
  width:'100%',
  display:'flex',
width:'100%',
flexDirection:'column',
justifyContent:'center',
alignItems:'center'
}
  return (
    <div className='update' style={updateStyle}>
      <h2>Update Project</h2>
      <form style={form} onSubmit={handleUpdate}>
        <input  type="text" name="leaderName" placeholder="Team Leader Name" value={project.leaderName} onChange={handleChange} /><br />
        <input type="number" name="numberOfMembers" placeholder="Number of Members" value={project.numberOfMembers} onChange={handleChange} /><br />
        <input type="text" name="projectName" placeholder="Project Name" value={project.projectName} onChange={handleChange} /><br />
        <input type="text" name="domain" placeholder="Domain" value={project.domain} onChange={handleChange} /><br />
        <input type="text" name="driveLink" placeholder="Drive Link" value={project.driveLink} onChange={handleChange} /><br />
        <button style={style} type="submit">Update Project</button>
      </form>
      <button style={style} onClick={handleDelete}>Delete Project</button>
    </div>
  );
}

export default Update;
