export const roles = [
  {
      role: "Full Stack Developer",
      category: "Software Development & Engineering",
      skills: ["JavaScript", "React.js", "Node.js", "HTML/CSS", "Databases (SQL/NoSQL)"],
      salary: { entry: 500000, mid: 900000, senior: 1400000 },
      job_market_trends: {
          demand_growth: "High",
          remote_opportunities: "Increasing",
          industries_hiring: ["IT Services", "E-commerce", "Finance"]
      },
      learning_path: {
          courses: ["Full Stack Web Development by Coursera", "MERN Stack Front To Back by Udemy"],
          certifications: ["IBM Full Stack Software Developer Professional Certificate"]
      },
      community_engagement: {
          linkedin_groups: ["Full Stack Developers India"],
          forums: ["Stack Overflow", "Reddit r/webdev"]
      },
      study_modules: [
          {
              module: "Frontend & Backend Basics",
              total_slots: 12,
              topics: [
                  { topic: "Frontend Basics", slots: 2, difficulty: "⭐", details: "HTML, CSS, JavaScript Basics" },
                  { topic: "Backend Basics", slots: 2, difficulty: "⭐⭐", details: "Node.js, Express.js, APIs" },
                  { topic: "Database Management", slots: 2, difficulty: "⭐⭐⭐", details: "SQL, NoSQL, Database Design" }
              ]
          },
          {
              module: "Advanced Frontend Development",
              total_slots: 10,
              topics: [
                  { topic: "React.js Fundamentals", slots: 2, difficulty: "⭐⭐", details: "Components, State, Props, Hooks" },
                  { topic: "State Management", slots: 2, difficulty: "⭐⭐⭐", details: "Redux, Context API" },
                  { topic: "Performance Optimization", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Lazy Loading, Code Splitting, Memoization" }
              ]
          },
          {
              module: "Advanced Backend Development",
              total_slots: 10,
              topics: [
                  { topic: "RESTful API Design", slots: 2, difficulty: "⭐⭐⭐", details: "Best Practices, Versioning, Security" },
                  { topic: "Authentication & Authorization", slots: 2, difficulty: "⭐⭐⭐", details: "JWT, OAuth, Session Management" },
                  { topic: "Microservices Architecture", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Design Patterns, Communication Protocols" }
              ]
          },
          {
              module: "DevOps for Full Stack Developers",
              total_slots: 8,
              topics: [
                  { topic: "CI/CD Pipelines", slots: 2, difficulty: "⭐⭐⭐", details: "GitHub Actions, Jenkins, CircleCI" },
                  { topic: "Containerization", slots: 2, difficulty: "⭐⭐⭐", details: "Docker, Docker Compose" },
                  { topic: "Cloud Deployment", slots: 2, difficulty: "⭐⭐⭐⭐", details: "AWS, Heroku, Vercel" }
              ]
          }
      ]
  },
  {
      role: "Backend Developer",
      category: "Software Development & Engineering",
      skills: [
        "JavaScript (Node.js)",
        "Python",
        "Java",
        "SQL/NoSQL Databases",
        "API Development (RESTful/GraphQL)"
      ],
      salary: {
        entry: 140000,  
        mid: 771164,    
        senior: 1375000 
      },
      job_market_trends: {
        demand_growth: "High",
        remote_opportunities: "Increasing",
        industries_hiring: ["IT Services", "E-commerce", "Finance", "Healthcare"]
      },
      learning_path: {
        courses: [
          "Backend Development Specialization by Coursera",
          "Node.js, Express, MongoDB & More: The Complete Bootcamp by Udemy"
        ],
        certifications: [
          "Oracle Certified Professional: Java SE Programmer",
          "AWS Certified Developer – Associate"
        ]
      },
      community_engagement: {
        linkedin_groups: ["Backend Developers India", "Node.js Developers"],
        forums: ["Stack Overflow", "Reddit r/backend"]
      },
      study_modules: [
          {
              module: "Backend Architecture",
              total_slots: 12,
              topics: [
                  { topic: "API Development", slots: 2, difficulty: "⭐⭐⭐", details: "RESTful APIs, GraphQL, gRPC" },
                  { topic: "Database Management", slots: 2, difficulty: "⭐⭐⭐", details: "SQL, NoSQL, Indexing, Query Optimization" },
                  { topic: "Microservices & Cloud Computing", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Kubernetes, Docker, AWS/GCP/Azure" }
              ]
          },
          {
              module: "Advanced Backend Concepts",
              total_slots: 10,
              topics: [
                  { topic: "Event-Driven Architecture", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Message Brokers, Event Sourcing, CQRS" },
                  { topic: "Security Best Practices", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Encryption, OWASP Top 10, Penetration Testing" },
                  { topic: "Performance Optimization", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Caching, Load Balancing, Database Sharding" }
              ]
          },
          {
              module: "DevOps for Backend Developers",
              total_slots: 8,
              topics: [
                  { topic: "CI/CD Pipelines", slots: 2, difficulty: "⭐⭐⭐", details: "GitHub Actions, Jenkins, CircleCI" },
                  { topic: "Infrastructure as Code", slots: 2, difficulty: "⭐⭐⭐", details: "Terraform, Ansible, CloudFormation" },
                  { topic: "Monitoring & Logging", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Prometheus, Grafana, ELK Stack" }
              ]
          }
      ]
  },
  {
      role: "DevOps Engineer",
      category: "Cloud & DevOps",
      skills: ["CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code", "Monitoring & Logging"],
      salary: { entry: 900000, mid: 1700000, senior: 3000000 },
      job_market_trends: {
          demand_growth: "Very High",
          remote_opportunities: "High",
          industries_hiring: ["Cloud Computing", "Fintech", "E-commerce", "Cybersecurity"]
      },
      learning_path: {
          courses: [
              "DevOps Engineering for Beginners by Udemy",
              "Google Cloud DevOps Engineer Professional Certificate by Coursera"
          ],
          certifications: [
              "AWS Certified DevOps Engineer – Professional",
              "Certified Kubernetes Administrator (CKA)"
          ]
      },
      community_engagement: {
          linkedin_groups: ["DevOps Engineers India", "Kubernetes Community"],
          forums: ["Stack Overflow", "Reddit r/devops"]
      },
      study_modules: [
          {
              module: "Core DevOps Concepts",
              total_slots: 12,
              topics: [
                  { topic: "CI/CD Pipelines", slots: 2, difficulty: "⭐⭐⭐", details: "Jenkins, GitLab CI, GitHub Actions" },
                  { topic: "Containerization", slots: 2, difficulty: "⭐⭐⭐", details: "Docker, Docker Compose, Container Orchestration" },
                  { topic: "Infrastructure as Code", slots: 2, difficulty: "⭐⭐⭐", details: "Terraform, Ansible, CloudFormation" }
              ]
          },
          {
              module: "Advanced DevOps Practices",
              total_slots: 10,
              topics: [
                  { topic: "Kubernetes Mastery", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Deployments, Services, Helm Charts" },
                  { topic: "Cloud-Native Development", slots: 2, difficulty: "⭐⭐⭐⭐", details: "AWS, GCP, Azure, Serverless Architecture" },
                  { topic: "Security in DevOps", slots: 2, difficulty: "⭐⭐⭐⭐", details: "DevSecOps, Vulnerability Scanning, Compliance" }
              ]
          },
          {
              module: "Monitoring & Logging",
              total_slots: 8,
              topics: [
                  { topic: "Logging Strategies", slots: 2, difficulty: "⭐⭐⭐", details: "ELK Stack, Fluentd, Logstash" },
                  { topic: "Monitoring Tools", slots: 2, difficulty: "⭐⭐⭐", details: "Prometheus, Grafana, Nagios" },
                  { topic: "Incident Management", slots: 2, difficulty: "⭐⭐⭐⭐", details: "PagerDuty, Opsgenie, Incident Response" }
              ]
          }
      ]
  },
  {
      role: "AI/ML Engineer",
      category: "Data Science & AI",
      skills: ["Machine Learning", "Deep Learning", "TensorFlow & PyTorch", "Data Engineering"],
      salary: { entry: 1000000, mid: 2000000, senior: 4000000 },
      job_market_trends: {
          demand_growth: "Very High",
          remote_opportunities: "High",
          industries_hiring: ["Healthcare AI", "Finance AI", "Autonomous Vehicles", "Tech Companies"]
      },
      learning_path: {
          courses: [
              "Deep Learning Specialization by Coursera",
              "Machine Learning A-Z: Hands-On Python & R In Data Science by Udemy"
          ],
          certifications: [
              "TensorFlow Developer Certificate",
              "AWS Certified Machine Learning – Specialty"
          ]
      },
      community_engagement: {
          linkedin_groups: ["AI/ML Engineers India", "Deep Learning Enthusiasts"],
          forums: ["Stack Overflow", "Reddit r/MachineLearning"]
      },
      study_modules: [
          {
              module: "Foundations of AI/ML",
              total_slots: 12,
              topics: [
                  { topic: "Mathematics for ML", slots: 2, difficulty: "⭐⭐⭐", details: "Linear Algebra, Calculus, Probability" },
                  { topic: "Supervised Learning", slots: 2, difficulty: "⭐⭐⭐", details: "Regression, Classification, Decision Trees" },
                  { topic: "Unsupervised Learning", slots: 2, difficulty: "⭐⭐⭐", details: "Clustering, Dimensionality Reduction" }
              ]
          },
          {
              module: "Deep Learning & Neural Networks",
              total_slots: 10,
              topics: [
                  { topic: "Neural Network Basics", slots: 2, difficulty: "⭐⭐⭐", details: "Perceptrons, Activation Functions, Backpropagation" },
                  { topic: "Convolutional Neural Networks", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Image Processing, CNN Architectures" },
                  { topic: "Recurrent Neural Networks", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Sequence Modeling, LSTMs, GRUs" }
              ]
          },
          {
              module: "AI/ML in Production",
              total_slots: 8,
              topics: [
                  { topic: "Model Deployment", slots: 2, difficulty: "⭐⭐⭐⭐", details: "TensorFlow Serving, Flask, FastAPI" },
                  { topic: "MLOps", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Model Monitoring, CI/CD for ML, Data Versioning" },
                  { topic: "Ethics in AI", slots: 2, difficulty: "⭐⭐⭐", details: "Bias, Fairness, Explainability" }
              ]
          }
      ]
  },
  {
      role: "Cybersecurity Analyst",
      category: "Cybersecurity",
      skills: ["Network Security", "Threat Intelligence", "Ethical Hacking", "SIEM Tools"],
      salary: { entry: 800000, mid: 1500000, senior: 3000000 },
      job_market_trends: {
          demand_growth: "Very High",
          remote_opportunities: "Moderate",
          industries_hiring: ["Finance", "Government", "Cloud Security", "Healthcare"]
      },
      learning_path: {
          courses: [
              "Cybersecurity Specialization by Coursera",
              "The Complete Cyber Security Course by Udemy"
          ],
          certifications: [
              "Certified Information Systems Security Professional (CISSP)",
              "Certified Ethical Hacker (CEH)"
          ]
      },
      community_engagement: {
          linkedin_groups: ["Cybersecurity Professionals India", "Ethical Hackers"],
          forums: ["Stack Overflow", "Reddit r/cybersecurity"]
      },
      study_modules: [
          {
              module: "Core Cybersecurity Concepts",
              total_slots: 12,
              topics: [
                  { topic: "Network Security", slots: 2, difficulty: "⭐⭐⭐", details: "Firewalls, VPNs, IDS/IPS" },
                  { topic: "Threat Intelligence", slots: 2, difficulty: "⭐⭐⭐", details: "Threat Modeling, Vulnerability Assessment" },
                  { topic: "Cryptography", slots: 2, difficulty: "⭐⭐⭐", details: "Encryption Algorithms, Digital Signatures" }
              ]
          },
          {
              module: "Advanced Cybersecurity Techniques",
              total_slots: 10,
              topics: [
                  { topic: "Penetration Testing", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Kali Linux, Metasploit, Exploit Development" },
                  { topic: "Incident Response", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Forensics, Malware Analysis, Recovery" },
                  { topic: "Cloud Security", slots: 2, difficulty: "⭐⭐⭐⭐", details: "AWS Security, Azure Security, GCP Security" }
              ]
          },
          {
              module: "Security Operations",
              total_slots: 8,
              topics: [
                  { topic: "SIEM Tools", slots: 2, difficulty: "⭐⭐⭐", details: "Splunk, QRadar, ArcSight" },
                  { topic: "Compliance & Governance", slots: 2, difficulty: "⭐⭐⭐", details: "GDPR, HIPAA, PCI-DSS" },
                  { topic: "Zero Trust Architecture", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Identity Management, Microsegmentation" }
              ]
          }
      ]
  },
  {
      role: "Blockchain Developer",
      category: "Blockchain & Web3",
      skills: ["Solidity", "Ethereum Smart Contracts", "Web3.js", "Cryptography"],
      salary: { entry: 1200000, mid: 2200000, senior: 4500000 },
      job_market_trends: {
          demand_growth: "High",
          remote_opportunities: "High",
          industries_hiring: ["Finance", "DeFi", "Gaming", "Crypto Security"]
      },
      learning_path: {
          courses: [
              "Blockchain Specialization by Coursera",
              "Ethereum and Solidity: The Complete Developer's Guide by Udemy"
          ],
          certifications: [
              "Certified Blockchain Developer (CBD)",
              "Ethereum Developer Certification"
          ]
      },
      community_engagement: {
          linkedin_groups: ["Blockchain Developers India", "Ethereum Enthusiasts"],
          forums: ["Stack Overflow", "Reddit r/ethereum"]
      },
      study_modules: [
          {
              module: "Blockchain Fundamentals",
              total_slots: 12,
              topics: [
                  { topic: "Blockchain Basics", slots: 2, difficulty: "⭐⭐", details: "Distributed Ledger, Consensus Mechanisms" },
                  { topic: "Cryptography in Blockchain", slots: 2, difficulty: "⭐⭐⭐", details: "Hash Functions, Digital Signatures" },
                  { topic: "Smart Contracts", slots: 2, difficulty: "⭐⭐⭐", details: "Solidity, Ethereum Virtual Machine (EVM)" }
              ]
          },
          {
              module: "Advanced Blockchain Development",
              total_slots: 10,
              topics: [
                  { topic: "Decentralized Applications (DApps)", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Web3.js, Truffle, Ganache" },
                  { topic: "Tokenomics", slots: 2, difficulty: "⭐⭐⭐⭐", details: "ERC-20, ERC-721, Token Standards" },
                  { topic: "Blockchain Security", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Smart Contract Audits, Reentrancy Attacks" }
              ]
          },
          {
              module: "Blockchain in Production",
              total_slots: 8,
              topics: [
                  { topic: "Scalability Solutions", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Layer 2 Solutions, Sharding, Sidechains" },
                  { topic: "Blockchain Interoperability", slots: 2, difficulty: "⭐⭐⭐⭐", details: "Polkadot, Cosmos, Cross-Chain Bridges" },
                  { topic: "Regulatory Compliance", slots: 2, difficulty: "⭐⭐⭐", details: "KYC, AML, GDPR in Blockchain" }
              ]
          }
      ]
  },
    { "role": "Frontend Developer" },
    { "role": "Mobile App Developer" },
    { "role": "UI/UX Designer" },
    { "role": "Product Manager" },
    { "role": "Data Scientist" },
    { "role": "Data Analyst" },
    { "role": "Cloud Architect" },
    { "role": "Systems Engineer" },
    { "role": "Network Engineer" },
    { "role": "Database Administrator" },
    { "role": "Game Developer" },
    { "role": "AR/VR Developer" },
    { "role": "Embedded Systems Engineer" },
    { "role": "QA Engineer" },
    { "role": "Automation Engineer" },
    { "role": "Technical Writer" },
    { "role": "Scrum Master" },
    { "role": "Agile Coach" },
    { "role": "Business Analyst" },
    { "role": "Digital Marketing Specialist" },
    { "role": "SEO Specialist" },
    { "role": "Content Strategist" },
    { "role": "Social Media Manager" },
    { "role": "Graphic Designer" },
    { "role": "Motion Graphics Designer" },
    { "role": "Video Editor" },
    { "role": "3D Artist" },
    { "role": "Animator" },
    { "role": "Game Designer" },
    { "role": "Sound Designer" },
    { "role": "IT Support Specialist" },
    { "role": "IT Project Manager" },
    { "role": "Information Security Analyst" },
    { "role": "Penetration Tester" },
    { "role": "Cloud Security Engineer" },
    { "role": "Data Engineer" },
    { "role": "Big Data Engineer" },
    { "role": "Machine Learning Engineer" },
    { "role": "Deep Learning Engineer" },
    { "role": "Computer Vision Engineer" },
    { "role": "NLP Engineer" },
    { "role": "Robotics Engineer" },
    { "role": "IoT Developer" },
    { "role": "Blockchain Architect" },
    { "role": "Smart Contract Developer" },
    { "role": "Cryptocurrency Analyst" },
    { "role": "Financial Analyst" },
    { "role": "Investment Banker" },
    { "role": "Risk Analyst" },
    { "role": "Actuary" },
    { "role": "Supply Chain Analyst" },
    { "role": "Logistics Manager" },
    { "role": "Operations Manager" },
    { "role": "HR Manager" },
    { "role": "Recruitment Specialist" },
    { "role": "Learning & Development Manager" },
    { "role": "Corporate Trainer" },
    { "role": "Sales Executive" },
    { "role": "Account Manager" },
    { "role": "Customer Success Manager" },
    { "role": "Public Relations Specialist" },
    { "role": "Event Planner" },
    { "role": "Interior Designer" },
    { "role": "Fashion Designer" },
    { "role": "Industrial Designer" },
    { "role": "Architect" },
    { "role": "Civil Engineer" },
    { "role": "Mechanical Engineer" },
    { "role": "Electrical Engineer" },
    { "role": "Aerospace Engineer" },
    { "role": "Biomedical Engineer" },
    { "role": "Environmental Engineer" },
    { "role": "Chemical Engineer" },
    { "role": "Petroleum Engineer" },
    { "role": "Geologist" },
    { "role": "Meteorologist" },
    { "role": "Biotechnologist" },
    { "role": "Pharmacist" },
    { "role": "Medical Researcher" },
    { "role": "Clinical Data Manager" },
    { "role": "Healthcare Administrator" },
    { "role": "Nurse Practitioner" },
    { "role": "Physiotherapist" },
    { "role": "Psychologist" },
    { "role": "Counselor" },
    { "role": "Teacher" },
    { "role": "Professor" },
    { "role": "Curriculum Developer" },
    { "role": "Librarian" },
    { "role": "Journalist" },
    { "role": "Editor" },
    { "role": "Author" },
    { "role": "Translator" },
    { "role": "Interpreter" },
    { "role": "Chef" },
    { "role": "Nutritionist" },
    { "role": "Fitness Trainer" },
    { "role": "Yoga Instructor" },
    { "role": "Travel Guide" },
    { "role": "Tourism Manager" },
    { "role": "Pilot" },
    { "role": "Air Traffic Controller" },
    { "role": "Marine Engineer" },
    { "role": "Ship Captain" }
];