function initExperienceTimeline() {
  const timeline = document.getElementById('timeline');
  const tooltip = document.getElementById('tooltip');
  const experienceTitle = document.getElementById('experience-title');
  const experienceDateRange = document.getElementById('experience-date-range');
  const experienceDescription = document.getElementById('experience-description');
  
  console.log("Experience timeline elements:", {
    timeline: !!timeline,
    tooltip: !!tooltip,
    experienceTitle: !!experienceTitle,
    experienceDateRange: !!experienceDateRange,
    experienceDescription: !!experienceDescription
  });

  // Check if all required elements exist
  if (!timeline || !tooltip) {
    console.log("Experience timeline elements not found yet - will retry");
    return false;
  }

  const startDate = new Date(2022, 2, 1); // March 2022
  const today = new Date();
  
  // Updated experience data with start and end dates
  const experiences = [
    {
      startDate: new Date(2022, 2, 1), // March 2022
      endDate: new Date(2022, 2, 31),  // March 2022
      title: "Graduated from University",
      description: "During the COVID period, I began coding out of curiosity and enjoyment. This interest quickly grew into a passion, which later led me to explore how data and machines work together — inspiring me to start learning data science.",
      current: false
    },
    {
      startDate: new Date(2022, 3, 1),  // April 2022
      endDate: new Date(2022, 9, 1),  // October 2022
      title: "Data Science Enthusiast",
      description: "I joined Vetrocity Career Development Program and dived deeper into data science, learning Python. Completed several online courses parallely and also done personal projects involving data analysis and visualization.",
      current: false
    },
    {
      startDate: new Date(2022, 9, 3),  // oct 2022
      endDate: new Date(2023, 1, 28),   // Feb 2023
      title: "Data Engineer",
      description: "This is where I started my professional journey. I joined as Data Engineer at LatentView and worked on building data pipelines, ETL processes, and data warehousing solutions. Gained hands-on experience with big data technologies and cloud platforms. Espically worked on AWS services like S3 and exposed to snowflakes.",
      current: false
    },
    {
      startDate: new Date(2023, 2, 1),  // March 2023
      endDate: new Date(2023, 11, 31),  // December 2023
      title: "Career break & Learning Phase",
      description: "During this period, I took a career break to focus on upskilling myself to join in University in UK. I researched various programs, universities that suits best for me and prepared accordingly.",
      current: false
    },
    {
      startDate: new Date(2024, 0, 1),  // January 2024
      endDate: today,                    //  Present
      title: "Data Science Master's Student",
      description: "Joined in Wrexham University for Master's in Data Science and Big Data analytics. The curriculum covers advanced topics in data analysis, machine learning, and big data technologies. Engaging in various projects and research work to deepen my understanding of data science concepts.",
      current: true
    }
  ];

  // Track if mouse is over the slider
  let isMouseOverSlider = false;

  function formatDate(date) {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  }

  function getDateRangeString(startDate, endDate, isCurrent) {
    const startStr = formatDate(startDate);
    const endStr = isCurrent ? 'Present' : formatDate(endDate);
    return `${startStr} - ${endStr}`;
  }

  function getTenseDescription(baseDescription, isCurrent) {
    if (isCurrent) {
      // Convert past tense to present continuous
      return baseDescription
        .replace(/Built/g, 'Building')
        .replace(/Led/g, 'Leading')
        .replace(/Implemented/g, 'Implementing')
        .replace(/Mentored/g, 'Mentoring')
        .replace(/Started/g, 'Starting')
        .replace(/Advanced/g, 'Advancing')
        .replace(/Expanded/g, 'Expanding')
        .replace(/Learned/g, 'Learning')
        .replace(/Collaborated/g, 'Collaborating')
        .replace(/Worked/g, 'Working')
        .replace(/Developed/g, 'Developing')
        .replace(/Created/g, 'Creating');
    } else {
      // Ensure past tense
      return baseDescription
        .replace(/Building/g, 'Built')
        .replace(/Leading/g, 'Led')
        .replace(/Implementing/g, 'Implemented')
        .replace(/Mentoring/g, 'Mentored')
        .replace(/Starting/g, 'Started')
        .replace(/Advancing/g, 'Advanced')
        .replace(/Expanding/g, 'Expanded')
        .replace(/Learning/g, 'Learned')
        .replace(/Collaborating/g, 'Collaborated')
        .replace(/Working/g, 'Worked')
        .replace(/Developing/g, 'Developed')
        .replace(/Creating/g, 'Created');
    }
  }

  function updateTooltip() {
    const val = parseFloat(timeline.value) || 0;
    const min = parseFloat(timeline.min) || 0;
    const max = parseFloat(timeline.max) || 100;
    const range = max - min || 1;
    const percent = (val - min) / range;

    const totalMonths =
      (today.getFullYear() - startDate.getFullYear()) * 12 +
      (today.getMonth() - startDate.getMonth());
    const currentMonth = Math.round(percent * totalMonths);
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + currentMonth);

    const dateStr = currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    tooltip.textContent = dateStr;

    // Update tooltip position
    const sliderRect = timeline.getBoundingClientRect();
    const containerRect = document.querySelector('.timeline-container').getBoundingClientRect();
    
    // Calculate thumb position (inverted for vertical slider)
    const thumbPosition = (1 - percent) * containerRect.height;
    
    // Position tooltip next to thumb
    tooltip.style.top = `${thumbPosition}px`;
    tooltip.style.left = '50px';
    
    // Always show tooltip when interacting with slider
    tooltip.classList.add('show');

    // Update progress color on slider track
    const percentValue = Math.round(percent * 100);
    timeline.style.setProperty(
      '--track-fill',
      `linear-gradient(to right, #007bff ${percentValue}%, #d3d3d3 ${percentValue}%)`
    );

    // Update experience content based on date
    updateExperienceContent(currentDate);
  }

  function updateExperienceContent(currentDate) {
    // Find the experience that was active at the current date
    let activeExperience = null;
    
    for (let i = 0; i < experiences.length; i++) {
      const experience = experiences[i];
      if (currentDate >= experience.startDate && currentDate <= experience.endDate) {
        activeExperience = experience;
        break;
      }
    }
    
    // If no exact match, find the closest experience
    if (!activeExperience) {
      let closestExperience = experiences[0];
      let minDiff = Math.abs(currentDate - experiences[0].startDate);
      
      for (let i = 1; i < experiences.length; i++) {
        const diff = Math.abs(currentDate - experiences[i].startDate);
        if (diff < minDiff) {
          minDiff = diff;
          closestExperience = experiences[i];
        }
      }
      activeExperience = closestExperience;
    }

    // Determine if this is a current role based on the timeline position
    const isCurrentlyInRole = currentDate >= activeExperience.startDate && 
                             currentDate <= activeExperience.endDate && 
                             activeExperience.endDate.getTime() === today.getTime();
    
    // Update the display
    experienceTitle.textContent = activeExperience.title;
    experienceDateRange.textContent = getDateRangeString(
      activeExperience.startDate, 
      activeExperience.endDate, 
      isCurrentlyInRole
    );
    experienceDescription.textContent = getTenseDescription(
      activeExperience.description, 
      isCurrentlyInRole
    );
  }

  // Event listeners
  timeline.addEventListener('input', updateTooltip);
  timeline.addEventListener('mousemove', updateTooltip);
  timeline.addEventListener('mousedown', updateTooltip);
  timeline.addEventListener('mouseenter', () => {
    isMouseOverSlider = true;
    updateTooltip();
  });
  timeline.addEventListener('mouseleave', () => {
    isMouseOverSlider = false;
    // Only hide tooltip if not dragging
    if (timeline.getAttribute('data-dragging') !== 'true') {
      tooltip.classList.remove('show');
    }
  });

  // Track dragging state
  timeline.addEventListener('mousedown', () => {
    timeline.setAttribute('data-dragging', 'true');
  });
  
  document.addEventListener('mouseup', () => {
    timeline.setAttribute('data-dragging', 'false');
    if (!isMouseOverSlider) {
      tooltip.classList.remove('show');
    }
  });

  // Initialize
  updateTooltip();
  
  console.log("Experience timeline initialized successfully");
  return true;
}

// Initialize experience timeline
document.addEventListener("DOMContentLoaded", () => {
  // Try initializing right away
  if (!initExperienceTimeline()) {
    // If not ready, set up a retry mechanism
    console.log("Experience timeline not ready, setting up retry...");
    let retryCount = 0;
    const maxRetries = 10;
    
    const retryInterval = setInterval(() => {
      retryCount++;
      if (initExperienceTimeline()) {
        clearInterval(retryInterval);
        console.log("Experience timeline initialized after retry");
      } else if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        console.log("Failed to initialize experience timeline after max retries");
      }
    }, 200);
  }
});