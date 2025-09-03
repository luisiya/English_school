import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Task } from './Task';
import { Unit } from './Unit';
import { getTasks } from '../actions';

const TaskBtnBlock = ({ children }) => (
  <div
    style={{
      width: '80%',
      margin: '0 auto',
    }}
  >
    {children}
  </div>
);

export const UnitsList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.list.tasks);
  const show = useSelector(state => state.list.show);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Fragment>
      <TaskBtnBlock>
        {show ? tasks.map(task => (
          <Unit
            key={task.id}
            id={task.id}
            className="units"
            text={task.name}
          />
        )) : <Task />}
      </TaskBtnBlock>
    </Fragment>
  );
};

export default UnitsList;
