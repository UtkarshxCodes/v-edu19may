import React from 'react';
import './JobsList.css';

const jobData = [
  {
    company: "NVIDIA",
    location: "USA",
    role: "AI Research Scientist",
    description: "Work on cutting-edge artificial intelligence research projects focused on deep learning, computer vision, and model optimization.",
    positions: "5 Positions",
    type: "Full Time",
    salary: "$160,000/Year",
    hourly: "$76.92/hr",
    link: "/jobs/nvidia-ai-research-scientist"
  },
  {
    company: "IBM",
    location: "USA",
    role: "Cloud Solutions Architect",
    description: "Design, implement, and manage cloud-based systems and services with a focus on scalable architecture and performance.",
    positions: "8 Positions",
    type: "Full Time",
    salary: "$142,000/Year",
    hourly: "$68.27/hr",
    link: "/jobs/ibm-cloud-solutions-architect"
  },
  {
    company: "CrowdStrike",
    location: "Remote - USA",
    role: "Cybersecurity Analyst",
    description: "Monitor, analyze, and respond to cybersecurity threats using state-of-the-art tools and incident response practices.",
    positions: "10 Positions",
    type: "Full Time",
    salary: "$120,000/Year",
    hourly: "$57.69/hr",
    link: "/jobs/crowdstrike-cybersecurity-analyst"
  },
  {
    company: "Meta",
    location: "USA",
    role: "Data Scientist",
    description: "Analyze large datasets to generate business insights and build predictive models to support data-driven decisions.",
    positions: "7 Positions",
    type: "Full Time",
    salary: "$155,000/Year",
    hourly: "$74.52/hr",
    link: "/jobs/meta-data-scientist"
  },
  {
    company: "Oracle",
    location: "USA",
    role: "Cloud DevOps Engineer",
    description: "Build and automate infrastructure for cloud platforms with a focus on continuous integration and deployment pipelines.",
    positions: "4 Positions",
    type: "Full Time",
    salary: "$138,000/Year",
    hourly: "$66.35/hr",
    link: "/jobs/oracle-cloud-devops-engineer"
  },
  {
    company: "Cisco",
    location: "Canada (Remote Friendly)",
    role: "Network Security Engineer",
    description: "Design and implement secure network infrastructures and provide real-time monitoring of potential cyber threats.",
    positions: "6 Positions",
    type: "Full Time",
    salary: "$110,000/Year",
    hourly: "$52.88/hr",
    link: "/jobs/cisco-network-security-engineer"
  }
];

const JobsList = ({ setShowRegistration }) => (
  <section className="jobs-list-section">
    <div className="jobs-list-container">
      <h2 className="jobs-list-title">All Job Openings</h2>
      <div className="jobs-list-horizontal">
        {jobData.map((job, index) => (
          <div key={index} className="jobs-list-card">
            <div className="jobs-list-card-main">
              <h3>{job.role} <span className="company">@ {job.company}</span></h3>
              <p className="location">{job.location} — {job.type}</p>
              <p className="desc">{job.description}</p>
              <div className="jobs-list-meta">
                <span>{job.positions}</span>
                <span className="salary">{job.salary}</span>
                <span className="hourly">{job.hourly}</span>
              </div>
            </div>
            <button
              className="apply-btn"
              onClick={() => setShowRegistration(true)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default JobsList;