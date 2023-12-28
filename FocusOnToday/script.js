// Selecting DOM elements
const checkBoxList = document.querySelectorAll('.custom-checkbox'); // Selecting all checkboxes
const inputFields = document.querySelectorAll('.goal-input'); // Selecting all input fields
const errorLabel = document.querySelector('.error-label'); // Selecting error label element
const progressLabel = document.querySelector('.progress-label'); // Selecting progress label element
const progressBar = document.querySelector('.progress-bar'); // Selecting progress bar element
const progressValue = document.querySelector('.progress-value'); // Selecting progress value element
const quote = document.querySelector('.quote'); // selecting quote element

// Array of motivational quotes
const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
];

// Array of motivational bottom quotes
const allBottomQuotes = [
  'Move one step ahead, today!' ,
  "One step at a time, and you'll get there." ,
  "Small progress is still progress. Keep going!" ,
  "Every task completed is a step closer to your goals."
]


// Retrieve goals from local storage or initialize an empty object
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

// Count the number of completed goals
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

// Set initial styles for progress value
progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

// Event listeners for checkboxes
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    // Check if all input fields have values
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      // Toggle completed class on the parent element (task container)
      checkbox.parentElement.classList.toggle('completed');
      
      // Get the ID of the associated input field
      const inputId = checkbox.nextElementSibling.id;

      // Update completed status in the goals object
      allGoals[inputId].completed = !allGoals[inputId].completed;

      // Recalculate completed goals count
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      // Update progress bar and labels
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      quote.innerText = allBottomQuotes[completedGoalsCount];

      // Save updated goals to local storage
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    } else {
      // Show error if not all goals have values
      progressBar.classList.add('show-error');
    }
  });
});

// Event listeners for input fields
inputFields.forEach((input) => {
  // Populate input field with saved value and apply completed class if necessary
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed');
    }
  }

  // Remove error class when input field is focused
  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error');
  });

  // Update goals object when input field value changes
  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      // Restore original value if goal is completed
      input.value = allGoals[input.id].name;
      return;
    }

    if (allGoals[input.id]) {
      // Update existing goal in the goals object
      allGoals[input.id].name = input.value;
    } else {
      // Add a new goal to the goals object
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    // Save updated goals to local storage
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});
