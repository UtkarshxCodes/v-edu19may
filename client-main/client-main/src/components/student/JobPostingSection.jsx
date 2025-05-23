import React from 'react';
import { Link } from 'react-router-dom';
import './JobPostingSection.css';

const jobs = [
  {
    company: "NVIDIA",
    location: "USA",
    role: "AI Research Scientist",
    description: "Work on cutting-edge artificial intelligence research projects focused on deep learning, computer vision, and model optimization.",
    positions: "5 Positions",
    type: "Full Time",
    salary: "$160,000/Year ($76.92/hr)",
    link: "/jobs/nvidia-ai-research-scientist"
  },
  {
    company: "IBM",
    location: "USA",
    role: "Cloud Solutions Architect",
    description: "Design, implement, and manage cloud-based systems and services with a focus on scalable architecture and performance.",
    positions: "8 Positions",
    type: "Full Time",
    salary: "$142,000/Year ($68.27/hr)",
    link: "/jobs/ibm-cloud-solutions-architect"
  },
  {
    company: "CrowdStrike",
    location: "Remote - USA",
    role: "Cybersecurity Analyst",
    description: "Monitor, analyze, and respond to cybersecurity threats using state-of-the-art tools and incident response practices.",
    positions: "10 Positions",
    type: "Full Time",
    salary: "$120,000/Year ($57.69/hr)",
    link: "/jobs/crowdstrike-cybersecurity-analyst"
  },
  {
    company: "Meta",
    location: "USA",
    role: "Data Scientist",
    description: "Analyze large datasets to generate business insights and build predictive models to support data-driven decisions.",
    positions: "7 Positions",
    type: "Full Time",
    salary: "$155,000/Year ($74.52/hr)",
    link: "/jobs/meta-data-scientist"
  },
  {
    company: "Oracle",
    location: "USA",
    role: "Cloud DevOps Engineer",
    description: "Build and automate infrastructure for cloud platforms with a focus on continuous integration and deployment pipelines.",
    positions: "4 Positions",
    type: "Full Time",
    salary: "$138,000/Year ($66.35/hr)",
    link: "/jobs/oracle-cloud-devops-engineer"
  },
  {
    company: "Cisco",
    location: "Canada (Remote Friendly)",
    role: "Network Security Engineer",
    description: "Design and implement secure network infrastructures and provide real-time monitoring of potential cyber threats.",
    positions: "6 Positions",
    type: "Full Time",
    salary: "$110,000/Year ($52.88/hr)",
    link: "/jobs/cisco-network-security-engineer"
  }
];

const JobPostingSection = () => (
  <section className="section__container job__container" id="job">
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">Latest & Top Job Openings</h2>
    <p className="text-center text-gray-600 mb-10">
      Discover exciting new opportunities in Data Science, AI, Cloud, Cybersecurity, and more — across top US-based companies.
    </p>
    <div className="job__grid">
      {jobs.map((job, idx) => (
        <Link to="/jobs" key={idx} className="job__card block hover:shadow-lg transition">
          <div className="job__card__header-nologo">
            <div>
              <h5 className="job__company">{job.company}</h5>
              <h6 className="job__location">{job.location}</h6>
            </div>
          </div>
          <h4 className="job__role">{job.role}</h4>
          <p className="job__desc">{job.description}</p>
          <div className="job__card__footer">
            <span>{job.positions}</span>
            <span>{job.type}</span>
            <span>{job.salary}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default JobPostingSection;