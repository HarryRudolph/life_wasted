document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const wastedHoursInput = document.getElementById('wasted-hours');
    const calculateBtn = document.getElementById('calculate-btn');
    const timePerWeek = document.getElementById('time-per-week');
    const daysPerMonth = document.getElementById('days-per-month');
    const workWeeksPerYear = document.getElementById('work-weeks-per-year');
    const workWeeksLifetime = document.getElementById('work-weeks-lifetime');
    const normalProgress = document.getElementById('normal-progress');
    const wastedProgress = document.getElementById('wasted-progress');
    const normalAge = document.getElementById('normal-age');
    const wastedAge = document.getElementById('wasted-age');
    
    // Keep sections hidden initially - they will show when user clicks calculate
    
    // Event listeners
    calculateBtn.addEventListener('click', handleCalculate);
    wastedHoursInput.addEventListener('input', handleCalculate);
    
    // Function to handle calculate button and progressive reveal
    function handleCalculate() {
        updateCalculations();
        revealSections();
    }
    
    // Function to progressively reveal sections
    function revealSections() {
        const statsSection = document.querySelector('.stats-section');
        const visualizationSection = document.querySelector('.visualization-section');
        const explanationSection = document.querySelector('.explanation');
        
        // Show visualization section first and start animation
        setTimeout(() => {
            visualizationSection.classList.add('visible');
            // Start the life progression animation after visualization appears
            setTimeout(() => {
                animateLifeProgression();
            }, 300);
        }, 200);
        
        // Show stats section after visualization
        setTimeout(() => {
            statsSection.classList.add('visible');
        }, 800);
        
        // Show explanation section
        setTimeout(() => {
            explanationSection.classList.add('visible');
        }, 1400);
    }
    
    // Helper function to format time in the most appropriate unit
    function formatTime(hours) {
        const days = hours / 24;
        const weeks = days / 7;
        const months = weeks / 4.33;
        const years = months / 12;
        
        if (years >= 1) {
            return Math.round(years) + ' year' + (Math.round(years) !== 1 ? 's' : '');
        } else if (months >= 1) {
            return Math.round(months) + ' month' + (Math.round(months) !== 1 ? 's' : '');
        } else if (weeks >= 1) {
            return Math.round(weeks) + ' week' + (Math.round(weeks) !== 1 ? 's' : '');
        } else if (days >= 1) {
            return Math.round(days) + ' day' + (Math.round(days) !== 1 ? 's' : '');
        } else {
            return Math.round(hours) + ' hour' + (Math.round(hours) !== 1 ? 's' : '');
        }
    }
    
    // Helper function to format work time in the most appropriate unit
    function formatWorkTime(workWeeks) {
        const workMonths = workWeeks / 4.33;
        const workYears = workMonths / 12;
        
        if (workYears >= 1) {
            return Math.round(workYears) + ' year' + (Math.round(workYears) !== 1 ? 's' : '');
        } else if (workMonths >= 1) {
            return Math.round(workMonths) + ' month' + (Math.round(workMonths) !== 1 ? 's' : '');
        } else {
            return Math.round(workWeeks) + ' week' + (Math.round(workWeeks) !== 1 ? 's' : '');
        }
    }

    // Function to update all calculations
    function updateCalculations() {
        const wastedHours = parseFloat(wastedHoursInput.value) || 0;
        
        // Calculate specific stats as requested
        // 1. Time wasted per week (in hours)
        const weeklyHours = wastedHours * 7;
        
        // 2. Days wasted per month (convert monthly hours to days)
        const monthlyHours = weeklyHours * 4.33; // Average weeks per month
        const daysWastedPerMonth = monthlyHours / 24; // Convert to days
        
        // 3. Work weeks wasted per year (based on 37 hours per work week)
        const yearlyHours = weeklyHours * 52; // Weeks per year
        const workWeeksWastedPerYear = yearlyHours / 37;
        
        // 4. Work weeks wasted per lifetime (assuming 70 productive years: age 15-85)
        const lifetimeYears = 70;
        const lifetimeWorkWeeksWasted = workWeeksWastedPerYear * lifetimeYears;
        
        // Update display
        timePerWeek.textContent = formatTime(weeklyHours);
        daysPerMonth.textContent = Math.round(daysWastedPerMonth) + ' day' + (Math.round(daysWastedPerMonth) !== 1 ? 's' : '');
        workWeeksPerYear.textContent = Math.round(workWeeksWastedPerYear) + ' week' + (Math.round(workWeeksWastedPerYear) !== 1 ? 's' : '');
        workWeeksLifetime.textContent = formatWorkTime(lifetimeWorkWeeksWasted);
    }
    
    // Function to animate life progression
    function animateLifeProgression() {
        // Reset progress bars
        normalProgress.style.width = '0%';
        wastedProgress.style.width = '0%';
        normalAge.textContent = '0';
        wastedAge.textContent = '0';
        
        const wastedHours = parseFloat(wastedHoursInput.value) || 0;
        
        // Calculate effective life reduction based on 16-hour waking day
        // If you waste X hours per day out of 16 waking hours, you effectively lose X/16 of each day
        const wasteRatio = wastedHours / 16;
        
        // With wasted time, your "effective" lifespan is reduced
        // If you waste 25% of your waking time, you effectively live 75% as long in terms of productive life
        const effectiveLifespan = 100 * (1 - wasteRatio);
        
        let currentAge = 0;
        const maxAge = 100;
        
        const animationInterval = setInterval(() => {
            if (currentAge <= maxAge) {
                // Normal life progresses to 100
                normalAge.textContent = currentAge;
                normalProgress.style.width = currentAge + '%';
                
                // Wasted life progresses proportionally but caps at the effective lifespan
                const wastedLifeAge = Math.min(currentAge, effectiveLifespan);
                wastedAge.textContent = Math.round(wastedLifeAge);
                wastedProgress.style.width = (wastedLifeAge / maxAge * 100) + '%';
                
                currentAge++;
            } else {
                clearInterval(animationInterval);
            }
        }, 50);
    }
});
