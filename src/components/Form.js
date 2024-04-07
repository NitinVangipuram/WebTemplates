import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  IconButton,
  createTheme,
  ThemeProvider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Customize primary color
    },
    secondary: {
      main: '#19857b', // Customize secondary color
    },
  },
  typography: {
    fontFamily: "monospace",
    button: {
      textTransform: 'none', // Buttons use normal casing
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem', // Customize button font size
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined', // Default TextField variant for the entire app
        margin: 'normal', // Default margin for TextFields
      },
    },
  },
});



const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resumeLink, setResumeLink] = useState(''); 
  const [projects, setProjects] = useState([{ title: '', description: '', githubLink: '', category: '' }]);
  const [education, setEducation] = useState([{ degree: '', institute: '', info: '', level: '' }]);  
  const [skills, setSkills] = useState([{ language: '', percentage: '' }]);
  const projectCategories = ['web', 'mobile', 'database', 'machineLearning'];
  const educationLevels = ['bachelor', 'master', 'phd', 'certificate', 'coding'];
  
  // Project Handlers
  const handleProjectChange = (index, event) => {
    const newProjects = [...projects];
    newProjects[index][event.target.name] = event.target.value;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', description: '', githubLink: '' , category: ''}]);
  };

  const handleRemoveProject = index => {
    const newProjects = projects.filter((_, projIndex) => projIndex !== index);
    setProjects(newProjects);
  };

  // Education Handlers
  const handleEducationChange = (index, event) => {
    const newEducation = [...education];
    newEducation[index][event.target.name] = event.target.value;
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: '', institute: '', info: '' , level: ''}]);
  };

  const handleRemoveEducation = index => {
    const newEducation = education.filter((_, eduIndex) => eduIndex !== index);
    setEducation(newEducation);
  };

  // Skill Handlers
  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index][event.target.name] = event.target.value;
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { language: '', percentage: '' }]);
  };

  const handleRemoveSkill = index => {
    const newSkills = skills.filter((_, skillIndex) => skillIndex !== index);
    setSkills(newSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, title, description,resumeLink, projects, education, skills });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" >
        <Paper style={{ padding: '20px' , marginBottom:"20px" , width:"400px"  }} elevation={3}>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
  <TextField
    fullWidth
    label="Email"
    value={email}
    type="email"
    onChange={(e) => setEmail(e.target.value)}
  />
</Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Resume Link"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                />
              </Grid>
              {projects.map((project, index) => (
                <React.Fragment key={index}>
                <Grid item>
  <TextField
    select
    label="Project Category"
    fullWidth
    name="category"
    value={project.category}
    onChange={(e) => handleProjectChange(index, e)}
  >
    {projectCategories.map((category) => (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    ))}
  </TextField>
</Grid>

                  <Grid item>
                    <TextField
                      fullWidth
                      label="Project Title"
                      name="title"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Project Description"
                      multiline
                      rows={4}
                      name="description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="GitHub Link"
                      name="githubLink"
                      value={project.githubLink}
                      onChange={(e) => handleProjectChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleRemoveProject(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item>
                <Button onClick={handleAddProject} startIcon={<AddCircleOutlineIcon />}>
                  Add Another Project
                </Button>
              </Grid>
              {education.map((edu, index) => (
                <React.Fragment key={index}>
                <Grid item>
  <TextField
    select
    label="Education Level"
    fullWidth
    name="level"
    value={edu.level}
    onChange={(e) => handleEducationChange(index, e)}
  >
    {educationLevels.map((level) => (
      <MenuItem key={level} value={level}>
        {level}
      </MenuItem>
    ))}
  </TextField>
</Grid>

                  <Grid item>
                    <TextField
                      fullWidth
                      label="Degree"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Institute"
                      name="institute"
                      value={edu.institute}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Info"
                      name="info"
                      value={edu.info}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleRemoveEducation(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item>
                <Button onClick={handleAddEducation} startIcon={<AddCircleOutlineIcon />}>
                  Add Another Education
                </Button>
              </Grid>
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Skill"
                      name="language"
                      value={skill.language}
                      onChange={(e) => handleSkillChange(index, e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Proficiency (%)"
                      name="percentage"
                      value={skill.percentage}
                      onChange={(e) => handleSkillChange(index, e)}
                      type="number"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleRemoveSkill(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item>
                <Button onClick={handleAddSkill} startIcon={<AddCircleOutlineIcon />}>
                  Add Another Skill
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Form;


