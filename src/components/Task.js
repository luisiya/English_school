import { useState, Fragment, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showUnits, goBackToWordSets } from '../actions';

const UnitText = ({ children, ...props }) => (
  <div 
    style={{
      width: '80%',
      maxWidth: '600px',
      margin: '30px auto',
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
    {...props}
  >
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      animation: 'shine 3s infinite',
    }} />
    {children}
  </div>
);

const Word = ({ children }) => (
  <span style={{ 
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
    display: 'block',
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    letterSpacing: '1px',
  }}>
    {children}
  </span>
);

const TaskButton = ({ children, ...props }) => (
  <button
    style={{
      marginTop: '20px',
      background: props.children === 'далее' 
        ? 'linear-gradient(45deg, #ff6b6b 30%, #4ecdc4 90%)'
        : 'linear-gradient(45deg, #009688 30%, #d053ff 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: props.children === 'далее' 
        ? '0 6px 10px 4px rgba(255, 107, 107, .3)'
        : '0 3px 5px 2px rgba(255, 105, 135, .3)',
      cursor: 'pointer',
      fontSize: props.children === 'далее' ? '18px' : '16px',
      fontWeight: props.children === 'далее' ? 'bold' : 'normal',
      transform: props.children === 'далее' ? 'scale(1.05)' : 'scale(1)',
      transition: 'all 0.3s ease',
    }}
    {...props}
  >
    {children}
  </button>
);

const AnswerWrapper = ({ children, ...props }) => (
  <form
    style={{
      fontSize: '1rem',
      width: '80%',
      maxWidth: '600px',
      margin: '30px auto',
      textAlign: 'center',
    }}
    {...props}
  >
    {children}
  </form>
);

const StyledInput = ({ ...props }) => (
  <input
    style={{
      width: '100%',
      padding: '15px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1.1rem',
      marginBottom: '15px',
      backgroundColor: 'rgba(255,255,255,0.9)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'Arial, sans-serif',
    }}
    onFocus={(e) => {
      e.target.style.border = '2px solid #667eea';
      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    }}
    onBlur={(e) => {
      e.target.style.border = '2px solid #e0e0e0';
      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    }}
    {...props}
  />
);

const textUnit = 'Как будет на английском слово:  ';
const checkText = 'Проверить';
const tryAgainText = 'cыграть еще!';

export const Task = () => {
  const [taskText, setTaskText] = useState(textUnit);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [btnTitle, setBtnTitle] = useState(checkText);
  const [answer, setAnswer] = useState('');
  const [gameFinished, setGameFinished] = useState(false);

  const words = useSelector(state => state.list.shuffleWords);
  const translates = useSelector(state => state.list.translates);
  const dispatch = useDispatch();
  const textInput = useRef();

  // Debug logging
  console.log('Task component - words:', words);
  console.log('Task component - translates:', translates);
  console.log('Task component - count:', count);

  // Global key press listener for Enter key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (btnTitle === 'далее') {
          next();
        } else if (btnTitle === checkText && answer !== '') {
          taskCheck(e);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [btnTitle, answer]);

  // Auto-focus input field when it becomes visible
  useEffect(() => {
    console.log('Auto-focus effect triggered, show:', show, 'count:', count);
    if (show && textInput.current) {
      // Add a small delay to ensure the DOM is updated
      setTimeout(() => {
        if (textInput.current) {
          console.log('Focusing input field');
          textInput.current.focus();
        }
      }, 100);
    }
  }, [show, count]);

  // Focus input field when component mounts or when game starts
  useEffect(() => {
    if (show && textInput.current && words.length > 0) {
      setTimeout(() => {
        if (textInput.current) {
          textInput.current.focus();
        }
      }, 100);
    }
  }, [words.length]);

  // Callback ref to focus input when it's created
  const setInputRef = (element) => {
    textInput.current = element;
    if (element && show) {
      console.log('Input element created, focusing immediately');
      element.focus();
    }
  };

  const getInputValue = (e) => {
    setAnswer(e.target.value);
  };

  const restartGame = () => {
    setTaskText(textUnit);
    setCorrectAnswersCount(0);
    setCount(0);
    setShow(true);
    setBtnTitle(checkText);
    setAnswer('');
    setGameFinished(false);
    if (textInput.current) {
      textInput.current.value = '';
    }
  };

  const selectNewGame = () => {
    // Reset the Redux state to go back to word set selection
    console.log('Selecting new game, dispatching goBackToWordSets');
    dispatch(goBackToWordSets());
  };

  const next = () => {
    console.log('next() called, count:', count, 'words.length:', words.length);
    if (count < words.length) {
      console.log('Moving to next word');
      setTaskText(textUnit);
      setBtnTitle(checkText);
      setShow(true);
      setAnswer(''); // Reset answer state
    } else {
      console.log('Game finished');
      setTaskText(`Игра закончена! \n Твои результаты: \n правильно ${correctAnswersCount}\n неправильно ${words.length - correctAnswersCount}`);
      setGameFinished(true);
      setShow(false);
    }
  };

  const taskCheck = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log('taskCheck called, btnTitle:', btnTitle, 'count:', count);
    if (btnTitle === checkText) {
      if (answer !== '') {
        if (answer.toLowerCase() === (translates && words && words[count] ? translates[words[count]] : '')) {
          setTaskText('Это правильный ответ! Нажмите "далее" для продолжения.');
          setCorrectAnswersCount(correctAnswersCount + 1);
          setShow(false);
        } else {
          setTaskText(`Неправильный ответ. Корректно писать ${translates && words && words[count] ? translates[words[count]] : ''}. Нажмите "далее" для продолжения.`);
          setShow(false);
        }
        setCount(count + 1);
        if (textInput.current) {
          textInput.current.value = '';
        }
        setBtnTitle('далее');
        setAnswer('');
      } else {
        setTaskText(`${'Нужно что-то ввести.\n'}${textUnit}`);
      }
    } else if (btnTitle === 'далее') {
      next();
    }
  };

  return (
    <Fragment>
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .question-container {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
      <UnitText>
        <h6 style={{ 
          margin: 0, 
          fontSize: '1.5rem',
          color: '#ffffff',
          fontWeight: '600',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          lineHeight: '1.4',
          fontFamily: 'Arial, sans-serif',
        }} className="question-container">
          {taskText}
          <Word>{show && words && words[count] ? words[count] : ''}</Word>
        </h6>
      </UnitText>
      <AnswerWrapper onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off">
        {show && (
          <StyledInput
            onChange={getInputValue}
            ref={setInputRef}
            autoFocus
            placeholder="Ваш ответ"
          />
        )}
        {!gameFinished ? (
          <TaskButton onClick={(e) => taskCheck(e)}>
            {btnTitle}
          </TaskButton>
        ) : (
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
            <TaskButton onClick={restartGame}>
              Restart
            </TaskButton>
            <TaskButton onClick={selectNewGame}>
              Select New Game
            </TaskButton>
          </div>
        )}
      </AnswerWrapper>
    </Fragment>
  );
};

export default Task;
