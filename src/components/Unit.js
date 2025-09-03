import { useDispatch, useSelector } from 'react-redux';
import { showUnits, shuffleWords, translatesWords } from '../actions';
import './Unit.css';

const TaskButton = ({ children, ...props }) => (
  <button
    className="task-button"
    {...props}
  >
    {children}
  </button>
);

export const Unit = ({ text }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.list.tasks);

  const startLearning = (e) => {
    try {
      const userChoice = e.currentTarget.title;
      console.log('User clicked on:', userChoice);
      console.log('Available tasks:', tasks);

      if (!tasks || !Array.isArray(tasks)) {
        console.error('Tasks data is not available');
        return;
      }

      // Find the selected task by name
      const selectedTask = tasks.find(task => task.name === userChoice);
      console.log('Selected task:', selectedTask);
      
      if (selectedTask && selectedTask.tasks) {
        // Get the words and shuffle them
        const wordKeys = Object.keys(selectedTask.tasks);
        const shuffledWords = wordKeys.sort(() => 0.5 - Math.random());
        
        console.log('Shuffled words:', shuffledWords);
        console.log('Translates:', selectedTask.tasks);
        
        dispatch(shuffleWords(shuffledWords));
        dispatch(translatesWords(selectedTask.tasks));
        dispatch(showUnits());
      } else {
        console.error('Selected task not found or has no tasks');
      }
    } catch (error) {
      console.error('Error in startLearning:', error);
    }
  };

  return (
    <TaskButton
      title={text}
      onClick={startLearning}
    >
      {text}
    </TaskButton>
  );
};

export default Unit;
