export const taskTemplates = [
  {
    id: 'schedule-meeting',
    name: 'Schedule Meeting',
    description: 'Schedule a team meeting with attendees',
    steps: [
      { id: 1, name: 'Select date', requires: 'date', options: [] },
      { id: 2, name: 'Choose time', requires: 'time', options: ['Morning', 'Afternoon', 'Evening'] },
      { id: 3, name: 'Add attendees', requires: 'emails', options: [] },
      { id: 4, name: 'Send invites', requires: 'confirmation', options: ['Send now', 'Review first'] }
    ],
    estimatedTime: '5 minutes',
    constraints: ['Max 3 time slots shown', 'Email validation required']
  },
  {
    id: 'create-report',
    name: 'Create Report',
    description: 'Generate a business performance report',
    steps: [
      { id: 1, name: 'Select template', requires: 'choice', options: ['Weekly', 'Monthly', 'Quarterly'] },
      { id: 2, name: 'Add data', requires: 'upload', options: ['Upload CSV', 'Manual entry'] },
      { id: 3, name: 'Review content', requires: 'confirmation', options: [] },
      { id: 4, name: 'Generate PDF', requires: 'action', options: ['Download', 'Email', 'Both'] }
    ],
    estimatedTime: '10 minutes',
    constraints: ['PDF only', 'Max 5MB data']
  },
  {
    id: 'book-travel',
    name: 'Book Travel',
    description: 'Book flights and accommodation',
    steps: [
      { id: 1, name: 'Select dates', requires: 'date_range', options: [] },
      { id: 2, name: 'Choose destination', requires: 'location', options: [] },
      { id: 3, name: 'Book flights', requires: 'selection', options: ['Economy', 'Business', 'First'] },
      { id: 4, name: 'Reserve hotel', requires: 'selection', options: ['Standard', 'Deluxe', 'Suite'] },
      { id: 5, name: 'Add extras', requires: 'multi_select', options: ['Insurance', 'Car rental', 'Airport transfer'] }
    ],
    estimatedTime: '15 minutes',
    constraints: ['Budget limit: $2000', 'Refundable only']
  }
];

export const getTaskById = (id) => {
  return taskTemplates.find(task => task.id === id);
};

export const getNextStep = (taskId, currentStep) => {
  const task = getTaskById(taskId);
  if (!task) return null;
  
  const currentIndex = task.steps.findIndex(step => step.id === currentStep);
  if (currentIndex < task.steps.length - 1) {
    return task.steps[currentIndex + 1];
  }
  return null;
};